import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { INDICATORS, STATUS } from './data/framework.js';
import { Segmented, TONE } from './components/ui.jsx';
import Fixes from './tabs/Fixes.jsx';
import Powers from './tabs/Powers.jsx';
import Region from './tabs/Region.jsx';
import Outlook from './tabs/Outlook.jsx';

const TABS = [
  { id: 'fixes', icon: '🛠️', title: 'Hardware & Software Fixes', short: 'Fixes', sub: 'Solving systemic deficits' },
  { id: 'powers', icon: '🌐', title: 'Foreign Power Matrix', short: 'Powers', sub: 'India, China, US, Japan & trade blocs' },
  { id: 'region', icon: '🗺️', title: 'Regional Integration & “Sister States”', short: 'Region', sub: 'Northeast India, Myanmar, ASEAN' },
  { id: 'outlook', icon: '🔮', title: '10–20 Year Decadal Outlook', short: 'Outlook', sub: 'Living standards, infrastructure, climate' },
];

const AS_OF = new Date('2026-11-03T00:00:00Z');

const CONTEXT = [
  { label: 'GDP growth, FY27', value: '3.2%', src: 'IMF forecast, Oct 2026', tone: 'crit' },
  { label: 'Inflation', value: '8.34%', src: 'BBS, Sep 2026', tone: 'crit' },
  { label: 'Bank NPL ratio', value: '32.8%', src: 'Bangladesh Bank, Jun 2026', tone: 'crit' },
  { label: 'Tax-to-GDP', value: '~6.8%', src: 'Finance Ministry, FY26', tone: 'crit' },
  { label: 'Goods exports, FY26', value: '$48.0 bn', src: 'EPB, flat on FY25', tone: 'prog' },
  { label: 'FX reserves (gross)', value: '~$31–32 bn', src: 'Sep 2026, rebuilt since 2024', tone: 'prog' },
  { label: 'LDC graduation', value: '24 Nov 2029', src: 'Deferred by UNGA, Oct 2026', tone: 'prog' },
];

function readTheme() {
  try {
    return localStorage.getItem('bd-theme') || 'system';
  } catch {
    return 'system';
  }
}

function useTheme() {
  const [theme, setTheme] = useState(readTheme);
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('bd-theme', theme);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
  }, [theme]);
  return [theme, setTheme];
}

function tabFromHash() {
  const h = (typeof location !== 'undefined' ? location.hash : '').replace('#', '');
  return TABS.some((t) => t.id === h) ? h : 'fixes';
}

function GangesCountdown() {
  const deadline = new Date('2026-12-12T00:00:00Z');
  const now = new Date();
  const ref = now < AS_OF ? AS_OF : now;
  const days = Math.ceil((deadline - ref) / 86400000);
  return (
    <div className="grid content-start gap-0.5 px-3 py-2.5">
      <p className="text-[0.75rem] text-ink2">Ganges treaty expires</p>
      <p className="text-[1.15rem] font-bold leading-tight">12 Dec 2026</p>
      <p className="text-[0.72rem] font-semibold text-crit">{days > 0 ? `${days} days left, no successor agreed` : 'Expired; check renewal status'}</p>
    </div>
  );
}

function Pulse({ onPick }) {
  const counts = useMemo(() => {
    const c = { critical: 0, progress: 0, asset: 0 };
    INDICATORS.forEach((i) => (c[i.status] += 1));
    return c;
  }, []);
  const row = (layer, label) => (
    <div className="grid grid-cols-[4.75rem_minmax(0,1fr)] items-center gap-2">
      <span className="text-[0.75rem] text-ink3">{label}</span>
      <div className="grid grid-cols-10 gap-1">
        {INDICATORS.filter((i) => i.layer === layer).map((i) => {
          const t = TONE[STATUS[i.status].tone];
          return (
            <button
              key={i.code}
              type="button"
              onClick={() => onPick(i.code)}
              title={`${i.code} · ${i.name} · ${STATUS[i.status].label}`}
              aria-label={`${i.code} ${i.name}: ${STATUS[i.status].label}. Open in Tab 1`}
              className={`flex aspect-square min-w-0 flex-col items-center justify-center rounded-[5px] border ${t.bg} ${t.border} ${t.text} transition-transform hover:-translate-y-0.5`}
            >
              <span aria-hidden="true" className="text-[0.55rem] leading-none">{STATUS[i.status].glyph}</span>
              <span className="mt-0.5 font-mono text-[0.58rem] font-medium leading-none sm:text-[0.62rem]">{i.code}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
  return (
    <section aria-label="Framework pulse" className="card grid content-start gap-3 p-4">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="display text-[1.1rem] font-bold">Framework pulse</h2>
        <span className="text-[0.75rem] text-ink3">20 indicators · select one to open it</span>
      </div>
      {row('hardware', 'Hardware')}
      {row('software', 'Software')}
      <div className="flex h-2 gap-[2px] overflow-hidden rounded-full" aria-hidden="true">
        {['critical', 'progress', 'asset'].map((k) => (
          <span key={k} className={`${TONE[STATUS[k].tone].solid} rounded-full`} style={{ width: `${(counts[k] / 20) * 100}%` }} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.8rem]">
        {['critical', 'progress', 'asset'].map((k) => (
          <span key={k} className="flex items-center gap-1.5">
            <span aria-hidden="true" className={`text-[0.65rem] ${TONE[STATUS[k].tone].text}`}>{STATUS[k].glyph}</span>
            <span className="num font-semibold">{counts[k]}</span>
            <span className="text-ink2">{STATUS[k].label}</span>
          </span>
        ))}
      </div>
    </section>
  );
}

const SOURCES = [
  ['UN extends LDC graduation to 2029 (bdnews24)', 'https://bdnews24.com/economy/qro0l7696k'],
  ['BNP wins February 2026 election (Al Jazeera)', 'https://www.aljazeera.com/news/2026/2/13/bangladeshs-bnp-claims-landslide-win-in-first-election-since-2024-uprising'],
  ['July Charter referendum result (Dhaka Tribune)', 'https://www.dhakatribune.com/bangladesh/election/403268/yes-wins-in-referendum-on-july-charter'],
  ['Ganges treaty nears expiry (France 24)', 'https://www.france24.com/en/live-news/20261029-bangladesh-scrambling-as-ganges-water-treaty-to-expire'],
  ['US–Bangladesh reciprocal trade framework (White House)', 'https://www.whitehouse.gov/briefings-statements/2026/02/joint-statement-on-framework-for-united-states-bangladesh-agreement-on-reciprocal-trade'],
  ['US deal sets 19% tariff (Al Jazeera)', 'https://www.aljazeera.com/economy/2026/2/9/us-and-bangladesh-set-trade-deal-with-tariffs-at-19-percent'],
  ['Japan–Bangladesh EPA signed (METI)', 'https://www.meti.go.jp/english/press/2026/0206_001.html'],
  ['IMF: inflation 10.9%, growth 3.2% (Financial Express)', 'https://thefinancialexpress.com.bd/economy/predicts-inflation-surge-to-109pc-gdp-slide-to-32pc'],
  ['World Bank: growth below 4% until FY28 (Daily Star)', 'https://www.thedailystar.net/business/economy/news/growth-stay-below-4-until-fy28-energy-banking-woes-4292321'],
  ['Energy crisis and the Iran war (Global Voices)', 'https://globalvoices.org/2026/04/12/bangladeshs-energy-crisis-worsens-as-uss-war-on-iran-drags-on/'],
  ['LNG supply chokes power output (Daily Star)', 'https://www.thedailystar.net/news/bangladesh/news/lng-supply-worsens-chokes-power-output-4247451'],
  ['NPL ratio, June 2026 (Dhaka Tribune)', 'https://www.dhakatribune.com/business/banks/419957/npls-slightly-decline-by-3-percentage-points'],
  ['Rooppur starts generating (Dhaka Tribune)', 'https://www.dhakatribune.com/bangladesh/power-energy/423306/rnpp-starts-generating-power-begins-internal-use'],
  ['FY26 exports at $48 bn (TBS)', 'https://www.tbsnews.net/node/1478001'],
  ['New IMF loan talks (Daily Star)', 'https://www.thedailystar.net/news/bangladesh/news/talks-imf-new-loan-continue-bangkok-4293361'],
  ['Revenue targets and Fitch (TBS)', 'https://www.tbsnews.net/economy/bangladeshs-new-budget-revenue-targets-face-execution-risks-fitch-ratings-1464741'],
  ['Foreign loan disbursements FY26 (Observer)', 'https://observerbd.com/news/580635'],
  ['China pledges Teesta support (Daily Star)', 'https://www.thedailystar.net/news/bangladesh/diplomacy/news/china-pledges-full-support-teesta-management-4208711'],
  ['PM Rahman’s India trip stalled (Al Jazeera)', 'https://www.aljazeera.com/features/2026/8/23/pm-tarique-rahmans-trip-stalled-what-it-means-for-bangladesh-india-ties'],
  ['India curbs land-port imports (Daily Star)', 'https://www.thedailystar.net/business/news/india-curbs-land-port-imports-bangladesh-3897036'],
  ['ASEAN and RCEP bid (The Edge Malaysia)', 'https://theedgemalaysia.com/node/807744'],
  ['Rohingya repatriation deadlock (Asia News Network)', 'https://asianews.network/can-bangladesh-pm-tarique-rahmans-plan-break-the-rohingya-repatriation-deadlock/'],
  ['Arakan Army border relocation (The Diplomat)', 'https://thediplomat.com/2026/10/arakan-army-firms-up-relocation-plan-for-villages-on-bangladesh-myanmar-border/'],
  ['UN World Urbanization Prospects 2025 (UN)', 'https://www.un.org/sustainabledevelopment/blog/2025/11/press-release-wup2025'],
  ['Hasina sentenced in absentia (OCCRP)', 'https://www.occrp.org/en/news/bangladesh-tribunal-sentences-ex-pm-hasina-to-death-in-absentia-for-2024-crackdown'],
];

export default function App() {
  const [theme, setTheme] = useTheme();
  const [tab, setTab] = useState(tabFromHash);
  const [openCodes, setOpenCodes] = useState(() => new Set(['H2', 'S3']));
  const [focusCode, setFocusCode] = useState(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    const onHash = () => setTab(tabFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useLayoutEffect(() => {
    if (!tabsRef.current) return undefined;
    const ro = new ResizeObserver(([e]) =>
      document.documentElement.style.setProperty('--tabs-h', `${Math.round(e.target.getBoundingClientRect().height)}px`),
    );
    ro.observe(tabsRef.current);
    return () => ro.disconnect();
  }, []);

  const go = (id, { scroll = true } = {}) => {
    setTab(id);
    try {
      if (location.hash !== `#${id}`) history.replaceState(null, '', `#${id}`);
    } catch {
      /* hash routing is optional */
    }
    if (scroll && tabsRef.current) {
      const top = tabsRef.current.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const openIndicator = (code) => {
    go('fixes', { scroll: false });
    setFocusCode(code);
  };

  const onTabKey = (e) => {
    const i = TABS.findIndex((t) => t.id === tab);
    let n = null;
    if (e.key === 'ArrowRight') n = (i + 1) % TABS.length;
    if (e.key === 'ArrowLeft') n = (i - 1 + TABS.length) % TABS.length;
    if (n !== null) {
      e.preventDefault();
      go(TABS[n].id, { scroll: false });
      document.getElementById(`tab-${TABS[n].id}`)?.focus();
    }
  };

  return (
    <div className="mx-auto max-w-page pb-16">
      <header className="grid gap-6 pb-6 pt-6 sm:pt-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end">
        <div className="grid min-w-0 content-start gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="eyebrow">
              Strategic assessment · as of 3 Nov 2026 · <span className="bangla normal-case tracking-normal">১৮ কার্তিক ১৪৩৩</span>
            </p>
            <Segmented
              label="Colour theme"
              idBase="theme"
              value={theme}
              onChange={setTheme}
              options={[
                { value: 'system', label: 'Auto' },
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
              ]}
            />
          </div>
          <h1 className="display text-[2.6rem] font-black leading-[0.92] sm:text-[3.6rem]">Bangladesh Development Trajectory</h1>
          <p className="bangla text-[1.15rem] text-jute">বাংলাদেশ · উন্নয়নের গতিপথ</p>
          <p className="prose-serif max-w-[62ch] text-[1.02rem] text-ink2">
            A delta of some 175 million people with a working-age bulge, a world-class garment base and a prime spot on the Bay of Bengal, held back by
            broken banks, one of the world’s lowest tax takes and dependence on imported fuel. The LDC deferral to 2029 buys three years. Whether Bangladesh reaches upper-middle
            income by the mid-2030s depends on what gets fixed inside that window.
          </p>
        </div>
        <Pulse onPick={openIndicator} />
      </header>

      <section aria-label="2026 context" className="mb-6 grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border hair bg-line sm:grid-cols-4 xl:grid-cols-8 [&>*]:bg-surface">
        {CONTEXT.map((c) => (
          <div key={c.label} className="grid content-start gap-0.5 px-3 py-2.5">
            <p className="text-[0.75rem] text-ink2">{c.label}</p>
            <p className="text-[1.15rem] font-bold leading-tight">{c.value}</p>
            <p className="text-[0.7rem] text-ink3">{c.src}</p>
          </div>
        ))}
        <GangesCountdown />
      </section>

      <nav
        ref={tabsRef}
        aria-label="Analysis sections"
        className="sticky z-30 -mx-4 mb-8 border-b hair bg-paper px-4 py-2 sm:mx-0 sm:px-0"
        style={{ top: 'env(safe-area-inset-top, 0px)' }}
      >
        <div role="tablist" aria-label="Analysis sections" className="grid grid-cols-4 gap-1.5" onKeyDown={onTabKey}>
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                id={`tab-${t.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${t.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => go(t.id)}
                className={`group grid min-w-0 content-start gap-0.5 rounded-lg px-2 py-2 text-left transition-colors sm:px-3 ${
                  active ? 'bg-ink text-surface' : 'text-ink2 hover:bg-well hover:text-ink'
                }`}
              >
                <span className="flex min-w-0 items-center gap-1.5 text-[0.8rem] font-semibold leading-tight sm:text-[0.9rem]">
                  <span aria-hidden="true">{t.icon}</span>
                  <span className="truncate sm:hidden">{t.short}</span>
                  <span className="hidden min-w-0 sm:inline">{t.title}</span>
                </span>
                <span className={`hidden text-[0.72rem] leading-snug md:block ${active ? 'opacity-75' : 'text-ink3'}`}>{t.sub}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {TABS.map((t) => (
        <div key={t.id} id={`panel-${t.id}`} role="tabpanel" aria-labelledby={`tab-${t.id}`} hidden={t.id !== tab}>
          {t.id === 'fixes' && (
            <Fixes openCodes={openCodes} setOpenCodes={setOpenCodes} focusCode={focusCode} clearFocus={() => setFocusCode(null)} />
          )}
          {t.id === 'powers' && tab === 'powers' && <Powers />}
          {t.id === 'region' && tab === 'region' && <Region />}
          {t.id === 'outlook' && tab === 'outlook' && <Outlook onOpenCode={openIndicator} />}
        </div>
      ))}

      <footer className="mt-14 grid gap-4 border-t hair pt-6">
        <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-8">
          <div>
            <h2 className="display text-lg font-bold">Method & sources</h2>
            <p className="prose-serif mt-1 text-[0.9rem] text-ink2">
              Facts are drawn from public reporting and official statistics up to 3 November 2026. Status badges, readiness scores, dependence ratings and
              all post-2026 figures are analyst judgements and illustrative scenarios, not official forecasts. Figures from different sources can disagree
              on definitions and dates; ranges are shown where they do.
            </p>
          </div>
          <ul className="grid gap-x-6 gap-y-1 text-[0.8rem] sm:grid-cols-2">
            {SOURCES.map(([label, href]) => (
              <li key={href} className="min-w-0">
                <a href={href} target="_blank" rel="noopener noreferrer" className="break-words text-ink2 underline decoration-line decoration-1 underline-offset-2 hover:text-ink hover:decoration-ink3">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
