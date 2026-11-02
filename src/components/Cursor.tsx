import { useEffect, useRef, useState } from 'react';
import { finePointer, gsap, reducedMotion } from '../lib/motion';

/**
 * A trailing ring that complements (never replaces) the system cursor.
 * Grows over interactive elements and shows a label from `data-cursor`.
 * Mouse-only; disabled for touch and reduced motion.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const [enabled] = useState(() => finePointer() && !reducedMotion());

  useEffect(() => {
    const el = ring.current;
    if (!enabled || !el) return;
    const label = el.querySelector('span')!;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' });
    let shown = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        el.classList.add('is-on');
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
      const t = (e.target as Element).closest?.('a, button, [data-cursor], [role="tab"]') as HTMLElement | null;
      const text = t?.dataset.cursor ?? t?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? '';
      el.classList.toggle('is-hover', !!t);
      el.classList.toggle('is-label', !!text);
      label.textContent = text;
    };
    const onLeave = () => {
      el.classList.remove('is-on');
      shown = false;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div className="cursor" ref={ring} aria-hidden="true">
      <span />
    </div>
  );
}
