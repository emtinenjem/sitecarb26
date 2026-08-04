export interface LegalSection {
  heading: string
  body?: string[]
  bullets?: string[]
}

export interface LegalDoc {
  slug: string
  title: string
  summary: string
  updated: string
  intro: string
  sections: LegalSection[]
}

const COMPANY = 'Photocarb Technologies'
const HQ = 'Avenue Yasser Arafat, Sahloul, Sousse, Tunisia'
const GULF_OFFICE = 'West Bay Business District, Doha, State of Qatar'

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    summary: 'How Photocarb collects, uses, and protects personal and operational data.',
    updated: 'July 2026',
    intro: `${COMPANY} ("Photocarb", "we", "us", or "our") is committed to protecting the privacy and security of the information entrusted to us. This Privacy Policy explains what data we collect, why we collect it, how we use and safeguard it, and the rights available to you when you use our website, platform, and services (collectively, the "Services").`,
    sections: [
      {
        heading: '1. Who We Are',
        body: [
          `${COMPANY} is a climate-technology software company registered in the Republic of Tunisia (Registre National des Entreprises No. 1959008R), with its headquarters at ${HQ} and a Gulf office at ${GULF_OFFICE}. Photocarb acts as the data controller for personal data processed through its website, and as either a data controller or a data processor for information processed through its platform, depending on the context of the engagement.`,
        ],
      },
      {
        heading: '2. Information We Collect',
        body: ['We collect the following categories of information:'],
        bullets: [
          'Identity and contact data — name, job title, employer, business email address, and phone number provided through demo requests, contact forms, or account registration.',
          'Operational and emissions data — facility, sensor, energy, production, and supply-chain data submitted to the platform for carbon accounting, LCA, CBAM, MRV, and reporting purposes.',
          'Usage and technical data — IP address, browser type, device information, pages visited, and interactions with the platform, collected via cookies and similar technologies.',
          'Communications data — records of correspondence when you contact us for support, sales, or other enquiries.',
        ],
      },
      {
        heading: '3. How We Use Your Information',
        body: ['We use the information we collect to:'],
        bullets: [
          'Provide, operate, and maintain the Services, including carbon measurement, reporting, and compliance functionality.',
          'Respond to demo requests, enquiries, and support tickets.',
          'Generate the regulatory and sustainability reports you request.',
          'Improve, secure, and develop our platform and website.',
          'Comply with legal, regulatory, and contractual obligations.',
        ],
      },
      {
        heading: '4. Legal Basis for Processing',
        body: [
          'Where applicable law requires a legal basis for processing, we rely on one or more of the following: the performance of a contract with you or your organisation; your consent; our legitimate business interests; and compliance with a legal obligation. For individuals in the European Union, processing is carried out in accordance with the General Data Protection Regulation (GDPR); for individuals in Tunisia, in accordance with Organic Law No. 2004-63 on the Protection of Personal Data, under the supervision of the Instance Nationale de Protection des Données à Caractère Personnel (INPDP).',
        ],
      },
      {
        heading: '5. Data Sharing and Disclosure',
        body: [
          'We do not sell your personal data. We may share information with trusted sub-processors and service providers who support the delivery of our Services (such as hosting and infrastructure providers), with professional advisers, and with regulatory or governmental authorities where required by law. All sub-processors are bound by contractual obligations consistent with this Policy.',
        ],
      },
      {
        heading: '6. Data Residency and International Transfers',
        body: [
          'Photocarb prioritises Tunisia- and EU-hosted data infrastructure. Where data is transferred across borders — for example, between our Tunisia and Gulf operations — we implement appropriate safeguards, including contractual protections, to ensure your data remains protected to the standard described in this Policy.',
        ],
      },
      {
        heading: '7. Data Security',
        body: [
          'We maintain technical and organisational measures designed to protect information against unauthorised access, alteration, disclosure, or destruction. These include encryption in transit and at rest, access controls, and regular security reviews aligned with recognised international standards.',
        ],
      },
      {
        heading: '8. Data Retention',
        body: [
          'We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. Operational and emissions data is retained in accordance with the terms of the relevant service agreement.',
        ],
      },
      {
        heading: '9. Your Rights',
        body: ['Subject to applicable law, you may have the right to:'],
        bullets: [
          'Access the personal data we hold about you.',
          'Request correction of inaccurate or incomplete data.',
          'Request deletion of your data in certain circumstances.',
          'Object to or restrict certain processing.',
          'Request a copy of your data in a portable format.',
          'Withdraw consent where processing is based on consent.',
        ],
      },
      {
        heading: '10. Contact Us',
        body: [
          'For any questions about this Privacy Policy or to exercise your rights, please contact our privacy team at info@photocarb.com.',
        ],
      },
    ],
  },
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    summary: 'The terms governing your use of the Photocarb website and platform.',
    updated: 'July 2026',
    intro: `These Terms of Service ("Terms") govern your access to and use of the website, platform, and services provided by ${COMPANY} ("Photocarb"). By accessing or using the Services, you agree to be bound by these Terms. If you do not agree, you must not use the Services.`,
    sections: [
      {
        heading: '1. Acceptance of Terms',
        body: [
          'By accessing the Photocarb website or using the platform, you confirm that you have the authority to enter into these Terms on behalf of yourself or the organisation you represent, and that you accept these Terms in full.',
        ],
      },
      {
        heading: '2. The Services',
        body: [
          'Photocarb provides an AI-powered carbon intelligence platform for measuring, managing, and reporting greenhouse gas emissions, including carbon accounting, Life Cycle Assessment (LCA), ESG reporting, CBAM compliance, MRV, and supply-chain analytics. Specific features, scope, and service levels are defined in the applicable order form or service agreement between you and Photocarb.',
        ],
      },
      {
        heading: '3. Accounts and Access',
        body: [
          'Access to certain features requires an account. You are responsible for maintaining the confidentiality of your credentials and for all activity carried out under your account. You must notify Photocarb promptly of any unauthorised use.',
        ],
      },
      {
        heading: '4. Customer Data and Ownership',
        body: [
          'You retain all rights, title, and interest in the operational, emissions, and business data you submit to the platform ("Customer Data"). You grant Photocarb a limited licence to process Customer Data solely to provide and improve the Services. Photocarb retains all rights in the platform, software, models, and methodologies.',
        ],
      },
      {
        heading: '5. Acceptable Use',
        body: ['You agree not to:'],
        bullets: [
          'Use the Services in violation of any applicable law or regulation.',
          'Attempt to gain unauthorised access to the platform or its underlying systems.',
          'Reverse engineer, copy, or resell any part of the Services except as permitted by law.',
          'Upload malicious code or interfere with the integrity or performance of the Services.',
        ],
      },
      {
        heading: '6. Reports and Regulatory Reliance',
        body: [
          'Photocarb applies recognised methodologies and standards to generate reports and calculations. However, the outputs depend on the accuracy and completeness of the data you provide. You remain responsible for reviewing outputs and for your own regulatory filings and compliance obligations. Reports are provided as a decision-support tool and do not constitute legal, financial, or professional advice.',
        ],
      },
      {
        heading: '7. Fees and Payment',
        body: [
          'Fees, billing cycles, and payment terms are set out in the applicable order form or service agreement. Unless otherwise stated, fees are non-refundable and exclusive of applicable taxes.',
        ],
      },
      {
        heading: '8. Intellectual Property',
        body: [
          'All intellectual property rights in the platform, website, branding, and documentation are and remain the property of Photocarb or its licensors. Nothing in these Terms transfers any such rights to you.',
        ],
      },
      {
        heading: '9. Limitation of Liability',
        body: [
          'To the maximum extent permitted by law, Photocarb shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Services. Photocarb\'s total aggregate liability shall not exceed the fees paid by you for the Services in the twelve months preceding the event giving rise to the claim.',
        ],
      },
      {
        heading: '10. Governing Law',
        body: [
          'These Terms are governed by the laws of the Republic of Tunisia. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts of Sousse, Tunisia, without prejudice to any mandatory consumer protections available to you.',
        ],
      },
      {
        heading: '11. Contact Us',
        body: [
          'For questions regarding these Terms, please contact info@photocarb.com.',
        ],
      },
    ],
  },
  {
    slug: 'data-processing-agreement',
    title: 'Data Processing Agreement',
    summary: 'How Photocarb processes personal data on behalf of its customers.',
    updated: 'July 2026',
    intro: `This Data Processing Agreement ("DPA") forms part of the service agreement between ${COMPANY} ("Photocarb", acting as data processor) and the customer ("Controller"). It governs the processing of personal data carried out by Photocarb on behalf of the Controller in connection with the Services.`,
    sections: [
      {
        heading: '1. Roles of the Parties',
        body: [
          'For personal data processed on behalf of the Controller, the Controller is the data controller and Photocarb is the data processor. Each party shall comply with its respective obligations under applicable data protection law, including the GDPR and Tunisia\'s Organic Law No. 2004-63 (INPDP) where relevant.',
        ],
      },
      {
        heading: '2. Scope and Purpose of Processing',
        body: [
          'Photocarb processes personal data only for the purpose of providing the Services and strictly in accordance with the Controller\'s documented instructions, unless required otherwise by law. The subject matter, duration, nature, and purpose of processing are defined by the service agreement.',
        ],
      },
      {
        heading: '3. Categories of Data and Data Subjects',
        body: ['Processing under this DPA may involve:'],
        bullets: [
          'Data subjects: the Controller\'s employees, contractors, and authorised platform users.',
          'Categories of data: identity and contact details, account credentials, and usage records associated with platform access.',
        ],
      },
      {
        heading: '4. Confidentiality',
        body: [
          'Photocarb ensures that all personnel authorised to process personal data are bound by appropriate confidentiality obligations and are made aware of the confidential nature of the data.',
        ],
      },
      {
        heading: '5. Security Measures',
        body: [
          'Photocarb implements appropriate technical and organisational measures to ensure a level of security appropriate to the risk, including encryption, access control, network security, logging, and regular testing of the effectiveness of these measures.',
        ],
      },
      {
        heading: '6. Sub-Processors',
        body: [
          'The Controller grants a general authorisation for Photocarb to engage sub-processors to support the delivery of the Services. Photocarb maintains a list of sub-processors, imposes data protection obligations on them consistent with this DPA, and remains responsible for their performance. Photocarb will inform the Controller of intended changes to sub-processors and provide an opportunity to object on reasonable grounds.',
        ],
      },
      {
        heading: '7. Assistance to the Controller',
        body: [
          'Taking into account the nature of processing, Photocarb assists the Controller by appropriate technical and organisational measures in fulfilling the Controller\'s obligations to respond to data-subject requests and to ensure compliance with security, breach-notification, and data-protection-impact-assessment obligations.',
        ],
      },
      {
        heading: '8. Personal Data Breach',
        body: [
          'Photocarb notifies the Controller without undue delay after becoming aware of a personal data breach affecting the Controller\'s data, and provides sufficient information to enable the Controller to meet any obligations to report the breach to the relevant supervisory authority and affected data subjects.',
        ],
      },
      {
        heading: '9. International Transfers',
        body: [
          'Where personal data is transferred across borders, Photocarb ensures that appropriate safeguards are in place, including contractual protections, so that the level of protection required by applicable law is maintained.',
        ],
      },
      {
        heading: '10. Return or Deletion of Data',
        body: [
          'Upon termination of the Services, Photocarb will, at the Controller\'s choice, return or securely delete the personal data processed on the Controller\'s behalf, unless retention is required by applicable law.',
        ],
      },
      {
        heading: '11. Contact Us',
        body: [
          'To request a signed copy of this DPA or Photocarb\'s current sub-processor list, please contact info@photocarb.com.',
        ],
      },
    ],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    summary: 'How Photocarb uses cookies and similar technologies on its website.',
    updated: 'July 2026',
    intro: `This Cookie Policy explains how ${COMPANY} ("Photocarb") uses cookies and similar technologies when you visit our website. It should be read together with our Privacy Policy.`,
    sections: [
      {
        heading: '1. What Are Cookies',
        body: [
          'Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, to improve efficiency, and to provide information to site owners. Similar technologies include pixels, local storage, and software development kits.',
        ],
      },
      {
        heading: '2. Types of Cookies We Use',
        body: ['We use the following categories of cookies:'],
        bullets: [
          'Strictly necessary cookies — required for the website to function, such as security, network management, and accessibility. These cannot be switched off.',
          'Performance and analytics cookies — help us understand how visitors interact with the website so we can improve it. These are only set with your consent where required.',
          'Functionality cookies — remember your preferences, such as language, to provide an enhanced experience.',
        ],
      },
      {
        heading: '3. How We Use Cookies',
        body: [
          'We use cookies to operate and secure the website, to remember your preferences, to measure and analyse traffic, and to understand which content is most useful to our visitors. We do not use cookies to sell your personal information.',
        ],
      },
      {
        heading: '4. Managing Your Preferences',
        body: [
          'You can control and manage cookies through your browser settings, and you can delete cookies already stored on your device. Please note that disabling certain cookies may affect the functionality of the website. Where consent is required, you may withdraw it at any time.',
        ],
      },
      {
        heading: '5. Third-Party Cookies',
        body: [
          'Some cookies may be set by third-party services that appear on our pages. We do not control the placement of these cookies, and we recommend reviewing the relevant third parties\' own privacy and cookie policies.',
        ],
      },
      {
        heading: '6. Updates to This Policy',
        body: [
          'We may update this Cookie Policy from time to time to reflect changes in technology, law, or our practices. The date at the top of this page indicates when it was last revised.',
        ],
      },
      {
        heading: '7. Contact Us',
        body: [
          'If you have questions about our use of cookies, please contact info@photocarb.com.',
        ],
      },
    ],
  },
]

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return LEGAL_DOCS.find(d => d.slug === slug)
}

/* ---- French localization ---- */
type LegalDocL10n = Omit<LegalDoc, 'slug'>

const LEGAL_DOCS_FR: Record<string, LegalDocL10n> = {
  'privacy-policy': {
    title: 'Politique de Confidentialité',
    summary: 'Comment Photocarb collecte, utilise et protège les données personnelles et opérationnelles.',
    updated: 'Juillet 2026',
    intro: `${COMPANY} (« Photocarb », « nous », « notre » ou « nos ») s'engage à protéger la confidentialité et la sécurité des informations qui lui sont confiées. Cette Politique de Confidentialité explique quelles données nous collectons, pourquoi nous les collectons, comment nous les utilisons et les protégeons, ainsi que les droits dont vous disposez lorsque vous utilisez notre site web, notre plateforme et nos services (collectivement, les « Services »).`,
    sections: [
      {
        heading: '1. Qui nous sommes',
        body: [
          `${COMPANY} est une entreprise de technologie climatique enregistrée en République tunisienne (Registre National des Entreprises n° 1959008R), dont le siège social est situé à ${HQ} et qui dispose d'un bureau du Golfe à ${GULF_OFFICE}. Photocarb agit en tant que responsable du traitement des données personnelles traitées via son site web, et en tant que responsable du traitement ou sous-traitant des informations traitées via sa plateforme, selon le contexte de la mission.`,
        ],
      },
      {
        heading: "2. Informations que nous collectons",
        body: ["Nous collectons les catégories d'informations suivantes :"],
        bullets: [
          "Données d'identité et de contact — nom, fonction, employeur, adresse e-mail professionnelle et numéro de téléphone fournis lors de demandes de démonstration, de formulaires de contact ou d'inscription de compte.",
          "Données opérationnelles et d'émissions — données d'installation, de capteurs, d'énergie, de production et de chaîne d'approvisionnement soumises à la plateforme à des fins de comptabilité carbone, d'ACV, de MACF, de MRV et de reporting.",
          "Données d'utilisation et techniques — adresse IP, type de navigateur, informations sur l'appareil, pages visitées et interactions avec la plateforme, collectées via des cookies et technologies similaires.",
          'Données de communication — enregistrements de correspondance lorsque vous nous contactez pour une assistance, des ventes ou d\'autres demandes.',
        ],
      },
      {
        heading: '3. Comment nous utilisons vos informations',
        body: ["Nous utilisons les informations que nous collectons pour :"],
        bullets: [
          'Fournir, exploiter et maintenir les Services, y compris les fonctionnalités de mesure carbone, de reporting et de conformité.',
          "Répondre aux demandes de démonstration, aux questions et aux tickets d'assistance.",
          'Générer les rapports réglementaires et de durabilité que vous demandez.',
          'Améliorer, sécuriser et développer notre plateforme et notre site web.',
          'Nous conformer à nos obligations légales, réglementaires et contractuelles.',
        ],
      },
      {
        heading: '4. Base légale du traitement',
        body: [
          "Lorsque la loi applicable exige une base légale pour le traitement, nous nous appuyons sur un ou plusieurs des éléments suivants : l'exécution d'un contrat avec vous ou votre organisation ; votre consentement ; nos intérêts légitimes ; et le respect d'une obligation légale. Pour les personnes situées dans l'Union européenne, le traitement est effectué conformément au Règlement Général sur la Protection des Données (RGPD) ; pour les personnes situées en Tunisie, conformément à la loi organique n° 2004-63 relative à la protection des données à caractère personnel, sous la supervision de l'Instance Nationale de Protection des Données à Caractère Personnel (INPDP).",
        ],
      },
      {
        heading: '5. Partage et divulgation des données',
        body: [
          "Nous ne vendons pas vos données personnelles. Nous pouvons partager des informations avec des sous-traitants et prestataires de confiance qui soutiennent la fourniture de nos Services (tels que les fournisseurs d'hébergement et d'infrastructure), avec des conseillers professionnels, et avec des autorités réglementaires ou gouvernementales lorsque la loi l'exige. Tous les sous-traitants sont liés par des obligations contractuelles conformes à cette Politique.",
        ],
      },
      {
        heading: '6. Résidence des données et transferts internationaux',
        body: [
          "Photocarb privilégie une infrastructure de données hébergée en Tunisie et dans l'UE. Lorsque des données sont transférées au-delà des frontières — par exemple, entre nos activités en Tunisie et dans le Golfe — nous mettons en œuvre des garanties appropriées, y compris des protections contractuelles, afin de garantir que vos données restent protégées au niveau décrit dans cette Politique.",
        ],
      },
      {
        heading: '7. Sécurité des données',
        body: [
          "Nous maintenons des mesures techniques et organisationnelles conçues pour protéger les informations contre tout accès non autorisé, altération, divulgation ou destruction. Celles-ci incluent le chiffrement en transit et au repos, des contrôles d'accès, et des revues de sécurité régulières alignées sur les normes internationales reconnues.",
        ],
      },
      {
        heading: '8. Conservation des données',
        body: [
          "Nous conservons les données personnelles uniquement le temps nécessaire pour remplir les finalités pour lesquelles elles ont été collectées, y compris pour satisfaire aux exigences légales, comptables ou de reporting. Les données opérationnelles et d'émissions sont conservées conformément aux termes de l'accord de service applicable.",
        ],
      },
      {
        heading: '9. Vos droits',
        body: ['Sous réserve de la loi applicable, vous pouvez avoir le droit de :'],
        bullets: [
          'Accéder aux données personnelles que nous détenons à votre sujet.',
          "Demander la correction de données inexactes ou incomplètes.",
          'Demander la suppression de vos données dans certaines circonstances.',
          "Vous opposer à certains traitements ou en demander la limitation.",
          "Demander une copie de vos données dans un format portable.",
          "Retirer votre consentement lorsque le traitement est fondé sur celui-ci.",
        ],
      },
      {
        heading: '10. Nous contacter',
        body: [
          'Pour toute question concernant cette Politique de Confidentialité ou pour exercer vos droits, veuillez contacter notre équipe chargée de la confidentialité à info@photocarb.com.',
        ],
      },
    ],
  },
  'terms-of-service': {
    title: "Conditions Générales d'Utilisation",
    summary: "Les conditions régissant votre utilisation du site web et de la plateforme Photocarb.",
    updated: 'Juillet 2026',
    intro: `Les présentes Conditions Générales d'Utilisation (les « Conditions ») régissent votre accès et votre utilisation du site web, de la plateforme et des services fournis par ${COMPANY} (« Photocarb »). En accédant aux Services ou en les utilisant, vous acceptez d'être lié par les présentes Conditions. Si vous n'acceptez pas ces Conditions, vous ne devez pas utiliser les Services.`,
    sections: [
      {
        heading: '1. Acceptation des Conditions',
        body: [
          "En accédant au site web de Photocarb ou en utilisant la plateforme, vous confirmez que vous avez l'autorité nécessaire pour conclure les présentes Conditions en votre nom ou au nom de l'organisation que vous représentez, et que vous acceptez les présentes Conditions dans leur intégralité.",
        ],
      },
      {
        heading: '2. Les Services',
        body: [
          "Photocarb fournit une plateforme d'intelligence carbone basée sur l'IA pour mesurer, gérer et rapporter les émissions de gaz à effet de serre, incluant la comptabilité carbone, l'Analyse de Cycle de Vie (ACV), le reporting ESG, la conformité MACF, le MRV et l'analyse de la chaîne d'approvisionnement. Les fonctionnalités spécifiques, la portée et les niveaux de service sont définis dans le bon de commande ou l'accord de service applicable entre vous et Photocarb.",
        ],
      },
      {
        heading: '3. Comptes et accès',
        body: [
          "L'accès à certaines fonctionnalités nécessite un compte. Vous êtes responsable de la confidentialité de vos identifiants et de toute activité effectuée sous votre compte. Vous devez informer Photocarb rapidement de toute utilisation non autorisée.",
        ],
      },
      {
        heading: '4. Données client et propriété',
        body: [
          'Vous conservez tous les droits, titres et intérêts sur les données opérationnelles, d\'émissions et commerciales que vous soumettez à la plateforme (les « Données Client »). Vous accordez à Photocarb une licence limitée pour traiter les Données Client uniquement dans le but de fournir et d\'améliorer les Services. Photocarb conserve tous les droits sur la plateforme, les logiciels, les modèles et les méthodologies.',
        ],
      },
      {
        heading: '5. Utilisation acceptable',
        body: ['Vous acceptez de ne pas :'],
        bullets: [
          'Utiliser les Services en violation de toute loi ou réglementation applicable.',
          "Tenter d'accéder sans autorisation à la plateforme ou à ses systèmes sous-jacents.",
          "Faire de l'ingénierie inverse, copier ou revendre toute partie des Services sauf si la loi le permet.",
          'Téléverser du code malveillant ou interférer avec l\'intégrité ou la performance des Services.',
        ],
      },
      {
        heading: '6. Rapports et fiabilité réglementaire',
        body: [
          "Photocarb applique des méthodologies et normes reconnues pour générer des rapports et des calculs. Cependant, les résultats dépendent de l'exactitude et de l'exhaustivité des données que vous fournissez. Vous restez responsable de l'examen des résultats et de vos propres déclarations réglementaires et obligations de conformité. Les rapports sont fournis comme outil d'aide à la décision et ne constituent pas un conseil juridique, financier ou professionnel.",
        ],
      },
      {
        heading: '7. Frais et paiement',
        body: [
          'Les frais, cycles de facturation et modalités de paiement sont définis dans le bon de commande ou l\'accord de service applicable. Sauf indication contraire, les frais sont non remboursables et hors taxes applicables.',
        ],
      },
      {
        heading: '8. Propriété intellectuelle',
        body: [
          'Tous les droits de propriété intellectuelle sur la plateforme, le site web, la marque et la documentation sont et restent la propriété de Photocarb ou de ses concédants. Rien dans les présentes Conditions ne vous transfère de tels droits.',
        ],
      },
      {
        heading: '9. Limitation de responsabilité',
        body: [
          "Dans toute la mesure permise par la loi, Photocarb ne pourra être tenue responsable de tout dommage indirect, accessoire ou consécutif résultant de votre utilisation des Services. La responsabilité globale totale de Photocarb ne dépassera pas les frais que vous avez payés pour les Services au cours des douze mois précédant l'événement à l'origine de la réclamation.",
        ],
      },
      {
        heading: '10. Loi applicable',
        body: [
          "Les présentes Conditions sont régies par les lois de la République tunisienne. Tout litige découlant des présentes Conditions ou en rapport avec celles-ci sera soumis à la compétence exclusive des tribunaux compétents de Sousse, en Tunisie, sans préjudice des protections obligatoires du consommateur qui pourraient vous être applicables.",
        ],
      },
      {
        heading: '11. Nous contacter',
        body: [
          'Pour toute question concernant les présentes Conditions, veuillez contacter info@photocarb.com.',
        ],
      },
    ],
  },
  'data-processing-agreement': {
    title: 'Accord de Traitement des Données',
    summary: 'Comment Photocarb traite les données personnelles pour le compte de ses clients.',
    updated: 'Juillet 2026',
    intro: `Cet Accord de Traitement des Données (l'« ATD ») fait partie de l'accord de service entre ${COMPANY} (« Photocarb », agissant en tant que sous-traitant) et le client (le « Responsable du traitement »). Il régit le traitement des données personnelles effectué par Photocarb pour le compte du Responsable du traitement dans le cadre des Services.`,
    sections: [
      {
        heading: '1. Rôles des parties',
        body: [
          "Pour les données personnelles traitées pour le compte du Responsable du traitement, le Responsable du traitement est le responsable du traitement et Photocarb est le sous-traitant. Chaque partie se conformera à ses obligations respectives en vertu de la loi applicable en matière de protection des données, y compris le RGPD et la loi organique tunisienne n° 2004-63 (INPDP) le cas échéant.",
        ],
      },
      {
        heading: '2. Portée et finalité du traitement',
        body: [
          "Photocarb traite les données personnelles uniquement dans le but de fournir les Services et strictement conformément aux instructions documentées du Responsable du traitement, sauf si la loi l'exige autrement. L'objet, la durée, la nature et la finalité du traitement sont définis par l'accord de service.",
        ],
      },
      {
        heading: '3. Catégories de données et de personnes concernées',
        body: ['Le traitement en vertu du présent ATD peut impliquer :'],
        bullets: [
          'Personnes concernées : les employés, sous-traitants et utilisateurs autorisés de la plateforme du Responsable du traitement.',
          "Catégories de données : identité et coordonnées, identifiants de compte, et journaux d'utilisation associés à l'accès à la plateforme.",
        ],
      },
      {
        heading: '4. Confidentialité',
        body: [
          "Photocarb veille à ce que l'ensemble du personnel autorisé à traiter des données personnelles soit lié par des obligations de confidentialité appropriées et soit informé de la nature confidentielle des données.",
        ],
      },
      {
        heading: '5. Mesures de sécurité',
        body: [
          "Photocarb met en œuvre des mesures techniques et organisationnelles appropriées pour assurer un niveau de sécurité adapté au risque, y compris le chiffrement, le contrôle d'accès, la sécurité réseau, la journalisation et des tests réguliers de l'efficacité de ces mesures.",
        ],
      },
      {
        heading: '6. Sous-traitants ultérieurs',
        body: [
          "Le Responsable du traitement accorde une autorisation générale à Photocarb pour engager des sous-traitants ultérieurs afin de soutenir la fourniture des Services. Photocarb maintient une liste de sous-traitants ultérieurs, leur impose des obligations de protection des données conformes au présent ATD, et reste responsable de leur performance. Photocarb informera le Responsable du traitement des changements prévus de sous-traitants ultérieurs et lui donnera la possibilité de s'y opposer pour des motifs raisonnables.",
        ],
      },
      {
        heading: '7. Assistance au Responsable du traitement',
        body: [
          "Compte tenu de la nature du traitement, Photocarb assiste le Responsable du traitement par des mesures techniques et organisationnelles appropriées pour l'aider à remplir ses obligations de répondre aux demandes des personnes concernées et à assurer la conformité avec les obligations de sécurité, de notification de violation et d'analyse d'impact relative à la protection des données.",
        ],
      },
      {
        heading: '8. Violation de données personnelles',
        body: [
          "Photocarb notifie le Responsable du traitement sans délai indu après avoir pris connaissance d'une violation de données personnelles affectant les données du Responsable du traitement, et fournit des informations suffisantes pour permettre au Responsable du traitement de respecter toute obligation de signaler la violation à l'autorité de contrôle compétente et aux personnes concernées.",
        ],
      },
      {
        heading: '9. Transferts internationaux',
        body: [
          "Lorsque des données personnelles sont transférées au-delà des frontières, Photocarb veille à ce que des garanties appropriées soient en place, y compris des protections contractuelles, afin que le niveau de protection requis par la loi applicable soit maintenu.",
        ],
      },
      {
        heading: '10. Restitution ou suppression des données',
        body: [
          "À la fin des Services, Photocarb, au choix du Responsable du traitement, restituera ou supprimera de manière sécurisée les données personnelles traitées pour le compte du Responsable du traitement, sauf si leur conservation est requise par la loi applicable.",
        ],
      },
      {
        heading: '11. Nous contacter',
        body: [
          "Pour demander une copie signée de cet ATD ou la liste actuelle des sous-traitants de Photocarb, veuillez contacter info@photocarb.com.",
        ],
      },
    ],
  },
  'cookie-policy': {
    title: 'Politique relative aux Cookies',
    summary: 'Comment Photocarb utilise les cookies et technologies similaires sur son site web.',
    updated: 'Juillet 2026',
    intro: `Cette Politique relative aux Cookies explique comment ${COMPANY} (« Photocarb ») utilise des cookies et des technologies similaires lorsque vous visitez notre site web. Elle doit être lue conjointement avec notre Politique de Confidentialité.`,
    sections: [
      {
        heading: '1. Que sont les cookies',
        body: [
          "Les cookies sont de petits fichiers texte placés sur votre appareil lorsque vous visitez un site web. Ils sont largement utilisés pour faire fonctionner les sites web, améliorer leur efficacité et fournir des informations aux propriétaires de sites. Les technologies similaires incluent les pixels, le stockage local et les kits de développement logiciel.",
        ],
      },
      {
        heading: '2. Types de cookies que nous utilisons',
        body: ['Nous utilisons les catégories de cookies suivantes :'],
        bullets: [
          'Cookies strictement nécessaires — requis pour le fonctionnement du site web, tels que la sécurité, la gestion du réseau et l\'accessibilité. Ils ne peuvent pas être désactivés.',
          "Cookies de performance et d'analyse — nous aident à comprendre comment les visiteurs interagissent avec le site web afin de l'améliorer. Ils ne sont définis qu'avec votre consentement lorsque cela est requis.",
          'Cookies de fonctionnalité — mémorisent vos préférences, telles que la langue, pour offrir une expérience améliorée.',
        ],
      },
      {
        heading: '3. Comment nous utilisons les cookies',
        body: [
          "Nous utilisons les cookies pour exploiter et sécuriser le site web, mémoriser vos préférences, mesurer et analyser le trafic, et comprendre quel contenu est le plus utile à nos visiteurs. Nous n'utilisons pas de cookies pour vendre vos informations personnelles.",
        ],
      },
      {
        heading: '4. Gérer vos préférences',
        body: [
          "Vous pouvez contrôler et gérer les cookies via les paramètres de votre navigateur, et vous pouvez supprimer les cookies déjà stockés sur votre appareil. Veuillez noter que la désactivation de certains cookies peut affecter le fonctionnement du site web. Lorsque le consentement est requis, vous pouvez le retirer à tout moment.",
        ],
      },
      {
        heading: '5. Cookies tiers',
        body: [
          "Certains cookies peuvent être définis par des services tiers apparaissant sur nos pages. Nous ne contrôlons pas le placement de ces cookies, et nous vous recommandons de consulter les propres politiques de confidentialité et de cookies de ces tiers.",
        ],
      },
      {
        heading: '6. Mises à jour de cette Politique',
        body: [
          "Nous pouvons mettre à jour cette Politique relative aux Cookies de temps à autre pour refléter les changements technologiques, légaux ou de nos pratiques. La date en haut de cette page indique la dernière révision.",
        ],
      },
      {
        heading: '7. Nous contacter',
        body: [
          'Si vous avez des questions concernant notre utilisation des cookies, veuillez contacter info@photocarb.com.',
        ],
      },
    ],
  },
}

/* ---- Arabic localization ---- */
const LEGAL_DOCS_AR: Record<string, LegalDocL10n> = {
  'privacy-policy': {
    title: 'سياسة الخصوصية',
    summary: 'كيف تجمع فوتوكارب البيانات الشخصية والتشغيلية وتستخدمها وتحميها.',
    updated: 'يوليو 2026',
    intro: `تلتزم ${COMPANY} ("فوتوكارب" أو "نحن" أو "لنا") بحماية خصوصية وأمن المعلومات المُودعة لدينا. توضّح سياسة الخصوصية هذه البيانات التي نجمعها، وأسباب جمعها، وكيفية استخدامها وحمايتها، والحقوق المتاحة لكم عند استخدام موقعنا الإلكتروني ومنصتنا وخدماتنا (يُشار إليها مجتمعة بـ"الخدمات").`,
    sections: [
      {
        heading: '1. من نحن',
        body: [
          `${COMPANY} شركة برمجيات في مجال تقنية المناخ، مسجّلة في الجمهورية التونسية (السجل الوطني للمؤسسات رقم 1959008R)، ومقرها الرئيسي في ${HQ} ولها مكتب خليجي في ${GULF_OFFICE}. تعمل فوتوكارب كمتحكم في البيانات الشخصية المُعالجة عبر موقعها الإلكتروني، وكمتحكم في البيانات أو معالج لها فيما يخص المعلومات المُعالجة عبر منصتها، وفقًا لسياق التعامل.`,
        ],
      },
      {
        heading: '2. المعلومات التي نجمعها',
        body: ['نجمع فئات المعلومات التالية:'],
        bullets: [
          'بيانات الهوية والتواصل — الاسم والمسمى الوظيفي وجهة العمل والبريد الإلكتروني المهني ورقم الهاتف المُقدَّمة عبر طلبات العرض التوضيحي أو نماذج التواصل أو تسجيل الحساب.',
          'البيانات التشغيلية وبيانات الانبعاثات — بيانات المنشأة والحساسات والطاقة والإنتاج وسلسلة التوريد المُقدَّمة إلى المنصة لأغراض المحاسبة الكربونية وتقييم دورة الحياة وCBAM وMRV والإبلاغ.',
          'بيانات الاستخدام والبيانات التقنية — عنوان IP ونوع المتصفح ومعلومات الجهاز والصفحات التي تمت زيارتها والتفاعلات مع المنصة، تُجمع عبر ملفات تعريف الارتباط والتقنيات المماثلة.',
          'بيانات التواصل — سجلات المراسلات عند تواصلكم معنا للدعم أو المبيعات أو أي استفسارات أخرى.',
        ],
      },
      {
        heading: '3. كيف نستخدم معلوماتكم',
        body: ['نستخدم المعلومات التي نجمعها من أجل:'],
        bullets: [
          'توفير الخدمات وتشغيلها وصيانتها، بما في ذلك وظائف قياس الكربون والإبلاغ والامتثال.',
          'الرد على طلبات العرض التوضيحي والاستفسارات وتذاكر الدعم.',
          'إنشاء التقارير التنظيمية وتقارير الاستدامة التي تطلبونها.',
          'تحسين منصتنا وموقعنا الإلكتروني وتأمينهما وتطويرهما.',
          'الامتثال للالتزامات القانونية والتنظيمية والتعاقدية.',
        ],
      },
      {
        heading: '4. الأساس القانوني للمعالجة',
        body: [
          'حيثما يتطلب القانون المعمول به أساسًا قانونيًا للمعالجة، نعتمد على واحد أو أكثر مما يلي: تنفيذ عقد معكم أو مع مؤسستكم؛ موافقتكم؛ مصالحنا التجارية المشروعة؛ والامتثال لالتزام قانوني. بالنسبة للأفراد في الاتحاد الأوروبي، تتم المعالجة وفقًا للائحة العامة لحماية البيانات (GDPR)؛ وبالنسبة للأفراد في تونس، وفقًا للقانون الأساسي عدد 63 لسنة 2004 المتعلق بحماية المعطيات الشخصية، تحت إشراف الهيئة الوطنية لحماية المعطيات الشخصية (INPDP).',
        ],
      },
      {
        heading: '5. مشاركة البيانات والإفصاح عنها',
        body: [
          'لا نبيع بياناتكم الشخصية. قد نشارك المعلومات مع معالجين فرعيين وموفري خدمات موثوقين يدعمون تقديم خدماتنا (مثل موفري الاستضافة والبنية التحتية)، ومع مستشارين مهنيين، ومع السلطات التنظيمية أو الحكومية عند اقتضاء القانون ذلك. يلتزم جميع المعالجين الفرعيين بالتزامات تعاقدية متوافقة مع هذه السياسة.',
        ],
      },
      {
        heading: '6. مكان تخزين البيانات والنقل الدولي',
        body: [
          'تُعطي فوتوكارب الأولوية للبنية التحتية للبيانات المُستضافة في تونس والاتحاد الأوروبي. عند نقل البيانات عبر الحدود — على سبيل المثال، بين عملياتنا في تونس والخليج — نطبّق ضمانات مناسبة، بما في ذلك حماية تعاقدية، لضمان بقاء بياناتكم محمية وفق المستوى الموصوف في هذه السياسة.',
        ],
      },
      {
        heading: '7. أمن البيانات',
        body: [
          'نحافظ على تدابير تقنية وتنظيمية مصمَّمة لحماية المعلومات من الوصول غير المصرَّح به أو التعديل أو الإفصاح أو الإتلاف. تشمل هذه التدابير التشفير أثناء النقل والتخزين، وضوابط الوصول، ومراجعات أمنية دورية متوافقة مع المعايير الدولية المعترف بها.',
        ],
      },
      {
        heading: '8. الاحتفاظ بالبيانات',
        body: [
          'نحتفظ بالبيانات الشخصية فقط للمدة اللازمة لتحقيق الأغراض التي جُمعت من أجلها، بما في ذلك الوفاء بالمتطلبات القانونية أو المحاسبية أو التنظيمية. تُحفظ البيانات التشغيلية وبيانات الانبعاثات وفقًا لشروط اتفاقية الخدمة ذات الصلة.',
        ],
      },
      {
        heading: '9. حقوقكم',
        body: ['وفقًا للقانون المعمول به، قد يكون لكم الحق في:'],
        bullets: [
          'الوصول إلى البيانات الشخصية التي نحتفظ بها عنكم.',
          'طلب تصحيح البيانات غير الدقيقة أو غير المكتملة.',
          'طلب حذف بياناتكم في ظروف معينة.',
          'الاعتراض على معالجة معينة أو تقييدها.',
          'طلب نسخة من بياناتكم بصيغة قابلة للنقل.',
          'سحب الموافقة عندما تكون المعالجة مبنية على الموافقة.',
        ],
      },
      {
        heading: '10. تواصلوا معنا',
        body: [
          'لأي أسئلة حول سياسة الخصوصية هذه أو لممارسة حقوقكم، يرجى التواصل مع فريق الخصوصية لدينا عبر info@photocarb.com.',
        ],
      },
    ],
  },
  'terms-of-service': {
    title: 'شروط الخدمة',
    summary: 'الشروط التي تحكم استخدامكم لموقع فوتوكارب الإلكتروني ومنصتها.',
    updated: 'يوليو 2026',
    intro: `تحكم شروط الخدمة هذه ("الشروط") وصولكم إلى الموقع الإلكتروني والمنصة والخدمات التي تقدّمها ${COMPANY} ("فوتوكارب") واستخدامكم لها. من خلال الوصول إلى الخدمات أو استخدامها، فإنكم توافقون على الالتزام بهذه الشروط. إذا كنتم لا توافقون، يجب ألا تستخدموا الخدمات.`,
    sections: [
      {
        heading: '1. قبول الشروط',
        body: [
          'من خلال الوصول إلى موقع فوتوكارب الإلكتروني أو استخدام المنصة، فإنكم تؤكدون أن لديكم الصلاحية للدخول في هذه الشروط نيابة عن أنفسكم أو عن المؤسسة التي تمثّلونها، وأنكم تقبلون هذه الشروط بالكامل.',
        ],
      },
      {
        heading: '2. الخدمات',
        body: [
          'توفّر فوتوكارب منصة ذكاء كربوني مدعومة بالذكاء الاصطناعي لقياس انبعاثات غازات الاحتباس الحراري وإدارتها والإبلاغ عنها، بما في ذلك المحاسبة الكربونية وتقييم دورة الحياة (LCA) وتقارير ESG والامتثال لـCBAM وMRV وتحليلات سلسلة التوريد. تُحدَّد الميزات المحددة والنطاق ومستويات الخدمة في نموذج الطلب أو اتفاقية الخدمة المعمول بها بينكم وبين فوتوكارب.',
        ],
      },
      {
        heading: '3. الحسابات والوصول',
        body: [
          'يتطلب الوصول إلى ميزات معينة إنشاء حساب. أنتم مسؤولون عن الحفاظ على سرية بيانات اعتمادكم وعن كل نشاط يُنفَّذ تحت حسابكم. يجب عليكم إخطار فوتوكارب فورًا بأي استخدام غير مصرَّح به.',
        ],
      },
      {
        heading: '4. بيانات العميل وملكيتها',
        body: [
          'تحتفظون بجميع الحقوق والملكية والمصلحة في البيانات التشغيلية وبيانات الانبعاثات والبيانات التجارية التي تقدّمونها إلى المنصة ("بيانات العميل"). تمنحون فوتوكارب ترخيصًا محدودًا لمعالجة بيانات العميل فقط بغرض تقديم الخدمات وتحسينها. تحتفظ فوتوكارب بجميع الحقوق في المنصة والبرمجيات والنماذج والمنهجيات.',
        ],
      },
      {
        heading: '5. الاستخدام المقبول',
        body: ['توافقون على عدم:'],
        bullets: [
          'استخدام الخدمات بما يخالف أي قانون أو لائحة معمول بها.',
          'محاولة الوصول غير المصرَّح به إلى المنصة أو أنظمتها الأساسية.',
          'إجراء هندسة عكسية أو نسخ أو إعادة بيع أي جزء من الخدمات إلا بالقدر الذي يسمح به القانون.',
          'تحميل شيفرة ضارة أو التدخل في سلامة الخدمات أو أدائها.',
        ],
      },
      {
        heading: '6. التقارير والاعتماد التنظيمي',
        body: [
          'تطبّق فوتوكارب منهجيات ومعايير معترف بها لإنشاء التقارير والحسابات. ومع ذلك، تعتمد المخرجات على دقة واكتمال البيانات التي تقدّمونها. تبقون مسؤولين عن مراجعة المخرجات وعن إقراراتكم التنظيمية والتزامات الامتثال الخاصة بكم. تُقدَّم التقارير كأداة لدعم القرار ولا تُشكّل استشارة قانونية أو مالية أو مهنية.',
        ],
      },
      {
        heading: '7. الرسوم والدفع',
        body: [
          'تُحدَّد الرسوم ودورات الفوترة وشروط الدفع في نموذج الطلب أو اتفاقية الخدمة المعمول بها. ما لم يُنص على خلاف ذلك، فإن الرسوم غير قابلة للاسترداد ولا تشمل الضرائب المعمول بها.',
        ],
      },
      {
        heading: '8. الملكية الفكرية',
        body: [
          'جميع حقوق الملكية الفكرية في المنصة والموقع الإلكتروني والعلامة التجارية والوثائق هي ملك لفوتوكارب أو مرخِّصيها وتبقى كذلك. لا شيء في هذه الشروط ينقل إليكم أي من هذه الحقوق.',
        ],
      },
      {
        heading: '9. تحديد المسؤولية',
        body: [
          'إلى أقصى حد يسمح به القانون، لن تكون فوتوكارب مسؤولة عن أي أضرار غير مباشرة أو عرضية أو تبعية ناتجة عن استخدامكم للخدمات. لن تتجاوز المسؤولية الإجمالية الكلية لفوتوكارب الرسوم التي دفعتموها مقابل الخدمات خلال الاثني عشر شهرًا السابقة للحدث الذي أدى إلى المطالبة.',
        ],
      },
      {
        heading: '10. القانون الحاكم',
        body: [
          'تخضع هذه الشروط لقوانين الجمهورية التونسية. يخضع أي نزاع ينشأ عن هذه الشروط أو يتعلق بها للاختصاص القضائي الحصري للمحاكم المختصة في سوسة، تونس، دون الإخلال بأي حماية إلزامية للمستهلك قد تكون متاحة لكم.',
        ],
      },
      {
        heading: '11. تواصلوا معنا',
        body: [
          'لأي أسئلة بخصوص هذه الشروط، يرجى التواصل عبر info@photocarb.com.',
        ],
      },
    ],
  },
  'data-processing-agreement': {
    title: 'اتفاقية معالجة البيانات',
    summary: 'كيف تعالج فوتوكارب البيانات الشخصية نيابة عن عملائها.',
    updated: 'يوليو 2026',
    intro: `تُشكّل اتفاقية معالجة البيانات هذه ("الاتفاقية") جزءًا من اتفاقية الخدمة بين ${COMPANY} ("فوتوكارب"، بصفتها معالج بيانات) والعميل ("المتحكم"). وهي تحكم معالجة البيانات الشخصية التي تقوم بها فوتوكارب نيابة عن المتحكم فيما يتعلق بالخدمات.`,
    sections: [
      {
        heading: '1. أدوار الأطراف',
        body: [
          'بالنسبة للبيانات الشخصية المُعالَجة نيابة عن المتحكم، يكون المتحكم هو المتحكم في البيانات وتكون فوتوكارب هي معالج البيانات. يلتزم كل طرف بالتزاماته بموجب قانون حماية البيانات المعمول به، بما في ذلك اللائحة العامة لحماية البيانات (GDPR) والقانون الأساسي التونسي عدد 63 لسنة 2004 (INPDP) عند الاقتضاء.',
        ],
      },
      {
        heading: '2. نطاق المعالجة وغرضها',
        body: [
          'تعالج فوتوكارب البيانات الشخصية فقط بغرض تقديم الخدمات وبما يتوافق تمامًا مع التعليمات الموثَّقة للمتحكم، ما لم يقتضِ القانون خلاف ذلك. تُحدَّد موضوع المعالجة ومدتها وطبيعتها وغرضها بموجب اتفاقية الخدمة.',
        ],
      },
      {
        heading: '3. فئات البيانات وأصحابها',
        body: ['قد تشمل المعالجة بموجب هذه الاتفاقية:'],
        bullets: [
          'أصحاب البيانات: موظفو المتحكم ومقاولوه ومستخدمو المنصة المصرَّح لهم.',
          'فئات البيانات: بيانات الهوية والتواصل، وبيانات اعتماد الحساب، وسجلات الاستخدام المرتبطة بالوصول إلى المنصة.',
        ],
      },
      {
        heading: '4. السرية',
        body: [
          'تضمن فوتوكارب التزام جميع الموظفين المصرَّح لهم بمعالجة البيانات الشخصية بالتزامات سرية مناسبة، وإطلاعهم على الطبيعة السرية للبيانات.',
        ],
      },
      {
        heading: '5. تدابير الأمان',
        body: [
          'تطبّق فوتوكارب تدابير تقنية وتنظيمية مناسبة لضمان مستوى أمان يتناسب مع المخاطر، بما في ذلك التشفير وضوابط الوصول وأمن الشبكات والتسجيل والاختبار الدوري لفعالية هذه التدابير.',
        ],
      },
      {
        heading: '6. المعالجون من الباطن',
        body: [
          'يمنح المتحكم تفويضًا عامًا لفوتوكارب للتعاقد مع معالجين من الباطن لدعم تقديم الخدمات. تحتفظ فوتوكارب بقائمة بالمعالجين من الباطن، وتفرض عليهم التزامات حماية بيانات متوافقة مع هذه الاتفاقية، وتبقى مسؤولة عن أدائهم. ستُعلم فوتوكارب المتحكم بالتغييرات المُزمعة في المعالجين من الباطن وتمنحه فرصة الاعتراض لأسباب معقولة.',
        ],
      },
      {
        heading: '7. مساعدة المتحكم',
        body: [
          'مع مراعاة طبيعة المعالجة، تساعد فوتوكارب المتحكم من خلال تدابير تقنية وتنظيمية مناسبة للوفاء بالتزاماته في الرد على طلبات أصحاب البيانات وضمان الامتثال لالتزامات الأمان والإخطار بالخروقات وتقييم أثر حماية البيانات.',
        ],
      },
      {
        heading: '8. خرق البيانات الشخصية',
        body: [
          'تُخطر فوتوكارب المتحكم دون تأخير لا مبرر له بعد علمها بخرق للبيانات الشخصية يؤثر على بيانات المتحكم، وتقدّم معلومات كافية لتمكين المتحكم من الوفاء بأي التزام بالإبلاغ عن الخرق للسلطة الرقابية المختصة وأصحاب البيانات المتأثرين.',
        ],
      },
      {
        heading: '9. النقل الدولي',
        body: [
          'عند نقل البيانات الشخصية عبر الحدود، تضمن فوتوكارب وجود ضمانات مناسبة، بما في ذلك حماية تعاقدية، بحيث يُحافَظ على مستوى الحماية الذي يقتضيه القانون المعمول به.',
        ],
      },
      {
        heading: '10. إعادة البيانات أو حذفها',
        body: [
          'عند إنهاء الخدمات، ستقوم فوتوكارب، وفق اختيار المتحكم، بإعادة أو حذف البيانات الشخصية المُعالَجة نيابة عن المتحكم بشكل آمن، ما لم يقتضِ القانون المعمول به الاحتفاظ بها.',
        ],
      },
      {
        heading: '11. تواصلوا معنا',
        body: [
          'لطلب نسخة موقَّعة من هذه الاتفاقية أو قائمة المعالجين من الباطن الحالية لدى فوتوكارب، يرجى التواصل عبر info@photocarb.com.',
        ],
      },
    ],
  },
  'cookie-policy': {
    title: 'سياسة ملفات تعريف الارتباط',
    summary: 'كيف تستخدم فوتوكارب ملفات تعريف الارتباط والتقنيات المماثلة على موقعها الإلكتروني.',
    updated: 'يوليو 2026',
    intro: `توضّح سياسة ملفات تعريف الارتباط هذه كيف تستخدم ${COMPANY} ("فوتوكارب") ملفات تعريف الارتباط والتقنيات المماثلة عند زيارتكم لموقعنا الإلكتروني. ينبغي قراءتها بالتزامن مع سياسة الخصوصية الخاصة بنا.`,
    sections: [
      {
        heading: '1. ما هي ملفات تعريف الارتباط',
        body: [
          'ملفات تعريف الارتباط هي ملفات نصية صغيرة تُوضع على جهازكم عند زيارة موقع إلكتروني. تُستخدم على نطاق واسع لتشغيل المواقع الإلكترونية وتحسين كفاءتها وتقديم معلومات لأصحاب المواقع. تشمل التقنيات المماثلة وحدات البكسل والتخزين المحلي وحزم تطوير البرمجيات.',
        ],
      },
      {
        heading: '2. أنواع ملفات تعريف الارتباط التي نستخدمها',
        body: ['نستخدم فئات ملفات تعريف الارتباط التالية:'],
        bullets: [
          'ملفات تعريف ارتباط ضرورية بشكل صارم — مطلوبة لتشغيل الموقع الإلكتروني، مثل الأمان وإدارة الشبكة وإمكانية الوصول. لا يمكن إيقاف تشغيلها.',
          'ملفات تعريف ارتباط الأداء والتحليلات — تساعدنا على فهم كيفية تفاعل الزوار مع الموقع الإلكتروني لتحسينه. تُضبط فقط بموافقتكم عند الاقتضاء.',
          'ملفات تعريف ارتباط الوظائف — تتذكّر تفضيلاتكم، مثل اللغة، لتقديم تجربة محسَّنة.',
        ],
      },
      {
        heading: '3. كيف نستخدم ملفات تعريف الارتباط',
        body: [
          'نستخدم ملفات تعريف الارتباط لتشغيل الموقع الإلكتروني وتأمينه، وتذكّر تفضيلاتكم، وقياس حركة الزوار وتحليلها، وفهم المحتوى الأكثر فائدة لزوارنا. لا نستخدم ملفات تعريف الارتباط لبيع معلوماتكم الشخصية.',
        ],
      },
      {
        heading: '4. إدارة تفضيلاتكم',
        body: [
          'يمكنكم التحكم في ملفات تعريف الارتباط وإدارتها عبر إعدادات متصفحكم، ويمكنكم حذف ملفات تعريف الارتباط المخزَّنة بالفعل على جهازكم. يُرجى ملاحظة أن تعطيل بعض ملفات تعريف الارتباط قد يؤثر على وظائف الموقع الإلكتروني. حيثما تكون الموافقة مطلوبة، يمكنكم سحبها في أي وقت.',
        ],
      },
      {
        heading: '5. ملفات تعريف الارتباط الخاصة بأطراف ثالثة',
        body: [
          'قد تُضبط بعض ملفات تعريف الارتباط بواسطة خدمات أطراف ثالثة تظهر على صفحاتنا. لا نتحكم في وضع ملفات تعريف الارتباط هذه، ونوصي بمراجعة سياسات الخصوصية وملفات تعريف الارتباط الخاصة بتلك الأطراف الثالثة.',
        ],
      },
      {
        heading: '6. تحديثات هذه السياسة',
        body: [
          'قد نُحدّث سياسة ملفات تعريف الارتباط هذه من وقت لآخر لتعكس التغييرات في التقنية أو القانون أو ممارساتنا. يشير التاريخ أعلى هذه الصفحة إلى آخر مراجعة لها.',
        ],
      },
      {
        heading: '7. تواصلوا معنا',
        body: [
          'إذا كانت لديكم أسئلة حول استخدامنا لملفات تعريف الارتباط، يرجى التواصل عبر info@photocarb.com.',
        ],
      },
    ],
  },
}

export function localizeLegalDoc(doc: LegalDoc, lang: 'en' | 'fr' | 'ar'): LegalDoc {
  if (lang === 'en') return doc
  const l10n = lang === 'ar' ? LEGAL_DOCS_AR[doc.slug] : LEGAL_DOCS_FR[doc.slug]
  if (!l10n) return doc
  return {
    ...doc,
    title: l10n.title,
    summary: l10n.summary,
    updated: l10n.updated,
    intro: l10n.intro,
    sections: doc.sections.map((s, i) => l10n.sections[i] ?? s),
  }
}
