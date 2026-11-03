import React, { useMemo, useState } from 'react';
import {
  NODES, CORRIDORS, CORRIDOR_STATUS, MODE_LABEL, SISTER_STATES, WEST_BENGAL_BORDER, THEATRES, project, MAP_W, MAP_H,
} from '../data/region.js';
import { SectionHead, Bullets, Pill, TONE } from '../components/ui.jsx';

// Label placement per node: [dx, dy, anchor]; null hides the label.
const LABEL_POS = {
  dhaka: [9, -9, 'start'], ctg: [-9, 4, 'end'], matarbari: [-9, 4, 'end'], coxs: [-8, 14, 'end'], mongla: [0, 17, 'middle'],
  sylhet: [9, 4, 'start'], akhaura: null, agartala: [9, 12, 'start'], ramgarh: null, sabroom: [7, -8, 'start'],
  benapole: [0, -10, 'middle'], banglabandha: [9, 5, 'start'], dalia: [9, 5, 'start'], bheramara: [-9, 4, 'end'],
  sirajganj: [9, -7, 'start'], kolkata: [-9, 4, 'end'], farakka: [0, -10, 'middle'], siliguri: [9, -6, 'start'],
  guwahati: [9, -6, 'start'], shillong: [9, 5, 'start'], aizawl: [9, 4, 'start'], imphal: [9, 4, 'start'],
  godda: [-9, 4, 'end'], sittwe: [9, 5, 'start'], paletwa: [9, 4, 'start'], maungdaw: [9, 7, 'start'],
  nepalbhutan: [9, 4, 'start'], kunming: [-6, -9, 'end'], asean: [-6, -9, 'end'],
};

const ADJUST = { akhaura: [91.1, 23.9], agartala: [91.35, 23.8], asean: [94.4, 19.6] };
const P = Object.fromEntries(Object.entries(NODES).map(([k, n]) => [k, project(...(ADJUST[k] || n.ll))]));

const COAST = [
  [85.6, 19.8], [86.6, 20.3], [86.9, 21.4], [87.5, 21.6], [88.1, 21.6], [89.0, 21.7], [89.6, 21.8], [90.3, 21.85], [90.7, 22.1],
  [91.0, 22.4], [91.4, 22.5], [91.8, 22.3], [91.85, 21.85], [91.97, 21.43], [92.3, 20.86], [92.4, 20.6], [92.9, 20.1], [93.5, 19.4], [93.8, 19.2],
];
const WATER = [...COAST.map((ll) => project(...ll)), [MAP_W, MAP_H], [0, MAP_H]];

const REGION_LABELS = [
  { t: 'BANGLADESH', ll: [90.05, 25.2] },
  { t: 'WEST BENGAL', ll: [86.6, 23.4] },
  { t: 'NORTHEAST INDIA', ll: [93.15, 26.55] },
  { t: 'TRIPURA', ll: [92.0, 24.1] },
  { t: 'MYANMAR · RAKHINE', ll: [93.3, 21.85] },
];

function offsetPath(points, off = 0) {
  if (!off) return points;
  return points.map((p, i) => {
    const a = points[Math.max(0, i - 1)];
    const b = points[Math.min(points.length - 1, i + 1)];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    return [p[0] + (-dy / len) * off, p[1] + (dx / len) * off];
  });
}

const toD = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

function ConnectivityMap({ selected, onSelect }) {
  const used = useMemo(() => {
    const s = new Set();
    CORRIDORS.forEach((c) => [...c.path, ...(c.via2 || [])].forEach((n) => s.add(n)));
    return s;
  }, []);
  const sel = CORRIDORS.find((c) => c.id === selected);
  const highlighted = new Set(sel ? [...sel.path, ...(sel.via2 || [])] : []);

  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="block h-auto w-full min-w-[540px]" role="group" aria-label="Schematic map of regional corridors around Bangladesh">
      <rect x="0" y="0" width={MAP_W} height={MAP_H} fill="var(--surface)" />
      <polygon points={WATER.map((p) => p.join(',')).join(' ')} fill="var(--water)" />
      <text x={project(88.2, 20.5)[0]} y={project(88.2, 20.5)[1]} fill="var(--ink-3)" fontSize="13" fontStyle="italic" fontFamily="var(--font-serif)">
        Bay of Bengal
      </text>
      {REGION_LABELS.map((r) => {
        const [x, y] = project(...r.ll);
        return (
          <text key={r.t} x={x} y={y} fill="var(--ink-3)" fontSize="10" letterSpacing="2.2" fontFamily="var(--font-mono)" textAnchor="middle" opacity="0.8">
            {r.t}
          </text>
        );
      })}

      {CORRIDORS.map((c) => {
        const st = CORRIDOR_STATUS[c.status];
        const color = TONE[st.tone].stroke;
        const dim = sel && sel.id !== c.id;
        const isSel = sel && sel.id === c.id;
        const paths = [c.path, ...(c.via2 ? [c.via2] : [])].map((p) => toD(offsetPath(p.map((n) => P[n]), c.offset || 0)));
        const activate = () => onSelect(isSel ? null : c.id);
        return (
          <g
            key={c.id}
            role="button"
            tabIndex={0}
            aria-pressed={!!isSel}
            aria-label={`${c.name}: ${st.label}`}
            onClick={activate}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activate();
              }
            }}
            className="cursor-pointer outline-none [&:focus-visible>path.vis]:stroke-[6]"
            style={{ opacity: dim ? 0.22 : 1, transition: 'opacity .2s' }}
          >
            {paths.map((d, i) => (
              <React.Fragment key={i}>
                <path d={d} fill="none" stroke="transparent" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  className="vis"
                  d={d}
                  fill="none"
                  stroke={color}
                  strokeWidth={isSel ? 5 : 3}
                  strokeDasharray={st.dash || undefined}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </React.Fragment>
            ))}
            <title>{`${c.name} · ${st.label}`}</title>
          </g>
        );
      })}

      {Object.entries(NODES).map(([k, n]) => {
        if (!used.has(k)) return null;
        const [x, y] = P[k];
        const lp = LABEL_POS[k];
        const hl = highlighted.has(k);
        const edge = n.kind === 'edge';
        const fill = n.kind === 'capital' ? 'var(--ink)' : n.kind === 'port' ? 'var(--jute-fill)' : n.kind === 'camp' ? 'var(--crit)' : 'var(--ink-2)';
        return (
          <g key={k} pointerEvents="none">
            {edge ? (
              <circle cx={x} cy={y} r="3" fill="var(--ink-3)" />
            ) : n.kind === 'port' ? (
              <rect x={x - 4.5} y={y - 4.5} width="9" height="9" rx="2" fill={fill} stroke="var(--surface)" strokeWidth="2" />
            ) : (
              <circle cx={x} cy={y} r={n.kind === 'capital' ? 6 : 4} fill={fill} stroke="var(--surface)" strokeWidth="2" />
            )}
            {lp && (
              <text
                x={x + lp[0]}
                y={y + lp[1]}
                textAnchor={lp[2]}
                fontSize={n.kind === 'capital' ? 13 : 11}
                fontWeight={n.kind === 'capital' || hl ? 700 : 500}
                fill={hl ? 'var(--ink)' : 'var(--ink-2)'}
                fontFamily="var(--font-display)"
                stroke="var(--surface)"
                strokeWidth="3"
                paintOrder="stroke"
                strokeLinejoin="round"
                fontStyle={edge ? 'italic' : 'normal'}
              >
                {n.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function CorridorDetail({ c }) {
  if (!c) {
    return (
      <div className="grid content-start gap-2">
        <p className="eyebrow">Corridor detail</p>
        <p className="prose-serif text-[0.95rem] text-ink2">
          Select a line on the map or a corridor from the list to see its status, history and what it is worth to Bangladesh.
        </p>
      </div>
    );
  }
  const st = CORRIDOR_STATUS[c.status];
  return (
    <div className="grid content-start gap-2.5" aria-live="polite">
      <div className="flex flex-wrap items-center gap-2">
        <Pill tone={st.tone}>{st.label}</Pill>
        <span className="text-[0.75rem] text-ink3">{MODE_LABEL[c.mode]}</span>
      </div>
      <h4 className="display text-xl font-bold leading-tight">{c.name}</h4>
      <p className="num font-mono text-[0.75rem] text-jute">{c.since}</p>
      <p className="prose-serif text-[0.95rem]">{c.detail}</p>
      <p className="rounded-lg bg-well px-3 py-2 text-[0.88rem]">
        <span className="font-semibold">Why it matters: </span>
        <span className="prose-serif">{c.stake}</span>
      </p>
    </div>
  );
}

export default function Region() {
  const [selected, setSelected] = useState('ctg-transit');
  const sel = CORRIDORS.find((c) => c.id === selected);
  const maxBorder = Math.max(...SISTER_STATES.map((s) => s.border));

  return (
    <div className="grid gap-8 [&>*]:min-w-0">
      <SectionHead eyebrow="Tab 3 · Northeast India, Myanmar, ASEAN" title="Regional integration & the “Sister States”">
        Bangladesh is the hinge between South and Southeast Asia, and the shortest sea outlet for India’s landlocked Northeast. In 2026 most corridors
        are partial, restricted or stalled. The asset exists on the map but not yet in the ledger.
      </SectionHead>

      <section aria-label="Corridor map" className="card overflow-hidden">
        <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          <div className="min-w-0 border-b hair lg:border-b-0 lg:border-r">
            <div className="overflow-x-auto">
              <ConnectivityMap selected={selected} onSelect={setSelected} />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 border-t hair px-4 py-3 text-[0.75rem] text-ink2">
              {Object.entries(CORRIDOR_STATUS).map(([k, s]) => (
                <span key={k} className="flex items-center gap-1.5">
                  <svg width="22" height="6" aria-hidden="true">
                    <line x1="2" y1="3" x2="20" y2="3" stroke={TONE[s.tone].stroke} strokeWidth="3" strokeLinecap="round" strokeDasharray={s.dash || undefined} />
                  </svg>
                  {s.label}
                </span>
              ))}
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-[2px] bg-jutefill" /> Port
              </span>
              <span className="w-full text-ink3">Schematic: places sit at their real coordinates; borders and minor routes are left out.</span>
            </div>
          </div>
          <div className="grid content-start gap-5 p-4 sm:p-5">
            <CorridorDetail c={sel} />
            <div>
              <p className="eyebrow mb-2">All corridors</p>
              <ul className="grid gap-1">
                {CORRIDORS.map((c) => {
                  const st = CORRIDOR_STATUS[c.status];
                  const active = c.id === selected;
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => setSelected(c.id)}
                        aria-pressed={active}
                        className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[0.85rem] ${
                          active ? 'bg-well font-semibold text-ink' : 'text-ink2 hover:bg-well hover:text-ink'
                        }`}
                      >
                        <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${TONE[st.tone].solid}`} />
                        <span className="min-w-0 flex-1">{c.name}</span>
                        <span className="sr-only">{st.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Northeast India ledger" className="card p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="display text-lg font-bold">The Sister States ledger</h3>
          <span className="text-[0.8rem] text-ink3">Border lengths: India Ministry of Home Affairs</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-[0.86rem]">
            <thead>
              <tr className="text-[0.72rem] text-ink3">
                <th scope="col" className="pb-2 pr-3 font-medium">State</th>
                <th scope="col" className="pb-2 pr-3 font-medium">Border with Bangladesh</th>
                <th scope="col" className="pb-2 pr-3 font-medium">Main link</th>
                <th scope="col" className="pb-2 pr-3 font-medium">What Bangladesh offers</th>
                <th scope="col" className="pb-2 font-medium">Friction</th>
              </tr>
            </thead>
            <tbody>
              {SISTER_STATES.map((s) => (
                <tr key={s.state} className="border-t hair align-top">
                  <th scope="row" className="py-2.5 pr-3 font-semibold">{s.state}</th>
                  <td className="py-2.5 pr-3">
                    {s.border > 0 ? (
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-well">
                          <div className="h-2 rounded-full bg-jutefill" style={{ width: `${(s.border / maxBorder) * 100}%` }} />
                        </div>
                        <span className="num whitespace-nowrap font-mono text-[0.78rem]">{s.border} km</span>
                      </div>
                    ) : (
                      <span className="text-ink3">None</span>
                    )}
                  </td>
                  <td className="py-2.5 pr-3 text-ink2">{s.link}</td>
                  <td className="prose-serif py-2.5 pr-3">{s.offer}</td>
                  <td className="prose-serif py-2.5 text-ink2">{s.friction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[0.78rem] text-ink3">
          West Bengal is not one of the Sister States, but its {WEST_BENGAL_BORDER.toLocaleString('en-US')} km border is the busiest frontier, with
          Benapole–Petrapole at its centre. The full India–Bangladesh border is about 4,097 km.
        </p>
      </section>

      <section aria-label="Theatres" className="grid gap-4 lg:grid-cols-3">
        {THEATRES.map((t) => (
          <article key={t.id} className="card grid content-start gap-3 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="bangla text-[1.05rem] leading-tight text-jute">{t.bn}</p>
                <h3 className="display text-xl font-bold leading-tight">{t.title}</h3>
              </div>
              <div className="shrink-0 text-right">
                <p className="eyebrow">Readiness</p>
                <p className="num font-mono text-sm">
                  {t.readiness}
                  <span className="text-ink3">/10</span>
                </p>
              </div>
            </div>
            <p className="prose-serif text-[0.92rem] text-ink2">{t.thesis}</p>
            <div>
              <p className="eyebrow mb-1.5">Opportunity</p>
              <Bullets items={t.opportunity} tone="asset" />
            </div>
            <div>
              <p className="eyebrow mb-1.5">Friction</p>
              <Bullets items={t.friction} tone="crit" />
            </div>
            <p className="border-t hair pt-3 text-[0.9rem]">
              <span className="font-semibold">Dhaka’s move: </span>
              <span className="prose-serif">{t.move}</span>
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
