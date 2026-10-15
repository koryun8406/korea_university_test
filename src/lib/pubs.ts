import data from '../data/publications.json';

export interface Pub {
  pmid: string;
  doi: string | null;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume: string | null;
  issue: string | null;
  pages: string | null;
}

export const PUBLICATIONS = data as Pub[];
export const PI_AUTHOR = 'Yun SG';

export function filterPubs(pubs: Pub[], query: string): Pub[] {
  const q = query.trim().toLowerCase();
  if (!q) return pubs;
  return pubs.filter((p) => [p.title, p.journal, String(p.year), ...p.authors].some((s) => s.toLowerCase().includes(q)));
}

export function groupByYear(pubs: Pub[]): [number, Pub[]][] {
  const m = new Map<number, Pub[]>();
  for (const p of pubs) m.set(p.year, [...(m.get(p.year) ?? []), p]);
  return [...m.entries()].sort((a, b) => b[0] - a[0]);
}

export function citation(p: Pub): string {
  const vol = p.volume ? ` ${p.volume}${p.issue ? `(${p.issue})` : ''}` : '';
  return `${p.journal}. ${p.year};${vol.trim()}${p.pages ? `:${p.pages}` : ''}`.replace(';;', ';');
}

export const pubmedUrl = (p: Pub) => `https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/`;
export const doiUrl = (p: Pub) => (p.doi ? `https://doi.org/${p.doi}` : null);
