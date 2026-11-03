import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  YEARS, SCENARIOS, SCENARIO_ORDER, NATIONAL, SEA_LEVEL, ZONES, ZONE_METRICS, NARRATIVE, HEADLINES, MILESTONES, ZONE_DIVERGENCE,
} from '../data/outlook.js';
import { INDICATORS } from '../data/framework.js';
import { SectionHead, Segmented, Pill } from '../components/ui.jsx';

const indName = Object.fromEntries(INDICATORS.map((i) => [i.code, i.name]));

function useWidth() {
  const ref = useRef(null);
  const [w, setW] = useState(640);
  useLayoutEffect(() => {
    if (!ref.current) return undefined;
    const ro = new ResizeObserver(([e]) => setW(Math.max(280, Math.round(e.contentRect.width))));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

const fmtNum = (v, unit) => {
  if (unit === 'm ha') return v.toFixed(2);
  if (!Number.isInteger(v)) return v.toFixed(1);
  return v.toLocaleString('en-US');
};

function deltaTone(diff, goodUp) {
  if (diff === 0 || goodUp === null || goodUp === undefined) return 'text-ink2';
  const good = goodUp ? diff > 0 : diff < 0;
  return good ? 'text-asset' : 'text-crit';
}

function Delta({ diff, goodUp, text }) {
  if (diff === 0) return <span className="text-[0.75rem] text-ink3">Baseline</span>;
  const arrow = diff > 0 ? '↑' : '↓';
  return (
    <span className={`num text-[0.75rem] font-semibold ${deltaTone(diff, goodUp)}`}>
      <span aria-hidden="true">{arrow} </span>
      {text}
      <span className="font-normal text-ink3"> vs 2026</span>
    </span>
  );
}

function Spark({ values, idx, color }) {
  const w = 96;
  const h = 28;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const xs = YEARS.map((y) => 3 + ((y - YEARS[0]) / (YEARS[YEARS.length - 1] - YEARS[0])) * (w - 6));
  const ys = values.map((v) => h - 4 - ((v - min) / span) * (h - 8));
  const d = xs.map((x, i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(' ');
  return (
    <svg width={w} height={h} aria-hidden="true" className="shrink-0">
      <path d={d} fill="none" stroke="var(--ink-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <circle cx={xs[idx]} cy={ys[idx]} r="3.5" fill={color} stroke="var(--surface)" strokeWidth="2" />
    </svg>
  );
}

function NationalTiles({ scenario, idx }) {
  const color = SCENARIOS[scenario].color;
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {NATIONAL.map((m) => {
        const s = m.series[scenario];
        const diff = +(s[idx] - s[0]).toFixed(2);
        const dText =
          m.unit === 'US$' ? `$${Math.abs(diff).toLocaleString('en-US')}` : m.unit.startsWith('%') ? `${Math.abs(diff)} pts` : `$${Math.abs(diff)} bn`;
        return (
          <article key={m.key} className="card grid content-start gap-1 p-3.5" title={m.note}>
            <p className="text-[0.8rem] text-ink2">{m.label}</p>
            <div className="flex items-end justify-between gap-2">
              <p className="text-[1.6rem] font-bold leading-none">{m.fmt(s[idx])}</p>
              <Spark values={s} idx={idx} color={color} />
            </div>
            <Delta diff={diff} goodUp={m.goodUp} text={dText} />
            <p className="text-[0.72rem] leading-snug text-ink3">{m.note}</p>
          </article>
        );
      })}
      <article className="card grid content-start gap-1 p-3.5">
        <p className="text-[0.8rem] text-ink2">{SEA_LEVEL.label}</p>
        <div className="flex items-end justify-between gap-2">
          <p className="text-[1.6rem] font-bold leading-none">+{SEA_LEVEL.values[idx]} cm</p>
          <Spark values={SEA_LEVEL.values} idx={idx} color="var(--prog)" />
        </div>
        <span className="text-[0.75rem] font-semibold text-ink2">Same on every path: set by global emissions</span>
        <p className="text-[0.72rem] leading-snug text-ink3">{SEA_LEVEL.note}</p>
      </article>
      <article className="card grid content-start gap-1.5 bg-well p-3.5 sm:col-span-2 lg:col-span-1">
        <p className="eyebrow">Reading these figures</p>
        <p className="prose-serif text-[0.85rem] text-ink2">
          2026 shows the latest actuals or estimates. Later years are illustrative scenario projections built from the assumptions below, not forecasts.
        </p>
      </article>
    </div>
  );
}

const UMIC = 4496; // World Bank upper-middle-income threshold, FY26 (GNI per capita, Atlas).

function IncomeChart({ scenario, idx }) {
  const [ref, W] = useWidth();
  const [hover, setHover] = useState(null);
  const [table, setTable] = useState(false);
  const H = 270;
  const m = { l: 44, r: W < 480 ? 74 : 96, t: 18, b: 30 };
  const yMax = 14000;
  const x = (yr) => m.l + ((yr - YEARS[0]) / (YEARS[YEARS.length - 1] - YEARS[0])) * (W - m.l - m.r);
  const y = (v) => H - m.b - (v / yMax) * (H - m.t - m.b);
  const series = NATIONAL[0].series;
  const ticks = [0, 4000, 8000, 12000];

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - r.left;
    let best = 0;
    YEARS.forEach((yr, i) => {
      if (Math.abs(x(yr) - px) < Math.abs(x(YEARS[best]) - px)) best = i;
    });
    setHover(best);
  };

  const tipIdx = hover ?? null;
  const tipLeft = tipIdx !== null ? Math.min(Math.max(x(YEARS[tipIdx]) + 10, 4), W - 170) : 0;

  return (
    <section aria-label="Per-capita income paths" className="card p-4 sm:p-5">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h3 className="display text-lg font-bold">Per-capita income on three paths, 2026–2045</h3>
        <div className="flex flex-wrap items-center gap-3 text-[0.78rem] text-ink2">
          {SCENARIO_ORDER.map((k) => (
            <span key={k} className="flex items-center gap-1.5">
              <span aria-hidden="true" className="h-[3px] w-4 rounded-full" style={{ background: SCENARIOS[k].color }} />
              {SCENARIOS[k].label}
            </span>
          ))}
          <button
            type="button"
            onClick={() => setTable((t) => !t)}
            className="font-semibold text-jute underline decoration-1 underline-offset-4 hover:text-ink"
            aria-pressed={table}
          >
            {table ? 'Show chart' : 'Show as table'}
          </button>
        </div>
      </div>
      <div ref={ref} className="relative">
        {table ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-[0.85rem]">
              <thead>
                <tr className="text-[0.72rem] text-ink3">
                  <th scope="col" className="py-1.5 font-medium">Scenario</th>
                  {YEARS.map((yr) => (
                    <th key={yr} scope="col" className="num py-1.5 text-right font-medium">{yr}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCENARIO_ORDER.map((k) => (
                  <tr key={k} className="border-t hair">
                    <th scope="row" className="py-1.5 font-semibold">{SCENARIOS[k].label}</th>
                    {series[k].map((v, i) => (
                      <td key={i} className={`num py-1.5 text-right font-mono ${i === idx ? 'font-semibold text-ink' : 'text-ink2'}`}>
                        ${v.toLocaleString('en-US')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <svg width={W} height={H} role="img" aria-label="Line chart of per-capita income by scenario; the table view lists every value." className="block">
              {ticks.map((t) => (
                <g key={t}>
                  <line x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} stroke="var(--line)" strokeWidth="1" />
                  <text x={m.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="var(--ink-3)" fontFamily="var(--font-mono)">
                    {t === 0 ? '$0' : `$${t / 1000}K`}
                  </text>
                </g>
              ))}
              <line x1={m.l} x2={W - m.r} y1={y(UMIC)} y2={y(UMIC)} stroke="var(--ink-3)" strokeWidth="1" strokeDasharray="4 4" />
              <text x={m.l + 4} y={y(UMIC) - 6} fontSize="10.5" fill="var(--ink-2)" fontFamily="var(--font-display)">
                Upper-middle-income line, $4,496 (World Bank, FY26)
              </text>
              {YEARS.map((yr) => (
                <text key={yr} x={x(yr)} y={H - 10} textAnchor="middle" fontSize="11" fill="var(--ink-3)" fontFamily="var(--font-mono)">
                  {yr}
                </text>
              ))}
              <line x1={x(YEARS[idx])} x2={x(YEARS[idx])} y1={m.t - 6} y2={H - m.b} stroke="var(--ink)" strokeWidth="1" opacity="0.55" />
              {SCENARIO_ORDER.map((k) => {
                const vals = series[k];
                const d = vals.map((v, i) => `${i ? 'L' : 'M'}${x(YEARS[i]).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
                const active = k === scenario;
                return (
                  <g key={k} opacity={active ? 1 : 0.45}>
                    <path d={d} fill="none" stroke={SCENARIOS[k].color} strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx={x(YEARS[idx])} cy={y(vals[idx])} r="4.5" fill={SCENARIOS[k].color} stroke="var(--surface)" strokeWidth="2" />
                    <text x={W - m.r + 8} y={y(vals[vals.length - 1]) + 4} fontSize="11" fill="var(--ink-2)" fontFamily="var(--font-display)" fontWeight={active ? 700 : 500}>
                      {SCENARIOS[k].short} ${(vals[vals.length - 1] / 1000).toFixed(1)}K
                    </text>
                  </g>
                );
              })}
              {tipIdx !== null && <line x1={x(YEARS[tipIdx])} x2={x(YEARS[tipIdx])} y1={m.t} y2={H - m.b} stroke="var(--ink-3)" strokeWidth="1" />}
              <rect
                x={m.l - 10}
                y={m.t}
                width={W - m.l - m.r + 20}
                height={H - m.t - m.b}
                fill="transparent"
                onPointerMove={onMove}
                onPointerLeave={() => setHover(null)}
              />
            </svg>
            {tipIdx !== null && (
              <div
                role="tooltip"
                className="pointer-events-none absolute top-2 z-10 w-[160px] rounded-md border hair bg-surface px-2.5 py-2 shadow-lg"
                style={{ left: tipLeft }}
              >
                <p className="num mb-1 font-mono text-[0.72rem] text-ink3">{YEARS[tipIdx]}</p>
                {SCENARIO_ORDER.map((k) => (
                  <p key={k} className="flex items-center gap-2 text-[0.8rem]">
                    <span aria-hidden="true" className="h-[3px] w-3 rounded-full" style={{ background: SCENARIOS[k].color }} />
                    <span className="num font-semibold">${series[k][tipIdx].toLocaleString('en-US')}</span>
                    <span className="text-ink3">{SCENARIOS[k].short}</span>
                  </p>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <p className="mt-1 text-[0.75rem] text-ink3">
        Nominal US dollars. The World Bank threshold is GNI per head and rises with inflation over time, so later crossings need slightly higher incomes.
      </p>
    </section>
  );
}

function ZoneCard({ zone, scenario, idx }) {
  const year = YEARS[idx];
  const metrics = ZONE_METRICS[zone.id];
  return (
    <article className="card grid content-start gap-3 p-4 sm:p-5">
      <header className="flex items-end justify-between gap-3 border-b hair pb-3">
        <div className="min-w-0">
          <p className="bangla text-[2rem] leading-none text-jute">{zone.bn}</p>
          <h3 className="display mt-1 text-xl font-bold leading-none">{zone.label}</h3>
        </div>
        <p className="max-w-[10rem] text-right text-[0.75rem] text-ink3">{zone.place}</p>
      </header>
      <p className="prose-serif text-[0.95rem]">{NARRATIVE[year][zone.id]}</p>
      {scenario !== 'base' && idx > 0 && (
        <p className="rounded-lg bg-well px-3 py-2 text-[0.88rem]">
          <span className="font-semibold">On the {SCENARIOS[scenario].label.toLowerCase()} path: </span>
          <span className="prose-serif">{ZONE_DIVERGENCE[scenario][zone.id]}</span>
        </p>
      )}
      <dl className="grid gap-2.5">
        {metrics.map((mt) => {
          const s = mt.series[scenario];
          const v = s[idx];
          const diff = +(v - s[0]).toFixed(2);
          const unitIsPct = mt.unit === '%';
          const dText = unitIsPct ? `${fmtNum(Math.abs(diff), '')} pts` : `${fmtNum(Math.abs(diff), mt.unit)} ${mt.unit}`;
          return (
            <div key={mt.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 border-t hair pt-2">
              <dt className="text-[0.85rem] text-ink2" title={mt.hint}>
                {mt.label}
              </dt>
              <dd className="num text-right font-mono text-[0.95rem] font-medium">
                {fmtNum(v, mt.unit)}
                <span className="ml-1 text-[0.72rem] text-ink3">{mt.unit}</span>
              </dd>
              <dd className="col-span-2 text-right">
                <Delta diff={diff} goodUp={mt.goodUp} text={dText} />
              </dd>
            </div>
          );
        })}
      </dl>
    </article>
  );
}

function Milestones({ scenario, idx }) {
  const year = YEARS[idx];
  const rows = MILESTONES.map((ms) => ({ ...ms, y: ms.years[scenario] })).sort((a, b) => (a.y ?? 9999) - (b.y ?? 9999));
  return (
    <section aria-label="Milestones" className="card p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="display text-lg font-bold">Infrastructure & policy milestones</h3>
        <span className="text-[0.8rem] text-ink3">
          Filled dots are reached by {year} on the {SCENARIOS[scenario].label.toLowerCase()} path
        </span>
      </div>
      <ol className="relative grid gap-0">
        {rows.map((r, i) => {
          const reached = r.y !== null && r.y <= year;
          return (
            <li key={r.label} className="grid grid-cols-[1.25rem_3.25rem_minmax(0,1fr)] items-start gap-x-3 py-1.5">
              <span className="relative flex h-full justify-center">
                {i < rows.length - 1 && <span aria-hidden="true" className="absolute top-3 h-full w-px bg-line" />}
                <span
                  aria-hidden="true"
                  className={`relative mt-1 h-3 w-3 rounded-full border-2 ${reached ? 'border-ink bg-ink' : 'border-ink3 bg-surface'}`}
                />
              </span>
              <span className={`num pt-0.5 font-mono text-[0.8rem] ${reached ? 'font-semibold text-ink' : 'text-ink3'}`}>{r.y ?? '—'}</span>
              <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                <span className={`text-[0.9rem] ${reached ? 'text-ink' : 'text-ink2'}`}>{r.label}</span>
                <Pill tone="muted">{r.kind}</Pill>
                {r.y === null && <Pill tone="crit">Not by 2045</Pill>}
                {r.actual && <Pill tone="jute">2026 fact</Pill>}
                <span className="sr-only">{reached ? 'Reached' : 'Ahead'}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function ScenarioCards({ scenario, setScenario, onOpenCode }) {
  return (
    <section aria-label="What decides the path" className="grid gap-3">
      <div className="flex items-baseline justify-between gap-3 px-1">
        <h3 className="display text-xl font-bold">What decides the path</h3>
        <span className="text-[0.8rem] text-ink3">Which framework indicators get fixed</span>
      </div>
      <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-1">
        {SCENARIO_ORDER.map((k) => {
          const sc = SCENARIOS[k];
          const active = k === scenario;
          return (
            <article key={k} className={`card grid content-start gap-2.5 p-4 ${active ? 'ring-2 ring-ink' : ''}`}>
              <div className="flex items-center justify-between gap-2">
                <h4 className="flex items-center gap-2 text-[1rem] font-semibold">
                  <span aria-hidden="true" className="h-[3px] w-5 rounded-full" style={{ background: sc.color }} />
                  {sc.label}
                </h4>
                {!active && (
                  <button type="button" onClick={() => setScenario(k)} className="text-[0.8rem] font-semibold text-jute underline decoration-1 underline-offset-4 hover:text-ink">
                    View this path
                  </button>
                )}
              </div>
              <p className="prose-serif text-[0.88rem] text-ink2">{sc.assumptions}</p>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[0.75rem] text-ink3">{sc.flips.length ? 'Fixed on this path:' : 'No critical deficit fixed'}</span>
                {sc.flips.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => onOpenCode(c)}
                    title={indName[c]}
                    className="rounded-md border hair px-1.5 py-0.5 font-mono text-[0.72rem] text-ink2 hover:border-ink3 hover:text-ink"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function Outlook({ onOpenCode }) {
  const [scenario, setScenario] = useState('base');
  const [idx, setIdx] = useState(2);
  const [playing, setPlaying] = useState(false);
  const year = YEARS[idx];

  useEffect(() => {
    if (!playing) return undefined;
    const t = setInterval(() => {
      setIdx((i) => {
        if (i >= YEARS.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, 1700);
    return () => clearInterval(t);
  }, [playing]);

  const play = () => {
    if (playing) return setPlaying(false);
    if (idx >= YEARS.length - 1) setIdx(0);
    return setPlaying(true);
  };

  return (
    <div className="grid gap-8 [&>*]:min-w-0">
      <SectionHead eyebrow="Tab 4 · Living standards, infrastructure, climate" title="10–20 year decadal outlook">
        Pick a path and move through time to see how life changes in the cities, the countryside and on the coast. Every path starts from the
        same 2026. They split on whether the critical deficits in Tab 1 are fixed before the LDC preferences run out.
      </SectionHead>

      <section aria-label="Timeline controls" className="card z-20 grid gap-4 p-4 sm:p-5 lg:sticky" style={{ top: 'calc(env(safe-area-inset-top, 0px) + var(--tabs-h, 0px) + 8px)' }}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Segmented
            label="Scenario"
            idBase="scenario"
            value={scenario}
            onChange={setScenario}
            options={SCENARIO_ORDER.map((k) => ({ value: k, label: SCENARIOS[k].label, swatch: SCENARIOS[k].color }))}
          />
          <button
            type="button"
            onClick={play}
            className="inline-flex items-center gap-2 rounded-full border hair px-3.5 py-1.5 text-[0.85rem] font-semibold hover:border-ink3"
            aria-pressed={playing}
          >
            <span aria-hidden="true">{playing ? '❚❚' : '▶'}</span>
            {playing ? 'Pause' : 'Play 2026 → 2045'}
          </button>
        </div>
        <div className="grid gap-2">
          <label htmlFor="year-slider" className="sr-only">
            Year
          </label>
          <input
            id="year-slider"
            type="range"
            min={0}
            max={YEARS.length - 1}
            step={1}
            value={idx}
            onChange={(e) => {
              setPlaying(false);
              setIdx(Number(e.target.value));
            }}
            aria-valuetext={String(year)}
            className="range-track w-full"
          />
          <div className="grid grid-cols-5">
            {YEARS.map((yr, i) => (
              <button
                key={yr}
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setIdx(i);
                }}
                aria-current={i === idx ? 'true' : undefined}
                className={`num font-mono text-[0.8rem] ${i === 0 ? 'text-left' : i === YEARS.length - 1 ? 'text-right' : 'text-center'} ${
                  i === idx ? 'font-semibold text-ink' : 'text-ink3 hover:text-ink'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section aria-live="polite" className="grid items-end gap-x-8 gap-y-2 md:grid-cols-[auto_minmax(0,1fr)]">
        <p className="display num text-[4.5rem] font-black leading-[0.85] tracking-tight sm:text-[6rem]" aria-label={`Year ${year}`}>
          {year}
        </p>
        <div className="min-w-0 pb-1">
          <p className="eyebrow mb-1">{SCENARIOS[scenario].label}</p>
          <p className="prose-serif text-[1.2rem] leading-snug sm:text-[1.35rem]">{HEADLINES[scenario][year]}</p>
        </div>
      </section>

      <NationalTiles scenario={scenario} idx={idx} />

      <div className="grid gap-4 lg:grid-cols-3">
        {ZONES.map((z) => (
          <ZoneCard key={z.id} zone={z} scenario={scenario} idx={idx} />
        ))}
      </div>

      <IncomeChart scenario={scenario} idx={idx} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Milestones scenario={scenario} idx={idx} />
        <ScenarioCards scenario={scenario} setScenario={setScenario} onOpenCode={onOpenCode} />
      </div>
    </div>
  );
}
