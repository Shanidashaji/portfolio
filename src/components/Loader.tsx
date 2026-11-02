import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, markIntroDone, reducedMotion } from '../lib/motion';

const KEY = 'ss-booted';

/** ~1s boot sequence on the first visit of a session. Never blocks repeat visits or reduced motion. */
export function Loader() {
  const [show] = useState(() => {
    try {
      return !reducedMotion() && !sessionStorage.getItem(KEY);
    } catch {
      return false;
    }
  });
  const [gone, setGone] = useState(!show);
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!show) {
      markIntroDone();
      return;
    }
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* storage unavailable — loader just shows again next time */
    }
    const el = root.current!;
    const counter = { v: 0 };
    const finish = () => {
      markIntroDone();
      setGone(true);
    };
    const safety = window.setTimeout(finish, 3500);
    const tl = gsap
      .timeline({ onComplete: finish })
      .to(counter, {
        v: 100,
        duration: 1,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
        },
      })
      .to(el.querySelector('.loader__bar i'), { scaleX: 1, duration: 1, ease: 'power2.inOut' }, 0)
      .to(el.querySelectorAll('.loader__row'), { yPercent: -120, duration: 0.6, stagger: 0.04, ease: 'expo.in' }, '+=0.05')
      .add(markIntroDone, '-=0.05')
      .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '-=0.15');
    return () => {
      window.clearTimeout(safety);
      tl.kill();
    };
  }, [show]);

  if (gone) return null;
  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader__inner mono">
        <span className="loader__mask">
          <span className="loader__row">Shanida Shaji — Portfolio</span>
        </span>
        <span className="loader__mask">
          <span className="loader__row loader__num">
            <span ref={num}>000</span>
          </span>
        </span>
        <span className="loader__bar">
          <i />
        </span>
        <span className="loader__mask">
          <span className="loader__row muted">Compiling interface</span>
        </span>
      </div>
    </div>
  );
}
