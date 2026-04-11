/**
 * @fileoverview SEO page data for civic/personal rights pages:
 * inheritance-law, immigration-law.
 * These target very high-volume query clusters from Moroccans.
 * @module lib/seo-data-civic
 */

import { SEOPageConfig } from "./seo-page-types";

/** Inheritance Law page — 5,132+ impressions, targets الإرث في القانون المغربي */
export const inheritanceLawPage: SEOPageConfig = {
    slug: "inheritance-law",
    titles: {
        ar: "الإرث في القانون المغربي 2026 | حقوقك في الميراث - 9anon AI",
        fr: "Droit Successoral Maroc 2026 | Héritage et Succession - 9anon AI",
        en: "Moroccan Inheritance Law 2026 | Your Rights to Succession - 9anon AI",
    },
    descriptions: {
        ar: "دليل شامل حول قانون الإرث في المغرب: تقسيم التركة، حقوق الورثة، الوصية الواجبة، رسم الإراثة، وإرث الأجانب والمغاربة المقيمين بالخارج. استشارة مجانية بالذكاء الاصطناعي.",
        fr: "Guide complet sur le droit successoral marocain: partage de la succession, droits des héritiers, testament obligatoire, acte d'hérédité et règles pour les étrangers. Consultation gratuite par IA.",
        en: "Complete guide to Moroccan inheritance law: estate division, heirs' rights, mandatory will, certificate of inheritance, and rules for foreigners and expats. Free AI consultation.",
    },
    keywords: {
        ar: ["الإرث في القانون المغربي", "قانون الإرث المغرب", "تقسيم التركة", "حقوق الورثة", "رسم الإراثة", "الوصية الواجبة", "ميراث المغرب", "حساب الإرث"],
        fr: ["droit successoral Maroc", "héritage Maroc", "succession Maroc", "partage succession Maroc", "acte hérédité Maroc", "nouvelle loi héritage Maroc", "moudawana héritage"],
        en: ["moroccan inheritance law", "inheritance law morocco", "estate division morocco", "succession rights morocco", "moudawana inheritance", "moroccan family code inheritance"],
    },
    h1: {
        ar: "الإرث في القانون المغربي: حقوقك الكاملة في الميراث",
        fr: "Le Droit Successoral au Maroc : Vos Droits Complets",
        en: "Moroccan Inheritance Law: Your Complete Rights to Succession",
    },
    badge: { ar: "قانون الإرث", fr: "Droit Successoral", en: "Inheritance Law" },
    subtitle: {
        ar: "افهم قواعد الإرث المغربي بوضوح — من تقسيم التركة وحصص الورثة إلى رسم الإراثة والوصية الواجبة وحقوق المغاربة المقيمين بالخارج. استشارة مجانية وفورية بالذكاء الاصطناعي.",
        fr: "Comprenez les règles successorales marocaines — du partage de la succession aux droits des héritiers, testament obligatoire et règles pour les Marocains résidant à l'étranger.",
        en: "Understand Moroccan inheritance rules clearly — from estate division and heirs' shares to mandatory wills and rights of Moroccans living abroad. Free instant AI consultation.",
    },
    ctaText: { ar: "اسأل عن الإرث مجاناً", fr: "Posez Votre Question sur l'Héritage", en: "Ask About Inheritance Law" },
    faqTitle: { ar: "أسئلة شائعة حول الإرث في المغرب", fr: "FAQ Droit Successoral Maroc", en: "Moroccan Inheritance Law FAQ" },
    faqItems: {
        ar: [
            { question: "كيف يُقسَّم الإرث في المغرب؟", answer: "يستند تقسيم الإرث في المغرب إلى مدونة الأسرة (القانون 70.03) المبنية على أحكام الشريعة الإسلامية. يحصل الورثة على حصص محددة: للزوج الربع أو الثمن، للبنت النصف أو الثلثان للبنتين فأكثر، وللأم السدس أو الثلث. يتولى العدول إعداد رسم الإراثة الذي يحدد نصيب كل وارث." },
            { question: "من هم الورثة في القانون المغربي؟", answer: "يشمل الورثة في القانون المغربي: الزوج أو الزوجة، الأبناء والبنات، الأب والأم، الأجداد والجدات، الإخوة والأخوات. يُعطى الأولوية للأقرب درجة في القرابة. الأحفاد يستفيدون من الوصية الواجبة إذا توفي والدهم قبل الجد أو الجدة." },
            { question: "ما هي الوثائق اللازمة لإجراءات الإرث في المغرب؟", answer: "تشمل الوثائق المطلوبة: رسم الوفاة (شهادة الوفاة الرسمية)، بطاقة التعريف الوطنية للورثة، رسم الازدياد للمتوفى، الأوراق العقارية إن وُجدت، وشهادة 12 شاهداً (لفيف) لإعداد رسم الإراثة عند العدل." },
            { question: "هل يرث الأجانب في المغرب؟", answer: "نعم، يحق للأجانب الإرث في المغرب. تطبق مدونة الأسرة على كل علاقة يكون فيها أحد الطرفين مغربياً. أما الأحكام الأجنبية المتعلقة بالإرث فلا تُنفَّذ في المغرب إلا بعد تذييلها بالصيغة التنفيذية من المحكمة الابتدائية." },
            { question: "ما هي الوصية الواجبة وكيف تحمي الأحفاد؟", answer: "الوصية الواجبة هي حماية قانونية تمنحها مدونة الأسرة (المادة 369) للأحفاد الذين فقدوا والديهم قبل وفاة الجد أو الجدة. يحصلون على حصة تعادل ما كان سيأخذه والدهم، بشرط ألا تتجاوز ثلث التركة." },
        ],
        fr: [
            { question: "Comment se répartit l'héritage au Maroc ?", answer: "La répartition est basée sur la Moudawana (Code de la Famille, Loi 70.03) fondée sur la loi islamique. Les parts sont définies: conjoint survivant 1/4 ou 1/8; fille 1/2 ou 2/3 pour deux filles ou plus; mère 1/6 ou 1/3. Les notaires établissent l'acte d'hérédité." },
            { question: "Qui sont les héritiers selon la loi marocaine ?", answer: "Les héritiers incluent: le conjoint survivant, les enfants, les parents, les grands-parents et les frères et sœurs. La priorité est donnée aux degrés de parenté les plus proches." },
            { question: "Les étrangers peuvent-ils hériter au Maroc ?", answer: "Oui. La Moudawana s'applique à toute relation impliquant un ressortissant marocain. Les jugements étrangers concernant la succession doivent être exequaturés par le tribunal de première instance marocain pour être exécutoires." },
            { question: "Qu'est-ce que le testament obligatoire (Al-Wasiya al-Wajiba) ?", answer: "Prévu à l'article 369 de la Moudawana, il protège les petits-enfants dont le parent est décédé avant le grand-parent. Ils reçoivent une part équivalente à celle que leur parent aurait héritée, plafonnée au tiers de la succession." },
        ],
        en: [
            { question: "How is inheritance divided in Morocco?", answer: "Division follows the Moudawana (Family Code, Law 70.03) based on Islamic law. Fixed shares: surviving spouse 1/4 or 1/8; daughter 1/2 or 2/3 (two or more daughters); mother 1/6 or 1/3. Notaries prepare the certificate of inheritance." },
            { question: "Who are the legal heirs under Moroccan law?", answer: "Heirs include: surviving spouse, children, parents, grandparents, and siblings. Priority is given to the closest degree of kinship." },
            { question: "Can foreigners inherit property in Morocco?", answer: "Yes. The Moudawana applies to any relationship where one party is Moroccan. Foreign court judgments on inheritance must undergo the Exequatur process to be enforceable in Morocco." },
            { question: "What is the mandatory will (Al-Wasiya al-Wajiba)?", answer: "Under Article 369 of the Moudawana, it protects grandchildren whose parent died before the grandparent. They receive a share equal to what their parent would have inherited, capped at one-third of the estate." },
        ],
    },
    features: {
        ar: [
            { icon: "⚖️", title: "حصص الورثة", description: "اعرف نصيبك الدقيق من الإرث وفق مدونة الأسرة المغربية." },
            { icon: "📜", title: "رسم الإراثة", description: "كيفية إعداد رسم الإراثة عند العدل والوثائق المطلوبة." },
            { icon: "🧮", title: "حاسبة الإرث", description: "احسب حصص الورثة تلقائياً باستخدام حاسبة الإرث المجانية." },
            { icon: "🌍", title: "إرث المغاربة بالخارج", description: "حقوق المغاربة المقيمين بالخارج وكيفية تسوية الإرث عن بُعد." },
            { icon: "🤖", title: "استشارة مجانية", description: "اسأل 9anon AI عن وضعيتك في الإرث واحصل على إجابة فورية." },
            { icon: "🔒", title: "سري وخاص", description: "استشارتك القانونية مشفرة وخاصة تماماً." },
        ],
        fr: [
            { icon: "⚖️", title: "Parts Héréditaires", description: "Connaître votre part exacte dans la succession selon la Moudawana." },
            { icon: "📜", title: "Acte d'Hérédité", description: "Comment établir l'acte d'hérédité et les documents requis." },
            { icon: "🧮", title: "Calculateur de Succession", description: "Calculer automatiquement les parts des héritiers." },
            { icon: "🌍", title: "Succession des MRE", description: "Droits des Marocains résidant à l'étranger pour régler la succession." },
            { icon: "🤖", title: "Consultation Gratuite", description: "Posez à 9anon AI vos questions successorales pour une réponse instantanée." },
            { icon: "🔒", title: "Confidentiel", description: "Votre consultation reste entièrement privée." },
        ],
        en: [
            { icon: "⚖️", title: "Inheritance Shares", description: "Know your exact share in the estate under the Moroccan Moudawana." },
            { icon: "📜", title: "Certificate of Inheritance", description: "How to prepare the inheritance certificate and required documents." },
            { icon: "🧮", title: "Inheritance Calculator", description: "Automatically calculate heirs' shares with our free calculator." },
            { icon: "🌍", title: "Expat Inheritance", description: "Rights of Moroccans abroad and how to settle an estate remotely." },
            { icon: "🤖", title: "Free Consultation", description: "Ask 9anon AI about your inheritance situation for an instant answer." },
            { icon: "🔒", title: "Private & Secure", description: "Your legal consultation is fully encrypted and private." },
        ],
    },
    contentSections: {
        ar: [
            { heading: "نظام الإرث في القانون المغربي: الأسس القانونية", text: "يستند نظام الإرث في المغرب إلى مدونة الأسرة (القانون رقم 70.03) التي تستمد أحكامها من الشريعة الإسلامية مع مراعاة الخصوصيات القانونية المغربية. وتبدأ إجراءات الإرث بعد الوفاة بالتصريح بها لدى ضابط الحالة المدنية، ثم إعداد رسم الإراثة عند العدلَين اللذَين يوثقان حصص الورثة رسمياً." },
            { heading: "الوصية والتبرعات في القانون المغربي", text: "يُجيز القانون المغربي للشخص الوصية بما لا يتجاوز ثلث ثروته لأشخاص من غير الورثة. أما التبرعات (الهبة) فتسري عليها قواعد مختلفة ويمكن توثيقها خلال الحياة. هذه الأدوات القانونية تتيح للمورّث المساهمة في تنظيم ثروته مع احترام حصص الورثة المقررة قانوناً." },
        ],
        fr: [
            { heading: "Le Système Successoral Marocain: Bases Juridiques", text: "Le système successoral marocain repose sur la Moudawana (Loi 70.03) qui puise ses règles dans la loi islamique. Les procédures commencent après le décès par la déclaration à l'officier d'état civil, puis l'établissement de l'acte d'hérédité par les notaires." },
            { heading: "Testament et Donations en Droit Marocain", text: "La loi marocaine permet de léguer jusqu'au tiers de sa fortune à des personnes non héritières. Les donations (Hiba) obéissent à des règles différentes et peuvent être notariées du vivant du donateur." },
        ],
        en: [
            { heading: "Morocco's Inheritance System: Legal Foundations", text: "Morocco's inheritance system rests on the Family Code (Law 70.03) drawing on Islamic law. Procedures begin after death with a civil registration declaration, followed by preparation of the certificate of inheritance by notaries." },
            { heading: "Wills and Gifts under Moroccan Law", text: "Moroccan law allows bequeathing up to one-third of one's estate to non-heirs. Gifts (Hiba) follow different rules and can be notarized during the donor's lifetime." },
        ],
    },
    relatedLinks: [
        { href: "/divorce-law", label: "Divorce Law" },
        { href: "/family-law", label: "Family Law" },
        { href: "/real-estate-law", label: "Real Estate Law" },
        { href: "/online-consultation", label: "Free Consultation" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
    ],
    gradientFrom: "from-amber-600",
    gradientTo: "to-amber-500",
    glowColor: "bg-amber-500/20",
};

/** Immigration Law page — targets إقامة / visa / residency / permanent residency (2,500+ impressions) */
export const immigrationLawPage: SEOPageConfig = {
    slug: "immigration-law",
    titles: {
        ar: "قانون الإقامة والهجرة في المغرب 2026 | تجديد بطاقة الإقامة - 9anon AI",
        fr: "Droit de l'Immigration au Maroc 2026 | Titre de Séjour & Visa - 9anon AI",
        en: "Morocco Immigration Law 2026 | Residence Permit & Visa Guide - 9anon AI",
    },
    descriptions: {
        ar: "دليل شامل حول قانون الإقامة في المغرب: تجديد بطاقة الإقامة، الإقامة الدائمة، التجنيس، تسوية الوضعية القانونية، وعقوبات تجاوز مدة الإقامة. استشارة مجانية.",
        fr: "Guide complet sur l'immigration au Maroc: renouvellement du titre de séjour, résidence permanente, naturalisation, régularisation et sanctions pour dépassement de visa. Consultation gratuite.",
        en: "Complete guide to Morocco immigration law: residence permit renewal, permanent residency, naturalization, regularization, and visa overstay fines. Free AI consultation.",
    },
    keywords: {
        ar: ["تجديد بطاقة الإقامة المغرب", "الإقامة الدائمة المغرب", "التجنيس في المغرب", "تسوية الوضعية المغرب", "قانون الهجرة المغرب", "فيزا المغرب"],
        fr: ["titre de séjour Maroc", "résidence permanente Maroc", "naturalisation Maroc", "régularisation Maroc", "immigration Maroc", "visa Maroc dépassement"],
        en: ["morocco residence permit", "permanent residency morocco", "morocco naturalization", "visa overstay morocco", "morocco immigration law", "morocco citizenship"],
    },
    h1: {
        ar: "قانون الإقامة والهجرة في المغرب: دليلك الكامل 2026",
        fr: "Le Droit de l'Immigration au Maroc : Guide Complet 2026",
        en: "Morocco Immigration Law: Your Complete Guide 2026",
    },
    badge: { ar: "الإقامة والهجرة", fr: "Immigration & Séjour", en: "Immigration Law" },
    subtitle: {
        ar: "كل ما تحتاج معرفته عن قانون الإقامة في المغرب — تجديد بطاقة الإقامة، الإقامة الدائمة، التجنيس، وتسوية الوضعية القانونية. إجابات فورية بالذكاء الاصطناعي.",
        fr: "Tout sur l'immigration au Maroc — renouvellement du titre de séjour, résidence permanente, naturalisation et régularisation. Réponses instantanées par IA.",
        en: "Everything you need about Morocco immigration — residence permit renewal, permanent residency, naturalization, and regularization. Instant AI answers.",
    },
    ctaText: { ar: "اسأل عن الإقامة مجاناً", fr: "Posez Votre Question Immigration", en: "Ask About Immigration Law" },
    faqTitle: { ar: "أسئلة شائعة حول الإقامة في المغرب", fr: "FAQ Immigration Maroc", en: "Morocco Immigration FAQ" },
    faqItems: {
        ar: [
            { question: "كيف أجدد بطاقة الإقامة في المغرب؟", answer: "يجب تقديم طلب تجديد بطاقة الإقامة قبل انتهاء صلاحيتها بشهر على الأقل لدى مصلحة الأجانب في ولاية أو عمالة الإقامة. تشمل الوثائق المطلوبة: جواز السفر، صور شمسية، عقد الكراء أو وثيقة الإقامة، وإثبات الوضعية المهنية أو المالية." },
            { question: "ما شروط الحصول على الإقامة الدائمة في المغرب؟", answer: "تُمنح الإقامة الدائمة بعد الإقامة القانونية المستمرة لمدة 5 سنوات في المغرب، مع إثبات الاندماج الاجتماعي والاقتصادي (عمل ثابت أو مصادر دخل كافية). يُقدَّم الطلب لدى مديرية الهجرة ومراقبة الحدود." },
            { question: "ما عقوبة تجاوز مدة الإقامة في المغرب؟", answer: "يُعرّض تجاوز مدة الإقامة القانونية لغرامات مالية وقد يصل الأمر إلى الترحيل. يمكن تسوية الوضعية عبر مسطرة الاستثنائية المقدمة لدى المندوبية الإقليمية للهجرة بإثبات الروابط بالمغرب (عمل، زواج، أطفال...)." },
            { question: "كيف تحصل على الجنسية المغربية بالتجنيس؟", answer: "وفق الظهير الشريف المتعلق بالجنسية المغربية، يمكن الحصول على التجنيس بعد 5 سنوات من الإقامة القانونية، مع إثبات حسن السيرة والسلوك وعدم وجود سوابق جنائية والاندماج في المجتمع المغربي. الطلب يُرفع إلى وزارة العدل." },
        ],
        fr: [
            { question: "Comment renouveler son titre de séjour au Maroc ?", answer: "La demande doit être déposée au moins un mois avant l'expiration auprès de la préfecture ou province de résidence. Documents: passeport, photos, contrat de location ou attestation de domicile, justificatif de situation professionnelle." },
            { question: "Quelles sont les conditions pour la résidence permanente au Maroc ?", answer: "La résidence permanente est accordée après 5 ans de résidence légale continue, avec preuve d'intégration sociale et économique. La demande est soumise à la Direction de la Migration." },
            { question: "Quelles sont les sanctions pour dépassement de visa au Maroc ?", answer: "Le dépassement expose à des amendes et potentiellement à l'expulsion. Une régularisation est possible via la procédure exceptionnelle auprès de la délégation régionale de la migration." },
            { question: "Comment obtenir la nationalité marocaine par naturalisation ?", answer: "Après 5 ans de résidence légale, bonne conduite et absence de casier judiciaire. La demande est soumise au Ministère de la Justice." },
        ],
        en: [
            { question: "How do I renew my residence permit in Morocco?", answer: "Submit your application at least one month before expiry at the prefecture or province of your residence. Required documents: passport, photos, proof of accommodation, and proof of professional or financial status." },
            { question: "What are the conditions for permanent residency in Morocco?", answer: "Permanent residency is granted after 5 consecutive years of legal residence, with proof of social and economic integration. Apply to the Migration Directorate." },
            { question: "What are the penalties for visa overstay in Morocco?", answer: "Overstaying exposes you to fines and possible deportation. Regularization is possible through the exceptional procedure at the regional migration delegation by proving ties to Morocco." },
            { question: "How do I get Moroccan citizenship by naturalization?", answer: "After 5 years of legal residence, with good conduct and no criminal record. Application is submitted to the Ministry of Justice." },
        ],
    },
    features: {
        ar: [
            { icon: "📋", title: "تجديد بطاقة الإقامة", description: "الوثائق المطلوبة وإجراءات تجديد بطاقة الإقامة في المغرب." },
            { icon: "🏡", title: "الإقامة الدائمة", description: "شروط وإجراءات الحصول على الإقامة الدائمة بعد 5 سنوات." },
            { icon: "🇲🇦", title: "التجنيس", description: "كيفية الحصول على الجنسية المغربية بالتجنيس ومتطلباته." },
            { icon: "⚠️", title: "تسوية الوضعية", description: "كيف تسوي وضعيتك القانونية إذا تجاوزت مدة الإقامة." },
            { icon: "🤖", title: "استشارة مجانية", description: "اسأل 9anon AI عن وضعيتك القانونية وخياراتك المتاحة." },
            { icon: "🌍", title: "خبرة بقانون الهجرة", description: "معلومات دقيقة مبنية على القانون المغربي الفعلي." },
        ],
        fr: [
            { icon: "📋", title: "Renouvellement Titre de Séjour", description: "Documents requis et procédures de renouvellement au Maroc." },
            { icon: "🏡", title: "Résidence Permanente", description: "Conditions et démarches pour la résidence permanente après 5 ans." },
            { icon: "🇲🇦", title: "Naturalisation", description: "Comment obtenir la nationalité marocaine par naturalisation." },
            { icon: "⚠️", title: "Régularisation", description: "Comment régulariser votre situation si vous avez dépassé votre visa." },
            { icon: "🤖", title: "Consultation Gratuite", description: "Posez à 9anon AI vos questions d'immigration pour une réponse instantanée." },
            { icon: "🌍", title: "Expertise Immigration", description: "Informations précises basées sur le droit marocain réel." },
        ],
        en: [
            { icon: "📋", title: "Residence Permit Renewal", description: "Required documents and procedures for renewal in Morocco." },
            { icon: "🏡", title: "Permanent Residency", description: "Conditions and steps to obtain permanent residency after 5 years." },
            { icon: "🇲🇦", title: "Naturalization", description: "How to obtain Moroccan citizenship through naturalization." },
            { icon: "⚠️", title: "Regularization", description: "How to regularize your status if you have overstayed your visa." },
            { icon: "🤖", title: "Free Consultation", description: "Ask 9anon AI about your immigration situation and available options." },
            { icon: "🌍", title: "Immigration Expertise", description: "Accurate information based on real Moroccan immigration law." },
        ],
    },
    contentSections: {
        ar: [
            { heading: "قانون الإقامة في المغرب: الإطار القانوني", text: "يُنظَّم وضع الأجانب في المغرب بموجب القانون رقم 02-03 المتعلق بدخول الأجانب إلى المملكة المغربية وإقامتهم بها والهجرة غير المشروعة. يُميّز هذا القانون بين تصاريح الإقامة المؤقتة (سنة أو سنتان) والإقامة العادية (10 سنوات). كل أجنبي يُقيم بشكل قانوني في المغرب يستفيد من حماية القانون وحق الولوج إلى الخدمات العامة." },
            { heading: "المغاربة المقيمون بالخارج: حقوق وخدمات", text: "تُخصص وزارة المغاربة المقيمين في الخارج وشؤون الهجرة خدمات متعددة لمساعدة المغاربة في الخارج على الحفاظ على صلاتهم بالوطن. يمكن تسوية بعض الإجراءات الإدارية عن بُعد عبر القنصليات المغربية. 9anon AI يقدم إرشادات واضحة حول كيفية التعامل مع الإجراءات القانونية من الخارج." },
        ],
        fr: [
            { heading: "Le Droit de l'Immigration au Maroc: Cadre Juridique", text: "Le statut des étrangers au Maroc est régi par la Loi 02-03 relative à l'entrée et au séjour des étrangers et à l'émigration irrégulière. Cette loi distingue entre les titres de séjour temporaires (1 ou 2 ans) et le séjour ordinaire (10 ans)." },
            { heading: "Marocains Résidant à l'Étranger: Droits et Services", text: "Le Ministère chargé des MRE offre de nombreux services pour aider les Marocains de l'étranger. Certaines procédures administratives peuvent être accomplies à distance via les consulats marocains." },
        ],
        en: [
            { heading: "Morocco Immigration Law: Legal Framework", text: "The status of foreigners in Morocco is governed by Law 02-03 on the entry and residence of foreigners and irregular immigration. It distinguishes between temporary residence permits (1-2 years) and ordinary residency (10 years)." },
            { heading: "Moroccans Abroad: Rights and Services", text: "The Ministry for Moroccans Residing Abroad provides extensive services. Many administrative procedures can be completed remotely through Moroccan consulates." },
        ],
    },
    relatedLinks: [
        { href: "/legal-ai", label: "AI Legal Assistant" },
        { href: "/online-consultation", label: "Free Consultation" },
        { href: "/family-law", label: "Family Law" },
        { href: "/real-estate-law", label: "Real Estate Law" },
        { href: "/inheritance-law", label: "Inheritance Law" },
    ],
    gradientFrom: "from-blue-600",
    gradientTo: "to-blue-500",
    glowColor: "bg-blue-500/20",
};
