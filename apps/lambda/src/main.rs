use std::net::SocketAddr;

use image_generator_core::hello;

use axum::{extract::Query, response::Json, routing::get, Router};
use lambda_http::Error;
use lambda_web::{is_running_on_lambda, run_hyper_on_lambda};
use serde::Deserialize;
use serde_json::{json, Value};
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::{self, TraceLayer};
use tracing::Level;

#[derive(Debug, Deserialize)]
struct Request {
    name: Option<String>,
}

async fn root(Query(request): Query<Request>) -> Json<Value> {
    let name = request.name.unwrap_or("world".to_owned());

    Json(json!({ "msg": hello(&name) }))
}

pub async fn fallback(uri: axum::http::Uri) -> impl axum::response::IntoResponse {
    (
        axum::http::StatusCode::NOT_FOUND,
        format!("No route {}", uri.path()),
    )
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::INFO)
        .with_target(false)
        .with_ansi(false)
        .without_time()
        .init();

    let cors = CorsLayer::new().allow_origin(Any);

    // TODO: remove once full-domain is in-place
    let routes = Router::new().route("/", get(root));
    let app = Router::new()
        .route("/", get(root))
        .nest("/production/", routes)
        .layer(cors)
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(trace::DefaultMakeSpan::new().level(Level::INFO))
                .on_response(trace::DefaultOnResponse::new().level(Level::INFO)),
        )
        .fallback(fallback);

    if is_running_on_lambda() {
        run_hyper_on_lambda(app).await?;
    } else {
        let addr = SocketAddr::from(([127, 0, 0, 1], 8000));
        tracing::info!("listening on {}", addr);
        axum::Server::bind(&addr)
            .serve(app.into_make_service())
            .await?;
    }
    Ok(())
}
