// Foreign Power Matrix. Ratings are analyst judgements (as of Nov 2026).
// sovereignty: 1 (low cost) .. 5 (high cost). Dependence: 0 none .. 3 high.

export const CHANNELS = [
  { key: 'trade', label: 'Trade' },
  { key: 'finance', label: 'Finance & debt' },
  { key: 'energy', label: 'Energy' },
  { key: 'security', label: 'Security & arms' },
  { key: 'water', label: 'Water' },
  { key: 'labour', label: 'Labour & remittances' },
  { key: 'connect', label: 'Connectivity' },
];

export const DEP_LABEL = ['None', 'Low', 'Medium', 'High'];

export const POWERS = [
  {
    id: 'india', name: 'India', flagNote: 'Neighbour on three sides',
    posture: 'Indispensable neighbour, relationship in a deep freeze',
    dependence: { trade: 3, finance: 1, energy: 2, security: 2, water: 3, labour: 0, connect: 3 },
    sovereignty: 3,
    leverageOverDhaka: 'Water flows, food and yarn imports, electricity, the border, and the Hasina question.',
    dhakaLeverage: 'Transit to the Northeast, stability on India’s eastern flank, a top export market for Indian goods, and Bay of Bengal access.',
    benefits: [
      'Imports of food, cotton yarn and fuel at the lowest landed cost, over the world’s fifth-longest land border.',
      'About 2.5 GW of electricity imports, including Adani’s dedicated Godda plant.',
      'Three lines of credit worth about $7.4 bn (2010–17), plus the shortest transit routes to Nepal, Bhutan and Northeast India.',
    ],
    risks: [
      'The Ganges treaty expires on 12 Dec 2026; India had not formally engaged on renewal as of late October. The Teesta deal has been unsigned since 2011.',
      'Since April–May 2025 India has withdrawn the transshipment facility and barred Bangladeshi garments and processed food from most land ports. A review was raised at trade talks in October 2026.',
      'Border killings, “push-ins” of alleged undocumented migrants, and Sheikh Hasina’s exile in India keep domestic opinion hostile.',
    ],
    debt: 'Small. Credit lines are tied to Indian suppliers (largely 65–75% Indian content) and well under half disbursed.',
    status2026: 'Tarique Rahman’s first India visit has stalled. India invited him to the BRICS outreach session in New Delhi in September as BIMSTEC chair. Trade officials met in October.',
    play: 'Compartmentalise. Trade normalised land ports and a Ganges successor treaty for transit rights and more power trade; keep the Hasina issue in legal channels.',
  },
  {
    id: 'china', name: 'China', flagNote: 'Largest trading partner',
    posture: 'Largest supplier and builder; strategic courtship intensifying',
    dependence: { trade: 3, finance: 2, energy: 2, security: 3, water: 2, labour: 0, connect: 2 },
    sovereignty: 3,
    leverageOverDhaka: 'Garment inputs (fabric, yarn, machinery), most arms imports, project finance, and the upper Brahmaputra.',
    dhakaLeverage: 'Bay of Bengal access, a manufacturing base for firms leaving China, and a swing vote in South Asia.',
    benefits: [
      'Largest import source; the fabrics, yarn and machinery behind the garment industry.',
      'Built the Padma rail link, Karnaphuli Tunnel and Payra 1,320 MW plant. During PM Rahman’s June 2026 Beijing visit China pledged full support for the Teesta, and 13 MoUs were signed.',
      'Factories relocating to escape US tariffs are a real chance to diversify exports.',
    ],
    risks: [
      'Bilateral exposure of about $6.6 bn (AidData, end-2024), much of it supplier credit at harder terms than Japanese or multilateral loans.',
      'A Teesta project near India’s Siliguri Corridor is an Indian red line, and the upstream Medog dam adds water leverage.',
      'The US trade deal lets Washington terminate it if Dhaka signs an FTA with a “non-market country”, which in practice caps a China FTA.',
    ],
    debt: 'About $6.6 bn bilateral (end-2024). China made no new loan commitments in FY26 but kept disbursing on existing projects.',
    status2026: 'A Teesta feasibility study has been agreed. Ties are warm under the “Bangladesh First” framing, and China remains the main arms supplier.',
    play: 'Take Chinese equity for manufacturing and transparent, tendered finance for water. Avoid a security footprint near the northern border.',
  },
  {
    id: 'us', name: 'United States', flagNote: 'Top single-country export market',
    posture: 'Top single export market; transactional trade partner',
    dependence: { trade: 3, finance: 1, energy: 2, security: 1, water: 0, labour: 1, connect: 0 },
    sovereignty: 3,
    leverageOverDhaka: 'Tariff rates, apparel demand, influence at the IMF and World Bank, and humanitarian funding.',
    dhakaLeverage: 'A cheaper apparel source than China, Bay of Bengal maritime cooperation, and buyer of US LNG, cotton, wheat and aircraft.',
    benefits: [
      'Largest single-country buyer of Bangladeshi apparel.',
      'The Agreement on Reciprocal Trade (9 Feb 2026) set a 19% tariff and a zero-tariff route for apparel made with US cotton or man-made fibre, capped by the volume of US inputs used.',
      'Chevron produces a large share of domestic gas, and the US remains a major Rohingya donor ($150 m allocated for 2026).',
    ],
    risks: [
      'A 19% tariff is still a big rise over the pre-2025 level, and the deal adds purchase and standards commitments.',
      'The “non-market country” FTA clause narrows Dhaka’s options with China.',
      'USAID’s 2025 dismantling cut health, democracy and refugee programmes.',
    ],
    debt: 'Negligible direct lending; influence works through the IMF, the World Bank and DFC.',
    status2026: 'The trade framework is signed and domestic formalities are under way. Security talk focuses on maritime domain awareness.',
    play: 'Use the US-cotton zero-tariff route to win back share; sign long-term US LNG contracts to diversify from the Gulf; keep defence ties at training and maritime level.',
  },
  {
    id: 'japan', name: 'Japan', flagNote: 'Largest bilateral financier',
    posture: 'Most trusted financier; patient infrastructure partner',
    dependence: { trade: 1, finance: 3, energy: 2, security: 0, water: 0, labour: 1, connect: 3 },
    sovereignty: 1,
    leverageOverDhaka: 'Soft loans for the biggest projects, and the pace of disbursement.',
    dhakaLeverage: 'A Bay of Bengal anchor for Japan’s Free and Open Indo-Pacific strategy, and a labour pool for an ageing Japan.',
    benefits: [
      'Bangladesh’s largest bilateral development partner for decades, financing the Bay of Bengal Industrial Growth Belt (BIG-B, 2014).',
      'Built or financing Matarbari power and port, Dhaka MRT lines 6, 1 and 5, the Jamuna Railway Bridge (2025) and the airport’s third terminal.',
      'The Economic Partnership Agreement (6 Feb 2026), Bangladesh’s first, gives duty-free access for 7,379 products including garments.',
    ],
    risks: [
      'Loans are in yen, so currency swings change the repayment bill.',
      'Cost overruns and slippage (Matarbari port); some loans are tied to Japanese contractors.',
      'Coal lock-in at Matarbari power, and Tokyo’s caution about political risk.',
    ],
    debt: 'Bangladesh’s largest bilateral creditor, on very soft terms (low interest, 30–40 year maturities).',
    status2026: 'The EPA is signed and the Matarbari port construction contract is starting. Japan is courting firms that want to diversify out of China.',
    play: 'Anchor the Matarbari–Chattogram industrial belt on Japan; use the EPA to draw Japanese firms leaving China; move the coal pipeline toward gas and renewables.',
  },
  {
    id: 'eu', name: 'European Union', flagNote: 'Largest export destination (bloc)',
    posture: 'Largest export market; rising compliance bar',
    dependence: { trade: 3, finance: 1, energy: 0, security: 0, water: 0, labour: 1, connect: 0 },
    sovereignty: 2,
    leverageOverDhaka: 'Duty-free access, which depends on labour-rights and governance conditions.',
    dhakaLeverage: 'Low-cost, high-compliance apparel supply that is hard for EU retailers to replace.',
    benefits: [
      'Takes roughly half of Bangladesh’s exports, duty-free under Everything But Arms (EBA).',
      'After graduation (now November 2029), a three-year transition keeps EBA until 2032.',
      'The GSP+ scheme could extend preferences if Bangladesh qualifies.',
    ],
    risks: [
      'GSP+ requires ratifying and implementing 27 international conventions on labour, rights and governance.',
      'Stricter rules of origin under GSP+ could exclude woven garments made from imported fabric.',
      'New due-diligence and deforestation rules raise compliance costs.',
    ],
    debt: 'Modest; the European Investment Bank and Global Gateway grants.',
    status2026: 'The EU backed the LDC deferral but called for faster labour and structural reforms.',
    play: 'Qualify for GSP+ before 2032: ratify the remaining conventions, reform labour law, and build woven-fabric capacity.',
  },
  {
    id: 'russia', name: 'Russia', flagNote: 'Nuclear builder', compact: true,
    posture: 'Nuclear builder and creditor',
    dependence: { trade: 1, finance: 2, energy: 2, security: 1, water: 0, labour: 0, connect: 0 },
    sovereignty: 2,
    leverageOverDhaka: 'Rooppur’s fuel, operations and loan terms.',
    dhakaLeverage: 'A flagship reference plant for Rosatom’s export business.',
    benefits: ['Rooppur Nuclear Power Plant (2 × 1.2 GW); Unit 1 reached first criticality on 11 Oct 2026.', 'Wheat and fertiliser supplies.'],
    risks: ['The Rooppur state credit of about $11 bn is a large single obligation; sanctions complicate payment channels.', 'Spent-fuel and operating dependence on Rosatom for decades.'],
    debt: 'Rooppur state credit of roughly $11–12 bn. Russia was the third-largest disbursing source in FY26 ($1.05 bn).',
    status2026: 'Unit 1 is in power start-up; grid connection is pending a final certification.',
    play: 'Get Rooppur on the grid safely and transparently, and negotiate a repayment schedule that matches the plant’s actual output.',
  },
  {
    id: 'gulf', name: 'Gulf states', flagNote: 'Jobs and fuel', compact: true,
    posture: 'Jobs and fuel; shock transmitter',
    dependence: { trade: 1, finance: 1, energy: 3, security: 0, water: 0, labour: 3, connect: 0 },
    sovereignty: 1,
    leverageOverDhaka: 'Visas for millions of workers, LNG and crude supplies.',
    dhakaLeverage: 'A large, reliable labour supply.',
    benefits: ['The main destination for Bangladeshi migrant workers and the largest source of remittances.', 'Long-term LNG contracts with Qatar and Oman.'],
    risks: ['March 2026: Qatar declared force majeure on LNG after the Iran war hit Gulf energy infrastructure.', 'Gulf remittances equal ~3–5% of GDP, and workers were stranded during the strikes.'],
    debt: 'Small; some Islamic Development Bank trade finance.',
    status2026: 'Supply is recovering after the April ceasefire, but shipping through Hormuz remains below pre-war levels.',
    play: 'Diversify both fuel and labour destinations, and negotiate worker-protection clauses in every labour agreement.',
  },
];

export const AGREEMENTS = [
  { name: 'EU Everything But Arms → GSP+', state: 'active', tag: 'Active', note: 'Duty-free until the transition ends in 2032; GSP+ needs labour and governance compliance.' },
  { name: 'US Agreement on Reciprocal Trade', state: 'signed', tag: 'Signed Feb 2026', note: '19% tariff; zero for apparel made with US cotton or MMF. Contains a non-market-country FTA clause.' },
  { name: 'Japan Economic Partnership Agreement', state: 'signed', tag: 'Signed Feb 2026', note: 'Bangladesh’s first EPA: 7,379 products duty-free into Japan, with phased tariff cuts.' },
  { name: 'RCEP', state: 'aspire', tag: 'Interest declared', note: 'Interest declared in Putrajaya, June 2026. High Bangladeshi tariffs are the main obstacle.' },
  { name: 'ASEAN Sectoral Dialogue Partnership', state: 'aspire', tag: 'Bid lodged', note: 'Formally sought June 2026 with Malaysia’s backing. ASEAN Regional Forum member since 2006.' },
  { name: 'Singapore FTA', state: 'negotiating', tag: 'Negotiating', note: 'A first FTA with an ASEAN hub economy, now under negotiation.' },
  { name: 'BIMSTEC', state: 'active', tag: 'Chair since 2025', note: 'Bangladesh took the chair at the Bangkok summit (April 2025); the FTA framework of 2004 is still unrealised.' },
  { name: 'SAARC / SAFTA', state: 'dormant', tag: 'Dormant', note: 'No summit since 2014; India–Pakistan hostility freezes the bloc.' },
  { name: 'APTA', state: 'active', tag: 'Active', note: 'Asia-Pacific Trade Agreement: modest preferences with China, India and Korea.' },
];

export const AGREEMENT_TONE = {
  active: 'asset', signed: 'asset', negotiating: 'prog', aspire: 'jute', dormant: 'muted',
};
