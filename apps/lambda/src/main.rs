use std::net::SocketAddr;

use axum::http::StatusCode;
use axum::routing::post;

use axum::{extract::Json, Router};
use image_generator_core::GenerateImageRequest;
use lambda_http::Error;
use lambda_web::{is_running_on_lambda, run_hyper_on_lambda};
use serde_json::json;
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::{self, TraceLayer};
use tracing::Level;

async fn generate_image(
    Json(request): Json<GenerateImageRequest>,
) -> impl axum::response::IntoResponse {
    let response = image_generator_core::generate_image(&request).await;
    return (
        axum::http::StatusCode::from_u16(response.status_code)
            .unwrap_or(StatusCode::INTERNAL_SERVER_ERROR),
        Json(json!(response)),
    );
}

async fn fallback(uri: axum::http::Uri) -> impl axum::response::IntoResponse {
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

    let cors = CorsLayer::new().allow_origin(Any).allow_headers(Any);

    let routes = Router::new().route("/", post(generate_image));
    let app = Router::new()
        .route("/", post(generate_image))
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
