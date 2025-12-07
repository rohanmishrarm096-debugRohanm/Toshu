This PR introduces an offline-first research-writing feature set tailored for Toshu as a Tauri desktop app. It provides minimal, extendable stubs so we can iterate quickly while keeping everything local and private.

What this adds
- Offline extractive summarizer (frontend TS) — lightweight heuristics.
- Local plagiarism utilities (n-gram overlap) for pairwise checks.
- Citation/reference extractor heuristics for parsed PDF text.
- Simple Vue 3 + TypeScript editor component (Quill) with phrase insertion and summarization button.
- Tauri backend stubs (Rust) with basic command handlers to save PDFs and a place to add rusqlite DB logic.
- Documentation and an implementation plan for moving forward with Tauri + sqlite storage.

How to test locally
1. git checkout feature/toshu-research-suite
2. Install frontend deps (pnpm/npm/yarn) and the Tauri toolchain (Rust + cargo)
3. Run the app in dev (typical): pnpm tauri dev (or npm run tauri dev)
4. Open Editor, paste/write text and click Summarize / Extract Citations / Check Plagiarism. Use Import PDF to exercise the import flow.

Next steps (recommended)
- Wire rusqlite DB in Tauri commands and implement list/get document endpoints
- Implement frontend PDF text extraction (pdfjs-dist) and send text to Rust
- Add uploader/library UI for stored PDFs
- Add tests and CI for Tauri commands
- (Optional) Add local encryption (Argon2 + AES-GCM) for stored PDFs

Checklist
- [ ] Add plugin: offline summarizer
- [ ] Add plugin: local plagiarism utilities
- [ ] Add plugin: offline PDF text + citation extractor
- [ ] Add UI: Quill-based editor with phrase insertion and summarization button
- [ ] Add docs & Tauri integration notes
