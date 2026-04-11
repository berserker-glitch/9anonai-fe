/**
 * @fileoverview SEO page data for digital law pages:
 * cybersecurity-law, crypto-law, digital-law.
 * Targets Moroccan digital/tech law queries — fast-growing search cluster.
 * @module lib/seo-data-digital
 */

import { SEOPageConfig } from "./seo-page-types";

/** Cybersecurity Law page — targets الأمن السيبراني / cybersecurity law maroc / loi cybersécurité */
export const cybersecurityLawPage: SEOPageConfig = {
    slug: "cybersecurity-law",
    titles: {
        ar: "الأمن السيبراني في المغرب | القانون الرقمي وحماية البيانات - 9anon AI",
        fr: "Cybersécurité au Maroc | Loi sur la Protection des Données - 9anon AI",
        en: "Morocco Cybersecurity Law | Data Protection & Digital Security - 9anon AI",
    },
    descriptions: {
        ar: "دليل شامل حول الأمن السيبراني والقانون الرقمي في المغرب: قانون حماية البيانات الشخصية، الجرائم الإلكترونية، المسؤولية الرقمية، واللائحة العامة لحماية البيانات. استشارة مجانية.",
        fr: "Guide complet sur la cybersécurité et le droit numérique au Maroc: loi sur la protection des données personnelles, cybercriminalité, responsabilité numérique et RGPD. Consultation gratuite.",
        en: "Complete guide to Morocco cybersecurity and digital law: personal data protection law, cybercrime, digital liability, and GDPR compliance. Free AI legal consultation.",
    },
    keywords: {
        ar: ["الأمن السيبراني المغرب", "حماية البيانات الشخصية المغرب", "الجرائم الإلكترونية المغرب", "القانون الرقمي المغرب", "CNDP المغرب", "قانون 09-08 المغرب", "الخصوصية الرقمية المغرب"],
        fr: ["cybersécurité Maroc", "protection données personnelles Maroc", "cybercriminalité Maroc", "droit numérique Maroc", "CNDP Maroc", "loi 09-08 Maroc", "RGPD Maroc"],
        en: ["cybersecurity law morocco", "data protection morocco", "cybercrime morocco", "digital law morocco", "CNDP morocco", "law 09-08 morocco", "GDPR morocco compliance"],
    },
    h1: {
        ar: "الأمن السيبراني والقانون الرقمي في المغرب",
        fr: "Cybersécurité et Droit Numérique au Maroc",
        en: "Morocco Cybersecurity & Digital Law Guide",
    },
    badge: { ar: "القانون الرقمي", fr: "Droit Numérique", en: "Digital Law" },
    subtitle: {
        ar: "اعرف حقوقك وواجباتك في الفضاء الرقمي بالمغرب — قانون حماية البيانات الشخصية، الجرائم الإلكترونية، المسؤولية القانونية للمواقع والتطبيقات. استشارة مجانية بالذكاء الاصطناعي.",
        fr: "Connaissez vos droits et obligations dans l'espace numérique marocain — protection des données, cybercriminalité et responsabilité légale des sites et applications.",
        en: "Know your rights and obligations in Morocco's digital space — data protection, cybercrime, and legal liability of websites and apps.",
    },
    ctaText: { ar: "اسأل عن القانون الرقمي مجاناً", fr: "Posez Votre Question Numérique", en: "Ask About Digital Law Free" },
    faqTitle: { ar: "أسئلة شائعة حول الأمن السيبراني في المغرب", fr: "FAQ Cybersécurité Maroc", en: "Morocco Cybersecurity Law FAQ" },
    faqItems: {
        ar: [
            { question: "ما هو قانون حماية البيانات الشخصية في المغرب؟", answer: "يُنظّم قانون رقم 09-08 الصادر عام 2009 حماية الأشخاص الذاتيين تجاه معالجة بياناتهم الشخصية في المغرب. يُلزم القانون كل معالج للبيانات الشخصية بالتصريح لدى اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي (CNDP)." },
            { question: "ما هي عقوبات الجرائم الإلكترونية في المغرب؟", answer: "يُجرّم القانون المغربي طيفاً واسعاً من الجرائم الرقمية: الاختراق غير المشروع للأنظمة المعلوماتية يعاقب عليه بالغرامة والسجن، والاحتيال الإلكتروني يخضع لأحكام النصب، ونشر صور أو محتوى مسيء يُعاقب بموجب قانون الصحافة أو القانون الجنائي." },
            { question: "هل تطبق اللوائح الأوروبية RGPD على الشركات المغربية؟", answer: "الشركات المغربية التي تعالج بيانات مواطنين أوروبيين مُلزَمة بالامتثال للائحة الأوروبية العامة لحماية البيانات (RGPD/GDPR). في المغرب، يُطبّق قانون 09-08 بالتوازي مع متطلبات الشريك التجاري الأوروبي." },
            { question: "ما هي حقوقك عند تسريب بياناتك الشخصية في المغرب؟", answer: "يمنحك قانون 09-08 الحق في الوصول إلى بياناتك وتصحيحها وحذفها. في حال تسريب بياناتك، يمكنك تقديم شكوى لدى CNDP أو اللجوء إلى القضاء للمطالبة بالتعويض." },
        ],
        fr: [
            { question: "Quelle est la loi marocaine sur la protection des données personnelles ?", answer: "La loi n°09-08 de 2009 régit la protection des personnes physiques à l'égard du traitement de leurs données personnelles. Elle oblige tout responsable de traitement à se déclarer auprès de la CNDP." },
            { question: "Quelles sont les sanctions pour la cybercriminalité au Maroc ?", answer: "Le droit marocain sanctionne: l'accès non autorisé aux systèmes informatiques (amendes et prison), la fraude électronique, et la diffusion de contenus illicites ou offensants selon le code pénal et la loi sur la presse." },
            { question: "Le RGPD s'applique-t-il aux entreprises marocaines ?", answer: "Les entreprises marocaines traitant des données de citoyens européens doivent se conformer au RGPD. Au Maroc, la loi 09-08 s'applique en parallèle aux exigences du partenaire commercial européen." },
        ],
        en: [
            { question: "What is Morocco's personal data protection law?", answer: "Law 09-08 of 2009 governs the protection of individuals regarding the processing of their personal data. It requires all data processors to register with the CNDP (National Commission for Personal Data Protection)." },
            { question: "What are the penalties for cybercrime in Morocco?", answer: "Moroccan law criminalizes: unauthorized access to IT systems (fines and imprisonment), electronic fraud, and distribution of offensive or illegal content under the penal code and press law." },
            { question: "Does GDPR apply to Moroccan companies?", answer: "Moroccan companies processing data of European citizens must comply with GDPR. Within Morocco, Law 09-08 applies alongside the requirements of the European trade partner." },
        ],
    },
    features: {
        ar: [
            { icon: "🛡️", title: "حماية البيانات الشخصية", description: "قانون 09-08 وحقوقك في حماية خصوصيتك الرقمية في المغرب." },
            { icon: "⚖️", title: "الجرائم الإلكترونية", description: "تعريف الجرائم الرقمية والعقوبات المقررة في القانون المغربي." },
            { icon: "🏢", title: "الامتثال للشركات", description: "كيف تلتزم شركتك بقوانين حماية البيانات المغربية والأوروبية." },
            { icon: "🔒", title: "أمان التطبيقات والمواقع", description: "المتطلبات القانونية لمشغلي المواقع والتطبيقات في المغرب." },
            { icon: "📱", title: "الخصوصية والتواصل الاجتماعي", description: "حقوقك عند انتهاك خصوصيتك عبر الشبكات الاجتماعية." },
            { icon: "🤖", title: "استشارة مجانية", description: "اسأل 9anon AI عن أي إشكالية رقمية واحصل على إجابة قانونية فورية." },
        ],
        fr: [
            { icon: "🛡️", title: "Protection des Données", description: "Loi 09-08 et vos droits à la protection de la vie privée numérique au Maroc." },
            { icon: "⚖️", title: "Cybercriminalité", description: "Définition des infractions numériques et sanctions prévues en droit marocain." },
            { icon: "🏢", title: "Conformité Entreprises", description: "Comment votre entreprise se conforme aux lois marocaines et européennes sur les données." },
            { icon: "🔒", title: "Sécurité Sites & Applications", description: "Obligations légales des opérateurs de sites web et applications au Maroc." },
            { icon: "📱", title: "Vie Privée & Réseaux Sociaux", description: "Vos droits en cas de violation de la vie privée sur les réseaux sociaux." },
            { icon: "🤖", title: "Consultation Gratuite", description: "Posez à 9anon AI votre question numérique pour une réponse juridique instantanée." },
        ],
        en: [
            { icon: "🛡️", title: "Data Protection", description: "Law 09-08 and your rights to digital privacy protection in Morocco." },
            { icon: "⚖️", title: "Cybercrime", description: "Definition of digital offenses and penalties under Moroccan law." },
            { icon: "🏢", title: "Business Compliance", description: "How your company complies with Moroccan and European data protection laws." },
            { icon: "🔒", title: "Website & App Security", description: "Legal obligations for website and application operators in Morocco." },
            { icon: "📱", title: "Privacy & Social Media", description: "Your rights when your privacy is violated on social media networks." },
            { icon: "🤖", title: "Free Consultation", description: "Ask 9anon AI your digital law question and get an instant legal answer." },
        ],
    },
    contentSections: {
        ar: [
            { heading: "اللجنة الوطنية لمراقبة حماية المعطيات (CNDP)", text: "تُعدّ CNDP الجهاز المؤسسي المختص بحماية البيانات الشخصية في المغرب. تتلقى الإخطارات والترخيصات المتعلقة بمعالجة البيانات، وتفصل في الشكاوى، وتُحقق في الانتهاكات. أي مؤسسة أو شركة تجمع بيانات شخصية (اسم، عنوان، رقم هاتف، بريد إلكتروني...) ملزمة بالتصريح لدى CNDP مسبقاً." },
        ],
        fr: [
            { heading: "La CNDP : Autorité Marocaine de Protection des Données", text: "La CNDP est l'organisme institutionnel chargé de la protection des données personnelles au Maroc. Elle reçoit les déclarations et autorisations de traitement, instruit les plaintes et enquête sur les violations. Toute organisation collectant des données personnelles (nom, adresse, téléphone, email) doit s'y déclarer préalablement." },
        ],
        en: [
            { heading: "CNDP: Morocco's Data Protection Authority", text: "CNDP is the institutional body responsible for personal data protection in Morocco. It receives processing declarations and authorizations, handles complaints, and investigates violations. Any organization collecting personal data (name, address, phone, email) must register with CNDP in advance." },
        ],
    },
    relatedLinks: [
        { href: "/digital-law", label: "Digital Law" },
        { href: "/crypto-law", label: "Crypto Law" },
        { href: "/business-legal", label: "Business Legal" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
        { href: "/online-consultation", label: "Online Consultation" },
    ],
    gradientFrom: "from-violet-600",
    gradientTo: "to-purple-600",
    glowColor: "violet",
};

/** Crypto Law page — targets crypto regulations morocco 2026 / cryptocurrency maroc */
export const cryptoLawPage: SEOPageConfig = {
    slug: "crypto-law",
    titles: {
        ar: "تنظيم العملات الرقمية في المغرب 2026 | البيتكوين والتشفير - 9anon AI",
        fr: "Réglementation Crypto au Maroc 2026 | Bitcoin & Cryptomonnaies - 9anon AI",
        en: "Morocco Crypto Law 2026 | Bitcoin & Cryptocurrency Regulations - 9anon AI",
    },
    descriptions: {
        ar: "دليل شامل حول قانون العملات الرقمية في المغرب 2026: هل العملات المشفرة قانونية؟ مواقف بنك المغرب، الضرائب على الأرباح الرقمية، والإطار القانوني المرتقب. استشارة مجانية.",
        fr: "Guide complet sur la réglementation des cryptomonnaies au Maroc 2026: légalité, position de Bank Al-Maghrib, fiscalité des gains crypto et cadre juridique attendu. Consultation gratuite.",
        en: "Complete guide to Morocco cryptocurrency regulation 2026: legality, Bank Al-Maghrib stance, taxation of crypto gains, and the upcoming legal framework. Free AI consultation.",
    },
    keywords: {
        ar: ["العملات الرقمية المغرب 2026", "البيتكوين المغرب قانوني", "بنك المغرب العملات المشفرة", "ضريبة الكريبتو المغرب", "تنظيم الكريبتو المغرب", "DeFi المغرب", "الأصول الرقمية المغرب"],
        fr: ["crypto Maroc 2026", "bitcoin Maroc légal", "Bank Al-Maghrib cryptomonnaie", "fiscalité crypto Maroc", "réglementation crypto Maroc", "DeFi Maroc", "actifs numériques Maroc"],
        en: ["crypto morocco 2026", "bitcoin morocco legal", "bank al-maghrib cryptocurrency", "crypto tax morocco", "cryptocurrency regulation morocco", "DeFi morocco", "digital assets morocco"],
    },
    h1: {
        ar: "العملات الرقمية في المغرب 2026: الإطار القانوني",
        fr: "Les Cryptomonnaies au Maroc 2026 : Cadre Juridique",
        en: "Cryptocurrency in Morocco 2026: Legal Framework Guide",
    },
    badge: { ar: "العملات الرقمية", fr: "Cryptomonnaies", en: "Crypto Law" },
    subtitle: {
        ar: "هل العملات الرقمية قانونية في المغرب؟ ما هو موقف بنك المغرب؟ كيف تُضرب الضريبة على الأرباح؟ احصل على إجابات دقيقة حول الإطار القانوني المغربي للعملات المشفرة.",
        fr: "Les cryptomonnaies sont-elles légales au Maroc? Quelle est la position de Bank Al-Maghrib? Comment les gains sont-ils imposés? Obtenez des réponses précises sur le cadre juridique marocain.",
        en: "Are cryptocurrencies legal in Morocco? What is Bank Al-Maghrib's stance? How are gains taxed? Get accurate answers about Morocco's legal framework for digital assets.",
    },
    ctaText: { ar: "اسأل عن الكريبتو مجاناً", fr: "Posez Votre Question Crypto", en: "Ask About Crypto Law Free" },
    faqTitle: { ar: "أسئلة شائعة حول العملات الرقمية في المغرب", fr: "FAQ Cryptomonnaies Maroc", en: "Morocco Crypto Law FAQ" },
    faqItems: {
        ar: [
            { question: "هل العملات الرقمية قانونية في المغرب؟", answer: "موقف السلطات المغربية (بنك المغرب، AMMC، وزارة المالية) تجاه العملات الرقمية حتى 2026 يتسم بالتحفظ. لم تُحظر العملات المشفرة صراحةً، لكنها غير معترف بها كوسيلة دفع رسمية. استخدامها الشخصي يبقى في منطقة رمادية قانونياً، بينما يُعتبر توظيف الشركات لها أكثر تعقيداً." },
            { question: "هل يُعاقب على امتلاك أو تداول العملات الرقمية في المغرب؟", answer: "لا يوجد نص قانوني صريح يُجرّم امتلاك العملات المشفرة للأغراض الشخصية. غير أن الاتجار بها بشكل تجاري دون إطار قانوني قد يُعرّض صاحبه لمتابعات بموجب قوانين الصرف أو غسيل الأموال. يُنصح باستشارة قانونية قبل أي استثمار كبير." },
            { question: "هل تخضع أرباح العملات الرقمية للضريبة في المغرب؟", answer: "لا يوجد بعد إطار ضريبي خاص بالعملات الرقمية في المغرب. من الناحية النظرية، قد تندرج الأرباح المحققة ضمن الضريبة على الدخل (IR) أو الضرائب على أرباح رأس المال، وهو ما تعمل السلطات على تقنينه. يُنصح بالتوثيق الدقيق لجميع عملياتك." },
            { question: "ما هو المتوقع من تنظيم العملات الرقمية في المغرب مستقبلاً؟", answer: "تسير المغرب نحو إطار تنظيمي متكامل للأصول الرقمية. AMMC (هيئة مراقبة سوق الرساميل) تعمل على صياغة قواعد لتنظيم منصات تداول العملات المشفرة. المغرب استفاد من تجارب الإمارات والاتحاد الأوروبي (MiCA) في هذا المجال." },
        ],
        fr: [
            { question: "Les cryptomonnaies sont-elles légales au Maroc ?", answer: "La position des autorités marocaines (Bank Al-Maghrib, AMMC, Ministère des Finances) jusqu'en 2026 reste prudente. Les cryptomonnaies ne sont pas explicitement interdites mais ne sont pas reconnues comme moyen de paiement officiel. L'usage personnel reste dans une zone grise juridique." },
            { question: "Les gains crypto sont-ils imposés au Maroc ?", answer: "Il n'existe pas encore de cadre fiscal spécifique aux cryptomonnaies au Maroc. Théoriquement, les gains pourraient relever de l'IR ou de l'imposition des plus-values, que les autorités cherchent à codifier. Une documentation rigoureuse de toutes les opérations est conseillée." },
            { question: "Quelles évolutions réglementaires sont attendues au Maroc ?", answer: "Le Maroc avance vers un cadre réglementaire complet pour les actifs numériques. L'AMMC travaille à des règles pour les plateformes d'échange crypto. Le Maroc s'inspire des expériences des Émirats et de l'UE (MiCA)." },
        ],
        en: [
            { question: "Are cryptocurrencies legal in Morocco?", answer: "The position of Moroccan authorities (Bank Al-Maghrib, AMMC, Ministry of Finance) through 2026 remains cautious. Cryptocurrencies are not explicitly banned but are not recognized as an official means of payment. Personal use remains in a legal grey zone." },
            { question: "Are crypto gains taxed in Morocco?", answer: "There is no specific tax framework for cryptocurrencies in Morocco yet. Theoretically, gains could fall under income tax (IR) or capital gains taxes, which authorities are working to codify. Rigorous documentation of all transactions is advised." },
            { question: "What regulatory changes are expected in Morocco?", answer: "Morocco is moving toward a comprehensive regulatory framework for digital assets. AMMC is working on rules for crypto exchange platforms, drawing inspiration from UAE and EU (MiCA) experiences." },
        ],
    },
    features: {
        ar: [
            { icon: "₿", title: "وضع البيتكوين في المغرب", description: "الموقف القانوني الراهن من العملات المشفرة وما تخطط له السلطات." },
            { icon: "🏦", title: "موقف بنك المغرب", description: "تحذيرات ومواقف البنك المركزي من العملات الرقمية وتداولها." },
            { icon: "💰", title: "ضريبة الأرباح الرقمية", description: "كيف قد تُطبَّق الضريبة على مكاسبك من تداول العملات المشفرة." },
            { icon: "🔮", title: "تنظيم مستقبلي", description: "ما تعده AMMC والسلطات المغربية من تنظيمات للأصول الرقمية." },
            { icon: "⚖️", title: "مخاطر قانونية", description: "المخاطر القانونية الحالية لمستثمري ومتداولي العملات المشفرة في المغرب." },
            { icon: "🤖", title: "استشارة كريبتو مجانية", description: "اسأل 9anon AI عن وضعيتك القانونية في مجال العملات الرقمية." },
        ],
        fr: [
            { icon: "₿", title: "Statut du Bitcoin au Maroc", description: "La situation juridique actuelle des cryptomonnaies et les projets des autorités." },
            { icon: "🏦", title: "Position de Bank Al-Maghrib", description: "Avertissements et positions de la banque centrale sur les monnaies numériques." },
            { icon: "💰", title: "Fiscalité des Gains Crypto", description: "Comment l'impôt pourrait s'appliquer à vos gains de trading crypto." },
            { icon: "🔮", title: "Réglementation Future", description: "Ce que l'AMMC et les autorités marocaines préparent pour les actifs numériques." },
            { icon: "⚖️", title: "Risques Juridiques", description: "Les risques légaux actuels pour les investisseurs en crypto au Maroc." },
            { icon: "🤖", title: "Consultation Crypto Gratuite", description: "Posez à 9anon AI votre question sur votre situation juridique en matière de crypto." },
        ],
        en: [
            { icon: "₿", title: "Bitcoin Status in Morocco", description: "The current legal status of cryptocurrencies and what authorities are planning." },
            { icon: "🏦", title: "Bank Al-Maghrib's Position", description: "The central bank's warnings and stance on digital currencies." },
            { icon: "💰", title: "Crypto Gains Taxation", description: "How taxes may apply to your cryptocurrency trading profits." },
            { icon: "🔮", title: "Future Regulation", description: "What AMMC and Moroccan authorities are preparing for digital assets." },
            { icon: "⚖️", title: "Legal Risks", description: "Current legal risks for crypto investors and traders in Morocco." },
            { icon: "🤖", title: "Free Crypto Consultation", description: "Ask 9anon AI about your legal situation regarding cryptocurrencies." },
        ],
    },
    contentSections: {
        ar: [
            { heading: "المشهد القانوني للعملات الرقمية في المغرب", text: "لم يُصدر المغرب بعد تشريعاً متخصصاً يُنظّم العملات الرقمية. بنك المغرب أصدر تحذيرات متعددة من مخاطر التعامل بها، فيما تعمل AMMC على صياغة إطار تنظيمي مقتبس جزئياً من نموذج 'MiCA' الأوروبي. في غضون ذلك، يبقى المستثمرون في منطقة رمادية يستوجب التعامل معها بحذر قانوني ومالي." },
        ],
        fr: [
            { heading: "Le Paysage Juridique des Cryptomonnaies au Maroc", text: "Le Maroc n'a pas encore adopté de législation spécifique aux cryptomonnaies. Bank Al-Maghrib a émis plusieurs avertissements sur leurs risques, tandis que l'AMMC élabore un cadre réglementaire partiellement inspiré du modèle 'MiCA' européen. En attendant, les investisseurs évoluent dans une zone grise nécessitant prudence juridique et financière." },
        ],
        en: [
            { heading: "Morocco's Cryptocurrency Legal Landscape", text: "Morocco has not yet enacted specific cryptocurrency legislation. Bank Al-Maghrib has issued multiple warnings about their risks, while AMMC is drafting a regulatory framework partially inspired by the European 'MiCA' model. In the meantime, investors operate in a grey zone requiring legal and financial caution." },
        ],
    },
    relatedLinks: [
        { href: "/cybersecurity-law", label: "Cybersecurity Law" },
        { href: "/digital-law", label: "Digital Law" },
        { href: "/business-legal", label: "Business Legal" },
        { href: "/tax-legal", label: "Tax Law" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
    ],
    gradientFrom: "from-yellow-500",
    gradientTo: "to-orange-500",
    glowColor: "yellow",
};

/** Digital Law page — targets القانون الرقمي / droit numérique Maroc */
export const digitalLawPage: SEOPageConfig = {
    slug: "digital-law",
    titles: {
        ar: "القانون الرقمي في المغرب | التجارة الإلكترونية والحكومة الرقمية - 9anon AI",
        fr: "Droit Numérique au Maroc | E-Commerce & Gouvernance Digitale - 9anon AI",
        en: "Morocco Digital Law | E-Commerce, Digital Rights & Online Regulations - 9anon AI",
    },
    descriptions: {
        ar: "دليل شامل حول القانون الرقمي في المغرب: قانون التجارة الإلكترونية، الإدارة الرقمية، التوقيع الإلكتروني، حقوق المستهلك الرقمي، وحقوق الملكية الفكرية الرقمية. استشارة مجانية.",
        fr: "Guide complet sur le droit numérique marocain: e-commerce, administration numérique, signature électronique, droits du consommateur numérique et propriété intellectuelle. Consultation gratuite.",
        en: "Complete guide to Morocco digital law: e-commerce regulations, digital administration, electronic signatures, digital consumer rights, and intellectual property. Free AI consultation.",
    },
    keywords: {
        ar: ["القانون الرقمي المغرب", "التجارة الإلكترونية المغرب", "التوقيع الإلكتروني المغرب", "قانون الإنترنت المغرب", "حقوق المستهلك الرقمي المغرب", "الملكية الفكرية الرقمية المغرب", "الحكومة الرقمية المغرب"],
        fr: ["droit numérique Maroc", "e-commerce Maroc", "signature électronique Maroc", "loi internet Maroc", "droits consommateur numérique Maroc", "propriété intellectuelle numérique Maroc", "gouvernance digitale Maroc"],
        en: ["digital law morocco", "e-commerce morocco", "electronic signature morocco", "internet law morocco", "digital consumer rights morocco", "digital intellectual property morocco", "digital governance morocco"],
    },
    h1: {
        ar: "القانون الرقمي في المغرب: دليل شامل",
        fr: "Le Droit Numérique au Maroc : Guide Complet",
        en: "Morocco Digital Law: Complete Guide",
    },
    badge: { ar: "القانون الرقمي", fr: "Droit Numérique", en: "Digital Law" },
    subtitle: {
        ar: "تعرف على الإطار القانوني الذي يحكم الفضاء الرقمي في المغرب — التجارة الإلكترونية، التوقيع الإلكتروني، حقوق المستهلك عبر الإنترنت، والملكية الفكرية الرقمية.",
        fr: "Découvrez le cadre juridique qui régit l'espace numérique marocain — e-commerce, signature électronique, droits du consommateur en ligne et propriété intellectuelle numérique.",
        en: "Understand the legal framework governing Morocco's digital space — e-commerce, electronic signatures, online consumer rights, and digital intellectual property.",
    },
    ctaText: { ar: "اسأل عن القانون الرقمي مجاناً", fr: "Posez Votre Question sur le Droit Numérique", en: "Ask About Digital Law Free" },
    faqTitle: { ar: "أسئلة شائعة حول القانون الرقمي في المغرب", fr: "FAQ Droit Numérique Maroc", en: "Morocco Digital Law FAQ" },
    faqItems: {
        ar: [
            { question: "هل التوقيع الإلكتروني معترف به قانوناً في المغرب؟", answer: "نعم، يعترف القانون المغربي بالتوقيع الإلكتروني وفق شروط محددة. ينظّم القانون رقم 53-05 المتعلق بالتبادل الإلكتروني للمعطيات القانونية صحة التوقيعات الإلكترونية وحجيتها القانونية أمام القضاء." },
            { question: "ما هي حقوق المستهلك في التجارة الإلكترونية بالمغرب؟", answer: "يكفل القانون المغربي للمستهلك الرقمي: حق الرجوع عن الشراء خلال 7 أيام، الحق في المعلومة الكاملة عن المنتج والبائع، الحماية من الممارسات التجارية المضللة، وضمانات جودة السلع." },
            { question: "هل يمكن مقاضاة موقع أجنبي على الإنترنت في المغرب؟", answer: "يمكن ذلك إذا كان الموقع يستهدف مستهلكين مغاربة أو يوجد له نشاط تجاري في المغرب. تختص المحاكم المغربية بالنظر في النزاعات عندما يكون المتضرر مقيماً بالمغرب، وإن كان التنفيذ الفعلي يطرح تحديات عملية." },
            { question: "كيف تُحمى الملكية الفكرية للمحتوى الرقمي في المغرب؟", answer: "يحمي المكتب المغربي للملكية الصناعية والتجارية (OMPIC) حقوق المؤلف الرقمية. الإبداعات الرقمية (مواقع، تطبيقات، محتوى) محمية بمجرد نشرها دون حاجة للتسجيل، وإن كان التسجيل يُثبّت حق الأولوية." },
        ],
        fr: [
            { question: "La signature électronique est-elle reconnue légalement au Maroc ?", answer: "Oui, la loi marocaine reconnaît la signature électronique selon des conditions précises. La loi n°53-05 sur l'échange électronique des données juridiques régit la validité et la valeur juridique des signatures électroniques." },
            { question: "Quels sont les droits du consommateur dans le e-commerce au Maroc ?", answer: "La loi garantit au consommateur numérique: droit de rétractation de 7 jours, droit à l'information complète sur le produit et le vendeur, protection contre les pratiques commerciales trompeuses et garanties de qualité." },
            { question: "Comment la propriété intellectuelle est-elle protégée au Maroc ?", answer: "L'OMPIC protège les droits d'auteur numériques. Les créations numériques (sites, applications, contenus) sont protégées dès leur publication sans enregistrement obligatoire, bien que l'enregistrement établisse la priorité." },
        ],
        en: [
            { question: "Is electronic signature legally recognized in Morocco?", answer: "Yes, Moroccan law recognizes electronic signatures under specific conditions. Law 53-05 on electronic exchange of legal data governs the validity and legal weight of electronic signatures in court." },
            { question: "What are consumer rights in Moroccan e-commerce?", answer: "Moroccan law guarantees digital consumers: 7-day right of withdrawal, right to complete product and seller information, protection against deceptive commercial practices, and product quality guarantees." },
            { question: "How is digital intellectual property protected in Morocco?", answer: "OMPIC protects digital copyrights. Digital creations (websites, apps, content) are protected from publication without mandatory registration, though registration establishes priority rights." },
        ],
    },
    features: {
        ar: [
            { icon: "🛒", title: "التجارة الإلكترونية", description: "الإطار القانوني للبيع عبر الإنترنت وحقوق المستهلك الرقمي في المغرب." },
            { icon: "✍️", title: "التوقيع الإلكتروني", description: "شروط وحجية التوقيع الإلكتروني في العقود والمعاملات الرقمية." },
            { icon: "🎨", title: "الملكية الفكرية الرقمية", description: "حماية مؤلفاتك ومشاريعك الرقمية بموجب القانون المغربي." },
            { icon: "🏛️", title: "الحكومة الرقمية", description: "الخدمات الإدارية الرقمية وحجية الوثائق الإلكترونية في المغرب." },
            { icon: "📱", title: "حقوق المستهلك الرقمي", description: "ما تكفله لك القوانين المغربية عند الشراء والتعامل عبر الإنترنت." },
            { icon: "🤖", title: "استشارة رقمية مجانية", description: "اسأل 9anon AI عن أي إشكالية في الفضاء الرقمي واحصل على إجابة فورية." },
        ],
        fr: [
            { icon: "🛒", title: "E-Commerce", description: "Cadre juridique de la vente en ligne et droits du consommateur numérique au Maroc." },
            { icon: "✍️", title: "Signature Électronique", description: "Conditions et valeur juridique de la signature électronique dans les contrats numériques." },
            { icon: "🎨", title: "Propriété Intellectuelle Numérique", description: "Protection de vos créations et projets numériques selon le droit marocain." },
            { icon: "🏛️", title: "Administration Numérique", description: "Services administratifs numériques et valeur juridique des documents électroniques." },
            { icon: "📱", title: "Droits du Consommateur Numérique", description: "Ce que les lois marocaines vous garantissent lors des achats et transactions en ligne." },
            { icon: "🤖", title: "Consultation Numérique Gratuite", description: "Posez à 9anon AI votre question numérique pour une réponse juridique instantanée." },
        ],
        en: [
            { icon: "🛒", title: "E-Commerce", description: "Legal framework for online sales and digital consumer rights in Morocco." },
            { icon: "✍️", title: "Electronic Signature", description: "Conditions and legal value of electronic signatures in digital contracts." },
            { icon: "🎨", title: "Digital Intellectual Property", description: "Protection of your digital creations and projects under Moroccan law." },
            { icon: "🏛️", title: "Digital Government", description: "Digital administrative services and legal weight of electronic documents." },
            { icon: "📱", title: "Digital Consumer Rights", description: "What Moroccan laws guarantee you when shopping and transacting online." },
            { icon: "🤖", title: "Free Digital Consultation", description: "Ask 9anon AI your digital law question and get an instant legal answer." },
        ],
    },
    contentSections: {
        ar: [
            { heading: "التحول الرقمي وتطور القانون المغربي", text: "يواكب المغرب التحول الرقمي العالمي بمنظومة تشريعية تتطور باستمرار: القانون 53-05 للتبادل الإلكتروني، والقانون 09-08 لحماية البيانات، إضافة إلى توجيهات مكتب الصرف حول المعاملات الدولية الرقمية. استراتيجية المغرب الرقمية 2030 تضع الاقتصاد الرقمي في صلب التنمية الوطنية." },
        ],
        fr: [
            { heading: "Transformation Numérique et Évolution du Droit Marocain", text: "Le Maroc accompagne la transformation numérique mondiale avec un arsenal législatif en constante évolution: loi 53-05 sur l'échange électronique, loi 09-08 sur la protection des données, plus les directives de l'Office des Changes sur les transactions numériques internationales. La stratégie numérique Maroc 2030 place l'économie numérique au cœur du développement national." },
        ],
        en: [
            { heading: "Digital Transformation and Morocco's Evolving Legal Framework", text: "Morocco accompanies global digital transformation with a continuously evolving legislative framework: Law 53-05 on electronic exchange, Law 09-08 on data protection, plus Exchange Office guidelines on international digital transactions. Morocco's Digital Strategy 2030 places the digital economy at the heart of national development." },
        ],
    },
    relatedLinks: [
        { href: "/cybersecurity-law", label: "Cybersecurity Law" },
        { href: "/crypto-law", label: "Crypto Law" },
        { href: "/startup-legal", label: "Startup Legal" },
        { href: "/business-legal", label: "Business Legal" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
    ],
    gradientFrom: "from-indigo-600",
    gradientTo: "to-blue-600",
    glowColor: "indigo",
};
