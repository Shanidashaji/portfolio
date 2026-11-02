import { useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { skills } from '../data/skills';
import { SecHead } from '../components/Bits';
import { gsap, reducedMotion } from '../lib/motion';

const SIZE = 560;
const C = SIZE / 2;

/** Deterministic node layout: items on a ring, alternating radius so labels don't collide. */
function layout(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2 + (n % 2 ? 0 : Math.PI / n);
    const r = n <= 3 ? 170 : i % 2 ? 150 : 210;
    return { x: C + Math.cos(a) * r, y: C + Math.sin(a) * r, a };
  });
}

export function Skills() {
  const [sel, setSel] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const graph = useRef<SVGSVGElement>(null);
  const cluster = skills[sel];
  const nodes = layout(cluster.items.length);

  useLayoutEffect(() => {
    if (!graph.current || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.sk-edge', { strokeDashoffset: 260, duration: 1.1, stagger: 0.04, ease: 'expo.out' });
      gsap.from('.sk-node', { scale: 0, transformOrigin: 'center', svgOrigin: `${C} ${C}`, opacity: 0, duration: 0.9, stagger: 0.05, ease: 'expo.out' });
      gsap.from('.sk-core', { scale: 0.6, svgOrigin: `${C} ${C}`, duration: 0.8, ease: 'back.out(2)' });
      gsap.from('.skills__detail > *', { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.05, ease: 'expo.out' });
    }, graph.current.closest('.skills__stage') as Element);
    return () => ctx.revert();
  }, [sel]);

  const onKey = (e: KeyboardEvent) => {
    const k = e.key;
    let next = sel;
    if (k === 'ArrowDown' || k === 'ArrowRight') next = (sel + 1) % skills.length;
    else if (k === 'ArrowUp' || k === 'ArrowLeft') next = (sel - 1 + skills.length) % skills.length;
    else if (k === 'Home') next = 0;
    else if (k === 'End') next = skills.length - 1;
    else return;
    e.preventDefault();
    setSel(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="shell">
        <SecHead
          id="skills-title"
          index="03"
          label="Skills"
          title="Stack"
          aside="Grouped by what they do, and linked to the projects where I actually used them."
        />

        <div className="skills__grid">
          <div className="skills__tabs" role="tablist" aria-label="Skill categories" aria-orientation="vertical" onKeyDown={onKey} data-reveal="stagger">
            {skills.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={i === sel}
                aria-controls="skills-panel"
                tabIndex={i === sel ? 0 : -1}
                className={`sktab ${i === sel ? 'is-on' : ''}`}
                onClick={() => setSel(i)}
              >
                <span className="sktab__code mono">{s.code}</span>
                <span className="sktab__label">{s.label}</span>
                <span className="sktab__count mono">{String(s.items.length).padStart(2, '0')}</span>
              </button>
            ))}
          </div>

          <div className="skills__stage" id="skills-panel" role="tabpanel" aria-labelledby={`tab-${cluster.id}`}>
            <svg ref={graph} className="skills__graph" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true" key={cluster.id}>
              <circle className="sk-ring" cx={C} cy={C} r={150} />
              <circle className="sk-ring" cx={C} cy={C} r={210} />
              {nodes.map((n, i) => (
                <line key={`e${i}`} className="sk-edge" x1={C} y1={C} x2={n.x} y2={n.y} strokeDasharray="260" />
              ))}
              <g className="sk-core">
                <circle cx={C} cy={C} r={46} />
                <text x={C} y={C + 7} textAnchor="middle">
                  {cluster.code}
                </text>
              </g>
              {nodes.map((n, i) => {
                const right = Math.cos(n.a) >= -0.05;
                return (
                  <g className="sk-node" key={cluster.items[i].name}>
                    <circle cx={n.x} cy={n.y} r={6} />
                    <circle className="sk-halo" cx={n.x} cy={n.y} r={13} />
                    <text x={n.x + (right ? 20 : -20)} y={n.y + 5} textAnchor={right ? 'start' : 'end'}>
                      {cluster.items[i].name}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="skills__detail">
              <p className="skills__blurb">{cluster.blurb}</p>
              <ul className="skills__items">
                {cluster.items.map((it) => (
                  <li key={it.name}>
                    <span className="skills__name">{it.name}</span>
                    <span className="skills__used mono">{it.usedIn ? it.usedIn.join(' · ') : '—'}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="skills__all" data-reveal="up">
          <span className="mono accent">Full index —</span>{' '}
          {skills
            .flatMap((s) => s.items.map((i) => i.name))
            .join(', ')}
        </p>
      </div>
    </section>
  );
}
