// Heuristic citation extractor
// Returns array of detected citation strings and basic parsed metadata where possible.

export type Citation = {
  raw: string;
  type?: 'apa' | 'mla' | 'ieee' | 'unknown';
  year?: string;
  authors?: string[];
  title?: string;
};

export function extractCitations(text: string): Citation[] {
  if (!text) return [];
  const results: Citation[] = [];

  // Very naive: look for bracketed citations like [1], (Smith, 2020), or numeric lists.
  const bracketRegex = /\[(\d+)\]/g;
  let m;
  while ((m = bracketRegex.exec(text)) !== null) {
    results.push({ raw: m[0], type: 'unknown' });
  }

  const parenAuthorYear = /\(([A-Z][A-Za-z\-]+(?:,?\s+[A-Z][A-Za-z\-]+)*),?\s*(\d{4})\)/g;
  while ((m = parenAuthorYear.exec(text)) !== null) {
    results.push({ raw: m[0], type: 'apa', year: m[2], authors: [m[1]] });
  }

  // Heuristic for "Author. (Year). Title."
  const sentences = text.split(/(?<=[.!?])\s+/);
  for (const s of sentences) {
    const m2 = s.match(/^([A-Z][A-Za-z\-]+(?:\s+[A-Z][A-Za-z\-]+)*)(?:\.|,)\s*\((\d{4})\)\.\s*(.+)$/);
    if (m2) {
      results.push({ raw: s.trim(), type: 'apa', authors: [m2[1]], year: m2[2], title: m2[3] });
    }
  }

  return results;
}
