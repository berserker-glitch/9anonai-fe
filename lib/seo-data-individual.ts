/**
 * @fileoverview SEO page data for individual rights pages:
 * divorce-law, employee-rights, tenant-rights, online-consultation.
 * These target problem-based keywords for individuals.
 * @module lib/seo-data-individual
 */

import { SEOPageConfig } from "./seo-page-types";

/** Divorce Law page — targets divorce + inheritance keywords */
export const divorceLawPage: SEOPageConfig = {
    slug: "divorce-law",
    titles: {
        en: "Divorce Law Morocco | Online Divorce Lawyer Help - 9anon AI",
        fr: "Divorce au Maroc | Procédure et Droit de la Famille - 9anon AI",
        ar: "الطلاق في المغرب | إجراءات ومساعدة قانونية - 9anon AI",
    },
    descriptions: {
        en: "Everything about divorce law in Morocco. Get AI-powered legal help with divorce procedures, Moudawana rights, child custody, alimony, and inheritance under Moroccan family law.",
        fr: "Tout sur le divorce au Maroc. Obtenez une aide juridique IA pour les procédures de divorce, la Moudawana, la garde des enfants, la pension alimentaire et la succession.",
        ar: "كل شيء عن الطلاق في المغرب. احصل على مساعدة قانونية بالذكاء الاصطناعي حول إجراءات الطلاق ومدونة الأسرة والحضانة والنفقة والإرث.",
    },
    keywords: {
        en: ["divorce lawyer Morocco online", "inheritance law Morocco help", "family law Morocco"],
        fr: ["divorce Maroc procédure", "droit successoral Maroc", "droit de la famille Maroc"],
        ar: ["الطلاق في المغرب إجراءات", "الإرث في القانون المغربي", "مدونة الأسرة"],
    },
    h1: { en: "Divorce & Family Law in Morocco", fr: "Divorce et Droit de la Famille au Maroc", ar: "الطلاق وقانون الأسرة في المغرب" },
    badge: { en: "Family Law", fr: "Droit de la Famille", ar: "قانون الأسرة" },
    subtitle: {
        en: "Navigate divorce proceedings and family law in Morocco with AI-powered legal guidance. Understand your rights under the Moudawana, child custody rules, alimony, and inheritance law — instantly and confidentially.",
        fr: "Naviguez les procédures de divorce et le droit de la famille au Maroc avec une guidance juridique IA. Comprenez vos droits selon la Moudawana, la garde, la pension alimentaire et la succession.",
        ar: "اكتشف إجراءات الطلاق وقانون الأسرة في المغرب مع إرشاد قانوني بالذكاء الاصطناعي. افهم حقوقك وفق مدونة الأسرة والحضانة والنفقة والإرث — بشكل فوري وسري.",
    },
    ctaText: { en: "Ask About Divorce Law", fr: "Posez Votre Question sur le Divorce", ar: "اسأل عن قانون الطلاق" },
    faqTitle: { en: "Divorce & Family Law FAQ", fr: "FAQ Divorce et Famille", ar: "أسئلة شائعة عن الطلاق والأسرة" },
    faqItems: {
        en: [
            { question: "What are the grounds for divorce in Morocco?", answer: "Under the Moudawana, divorce can be initiated through mutual consent (khol'), judicial divorce for discord (shiqaq), or for specific reasons such as harm, absence, or failure to maintain. Both spouses have the right to initiate divorce proceedings." },
            { question: "How is child custody decided in Moroccan divorce?", answer: "The Moudawana grants custody priority to the mother for children under a certain age, then the father or maternal grandmother. The court considers the child's best interest and may modify custody based on circumstances." },
            { question: "How does inheritance work under Moroccan law?", answer: "Inheritance in Morocco follows Islamic law principles codified in the Moudawana. Shares are distributed according to fixed proportions (faraid) based on the heir's relationship to the deceased and gender." },
            { question: "How long does a divorce take in Morocco?", answer: "Timeline varies: mutual consent divorces can be finalized in 1-3 months, while contested divorces (shiqaq) may take 6-12 months or longer depending on court caseload and complexity." },
        ],
        fr: [
            { question: "Quels sont les motifs de divorce au Maroc ?", answer: "Selon la Moudawana, le divorce peut être initié par consentement mutuel (khol'), divorce judiciaire pour discorde (chiqaq), ou pour des raisons spécifiques comme le préjudice ou l'absence. Les deux conjoints ont le droit d'initier la procédure." },
            { question: "Comment la garde des enfants est-elle décidée ?", answer: "La Moudawana accorde la priorité de garde à la mère pour les enfants en bas âge, puis au père ou à la grand-mère maternelle. Le tribunal considère l'intérêt supérieur de l'enfant." },
            { question: "Comment fonctionne l'héritage au Maroc ?", answer: "L'héritage au Maroc suit les principes du droit islamique codifiés dans la Moudawana. Les parts sont distribuées selon des proportions fixes (faraid) basées sur la relation avec le défunt." },
            { question: "Combien de temps prend un divorce au Maroc ?", answer: "Le délai varie : un divorce par consentement mutuel peut être finalisé en 1-3 mois, tandis qu'un divorce contesté peut prendre 6-12 mois ou plus." },
        ],
        ar: [
            { question: "ما هي أسباب الطلاق في المغرب؟", answer: "حسب مدونة الأسرة، يمكن بدء إجراءات الطلاق بالتراضي (الخلع) أو الطلاق القضائي للشقاق أو لأسباب محددة كالضرر أو الغياب أو عدم الإنفاق. لكلا الزوجين الحق في بدء إجراءات الطلاق." },
            { question: "كيف تُحدد حضانة الأطفال في الطلاق المغربي؟", answer: "تمنح مدونة الأسرة أولوية الحضانة للأم للأطفال دون سن معين، ثم الأب أو الجدة لأم. تراعي المحكمة مصلحة الطفل الفضلى." },
            { question: "كيف يعمل الإرث في القانون المغربي؟", answer: "يتبع الإرث في المغرب مبادئ الشريعة الإسلامية المقننة في مدونة الأسرة. توزع الحصص حسب نسب ثابتة (فرائض) بناءً على صلة الوارث بالمتوفى." },
            { question: "كم يستغرق الطلاق في المغرب؟", answer: "يختلف الوقت: الطلاق بالتراضي قد ينتهي في 1-3 أشهر، بينما الطلاق المتنازع عليه قد يستغرق 6-12 شهراً أو أكثر." },
        ],
    },
    features: {
        en: [
            { icon: "💔", title: "Divorce Procedures", description: "Understand mutual consent (khol'), judicial divorce (shiqaq), and other divorce types." },
            { icon: "👶", title: "Child Custody Rights", description: "Know your custody rights and how courts decide in children's best interest." },
            { icon: "💰", title: "Alimony & Nafaqa", description: "Learn about maintenance obligations during and after divorce proceedings." },
            { icon: "📜", title: "Inheritance Law", description: "Understand Islamic inheritance rules (faraid) as applied in Moroccan law." },
            { icon: "🏠", title: "Marital Home Rights", description: "Know your rights regarding the family home during divorce." },
            { icon: "⚡", title: "Instant AI Guidance", description: "Get immediate answers about your family law situation from 9anon AI." },
        ],
        fr: [
            { icon: "💔", title: "Procédures de Divorce", description: "Comprenez le khol', le divorce judiciaire (chiqaq) et autres types." },
            { icon: "👶", title: "Droits de Garde", description: "Connaissez vos droits de garde et comment les tribunaux décident." },
            { icon: "💰", title: "Pension Alimentaire", description: "Apprenez sur les obligations de pension pendant et après le divorce." },
            { icon: "📜", title: "Droit Successoral", description: "Comprenez les règles islamiques d'héritage appliquées au Maroc." },
            { icon: "🏠", title: "Droits au Domicile", description: "Connaissez vos droits sur le domicile conjugal pendant le divorce." },
            { icon: "⚡", title: "Guidance IA Instantanée", description: "Obtenez des réponses immédiates sur votre situation familiale." },
        ],
        ar: [
            { icon: "💔", title: "إجراءات الطلاق", description: "افهم الخلع والطلاق القضائي (الشقاق) وأنواع الطلاق الأخرى." },
            { icon: "👶", title: "حقوق الحضانة", description: "اعرف حقوقك في الحضانة وكيف تقرر المحاكم مصلحة الطفل." },
            { icon: "💰", title: "النفقة", description: "تعرف على التزامات النفقة أثناء وبعد إجراءات الطلاق." },
            { icon: "📜", title: "قانون الإرث", description: "افهم قواعد الإرث الإسلامية (الفرائض) كما تطبق في القانون المغربي." },
            { icon: "🏠", title: "حقوق السكن الزوجي", description: "اعرف حقوقك في بيت الزوجية أثناء الطلاق." },
            { icon: "⚡", title: "إرشاد ذكي فوري", description: "احصل على إجابات فورية عن وضعك الأسري من 9anon AI." },
        ],
    },
    contentSections: {
        en: [
            { heading: "Understanding Divorce in Morocco", text: "Divorce in Morocco is governed by the Moudawana (Family Code), reformed in 2004 to grant women greater rights. The law recognizes several forms of divorce: mutual consent divorce (khol'), judicial divorce for discord (shiqaq), and divorce for specific causes. Understanding these options is the first step toward protecting your rights." },
            { heading: "Your Rights Under the Moudawana", text: "The reformed Moudawana ensures both spouses have equal rights to initiate divorce. Women can request divorce without their husband's consent through the shiqaq procedure. The code also protects children's rights through mandatory custody arrangements and maintenance obligations." },
        ],
        fr: [
            { heading: "Comprendre le Divorce au Maroc", text: "Le divorce au Maroc est régi par la Moudawana (Code de la Famille), réformée en 2004 pour accorder plus de droits aux femmes. La loi reconnaît plusieurs formes : divorce par consentement mutuel (khol'), divorce judiciaire pour discorde (chiqaq), et divorce pour causes spécifiques." },
            { heading: "Vos Droits Selon la Moudawana", text: "La Moudawana réformée garantit aux deux conjoints des droits égaux pour initier le divorce. Les femmes peuvent demander le divorce sans le consentement du mari via la procédure de chiqaq. Le code protège aussi les droits des enfants." },
        ],
        ar: [
            { heading: "فهم الطلاق في المغرب", text: "يخضع الطلاق في المغرب لمدونة الأسرة المعدلة في 2004 لمنح المرأة حقوقاً أكبر. يعترف القانون بعدة أشكال: الطلاق بالتراضي (الخلع)، الطلاق القضائي للشقاق، والطلاق لأسباب محددة. فهم هذه الخيارات هو الخطوة الأولى لحماية حقوقك." },
            { heading: "حقوقك وفق مدونة الأسرة", text: "تضمن مدونة الأسرة المعدلة لكلا الزوجين حقوقاً متساوية في بدء إجراءات الطلاق. يمكن للمرأة طلب الطلاق دون موافقة الزوج عبر مسطرة الشقاق. كما تحمي المدونة حقوق الأطفال من خلال ترتيبات الحضانة والنفقة الإلزامية." },
        ],
    },
    relatedLinks: [
        { href: "/family-law", label: "Family Law (Moudawana)" },
        { href: "/employee-rights", label: "Employee Rights" },
        { href: "/tenant-rights", label: "Tenant Rights" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
        { href: "/legal-chatbot", label: "Legal Chatbot" },
    ],
    gradientFrom: "from-rose-600",
    gradientTo: "to-pink-500",
    glowColor: "bg-rose-500/20",
};

/** Employee Rights page — targets labor law + employee protection keywords */
export const employeeRightsPage: SEOPageConfig = {
    slug: "employee-rights",
    titles: {
        en: "Employee Rights Morocco | Labor Law Advice - 9anon AI",
        fr: "Droits des Employés Maroc | Conseil Droit du Travail - 9anon AI",
        ar: "حقوق الموظف في المغرب | استشارة قانون الشغل - 9anon AI",
    },
    descriptions: {
        en: "Know your employee rights in Morocco. Free AI-powered labor law advice covering contracts, wrongful termination, vacation, wages, and worker protections under the Code du Travail.",
        fr: "Connaissez vos droits d'employé au Maroc. Conseil gratuit en droit du travail couvrant contrats, licenciement abusif, congés, salaires et protections des travailleurs.",
        ar: "اعرف حقوقك كموظف في المغرب. استشارة مجانية في قانون الشغل تغطي العقود والفصل التعسفي والإجازات والأجور وحماية العمال.",
    },
    keywords: {
        en: ["employee rights Morocco", "labor law advice Morocco"],
        fr: ["droits des employés Maroc", "droit du travail Maroc conseil"],
        ar: ["حقوق الموظف في المغرب", "قانون الشغل المغرب استشارة"],
    },
    h1: { en: "Employee Rights & Labor Law in Morocco", fr: "Droits des Employés et Droit du Travail au Maroc", ar: "حقوق الموظف وقانون الشغل في المغرب" },
    badge: { en: "Labor Law", fr: "Droit du Travail", ar: "قانون الشغل" },
    subtitle: {
        en: "Understand your rights as an employee in Morocco. Get free AI-powered advice on employment contracts, wrongful termination, vacation days, minimum wage, and workplace protections under the Code du Travail.",
        fr: "Comprenez vos droits en tant qu'employé au Maroc. Obtenez des conseils gratuits sur les contrats, le licenciement abusif, les congés, le salaire minimum et les protections au travail.",
        ar: "افهم حقوقك كموظف في المغرب. احصل على استشارة مجانية حول عقود العمل والفصل التعسفي والإجازات والحد الأدنى للأجور وحماية العمال وفق مدونة الشغل.",
    },
    ctaText: { en: "Ask About Your Rights", fr: "Posez Votre Question", ar: "اسأل عن حقوقك" },
    faqTitle: { en: "Employee Rights FAQ", fr: "FAQ Droits des Employés", ar: "أسئلة شائعة عن حقوق الموظف" },
    faqItems: {
        en: [
            { question: "What is the minimum wage in Morocco?", answer: "The SMIG (Salaire Minimum Interprofessionnel Garanti) in Morocco is set by government decree and is regularly updated. It covers all sectors and is the minimum that employers must legally pay." },
            { question: "Can my employer fire me without cause?", answer: "No. Under the Code du Travail, termination must be for serious professional misconduct or economic reasons. Wrongful dismissal entitles the employee to damages, notice period compensation, and seniority indemnity." },
            { question: "How many vacation days am I entitled to?", answer: "After 6 months of continuous service, employees are entitled to 1.5 days of paid annual leave per month of service (18 days/year). This increases with seniority." },
            { question: "What are my rights with a CDD contract?", answer: "A CDD (fixed-term contract) can only be used for temporary work. It cannot exceed 1 year (or 2 years in certain cases). If the employer continues work beyond the contract, it automatically becomes a CDI (permanent)." },
        ],
        fr: [
            { question: "Quel est le salaire minimum au Maroc ?", answer: "Le SMIG au Maroc est fixé par décret gouvernemental et régulièrement mis à jour. Il couvre tous les secteurs et représente le minimum légal que les employeurs doivent payer." },
            { question: "Mon employeur peut-il me licencier sans motif ?", answer: "Non. Selon le Code du Travail, le licenciement doit être justifié par une faute grave ou des raisons économiques. Un licenciement abusif donne droit à des dommages et indemnités." },
            { question: "Combien de jours de congé ai-je droit ?", answer: "Après 6 mois de service continu, les employés ont droit à 1,5 jour de congé payé par mois (18 jours/an), augmenté avec l'ancienneté." },
            { question: "Quels sont mes droits avec un CDD ?", answer: "Un CDD ne peut être utilisé que pour un travail temporaire et ne peut excéder 1 an (2 ans dans certains cas). Au-delà, il devient automatiquement un CDI." },
        ],
        ar: [
            { question: "ما هو الحد الأدنى للأجور في المغرب؟", answer: "يحدد الحد الأدنى للأجور (SMIG) بمرسوم حكومي ويتم تحديثه بانتظام. يغطي جميع القطاعات وهو الحد الأدنى الذي يجب على أصحاب العمل دفعه قانونياً." },
            { question: "هل يمكن لصاحب العمل فصلي بدون سبب؟", answer: "لا. وفق مدونة الشغل، يجب أن يكون الفصل بسبب خطأ مهني جسيم أو لأسباب اقتصادية. الفصل التعسفي يخول الموظف تعويضات ومهلة إخطار وتعويض الأقدمية." },
            { question: "كم يوم إجازة أحق بها؟", answer: "بعد 6 أشهر من الخدمة المتواصلة، يحق للموظف 1.5 يوم إجازة مدفوعة لكل شهر عمل (18 يوماً/سنة)، تزداد مع الأقدمية." },
            { question: "ما هي حقوقي مع عقد CDD (محدد المدة)؟", answer: "لا يمكن استخدام عقد CDD إلا للعمل المؤقت ولا يتجاوز سنة (أو سنتين في بعض الحالات). إذا استمر العمل بعد انتهاء العقد يصبح تلقائياً CDI (دائم)." },
        ],
    },
    features: {
        en: [
            { icon: "📋", title: "Contract Rights", description: "Understand CDI vs CDD contracts and your rights under each type." },
            { icon: "🛡️", title: "Wrongful Termination", description: "Know when termination is illegal and what compensation you deserve." },
            { icon: "🏖️", title: "Leave & Vacation", description: "Your rights to paid vacation, sick leave, maternity/paternity leave." },
            { icon: "💵", title: "Wage Protection", description: "Minimum wage, overtime pay, and payment schedule rights." },
            { icon: "⚕️", title: "Workplace Safety", description: "Your employer's obligations for a safe working environment." },
            { icon: "⚖️", title: "Dispute Resolution", description: "How to file labor complaints and resolve workplace disputes." },
        ],
        fr: [
            { icon: "📋", title: "Droits Contractuels", description: "Comprenez les contrats CDI vs CDD et vos droits." },
            { icon: "🛡️", title: "Licenciement Abusif", description: "Sachez quand un licenciement est illégal et vos compensations." },
            { icon: "🏖️", title: "Congés", description: "Vos droits aux congés payés, maladie, maternité/paternité." },
            { icon: "💵", title: "Protection Salariale", description: "Salaire minimum, heures supplémentaires, calendrier de paiement." },
            { icon: "⚕️", title: "Sécurité au Travail", description: "Les obligations de l'employeur pour un environnement sûr." },
            { icon: "⚖️", title: "Résolution des Litiges", description: "Comment déposer une plainte et résoudre les conflits." },
        ],
        ar: [
            { icon: "📋", title: "حقوق العقد", description: "افهم عقود CDI مقابل CDD وحقوقك في كل نوع." },
            { icon: "🛡️", title: "الفصل التعسفي", description: "اعرف متى يكون الفصل غير قانوني وما التعويض الذي تستحقه." },
            { icon: "🏖️", title: "الإجازات", description: "حقوقك في الإجازة المدفوعة والمرضية وإجازة الأمومة/الأبوة." },
            { icon: "💵", title: "حماية الأجور", description: "الحد الأدنى للأجور وساعات العمل الإضافية وجدول الدفع." },
            { icon: "⚕️", title: "السلامة في العمل", description: "التزامات صاحب العمل لتوفير بيئة عمل آمنة." },
            { icon: "⚖️", title: "حل النزاعات", description: "كيفية تقديم شكاوى العمل وحل النزاعات في مكان العمل." },
        ],
    },
    contentSections: {
        en: [
            { heading: "Understanding Your Employee Rights in Morocco", text: "Morocco's Code du Travail provides comprehensive protections for employees. From minimum wage guarantees to wrongful termination protections, understanding these rights is essential for every worker. 9anon AI helps you navigate the complex labor code to understand exactly what protections apply to your situation." },
            { heading: "Employment Contracts Under Moroccan Law", text: "The Code du Travail recognizes two main types of employment contracts: CDI (contrat à durée indéterminée) for permanent positions and CDD (contrat à durée déterminée) for temporary work. Each type carries different rights and obligations. Understanding your contract type is crucial for knowing your termination rights, benefits, and legal protections." },
        ],
        fr: [
            { heading: "Comprendre Vos Droits d'Employé au Maroc", text: "Le Code du Travail marocain offre des protections complètes. Du salaire minimum garanti à la protection contre le licenciement abusif, comprendre ces droits est essentiel. 9anon AI vous aide à naviguer le code du travail complexe." },
            { heading: "Les Contrats de Travail en Droit Marocain", text: "Le Code du Travail reconnaît deux types de contrats : CDI pour les postes permanents et CDD pour le travail temporaire. Chaque type comporte des droits et obligations différents. Comprendre votre type de contrat est crucial." },
        ],
        ar: [
            { heading: "فهم حقوقك كموظف في المغرب", text: "توفر مدونة الشغل المغربية حماية شاملة للموظفين. من ضمان الحد الأدنى للأجور إلى الحماية من الفصل التعسفي، فهم هذه الحقوق ضروري لكل عامل. يساعدك 9anon AI في التنقل في قانون الشغل المعقد لفهم الحماية التي تنطبق على وضعك." },
            { heading: "عقود العمل وفق القانون المغربي", text: "تعترف مدونة الشغل بنوعين رئيسيين من عقود العمل: CDI (عقد غير محدد المدة) للوظائف الدائمة وCDD (عقد محدد المدة) للعمل المؤقت. لكل نوع حقوق والتزامات مختلفة. فهم نوع عقدك أمر حاسم لمعرفة حقوقك." },
        ],
    },
    relatedLinks: [
        { href: "/labor-law", label: "Labor Law" },
        { href: "/tenant-rights", label: "Tenant Rights" },
        { href: "/business-legal", label: "Business Legal" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
        { href: "/contract-review", label: "Contract Review" },
    ],
    gradientFrom: "from-blue-600",
    gradientTo: "to-indigo-500",
    glowColor: "bg-blue-500/20",
};

/** Tenant Rights page — targets tenant/landlord dispute keywords */
export const tenantRightsPage: SEOPageConfig = {
    slug: "tenant-rights",
    titles: {
        en: "Tenant Rights Morocco | Rental Dispute Help - 9anon AI",
        fr: "Droits du Locataire Maroc | Litige Locatif Aide - 9anon AI",
        ar: "حقوق المستأجر في المغرب | مساعدة نزاعات الإيجار - 9anon AI",
    },
    descriptions: {
        en: "Know your tenant rights in Morocco. Free AI legal help with rental disputes, eviction protection, lease agreements, and how to file complaints against landlords.",
        fr: "Connaissez vos droits de locataire au Maroc. Aide juridique gratuite pour les litiges locatifs, protection contre l'expulsion et contrats de bail.",
        ar: "اعرف حقوقك كمستأجر في المغرب. مساعدة قانونية مجانية في نزاعات الإيجار والحماية من الطرد وعقود الكراء.",
    },
    keywords: {
        en: ["tenant rights Morocco", "how to file complaint in Morocco"],
        fr: ["litige locatif Maroc", "droits locataire Maroc"],
        ar: ["حقوق المستأجر في المغرب", "نزاع إيجاري المغرب"],
    },
    h1: { en: "Tenant Rights & Rental Law in Morocco", fr: "Droits du Locataire et Droit Locatif au Maroc", ar: "حقوق المستأجر وقانون الكراء في المغرب" },
    badge: { en: "Tenant Rights", fr: "Droits du Locataire", ar: "حقوق المستأجر" },
    subtitle: {
        en: "Protect yourself as a tenant in Morocco. Get free AI-powered legal guidance on rental agreements, eviction protection, deposit rights, and how to file complaints against landlords.",
        fr: "Protégez-vous en tant que locataire au Maroc. Guide juridique gratuit sur les contrats de bail, la protection contre l'expulsion, les dépôts de garantie et les plaintes.",
        ar: "احمِ نفسك كمستأجر في المغرب. إرشاد قانوني مجاني حول عقود الكراء والحماية من الطرد وحقوق الضمانة وكيفية تقديم شكوى.",
    },
    ctaText: { en: "Ask About Tenant Rights", fr: "Posez Votre Question Locataire", ar: "اسأل عن حقوق المستأجر" },
    faqTitle: { en: "Tenant Rights FAQ", fr: "FAQ Droits du Locataire", ar: "أسئلة شائعة عن حقوق المستأجر" },
    faqItems: {
        en: [
            { question: "Can my landlord evict me without notice?", answer: "No. Under Moroccan rental law, landlords must follow legal eviction procedures through the courts. They cannot forcibly evict tenants. A court order is required, and tenants have the right to contest eviction." },
            { question: "How do I file a complaint against my landlord?", answer: "You can file a complaint at the local tribunal (Tribunal de Première Instance). Gather evidence of the issue (photos, correspondence, witnesses) and file your claim. 9anon AI can help you understand the process." },
            { question: "What should a rental contract include?", answer: "A valid rental contract should include: tenant and landlord identities, property description, monthly rent amount, lease duration, deposit amount, maintenance responsibilities, and conditions for termination." },
            { question: "Can my landlord raise rent arbitrarily?", answer: "Rent increases in Morocco are regulated. For residential properties, increases are typically governed by the terms of the lease contract and applicable laws that may cap the percentage of increase." },
        ],
        fr: [
            { question: "Mon propriétaire peut-il m'expulser sans préavis ?", answer: "Non. Selon le droit locatif marocain, les propriétaires doivent suivre les procédures légales d'expulsion via les tribunaux. Une ordonnance du tribunal est requise." },
            { question: "Comment déposer une plainte contre mon propriétaire ?", answer: "Vous pouvez déposer une plainte au Tribunal de Première Instance local. Rassemblez les preuves et déposez votre réclamation." },
            { question: "Que doit inclure un contrat de bail ?", answer: "Un contrat valide doit inclure : identités du locataire et propriétaire, description du bien, montant du loyer, durée du bail, montant du dépôt et conditions de résiliation." },
            { question: "Mon propriétaire peut-il augmenter le loyer arbitrairement ?", answer: "Les augmentations de loyer au Maroc sont réglementées et généralement régies par les termes du contrat de bail et les lois applicables." },
        ],
        ar: [
            { question: "هل يمكن لصاحب العقار طردي بدون إشعار؟", answer: "لا. وفق قانون الكراء المغربي، يجب على الملاك اتباع الإجراءات القانونية للطرد عبر المحاكم. لا يمكنهم طرد المستأجرين قسراً. يتطلب الأمر حكماً قضائياً." },
            { question: "كيف أقدم شكوى ضد صاحب العقار؟", answer: "يمكنك تقديم شكوى في المحكمة الابتدائية المحلية. اجمع أدلة المشكلة (صور، مراسلات، شهود) وقدم مطالبتك. يمكن لـ 9anon AI مساعدتك في فهم العملية." },
            { question: "ماذا يجب أن يتضمن عقد الكراء؟", answer: "يجب أن يتضمن عقد الكراء الصحيح: هوية المستأجر والمالك، وصف العقار، مبلغ الإيجار الشهري، مدة العقد، مبلغ الضمان، ومسؤوليات الصيانة." },
            { question: "هل يمكن لصاحب العقار رفع الإيجار بشكل تعسفي؟", answer: "زيادات الإيجار في المغرب منظمة وعادة ما تحكمها شروط عقد الإيجار والقوانين المعمول بها التي قد تحدد نسبة الزيادة." },
        ],
    },
    features: {
        en: [
            { icon: "🏠", title: "Eviction Protection", description: "Know your rights and the legal process required before any eviction." },
            { icon: "📝", title: "Lease Agreements", description: "Understand what a valid rental contract must contain." },
            { icon: "💰", title: "Deposit Rights", description: "Your rights regarding security deposits and their return." },
            { icon: "🔧", title: "Maintenance Claims", description: "Who pays for what — landlord vs tenant maintenance obligations." },
            { icon: "📢", title: "Filing Complaints", description: "Step-by-step guide to filing rental complaints in Morocco." },
            { icon: "⚖️", title: "AI Legal Guidance", description: "Get instant answers about your tenant rights from 9anon AI." },
        ],
        fr: [
            { icon: "🏠", title: "Protection Contre l'Expulsion", description: "Connaissez vos droits et le processus légal requis." },
            { icon: "📝", title: "Contrats de Bail", description: "Comprenez ce qu'un contrat valide doit contenir." },
            { icon: "💰", title: "Droits de Dépôt", description: "Vos droits concernant les dépôts de garantie." },
            { icon: "🔧", title: "Réclamations d'Entretien", description: "Qui paie quoi — obligations du propriétaire vs locataire." },
            { icon: "📢", title: "Déposer une Plainte", description: "Guide étape par étape pour les plaintes locatives." },
            { icon: "⚖️", title: "Guidance Juridique IA", description: "Réponses instantanées sur vos droits de locataire." },
        ],
        ar: [
            { icon: "🏠", title: "الحماية من الطرد", description: "اعرف حقوقك والإجراء القانوني المطلوب قبل أي طرد." },
            { icon: "📝", title: "عقود الكراء", description: "افهم ما يجب أن يتضمنه عقد الكراء الصحيح." },
            { icon: "💰", title: "حقوق الضمانة", description: "حقوقك في مبلغ الضمان واسترداده." },
            { icon: "🔧", title: "مطالبات الصيانة", description: "من يدفع ماذا — التزامات المالك مقابل المستأجر." },
            { icon: "📢", title: "تقديم شكوى", description: "دليل خطوة بخطوة لتقديم شكاوى الكراء في المغرب." },
            { icon: "⚖️", title: "إرشاد قانوني ذكي", description: "إجابات فورية عن حقوقك كمستأجر من 9anon AI." },
        ],
    },
    contentSections: {
        en: [
            { heading: "Understanding Tenant Rights in Morocco", text: "Moroccan rental law provides important protections for tenants. Whether you're renting a residential apartment or commercial space, understanding your rights can protect you from unfair practices, illegal eviction, and rent disputes. 9anon AI helps you navigate these complex regulations instantly." },
            { heading: "How to Handle Rental Disputes", text: "If you have a dispute with your landlord, Moroccan law provides several avenues for resolution. You can attempt direct negotiation, engage a mediator, or file a complaint with the local tribunal. Documentation is key — keep copies of your lease, payment receipts, and any correspondence with your landlord." },
        ],
        fr: [
            { heading: "Comprendre les Droits du Locataire au Maroc", text: "Le droit locatif marocain offre des protections importantes. Que vous louiez un appartement résidentiel ou un espace commercial, comprendre vos droits peut vous protéger contre les pratiques abusives et l'expulsion illégale." },
            { heading: "Comment Gérer les Litiges Locatifs", text: "En cas de litige avec votre propriétaire, le droit marocain offre plusieurs voies de résolution : négociation directe, médiation, ou plainte au tribunal. La documentation est essentielle." },
        ],
        ar: [
            { heading: "فهم حقوق المستأجر في المغرب", text: "يوفر قانون الكراء المغربي حماية مهمة للمستأجرين. سواء كنت تستأجر شقة سكنية أو مساحة تجارية، فهم حقوقك يحميك من الممارسات غير العادلة والطرد غير القانوني والنزاعات الإيجارية." },
            { heading: "كيفية التعامل مع نزاعات الكراء", text: "إذا كان لديك نزاع مع صاحب العقار، يوفر القانون المغربي عدة طرق للحل: التفاوض المباشر أو الوساطة أو تقديم شكوى في المحكمة. التوثيق مهم جداً — احتفظ بنسخ من عقدك ووصولات الدفع." },
        ],
    },
    relatedLinks: [
        { href: "/employee-rights", label: "Employee Rights" },
        { href: "/divorce-law", label: "Divorce Law" },
        { href: "/legal-chatbot", label: "Legal Chatbot" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
        { href: "/family-law", label: "Family Law" },
    ],
    gradientFrom: "from-amber-600",
    gradientTo: "to-orange-500",
    glowColor: "bg-amber-500/20",
};
