import { describe, it, expect } from 'vitest';
import { PUBLICATIONS, filterPubs, groupByYear, citation, doiUrl, pubmedUrl, PI_AUTHOR } from '../lib/pubs';
import { MEMBERS, RESEARCH_AREAS } from '../data/site';

describe('publication data', () => {
  it('has 32 unique PMIDs', () => {
    expect(PUBLICATIONS).toHaveLength(32);
    expect(new Set(PUBLICATIONS.map((p) => p.pmid)).size).toBe(32);
  });
  it('every item has title, year, authors and a valid DOI when present', () => {
    for (const p of PUBLICATIONS) {
      expect(p.title.length).toBeGreaterThan(5);
      expect(p.year).toBeGreaterThanOrEqual(2014);
      expect(p.authors.length).toBeGreaterThan(0);
      if (p.doi) expect(p.doi).toMatch(/^10\.\d{4,9}\//);
    }
  });
  it('PI appears as an author on every item', () => {
    const missing = PUBLICATIONS.filter((p) => !p.authors.includes(PI_AUTHOR)).map((p) => p.pmid);
    expect(missing).toEqual([]);
  });
});

describe('helpers', () => {
  it('groups newest year first', () => {
    const years = groupByYear(PUBLICATIONS).map(([y]) => y);
    expect(years).toEqual([...years].sort((a, b) => b - a));
  });
  it('filters by journal/title/author/year, case-insensitive', () => {
    expect(filterPubs(PUBLICATIONS, 'ACTA TROP').length).toBeGreaterThan(0);
    expect(filterPubs(PUBLICATIONS, '2014').every((p) => p.year === 2014 || JSON.stringify(p).includes('2014'))).toBe(true);
    expect(filterPubs(PUBLICATIONS, 'zzzz-none')).toEqual([]);
    expect(filterPubs(PUBLICATIONS, '  ')).toHaveLength(32);
  });
  it('formats citation and links', () => {
    const p = PUBLICATIONS.find((x) => x.pmid === '25056333')!;
    expect(citation(p)).toBe('J Clin Microbiol. 2014;52(10):3784-3787');
    expect(doiUrl(p)).toBe('https://doi.org/10.1128/JCM.01797-14');
    expect(pubmedUrl(p)).toBe('https://pubmed.ncbi.nlm.nih.gov/25056333/');
  });
});

describe('site content', () => {
  it('has the four research areas and three members supplied by the PI', () => {
    expect(RESEARCH_AREAS.map((r) => r.title)).toEqual(['Organ on a chip', 'Hematologic malignancy', 'Clinical chemistry', 'Therapeutic drug monitoring']);
    expect(MEMBERS.map((m) => m.name)).toEqual(['Seung Gyu Yun', 'Jiyeon Kang', 'Jiyoon Song']);
  });
});
