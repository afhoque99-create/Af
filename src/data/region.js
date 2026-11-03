// Regional integration: schematic connectivity map, Northeast India ledger,
// and three theatres. Node positions are projected from real lon/lat so the
// schematic keeps true relative geography; borders are intentionally omitted.

const LON0 = 85.6;
const LAT0 = 28.0;
const K = 62;
export const project = (lon, lat) => [Math.round((lon - LON0) * K), Math.round((LAT0 - lat) * K)];

export const MAP_W = 600;
export const MAP_H = 540;

export const NODES = {
  dhaka: { label: 'Dhaka', ll: [90.41, 23.81], kind: 'capital', country: 'bd' },
  ctg: { label: 'Chattogram', ll: [91.83, 22.36], kind: 'port', country: 'bd' },
  matarbari: { label: 'Matarbari', ll: [91.88, 21.72], kind: 'port', country: 'bd' },
  coxs: { label: 'Cox’s Bazar camps', ll: [92.15, 21.2], kind: 'camp', country: 'bd' },
  mongla: { label: 'Mongla', ll: [89.6, 22.47], kind: 'port', country: 'bd' },
  sylhet: { label: 'Sylhet', ll: [91.87, 24.9], kind: 'city', country: 'bd' },
  akhaura: { label: 'Akhaura', ll: [91.21, 23.87], kind: 'border', country: 'bd' },
  ramgarh: { label: 'Ramgarh', ll: [91.9, 23.0], kind: 'border', country: 'bd' },
  benapole: { label: 'Benapole', ll: [88.9, 23.05], kind: 'border', country: 'bd' },
  banglabandha: { label: 'Banglabandha', ll: [88.42, 26.6], kind: 'border', country: 'bd' },
  dalia: { label: 'Teesta barrage', ll: [89.1, 26.18], kind: 'water', country: 'bd' },
  bheramara: { label: 'Bheramara', ll: [88.99, 24.03], kind: 'energy', country: 'bd' },
  sirajganj: { label: 'Sirajganj', ll: [89.7, 24.45], kind: 'city', country: 'bd' },
  kolkata: { label: 'Kolkata', ll: [88.36, 22.57], kind: 'city', country: 'in' },
  farakka: { label: 'Farakka', ll: [87.92, 24.81], kind: 'water', country: 'in' },
  siliguri: { label: 'Siliguri Corridor', ll: [88.43, 26.85], kind: 'choke', country: 'in' },
  guwahati: { label: 'Guwahati', ll: [91.74, 26.14], kind: 'city', country: 'in' },
  shillong: { label: 'Shillong', ll: [91.88, 25.58], kind: 'city', country: 'in' },
  agartala: { label: 'Agartala', ll: [91.28, 23.83], kind: 'city', country: 'in' },
  sabroom: { label: 'Sabroom', ll: [91.72, 23.0], kind: 'border', country: 'in' },
  aizawl: { label: 'Aizawl', ll: [92.72, 23.73], kind: 'city', country: 'in' },
  imphal: { label: 'Imphal', ll: [93.94, 24.82], kind: 'city', country: 'in' },
  godda: { label: 'Godda plant', ll: [87.21, 24.83], kind: 'energy', country: 'in' },
  sittwe: { label: 'Sittwe', ll: [92.9, 20.15], kind: 'port', country: 'mm' },
  paletwa: { label: 'Paletwa', ll: [92.86, 21.3], kind: 'city', country: 'mm' },
  maungdaw: { label: 'Maungdaw', ll: [92.36, 20.83], kind: 'border', country: 'mm' },
  nepalbhutan: { label: 'To Nepal & Bhutan', ll: [88.2, 27.6], kind: 'edge', country: 'x' },
  kunming: { label: 'To Kunming', ll: [95.0, 25.2], kind: 'edge', country: 'x' },
  asean: { label: 'To Yangon, Ranong, Singapore', ll: [94.6, 19.2], kind: 'edge', country: 'x' },
};

export const CORRIDOR_STATUS = {
  operational: { label: 'Operational', tone: 'asset', dash: '' },
  partial: { label: 'Partial', tone: 'prog', dash: '' },
  restricted: { label: 'Restricted or at risk', tone: 'crit', dash: '' },
  stalled: { label: 'Stalled or dormant', tone: 'muted', dash: '6 5' },
  proposed: { label: 'Proposed', tone: 'jute', dash: '2 5' },
};

export const MODE_LABEL = {
  rail: 'Rail', road: 'Road', sea: 'Sea and port', river: 'River and water', power: 'Electricity', multi: 'Multimodal',
};

export const CORRIDORS = [
  {
    id: 'akhaura', name: 'Akhaura–Agartala rail link', mode: 'rail', status: 'operational',
    path: ['dhaka', 'akhaura', 'agartala'], since: 'Inaugurated Nov 2023',
    detail: 'A 12 km link that joins Tripura to the Bangladesh rail network. Traffic is thin because the political freeze since 2024 left services and tariffs unsettled.',
    stake: 'Tripura’s fastest route to a seaport and to Kolkata runs through Bangladesh.',
  },
  {
    id: 'ctg-transit', name: 'Chattogram & Mongla port transit for Northeast India', mode: 'multi', status: 'partial',
    path: ['ctg', 'akhaura', 'agartala'], via2: ['ctg', 'sylhet', 'shillong'], since: 'Agreement 2018; regular use permitted 2023',
    detail: 'Indian cargo may land at Chattogram or Mongla and move by road to Tripura, Meghalaya or Assam. Volumes are small, and the fee schedule is a recurring political fight.',
    stake: 'This is Dhaka’s biggest piece of leverage with New Delhi, and a potential fee-earner if priced transparently.',
  },
  {
    id: 'maitri', name: 'Maitri Setu (Ramgarh–Sabroom)', mode: 'road', status: 'partial',
    path: ['ctg', 'ramgarh', 'sabroom'], since: 'Bridge opened 2021',
    detail: 'The bridge over the Feni puts Tripura about 80 km from Chattogram port, but border facilities and road upgrades on the Bangladeshi side are incomplete.',
    stake: 'It could become the shortest port route for the whole southern Northeast.',
  },
  {
    id: 'benapole', name: 'Benapole–Petrapole (Dhaka–Kolkata)', mode: 'road', status: 'restricted',
    path: ['dhaka', 'benapole', 'kolkata'], since: 'Curbs since May 2025',
    detail: 'South Asia’s busiest land port. Since May 2025 India has barred Bangladeshi garments and processed food from most land crossings, pushing them to sea routes via Nhava Sheva. Bangladesh sought a review at trade talks in October 2026.',
    stake: 'Exporters estimate the sea detour adds weeks and significant cost.',
  },
  {
    id: 'transship', name: 'Transshipment via Indian ports and airports', mode: 'multi', status: 'stalled',
    path: ['dhaka', 'benapole', 'kolkata'], offset: 10, since: 'Withdrawn April 2025',
    detail: 'India ended the facility that let Bangladeshi exports transit Indian land customs stations to airports and ports for third countries. Shipments to Nepal and Bhutan were exempted.',
    stake: 'Pushes Dhaka to fix its own air-cargo and port capacity faster.',
  },
  {
    id: 'bbin', name: 'BBIN corridor to Nepal & Bhutan', mode: 'road', status: 'partial',
    path: ['dhaka', 'sirajganj', 'banglabandha', 'siliguri', 'nepalbhutan'], since: 'Motor vehicles agreement 2015',
    detail: 'Bhutan never ratified the 2015 motor vehicles agreement, so the four-country version stalled. Trade moves through the narrow Siliguri Corridor on Indian permits.',
    stake: 'Landlocked Nepal and Bhutan want Bangladeshi ports; India controls the transit.',
  },
  {
    id: 'power', name: 'Cross-border electricity', mode: 'power', status: 'operational',
    path: ['godda', 'bheramara', 'dhaka'], since: 'Bheramara HVDC 2013; Godda 2023; Nepal via India 2024',
    detail: 'About 2.5 GW flows from India, including Adani’s dedicated Godda plant. The first trilateral sale of Nepali power through the Indian grid began in November 2024.',
    stake: 'Regional hydropower is the cleanest fix for Bangladesh’s fuel problem, but every unit crosses Indian wires.',
  },
  {
    id: 'piwtt', name: 'Inland water transit protocol route', mode: 'river', status: 'operational',
    path: ['kolkata', 'mongla', 'sirajganj', 'guwahati'], since: 'Protocol since 1972',
    detail: 'The oldest working link: Indian and Bangladeshi barges carry bulk cargo between Kolkata and Assam through Bangladeshi rivers. Dry-season draft limits it.',
    stake: 'Cheap, low-carbon freight, but it depends on dredging that is chronically underfunded.',
  },
  {
    id: 'ganges', name: 'Ganges at Farakka', mode: 'river', status: 'restricted',
    path: ['farakka', 'bheramara'], offset: -8, since: 'Treaty 1996; expires 12 Dec 2026',
    detail: 'The 30-year treaty shares dry-season flow at the Farakka Barrage, about 20 km upstream of the border. Renewal needs mutual consent, and India had not formally engaged as of late October 2026.',
    stake: 'Southwest agriculture, the Sundarbans and Khulna’s salinity front depend on these flows.',
  },
  {
    id: 'teesta', name: 'Teesta River restoration', mode: 'river', status: 'proposed',
    path: ['siliguri', 'dalia', 'sirajganj'], offset: 8, since: 'Feasibility study agreed June 2026',
    detail: 'A China-backed plan of roughly $1 bn to dredge, embank and build reservoirs on the Bangladeshi Teesta. India offered to do the same in 2024. A water-sharing deal has been stuck since 2011.',
    stake: 'It sits about 100 km from the Siliguri Corridor, which makes it the sharpest India–China test case on Bangladeshi soil.',
  },
  {
    id: 'kaladan', name: 'Kaladan multimodal project (India–Myanmar)', mode: 'multi', status: 'stalled',
    path: ['kolkata', 'sittwe', 'paletwa', 'aizawl'], since: 'Sittwe port opened 2023',
    detail: 'India’s route around Bangladesh to Mizoram via Rakhine. The road section is blocked by the Arakan Army’s control of the area.',
    stake: 'While Kaladan is stalled, Bangladesh remains India’s only practical sea route to the Northeast.',
  },
  {
    id: 'bcim', name: 'BCIM economic corridor', mode: 'road', status: 'stalled',
    path: ['kolkata', 'dhaka', 'sylhet', 'imphal', 'kunming'], offset: -6, since: 'Dormant since about 2019',
    detail: 'The Kolkata–Dhaka–Imphal–Kunming concept faded once India stayed out of the Belt and Road Initiative.',
    stake: 'It could revive only if India–China relations shift.',
  },
  {
    id: 'naf', name: 'Naf border & Rakhine', mode: 'road', status: 'restricted',
    path: ['coxs', 'maungdaw'], since: 'Arakan Army holds the border since Dec 2024',
    detail: 'The 271 km land border now faces a non-state army. Smuggling, arms flows and fighting with ARSA spill over, and a UN “humanitarian corridor” idea stalled in 2025.',
    stake: 'There is no safe Rohingya return without a working arrangement on the Rakhine side.',
  },
  {
    id: 'bay', name: 'Bay of Bengal sea lanes to ASEAN', mode: 'sea', status: 'proposed',
    path: ['matarbari', 'asean'], since: 'Coastal shipping and BIMSTEC talks',
    detail: 'Direct services from Chattogram and Matarbari to Yangon, Ranong, Port Klang and Singapore could replace transshipment, once Matarbari takes deep-draft ships.',
    stake: 'This turns geography into a hub role and backs the ASEAN dialogue-partner bid.',
  },
];

// India–Bangladesh border lengths: Indian Ministry of Home Affairs.
export const SISTER_STATES = [
  { state: 'Tripura', border: 856, link: 'Akhaura–Agartala rail; Maitri Setu', offer: 'Chattogram is about 200 km away, versus roughly 1,600 km to Kolkata via the Siliguri Corridor.', friction: 'Land-port curbs, thin rail traffic, unpriced transit.' },
  { state: 'Meghalaya', border: 443, link: 'Tamabil–Dawki crossing to Shillong', offer: 'Stone, limestone and coal into Bangladesh; tourism and food into Meghalaya.', friction: 'Border incidents; informal trade dominates.' },
  { state: 'Mizoram', border: 318, link: 'Thegamukh–Kawrpuichhuah; border haats', offer: 'Hill-tract road links could give Mizoram an outlet without Kaladan.', friction: 'Poor roads on both sides; refugee flows from Chin State.' },
  { state: 'Assam', border: 263, link: 'Sutarkandi–Karimganj; Brahmaputra waterway', offer: 'River barges to the Bay; power and gas trade.', friction: 'Migration politics in Assam; dredging gaps.' },
  { state: 'Manipur · Nagaland · Arunachal', border: 0, link: 'No shared border; reached via Assam', offer: 'Benefit indirectly from Bangladeshi ports and power trade.', friction: 'Conflict in Manipur; long road distances.' },
];
export const WEST_BENGAL_BORDER = 2217;

export const THEATRES = [
  {
    id: 'ne', title: 'Northeast India: the “Seven Sisters”', bn: 'উত্তর-পূর্ব ভারত', readiness: 4,
    thesis: 'Eight Indian states are joined to the rest of India by a corridor about 20–22 km wide. Bangladesh is their shortest route to the sea.',
    opportunity: [
      'Transit fees and port volumes for Chattogram, Mongla and later Matarbari.',
      'Electricity trade: Arunachal and Bhutan hydropower to Bangladeshi demand.',
      'Food, cement, steel and plastics exports to a fast-growing market of about 50 million people.',
    ],
    friction: [
      'Since May 2025 India has barred Bangladeshi garments and processed foods at land ports in Assam, Meghalaya, Tripura and Mizoram.',
      'Delhi reads Bangladeshi talk of being the region’s “guardian of the ocean” (Dhaka, March 2025) as a threat to the Northeast.',
      'Old security fears: insurgent sanctuaries before 2009, and Chinese proximity to the Siliguri Corridor today.',
    ],
    move: 'Offer a published, equal-terms transit regime in return for lifting the land-port curbs. Keep it commercial and keep China’s Teesta work transparent.',
  },
  {
    id: 'mm', title: 'Myanmar & Rakhine', bn: 'মিয়ানমার ও রাখাইন', readiness: 2,
    thesis: 'The border is now held by the Arakan Army, a non-state force. The Rohingya question, smuggling and great-power ports (Sittwe for India, Kyaukphyu for China) all meet here.',
    opportunity: [
      'A pragmatic working channel with Rakhine’s de facto authorities on trade, rice and the border.',
      'Teknaf border trade and coastal shipping, if the conflict stabilises.',
      'Leverage over Kaladan, India’s bypass route, which needs a stable Rakhine.',
    ],
    friction: [
      'About 1.1 million+ Rohingya are in Cox’s Bazar and Bhasan Char. The 2026 aid plan seeks $710.5 m for 1.6 m people, down from $934 m the year before.',
      'Fighting between the Arakan Army and ARSA spills across the border; methamphetamine trafficking runs at industrial scale.',
      'Repatriation is stalled: the junta no longer controls the townships people would return to.',
    ],
    move: 'Engage the Arakan Army through quiet channels, back the ICJ case and international protection for returnees, and keep camp funding from collapsing.',
  },
  {
    id: 'asean', title: 'ASEAN gateway', bn: 'আসিয়ান প্রবেশদ্বার', readiness: 3,
    thesis: 'Dhaka is pivoting east: in June 2026 PM Rahman sought ASEAN Sectoral Dialogue Partner status and declared interest in RCEP, with Malaysia’s backing.',
    opportunity: [
      'Join supply chains that run from Thailand and Malaysia to Vietnam.',
      'An FTA with Singapore (under negotiation) for finance and logistics.',
      'Labour mobility to Malaysia and investment from Thai and Singaporean firms.',
    ],
    friction: [
      'Tariffs and para-tariffs well above ASEAN norms; RCEP would require deep cuts.',
      'Myanmar, the land bridge to ASEAN, is a war zone.',
      'Dialogue-partner decisions need consensus among all ten members.',
    ],
    move: 'Use the 2029 LDC deadline to schedule tariff cuts that double as an RCEP down payment, starting with Singapore and Thailand.',
  },
];
