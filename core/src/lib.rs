use serde::{Deserialize, Serialize};

// TODO: use &str in structs?

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct GenerateImageRequest {
    pub api_key: String,
    pub prompt: String,
    pub image_count: u8,
    pub size: String,
}

#[derive(Serialize, Debug)]
pub struct OpenAIGenerateImageRequest {
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

#[derive(Debug, Serialize, Deserialize)]
pub struct GenerateImageResponse {
    data: Option<Vec<URL>>,
    error: Option<GenerateImageError>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GenerateImageError {
    message: String,
}

impl GenerateImageError {
    fn new(msg: &str) -> GenerateImageError {
        GenerateImageError {
            message: msg.to_string(),
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct URL {
    url: String,
}

pub async fn generate_image(
    request: &GenerateImageRequest,
) -> Result<GenerateImageResponse, GenerateImageError> {
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
        _ => return Err(GenerateImageError::new("Failed to make request")),
    };
    if let reqwest::StatusCode::OK = response.status() {
        let json = response.json::<GenerateImageResponse>().await;
        let data = match json {
            Ok(data) => data,
            _ => {
                return Err(GenerateImageError::new("Failed to deserialize response."));
            }
        };
        return Ok(data);
    } else {
        println!("FAIL {:?}", response);
        return Err(GenerateImageError::new("Non 200 error response"));
    }
}

pub fn hello(name: &str) -> String {
    format!("Hello {name}!")
}
