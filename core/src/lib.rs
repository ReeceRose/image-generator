use serde::{Deserialize, Serialize};
// TODO: use &str in structs?

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GenerateImageRequest {
    pub api_key: String,
    pub prompt: String,
    pub image_count: u8,
    pub size: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct OpenAIGenerateImageRequest {
    prompt: String,
    n: u8,
    size: String,
}

impl From<&GenerateImageRequest> for OpenAIGenerateImageRequest {
    fn from(value: &GenerateImageRequest) -> Self {
        OpenAIGenerateImageRequest {
            prompt: value.prompt.to_owned(),
            n: value.image_count,
            size: value.size.to_owned(),
        }
    }
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct GenerateImageResponse {
    #[serde(default, skip)]
    pub status_code: u16,
    data: Option<Vec<URL>>,
    error: Option<GenerateImageError>,
}

impl GenerateImageResponse {
    fn new(
        status_code: u16,
        data: Option<Vec<URL>>,
        error: Option<GenerateImageError>,
    ) -> GenerateImageResponse {
        GenerateImageResponse {
            status_code,
            data,
            error,
        }
    }
}

// TODO: use a new in the above

#[derive(Debug, Serialize, Deserialize)]
struct GenerateImageError {
    message: String,
}

impl GenerateImageError {
    fn new(message: String) -> Self {
        GenerateImageError { message }
    }
}

#[derive(Serialize, Deserialize, Debug)]
struct URL {
    url: String,
}

pub async fn generate_image(request: &GenerateImageRequest) -> GenerateImageResponse {
    let client = reqwest::Client::new();
    let res = client
        .post("https://api.openai.com/v1/images/generations")
        .header("Content-Type", "application/json")
        .header("Authorization", format!("Bearer {}", request.api_key))
        .json(&OpenAIGenerateImageRequest::from(request))
        .send()
        .await;
    let response = match res {
        Ok(response) => response,
        _ => {
            return GenerateImageResponse::new(
                500,
                None,
                Some(GenerateImageError::new(
                    "Failed to make request to OpenAI".to_owned(),
                )),
            )
        }
    };
    // if let reqwest::StatusCode::OK = response.status() {
    let json = response.json::<GenerateImageResponse>().await;
    match json {
        Ok(mut data) => {
            if data.error.is_some() && data.status_code == 0 {
                data.status_code = 500
            } else {
                data.status_code = 200;
            }
            return data;
        }
        _ => {
            return GenerateImageResponse::new(
                500,
                None,
                Some(GenerateImageError::new(
                    "Failed to deserialize response.".to_owned(),
                )),
            );
        }
    };
}
