/**
 * @fileoverview SEO page data for high-opportunity pages identified from Search Console data.
 * - consumer-protection: "loi 31-08", "protection du consommateur" (471+ impressions, 0 clicks)
 * - company-registration: "company registration morocco", "créer une société" (300+ impressions)
 * - citizenship-law: "moroccan citizenship", "nationalité marocaine" (300+ impressions)
 * @module lib/seo-data-new-pages
 */

import { SEOPageConfig } from "./seo-page-types";

/** Consumer Protection page — targets loi 31-08, protection consommateur maroc */
export const consumerProtectionPage: SEOPageConfig = {
    slug: "consumer-protection",
    titles: {
        ar: "حماية المستهلك في المغرب | القانون 31-08 وحقوق المشتري - 9anon AI",
        fr: "Protection du Consommateur Maroc | Loi 31-08 et Droits des Acheteurs - 9anon AI",
        en: "Consumer Protection Morocco | Law 31-08 and Buyer Rights Guide - 9anon AI",
    },
    descriptions: {
        ar: "دليل شامل حول حماية المستهلك في المغرب 2026: القانون 31-08، حق التراجع عن الشراء، الضمان القانوني، الإشهار المضلل، وحقوق المستهلك الرقمي. استشارة قانونية مجانية.",
        fr: "Guide complet sur la protection du consommateur au Maroc: loi 31-08, droit de rétractation, garantie légale, publicité trompeuse. Consultation juridique gratuite par IA.",
        en: "Complete guide to consumer protection in Morocco: Law 31-08, right of withdrawal, legal guarantee, misleading advertising, digital consumer rights. Free AI legal consultation.",
    },
    keywords: {
        ar: ["حماية المستهلك المغرب", "القانون 31-08", "حقوق المشتري في المغرب", "حق التراجع في المغرب", "الضمان القانوني المغرب", "الإشهار المضلل المغرب", "شكاية المستهلك المغرب"],
        fr: ["protection du consommateur maroc", "loi 31-08", "droit de rétractation maroc", "garantie légale maroc", "publicité trompeuse maroc", "droits consommateur maroc", "recours consommateur maroc"],
        en: ["consumer protection morocco", "morocco law 31-08", "right of withdrawal morocco", "legal guarantee morocco", "misleading advertising morocco", "consumer rights morocco", "buyer protection morocco"],
    },
    h1: {
        ar: "حماية المستهلك في المغرب: دليلك القانوني الشامل 2026",
        fr: "Protection du Consommateur au Maroc : Guide Juridique Complet 2026",
        en: "Consumer Protection in Morocco: Complete Legal Guide 2026",
    },
    badge: { ar: "حقوق المستهلك", fr: "Droits des Consommateurs", en: "Consumer Rights" },
    subtitle: {
        ar: "تعرف على حقوقك كمستهلك في المغرب — القانون رقم 31-08 يكفل لك الحماية من الغش التجاري، حق التراجع خلال 7 أيام، والضمان القانوني. استشارة فورية ومجانية.",
        fr: "Connaissez vos droits en tant que consommateur au Maroc — la loi 31-08 vous protège contre la fraude commerciale, garantit le droit de rétractation et la garantie légale. Consultation gratuite.",
        en: "Know your rights as a consumer in Morocco — Law 31-08 protects you from commercial fraud, guarantees a 7-day right of withdrawal, and legal warranty. Free instant consultation.",
    },
    ctaText: { ar: "اسأل عن حقوق المستهلك مجاناً", fr: "Consultez Gratuitement", en: "Ask About Consumer Rights" },
    faqTitle: { ar: "أسئلة شائعة حول حماية المستهلك في المغرب", fr: "FAQ Protection du Consommateur Maroc", en: "Morocco Consumer Protection FAQ" },
    faqItems: {
        ar: [
            { question: "ما هو القانون 31-08 المتعلق بحماية المستهلك في المغرب؟", answer: "القانون رقم 31-08 الصادر سنة 2011 هو الإطار القانوني الرئيسي لحماية المستهلك في المغرب. يُحدد حقوق المشتري في مواجهة البائعين والمصنعين، ويُلزم بالإعلام، ويكرّس حق التراجع عن العقود، ويُحارب الممارسات التجارية غير النزيهة." },
            { question: "ما هو حق التراجع في عقود البيع عن بُعد بالمغرب؟", answer: "يُتيح القانون 31-08 للمستهلك التراجع عن عقد البيع عن بُعد (الإنترنت، الهاتف) خلال 7 أيام عمل من تسلّم البضاعة، دون الحاجة إلى تبرير. يلتزم البائع برد المبلغ الكامل خلال 30 يوماً." },
            { question: "كيف أتقدم بشكوى ضد تاجر في المغرب؟", answer: "يمكن تقديم شكوى إلى مديرية حماية المستهلك التابعة لوزارة التجارة، أو إلى جمعيات حماية المستهلك المعتمدة، أو مباشرةً أمام المحكمة التجارية أو الابتدائية. ينصح 9anon AI بتوثيق الأدلة قبل التشكي." },
            { question: "ما هو الضمان القانوني للمنتجات في المغرب؟", answer: "يُلزم القانون 31-08 البائع بضمان المنتج ضد العيوب الخفية لمدة لا تقل عن سنة من تاريخ البيع. يمكن للمستهلك المطالبة بالإصلاح، الاستبدال، أو استرداد الثمن حسب الحالة." },
            { question: "هل تسري قوانين حماية المستهلك على المشتريات الرقمية في المغرب؟", answer: "نعم، يشمل القانون 31-08 المشتريات الرقمية والخدمات الإلكترونية. تُضاف إلى ذلك أحكام قانون التجارة الإلكترونية (09-08) التي تُلزم المواقع بالإفصاح الكامل عن أسعار المنتجات والخدمات." },
        ],
        fr: [
            { question: "Qu'est-ce que la loi 31-08 sur la protection du consommateur au Maroc ?", answer: "La loi n° 31-08 de 2011 est le cadre juridique principal de protection des consommateurs au Maroc. Elle définit les droits de l'acheteur face aux vendeurs et fabricants, impose l'information précontractuelle, consacre le droit de rétractation et lutte contre les pratiques commerciales déloyales." },
            { question: "Quel est le délai de rétractation pour les achats en ligne au Maroc ?", answer: "La loi 31-08 accorde au consommateur un délai de 7 jours ouvrables à compter de la réception du produit pour se rétracter d'un achat en ligne, sans avoir à se justifier. Le vendeur doit rembourser intégralement dans les 30 jours." },
            { question: "Comment déposer une plainte contre un commerçant au Maroc ?", answer: "Vous pouvez saisir la Direction de la Protection du Consommateur (ministère du Commerce), les associations agréées de protection du consommateur, ou directement le tribunal compétent. 9anon AI vous conseille de documenter toutes les preuves avant de déposer plainte." },
            { question: "Quelle est la garantie légale des produits au Maroc ?", answer: "La loi 31-08 oblige le vendeur à garantir le produit contre les vices cachés pendant au moins 1 an. Le consommateur peut exiger la réparation, le remplacement ou le remboursement selon le cas." },
        ],
        en: [
            { question: "What is Morocco's consumer protection law 31-08?", answer: "Law 31-08 of 2011 is Morocco's main consumer protection framework. It defines buyer rights against sellers and manufacturers, requires pre-contractual disclosure, establishes the right of withdrawal, and combats unfair commercial practices." },
            { question: "What is the right of withdrawal for online purchases in Morocco?", answer: "Law 31-08 gives consumers 7 working days from product receipt to withdraw from an online purchase without giving reasons. The seller must issue a full refund within 30 days." },
            { question: "How do I file a consumer complaint in Morocco?", answer: "You can file a complaint with the Consumer Protection Directorate (Ministry of Commerce), accredited consumer associations, or directly with the competent court. 9anon AI recommends documenting all evidence before filing." },
            { question: "What legal warranty covers products in Morocco?", answer: "Law 31-08 requires sellers to guarantee products against hidden defects for at least 1 year from sale. Consumers may claim repair, replacement, or refund depending on the situation." },
        ],
    },
    features: {
        ar: [
            { icon: "⚖️", title: "القانون 31-08", description: "فهم القانون الأساسي لحماية المستهلك في المغرب ومدى انطباقه على وضعيتك." },
            { icon: "🔄", title: "حق التراجع", description: "متى وكيف يمكنك التراجع عن عقد شراء أو إلغاء طلب عبر الإنترنت." },
            { icon: "🛡️", title: "الضمان القانوني", description: "ما يكفله القانون من ضمانات على المنتجات وكيفية المطالبة بها." },
            { icon: "📢", title: "مكافحة الغش", description: "الحماية من الإشهار المضلل والممارسات التجارية غير النزيهة." },
            { icon: "💻", title: "التجارة الإلكترونية", description: "حقوقك عند الشراء عبر الإنترنت وحماية بياناتك الشخصية." },
            { icon: "🤖", title: "استشارة مجانية فورية", description: "اسأل 9anon AI عن وضعيتك واحصل على إجابة قانونية دقيقة وفورية." },
        ],
        fr: [
            { icon: "⚖️", title: "Loi 31-08", description: "Comprendre la loi de protection du consommateur et son application à votre situation." },
            { icon: "🔄", title: "Droit de Rétractation", description: "Quand et comment exercer votre droit de rétractation sur un achat en ligne." },
            { icon: "🛡️", title: "Garantie Légale", description: "Les garanties légales sur les produits et comment les faire valoir." },
            { icon: "📢", title: "Lutte contre la Fraude", description: "Protection contre la publicité trompeuse et les pratiques commerciales déloyales." },
            { icon: "💻", title: "Commerce Électronique", description: "Vos droits lors d'achats en ligne et protection de vos données personnelles." },
            { icon: "🤖", title: "Consultation Gratuite", description: "Posez à 9anon AI vos questions et obtenez une réponse juridique précise et instantanée." },
        ],
        en: [
            { icon: "⚖️", title: "Law 31-08", description: "Understanding Morocco's consumer protection law and how it applies to your situation." },
            { icon: "🔄", title: "Right of Withdrawal", description: "When and how to exercise your right of withdrawal on online purchases." },
            { icon: "🛡️", title: "Legal Warranty", description: "Legal guarantees on products and how to enforce them." },
            { icon: "📢", title: "Anti-Fraud Protection", description: "Protection against misleading advertising and unfair commercial practices." },
            { icon: "💻", title: "E-Commerce Rights", description: "Your rights when shopping online and personal data protection." },
            { icon: "🤖", title: "Free AI Consultation", description: "Ask 9anon AI your consumer protection questions for an instant, accurate legal answer." },
        ],
    },
    contentSections: {
        ar: [
            { heading: "نظرة عامة على حماية المستهلك في المغرب", text: "يُرسي القانون رقم 31-08 منظومة متكاملة لحماية المستهلك تشمل: الحق في الإعلام الكامل قبل الشراء، الحق في التراجع خلال 7 أيام، الحق في الضمان ضد العيوب الخفية، والحماية من الشروط التعاقدية التعسفية. يُشرف على تطبيق هذه الأحكام مصالح وزارة التجارة ومحاكم المملكة." },
            { heading: "حقوق المستهلك الرقمي في المغرب 2026", text: "مع نمو التجارة الإلكترونية، صار المستهلك المغربي يتعامل بكثرة مع منصات رقمية. يُطالب القانون المواقع التجارية بعرض أسعار شاملة لجميع الرسوم، وتوفير وسيلة تواصل واضحة، وضمان أمان معاملات الدفع. ويُكرّس حق التراجع خلال 7 أيام دون شرط التبرير." },
        ],
        fr: [
            { heading: "Vue d'ensemble de la protection du consommateur au Maroc", text: "La loi 31-08 établit un cadre complet incluant: le droit à l'information complète avant achat, le droit de rétractation de 7 jours, le droit à la garantie contre les vices cachés, et la protection contre les clauses contractuelles abusives. Le ministère du Commerce et les tribunaux veillent à son application." },
            { heading: "Droits du consommateur numérique au Maroc 2026", text: "Avec la croissance du e-commerce, la loi exige des sites marchands de mentionner tous les frais inclus, de fournir des coordonnées claires, et de sécuriser les paiements. Le droit de rétractation de 7 jours s'applique pleinement aux achats en ligne." },
        ],
        en: [
            { heading: "Overview of Consumer Protection in Morocco", text: "Law 31-08 establishes a comprehensive framework including: the right to full pre-purchase information, a 7-day withdrawal right, warranty against hidden defects, and protection against unfair contract terms. The Ministry of Commerce and courts enforce these provisions." },
            { heading: "Digital Consumer Rights in Morocco 2026", text: "With e-commerce growth, the law requires merchant websites to display all-inclusive prices, provide clear contact information, and secure payment processing. The 7-day withdrawal right fully applies to online purchases." },
        ],
    },
    relatedLinks: [
        { href: "/commercial-law", label: "Commercial Law" },
        { href: "/business-legal", label: "Business Legal" },
        { href: "/digital-law", label: "Digital Law" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
        { href: "/online-consultation", label: "Online Consultation" },
    ],
};

/** Company Registration page — targets "company registration morocco", "créer une société au Maroc" */
export const companyRegistrationPage: SEOPageConfig = {
    slug: "company-registration",
    titles: {
        ar: "تأسيس الشركات في المغرب | تسجيل SARL وSA والمقاول الذاتي - 9anon AI",
        fr: "Création d'Entreprise au Maroc | SARL, SA, Auto-Entrepreneur - 9anon AI",
        en: "Company Registration Morocco | SARL, SA, Auto-Entrepreneur Guide - 9anon AI",
    },
    descriptions: {
        ar: "دليل خطوة بخطوة لتأسيس الشركات في المغرب 2026: SARL وSA والمقاول الذاتي، شهادة السلبية، نافذة الخدمات الموحدة CRI، الوثائق المطلوبة والتكلفة. مجاناً بالذكاء الاصطناعي.",
        fr: "Guide complet pour créer une entreprise au Maroc 2026: SARL, SA, auto-entrepreneur, certificat négatif, CRI guichet unique, documents et délais. Consultation gratuite par IA.",
        en: "Step-by-step guide to company registration in Morocco 2026: SARL, SA, auto-entrepreneur, certificat négatif, CRI one-stop shop, required documents and timelines. Free AI consultation.",
    },
    keywords: {
        ar: ["تأسيس شركة المغرب", "تسجيل SARL المغرب", "المقاول الذاتي المغرب", "شهادة السلبية OMPIC", "نافذة CRI المغرب", "السجل التجاري المغرب", "إنشاء شركة المغرب"],
        fr: ["créer entreprise maroc", "création sarl maroc", "auto-entrepreneur maroc", "certificat négatif maroc", "CRI guichet unique", "registre de commerce maroc", "immatriculation société maroc"],
        en: ["company registration morocco", "sarl formation morocco", "auto-entrepreneur morocco", "certificat negatif morocco", "CRI one-stop shop morocco", "register company morocco", "company incorporation morocco"],
    },
    h1: {
        ar: "تأسيس الشركات في المغرب 2026: الدليل الشامل خطوة بخطوة",
        fr: "Créer une Entreprise au Maroc 2026 : Guide Complet Étape par Étape",
        en: "Company Registration in Morocco 2026: Complete Step-by-Step Guide",
    },
    badge: { ar: "تأسيس الشركات", fr: "Création d'Entreprise", en: "Business Registration" },
    subtitle: {
        ar: "من شهادة السلبية إلى قيد السجل التجاري — تعرف على كل خطوات تأسيس شركتك في المغرب، الوثائق المطلوبة، التكاليف، والمدد الزمنية لكل شكل قانوني.",
        fr: "Du certificat négatif à l'inscription au registre de commerce — tout sur les étapes de création d'entreprise au Maroc, documents requis, coûts et délais par forme juridique.",
        en: "From certificat négatif to commercial register entry — everything about company registration steps in Morocco, required documents, costs, and timelines for each legal form.",
    },
    ctaText: { ar: "اسأل عن تأسيس شركتك مجاناً", fr: "Consultez pour Votre Création d'Entreprise", en: "Ask About Company Registration" },
    faqTitle: { ar: "أسئلة شائعة حول تأسيس الشركات في المغرب", fr: "FAQ Création d'Entreprise Maroc", en: "Morocco Company Registration FAQ" },
    faqItems: {
        ar: [
            { question: "كيف أؤسس شركة ذات مسؤولية محدودة SARL في المغرب؟", answer: "تأسيس SARL في المغرب يمر بالخطوات التالية: 1) الحصول على شهادة السلبية من OMPIC لحجز اسم الشركة؛ 2) إعداد القانون الأساسي (النظام الداخلي) وتوثيقه لدى موثق؛ 3) إيداع رأس المال في حساب مجمد لدى بنك؛ 4) التسجيل بنافذة CRI الموحدة. تستغرق العملية عادةً بين 5 و10 أيام عمل." },
            { question: "ما هو الحد الأدنى لرأس مال SARL في المغرب 2026؟", answer: "لا يشترط القانون المغربي حداً أدنى لرأس مال SARL اعتباراً من إصلاح 2012. يمكن تأسيسها بدرهم واحد نظرياً، غير أن البنوك والشركاء الاقتصاديين يفضلون رأس مال لا يقل عن 10,000 إلى 100,000 درهم حسب طبيعة النشاط." },
            { question: "ما هو نظام المقاول الذاتي في المغرب ومتى يُستحسن اختياره؟", answer: "المقاول الذاتي هو نظام مبسط يُتيح ممارسة نشاط مستقل دون الحاجة إلى شركة رسمية. يُناسب أصحاب الدخل المتوسط والمشاريع الصغيرة. الحد الأقصى للرقم المعاملاتي: 2,000,000 درهم للتجارة و500,000 درهم للخدمات." },
            { question: "كم يستغرق تسجيل شركة في المغرب؟", answer: "عبر نافذة CRI الموحدة (Centre Régional d'Investissement)، يمكن استكمال الإجراءات في يوم إلى 3 أيام عمل للملفات الكاملة. قد تمتد المدة إلى أسبوعين عند وجود إشكاليات في الوثائق." },
            { question: "ما هي الوثائق المطلوبة لتأسيس شركة في المغرب؟", answer: "الوثائق الأساسية: نسخة من بطاقة الهوية أو جواز السفر للمؤسسين؛ شهادة السلبية من OMPIC؛ القانون الأساسي الموثق؛ شهادة إيداع رأس المال؛ نموذج الطلب من CRI. قد تُضاف وثائق أخرى حسب القطاع (ترخيص، شهادة كفاءة...)." },
        ],
        fr: [
            { question: "Comment créer une SARL au Maroc ?", answer: "La création d'une SARL au Maroc passe par: 1) Obtention du certificat négatif auprès de l'OMPIC; 2) Rédaction et authentification des statuts chez un notaire; 3) Dépôt du capital dans un compte bancaire bloqué; 4) Inscription au guichet unique CRI. La procédure prend généralement 5 à 10 jours ouvrables." },
            { question: "Quel est le capital minimum pour une SARL au Maroc en 2026 ?", answer: "Depuis la réforme de 2012, il n'y a plus de capital minimum légal pour une SARL au Maroc. Théoriquement 1 dirham suffit, mais les banques et partenaires préfèrent généralement un capital de 10 000 à 100 000 MAD selon l'activité." },
            { question: "Combien de temps faut-il pour créer une société au Maroc ?", answer: "Via le guichet unique CRI, un dossier complet peut être traité en 1 à 3 jours ouvrables. La procédure peut s'étendre à 2 semaines en cas de problèmes documentaires." },
            { question: "Quels documents sont nécessaires pour créer une entreprise au Maroc ?", answer: "Documents essentiels: copie de la CIN/passeport des fondateurs; certificat négatif OMPIC; statuts authentifiés; attestation de dépôt du capital; formulaire de demande CRI. Des documents supplémentaires peuvent être requis selon le secteur." },
        ],
        en: [
            { question: "How do I register a company in Morocco?", answer: "Company registration in Morocco follows these steps: 1) Obtain a certificat négatif from OMPIC to reserve the company name; 2) Draft and notarize articles of association; 3) Deposit capital in a blocked bank account; 4) Register at the CRI one-stop shop. The process typically takes 5-10 working days." },
            { question: "What is the minimum capital for a SARL in Morocco in 2026?", answer: "Since the 2012 reform, there is no legal minimum capital for a SARL in Morocco. Technically 1 dirham suffices, but banks and business partners generally prefer capital of 10,000 to 100,000 MAD depending on the activity." },
            { question: "How long does company registration take in Morocco?", answer: "Through the CRI one-stop shop, a complete file can be processed in 1 to 3 working days. The procedure may extend to 2 weeks if documentation issues arise." },
            { question: "What documents are required to register a company in Morocco?", answer: "Essential documents: copy of founders' ID/passport; OMPIC certificat négatif; notarized articles of association; capital deposit certificate; CRI application form. Additional documents may be required depending on the sector." },
        ],
    },
    features: {
        ar: [
            { icon: "🏢", title: "SARL وSA", description: "الفرق بين الشركات ذات المسؤولية المحدودة وشركات المساهمة وأيها يناسب مشروعك." },
            { icon: "🔰", title: "المقاول الذاتي", description: "النظام المبسط لأصحاب المشاريع الصغيرة والمهن الحرة." },
            { icon: "📋", title: "شهادة السلبية", description: "كيفية حجز اسم شركتك لدى OMPIC ومدة الصلاحية." },
            { icon: "🏛️", title: "نافذة CRI", description: "التسجيل الرسمي في مركز استثمار واحد في يوم واحد." },
            { icon: "💰", title: "التكاليف والرسوم", description: "التكلفة الإجمالية لتأسيس شركتك شاملاً رسوم التوثيق والتسجيل." },
            { icon: "🤖", title: "مساعدة ذكاء اصطناعي", description: "اطرح أسئلتك على 9anon AI وأحصل على إرشادات قانونية فورية ومجانية." },
        ],
        fr: [
            { icon: "🏢", title: "SARL vs SA", description: "Comprendre les différences entre SARL et SA et choisir la bonne structure pour votre projet." },
            { icon: "🔰", title: "Auto-Entrepreneur", description: "Le régime simplifié pour les petits projets et les professions libérales." },
            { icon: "📋", title: "Certificat Négatif", description: "Réserver votre nom de société auprès de l'OMPIC et durée de validité." },
            { icon: "🏛️", title: "Guichet Unique CRI", description: "Immatriculation officielle en une seule démarche au Centre Régional d'Investissement." },
            { icon: "💰", title: "Coûts et Frais", description: "Coût total de création d'entreprise incluant notaire, enregistrement et frais d'annonce légale." },
            { icon: "🤖", title: "Assistance IA Gratuite", description: "Posez vos questions à 9anon AI pour des conseils juridiques instantanés et gratuits." },
        ],
        en: [
            { icon: "🏢", title: "SARL vs SA", description: "Understanding the differences between SARL and SA and choosing the right structure for your project." },
            { icon: "🔰", title: "Auto-Entrepreneur", description: "The simplified regime for small projects and freelancers." },
            { icon: "📋", title: "Certificat Négatif", description: "Reserve your company name at OMPIC and validity period." },
            { icon: "🏛️", title: "CRI One-Stop Shop", description: "Official registration in a single step at the Regional Investment Center." },
            { icon: "💰", title: "Costs and Fees", description: "Total company formation cost including notary, registration, and legal announcement fees." },
            { icon: "🤖", title: "Free AI Assistance", description: "Ask 9anon AI your questions for instant, free legal guidance on company registration." },
        ],
    },
    contentSections: {
        ar: [
            { heading: "الأشكال القانونية للشركات في المغرب: ما الفرق؟", text: "يتيح القانون المغربي عدة أشكال لإنشاء المقاولات: SARL (ذات مسؤولية محدودة) هي الأكثر شيوعاً للمشاريع الصغيرة والمتوسطة، بينما SA (مساهمة) تُناسب المشاريع الكبيرة التي تحتاج إلى رأس مال كبير. أما المقاول الذاتي فهو خيار مثالي للمهنيين المستقلين وأصحاب المشاريع الصغيرة." },
            { heading: "دور OMPIC ونافذة CRI في تأسيس الشركات", text: "المكتب المغربي للملكية الصناعية والتجارية (OMPIC) مسؤول عن حجز أسماء الشركات وإصدار شهادة السلبية. أما مراكز استثمار الجهات (CRI) فتوفر نافذة موحدة تجمع كل الإجراءات الإدارية في مكان واحد، مما يُقلص مدة التسجيل إلى أيام معدودة." },
        ],
        fr: [
            { heading: "Formes juridiques d'entreprises au Maroc: Quelle différence ?", text: "Le droit marocain offre plusieurs formes: la SARL est la plus courante pour les PME; la SA convient aux grandes entreprises nécessitant des capitaux importants; l'auto-entrepreneur est idéal pour les indépendants et petits projets." },
            { heading: "Rôle de l'OMPIC et du CRI dans la création d'entreprise", text: "L'OMPIC est responsable de la réservation des noms de sociétés et de l'émission du certificat négatif. Les CRI offrent un guichet unique regroupant toutes les formalités administratives en un seul endroit." },
        ],
        en: [
            { heading: "Legal Forms of Companies in Morocco: What's the Difference?", text: "Moroccan law offers several forms: SARL is the most common for SMEs; SA suits large companies needing significant capital; auto-entrepreneur is ideal for freelancers and small projects." },
            { heading: "Role of OMPIC and CRI in Company Registration", text: "OMPIC handles company name reservation and certificat négatif issuance. CRIs provide a one-stop shop combining all administrative formalities in one place, reducing registration to a few days." },
        ],
    },
    relatedLinks: [
        { href: "/business-legal", label: "Business Legal" },
        { href: "/startup-legal", label: "Startup Legal" },
        { href: "/commercial-law", label: "Commercial Law" },
        { href: "/tax-legal", label: "Tax Legal" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
    ],
};

/** Citizenship Law page — targets "moroccan citizenship", "nationalité marocaine", "morocco nationality" */
export const citizenshipLawPage: SEOPageConfig = {
    slug: "citizenship-law",
    titles: {
        ar: "الجنسية المغربية | شروط الحصول والتجنيس والازدواجية - 9anon AI",
        fr: "Nationalité Marocaine | Conditions, Naturalisation et Double Nationalité - 9anon AI",
        en: "Moroccan Citizenship | Requirements, Naturalization & Dual Nationality - 9anon AI",
    },
    descriptions: {
        ar: "دليل شامل حول الجنسية المغربية 2026: من يستحق الجنسية بالأصل، شروط التجنيس، مسطرة استرداد الجنسية، ازدواجية الجنسية. استشارة قانونية مجانية بالذكاء الاصطناعي.",
        fr: "Guide complet sur la nationalité marocaine 2026: acquisition par filiation, naturalisation, réintégration, double nationalité. Consultation juridique gratuite par IA.",
        en: "Complete guide to Moroccan citizenship 2026: acquisition by descent, naturalization, reinstatement, dual nationality. Free AI legal consultation.",
    },
    keywords: {
        ar: ["الجنسية المغربية", "التجنيس في المغرب", "ازدواجية الجنسية المغرب", "استرداد الجنسية المغربية", "شروط الإقامة في المغرب", "الإقامة الدائمة المغرب"],
        fr: ["nationalité marocaine", "naturalisation maroc", "double nationalité maroc", "réintégration nationalité marocaine", "résidence permanente maroc", "obtenir nationalité marocaine"],
        en: ["moroccan citizenship", "moroccan nationality", "morocco naturalization", "dual citizenship morocco", "permanent residency morocco", "how to get moroccan citizenship", "morocco citizenship requirements"],
    },
    h1: {
        ar: "الجنسية المغربية 2026: كيف تكتسبها وشروط التجنيس والازدواجية",
        fr: "La Nationalité Marocaine 2026 : Acquisition, Naturalisation et Double Nationalité",
        en: "Moroccan Citizenship 2026: How to Acquire It, Naturalization & Dual Nationality",
    },
    badge: { ar: "الجنسية والإقامة", fr: "Nationalité & Résidence", en: "Citizenship & Residency" },
    subtitle: {
        ar: "تعرف على كيفية اكتساب الجنسية المغربية — سواء بالأصل، بالتجنيس، أو باسترداد، وما هو الموقف القانوني من ازدواجية الجنسية. استشارة قانونية مجانية وفورية.",
        fr: "Découvrez comment acquérir la nationalité marocaine — par filiation, naturalisation ou réintégration, et la position juridique sur la double nationalité. Consultation gratuite.",
        en: "Learn how to acquire Moroccan citizenship — by descent, naturalization, or reinstatement — and the legal position on dual nationality. Free instant consultation.",
    },
    ctaText: { ar: "اسأل عن الجنسية المغربية مجاناً", fr: "Consultez sur la Nationalité Marocaine", en: "Ask About Moroccan Citizenship" },
    faqTitle: { ar: "أسئلة شائعة حول الجنسية المغربية", fr: "FAQ Nationalité Marocaine", en: "Moroccan Citizenship FAQ" },
    faqItems: {
        ar: [
            { question: "من يستحق الجنسية المغربية بالأصل؟", answer: "يكتسب الجنسية المغربية بحكم القانون: كل شخص وُلد لأب مغربي، وكل شخص وُلد لأم مغربية (منذ تعديل 2007)، وكل شخص وُلد في المغرب ولم يثبت له جنسية أجنبية. يستند ذلك إلى ظهير الجنسية المغربية رقم 1-58-250." },
            { question: "ما هي شروط التجنيس في المغرب؟", answer: "شروط التجنيس بالمغرب تشمل: الإقامة القانونية المنتظمة لمدة 5 سنوات على الأقل (أو سنتان لأزواج المغاربة)، حسن السيرة والسلوك، الكفاءة للاندماج، والتخلي عن الجنسية الأصلية إن كانت دولة المعني لا تقبل الازدواجية. تُمنح الجنسية بمرسوم ملكي." },
            { question: "هل يُقر القانون المغربي بازدواجية الجنسية؟", answer: "المغرب يقبل مبدئياً ازدواجية الجنسية لمواطنيه في الخارج، إذ لا يُلزم المغربيين بالتخلي عن جنسيتهم عند اكتساب جنسية أجنبية. غير أن القانون المغربي يعتبرهم مغاربة أولاً على أراضي المملكة." },
            { question: "كيف تسترد الجنسية المغربية بعد التنازل عنها؟", answer: "يمكن لمن تنازل عن الجنسية المغربية طلب استردادها عبر تقديم طلب لوزير العدل مرفقاً بالوثائق الثبوتية. يُشترط الإقامة بالمغرب أو الرجوع إلى الوطن. تُمنح بمرسوم بعد الموافقة." },
        ],
        fr: [
            { question: "Qui peut obtenir la nationalité marocaine de naissance ?", answer: "Acquiert la nationalité marocaine de plein droit: toute personne née d'un père marocain, toute personne née d'une mère marocaine (depuis 2007), et toute personne née au Maroc qui ne peut prouver une nationalité étrangère. Cela est fondé sur le dahir de nationalité 1-58-250." },
            { question: "Quelles sont les conditions de naturalisation au Maroc ?", answer: "La naturalisation exige: résidence légale régulière d'au moins 5 ans (2 ans pour conjoints de Marocains), bonne moralité, capacité d'intégration, et renonciation à la nationalité d'origine si le pays concerné n'accepte pas la double nationalité. Elle est accordée par dahir." },
            { question: "Le Maroc reconnaît-il la double nationalité ?", answer: "Le Maroc accepte en principe la double nationalité pour ses citoyens à l'étranger, ne les obligeant pas à renoncer à leur nationalité marocaine lors de l'acquisition d'une nationalité étrangère. Sur le territoire marocain, ils sont considérés comme Marocains en priorité." },
            { question: "Comment obtenir la résidence permanente au Maroc ?", answer: "La résidence permanente (carte de résidence de 10 ans) est accessible après 4 ans de résidence légale continue pour les non-ressortissants de l'UE, et après 3 ans pour les étrangers mariés à un Marocain." },
        ],
        en: [
            { question: "Who is entitled to Moroccan citizenship by birth?", answer: "Moroccan citizenship is acquired by law by: any person born to a Moroccan father, any person born to a Moroccan mother (since 2007 reform), and any person born in Morocco who cannot prove foreign nationality. This is based on Dahir 1-58-250 on Moroccan nationality." },
            { question: "What are the requirements for Moroccan naturalization?", answer: "Naturalization requirements include: legal regular residence for at least 5 years (2 years for spouses of Moroccans), good conduct, capacity for integration, and renunciation of original nationality if the home country doesn't accept dual nationality. It is granted by royal decree." },
            { question: "Does Morocco recognize dual citizenship?", answer: "Morocco in principle accepts dual nationality for its citizens abroad, not requiring them to renounce Moroccan citizenship when acquiring a foreign nationality. On Moroccan territory, they are considered Moroccan first." },
            { question: "How do I get permanent residency in Morocco?", answer: "Permanent residency (10-year residence card) is available after 4 years of continuous legal residence for non-EU nationals, and after 3 years for foreigners married to a Moroccan citizen." },
        ],
    },
    features: {
        ar: [
            { icon: "🇲🇦", title: "الجنسية بالأصل", description: "من يرثها تلقائياً من الأب أو الأم وفق ظهير الجنسية." },
            { icon: "📝", title: "التجنيس", description: "شروط وإجراءات التجنيس بالمغرب للأجانب المقيمين." },
            { icon: "🔄", title: "استرداد الجنسية", description: "كيفية استرداد الجنسية المغربية بعد التنازل عنها." },
            { icon: "✌️", title: "ازدواجية الجنسية", description: "الموقف القانوني من حمل الجنسيتين المغربية وجنسية أجنبية." },
            { icon: "🏠", title: "الإقامة الدائمة", description: "شروط الحصول على بطاقة الإقامة الدائمة لمدة 10 سنوات." },
            { icon: "🤖", title: "استشارة مجانية", description: "اسأل 9anon AI عن وضعيتك القانونية واحصل على إجابة فورية." },
        ],
        fr: [
            { icon: "🇲🇦", title: "Nationalité par Filiation", description: "Qui l'acquiert automatiquement par le père ou la mère selon le dahir de nationalité." },
            { icon: "📝", title: "Naturalisation", description: "Conditions et procédures de naturalisation au Maroc pour les étrangers résidents." },
            { icon: "🔄", title: "Réintégration", description: "Comment récupérer la nationalité marocaine après y avoir renoncé." },
            { icon: "✌️", title: "Double Nationalité", description: "Position juridique sur la détention de la nationalité marocaine et d'une nationalité étrangère." },
            { icon: "🏠", title: "Résidence Permanente", description: "Conditions d'obtention de la carte de résidence permanente de 10 ans." },
            { icon: "🤖", title: "Consultation Gratuite", description: "Posez à 9anon AI vos questions sur votre situation et obtenez une réponse instantanée." },
        ],
        en: [
            { icon: "🇲🇦", title: "Citizenship by Descent", description: "Who automatically acquires it through father or mother under the nationality dahir." },
            { icon: "📝", title: "Naturalization", description: "Requirements and procedures for naturalization in Morocco for resident foreigners." },
            { icon: "🔄", title: "Reinstatement", description: "How to recover Moroccan citizenship after having renounced it." },
            { icon: "✌️", title: "Dual Nationality", description: "Legal position on holding both Moroccan and foreign nationality." },
            { icon: "🏠", title: "Permanent Residency", description: "Requirements for obtaining the 10-year permanent residence card." },
            { icon: "🤖", title: "Free AI Consultation", description: "Ask 9anon AI about your situation and get an instant, accurate answer." },
        ],
    },
    contentSections: {
        ar: [
            { heading: "الإطار القانوني للجنسية المغربية", text: "تُنظَّم الجنسية المغربية بموجب الظهير رقم 1-58-250 الصادر في 21 صفر 1378 (6 سبتمبر 1958) وتعديلاته اللاحقة. يتبنى المغرب مبدأ حق الدم (jus sanguinis) أساساً لمنح الجنسية، مع إمكانية اكتسابها بالولادة على التراب المغربي أو بالتجنيس." },
            { heading: "الجنسية المغربية والمغتربون", text: "يحتفظ المغاربة في الخارج بجنسيتهم المغربية بصرف النظر عن اكتساب جنسيات أجنبية. وتُولي المملكة اهتماماً كبيراً بالجالية المغربية المقيمة خارج الوطن، إذ تُبقي على روابط قانونية وإدارية وثيقة معها." },
        ],
        fr: [
            { heading: "Cadre juridique de la nationalité marocaine", text: "La nationalité marocaine est régie par le dahir n° 1-58-250 du 21 safar 1378 (6 septembre 1958) et ses modifications ultérieures. Le Maroc adopte le principe du droit du sang (jus sanguinis) comme base d'attribution de la nationalité, avec possibilité d'acquisition par naissance sur le territoire ou par naturalisation." },
            { heading: "Nationalité marocaine et expatriés", text: "Les Marocains à l'étranger conservent leur nationalité marocaine indépendamment de l'acquisition de nationalités étrangères. Le Royaume accorde une grande importance à sa diaspora, maintenant des liens juridiques et administratifs étroits avec elle." },
        ],
        en: [
            { heading: "Legal Framework of Moroccan Citizenship", text: "Moroccan citizenship is governed by Dahir 1-58-250 of 21 Safar 1378 (September 6, 1958) and subsequent amendments. Morocco adopts the principle of jus sanguinis as the basis for granting citizenship, with the possibility of acquisition by birth on territory or naturalization." },
            { heading: "Moroccan Citizenship and Expatriates", text: "Moroccans abroad retain their Moroccan citizenship regardless of acquiring foreign nationalities. The Kingdom attaches great importance to its diaspora, maintaining close legal and administrative ties with them." },
        ],
    },
    relatedLinks: [
        { href: "/immigration-law", label: "Immigration Law" },
        { href: "/family-law", label: "Family Law" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
        { href: "/online-consultation", label: "Online Consultation" },
        { href: "/divorce-law", label: "Divorce Law" },
    ],
};
