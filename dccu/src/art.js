/* DCCU generative poster art. Deterministic: same project → same poster.
   Every image is procedural (gradients, shapes, particles) — no copyrighted logos or likenesses. */
(function (root) {
  const A = {};
  const TAU = Math.PI * 2;
  const MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

  function hash(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
    return h >>> 0;
  }
  function rng(seed) {
    let s = typeof seed === 'number' ? seed : hash(String(seed));
    return function () {
      s |= 0; s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hex(h) {
    h = h.replace('#', ''); if (h.length === 3) h = h.split('').map((x) => x + x).join('');
    const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgba(h, a) { const [r, g, b] = hex(h); return `rgba(${r},${g},${b},${a})`; }
  function mix(a, b, t) { const A1 = hex(a), B1 = hex(b); return '#' + A1.map((v, i) => Math.round(v + (B1[i] - v) * t).toString(16).padStart(2, '0')).join(''); }
  A.hash = hash; A.rng = rng; A.rgba = rgba; A.mix = mix;

  function glow(c, x, y, r, col, a) {
    if (r <= 0) return;
    const g = c.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, rgba(col, a)); g.addColorStop(0.45, rgba(col, a * 0.35)); g.addColorStop(1, rgba(col, 0));
    c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2);
  }
  function vgrad(c, w, h, stops) {
    const g = c.createLinearGradient(0, 0, 0, h);
    stops.forEach(([o, col]) => g.addColorStop(o, col)); c.fillStyle = g; c.fillRect(0, 0, w, h);
  }
  function stars(c, w, h, R, n, col, maxY) {
    for (let i = 0; i < n; i++) {
      const x = R() * w, y = R() * h * (maxY || 1), r = R() < 0.08 ? 1.6 : R() * 1.1 + 0.2;
      c.fillStyle = rgba(col, 0.25 + R() * 0.75); c.beginPath(); c.arc(x, y, r * (w / 400), 0, TAU); c.fill();
    }
  }
  function boltPath(R, x1, y1, x2, y2, spread, n) {
    const pts = [[x1, y1]];
    for (let i = 1; i < n; i++) { const t = i / n; pts.push([x1 + (x2 - x1) * t + (R() - 0.5) * spread, y1 + (y2 - y1) * t + (R() - 0.5) * spread]); }
    pts.push([x2, y2]); return pts;
  }
  function strokePts(c, pts) { c.beginPath(); pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y))); c.stroke(); }
  function bolt(c, R, x1, y1, x2, y2, spread, col, lw, branches) {
    const pts = boltPath(R, x1, y1, x2, y2, spread, 14);
    c.save(); c.lineCap = 'round'; c.lineJoin = 'round';
    c.shadowColor = col; c.shadowBlur = lw * 8;
    c.strokeStyle = rgba(col, 0.9); c.lineWidth = lw * 2.4; strokePts(c, pts);
    c.shadowBlur = 0; c.strokeStyle = '#fff'; c.lineWidth = lw; strokePts(c, pts);
    c.restore();
    if (branches) for (let b = 0; b < branches; b++) {
      const [bx, by] = pts[2 + Math.floor(R() * (pts.length - 4))];
      const ang = Math.atan2(y2 - y1, x2 - x1) + (R() - 0.5) * 1.6, len = Math.hypot(x2 - x1, y2 - y1) * (0.15 + R() * 0.25);
      bolt(c, R, bx, by, bx + Math.cos(ang) * len, by + Math.sin(ang) * len, spread * 0.5, col, lw * 0.5, 0);
    }
  }
  function poly(c, pts) { c.beginPath(); pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y))); c.closePath(); }
  function star5(c, x, y, r, rot) {
    c.beginPath();
    for (let i = 0; i < 10; i++) { const a = rot + (i * Math.PI) / 5 - Math.PI / 2, rr = i % 2 ? r * 0.42 : r; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
    c.closePath();
  }

  /* ───────── figures: generic silhouettes, never a specific character ───────── */
  function figureShapes(c, s, o) {
    c.fillStyle = o.fill; c.strokeStyle = o.fill; c.lineJoin = 'round'; c.lineWidth = s * 0.03;
    const shape = (pts) => { poly(c, pts); c.fill(); c.stroke(); };
    if (o.cape) {
      c.beginPath(); c.moveTo(-0.12 * s, -0.8 * s);
      c.bezierCurveTo(-0.28 * s, -0.55 * s, -0.4 * s, -0.2 * s, -0.36 * s + o.wave * s, 0.01 * s);
      c.quadraticCurveTo(0, 0.05 * s, 0.4 * s + o.wave * s, -0.02 * s);
      c.bezierCurveTo(0.36 * s, -0.25 * s, 0.28 * s, -0.55 * s, 0.12 * s, -0.8 * s); c.closePath(); c.fill();
    }
    shape([[-0.085 * s, -0.5 * s], [-0.15 * s, -0.01 * s], [-0.095 * s, -0.01 * s], [0, -0.37 * s], [0.095 * s, -0.01 * s], [0.15 * s, -0.01 * s], [0.085 * s, -0.5 * s]]);
    shape([[-0.13 * s, -0.82 * s], [0.13 * s, -0.82 * s], [0.08 * s, -0.5 * s], [-0.08 * s, -0.5 * s]]);
    for (const m of [-1, 1]) {
      shape([[m * 0.12 * s, -0.82 * s], [m * 0.19 * s, -0.66 * s], [m * 0.185 * s, -0.49 * s], [m * 0.15 * s, -0.49 * s], [m * 0.14 * s, -0.64 * s], [m * 0.1 * s, -0.72 * s]]);
      c.beginPath(); c.arc(m * 0.125 * s, -0.79 * s, 0.05 * s, 0, TAU); c.fill();
    }
    c.fillRect(-0.03 * s, -0.87 * s, 0.06 * s, 0.06 * s);
    c.beginPath(); c.ellipse(0, -0.905 * s, 0.05 * s, 0.06 * s, 0, 0, TAU); c.fill();
    if (o.ears) for (const m of [-1, 1]) { poly(c, [[m * 0.045 * s, -0.93 * s], [m * 0.04 * s, -1.0 * s], [m * 0.015 * s, -0.95 * s]]); c.fill(); }
  }
  function figure(c, x, base, s, o) {
    c.save(); c.translate(x, base); if (o.flip) c.scale(-1, 1);
    if (o.rim) { c.save(); c.shadowColor = o.rim; c.shadowBlur = s * 0.07; figureShapes(c, s, o); c.restore(); }
    figureShapes(c, s, o);
    c.restore();
  }
  function figures(c, w, h, f, pal, R) {
    if (!f || f === 'none') return;
    const fill = mix(pal[0], '#000000', 0.55), rim = pal[2];
    const base = h * 0.985;
    if (f === 'stand' || f === 'cape' || f === 'cowl') {
      figure(c, w * 0.5, base, h * 0.5, { fill, rim, cape: f !== 'stand', ears: f === 'cowl', wave: (R() - 0.5) * 0.06 });
    } else if (f === 'duo') {
      figure(c, w * 0.6, base, h * 0.5, { fill, rim, cape: true, ears: R() < 0.5, wave: 0.03 });
      figure(c, w * 0.36, base, h * 0.38, { fill, rim, cape: R() < 0.6, wave: -0.02, flip: true });
    } else if (f === 'team') {
      const n = 5 + Math.floor(R() * 3);
      const order = [];
      for (let i = 0; i < n; i++) order.push(i);
      order.sort((a, b) => Math.abs(b - (n - 1) / 2) - Math.abs(a - (n - 1) / 2));
      order.forEach((i) => {
        const t = n === 1 ? 0.5 : i / (n - 1), centre = 1 - Math.abs(t - 0.5) * 2;
        const s = h * (0.27 + centre * 0.13 + R() * 0.03);
        figure(c, w * (0.1 + t * 0.8), base, s, { fill, rim, cape: R() < 0.55, ears: R() < 0.15, wave: (R() - 0.5) * 0.05, flip: R() < 0.5 });
      });
    }
  }

  /* ───────── motifs ───────── */
  const M = {};
  M.sun = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, p[0]], [0.55, mix(p[0], p[1], 0.55)], [1, mix(p[1], p[0], 0.4)]]);
    stars(c, w, h, R, 70, '#ffffff', 0.45);
    const cx = w * 0.5, cy = h * 0.66;
    c.save(); c.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * TAU + R() * 0.08, len = Math.max(w, h) * (0.9 + R() * 0.5), wd = 0.03 + R() * 0.03;
      c.fillStyle = rgba(p[2], 0.035 + R() * 0.05);
      poly(c, [[cx, cy], [cx + Math.cos(a - wd) * len, cy + Math.sin(a - wd) * len], [cx + Math.cos(a + wd) * len, cy + Math.sin(a + wd) * len]]); c.fill();
    }
    glow(c, cx, cy, Math.max(w, h) * 0.75, p[2], 0.55);
    glow(c, cx, cy, w * 0.22, '#ffffff', 0.8);
    c.restore();
    const pr = Math.max(w, h) * 1.1, py = h * 0.86 + pr;
    const g = c.createRadialGradient(cx, py - pr * 0.6, pr * 0.2, cx, py, pr);
    g.addColorStop(0, mix(p[1], '#000', 0.4)); g.addColorStop(1, mix(p[0], '#000', 0.6));
    c.fillStyle = g; c.beginPath(); c.arc(cx, py, pr, 0, TAU); c.fill();
    c.save(); c.shadowColor = p[2]; c.shadowBlur = w * 0.05; c.strokeStyle = rgba(mix(p[2], '#ffffff', 0.4), 0.85); c.lineWidth = w * 0.006;
    c.beginPath(); c.arc(cx, py, pr, Math.PI * 1.15, Math.PI * 1.85); c.stroke(); c.restore();
  };
  M.city = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, mix(p[0], p[1], 0.35)], [0.6, p[0]], [1, '#000']]);
    glow(c, w * (0.25 + R() * 0.5), h * 0.14, w * 0.5, p[2], 0.35);
    for (let i = 0; i < 14; i++) { const x = R() * w, y = R() * h * 0.35; glow(c, x, y, w * (0.15 + R() * 0.25), p[1], 0.18); }
    const bx = w * (0.35 + R() * 0.3);
    const g = c.createLinearGradient(bx, h, bx, 0); g.addColorStop(0, rgba(p[2], 0.32)); g.addColorStop(1, rgba(p[2], 0));
    c.fillStyle = g; poly(c, [[bx - w * 0.02, h * 0.8], [bx + w * 0.02, h * 0.8], [bx + w * 0.22, 0], [bx - w * 0.08, 0]]); c.fill();
    const layers = [[0.48, mix(p[1], p[0], 0.55), 0.2], [0.6, mix(p[0], p[1], 0.25), 0.55], [0.74, mix(p[0], '#000', 0.5), 0.9]];
    layers.forEach(([top, col, win]) => {
      let x = -w * 0.05;
      while (x < w * 1.05) {
        const bw = w * (0.05 + R() * 0.09), bh = h * (1 - top) * (0.45 + R() * 0.75), y = h - bh;
        c.fillStyle = col; c.fillRect(x, y, bw, bh);
        if (R() < 0.3) { c.beginPath(); c.moveTo(x + bw * 0.5, y - bh * 0.18); c.lineTo(x + bw * 0.2, y); c.lineTo(x + bw * 0.8, y); c.fill(); }
        for (let wy = y + h * 0.012; wy < h; wy += h * 0.018) for (let wx = x + bw * 0.12; wx < x + bw * 0.88; wx += w * 0.016) {
          if (R() < 0.18 * win) { c.fillStyle = rgba(p[2], 0.35 + R() * 0.5); c.fillRect(wx, wy, w * 0.006, h * 0.005); }
        }
        x += bw + w * 0.004;
      }
    });
    c.strokeStyle = 'rgba(255,255,255,0.09)'; c.lineWidth = Math.max(1, w * 0.002);
    for (let i = 0; i < 160; i++) { const x = R() * w * 1.2, y = R() * h, l = h * (0.03 + R() * 0.05); c.beginPath(); c.moveTo(x, y); c.lineTo(x - l * 0.25, y + l); c.stroke(); }
  };
  M.temple = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, p[0]], [0.65, mix(p[1], p[0], 0.45)], [1, mix(p[1], '#000', 0.3)]]);
    const sx = w * 0.5, sy = h * 0.3;
    glow(c, sx, sy, w * 0.9, p[2], 0.5);
    c.fillStyle = rgba(mix(p[2], '#fff', 0.3), 0.95); c.beginPath(); c.arc(sx, sy, w * 0.17, 0, TAU); c.fill();
    const dark = mix(p[0], '#000', 0.45);
    const top = h * 0.44, bottom = h * 0.9, n = 6, colW = w * 0.075;
    c.fillStyle = dark;
    poly(c, [[w * 0.06, top], [w * 0.5, h * 0.3], [w * 0.94, top]]); c.fill();
    c.fillRect(w * 0.05, top, w * 0.9, h * 0.035);
    for (let i = 0; i < n; i++) {
      const x = w * 0.1 + (i * (w * 0.8 - colW)) / (n - 1);
      c.fillStyle = dark; c.fillRect(x, top + h * 0.035, colW, bottom - top);
      c.fillStyle = rgba(p[2], 0.22); c.fillRect(x, top + h * 0.035, colW * 0.18, bottom - top);
      c.fillStyle = 'rgba(0,0,0,0.25)'; for (let f = 1; f < 4; f++) c.fillRect(x + (colW * f) / 4, top + h * 0.04, Math.max(1, w * 0.003), bottom - top - h * 0.01);
    }
    for (let s = 0; s < 3; s++) { c.fillStyle = mix(dark, p[1], s * 0.12); c.fillRect(w * (0.04 - s * 0.02), bottom + s * h * 0.025, w * (0.92 + s * 0.04), h * 0.026); }
    c.save(); c.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 90; i++) { c.fillStyle = rgba(p[2], R() * 0.6); c.beginPath(); c.arc(R() * w, R() * h, R() * w * 0.004 + 0.4, 0, TAU); c.fill(); }
    c.restore();
  };
  M.speed = (c, w, h, R, p) => {
    c.fillStyle = mix(p[0], '#000', 0.3); c.fillRect(0, 0, w, h);
    glow(c, w * 0.55, h * 0.45, w * 0.9, p[1], 0.55);
    c.save(); c.globalCompositeOperation = 'lighter'; c.lineCap = 'round';
    for (let i = 0; i < 170; i++) {
      const y = R() * h, x = R() * w * 1.1 - w * 0.2, l = w * (0.15 + R() * 0.7), lw = (R() * 2.2 + 0.4) * (w / 400);
      const g = c.createLinearGradient(x, 0, x + l, 0); const col = R() < 0.6 ? p[2] : p[1];
      g.addColorStop(0, rgba(col, 0)); g.addColorStop(1, rgba(col, 0.15 + R() * 0.55));
      c.strokeStyle = g; c.lineWidth = lw; c.beginPath(); c.moveTo(x, y); c.lineTo(x + l, y); c.stroke();
    }
    c.restore();
    for (let i = 0; i < 3; i++) { const y = h * (0.25 + R() * 0.45); bolt(c, R, -w * 0.05, y, w * 1.05, y + (R() - 0.5) * h * 0.2, h * 0.06, p[2], w * 0.006, 2); }
  };
  M.emerald = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, '#000'], [0.5, mix(p[0], p[1], 0.25)], [1, '#000']]);
    const cx = w * 0.5, cy = h * 0.4;
    glow(c, cx, cy, w * 0.95, p[1], 0.6);
    c.save(); c.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 40; i++) { const a = R() * TAU, l = w * (0.5 + R() * 0.7); c.strokeStyle = rgba(p[2], 0.05 + R() * 0.12); c.lineWidth = R() * w * 0.008 + 0.5; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + Math.cos(a) * l, cy + Math.sin(a) * l); c.stroke(); }
    for (let i = 1; i <= 6; i++) { c.strokeStyle = rgba(p[2], 0.42 / i); c.lineWidth = w * 0.004; c.beginPath(); c.arc(cx, cy, w * 0.11 * i, 0, TAU); c.stroke(); }
    c.shadowColor = p[2]; c.shadowBlur = w * 0.08; c.strokeStyle = mix(p[2], '#fff', 0.5); c.lineWidth = w * 0.035;
    c.beginPath(); c.arc(cx, cy, w * 0.14, 0, TAU); c.stroke();
    c.shadowBlur = 0;
    for (let i = 0; i < 120; i++) { c.fillStyle = rgba(p[2], R() * 0.8); c.beginPath(); c.arc(R() * w, R() * h, R() * w * 0.005 + 0.3, 0, TAU); c.fill(); }
    c.restore();
  };
  M.ocean = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, mix(p[1], '#ffffff', 0.15)], [0.25, p[1]], [1, mix(p[0], '#000', 0.5)]]);
    c.save(); c.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 9; i++) {
      const x = R() * w, wd = w * (0.03 + R() * 0.08), sk = (R() - 0.5) * w * 0.4;
      const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, rgba(p[2], 0.2)); g.addColorStop(1, rgba(p[2], 0));
      c.fillStyle = g; poly(c, [[x, 0], [x + wd, 0], [x + wd + sk + w * 0.1, h], [x + sk - w * 0.05, h]]); c.fill();
    }
    c.restore();
    for (let b = 0; b < 6; b++) {
      const y0 = h * (0.08 + b * 0.035);
      c.strokeStyle = rgba('#ffffff', 0.18 - b * 0.025); c.lineWidth = w * 0.003;
      c.beginPath(); for (let x = 0; x <= w; x += w / 60) { const y = y0 + Math.sin(x / w * TAU * (2 + b) + b) * h * 0.008; x ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke();
    }
    for (let i = 0; i < 60; i++) { const r = R() * w * 0.014 + 1; c.strokeStyle = rgba('#ffffff', 0.15 + R() * 0.3); c.lineWidth = 1; c.beginPath(); c.arc(R() * w, h * 0.3 + R() * h * 0.7, r, 0, TAU); c.stroke(); }
    c.fillStyle = rgba(mix(p[0], '#000', 0.6), 0.85);
    c.beginPath(); c.moveTo(0, h); for (let x = 0; x <= w; x += w / 20) c.lineTo(x, h * (0.88 + R() * 0.06)); c.lineTo(w, h); c.fill();
  };
  M.stars = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, p[0]], [0.7, mix(p[0], p[1], 0.45)], [1, mix(p[1], '#000', 0.2)]]);
    glow(c, w * 0.7, h * 0.3, w * 0.8, p[1], 0.45);
    stars(c, w, h, R, 260, '#ffffff', 1);
    c.save(); c.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 5; i++) {
      const x = R() * w, y = R() * h * 0.6, l = w * (0.25 + R() * 0.4), a = Math.PI * 0.8 + R() * 0.2;
      const g = c.createLinearGradient(x, y, x + Math.cos(a) * l, y + Math.sin(a) * l); g.addColorStop(0, rgba(p[2], 0.8)); g.addColorStop(1, rgba(p[2], 0));
      c.strokeStyle = g; c.lineWidth = w * 0.006; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); c.stroke();
      glow(c, x, y, w * 0.04, '#ffffff', 0.9);
    }
    for (let i = 0; i < 9; i++) { const x = R() * w, y = R() * h * 0.7, r = w * (0.02 + R() * 0.04); glow(c, x, y, r * 3, p[2], 0.35); c.fillStyle = mix(p[2], '#fff', 0.4); star5(c, x, y, r, R()); c.fill(); }
    c.restore();
  };
  M.league = (c, w, h, R, p) => {
    c.fillStyle = p[0]; c.fillRect(0, 0, w, h);
    stars(c, w, h, R, 160, '#ffffff', 1);
    const cx = w * 0.5, cy = h * 0.42;
    const cols = ['#e63946', '#3a86ff', '#ffbe0b', '#2ec4b6', '#8338ec', '#fb5607', '#06d6a0'];
    c.save(); c.globalCompositeOperation = 'lighter';
    const n = 42;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU, col = cols[i % cols.length], len = Math.max(w, h) * (0.6 + R() * 0.6), wd = 0.025 + R() * 0.03;
      const g = c.createRadialGradient(cx, cy, 0, cx, cy, len); g.addColorStop(0, rgba(col, 0.55)); g.addColorStop(1, rgba(col, 0));
      c.fillStyle = g; poly(c, [[cx, cy], [cx + Math.cos(a - wd) * len, cy + Math.sin(a - wd) * len], [cx + Math.cos(a + wd) * len, cy + Math.sin(a + wd) * len]]); c.fill();
    }
    glow(c, cx, cy, w * 0.6, p[2], 0.6); glow(c, cx, cy, w * 0.16, '#ffffff', 1);
    c.restore();
    c.strokeStyle = rgba(p[2], 0.5); c.lineWidth = w * 0.004;
    c.beginPath(); c.ellipse(cx, cy, w * 0.42, h * 0.08, -0.15, 0, TAU); c.stroke();
    c.strokeStyle = rgba('#ffffff', 0.25); c.beginPath(); c.ellipse(cx, cy, w * 0.55, h * 0.12, 0.2, 0, TAU); c.stroke();
  };
  M.boom = (c, w, h, R, p) => {
    c.fillStyle = mix(p[0], '#000', 0.3); c.fillRect(0, 0, w, h);
    const cx = w * 0.5, cy = h * 0.4;
    const g = c.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.75);
    g.addColorStop(0, '#ffffff'); g.addColorStop(0.12, p[2]); g.addColorStop(0.45, p[1]); g.addColorStop(1, rgba(p[0], 0));
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    for (let i = 14; i > 0; i--) {
      c.strokeStyle = i % 2 ? rgba('#000000', 0.35) : rgba(p[2], 0.55); c.lineWidth = w * 0.012;
      c.beginPath(); c.ellipse(cx, cy, w * 0.045 * i, w * 0.03 * i, 0, 0, TAU); c.stroke();
    }
    c.fillStyle = '#000';
    for (let k = 0; k < 46; k++) {
      const a = R() * TAU, d = Math.max(w, h) * (0.12 + R() * 0.55), kx = cx + Math.cos(a) * d, ky = cy + Math.sin(a) * d * 0.9;
      const m = 5 + Math.floor(R() * 10);
      for (let j = 0; j < m; j++) { const r = w * (0.006 + R() * 0.03) * (1 - j / m * 0.6); c.beginPath(); c.arc(kx + (R() - 0.5) * w * 0.09, ky + (R() - 0.5) * w * 0.09, r, 0, TAU); c.fill(); }
    }
    for (let i = 0; i < 5; i++) { const a = R() * TAU; bolt(c, R, cx, cy, cx + Math.cos(a) * w, cy + Math.sin(a) * h, w * 0.05, p[2], w * 0.004, 1); }
  };
  M.lightning = (c, w, h, R, p, storm) => {
    vgrad(c, w, h, [[0, mix(p[0], '#000', 0.2)], [0.6, mix(p[0], p[1], 0.35)], [1, '#000']]);
    for (let i = 0; i < 40; i++) { const x = R() * w, y = R() * h * 0.45, r = w * (0.12 + R() * 0.28); glow(c, x, y, r, R() < 0.5 ? p[1] : mix(p[0], '#888', 0.2), 0.22); }
    const n = storm ? 3 : 4;
    for (let i = 0; i < n; i++) { const x = w * (0.1 + R() * 0.8); bolt(c, R, x, -h * 0.02, x + (R() - 0.5) * w * 0.4, h * (0.55 + R() * 0.35), w * 0.08, p[2], w * 0.006, 3); }
    glow(c, w * 0.5, h, w * 0.8, p[2], 0.35);
    if (storm) {
      c.fillStyle = 'rgba(0,0,0,0.75)';
      for (let i = 0; i < 70; i++) { const x = R() * w, y = h * 0.3 + R() * h * 0.6, s = w * (0.004 + R() * 0.02); c.save(); c.translate(x, y); c.rotate(R() * TAU); c.fillRect(-s, -s * 0.6, s * 2, s * 1.2); c.restore(); }
      c.strokeStyle = rgba(p[2], 0.6); c.lineWidth = w * 0.004;
      for (let i = 0; i < 6; i++) { let x = w * 0.5, y = h * 0.98; c.beginPath(); c.moveTo(x, y); for (let k = 0; k < 6; k++) { x += (R() - 0.5) * w * 0.18; y -= R() * h * 0.03; c.lineTo(x, y); } c.stroke(); }
    }
  };
  M.storm = (c, w, h, R, p) => M.lightning(c, w, h, R, p, true);
  M.war = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, mix(p[1], '#000', 0.35)], [0.7, p[1]], [1, p[0]]]);
    c.save(); c.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 5; i++) {
      const x = w * (0.1 + R() * 0.8), a = -Math.PI / 2 + (R() - 0.5) * 1.1, l = h * 1.3, wd = 0.03 + R() * 0.02;
      const g = c.createLinearGradient(x, h, x + Math.cos(a) * l, h + Math.sin(a) * l); g.addColorStop(0, rgba(p[2], 0.45)); g.addColorStop(1, rgba(p[2], 0));
      c.fillStyle = g; poly(c, [[x, h], [x + Math.cos(a - wd) * l, h + Math.sin(a - wd) * l], [x + Math.cos(a + wd) * l, h + Math.sin(a + wd) * l]]); c.fill();
    }
    c.restore();
    c.fillStyle = rgba(p[0], 0.9);
    for (let i = 0; i < 6; i++) {
      const x = R() * w, y = h * (0.08 + R() * 0.35), s = w * (0.025 + R() * 0.03);
      c.save(); c.translate(x, y); c.rotate((R() - 0.5) * 0.3);
      c.fillRect(-s, -s * 0.09, s * 2, s * 0.18); poly(c, [[-s * 0.25, 0], [s * 0.15, 0], [s * 0.05, -s * 0.9], [-s * 0.1, -s * 0.9]]); c.fill();
      poly(c, [[-s * 0.25, 0], [s * 0.15, 0], [s * 0.05, s * 0.9], [-s * 0.1, s * 0.9]]); c.fill();
      poly(c, [[s * 0.85, 0], [s, 0], [s * 1.05, -s * 0.35], [s * 0.95, -s * 0.35]]); c.fill();
      c.restore();
    }
    c.fillStyle = rgba(mix(p[0], '#000', 0.5), 0.95);
    c.beginPath(); c.moveTo(0, h); let x = 0;
    while (x < w) { const bw = w * (0.04 + R() * 0.08), bh = h * (0.08 + R() * 0.16); c.lineTo(x, h - bh); c.lineTo(x + bw, h - bh); x += bw; }
    c.lineTo(w, h); c.fill();
  };
  M.pop = (c, w, h, R, p) => {
    c.fillStyle = p[1]; c.fillRect(0, 0, w, h);
    const cx = w * 0.5, cy = h * 0.42, step = w * 0.035;
    c.fillStyle = rgba(p[0], 0.55);
    for (let y = 0; y < h; y += step) for (let x = (y / step) % 2 ? step / 2 : 0; x < w; x += step) {
      const d = Math.hypot(x - cx, y - cy) / Math.max(w, h); const r = step * 0.48 * Math.min(1, d * 1.6);
      if (r > 0.4) { c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); }
    }
    c.strokeStyle = 'rgba(0,0,0,0.5)';
    for (let i = 0; i < 70; i++) { const a = R() * TAU, r1 = w * (0.3 + R() * 0.15), r2 = Math.max(w, h); c.lineWidth = R() * w * 0.006 + 0.5; c.beginPath(); c.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); c.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2); c.stroke(); }
    c.beginPath(); const sp = 22;
    for (let i = 0; i < sp * 2; i++) { const a = (i / (sp * 2)) * TAU, r = i % 2 ? w * 0.2 : w * (0.33 + R() * 0.08); c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); }
    c.closePath(); c.fillStyle = p[2]; c.fill(); c.lineWidth = w * 0.012; c.strokeStyle = '#111'; c.stroke();
    glow(c, cx, cy, w * 0.25, '#ffffff', 0.6);
  };
  M.owl = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, mix(p[0], p[1], 0.3)], [1, '#000']]);
    c.strokeStyle = rgba(p[2], 0.08); c.lineWidth = w * 0.006;
    for (let i = 0; i < 26; i++) { let x = Math.round(R() * 20) * w / 20, y = Math.round(R() * 30) * h / 30; c.beginPath(); c.moveTo(x, y); for (let k = 0; k < 6; k++) { if (R() < 0.5) x += (R() < 0.5 ? -1 : 1) * w / 10; else y += (R() < 0.5 ? -1 : 1) * h / 15; c.lineTo(x, y); } c.stroke(); }
    const ey = h * 0.36;
    for (const ex of [w * 0.32, w * 0.68]) {
      glow(c, ex, ey, w * 0.32, p[2], 0.35);
      for (let i = 6; i > 0; i--) { c.fillStyle = i % 2 ? mix(p[1], '#000', 0.2) : rgba(p[2], 0.85); c.beginPath(); c.arc(ex, ey, w * 0.027 * i, 0, TAU); c.fill(); }
      c.fillStyle = '#000'; c.beginPath(); c.arc(ex, ey, w * 0.04, 0, TAU); c.fill();
      c.fillStyle = '#fff'; c.beginPath(); c.arc(ex - w * 0.012, ey - w * 0.012, w * 0.009, 0, TAU); c.fill();
    }
    c.fillStyle = rgba(p[2], 0.9); poly(c, [[w * 0.5, h * 0.44], [w * 0.46, h * 0.5], [w * 0.5, h * 0.6], [w * 0.54, h * 0.5]]); c.fill();
    for (let row = 0; row < 7; row++) for (let i = 0; i < 8; i++) {
      const x = w * (0.06 + i * 0.125 + (row % 2) * 0.06), y = h * (0.62 + row * 0.055);
      c.strokeStyle = rgba(p[2], 0.45 - row * 0.05); c.lineWidth = w * 0.006; c.beginPath(); c.moveTo(x - w * 0.05, y); c.lineTo(x, y + h * 0.03); c.lineTo(x + w * 0.05, y); c.stroke();
    }
    c.strokeStyle = rgba(p[2], 0.6); c.lineWidth = w * 0.008;
    c.beginPath(); c.moveTo(w * 0.08, h * 0.22); c.quadraticCurveTo(w * 0.5, h * 0.06, w * 0.92, h * 0.22); c.stroke();
  };
  M.noir = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, mix(p[1], '#000', 0.35)], [1, mix(p[0], '#000', 0.4)]]);
    c.save(); c.globalCompositeOperation = 'lighter';
    c.translate(w * 0.5, h * 0.4); c.rotate(-0.42); c.translate(-w, -h);
    for (let i = 0; i < 14; i++) { c.fillStyle = rgba(mix(p[1], '#ffffff', 0.4), 0.1); c.fillRect(0, i * h * 0.14, w * 2.4, h * 0.06); }
    c.restore();
    glow(c, w * 0.75, h * 0.18, w * 0.5, p[1], 0.35);
    const dx = w * (0.25 + R() * 0.5), dy = h * (0.18 + R() * 0.2), dr = w * 0.07;
    c.fillStyle = p[2]; c.beginPath(); c.arc(dx, dy, dr, 0, TAU); c.fill();
    for (let i = 0; i < 36; i++) { const a = R() * TAU, d = dr * (1.2 + R() * 2.4), r = dr * (0.04 + R() * 0.18); c.beginPath(); c.arc(dx + Math.cos(a) * d, dy + Math.sin(a) * d, r, 0, TAU); c.fill(); }
    for (let i = 0; i < 4; i++) { const a = R() * TAU; c.beginPath(); c.ellipse(dx + Math.cos(a) * dr, dy + Math.sin(a) * dr, dr * 0.9, dr * 0.12, a, 0, TAU); c.fill(); }
    c.strokeStyle = 'rgba(255,255,255,0.07)'; c.lineWidth = Math.max(1, w * 0.002);
    for (let i = 0; i < 120; i++) { const x = R() * w, y = R() * h, l = h * 0.05; c.beginPath(); c.moveTo(x, y); c.lineTo(x - l * 0.15, y + l); c.stroke(); }
  };
  M.desert = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, mix(p[0], p[1], 0.3)], [0.55, mix(p[1], p[2], 0.55)], [0.72, p[2]], [1, p[0]]]);
    const sx = w * 0.5, sy = h * 0.6;
    glow(c, sx, sy, w * 0.9, p[2], 0.5);
    c.fillStyle = rgba(mix(p[2], '#fff', 0.45), 0.95); c.beginPath(); c.arc(sx, sy, w * 0.2, 0, TAU); c.fill();
    const pyr = mix(p[0], p[1], 0.35);
    [[0.18, 0.2], [0.42, 0.14], [0.8, 0.11]].forEach(([x, s]) => { c.fillStyle = pyr; poly(c, [[w * (x - s), h * 0.7], [w * x, h * 0.7 - w * s * 0.95], [w * (x + s), h * 0.7]]); c.fill(); c.fillStyle = 'rgba(0,0,0,0.25)'; poly(c, [[w * x, h * 0.7 - w * s * 0.95], [w * (x + s), h * 0.7], [w * x, h * 0.7]]); c.fill(); });
    for (let d = 0; d < 4; d++) {
      c.fillStyle = mix(p[0], p[1], 0.3 - d * 0.08); c.beginPath(); const y0 = h * (0.7 + d * 0.07);
      c.moveTo(0, h); c.lineTo(0, y0); for (let x = 0; x <= w; x += w / 12) c.quadraticCurveTo(x + w / 24, y0 - h * (0.02 + R() * 0.04), x + w / 12, y0 + (R() - 0.5) * h * 0.02);
      c.lineTo(w, h); c.fill();
    }
  };
  M.dream = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, p[0]], [0.6, mix(p[0], p[1], 0.6)], [1, p[0]]]);
    stars(c, w, h, R, 220, '#ffffff', 1);
    const mx = w * 0.7, my = h * 0.22, mr = w * 0.13;
    glow(c, mx, my, mr * 4, p[2], 0.35);
    c.fillStyle = mix(p[2], '#fff', 0.5); c.beginPath(); c.arc(mx, my, mr, 0, TAU); c.fill();
    c.fillStyle = mix(p[0], p[1], 0.45); c.beginPath(); c.arc(mx + mr * 0.45, my - mr * 0.15, mr * 0.92, 0, TAU); c.fill();
    c.save(); c.globalCompositeOperation = 'lighter';
    const cx = w * 0.45, cy = h * 0.58;
    for (let i = 0; i < 1400; i++) {
      const t = R() * 7, a = t * 2.1 + R() * 0.4, r = w * 0.012 * Math.exp(t * 0.42);
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * 0.55;
      c.fillStyle = rgba(R() < 0.7 ? p[2] : '#ffffff', 0.08 + R() * 0.4); c.fillRect(x, y, w * 0.004, w * 0.004);
    }
    glow(c, cx, cy, w * 0.18, p[2], 0.6);
    c.restore();
  };
  M.swamp = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, mix(p[0], p[1], 0.35)], [1, '#000']]);
    glow(c, w * 0.5, h * 0.3, w * 0.8, p[1], 0.35);
    for (let i = 0; i < 6; i++) { c.fillStyle = rgba(mix(p[1], '#ccc', 0.3), 0.06); c.fillRect(0, h * (0.45 + i * 0.07), w, h * 0.05); }
    for (let v = 0; v < 18; v++) {
      let x = R() * w, y = h * 1.02; const col = mix(p[0], p[1], 0.2 + R() * 0.4);
      c.strokeStyle = col; c.lineWidth = w * (0.01 + R() * 0.025); c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y);
      const segs = 4 + Math.floor(R() * 4);
      for (let s = 0; s < segs; s++) {
        const nx = x + (R() - 0.5) * w * 0.3, ny = y - h * (0.08 + R() * 0.12);
        c.quadraticCurveTo(x + (R() - 0.5) * w * 0.3, (y + ny) / 2, nx, ny);
        if (R() < 0.7) { c.save(); c.fillStyle = mix(p[1], p[2], R() * 0.4); c.translate(nx, ny); c.rotate(R() * TAU); c.beginPath(); c.ellipse(0, 0, w * 0.03, w * 0.012, 0, 0, TAU); c.fill(); c.restore(); }
        x = nx; y = ny;
      }
      c.stroke();
    }
    c.save(); c.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 40; i++) glow(c, R() * w, R() * h * 0.85, w * (0.01 + R() * 0.02), p[2], 0.9);
    c.restore();
    c.fillStyle = rgba(mix(p[0], '#000', 0.4), 0.9);
    for (let i = 0; i < 26; i++) { const x = R() * w, l = h * (0.04 + R() * 0.12); c.beginPath(); c.moveTo(x - w * 0.02, 0); c.quadraticCurveTo(x, l * 1.4, x + w * 0.02, 0); c.fill(); }
  };
  M.fire = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, '#000'], [0.6, mix(p[0], p[1], 0.3)], [1, p[1]]]);
    glow(c, w * 0.5, h * 0.95, w * 1.1, p[2], 0.45);
    c.save(); c.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 46; i++) {
      const x = R() * w, base = h * (1.02 + R() * 0.05), fh = h * (0.25 + R() * 0.5), fw = w * (0.05 + R() * 0.1), lean = (R() - 0.5) * w * 0.12;
      const g = c.createLinearGradient(x, base, x, base - fh); g.addColorStop(0, rgba(p[2], 0.35)); g.addColorStop(0.5, rgba(p[1], 0.22)); g.addColorStop(1, rgba(p[1], 0));
      c.fillStyle = g; c.beginPath(); c.moveTo(x - fw, base);
      c.bezierCurveTo(x - fw, base - fh * 0.5, x + lean - fw * 0.3, base - fh * 0.7, x + lean, base - fh);
      c.bezierCurveTo(x + lean + fw * 0.3, base - fh * 0.7, x + fw, base - fh * 0.5, x + fw, base); c.fill();
    }
    for (let i = 0; i < 140; i++) { c.fillStyle = rgba(R() < 0.5 ? p[2] : '#ffffff', R() * 0.8); c.beginPath(); c.arc(R() * w, R() * h * 0.9, R() * w * 0.005 + 0.4, 0, TAU); c.fill(); }
    c.restore();
  };
  M.atom = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, '#000'], [0.5, mix(p[0], p[1], 0.3)], [1, '#000']]);
    const cx = w * 0.5, cy = h * 0.4;
    glow(c, cx, cy, w * 0.95, p[1], 0.55);
    c.save(); c.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 50; i++) { const a = R() * TAU, l = w * (0.3 + R()); c.strokeStyle = rgba(p[2], 0.05 + R() * 0.1); c.lineWidth = R() * w * 0.006 + 0.4; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + Math.cos(a) * l, cy + Math.sin(a) * l); c.stroke(); }
    c.shadowColor = p[2]; c.shadowBlur = w * 0.03; c.strokeStyle = rgba(mix(p[2], '#fff', 0.4), 0.85); c.lineWidth = w * 0.007;
    for (let i = 0; i < 4; i++) {
      const rot = (i / 4) * Math.PI + R() * 0.2;
      c.beginPath(); c.ellipse(cx, cy, w * 0.38, w * 0.12, rot, 0, TAU); c.stroke();
      const t = R() * TAU; const ex = Math.cos(t) * w * 0.38, ey = Math.sin(t) * w * 0.12;
      glow(c, cx + ex * Math.cos(rot) - ey * Math.sin(rot), cy + ex * Math.sin(rot) + ey * Math.cos(rot), w * 0.04, '#ffffff', 0.9);
    }
    c.shadowBlur = 0; glow(c, cx, cy, w * 0.14, '#ffffff', 0.95);
    c.restore();
  };
  M.spectrum = (c, w, h, R, p) => {
    c.fillStyle = '#000'; c.fillRect(0, 0, w, h);
    const cx = w * 0.5, cy = h * 0.4, cols = ['#ff1f1f', '#ff8c00', '#ffd400', '#21d36b', '#2f80ff', '#4b0082', '#c03cff'];
    c.save(); c.globalCompositeOperation = 'lighter';
    cols.forEach((col, i) => {
      const r = w * (0.2 + i * 0.05);
      c.strokeStyle = rgba(col, 0.5); c.lineWidth = w * 0.022; c.shadowColor = col; c.shadowBlur = w * 0.05;
      c.beginPath(); c.arc(cx, cy, r, 0, TAU); c.stroke();
    });
    c.shadowBlur = 0;
    for (let i = 0; i < 260; i++) { const col = cols[Math.floor(R() * cols.length)], a = R() * TAU, d = w * (0.25 + R() * 0.7); c.fillStyle = rgba(col, R() * 0.8); c.beginPath(); c.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, R() * w * 0.006 + 0.4, 0, TAU); c.fill(); }
    c.restore();
    const g = c.createRadialGradient(cx, cy, w * 0.05, cx, cy, w * 0.19); g.addColorStop(0, '#000'); g.addColorStop(0.85, '#050008'); g.addColorStop(1, rgba(p[2], 0.6));
    c.fillStyle = g; c.beginPath(); c.arc(cx, cy, w * 0.19, 0, TAU); c.fill();
  };
  M.magic = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, p[0]], [0.6, mix(p[0], p[1], 0.5)], [1, '#000']]);
    const cx = w * 0.5, cy = h * 0.4;
    glow(c, cx, cy, w * 0.9, p[1], 0.5);
    for (let i = 0; i < 10; i++) { c.fillStyle = rgba(mix(p[2], '#fff', 0.3), 0.04); c.beginPath(); c.ellipse(R() * w, h * (0.5 + R() * 0.5), w * (0.3 + R() * 0.4), h * 0.05, 0, 0, TAU); c.fill(); }
    c.save(); c.globalCompositeOperation = 'lighter'; c.shadowColor = p[2]; c.shadowBlur = w * 0.025;
    c.strokeStyle = rgba(p[2], 0.85); c.lineWidth = w * 0.004;
    [0.36, 0.3, 0.2].forEach((rr, k) => {
      const r = w * rr; c.beginPath(); c.arc(cx, cy, r, 0, TAU); c.stroke();
      const ticks = 48 - k * 12;
      for (let i = 0; i < ticks; i++) { const a = (i / ticks) * TAU, l = i % 4 ? w * 0.012 : w * 0.028; c.beginPath(); c.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); c.lineTo(cx + Math.cos(a) * (r - l), cy + Math.sin(a) * (r - l)); c.stroke(); }
    });
    for (let tri = 0; tri < 2; tri++) { const r = w * 0.2, o = tri * Math.PI / 3 + Math.PI / 6; c.beginPath(); for (let i = 0; i < 3; i++) { const a = o + (i / 3) * TAU; c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } c.closePath(); c.stroke(); }
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * TAU, r = w * 0.33, gx = cx + Math.cos(a) * r, gy = cy + Math.sin(a) * r, s = w * 0.014;
      c.beginPath();
      for (let k = 0; k < 3; k++) { const x1 = gx + (R() - 0.5) * s * 2, y1 = gy + (R() - 0.5) * s * 2; c.moveTo(x1, y1); c.lineTo(x1 + (R() - 0.5) * s * 2, y1 + (R() - 0.5) * s * 2); }
      c.stroke();
    }
    c.shadowBlur = 0;
    for (let i = 0; i < 120; i++) { c.fillStyle = rgba(p[2], R() * 0.8); c.beginPath(); c.arc(R() * w, R() * h, R() * w * 0.004 + 0.3, 0, TAU); c.fill(); }
    glow(c, cx, cy, w * 0.12, '#ffffff', 0.8);
    c.restore();
  };
  M.multiverse = (c, w, h, R, p) => {
    c.fillStyle = p[0]; c.fillRect(0, 0, w, h);
    stars(c, w, h, R, 180, '#ffffff', 1);
    const cx = w * 0.5, cy = h * 0.42, n = 13;
    const nodes = [];
    for (let i = 0; i < n; i++) { const a = (i / n) * TAU + R() * 0.2, d = Math.min(w, h) * (0.24 + R() * 0.2); nodes.push([cx + Math.cos(a) * d * 1.15, cy + Math.sin(a) * d * 0.85, w * (0.04 + R() * 0.06), mix(p[1], p[2], R())]); }
    c.strokeStyle = rgba(p[2], 0.25); c.lineWidth = w * 0.003;
    nodes.forEach((a, i) => { const b = nodes[(i + 1) % n], d = nodes[(i + 4) % n]; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.moveTo(a[0], a[1]); c.lineTo(d[0], d[1]); c.stroke(); });
    c.save(); c.globalCompositeOperation = 'lighter';
    nodes.forEach(([x, y, r, col]) => { const g = c.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r); g.addColorStop(0, rgba('#ffffff', 0.7)); g.addColorStop(0.4, rgba(col, 0.55)); g.addColorStop(1, rgba(col, 0.05)); c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); });
    glow(c, cx, cy, w * 0.3, p[2], 0.6); glow(c, cx, cy, w * 0.08, '#ffffff', 0.9);
    c.restore();
  };
  M.metal = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, '#000'], [1, mix(p[0], p[1], 0.4)]]);
    glow(c, w * 0.5, h * 0.55, w, p[1], 0.5);
    for (let i = 0; i < 70; i++) {
      const x = R() * w, y = h * (0.15 + R() * 0.9), s = w * (0.04 + R() * 0.14), a = R() * TAU;
      const pts = []; const k = 3 + Math.floor(R() * 2); for (let j = 0; j < k; j++) { const aa = a + (j / k) * TAU + (R() - 0.5) * 0.8; pts.push([x + Math.cos(aa) * s * (0.5 + R()), y + Math.sin(aa) * s * (0.5 + R()) * 1.6]); }
      const g = c.createLinearGradient(pts[0][0], pts[0][1], pts[1][0], pts[1][1]);
      g.addColorStop(0, mix(p[0], '#000', 0.4)); g.addColorStop(0.55, mix(p[2], '#ffffff', R() * 0.5)); g.addColorStop(1, mix(p[0], '#000', 0.2));
      c.fillStyle = g; poly(c, pts); c.fill();
      c.strokeStyle = rgba(p[1], 0.6); c.lineWidth = w * 0.002; c.stroke();
    }
    c.save(); c.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 8; i++) bolt(c, R, R() * w, R() * h, R() * w, R() * h, w * 0.05, p[1], w * 0.003, 0);
    c.restore();
  };
  M.crisis = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, mix(p[1], '#000', 0.2)], [0.55, p[1]], [1, mix(p[0], '#000', 0.4)]]);
    stars(c, w, h, R, 90, '#ffffff', 1);
    const n = 6;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1), x = w * (0.08 + t * 0.84), y = h * (0.62 - Math.sin(t * Math.PI) * 0.12), r = w * (0.05 + Math.sin(t * Math.PI) * 0.04);
      const g = c.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r); g.addColorStop(0, '#9ad1ff'); g.addColorStop(0.5, '#1d4e89'); g.addColorStop(1, '#03142b');
      c.globalAlpha = 0.35 + 0.65 * (1 - Math.abs(t - 0.5) * 1.6); c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); c.globalAlpha = 1;
    }
    c.save(); c.globalCompositeOperation = 'lighter';
    const wy = h * 0.22;
    for (let k = 0; k < 7; k++) {
      c.strokeStyle = rgba(k < 2 ? '#ffffff' : p[2], 0.55 - k * 0.06); c.lineWidth = h * (0.015 + k * 0.022);
      c.beginPath(); c.moveTo(-w * 0.1, wy + h * 0.15); c.quadraticCurveTo(w * 0.5, wy - h * 0.2, w * 1.1, wy + h * 0.15); c.stroke();
    }
    for (let i = 0; i < 160; i++) { const x = R() * w, y = wy + (R() - 0.3) * h * 0.4; c.fillStyle = rgba('#ffffff', R() * 0.7); c.fillRect(x, y, w * 0.004, w * 0.004); }
    c.restore();
  };
  M.time = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, p[0]], [0.6, mix(p[0], p[1], 0.5)], [1, '#000']]);
    const cx = w * 0.5, cy = h * 0.4;
    glow(c, cx, cy, w * 0.9, p[2], 0.3);
    c.strokeStyle = rgba(p[2], 0.75); c.lineWidth = w * 0.004;
    [0.4, 0.33].forEach((rr) => { c.beginPath(); c.arc(cx, cy, w * rr, 0, TAU); c.stroke(); });
    for (let i = 0; i < 60; i++) { const a = (i / 60) * TAU, r = w * 0.4, l = i % 5 ? w * 0.015 : w * 0.04; c.lineWidth = i % 5 ? w * 0.003 : w * 0.007; c.beginPath(); c.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); c.lineTo(cx + Math.cos(a) * (r - l), cy + Math.sin(a) * (r - l)); c.stroke(); }
    for (let gidx = 0; gidx < 3; gidx++) {
      const gx = w * (0.15 + R() * 0.7), gy = h * (0.6 + R() * 0.3), gr = w * (0.08 + R() * 0.1), teeth = 12 + Math.floor(R() * 8);
      c.fillStyle = rgba(mix(p[1], '#000', 0.3), 0.85); c.beginPath();
      for (let i = 0; i < teeth * 2; i++) { const a = (i / (teeth * 2)) * TAU, r = i % 2 ? gr : gr * 1.15; c.lineTo(gx + Math.cos(a) * r, gy + Math.sin(a) * r); }
      c.closePath(); c.fill(); c.strokeStyle = rgba(p[2], 0.4); c.stroke();
      c.fillStyle = p[0]; c.beginPath(); c.arc(gx, gy, gr * 0.35, 0, TAU); c.fill();
    }
    c.save(); c.globalCompositeOperation = 'lighter'; c.strokeStyle = rgba(p[2], 0.5); c.lineWidth = w * 0.003; c.beginPath();
    for (let t = 0; t < 40; t += 0.1) { const r = w * 0.004 * t * t * 0.18, a = t * 0.9; const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r; t ? c.lineTo(x, y) : c.moveTo(x, y); }
    c.stroke();
    c.lineWidth = w * 0.012; c.strokeStyle = rgba('#ffffff', 0.85); c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + w * 0.2, cy - w * 0.1); c.moveTo(cx, cy); c.lineTo(cx - w * 0.05, cy - w * 0.28); c.stroke();
    glow(c, cx, cy, w * 0.06, '#ffffff', 0.9);
    c.restore();
  };
  M.kingdom = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, mix(p[2], '#ffffff', 0.25)], [0.35, p[2]], [0.7, p[1]], [1, p[0]]]);
    for (let i = 0; i < 30; i++) { const x = R() * w, y = h * (0.15 + R() * 0.55), r = w * (0.1 + R() * 0.25); glow(c, x, y, r, R() < 0.5 ? '#ffffff' : p[1], 0.22); }
    c.save(); c.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 11; i++) {
      const x = w * 0.5 + (R() - 0.5) * w * 0.3, a = Math.PI / 2 + (R() - 0.5) * 1.2, l = h * 1.4, wd = 0.03 + R() * 0.05;
      const g = c.createLinearGradient(x, 0, x, h); g.addColorStop(0, rgba('#ffffff', 0.4)); g.addColorStop(1, rgba('#ffffff', 0));
      c.fillStyle = g; poly(c, [[x, -h * 0.05], [x + Math.cos(a - wd) * l, -h * 0.05 + Math.sin(a - wd) * l], [x + Math.cos(a + wd) * l, -h * 0.05 + Math.sin(a + wd) * l]]); c.fill();
    }
    c.restore();
    c.strokeStyle = rgba(p[0], 0.6); c.lineWidth = w * 0.03;
    c.beginPath(); c.moveTo(w * 0.04, h); c.lineTo(w * 0.04, h * 0.3); c.quadraticCurveTo(w * 0.04, h * 0.02, w * 0.5, h * 0.02); c.quadraticCurveTo(w * 0.96, h * 0.02, w * 0.96, h * 0.3); c.lineTo(w * 0.96, h); c.stroke();
    c.lineWidth = w * 0.008; c.beginPath(); c.moveTo(w * 0.5, h * 0.02); c.lineTo(w * 0.5, h * 0.3); c.stroke();
  };
  M.tech = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, p[0]], [1, mix(p[0], '#000', 0.5)]]);
    const cx = w * 0.5, cy = h * 0.42;
    glow(c, cx, cy, w * 0.9, p[1], 0.45);
    c.strokeStyle = rgba(p[2], 0.3); c.lineWidth = w * 0.003; c.fillStyle = rgba(p[2], 0.7);
    for (let i = 0; i < 42; i++) {
      let x = Math.round(R() * 16) * w / 16, y = Math.round(R() * 24) * h / 24; c.beginPath(); c.moveTo(x, y);
      for (let k = 0; k < 4; k++) { if (k % 2) x += (R() < 0.5 ? -1 : 1) * w / 16 * (1 + Math.floor(R() * 3)); else y += (R() < 0.5 ? -1 : 1) * h / 24 * (1 + Math.floor(R() * 3)); c.lineTo(x, y); }
      c.stroke(); c.beginPath(); c.arc(x, y, w * 0.006, 0, TAU); c.fill();
    }
    const hr = w * 0.07;
    c.save(); c.globalCompositeOperation = 'lighter';
    for (let q = -3; q <= 3; q++) for (let r = -3; r <= 3; r++) {
      const x = cx + hr * 1.5 * q, y = cy + hr * Math.sqrt(3) * (r + q / 2), d = Math.hypot(x - cx, y - cy) / (w * 0.5);
      if (d > 1) continue;
      c.strokeStyle = rgba(p[2], 0.55 * (1 - d)); c.lineWidth = w * 0.004; c.beginPath();
      for (let i = 0; i < 6; i++) { const a = (i / 6) * TAU; c.lineTo(x + Math.cos(a) * hr * 0.92, y + Math.sin(a) * hr * 0.92); } c.closePath(); c.stroke();
    }
    glow(c, cx, cy, w * 0.18, '#ffffff', 0.55);
    c.restore();
    c.fillStyle = 'rgba(0,0,0,0.18)'; for (let y = 0; y < h; y += Math.max(2, h * 0.006)) c.fillRect(0, y, w, Math.max(1, h * 0.002));
  };
  M.tornado = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, mix(p[0], p[1], 0.3)], [1, '#000']]);
    for (let i = 0; i < 30; i++) glow(c, R() * w, R() * h * 0.35, w * (0.15 + R() * 0.25), p[1], 0.2);
    c.save(); c.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 70; i++) {
      const t = i / 70, y = h * (0.1 + t * 0.78), rx = w * (0.45 - t * 0.38) * (0.85 + R() * 0.3), cx = w * 0.5 + Math.sin(t * 5) * w * 0.05;
      c.strokeStyle = rgba(R() < 0.6 ? p[2] : '#ffffff', 0.12 + R() * 0.25); c.lineWidth = w * (0.003 + R() * 0.006);
      c.beginPath(); c.ellipse(cx, y, rx, rx * 0.18, 0, R() * TAU, R() * TAU + Math.PI * (0.8 + R())); c.stroke();
    }
    c.restore();
    bolt(c, R, w * 0.2, 0, w * 0.35, h * 0.4, w * 0.06, p[2], w * 0.004, 2);
    c.fillStyle = 'rgba(0,0,0,0.6)'; for (let i = 0; i < 40; i++) { const x = w * 0.5 + (R() - 0.5) * w * 0.8, y = h * (0.3 + R() * 0.6), s = w * (0.004 + R() * 0.012); c.fillRect(x, y, s, s); }
  };
  M.wings = (c, w, h, R, p) => {
    vgrad(c, w, h, [[0, p[0]], [0.6, mix(p[0], p[1], 0.6)], [1, '#000']]);
    const cx = w * 0.5, cy = h * 0.42;
    glow(c, cx, h * 0.2, w * 0.8, p[2], 0.45);
    c.fillStyle = rgba(mix(p[2], '#fff', 0.3), 0.95); c.beginPath(); c.arc(cx, h * 0.2, w * 0.1, 0, TAU); c.fill();
    for (const m of [-1, 1]) for (let row = 0; row < 3; row++) {
      const n = 9 - row * 2;
      for (let i = 0; i < n; i++) {
        const t = i / (n - 1), a = -0.25 - t * 1.2, len = w * (0.42 - row * 0.1) * (1 - t * 0.35), fx = cx + m * w * 0.04, fy = cy + row * h * 0.03;
        c.save(); c.translate(fx, fy); c.scale(m, 1); c.rotate(-a - Math.PI / 2 + 0.3);
        c.fillStyle = mix(p[0], '#000', 0.3 - row * 0.1); c.strokeStyle = rgba(p[2], 0.75); c.lineWidth = w * 0.003;
        c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(len * 0.12, len * 0.5, 0, len); c.quadraticCurveTo(-len * 0.12, len * 0.5, 0, 0); c.fill(); c.stroke();
        c.restore();
      }
    }
    c.fillStyle = rgba(p[2], 0.18);
    for (let i = 0; i < 40; i++) { const x = R() * w, y = h * (0.7 + R() * 0.28), s = w * 0.012; if (R() < 0.5) c.fillRect(x, y, s, s * 2); else { c.beginPath(); c.arc(x, y, s, 0, TAU); c.fill(); } }
  };

  /* ───────── grain & finishing ───────── */
  let grainTile = null;
  function grain(c, w, h, a) {
    if (typeof document === 'undefined') return;
    if (!grainTile) {
      grainTile = document.createElement('canvas'); grainTile.width = grainTile.height = 160;
      const g = grainTile.getContext('2d'), id = g.createImageData(160, 160), R = rng(42);
      for (let i = 0; i < id.data.length; i += 4) { const v = R() * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255; }
      g.putImageData(id, 0, 0);
    }
    c.save(); c.globalAlpha = a; c.globalCompositeOperation = 'overlay';
    c.fillStyle = c.createPattern(grainTile, 'repeat'); c.fillRect(0, 0, w, h); c.restore();
  }
  function vignette(c, w, h, a) {
    const g = c.createRadialGradient(w / 2, h * 0.45, Math.min(w, h) * 0.25, w / 2, h * 0.5, Math.max(w, h) * 0.78);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`); c.fillStyle = g; c.fillRect(0, 0, w, h);
  }

  A.drawArt = function (c, w, h, spec, seed, opts) {
    opts = opts || {};
    const R = rng(seed);
    c.save();
    (M[spec.m] || M.stars)(c, w, h, R, spec.p);
    c.restore();
    c.save(); figures(c, w, h, opts.noFigures ? 'none' : spec.f, spec.p, R); c.restore();
    vignette(c, w, h, opts.vignette == null ? 0.7 : opts.vignette);
    grain(c, w, h, opts.grain == null ? 0.12 : opts.grain);
  };

  A.dateLabel = (r) => { const [y, m] = r.split('-'); return MONTHS[+m - 1] + ' ' + y; };

  function wrap(c, text, maxW) {
    const words = text.split(' '), lines = []; let line = '';
    words.forEach((wd) => { const t = line ? line + ' ' + wd : wd; if (c.measureText(t).width > maxW && line) { lines.push(line); line = wd; } else line = t; });
    if (line) lines.push(line); return lines;
  }
  A.wrap = wrap;

  A.drawPoster = function (c, w, h, p, media, opts) {
    opts = opts || {};
    A.drawArt(c, w, h, p.art, p.id, opts);
    if (opts.text === false) return;
    const pad = w * 0.07;
    const g = c.createLinearGradient(0, h * 0.5, 0, h); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.88)');
    c.fillStyle = g; c.fillRect(0, h * 0.5, w, h * 0.5);
    const tg = c.createLinearGradient(0, 0, 0, h * 0.16); tg.addColorStop(0, 'rgba(0,0,0,0.6)'); tg.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = tg; c.fillRect(0, 0, w, h * 0.16);
    c.textBaseline = 'alphabetic';
    if ('letterSpacing' in c) c.letterSpacing = (w * 0.012) + 'px';
    c.font = `800 ${w * 0.05}px "Big Shoulders Display", "Arial Narrow", sans-serif`;
    c.fillStyle = 'rgba(255,255,255,0.92)'; c.textAlign = 'left'; c.fillText('DCCU', pad, pad + w * 0.04);
    const mi = media[p.m];
    c.font = `600 ${w * 0.032}px Archivo, Arial, sans-serif`; c.textAlign = 'right';
    const lab = mi.label.toUpperCase();
    c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillText(lab, w - pad, pad + w * 0.036);
    const lw = c.measureText(lab).width;
    c.fillStyle = mi.color; c.beginPath(); c.arc(w - pad - lw - w * 0.03, pad + w * 0.025, w * 0.012, 0, TAU); c.fill();
    if ('letterSpacing' in c) c.letterSpacing = '0px';
    let fs = w * 0.13, lines;
    do { c.font = `800 ${fs}px "Big Shoulders Display", "Arial Narrow", sans-serif`; lines = wrap(c, p.t.toUpperCase(), w - pad * 2); fs *= 0.92; } while ((lines.length > 3 || lines.some((l) => c.measureText(l).width > w - pad * 2)) && fs > w * 0.05);
    fs /= 0.92;
    const dateY = h - pad * 0.9;
    if ('letterSpacing' in c) c.letterSpacing = (w * 0.008) + 'px';
    c.font = `600 ${w * 0.034}px Archivo, Arial, sans-serif`; c.textAlign = 'left';
    c.fillStyle = mix(p.art.p[2], '#ffffff', 0.35); c.fillText(A.dateLabel(p.r), pad, dateY);
    if ('letterSpacing' in c) c.letterSpacing = '0px';
    c.font = `800 ${fs}px "Big Shoulders Display", "Arial Narrow", sans-serif`; c.fillStyle = '#ffffff';
    c.shadowColor = 'rgba(0,0,0,0.6)'; c.shadowBlur = w * 0.02;
    const lh = fs * 0.92;
    lines.forEach((l, i) => c.fillText(l, pad, dateY - w * 0.06 - (lines.length - 1 - i) * lh));
    c.shadowBlur = 0;
  };

  root.DCCUArt = A;
})(typeof window !== 'undefined' ? window : globalThis);
