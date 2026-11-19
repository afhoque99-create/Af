/* DCCU companion page: unveiling player, three timelines, project dossiers and the source library. */
(function () {
  const D = window.DCCU, A = window.DCCUArt;
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => [...(el || document).querySelectorAll(s)];
  const h = (tag, attrs, ...kids) => {
    const el = document.createElement(tag);
    if (attrs) for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v; else if (k === 'style') el.setAttribute('style', v);
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v); else el.setAttribute(k, v === true ? '' : v);
    }
    kids.flat().forEach((k) => k != null && el.append(k.nodeType ? k : document.createTextNode(k)));
    return el;
  };
  const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const shortDate = (r) => { const [y, m] = r.split('-'); return MONTH[+m - 1] + ' ' + y; };
  const NUM = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six'];
  const rel = [...D.projects].sort((a, b) => a.r.localeCompare(b.r));
  const chron = [...D.projects].sort((a, b) => a.sy - b.sy || a.r.localeCompare(b.r));
  const byId = Object.fromEntries(D.projects.map((p) => [p.id, p]));
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } } };

  const FONTS = ['800 40px "Big Shoulders Display"', '600 20px "Big Shoulders Display"', '600 20px Archivo', '400 20px Archivo', 'italic 400 20px Archivo', '600 20px Cinzel'];
  const fontsReady = Promise.all(FONTS.map((f) => document.fonts.load(f).catch(() => null))).then(() => document.fonts.ready);

  /* ───────── thumbnails (generated, cached as JPEG data URLs) ───────── */
  const thumbCache = {}, posterCache = {};
  function thumb(p) {
    if (!thumbCache[p.id]) {
      const c = document.createElement('canvas'); c.width = 300; c.height = 450;
      A.drawArt(c.getContext('2d'), 300, 450, p.art, p.id, { grain: 0.1 });
      thumbCache[p.id] = c.toDataURL('image/jpeg', 0.86);
    }
    return thumbCache[p.id];
  }
  function posterURL(p) {
    if (!posterCache[p.id]) {
      const c = document.createElement('canvas'); c.width = 600; c.height = 900;
      A.drawPoster(c.getContext('2d'), 600, 900, p, D.media, { grain: 0.1 });
      posterCache[p.id] = c.toDataURL('image/jpeg', 0.9);
    }
    return posterCache[p.id];
  }
  let io = null;
  const pending = new Set();
  function lazyImg(img) {
    if (!io) {
      io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); fill(e.target); } }), { rootMargin: '400px' });
    }
    pending.add(img); io.observe(img);
  }
  function fill(img) { pending.delete(img); fontsReady.then(() => { img.src = thumb(byId[img.dataset.id]); img.classList.add('ready'); }); }

  /* ───────── cards ───────── */
  function mediumTag(p) { const m = D.media[p.m]; return h('span', { class: 'mtag', style: `--c:${m.color}` }, h('i'), m.label); }
  function card(p, variant) {
    const img = h('img', { alt: '', 'data-id': p.id, width: 300, height: 450, decoding: 'async' });
    lazyImg(img);
    return h('button', { class: 'card ' + (variant || ''), type: 'button', 'data-id': p.id, 'data-m': p.m, 'aria-label': `${p.t}, ${D.media[p.m].label}, ${shortDate(p.r)}` },
      h('span', { class: 'thumb' }, img),
      h('span', { class: 'meta' }, mediumTag(p), h('span', { class: 'ctitle' }, p.t), h('span', { class: 'cdate' }, variant === 'row' ? `${shortDate(p.r)}  ·  ${p.fmt}` : shortDate(p.r))));
  }

  /* ───────── timelines ───────── */
  const views = { release: null, chronology: null, medium: null };
  function buildRelease() {
    const wrap = h('div', { class: 'view-release' });
    D.chapters.forEach((ch) => {
      const list = rel.filter((p) => p.ch === ch.n);
      wrap.append(h('section', { class: 'chapter', style: `--cc:${ch.color}` },
        h('header', { class: 'chead' },
          h('div', { class: 'cnum' }, 'Chapter ' + NUM[ch.n]),
          h('h3', null, ch.title),
          h('div', { class: 'cyears' }, ch.years + '  ·  ' + list.length + ' projects'),
          h('p', { class: 'ctag' }, ch.tag)),
        h('div', { class: 'grid' }, list.map((p) => card(p)))));
    });
    return wrap;
  }
  function buildChronology() {
    const wrap = h('div', { class: 'view-chron' });
    D.bands.forEach((b) => {
      const list = chron.filter((p) => b.test(p.sy));
      if (!list.length) return;
      wrap.append(h('section', { class: 'band' },
        h('h3', { class: 'bhead' }, b.label),
        h('ol', { class: 'chronlist' }, list.map((p) => h('li', { 'data-m': p.m },
          h('span', { class: 'when' }, p.sl),
          card(p, 'row'))))));
    });
    return wrap;
  }
  function buildMedium() {
    const wrap = h('div', { class: 'view-medium' });
    ['LF', 'LS', 'AF', 'AS', 'VG'].forEach((k) => {
      const m = D.media[k], list = rel.filter((p) => p.m === k);
      wrap.append(h('section', { class: 'lane', style: `--c:${m.color}`, 'data-m': k },
        h('h3', { class: 'lhead' }, h('i'), m.label, h('span', null, list.length + ' projects')),
        h('div', { class: 'lane-scroll', tabindex: '0', 'aria-label': m.label + ' timeline, scrolls sideways' },
          h('ol', { class: 'lane-track' }, list.map((p) => h('li', null, h('span', { class: 'lyear' }, p.r.slice(0, 4)), card(p, 'small')))))));
    });
    return wrap;
  }
  let activeView = 'release';
  const mediaOn = new Set(['LF', 'LS', 'AF', 'AS', 'VG']);
  function showView(name, scroll) {
    if (!views[name]) return;
    activeView = name;
    $$('.tab').forEach((t) => t.setAttribute('aria-selected', String(t.dataset.view === name)));
    Object.entries(views).forEach(([k, el]) => { el.hidden = k !== name; });
    $('#view-desc').textContent = {
      release: 'Premiere order, chapter by chapter, from June 2028 to July 2041.',
      chronology: 'Story order: where each project sits in DC history, from 50,000 BCE to the 31st century.',
      medium: 'Five parallel tracks. Scroll each lane sideways to follow one medium through the saga.'
    }[name];
    store.set('dccu-view', name);
    if (scroll) $('#timelines').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }
  function applyMediaFilter() {
    $$('.views .card').forEach((c) => { c.hidden = !mediaOn.has(c.dataset.m); });
    $$('.chronlist li').forEach((li) => { li.hidden = !mediaOn.has(li.dataset.m); });
    $$('.lane').forEach((l) => { l.hidden = !mediaOn.has(l.dataset.m); });
    $$('.view-release .chapter, .view-chron .band').forEach((sec) => {
      sec.hidden = !$$('.card', sec).some((c) => !c.hidden);
    });
    $$('.chip-m').forEach((b) => b.setAttribute('aria-pressed', String(mediaOn.has(b.dataset.m))));
    const n = D.projects.filter((p) => mediaOn.has(p.m)).length;
    $('#count').textContent = `${n} of ${D.projects.length} projects shown`;
  }

  /* ───────── dossier dialog ───────── */
  const dlg = $('#dossier');
  let current = null;
  function orderFor() { return activeView === 'chronology' ? chron : activeView === 'medium' ? rel.filter((p) => p.m === current.m) : rel; }
  function openProject(id, fromHash) {
    const p = byId[id]; if (!p) return;
    current = p;
    const ch = D.chapters[p.ch - 1], m = D.media[p.m];
    const body = $('#dossier-body'); body.replaceChildren();
    const img = h('img', { alt: `Generated poster for ${p.t}`, width: 600, height: 900 });
    fontsReady.then(() => { img.src = posterURL(p); });
    const list = orderFor(), i = list.indexOf(p);
    const prev = list[i - 1], next = list[i + 1];
    body.append(
      h('div', { class: 'd-poster' }, img),
      h('div', { class: 'd-info' },
        h('div', { class: 'd-eyebrow', style: `color:${ch.color}` }, `Chapter ${NUM[ch.n]}  ·  ${ch.title}`),
        h('h2', { id: 'dossier-title' }, p.t),
        h('div', { class: 'd-tags' }, mediumTag(p), h('span', { class: 'd-date' }, 'Premieres ' + A.dateLabel(p.r).charAt(0) + A.dateLabel(p.r).slice(1).toLowerCase())),
        h('p', { class: 'd-log' }, p.log),
        h('dl', { class: 'd-facts' },
          h('div', null, h('dt', null, 'Format'), h('dd', null, p.fmt)),
          h('div', null, h('dt', null, 'Set in'), h('dd', null, p.sl)),
          h('div', null, h('dt', null, 'Release no.'), h('dd', null, `${rel.indexOf(p) + 1} of ${rel.length}`)),
          h('div', null, h('dt', null, 'Story no.'), h('dd', null, `${chron.indexOf(p) + 1} of ${chron.length}`))),
        h('h4', null, 'Plot'),
        h('p', { class: 'd-plot' }, p.plot),
        h('h4', null, 'Characters'),
        h('div', { class: 'd-cast' }, p.cast.map((k) => h('button', { type: 'button', class: 'castchip', onclick: () => { dlg.close(); jumpToCharacter(k); } }, D.byKey[k].short))),
        h('h4', null, 'Adapted from'),
        h('ul', { class: 'd-src' }, p.src.map((s) => h('li', null, s))),
        h('div', { class: 'd-nav' },
          h('button', { type: 'button', class: 'navbtn', disabled: !prev, onclick: () => prev && openProject(prev.id) }, prev ? '← ' + prev.t : 'Start of list'),
          h('button', { type: 'button', class: 'navbtn', disabled: !next, onclick: () => next && openProject(next.id) }, next ? next.t + ' →' : 'End of list'))));
    if (!dlg.open) dlg.showModal();
    $('#dossier-body').scrollTop = 0;
    if (!fromHash) try { history.replaceState(null, '', '#p-' + p.id); } catch (e) { /* hash not available */ }
  }
  dlg.addEventListener('close', () => { try { if (location.hash.startsWith('#p-')) history.replaceState(null, '', '#timelines'); } catch (e) { /* ignore */ } });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  $('#dossier-close').addEventListener('click', () => dlg.close());
  document.addEventListener('click', (e) => { const c = e.target.closest('.card'); if (c) openProject(c.dataset.id); });

  /* ───────── library ───────── */
  const libEras = new Set(Object.keys(D.eras));
  let libGroup = 'all', libEssential = false, libQuery = '';
  function buildLibrary() {
    const grid = $('#libgrid');
    D.library.forEach((c) => {
      grid.append(h('article', { class: 'lib', id: 'c-' + c.key, 'data-group': c.group, 'data-name': (c.name + ' ' + c.short).toLowerCase() },
        h('header', null, h('h3', null, c.name), h('span', { class: 'lgroup' }, c.group)),
        c.note ? h('p', { class: 'lnote' }, c.note) : null,
        c.picks.length ? h('ul', { class: 'picks' }, c.picks.map((pk) => h('li', { class: pk.star ? 'star' : '', 'data-era': pk.e },
          h('span', { class: 'era era-' + pk.e, title: D.eras[pk.e].label + ' (' + D.eras[pk.e].span + ')' }, D.eras[pk.e].label),
          h('span', { class: 'pt' }, pk.t, pk.oc ? h('em', { title: 'Out of continuity or Elseworlds' }, ' Elseworlds') : null, pk.star ? h('strong', { class: 'startag' }, 'Start here') : null),
          h('span', { class: 'py' }, String(pk.y) + (pk.c ? '  ·  ' + pk.c : ''))))) : null,
        h('div', { class: 'appears' }, h('span', null, 'In the DCCU'),
          c.projects.map((id) => h('button', { type: 'button', class: 'pchip', onclick: () => openProject(id) }, byId[id].t)))));
    });
  }
  function filterLibrary() {
    let shown = 0;
    $$('.lib').forEach((el) => {
      const okG = libGroup === 'all' || el.dataset.group === libGroup;
      const okQ = !libQuery || el.dataset.name.includes(libQuery) || $$('.pt', el).some((x) => x.textContent.toLowerCase().includes(libQuery));
      let any = false;
      $$('.picks li', el).forEach((li) => { const ok = libEras.has(li.dataset.era) && (!libEssential || li.classList.contains('star')); li.hidden = !ok; any = any || ok; });
      const hasPicks = $$('.picks li', el).length > 0;
      el.hidden = !(okG && okQ && (any || !hasPicks));
      if (!el.hidden) shown++;
    });
    $('#libcount').textContent = `${shown} of ${D.library.length} characters`;
    $('#libempty').hidden = shown > 0;
  }
  function jumpToCharacter(k) {
    libGroup = 'all'; libQuery = ''; $('#libsearch').value = '';
    $$('.seg').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.g === 'all')));
    filterLibrary();
    const el = $('#c-' + k); if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
  }

  /* ───────── player ───────── */
  const stage = $('#stage'), canvas = $('#film'), ctx = canvas.getContext('2d');
  let film = null, playing = false, t = 9.6, clockBase = 0, clockT = 0, raf = 0, audio = null, audioOK = true, muted = store.get('dccu-muted') === '1';
  const scrub = $('#scrub'), timeLbl = $('#time'), playBtn = $('#play'), muteBtn = $('#mute');
  const fmt = (s) => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  function ensureFilm() {
    if (film) return film;
    const cssW = stage.clientWidth || 1280, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(960, Math.min(1920, Math.round(cssW * dpr / 160) * 160));
    canvas.width = w; canvas.height = Math.round(w * 9 / 16);
    film = DCCUFilm.create({ width: canvas.width, height: canvas.height });
    scrub.max = film.total.toFixed(1);
    const marks = $('#marks'); marks.replaceChildren();
    film.chapterMarks().forEach((m) => {
      marks.append(h('span', { class: 'mark', style: `left:${(m.t / film.total) * 100}%;--cc:${m.color}`, title: 'Chapter ' + NUM[m.n] }));
      $('#chapjump').append(h('button', { type: 'button', class: 'jump', style: `--cc:${m.color}`, onclick: () => seek(m.t + 0.01, true) }, h('b', null, NUM[m.n]), m.title));
    });
    return film;
  }
  function draw() { film.render(ctx, t); scrub.value = t.toFixed(1); scrub.setAttribute('aria-valuetext', fmt(t)); timeLbl.textContent = `${fmt(t)} / ${fmt(film.total)}`; }
  function getAudio() {
    if (audio || !audioOK) return audio;
    audio = new Audio(); audio.preload = 'auto'; audio.src = 'score.mp3';
    audio.addEventListener('error', () => {
      if (audio.dataset.retry) { audioOK = false; $('#audionote').hidden = false; return; }
      audio.dataset.retry = '1';
      fetch('score.mp3').then((r) => { if (!r.ok) throw new Error(r.status); return r.blob(); })
        .then((b) => { audio.src = URL.createObjectURL(b); if (playing) { audio.currentTime = t; audio.play().catch(() => {}); } })
        .catch(() => { audioOK = false; $('#audionote').hidden = false; });
    });
    audio.muted = muted;
    return audio;
  }
  function now() { return performance.now() / 1000; }
  function tick() {
    if (!playing) return;
    const a = audio && audioOK && !audio.paused && audio.readyState >= 2 ? audio : null;
    t = a ? a.currentTime : clockT + (now() - clockBase);
    if (t >= film.total) { t = film.total - 0.01; pause(); draw(); return; }
    if (a) { clockT = t; clockBase = now(); }
    draw(); raf = requestAnimationFrame(tick);
  }
  function play() {
    ensureFilm();
    if (t >= film.total - 0.1) t = 0;
    if (t > 9 && t < 10 && !stage.dataset.started) t = 0;
    stage.dataset.started = '1';
    playing = true; clockT = t; clockBase = now();
    playBtn.setAttribute('aria-label', 'Pause'); playBtn.dataset.state = 'playing';
    stage.classList.add('is-playing');
    const a = getAudio();
    if (a) { try { a.currentTime = t; } catch (e) { /* not seekable yet */ } a.play().catch(() => { /* playback blocked; run silent */ }); }
    cancelAnimationFrame(raf); raf = requestAnimationFrame(tick);
  }
  function pause() {
    playing = false; cancelAnimationFrame(raf);
    playBtn.setAttribute('aria-label', 'Play'); playBtn.dataset.state = 'paused';
    stage.classList.remove('is-playing');
    if (audio) audio.pause();
  }
  function seek(v, autoplay) {
    ensureFilm(); t = Math.max(0, Math.min(film.total - 0.01, v)); clockT = t; clockBase = now();
    stage.dataset.started = '1';
    if (audio && audioOK) { try { audio.currentTime = t; } catch (e) { /* ignore */ } }
    draw(); if (autoplay && !playing) play();
  }
  playBtn.addEventListener('click', () => (playing ? pause() : play()));
  $('#bigplay').addEventListener('click', () => play());
  canvas.addEventListener('click', () => (playing ? pause() : play()));
  scrub.addEventListener('input', () => seek(parseFloat(scrub.value)));
  muteBtn.addEventListener('click', () => {
    muted = !muted; store.set('dccu-muted', muted ? '1' : '0');
    muteBtn.setAttribute('aria-pressed', String(muted)); muteBtn.setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
    if (audio) audio.muted = muted;
  });
  muteBtn.setAttribute('aria-pressed', String(muted));
  $('#fs').addEventListener('click', () => {
    const el = stage;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else if (el.requestFullscreen) el.requestFullscreen().catch(() => { $('#fs').hidden = true; });
    else $('#fs').hidden = true;
  });
  stage.addEventListener('keydown', (e) => {
    if (e.target === scrub) return;
    if (e.key === ' ' || e.key === 'k') { e.preventDefault(); playing ? pause() : play(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); seek(t + 5); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); seek(t - 5); }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden && playing) pause(); });

  /* ───────── boot ───────── */
  function boot() {
    views.release = buildRelease(); views.chronology = buildChronology(); views.medium = buildMedium();
    const holder = $('.views'); Object.values(views).forEach((v) => holder.append(v));
    $$('.tab').forEach((tb) => tb.addEventListener('click', () => { showView(tb.dataset.view); try { history.replaceState(null, '', '#' + tb.dataset.view); } catch (e) { /* ignore */ } }));
    $$('.tab').forEach((tb, i, all) => tb.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const n = all[(i + (e.key === 'ArrowRight' ? 1 : all.length - 1)) % all.length]; n.focus(); n.click();
    }));
    $$('.chip-m').forEach((b) => b.addEventListener('click', () => {
      const k = b.dataset.m;
      if (mediaOn.has(k) && mediaOn.size === 1) return;
      mediaOn.has(k) ? mediaOn.delete(k) : mediaOn.add(k); applyMediaFilter();
    }));
    $('#allmedia').addEventListener('click', () => { ['LF', 'LS', 'AF', 'AS', 'VG'].forEach((k) => mediaOn.add(k)); applyMediaFilter(); });
    buildLibrary();
    $('#libsearch').addEventListener('input', (e) => { libQuery = e.target.value.trim().toLowerCase(); filterLibrary(); });
    $$('.seg').forEach((b) => b.addEventListener('click', () => { libGroup = b.dataset.g; $$('.seg').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); filterLibrary(); }));
    $$('.chip-e').forEach((b) => b.addEventListener('click', () => {
      const e = b.dataset.e; if (libEras.has(e) && libEras.size === 1) return;
      libEras.has(e) ? libEras.delete(e) : libEras.add(e); b.setAttribute('aria-pressed', String(libEras.has(e))); filterLibrary();
    }));
    $('#essential').addEventListener('change', (e) => { libEssential = e.target.checked; filterLibrary(); });
    filterLibrary();
    const saved = store.get('dccu-view');
    showView(views[saved] ? saved : 'release');
    applyMediaFilter();
    fontsReady.then(() => { ensureFilm(); draw(); if (!stage.dataset.started) { scrub.value = 0; timeLbl.textContent = `0:00 / ${fmt(film.total)}`; } stage.classList.add('ready'); });
    route(true);
    window.addEventListener('hashchange', () => route(false));
  }
  function route(initial) {
    const hsh = (location.hash || '').slice(1);
    if (hsh.startsWith('p-') && byId[hsh.slice(2)]) openProject(hsh.slice(2), true);
    else if (views[hsh]) showView(hsh, true);
  }
  boot();
})();
