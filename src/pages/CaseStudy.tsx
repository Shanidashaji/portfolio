import { useEffect, useRef, type CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import { getProject, projects } from '../data/projects';
import { profile } from '../data/profile';
import { Arrow, Split, Ticks } from '../components/Bits';
import { ProjectMedia, Tilt } from '../components/ProjectMedia';
import { TLink } from '../lib/transition';
import { useReveals } from '../lib/motion';
import NotFound from './NotFound';

export default function CaseStudy() {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  const ref = useRef<HTMLElement>(null);
  useReveals(ref, [slug]);

  useEffect(() => {
    if (project) document.title = `${project.name} — ${profile.name}`;
  }, [project]);

  if (!project) return <NotFound />;

  const i = projects.indexOf(project);
  const next = projects[(i + 1) % projects.length];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const extraShots = project.shots?.slice(2) ?? [];

  const meta = [
    ['Type', project.kind],
    ['Context', project.context],
    ['Role', project.role],
    ['When', project.period],
  ];

  return (
    <main id="main" ref={ref} className="case" style={{ '--pa': project.accent } as CSSProperties} key={project.slug}>
      <header className="case__hero shell">
        <div className="case__top mono">
          <TLink to={`/#p-${project.slug}`} className="link-u">
            <Arrow dir="left" /> All work
          </TLink>
          <span className="muted">
            Case {project.index} / {String(projects.length).padStart(2, '0')}
          </span>
        </div>
        <p className="case__kind mono" data-reveal="up">
          <span className="case__swatch" aria-hidden="true" /> {project.kind}
        </p>
        <h1 className="case__title display">
          <Split text={project.name} data-reveal="chars" />
        </h1>
        <p className="case__tagline" data-reveal="up" data-delay="0.15">
          {project.tagline}
        </p>

        <dl className="case__meta" data-reveal="stagger">
          {meta.map(([k, v]) => (
            <div key={k}>
              <dt className="mono muted">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
          <div>
            <dt className="mono muted">Links</dt>
            <dd>
              {project.live || project.source ? (
                <span className="case__links">
                  {project.live ? (
                    <a className="link-u" href={project.live} target="_blank" rel="noopener noreferrer">
                      Live site <Arrow />
                    </a>
                  ) : null}
                  {project.source ? (
                    <a className="link-u" href={project.source} target="_blank" rel="noopener noreferrer">
                      Source <Arrow />
                    </a>
                  ) : null}
                </span>
              ) : (
                <span className="muted">{project.linkNote}</span>
              )}
            </dd>
          </div>
        </dl>
      </header>

      <div className="case__stage shell">
        <Ticks />
        <Tilt max={3}>
          <div data-reveal="clip">
            <ProjectMedia project={project} eager />
          </div>
        </Tilt>
      </div>

      <div className="case__body shell">
        <section className="case__block" aria-labelledby="c-product">
          <h2 id="c-product" className="case__h mono">
            <span className="accent">01</span> The product
          </h2>
          <p className="case__lead" data-reveal="up">
            {project.product}
          </p>
        </section>

        <section className="case__block" aria-labelledby="c-role">
          <h2 id="c-role" className="case__h mono">
            <span className="accent">02</span> My contribution
          </h2>
          <ol className="case__contrib">
            {project.contribution.map((c, n) => (
              <li key={c} data-reveal="up">
                <span className="mono muted">{String(n + 1).padStart(2, '0')}</span>
                <p>{c}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="case__block" aria-labelledby="c-feat">
          <h2 id="c-feat" className="case__h mono">
            <span className="accent">03</span> What it does
          </h2>
          <ul className="case__features" data-reveal="stagger">
            {project.features.map((f) => (
              <li key={f}>
                <span className="case__tick" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="case__block" aria-labelledby="c-stack">
          <h2 id="c-stack" className="case__h mono">
            <span className="accent">04</span> Stack
          </h2>
          <div>
            <ul className="tags case__tags" data-reveal="stagger">
              {project.stack.map((s) => (
                <li className="tag" key={s}>
                  {s}
                </li>
              ))}
            </ul>
            {project.notes?.map((n) => (
              <p key={n} className="case__note" data-reveal="up">
                {n}
              </p>
            ))}
          </div>
        </section>

        {extraShots.length ? (
          <section className="case__block case__block--wide" aria-labelledby="c-more">
            <h2 id="c-more" className="case__h mono">
              <span className="accent">05</span> Also in this project
            </h2>
            <div className={`case__gallery ${extraShots.every((x) => x.device === 'desktop') ? 'case__gallery--desk' : ''}`}>
              {extraShots.map((s) => (
                <figure key={s.src} className={`case__shot case__shot--${s.device}`} data-reveal="clip">
                  <img data-reveal-inner src={s.src} srcSet={s.srcSet} sizes="(max-width: 900px) 92vw, 60vw" width={s.w} height={s.h} alt={s.alt} loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
            {project.galleryNote ? <p className="case__note mono muted">{project.galleryNote}</p> : null}
          </section>
        ) : null}
      </div>

      <nav className="case__next" aria-label="More projects">
        <TLink to={`/work/${next.slug}`} className="case__next-link shell" data-cursor="Next">
          <span className="mono muted">Next project — {next.index}</span>
          <span className="case__next-name display">
            {next.name} <Arrow dir="right" />
          </span>
          <span className="case__next-kind">{next.tagline}</span>
        </TLink>
        <div className="case__pager shell mono">
          <TLink to={`/work/${prev.slug}`} className="link-u">
            <Arrow dir="left" /> {prev.name}
          </TLink>
          <TLink to="/#contact" className="link-u">
            Get in touch <Arrow dir="right" />
          </TLink>
        </div>
      </nav>

      <footer className="footer shell">
        <span className="mono muted">© 2026 {profile.name}</span>
        <a className="mono link-u" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </footer>
    </main>
  );
}
