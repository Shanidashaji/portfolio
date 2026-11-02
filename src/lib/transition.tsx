import { createContext, useCallback, useContext, useRef, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap, reducedMotion } from './motion';

type Go = (to: string) => void;
const Ctx = createContext<Go>(() => {});

/** Curtain wipe between routes. Falls back to a plain navigation under reduced motion. */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const curtain = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const go = useCallback<Go>(
    (to) => {
      const [path, hash] = to.split('#');
      const samePage = (path || '/') === location.pathname;
      if (samePage && hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });
        history.replaceState(null, '', `#${hash}`);
        return;
      }
      const el = curtain.current;
      if (reducedMotion() || !el || busy.current) {
        navigate(to);
        if (!hash) window.scrollTo(0, 0);
        return;
      }
      busy.current = true;
      gsap
        .timeline({ onComplete: () => void (busy.current = false) })
        .set(el, { yPercent: 100, pointerEvents: 'auto', visibility: 'visible' })
        .to(el, { yPercent: 0, duration: 0.6, ease: 'expo.inOut' })
        .add(() => {
          navigate(to);
          if (!hash) window.scrollTo({ top: 0, behavior: 'instant' });
        })
        .to(el, { yPercent: -100, duration: 0.75, ease: 'expo.inOut', delay: 0.12 })
        .set(el, { pointerEvents: 'none', visibility: 'hidden' });
    },
    [navigate, location.pathname],
  );

  return (
    <Ctx.Provider value={go}>
      {children}
      <div className="curtain" ref={curtain} aria-hidden="true">
        <span className="curtain__label">Loading —</span>
      </div>
    </Ctx.Provider>
  );
}

export const useGo = () => useContext(Ctx);

/** Anchor that routes through the curtain, keeping native behaviour for new-tab clicks. */
export function TLink({ to, children, onClick, ...rest }: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const go = useGo();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    go(to);
  };
  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
