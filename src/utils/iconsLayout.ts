// utils/layout.ts
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ~137.5°

type Pos = { x: number; y: number };
type LayoutOpts = {
  safeRadius?: number; // fraction of card (normalized 0..1) you allow for icons
  jitter?: number; // small random wiggle (0..1, relative to safeRadius)
  minSeparation?: number; // target minimum distance between icons (normalized)
  iterations?: number; // how many repulsion passes
};

/**
 * Places N points evenly using a sunflower (phyllotaxis) pattern,
 * then nudges them apart a little so icons don't overlap.
 * All coordinates are centered and normalized to [-1, 1] where 1 ~= card radius.
 */
export const layoutIconsInHex = (n: number, opts: LayoutOpts = {}): Pos[] => {
  const safeRadius = opts.safeRadius ?? 0.82; // keep inside hex's inscribed circle
  const jitter = opts.jitter ?? 0.02;
  const minSep = opts.minSeparation ?? 0.18; // tweak per icon size
  const iterations = opts.iterations ?? 6;

  // 1) sunflower points within unit circle, scaled to safeRadius
  const pts: Pos[] = [];
  for (let k = 0; k < n; k++) {
    const r = Math.sqrt((k + 0.5) / n) * safeRadius;
    const a = k * GOLDEN_ANGLE;
    let x = r * Math.cos(a);
    let y = r * Math.sin(a);

    // tiny random jitter so it doesn't look too perfect
    x += (Math.random() * 2 - 1) * jitter;
    y += (Math.random() * 2 - 1) * jitter;

    // clamp back inside safe circle if jitter pushed it out
    const d = Math.hypot(x, y);
    if (d > safeRadius) {
      x = (x / d) * safeRadius;
      y = (y / d) * safeRadius;
    }

    pts.push({ x, y });
  }

  // 2) simple repulsion to increase spacing
  for (let it = 0; it < iterations; it++) {
    for (let i = 0; i < n; i++) {
      let dx = 0,
        dy = 0;
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        const vx = pts[i].x - pts[j].x;
        const vy = pts[i].y - pts[j].y;
        const dist = Math.hypot(vx, vy) || 1e-6;
        if (dist < minSep) {
          const force = (minSep - dist) / minSep; // 0..1
          dx += (vx / dist) * force * 0.02;
          dy += (vy / dist) * force * 0.02;
        }
      }
      // apply
      pts[i].x += dx;
      pts[i].y += dy;

      // clamp back inside safe circle each pass
      const d = Math.hypot(pts[i].x, pts[i].y);
      if (d > safeRadius) {
        pts[i].x = (pts[i].x / d) * safeRadius;
        pts[i].y = (pts[i].y / d) * safeRadius;
      }
    }
  }

  return pts;
};
