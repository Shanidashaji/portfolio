import { useEffect, useRef } from 'react';
import { finePointer, reducedMotion } from '../lib/motion';

/**
 * Dot lattice behind the hero. Dots near the pointer lift toward it and
 * light up in the banner gradient. The loop only runs while the pointer is moving and
 * the hero is on screen; at rest it is a single static draw.
 */
export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const interactive = finePointer() && !reducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let gap = 30;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let raf = 0;
    let visible = true;
    let lastMove = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      gap = w < 640 ? 24 : 30;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    // banner palette across the width: peach → rose → mauve → periwinkle
    const stops = [
      [255, 186, 180],
      [245, 145, 168],
      [198, 156, 185],
      [143, 166, 216],
    ];
    const tint = (t: number) => {
      const f = Math.min(Math.max(t, 0), 0.999) * (stops.length - 1);
      const i = Math.floor(f);
      const k = f - i;
      return stops[i].map((c, n) => Math.round(c + (stops[i + 1][n] - c) * k)).join(',');
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const R = 180;
      const ox = (w % gap) / 2;
      const oy = (h % gap) / 2;
      for (let y = oy; y <= h; y += gap) {
        for (let x = ox; x <= w; x += gap) {
          const dx = pointer.x - x;
          const dy = pointer.y - y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const k = d < R ? 1 - d / R : 0;
          const e = k * k;
          const px = x + dx * e * 0.22;
          const py = y + dy * e * 0.22;
          if (e > 0.02) {
            ctx.fillStyle = `rgba(${tint(px / w)},${0.3 + e * 0.7})`;
            ctx.beginPath();
            ctx.arc(px, py, 1 + e * 1.8, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = 'rgba(242,237,240,0.13)';
            ctx.fillRect(px - 0.6, py - 0.6, 1.2, 1.2);
          }
        }
      }
    };

    const tick = (t: number) => {
      pointer.x += (pointer.tx - pointer.x) * 0.14;
      pointer.y += (pointer.ty - pointer.y) * 0.14;
      draw();
      const settled = Math.abs(pointer.tx - pointer.x) < 0.5 && Math.abs(pointer.ty - pointer.y) < 0.5;
      raf = visible && (!settled || t - lastMove < 120) ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
      if (pointer.x < -999) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      lastMove = performance.now();
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      pointer.tx = pointer.ty = -9999;
      pointer.x = pointer.y = -9999;
      draw();
    };

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
    });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const host = canvas.parentElement!;
    if (interactive) {
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} className="hero__field" aria-hidden="true" />;
}
