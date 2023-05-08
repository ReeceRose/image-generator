#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use image_generator_core::{
    generate_image as create_image, GenerateImageRequest, GenerateImageResponse,
};

#[tauri::command]
async fn generate_image(request: GenerateImageRequest) -> GenerateImageResponse {
    create_image(&request).await
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![generate_image])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
