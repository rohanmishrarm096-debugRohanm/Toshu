// Basic extractive summarizer stub
// Exports a function summarize(text, maxSentences) that returns top sentences by heuristics.

export type SummaryResult = {
  sentences: string[];
};

export function summarize(text: string, maxSentences = 3): SummaryResult {
  if (!text) return { sentences: [] };
  // Naive split by sentence punctuation.
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(Boolean);

  // Score by sentence length and position as a simple heuristic.
  const scored = sentences.map((s, i) => ({ s, score: s.length * (1 + (1 / (i + 1))) }));
  scored.sort((a, b) => b.score - a.score);

  const chosen = scored.slice(0, Math.min(maxSentences, scored.length)).map(x => x.s);
  return { sentences: chosen };
}

// If using Tauri, expose commands in src-tauri/main.rs to call compiled WASM or invoke through frontend.
