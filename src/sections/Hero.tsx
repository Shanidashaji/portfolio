import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import { profile } from '../data/profile';
import { HeroField } from '../components/HeroField';
import { Arrow, LocalTime, StatusChip, Ticks } from '../components/Bits';
import { finePointer, gsap, onIntro, reducedMotion } from '../lib/motion';

const NAME = profile.firstName.toUpperCase().split('');
const HEADLINE = [['I build digital'], ['experiences that'], ['think, move', '& matter.']];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);

  // entrance choreography
  useLayoutEffect(() => {
    if (reducedMotion() || !root.current) return;
    let alive = true;
    const q = gsap.utils.selector(root);
    const ctx = gsap.context(() => {
      gsap.set(q('.hero__char-in'), { yPercent: 108 });
      gsap.set(q('.hero__line-in'), { yPercent: 110 });
      gsap.set(q('[data-hero-fade]'), { autoAlpha: 0, y: 16 });
      gsap.set(q('.hero__rule'), { scaleX: 0 });
    }, root);
    onIntro(() => {
      if (!alive) return;
      ctx.add(() => {
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .to(q('.hero__char-in'), { yPercent: 0, duration: 1.5, stagger: 0.06 }, 0)
          .to(q('.hero__rule'), { scaleX: 1, duration: 1.6, ease: 'expo.inOut' }, 0.1)
          .to(q('.hero__line-in'), { yPercent: 0, duration: 1.3, stagger: 0.09 }, 0.35)
          .to(q('[data-hero-fade]'), { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.06 }, 0.6);
      });
    });
    return () => {
      alive = false;
      ctx.revert();
    };
  }, []);

  // signature interaction: letters thin out around the pointer
  useLayoutEffect(() => {
    const host = root.current;
    const wrap = nameRef.current;
    if (!host || !wrap || !finePointer() || reducedMotion()) return;
    const chars = Array.from(wrap.querySelectorAll<HTMLElement>('.hero__char'));
    const setters = chars.map((c) => gsap.quickTo(c, '--w', { duration: 0.7, ease: 'power3.out' }));

    // lock each slot to its heaviest width so weight changes never reflow
    const lock = () => {
      chars.forEach((c) => (c.style.width = ''));
      chars.forEach((c) => (c.style.width = `${c.getBoundingClientRect().width}px`));
    };
    document.fonts?.ready.then(lock);
    const ro = new ResizeObserver(lock);
    ro.observe(wrap);

    const onMove = (e: PointerEvent) => {
      chars.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy * 0.8);
        const k = Math.max(0, 1 - d / (r.height * 1.3));
        setters[i](800 - 580 * k * k);
      });
    };
    const onLeave = () => setters.forEach((s) => s(800));
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    return () => {
      ro.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section id="home" className="hero" ref={root} aria-labelledby="hero-title">
      <div className="hero__aurora" aria-hidden="true" />
      <HeroField />
      <div className="hero__frame shell">
        <Ticks />
        <div className="hero__meta mono">
          <span data-hero-fade>
            <span className="accent">●</span> Portfolio / 2026
          </span>
          <span data-hero-fade className="hero__meta-mid">
            {profile.title} — D4DX Innovations
          </span>
          <span data-hero-fade>
            {profile.location} · <LocalTime />
          </span>
        </div>

        <h1 id="hero-title" className="hero__title">
          <span className="sr-only">
            {profile.name}, {profile.role}
          </span>
          <span className="hero__name" ref={nameRef} aria-hidden="true">
            {NAME.map((ch, i) => (
              <span className="hero__char" key={i} style={{ '--i': i } as CSSProperties}>
                <span className="hero__char-in">{ch}</span>
              </span>
            ))}
          </span>
          <span className="hero__surname" aria-hidden="true">
            <span className="hero__line">
              <span className="hero__line-in">/{profile.lastName.toUpperCase()}</span>
            </span>
            <span className="hero__line mono hero__role">
              <span className="hero__line-in">{profile.role}</span>
            </span>
          </span>
        </h1>

        <span className="hero__rule" aria-hidden="true" />

        <div className="hero__grid">
          <p className="hero__headline display">
            {HEADLINE.map((parts, i) => (
              <span className="hero__line" key={i}>
                <span className="hero__line-in">
                  {parts.map((p, j) => (
                    <span key={j} className={i === 2 ? (j === 1 ? 'grad-text' : '') : ''}>
                      {j > 0 ? ' ' : ''}
                      {p}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </p>

          <div className="hero__side">
            <p className="hero__intro" data-hero-fade>
              {profile.intro}
            </p>
            <div className="hero__ctas" data-hero-fade>
              <a className="btn btn--accent" href="#work" data-cursor="Work">
                Selected work <Arrow dir="down" />
              </a>
              <a className="btn" href={profile.resume} target="_blank" rel="noopener" data-cursor="PDF">
                Résumé <Arrow />
              </a>
            </div>
            <ul className="hero__social mono" data-hero-fade aria-label="Profiles">
              {profile.links.map((l) => (
                <li key={l.label}>
                  <a className="link-u" href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label} <Arrow />
                  </a>
                </li>
              ))}
              <li>
                <a className="link-u" href={`mailto:${profile.email}`}>
                  Email <Arrow />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hero__foot">
          <div data-hero-fade>
            <StatusChip />
          </div>
          <a className="hero__scroll mono" href="#about" data-hero-fade aria-label="Scroll to About">
            <span>Scroll</span>
            <span className="hero__scroll-line" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
