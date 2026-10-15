import { useMemo, useState } from 'react';
import { MEMBERS, RESEARCH_AREAS, SITE, TODO } from './data/site';
import { PI_AUTHOR, PUBLICATIONS, citation, doiUrl, filterPubs, groupByYear, pubmedUrl } from './lib/pubs';

const LOGO = {
  med: `${import.meta.env.BASE_URL}logos/ku-medicine.png`,
  ku: `${import.meta.env.BASE_URL}logos/korea-university.png`,
};

const isTodo = (s?: string) => s === TODO;
const Todo = () => <span className="todo">TODO</span>;
const Val = ({ v }: { v: string }) => (isTodo(v) ? <Todo /> : <>{v}</>);

export default function App() {
  const [q, setQ] = useState('');
  const groups = useMemo(() => groupByYear(filterPubs(PUBLICATIONS, q)), [q]);
  const count = groups.reduce((n, [, l]) => n + l.length, 0);

  return (
    <>
      <header className="top">
        <div className="wrap bar">
          <a className="brand" href="#home">
            <img src={LOGO.med} alt="KU Medicine" height={34} />
            <span>{SITE.labName}</span>
          </a>
          <nav>
            <a href="#research">Research</a>
            <a href="#members">Members</a>
            <a href="#publications">Publications</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main className="wrap">
        <section id="home" className="hero">
          <div className="hero-text">
          <h1>{SITE.labName}</h1>
          <p className="inst">{SITE.institution}</p>
          <p className="lead"><Val v={SITE.tagline} /></p>
          <p><Val v={SITE.about} /></p>
          <p className="links">
            <a href={SITE.links.scholar} target="_blank" rel="noreferrer">Google Scholar</a>
            <a href={SITE.links.pure} target="_blank" rel="noreferrer">Korea University Pure</a>
          </p>
          </div>
          <div className="crests" aria-hidden="false">
            <img src={LOGO.med} alt="Korea University College of Medicine (KU Medicine) logo" className="crest-med" />
            <img src={LOGO.ku} alt="Korea University logo: Libertas, Justitia, Veritas" className="crest-ku" />
          </div>
        </section>

        <section id="research">
          <h2>Research</h2>
          <div className="grid">
            {RESEARCH_AREAS.map((r) => (
              <article className="card" key={r.title}>
                <h3>{r.title}</h3>
                <p><Val v={r.description} /></p>
              </article>
            ))}
          </div>
        </section>

        <section id="members">
          <h2>Members</h2>
          <div className="grid">
            {MEMBERS.map((m) => (
              <article className="card" key={m.name}>
                <h3>{m.name}{m.degree ? `, ${m.degree}` : ''}</h3>
                <p className="role"><Val v={m.role} /></p>
              </article>
            ))}
          </div>
        </section>

        <section id="publications">
          <h2>Publications <small>({count})</small></h2>
          <input className="search" type="search" placeholder="Search title, journal, author, year" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search publications" />
          {groups.length === 0 && <p>No matching publications.</p>}
          {groups.map(([year, list]) => (
            <div key={year}>
              <h3 className="year">{year}</h3>
              <ol className="pubs">
                {list.map((p) => (
                  <li key={p.pmid}>
                    <div className="ptitle">{p.title}</div>
                    <div className="authors">
                      {p.authors.map((a, i) => (
                        <span key={i}>{a === PI_AUTHOR ? <b>{a}</b> : a}{i < p.authors.length - 1 ? ', ' : ''}</span>
                      ))}
                    </div>
                    <div className="cite">{citation(p)}</div>
                    <div className="plinks">
                      {doiUrl(p) && <a href={doiUrl(p)!} target="_blank" rel="noreferrer">DOI</a>}
                      <a href={pubmedUrl(p)} target="_blank" rel="noreferrer">PubMed</a>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
          <p className="src">
            Source: <a href="https://pubmed.ncbi.nlm.nih.gov/?term=Yun%2C+Seung+gyu&amp;sort=date&amp;size=100" target="_blank" rel="noreferrer">PubMed</a> author search
            (Yun, Seung gyu). Conference abstracts and items not indexed in PubMed are not listed; see Google Scholar. TODO(verify): confirm that every item is the PI's own work.
          </p>
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <dl>
            <dt>Email</dt><dd><Val v={SITE.contact.email} /></dd>
            <dt>Address</dt><dd><Val v={SITE.contact.address} /></dd>
            <dt>Phone</dt><dd><Val v={SITE.contact.phone} /></dd>
          </dl>
        </section>
      </main>
      <footer className="wrap foot">
        <img src={LOGO.med} alt="" height={44} />
        <img src={LOGO.ku} alt="" height={44} />
        <div>
          <div>© {new Date().getFullYear()} {SITE.labName} · {SITE.institution}</div>
          <div className="tm">The Korea University and KU Medicine logos are trademarks of Korea University. This is a laboratory page, not an official university site.</div>
        </div>
      </footer>
    </>
  );
}
