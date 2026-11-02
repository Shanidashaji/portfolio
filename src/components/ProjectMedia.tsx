import { useEffect, useRef, type CSSProperties } from 'react';
import type { Project } from '../data/projects';
import { ElectionPreview, MalarvadiPreview, QscPreview, QspotPreview } from './previews/Previews';
import { finePointer, gsap, reducedMotion } from '../lib/motion';

const MOCKS = {
  qspot: QspotPreview,
  election: ElectionPreview,
  malarvadi: MalarvadiPreview,
  qsc: QscPreview,
} as const;

/** Browser-framed preview: real screenshots when we have them, a labelled illustration otherwise. */
export function ProjectMedia({ project, eager = false, label = true }: { project: Project; eager?: boolean; label?: boolean }) {
  const desk = project.shots?.find((s) => s.device === 'desktop');
  const mob = project.shots?.find((s) => s.device === 'mobile');
  const Mock = project.preview in MOCKS ? MOCKS[project.preview as keyof typeof MOCKS] : null;

  return (
    <div className={`media ${mob ? 'media--phone' : ''}`} style={{ '--pa': project.accent } as CSSProperties}>
      <div className="media__browser">
        <div className="media__chrome" aria-hidden="true">
          <i />
          <i />
          <i />
          <span className="mono">{project.name}</span>
        </div>
        <div className="media__view">
          {desk ? (
            <img
              data-reveal-inner
              src={desk.src}
              srcSet={desk.srcSet}
              sizes="(max-width: 900px) 92vw, 60vw"
              width={desk.w}
              height={desk.h}
              alt={desk.alt}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
            />
          ) : Mock ? (
            <div data-reveal-inner className="media__mock" role="img" aria-label={`Illustrative interface for ${project.name}: ${project.kind}`}>
              <Mock />
            </div>
          ) : null}
        </div>
        {label ? (
          <span className="media__badge mono">{project.shots ? 'Screenshot' : 'Illustration · not a screenshot'}</span>
        ) : null}
      </div>
      {mob ? (
        <div className="media__phone">
          <img src={mob.src} width={mob.w} height={mob.h} alt={mob.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        </div>
      ) : null}
    </div>
  );
}

/** Gentle 3D tilt on mouse devices only. */
export function Tilt({ children, className = '', max = 5 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || reducedMotion()) return;
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3' });
    gsap.set(el, { transformPerspective: 1400 });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * max * 2);
      rx(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [max]);
  return (
    <div ref={ref} className={`tilt ${className}`}>
      {children}
    </div>
  );
}
