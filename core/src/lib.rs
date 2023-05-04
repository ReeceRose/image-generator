use serde::{Deserialize, Serialize};

// TODO: use &str in structs?
#[derive(Serialize, Deserialize, Debug)]
pub struct GenerateImageRequest {
    pub prompt: String,
    pub n: u8,
    pub size: String,
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
    apikey: String,
) -> Result<GenerateImageResponse, GenerateImageError> {
    let client = reqwest::Client::new();
    let res = client
        .post("https://api.openai.com/v1/images/generations")
        .header("Content-Type", "application/json")
        .header("Authorization", format!("Bearer {}", apikey))
        .json(request)
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
