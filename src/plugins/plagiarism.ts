// Simple plagiarism stub using n-gram overlap

export type PlagiarismResult = {
  similarity: number; // 0..1
  overlapCount: number;
  details?: { ngram: string; count: number }[];
};

function ngrams(text: string, n = 5) {
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const out: string[] = [];
  for (let i = 0; i + n <= tokens.length; i++) {
    out.push(tokens.slice(i, i + n).join(' '));
  }
  return out;
}

export function compareTexts(a: string, b: string): PlagiarismResult {
  const na = ngrams(a);
  const nb = new Set(ngrams(b));
  let overlap = 0;
  const detailsMap = new Map<string, number>();
  for (const ng of na) {
    if (nb.has(ng)) {
      overlap++;
      detailsMap.set(ng, (detailsMap.get(ng) || 0) + 1);
    }
  }
  const similarity = na.length === 0 ? 0 : overlap / na.length;
  const details = Array.from(detailsMap.entries()).slice(0, 50).map(([ng, count]) => ({ ngram: ng, count }));
  return { similarity, overlapCount: overlap, details };
}
