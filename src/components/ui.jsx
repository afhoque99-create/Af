import React, { useId, useState } from 'react';
import { STATUS } from '../data/framework.js';

// Full class strings so Tailwind's scanner keeps them.
export const TONE = {
  crit: { text: 'text-crit', bg: 'bg-critsoft', solid: 'bg-crit', border: 'border-crit', stroke: 'var(--crit)' },
  prog: { text: 'text-prog', bg: 'bg-progsoft', solid: 'bg-prog', border: 'border-prog', stroke: 'var(--prog)' },
  asset: { text: 'text-asset', bg: 'bg-assetsoft', solid: 'bg-asset', border: 'border-asset', stroke: 'var(--asset)' },
  jute: { text: 'text-jute', bg: 'bg-jutesoft', solid: 'bg-jutefill', border: 'border-jute', stroke: 'var(--jute)' },
  muted: { text: 'text-ink3', bg: 'bg-well', solid: 'bg-ink3', border: 'border-line', stroke: 'var(--ink-3)' },
};

export function StatusBadge({ status, compact = false }) {
  const s = STATUS[status];
  const t = TONE[s.tone];
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.72rem] font-semibold ${t.bg} ${t.text}`}>
      <span aria-hidden="true" className="text-[0.6rem] leading-none">{s.glyph}</span>
      {compact ? s.short : s.label}
    </span>
  );
}

export function Pill({ tone = 'muted', children }) {
  const t = TONE[tone];
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[0.72rem] font-semibold ${t.bg} ${t.text}`}>{children}</span>
  );
}

// Readiness meter: 0–10 fill, with a tick for the level needed by 2035.
export function Readiness({ score, target, status }) {
  const t = TONE[STATUS[status].tone];
  return (
    <div className="flex items-center gap-2" aria-label={`Readiness ${score} of 10; ${target} needed by 2035`}>
      <div className="relative h-2 w-24 rounded-full bg-well sm:w-28">
        <div className={`absolute inset-y-0 left-0 rounded-full ${t.solid}`} style={{ width: `${score * 10}%` }} />
        <div className="absolute -top-1 h-4 w-0.5 rounded bg-ink" style={{ left: `calc(${target * 10}% - 1px)` }} title={`2035 need: ${target}`} />
      </div>
      <span className="num font-mono text-xs text-ink2">{score}<span className="text-ink3">/10</span></span>
    </div>
  );
}

export function SectionHead({ eyebrow, title, children, right }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div className="min-w-0 max-w-3xl">
        {eyebrow && <p className="eyebrow mb-1.5">{eyebrow}</p>}
        <h2 className="display text-[1.65rem] font-extrabold leading-[1.05] sm:text-[2rem]">{title}</h2>
        {children && <p className="prose-serif mt-2 text-[0.98rem] text-ink2">{children}</p>}
      </div>
      {right}
    </div>
  );
}

export function Chevron({ open }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={`h-4 w-4 shrink-0 text-ink3 transition-transform ${open ? 'rotate-180' : ''}`}>
      <path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Accessible disclosure (accordion item).
export function Disclosure({ header, children, open: controlledOpen, onToggle, defaultOpen = false, id }) {
  const autoId = useId();
  const panelId = `${id || autoId}-panel`;
  const [inner, setInner] = useState(defaultOpen);
  const open = controlledOpen ?? inner;
  const toggle = () => (onToggle ? onToggle(!open) : setInner(!open));
  return (
    <div className="card overflow-hidden" id={id}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-well focus-visible:outline-offset-[-2px]"
      >
        <div className="min-w-0 flex-1">{header}</div>
        <Chevron open={open} />
      </button>
      {open && (
        <div id={panelId} className="border-t hair px-4 pb-4 pt-3">
          {children}
        </div>
      )}
    </div>
  );
}

export function Segmented({ label, options, value, onChange, idBase }) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex flex-wrap gap-1 rounded-full border hair bg-surface p-1">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            id={`${idBase}-${o.value}`}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.8125rem] font-semibold transition-colors ${
              active ? 'bg-ink text-surface' : 'text-ink2 hover:text-ink'
            }`}
          >
            {o.swatch && <span aria-hidden="true" className="h-[3px] w-3.5 rounded-full" style={{ background: o.swatch }} />}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Bullets({ items, tone }) {
  const t = tone ? TONE[tone] : null;
  return (
    <ul className="grid gap-1.5">
      {items.map((it, i) => (
        <li key={i} className="prose-serif flex gap-2 text-[0.92rem] text-ink">
          <span aria-hidden="true" className={`mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full ${t ? t.solid : 'bg-ink3'}`} />
          <span className="min-w-0">{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function Dots({ value, max = 5, tone = 'crit', label }) {
  const t = TONE[tone];
  return (
    <span className="inline-flex items-center gap-1" role="img" aria-label={`${label}: ${value} of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`h-2 w-2 rounded-full ${i < value ? t.solid : 'bg-well border hair'}`} />
      ))}
    </span>
  );
}
