#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

use tauri::Manager;

// Basic Tauri commands to call the plugin stubs via the frontend or perform native work.
#[tauri::command]
fn ping() -> &'static str {
  "tauri: ok"
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![ping])
    .setup(|app| {
      let handle = app.handle();
      // Setup code for offline research suite could go here (e.g., initialize local DB)
      println!("Toshu research suite (stub) starting...");
      let _ = handle;
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running Toshu Tauri application");
}
