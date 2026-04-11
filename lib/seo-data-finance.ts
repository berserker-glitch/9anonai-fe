/**
 * @fileoverview SEO page data for finance/tax pages: tax-legal.
 * Targets Moroccan tax law queries — one of the highest-volume query clusters.
 * @module lib/seo-data-finance
 */

import { SEOPageConfig } from "./seo-page-types";

/** Tax Legal page — targets الضريبة / impôt Maroc / tax compliance morocco */
export const taxLegalPage: SEOPageConfig = {
    slug: "tax-legal",
    titles: {
        ar: "الضرائب في المغرب | قانون الضريبة على الدخل والشركات - 9anon AI",
        fr: "Droit Fiscal Maroc | Impôt sur le Revenu et Sociétés - 9anon AI",
        en: "Morocco Tax Law | Income Tax, Corporate Tax & VAT Guide - 9anon AI",
    },
    descriptions: {
        ar: "دليل شامل حول الضرائب في المغرب 2026: الضريبة على الدخل (IR)، ضريبة الشركات (IS)، الرسم على القيمة المضافة (TVA)، الإعفاءات الضريبية. استشارة قانونية ضريبية مجانية.",
        fr: "Guide complet sur la fiscalité marocaine 2026: IR, IS, TVA, exonérations et barèmes. Calculez votre impôt et obtenez une consultation fiscale gratuite par IA.",
        en: "Complete guide to Morocco tax law 2026: income tax (IR), corporate tax (IS), VAT, exemptions, and tax brackets. Free AI tax legal consultation.",
    },
    keywords: {
        ar: ["الضريبة على الدخل المغرب", "ضريبة الشركات المغرب", "الرسم على القيمة المضافة المغرب", "الشرائح الضريبية 2026", "الإعفاءات الضريبية المغرب", "قانون الضريبة المغرب", "حساب الضريبة على الدخل 2026"],
        fr: ["impôt sur le revenu Maroc", "IS Maroc", "TVA Maroc", "barème IR Maroc 2026", "exonérations fiscales Maroc", "taxe professionnelle Maroc", "droit fiscal marocain"],
        en: ["morocco income tax", "moroccan corporate tax", "vat morocco", "tax brackets morocco 2026", "tax exemptions morocco", "tax compliance morocco", "morocco tax law"],
    },
    h1: {
        ar: "الضرائب في المغرب 2026: دليلك القانوني الشامل",
        fr: "La Fiscalité au Maroc 2026 : Guide Juridique Complet",
        en: "Morocco Tax Law 2026: Your Complete Legal Guide",
    },
    badge: { ar: "الضريبة والجباية", fr: "Droit Fiscal", en: "Tax Law" },
    subtitle: {
        ar: "افهم منظومة الضرائب المغربية بسهولة — شرائح الضريبة على الدخل، ضريبة الشركات، الرسم على القيمة المضافة، والإعفاءات الضريبية لسنة 2026. استشارة ضريبية مجانية بالذكاء الاصطناعي.",
        fr: "Comprenez le système fiscal marocain — tranches IR, IS, TVA et exonérations pour 2026. Consultation fiscale gratuite par intelligence artificielle.",
        en: "Understand Morocco's tax system — income tax brackets, corporate tax, VAT, and exemptions for 2026. Free AI-powered tax legal consultation.",
    },
    ctaText: { ar: "اسأل عن الضرائب مجاناً", fr: "Posez Votre Question Fiscale", en: "Ask About Morocco Tax Law" },
    faqTitle: { ar: "أسئلة شائعة حول الضرائب في المغرب", fr: "FAQ Fiscalité Maroc", en: "Morocco Tax Law FAQ" },
    faqItems: {
        ar: [
            { question: "ما هي شرائح الضريبة على الدخل في المغرب 2026؟", answer: "وفق قانون المالية لسنة 2026، تتدرج شرائح الضريبة على الدخل (IR) كما يلي: معفى حتى 40,000 درهم سنوياً؛ 10% من 40,001 إلى 60,000؛ 20% من 60,001 إلى 80,000؛ 30% من 80,001 إلى 100,000؛ 34% من 100,001 إلى 180,000؛ 38% فوق 180,000 درهم." },
            { question: "كيف تُحسب ضريبة الكراء في المغرب؟", answer: "يخضع الدخل من الكراء للضريبة على الدخل بعد خصم 40% كأعباء. إذا كان الكراء سكنياً يتم عبر الأستاذ المعتمد فإن صاحب العمل يقتطع الضريبة مباشرة. إذا كان إيجاراً تجارياً، يلتزم المستأجر المهني بالاقتطاع من المنبع بنسبة 10% أو 15% حسب الحالة." },
            { question: "ما هي المنتجات والخدمات المعفاة من الرسم على القيمة المضافة TVA في المغرب؟", answer: "يعفي القانون المغربي من TVA: المواد الغذائية الأساسية (الدقيق، السكر، الحليب)، الأدوية، الكتب والصحف، بعض معدات الطاقة الشمسية، خدمات التعليم، وبعض المعاملات المالية والتأمين. قانون المالية 2026 وسّع قائمة الإعفاءات." },
            { question: "ما هو سعر ضريبة الشركات IS في المغرب 2026؟", answer: "ضريبة الشركات (IS) تتراوح بين 20% و35% حسب حجم الأرباح. الشركات ذات ربح صافٍ يقل عن 300,000 درهم تستفيد من سعر مخفض. المقاولات الذاتية تستفيد من نظام ضريبي مبسط." },
            { question: "هل يمكنني الاستفادة من العفو الضريبي في المغرب 2026؟", answer: "أعلنت المديرية العامة للضرائب عن برامج للتسوية الطوعية تتيح للمخالفين تسوية وضعيتهم بتخفيض في الغرامات. يُنصح باستشارة مختص ضريبي أو الاستفسار مباشرة من مكتب الضرائب المحلي." },
        ],
        fr: [
            { question: "Quelles sont les tranches d'IR au Maroc pour 2026 ?", answer: "Selon la Loi de Finances 2026: exonéré jusqu'à 40 000 MAD; 10% de 40 001 à 60 000; 20% de 60 001 à 80 000; 30% de 80 001 à 100 000; 34% de 100 001 à 180 000; 38% au-delà de 180 000 MAD." },
            { question: "Comment est calculé l'impôt sur les revenus locatifs au Maroc ?", answer: "Les revenus locatifs sont soumis à l'IR après déduction forfaitaire de 40% pour charges. Pour les locations professionnelles, le locataire professionnel effectue une retenue à la source de 10% ou 15% selon le cas." },
            { question: "Quels produits sont exonérés de TVA au Maroc ?", answer: "Sont exonérés: les produits alimentaires de base (farine, sucre, lait), les médicaments, les livres, certains équipements solaires, les services d'enseignement et certaines opérations financières." },
            { question: "Quel est le taux de l'IS au Maroc en 2026 ?", answer: "L'IS varie entre 20% et 35% selon le niveau des bénéfices. Les entreprises avec bénéfice net inférieur à 300 000 MAD bénéficient d'un taux réduit." },
        ],
        en: [
            { question: "What are Morocco's income tax brackets for 2026?", answer: "Under the 2026 Finance Law: exempt up to 40,000 MAD; 10% from 40,001 to 60,000; 20% from 60,001 to 80,000; 30% from 80,001 to 100,000; 34% from 100,001 to 180,000; 38% above 180,000 MAD." },
            { question: "How is rental income taxed in Morocco?", answer: "Rental income is subject to income tax (IR) after a 40% lump-sum deduction for costs. For professional rentals, the professional tenant withholds 10-15% at source." },
            { question: "Which products are VAT-exempt in Morocco?", answer: "VAT exemptions include: basic foodstuffs (flour, sugar, milk), medicines, books and newspapers, certain solar equipment, education services, and some financial transactions." },
            { question: "What is Morocco's corporate tax rate in 2026?", answer: "Corporate tax (IS) ranges between 20% and 35% depending on profit level. Companies with net profits below 300,000 MAD qualify for a reduced rate." },
        ],
    },
    features: {
        ar: [
            { icon: "📊", title: "شرائح ضريبة الدخل 2026", description: "اعرف شريحتك الضريبية الدقيقة ومقدار ما يُخصم من راتبك شهرياً." },
            { icon: "🏢", title: "ضريبة الشركات IS", description: "كيفية احتساب ضريبة الشركات والإعفاءات المتاحة للمقاولات الصغيرة." },
            { icon: "🛒", title: "الرسم على القيمة المضافة TVA", description: "المنتجات والخدمات المعفاة والخاضعة للـ TVA في المغرب 2026." },
            { icon: "🏠", title: "ضريبة الكراء", description: "كيفية التصريح بدخل الكراء وحساب الضريبة المستحقة." },
            { icon: "🤖", title: "ذكاء اصطناعي ضريبي مجاني", description: "اسأل 9anon AI عن وضعيتك الضريبية واحصل على إجابة دقيقة وفورية." },
            { icon: "📋", title: "حاسبة الضريبة", description: "استخدم حاسبتنا المجانية لمعرفة ضريبة الدخل أو الكراء الخاصة بك." },
        ],
        fr: [
            { icon: "📊", title: "Tranches IR 2026", description: "Connaître votre tranche d'imposition exacte et le montant prélevé sur votre salaire." },
            { icon: "🏢", title: "Impôt sur les Sociétés (IS)", description: "Calculer l'IS et les exonérations disponibles pour les petites entreprises." },
            { icon: "🛒", title: "TVA au Maroc", description: "Produits et services exonérés ou soumis à la TVA en 2026." },
            { icon: "🏠", title: "Impôt sur les Revenus Locatifs", description: "Déclarer les revenus locatifs et calculer l'impôt dû." },
            { icon: "🤖", title: "IA Fiscale Gratuite", description: "Posez à 9anon AI vos questions fiscales pour une réponse précise et instantanée." },
            { icon: "📋", title: "Calculateur d'Impôt", description: "Utilisez notre calculateur gratuit pour estimer votre IR ou impôt locatif." },
        ],
        en: [
            { icon: "📊", title: "Income Tax Brackets 2026", description: "Know your exact tax bracket and monthly withholding amount." },
            { icon: "🏢", title: "Corporate Tax (IS)", description: "Calculate IS and exemptions available for small businesses." },
            { icon: "🛒", title: "VAT in Morocco", description: "Products and services exempt or subject to VAT in 2026." },
            { icon: "🏠", title: "Rental Income Tax", description: "How to declare rental income and calculate the tax owed." },
            { icon: "🤖", title: "Free AI Tax Guidance", description: "Ask 9anon AI your tax questions and get accurate instant answers." },
            { icon: "📋", title: "Tax Calculator", description: "Use our free calculator to estimate your income or rental tax." },
        ],
    },
    contentSections: {
        ar: [
            { heading: "منظومة الضرائب المغربية: نظرة عامة", text: "تتكون المنظومة الضريبية المغربية من ثلاثة محاور رئيسية: الضريبة على الدخل (IR) التي تطبق على الأفراد والمقاولين الذاتيين، وضريبة الشركات (IS) المطبقة على الشركات، والرسم على القيمة المضافة (TVA). تُشرف المديرية العامة للضرائب (DGI) على تطبيق هذه الضرائب وتحصيلها." },
            { heading: "الضريبة على الدخل: من يدفع وكيف؟", text: "تسري الضريبة على الدخل على كل دخل يحصل عليه الشخص الطبيعي المقيم بالمغرب من أجور ورواتب أو إيجارات أو أرباح تجارية أو مهنية. يقتطع صاحب العمل الضريبة مباشرة من المرتب (نظام الاقتطاع من المنبع)، بينما يُلزَم المعنيون بالدخل من الكراء أو الأرباح التجارية بالتصريح الذاتي." },
            { heading: "كيف يستفيد المغاربة من الإعفاءات الضريبية؟", text: "يُتيح القانون الضريبي المغربي جملة من الإعفاءات والتخفيضات: الإعفاء التام للمسكن الرئيسي بعد 8 سنوات من الامتلاك، تخفيض للأعباء العائلية، إعفاءات للمصدّرين ومؤسسات التعليم والرياضة. يُنصح باستشارة 9anon AI لمعرفة الإعفاءات المنطبقة على وضعيتك." },
        ],
        fr: [
            { heading: "Le Système Fiscal Marocain: Vue d'Ensemble", text: "Le système fiscal marocain comprend trois piliers: l'IR (personnes physiques et auto-entrepreneurs), l'IS (sociétés), et la TVA. La Direction Générale des Impôts (DGI) supervise la collecte." },
            { heading: "L'Impôt sur le Revenu: Qui Paie et Comment ?", text: "L'IR s'applique à tous les revenus perçus par les personnes physiques résidentes: salaires, loyers, bénéfices commerciaux. L'employeur retient l'IR à la source pour les salariés." },
        ],
        en: [
            { heading: "Morocco's Tax System: An Overview", text: "Morocco's tax system has three pillars: IR (individuals and sole traders), IS (companies), and VAT. The General Tax Directorate (DGI) oversees collection and enforcement." },
            { heading: "Income Tax: Who Pays and How?", text: "IR applies to all income earned by Moroccan residents: salaries, rentals, business profits. Employers withhold IR directly from salaries, while rental and business income requires self-declaration." },
        ],
    },
    relatedLinks: [
        { href: "/business-legal", label: "Business Legal" },
        { href: "/commercial-law", label: "Commercial Law" },
        { href: "/startup-legal", label: "Startup Legal" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
        { href: "/online-consultation", label: "Online Consultation" },
    ],
};
