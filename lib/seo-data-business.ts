/**
 * @fileoverview SEO page data for business-focused pages:
 * business-legal, startup-legal, contract-review, commercial-law, tax-legal.
 * These target business/B2B intent keywords.
 * @module lib/seo-data-business
 */

import { SEOPageConfig } from "./seo-page-types";

/** Business Legal page — targets "business legal help Morocco" keywords */
export const businessLegalPage: SEOPageConfig = {
    slug: "business-legal",
    titles: {
        en: "Business Legal Help Morocco | Corporate Compliance AI - 9anon AI",
        fr: "Aide Juridique Entreprise Maroc | Conformité Légale IA - 9anon AI",
        ar: "استشارة قانونية للشركات المغرب | امتثال قانوني بالذكاء الاصطناعي - 9anon AI",
    },
    descriptions: {
        en: "Free AI-powered legal help for businesses in Morocco. Corporate compliance, commercial law, contract review, and SME legal services. Available 24/7.",
        fr: "Aide juridique IA gratuite pour les entreprises au Maroc. Conformité, droit commercial, révision de contrats et services PME. Disponible 24/7.",
        ar: "مساعدة قانونية مجانية بالذكاء الاصطناعي للشركات في المغرب. الامتثال القانوني والقانون التجاري ومراجعة العقود وخدمات الشركات الصغيرة والمتوسطة.",
    },
    keywords: {
        en: ["business legal help Morocco", "corporate legal compliance Morocco", "SME legal services Morocco", "business contract review Morocco", "tax compliance legal help Morocco", "Moroccan commercial law advice"],
        fr: ["aide juridique entreprise Maroc", "conformité légale entreprise Maroc", "droit commercial Maroc conseil"],
        ar: ["استشارة قانونية للشركات المغرب", "الامتثال القانوني للشركات المغرب", "القانون التجاري المغربي"],
    },
    h1: { en: "Business Legal Help in Morocco", fr: "Aide Juridique pour Entreprises au Maroc", ar: "مساعدة قانونية للشركات في المغرب" },
    badge: { en: "Business Law", fr: "Droit des Affaires", ar: "قانون الأعمال" },
    subtitle: {
        en: "Navigate Moroccan business law with AI-powered legal guidance. From corporate compliance to contract review, get instant answers about commercial law, tax obligations, and company regulations — free and confidential.",
        fr: "Naviguez le droit des affaires marocain avec une guidance juridique IA. De la conformité à la révision de contrats, obtenez des réponses instantanées sur le droit commercial et les obligations fiscales.",
        ar: "تنقل في القانون التجاري المغربي مع إرشاد قانوني بالذكاء الاصطناعي. من الامتثال القانوني إلى مراجعة العقود، احصل على إجابات فورية حول القانون التجاري والالتزامات الضريبية.",
    },
    ctaText: { en: "Ask Business Legal Question", fr: "Posez Votre Question Entreprise", ar: "اطرح سؤالك القانوني للأعمال" },
    faqTitle: { en: "Business Law FAQ", fr: "FAQ Droit des Affaires", ar: "أسئلة شائعة عن قانون الأعمال" },
    faqItems: {
        en: [
            { question: "What legal forms of business exist in Morocco?", answer: "Morocco offers several business structures: SARL (LLC), SA (Corporation), SNC (General Partnership), SCS (Limited Partnership), and auto-entrepreneur. Each has different requirements for capital, shareholders, and liability." },
            { question: "What are the main compliance requirements?", answer: "Businesses must register with the Registre de Commerce, obtain a tax ID (Identifiant Fiscal), register for CNSS (social security), maintain proper accounting, file annual tax returns, and comply with labor laws." },
            { question: "Can AI help with contract review?", answer: "Yes! 9anon AI can analyze business contracts against Moroccan commercial law, highlight potential issues, and explain your obligations and rights under the contract terms." },
        ],
        fr: [
            { question: "Quelles formes juridiques d'entreprise existent au Maroc ?", answer: "Le Maroc offre plusieurs structures : SARL, SA, SNC, SCS et auto-entrepreneur. Chacune a des exigences différentes en capital, associés et responsabilité." },
            { question: "Quelles sont les principales obligations de conformité ?", answer: "Les entreprises doivent s'inscrire au Registre de Commerce, obtenir un IF, s'inscrire à la CNSS, tenir une comptabilité, déposer les déclarations fiscales et respecter le droit du travail." },
            { question: "L'IA peut-elle aider à la révision de contrats ?", answer: "Oui ! 9anon AI peut analyser les contrats par rapport au droit commercial marocain et mettre en évidence les problèmes potentiels." },
        ],
        ar: [
            { question: "ما هي الأشكال القانونية للشركات في المغرب؟", answer: "يوفر المغرب عدة هياكل: شركة ذات مسؤولية محدودة (SARL)، شركة مساهمة (SA)، شركة تضامن (SNC)، شركة توصية (SCS)، والمقاول الذاتي. لكل منها متطلبات مختلفة." },
            { question: "ما هي متطلبات الامتثال الرئيسية؟", answer: "يجب على الشركات التسجيل في السجل التجاري والحصول على رقم ضريبي والتسجيل في الصندوق الوطني للضمان الاجتماعي ومسك محاسبة سليمة وتقديم الإقرارات الضريبية." },
            { question: "هل يمكن للذكاء الاصطناعي مساعدتي في مراجعة العقود؟", answer: "نعم! يمكن لـ 9anon AI تحليل عقود الأعمال مقابل القانون التجاري المغربي وتسليط الضوء على المشكلات المحتملة." },
        ],
    },
    features: {
        en: [
            { icon: "🏢", title: "Corporate Compliance", description: "Understand your obligations under Moroccan commercial and regulatory law." },
            { icon: "📋", title: "Contract Analysis", description: "AI-powered review of business contracts and agreements." },
            { icon: "💼", title: "SME Legal Services", description: "Tailored guidance for small and medium enterprises in Morocco." },
            { icon: "📊", title: "Tax Compliance", description: "Navigate Moroccan tax obligations and filing requirements." },
            { icon: "🔒", title: "Data & Privacy", description: "Understand Morocco's data protection requirements for businesses." },
            { icon: "⚡", title: "Instant Legal Help", description: "24/7 AI-powered answers for your business legal questions." },
        ],
        fr: [
            { icon: "🏢", title: "Conformité Entreprise", description: "Comprenez vos obligations selon le droit commercial marocain." },
            { icon: "📋", title: "Analyse de Contrats", description: "Révision IA de contrats et accords commerciaux." },
            { icon: "💼", title: "Services PME", description: "Guidance adaptée pour les PME au Maroc." },
            { icon: "📊", title: "Conformité Fiscale", description: "Naviguez les obligations fiscales marocaines." },
            { icon: "🔒", title: "Données & Confidentialité", description: "Exigences de protection des données pour les entreprises." },
            { icon: "⚡", title: "Aide Juridique Instantanée", description: "Réponses IA 24/7 pour vos questions juridiques." },
        ],
        ar: [
            { icon: "🏢", title: "امتثال الشركات", description: "افهم التزاماتك وفق القانون التجاري والتنظيمي المغربي." },
            { icon: "📋", title: "تحليل العقود", description: "مراجعة عقود الأعمال بالذكاء الاصطناعي." },
            { icon: "💼", title: "خدمات الشركات الصغيرة", description: "إرشاد مخصص للمقاولات الصغيرة والمتوسطة في المغرب." },
            { icon: "📊", title: "الامتثال الضريبي", description: "تنقل في الالتزامات الضريبية المغربية." },
            { icon: "🔒", title: "البيانات والخصوصية", description: "فهم متطلبات حماية البيانات للشركات." },
            { icon: "⚡", title: "مساعدة قانونية فورية", description: "إجابات ذكية 24/7 لأسئلتك القانونية التجارية." },
        ],
    },
    contentSections: {
        en: [
            { heading: "Legal Challenges for Businesses in Morocco", text: "Running a business in Morocco requires navigating complex legal frameworks spanning commercial law, labor law, tax regulations, and industry-specific requirements. From company formation to ongoing compliance, missing a legal requirement can result in fines or worse. 9anon AI provides instant guidance on all aspects of Moroccan business law." },
            { heading: "How 9anon AI Helps Businesses", text: "Our AI assistant understands Moroccan commercial code, labor code, and tax regulations. Ask about company registration procedures, contract clauses, employee obligations, tax filing deadlines, or any other business legal question and get accurate answers instantly — saving you expensive lawyer consultations for routine legal queries." },
        ],
        fr: [
            { heading: "Défis Juridiques pour les Entreprises au Maroc", text: "Gérer une entreprise au Maroc nécessite de naviguer des cadres juridiques complexes couvrant le droit commercial, du travail, fiscal et sectoriel. 9anon AI fournit une guidance instantanée sur tous les aspects du droit des affaires marocain." },
            { heading: "Comment 9anon AI Aide les Entreprises", text: "Notre assistant comprend le code de commerce, le code du travail et la réglementation fiscale marocains. Posez des questions et obtenez des réponses précises instantanément." },
        ],
        ar: [
            { heading: "التحديات القانونية للشركات في المغرب", text: "إدارة شركة في المغرب تتطلب التنقل في أطر قانونية معقدة تشمل القانون التجاري وقانون الشغل والأنظمة الضريبية. يوفر 9anon AI إرشاداً فورياً حول جميع جوانب قانون الأعمال المغربي." },
            { heading: "كيف يساعد 9anon AI الشركات", text: "يفهم مساعدنا الذكي مدونة التجارة ومدونة الشغل والأنظمة الضريبية المغربية. اطرح أسئلتك حول إجراءات تسجيل الشركات ومشاريع العقود والالتزامات واحصل على إجابات دقيقة فورياً." },
        ],
    },
    relatedLinks: [
        { href: "/startup-legal", label: "Startup Legal" },
        { href: "/contract-review", label: "Contract Review" },
        { href: "/commercial-law", label: "Commercial Law" },
        { href: "/tax-legal", label: "Tax Compliance" },
        { href: "/employee-rights", label: "Employee Rights" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
    ],
    gradientFrom: "from-violet-600",
    gradientTo: "to-purple-500",
    glowColor: "bg-violet-500/20",
};

/** Startup Legal page — targets company registration + startup keywords */
export const startupLegalPage: SEOPageConfig = {
    slug: "startup-legal",
    titles: {
        en: "Startup Legal Advice Morocco | Company Registration Help - 9anon AI",
        fr: "Conseil Juridique Startup Maroc | Création Société - 9anon AI",
        ar: "مساعدة قانونية للشركات الناشئة المغرب | تسجيل شركة - 9anon AI",
    },
    descriptions: {
        en: "Free legal advice for startups in Morocco. AI-powered help with company registration, business structure selection, legal compliance, and entrepreneur regulations.",
        fr: "Conseil juridique gratuit pour les startups au Maroc. Aide IA pour la création de société, choix de structure et conformité légale.",
        ar: "استشارة قانونية مجانية للشركات الناشئة في المغرب. مساعدة بالذكاء الاصطناعي لتسجيل الشركات واختيار الهيكل القانوني والامتثال.",
    },
    keywords: {
        en: ["startup legal advice Morocco", "company registration legal help Morocco", "legal support for startups Morocco"],
        fr: ["conseil juridique startup Maroc", "création société Maroc assistance juridique"],
        ar: ["تسجيل شركة في المغرب مساعدة", "استشارة قانونية للشركات الناشئة", "مساعدة قانونية للشركات الناشئة"],
    },
    h1: { en: "Startup & Company Registration Legal Help", fr: "Aide Juridique Startup et Création de Société", ar: "مساعدة قانونية لتسجيل الشركات والمقاولات الناشئة" },
    badge: { en: "Startup Law", fr: "Droit des Startups", ar: "قانون الشركات الناشئة" },
    subtitle: {
        en: "Launch your business in Morocco with confidence. Get free AI-powered legal guidance on company registration, choosing the right business structure, compliance requirements, and protecting your startup legally.",
        fr: "Lancez votre entreprise au Maroc en toute confiance. Guide juridique IA gratuit sur la création de société, le choix de structure et la conformité.",
        ar: "أطلق مشروعك في المغرب بثقة. احصل على إرشاد قانوني مجاني بالذكاء الاصطناعي حول تسجيل الشركات واختيار الهيكل المناسب ومتطلبات الامتثال.",
    },
    ctaText: { en: "Ask About Company Registration", fr: "Question sur la Création de Société", ar: "اسأل عن تسجيل شركة" },
    faqTitle: { en: "Startup Legal FAQ", fr: "FAQ Juridique Startup", ar: "أسئلة شائعة للشركات الناشئة" },
    faqItems: {
        en: [
            { question: "How do I register a company in Morocco?", answer: "Register at the Centre Régional d'Investissement (CRI). You'll need: company statutes, ID documents, registered office proof, bank deposit certificate, and negative certificate (Certificat Négatif) for the company name." },
            { question: "SARL or SA — which is better for my startup?", answer: "SARL (LLC) is usually best for small startups: minimum 1 MAD capital, 1-50 shareholders, simpler management. SA is for larger companies needing to raise capital or go public: minimum 300,000 MAD capital." },
            { question: "What is the auto-entrepreneur status?", answer: "Auto-entrepreneur is a simplified status for individual entrepreneurs with annual revenue under 500,000 MAD (services) or 2,000,000 MAD (commerce). It offers simplified tax (0.5-1%) and minimal accounting requirements." },
        ],
        fr: [
            { question: "Comment créer une société au Maroc ?", answer: "Inscrivez-vous au CRI. Vous aurez besoin de : statuts, pièces d'identité, justificatif de siège social, attestation de dépôt bancaire et certificat négatif pour le nom." },
            { question: "SARL ou SA — quel est le meilleur choix ?", answer: "La SARL convient aux petites startups : capital minimum 1 MAD, 1-50 associés, gestion simple. La SA est pour les grandes entreprises : capital minimum 300 000 MAD." },
            { question: "Qu'est-ce que le statut d'auto-entrepreneur ?", answer: "Un statut simplifié pour les entrepreneurs individuels avec un chiffre d'affaires annuel limité. Offre une fiscalité simplifiée et une comptabilité minimale." },
        ],
        ar: [
            { question: "كيف أسجل شركة في المغرب؟", answer: "سجل في المركز الجهوي للاستثمار. ستحتاج: النظام الأساسي، وثائق الهوية، إثبات المقر، شهادة الإيداع البنكي، والشهادة السلبية لاسم الشركة." },
            { question: "SARL أو SA — أيهما أفضل لمشروعي؟", answer: "الشركة ذات المسؤولية المحدودة (SARL) عادة أفضل للمشاريع الصغيرة: رأس مال أدنى 1 درهم، 1-50 شريك. شركة المساهمة (SA) للشركات الكبيرة: رأس مال أدنى 300,000 درهم." },
            { question: "ما هو نظام المقاول الذاتي؟", answer: "نظام مبسط للمقاولين الأفراد بسقف رقم معاملات سنوي. يوفر ضرائب مبسطة (0.5-1%) ومحاسبة دنيا." },
        ],
    },
    features: {
        en: [
            { icon: "🏗️", title: "Company Registration", description: "Step-by-step guidance through the Moroccan CRI registration process." },
            { icon: "📐", title: "Structure Selection", description: "Choose between SARL, SA, SNC, auto-entrepreneur based on your needs." },
            { icon: "📜", title: "Legal Documents", description: "Understand statutes, shareholder agreements, and required filings." },
            { icon: "💰", title: "Funding & Capital", description: "Legal requirements for capital deposits and investor agreements." },
            { icon: "📊", title: "Tax Setup", description: "IS, IR, TVA — understand which taxes apply to your business." },
            { icon: "⚡", title: "Instant Answers", description: "Get immediate startup legal guidance from 9anon AI." },
        ],
        fr: [
            { icon: "🏗️", title: "Création de Société", description: "Guide étape par étape pour l'inscription au CRI." },
            { icon: "📐", title: "Choix de Structure", description: "SARL, SA, SNC ou auto-entrepreneur selon vos besoins." },
            { icon: "📜", title: "Documents Juridiques", description: "Comprenez les statuts et accords d'associés requis." },
            { icon: "💰", title: "Financement & Capital", description: "Exigences légales pour les dépôts de capital." },
            { icon: "📊", title: "Configuration Fiscale", description: "IS, IR, TVA — quelles taxes s'appliquent à votre entreprise." },
            { icon: "⚡", title: "Réponses Instantanées", description: "Guidance juridique startup immédiate de 9anon AI." },
        ],
        ar: [
            { icon: "🏗️", title: "تسجيل الشركات", description: "إرشاد خطوة بخطوة لعملية التسجيل في المركز الجهوي للاستثمار." },
            { icon: "📐", title: "اختيار الهيكل", description: "اختر بين SARL أو SA أو SNC أو المقاول الذاتي حسب احتياجاتك." },
            { icon: "📜", title: "الوثائق القانونية", description: "افهم النظام الأساسي واتفاقيات الشركاء والتصريحات المطلوبة." },
            { icon: "💰", title: "التمويل ورأس المال", description: "المتطلبات القانونية لإيداعات رأس المال والاتفاقيات." },
            { icon: "📊", title: "الإعداد الضريبي", description: "IS, IR, TVA — افهم أي ضرائب تنطبق على مشروعك." },
            { icon: "⚡", title: "إجابات فورية", description: "إرشاد قانوني فوري للشركات الناشئة من 9anon AI." },
        ],
    },
    contentSections: {
        en: [
            { heading: "Starting a Business in Morocco", text: "Morocco has significantly simplified company registration through the Centre Régional d'Investissement (CRI). The one-stop shop approach allows entrepreneurs to complete registration in as little as 3-5 business days. Understanding the legal requirements upfront saves time and costly mistakes." },
            { heading: "Choosing the Right Business Structure", text: "The most common structure for Moroccan startups is the SARL (Société à Responsabilité Limitée), equivalent to an LLC. It offers limited liability, flexible management, and a minimum capital of just 1 MAD. For larger ventures seeking outside investment, the SA (Société Anonyme) is more appropriate." },
        ],
        fr: [
            { heading: "Créer une Entreprise au Maroc", text: "Le Maroc a considérablement simplifié la création d'entreprise via le CRI. L'approche guichet unique permet aux entrepreneurs de finaliser l'inscription en 3-5 jours ouvrables." },
            { heading: "Choisir la Bonne Structure", text: "La structure la plus courante pour les startups marocaines est la SARL offrant une responsabilité limitée, gestion flexible et capital minimum de 1 MAD. Pour les projets plus importants, la SA est plus appropriée." },
        ],
        ar: [
            { heading: "بدء مشروع في المغرب", text: "بسط المغرب بشكل كبير عملية تسجيل الشركات عبر المركز الجهوي للاستثمار. نهج الشباك الواحد يسمح للمقاولين بإتمام التسجيل في 3-5 أيام عمل فقط." },
            { heading: "اختيار الهيكل القانوني المناسب", text: "الهيكل الأكثر شيوعاً للشركات الناشئة المغربية هو الشركة ذات المسؤولية المحدودة (SARL) التي توفر مسؤولية محدودة وإدارة مرنة ورأس مال أدنى 1 درهم فقط. للمشاريع الأكبر، شركة المساهمة (SA) أنسب." },
        ],
    },
    relatedLinks: [
        { href: "/business-legal", label: "Business Legal Help" },
        { href: "/contract-review", label: "Contract Review" },
        { href: "/commercial-law", label: "Commercial Law" },
        { href: "/tax-legal", label: "Tax Compliance" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
    ],
    gradientFrom: "from-cyan-600",
    gradientTo: "to-sky-500",
    glowColor: "bg-cyan-500/20",
};

/** Contract Review page — targets "contract review AI Morocco" */
export const contractReviewPage: SEOPageConfig = {
    slug: "contract-review",
    titles: {
        en: "Contract Review AI Morocco | Business Contract Help - 9anon AI",
        fr: "Révision de Contrats IA Maroc | Rédaction Contrat - 9anon AI",
        ar: "مراجعة العقود بالذكاء الاصطناعي المغرب | صياغة عقود - 9anon AI",
    },
    descriptions: {
        en: "AI-powered contract review for Moroccan businesses. Get instant analysis of employment contracts, commercial agreements, lease contracts, and more.",
        fr: "Révision de contrats par IA pour les entreprises marocaines. Analyse instantanée de contrats de travail, accords commerciaux et baux.",
        ar: "مراجعة العقود بالذكاء الاصطناعي للشركات المغربية. تحليل فوري لعقود العمل والاتفاقيات التجارية وعقود الكراء.",
    },
    keywords: {
        en: ["contract review AI Morocco", "business contract review Morocco"],
        fr: ["rédaction contrat Maroc", "révision contrat IA Maroc"],
        ar: ["صياغة عقد شركة المغرب", "مراجعة عقود المغرب"],
    },
    h1: { en: "AI Contract Review for Moroccan Law", fr: "Révision de Contrats par IA au Maroc", ar: "مراجعة العقود بالذكاء الاصطناعي وفق القانون المغربي" },
    badge: { en: "Contract Review", fr: "Révision de Contrats", ar: "مراجعة العقود" },
    subtitle: {
        en: "Get instant AI-powered analysis of your contracts against Moroccan law. Understand clauses, identify risks, and ensure compliance for employment contracts, commercial agreements, leases, and more.",
        fr: "Obtenez une analyse IA instantanée de vos contrats. Comprenez les clauses, identifiez les risques et assurez la conformité pour vos contrats de travail, accords commerciaux et baux.",
        ar: "احصل على تحليل فوري بالذكاء الاصطناعي لعقودك وفق القانون المغربي. افهم البنود وحدد المخاطر وتأكد من الامتثال لعقود العمل والاتفاقيات التجارية.",
    },
    ctaText: { en: "Review Your Contract", fr: "Révisez Votre Contrat", ar: "راجع عقدك" },
    faqTitle: { en: "Contract Review FAQ", fr: "FAQ Révision de Contrats", ar: "أسئلة شائعة عن مراجعة العقود" },
    faqItems: {
        en: [
            { question: "Can AI really review contracts?", answer: "Yes! 9anon AI can analyze contract clauses against Moroccan commercial, labor, and rental law. It identifies potentially unfair terms, missing required clauses, and compliance issues." },
            { question: "What types of contracts can be reviewed?", answer: "Employment contracts (CDI/CDD), commercial agreements, rental leases, partnership agreements, sales contracts, service agreements, and non-compete clauses." },
            { question: "Is AI contract review legally binding?", answer: "No. AI contract review provides informational analysis. For legally binding review and contract drafting, consult a licensed Moroccan notaire or avocat." },
        ],
        fr: [
            { question: "L'IA peut-elle vraiment réviser des contrats ?", answer: "Oui ! 9anon AI analyse les clauses contre le droit marocain, identifie les termes potentiellement abusifs et les problèmes de conformité." },
            { question: "Quels types de contrats peuvent être révisés ?", answer: "Contrats de travail (CDI/CDD), accords commerciaux, baux de location, accords de partenariat, contrats de vente et clauses de non-concurrence." },
            { question: "La révision IA est-elle juridiquement contraignante ?", answer: "Non. Elle fournit une analyse informative. Pour une révision contraignante, consultez un notaire ou avocat." },
        ],
        ar: [
            { question: "هل يمكن للذكاء الاصطناعي مراجعة العقود فعلاً؟", answer: "نعم! يمكن لـ 9anon AI تحليل بنود العقود مقابل القانون التجاري وقانون الشغل وقانون الكراء المغربي. يحدد البنود غير العادلة ومشكلات الامتثال." },
            { question: "ما أنواع العقود التي يمكن مراجعتها؟", answer: "عقود العمل (CDI/CDD) والاتفاقيات التجارية وعقود الكراء واتفاقيات الشراكة وعقود البيع وبنود عدم المنافسة." },
            { question: "هل مراجعة العقود بالذكاء الاصطناعي ملزمة قانونياً؟", answer: "لا. توفر تحليلاً معلوماتياً. للمراجعة الملزمة قانونياً استشر موثقاً أو محامياً مرخصاً." },
        ],
    },
    features: {
        en: [
            { icon: "📝", title: "Clause Analysis", description: "Understand every clause in your contract and what it means for you." },
            { icon: "⚠️", title: "Risk Identification", description: "Spot unfair terms and potentially harmful clauses before signing." },
            { icon: "✅", title: "Compliance Check", description: "Ensure your contract meets Moroccan legal requirements." },
            { icon: "🌍", title: "Multilingual", description: "Analyze contracts written in Arabic, French, or English." },
            { icon: "⚡", title: "Instant Analysis", description: "Get contract analysis in seconds, not days." },
            { icon: "💰", title: "Free", description: "No charge for AI-powered contract analysis." },
        ],
        fr: [
            { icon: "📝", title: "Analyse de Clauses", description: "Comprenez chaque clause et ses implications." },
            { icon: "⚠️", title: "Identification des Risques", description: "Repérez les termes abusifs avant de signer." },
            { icon: "✅", title: "Vérification de Conformité", description: "Assurez la conformité aux exigences légales marocaines." },
            { icon: "🌍", title: "Multilingue", description: "Analysez les contrats en arabe, français ou anglais." },
            { icon: "⚡", title: "Analyse Instantanée", description: "Résultats en secondes, pas en jours." },
            { icon: "💰", title: "Gratuit", description: "Aucun frais pour l'analyse IA de contrats." },
        ],
        ar: [
            { icon: "📝", title: "تحليل البنود", description: "افهم كل بند في عقدك وماذا يعني لك." },
            { icon: "⚠️", title: "تحديد المخاطر", description: "اكتشف الشروط غير العادلة والبنود الضارة قبل التوقيع." },
            { icon: "✅", title: "فحص الامتثال", description: "تأكد أن عقدك يلبي المتطلبات القانونية المغربية." },
            { icon: "🌍", title: "متعدد اللغات", description: "حلل العقود المكتوبة بالعربية أو الفرنسية أو الإنجليزية." },
            { icon: "⚡", title: "تحليل فوري", description: "احصل على تحليل العقد في ثوانٍ وليس أيام." },
            { icon: "💰", title: "مجاني", description: "لا رسوم لتحليل العقود بالذكاء الاصطناعي." },
        ],
    },
    contentSections: {
        en: [
            { heading: "Why Contract Review Matters", text: "In Morocco, many business disputes arise from poorly drafted or misunderstood contracts. AI-powered contract review helps you understand your obligations and rights before signing, potentially saving you from costly legal disputes. 9anon AI analyzes contracts against Moroccan commercial code, labor code, and rental law." },
            { heading: "How AI Contract Analysis Works", text: "Simply share the key clauses of your contract and our AI will analyze them against relevant Moroccan law. It identifies missing required clauses, potentially unfair terms, compliance issues, and explains complex legal language in simple terms you can understand." },
        ],
        fr: [
            { heading: "Pourquoi la Révision de Contrats Est Importante", text: "Au Maroc, de nombreux litiges commerciaux découlent de contrats mal rédigés. La révision IA vous aide à comprendre vos obligations avant de signer, vous épargnant des litiges coûteux." },
            { heading: "Comment Fonctionne l'Analyse IA", text: "Partagez les clauses clés de votre contrat et notre IA les analysera par rapport au droit marocain. Elle identifie les clauses manquantes, les termes potentiellement abusifs et explique le jargon juridique." },
        ],
        ar: [
            { heading: "لماذا مراجعة العقود مهمة", text: "في المغرب، تنشأ العديد من النزاعات التجارية من عقود سيئة الصياغة. تساعدك مراجعة العقود بالذكاء الاصطناعي على فهم التزاماتك وحقوقك قبل التوقيع، مما يوفر عليك نزاعات مكلفة." },
            { heading: "كيف يعمل تحليل العقود بالذكاء الاصطناعي", text: "شارك بنود عقدك وسيقوم ذكاؤنا الاصطناعي بتحليلها مقابل القانون المغربي. يحدد البنود المفقودة والشروط غير العادلة ويشرح اللغة القانونية المعقدة بعبارات بسيطة." },
        ],
    },
    relatedLinks: [
        { href: "/business-legal", label: "Business Legal" },
        { href: "/startup-legal", label: "Startup Legal" },
        { href: "/commercial-law", label: "Commercial Law" },
        { href: "/employee-rights", label: "Employee Rights" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
    ],
    gradientFrom: "from-green-600",
    gradientTo: "to-emerald-500",
    glowColor: "bg-green-500/20",
};
