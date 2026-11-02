import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { profile } from '../data/profile';
import { TLink, useGo } from '../lib/transition';
import { gsap, reducedMotion } from '../lib/motion';
import { Arrow } from './Bits';

export const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState('home');
  useEffect(() => {
    if (!enabled) return;
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
  return active;
}

export function Nav() {
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const active = useActiveSection(onHome);
  const go = useGo();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pill = useRef<HTMLUListElement>(null);
  const ind = useRef<HTMLSpanElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  // hide on scroll down, reveal on scroll up — keeps content clear on small screens
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 160 && y > last + 4 ? true : y < last - 4 ? false : (h) => h);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // sliding active indicator
  useLayoutEffect(() => {
    const ul = pill.current;
    const bar = ind.current;
    if (!ul || !bar) return;
    const place = () => {
      const a = ul.querySelector<HTMLElement>(`[data-id="${onHome ? active : 'work'}"]`);
      if (!a) return;
      gsap.to(bar, { x: a.offsetLeft, width: a.offsetWidth, duration: reducedMotion() ? 0 : 0.6, ease: 'expo.out' });
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [active, onHome]);

  // mobile menu: lock scroll, animate, close on Escape, return focus
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const m = menu.current;
    if (m && !reducedMotion()) {
      gsap.fromTo(m.querySelectorAll('.menu__link'), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.05, ease: 'expo.out' });
    }
    m?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const onLink = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    go(id === 'home' && onHome ? '/#home' : `/#${id}`);
  };

  return (
    <>
      <header className={`nav ${hidden && !open ? 'is-hidden' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav__inner">
          <TLink to="/" className="nav__brand" aria-label={`${profile.name} — home`}>
            <span className="nav__mark" aria-hidden="true">
              S<span className="accent">/</span>
            </span>
            <span className="nav__name mono">{profile.name}</span>
          </TLink>

          <nav aria-label="Primary" className="nav__pill-wrap">
            <ul className="nav__pill" ref={pill}>
              <span className="nav__ind" ref={ind} aria-hidden="true" />
              {SECTIONS.map((s) => {
                const isActive = onHome ? active === s.id : s.id === 'work' && pathname.startsWith('/work');
                return (
                  <li key={s.id} data-id={s.id}>
                    <a href={href(s.id)} onClick={onLink(s.id)} aria-current={isActive ? 'true' : undefined} className={isActive ? 'is-active' : ''}>
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="nav__right">
            <a className="nav__cv mono" href={profile.resume} target="_blank" rel="noopener">
              Résumé <Arrow />
            </a>
            <button
              ref={toggle}
              className={`nav__toggle ${open ? 'is-open' : ''}`}
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="menu" className={`menu ${open ? 'is-open' : ''}`} ref={menu} hidden={!open} role="dialog" aria-modal="true" aria-label="Menu">
        <nav aria-label="Mobile">
          <ol className="menu__list">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a href={href(s.id)} onClick={onLink(s.id)} className="menu__a">
                  <span className="menu__link">
                    <span className="mono accent">0{i}</span>
                    {s.label}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu__foot mono">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="menu__links">
            {profile.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} <Arrow />
              </a>
            ))}
            <a href={profile.resume} target="_blank" rel="noopener">
              Résumé <Arrow />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
