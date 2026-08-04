export type Level = 'red' | 'orange' | 'green'
export interface Bi { en: string; fr: string; ar: string }
export interface Reg { level: Level; name: Bi; cbam: Bi; tax: Bi; esg: Bi; reporting: Bi }

export function pick(bi: Bi, lang: 'en' | 'fr' | 'ar'): string {
  return bi[lang] ?? bi.en
}

const LEVEL_LABEL: Record<Level, Bi> = {
  red: { en: 'Carbon pricing & border measures in force', fr: 'Tarification carbone et mesures frontalières en vigueur', ar: 'تسعير كربون وتدابير حدودية سارية' },
  orange: { en: 'Regulation phasing in', fr: 'Réglementation en cours de déploiement', ar: 'تنظيم قيد التطبيق التدريجي' },
  green: { en: 'National framework developing', fr: 'Cadre national en développement', ar: 'إطار وطني قيد التطوير' },
}
export function levelLabel(l: Level, lang: 'en' | 'fr' | 'ar') { return pick(LEVEL_LABEL[l], lang) }

/* Shared generic profiles ------------------------------------------------- */

const GEN_GREEN = {
  cbam: { en: "No domestic border mechanism. Exporters of CBAM goods (steel, cement, aluminium, fertilizers, hydrogen) to the EU have faced full CBAM liability since Jan 2026 — verified facility data avoids punitive default rates.", fr: "Aucun mécanisme frontalier national. Les exportateurs de biens couverts par le MACF (acier, ciment, aluminium, engrais, hydrogène) vers l'UE sont pleinement soumis au MACF depuis janvier 2026 — des données d'installation vérifiées évitent les taux par défaut punitifs.", ar: 'لا آلية حدودية محلية. يواجه مصدّرو سلع CBAM (الصلب، الإسمنت، الألمنيوم، الأسمدة، الهيدروجين) إلى الاتحاد الأوروبي التزام CBAM الكامل منذ يناير 2026 — البيانات الموثّقة تتجنّب المعدلات الافتراضية العقابية.' },
  tax: { en: 'No carbon tax or ETS in force; climate policy and carbon-market frameworks under development.', fr: "Aucune taxe carbone ni système d'échange de quotas en vigueur ; politique climatique et cadres de marché carbone en développement.", ar: 'لا ضريبة كربون ولا نظام تداول ساري؛ سياسات المناخ وأطر سوق الكربون قيد التطوير.' },
  esg: { en: 'Corporate sustainability disclosure largely voluntary; stock-exchange ESG guidance emerging.', fr: "Divulgation de durabilité des entreprises largement volontaire ; directives ESG boursières émergentes.", ar: 'إفصاح استدامة الشركات طوعي إلى حد كبير؛ إرشادات ESG للبورصات في طور الظهور.' },
  reporting: { en: 'National GHG inventory reported to the UNFCCC under NDC commitments; no mandatory corporate GHG reporting yet.', fr: "Inventaire national des GES rapporté à la CCNUCC dans le cadre des engagements CDN ; pas encore de reporting GES obligatoire pour les entreprises.", ar: 'جرد وطني لغازات الدفيئة يُرفع لاتفاقية المناخ ضمن المساهمات المحددة وطنيًا؛ لا إبلاغ إلزامي للشركات بعد.' },
}

const GEN_ORANGE = {
  cbam: GEN_GREEN.cbam,
  tax: { en: 'Carbon-market or carbon-pricing legislation adopted and phasing in.', fr: 'Législation sur le marché ou la tarification du carbone adoptée et en cours de déploiement.', ar: 'تشريعات لسوق الكربون أو تسعيره معتمدة وقيد التطبيق التدريجي.' },
  esg: { en: 'Sustainability disclosure guidance issued for listed companies; moving toward mandatory.', fr: 'Directives de divulgation de durabilité publiées pour les sociétés cotées ; évolution vers un caractère obligatoire.', ar: 'صدرت إرشادات إفصاح استدامة للشركات المدرجة؛ تتجه نحو الإلزام.' },
  reporting: { en: 'MRV systems being established; sectoral emission reporting emerging.', fr: 'Systèmes MRV en cours de mise en place ; reporting sectoriel des émissions émergent.', ar: 'أنظمة قياس وتحقق قيد الإنشاء؛ إبلاغ قطاعي عن الانبعاثات في طور الظهور.' },
}

const EU_PROFILE = {
  cbam: { en: 'CBAM definitive regime live since Jan 2026: importers buy CBAM certificates on steel, cement, aluminium, fertilizers, hydrogen & electricity.', fr: "Régime définitif du MACF en vigueur depuis janvier 2026 : les importateurs achètent des certificats MACF sur l'acier, le ciment, l'aluminium, les engrais, l'hydrogène et l'électricité.", ar: 'النظام النهائي لـ CBAM سارٍ منذ يناير 2026: يشتري المستوردون شهادات CBAM على الصلب والإسمنت والألمنيوم والأسمدة والهيدروجين والكهرباء.' },
  tax: { en: 'EU ETS ≈ €70–90/tCO₂ (2025–26). ETS2 for buildings & road transport from 2027.', fr: "SEQE-UE ≈ 70–90 €/tCO₂ (2025–26). ETS2 pour les bâtiments et le transport routier à partir de 2027.", ar: 'نظام التداول الأوروبي ≈ 70–90 يورو/طن (2025–26). ETS2 للمباني والنقل البري من 2027.' },
  esg: { en: 'CSRD in force — double-materiality reporting under ESRS, phased 2024–2028; EU Taxonomy alignment.', fr: 'CSRD en vigueur — reporting de double matérialité selon les ESRS, déployé 2024–2028 ; alignement sur la taxonomie européenne.', ar: 'توجيه CSRD سارٍ — إبلاغ الأهمية المزدوجة وفق ESRS على مراحل 2024–2028؛ توافق مع التصنيف الأوروبي.' },
  reporting: { en: 'Quarterly CBAM declarations; annual verified ETS emission reports; assured CSRD statements.', fr: 'Déclarations MACF trimestrielles ; rapports d\'émissions SEQE vérifiés annuellement ; états CSRD avec assurance.', ar: 'إقرارات CBAM فصلية؛ تقارير انبعاثات سنوية موثّقة لنظام التداول؛ بيانات CSRD مع توكيد.' },
}

/* Country names (EN/FR/AR) --------------------------------------------------- */

const NAMES: Record<string, Bi> = {
  // Gulf & MENA focus
  qa: { en: 'Qatar', fr: 'Qatar', ar: 'قطر' }, ae: { en: 'United Arab Emirates', fr: 'Émirats arabes unis', ar: 'الإمارات' }, sa: { en: 'Saudi Arabia', fr: 'Arabie saoudite', ar: 'السعودية' },
  kw: { en: 'Kuwait', fr: 'Koweït', ar: 'الكويت' }, bh: { en: 'Bahrain', fr: 'Bahreïn', ar: 'البحرين' }, om: { en: 'Oman', fr: 'Oman', ar: 'عُمان' },
  // Global
  gb: { en: 'United Kingdom', fr: 'Royaume-Uni', ar: 'المملكة المتحدة' }, tr: { en: 'Türkiye', fr: 'Turquie', ar: 'تركيا' }, us: { en: 'United States', fr: 'États-Unis', ar: 'الولايات المتحدة' },
  ca: { en: 'Canada', fr: 'Canada', ar: 'كندا' }, cn: { en: 'China', fr: 'Chine', ar: 'الصين' }, in: { en: 'India', fr: 'Inde', ar: 'الهند' }, jp: { en: 'Japan', fr: 'Japon', ar: 'اليابان' },
  kr: { en: 'South Korea', fr: 'Corée du Sud', ar: 'كوريا الجنوبية' }, au: { en: 'Australia', fr: 'Australie', ar: 'أستراليا' }, ru: { en: 'Russia', fr: 'Russie', ar: 'روسيا' }, br: { en: 'Brazil', fr: 'Brésil', ar: 'البرازيل' },
  // EU members
  de: { en: 'Germany', fr: 'Allemagne', ar: 'ألمانيا' }, fr: { en: 'France', fr: 'France', ar: 'فرنسا' }, it: { en: 'Italy', fr: 'Italie', ar: 'إيطاليا' }, es: { en: 'Spain', fr: 'Espagne', ar: 'إسبانيا' },
  pt: { en: 'Portugal', fr: 'Portugal', ar: 'البرتغال' }, nl: { en: 'Netherlands', fr: 'Pays-Bas', ar: 'هولندا' }, be: { en: 'Belgium', fr: 'Belgique', ar: 'بلجيكا' }, at: { en: 'Austria', fr: 'Autriche', ar: 'النمسا' },
  pl: { en: 'Poland', fr: 'Pologne', ar: 'بولندا' }, se: { en: 'Sweden', fr: 'Suède', ar: 'السويد' }, fi: { en: 'Finland', fr: 'Finlande', ar: 'فنلندا' }, dk: { en: 'Denmark', fr: 'Danemark', ar: 'الدنمارك' },
  ie: { en: 'Ireland', fr: 'Irlande', ar: 'أيرلندا' }, gr: { en: 'Greece', fr: 'Grèce', ar: 'اليونان' }, cz: { en: 'Czechia', fr: 'Tchéquie', ar: 'التشيك' }, ro: { en: 'Romania', fr: 'Roumanie', ar: 'رومانيا' },
  hu: { en: 'Hungary', fr: 'Hongrie', ar: 'المجر' }, bg: { en: 'Bulgaria', fr: 'Bulgarie', ar: 'بلغاريا' }, sk: { en: 'Slovakia', fr: 'Slovaquie', ar: 'سلوفاكيا' }, hr: { en: 'Croatia', fr: 'Croatie', ar: 'كرواتيا' },
  si: { en: 'Slovenia', fr: 'Slovénie', ar: 'سلوفينيا' }, lt: { en: 'Lithuania', fr: 'Lituanie', ar: 'ليتوانيا' }, lv: { en: 'Latvia', fr: 'Lettonie', ar: 'لاتفيا' }, ee: { en: 'Estonia', fr: 'Estonie', ar: 'إستونيا' },
  lu: { en: 'Luxembourg', fr: 'Luxembourg', ar: 'لوكسمبورغ' }, cy: { en: 'Cyprus', fr: 'Chypre', ar: 'قبرص' }, mt: { en: 'Malta', fr: 'Malte', ar: 'مالطا' },
  // Africa (all)
  dz: { en: 'Algeria', fr: 'Algérie', ar: 'الجزائر' }, ao: { en: 'Angola', fr: 'Angola', ar: 'أنغولا' }, bj: { en: 'Benin', fr: 'Bénin', ar: 'بنين' }, bw: { en: 'Botswana', fr: 'Botswana', ar: 'بوتسوانا' },
  bf: { en: 'Burkina Faso', fr: 'Burkina Faso', ar: 'بوركينا فاسو' }, bi: { en: 'Burundi', fr: 'Burundi', ar: 'بوروندي' }, cm: { en: 'Cameroon', fr: 'Cameroun', ar: 'الكاميرون' }, cv: { en: 'Cape Verde', fr: 'Cap-Vert', ar: 'الرأس الأخضر' },
  cf: { en: 'Central African Republic', fr: 'République centrafricaine', ar: 'أفريقيا الوسطى' }, td: { en: 'Chad', fr: 'Tchad', ar: 'تشاد' }, km: { en: 'Comoros', fr: 'Comores', ar: 'جزر القمر' }, cg: { en: 'Congo', fr: 'Congo', ar: 'الكونغو' },
  cd: { en: 'DR Congo', fr: 'RD Congo', ar: 'الكونغو الديمقراطية' }, dj: { en: 'Djibouti', fr: 'Djibouti', ar: 'جيبوتي' }, eg: { en: 'Egypt', fr: 'Égypte', ar: 'مصر' }, gq: { en: 'Equatorial Guinea', fr: 'Guinée équatoriale', ar: 'غينيا الاستوائية' },
  er: { en: 'Eritrea', fr: 'Érythrée', ar: 'إريتريا' }, sz: { en: 'Eswatini', fr: 'Eswatini', ar: 'إسواتيني' }, et: { en: 'Ethiopia', fr: 'Éthiopie', ar: 'إثيوبيا' }, ga: { en: 'Gabon', fr: 'Gabon', ar: 'الغابون' },
  gm: { en: 'Gambia', fr: 'Gambie', ar: 'غامبيا' }, gh: { en: 'Ghana', fr: 'Ghana', ar: 'غانا' }, gn: { en: 'Guinea', fr: 'Guinée', ar: 'غينيا' }, gw: { en: 'Guinea-Bissau', fr: 'Guinée-Bissau', ar: 'غينيا بيساو' },
  ci: { en: "Côte d'Ivoire", fr: "Côte d'Ivoire", ar: 'ساحل العاج' }, ke: { en: 'Kenya', fr: 'Kenya', ar: 'كينيا' }, ls: { en: 'Lesotho', fr: 'Lesotho', ar: 'ليسوتو' }, lr: { en: 'Liberia', fr: 'Libéria', ar: 'ليبيريا' },
  ly: { en: 'Libya', fr: 'Libye', ar: 'ليبيا' }, mg: { en: 'Madagascar', fr: 'Madagascar', ar: 'مدغشقر' }, mw: { en: 'Malawi', fr: 'Malawi', ar: 'مالاوي' }, ml: { en: 'Mali', fr: 'Mali', ar: 'مالي' },
  mr: { en: 'Mauritania', fr: 'Mauritanie', ar: 'موريتانيا' }, mu: { en: 'Mauritius', fr: 'Maurice', ar: 'موريشيوس' }, ma: { en: 'Morocco', fr: 'Maroc', ar: 'المغرب' }, mz: { en: 'Mozambique', fr: 'Mozambique', ar: 'موزمبيق' },
  na: { en: 'Namibia', fr: 'Namibie', ar: 'ناميبيا' }, ne: { en: 'Niger', fr: 'Niger', ar: 'النيجر' }, ng: { en: 'Nigeria', fr: 'Nigeria', ar: 'نيجيريا' }, rw: { en: 'Rwanda', fr: 'Rwanda', ar: 'رواندا' },
  st: { en: 'São Tomé & Príncipe', fr: 'Sao Tomé-et-Principe', ar: 'ساو تومي وبرينسيبي' }, sn: { en: 'Senegal', fr: 'Sénégal', ar: 'السنغال' }, sc: { en: 'Seychelles', fr: 'Seychelles', ar: 'سيشل' }, sl: { en: 'Sierra Leone', fr: 'Sierra Leone', ar: 'سيراليون' },
  so: { en: 'Somalia', fr: 'Somalie', ar: 'الصومال' }, somaliland: { en: 'Somaliland', fr: 'Somaliland', ar: 'أرض الصومال' }, za: { en: 'South Africa', fr: 'Afrique du Sud', ar: 'جنوب أفريقيا' }, ss: { en: 'South Sudan', fr: 'Soudan du Sud', ar: 'جنوب السودان' },
  sd: { en: 'Sudan', fr: 'Soudan', ar: 'السودان' }, tz: { en: 'Tanzania', fr: 'Tanzanie', ar: 'تنزانيا' }, tg: { en: 'Togo', fr: 'Togo', ar: 'توغو' }, tn: { en: 'Tunisia', fr: 'Tunisie', ar: 'تونس' },
  ug: { en: 'Uganda', fr: 'Ouganda', ar: 'أوغندا' }, zm: { en: 'Zambia', fr: 'Zambie', ar: 'زامبيا' }, zw: { en: 'Zimbabwe', fr: 'Zimbabwe', ar: 'زيمبابوي' },
}

/* Specific detailed profiles --------------------------------------------- */

type Detail = Omit<Reg, 'name'>

const SPECIFIC: Record<string, Detail> = {
  qa: {
    level: 'green',
    cbam: { en: 'No border mechanism. Exporters to the EU have faced full CBAM liability since Jan 2026 — verified facility data cuts default rates by 30–60%.', fr: "Aucun mécanisme frontalier. Les exportateurs vers l'UE sont pleinement soumis au MACF depuis janvier 2026 — des données d'installation vérifiées réduisent les taux par défaut de 30 à 60 %.", ar: 'لا آلية حدودية. يواجه المصدّرون إلى الاتحاد الأوروبي التزام CBAM الكامل منذ يناير 2026 — البيانات الموثّقة تخفض المعدلات الافتراضية 30–60%.' },
    tax: { en: 'No carbon tax or ETS. National carbon registry launched 2024; pricing mechanisms under study.', fr: "Aucune taxe carbone ni SEQE. Registre national du carbone lancé en 2024 ; mécanismes de tarification à l'étude.", ar: 'لا ضريبة كربون ولا نظام تداول. أُطلق السجل الوطني للكربون 2024؛ آليات التسعير قيد الدراسة.' },
    esg: { en: 'QSE ESG guidance for listed companies (voluntary, moving toward mandatory). Qatar Vision 2030 sustainability pillars.', fr: 'Directives ESG de la Bourse du Qatar pour les sociétés cotées (volontaires, tendant vers le caractère obligatoire). Piliers de durabilité de la Vision Qatar 2030.', ar: 'إرشادات ESG لبورصة قطر للشركات المدرجة (طوعية وتتجه نحو الإلزام). ركائز الاستدامة في رؤية قطر 2030.' },
    reporting: { en: 'Annual GHG inventory to MECC mandatory for major industrial emitters since 2024 (NCAP: −25% intensity by 2030).', fr: "Inventaire annuel des GES au ministère de l'Environnement obligatoire pour les grands émetteurs industriels depuis 2024 (plan national : −25 % d'intensité d'ici 2030).", ar: 'جرد سنوي إلزامي لغازات الدفيئة إلى وزارة البيئة لكبار المنبعثين منذ 2024 (الخطة الوطنية: −25% كثافة بحلول 2030).' },
  },
  ae: {
    level: 'orange',
    cbam: { en: 'No border mechanism. EU-bound aluminium and steel exports fully exposed to EU CBAM.', fr: "Aucun mécanisme frontalier. Les exportations d'aluminium et d'acier vers l'UE sont pleinement exposées au MACF européen.", ar: 'لا آلية حدودية. صادرات الألمنيوم والصلب إلى أوروبا معرّضة بالكامل لـ CBAM الأوروبية.' },
    tax: { en: 'No carbon tax yet; national carbon credit scheme and pricing policy under development toward Net Zero 2050.', fr: 'Pas encore de taxe carbone ; régime national de crédits carbone et politique de tarification en développement vers la neutralité 2050.', ar: 'لا ضريبة كربون بعد؛ نظام وطني لأرصدة الكربون وسياسة تسعير قيد التطوير نحو الحياد 2050.' },
    esg: { en: 'Federal Climate Law (Decree-Law 11/2024) — first in the Gulf to mandate corporate emissions management.', fr: 'Loi fédérale sur le climat (décret-loi 11/2024) — première dans le Golfe à imposer la gestion des émissions des entreprises.', ar: 'قانون التغير المناخي الاتحادي (11/2024) — الأول خليجيًا في إلزام الشركات بإدارة الانبعاثات.' },
    reporting: { en: 'Federal Climate Law in force since May 2025; full corporate compliance required since May 2026. SCA sustainability disclosure for listed companies.', fr: 'Loi fédérale sur le climat en vigueur depuis mai 2025 ; conformité totale des entreprises exigée depuis mai 2026. Divulgation de durabilité de la SCA pour les sociétés cotées.', ar: 'قانون التغير المناخي الاتحادي سارٍ منذ مايو 2025؛ الامتثال الكامل للشركات إلزامي منذ مايو 2026. إفصاح استدامة لهيئة الأوراق المالية للشركات المدرجة.' },
  },
  sa: {
    level: 'green',
    cbam: { en: 'No border mechanism. Petrochemical and fertilizer exports to the EU in CBAM scope.', fr: "Aucun mécanisme frontalier. Les exportations pétrochimiques et d'engrais vers l'UE sont dans le champ du MACF.", ar: 'لا آلية حدودية. صادرات البتروكيماويات والأسمدة إلى أوروبا ضمن نطاق CBAM.' },
    tax: { en: 'No carbon tax. Regional Voluntary Carbon Market (RVCMC) operating; Circular Carbon Economy framework.', fr: 'Aucune taxe carbone. Marché régional volontaire du carbone (RVCMC) opérationnel ; cadre d\'économie carbone circulaire.', ar: 'لا ضريبة كربون. سوق الكربون الطوعي الإقليمي يعمل؛ إطار الاقتصاد الكربوني الدائري.' },
    esg: { en: 'Tadawul ESG disclosure guidelines (voluntary). Net Zero 2060 with sector pathways.', fr: 'Directives de divulgation ESG de Tadawul (volontaires). Neutralité carbone 2060 avec trajectoires sectorielles.', ar: 'إرشادات إفصاح ESG لتداول (طوعية). حياد كربوني 2060 بمسارات قطاعية.' },
    reporting: { en: 'No mandatory corporate GHG reporting yet; national inventory via UNFCCC commitments.', fr: 'Pas encore de reporting GES obligatoire pour les entreprises ; inventaire national via les engagements de la CCNUCC.', ar: 'لا إبلاغ إلزامي للشركات بعد؛ جرد وطني عبر التزامات اتفاقية المناخ.' },
  },
  tn: {
    level: 'green',
    cbam: { en: 'No border mechanism — but cement, fertilizer and steel exporters to the EU are among the most CBAM-exposed in MENA.', fr: "Aucun mécanisme frontalier — mais les exportateurs de ciment, d'engrais et d'acier vers l'UE font partie des plus exposés au MACF de la région MENA.", ar: 'لا آلية حدودية — لكن مصدّري الإسمنت والأسمدة والصلب إلى أوروبا من الأكثر انكشافًا على CBAM في المنطقة.' },
    tax: { en: 'Energy taxation with a carbon component; no ETS. Updated NDC targets −45% carbon intensity by 2030.', fr: "Fiscalité énergétique avec une composante carbone ; pas de SEQE. La CDN actualisée vise −45 % d'intensité carbone d'ici 2030.", ar: 'ضرائب طاقة بمكوّن كربوني؛ لا نظام تداول. المساهمة الوطنية المحدّثة تستهدف −45% كثافة بحلول 2030.' },
    esg: { en: 'CSR law (2018) for large companies; central-bank sustainability guidance for the financial sector.', fr: 'Loi RSE (2018) pour les grandes entreprises ; directives de durabilité de la banque centrale pour le secteur financier.', ar: 'قانون المسؤولية المجتمعية (2018) للشركات الكبرى؛ إرشادات استدامة للبنك المركزي للقطاع المالي.' },
    reporting: { en: 'No mandatory GHG reporting; MRV system being built under Article 6 readiness programs.', fr: "Pas de reporting GES obligatoire ; système MRV en construction dans le cadre des programmes de préparation à l'Article 6.", ar: 'لا إبلاغ إلزامي؛ نظام قياس وتحقق قيد البناء ضمن برامج جاهزية المادة 6.' },
  },
  gb: {
    level: 'red',
    cbam: { en: 'UK CBAM confirmed for Jan 2027 — aluminium, cement, fertilizers, hydrogen, iron & steel.', fr: 'MACF britannique confirmé pour janvier 2027 — aluminium, ciment, engrais, hydrogène, fer et acier.', ar: 'CBAM البريطانية مؤكّدة ليناير 2027 — الألمنيوم والإسمنت والأسمدة والهيدروجين والحديد والصلب.' },
    tax: { en: 'UK ETS ≈ £35–50/tCO₂; linking discussions with EU ETS ongoing.', fr: 'SEQE britannique ≈ 35–50 £/tCO₂ ; discussions de liaison avec le SEQE-UE en cours.', ar: 'نظام التداول البريطاني ≈ 35–50 جنيهًا/طن؛ محادثات ربط مع النظام الأوروبي جارية.' },
    esg: { en: 'ISSB-based UK Sustainability Reporting Standards; TCFD already mandatory for large companies.', fr: 'Normes britanniques de reporting de durabilité basées sur l\'ISSB ; TCFD déjà obligatoire pour les grandes entreprises.', ar: 'معايير استدامة بريطانية مبنية على ISSB؛ TCFD إلزامي أصلًا للشركات الكبرى.' },
    reporting: { en: 'SECR energy & carbon reporting; verified ETS reports; transition plans expected for listed firms.', fr: "Reporting énergie et carbone SECR ; rapports SEQE vérifiés ; plans de transition attendus pour les sociétés cotées.", ar: 'إبلاغ SECR للطاقة والكربون؛ تقارير موثّقة لنظام التداول؛ خطط تحوّل متوقعة للشركات المدرجة.' },
  },
  tr: {
    level: 'orange',
    cbam: { en: 'Aligning with EU CBAM to protect export competitiveness; national ETS designed as a CBAM response.', fr: "Alignement sur le MACF européen pour protéger la compétitivité des exportations ; SEQE national conçu comme réponse au MACF.", ar: 'مواءمة مع CBAM الأوروبية لحماية تنافسية الصادرات؛ نظام تداول وطني صُمِّم كاستجابة لها.' },
    tax: { en: 'National ETS legislated 2024 — pilot phase 2025–26, full compliance to follow.', fr: 'SEQE national légiféré en 2024 — phase pilote 2025–26, conformité totale à suivre.', ar: 'نظام تداول وطني شُرِّع 2024 — مرحلة تجريبية 2025–26 ثم الامتثال الكامل.' },
    esg: { en: 'TSRS (ISSB-aligned) sustainability standards mandatory for large companies from FY2024.', fr: 'Normes de durabilité TSRS (alignées ISSB) obligatoires pour les grandes entreprises depuis l\'exercice 2024.', ar: 'معايير TSRS (متوافقة مع ISSB) إلزامية للشركات الكبرى من السنة المالية 2024.' },
    reporting: { en: 'MRV regulation in force since 2015; verified facility-level emission reports annually.', fr: 'Règlement MRV en vigueur depuis 2015 ; rapports d\'émissions vérifiés au niveau des installations chaque année.', ar: 'لائحة القياس والتحقق سارية منذ 2015؛ تقارير انبعاثات سنوية موثّقة على مستوى المنشأة.' },
  },
  us: {
    level: 'orange',
    cbam: { en: 'No federal border mechanism; carbon-based import fee bills (e.g. FPFA) recurring in Congress.', fr: 'Aucun mécanisme frontalier fédéral ; des projets de loi sur les redevances d\'importation carbone (ex. FPFA) reviennent régulièrement au Congrès.', ar: 'لا آلية حدودية فدرالية؛ مشاريع قوانين رسوم استيراد كربونية تتكرر في الكونغرس.' },
    tax: { en: 'No federal carbon price. California cap-and-trade ≈ $40/t; RGGI in northeastern states.', fr: "Pas de prix du carbone fédéral. Plafonnement et échange californien ≈ 40 $/t ; RGGI dans les États du nord-est.", ar: 'لا سعر كربون فدرالي. نظام كاليفورنيا ≈ 40 دولارًا/طن؛ RGGI في الولايات الشمالية الشرقية.' },
    esg: { en: 'SEC climate rule stayed; California SB 253/261 mandate climate disclosure for large firms operating in-state.', fr: 'Règle climatique de la SEC suspendue ; les lois californiennes SB 253/261 imposent la divulgation climatique aux grandes entreprises opérant dans l\'État.', ar: 'قاعدة SEC المناخية موقوفة؛ قانونا كاليفورنيا SB 253/261 يلزمان الشركات الكبرى العاملة في الولاية بالإفصاح المناخي.' },
    reporting: { en: 'EPA GHGRP: mandatory reporting for facilities >25k tCO₂e/yr since 2010.', fr: "GHGRP de l'EPA : reporting obligatoire pour les installations de plus de 25 000 tCO₂e/an depuis 2010.", ar: 'برنامج EPA: إبلاغ إلزامي للمنشآت فوق 25 ألف طن سنويًا منذ 2010.' },
  },
  ca: {
    level: 'red',
    cbam: { en: 'Border carbon adjustment under formal consultation, aligned with the EU approach.', fr: "Ajustement carbone aux frontières en consultation formelle, aligné sur l'approche européenne.", ar: 'تعديل كربوني حدودي قيد التشاور الرسمي بما يتماشى مع النهج الأوروبي.' },
    tax: { en: 'Industrial carbon price (OBPS) ≈ CAD 95/t in 2026, rising to CAD 170/t by 2030.', fr: 'Prix du carbone industriel (OBPS) ≈ 95 CAD/t en 2026, atteignant 170 CAD/t d\'ici 2030.', ar: 'سعر كربون صناعي ≈ 95 دولارًا كنديًا/طن في 2026، يرتفع إلى 170 بحلول 2030.' },
    esg: { en: 'CSDS (ISSB-aligned) climate disclosure phasing in from 2025 for large issuers.', fr: 'Divulgation climatique CSDS (alignée ISSB) déployée à partir de 2025 pour les grands émetteurs.', ar: 'إفصاح مناخي CSDS (متوافق مع ISSB) يُطبَّق تدريجيًا من 2025 لكبار المُصدِرين.' },
    reporting: { en: 'Federal GHGRP for facilities >10k tCO₂e/yr; provincial verified reports under OBPS.', fr: "GHGRP fédéral pour les installations de plus de 10 000 tCO₂e/an ; rapports provinciaux vérifiés sous l'OBPS.", ar: 'برنامج فدرالي للمنشآت فوق 10 آلاف طن سنويًا؛ تقارير موثّقة على مستوى المقاطعات.' },
  },
  cn: {
    level: 'orange',
    cbam: { en: 'No border mechanism; steel and aluminium exporters actively preparing verified data for EU CBAM.', fr: "Aucun mécanisme frontalier ; les exportateurs d'acier et d'aluminium préparent activement des données vérifiées pour le MACF européen.", ar: 'لا آلية حدودية؛ مصدّرو الصلب والألمنيوم يجهّزون بيانات موثّقة لـ CBAM الأوروبية.' },
    tax: { en: 'National ETS ≈ ¥90–100/t — expanded 2024–25 to steel, cement & aluminium (world’s largest by volume).', fr: 'SEQE national ≈ 90–100 ¥/t — étendu en 2024–25 à l\'acier, au ciment et à l\'aluminium (le plus grand marché mondial en volume).', ar: 'نظام التداول الوطني ≈ 90–100 يوان/طن — توسّع 2024–25 ليشمل الصلب والإسمنت والألمنيوم (الأكبر عالميًا حجمًا).' },
    esg: { en: 'Mandatory sustainability disclosure for major listed companies by 2026 (SSE/SZSE/BSE guidelines).', fr: 'Divulgation de durabilité obligatoire pour les grandes sociétés cotées d\'ici 2026 (directives des trois bourses).', ar: 'إفصاح استدامة إلزامي لكبرى الشركات المدرجة بحلول 2026 (إرشادات البورصات الثلاث).' },
    reporting: { en: 'Verified annual emission reports for ETS-covered enterprises; provincial MRV infrastructure.', fr: "Rapports d'émissions annuels vérifiés pour les entreprises couvertes par le SEQE ; infrastructure MRV provinciale.", ar: 'تقارير انبعاثات سنوية موثّقة للمنشآت المشمولة بنظام التداول؛ بنية قياس وتحقق على مستوى المقاطعات.' },
  },
  in: {
    level: 'orange',
    cbam: { en: 'No border mechanism; negotiating CBAM treatment with the EU — steel exporters highly exposed.', fr: "Aucun mécanisme frontalier ; négociation du traitement MACF avec l'UE — les exportateurs d'acier fortement exposés.", ar: 'لا آلية حدودية؛ تفاوض مع الاتحاد الأوروبي حول معاملة CBAM — مصدّرو الصلب معرّضون بشدة.' },
    tax: { en: 'Carbon Credit Trading Scheme (CCTS): compliance phase for heavy industry underway since 2026.', fr: 'Régime d\'échange de crédits carbone (CCTS) : phase de conformité pour l\'industrie lourde en cours depuis 2026.', ar: 'نظام تداول أرصدة الكربون: مرحلة الامتثال للصناعات الثقيلة جارية منذ 2026.' },
    esg: { en: 'BRSR mandatory for top-1000 listed companies; BRSR Core assurance phasing in for the largest.', fr: 'BRSR obligatoire pour les 1000 plus grandes sociétés cotées ; assurance BRSR Core déployée pour les plus importantes.', ar: 'تقرير BRSR إلزامي لأكبر 1000 شركة مدرجة؛ توكيد BRSR الأساسي يُطبَّق تدريجيًا للأكبر.' },
    reporting: { en: 'PAT energy-efficiency scheme reporting; CCTS verified emission-intensity reports since 2026.', fr: 'Reporting du régime d\'efficacité énergétique PAT ; rapports d\'intensité d\'émissions vérifiés du CCTS depuis 2026.', ar: 'إبلاغ ضمن نظام كفاءة الطاقة PAT؛ تقارير كثافة موثّقة ضمن نظام التداول منذ 2026.' },
  },
  jp: {
    level: 'orange',
    cbam: { en: 'No border mechanism; participating in international carbon-club discussions.', fr: 'Aucun mécanisme frontalier ; participation aux discussions internationales sur les clubs carbone.', ar: 'لا آلية حدودية؛ تشارك في نقاشات نادي الكربون الدولي.' },
    tax: { en: 'GX-ETS mandatory for large emitters since FY2026; carbon levy on fossil-fuel importers from 2028.', fr: 'GX-ETS obligatoire pour les grands émetteurs depuis l\'exercice 2026 ; prélèvement carbone sur les importateurs de combustibles fossiles à partir de 2028.', ar: 'نظام GX-ETS إلزامي لكبار المنبعثين منذ السنة المالية 2026؛ رسم كربوني على مستوردي الوقود من 2028.' },
    esg: { en: 'SSBJ standards (ISSB-based) applying to Prime Market listed companies, phased from FY2027.', fr: 'Normes SSBJ (basées sur l\'ISSB) applicables aux sociétés cotées du Prime Market, déployées à partir de l\'exercice 2027.', ar: 'معايير SSBJ (مبنية على ISSB) تُطبَّق على شركات السوق الرئيسي تدريجيًا من 2027.' },
    reporting: { en: 'Mandatory GHG accounting & reporting under the Energy Conservation Act for large emitters.', fr: 'Comptabilité et reporting GES obligatoires en vertu de la loi sur la conservation de l\'énergie pour les grands émetteurs.', ar: 'محاسبة وإبلاغ إلزاميان لغازات الدفيئة بموجب قانون ترشيد الطاقة لكبار المنبعثين.' },
  },
  kr: {
    level: 'red',
    cbam: { en: 'No border mechanism; K-ETS reform designed to keep exporters CBAM-compatible.', fr: 'Aucun mécanisme frontalier ; réforme du K-ETS conçue pour maintenir les exportateurs compatibles avec le MACF.', ar: 'لا آلية حدودية؛ إصلاح K-ETS مصمَّم لإبقاء المصدّرين متوافقين مع CBAM.' },
    tax: { en: 'K-ETS since 2015 — covers ~73% of national emissions; tightening benchmarks phase 4 (2026–30).', fr: "K-ETS depuis 2015 — couvre environ 73 % des émissions nationales ; resserrement des références en phase 4 (2026–30).", ar: 'نظام K-ETS منذ 2015 — يغطي نحو 73% من الانبعاثات الوطنية؛ معايير أشد في المرحلة الرابعة (2026–30).' },
    esg: { en: 'KSSB sustainability disclosure for large listed companies phasing in from 2026.', fr: 'Divulgation de durabilité KSSB pour les grandes sociétés cotées déployée à partir de 2026.', ar: 'إفصاح استدامة KSSB لكبرى الشركات المدرجة تدريجيًا من 2026.' },
    reporting: { en: 'Verified annual emission reports mandatory for all K-ETS entities.', fr: 'Rapports d\'émissions annuels vérifiés obligatoires pour toutes les entités du K-ETS.', ar: 'تقارير انبعاثات سنوية موثّقة إلزامية لجميع منشآت K-ETS.' },
  },
  au: {
    level: 'orange',
    cbam: { en: 'Carbon-leakage review recommending a CBAM for cement and clinker imports.', fr: 'Examen des fuites de carbone recommandant un MACF pour les importations de ciment et de clinker.', ar: 'مراجعة تسرّب الكربون توصي بآلية حدودية لواردات الإسمنت والكلنكر.' },
    tax: { en: 'Safeguard Mechanism: declining baselines for 200+ largest facilities; ACCU price ≈ AUD 35–75.', fr: 'Mécanisme de sauvegarde : références décroissantes pour plus de 200 des plus grandes installations ; prix ACCU ≈ 35–75 AUD.', ar: 'آلية الضمان: خطوط أساس متناقصة لأكبر 200+ منشأة؛ سعر ACCU ≈ 35–75 دولارًا أستراليًا.' },
    esg: { en: 'Mandatory climate reporting (AASB S2) from Jan 2025, phasing across company sizes to 2027.', fr: 'Reporting climatique obligatoire (AASB S2) depuis janvier 2025, déployé selon la taille des entreprises jusqu\'en 2027.', ar: 'إبلاغ مناخي إلزامي (AASB S2) من يناير 2025، يتوسع حسب حجم الشركات حتى 2027.' },
    reporting: { en: 'NGER scheme: audited energy & emissions reporting since 2007 for large facilities.', fr: 'Régime NGER : reporting énergie et émissions audité depuis 2007 pour les grandes installations.', ar: 'نظام NGER: إبلاغ مُدقَّق للطاقة والانبعاثات منذ 2007 للمنشآت الكبيرة.' },
  },
  // ── Key African economies ─────────────────────────────────────
  za: {
    level: 'orange',
    cbam: { en: 'No border mechanism; steel, aluminium and ferroalloy exporters among Africa’s most CBAM-exposed.', fr: "Aucun mécanisme frontalier ; les exportateurs d'acier, d'aluminium et de ferroalliages parmi les plus exposés au MACF en Afrique.", ar: 'لا آلية حدودية؛ مصدّرو الصلب والألمنيوم والسبائك الحديدية من الأكثر انكشافًا على CBAM في أفريقيا.' },
    tax: { en: 'Carbon Tax Act since 2019 — ≈ R190/tCO₂ (~$10); Phase 2 with rising rates and narrowing allowances from 2026.', fr: 'Loi sur la taxe carbone depuis 2019 — ≈ 190 R/tCO₂ (~10 $) ; phase 2 avec taux croissants et allocations réduites à partir de 2026.', ar: 'قانون ضريبة الكربون منذ 2019 — ≈ 190 راندًا/طن (~10 دولارات)؛ المرحلة الثانية بمعدلات مرتفعة ومخصصات أضيق من 2026.' },
    esg: { en: 'JSE Sustainability & Climate Disclosure Guidance; King IV governance code.', fr: 'Directives de divulgation durabilité et climat de la JSE ; code de gouvernance King IV.', ar: 'إرشادات الإفصاح عن الاستدامة والمناخ لبورصة جوهانسبرغ؛ مدونة الحوكمة King IV.' },
    reporting: { en: 'Mandatory GHG reporting (NGERs) for large emitters; carbon-budget system being legislated.', fr: 'Reporting GES obligatoire (NGERs) pour les grands émetteurs ; système de budget carbone en cours de législation.', ar: 'إبلاغ إلزامي لغازات الدفيئة (NGERs) لكبار المنبعثين؛ نظام موازنة كربونية قيد التشريع.' },
  },
  eg: {
    level: 'orange',
    cbam: { en: 'No border mechanism; fertilizer, steel and aluminium exporters exposed to EU CBAM.', fr: "Aucun mécanisme frontalier ; exportateurs d'engrais, d'acier et d'aluminium exposés au MACF européen.", ar: 'لا آلية حدودية؛ مصدّرو الأسمدة والصلب والألمنيوم معرّضون لـ CBAM الأوروبية.' },
    tax: { en: 'No carbon tax; Africa’s first regulated voluntary carbon market (EGX) launched 2024.', fr: 'Pas de taxe carbone ; premier marché volontaire du carbone réglementé d\'Afrique (EGX) lancé en 2024.', ar: 'لا ضريبة كربون؛ أُطلقت أول سوق كربون طوعي منظّم في أفريقيا (بورصة مصر) عام 2024.' },
    esg: { en: 'FRA mandatory ESG & TCFD disclosure for large listed and non-banking financial firms.', fr: 'Divulgation ESG et TCFD obligatoire de la FRA pour les grandes sociétés cotées et les entreprises financières non bancaires.', ar: 'إفصاح ESG وTCFD إلزامي من الهيئة العامة للرقابة المالية للشركات المدرجة الكبرى والمالية غير المصرفية.' },
    reporting: { en: 'National MRV under development; NDC updated to 2030 sector targets.', fr: 'MRV national en développement ; CDN actualisée avec des objectifs sectoriels à 2030.', ar: 'نظام قياس وتحقق قيد التطوير؛ المساهمة الوطنية محدّثة بأهداف قطاعية حتى 2030.' },
  },
  ma: {
    level: 'orange',
    cbam: { en: 'Highly CBAM-exposed via phosphates, fertilizers and electricity exports to the EU; domestic carbon-pricing under study as a response.', fr: "Fortement exposé au MACF via les exportations de phosphates, d'engrais et d'électricité vers l'UE ; tarification carbone nationale à l'étude en réponse.", ar: 'انكشاف عالٍ على CBAM عبر صادرات الفوسفات والأسمدة والكهرباء إلى أوروبا؛ تسعير كربون محلي قيد الدراسة كاستجابة.' },
    tax: { en: 'No carbon tax yet; strong renewables program (Noor); carbon-pricing roadmap in preparation.', fr: 'Pas encore de taxe carbone ; solide programme d\'énergies renouvelables (Noor) ; feuille de route de tarification carbone en préparation.', ar: 'لا ضريبة كربون بعد؛ برنامج طاقة متجددة قوي (نور)؛ خارطة طريق لتسعير الكربون قيد الإعداد.' },
    esg: { en: 'AMMC ESG reporting guidance for listed companies; low-carbon strategy 2050.', fr: 'Directives de reporting ESG de l\'AMMC pour les sociétés cotées ; stratégie bas carbone 2050.', ar: 'إرشادات إفصاح ESG من هيئة السوق للشركات المدرجة؛ استراتيجية منخفضة الكربون 2050.' },
    reporting: { en: 'MRV framework under construction; NDC targets −45.5% by 2030 (conditional).', fr: 'Cadre MRV en construction ; la CDN vise −45,5 % d\'ici 2030 (conditionnel).', ar: 'إطار قياس وتحقق قيد الإنشاء؛ المساهمة الوطنية تستهدف −45.5% بحلول 2030 (مشروط).' },
  },
  ng: {
    level: 'orange',
    cbam: { en: 'No border mechanism; growing steel and cement sectors monitoring EU CBAM exposure.', fr: 'Aucun mécanisme frontalier ; les secteurs de l\'acier et du ciment en croissance surveillent l\'exposition au MACF européen.', ar: 'لا آلية حدودية؛ قطاعا الصلب والإسمنت المتناميان يراقبان الانكشاف على CBAM الأوروبية.' },
    tax: { en: 'No carbon tax; Climate Change Act 2021 sets a national carbon budget and Net-Zero 2060; carbon-market framework developing.', fr: 'Pas de taxe carbone ; la loi sur le changement climatique de 2021 fixe un budget carbone national et une neutralité 2060 ; cadre de marché carbone en développement.', ar: 'لا ضريبة كربون؛ قانون التغير المناخي 2021 يحدد موازنة كربونية وطنية وحيادًا 2060؛ إطار سوق كربون قيد التطوير.' },
    esg: { en: 'SEC/NGX sustainability disclosure guidelines for listed companies.', fr: 'Directives de divulgation de durabilité de la SEC/NGX pour les sociétés cotées.', ar: 'إرشادات إفصاح استدامة من هيئة الأوراق المالية وبورصة نيجيريا للشركات المدرجة.' },
    reporting: { en: 'National carbon registry and MRV being established under the Climate Change Act.', fr: 'Registre national du carbone et MRV en cours de création en vertu de la loi sur le changement climatique.', ar: 'سجل كربون وطني ونظام قياس وتحقق قيد الإنشاء بموجب قانون التغير المناخي.' },
  },
  ke: {
    level: 'orange',
    cbam: { en: 'No border mechanism; horticulture and manufacturing exporters tracking EU requirements.', fr: 'Aucun mécanisme frontalier ; les exportateurs d\'horticulture et de fabrication suivent les exigences européennes.', ar: 'لا آلية حدودية؛ مصدّرو البستنة والتصنيع يتابعون المتطلبات الأوروبية.' },
    tax: { en: 'No carbon tax; Climate Change (Amendment) Act 2023 regulates carbon markets — a continental leader in voluntary credits.', fr: 'Pas de taxe carbone ; la loi modificative sur le changement climatique de 2023 réglemente les marchés carbone — un leader continental en crédits volontaires.', ar: 'لا ضريبة كربون؛ قانون تعديل التغير المناخي 2023 ينظّم أسواق الكربون — رائدة قاريًا في الأرصدة الطوعية.' },
    esg: { en: 'NSE ESG disclosure guidance manual for listed companies (2021).', fr: 'Manuel de directives de divulgation ESG de la NSE pour les sociétés cotées (2021).', ar: 'دليل إرشادات إفصاح ESG لبورصة نيروبي للشركات المدرجة (2021).' },
    reporting: { en: 'National GHG inventory and registry under the Climate Change Directorate.', fr: 'Inventaire national des GES et registre sous la direction du changement climatique.', ar: 'جرد وطني لغازات الدفيئة وسجل تحت مديرية التغير المناخي.' },
  },
  ci: {
    level: 'orange',
    cbam: { en: 'No border mechanism; cocoa, agri and emerging industry exporters watching EU rules (EUDR & CBAM).', fr: 'Aucun mécanisme frontalier ; les exportateurs de cacao, d\'agriculture et d\'industrie émergente surveillent les règles européennes (RDUE et MACF).', ar: 'لا آلية حدودية؛ مصدّرو الكاكاو والزراعة والصناعة الناشئة يراقبون القواعد الأوروبية (EUDR وCBAM).' },
    tax: { en: 'No carbon tax; Article 6 carbon-market cooperation and national framework being piloted.', fr: 'Pas de taxe carbone ; coopération sur le marché carbone au titre de l\'Article 6 et cadre national en phase pilote.', ar: 'لا ضريبة كربون؛ تعاون سوق الكربون بموجب المادة 6 وإطار وطني قيد التجربة.' },
    esg: { en: 'Regional BRVM sustainability guidance emerging for listed companies.', fr: 'Directives régionales de durabilité de la BRVM émergentes pour les sociétés cotées.', ar: 'إرشادات استدامة إقليمية من بورصة BRVM في طور الظهور للشركات المدرجة.' },
    reporting: { en: 'MRV and registry under development within NDC implementation.', fr: 'MRV et registre en développement dans le cadre de la mise en œuvre de la CDN.', ar: 'نظام قياس وتحقق وسجل قيد التطوير ضمن تنفيذ المساهمة الوطنية.' },
  },
  dz: {
    level: 'green',
    cbam: { en: 'No border mechanism; fertilizer, steel and cement exporters to the EU exposed to CBAM.', fr: "Aucun mécanisme frontalier ; les exportateurs d'engrais, d'acier et de ciment vers l'UE exposés au MACF.", ar: 'لا آلية حدودية؛ مصدّرو الأسمدة والصلب والإسمنت إلى أوروبا معرّضون لـ CBAM.' },
    tax: { en: 'No carbon price; hydrocarbon-based economy; NDC and national climate plan under implementation.', fr: 'Pas de prix du carbone ; économie basée sur les hydrocarbures ; CDN et plan climatique national en cours de mise en œuvre.', ar: 'لا سعر كربون؛ اقتصاد قائم على المحروقات؛ المساهمة الوطنية والخطة المناخية قيد التنفيذ.' },
    esg: { en: 'Sustainability disclosure voluntary; early-stage ESG framework.', fr: 'Divulgation de durabilité volontaire ; cadre ESG à un stade précoce.', ar: 'إفصاح الاستدامة طوعي؛ إطار ESG في مرحلة مبكرة.' },
    reporting: { en: 'National GHG inventory via UNFCCC; no mandatory corporate reporting.', fr: 'Inventaire national des GES via la CCNUCC ; pas de reporting obligatoire pour les entreprises.', ar: 'جرد وطني لغازات الدفيئة عبر اتفاقية المناخ؛ لا إبلاغ إلزامي للشركات.' },
  },
  gh: {
    level: 'green',
    cbam: { en: 'No border mechanism; aluminium and cocoa-derived exports monitoring EU rules.', fr: 'Aucun mécanisme frontalier ; les exportations d\'aluminium et de dérivés du cacao surveillent les règles européennes.', ar: 'لا آلية حدودية؛ صادرات الألمنيوم ومشتقات الكاكاو تراقب القواعد الأوروبية.' },
    tax: { en: 'No carbon tax; pioneer of Article 6.2 cooperation (first authorized transfer with Switzerland); carbon registry live.', fr: 'Pas de taxe carbone ; pionnier de la coopération au titre de l\'Article 6.2 (premier transfert autorisé avec la Suisse) ; registre du carbone opérationnel.', ar: 'لا ضريبة كربون؛ رائدة في تعاون المادة 6.2 (أول تحويل مُرخَّص مع سويسرا)؛ سجل كربون قيد التشغيل.' },
    esg: { en: 'GSE sustainability disclosure guidance emerging.', fr: 'Directives de divulgation de durabilité de la GSE émergentes.', ar: 'إرشادات إفصاح استدامة من بورصة غانا في طور الظهور.' },
    reporting: { en: 'Advanced national MRV and carbon registry supporting Article 6 transfers.', fr: 'MRV national avancé et registre du carbone soutenant les transferts au titre de l\'Article 6.', ar: 'نظام قياس وتحقق وطني متقدم وسجل كربون يدعم تحويلات المادة 6.' },
  },
  et: {
    level: 'green',
    cbam: { en: 'No border mechanism; limited EU industrial exports, low direct CBAM exposure.', fr: 'Aucun mécanisme frontalier ; exportations industrielles limitées vers l\'UE, faible exposition directe au MACF.', ar: 'لا آلية حدودية؛ صادرات صناعية محدودة إلى أوروبا وانكشاف مباشر منخفض على CBAM.' },
    tax: { en: 'No carbon price; Climate-Resilient Green Economy (CRGE) strategy toward 2050.', fr: 'Pas de prix du carbone ; stratégie d\'économie verte résiliente au climat (CRGE) vers 2050.', ar: 'لا سعر كربون؛ استراتيجية الاقتصاد الأخضر المقاوم للمناخ (CRGE) حتى 2050.' },
    esg: { en: 'Sustainability disclosure voluntary; nascent capital-market framework.', fr: 'Divulgation de durabilité volontaire ; cadre de marché des capitaux naissant.', ar: 'إفصاح الاستدامة طوعي؛ إطار سوق مالي ناشئ.' },
    reporting: { en: 'National GHG inventory via UNFCCC; MRV capacity building underway.', fr: 'Inventaire national des GES via la CCNUCC ; renforcement des capacités MRV en cours.', ar: 'جرد وطني لغازات الدفيئة عبر اتفاقية المناخ؛ بناء قدرات القياس والتحقق جارٍ.' },
  },
  sn: {
    level: 'green',
    cbam: { en: 'No border mechanism; phosphates and emerging gas sector monitoring EU rules.', fr: 'Aucun mécanisme frontalier ; les phosphates et le secteur gazier émergent surveillent les règles européennes.', ar: 'لا آلية حدودية؛ الفوسفات وقطاع الغاز الناشئ يراقبان القواعد الأوروبية.' },
    tax: { en: 'No carbon price; Article 6 cooperation and NDC implementation under way.', fr: 'Pas de prix du carbone ; coopération au titre de l\'Article 6 et mise en œuvre de la CDN en cours.', ar: 'لا سعر كربون؛ تعاون المادة 6 وتنفيذ المساهمة الوطنية جاريان.' },
    esg: { en: 'Regional BRVM sustainability guidance emerging.', fr: 'Directives régionales de durabilité de la BRVM émergentes.', ar: 'إرشادات استدامة إقليمية من بورصة BRVM في طور الظهور.' },
    reporting: { en: 'National GHG inventory via UNFCCC; MRV under development.', fr: 'Inventaire national des GES via la CCNUCC ; MRV en développement.', ar: 'جرد وطني لغازات الدفيئة عبر اتفاقية المناخ؛ نظام قياس وتحقق قيد التطوير.' },
  },
}

/* African countries — assign level (default green) ------------------------ */

const AFRICA_ISO = [
  'dz', 'ao', 'bj', 'bw', 'bf', 'bi', 'cm', 'cv', 'cf', 'td', 'km', 'cg', 'cd', 'dj', 'eg', 'gq',
  'er', 'sz', 'et', 'ga', 'gm', 'gh', 'gn', 'gw', 'ci', 'ke', 'ls', 'lr', 'ly', 'mg', 'mw', 'ml',
  'mr', 'mu', 'ma', 'mz', 'na', 'ne', 'ng', 'rw', 'st', 'sn', 'sc', 'sl', 'so', 'somaliland', 'za',
  'ss', 'sd', 'tz', 'tg', 'tn', 'ug', 'zm', 'zw',
]

const AFRICA_ORANGE = new Set(['za', 'eg', 'ma', 'ng', 'ke', 'ci'])

const EU_MEMBERS = [
  'de', 'fr', 'it', 'es', 'pt', 'nl', 'be', 'at', 'pl', 'se', 'fi', 'dk', 'ie', 'gr', 'cz', 'ro',
  'hu', 'bg', 'sk', 'hr', 'si', 'lt', 'lv', 'ee', 'lu', 'cy', 'mt',
]

/* Assemble the full registry --------------------------------------------- */

function build(): Record<string, Reg> {
  const reg: Record<string, Reg> = {}

  // Specific detailed entries
  for (const [iso, d] of Object.entries(SPECIFIC)) {
    if (NAMES[iso]) reg[iso] = { name: NAMES[iso], ...d }
  }

  // EU members share the EU profile (red)
  for (const iso of EU_MEMBERS) {
    if (!reg[iso] && NAMES[iso]) reg[iso] = { level: 'red', name: NAMES[iso], ...EU_PROFILE }
  }

  // Every African country gets a color + clickable detail
  for (const iso of AFRICA_ISO) {
    if (reg[iso]) continue
    const level: Level = AFRICA_ORANGE.has(iso) ? 'orange' : 'green'
    const gen = level === 'orange' ? GEN_ORANGE : GEN_GREEN
    reg[iso] = { level, name: NAMES[iso] ?? { en: iso.toUpperCase(), fr: iso.toUpperCase(), ar: iso.toUpperCase() }, ...gen }
  }

  return reg
}

export const REG: Record<string, Reg> = build()

/** Land countries with no regulatory entry render as neutral, non-clickable. */
export const HAS_REG = (iso: string) => iso in REG
