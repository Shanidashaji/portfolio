import { useEffect } from 'react';
import { projects } from '../data/projects';
import { profile } from '../data/profile';
import { Arrow, Ticks } from '../components/Bits';
import { TLink } from '../lib/transition';

export default function NotFound() {
  useEffect(() => {
    document.title = `Page not found — ${profile.name}`;
  }, []);
  return (
    <main id="main" className="nf shell">
      <div className="nf__frame">
        <Ticks />
        <p className="mono accent">Error 404 · route not found</p>
        <h1 className="nf__code display" aria-label="404">
          4<span className="accent">0</span>4
        </h1>
        <p className="nf__msg">
          This page doesn’t exist — it may have moved, or the link has a typo. Here’s where you can go instead.
        </p>
        <div className="nf__actions">
          <TLink to="/" className="btn btn--accent">
            <Arrow dir="left" /> Back home
          </TLink>
          <TLink to="/#work" className="btn">
            See the work
          </TLink>
        </div>
        <ul className="nf__list mono">
          {projects.map((p) => (
            <li key={p.slug}>
              <TLink to={`/work/${p.slug}`} className="link-u">
                {p.index} — {p.name}
              </TLink>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
