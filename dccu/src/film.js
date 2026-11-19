/* DCCU unveiling film: a deterministic canvas renderer. render(ctx, t) draws frame at time t (seconds).
   Logical stage is 1280×720; the film scales to any output size. Used by the page player and the MP4 renderer. */
(function (root) {
  const D = root.DCCU, A = root.DCCUArt;
  const W = 1280, H = 720, TAU = Math.PI * 2;
  const DISPLAY = '"Big Shoulders Display", "Arial Narrow", sans-serif';
  const SERIF = 'Cinzel, Georgia, serif';
  const SANS = 'Archivo, Arial, sans-serif';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = (x) => { x = clamp(x, 0, 1); return 1 - Math.pow(1 - x, 3); };
  const easeIO = (x) => { x = clamp(x, 0, 1); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  const fade = (t, a, b, f) => clamp(Math.min((t - a) / f, (b - t) / f), 0, 1);
  const NUMWORDS = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six'];

  function build() {
    const segs = []; let t = 0;
    const push = (s) => { s.start = t; t += s.dur; segs.push(s); };
    const rel = [...D.projects].sort((a, b) => a.r.localeCompare(b.r));
    push({ type: 'intro', dur: 11 });
    push({ type: 'mediums', dur: 7.5 });
    let n = 0;
    D.chapters.forEach((ch) => {
      const list = rel.filter((p) => p.ch === ch.n);
      push({ type: 'chapter', ch, dur: 4.2, count: list.length, mediums: new Set(list.map((p) => p.m)).size });
      list.forEach((p) => push({ type: 'project', p, ch, dur: 2.9, n: ++n }));
    });
    push({ type: 'timelines', dur: 19.5 });
    push({ type: 'outro', dur: 10.5 });
    return { segs, total: t, rel };
  }

  function createFilm(opts) {
    const doc = opts.document || document;
    const pw = opts.width || W, ph = opts.height || H, S = pw / W;
    const mk = (w, h) => { const c = doc.createElement('canvas'); c.width = Math.round(w); c.height = Math.round(h); return c; };
    const { segs, total, rel } = build();
    const R = A.rng('film');
    const starsArr = Array.from({ length: 320 }, () => ({ x: R() * W, y: R() * H, z: 0.2 + R() * 0.8, a: 0.3 + R() * 0.7, tw: R() * TAU }));
    const dust = Array.from({ length: 70 }, () => ({ x: R() * W, y: R() * H, vx: (R() - 0.3) * 14, vy: -6 - R() * 16, r: 0.6 + R() * 2.2, a: 0.15 + R() * 0.5, ph: R() * TAU }));
    const POSTER = { x: 96, y: 70, w: 386, h: 579 };
    const posters = {}, blurs = {}, chapterArt = {};
    const buf = mk(pw, ph), bctx = buf.getContext('2d');
    const titleBuf = mk(W * S, 360 * S), tctx = titleBuf.getContext('2d');

    function poster(p) {
      if (!posters[p.id]) {
        const c = mk(POSTER.w * S * 1.08, POSTER.h * S * 1.08);
        A.drawArt(c.getContext('2d'), c.width, c.height, p.art, p.id, { grain: 0.1 });
        posters[p.id] = c;
        const b = mk(36, 20), g = b.getContext('2d');
        g.drawImage(c, 0, c.height * 0.2, c.width, c.height * 0.45, 0, 0, 36, 20);
        blurs[p.id] = b;
      }
      return posters[p.id];
    }
    function chapterCanvas(ch) {
      if (!chapterArt[ch.n]) {
        const c = mk(W * S * 1.1, H * S * 1.1);
        A.drawArt(c.getContext('2d'), c.width, c.height, { m: ch.motif, p: ch.pal, f: 'none' }, 'chapter-' + ch.n, { vignette: 0.8, grain: 0.1 });
        chapterArt[ch.n] = c;
      }
      return chapterArt[ch.n];
    }
    function prewarm() { rel.forEach(poster); D.chapters.forEach(chapterCanvas); }

    /* ── drawing helpers (logical coords) ── */
    function ls(c, px) { if ('letterSpacing' in c) c.letterSpacing = px + 'px'; }
    function text(c, s, x, y, font, color, align, spacing, alpha) {
      c.save(); c.font = font; c.fillStyle = color; c.textAlign = align || 'left'; c.textBaseline = 'alphabetic';
      if (alpha != null) c.globalAlpha *= alpha; ls(c, spacing || 0); c.fillText(s, x, y); c.restore();
    }
    function measure(c, s, font, spacing) { c.save(); c.font = font; ls(c, spacing || 0); const w = c.measureText(s).width; c.restore(); return w; }
    function wrapLines(c, s, font, maxW) { c.save(); c.font = font; ls(c, 0); const l = A.wrap(c, s, maxW); c.restore(); return l; }
    function glow(c, x, y, r, col, a) {
      const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, A.rgba(col, a)); g.addColorStop(1, A.rgba(col, 0));
      c.fillStyle = g; c.fillRect(x - r, y - r, 2 * r, 2 * r);
    }
    function starfield(c, t, alpha, speed) {
      c.save();
      starsArr.forEach((s) => {
        const x = ((s.x - t * (speed || 6) * s.z) % W + W) % W;
        c.globalAlpha = alpha * s.a * (0.7 + 0.3 * Math.sin(t * 2 + s.tw));
        c.fillStyle = '#fff'; c.beginPath(); c.arc(x, s.y, s.z * 1.3, 0, TAU); c.fill();
      });
      c.restore();
    }
    function dustLayer(c, t, col, alpha) {
      c.save(); c.globalCompositeOperation = 'lighter';
      dust.forEach((d) => {
        const x = ((d.x + d.vx * t) % W + W) % W, y = ((d.y + d.vy * t) % H + H) % H;
        c.globalAlpha = alpha * d.a * (0.6 + 0.4 * Math.sin(t * 1.7 + d.ph));
        c.fillStyle = col; c.beginPath(); c.arc(x, y, d.r, 0, TAU); c.fill();
      });
      c.restore();
    }
    function roundRect(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
    function watermark(c, alpha) {
      text(c, 'DCCU', W - 40, 44, `800 22px ${DISPLAY}`, '#ffffff', 'right', 4, 0.8 * alpha);
      text(c, 'FAN CONCEPT', W - 40, 62, `600 10px ${SANS}`, '#ffffff', 'right', 3, 0.5 * alpha);
    }

    /* ── scenes ── */
    function intro(c, lt) {
      c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
      starfield(c, lt, ease(lt / 2.5), 5);
      const lines = [['Eighty-eight years of stories.', 0.5, 2.7], ['One hundred forty-one characters.', 2.7, 4.9], ['One universe.', 4.9, 6.9]];
      lines.forEach(([s, a, b]) => {
        const al = fade(lt, a, b, 0.45); if (al <= 0) return;
        c.save(); c.globalAlpha = al; const sc = 1 + (lt - a) * 0.012; c.translate(W / 2, H / 2 + 12); c.scale(sc, sc);
        text(c, s, 0, 0, `600 40px ${SERIF}`, '#f4ead2', 'center', 4); c.restore();
      });
      if (lt > 6.7) {
        const k = ease((lt - 6.8) / 1.3), out = clamp((11 - lt) / 0.5, 0, 1);
        c.save(); c.globalAlpha = out;
        c.save(); c.globalCompositeOperation = 'lighter';
        const burst = clamp((lt - 6.8) / 0.4, 0, 1) * (1 - clamp((lt - 7.2) / 3, 0, 0.6));
        glow(c, W / 2, H / 2 - 30, 700, '#f2b632', 0.5 * burst);
        glow(c, W / 2, H / 2 - 30, 260, '#ffffff', 0.35 * burst);
        for (let i = 0; i < 36; i++) {
          const a = (i / 36) * TAU + lt * 0.03, l = 900;
          c.fillStyle = A.rgba('#f2b632', 0.05 * burst);
          c.beginPath(); c.moveTo(W / 2, H / 2 - 30); c.lineTo(W / 2 + Math.cos(a - 0.03) * l, H / 2 - 30 + Math.sin(a - 0.03) * l); c.lineTo(W / 2 + Math.cos(a + 0.03) * l, H / 2 - 30 + Math.sin(a + 0.03) * l); c.fill();
        }
        c.restore();
        // title with light sweep
        tctx.setTransform(1, 0, 0, 1, 0, 0); tctx.clearRect(0, 0, titleBuf.width, titleBuf.height); tctx.setTransform(S, 0, 0, S, 0, 0);
        tctx.globalCompositeOperation = 'source-over';
        text(tctx, 'DCCU', W / 2, 230, `800 230px ${DISPLAY}`, '#ffffff', 'center', 70 - 46 * k);
        tctx.globalCompositeOperation = 'source-atop';
        const sx = -300 + ((lt - 7.0) / 2.2) * 1900;
        const g = tctx.createLinearGradient(sx - 160, 0, sx + 160, 0);
        g.addColorStop(0, 'rgba(242,182,50,0)'); g.addColorStop(0.5, 'rgba(255,214,120,0.95)'); g.addColorStop(1, 'rgba(242,182,50,0)');
        tctx.fillStyle = g; tctx.fillRect(0, 0, W, 360);
        tctx.globalCompositeOperation = 'source-over';
        c.save(); c.globalAlpha *= k; c.translate(0, 18 * (1 - k)); c.drawImage(titleBuf, 0, 120, W, 360); c.restore();
        text(c, 'THE DC CONNECTED UNIVERSE', W / 2, 420, `600 30px ${SERIF}`, '#f4ead2', 'center', 10, ease((lt - 7.8) / 0.8));
        text(c, 'A FAN-MADE SLATE  ·  SIX CHAPTERS  ·  2028–2041', W / 2, 462, `600 15px ${SANS}`, '#f2b632', 'center', 5, ease((lt - 8.4) / 0.8));
        text(c, 'Unofficial fan concept. Not affiliated with or endorsed by DC or Warner Bros. Discovery. Characters belong to their owners.', W / 2, 682, `400 13px ${SANS}`, '#ffffff', 'center', 0.5, 0.55 * ease((lt - 8.4) / 0.8));
        c.restore();
      }
    }

    function mediums(c, lt, seg) {
      c.fillStyle = '#05060a'; c.fillRect(0, 0, W, H);
      starfield(c, lt + 11, 0.5, 5);
      const out = clamp((seg.dur - lt) / 0.4, 0, 1);
      c.save(); c.globalAlpha = out;
      const head = ease(lt / 0.7);
      text(c, 'FIVE MEDIUMS. ONE CANON.', W / 2, 140 + 14 * (1 - head), `800 64px ${DISPLAY}`, '#ffffff', 'center', 6, head);
      text(c, 'Every film, series and game is part of the same story.', W / 2, 180, `400 20px ${SANS}`, '#c9c4b8', 'center', 0, ease((lt - 0.4) / 0.7));
      const keys = ['LF', 'LS', 'AF', 'AS', 'VG'], names = ['LIVE-ACTION FILMS', 'LIVE-ACTION SERIES', 'ANIMATED FILMS', 'ANIMATED SERIES', 'VIDEO GAMES'];
      keys.forEach((k, i) => {
        const m = D.media[k], cnt = D.projects.filter((p) => p.m === k).length, x = 168 + i * 236, d = 0.7 + i * 0.28, e = ease((lt - d) / 0.7);
        if (e <= 0) return;
        c.save(); c.globalAlpha *= e;
        c.globalCompositeOperation = 'lighter'; glow(c, x, 380, 170, m.color, 0.18 * e); c.globalCompositeOperation = 'source-over';
        c.fillStyle = m.color; c.fillRect(x - 60, 268, 120 * e, 4);
        const shown = Math.round(cnt * ease((lt - d) / 1.0));
        text(c, String(shown), x, 420, `800 140px ${DISPLAY}`, '#ffffff', 'center', 0);
        text(c, names[i], x, 462, `600 14px ${SANS}`, m.color, 'center', 3);
        const ex = D.projects.filter((p) => p.m === k).slice(0, 2).map((p) => p.t);
        ex.forEach((s, j) => text(c, s, x, 500 + j * 22, `400 14px ${SANS}`, '#b9b4a8', 'center', 0, ease((lt - d - 0.5) / 0.6)));
        c.restore();
      });
      text(c, '76 PROJECTS  ·  141 CHARACTERS  ·  2028 TO 2041', W / 2, 632, `600 16px ${SANS}`, '#f4ead2', 'center', 5, ease((lt - 2.6) / 0.8));
      c.restore();
    }

    function chapter(c, lt, seg) {
      const ch = seg.ch, art = chapterCanvas(ch), z = 1 + lt * 0.015;
      c.save(); c.translate(W / 2, H / 2); c.scale(z, z); c.drawImage(art, -W * 0.55, -H * 0.55, W * 1.1, H * 1.1); c.restore();
      c.fillStyle = 'rgba(0,0,0,0.5)'; c.fillRect(0, 0, W, H);
      const g = c.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, 760); g.addColorStop(0, 'rgba(0,0,0,0.15)'); g.addColorStop(1, 'rgba(0,0,0,0.75)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
      const a1 = ease((lt - 0.15) / 0.6), a2 = ease((lt - 0.35) / 0.7), a3 = ease((lt - 0.8) / 0.7), a4 = ease((lt - 1.2) / 0.7);
      text(c, 'CHAPTER ' + NUMWORDS[ch.n].toUpperCase(), W / 2, 238, `600 28px ${SERIF}`, ch.color, 'center', 16 - 6 * a1, a1);
      c.save(); c.shadowColor = 'rgba(0,0,0,0.6)'; c.shadowBlur = 30;
      text(c, ch.title.toUpperCase(), W / 2, 380 + 24 * (1 - a2), `800 ${ch.title.length > 16 ? 120 : 150}px ${DISPLAY}`, '#ffffff', 'center', 8, a2);
      c.restore();
      text(c, ch.years, W / 2, 432, `600 22px ${SANS}`, '#ffffff', 'center', 8, a3 * 0.9);
      const lines = wrapLines(c, ch.tag, `italic 400 24px ${SANS}`, 900);
      lines.forEach((l, i) => text(c, l, W / 2, 492 + i * 32, `italic 400 24px ${SANS}`, '#f1ece2', 'center', 0, a4));
      text(c, `${seg.count} PROJECTS  ·  ${seg.mediums} MEDIUMS`, W / 2, 600, `600 14px ${SANS}`, ch.color, 'center', 5, a4);
      c.save(); c.globalCompositeOperation = 'lighter'; glow(c, W / 2, 340, 640, ch.color, 0.22 * (1 - clamp(lt / 1.5, 0, 1))); c.restore();
      const flash = 1 - clamp(lt / 0.4, 0, 1); if (flash > 0) { c.fillStyle = `rgba(255,255,255,${0.55 * flash})`; c.fillRect(0, 0, W, H); }
      watermark(c, a1);
    }

    const RX = 548, RW = 660;
    function rulerX(r) { const [y, m] = r.split('-').map(Number); return RX + ((y + (m - 1) / 12 - 2028) / 14) * RW; }
    function project(c, lt, seg, t) {
      const p = seg.p, ch = seg.ch, pal = p.art.p, mi = D.media[p.m];
      const pc = poster(p);
      c.save(); c.imageSmoothingEnabled = true; c.imageSmoothingQuality = 'high';
      c.drawImage(blurs[p.id], -60, -60, W + 120, H + 120); c.restore();
      c.fillStyle = 'rgba(4,4,8,0.62)'; c.fillRect(0, 0, W, H);
      const lg = c.createLinearGradient(0, 0, W, 0); lg.addColorStop(0, 'rgba(0,0,0,0.35)'); lg.addColorStop(0.45, 'rgba(0,0,0,0.15)'); lg.addColorStop(1, 'rgba(0,0,0,0.55)'); c.fillStyle = lg; c.fillRect(0, 0, W, H);
      c.save(); c.globalCompositeOperation = 'lighter'; glow(c, POSTER.x + POSTER.w / 2, POSTER.y + POSTER.h * 0.45, 520, pal[2], 0.13); c.restore();
      dustLayer(c, t, pal[2], 0.6);
      // poster
      const pe = ease(lt / 0.55), z = 1 + lt * 0.012;
      c.save(); c.globalAlpha = pe; c.translate(-26 * (1 - pe), 0);
      c.shadowColor = 'rgba(0,0,0,0.7)'; c.shadowBlur = 40; c.shadowOffsetY = 18;
      c.fillStyle = '#000'; c.fillRect(POSTER.x, POSTER.y, POSTER.w, POSTER.h); c.restore();
      c.save(); c.globalAlpha = pe; c.translate(-26 * (1 - pe), 0);
      c.beginPath(); c.rect(POSTER.x, POSTER.y, POSTER.w, POSTER.h); c.clip();
      const pw2 = POSTER.w * 1.08 * z / 1.04, ph2 = POSTER.h * 1.08 * z / 1.04;
      c.drawImage(pc, POSTER.x + POSTER.w / 2 - pw2 / 2, POSTER.y + POSTER.h / 2 - ph2 / 2, pw2, ph2);
      c.restore();
      c.save(); c.globalAlpha = pe * 0.35; c.strokeStyle = '#fff'; c.lineWidth = 1; c.strokeRect(POSTER.x + 0.5 - 26 * (1 - pe), POSTER.y + 0.5, POSTER.w - 1, POSTER.h - 1); c.restore();
      // right column
      const el = (k) => ease((lt - 0.12 - k * 0.07) / 0.5);
      const slide = (k) => 22 * (1 - el(k));
      let y = 118;
      text(c, `CHAPTER ${NUMWORDS[ch.n].toUpperCase()}  ·  ${ch.title.toUpperCase()}`, RX + slide(0), y, `600 13px ${SANS}`, ch.color, 'left', 4, el(0));
      y += 26;
      c.save(); c.globalAlpha = el(1); c.translate(slide(1), 0);
      const lab = mi.label.toUpperCase(), lw = measure(c, lab, `600 13px ${SANS}`, 3);
      roundRect(c, RX, y, lw + 34, 28, 14); c.fillStyle = A.rgba(mi.color, 0.16); c.fill(); c.strokeStyle = A.rgba(mi.color, 0.7); c.lineWidth = 1; c.stroke();
      c.fillStyle = mi.color; c.beginPath(); c.arc(RX + 14, y + 14, 4, 0, TAU); c.fill();
      text(c, lab, RX + 24, y + 19, `600 13px ${SANS}`, '#ffffff', 'left', 3);
      text(c, A.dateLabel(p.r), RX + lw + 50, y + 19, `600 13px ${SANS}`, '#ffffff', 'left', 3, 0.8);
      c.restore();
      y += 40;
      let fs = 78, lines;
      do { lines = wrapLines(c, p.t.toUpperCase(), `800 ${fs}px ${DISPLAY}`, RW - 20); fs -= 4; } while (lines.length > 2 && fs > 50);
      fs += 4;
      const lh = fs * 0.95;
      c.save(); c.shadowColor = 'rgba(0,0,0,0.5)'; c.shadowBlur = 18;
      lines.forEach((l, i) => text(c, l, RX + slide(2), y + fs * 0.82 + i * lh, `800 ${fs}px ${DISPLAY}`, '#ffffff', 'left', 1, el(2)));
      c.restore();
      y += fs * 0.82 + (lines.length - 1) * lh + 40;
      const ll = wrapLines(c, p.log, `italic 400 22px ${SANS}`, RW - 30).slice(0, 3);
      ll.forEach((l, i) => text(c, l, RX + slide(3), y + i * 30, `italic 400 22px ${SANS}`, '#f1ece2', 'left', 0, el(3)));
      y += ll.length * 30 + 18;
      text(c, `${p.fmt.toUpperCase()}  ·  SET IN ${p.sl.toUpperCase()}`, RX + slide(4), y, `600 12px ${SANS}`, '#b9b4a8', 'left', 2.5, el(4));
      y += 34;
      text(c, 'ADAPTS', RX + slide(5), y, `600 11px ${SANS}`, mi.color, 'left', 3, el(5));
      const srcl = wrapLines(c, p.src.join('  ·  '), `400 15px ${SANS}`, RW - 30).slice(0, 2);
      srcl.forEach((l, i) => text(c, l, RX + 70 + slide(5), y + i * 21, `400 15px ${SANS}`, '#d8d3c8', 'left', 0, el(5)));
      y += srcl.length * 21 + 18;
      c.save(); c.globalAlpha = el(6); c.translate(slide(6), 0);
      let cx = RX; const chipY = y; let row = 0;
      const names = p.cast.map((k) => D.byKey[k].short);
      for (let i = 0; i < names.length; i++) {
        const w = measure(c, names[i], `600 13px ${SANS}`, 0.5) + 22;
        if (cx + w > RX + RW) { row++; cx = RX; if (row > 1) { text(c, `+${names.length - i} more`, cx, chipY + row * 34 + 18, `600 13px ${SANS}`, '#b9b4a8', 'left', 0.5); break; } }
        roundRect(c, cx, chipY + row * 34, w, 26, 13); c.fillStyle = 'rgba(255,255,255,0.08)'; c.fill(); c.strokeStyle = 'rgba(255,255,255,0.18)'; c.stroke();
        text(c, names[i], cx + 11, chipY + row * 34 + 18, `600 13px ${SANS}`, '#ffffff', 'left', 0.5);
        cx += w + 8;
      }
      c.restore();
      // release ruler
      const ry = 676, ra = ease((lt - 0.3) / 0.6);
      c.save(); c.globalAlpha = ra;
      c.strokeStyle = 'rgba(255,255,255,0.22)'; c.lineWidth = 1; c.beginPath(); c.moveTo(RX, ry); c.lineTo(RX + RW, ry); c.stroke();
      for (let yr = 2028; yr <= 2041; yr++) {
        const x = RX + ((yr - 2028) / 14) * RW;
        c.fillStyle = 'rgba(255,255,255,0.3)'; c.fillRect(x, ry - 4, 1, 8);
        if (yr % 2 === 0) text(c, String(yr), x, ry + 20, `600 10px ${SANS}`, '#ffffff', 'center', 1, 0.45);
      }
      rel.forEach((q) => { c.fillStyle = q === p ? '#fff' : A.rgba(D.media[q.m].color, q.idx === p.idx ? 1 : 0.45); c.beginPath(); c.arc(rulerX(q.r), ry, q === p ? 0 : 2.4, 0, TAU); c.fill(); });
      const mx = rulerX(p.r);
      c.globalCompositeOperation = 'lighter'; glow(c, mx, ry, 26, mi.color, 0.9); c.globalCompositeOperation = 'source-over';
      c.fillStyle = '#fff'; c.beginPath(); c.arc(mx, ry, 5, 0, TAU); c.fill();
      text(c, `${String(seg.n).padStart(2, '0')} / ${rel.length}`, RX + RW, ry - 14, `600 11px ${SANS}`, '#ffffff', 'right', 2, 0.6);
      c.restore();
      watermark(c, 1);
    }

    /* ── three timelines: dots morph between layouts ── */
    const L0 = 120, L1 = 1160;
    const layoutRelease = {}, layoutChrono = {}, layoutMedium = {};
    (function layouts() {
      const byYear = {};
      rel.forEach((p) => { const y = +p.r.slice(0, 4); (byYear[y] = byYear[y] || []).push(p); });
      const colW = (L1 - L0) / 14;
      Object.entries(byYear).forEach(([y, list]) => list.forEach((p, i) => {
        layoutRelease[p.id] = [L0 + (y - 2028) * colW + 14 + (i % 3) * 21, 470 - Math.floor(i / 3) * 21];
      }));
      const bands = [
        { id: 'ancient', label: 'ANCIENT WORLD', w: 120 }, { id: 'legend', label: 'LEGEND', w: 80 }, { id: 'golden', label: 'GOLDEN AGE', w: 110 },
        { id: 'heroic', label: 'THE HEROIC AGE  ·  YEARS 1–18', w: 620 }, { id: 'future', label: 'FUTURES', w: 110 }
      ];
      let x = L0;
      bands.forEach((b) => { b.x = x; x += b.w; });
      const chron = [...D.projects].sort((a, b) => a.sy - b.sy || a.r.localeCompare(b.r));
      bands.forEach((b) => {
        const test = D.bands.find((d) => d.id === b.id).test;
        const list = chron.filter((p) => test(p.sy));
        list.forEach((p, i) => {
          const rows = b.id === 'heroic' ? 3 : 2;
          const per = Math.ceil(list.length / rows) || 1;
          const col = Math.floor(i / rows), r = i % rows;
          const step = (b.w - 20) / Math.max(per, 1);
          layoutChrono[p.id] = [b.x + 10 + step * (col + 0.5), 430 + r * 24];
        });
      });
      layoutChrono.bands = bands;
      const lanes = ['LF', 'LS', 'AF', 'AS', 'VG'];
      rel.forEach((p) => {
        const lane = lanes.indexOf(p.m), [y, m] = p.r.split('-').map(Number);
        layoutMedium[p.id] = [L0 + 150 + ((y + (m - 1) / 12 - 2028) / 14) * (L1 - L0 - 160), 268 + lane * 66];
      });
    })();
    function timelines(c, lt, seg) {
      c.fillStyle = '#05060a'; c.fillRect(0, 0, W, H);
      starfield(c, lt + 300, 0.35, 4);
      const phase = lt < 6.5 ? 0 : lt < 13 ? 1 : 2, pt = lt - phase * 6.5;
      const heads = [['01', 'RELEASE ORDER', 'When each project premieres, chapter by chapter.'], ['02', 'STORY CHRONOLOGY', 'Where each story falls in DC history, from 50,000 BCE to the 31st century.'], ['03', 'BY MEDIUM', 'Five parallel tracks, one continuity.']];
      const out = clamp((seg.dur - lt) / 0.5, 0, 1);
      c.save(); c.globalAlpha = out;
      text(c, 'THREE WAYS TO WATCH', W / 2, 78, `600 18px ${SERIF}`, '#f2b632', 'center', 8, ease(lt / 0.6));
      const ha = fade(pt, 0, 6.5, 0.45);
      text(c, heads[phase][0], W / 2, 150, `800 26px ${DISPLAY}`, '#f2b632', 'center', 4, ha);
      text(c, heads[phase][1], W / 2, 210, `800 64px ${DISPLAY}`, '#ffffff', 'center', 6, ha);
      text(c, heads[phase][2], W / 2, 246, `400 19px ${SANS}`, '#c9c4b8', 'center', 0, ha);
      const from = phase === 0 ? null : phase === 1 ? layoutRelease : layoutChrono, to = [layoutRelease, layoutChrono, layoutMedium][phase];
      const mt = from ? easeIO(pt / 1.4) : 1;
      // guides
      const ga = phase === 0 ? ease(pt / 0.8) : ease((pt - 1.0) / 0.6);
      c.save(); c.globalAlpha *= ga * ha;
      if (phase === 0) {
        const colW = (L1 - L0) / 14;
        c.strokeStyle = 'rgba(255,255,255,0.2)'; c.beginPath(); c.moveTo(L0, 492); c.lineTo(L1, 492); c.stroke();
        for (let y = 2028; y <= 2041; y++) text(c, String(y), L0 + (y - 2028) * colW + colW / 2, 518, `600 13px ${SANS}`, '#ffffff', 'center', 1, 0.7);
        D.chapters.forEach((ch) => {
          const ps = rel.filter((p) => p.ch === ch.n), xs = ps.map((p) => layoutRelease[p.id][0]);
          const x0 = Math.min(...xs) - 9, x1 = Math.max(...xs) + 9;
          c.fillStyle = ch.color; c.fillRect(x0, 540, x1 - x0, 3);
          text(c, NUMWORDS[ch.n].toUpperCase(), (x0 + x1) / 2, 562, `600 11px ${SANS}`, ch.color, 'center', 2);
        });
      } else if (phase === 1) {
        layoutChrono.bands.forEach((b) => {
          c.fillStyle = 'rgba(255,255,255,0.18)'; c.fillRect(b.x + 4, 492, b.w - 8, 2);
          text(c, b.label, b.x + b.w / 2, 518, `600 11px ${SANS}`, '#ffffff', 'center', 2, 0.75);
        });
        text(c, '50,000 BCE', L0, 405, `600 11px ${SANS}`, '#c9c4b8', 'left', 1);
        text(c, '31st CENTURY', L1, 405, `600 11px ${SANS}`, '#c9c4b8', 'right', 1);
      } else {
        ['LIVE-ACTION FILM', 'LIVE-ACTION SERIES', 'ANIMATED FILM', 'ANIMATED SERIES', 'VIDEO GAME'].forEach((s, i) => {
          const col = D.media[['LF', 'LS', 'AF', 'AS', 'VG'][i]].color;
          c.strokeStyle = A.rgba(col, 0.3); c.beginPath(); c.moveTo(L0 + 150, 268 + i * 66); c.lineTo(L1, 268 + i * 66); c.stroke();
          text(c, s, L0 + 130, 272 + i * 66, `600 12px ${SANS}`, col, 'right', 2);
        });
        for (let y = 2028; y <= 2041; y += 2) text(c, String(y), L0 + 150 + ((y - 2028) / 14) * (L1 - L0 - 160), 610, `600 11px ${SANS}`, '#ffffff', 'center', 1, 0.5);
      }
      c.restore();
      // dots
      const appear = phase === 0 ? pt : 99;
      rel.forEach((p, i) => {
        const b = to[p.id], a = from ? from[p.id] : b;
        const x = a[0] + (b[0] - a[0]) * mt, y = a[1] + (b[1] - a[1]) * mt + (from ? Math.sin(mt * Math.PI) * (i % 2 ? -30 : 30) : 0);
        const ap = phase === 0 ? ease((appear - 0.4 - i * 0.03) / 0.3) : 1;
        if (ap <= 0) return;
        const col = D.media[p.m].color;
        c.save(); c.globalAlpha *= ap; c.globalCompositeOperation = 'lighter'; glow(c, x, y, 16, col, 0.5); c.restore();
        c.save(); c.globalAlpha *= ap; c.fillStyle = col; c.beginPath(); c.arc(x, y, 6.5, 0, TAU); c.fill(); c.restore();
      });
      // legend
      let lx = W / 2 - 330;
      [['LF', 'Film'], ['LS', 'Series'], ['AF', 'Animated film'], ['AS', 'Animated series'], ['VG', 'Game']].forEach(([k, s]) => {
        c.fillStyle = D.media[k].color; c.beginPath(); c.arc(lx, 668, 6, 0, TAU); c.fill();
        text(c, s, lx + 14, 673, `600 14px ${SANS}`, '#ffffff', 'left', 0.5, 0.8);
        lx += measure(c, s, `600 14px ${SANS}`, 0.5) + 52;
      });
      c.restore();
    }

    function outro(c, lt, seg) {
      const ch = D.chapters[5], art = chapterCanvas(ch), z = 1.02 + lt * 0.01;
      c.save(); c.translate(W / 2, H / 2); c.scale(z, z); c.drawImage(art, -W * 0.55, -H * 0.55, W * 1.1, H * 1.1); c.restore();
      c.fillStyle = 'rgba(0,0,0,0.55)'; c.fillRect(0, 0, W, H);
      const a1 = ease((lt - 0.3) / 0.9), a2 = ease((lt - 1.1) / 0.8), a3 = ease((lt - 1.9) / 0.8), a4 = ease((lt - 2.8) / 0.8);
      text(c, 'THE SAGA CONTINUES', W / 2, 220, `600 26px ${SERIF}`, '#ffe8a3', 'center', 12, a1);
      c.save(); c.shadowColor = 'rgba(0,0,0,0.6)'; c.shadowBlur = 40;
      text(c, 'DCCU', W / 2, 400, `800 210px ${DISPLAY}`, '#ffffff', 'center', 26, a2);
      c.restore();
      text(c, '6 CHAPTERS  ·  76 PROJECTS  ·  141 CHARACTERS  ·  2028–2041', W / 2, 456, `600 17px ${SANS}`, '#ffffff', 'center', 5, a3);
      text(c, 'Every plot, timeline and source comic is on the companion page.', W / 2, 500, `italic 400 21px ${SANS}`, '#f1ece2', 'center', 0, a4);
      text(c, 'Unofficial fan concept. Not affiliated with or endorsed by DC or Warner Bros. Discovery. Characters belong to their owners.', W / 2, 676, `400 13px ${SANS}`, '#ffffff', 'center', 0.5, 0.6 * a4);
      const black = clamp((lt - (seg.dur - 1.6)) / 1.4, 0, 1);
      if (black > 0) { c.fillStyle = `rgba(0,0,0,${black})`; c.fillRect(0, 0, W, H); }
    }

    const SCENES = { intro, mediums, chapter, project, timelines, outro };
    function segAt(t) { let lo = 0, hi = segs.length - 1; while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (segs[mid].start <= t) lo = mid; else hi = mid - 1; } return lo; }
    function drawSeg(c, i, t) {
      const s = segs[i]; c.save(); c.setTransform(S, 0, 0, S, 0, 0);
      SCENES[s.type](c, clamp(t - s.start, 0, s.dur), s, t); c.restore();
    }
    const XF = 0.38;
    function render(out, t) {
      t = clamp(t, 0, total - 1e-6);
      const i = segAt(t), lt = t - segs[i].start;
      const cross = i > 0 && lt < XF && segs[i].type === 'project' || (i > 0 && lt < XF && segs[i - 1].type === 'project' && segs[i].type !== 'chapter');
      out.save(); out.setTransform(1, 0, 0, 1, 0, 0);
      if (cross) {
        drawSeg(out, i - 1, t);
        bctx.setTransform(1, 0, 0, 1, 0, 0); bctx.clearRect(0, 0, pw, ph);
        drawSeg(bctx, i, t);
        out.globalAlpha = easeIO(lt / XF); out.drawImage(buf, 0, 0); out.globalAlpha = 1;
      } else drawSeg(out, i, t);
      out.restore();
    }
    function chapterMarks() { return segs.filter((s) => s.type === 'chapter').map((s) => ({ t: s.start, n: s.ch.n, title: s.ch.title, color: s.ch.color })); }
    function cues() { return segs.map((s) => ({ type: s.type, start: +s.start.toFixed(3), dur: s.dur, ch: s.ch ? s.ch.n : 0 })); }
    return { render, total, segs, prewarm, chapterMarks, cues, width: pw, height: ph };
  }

  root.DCCUFilm = { create: createFilm, build };
})(typeof window !== 'undefined' ? window : globalThis);
