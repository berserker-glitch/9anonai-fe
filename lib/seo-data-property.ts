/**
 * @fileoverview SEO page data for property/real-estate pages:
 * rental-law, real-estate-law.
 * Targets Moroccan housing law queries — high volume for both tenants and buyers.
 * @module lib/seo-data-property
 */

import { SEOPageConfig } from "./seo-page-types";

/** Rental Law page — targets قانون الكراء 2026 / augmentation loyer / bail maroc */
export const rentalLawPage: SEOPageConfig = {
    slug: "rental-law",
    titles: {
        ar: "قانون الكراء في المغرب 2026 | حقوق المكتري والمكري - 9anon AI",
        fr: "Loi sur le Bail au Maroc 2026 | Droits Locataire & Propriétaire - 9anon AI",
        en: "Morocco Rental Law 2026 | Tenant & Landlord Rights Guide - 9anon AI",
    },
    descriptions: {
        ar: "دليل شامل حول قانون الكراء في المغرب 2026: حقوق المكتري، إجراءات الإخلاء، الزيادة في الكراء، عقد الكراء، والنزاعات بين المكري والمكتري. استشارة قانونية مجانية.",
        fr: "Guide complet sur la loi de bail au Maroc 2026: droits du locataire, procédures d'expulsion, augmentation de loyer, contrat de bail et litiges locatifs. Consultation gratuite.",
        en: "Complete guide to Morocco rental law 2026: tenant rights, eviction procedures, rent increases, lease contracts, and landlord-tenant disputes. Free AI legal consultation.",
    },
    keywords: {
        ar: ["قانون الكراء المغرب 2026", "حقوق المكتري المغرب", "الإخلاء في المغرب", "الزيادة في الكراء", "عقد الكراء المغرب", "نزاع الكراء المغرب", "الكراء السكني المغرب"],
        fr: ["loi bail Maroc 2026", "droits locataire Maroc", "expulsion locataire Maroc", "augmentation loyer Maroc", "contrat bail Maroc", "litige locatif Maroc", "bail commercial Maroc"],
        en: ["morocco rental law 2026", "tenant rights morocco", "eviction morocco", "rent increase morocco", "lease contract morocco", "landlord tenant dispute morocco", "rental law morocco"],
    },
    h1: {
        ar: "قانون الكراء في المغرب 2026: دليل المكتري والمكري",
        fr: "La Loi sur le Bail au Maroc 2026 : Guide Complet",
        en: "Morocco Rental Law 2026: Complete Tenant & Landlord Guide",
    },
    badge: { ar: "قانون الكراء", fr: "Droit du Bail", en: "Rental Law" },
    subtitle: {
        ar: "اعرف حقوقك كمكتري أو مكري في المغرب — شروط الإخلاء، الزيادة القانونية في الكراء، عقد الكراء، والإجراءات القانونية عند النزاع. استشارة مجانية بالذكاء الاصطناعي.",
        fr: "Connaissez vos droits en tant que locataire ou propriétaire au Maroc — conditions d'expulsion, augmentation légale du loyer, contrat de bail et procédures en cas de litige.",
        en: "Know your rights as a tenant or landlord in Morocco — eviction conditions, legal rent increases, lease contracts, and legal procedures for disputes.",
    },
    ctaText: { ar: "اسأل عن قانون الكراء مجاناً", fr: "Posez Votre Question sur le Bail", en: "Ask About Rental Law Free" },
    faqTitle: { ar: "أسئلة شائعة حول قانون الكراء في المغرب", fr: "FAQ Loi sur le Bail Maroc", en: "Morocco Rental Law FAQ" },
    faqItems: {
        ar: [
            { question: "هل يحق للمكري رفع الكراء في المغرب؟", answer: "نعم، يحق للمكري طلب مراجعة مبلغ الكراء، لكن يجب أن يتم ذلك وفق الإجراءات القانونية المنصوص عليها في القانون 67.12 المنظم للعلاقة التعاقدية بين المكري والمكتري. لا يجوز رفع الكراء بصورة تعسفية أو دون إشعار مسبق." },
            { question: "كيف يمكن للمكري إخلاء المكتري في المغرب؟", answer: "يستلزم القانون المغربي اتباع إجراءات قضائية لإخلاء المكتري. يجب على المكري تقديم طلب الإخلاء أمام المحكمة مع تبرير قانوني كعدم أداء الكراء أو مخالفة شروط العقد. لا يجوز الإخلاء بالقوة خارج الإطار القضائي." },
            { question: "ما هي مدة عقد الكراء الدنيا في المغرب؟", answer: "لا يشترط القانون المغربي مدة دنيا لعقد الكراء السكني. يمكن إبرام العقد لمدة محددة أو غير محددة. في حالة عقد المدة غير المحددة، يتعين الإشعار بالإنهاء قبل مدة معقولة (عادة شهر لكل سنة من الكراء)." },
            { question: "ما هي التزامات المكري تجاه المكتري؟", answer: "يلتزم المكري بتسليم المسكن في حالة صالحة للسكن، وإجراء الإصلاحات الكبرى (الهيكلية)، وضمان الانتفاع الهادئ للمكتري دون إزعاجه. يتحمل المكتري الإصلاحات الصغيرة والأضرار الناجمة عن سوء الاستخدام." },
            { question: "هل يلزم تسجيل عقد الكراء لدى إدارة الضرائب؟", answer: "نعم، يُنصح بتسجيل عقد الكراء لدى إدارة الضرائب (DGI) حمايةً للطرفين. يتحمل التسجيل رسماً رمزياً. العقد غير المسجل لا يزال ساري المفعول قانوناً، لكنه يُعقّد النزاعات القضائية." },
        ],
        fr: [
            { question: "Le propriétaire peut-il augmenter le loyer au Maroc ?", answer: "Oui, mais selon des conditions légales strictes prévues par la loi 67.12. L'augmentation doit être justifiée et notifiée préalablement. Une augmentation arbitraire peut être contestée devant le tribunal." },
            { question: "Comment expulser un locataire au Maroc ?", answer: "L'expulsion nécessite une procédure judiciaire. Le propriétaire doit saisir le tribunal en justifiant l'expulsion (loyers impayés, violation du contrat). L'expulsion forcée hors cadre judiciaire est illégale." },
            { question: "Quelles sont les obligations du propriétaire envers le locataire ?", answer: "Le propriétaire doit livrer un logement décent, effectuer les grosses réparations et garantir la jouissance paisible. Le locataire assure les petites réparations et répond des dégâts causés par son usage." },
            { question: "Faut-il enregistrer le contrat de bail au Maroc ?", answer: "L'enregistrement auprès de la DGI est conseillé pour protéger les deux parties. Des frais symboliques s'appliquent. Un bail non enregistré reste valide mais complique les litiges judiciaires." },
        ],
        en: [
            { question: "Can a landlord raise rent in Morocco?", answer: "Yes, but under strict legal conditions set by Law 67.12. Any increase must be justified and notified in advance. Arbitrary rent hikes can be challenged in court." },
            { question: "How can a landlord evict a tenant in Morocco?", answer: "Eviction requires a judicial process. The landlord must file with the court, citing legal grounds (unpaid rent, contract violation). Forced eviction outside court proceedings is illegal." },
            { question: "What are a landlord's obligations in Morocco?", answer: "Landlords must deliver a habitable property, carry out major structural repairs, and ensure quiet enjoyment. Tenants handle minor repairs and damage from their own use." },
            { question: "Does a rental contract need to be registered in Morocco?", answer: "Registration with the DGI is strongly recommended to protect both parties. A small fee applies. Unregistered leases remain legally valid but complicate dispute resolution." },
        ],
    },
    features: {
        ar: [
            { icon: "🏠", title: "حقوق المكتري", description: "اعرف حقوقك القانونية كمكتري في مواجهة المكري وإجراءات الإخلاء." },
            { icon: "🔑", title: "حقوق المكري", description: "التزامات المكتري وكيفية استرداد المسكن عبر الإجراءات القانونية." },
            { icon: "📄", title: "عقد الكراء", description: "ما يجب أن يتضمنه عقد الكراء وكيفية تسجيله لدى إدارة الضرائب." },
            { icon: "⚖️", title: "نزاعات الكراء", description: "كيفية اللجوء إلى القضاء عند نشوء نزاع بين المكري والمكتري." },
            { icon: "📊", title: "الزيادة في الكراء", description: "الحالات التي يُجيز فيها القانون رفع مبلغ الكراء والإجراءات المطلوبة." },
            { icon: "🤖", title: "استشارة مجانية", description: "اسأل 9anon AI عن وضعيتك السكنية واحصل على إجابة قانونية فورية." },
        ],
        fr: [
            { icon: "🏠", title: "Droits du Locataire", description: "Vos droits légaux en tant que locataire face au propriétaire et aux procédures d'expulsion." },
            { icon: "🔑", title: "Droits du Propriétaire", description: "Obligations du locataire et comment récupérer le bien via les voies légales." },
            { icon: "📄", title: "Contrat de Bail", description: "Ce que doit contenir le contrat de bail et comment l'enregistrer à la DGI." },
            { icon: "⚖️", title: "Litiges Locatifs", description: "Comment saisir le tribunal en cas de conflit entre propriétaire et locataire." },
            { icon: "📊", title: "Augmentation du Loyer", description: "Les cas où la loi autorise l'augmentation du loyer et les démarches requises." },
            { icon: "🤖", title: "Consultation Gratuite", description: "Posez à 9anon AI votre question locative pour une réponse juridique instantanée." },
        ],
        en: [
            { icon: "🏠", title: "Tenant Rights", description: "Your legal rights as a tenant against the landlord and eviction proceedings." },
            { icon: "🔑", title: "Landlord Rights", description: "Tenant obligations and how to legally recover your property through court." },
            { icon: "📄", title: "Lease Contract", description: "What must be included in a rental contract and how to register it with the DGI." },
            { icon: "⚖️", title: "Rental Disputes", description: "How to go to court when a dispute arises between landlord and tenant." },
            { icon: "📊", title: "Rent Increases", description: "Cases where the law permits rent increases and the required procedures." },
            { icon: "🤖", title: "Free Consultation", description: "Ask 9anon AI about your housing situation and get an instant legal answer." },
        ],
    },
    contentSections: {
        ar: [
            { heading: "القانون 67.12: الإطار القانوني للكراء في المغرب", text: "يُنظّم قانون رقم 67.12 العلاقة التعاقدية بين المكري والمكتري بالنسبة للأماكن المعدة للسكنى أو للاستعمال المهني في المغرب. يحدد القانون التزامات الطرفين، وإجراءات الإخلاء، وكيفية مراجعة مبلغ الكراء، ومعالجة النزاعات أمام القضاء." },
            { heading: "إجراءات الإخلاء في المغرب: ما يجب أن تعرفه", text: "لا يجوز للمكري إخلاء المكتري إلا عبر المسار القضائي. يقدم المكري دعوى أمام المحكمة مع الأدلة (عدم الأداء، مخالفة العقد)، ثم تنظر المحكمة في الملف وتُصدر حكمها. خلال مدة التقاضي، يبقى المكتري في المسكن إلى حين صدور الحكم القابل للتنفيذ. 9anon AI يساعدك على فهم الإجراءات خطوة بخطوة." },
        ],
        fr: [
            { heading: "La Loi 67.12 : Cadre Juridique du Bail au Maroc", text: "La loi n°67.12 régit la relation contractuelle entre propriétaire et locataire pour les locaux à usage d'habitation ou professionnel. Elle définit les obligations des deux parties, les procédures d'expulsion, la révision du loyer et le règlement des litiges." },
            { heading: "Procédure d'Expulsion au Maroc : Ce Qu'il Faut Savoir", text: "L'expulsion ne peut se faire qu'en justice. Le propriétaire dépose une demande au tribunal avec les preuves (loyers impayés, violation du bail). Pendant la procédure, le locataire reste dans les lieux jusqu'au jugement exécutoire." },
        ],
        en: [
            { heading: "Law 67.12: Morocco's Rental Legal Framework", text: "Law 67.12 governs the contractual relationship between landlords and tenants for residential and professional premises in Morocco. It defines obligations, eviction procedures, rent revision rules, and dispute resolution." },
            { heading: "Eviction Procedures in Morocco: What You Need to Know", text: "Eviction can only happen through the courts. The landlord files with the court, providing evidence (unpaid rent, lease violation). During proceedings, the tenant stays in the property until an enforceable judgment is issued." },
        ],
    },
    relatedLinks: [
        { href: "/tenant-rights", label: "Tenant Rights" },
        { href: "/real-estate-law", label: "Real Estate Law" },
        { href: "/inheritance-law", label: "Inheritance Law" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
        { href: "/online-consultation", label: "Online Consultation" },
    ],
    gradientFrom: "from-orange-600",
    gradientTo: "to-red-600",
    glowColor: "orange",
};

/** Real Estate Law page — targets العقار في المغرب / immobilier Maroc / achat appartement */
export const realEstateLawPage: SEOPageConfig = {
    slug: "real-estate-law",
    titles: {
        ar: "قانون العقار في المغرب 2026 | شراء وبيع العقارات - 9anon AI",
        fr: "Droit Immobilier Maroc 2026 | Achat, Vente & Propriété - 9anon AI",
        en: "Morocco Real Estate Law 2026 | Buying, Selling & Property Rights - 9anon AI",
    },
    descriptions: {
        ar: "دليل شامل حول قانون العقار في المغرب 2026: إجراءات شراء وبيع العقارات، رسوم التسجيل، حقوق الملكية، رهن العقار، والوكالة العقارية. استشارة قانونية مجانية.",
        fr: "Guide complet sur le droit immobilier marocain 2026: procédures d'achat et de vente, droits d'enregistrement, droits de propriété, hypothèque et agences immobilières. Consultation gratuite.",
        en: "Complete guide to Morocco real estate law 2026: buying and selling procedures, registration fees, property rights, mortgages, and real estate agencies. Free AI legal consultation.",
    },
    keywords: {
        ar: ["شراء عقار في المغرب", "بيع العقار المغرب", "رسوم التسجيل عقار المغرب", "رهن عقاري المغرب", "ملكية العقار المغرب 2026", "قانون العقار المغربي", "الوكالة العقارية المغرب"],
        fr: ["achat immobilier Maroc", "vente immobilier Maroc", "droits enregistrement Maroc", "hypothèque Maroc", "propriété immobilière Maroc 2026", "droit immobilier marocain", "agence immobilière Maroc"],
        en: ["buy property morocco", "sell real estate morocco", "registration fees morocco", "mortgage morocco", "property rights morocco 2026", "morocco real estate law", "real estate agency morocco"],
    },
    h1: {
        ar: "قانون العقار في المغرب 2026: دليلك الشامل",
        fr: "Le Droit Immobilier au Maroc 2026 : Guide Complet",
        en: "Morocco Real Estate Law 2026: Your Complete Guide",
    },
    badge: { ar: "القانون العقاري", fr: "Droit Immobilier", en: "Real Estate Law" },
    subtitle: {
        ar: "تعرف على حقوقك وإجراءاتك عند شراء أو بيع عقار في المغرب — رسوم التسجيل، عقد البيع، الرهن العقاري، وحل النزاعات العقارية. مجاناً مع 9anon AI.",
        fr: "Connaissez vos droits lors de l'achat ou de la vente d'un bien immobilier au Maroc — frais d'enregistrement, acte de vente, hypothèque et résolution des litiges. Gratuit avec 9anon AI.",
        en: "Know your rights when buying or selling property in Morocco — registration fees, sale contracts, mortgages, and property dispute resolution. Free with 9anon AI.",
    },
    ctaText: { ar: "اسأل عن العقار مجاناً", fr: "Posez Votre Question Immobilière", en: "Ask About Real Estate Free" },
    faqTitle: { ar: "أسئلة شائعة حول قانون العقار في المغرب", fr: "FAQ Droit Immobilier Maroc", en: "Morocco Real Estate Law FAQ" },
    faqItems: {
        ar: [
            { question: "ما هي إجراءات شراء عقار في المغرب؟", answer: "تمر عملية شراء العقار في المغرب بمراحل: اختيار العقار، إبرام عقد الوعد بالبيع (compromis de vente)، التحقق من وثائق الملكية، الحصول على تمويل بنكي إن لزم، ثم توقيع عقد البيع النهائي أمام الموثق، وأخيراً تسجيل نقل الملكية في المحافظة العقارية." },
            { question: "ما هي رسوم التسجيل عند شراء عقار في المغرب؟", answer: "عند شراء العقار في المغرب، تُستحق رسوم التسجيل بنسبة 4% من قيمة العقار للمساكن الرئيسية (أو 5% للعقارات الأخرى)، إضافة إلى رسوم المحافظة العقارية (1%) وأتعاب الموثق (حوالي 1%). قانون المالية 2026 قد يُعدّل بعض هذه النسب." },
            { question: "ما هو الفرق بين عقد الوعد بالبيع وعقد البيع النهائي؟", answer: "عقد الوعد بالبيع (promesse de vente) هو اتفاق مبدئي يحدد الثمن والشروط ويُلزم الطرفين، وعادة ما يُصاحبه دفع عربون. أما عقد البيع النهائي فيُحرّر أمام الموثق وينقل الملكية الرسمية للمشتري." },
            { question: "هل يمكن للأجانب شراء العقار في المغرب؟", answer: "نعم، يُتيح القانون المغربي للأجانب شراء العقارات بحرية شبه تامة. يجب تحويل ثمن العقار بالعملة الأجنبية عبر القنوات البنكية الرسمية. قد تخضع إعادة تحويل المبالغ عند البيع لبعض الإجراءات الخاصة بمكتب الصرف." },
        ],
        fr: [
            { question: "Quelles sont les étapes pour acheter un bien immobilier au Maroc ?", answer: "Le processus comprend: sélection du bien, signature du compromis de vente, vérification des titres de propriété, financement bancaire si nécessaire, signature de l'acte de vente chez le notaire, puis enregistrement du transfert à la Conservation Foncière." },
            { question: "Quels sont les frais d'enregistrement lors d'un achat immobilier au Maroc ?", answer: "Les droits d'enregistrement sont de 4% de la valeur pour une résidence principale (5% pour les autres). S'y ajoutent les frais de Conservation Foncière (1%) et les honoraires du notaire (environ 1%). La Loi de Finances 2026 peut modifier ces taux." },
            { question: "Les étrangers peuvent-ils acheter un bien immobilier au Maroc ?", answer: "Oui, la loi marocaine permet aux étrangers d'acquérir librement des biens immobiliers. Le prix doit être transféré en devises étrangères via des voies bancaires officielles." },
        ],
        en: [
            { question: "What are the steps to buy property in Morocco?", answer: "The process includes: selecting the property, signing a preliminary sale contract (compromis de vente), verifying ownership documents, obtaining bank financing if needed, signing the final deed before a notary, then registering the title transfer at the Conservation Foncière." },
            { question: "What are the registration fees when buying property in Morocco?", answer: "Registration fees are 4% of the property value for a main residence (5% for others), plus Conservation Foncière fees (1%) and notary fees (approximately 1%). The 2026 Finance Law may adjust these rates." },
            { question: "Can foreigners buy property in Morocco?", answer: "Yes, Moroccan law allows foreigners to freely purchase real estate. The purchase price must be transferred in foreign currency via official banking channels. Repatriation of funds upon sale may require specific procedures through the Exchange Office." },
        ],
    },
    features: {
        ar: [
            { icon: "🏢", title: "شراء العقار في المغرب", description: "دليل خطوة بخطوة لإجراءات شراء العقار: من الوعد بالبيع إلى نقل الملكية." },
            { icon: "📋", title: "رسوم التسجيل والتوثيق", description: "كل ما تحتاج معرفته عن الرسوم المرتبطة بنقل ملكية العقار في المغرب." },
            { icon: "🔐", title: "الرهن العقاري", description: "شروط الرهن العقاري البنكي وحقوق المرتهن والراهن في القانون المغربي." },
            { icon: "⚖️", title: "النزاعات العقارية", description: "كيفية حل نزاعات الملكية والشفعة والتقسيم والتحفيظ العقاري." },
            { icon: "🌍", title: "العقار للأجانب", description: "شروط اقتناء الأجانب للعقارات في المغرب وإجراءات تحويل العائدات." },
            { icon: "🤖", title: "استشارة عقارية مجانية", description: "اسأل 9anon AI عن أي إشكالية عقارية واحصل على إجابة قانونية فورية." },
        ],
        fr: [
            { icon: "🏢", title: "Achat Immobilier au Maroc", description: "Guide étape par étape des procédures d'achat: du compromis au transfert de propriété." },
            { icon: "📋", title: "Frais d'Enregistrement", description: "Tout savoir sur les frais liés au transfert de propriété immobilière au Maroc." },
            { icon: "🔐", title: "Hypothèque et Crédit Immobilier", description: "Conditions de l'hypothèque bancaire et droits des parties selon le droit marocain." },
            { icon: "⚖️", title: "Litiges Immobiliers", description: "Comment résoudre les litiges de propriété, préemption, partage et immatriculation." },
            { icon: "🌍", title: "Immobilier pour Étrangers", description: "Conditions d'acquisition pour les étrangers et procédures de rapatriement des fonds." },
            { icon: "🤖", title: "Consultation Immobilière Gratuite", description: "Posez à 9anon AI votre question immobilière pour une réponse juridique instantanée." },
        ],
        en: [
            { icon: "🏢", title: "Buying Property in Morocco", description: "Step-by-step guide to property purchase procedures: from promise of sale to title transfer." },
            { icon: "📋", title: "Registration Fees", description: "Everything you need to know about fees related to property title transfer in Morocco." },
            { icon: "🔐", title: "Mortgage & Real Estate Credit", description: "Mortgage conditions and parties' rights under Moroccan law." },
            { icon: "⚖️", title: "Property Disputes", description: "How to resolve ownership, pre-emption, partition, and land registration disputes." },
            { icon: "🌍", title: "Real Estate for Foreigners", description: "Conditions for foreign acquisition and fund repatriation procedures." },
            { icon: "🤖", title: "Free Real Estate Consultation", description: "Ask 9anon AI your real estate question and get an instant legal answer." },
        ],
    },
    contentSections: {
        ar: [
            { heading: "نقل الملكية العقارية في المغرب: من الوعد إلى التسجيل", text: "تنتقل ملكية العقار في المغرب عبر مراحل قانونية متدرجة: يبدأ الأمر بعقد الوعد بالبيع الذي يُلزم الطرفين بإتمام الصفقة، ثم التحقق من وثائق الملكية في المحافظة العقارية، وصولاً إلى توقيع عقد البيع النهائي أمام الموثق. بعد التوقيع، يُودَع العقد في المحافظة العقارية لتسجيل نقل الملكية رسمياً." },
        ],
        fr: [
            { heading: "Transfert de Propriété Immobilière au Maroc : Du Compromis à l'Enregistrement", text: "La propriété immobilière au Maroc se transfère en étapes légales progressives: compromis de vente engageant les deux parties, vérification des titres à la Conservation Foncière, signature de l'acte définitif chez le notaire, puis dépôt de l'acte à la Conservation Foncière pour l'enregistrement officiel." },
        ],
        en: [
            { heading: "Property Transfer in Morocco: From Promise to Registration", text: "Property ownership in Morocco transfers through progressive legal steps: a preliminary sale contract binding both parties, title verification at the Conservation Foncière, signing the final deed before a notary, then filing the deed at the Conservation Foncière for official title registration." },
        ],
    },
    relatedLinks: [
        { href: "/rental-law", label: "Rental Law" },
        { href: "/inheritance-law", label: "Inheritance Law" },
        { href: "/business-legal", label: "Business Legal" },
        { href: "/tax-legal", label: "Tax Law" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
    ],
    gradientFrom: "from-teal-600",
    gradientTo: "to-cyan-600",
    glowColor: "teal",
};
