import React, { useRef, useState } from 'react';
import { POWERS, CHANNELS, DEP_LABEL, AGREEMENTS, AGREEMENT_TONE } from '../data/powers.js';
import { SectionHead, Disclosure, Bullets, Dots, Pill } from '../components/ui.jsx';

const HEAT_BG = ['var(--heat-0)', 'var(--heat-1)', 'var(--heat-2)', 'var(--heat-3)'];
const HEAT_INK = ['var(--ink-3)', 'var(--heat-ink-1)', 'var(--heat-ink-2)', 'var(--heat-ink-3)'];
const byId = Object.fromEntries(POWERS.map((p) => [p.id, p]));

function Heatmap() {
  const [tip, setTip] = useState(null);
  const boxRef = useRef(null);
  const show = (e, p, c, v) => {
    const r = e.currentTarget.getBoundingClientRect();
    const b = boxRef.current.getBoundingClientRect();
    setTip({ p, c, v, x: r.left - b.left, y: r.top - b.top });
  };
  return (
    <section ref={boxRef} aria-label="Dependence heatmap" className="card relative p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h3 className="display text-lg font-bold">How much Bangladesh depends on each power, by channel</h3>
        <div className="flex items-center gap-2 text-[0.75rem] text-ink3" aria-label="Scale: none, low, medium, high">
          <span>Dependence</span>
          {DEP_LABEL.map((l, i) => (
            <span key={l} className="flex items-center gap-1">
              <span className="h-3 w-5 rounded-[3px] border hair" style={{ background: HEAT_BG[i] }} />
              {l}
            </span>
          ))}
        </div>
      </div>
      <div className="-mx-1 overflow-x-auto px-1 pb-1">
        <table className="w-full min-w-[640px] border-separate text-[0.8rem]" style={{ borderSpacing: '2px' }}>
          <thead>
            <tr>
              <th scope="col" className="w-36 pb-1 text-left text-[0.72rem] font-medium text-ink3">Power</th>
              {CHANNELS.map((c) => (
                <th key={c.key} scope="col" className="pb-1 text-left text-[0.72rem] font-medium text-ink3">
                  {c.label}
                </th>
              ))}
              <th scope="col" className="pb-1 pl-2 text-left text-[0.72rem] font-medium text-ink3">Sovereignty cost</th>
            </tr>
          </thead>
          <tbody>
            {POWERS.map((p) => (
              <tr key={p.id}>
                <th scope="row" className="pr-2 text-left font-semibold">{p.name}</th>
                {CHANNELS.map((c) => {
                  const v = p.dependence[c.key];
                  const active = tip && tip.p === p.id && tip.c === c.key;
                  return (
                    <td
                      key={c.key}
                      tabIndex={0}
                      onPointerEnter={(e) => show(e, p.id, c.key, v)}
                      onPointerLeave={() => setTip(null)}
                      onFocus={(e) => show(e, p.id, c.key, v)}
                      onBlur={() => setTip(null)}
                      className="h-9 rounded-[4px] px-2 text-[0.75rem] font-medium outline-none transition-[filter]"
                      style={{
                        background: HEAT_BG[v],
                        color: HEAT_INK[v],
                        filter: active ? 'brightness(1.08)' : undefined,
                        boxShadow: active ? 'inset 0 0 0 2px var(--ink)' : undefined,
                      }}
                    >
                      {DEP_LABEL[v]}
                    </td>
                  );
                })}
                <td className="pl-2">
                  <Dots value={p.sovereignty} label="Sovereignty cost" tone={p.sovereignty >= 3 ? 'crit' : 'jute'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tip && (
        <div
          role="tooltip"
          className="pointer-events-none absolute z-10 w-max max-w-[16rem] rounded-md border hair bg-surface px-2.5 py-1.5 shadow-lg"
          style={{ left: tip.x, top: tip.y - 50 }}
        >
          <p className="text-[0.85rem] font-semibold">{DEP_LABEL[tip.v]} dependence</p>
          <p className="text-[0.75rem] text-ink2">
            {byId[tip.p].name} · {CHANNELS.find((c) => c.key === tip.c).label}
          </p>
        </div>
      )}
      <p className="mt-2 text-[0.75rem] text-ink3">
        Analyst ratings, November 2026. Sovereignty cost (1–5) is the policy freedom Dhaka gives up to keep the relationship working.
      </p>
    </section>
  );
}

const COMPARE_ROWS = [
  ['Posture', (p) => <p className="text-[0.95rem] font-semibold">{p.posture}</p>],
  ['Benefits', (p) => <Bullets items={p.benefits} tone="asset" />],
  ['Risks', (p) => <Bullets items={p.risks} tone="crit" />],
  ['Debt exposure', (p) => <p className="prose-serif text-[0.92rem]">{p.debt}</p>],
  [
    'Sovereignty cost',
    (p) => (
      <div className="flex items-center gap-2">
        <Dots value={p.sovereignty} label="Sovereignty cost" tone={p.sovereignty >= 3 ? 'crit' : 'jute'} />
        <span className="num font-mono text-xs text-ink2">{p.sovereignty}/5</span>
      </div>
    ),
  ],
  ['Their leverage over Dhaka', (p) => <p className="prose-serif text-[0.92rem]">{p.leverageOverDhaka}</p>],
  ['Dhaka’s leverage', (p) => <p className="prose-serif text-[0.92rem]">{p.dhakaLeverage}</p>],
  ['Dhaka’s play', (p) => <p className="prose-serif text-[0.92rem] font-medium">{p.play}</p>],
];

function Compare() {
  const [a, setA] = useState('india');
  const [b, setB] = useState('china');
  const pa = byId[a];
  const pb = byId[b];
  const select = (id, value, onChange, other) => (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border hair bg-surface px-3 py-2 text-[0.95rem] font-semibold text-ink"
    >
      {POWERS.map((p) => (
        <option key={p.id} value={p.id} disabled={p.id === other}>
          {p.name}
        </option>
      ))}
    </select>
  );
  return (
    <section aria-label="Head-to-head comparison" className="card p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="display text-lg font-bold">Head to head: benefits against risks, debt and sovereignty</h3>
        <button
          type="button"
          className="text-[0.82rem] font-semibold text-jute underline decoration-1 underline-offset-4 hover:text-ink"
          onClick={() => {
            setA(b);
            setB(a);
          }}
        >
          Swap sides
        </button>
      </div>
      <div className="grid gap-x-5 gap-y-0 md:grid-cols-[10rem_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="hidden md:block" />
        <label className="grid gap-1 pb-3" htmlFor="cmp-a">
          <span className="eyebrow">Left</span>
          {select('cmp-a', a, setA, b)}
        </label>
        <label className="grid gap-1 pb-3" htmlFor="cmp-b">
          <span className="eyebrow">Right</span>
          {select('cmp-b', b, setB, a)}
        </label>
        {COMPARE_ROWS.map(([label, render]) => (
          <React.Fragment key={label}>
            <div className="border-t hair pt-3 md:pb-3">
              <p className="eyebrow">{label}</p>
            </div>
            <div className="min-w-0 pb-3 pt-2 md:border-t md:pt-3 hair">
              <p className="mb-1 text-[0.72rem] font-semibold text-ink3 md:hidden">{pa.name}</p>
              {render(pa)}
            </div>
            <div className="min-w-0 pb-3 pt-2 md:border-t md:pt-3 hair">
              <p className="mb-1 text-[0.72rem] font-semibold text-ink3 md:hidden">{pb.name}</p>
              {render(pb)}
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

function Dossier({ p }) {
  return (
    <Disclosure
      id={`power-${p.id}`}
      header={
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="min-w-0 basis-36 text-[1rem] font-semibold">{p.name}</span>
          <span className="min-w-0 flex-1 basis-56 text-[0.85rem] text-ink2">{p.posture}</span>
          <span className="flex items-center gap-2 text-[0.72rem] text-ink3">
            Sovereignty cost <Dots value={p.sovereignty} label="Sovereignty cost" tone={p.sovereignty >= 3 ? 'crit' : 'jute'} />
          </span>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="eyebrow mb-2 text-asset">Benefits</p>
          <Bullets items={p.benefits} tone="asset" />
        </div>
        <div>
          <p className="eyebrow mb-2">Risks, debt & sovereignty costs</p>
          <Bullets items={p.risks} tone="crit" />
        </div>
        <div className="rounded-lg bg-well px-3 py-2.5">
          <p className="eyebrow mb-1">Debt exposure</p>
          <p className="prose-serif text-[0.9rem]">{p.debt}</p>
        </div>
        <div className="rounded-lg bg-well px-3 py-2.5">
          <p className="eyebrow mb-1">Status, 2026</p>
          <p className="prose-serif text-[0.9rem]">{p.status2026}</p>
        </div>
        <div className="md:col-span-2 border-t hair pt-3">
          <p className="text-[0.9rem]">
            <span className="font-semibold">Dhaka’s play: </span>
            <span className="prose-serif">{p.play}</span>
          </p>
        </div>
      </div>
    </Disclosure>
  );
}

export default function Powers() {
  return (
    <div className="grid gap-8 [&>*]:min-w-0">
      <SectionHead eyebrow="Tab 2 · India, China, US, Japan & trade blocs" title="Foreign power matrix">
        Bangladesh’s best strategy is non-alignment with compartmentalised deals: Japan for infrastructure, the US and EU for markets, China for
        manufacturing capital, India for water, power and transit. No one gets a military footprint. The 2026 “Bangladesh First” line points this way,
        but the US trade deal’s non-market-country clause and the Teesta project test it immediately.
      </SectionHead>

      <Heatmap />
      <Compare />

      <section aria-label="Power dossiers" className="grid gap-2.5">
        <div className="flex items-baseline justify-between gap-3 px-1">
          <h3 className="display text-xl font-bold">Dossiers</h3>
          <span className="text-[0.8rem] text-ink3">Open a card for the full assessment</span>
        </div>
        {POWERS.map((p) => (
          <Dossier key={p.id} p={p} />
        ))}
      </section>

      <section aria-label="Trade blocs and agreements" className="grid gap-3">
        <div className="flex items-baseline justify-between gap-3 px-1">
          <h3 className="display text-xl font-bold">Trade blocs & agreements</h3>
          <span className="text-[0.8rem] text-ink3">LDC graduation, now 24 Nov 2029, resets every preference</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AGREEMENTS.map((g) => (
            <article key={g.name} className="card grid content-start gap-2 p-4">
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-[0.95rem] font-semibold leading-snug">{g.name}</h4>
                <Pill tone={AGREEMENT_TONE[g.state]}>{g.tag}</Pill>
              </div>
              <p className="prose-serif text-[0.88rem] text-ink2">{g.note}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
