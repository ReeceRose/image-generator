#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use image_generator_core::hello;

#[tauri::command]
fn hello_wrapper(name: &str) -> String {
    return hello(name);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![hello_wrapper])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
