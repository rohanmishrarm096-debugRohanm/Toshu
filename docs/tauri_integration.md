Tauri Integration Notes for Toshu Research Suite

This document describes the minimal integration used by the stubs in this repository.

Commands
- ping: simple health check (returns "tauri: ok").

Frontend <-> Backend
- Frontend components (e.g., src/ui/Editor.vue) call local plugin/utility functions implemented in TypeScript.
- For operations that need native access (filesystem, local database), expose Tauri commands in src-tauri/src/main.rs and call them via window.__TAURI__.invoke.

Packaging
- tauri.conf.json contains minimal configuration; update identifiers, icons, and signing options before production builds.

Privacy & Storage
- All processing in these stubs is local. If you add networking or syncing, document and obtain user consent for external data transfer.

Extending the Suite
- Replace summarizer/plagiarism/citation extractor stubs with implementations that suit your offline constraints (e.g., local models, optimized C/Rust libraries).
- Initialize local storage (SQLite/RocksDB) in the Tauri setup hook and provide commands to query/modify it.

Testing
- Use tauri dev to run the application during development. Write integration tests that exercise both the renderer and invoke handlers.
