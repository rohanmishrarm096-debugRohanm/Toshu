Implementation Plan - Toshu Offline Research Suite

Goals
- Provide offline-capable research utilities integrated in a Tauri app.
- Offer clear interfaces so advanced/ML implementations can be plugged in later.

Milestones
1. Stubs & Architecture (current)
   - Provide minimal working implementations for summarizer, plagiarism, citation extractor, and editor.
   - Integrate with Tauri command handlers.
2. Local Indexing & Storage
   - Add local document store (sqlite/rocksdb) and indexing for search & plagiarism.
3. Improved Summarization
   - Replace extractive heuristics with a local model or on-device lightweight transformer.
4. Plagiarism Engine
   - Improve comparison algorithms (w-shingling, MinHash, local LSH index).
5. Citation Parsing & Linking
   - Expand citation recognition to multiple styles; add local bibliographic export.
6. UX & Offline Sync
   - Improve Editor UX, add export/import, optional sync when online.

Testing
- Unit tests for each plugin.
- Integration tests exercising Tauri command round-trip.

Notes
- Keep all heavy processing optional so the app remains responsive.
- Carefully manage file system and privacy when storing local document data.
