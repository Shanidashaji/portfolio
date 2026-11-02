import { useEffect, useState, type ElementType, type ReactNode } from 'react';
import { profile } from '../data/profile';
import { reducedMotion } from '../lib/motion';

/** Splits text into masked words/chars for reveal animations; screen readers get the plain string. */
export function Split({ text, as: Tag = 'span', className = '', ...rest }: { text: string; as?: ElementType; className?: string; [k: string]: unknown }) {
  const words = text.split(' ');
  return (
    <Tag className={`split ${className}`} aria-label={text} {...rest}>
      {words.map((w, i) => (
        <span className="w" aria-hidden="true" key={i}>
          {[...w].map((c, j) => (
            <span className="c" key={j}>
              {c}
            </span>
          ))}
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}

export function Ticks() {
  return (
    <span className="ticks" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export function LocalTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: profile.timezone, hour12: false }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = window.setInterval(() => setT(fmt()), 15000);
    return () => window.clearInterval(id);
  }, []);
  return <time>{t} IST</time>;
}

const STATES = ['Designing', 'Building', 'Deploying'] as const;

/** The small "system status" readout. Cycles slowly; static under reduced motion. */
export function StatusChip() {
  const [i, setI] = useState(1);
  useEffect(() => {
    if (reducedMotion()) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % STATES.length), 2800);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="status" role="img" aria-label="Status: designing, building, deploying">
      <span className="status__dot" aria-hidden="true" />
      <span className="status__track" aria-hidden="true">
        {STATES.map((s, n) => (
          <span key={s} className={`status__word ${n === i ? 'is-on' : ''}`}>
            {s}
          </span>
        ))}
      </span>
      <span className="status__bar" aria-hidden="true" key={i}>
        <i />
      </span>
      <span className="status__steps" aria-hidden="true">
        {STATES.map((s, n) => (
          <b key={s} className={n <= i ? 'is-on' : ''} />
        ))}
      </span>
    </div>
  );
}

export function SecHead({ index, label, title, aside, id }: { index: string; label: string; title: string; aside?: ReactNode; id?: string }) {
  return (
    <header className="sec-head">
      <p className="sec-head__idx mono">
        <b>{index}</b>
        <span>/</span>
        <span>{label}</span>
      </p>
      <Split as="h2" id={id} className="sec-head__title" text={title} data-reveal="chars" />
      {aside ? (
        <p className="sec-head__aside" data-reveal="up">
          {aside}
        </p>
      ) : null}
    </header>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = (
    <span className="marquee__row">
      {items.map((t) => (
        <span key={t} className="marquee__item">
          {t}
          <span className="marquee__sep" aria-hidden="true">
            ✳
          </span>
        </span>
      ))}
    </span>
  );
  return (
    <div className="marquee" aria-label={items.join(', ')} role="img">
      <div className="marquee__inner" aria-hidden="true">
        {row}
        {row}
      </div>
    </div>
  );
}

export const Arrow = ({ dir = 'ne' }: { dir?: 'ne' | 'down' | 'right' | 'left' }) => (
  <span className={`arrow arrow--${dir}`} aria-hidden="true">
    {dir === 'ne' ? '↗' : dir === 'down' ? '↓' : dir === 'left' ? '←' : '→'}
  </span>
);
