import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: 'expo.out', duration: 1.1 });

export { gsap, ScrollTrigger };

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---- intro gate: hero waits for the loader (or runs immediately) ---- */
let introDone = false;
const introQueue: Array<() => void> = [];
export function markIntroDone() {
  if (introDone) return;
  introDone = true;
  introQueue.splice(0).forEach((fn) => fn());
}
export function onIntro(fn: () => void) {
  if (introDone) fn();
  else introQueue.push(fn);
}

/**
 * Declarative scroll reveals. Any element inside `scope` with a
 * `data-reveal` attribute animates once when it enters the viewport:
 *   up      — rise + fade
 *   chars   — masked character rise (use with <Split>)
 *   stagger — direct children rise in sequence
 *   clip    — media wipes open, inner image settles from a slight zoom
 *   line    — horizontal rule draws from the left
 * Nothing is hidden until JS runs, and nothing animates under reduced motion.
 */
export function useReveals(scope: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useLayoutEffect(() => {
    if (!scope.current || reducedMotion()) return;
    const ctx = gsap.context(() => {
      const st = (el: Element) => ({ trigger: el, start: 'top 90%', once: true });
      gsap.utils.toArray<HTMLElement>('[data-reveal="up"]').forEach((el) => {
        gsap.from(el, { y: 48, autoAlpha: 0, duration: 1.2, delay: Number(el.dataset.delay ?? 0), scrollTrigger: st(el) });
      });
      gsap.utils.toArray<HTMLElement>('[data-reveal="chars"]').forEach((el) => {
        gsap.from(el.querySelectorAll('.c'), {
          yPercent: 115,
          duration: 1.1,
          stagger: 0.022,
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: st(el),
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-reveal="stagger"]').forEach((el) => {
        gsap.from(el.children, { y: 32, autoAlpha: 0, duration: 1, stagger: 0.07, scrollTrigger: st(el) });
      });
      gsap.utils.toArray<HTMLElement>('[data-reveal="clip"]').forEach((el) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
        tl.fromTo(el, { clipPath: 'inset(18% 12% 18% 12% round 24px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.4, ease: 'expo.inOut', clearProps: 'clipPath' });
        const inner = el.querySelector('[data-reveal-inner]');
        // explicit end value: never infer it from computed style, which a CSS
        // transform transition (or React's dev double-mount) can leave mid-way
        if (inner) tl.fromTo(inner, { scale: 1.18 }, { scale: 1, duration: 1.8, clearProps: 'transform' }, 0);
      });
      gsap.utils.toArray<HTMLElement>('[data-reveal="line"]').forEach((el) => {
        gsap.from(el, { scaleX: 0, transformOrigin: 'left center', duration: 1.6, ease: 'expo.inOut', scrollTrigger: st(el) });
      });
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        if (!finePointer()) return;
        const amt = Number(el.dataset.parallax) || 8;
        gsap.fromTo(
          el,
          { yPercent: -amt },
          { yPercent: amt, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      });
    }, scope);
    // fonts can shift layout after first paint — recompute trigger positions
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
