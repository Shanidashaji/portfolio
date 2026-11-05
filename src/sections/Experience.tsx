import { useLayoutEffect, useRef } from 'react';
import { certifications, profile, publication, timeline } from '../data/profile';
import { SecHead } from '../components/Bits';
import { gsap, reducedMotion } from '../lib/motion';

export function Experience() {
  const list = useRef<HTMLOListElement>(null);

  // the spine draws itself as you read down the log
  useLayoutEffect(() => {
    const el = list.current;
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.log__spine i',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } },
      );
      gsap.utils.toArray<HTMLElement>('.log__item').forEach((it) => {
        gsap.from(it.querySelector('.log__node'), {
          scale: 0,
          duration: 0.8,
          ease: 'back.out(3)',
          scrollTrigger: { trigger: it, start: 'top 70%', once: true },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section experience" aria-labelledby="exp-title">
      <div className="shell">
        <SecHead
          id="exp-title"
          index="04"
          label="Experience"
          title="The log"
          aside="Work and study, newest first."
        />

        <div className="exp__grid">
          <ol className="log" ref={list}>
            <span className="log__spine" aria-hidden="true">
              <i />
            </span>
            {timeline.map((t) => (
              <li key={t.title + t.org} className={`log__item log__item--${t.kind}`}>
                <span className="log__node" aria-hidden="true" />
                <p className="log__period mono" data-reveal="up">
                  {t.period}
                  <span className="log__kind">{t.kind === 'work' ? 'Work' : 'Study'}</span>
                </p>
                <div className="log__body" data-reveal="up">
                  <h3 className="log__title">{t.title}</h3>
                  <p className="log__org">{t.org}</p>
                  {t.points.length ? (
                    <ul className="log__points">
                      {t.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>

          <aside className="exp__side">
            <div className="card" data-reveal="up">
              <h3 className="card__h mono">
                <span className="accent">◆</span> Publication
              </h3>
              <p className="card__title">“{publication.title}”</p>
              <p className="mono muted">
                {publication.venue} · {publication.date}
              </p>
            </div>
            <div className="card" data-reveal="up">
              <h3 className="card__h mono">
                <span className="accent">◆</span> Certifications
              </h3>
              <ul className="card__list">
                {certifications.map((c) => (
                  <li key={c.title}>
                    {c.title}
                    {c.org ? <span className="muted"> — {c.org}</span> : null}
                    {c.date ? <span className="mono muted"> · {c.date}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card" data-reveal="up">
              <h3 className="card__h mono">
                <span className="accent">◆</span> Languages
              </h3>
              <p>{profile.languages.join(' · ')}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
