import { useState } from 'react';
import { archive, projects } from '../data/projects';
import { Arrow, SecHead, Split } from '../components/Bits';
import { ProjectMedia, Tilt } from '../components/ProjectMedia';
import { TLink } from '../lib/transition';

export function Work() {
  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="shell">
        <SecHead
          id="work-title"
          index="02"
          label="Selected work"
          title="Work"
          aside="Seven products I build and contribute to at D4DX Innovations, followed by the projects I built while studying."
        />

        <nav className="work__index" aria-label="Projects">
          <ol data-reveal="stagger">
            {projects.map((p) => (
              <li key={p.slug}>
                <a href={`#p-${p.slug}`}>
                  <span className="mono accent">{p.index}</span>
                  <span>{p.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="work__list">
          {projects.map((p, i) => (
            <article id={`p-${p.slug}`} key={p.slug} className={`feat ${i % 2 ? 'feat--flip' : ''}`} aria-labelledby={`t-${p.slug}`}>
              <div className="feat__num display" aria-hidden="true" data-parallax="14">
                {p.index}
              </div>

              <TLink to={`/work/${p.slug}`} className="feat__media" data-cursor="Open" aria-label={`Open the ${p.name} case study`} tabIndex={-1}>
                <Tilt>
                  <div data-reveal="clip">
                    <ProjectMedia project={p} />
                  </div>
                </Tilt>
              </TLink>

              <div className="feat__text">
                <p className="feat__meta mono" data-reveal="up">
                  <span>{p.kind}</span>
                  <span className="muted">{p.context}</span>
                </p>
                <h3 id={`t-${p.slug}`} className="feat__title">
                  <TLink to={`/work/${p.slug}`} className="feat__title-link">
                    <Split text={p.name} data-reveal="chars" />
                  </TLink>
                </h3>
                <p className="feat__tagline" data-reveal="up">
                  {p.tagline}
                </p>
                <ul className="tags" data-reveal="stagger" aria-label="Technologies">
                  {p.stack.map((s) => (
                    <li className="tag" key={s}>
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="feat__role mono" data-reveal="up">
                  <span className="muted">Role —</span> {p.role}
                </p>
                <div data-reveal="up">
                  <TLink to={`/work/${p.slug}`} className="btn">
                    Case study <Arrow dir="right" />
                  </TLink>
                </div>
              </div>
            </article>
          ))}
        </div>

        <Archive />
      </div>
    </section>
  );
}

function Archive() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="archive">
      <header className="archive__head">
        <Split as="h3" className="archive__title display" text="Built while studying" data-reveal="chars" />
        <p className="mono muted" data-reveal="up">
          {String(archive.length).padStart(2, '0')} projects · academic &amp; personal
        </p>
      </header>
      <ul className="archive__list">
        {archive.map((a, i) => {
          const isOpen = open === i;
          return (
            <li key={a.name} className={`arow ${isOpen ? 'is-open' : ''}`} data-reveal="up">
              <button className="arow__btn" aria-expanded={isOpen} aria-controls={`arow-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                <span className="arow__n mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="arow__name">{a.name}</span>
                <span className="arow__kind">{a.kind}</span>
                <span className="arow__tag mono">{a.tag}</span>
                <span className="arow__plus" aria-hidden="true" />
              </button>
              <div id={`arow-${i}`} className="arow__panel" role="region" aria-label={a.name}>
                <div className="arow__panel-in">
                  {a.shot ? (
                    <img className="arow__shot" src={a.shot.src} srcSet={a.shot.srcSet} sizes="(max-width: 760px) 92vw, 420px" width={1440} height={1000} alt={a.shot.alt} loading="lazy" decoding="async" />
                  ) : null}
                  <p>{a.summary}</p>
                  <ul className="tags" aria-label="Technologies">
                    {a.stack.map((s) => (
                      <li className="tag" key={s}>
                        {s}
                      </li>
                    ))}
                  </ul>
                  {a.source ? (
                    <a className="btn" href={a.source} target="_blank" rel="noopener noreferrer">
                      Source on GitHub <Arrow />
                    </a>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
