// The combined 20-point Framework of Prerequisite Indicators.
// H = hardware (physical systems and natural endowment), S = software
// (institutions, finance and human capital). Status and readiness scores are
// analyst judgements as of 3 November 2026; facts cite the latest public data.

export const STATUS = {
  critical: { label: 'Critical Deficit', short: 'Critical', glyph: '▲', tone: 'crit' },
  progress: { label: 'In Progress', short: 'In progress', glyph: '◆', tone: 'prog' },
  asset: { label: 'Strategic Asset', short: 'Asset', glyph: '●', tone: 'asset' },
};

export const INDICATORS = [
  {
    code: 'H1', layer: 'hardware', name: 'Power generation & grid', status: 'progress', score: 5, target: 8,
    facts: [
      'Around 28 GW of grid capacity against roughly 16–17 GW of peak demand served. The shortfall is fuel and money, not megawatts.',
      'The 12,472 MW gas-fired fleet was producing only 3,000–4,000 MW in August 2026, and peak load-shedding topped 3,000 MW for nearly a week.',
      'Rooppur Unit 1 (1.2 GW) reached first criticality on 11 October 2026 and began power start-up for internal use; grid connection is still pending.',
      'Capacity payments to idle private plants and recurring arrears to suppliers, including Adani’s Godda plant, drain the budget.',
    ],
    deficit: 'An overbuilt, fuel-insecure, loss-making fleet procured through no-tender deals with heavy capacity charges, while transmission and distribution lag behind.',
    fixes: [
      ['0–2 yrs', 'Finish the power-contract review begun in 2024, end no-tender procurement and retire the costliest oil-fired peakers.'],
      ['2–5 yrs', 'Move to cost-reflective tariffs with a lifeline subsidy for poor households; build the transmission to evacuate Rooppur and Matarbari power.'],
      ['5–10 yrs', 'Grid-scale solar with storage, plus hydropower imports from Nepal and Bhutan, to cut exposure to imported fuel.'],
    ],
    watch: 'Peak-season load-shedding under 500 MW; the power board’s per-unit loss narrowing year on year.',
    links: ['H2', 'S4', 'S5'],
  },
  {
    code: 'H2', layer: 'hardware', name: 'Primary energy & fuel security', status: 'critical', score: 2, target: 7,
    facts: [
      'Domestic gas output has declined for most of the decade to under ~2,000 mmcfd; imported LNG through two floating terminals fills the gap.',
      'March 2026: QatarEnergy, then the other two long-term suppliers, declared force majeure after the Iran war hit Gulf energy infrastructure. Spot cargoes cost $23–28 per MMBtu.',
      '22 July 2026: an accident at an Excelerate-operated floating terminal cut pipeline gas supply by more than 17%.',
      'Offshore blocks in the Bay of Bengal remain under-explored, even though the maritime boundaries were settled in 2012 and 2014.',
    ],
    deficit: 'Two decades of under-investment in exploration, then a bet on imported LNG concentrated in two floating terminals and Gulf suppliers.',
    fixes: [
      ['0–2 yrs', 'Diversify LNG contracts across the US, Oman and portfolio traders; decide on a land-based import terminal; ration gas to export industry first in emergencies.'],
      ['2–5 yrs', 'Run an offshore bidding round with bankable production-sharing terms; accelerate onshore drilling in proven basins.'],
      ['5–10 yrs', 'Shift the power mix to solar, nuclear and imported hydro so gas is kept for industry and fertiliser.'],
    ],
    watch: 'Share of gas demand actually met (target above 90%); days of LNG supply cover.',
    links: ['H1', 'H10', 'S9'],
  },
  {
    code: 'H3', layer: 'hardware', name: 'Seaports & deep-sea access', status: 'progress', score: 4, target: 8,
    facts: [
      'Chattogram carries over 90% of seaborne trade, about 3.2 million TEU a year, but its ~9.5 m draft admits only feeder ships. Cargo transships via Colombo, Singapore or Port Klang.',
      'Matarbari Deep Sea Port (financed by Japan) has its 14.3 km approach channel dug, but main construction is only now starting and the first-phase date has slipped past 2026.',
      'Concessions to foreign terminal operators at Laldia and the New Mooring terminal are politically contested.',
    ],
    deficit: 'A single river port carries the nation’s trade. Dwell times and feeder dependence add cost to every export carton.',
    fixes: [
      ['0–2 yrs', 'Digitise customs and the port community system; run off-dock depots around the clock.'],
      ['2–5 yrs', 'Complete Matarbari phase 1 and the Bay Terminal, with rail and road links to Chattogram and Dhaka.'],
      ['5–10 yrs', 'Make Matarbari the mother-vessel hub for Northeast India, Nepal and Bhutan cargo.'],
    ],
    watch: 'Average container dwell time under 5 days; the first mother vessel calling at Matarbari.',
    links: ['H4', 'H10', 'S9'],
  },
  {
    code: 'H4', layer: 'hardware', name: 'Multimodal transport corridors', status: 'progress', score: 5, target: 8,
    facts: [
      'The Padma Bridge (2022) and its rail link joined the southwest to Dhaka; the Jamuna Railway Bridge opened in 2025.',
      'The Karnaphuli Tunnel (2023) carries far less traffic than forecast: built ahead of the economic zone it was meant to serve.',
      'Rail carries a sliver of freight, so the Dhaka–Chattogram highway remains the economy’s choke point.',
      'Inland waterways, the cheapest mode, shrink each dry season as rivers silt up.',
    ],
    deficit: 'Mega-projects sequenced by politics and supplier credit rather than network economics, with maintenance chronically underfunded.',
    fixes: [
      ['0–2 yrs', 'Re-point the development budget to finishing half-built links; freeze new prestige projects.'],
      ['2–5 yrs', 'A dedicated Dhaka–Chattogram freight rail line; dredging and terminals for inland water transport.'],
      ['5–10 yrs', 'Integrate with BBIN and Northeast India transit to earn fees on through-traffic.'],
    ],
    watch: 'Door-to-port container time from Gazipur to Chattogram.',
    links: ['H3', 'H5', 'H10'],
  },
  {
    code: 'H5', layer: 'hardware', name: 'Dhaka urban systems & decentralisation', status: 'critical', score: 3, target: 7,
    facts: [
      'Under the UN’s 2025 urban methodology, Dhaka is the world’s second-largest urban agglomeration (~37 million) and among the densest.',
      'One metro line (MRT-6, ~21 km) runs; Japan-funded MRT-1 and MRT-5 North are under construction.',
      'Government, finance and most formal jobs sit in Dhaka, which absorbs migrants faster than it can house or move them.',
      'Bangladesh regularly ranks among the most PM2.5-polluted countries, with brick kilns and diesel traffic as major sources.',
    ],
    deficit: 'Extreme centralisation. City and district governments have little revenue or authority, and land markets and planning are weak.',
    fixes: [
      ['0–2 yrs', 'Rationalise bus routes and franchises; enforce brick-kiln and vehicle-emission rules.'],
      ['2–5 yrs', 'Give city corporations property-tax powers; move agencies and universities to Chattogram, Khulna, Rajshahi and Sylhet.'],
      ['5–10 yrs', 'Complete the MRT network, funded partly by capturing land-value gains around stations.'],
    ],
    watch: 'Share of urban population growth happening outside greater Dhaka.',
    links: ['H4', 'S2', 'S4'],
  },
  {
    code: 'H6', layer: 'hardware', name: 'Climate adaptation & disaster preparedness', status: 'asset', score: 8, target: 9,
    facts: [
      'Cyclone deaths fell from roughly 300,000–500,000 in 1970 and about 138,000 in 1991 to a few thousand in Sidr (2007) and far fewer in later storms.',
      'The Cyclone Preparedness Programme trains tens of thousands of village volunteers who run warnings and evacuations.',
      'The Bangladesh Delta Plan 2100 gives a century-scale framework for water, land and settlement.',
      'Locally led adaptation such as floating gardens, raised plinths and saline-tolerant rice is studied and copied worldwide.',
    ],
    deficit: 'Preparedness saves lives but not livelihoods. Losses from salinity, river erosion and floods keep rising.',
    fixes: [
      ['0–2 yrs', 'Ring-fence a climate budget line for Delta Plan projects; prepare bankable bids for the Loss and Damage Fund.'],
      ['2–5 yrs', 'Rehabilitate coastal polders and expand tidal river management in the southwest.'],
      ['5–10 yrs', 'Planned relocation to climate-resilient secondary towns for households losing land.'],
    ],
    watch: 'Disaster-related economic losses as a share of GDP.',
    links: ['H7', 'H5'],
  },
  {
    code: 'H7', layer: 'hardware', name: 'Transboundary water & river health', status: 'critical', score: 2, target: 6,
    facts: [
      'Bangladesh shares 54 rivers with India but has a sharing treaty only for the Ganges. That treaty expires on 12 December 2026 and has no automatic renewal.',
      'As of late October 2026, India had not formally answered Dhaka’s request to negotiate a renewal.',
      'A Teesta sharing deal has been stuck since 2011. China pledged support for the Teesta restoration project in June 2026, and a feasibility study was agreed.',
      'China began building the Medog mega-dam on the Yarlung Tsangpo, the upper Brahmaputra, in 2025.',
    ],
    deficit: 'A lower-riparian country with no basin-wide framework, plus domestic river grabbing, pollution and silting.',
    fixes: [
      ['0–2 yrs', 'Secure a Ganges successor treaty with a minimum-flow guarantee, or at least an interim extension while talks run.'],
      ['2–5 yrs', 'Push for basin-level data sharing on the Ganges–Brahmaputra–Meghna system with Nepal, Bhutan and China.'],
      ['5–10 yrs', 'Dry-season water retention in the southwest and a transparently financed Teesta restoration.'],
    ],
    watch: 'Dry-season flow measured at Hardinge Bridge against treaty schedules.',
    links: ['H6', 'H10'],
  },
  {
    code: 'H8', layer: 'hardware', name: 'Digital backbone & fintech rails', status: 'progress', score: 6, target: 8,
    facts: [
      'Mobile financial services (bKash, Nagad, Rocket) are the default rail for wages, remittances and social transfers.',
      'Internet use is still roughly half the population on ITU measures, and fixed broadband is thin outside cities.',
      'The July 2024 nationwide shutdown showed how easily the state can switch the network off. Starlink was licensed in 2025.',
    ],
    deficit: 'Patchy rural quality, high device costs, and a legal regime that permits shutdowns.',
    fixes: [
      ['0–2 yrs', 'Legal limits on shutdowns; a data-protection law that meets partner standards, as the US trade deal requires.'],
      ['2–5 yrs', 'Open-access fibre in every district; full interoperability between mobile money and banks.'],
      ['5–10 yrs', 'Digital public infrastructure for land records, tax and health; data-centre investment.'],
    ],
    watch: 'Median mobile-broadband speed; digital share of retail payments.',
    links: ['S4', 'S9'],
  },
  {
    code: 'H9', layer: 'hardware', name: 'Export manufacturing base (RMG)', status: 'asset', score: 7, target: 8,
    facts: [
      'Ready-made garments earned $38.7 bn in FY26, about 81% of $48.0 bn in total exports.',
      'The world’s second-largest apparel exporter, with more LEED-certified green factories than any other country.',
      'FY26 exports were flat and missed the $55 bn target, as gas shortages idled production lines.',
      'Roughly 4 million workers, many of them women from rural districts.',
    ],
    deficit: 'Concentration: one product family, two main markets (EU and US), cotton-heavy and dominated by basics.',
    fixes: [
      ['0–2 yrs', 'Use the US zero-tariff route for apparel made with US cotton; guarantee gas to export zones.'],
      ['2–5 yrs', 'Move into man-made fibre, technical textiles and design; build woven-fabric capacity to meet EU origin rules.'],
      ['5–10 yrs', 'Diversify into electronics assembly, light engineering, pharmaceuticals and footwear.'],
    ],
    watch: 'Non-garment share of exports (target above 30% by 2035).',
    links: ['S9', 'H2', 'S8'],
  },
  {
    code: 'H10', layer: 'hardware', name: 'Geostrategic location & maritime domain', status: 'asset', score: 7, target: 9,
    facts: [
      'Bangladesh sits between South Asia and ASEAN and is the natural sea outlet for Northeast India, Nepal and Bhutan.',
      'International rulings in 2012 (vs Myanmar, ITLOS) and 2014 (vs India, arbitral tribunal) settled about 118,000 km² of sea.',
      'India, China, the US and Japan each need Dhaka for their Bay of Bengal strategies.',
      'Bangladesh has chaired BIMSTEC since April 2025.',
    ],
    deficit: 'Location only pays if it is converted. Transit, ports and the blue economy remain largely unmonetised.',
    fixes: [
      ['0–2 yrs', 'Publish a transit-fee and port-access policy that applies to every neighbour on equal terms.'],
      ['2–5 yrs', 'Blue economy: fisheries management, offshore gas and marine spatial planning.'],
      ['5–10 yrs', 'Become the Bay’s logistics and energy hub, built on Matarbari and a regional power grid.'],
    ],
    watch: 'Transit revenue collected; offshore blocks under contract.',
    links: ['H3', 'H7'],
  },
  {
    code: 'S1', layer: 'software', name: 'Political legitimacy & transition', status: 'progress', score: 5, target: 8,
    facts: [
      'The 12 February 2026 election, the first since the 2024 uprising, gave the BNP a two-thirds majority. Tarique Rahman became prime minister, with Jamaat-e-Islami as the main opposition.',
      'A same-day referendum endorsed the July Charter (roughly 60–68% yes, depending on the count), but how to implement it, including a proportional upper house, is disputed.',
      'Awami League activities were banned in 2025 and the party could not contest. Sheikh Hasina, in exile in India, was sentenced to death in absentia in November 2025.',
    ],
    deficit: 'A history of alternating one-party dominance, weak opposition rights and politicised state institutions. A two-thirds majority invites the same winner-take-all habits.',
    fixes: [
      ['0–2 yrs', 'Implement July Charter items by cross-party agreement: an independent Election Commission, term limits and neutral election-time oversight.'],
      ['2–5 yrs', 'Opposition chairs for key parliamentary committees; party-finance disclosure.'],
      ['5–10 yrs', 'A path back into politics based on individual accountability rather than permanent party bans.'],
    ],
    watch: 'Credible local elections; the opposition participating in parliament rather than walking out.',
    links: ['S2', 'S5'],
  },
  {
    code: 'S2', layer: 'software', name: 'Rule of law, judiciary & anti-corruption', status: 'critical', score: 2, target: 6,
    facts: [
      'Transparency International has scored Bangladesh in the low 20s out of 100 for a decade.',
      'A commission documented enforced disappearances under the previous government; tribunal trials over the July 2024 killings continue.',
      'Courts carry a backlog of millions of cases. Bangladesh ranked 189 of 190 on enforcing contracts in the World Bank’s last Doing Business report (2020).',
    ],
    deficit: 'The executive controls police, prosecutors and lower courts, and politically connected business enjoys impunity.',
    fixes: [
      ['0–2 yrs', 'A separate judicial secretariat, an independent police commission, and asset recovery from bank-looting cases.'],
      ['2–5 yrs', 'Commercial courts and credible arbitration for investors; digital case management.'],
      ['5–10 yrs', 'An anti-corruption commission with prosecutorial autonomy and convictions of powerful people on its record.'],
    ],
    watch: 'Case backlog trend; value of assets recovered; CPI score.',
    links: ['S1', 'S3', 'S9'],
  },
  {
    code: 'S3', layer: 'software', name: 'Banking sector health', status: 'critical', score: 2, target: 7,
    facts: [
      'Non-performing loans were 32.8% of outstanding loans in June 2026, down from 35.7% in September 2025 as hidden bad loans were recognised.',
      'Fully-fledged Islamic banks reported NPLs of 58.4% in March 2026 after years of insider looting.',
      'Five failing Islamic banks were merged under the 2025 Bank Resolution Ordinance, and private-credit growth sank to multi-decade lows.',
    ],
    deficit: 'Politically connected ownership, regulatory forbearance and repeated loan rescheduling that hid losses for 15 years.',
    fixes: [
      ['0–2 yrs', 'An asset-quality review of every bank; recapitalise or resolve the worst; enforce single-borrower limits.'],
      ['2–5 yrs', 'An asset-management company for bad loans; a central bank governor and board with protected tenure.'],
      ['5–10 yrs', 'A deep bond market, so infrastructure stops depending on bank loans.'],
    ],
    watch: 'NPL ratio below 15%; private-credit growth back above 12%.',
    links: ['S4', 'S5', 'S9'],
  },
  {
    code: 'S4', layer: 'software', name: 'Revenue mobilisation', status: 'critical', score: 2, target: 7,
    facts: [
      'Tax revenue is around 6.8–7% of GDP, among the lowest ratios in the world.',
      'Tax exemptions cost roughly 6.9% of GDP (FY22 estimate), about as much as is collected.',
      'The FY27 budget targets revenue of 10.2% of GDP, which Fitch calls challenging. The revenue board was split into policy and administration divisions in 2025.',
    ],
    deficit: 'A narrow base, reliance on trade taxes and VAT at source, exemptions handed out as political favours, and a mostly informal economy.',
    fixes: [
      ['0–2 yrs', 'Sunset clauses on every exemption; universal e-filing and electronic VAT devices.'],
      ['2–5 yrs', 'Property and capital-gains taxation; a single VAT rate; automated customs valuation.'],
      ['5–10 yrs', 'Reach the government’s 15%-of-GDP target by 2035 to pay for health, schools and climate defences.'],
    ],
    watch: 'Tax-to-GDP crossing 10%.',
    links: ['S3', 'S5', 'S6', 'S7'],
  },
  {
    code: 'S5', layer: 'software', name: 'Macroeconomic & FX stability', status: 'progress', score: 4, target: 7,
    facts: [
      'Inflation was 8.34% in September 2026 (BBS), but the IMF expects it to average 10.9% in FY27 as energy costs pass through.',
      'Growth is weak: the IMF forecasts 3.2% for FY27 and the World Bank 3.4%.',
      'Gross reserves were rebuilt to roughly $31–32 bn after the move to a market-based exchange rate in 2025.',
      'The government left the old IMF programme in May 2026 and is negotiating a new three-year deal of up to ~$5 bn. External debt service hit a record $4.49 bn in FY26.',
    ],
    deficit: 'Repeated energy and import shocks, a legacy dollar shortage, and a central bank with limited independence.',
    fixes: [
      ['0–2 yrs', 'Conclude the new IMF programme; keep the exchange rate flexible; hold policy tight until inflation is below 6%.'],
      ['2–5 yrs', 'Build reserves to more than four months of imports; adopt a formal inflation target.'],
      ['5–10 yrs', 'Work toward an investment-grade credit rating as the medium-term anchor.'],
    ],
    watch: 'Inflation under 6%; reserves above four months of imports.',
    links: ['S3', 'S4', 'H2'],
  },
  {
    code: 'S6', layer: 'software', name: 'Education quality & skills', status: 'critical', score: 3, target: 7,
    facts: [
      'Bangladesh reached gender parity in school enrolment, but more than half of 10-year-olds cannot read a simple text (World Bank learning-poverty estimate).',
      'About 2 million young people enter the labour market every year.',
      'University graduates face higher unemployment than people with less schooling, and public education spending is under 2% of GDP.',
    ],
    deficit: 'Low spending, weak teacher training and a curriculum disconnected from industry; vocational training is underfunded and low-status.',
    fixes: [
      ['0–2 yrs', 'A foundational literacy and numeracy drive in primary schools; stop rewriting the curriculum every few years.'],
      ['2–5 yrs', 'Vocational programmes co-designed with industry; apprenticeships tied to garment upgrading, electronics and overseas care work.'],
      ['5–10 yrs', 'Raise education spending toward 4% of GDP; link research universities to industry.'],
    ],
    watch: 'Learning poverty rate; share of young women not in education, employment or training.',
    links: ['S4', 'S7', 'S8'],
  },
  {
    code: 'S7', layer: 'software', name: 'Health system & demographic window', status: 'progress', score: 4, target: 7,
    facts: [
      'Life expectancy is about 72 years and fertility is near replacement (~2.0 births per woman).',
      'Out-of-pocket payments make up around 70% of health spending, among the highest shares in the world, and public health spending is under 1% of GDP.',
      'The working-age share of the population peaks in the 2030s, and the demographic window begins to close around 2040.',
    ],
    deficit: 'An underfunded public system, an unregulated private sector and pharmacies, and fast-rising non-communicable disease.',
    fixes: [
      ['0–2 yrs', 'Staff and stock primary care and essential drugs at upazila health complexes.'],
      ['2–5 yrs', 'Social health insurance for formal workers; regulate private clinic and diagnostic pricing.'],
      ['5–10 yrs', 'A universal health coverage package funded by the tax reforms in S4.'],
    ],
    watch: 'Out-of-pocket share below 50% of health spending.',
    links: ['S4', 'S6'],
  },
  {
    code: 'S8', layer: 'software', name: 'Social development & women’s economic agency', status: 'asset', score: 7, target: 8,
    facts: [
      'For decades Bangladesh beat richer peers on child mortality, fertility decline and girls’ schooling.',
      'Its NGO and microfinance ecosystem (BRAC, Grameen, ASA) operates at world scale and exports its models.',
      'Women’s labour-force participation is around 40%, and it rose fastest in rural areas.',
    ],
    deficit: 'The gains are fragile. Child-marriage rates remain among the world’s highest, and a conservative political turn could narrow women’s public space.',
    fixes: [
      ['0–2 yrs', 'Childcare and safe transport around industrial zones; enforce the child-marriage law.'],
      ['2–5 yrs', 'Women’s access to formal credit and land titles; reskilling for women displaced by garment automation.'],
      ['5–10 yrs', 'Female labour-force participation above 50%.'],
    ],
    watch: 'Child-marriage rate; female labour-force participation.',
    links: ['S6', 'H9'],
  },
  {
    code: 'S9', layer: 'software', name: 'Investment climate, trade policy & LDC readiness', status: 'critical', score: 3, target: 7,
    facts: [
      'Net FDI inflows are about 0.3–0.5% of GDP, among the lowest in Asia.',
      'The UN General Assembly deferred LDC graduation to 24 November 2029 (resolution adopted late October 2026). Economists say a second extension is very unlikely.',
      'Tariffs plus para-tariffs are among the highest in Asia, which stands in the way of RCEP membership.',
      'New deals: the Japan EPA and the US Agreement on Reciprocal Trade (both February 2026). RCEP membership and ASEAN dialogue-partner status were sought in June 2026.',
    ],
    deficit: 'Protection for incumbents, slow approvals, uncertain energy supply and weak contract enforcement.',
    fixes: [
      ['0–2 yrs', 'Treat 2029 as a hard deadline: publish a tariff-rationalisation schedule and a one-stop investment window with legal time limits.'],
      ['2–5 yrs', 'Qualify for EU GSP+; negotiate RCEP accession; run economic zones with guaranteed gas and power.'],
      ['5–10 yrs', 'FDI above 2% of GDP, led by firms relocating out of China.'],
    ],
    watch: 'FDI inflows as a share of GDP; average applied tariff.',
    links: ['S2', 'S3', 'H9'],
  },
  {
    code: 'S10', layer: 'software', name: 'Diaspora & remittance engine', status: 'asset', score: 7, target: 8,
    facts: [
      'Remittances hit a record of about $30 bn in FY25 and kept rising in FY26 (April 2026: $3.13 bn, up 13.6% year on year).',
      'More than ten million Bangladeshis live and work abroad, most of them in the Gulf and Malaysia.',
      'The 2026 Iran war exposed the concentration risk: Gulf remittances equal roughly 3–5% of GDP, and workers were stranded during the strikes.',
    ],
    deficit: 'Low-skill, high-cost migration (recruitment fees are among the world’s highest) and heavy dependence on Gulf labour markets.',
    fixes: [
      ['0–2 yrs', 'Cap recruitment costs; reward formal-channel transfers; create a crisis evacuation fund.'],
      ['2–5 yrs', 'Skills certification for care, construction and manufacturing jobs in Japan, Korea and Europe.'],
      ['5–10 yrs', 'Diaspora bonds and investment funds for infrastructure and start-ups.'],
    ],
    watch: 'Share of remittances through formal channels; share of skilled migrants.',
    links: ['S5', 'S6'],
  },
];

export const CRITICAL_PATH = [
  { step: 'Clean the banks, widen the tax net', codes: ['S3', 'S4'], why: 'Without credit and fiscal space, every other fix is unfunded.' },
  { step: 'Secure fuel and fix power pricing', codes: ['H2', 'H1'], why: 'Factories idle when gas runs short; nothing else matters on those days.' },
  { step: 'Unblock ports and corridors', codes: ['H3', 'H4'], why: 'Logistics cost decides whether post-LDC exports stay competitive.' },
  { step: 'Skills and diversification by 2029', codes: ['S6', 'S9', 'H9'], why: 'The LDC deferral buys three years; tariff preferences end after that.' },
  { step: 'Water diplomacy and decentralisation', codes: ['H7', 'H5'], why: 'Long-cycle problems: they must start now to pay off by 2040.' },
];
