import type { ComponentType } from 'react'
import {
  IconScale, IconLeaf, IconShield, IconLink, IconFlask, IconGlobe, IconSparkle,
  IconCheckCircle, IconTarget, IconClock, IconNetwork, IconChart, IconForecast,
  IconLoop, IconRecycle, IconLock, IconBolt, IconClipboard, IconEuro,
  IconTrendingUp, IconCalculator, IconCoins,
} from '../components/icons'
import type { IconProps } from '../components/icons'
import type { EstimatorField, EstimatorResult } from '../components/MetricEstimator'
import type { Scenario } from '../components/ScenarioSimulator'

export interface Capability {
  icon: ComponentType<IconProps>
  title: string
  desc: string
}

export type CalculatorConfig =
  | { kind: 'cbam' }
  | { kind: 'esg' }
  | { kind: 'supplychain' }
  | { kind: 'lca-scan' }
  | {
      kind: 'metric'
      fields: EstimatorField[]
      compute: (values: Record<string, number>, lang: 'en' | 'fr' | 'ar') => EstimatorResult
      resultLabel: string
      resultPrefix?: string
      resultSuffix?: string
      assumption: string
    }
  | { kind: 'checklist'; prompt: string; items: string[]; unit: string; withPhotocarbNote: string }
  | { kind: 'scenario'; scenarios: Scenario[] }

export interface ClientProfile {
  type: string
  desc: string
}

export interface WhyReason {
  icon: ComponentType<IconProps>
  title: string
  desc: string
}

export interface HeroHighlight {
  value: string
  label: string
}

export interface ServiceDef {
  id: string
  num: string
  title: string
  subtitle: string
  description: string
  stat: string
  statLabel: string
  color: string
  icon: ComponentType<IconProps>
  industries: string[]
  valueProp: string
  heroHighlights: HeroHighlight[]
  capabilities: Capability[]
  whyItMatters: WhyReason[]
  calculator: CalculatorConfig
  methodologyStandard: string
  methodologySteps: string[]
  gains: string[]
  timeToReady: string
  clients: ClientProfile[]
}

export const SERVICES: ServiceDef[] = [
  {
    id: 'bilan-carbone',
    num: '01',
    title: 'Bilan Carbone',
    subtitle: 'Scope 1 · Scope 2 · Scope 3 · GHG Protocol',
    description:
      "A bilan carbone is your company's complete carbon balance sheet — a certified inventory of every tonne of CO₂e your operations are responsible for, broken into three internationally recognized scopes: Scope 1 (direct emissions from fuel and processes you control), Scope 2 (emissions from the electricity and energy you purchase), and Scope 3 (everything upstream and downstream in your supply chain). It is the single foundational document every other compliance requirement builds on — your CBAM declarations, your IFRS S2 disclosures, your ANME energy-audit baseline, and any financing or tender that asks for verified emissions data all start from the same bilan carbone. Photocarb calculates yours from real operational data — ERP records, utility bills, production logs — built on GHG Protocol methodology and aligned with ISO 14064, delivered as a certified inventory in 48 hours. No hardware to install, no sensors to calibrate — just the data you already have, structured into a number your auditor will accept.",
    stat: '94%',
    statLabel: 'Data accuracy vs manual audit baseline',
    color: 'var(--color-info)',
    icon: IconScale,
    industries: ['Any Tunisian Industry', 'Manufacturing', 'Energy-Intensive Facilities', 'Exporters', 'Textiles & Leather', 'Food & Agri-Processing', 'Chemicals', 'Construction Materials'],
    valueProp: 'Your complete bilan carbone in 48 hours',
    heroHighlights: [
      { value: '94%', label: 'Accuracy vs manual audit' },
      { value: 'Scope 1·2·3', label: 'Full GHG Protocol coverage' },
      { value: '48 hrs', label: 'First certified inventory' },
    ],
    capabilities: [
      { icon: IconScale, title: 'Scope 1-2-3 Ledger', desc: 'Full GHG Protocol accounting from real operational data' },
      { icon: IconCheckCircle, title: 'ISO 14064 Aligned', desc: 'Certified methodology accepted by auditors and regulators' },
      { icon: IconLink, title: 'CBAM / IFRS Ready', desc: 'One inventory feeds every regulatory submission you need' },
    ],
    whyItMatters: [
      { icon: IconLink, title: 'The foundation every other filing needs', desc: 'Your CBAM declarations, IFRS S2 disclosures and ANME audit baseline all draw on the same bilan carbone — get this right once instead of rebuilding it per requirement.' },
      { icon: IconEuro, title: 'Buyers and lenders now ask for it upfront', desc: 'EU customers, banks and export credit agencies increasingly require a verified Scope 1-2-3 inventory before signing a contract or releasing financing.' },
      { icon: IconTarget, title: 'Find your biggest levers before you spend', desc: 'See exactly which sites, machines or fuels drive your footprint before committing capex to an efficiency upgrade.' },
      { icon: IconShield, title: 'Legal exposure is growing, not shrinking', desc: 'Tunisian energy-audit law and EU carbon rules both hinge on a documented baseline — an audit-ready trail protects you if either is challenged.' },
    ],
    calculator: {
      kind: 'metric',
      fields: [
        {
          id: 'sector', label: 'Sector', type: 'select',
          options: [
            { label: 'Cement', value: 18 },
            { label: 'Phosphates & Fertilizers', value: 15 },
            { label: 'Steel', value: 22 },
            { label: 'Textiles & Leather', value: 3 },
            { label: 'Food & Agri-processing', value: 4 },
            { label: 'Chemicals', value: 12 },
            { label: 'Construction', value: 4 },
          ],
        },
        { id: 'employees', label: 'Number of employees', type: 'number', placeholder: 'e.g. 350', min: 1 },
      ],
      compute: (v) => {
        const tonnes = Math.round(v.employees * v.sector)
        return { value: tonnes, note: 'Rough Scope 1+2 estimate based on sector-average intensity. Photocarb replaces this with measured data, accurate to 94%.' }
      },
      resultLabel: 'Estimated annual tCO₂e (Scope 1+2)',
      resultSuffix: ' t',
      assumption: 'Sector-average intensity factors. Actual bilan carbone calculated from your real operational data.',
    },
    methodologyStandard: 'GHG Protocol Corporate Standard · ISO 14064-1',
    methodologySteps: [
      'Boundary and scope definition workshop with your operations team',
      'Activity data collection across Scope 1, Scope 2 and Scope 3 — from ERP, utility bills, and production records',
      'Emission factor mapping and calculation against GHG Protocol methodology',
      'Certified inventory delivered with a full audit trail, ready for third-party review',
    ],
    gains: [
      'A single certified number your auditors, regulators and buyers all accept',
      'Clear visibility into which sites or activities drive your footprint',
      'One inventory pre-formatted for CBAM and IFRS S2 submissions',
      '94% data accuracy versus manual spreadsheet audits',
    ],
    timeToReady: 'First certified inventory delivered in 48 hours once operational data is connected; full multi-site rollout typically 2–3 weeks.',
    clients: [
      { type: 'Cement & Phosphates', desc: 'Building their first regulatory-grade carbon inventory ahead of CBAM enforcement' },
      { type: 'Steel & Textiles', desc: 'Reporting Scope 1+2 data to EU buyers or lenders on a fixed timeline' },
      { type: 'Manufacturers', desc: 'Consolidating multi-site emissions data into one auditable source' },
      { type: 'Food & Agri-Processors', desc: 'Establishing a baseline before retail buyers start asking for carbon data' },
      { type: 'Construction Materials Producers', desc: 'Documenting emissions intensity for green building and export tenders' },
    ],
  },
  {
    id: 'esg-reports',
    num: '02',
    title: 'ESG & Sustainability',
    subtitle: 'IFRS S1/S2 · GRI · CDP · Arabic + French + English',
    description:
      'Auto-generated ESG and sustainability reports — board-ready, audit-proof, delivered in 48 hours. Photocarb builds your IFRS S2 climate disclosure, annual sustainability report, CDP submission, and investor-grade data package from your live carbon data. Available in Arabic, French and English, with a tamper-evident audit trail included.',
    stat: '48 hrs',
    statLabel: 'Full ESG report delivery',
    color: 'var(--color-lime)',
    icon: IconLeaf,
    industries: ['Exporters', 'Manufacturing', 'Textiles & Leather', 'Agri-processing', 'Financial Services', 'Listed Companies', 'Tourism & Hospitality', 'Retail & FMCG', 'Startups', 'Insurance & Banking', 'Incubators & Accelerators'],
    valueProp: 'IFRS S2 compliant ESG reports in 48 hours',
    heroHighlights: [
      { value: '48 hrs', label: 'Full ESG report delivery' },
      { value: 'IFRS S2', label: 'Climate disclosure ready' },
      { value: 'AR · FR · EN', label: 'Trilingual board-ready output' },
    ],
    capabilities: [
      { icon: IconLeaf, title: 'IFRS S2 Climate Disclosure', desc: 'Materiality tables and scenario analysis auto-generated' },
      { icon: IconGlobe, title: 'Arabic, French & English', desc: 'Board-ready reports in three languages, no translation lag' },
      { icon: IconLock, title: 'Tamper-Evident Trail', desc: 'Every disclosure traceable back to its source data point' },
    ],
    whyItMatters: [
      { icon: IconTrendingUp, title: 'Investors screen you before they commit capital', desc: 'ESG due diligence is now standard practice for private equity, development banks and export credit agencies operating in Tunisia.' },
      { icon: IconGlobe, title: 'EU brands require it to keep buying from you', desc: 'Supplier ESG disclosure is becoming a contractual condition for exporters selling into European retail and industrial supply chains.' },
      { icon: IconShield, title: 'IFRS S2 is spreading beyond listed companies', desc: 'Lenders and larger buyers now request IFRS S2-aligned disclosure even from private suppliers as part of their own reporting chain.' },
      { icon: IconCheckCircle, title: 'A credible report wins tenders', desc: 'A board-ready, trilingual ESG report differentiates you in export markets and public tenders where sustainability scoring counts.' },
    ],
    calculator: { kind: 'esg' },
    methodologyStandard: 'IFRS S1/S2 · GRI Standards · CDP Framework',
    methodologySteps: [
      'Materiality assessment aligned to IFRS S2 climate requirements',
      'Data aggregation from live carbon and operational feeds',
      'Auto-drafted disclosure narrative, tables and scenario analysis',
      'Board review cycle with a tamper-evident audit trail on every figure',
    ],
    gains: [
      'Board-ready ESG reporting without building a six-person sustainability team',
      'Trilingual disclosures — Arabic, French and English — with zero translation lag',
      'Every claim traceable back to a source data point',
      'Investor-grade data package ready for CDP or lender due diligence',
    ],
    timeToReady: 'Full report drafted in 48 hours; board-ready after a single review cycle.',
    clients: [
      { type: 'EU-Facing Exporters', desc: 'Managing annual disclosure obligations to buyers and lenders' },
      { type: 'Manufacturing Groups', desc: 'Consolidating ESG data across multiple sites and business units' },
      { type: 'Textile & Agri Producers', desc: 'Under brand or investor ESG due diligence pressure' },
      { type: 'Financial Institutions', desc: 'Meeting portfolio-level climate disclosure requirements from regulators' },
      { type: 'Tourism & Hospitality Groups', desc: 'Responding to ESG questionnaires from booking platforms and investors' },
      { type: 'Startups & Scale-Ups', desc: 'Building ESG credentials early to satisfy investor due diligence at the next funding round' },
      { type: 'Insurance & Banking', desc: 'Reporting portfolio and underwriting climate exposure to regulators and reinsurers' },
      { type: 'Incubators & Accelerators', desc: 'Equipping portfolio companies with ESG reporting their investors and grant funders require' },
    ],
  },
  {
    id: 'cbam',
    num: '03',
    title: 'CBAM Compliance',
    subtitle: 'EU Regulation 2023/956 · Quarterly Declarations',
    description:
      'Full CBAM declaration automation for Tunisian exporters. Photocarb calculates actual embedded carbon in your exported goods and generates EU-format declarations automatically. Using actual measured values instead of EU default rates saves most clients 30–65% on their CBAM liability.',
    stat: '40–65%',
    statLabel: 'Typical CBAM liability reduction',
    color: 'var(--color-violet)',
    icon: IconShield,
    industries: ['Steel', 'Cement', 'Phosphates & Fertilizers', 'Aluminium', 'Hydrogen & Chemical Precursors', 'Electricity Generation'],
    valueProp: 'CBAM declarations ready before your next shipment',
    heroHighlights: [
      { value: '40–65%', label: 'Typical liability reduction' },
      { value: 'Quarterly', label: 'Automated EU declarations' },
      { value: 'TAXUD XML', label: 'Exact EU customs format' },
    ],
    capabilities: [
      { icon: IconShield, title: 'EU TAXUD-Format XML', desc: 'Declarations generated in the exact format EU customs expects' },
      { icon: IconTarget, title: 'Actual vs Default Rates', desc: 'Measured intensity data replaces punitive default assumptions' },
      { icon: IconClock, title: 'Quarterly Automation', desc: 'Declarations prepared and filed on the EU reporting calendar' },
    ],
    whyItMatters: [
      { icon: IconShield, title: 'It is mandatory, not optional', desc: 'Any CBAM-covered good entering the EU requires a quarterly declaration — shipments without one risk being held or fined at customs.' },
      { icon: IconCoins, title: 'Actual rates are the single biggest lever on your bill', desc: 'EU default values are set punitively high on purpose; replacing them with your measured process data is what drives the 40–65% reduction.' },
      { icon: IconClock, title: 'Missed deadlines carry EU penalties', desc: 'The quarterly filing calendar is strict, and repeated late or incorrect declarations escalate into financial penalties from EU customs.' },
      { icon: IconTrendingUp, title: 'Full carbon pricing phases in from 2026', desc: 'CBAM certificate purchases become mandatory as the transitional period ends, turning embedded carbon into a direct line item on your export margin.' },
    ],
    calculator: { kind: 'cbam' },
    methodologyStandard: 'EU Regulation 2023/956 · CBAM Implementing Regulation',
    methodologySteps: [
      'Product and CN code classification against the CBAM goods list',
      'Embedded emissions calculation from measured, not default, process data',
      'EU TAXUD-format XML declaration generation',
      'Quarterly filing calendar and submission support through your reporting agent',
    ],
    gains: [
      '30–65% lower CBAM liability by replacing EU default values with your measured intensity',
      'Zero missed filing deadlines with automated quarterly scheduling',
      'Declarations in the exact XML format EU customs expects — no rework',
      'Full documentation trail if EU customs requests verification',
    ],
    timeToReady: 'First declaration-ready dataset within 48 hours of connecting production data; quarterly filings automated thereafter.',
    clients: [
      { type: 'Steel & Cement Exporters', desc: 'Shipping CBAM goods into the EU on a quarterly declaration cycle' },
      { type: 'Phosphates & Fertilizers', desc: 'High embedded-carbon exports where actual-vs-default rates matter most' },
      { type: 'Trading Houses', desc: 'Managing CBAM exposure across multiple Tunisian suppliers at once' },
      { type: 'Aluminium Processors', desc: 'Calculating embedded emissions across smelting and casting stages' },
      { type: 'EU Importers of Record', desc: 'Requiring verified supplier data to file their own CBAM declarations correctly' },
    ],
  },
  {
    id: 'supply-chain',
    num: '04',
    title: 'Supply Chain Carbon',
    subtitle: 'Scope 3 · Upstream + Downstream · All 15 Categories',
    description:
      'Map the full carbon footprint of your supply chain. Photocarb collects data from your top suppliers, calculates all 15 Scope 3 categories, and identifies your highest-impact reduction opportunities — including per-batch supplier data that qualifies textile and leather factories for EU brands\' green-sourcing programs.',
    stat: 'Scope 3',
    statLabel: 'All 15 GHG Protocol categories',
    color: 'var(--color-primary)',
    icon: IconLink,
    industries: ['Textiles & Leather', 'Manufacturing', 'Food & Agri-processing', 'Cement', 'Electronics', 'Automotive Components', 'Packaging', 'Retail & FMCG', 'E-Commerce'],
    valueProp: 'Full Scope 3 visibility across your supply chain',
    heroHighlights: [
      { value: 'Scope 3', label: 'All 15 GHG Protocol categories' },
      { value: 'Up + Downstream', label: 'Full value-chain coverage' },
      { value: '2 wks', label: 'To first hotspot map' },
    ],
    capabilities: [
      { icon: IconNetwork, title: 'Supplier Data Collection', desc: 'Structured intake from your top suppliers at scale' },
      { icon: IconChart, title: 'All 15 Scope 3 Categories', desc: 'Complete GHG Protocol upstream + downstream coverage' },
      { icon: IconTarget, title: 'Hotspot Ranking', desc: 'Reduction opportunities ranked by impact, not guesswork' },
    ],
    whyItMatters: [
      { icon: IconGlobe, title: 'EU buyers require Scope 3 visibility now', desc: 'Large European buyers are pushing supplier-level Scope 3 reporting requirements down their entire value chain, not just to direct exporters.' },
      { icon: IconCheckCircle, title: 'Green-sourcing programs pay premiums', desc: 'Per-batch, verified supplier data is what qualifies textile and leather factories for brand green-sourcing and preferred-supplier pricing.' },
      { icon: IconTarget, title: 'Most emissions hide upstream, not on-site', desc: 'For manufacturers, 70–90% of the footprint often sits in purchased materials and logistics — invisible until you map the full chain.' },
      { icon: IconShield, title: 'Due-diligence rules are spreading across the EU', desc: 'CSRD and supply-chain due-diligence regulation increasingly require buyers to document supplier emissions and human-rights risk together.' },
    ],
    calculator: { kind: 'supplychain' },
    methodologyStandard: 'GHG Protocol Scope 3 Standard · All 15 Categories',
    methodologySteps: [
      'Supplier mapping and tiering by spend and emissions impact',
      'Structured data intake campaign across your top suppliers',
      'Category-by-category Scope 3 calculation against GHG Protocol methodology',
      'Hotspot ranking and a prioritized reduction roadmap',
    ],
    gains: [
      'Full Scope 3 visibility instead of industry-average estimates',
      'A supplier engagement program that improves data quality year over year',
      'Reduction opportunities ranked by actual impact, not guesswork',
      "Ready-made per-batch and per-shipment outputs for EU buyer green-sourcing audits",
    ],
    timeToReady: 'Initial hotspot map within 2 weeks of supplier data collection kickoff; full 15-category inventory within 6–8 weeks.',
    clients: [
      { type: 'Textiles & Leather', desc: 'Under buyer pressure to report Scope 3 across multi-tier supply chains' },
      { type: 'Food & Agri-processing', desc: 'Mapping upstream agricultural and packaging emissions' },
      { type: 'Manufacturing', desc: 'Coordinating emissions data across large supplier networks' },
      { type: 'Electronics & Automotive Suppliers', desc: 'Documenting component-level emissions for OEM supply-chain scorecards' },
      { type: 'Packaging Producers', desc: 'Providing verified material-intensity data to brand-owner customers' },
      { type: 'E-Commerce & Fulfilment', desc: 'Mapping last-mile delivery and packaging emissions across a fragmented logistics network' },
    ],
  },
  {
    id: 'simulation-lab',
    num: '05',
    title: 'Simulation Lab',
    subtitle: 'What-If Scenarios · Instant Results',
    description:
      'The Simulation Lab is Photocarb\'s what-if modeling engine — a physics-based digital twin of your process that lets you test operational changes before committing a single dinar of capital expenditure. Ask "what if we switch kiln fuel?" or "what if we electrify this line?" and get the carbon, cost, and compliance impact side by side, not in three separate spreadsheets. It draws on the same operational data behind your bilan carbone, so every scenario is grounded in your real baseline, not industry averages. Whether you\'re weighing an ANME-eligible efficiency investment, a fuel switch ahead of your next CBAM declaration, or a capex decision under board scrutiny, the Simulation Lab turns "we think this would help" into a ranked, defensible business case — in under 30 seconds, with unlimited free comparisons.',
    stat: '< 30 sec',
    statLabel: 'Full scenario simulation',
    color: 'var(--color-info)',
    icon: IconFlask,
    industries: ['Any Tunisian Industry', 'Manufacturing', 'Energy-Intensive Facilities', 'Process Industries', 'Cement', 'Steel', 'Textiles', 'Food Processing'],
    valueProp: 'Test reduction strategies before you invest',
    heroHighlights: [
      { value: '< 30 sec', label: 'Full scenario simulation' },
      { value: 'Unlimited', label: 'Free what-if scenarios' },
      { value: '3-in-1', label: 'Carbon · cost · compliance' },
    ],
    capabilities: [
      { icon: IconFlask, title: 'Instant What-If Modeling', desc: 'Test process, fuel, or efficiency changes before committing capex' },
      { icon: IconForecast, title: 'Cost + Carbon + Compliance', desc: 'Every scenario scored across all three dimensions at once' },
      { icon: IconLoop, title: 'Unlimited Free Scenarios', desc: 'Compare as many options as you need before deciding' },
    ],
    whyItMatters: [
      { icon: IconCoins, title: 'Avoids stranded-asset risk', desc: 'Capex committed on an incomplete picture — fuel prices shift, carbon rules tighten — can turn a "green" investment into a write-off within a few years.' },
      { icon: IconEuro, title: 'Financing often requires a modeled case first', desc: 'ANME subsidy files and green lender due diligence both expect a quantified before/after comparison, not a verbal estimate.' },
      { icon: IconClock, title: 'Replaces weeks of separate studies', desc: 'What used to mean commissioning separate cost, carbon and compliance studies now runs as one simulation in under 30 seconds.' },
      { icon: IconTarget, title: 'Turns intuition into a defensible business case', desc: 'A ranked, data-backed comparison holds up in board reviews in a way that "we think this would help" never does.' },
    ],
    calculator: {
      kind: 'scenario',
      scenarios: [
        { id: 'altfuel', label: 'Switch cement kiln to alternative fuel (RDF/biomass)', emissionsPct: -19, costPct: -8, paybackMonths: 10, note: 'Alternative-fuel substitution typically cuts fossil-fuel intensity 15–25% while lowering fuel cost.' },
        { id: 'eaf', label: 'Shift steel production toward electric arc furnace share', emissionsPct: -46, costPct: 14, paybackMonths: 30, note: 'Large emissions cut but a meaningful capex premium — best modeled against a multi-year EU carbon price forecast.' },
        { id: 'waste-heat', label: 'Recover waste heat from phosphate processing', emissionsPct: -11, costPct: -13, paybackMonths: 12, note: 'Waste heat recovery cuts both process energy demand and utility costs.' },
        { id: 'electrify', label: 'Electrify textile dyeing & finishing heat', emissionsPct: -24, costPct: 9, paybackMonths: 22, note: 'Emissions drop significantly if grid electricity is low-carbon; payback depends on local tariffs.' },
      ],
    },
    methodologyStandard: 'Physics-based digital twin · Process engineering models',
    methodologySteps: [
      'Baseline model built from your live operational data',
      'Scenario library configured to your specific process — fuel switch, capex upgrade, efficiency change',
      'Instant simulation across carbon, cost and compliance dimensions',
      'Recommendations ranked by payback period and total impact',
    ],
    gains: [
      'Test capex decisions before committing budget',
      'See carbon, cost and compliance impact side by side, not in separate spreadsheets',
      'Unlimited free scenario comparisons at no incremental cost',
      'Avoid stranded-asset risk from decisions made on incomplete data',
    ],
    timeToReady: 'First scenario results in under 30 seconds; full baseline model calibrated within 1 week of data connection.',
    clients: [
      { type: 'Cement & Phosphates', desc: 'Evaluating fuel-switch or efficiency upgrades before committing capex' },
      { type: 'Steel Producers', desc: 'Planning multi-year decarbonization roadmaps across process routes' },
      { type: 'Textile Manufacturers', desc: 'Modeling dyeing and finishing energy scenarios against compliance targets' },
      { type: 'Food Processors', desc: 'Comparing refrigeration and thermal process upgrades before ANME filing' },
      { type: 'Multi-Site Groups', desc: 'Ranking efficiency investments across facilities by payback and impact' },
    ],
  },
  {
    id: 'lca',
    num: '06',
    title: 'LCA',
    subtitle: 'ISO 14040 · ISO 14067 · Product Carbon Footprint',
    description:
      "Certified product carbon footprint analysis from raw material extraction to factory gate — or full cradle-to-grave. Photocarb's LCA module follows ISO 14040/14044 and 14067 methodology, producing verified carbon labels that unlock premium pricing in European markets and qualify products for low-carbon procurement programs.",
    stat: 'ISO 14067',
    statLabel: 'Certified product carbon footprint',
    color: 'var(--color-lime)',
    icon: IconGlobe,
    industries: ['Cosmetics & Personal Care', 'Food & Beverage', 'Pharmaceuticals', 'Textiles & Leather', 'Construction Materials', 'Packaging', 'Agro-Industry', 'Electronics & Electrical Goods'],
    valueProp: 'Product carbon footprints verified to ISO 14067',
    heroHighlights: [
      { value: 'ISO 14067', label: 'Certified product footprint' },
      { value: 'Cradle-to-Grave', label: 'Full boundary option' },
      { value: '3–4 wks', label: 'To certified report' },
    ],
    capabilities: [
      { icon: IconGlobe, title: 'ISO 14040 / 14067 Certified', desc: 'Internationally recognized product footprint methodology' },
      { icon: IconRecycle, title: 'Cradle-to-Gate or -Grave', desc: "Choose the boundary that matches your buyer's requirement" },
      { icon: IconCheckCircle, title: 'Verified Carbon Labels', desc: 'Unlock premium pricing and green procurement eligibility' },
    ],
    whyItMatters: [
      { icon: IconGlobe, title: 'Access to the EU market', desc: 'A growing share of EU retailers and industrial buyers now require a verified per-product carbon footprint before they will even list or approve a supplier — no PCF, no shelf space.' },
      { icon: IconCheckCircle, title: 'ESG attestation for your buyers and auditors', desc: 'When a customer\'s own ESG report claims a supply-chain footprint, they need your product-level number to back it up — LCA is the evidence behind their attestation, not just yours.' },
      { icon: IconCalculator, title: 'Product Carbon Footprint (PCF) on demand', desc: 'Retailers, brand-owners and the incoming EU Digital Product Passport increasingly ask for a specific, certified PCF per SKU — not an estimate, not a sector average.' },
      { icon: IconTrendingUp, title: 'Unlocks investor and green financing', desc: 'Green bonds, sustainability-linked loans and impact investors score deals on verified product-level data — a certified LCA is often a prerequisite for preferential financing terms.' },
      { icon: IconShield, title: 'A defensible claim, not a greenwashing risk', desc: "If you market a product as 'low-carbon' or 'eco-friendly,' the EU Green Claims Directive requires evidence behind it — ISO 14067 certification is that evidence." },
    ],
    calculator: { kind: 'lca-scan' },
    methodologyStandard: 'ISO 14040 / 14044 · ISO 14067',
    methodologySteps: [
      'Functional unit and system boundary definition',
      'Life cycle inventory data collection across raw materials, process and logistics',
      'Impact assessment calculated against ISO 14067 methodology',
      'Third-party verification and certified carbon label issuance',
    ],
    gains: [
      'Verified carbon labels that unlock premium pricing in EU markets',
      'Qualification for green and low-carbon procurement programs',
      "Choice of cradle-to-gate or cradle-to-grave boundary to match your buyer's requirement",
      'A defensible, audit-ready methodology if a buyer challenges your claim',
    ],
    timeToReady: 'Indicative footprint in minutes via the estimator; certified ISO 14067 report typically within 3–4 weeks.',
    clients: [
      { type: 'Cosmetics & Personal Care', desc: 'Backing "clean beauty" and low-carbon claims with a certified product footprint' },
      { type: 'Food & Beverage', desc: 'Needing verified per-product carbon labels for European retail partners' },
      { type: 'Pharmaceuticals', desc: 'Documenting active-ingredient and packaging emissions for procurement tenders' },
      { type: 'Textiles & Leather', desc: 'Selling into EU green-procurement and low-carbon buyer programs' },
      { type: 'Construction Materials', desc: 'Qualifying products for green building certification schemes' },
      { type: 'Packaging & Agro-Industry', desc: 'Proving material and process footprints down to the SKU level' },
    ],
  },
  {
    id: 'ai-reports',
    num: '07',
    title: 'Reports',
    subtitle: 'Ready in 48 Hours · Arabic + French + English',
    description:
      "Every regulatory framework wants the same underlying data, formatted differently — a CBAM quarterly declaration, an IFRS S2 climate disclosure, an ISO 14064 inventory, a CDP response, or a board ESG briefing all draw on the same verified carbon dataset. Photocarb's Reports engine generates every one of them automatically, on schedule or on demand, instead of your team re-entering the same numbers into a different template each time. Every report is audit-ready on delivery, with full calculation methodology documentation and a tamper-evident evidence chain back to the source data. Available in Arabic, French and English, because a report that only works in one language isn't finished — your board, your regulator, and your EU customs office rarely read the same one.",
    stat: '48 hrs',
    statLabel: 'From raw data to submitted report',
    color: 'var(--color-violet)',
    icon: IconSparkle,
    industries: ['Any Tunisian Industry', 'Multi-site', 'Exporters', 'Listed Companies', 'Financial Institutions', 'Manufacturing Groups'],
    valueProp: 'Any compliance report in 48 hours',
    heroHighlights: [
      { value: '48 hrs', label: 'Raw data to submitted report' },
      { value: 'AR · FR · EN', label: 'Trilingual output' },
      { value: '1 dataset', label: 'Powers every regulatory report' },
    ],
    capabilities: [
      { icon: IconSparkle, title: 'One Dataset, Every Report', desc: 'CBAM, IFRS S2, and ISO 14064 from a single source' },
      { icon: IconGlobe, title: 'Arabic, French, English', desc: 'Every report generated in the language your stakeholder needs' },
      { icon: IconClock, title: '48-Hour Turnaround', desc: 'On schedule or on demand, always audit-ready on delivery' },
    ],
    whyItMatters: [
      { icon: IconLoop, title: 'Stops re-entering the same numbers', desc: 'Every framework asks for the same underlying data in a different template — one dataset generating every report removes the manual re-keying that introduces errors.' },
      { icon: IconLock, title: 'Protects you if a report is challenged', desc: 'A tamper-evident evidence chain back to the source data means you can defend any figure if a regulator, auditor or buyer questions it later.' },
      { icon: IconGlobe, title: 'Removes the translation bottleneck', desc: 'Multi-market operators lose days waiting on translated disclosures — trilingual generation means your board, regulator and customs office all get their copy at once.' },
      { icon: IconClock, title: 'Always ready for a surprise request', desc: 'On-demand generation means an unplanned due-diligence request or buyer questionnaire does not turn into a week of scrambling.' },
    ],
    calculator: {
      kind: 'checklist',
      prompt: 'Which reports does your team currently prepare manually?',
      items: ['CBAM quarterly declaration', 'IFRS S2 climate disclosure', 'ISO 14064 GHG inventory', 'CDP response', 'Board ESG briefing', 'Buyer sustainability questionnaire'],
      unit: 'reports',
      withPhotocarbNote: 'generated automatically in 48 hours, from one verified dataset.',
    },
    methodologyStandard: 'Automated multi-framework generation · CBAM, IFRS S2, ISO 14064',
    methodologySteps: [
      'Connect once to your live carbon dataset',
      'Select the report type and jurisdiction you need',
      'AI drafts the report with full calculation methodology documentation',
      'Human review and tamper-evident sign-off before delivery',
    ],
    gains: [
      'One dataset powers every regulatory report you need, no re-entry',
      '48-hour turnaround, on schedule or on demand',
      'Every report audit-ready on delivery with a full calculation trail',
      'Available in Arabic, French and English',
    ],
    timeToReady: 'First report generated within 48 hours of dataset connection; recurring reports fully automated thereafter.',
    clients: [
      { type: 'Multi-Site Exporters', desc: 'Juggling several regulatory regimes across sites at once' },
      { type: 'Compliance Teams', desc: 'Tired of manually re-preparing similar reports every quarter' },
      { type: 'All Sectors', desc: 'Any operator that needs audit-ready reporting without a dedicated team' },
      { type: 'Financial Institutions', desc: 'Generating portfolio-level climate disclosures across many borrowers' },
      { type: 'Listed & Pre-IPO Companies', desc: 'Meeting board and regulatory reporting deadlines without a delay' },
    ],
  },
  {
    id: 'anme-compliance',
    num: '08',
    title: 'ANME Compliance & FTE Subsidy',
    subtitle: 'Law No. 2009-7 · Article 7, Decree No. 2017-983 · Any Sector',
    description:
      "Tunisia's mandatory energy audit law applies to any facility consuming 800 tonnes of oil equivalent (TOE) or more a year — not just exporters. Photocarb prepares the consumption baseline and investment case your ANME-registered auditor and FTE subsidy file both need, so the audit you're legally required to run also unlocks funding instead of just a fine.",
    stat: 'TND 50,000',
    statLabel: 'Maximum fine for non-compliance, avoided',
    color: 'var(--color-navy)',
    icon: IconBolt,
    industries: ['Any Energy-Intensive Facility', 'Manufacturing', 'Agri-Food', 'Hospitality & Services', 'Textiles', 'Chemicals', 'Cement & Building Materials', 'Cold Storage & Logistics'],
    valueProp: 'Turn a legal obligation into a funded efficiency upgrade',
    heroHighlights: [
      { value: 'TND 50,000', label: 'Maximum fine, avoided' },
      { value: '70%', label: 'Audit cost subsidized via FTE' },
      { value: '20%', label: 'Typical investment subsidy' },
    ],
    capabilities: [
      { icon: IconClipboard, title: '800 TOE Threshold Tracking', desc: 'Know exactly when your facility crosses the mandatory-audit trigger, sector by sector' },
      { icon: IconTarget, title: 'Auditor-Ready Baseline', desc: 'Consumption and process data prepared for your ANME-registered auditor — we support the audit, we don\'t replace the licensed auditor' },
      { icon: IconEuro, title: 'FTE Subsidy Case', desc: 'Investment case modeled for the Article 7 subsidy — 70% of audit cost, 20% of the resulting upgrade' },
    ],
    whyItMatters: [
      { icon: IconShield, title: "It's the law above 800 TOE/year", desc: 'Facilities crossing the threshold face a TND 20,000–50,000 fine for skipping the mandatory audit — this is a legal obligation, not a voluntary certification.' },
      { icon: IconEuro, title: 'Turns a cost into funded capex', desc: 'The Article 7 FTE subsidy covers 70% of the audit cost and typically 20% of the resulting efficiency investment — most facilities never claim it because the file is prepared incorrectly.' },
      { icon: IconLink, title: 'Feeds directly into your bilan carbone', desc: 'Energy efficiency gains from the audit lower your Scope 1 and 2 emissions, which is the same data your bilan carbone and CBAM filings rely on.' },
      { icon: IconCoins, title: 'Energy costs are rising regardless of compliance', desc: 'Beyond avoiding the fine, the efficiency measures identified typically pay for themselves through lower energy bills within 1–3 years.' },
    ],
    calculator: {
      kind: 'metric',
      fields: [
        { id: 'auditCost', label: 'Estimated energy audit cost (TND)', type: 'number', placeholder: 'e.g. 12000', min: 1000 },
      ],
      compute: (v, lang) => {
        const subsidy = Math.min(v.auditCost * 0.7, 30000)
        const notes: Record<'en' | 'fr' | 'ar', string> = {
          en: 'Based on the 70% FTE subsidy rate under Article 7 of Decree No. 2017-983, capped at TND 30,000. A further subsidy of up to 20% typically applies to the resulting efficiency investment.',
          fr: "Basé sur le taux de subvention FTE de 70 % en vertu de l'Article 7 du décret n° 2017-983, plafonné à 30 000 TND. Une subvention supplémentaire allant jusqu'à 20 % s'applique généralement à l'investissement d'efficacité qui en résulte.",
          ar: 'بناءً على معدل دعم صندوق الانتقال الطاقي 70% بموجب الفصل 7 من الأمر عدد 2017-983، بحد أقصى 30,000 دينار. وينطبق عادةً دعم إضافي يصل إلى 20% على استثمار الكفاءة الناتج.',
        }
        return { value: Math.round(subsidy), note: notes[lang] }
      },
      resultLabel: 'Estimated FTE audit subsidy',
      resultPrefix: 'TND ',
      assumption: 'Indicative only — the final subsidy is confirmed by ANME on a case-by-case technical review.',
    },
    methodologyStandard: 'Law No. 2009-7 · Decree No. 2009-362 · Decree No. 2017-983 (Article 7)',
    methodologySteps: [
      'Energy-consumption baseline built from your utility bills and production data',
      'Threshold check against the 800 TOE/year mandatory-audit trigger',
      'Data package prepared for your ANME-registered energy auditor',
      'Investment case modeled for the FTE subsidy file, submitted alongside the audit report',
    ],
    gains: [
      'A clear answer to whether your facility is legally required to audit — and when',
      'Avoid the TND 20,000–50,000 non-compliance fine entirely',
      'A funded efficiency upgrade instead of just a compliance cost',
      'One dataset that also feeds your CBAM, IFRS S2, and bilan carbone reporting',
    ],
    timeToReady: 'Threshold assessment and baseline data ready within 5 business days; full auditor-ready package within 2–3 weeks.',
    clients: [
      { type: 'Any Energy-Intensive Facility', desc: 'Manufacturing, agri-food, chemicals or process industries approaching the 800 TOE threshold' },
      { type: 'Multi-Site Groups', desc: 'Tracking audit obligations and FTE eligibility across several facilities at once' },
      { type: 'First-Time Filers', desc: 'Facing their first mandatory audit and wanting the FTE subsidy captured correctly' },
      { type: 'Cold Storage & Logistics', desc: 'Refrigeration-heavy operations with high, easily-audited energy intensity' },
      { type: 'Textile & Cement Plants', desc: 'Process-heat-intensive facilities with the largest efficiency subsidy potential' },
    ],
  },
]

export const SERVICE_DELIVERY_STEPS = [
  'Assessment & scoping',
  'Data collection & integration',
  'Analysis & optimization',
  'Report delivery in 48 hours',
]

export function getServiceById(id: string): ServiceDef | undefined {
  return SERVICES.find(s => s.id === id)
}

/* ---- Arabic localization ---- */
interface ServiceAr {
  title: string
  subtitle: string
  description: string
  statLabel: string
  valueProp: string
  industries: string[]
  capabilities: { title: string; desc: string }[]
  heroHighlights: string[]
  calculatorMetric?: { fieldLabel: string; placeholder: string; resultLabel: string; assumption: string }
  methodologyStandard?: string
  methodologySteps?: string[]
  gains?: string[]
  timeToReady?: string
  clients?: { type: string; desc: string }[]
  whyItMatters?: { title: string; desc: string }[]
}

const SERVICES_AR: Record<string, ServiceAr> = {
  'bilan-carbone': {
    title: 'البصمة الكربونية',
    subtitle: 'النطاق 1 · النطاق 2 · النطاق 3 · بروتوكول GHG',
    description:
      'البصمة الكربونية هي ميزانيتك الكربونية الكاملة — جرد معتمد لكل طنّ من مكافئ ثاني أكسيد الكربون الذي تتحمّل شركتك مسؤوليته، مقسَّم إلى ثلاثة نطاقات معترف بها دوليًا: النطاق 1 (الانبعاثات المباشرة من الوقود والعمليات التي تتحكّم بها)، والنطاق 2 (انبعاثات الكهرباء والطاقة التي تشتريها)، والنطاق 3 (كل ما هو في المنبع والمصب من سلسلة توريدك). وهي المستند التأسيسي الوحيد الذي تُبنى عليه كل متطلبات الامتثال الأخرى — إقرارات CBAM، وإفصاحات IFRS S2، وخط أساس تدقيق ANME الطاقي، وأي تمويل أو مناقصة تطلب بيانات انبعاثات موثّقة، كلها تنطلق من البصمة الكربونية نفسها. تحسب فوتوكارب بصمتك من بيانات تشغيلية حقيقية — سجلات ERP، وفواتير المرافق، وسجلات الإنتاج — مبنية على منهجية بروتوكول GHG ومتوافقة مع ISO 14064، وتُسلَّم كجرد معتمد خلال 48 ساعة. دون تركيب أي جهاز، ودون معايرة أي حسّاس — فقط البيانات المتوفرة لديك بالفعل، منظَّمة في رقم يقبله مدققك.',
    statLabel: 'دقة البيانات مقابل خط الأساس اليدوي',
    valueProp: 'بصمتك الكربونية الكاملة خلال 48 ساعة',
    industries: ['أي صناعة تونسية', 'الصناعات التحويلية', 'المنشآت كثيفة الطاقة', 'المصدّرون', 'المنسوجات والجلود', 'الصناعات الغذائية والزراعية', 'الكيماويات', 'مواد البناء'],
    capabilities: [
      { title: 'سجل النطاقات 1-2-3', desc: 'محاسبة كاملة وفق بروتوكول GHG من بيانات تشغيلية حقيقية' },
      { title: 'متوافق مع ISO 14064', desc: 'منهجية معتمدة مقبولة لدى المدققين والجهات التنظيمية' },
      { title: 'جاهز لـ CBAM / IFRS', desc: 'جرد واحد يغذّي كل تقديم تنظيمي تحتاجه' },
    ],
    whyItMatters: [
      { title: 'الأساس الذي يعتمد عليه كل تقديم آخر', desc: 'إقرارات CBAM وإفصاحات IFRS S2 وخط أساس تدقيق ANME كلها تنطلق من البصمة الكربونية نفسها — ابنِها بشكل صحيح مرة واحدة بدل إعادة بنائها لكل متطلب.' },
      { title: 'المشترون والمُقرضون يطلبونها مسبقًا الآن', desc: 'يطلب العملاء الأوروبيون والبنوك ووكالات ائتمان التصدير بشكل متزايد جردًا معتمدًا للنطاقات 1-2-3 قبل توقيع عقد أو صرف تمويل.' },
      { title: 'اكتشف أكبر أدواتك قبل أن تنفق', desc: 'اعرف بالضبط أي المواقع أو الآلات أو أنواع الوقود تقود بصمتك قبل الالتزام برأس مال لترقية كفاءة.' },
      { title: 'التعرّض القانوني في تزايد', desc: 'يعتمد قانون التدقيق الطاقي التونسي وقواعد الكربون الأوروبية كلاهما على خط أساس موثّق — مسار جاهز للتدقيق يحميك إن طُعن في أيّ منهما.' },
    ],
    heroHighlights: ['الدقة مقابل التدقيق اليدوي', 'تغطية كاملة لبروتوكول GHG', 'أول جرد معتمد'],
    methodologyStandard: 'معيار GHG Protocol للشركات · ISO 14064-1',
    methodologySteps: [
      'ورشة تحديد الحدود والنطاق مع فريق عملياتكم',
      'جمع بيانات الأنشطة عبر النطاقات 1 و2 و3 — من ERP وفواتير الطاقة وسجلات الإنتاج',
      'مطابقة عوامل الانبعاث والحساب وفق منهجية بروتوكول GHG',
      'تسليم جرد معتمد مع مسار تدقيق كامل، جاهز للمراجعة من طرف ثالث',
    ],
    gains: [
      'رقم معتمد واحد يقبله مدققوكم والجهات التنظيمية والمشترون',
      'رؤية واضحة لأي المواقع أو الأنشطة تُسهم أكثر في بصمتكم',
      'جرد مُهيَّأ مسبقًا لتقديمات CBAM وIFRS S2',
      'دقة بيانات 94% مقارنة بالتدقيق اليدوي على جداول البيانات',
    ],
    timeToReady: 'يُسلَّم أول جرد معتمد خلال 48 ساعة بعد ربط البيانات التشغيلية؛ ويكتمل النشر متعدد المواقع عادة خلال 2-3 أسابيع.',
    clients: [
      { type: 'الإسمنت والفوسفات', desc: 'يبنون أول جرد كربوني بمستوى تنظيمي قبل دخول CBAM حيّز التنفيذ' },
      { type: 'الصلب والمنسوجات', desc: 'يُبلغون بيانات النطاق 1+2 لمشترين أو ممولين أوروبيين وفق جدول زمني محدد' },
      { type: 'المصنّعون', desc: 'يوحّدون بيانات انبعاثات متعددة المواقع في مصدر واحد قابل للتدقيق' },
      { type: 'الصناعات الغذائية والزراعية', desc: 'يؤسّسون خط أساس قبل أن يبدأ مشترو التجزئة بطلب بيانات الكربون' },
      { type: 'منتجو مواد البناء', desc: 'يوثّقون كثافة الانبعاثات لمناقصات البناء الأخضر والتصدير' },
    ],
  },
  'esg-reports': {
    title: 'ESG والاستدامة',
    subtitle: 'IFRS S1/S2 · GRI · CDP · عربي + فرنسي + إنجليزي',
    description:
      'تقارير ESG واستدامة تُنشأ تلقائيًا — جاهزة لمجلس الإدارة ومقاومة للتدقيق، تُسلَّم خلال 48 ساعة. تبني فوتوكارب إفصاحك المناخي وفق IFRS S2، وتقرير الاستدامة السنوي، وتقديم CDP، وحزمة بيانات بمستوى المستثمرين من بياناتك الكربونية الحية. متاحة بالعربية والفرنسية والإنجليزية مع مسار تدقيق مقاوم للتلاعب.',
    statLabel: 'تسليم تقرير ESG كامل',
    valueProp: 'تقارير ESG متوافقة مع IFRS S2 خلال 48 ساعة',
    industries: ['المصدّرون', 'التصنيع', 'المنسوجات والجلود', 'الصناعات الزراعية', 'الخدمات المالية', 'الشركات المدرجة', 'السياحة والضيافة', 'التجزئة والاستهلاك السريع', 'الشركات الناشئة', 'التأمين والبنوك', 'الحاضنات ومسرّعات الأعمال'],
    capabilities: [
      { title: 'إفصاح مناخي IFRS S2', desc: 'جداول الأهمية النسبية وتحليل السيناريوهات تُنشأ تلقائيًا' },
      { title: 'مخرجات بثلاث لغات', desc: 'تقارير جاهزة لمجلس الإدارة بالعربية والفرنسية والإنجليزية دون تأخير الترجمة' },
      { title: 'مسار مقاوم للتلاعب', desc: 'كل إفصاح قابل للتتبّع إلى نقطة البيانات المصدر' },
    ],
    whyItMatters: [
      { title: 'المستثمرون يقيّمونكم قبل ضخ رأس المال', desc: 'أصبحت العناية الواجبة ESG ممارسة معيارية لصناديق الأسهم الخاصة وبنوك التنمية ووكالات ائتمان التصدير العاملة في تونس.' },
      { title: 'العلامات الأوروبية تطلبها لتستمر بالشراء منكم', desc: 'يتحوّل إفصاح ESG للمورّدين إلى شرط تعاقدي للمصدّرين البائعين ضمن سلاسل التوريد الأوروبية للتجزئة والصناعة.' },
      { title: 'IFRS S2 يتجاوز الشركات المدرجة', desc: 'يطلب المُقرضون والمشترون الكبار الآن إفصاحًا متوافقًا مع IFRS S2 حتى من الموردين الخاصين، كجزء من سلسلة إبلاغهم الخاصة.' },
      { title: 'تقرير موثوق يفوز بالمناقصات', desc: 'تقرير ESG ثلاثي اللغة وجاهز لمجلس الإدارة يميّزكم في أسواق التصدير والمناقصات العامة حيث يهم تقييم الاستدامة.' },
    ],
    heroHighlights: ['تسليم تقرير ESG كامل', 'جاهز للإفصاح المناخي', 'مخرجات ثلاثية اللغة'],
    methodologyStandard: 'IFRS S1/S2 · معايير GRI · إطار CDP',
    methodologySteps: [
      'تقييم الأهمية النسبية المتوافق مع متطلبات IFRS S2 المناخية',
      'تجميع البيانات من التدفقات الكربونية والتشغيلية الحية',
      'صياغة تلقائية لسرد الإفصاح والجداول وتحليل السيناريوهات',
      'دورة مراجعة من مجلس الإدارة مع مسار تدقيق مقاوم للتلاعب على كل رقم',
    ],
    gains: [
      'تقارير ESG جاهزة لمجلس الإدارة دون بناء فريق استدامة من ستة أشخاص',
      'إفصاحات ثلاثية اللغة — عربي وفرنسي وإنجليزي — دون أي تأخير ترجمة',
      'كل إفصاح قابل للتتبّع إلى نقطة بيانات مصدر',
      'حزمة بيانات بمستوى المستثمرين جاهزة لـ CDP أو العناية الواجبة للمُقرضين',
    ],
    timeToReady: 'يُصاغ التقرير الكامل خلال 48 ساعة؛ ويصبح جاهزًا لمجلس الإدارة بعد دورة مراجعة واحدة.',
    clients: [
      { type: 'المصدّرون نحو الاتحاد الأوروبي', desc: 'يديرون التزامات إفصاح سنوية تجاه المشترين والمُقرضين' },
      { type: 'المجموعات الصناعية', desc: 'يوحّدون بيانات ESG عبر مواقع ووحدات أعمال متعددة' },
      { type: 'منتجو المنسوجات والأغذية', desc: 'تحت ضغط العناية الواجبة ESG من العلامات أو المستثمرين' },
      { type: 'المؤسسات المالية', desc: 'يلبّون متطلبات الإفصاح المناخي على مستوى المحفظة من الجهات التنظيمية' },
      { type: 'مجموعات السياحة والضيافة', desc: 'يستجيبون لاستبيانات ESG من منصات الحجز والمستثمرين' },
      { type: 'الشركات الناشئة', desc: 'تبني ملفها الائتماني في ESG مبكرًا لتلبية العناية الواجبة للمستثمرين في الجولة التمويلية القادمة' },
      { type: 'التأمين والبنوك', desc: 'تُبلغ عن التعرّض المناخي لمحافظها واكتتاباتها للجهات التنظيمية ومعيدي التأمين' },
      { type: 'الحاضنات ومسرّعات الأعمال', desc: 'تُجهّز شركاتها الناشئة بتقارير ESG التي يطلبها مستثمروها والجهات المانحة' },
    ],
  },
  cbam: {
    title: 'الامتثال لـ CBAM',
    subtitle: 'لائحة الاتحاد الأوروبي 2023/956 · إقرارات فصلية',
    description:
      'أتمتة كاملة لإقرارات CBAM للمصدّرين التونسيين. تحسب فوتوكارب الكربون المُضمَّن الفعلي في سلعك المصدَّرة وتنشئ إقرارات بصيغة الاتحاد الأوروبي تلقائيًا. واستخدام القيم المقيسة الفعلية بدلًا من المعدلات الافتراضية الأوروبية يوفّر لمعظم العملاء 30–65% من التزامات CBAM.',
    statLabel: 'الخفض المعتاد في التزامات CBAM',
    valueProp: 'إقرارات CBAM جاهزة قبل شحنتك القادمة',
    industries: ['الصلب', 'الإسمنت', 'الفوسفات والأسمدة', 'الألمنيوم', 'الهيدروجين والسلائف الكيميائية', 'توليد الكهرباء'],
    capabilities: [
      { title: 'صيغة XML وفق TAXUD الأوروبية', desc: 'إقرارات تُنشأ بالصيغة الدقيقة التي تتوقعها جمارك الاتحاد الأوروبي' },
      { title: 'القيم الفعلية مقابل الافتراضية', desc: 'بيانات الكثافة المقيسة تحل محل الافتراضات العقابية' },
      { title: 'أتمتة فصلية', desc: 'تُعدّ الإقرارات وتُقدَّم وفق تقويم الإبلاغ الأوروبي' },
    ],
    whyItMatters: [
      { title: 'إلزامي وليس اختياريًا', desc: 'أي سلعة مشمولة بـ CBAM تدخل الاتحاد الأوروبي تتطلب إقرارًا فصليًا — الشحنات دون إقرار معرّضة للتوقيف أو الغرامة في الجمارك.' },
      { title: 'القيم الفعلية هي الأداة الأكبر في تخفيض فاتورتكم', desc: 'تُحدَّد القيم الافتراضية الأوروبية عمدًا بمستوى عقابي مرتفع؛ استبدالها ببيانات عمليتكم المقيسة هو ما يحقق خفضًا بنسبة 30-65%.' },
      { title: 'المواعيد الفائتة تحمل عقوبات أوروبية', desc: 'تقويم الإيداع الفصلي صارم، والإقرارات المتكررة المتأخرة أو غير الصحيحة تتصاعد إلى عقوبات مالية من جمارك الاتحاد الأوروبي.' },
      { title: 'تسعير الكربون الكامل يبدأ تدريجيًا من 2026', desc: 'يصبح شراء شهادات CBAM إلزاميًا مع انتهاء الفترة الانتقالية، محوّلًا الكربون المُضمَّن إلى بند مباشر في هامش تصديركم.' },
    ],
    heroHighlights: ['الخفض المعتاد في الالتزامات', 'إقرارات أوروبية آلية', 'صيغة الجمارك الأوروبية الدقيقة'],
    methodologyStandard: 'لائحة الاتحاد الأوروبي 2023/956 · لائحة تنفيذ CBAM',
    methodologySteps: [
      'تصنيف المنتجات ورموز CN مقابل قائمة سلع CBAM',
      'حساب الانبعاثات المُضمَّنة من بيانات عملية مقيسة، لا افتراضية',
      'توليد إقرارات XML بصيغة TAXUD الأوروبية',
      'تقويم إيداع فصلي ودعم التقديم عبر وكيل الإبلاغ الخاص بكم',
    ],
    gains: [
      'خفض التزام CBAM بنسبة 30-65% باستبدال القيم الافتراضية الأوروبية بكثافتكم المقيسة',
      'صفر مواعيد إيداع فائتة بفضل الجدولة الفصلية الآلية',
      'إقرارات بصيغة XML الدقيقة التي تتوقعها جمارك الاتحاد الأوروبي — دون إعادة عمل',
      'مسار توثيق كامل في حال طلبت جمارك الاتحاد الأوروبي التحقق',
    ],
    timeToReady: 'أول مجموعة بيانات جاهزة للإقرار خلال 48 ساعة بعد ربط بيانات الإنتاج؛ ثم تُؤتمت الإيداعات الفصلية لاحقًا.',
    clients: [
      { type: 'مصدّرو الصلب والإسمنت', desc: 'يشحنون سلعًا مشمولة بـ CBAM إلى الاتحاد الأوروبي وفق دورة إقرار فصلية' },
      { type: 'الفوسفات والأسمدة', desc: 'صادرات ذات كربون مُضمَّن مرتفع حيث تهم المعدلات الفعلية مقابل الافتراضية أكثر ما يكون' },
      { type: 'بيوت التجارة', desc: 'يديرون انكشاف CBAM عبر عدة موردين تونسيين في آن واحد' },
      { type: 'مصنّعو الألمنيوم', desc: 'يحسبون الانبعاثات المُضمَّنة عبر مراحل الصهر والسبك' },
      { type: 'مستوردو السجل الأوروبيون', desc: 'يحتاجون بيانات موردين موثّقة لإيداع إقرار CBAM الخاص بهم بشكل صحيح' },
    ],
  },
  'supply-chain': {
    title: 'كربون سلسلة التوريد',
    subtitle: 'النطاق 3 · المنبع + المصب · جميع الفئات الـ15',
    description:
      'ارسم البصمة الكربونية الكاملة لسلسلة توريدك. تجمع فوتوكارب البيانات من كبار مورّديك، وتحسب جميع فئات النطاق 3 الـ15، وتحدد أعلى فرص الخفض تأثيرًا — بما في ذلك بيانات موردين على مستوى الدفعة تؤهّل مصانع المنسوجات والجلود لبرامج التوريد الأخضر لدى العلامات الأوروبية.',
    statLabel: 'جميع فئات بروتوكول GHG الـ15',
    valueProp: 'رؤية كاملة للنطاق 3 عبر سلسلة توريدك',
    industries: ['المنسوجات والجلود', 'التصنيع', 'الأغذية والصناعات الزراعية', 'الإسمنت', 'الإلكترونيات', 'مكوّنات السيارات', 'التغليف', 'التجزئة والاستهلاك السريع', 'التجارة الإلكترونية'],
    capabilities: [
      { title: 'جمع بيانات المورّدين', desc: 'استقبال منظّم من كبار مورّديك على نطاق واسع' },
      { title: 'جميع فئات النطاق 3 الـ15', desc: 'تغطية كاملة للمنبع والمصب وفق بروتوكول GHG' },
      { title: 'ترتيب النقاط الساخنة', desc: 'فرص الخفض مرتّبة حسب التأثير لا التخمين' },
    ],
    whyItMatters: [
      { title: 'المشترون الأوروبيون يطلبون رؤية النطاق 3 الآن', desc: 'يدفع كبار المشترين الأوروبيين متطلبات إبلاغ النطاق 3 على مستوى المورّد عبر كامل سلسلة القيمة، لا المصدّرين المباشرين فقط.' },
      { title: 'برامج التوريد الأخضر تدفع علاوات', desc: 'بيانات المورّدين الموثّقة على مستوى الدفعة هي ما يؤهّل مصانع المنسوجات والجلود لبرامج التوريد الأخضر لدى العلامات وتسعير مفضّل.' },
      { title: 'معظم الانبعاثات تختبئ في المنبع لا في الموقع', desc: 'بالنسبة للمصنّعين، غالبًا ما يكمن 70-90% من البصمة في المواد المشتراة والخدمات اللوجستية — غير مرئية حتى تُرسم السلسلة كاملة.' },
      { title: 'قواعد العناية الواجبة تنتشر في الاتحاد الأوروبي', desc: 'تتطلب لائحة CSRD والعناية الواجبة في سلسلة التوريد بشكل متزايد من المشترين توثيق انبعاثات المورّدين ومخاطر حقوق الإنسان معًا.' },
    ],
    heroHighlights: ['جميع فئات بروتوكول GHG الـ15', 'تغطية كاملة لسلسلة القيمة', 'حتى أول خريطة نقاط ساخنة'],
    methodologyStandard: 'معيار بروتوكول GHG للنطاق 3 · الفئات الـ15 كاملة',
    methodologySteps: [
      'تخطيط وتصنيف المورّدين حسب الإنفاق وأثر الانبعاثات',
      'حملة جمع بيانات منظّمة عبر كبار مورّديكم',
      'حساب النطاق 3 فئة بفئة وفق منهجية بروتوكول GHG',
      'ترتيب النقاط الساخنة وخارطة طريق خفض ذات أولويات',
    ],
    gains: [
      'رؤية كاملة للنطاق 3 بدلًا من تقديرات متوسط القطاع',
      'برنامج إشراك مورّدين يحسّن جودة البيانات عامًا بعد عام',
      'فرص خفض مرتّبة حسب التأثير الفعلي، لا التخمين',
      'مخرجات جاهزة لكل دفعة وشحنة لتدقيقات التوريد الأخضر لدى المشترين الأوروبيين',
    ],
    timeToReady: 'أول خريطة نقاط ساخنة خلال أسبوعين من انطلاق جمع بيانات المورّدين؛ جرد كامل للفئات الـ15 خلال 6-8 أسابيع.',
    clients: [
      { type: 'المنسوجات والجلود', desc: 'تحت ضغط المشترين للإبلاغ عن النطاق 3 عبر سلاسل توريد متعددة المستويات' },
      { type: 'الأغذية والصناعات الزراعية', desc: 'ترسم انبعاثات المنبع الزراعية والتغليف' },
      { type: 'التصنيع', desc: 'تنسّق بيانات الانبعاثات عبر شبكات موردين كبيرة' },
      { type: 'الإلكترونيات والسيارات', desc: 'توثّق الانبعاثات على مستوى المكوّن لبطاقات أداء الموردين لدى الشركات المصنّعة الأصلية' },
      { type: 'منتجو التغليف', desc: 'يوفّرون بيانات كثافة المواد الموثّقة لعملائهم أصحاب العلامات' },
      { type: 'التجارة الإلكترونية والتوصيل', desc: 'ترسم انبعاثات التوصيل للميل الأخير والتغليف عبر شبكة لوجستية مجزّأة' },
    ],
  },
  'simulation-lab': {
    title: 'مختبر المحاكاة',
    subtitle: 'سيناريوهات افتراضية · نتائج فورية',
    description:
      'مختبر المحاكاة هو محرّك النمذجة الافتراضية من فوتوكارب — توأم رقمي قائم على الفيزياء لعمليتك يتيح لك اختبار التغييرات التشغيلية قبل التزام دينار واحد من الإنفاق الرأسمالي. اسأل «ماذا لو غيّرنا وقود الفرن؟» أو «ماذا لو كهربنا هذا الخط؟» واحصل على أثر الكربون والتكلفة والامتثال جنبًا إلى جنب، لا في ثلاثة جداول بيانات منفصلة. ويعتمد على البيانات التشغيلية نفسها التي تقوم عليها بصمتك الكربونية، فكل سيناريو مبنيّ على خط أساسك الحقيقي، لا على متوسطات الصناعة. سواء كنت تزن استثمار كفاءة مؤهّلًا لدعم صندوق الانتقال الطاقي، أو تحويل وقود قبل إقرار CBAM القادم، أو قرار إنفاق رأسمالي تحت مراقبة مجلس الإدارة، يحوّل مختبر المحاكاة «نعتقد أن هذا سيفيد» إلى حالة عمل مرتّبة وقابلة للدفاع عنها — في أقل من 30 ثانية، مع مقارنات مجانية غير محدودة.',
    statLabel: 'محاكاة سيناريو كاملة',
    valueProp: 'اختبر استراتيجيات الخفض قبل أن تستثمر',
    industries: ['أي صناعة تونسية', 'الصناعات التحويلية', 'المنشآت كثيفة الطاقة', 'صناعات المعالجة', 'الإسمنت', 'الصلب', 'المنسوجات', 'الصناعات الغذائية'],
    capabilities: [
      { title: 'نمذجة افتراضية فورية', desc: 'اختبر تغييرات العملية أو الوقود أو الكفاءة قبل التزام رأس المال' },
      { title: 'التكلفة + الكربون + الامتثال', desc: 'كل سيناريو يُقيَّم عبر الأبعاد الثلاثة دفعةً واحدة' },
      { title: 'سيناريوهات مجانية غير محدودة', desc: 'قارن أكبر عدد تحتاجه من الخيارات قبل القرار' },
    ],
    whyItMatters: [
      { title: 'يتجنّب مخاطر الأصول العالقة', desc: 'رأس مال يُلتزم به بناءً على رؤية ناقصة — أسعار وقود متغيّرة، قواعد كربون تتشدّد — قد يحوّل استثمارًا "أخضر" إلى خسارة خلال سنوات قليلة.' },
      { title: 'التمويل غالبًا ما يتطلب دراسة منمذجة مسبقًا', desc: 'ملفات دعم صندوق الانتقال الطاقي والعناية الواجبة لدى المُقرضين الخُضر تتوقع كلاهما مقارنة كمية قبل/بعد، لا تقديرًا شفهيًا.' },
      { title: 'يحلّ محل أسابيع من الدراسات المنفصلة', desc: 'ما كان يعني سابقًا تكليف دراسات منفصلة للتكلفة والكربون والامتثال يتم الآن في محاكاة واحدة في أقل من 30 ثانية.' },
      { title: 'يحوّل الحدس إلى حالة عمل قابلة للدفاع', desc: 'مقارنة مرتّبة ومبنية على البيانات تصمد أمام مراجعات مجلس الإدارة بخلاف "نعتقد أن هذا سيفيد".' },
    ],
    heroHighlights: ['محاكاة سيناريو كاملة', 'سيناريوهات افتراضية مجانية', 'كربون · تكلفة · امتثال'],
    methodologyStandard: 'توأم رقمي قائم على الفيزياء · نماذج هندسة العمليات',
    methodologySteps: [
      'نموذج خط أساس مبني من بياناتكم التشغيلية الحية',
      'مكتبة سيناريوهات مُهيَّأة وفق عمليتكم المحددة — تحويل وقود، ترقية رأسمالية، تحسين كفاءة',
      'محاكاة فورية عبر أبعاد الكربون والتكلفة والامتثال',
      'توصيات مرتّبة حسب فترة الاسترداد والأثر الإجمالي',
    ],
    gains: [
      'اختبروا قرارات الإنفاق الرأسمالي قبل الالتزام بالميزانية',
      'شاهدوا أثر الكربون والتكلفة والامتثال جنبًا إلى جنب، لا في جداول منفصلة',
      'مقارنات سيناريوهات مجانية غير محدودة دون تكلفة إضافية',
      'تجنّب مخاطر الأصول العالقة الناتجة عن قرارات مبنية على بيانات ناقصة',
    ],
    timeToReady: 'أول نتائج سيناريو في أقل من 30 ثانية؛ يُعاير نموذج خط الأساس الكامل خلال أسبوع من ربط البيانات.',
    clients: [
      { type: 'الإسمنت والفوسفات', desc: 'يقيّمون تحويل الوقود أو ترقيات الكفاءة قبل الالتزام برأس المال' },
      { type: 'منتجو الصلب', desc: 'يخطّطون خرائط طريق إزالة كربون متعددة السنوات عبر مسارات العملية' },
      { type: 'مصنّعو المنسوجات', desc: 'يُنمذجون سيناريوهات طاقة الصباغة والتشطيب مقابل أهداف الامتثال' },
      { type: 'مصنّعو الأغذية', desc: 'يقارنون ترقيات التبريد والمعالجة الحرارية قبل ملف ANME' },
      { type: 'المجموعات متعددة المواقع', desc: 'يرتّبون استثمارات الكفاءة عبر المنشآت حسب فترة الاسترداد والأثر' },
    ],
  },
  lca: {
    title: 'تقييم دورة الحياة',
    subtitle: 'ISO 14040 · ISO 14067 · البصمة الكربونية للمنتج',
    description:
      'تحليل معتمد للبصمة الكربونية للمنتج من استخراج المواد الخام إلى بوابة المصنع — أو من المهد إلى اللحد كاملًا. تتبع وحدة LCA من فوتوكارب منهجية ISO 14040/14044 و14067، منتجةً بطاقات كربون موثّقة تفتح تسعيرًا مميزًا في الأسواق الأوروبية وتؤهّل المنتجات لبرامج الشراء منخفض الكربون.',
    statLabel: 'بصمة كربونية معتمدة للمنتج',
    valueProp: 'بصمات كربونية للمنتج موثّقة وفق ISO 14067',
    industries: ['مستحضرات التجميل والعناية الشخصية', 'الأغذية والمشروبات', 'الأدوية', 'المنسوجات والجلود', 'مواد البناء', 'التغليف', 'الصناعات الزراعية', 'الإلكترونيات والأجهزة الكهربائية'],
    capabilities: [
      { title: 'معتمد ISO 14040 / 14067', desc: 'منهجية بصمة منتج معترف بها دوليًا' },
      { title: 'من المهد إلى البوابة أو اللحد', desc: 'اختر الحدود التي تطابق متطلب مشتريك' },
      { title: 'بطاقات كربون موثّقة', desc: 'تفتح تسعيرًا مميزًا وأهلية الشراء الأخضر' },
    ],
    whyItMatters: [
      { title: 'الوصول إلى السوق الأوروبية', desc: 'تطلب حصة متزايدة من تجار التجزئة والمشترين الصناعيين الأوروبيين الآن بصمة كربونية معتمدة لكل منتج قبل حتى إدراج المورّد أو الموافقة عليه — دون PCF، لا مكان على الرف.' },
      { title: 'شهادة ESG لمشتريكم ومدققيكم', desc: 'عندما يدّعي تقرير ESG لعميلكم بصمة سلسلة توريد، يحتاج رقمكم على مستوى المنتج لدعمه — تقييم دورة الحياة هو الدليل خلف شهادته، لا شهادتكم فقط.' },
      { title: 'البصمة الكربونية للمنتج (PCF) عند الطلب', desc: 'يطلب تجار التجزئة وأصحاب العلامات وجواز المنتج الرقمي الأوروبي القادم بشكل متزايد بصمة PCF محدّدة ومعتمدة لكل منتج — لا تقديرًا، ولا متوسط قطاع.' },
      { title: 'يفتح التمويل الاستثماري والأخضر', desc: 'تُقيّم السندات الخضراء والقروض المرتبطة بالاستدامة والمستثمرون ذوو الأثر الصفقات وفق بيانات موثّقة على مستوى المنتج — تقييم دورة حياة معتمد غالبًا شرط مسبق لشروط تمويل تفضيلية.' },
      { title: 'ادّعاء قابل للدفاع، لا مخاطرة غسل أخضر', desc: 'إن سوّقتم منتجًا كـ"منخفض الكربون" أو "صديق للبيئة"، تطلب لائحة الادعاءات الخضراء الأوروبية دليلًا وراءه — شهادة ISO 14067 هي ذلك الدليل.' },
    ],
    heroHighlights: ['بصمة منتج معتمدة', 'خيار الحدود الكامل', 'حتى التقرير المعتمد'],
    methodologyStandard: 'ISO 14040 / 14044 · ISO 14067',
    methodologySteps: [
      'تحديد الوحدة الوظيفية وحدود النظام',
      'جمع بيانات جرد دورة الحياة عبر المواد الخام والعملية واللوجستيات',
      'تقييم الأثر محسوبًا وفق منهجية ISO 14067',
      'تحقق من طرف ثالث وإصدار بطاقة كربون معتمدة',
    ],
    gains: [
      'بطاقات كربون موثّقة تفتح تسعيرًا مميزًا في أسواق الاتحاد الأوروبي',
      'التأهّل لبرامج الشراء الأخضر ومنخفض الكربون',
      'اختيار الحدود من المهد إلى البوابة أو إلى اللحد لمطابقة متطلب مشتريكم',
      'منهجية قابلة للدفاع عنها وجاهزة للتدقيق إن اعترض مشترٍ على ادعائكم',
    ],
    timeToReady: 'بصمة استرشادية خلال دقائق عبر المُقدِّر؛ تقرير ISO 14067 معتمد عادة خلال 3-4 أسابيع.',
    clients: [
      { type: 'مستحضرات التجميل والعناية الشخصية', desc: 'تدعم ادعاءات "الجمال النظيف" ومنخفض الكربون ببصمة منتج معتمدة' },
      { type: 'الأغذية والمشروبات', desc: 'بحاجة لبطاقات كربون موثّقة لكل منتج لشركاء التجزئة الأوروبيين' },
      { type: 'الأدوية', desc: 'توثّق انبعاثات المكوّنات الفعّالة والتغليف لمناقصات المشتريات' },
      { type: 'المنسوجات والجلود', desc: 'تبيع ضمن برامج الشراء الأخضر ومنخفض الكربون للاتحاد الأوروبي' },
      { type: 'مواد البناء', desc: 'تؤهّل منتجاتها لبرامج شهادات البناء الأخضر' },
      { type: 'التغليف والصناعات الزراعية', desc: 'تثبت بصماتها المادية والعملياتية حتى مستوى المنتج الواحد' },
    ],
  },
  'ai-reports': {
    title: 'التقارير',
    subtitle: 'جاهزة خلال 48 ساعة · عربي + فرنسي + إنجليزي',
    description:
      'يطلب كل إطار تنظيمي البيانات الأساسية نفسها، بصيغة مختلفة فقط — إقرار CBAM الفصلي، وإفصاح IFRS S2 المناخي، وجرد ISO 14064، وردّ CDP، وإحاطة ESG لمجلس الإدارة، كلها تعتمد على مجموعة البيانات الكربونية الموثّقة نفسها. تُنشئ محرّك التقارير من فوتوكارب كل واحد منها تلقائيًا، وفق الجدول أو عند الطلب، بدلًا من أن يُعيد فريقك إدخال الأرقام نفسها في قالب مختلف في كل مرة. وكل تقرير جاهز للتدقيق عند التسليم، مع توثيق كامل لمنهجية الحساب وسلسلة أدلة مقاومة للتلاعب تعود إلى البيانات المصدر. متاحة بالعربية والفرنسية والإنجليزية، لأن التقرير الذي يعمل بلغة واحدة فقط غير مكتمل — نادرًا ما يقرأ مجلس إدارتك وجهتك التنظيمية ومكتب الجمارك الأوروبي التقرير نفسه.',
    statLabel: 'من البيانات الخام إلى التقرير المُقدَّم',
    valueProp: 'أي تقرير امتثال خلال 48 ساعة',
    industries: ['أي صناعة تونسية', 'متعدد المواقع', 'المصدّرون', 'الشركات المدرجة', 'المؤسسات المالية', 'المجموعات الصناعية'],
    capabilities: [
      { title: 'بيانات واحدة، كل التقارير', desc: 'CBAM وIFRS S2 وISO 14064 من مصدر واحد' },
      { title: 'عربي وفرنسي وإنجليزي', desc: 'كل تقرير يُنشأ باللغة التي يحتاجها المعنيّ' },
      { title: 'إنجاز خلال 48 ساعة', desc: 'وفق الجدول أو عند الطلب، جاهز للتدقيق دائمًا عند التسليم' },
    ],
    whyItMatters: [
      { title: 'يوقف إعادة إدخال الأرقام نفسها', desc: 'يطلب كل إطار البيانات الأساسية نفسها بقالب مختلف — مجموعة بيانات واحدة تُنشئ كل تقرير تلغي إعادة الإدخال اليدوي المُسبِّب للأخطاء.' },
      { title: 'يحميك إن طُعن في تقرير', desc: 'سلسلة أدلة مقاومة للتلاعب تعود إلى البيانات المصدر تعني أنه بإمكانك الدفاع عن أي رقم إن شكّك فيه لاحقًا مدقق أو منظّم أو مشترٍ.' },
      { title: 'يزيل عائق الترجمة', desc: 'يخسر المشغّلون متعددو الأسواق أيامًا بانتظار إفصاحات مترجمة — التوليد الثلاثي اللغة يعني حصول مجلس إدارتكم وجهتكم التنظيمية ومكتب جماركم على نسختهم في آن واحد.' },
      { title: 'جاهز دائمًا لطلب مفاجئ', desc: 'التوليد عند الطلب يعني أن طلب عناية واجبة غير مخطط له أو استبيان مشترٍ لن يتحوّل إلى أسبوع من الاستعجال.' },
    ],
    heroHighlights: ['من البيانات الخام إلى التقرير المُقدَّم', 'مخرجات ثلاثية اللغة', 'تُشغّل كل تقرير تنظيمي'],
    methodologyStandard: 'توليد آلي متعدد الأطر · CBAM وIFRS S2 وISO 14064',
    methodologySteps: [
      'اتصل مرة واحدة بمجموعة بياناتك الكربونية الحية',
      'اختر نوع التقرير والجهة القضائية التي تحتاجها',
      'يصوغ الذكاء الاصطناعي التقرير مع توثيق كامل لمنهجية الحساب',
      'مراجعة بشرية واعتماد مقاوم للتلاعب قبل التسليم',
    ],
    gains: [
      'مجموعة بيانات واحدة تُشغّل كل تقرير تنظيمي تحتاجه، دون إعادة إدخال',
      'إنجاز خلال 48 ساعة، وفق الجدول أو عند الطلب',
      'كل تقرير جاهز للتدقيق عند التسليم مع مسار حساب كامل',
      'متاح بالعربية والفرنسية والإنجليزية',
    ],
    timeToReady: 'يُولَّد أول تقرير خلال 48 ساعة بعد ربط مجموعة البيانات؛ وتُؤتمت التقارير المتكررة بالكامل لاحقًا.',
    clients: [
      { type: 'المصدّرون متعددو المواقع', desc: 'يوازنون عدة أنظمة تنظيمية عبر مواقع في آن واحد' },
      { type: 'فرق الامتثال', desc: 'أنهكها إعادة إعداد تقارير مشابهة يدويًا كل فصل' },
      { type: 'كل القطاعات', desc: 'أي جهة تشغيل بحاجة لتقارير جاهزة للتدقيق دون فريق مخصص' },
      { type: 'المؤسسات المالية', desc: 'تُنشئ إفصاحات مناخية على مستوى المحفظة عبر مقترضين عديدين' },
      { type: 'الشركات المدرجة والمُقبلة على الإدراج', desc: 'تلتزم بمواعيد إبلاغ مجلس الإدارة والجهات التنظيمية دون تأخير' },
    ],
  },
  'anme-compliance': {
    title: 'الامتثال لـ ANME ودعم صندوق الانتقال الطاقي',
    subtitle: 'القانون عدد 2009-7 · الفصل 7، الأمر عدد 2017-983 · كل القطاعات',
    description:
      'ينطبق قانون التدقيق الطاقي الإلزامي في تونس على أي منشأة تستهلك 800 طن مكافئ نفط أو أكثر سنويًا — لا المصدّرين فقط. تُعِدّ فوتوكارب بيانات خط الأساس وملف الاستثمار التي يحتاجها مدققك المُسجَّل لدى ANME وملف دعم صندوق الانتقال الطاقي معًا، فيصبح التدقيق الذي أنت ملزَم به قانونًا مصدر تمويل لا مجرد غرامة.',
    statLabel: 'الحد الأقصى للغرامة عند عدم الامتثال، تم تجنّبه',
    valueProp: 'حوّل التزامًا قانونيًا إلى ترقية كفاءة مموَّلة',
    industries: ['أي منشأة كثيفة الطاقة', 'الصناعات التحويلية', 'الصناعات الغذائية', 'الضيافة والخدمات', 'المنسوجات', 'الكيماويات', 'الإسمنت ومواد البناء', 'التبريد واللوجستيات'],
    capabilities: [
      { title: 'تتبّع عتبة 800 طن مكافئ نفط', desc: 'اعرف بالضبط متى تتجاوز منشأتك عتبة التدقيق الإلزامي، قطاعًا بقطاع' },
      { title: 'خط أساس جاهز للمدقق', desc: 'بيانات استهلاك وعملية مُعدَّة لمدققك المُسجَّل لدى ANME — ندعم التدقيق، ولا نحلّ محل المدقق المُرخَّص' },
      { title: 'ملف دعم صندوق الانتقال الطاقي', desc: 'ملف استثمار مُنمذج لدعم الفصل 7 — 70% من تكلفة التدقيق، و20% من الترقية الناتجة' },
    ],
    whyItMatters: [
      { title: 'إنه القانون فوق 800 طن مكافئ نفط سنويًا', desc: 'تواجه المنشآت التي تتجاوز العتبة غرامة 20,000-50,000 دينار عند تفويت التدقيق الإلزامي — هذا التزام قانوني، لا شهادة اختيارية.' },
      { title: 'يحوّل تكلفة إلى استثمار مموَّل', desc: 'يغطي دعم صندوق الانتقال الطاقي بموجب الفصل 7 نسبة 70% من تكلفة التدقيق وعادةً 20% من استثمار الكفاءة الناتج — لا تطالب معظم المنشآت به لأن الملف يُعَدّ بشكل غير صحيح.' },
      { title: 'يغذّي بصمتكم الكربونية مباشرة', desc: 'مكاسب كفاءة الطاقة الناتجة عن التدقيق تخفّض انبعاثاتكم من النطاقين 1 و2، وهي البيانات نفسها التي تعتمد عليها بصمتكم الكربونية وإقرارات CBAM.' },
      { title: 'تكاليف الطاقة ترتفع بغضّ النظر عن الامتثال', desc: 'إلى جانب تجنّب الغرامة، تموّل تدابير الكفاءة المحدَّدة نفسها عادةً عبر خفض فواتير الطاقة خلال 1-3 سنوات.' },
    ],
    heroHighlights: ['الحد الأقصى للغرامة، تم تجنّبه', 'من تكلفة التدقيق مدعومة عبر الصندوق', 'دعم استثماري معتاد'],
    calculatorMetric: {
      fieldLabel: 'التكلفة التقديرية للتدقيق الطاقي (دينار تونسي)',
      placeholder: 'مثال: 12000',
      resultLabel: 'دعم صندوق الانتقال الطاقي التقديري للتدقيق',
      assumption: 'استرشادي فقط — يتم تأكيد الدعم النهائي من قِبل ANME بعد مراجعة فنية لكل حالة.',
    },
    methodologyStandard: 'القانون عدد 2009-7 · الأمر عدد 2009-362 · الأمر عدد 2017-983 (الفصل 7)',
    methodologySteps: [
      'خط أساس استهلاك الطاقة مبني من فواتير الطاقة وبيانات الإنتاج لديكم',
      'التحقق من العتبة مقابل مُحفّز التدقيق الإلزامي 800 طن مكافئ نفط/سنويًا',
      'حزمة بيانات مُعدَّة لمدقق الطاقة المُسجَّل لدى ANME الخاص بكم',
      'دراسة استثمار مُنمذجة لملف دعم صندوق الانتقال الطاقي، تُقدَّم مع تقرير التدقيق',
    ],
    gains: [
      'إجابة واضحة عمّا إذا كانت منشأتكم ملزَمة قانونًا بالتدقيق — ومتى',
      'تجنّب غرامة عدم الامتثال البالغة 20,000-50,000 دينار بالكامل',
      'ترقية كفاءة مموَّلة بدلًا من مجرد تكلفة امتثال',
      'مجموعة بيانات واحدة تغذّي أيضًا تقارير CBAM وIFRS S2 والبصمة الكربونية لديكم',
    ],
    timeToReady: 'تقييم العتبة وبيانات خط الأساس جاهزة خلال 5 أيام عمل؛ حزمة كاملة جاهزة للمدقق خلال 2-3 أسابيع.',
    clients: [
      { type: 'أي منشأة كثيفة الطاقة', desc: 'التصنيع، الصناعات الغذائية، الكيماويات أو الصناعات ذات العمليات القريبة من عتبة 800 طن مكافئ نفط' },
      { type: 'المجموعات متعددة المواقع', desc: 'تتبّع التزامات التدقيق وأهلية صندوق الانتقال الطاقي عبر عدة منشآت في آن واحد' },
      { type: 'المتقدمون لأول مرة', desc: 'يواجهون أول تدقيق إلزامي لهم ويريدون احتساب دعم صندوق الانتقال الطاقي بشكل صحيح' },
      { type: 'التبريد واللوجستيات', desc: 'عمليات كثيفة التبريد بكثافة طاقة عالية وسهلة التدقيق' },
      { type: 'مصانع المنسوجات والإسمنت', desc: 'منشآت كثيفة الحرارة الصناعية بأعلى إمكانات دعم كفاءة' },
    ],
  },
}

export const SERVICE_DELIVERY_STEPS_AR = [
  'التقييم وتحديد النطاق',
  'جمع البيانات وتكاملها',
  'التحليل والتحسين',
  'تسليم التقرير خلال 48 ساعة',
]

export const SERVICE_DELIVERY_STEPS_FR = [
  'Évaluation et cadrage',
  'Collecte et intégration des données',
  'Analyse et optimisation',
  'Livraison du rapport en 48 heures',
]

const SERVICES_FR: Record<string, ServiceAr> = {
  'bilan-carbone': {
    title: 'Bilan Carbone',
    subtitle: 'Scope 1 · Scope 2 · Scope 3 · GHG Protocol',
    description:
      "Le bilan carbone est le bilan carbone complet de votre entreprise — un inventaire certifié de chaque tonne de CO₂e dont vos opérations sont responsables, réparti en trois scopes reconnus internationalement : le Scope 1 (émissions directes des combustibles et procédés que vous contrôlez), le Scope 2 (émissions de l'électricité et de l'énergie que vous achetez), et le Scope 3 (tout ce qui est en amont et en aval de votre chaîne d'approvisionnement). C'est le document fondateur unique sur lequel s'appuient toutes les autres exigences de conformité — vos déclarations MACF, vos divulgations IFRS S2, votre référence d'audit énergétique ANME, et tout financement ou appel d'offres demandant des données d'émissions vérifiées partent du même bilan carbone. Photocarb calcule le vôtre à partir de données opérationnelles réelles — registres ERP, factures d'énergie, journaux de production — construit sur la méthodologie GHG Protocol et aligné sur ISO 14064, livré comme inventaire certifié en 48 heures. Aucun matériel à installer, aucun capteur à calibrer — juste les données que vous avez déjà, structurées en un chiffre que votre auditeur acceptera.",
    statLabel: 'Précision des données vs référence d\'audit manuel',
    valueProp: 'Votre bilan carbone complet en 48 heures',
    industries: ['Toute industrie tunisienne', 'Industrie manufacturière', 'Installations à forte intensité énergétique', 'Exportateurs', 'Textile et cuir', 'Agroalimentaire', 'Produits chimiques', 'Matériaux de construction'],
    capabilities: [
      { title: 'Registre des Scopes 1-2-3', desc: 'Comptabilité complète GHG Protocol à partir de données opérationnelles réelles' },
      { title: 'Aligné ISO 14064', desc: 'Méthodologie certifiée acceptée par les auditeurs et régulateurs' },
      { title: 'Prêt pour MACF / IFRS', desc: 'Un inventaire alimente toutes les soumissions réglementaires dont vous avez besoin' },
    ],
    whyItMatters: [
      { title: 'Le socle dont dépend chaque autre déclaration', desc: 'Vos déclarations MACF, vos divulgations IFRS S2 et votre référence d\'audit ANME s\'appuient toutes sur le même bilan carbone — construisez-le correctement une fois plutôt que de le refaire à chaque exigence.' },
      { title: 'Acheteurs et prêteurs le demandent désormais en amont', desc: 'Clients européens, banques et agences de crédit export exigent de plus en plus un inventaire Scope 1-2-3 vérifié avant de signer un contrat ou de débloquer un financement.' },
      { title: 'Identifiez vos leviers les plus importants avant de dépenser', desc: 'Voyez précisément quels sites, machines ou combustibles pèsent le plus dans votre empreinte avant d\'engager du capex sur une amélioration d\'efficacité.' },
      { title: 'Une exposition légale qui s\'accroît', desc: 'La loi tunisienne sur l\'audit énergétique et les règles carbone européennes reposent toutes deux sur une référence documentée — une piste prête pour l\'audit vous protège si l\'une ou l\'autre est contestée.' },
    ],
    heroHighlights: ['Précision vs audit manuel', 'Couverture complète GHG Protocol', 'Premier inventaire certifié'],
    methodologyStandard: 'Norme GHG Protocol Corporate · ISO 14064-1',
    methodologySteps: [
      "Atelier de définition du périmètre et du champ d'application avec votre équipe opérationnelle",
      "Collecte de données d'activité sur les Scopes 1, 2 et 3 — depuis l'ERP, les factures d'énergie et les registres de production",
      "Cartographie des facteurs d'émission et calcul selon la méthodologie GHG Protocol",
      "Inventaire certifié livré avec une piste d'audit complète, prêt pour un examen par un tiers",
    ],
    gains: [
      'Un chiffre certifié unique que vos auditeurs, régulateurs et acheteurs acceptent tous',
      'Une visibilité claire sur les sites ou activités qui pèsent le plus dans votre empreinte',
      'Un inventaire préformaté pour les soumissions MACF et IFRS S2',
      '94 % de précision des données par rapport aux audits manuels sur tableur',
    ],
    timeToReady: "Premier inventaire certifié livré en 48 heures une fois les données opérationnelles connectées ; déploiement complet multi-sites généralement en 2 à 3 semaines.",
    clients: [
      { type: 'Ciment et phosphates', desc: "Construisent leur premier inventaire carbone de niveau réglementaire avant l'entrée en application du MACF" },
      { type: 'Acier et textile', desc: 'Rapportent des données Scope 1+2 à des acheteurs ou prêteurs européens selon un calendrier fixe' },
      { type: 'Fabricants', desc: "Consolident des données d'émissions multi-sites en une seule source auditable" },
      { type: 'Agroalimentaire', desc: 'Établissent une référence avant que les acheteurs de détail ne demandent des données carbone' },
      { type: 'Producteurs de matériaux de construction', desc: 'Documentent l\'intensité des émissions pour les appels d\'offres verts et export' },
    ],
  },
  'esg-reports': {
    title: 'ESG et durabilité',
    subtitle: 'IFRS S1/S2 · GRI · CDP · Arabe + Français + Anglais',
    description:
      "Rapports ESG et de durabilité générés automatiquement — prêts pour le conseil d'administration, à l'épreuve des audits, livrés en 48 heures. Photocarb construit votre divulgation climatique IFRS S2, votre rapport de durabilité annuel, votre soumission CDP et votre dossier de données de niveau investisseur à partir de vos données carbone en direct. Disponible en arabe, français et anglais, avec une piste d'audit inviolable incluse.",
    statLabel: 'Livraison complète du rapport ESG',
    valueProp: 'Rapports ESG conformes IFRS S2 en 48 heures',
    industries: ['Exportateurs', 'Industrie manufacturière', 'Textile et cuir', 'Agroalimentaire', 'Services financiers', 'Sociétés cotées', 'Tourisme et hôtellerie', 'Distribution et grande consommation', 'Startups', 'Assurances et banques', 'Incubateurs et accélérateurs'],
    capabilities: [
      { title: 'Divulgation climatique IFRS S2', desc: 'Tableaux de matérialité et analyse de scénarios générés automatiquement' },
      { title: 'Arabe, français et anglais', desc: "Rapports prêts pour le conseil d'administration en trois langues, sans délai de traduction" },
      { title: 'Piste inviolable', desc: 'Chaque divulgation traçable jusqu\'à sa donnée source' },
    ],
    whyItMatters: [
      { title: 'Les investisseurs vous évaluent avant d\'engager du capital', desc: 'La diligence raisonnable ESG est désormais une pratique standard pour le capital-investissement, les banques de développement et les agences de crédit export actives en Tunisie.' },
      { title: 'Les marques européennes l\'exigent pour continuer à acheter chez vous', desc: 'La divulgation ESG fournisseur devient une condition contractuelle pour les exportateurs vendant dans les chaînes de distribution et industrielles européennes.' },
      { title: 'IFRS S2 dépasse désormais les sociétés cotées', desc: 'Prêteurs et grands acheteurs demandent désormais une divulgation alignée IFRS S2 même à des fournisseurs privés, dans le cadre de leur propre chaîne de reporting.' },
      { title: 'Un rapport crédible fait gagner des appels d\'offres', desc: 'Un rapport ESG trilingue et prêt pour le conseil d\'administration vous différencie sur les marchés export et les appels d\'offres publics où la notation durabilité compte.' },
    ],
    heroHighlights: ['Livraison complète du rapport ESG', 'Prêt pour la divulgation climatique', 'Sortie trilingue'],
    methodologyStandard: 'IFRS S1/S2 · Normes GRI · Cadre CDP',
    methodologySteps: [
      'Évaluation de matérialité alignée sur les exigences climatiques IFRS S2',
      'Agrégation des données à partir de flux carbone et opérationnels en direct',
      'Rédaction automatique du récit de divulgation, des tableaux et de l\'analyse de scénarios',
      "Cycle de revue par le conseil d'administration avec une piste d'audit inviolable sur chaque chiffre",
    ],
    gains: [
      "Un reporting ESG prêt pour le conseil d'administration sans constituer une équipe de durabilité de six personnes",
      'Des divulgations trilingues — arabe, français et anglais — sans aucun délai de traduction',
      'Chaque affirmation traçable jusqu\'à une donnée source',
      "Un dossier de données de niveau investisseur prêt pour le CDP ou la diligence raisonnable des prêteurs",
    ],
    timeToReady: "Rapport complet rédigé en 48 heures ; prêt pour le conseil d'administration après un seul cycle de révision.",
    clients: [
      { type: "Exportateurs tournés vers l'UE", desc: 'Gèrent leurs obligations de divulgation annuelle envers acheteurs et prêteurs' },
      { type: 'Groupes industriels', desc: "Consolident les données ESG sur plusieurs sites et unités d'affaires" },
      { type: 'Producteurs textile et agroalimentaire', desc: 'Sous pression de diligence raisonnable ESG de marques ou d\'investisseurs' },
      { type: 'Institutions financières', desc: 'Répondent aux exigences de divulgation climatique au niveau du portefeuille' },
      { type: 'Groupes touristiques et hôteliers', desc: 'Répondent aux questionnaires ESG des plateformes de réservation et investisseurs' },
      { type: 'Startups et scale-ups', desc: 'Construisent leurs preuves ESG tôt pour satisfaire la diligence raisonnable des investisseurs au prochain tour de financement' },
      { type: 'Assurances et banques', desc: "Rapportent l'exposition climatique de leur portefeuille et de leurs souscriptions aux régulateurs et réassureurs" },
      { type: 'Incubateurs et accélérateurs', desc: 'Équipent leurs startups des rapports ESG exigés par leurs investisseurs et bailleurs' },
    ],
  },
  cbam: {
    title: 'Conformité MACF',
    subtitle: "Règlement UE 2023/956 · Déclarations trimestrielles",
    description:
      "Automatisation complète des déclarations MACF pour les exportateurs tunisiens. Photocarb calcule le carbone incorporé réel dans vos biens exportés et génère automatiquement des déclarations au format de l'UE. L'utilisation de valeurs mesurées réelles au lieu des taux par défaut de l'UE permet à la plupart des clients d'économiser 30 à 65 % sur leur responsabilité MACF.",
    statLabel: 'Réduction typique de la responsabilité MACF',
    valueProp: 'Déclarations MACF prêtes avant votre prochaine expédition',
    industries: ['Acier', 'Ciment', 'Phosphates et engrais', 'Aluminium', 'Hydrogène et précurseurs chimiques', 'Production d\'électricité'],
    capabilities: [
      { title: 'XML au format TAXUD de l\'UE', desc: "Déclarations générées dans le format exact attendu par les douanes de l'UE" },
      { title: 'Taux réels vs par défaut', desc: 'Les données d\'intensité mesurées remplacent les hypothèses par défaut punitives' },
      { title: 'Automatisation trimestrielle', desc: "Déclarations préparées et déposées selon le calendrier de reporting de l'UE" },
    ],
    whyItMatters: [
      { title: 'C\'est obligatoire, pas optionnel', desc: "Tout bien couvert par le MACF entrant dans l'UE nécessite une déclaration trimestrielle — les expéditions sans déclaration risquent d'être bloquées ou pénalisées en douane." },
      { title: 'Les taux réels sont le principal levier sur votre facture', desc: "Les valeurs par défaut de l'UE sont volontairement fixées à un niveau punitif ; les remplacer par vos données de procédé mesurées est ce qui génère la réduction de 30 à 65 %." },
      { title: 'Les échéances manquées entraînent des pénalités', desc: 'Le calendrier de dépôt trimestriel est strict, et des déclarations répétées en retard ou incorrectes s\'escaladent en pénalités financières des douanes européennes.' },
      { title: 'La tarification carbone complète entre en vigueur dès 2026', desc: "L'achat de certificats MACF devient obligatoire à la fin de la période transitoire, transformant le carbone incorporé en poste direct de votre marge export." },
    ],
    heroHighlights: ['Réduction typique de la responsabilité', 'Déclarations UE automatisées', 'Format exact des douanes UE'],
    methodologyStandard: 'Règlement UE 2023/956 · Règlement d\'exécution MACF',
    methodologySteps: [
      'Classification des produits et codes NC par rapport à la liste des biens couverts par le MACF',
      'Calcul des émissions incorporées à partir de données de procédé mesurées, non par défaut',
      "Génération de déclarations XML au format TAXUD de l'UE",
      'Calendrier de dépôt trimestriel et support de soumission via votre agent déclarant',
    ],
    gains: [
      "Responsabilité MACF réduite de 30 à 65 % en remplaçant les valeurs par défaut de l'UE par votre intensité mesurée",
      'Zéro échéance de dépôt manquée grâce à la planification trimestrielle automatisée',
      "Déclarations dans le format XML exact attendu par les douanes de l'UE — sans reprise",
      "Piste de documentation complète en cas de demande de vérification des douanes de l'UE",
    ],
    timeToReady: 'Premier jeu de données prêt pour déclaration en 48 heures après connexion des données de production ; dépôts trimestriels automatisés ensuite.',
    clients: [
      { type: "Exportateurs d'acier et de ciment", desc: 'Expédient des biens couverts par le MACF vers l\'UE selon un cycle de déclaration trimestriel' },
      { type: 'Phosphates et engrais', desc: 'Exportations à forte teneur en carbone incorporé où les taux réels vs par défaut comptent le plus' },
      { type: 'Maisons de négoce', desc: 'Gèrent l\'exposition MACF sur plusieurs fournisseurs tunisiens à la fois' },
      { type: 'Transformateurs d\'aluminium', desc: 'Calculent les émissions incorporées à travers les étapes de fonderie et de coulée' },
      { type: 'Importateurs de référence dans l\'UE', desc: 'Ont besoin de données fournisseurs vérifiées pour déposer correctement leur propre déclaration MACF' },
    ],
  },
  'supply-chain': {
    title: "Carbone de la chaîne d'approvisionnement",
    subtitle: "Scope 3 · Amont + aval · Les 15 catégories",
    description:
      "Cartographiez l'empreinte carbone complète de votre chaîne d'approvisionnement. Photocarb collecte les données de vos principaux fournisseurs, calcule les 15 catégories du Scope 3, et identifie vos opportunités de réduction à plus fort impact — y compris des données fournisseurs par lot qui qualifient les usines de textile et de cuir pour les programmes d'approvisionnement vert des marques européennes.",
    statLabel: 'Les 15 catégories du GHG Protocol',
    valueProp: "Visibilité complète du Scope 3 sur votre chaîne d'approvisionnement",
    industries: ['Textile et cuir', 'Industrie manufacturière', 'Agroalimentaire', 'Ciment', 'Électronique', 'Composants automobiles', 'Emballage', 'Distribution et grande consommation', 'E-commerce'],
    capabilities: [
      { title: 'Collecte de données fournisseurs', desc: 'Collecte structurée auprès de vos principaux fournisseurs à grande échelle' },
      { title: 'Les 15 catégories du Scope 3', desc: 'Couverture complète amont et aval selon le GHG Protocol' },
      { title: 'Classement des points chauds', desc: "Opportunités de réduction classées par impact, pas par supposition" },
    ],
    whyItMatters: [
      { title: 'Les acheteurs européens exigent la visibilité Scope 3 dès maintenant', desc: 'Les grands acheteurs européens répercutent les exigences de reporting Scope 3 fournisseur sur toute leur chaîne de valeur, pas seulement sur les exportateurs directs.' },
      { title: 'Les programmes d\'approvisionnement vert paient des primes', desc: 'Des données fournisseurs vérifiées par lot sont ce qui qualifie les usines textile et cuir pour un approvisionnement vert de marque et une tarification préférentielle.' },
      { title: 'La majorité des émissions se cache en amont, pas sur site', desc: 'Pour les fabricants, 70 à 90 % de l\'empreinte se trouve souvent dans les matériaux achetés et la logistique — invisible tant que la chaîne complète n\'est pas cartographiée.' },
      { title: 'Les règles de diligence raisonnable se propagent dans l\'UE', desc: 'La CSRD et la réglementation sur le devoir de vigilance exigent de plus en plus des acheteurs qu\'ils documentent conjointement les émissions et les risques fournisseurs.' },
    ],
    heroHighlights: ['Les 15 catégories du GHG Protocol', 'Couverture complète de la chaîne de valeur', "Jusqu'à la première carte des points chauds"],
    methodologyStandard: 'Norme GHG Protocol Scope 3 · Les 15 catégories',
    methodologySteps: [
      "Cartographie et hiérarchisation des fournisseurs par dépense et impact d'émissions",
      'Campagne de collecte de données structurée auprès de vos principaux fournisseurs',
      'Calcul du Scope 3 catégorie par catégorie selon la méthodologie GHG Protocol',
      'Classement des points chauds et feuille de route de réduction priorisée',
    ],
    gains: [
      "Visibilité complète du Scope 3 au lieu d'estimations moyennes sectorielles",
      'Un programme d\'engagement fournisseurs qui améliore la qualité des données année après année',
      'Opportunités de réduction classées par impact réel, pas par supposition',
      "Résultats prêts à l'emploi par lot et par expédition pour les audits d'approvisionnement vert des acheteurs européens",
    ],
    timeToReady: 'Première carte des points chauds sous 2 semaines après le lancement de la collecte de données fournisseurs ; inventaire complet des 15 catégories sous 6 à 8 semaines.',
    clients: [
      { type: 'Textile et cuir', desc: 'Sous pression des acheteurs pour rapporter le Scope 3 sur des chaînes d\'approvisionnement multi-niveaux' },
      { type: 'Agroalimentaire', desc: "Cartographient les émissions agricoles et d'emballage en amont" },
      { type: 'Industrie manufacturière', desc: "Coordonnent les données d'émissions sur de grands réseaux de fournisseurs" },
      { type: 'Électronique et automobile', desc: 'Documentent les émissions au niveau composant pour les tableaux de bord fournisseurs OEM' },
      { type: 'Producteurs d\'emballage', desc: 'Fournissent des données d\'intensité matière vérifiées à leurs clients propriétaires de marque' },
      { type: 'E-commerce et logistique', desc: 'Cartographient les émissions de livraison du dernier kilomètre et d\'emballage sur un réseau logistique fragmenté' },
    ],
  },
  'simulation-lab': {
    title: 'Laboratoire de simulation',
    subtitle: 'Scénarios hypothétiques · Résultats instantanés',
    description:
      "Le Laboratoire de simulation est le moteur de modélisation hypothétique de Photocarb — un jumeau numérique basé sur la physique de votre procédé qui vous permet de tester des changements opérationnels avant d'engager le moindre dinar de dépense d'investissement. Demandez « et si nous changions le combustible du four ? » ou « et si nous électrifiions cette ligne ? » et obtenez l'impact carbone, coût et conformité côte à côte, pas dans trois tableurs séparés. Il s'appuie sur les mêmes données opérationnelles que votre bilan carbone, donc chaque scénario est ancré dans votre référence réelle, pas des moyennes sectorielles. Que vous évaluiez un investissement d'efficacité éligible à l'ANME, un changement de combustible avant votre prochaine déclaration MACF, ou une décision d'investissement sous surveillance du conseil, le Laboratoire de simulation transforme « nous pensons que cela aiderait » en un dossier d'affaires classé et défendable — en moins de 30 secondes, avec des comparaisons gratuites illimitées.",
    statLabel: 'Simulation de scénario complète',
    valueProp: "Testez vos stratégies de réduction avant d'investir",
    industries: ['Toute industrie tunisienne', 'Industrie manufacturière', 'Installations à forte intensité énergétique', 'Industries de procédé', 'Ciment', 'Acier', 'Textile', 'Agroalimentaire'],
    capabilities: [
      { title: 'Modélisation hypothétique instantanée', desc: "Testez les changements de procédé, de combustible ou d'efficacité avant d'engager du capex" },
      { title: 'Coût + carbone + conformité', desc: 'Chaque scénario évalué sur les trois dimensions à la fois' },
      { title: 'Scénarios gratuits illimités', desc: "Comparez autant d'options que nécessaire avant de décider" },
    ],
    whyItMatters: [
      { title: 'Évite le risque d\'actifs échoués', desc: 'Un capex engagé sur une vision incomplète — prix des combustibles qui bougent, règles carbone qui se durcissent — peut transformer un investissement "vert" en perte sèche en quelques années.' },
      { title: 'Le financement exige souvent un dossier modélisé au préalable', desc: 'Les dossiers de subvention ANME et la diligence raisonnable des prêteurs verts attendent tous deux une comparaison avant/après quantifiée, pas une estimation verbale.' },
      { title: 'Remplace des semaines d\'études séparées', desc: 'Ce qui exigeait autrefois de commander des études distinctes de coût, carbone et conformité s\'exécute désormais en une seule simulation en moins de 30 secondes.' },
      { title: 'Transforme l\'intuition en dossier défendable', desc: 'Une comparaison classée et fondée sur les données tient face à un conseil d\'administration, contrairement à un simple "nous pensons que cela aiderait".' },
    ],
    heroHighlights: ['Simulation de scénario complète', 'Scénarios hypothétiques gratuits', 'Carbone · coût · conformité'],
    methodologyStandard: 'Jumeau numérique basé sur la physique · Modèles d\'ingénierie des procédés',
    methodologySteps: [
      'Modèle de référence construit à partir de vos données opérationnelles en direct',
      "Bibliothèque de scénarios configurée selon votre procédé spécifique — changement de combustible, mise à niveau capex, amélioration d'efficacité",
      'Simulation instantanée selon les dimensions carbone, coût et conformité',
      'Recommandations classées par période de retour sur investissement et impact total',
    ],
    gains: [
      "Testez les décisions d'investissement avant d'engager le budget",
      'Visualisez l\'impact carbone, coût et conformité côte à côte, pas dans des tableurs séparés',
      'Comparaisons de scénarios gratuites et illimitées sans coût incrémental',
      "Évitez le risque d'actifs échoués lié à des décisions prises sur des données incomplètes",
    ],
    timeToReady: 'Premiers résultats de scénario en moins de 30 secondes ; modèle de référence complet calibré sous 1 semaine après connexion des données.',
    clients: [
      { type: 'Ciment et phosphates', desc: "Évaluent un changement de combustible ou des mises à niveau d'efficacité avant d'engager du capex" },
      { type: "Producteurs d'acier", desc: 'Planifient des feuilles de route de décarbonation pluriannuelles sur plusieurs filières de procédé' },
      { type: 'Fabricants textiles', desc: 'Modélisent des scénarios énergétiques de teinture et de finition selon des objectifs de conformité' },
      { type: 'Transformateurs alimentaires', desc: 'Comparent les mises à niveau de réfrigération et de procédé thermique avant le dossier ANME' },
      { type: 'Groupes multi-sites', desc: 'Classent les investissements d\'efficacité entre installations par retour et impact' },
    ],
  },
  lca: {
    title: 'ACV',
    subtitle: 'ISO 14040 · ISO 14067 · Empreinte carbone produit',
    description:
      "Analyse certifiée de l'empreinte carbone produit, de l'extraction des matières premières à la sortie d'usine — ou du berceau à la tombe complet. Le module ACV de Photocarb suit la méthodologie ISO 14040/14044 et 14067, produisant des labels carbone vérifiés qui débloquent une tarification premium sur les marchés européens et qualifient les produits pour les programmes d'approvisionnement bas carbone.",
    statLabel: 'Empreinte carbone produit certifiée',
    valueProp: 'Empreintes carbone produit vérifiées selon ISO 14067',
    industries: ['Cosmétique et soins personnels', 'Agroalimentaire et boissons', 'Pharmaceutique', 'Textile et cuir', 'Matériaux de construction', 'Emballage', 'Agro-industrie', 'Électronique et électroménager'],
    capabilities: [
      { title: 'Certifié ISO 14040 / 14067', desc: 'Méthodologie d\'empreinte produit reconnue internationalement' },
      { title: 'Du berceau à la porte ou à la tombe', desc: 'Choisissez la limite qui correspond à l\'exigence de votre acheteur' },
      { title: 'Labels carbone vérifiés', desc: "Débloquent une tarification premium et l'éligibilité aux achats verts" },
    ],
    whyItMatters: [
      { title: 'Accès au marché européen', desc: 'Une part croissante des distributeurs et acheteurs industriels de l\'UE exige désormais une empreinte carbone produit vérifiée avant même de référencer ou d\'approuver un fournisseur — sans PCF, pas de rayon.' },
      { title: 'Attestation ESG pour vos acheteurs et auditeurs', desc: 'Quand le rapport ESG de votre client revendique une empreinte de chaîne d\'approvisionnement, il a besoin de votre chiffre au niveau produit pour l\'étayer — l\'ACV est la preuve derrière son attestation, pas seulement la vôtre.' },
      { title: 'Empreinte carbone produit (PCF) à la demande', desc: 'Distributeurs, propriétaires de marques et le futur Passeport Numérique Produit de l\'UE demandent de plus en plus un PCF spécifique et certifié par référence — pas une estimation, pas une moyenne sectorielle.' },
      { title: 'Débloque le financement investisseur et vert', desc: 'Obligations vertes, prêts liés à la durabilité et investisseurs à impact évaluent les opérations sur des données vérifiées au niveau produit — une ACV certifiée est souvent un prérequis pour des conditions de financement préférentielles.' },
      { title: 'Une allégation défendable, pas un risque de greenwashing', desc: "Si vous commercialisez un produit comme « bas carbone » ou « écologique », la directive européenne sur les allégations vertes exige des preuves — la certification ISO 14067 est cette preuve." },
    ],
    heroHighlights: ['Empreinte produit certifiée', 'Option de limite complète', "Jusqu'au rapport certifié"],
    methodologyStandard: 'ISO 14040 / 14044 · ISO 14067',
    methodologySteps: [
      "Définition de l'unité fonctionnelle et des limites du système",
      'Collecte des données d\'inventaire du cycle de vie sur les matières premières, le procédé et la logistique',
      "Évaluation d'impact calculée selon la méthodologie ISO 14067",
      'Vérification par un tiers et délivrance du label carbone certifié',
    ],
    gains: [
      "Labels carbone vérifiés débloquant une tarification premium sur les marchés de l'UE",
      'Qualification pour les programmes d\'achats verts et bas carbone',
      "Choix de la limite du berceau à la porte ou du berceau à la tombe selon l'exigence de votre acheteur",
      "Une méthodologie défendable et prête pour l'audit si un acheteur conteste votre allégation",
    ],
    timeToReady: "Empreinte indicative en quelques minutes via l'estimateur ; rapport ISO 14067 certifié généralement sous 3 à 4 semaines.",
    clients: [
      { type: 'Cosmétique et soins personnels', desc: 'Étayent les allégations « clean beauty » et bas carbone par une empreinte produit certifiée' },
      { type: 'Agroalimentaire et boissons', desc: 'Ont besoin de labels carbone vérifiés par produit pour leurs partenaires de distribution européens' },
      { type: 'Pharmaceutique', desc: 'Documentent les émissions de principes actifs et d\'emballage pour les appels d\'offres' },
      { type: 'Textile et cuir', desc: "Vendent dans le cadre de programmes d'achats verts et bas carbone de l'UE" },
      { type: 'Matériaux de construction', desc: 'Qualifient leurs produits pour les programmes de certification de construction durable' },
      { type: 'Emballage et agro-industrie', desc: 'Prouvent leurs empreintes matière et procédé jusqu\'au niveau de la référence produit' },
    ],
  },
  'ai-reports': {
    title: 'Rapports',
    subtitle: 'Prêts en 48 heures · Arabe + Français + Anglais',
    description:
      "Chaque cadre réglementaire demande les mêmes données sous-jacentes, formatées différemment — une déclaration trimestrielle MACF, une divulgation climatique IFRS S2, un inventaire ISO 14064, une réponse CDP, ou une note ESG pour le conseil d'administration s'appuient toutes sur le même jeu de données carbone vérifié. Le moteur Rapports de Photocarb génère automatiquement chacun d'entre eux, selon un calendrier ou à la demande, au lieu que votre équipe ressaisisse les mêmes chiffres dans un modèle différent à chaque fois. Chaque rapport est prêt pour l'audit dès sa livraison, avec une documentation complète de la méthodologie de calcul et une chaîne de preuves inviolable jusqu'aux données source. Disponible en arabe, français et anglais, car un rapport qui ne fonctionne que dans une langue n'est pas terminé — votre conseil d'administration, votre régulateur et votre bureau de douane européen lisent rarement le même.",
    statLabel: 'Des données brutes au rapport soumis',
    valueProp: 'Tout rapport de conformité en 48 heures',
    industries: ['Toute industrie tunisienne', 'Multi-sites', 'Exportateurs', 'Sociétés cotées', 'Institutions financières', 'Groupes industriels'],
    capabilities: [
      { title: 'Un jeu de données, tous les rapports', desc: 'MACF, IFRS S2 et ISO 14064 à partir d\'une source unique' },
      { title: 'Arabe, français, anglais', desc: 'Chaque rapport généré dans la langue dont votre partie prenante a besoin' },
      { title: 'Délai de 48 heures', desc: "Sur calendrier ou à la demande, toujours prêt pour l'audit à la livraison" },
    ],
    whyItMatters: [
      { title: 'Élimine la ressaisie des mêmes chiffres', desc: 'Chaque cadre demande les mêmes données sous-jacentes dans un modèle différent — un jeu de données unique générant chaque rapport supprime la ressaisie manuelle source d\'erreurs.' },
      { title: 'Vous protège si un rapport est contesté', desc: 'Une chaîne de preuves inviolable jusqu\'aux données source signifie que vous pouvez défendre tout chiffre si un régulateur, auditeur ou acheteur le remet en question plus tard.' },
      { title: 'Supprime le goulot d\'étranglement de traduction', desc: 'Les opérateurs multi-marchés perdent des jours à attendre des divulgations traduites — la génération trilingue signifie que conseil, régulateur et douane reçoivent leur copie en même temps.' },
      { title: 'Toujours prêt pour une demande imprévue', desc: 'La génération à la demande évite qu\'une demande de diligence raisonnable imprévue ou un questionnaire acheteur ne se transforme en une semaine de précipitation.' },
    ],
    heroHighlights: ['Des données brutes au rapport soumis', 'Sortie trilingue', 'Alimente chaque rapport réglementaire'],
    methodologyStandard: 'Génération automatisée multi-cadres · MACF, IFRS S2, ISO 14064',
    methodologySteps: [
      'Connectez-vous une seule fois à votre jeu de données carbone en direct',
      'Sélectionnez le type de rapport et la juridiction dont vous avez besoin',
      "L'IA rédige le rapport avec une documentation complète de la méthodologie de calcul",
      'Revue humaine et validation inviolable avant livraison',
    ],
    gains: [
      "Un seul jeu de données alimente chaque rapport réglementaire dont vous avez besoin, sans ressaisie",
      'Délai de 48 heures, sur calendrier ou à la demande',
      'Chaque rapport prêt pour l\'audit à la livraison avec une piste de calcul complète',
      'Disponible en arabe, français et anglais',
    ],
    timeToReady: 'Premier rapport généré en 48 heures après connexion du jeu de données ; rapports récurrents entièrement automatisés ensuite.',
    clients: [
      { type: 'Exportateurs multi-sites', desc: 'Jonglent avec plusieurs régimes réglementaires sur plusieurs sites à la fois' },
      { type: 'Équipes conformité', desc: 'Fatiguées de repréparer manuellement des rapports similaires chaque trimestre' },
      { type: 'Tous secteurs', desc: "Tout opérateur ayant besoin d'un reporting prêt pour l'audit sans équipe dédiée" },
      { type: 'Institutions financières', desc: 'Génèrent des divulgations climatiques au niveau du portefeuille sur de nombreux emprunteurs' },
      { type: 'Sociétés cotées et pré-IPO', desc: 'Respectent les échéances de reporting du conseil et réglementaires sans délai' },
    ],
  },
  'anme-compliance': {
    title: "Conformité ANME et subvention FTE",
    subtitle: 'Loi n° 2009-7 · Article 7, décret n° 2017-983 · Tous secteurs',
    description:
      "La loi tunisienne sur l'audit énergétique obligatoire s'applique à toute installation consommant 800 tonnes équivalent pétrole (TEP) ou plus par an — pas seulement les exportateurs. Photocarb prépare la référence de consommation et le dossier d'investissement dont votre auditeur agréé par l'ANME et le fichier de subvention FTE ont tous deux besoin, afin que l'audit que vous êtes légalement tenu de réaliser débloque aussi un financement au lieu d'une simple amende.",
    statLabel: 'Amende maximale en cas de non-conformité, évitée',
    valueProp: 'Transformez une obligation légale en amélioration de l\'efficacité financée',
    industries: ['Toute installation à forte intensité énergétique', 'Industrie manufacturière', 'Agroalimentaire', 'Hôtellerie et services', 'Textile', 'Produits chimiques', 'Ciment et matériaux de construction', 'Chaîne du froid et logistique'],
    capabilities: [
      { title: 'Suivi du seuil de 800 TEP', desc: "Sachez exactement quand votre installation franchit le seuil d'audit obligatoire, secteur par secteur" },
      { title: 'Référence prête pour l\'auditeur', desc: 'Données de consommation et de procédé préparées pour votre auditeur agréé par l\'ANME — nous soutenons l\'audit, nous ne remplaçons pas l\'auditeur agréé' },
      { title: 'Dossier de subvention FTE', desc: "Dossier d'investissement modélisé pour la subvention de l'Article 7 — 70 % du coût de l'audit, 20 % de l'amélioration qui en résulte" },
    ],
    whyItMatters: [
      { title: 'C\'est la loi au-dessus de 800 TEP/an', desc: 'Les installations franchissant le seuil s\'exposent à une amende de 20 000 à 50 000 TND pour audit manqué — une obligation légale, pas une certification volontaire.' },
      { title: 'Transforme un coût en capex financé', desc: 'La subvention FTE de l\'Article 7 couvre 70 % du coût de l\'audit et généralement 20 % de l\'investissement d\'efficacité qui en résulte — la plupart des installations ne la réclament jamais car le dossier est mal préparé.' },
      { title: 'Alimente directement votre bilan carbone', desc: 'Les gains d\'efficacité énergétique issus de l\'audit réduisent vos émissions Scope 1 et 2, les mêmes données sur lesquelles s\'appuient votre bilan carbone et vos déclarations MACF.' },
      { title: 'Les coûts énergétiques augmentent indépendamment de la conformité', desc: 'Au-delà d\'éviter l\'amende, les mesures d\'efficacité identifiées s\'autofinancent généralement via des factures d\'énergie réduites en 1 à 3 ans.' },
    ],
    heroHighlights: ['Amende maximale, évitée', "Coût de l'audit subventionné via le FTE", 'Subvention d\'investissement typique'],
    calculatorMetric: {
      fieldLabel: "Coût estimé de l'audit énergétique (TND)",
      placeholder: 'ex. 12000',
      resultLabel: "Subvention FTE d'audit estimée",
      assumption: "Indicatif uniquement — la subvention finale est confirmée par l'ANME après examen technique au cas par cas.",
    },
    methodologyStandard: 'Loi n° 2009-7 · Décret n° 2009-362 · Décret n° 2017-983 (Article 7)',
    methodologySteps: [
      "Référence de consommation énergétique construite à partir de vos factures d'énergie et données de production",
      'Vérification du seuil par rapport au déclencheur d\'audit obligatoire de 800 TEP/an',
      "Dossier de données préparé pour votre auditeur énergétique agréé par l'ANME",
      'Dossier d\'investissement modélisé pour le fichier de subvention FTE, soumis avec le rapport d\'audit',
    ],
    gains: [
      "Une réponse claire sur l'obligation légale d'audit de votre installation — et son échéance",
      'Évitez entièrement l\'amende de non-conformité de 20 000 à 50 000 TND',
      "Une amélioration d'efficacité financée plutôt qu'un simple coût de conformité",
      'Un seul jeu de données qui alimente aussi vos rapports MACF, IFRS S2 et bilan carbone',
    ],
    timeToReady: 'Évaluation du seuil et données de référence prêtes sous 5 jours ouvrables ; dossier complet prêt pour l\'auditeur sous 2 à 3 semaines.',
    clients: [
      { type: 'Toute installation à forte intensité énergétique', desc: "Industrie manufacturière, agroalimentaire, chimie ou procédés industriels approchant le seuil de 800 TEP" },
      { type: 'Groupes multi-sites', desc: "Suivent les obligations d'audit et l'éligibilité FTE sur plusieurs installations à la fois" },
      { type: 'Premiers déposants', desc: 'Font face à leur premier audit obligatoire et souhaitent capter correctement la subvention FTE' },
      { type: 'Chaîne du froid et logistique', desc: 'Opérations à forte intensité de réfrigération, faciles à auditer' },
      { type: 'Usines textiles et cimenteries', desc: 'Installations à forte intensité de chaleur de procédé, au plus fort potentiel de subvention' },
    ],
  },
}

export function localizeService(s: ServiceDef, lang: 'en' | 'fr' | 'ar'): ServiceDef {
  if (lang === 'en') return s
  const a = lang === 'ar' ? SERVICES_AR[s.id] : SERVICES_FR[s.id]
  if (!a) return s
  const calculator: CalculatorConfig =
    s.calculator.kind === 'metric' && a.calculatorMetric
      ? {
          ...s.calculator,
          fields: s.calculator.fields.map((f, i) =>
            i === 0 ? { ...f, label: a.calculatorMetric!.fieldLabel, placeholder: a.calculatorMetric!.placeholder } : f,
          ),
          resultLabel: a.calculatorMetric.resultLabel,
          assumption: a.calculatorMetric.assumption,
        }
      : s.calculator
  return {
    ...s,
    title: a.title,
    subtitle: a.subtitle,
    description: a.description,
    statLabel: a.statLabel,
    valueProp: a.valueProp,
    industries: a.industries,
    capabilities: s.capabilities.map((c, i) => ({
      icon: c.icon,
      title: a.capabilities[i]?.title ?? c.title,
      desc: a.capabilities[i]?.desc ?? c.desc,
    })),
    heroHighlights: s.heroHighlights.map((h, i) => ({
      value: h.value,
      label: a.heroHighlights[i] ?? h.label,
    })),
    whyItMatters: s.whyItMatters.map((w, i) => ({
      icon: w.icon,
      title: a.whyItMatters?.[i]?.title ?? w.title,
      desc: a.whyItMatters?.[i]?.desc ?? w.desc,
    })),
    calculator,
    methodologyStandard: a.methodologyStandard ?? s.methodologyStandard,
    methodologySteps: a.methodologySteps ?? s.methodologySteps,
    gains: a.gains ?? s.gains,
    timeToReady: a.timeToReady ?? s.timeToReady,
    clients: a.clients ?? s.clients,
  }
}
