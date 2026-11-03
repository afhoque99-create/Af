import React, { useEffect, useMemo, useState } from 'react';
import { INDICATORS, STATUS, CRITICAL_PATH } from '../data/framework.js';
import { StatusBadge, Readiness, SectionHead, Disclosure, Bullets, TONE } from '../components/ui.jsx';

const byCode = Object.fromEntries(INDICATORS.map((i) => [i.code, i]));

function CodeChip({ code, onOpen }) {
  const ind = byCode[code];
  const t = TONE[STATUS[ind.status].tone];
  return (
    <button
      type="button"
      onClick={() => onOpen(code)}
      className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-mono text-[0.72rem] font-medium ${t.border} ${t.text} hover:bg-well`}
      title={ind.name}
    >
      {code}
    </button>
  );
}

function IndicatorCard({ ind, open, onToggle, onOpenCode }) {
  return (
    <Disclosure
      id={`ind-${ind.code}`}
      open={open}
      onToggle={onToggle}
      header={
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="num w-8 shrink-0 font-mono text-[0.8rem] font-medium text-ink3">{ind.code}</span>
          <span className="min-w-0 flex-1 basis-40 text-[0.98rem] font-semibold leading-snug">{ind.name}</span>
          <span className="flex items-center gap-3">
            <Readiness score={ind.score} target={ind.target} status={ind.status} />
            <StatusBadge status={ind.status} compact />
          </span>
        </div>
      }
    >
      <div className="grid gap-4">
        <div>
          <p className="eyebrow mb-2">Where it stands · 2026</p>
          <Bullets items={ind.facts} tone={STATUS[ind.status].tone} />
        </div>
        <div className="rounded-lg bg-well px-3 py-2.5">
          <p className="eyebrow mb-1">Root deficit</p>
          <p className="prose-serif text-[0.92rem]">{ind.deficit}</p>
        </div>
        <div>
          <p className="eyebrow mb-2">The fix, in sequence</p>
          <ol className="grid gap-2">
            {ind.fixes.map(([h, a]) => (
              <li key={h} className="grid grid-cols-[4.5rem_1fr] gap-3">
                <span className="num pt-0.5 font-mono text-[0.75rem] font-medium text-jute">{h}</span>
                <span className="prose-serif min-w-0 text-[0.92rem]">{a}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-wrap items-start justify-between gap-3 border-t hair pt-3">
          <p className="min-w-0 flex-1 basis-64 text-[0.85rem] text-ink2">
            <span className="font-semibold text-ink">Watch: </span>
            {ind.watch}
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[0.75rem] text-ink3">Linked</span>
            {ind.links.map((c) => (
              <CodeChip key={c} code={c} onOpen={onOpenCode} />
            ))}
          </div>
        </div>
      </div>
    </Disclosure>
  );
}

export default function Fixes({ openCodes, setOpenCodes, focusCode, clearFocus }) {
  const [layer, setLayer] = useState('all');
  const [status, setStatus] = useState('all');

  const counts = useMemo(() => {
    const c = { critical: 0, progress: 0, asset: 0 };
    INDICATORS.forEach((i) => (c[i.status] += 1));
    return c;
  }, []);

  const openCode = (code) => {
    setLayer('all');
    setStatus('all');
    setOpenCodes((s) => new Set(s).add(code));
    requestAnimationFrame(() => {
      const el = document.getElementById(`ind-${code}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  useEffect(() => {
    if (focusCode) {
      openCode(focusCode);
      clearFocus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusCode]);

  const visible = (i) => (layer === 'all' || i.layer === layer) && (status === 'all' || i.status === status);
  const hw = INDICATORS.filter((i) => i.layer === 'hardware' && visible(i));
  const sw = INDICATORS.filter((i) => i.layer === 'software' && visible(i));
  const allShownOpen = [...hw, ...sw].every((i) => openCodes.has(i.code));

  const toggle = (code) => (next) =>
    setOpenCodes((s) => {
      const n = new Set(s);
      next ? n.add(code) : n.delete(code);
      return n;
    });

  const column = (title, sub, list) => (
    <section className="grid min-w-0 content-start gap-2.5" aria-label={title}>
      <div className="flex items-baseline justify-between gap-3 px-1">
        <h3 className="display text-xl font-bold">{title}</h3>
        <span className="text-[0.8rem] text-ink3">{sub}</span>
      </div>
      {list.length === 0 ? (
        <p className="card px-4 py-6 text-center text-[0.9rem] text-ink3">No {title.toLowerCase()} indicators match this filter.</p>
      ) : (
        list.map((ind) => (
          <IndicatorCard key={ind.code} ind={ind} open={openCodes.has(ind.code)} onToggle={toggle(ind.code)} onOpenCode={openCode} />
        ))
      )}
    </section>
  );

  return (
    <div className="grid gap-8 [&>*]:min-w-0">
      <SectionHead eyebrow="Tab 1 · Solving systemic deficits" title="Hardware & software fixes">
        Twenty prerequisites decide whether Bangladesh converts a demographic and geographic windfall into upper-middle-income status. Eight are critical
        deficits, and they cluster in finance and institutions, not concrete. The bars show readiness today; the black tick marks the level needed by 2035.
      </SectionHead>

      <section aria-label="Critical path" className="card p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="display text-lg font-bold">Critical path: the order the fixes have to happen in</h3>
          <span className="text-[0.8rem] text-ink3">Each step funds or unblocks the next</span>
        </div>
        <ol className="grid gap-3 md:grid-cols-5">
          {CRITICAL_PATH.map((s, i) => (
            <li key={s.step} className="relative grid content-start gap-1.5 rounded-lg border hair bg-paper p-3">
              <span className="num font-mono text-[0.72rem] font-medium text-jute">Step {i + 1}</span>
              <span className="text-[0.92rem] font-semibold leading-snug">{s.step}</span>
              <span className="flex flex-wrap gap-1">
                {s.codes.map((c) => (
                  <CodeChip key={c} code={c} onOpen={openCode} />
                ))}
              </span>
              <span className="prose-serif text-[0.85rem] text-ink2">{s.why}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3" role="toolbar" aria-label="Filter indicators">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[0.78rem] text-ink3">Layer</span>
          {[
            ['all', 'All 20'],
            ['hardware', 'Hardware · 10'],
            ['software', 'Software · 10'],
          ].map(([v, l]) => (
            <button key={v} type="button" className="chip" aria-pressed={layer === v} onClick={() => setLayer(v)}>
              {l}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[0.78rem] text-ink3">Status</span>
          <button type="button" className="chip" aria-pressed={status === 'all'} onClick={() => setStatus('all')}>
            Any
          </button>
          {Object.entries(STATUS).map(([k, s]) => (
            <button key={k} type="button" className="chip" aria-pressed={status === k} onClick={() => setStatus(k)}>
              <span aria-hidden="true" className={`text-[0.6rem] ${status === k ? '' : TONE[s.tone].text}`}>{s.glyph}</span>
              {s.label} · {counts[k]}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="ml-auto text-[0.82rem] font-semibold text-jute underline decoration-1 underline-offset-4 hover:text-ink"
          onClick={() =>
            setOpenCodes((s) => {
              const n = new Set(s);
              [...hw, ...sw].forEach((i) => (allShownOpen ? n.delete(i.code) : n.add(i.code)));
              return n;
            })
          }
        >
          {allShownOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      <div className={`grid gap-6 ${layer === 'all' ? 'lg:grid-cols-2' : ''}`}>
        {layer !== 'software' && column('Hardware', 'Physical systems & endowment', hw)}
        {layer !== 'hardware' && column('Software', 'Institutions, finance & people', sw)}
      </div>
    </div>
  );
}
