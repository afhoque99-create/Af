// 10–20 year decadal outlook. 2026 values are latest actuals or estimates;
// later values are ILLUSTRATIVE scenario projections built from the
// assumptions stated in SCENARIOS, not forecasts.

export const YEARS = [2026, 2030, 2035, 2040, 2045];

export const SCENARIOS = {
  reform: {
    label: 'Reform breakout',
    short: 'Reform',
    color: 'var(--sc-reform)',
    assumptions: 'Bank clean-up and tax reform by 2029, energy diversified, GSP+ secured, RCEP accession in the early 2030s.',
    flips: ['S3', 'S4', 'H2', 'S9', 'S2'],
  },
  base: {
    label: 'Muddle-through',
    short: 'Base',
    color: 'var(--sc-base)',
    assumptions: 'Partial reforms, recurring energy stress, slow port delivery, preferences eroded but replaced in part by bilateral deals.',
    flips: ['H1', 'H3', 'S5'],
  },
  stall: {
    label: 'Stall & shock',
    short: 'Stall',
    color: 'var(--sc-stall)',
    assumptions: 'Banking crisis drags on, no Ganges successor deal, LNG shocks repeat, political polarisation returns.',
    flips: [],
  },
};

export const SCENARIO_ORDER = ['reform', 'base', 'stall'];

// National metrics: values indexed like YEARS.
export const NATIONAL = [
  {
    key: 'income', label: 'Per-capita income', unit: 'US$', fmt: (v) => `$${v.toLocaleString('en-US')}`, goodUp: true,
    note: '2026: BBS per-capita income (~$2,820 in FY25), rolled forward.',
    series: { reform: [2850, 3900, 6000, 9000, 13000], base: [2850, 3600, 5000, 6900, 9200], stall: [2850, 3200, 3900, 4900, 6000] },
  },
  {
    key: 'poverty', label: 'Poverty rate', unit: '% national upper line', fmt: (v) => `${v}%`, goodUp: false,
    note: '2026: estimate. Official HIES 2022 was 18.7%; poverty rose after the 2022–25 inflation shock.',
    series: { reform: [21, 15, 9, 5, 3], base: [21, 17, 12, 8, 5], stall: [21, 21, 18, 15, 13] },
  },
  {
    key: 'tax', label: 'Tax-to-GDP', unit: '%', fmt: (v) => `${v}%`, goodUp: true,
    note: '2026: ~6.8% (Finance Ministry). Government target: 15% by 2035.',
    series: { reform: [6.8, 10, 12.5, 14, 15], base: [6.8, 8.5, 10, 11, 12], stall: [6.8, 7, 7.5, 8, 8.5] },
  },
  {
    key: 'exports', label: 'Goods exports', unit: 'US$ bn', fmt: (v) => `$${v} bn`, goodUp: true,
    note: '2026: FY26 actual, $48.0 bn (EPB).',
    series: { reform: [48, 68, 110, 160, 220], base: [48, 60, 85, 115, 150], stall: [48, 52, 60, 70, 80] },
  },
  {
    key: 'rmg', label: 'Garments’ share of exports', unit: '%', fmt: (v) => `${v}%`, goodUp: false,
    note: '2026: ~81% in FY26 (EPB). Lower means a more diversified economy.',
    series: { reform: [81, 75, 65, 55, 48], base: [81, 78, 72, 66, 60], stall: [81, 82, 82, 80, 78] },
  },
  {
    key: 'urban', label: 'Urban share of population', unit: '%', fmt: (v) => `${v}%`, goodUp: null,
    note: 'UN-style urban definition. Urbanisation happens on every path; what differs is whether it is planned.',
    series: { reform: [42, 46, 51, 56, 60], base: [42, 45, 49, 53, 57], stall: [42, 44, 47, 50, 53] },
  },
];

// Climate is set mainly by global emissions, so it is shared across scenarios.
export const SEA_LEVEL = { label: 'Global mean sea level vs 2000', unit: 'cm', values: [9, 11, 14, 17, 20], note: 'Approximate. Delta subsidence adds 2–5 mm a year locally on the coast.' };

export const ZONES = [
  { id: 'urban', label: 'Urban', bn: 'শহর', place: 'Dhaka, Chattogram & secondary cities' },
  { id: 'rural', label: 'Rural', bn: 'গ্রাম', place: 'The northern and central plains' },
  { id: 'coastal', label: 'Coastal', bn: 'উপকূল', place: 'Khulna, Barishal & the Chattogram coast' },
];

export const ZONE_METRICS = {
  urban: [
    { label: 'Greater Dhaka population', unit: 'm', series: { reform: [37, 39, 41, 43, 45], base: [37, 40, 43, 47, 50], stall: [37, 41, 45, 50, 55] }, goodUp: false, hint: 'Lower means growth is spreading to other cities.' },
    { label: 'Metro rail in service', unit: 'km', series: { reform: [21, 60, 110, 160, 200], base: [21, 50, 90, 130, 160], stall: [21, 30, 50, 70, 90] }, goodUp: true },
    { label: 'Annual PM2.5', unit: 'µg/m³', series: { reform: [78, 65, 48, 35, 25], base: [78, 70, 60, 50, 40], stall: [78, 78, 75, 70, 65] }, goodUp: false },
  ],
  rural: [
    { label: 'Farm share of jobs', unit: '%', series: { reform: [45, 38, 31, 24, 18], base: [45, 40, 35, 30, 25], stall: [45, 43, 41, 38, 35] }, goodUp: null, hint: 'Falls as workers move into industry and services.' },
    { label: 'Peak-season outages', unit: 'hrs/day', series: { reform: [8, 3, 1, 0.5, 0.2], base: [8, 4, 2, 1, 0.5], stall: [8, 7, 6, 5, 4] }, goodUp: false },
    { label: 'Rural poverty', unit: '%', series: { reform: [23, 16, 10, 6, 3], base: [23, 18, 13, 9, 6], stall: [23, 23, 20, 17, 15] }, goodUp: false },
  ],
  coastal: [
    { label: 'Salinity-affected farmland', unit: 'm ha', series: { reform: [1.1, 1.12, 1.16, 1.2, 1.24], base: [1.1, 1.15, 1.22, 1.3, 1.38], stall: [1.1, 1.2, 1.32, 1.45, 1.6] }, goodUp: false },
    { label: 'Climate-displaced since 2020', unit: 'm people', series: { reform: [1.5, 2.5, 4.5, 6.5, 8.5], base: [1.5, 3, 6, 9, 12], stall: [1.5, 3.5, 7.5, 12, 16] }, goodUp: false, hint: 'World Bank Groundswell: up to 19.9 m internal climate migrants by 2050 in its pessimistic case.' },
    { label: 'Matarbari port throughput', unit: 'm TEU', series: { reform: [0, 0.6, 1.8, 2.8, 3.5], base: [0, 0.3, 1.1, 2.0, 2.6], stall: [0, 0, 0.4, 0.8, 1.2] }, goodUp: true },
  ],
};

// Base-case narrative for each zone and year.
export const NARRATIVE = {
  2026: {
    urban: 'A shock year. Inflation above 8%, gas-starved factories in Gazipur and Narayanganj, and banks rationing credit. One metro line carries the capital’s commuters, and the February election has calmed the streets for now.',
    rural: 'August’s gas crunch brought 8–12 hour blackouts to parts of the north. Diesel for irrigation is dearer after the Hormuz shock, and Gulf remittances and mobile money keep households afloat.',
    coastal: 'Cox’s Bazar hosts over a million Rohingya on shrinking aid. Matarbari’s power plant runs but its port is only starting construction. The Ganges treaty expires in December with no successor agreed.',
  },
  2030: {
    urban: 'LDC graduation (Nov 2029) has just happened, and the EU transition clock to 2032 is running. MRT-1 and MRT-5N are partly open. Garment hubs push into synthetic fibres to keep orders under stricter origin rules.',
    rural: 'Rooppur’s two units supply about 2.4 GW, and solar pumps spread across the Barind. Farm jobs fall toward 40% as young people head to towns and the Gulf.',
    coastal: 'Matarbari’s first berths take deep-draft ships. Dry-season flows to the southwest depend on whatever replaced the Ganges treaty, and salinity moves inland where it failed.',
  },
  2035: {
    urban: 'The base case nears the upper-middle-income line at about $5,000 per head. Chattogram–Mirsarai–Matarbari is a manufacturing belt, and the working-age share is at its peak.',
    rural: 'Mechanisation and aquaculture replace labour, and farm households earn more off the farm than on it. Electricity outages are rare outside storms.',
    coastal: 'Polder upgrades protect the southwest unevenly. Climate migration to Khulna, Chattogram and Dhaka slums is the main driver of informal settlement.',
  },
  2040: {
    urban: 'The demographic window starts closing as the dependency ratio rises. Cities that built transit and housing now compete for investment with Dhaka.',
    rural: 'An older farm workforce leans on machinery services. Rural poverty in the base case is under 10%, concentrated in the char islands and the haor wetlands.',
    coastal: 'Sea level is up about 17 cm on 2000 globally, and subsidence makes it worse locally. Sundarbans health depends on sweet-water flows from upstream.',
  },
  2045: {
    urban: 'Greater Dhaka reaches about 50 million in the base case, on course to be the largest city on Earth by 2050 (UN projection: 52 million). Whether it works depends on decisions taken in the 2020s.',
    rural: 'Farming employs about a quarter of workers. Rural Bangladesh is a service economy of remittances, small industry and digital trade.',
    coastal: 'The coast is a split screen: a deep-sea port economy at Matarbari, and planned retreat from the most saline polders of the southwest.',
  },
};

// One headline per scenario per year.
export const HEADLINES = {
  reform: {
    2026: 'Same starting point. The difference is what gets passed in the next 36 months.',
    2030: 'Graduation lands softly: GSP+ application filed, NPLs under 15%, tax at 10% of GDP.',
    2035: 'Investment-grade path in sight; FDI above 2% of GDP as firms relocate from China.',
    2040: 'A second manufacturing base (electronics, pharma) matches garments in size.',
    2045: 'Approaching high-income thresholds; Bangladesh is the Bay of Bengal’s logistics hub.',
  },
  base: {
    2026: 'Shock year: weak growth, high inflation, power cuts and an expiring water treaty.',
    2030: 'Graduation absorbed with bruises; exports grow, but slower than competitors.',
    2035: 'Upper-middle income within reach, thanks more to remittances and demographics than to reform.',
    2040: 'The demographic window narrows before tax and skills reforms have caught up.',
    2045: 'A large, middle-income economy with a crowded capital and a fragile coast.',
  },
  stall: {
    2026: 'The crisis does not end: credit, energy and politics stay jammed.',
    2030: 'Preferences fall away at graduation; orders shift to Vietnam, Cambodia and India.',
    2035: 'Stuck below the upper-middle line; brain drain and remittance dependence deepen.',
    2040: 'Repeated energy and water shocks; climate migration overwhelms Dhaka.',
    2045: 'Per-capita income about half the reform path’s; the coast is losing ground.',
  },
};

// Milestones: year per scenario (null means it does not happen by 2045).
export const MILESTONES = [
  { label: 'Rooppur Unit 1 first criticality', kind: 'Infrastructure', years: { reform: 2026, base: 2026, stall: 2026 }, actual: true },
  { label: 'Ganges Water Treaty expires (12 Dec)', kind: 'Water', years: { reform: 2026, base: 2026, stall: 2026 }, actual: true },
  { label: 'Rooppur Units 1 and 2 in commercial operation', kind: 'Infrastructure', years: { reform: 2028, base: 2029, stall: 2031 } },
  { label: 'LDC graduation (24 Nov)', kind: 'Policy', years: { reform: 2029, base: 2029, stall: 2029 }, fixed: true },
  { label: 'Matarbari deep-sea port, phase 1', kind: 'Infrastructure', years: { reform: 2029, base: 2030, stall: 2033 } },
  { label: 'Bay Terminal first berths', kind: 'Infrastructure', years: { reform: 2029, base: 2031, stall: 2034 } },
  { label: 'EU EBA transition ends: GSP+ or standard GSP', kind: 'Policy', years: { reform: 2032, base: 2032, stall: 2032 }, fixed: true },
  { label: 'Dhaka MRT-1 and MRT-5N fully open', kind: 'Infrastructure', years: { reform: 2031, base: 2033, stall: 2038 } },
  { label: 'Tax-to-GDP reaches 15% (government target)', kind: 'Policy', years: { reform: 2045, base: null, stall: null } },
  { label: 'Teesta restoration complete', kind: 'Water', years: { reform: 2034, base: 2037, stall: null } },
  { label: '3 GW+ of hydropower imported from Nepal, Bhutan and Northeast India', kind: 'Infrastructure', years: { reform: 2034, base: 2039, stall: null } },
  { label: 'Demographic window begins to close', kind: 'Demography', years: { reform: 2040, base: 2040, stall: 2040 }, fixed: true },
];

// How each zone diverges from the base case on the other two paths.
export const ZONE_DIVERGENCE = {
  reform: {
    urban: 'Growth spreads to Chattogram, Khulna, Rajshahi and Sylhet as agencies and investment move out; Dhaka’s share of new jobs falls.',
    rural: 'Reliable power and credit bring agro-processing into district towns, so farm households add factory and service incomes faster.',
    coastal: 'A Ganges successor treaty and polder upgrades slow the salinity front; Matarbari becomes a mother-vessel hub.',
  },
  stall: {
    urban: 'Climate migrants pour into Dhaka’s informal settlements while factories cut shifts; congestion and smog get worse, not better.',
    rural: 'Outages and dear diesel keep irrigation costly; young people leave for the Gulf, and remittances replace local jobs.',
    coastal: 'Without a water deal or new polders, saline land expands quickly and Matarbari stays a half-used port.',
  },
};
