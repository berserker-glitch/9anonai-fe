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
};

/** Family Law / Moudawana hub page — targets مدونة الأسرة / droit de la famille Maroc */
export const familyLawPage: SEOPageConfig = {
    slug: "family-law",
    titles: {
        ar: "مدونة الأسرة في المغرب | الزواج والطلاق والحضانة والإرث - 9anon AI",
        fr: "Moudawana Maroc | Mariage, Divorce, Garde & Succession - 9anon AI",
        en: "Moroccan Family Law | Moudawana Guide — Marriage, Divorce & Custody - 9anon AI",
    },
    descriptions: {
        ar: "دليل شامل حول مدونة الأسرة المغربية: الزواج، الطلاق، حضانة الأطفال، النفقة، والإرث. احصل على مساعدة قانونية خاصة ومجانية بالذكاء الاصطناعي باللغة العربية والفرنسية والإنجليزية.",
        fr: "Guide complet sur la Moudawana marocaine: mariage, divorce, garde des enfants, pension alimentaire et succession. Aide juridique privée et gratuite par IA en arabe, français et anglais.",
        en: "Complete guide to Morocco's Family Code (Moudawana): marriage, divorce, child custody, alimony, and inheritance. Free private AI legal help in Arabic, French, and English.",
    },
    keywords: {
        ar: ["مدونة الأسرة المغربية", "الطلاق في المغرب", "الزواج المغرب", "حضانة الأطفال المغرب", "الإرث المغرب", "النفقة المغرب", "قانون الأسرة المغربي 2026"],
        fr: ["moudawana Maroc", "divorce Maroc", "mariage Maroc", "garde enfants Maroc", "droit successoral Maroc", "pension alimentaire Maroc", "droit de la famille marocain"],
        en: ["moroccan family law", "moudawana", "divorce morocco", "marriage morocco", "child custody morocco", "inheritance law morocco", "alimony morocco"],
    },
    h1: {
        ar: "مدونة الأسرة في المغرب: دليلك القانوني الشامل",
        fr: "La Moudawana au Maroc : Guide Juridique Complet",
        en: "Moroccan Family Law (Moudawana): Your Complete Legal Guide",
    },
    badge: { ar: "مدونة الأسرة", fr: "Moudawana", en: "Family Law" },
    subtitle: {
        ar: "مدونة الأسرة (Moudawana) تُنظّم الزواج والطلاق والحضانة والإرث في المغرب. احصل على إجابات قانونية دقيقة وسرية حول وضعك الأسري بالذكاء الاصطناعي — مجاناً.",
        fr: "La Moudawana régit le mariage, le divorce, la garde et la succession au Maroc. Obtenez des réponses juridiques précises et confidentielles sur votre situation familiale par IA — gratuitement.",
        en: "The Moudawana governs marriage, divorce, custody, and inheritance in Morocco. Get accurate, confidential AI legal answers about your family situation — for free.",
    },
    ctaText: { ar: "اسأل عن مدونة الأسرة مجاناً", fr: "Posez Votre Question Familiale", en: "Ask About Family Law Free" },
    faqTitle: { ar: "أسئلة شائعة حول مدونة الأسرة في المغرب", fr: "FAQ Moudawana Maroc", en: "Moroccan Family Law FAQ" },
    faqItems: {
        ar: [
            { question: "ما هي مدونة الأسرة (Moudawana)؟", answer: "مدونة الأسرة (Moudawana) هي القانون المغربي الذي يُنظّم علاقات الأسرة: الزواج، الطلاق، الحضانة، الإرث، والنفقة. خضعت لإصلاح جذري سنة 2004 في عهد الملك محمد السادس منحت المرأة حقوقاً أوسع وجعلت المسؤولية الزوجية مشتركة بين الزوجين." },
            { question: "كيف يتم الطلاق في المغرب؟", answer: "يُجيز القانون المغربي أنواعاً من الطلاق: الطلاق بالاتفاق المتبادل (الخلع)، والطلاق القضائي للشقاق الذي يحق للمرأة المطالبة به، والطلاق لأسباب محددة كالضرر أو الغياب. يستلزم أي طلاق المرور أمام القضاء مع محاولات للصلح." },
            { question: "من يحق له الحضانة في المغرب؟", answer: "تُعطى الأولوية في الحضانة للأم ثم الأب ثم الجدة لأم. تراعي المحكمة دائماً مصلحة الطفل الفضلى، وقد تُراجع الحضانة عند تغيّر الظروف كزواج الحاضن من جديد أو انتقاله للخارج." },
            { question: "ما هو سن الزواج القانوني في المغرب؟", answer: "حدد القانون المغربي سن الزواج بـ18 سنة للذكور والإناث على حد سواء. بيد أن القاضي يمكنه الترخيص بزواج القاصر في حالات استثنائية مبررة، وهو مقتضى لا يزال موضع نقاش إصلاحي." },
            { question: "هل يمكن للمرأة طلب الطلاق في المغرب؟", answer: "نعم. منذ إصلاح 2004، للمرأة الحق في طلب الطلاق القضائي للشقاق دون الحاجة لموافقة الزوج. كما يمكنها طلب الخلع أو الطلاق لأسباب محددة كالضرر أو غياب الزوج أو الإخلال بالإنفاق." },
        ],
        fr: [
            { question: "Qu'est-ce que la Moudawana ?", answer: "La Moudawana est le Code de la Famille marocain qui régit le mariage, le divorce, la garde des enfants, la succession et la pension alimentaire. Elle a été réformée en profondeur en 2004 sous le Roi Mohammed VI, accordant aux femmes de plus grands droits et instituant la responsabilité conjugale partagée." },
            { question: "Comment se déroule le divorce au Maroc ?", answer: "Le droit marocain reconnaît plusieurs types de divorce: le divorce par consentement mutuel (khol'), le divorce judiciaire pour discorde (shiqaq) que la femme peut demander, et le divorce pour causes spécifiques. Tout divorce nécessite un passage devant le tribunal avec tentative de conciliation." },
            { question: "Comment est décidée la garde des enfants au Maroc ?", answer: "La priorité de garde revient à la mère, puis au père, puis à la grand-mère maternelle. Le tribunal tient toujours compte de l'intérêt supérieur de l'enfant et peut réviser la garde en cas de changement de situation." },
            { question: "La femme peut-elle demander le divorce au Maroc ?", answer: "Oui. Depuis la réforme de 2004, la femme peut demander le divorce judiciaire pour discorde (shiqaq) sans le consentement du mari, le khol' ou le divorce pour causes légales spécifiques comme les préjudices ou l'abandon." },
        ],
        en: [
            { question: "What is the Moudawana?", answer: "The Moudawana is Morocco's Family Code governing marriage, divorce, child custody, inheritance, and alimony. It was significantly reformed in 2004 under King Mohammed VI, granting women greater rights and establishing joint marital responsibility." },
            { question: "How does divorce work in Morocco?", answer: "Moroccan law recognizes several divorce types: mutual consent divorce (khol'), judicial divorce for discord (shiqaq) which women can request, and divorce for specific causes. All divorces require court proceedings with reconciliation attempts." },
            { question: "How is child custody decided in Morocco?", answer: "Custody priority goes to the mother, then the father, then the maternal grandmother. The court always considers the child's best interest and may revise custody when circumstances change." },
            { question: "Can women initiate divorce in Morocco?", answer: "Yes. Since the 2004 reform, women can request judicial divorce for discord (shiqaq) without the husband's consent, as well as khol' or divorce for specific legal causes such as harm or non-maintenance." },
        ],
    },
    features: {
        ar: [
            { icon: "💍", title: "الزواج في المغرب", description: "الشروط القانونية لعقد الزواج وإجراءاته أمام القضاء المغربي." },
            { icon: "⚖️", title: "أنواع الطلاق", description: "الطلاق بالاتفاق، الشقاق، الخلع — الفروق والإجراءات القانونية." },
            { icon: "👶", title: "حضانة الأطفال", description: "معايير الحضانة وحقوق الزيارة وأثر الأحوال الطارئة." },
            { icon: "💰", title: "النفقة والمؤخر", description: "حق الزوجة والأطفال في النفقة وكيفية المطالبة بها." },
            { icon: "📜", title: "الإرث في مدونة الأسرة", description: "أسس توزيع التركة وفق أحكام الفرائض في القانون المغربي." },
            { icon: "🤖", title: "استشارة أسرية مجانية", description: "اسأل 9anon AI عن وضعيتك الأسرية بسرية تامة وأجب على أسئلتك فوراً." },
        ],
        fr: [
            { icon: "💍", title: "Mariage au Maroc", description: "Conditions légales de l'acte de mariage et procédures devant les tribunaux marocains." },
            { icon: "⚖️", title: "Types de Divorce", description: "Divorce par consentement, shiqaq, khol' — différences et procédures légales." },
            { icon: "👶", title: "Garde des Enfants", description: "Critères de garde, droits de visite et impact des changements de situation." },
            { icon: "💰", title: "Pension Alimentaire", description: "Droit à la pension alimentaire pour l'épouse et les enfants et comment la demander." },
            { icon: "📜", title: "Succession et Héritage", description: "Bases de distribution de l'héritage selon le droit des successions marocain." },
            { icon: "🤖", title: "Consultation Familiale Gratuite", description: "Posez à 9anon AI vos questions familiales en toute confidentialité." },
        ],
        en: [
            { icon: "💍", title: "Marriage in Morocco", description: "Legal requirements for marriage contracts and court proceedings in Morocco." },
            { icon: "⚖️", title: "Divorce Types", description: "Mutual consent, shiqaq, khol' divorce — differences and legal procedures." },
            { icon: "👶", title: "Child Custody", description: "Custody criteria, visitation rights, and the impact of changing circumstances." },
            { icon: "💰", title: "Alimony & Maintenance", description: "Wife and children's right to financial support and how to claim it." },
            { icon: "📜", title: "Inheritance Law", description: "Basis for distributing the estate under Moroccan inheritance law (faraid)." },
            { icon: "🤖", title: "Free Family Law Consultation", description: "Ask 9anon AI about your family situation in complete confidentiality." },
        ],
    },
    contentSections: {
        ar: [
            { heading: "مدونة الأسرة 2004: إصلاح تاريخي في القانون المغربي", text: "أحدثت مدونة الأسرة المُعدَّلة عام 2004 تحولاً جذرياً في منظومة القانون الأسري بالمغرب: رُفع سن الزواج إلى 18 سنة، وأُلغي نظام الولاية المطلقة للمرأة البالغة، ومُنحت المرأة الحق في الطلاق القضائي، وباتت المسؤولية الزوجية مشتركة بين الزوجين، كما أُولي اهتمام أكبر بمصلحة الطفل في جميع القرارات القضائية." },
            { heading: "المجالات الرئيسية لمدونة الأسرة", text: "تُنظّم مدونة الأسرة كل المحطات الكبرى في حياة الأسرة المغربية: من عقد الزواج بشروطه ووثائقه، مروراً بإجراءات الطلاق ومحاولات الصلح الإلزامية، إلى نظام الحضانة الذي يضع مصلحة الطفل أولاً، وانتهاءً بتوزيع التركة وفق أحكام الفرائض الشرعية. 9anon AI يُرشدك في هذه المسارات فوراً وبسرية تامة." },
        ],
        fr: [
            { heading: "La Moudawana 2004 : Une Réforme Historique du Droit Marocain", text: "La réforme de la Moudawana en 2004 a transformé le droit de la famille marocain: âge minimum de mariage porté à 18 ans, suppression de la tutelle obligatoire pour les femmes adultes, droit au divorce judiciaire pour les femmes, responsabilité conjugale partagée et intérêt supérieur de l'enfant au centre des décisions judiciaires." },
            { heading: "Domaines Clés de la Moudawana", text: "La Moudawana régit toutes les étapes familiales importantes: contrat de mariage et formalités, procédures de divorce avec tentatives de conciliation obligatoires, système de garde plaçant l'intérêt de l'enfant en premier, et distribution successorale selon les règles du droit islamique codifié." },
        ],
        en: [
            { heading: "The 2004 Moudawana Reform: A Historic Milestone in Moroccan Law", text: "The 2004 Moudawana reform transformed Moroccan family law: minimum marriage age raised to 18, mandatory guardianship for adult women abolished, women's right to judicial divorce established, joint marital responsibility introduced, and the child's best interest placed at the center of all judicial decisions." },
            { heading: "Key Areas of the Moudawana", text: "The Moudawana governs every major family milestone: marriage contracts and formalities, divorce procedures with mandatory reconciliation attempts, a custody system prioritizing the child's welfare, and estate distribution under codified Islamic inheritance rules. 9anon AI guides you through all these processes instantly and confidentially." },
        ],
    },
    relatedLinks: [
        { href: "/divorce-law", label: "Divorce Law" },
        { href: "/inheritance-law", label: "Inheritance Law" },
        { href: "/labor-law", label: "Labor Law" },
        { href: "/tenant-rights", label: "Tenant Rights" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
    ],
    gradientFrom: "from-emerald-600",
    gradientTo: "to-teal-600",
    glowColor: "emerald",
};

/** Labor Law / Code du Travail hub page — targets مدونة الشغل / code du travail Maroc */
export const laborLawPage: SEOPageConfig = {
    slug: "labor-law",
    titles: {
        ar: "مدونة الشغل في المغرب | حقوق العامل والطرد والعقود - 9anon AI",
        fr: "Code du Travail Maroc | CDI/CDD, Licenciement & Droits Salariés - 9anon AI",
        en: "Morocco Labor Law | Code du Travail — Contracts, Termination & Rights - 9anon AI",
    },
    descriptions: {
        ar: "دليل شامل حول مدونة الشغل المغربية: عقود CDI/CDD، الطرد التعسفي، الحد الأدنى للأجور SMIG، الإجازات السنوية، وحقوق العمال. استشارة قانونية مجانية بالذكاء الاصطناعي.",
        fr: "Guide complet sur le Code du Travail marocain: contrats CDI/CDD, licenciement abusif, SMIG, congés annuels et droits des travailleurs. Consultation juridique gratuite par IA.",
        en: "Complete guide to Morocco's Code du Travail: CDI/CDD contracts, wrongful termination, SMIG, annual leave, and worker rights. Free AI legal consultation.",
    },
    keywords: {
        ar: ["مدونة الشغل المغربية", "الطرد التعسفي المغرب", "عقد الشغل CDI CDD", "الحد الأدنى للأجر SMIG", "حقوق العامل المغرب", "الإجازة السنوية المغرب", "قانون العمل المغربي 2026"],
        fr: ["code du travail Maroc", "licenciement abusif Maroc", "CDI CDD Maroc", "SMIG Maroc", "droits salariés Maroc", "congés annuels Maroc", "droit du travail marocain"],
        en: ["morocco labor law", "wrongful termination morocco", "CDI CDD morocco", "SMIG morocco", "employee rights morocco", "annual leave morocco", "code du travail morocco"],
    },
    h1: {
        ar: "مدونة الشغل في المغرب: حقوقك كعامل أو مشغّل",
        fr: "Le Code du Travail au Maroc : Vos Droits en Tant que Salarié ou Employeur",
        en: "Morocco Labor Law (Code du Travail): Your Rights as Worker or Employer",
    },
    badge: { ar: "مدونة الشغل", fr: "Code du Travail", en: "Labor Law" },
    subtitle: {
        ar: "مدونة الشغل المغربية تحمي العمال من الطرد التعسفي وتضمن الأجر الدنيا وشروط العمل اللائقة. تعرف على حقوقك وإجراءاتك القانونية بالذكاء الاصطناعي — مجاناً.",
        fr: "Le Code du Travail marocain protège les salariés contre le licenciement abusif et garantit le salaire minimum et des conditions de travail décentes. Connaissez vos droits par IA — gratuitement.",
        en: "Morocco's Code du Travail protects workers from wrongful termination and guarantees minimum wages and decent working conditions. Know your rights via AI — for free.",
    },
    ctaText: { ar: "اسأل عن مدونة الشغل مجاناً", fr: "Posez Votre Question sur le Travail", en: "Ask About Labor Law Free" },
    faqTitle: { ar: "أسئلة شائعة حول مدونة الشغل في المغرب", fr: "FAQ Code du Travail Maroc", en: "Morocco Labor Law FAQ" },
    faqItems: {
        ar: [
            { question: "ما الفرق بين عقد CDI وCDD في المغرب؟", answer: "عقد CDI (عقد شغل غير محدد المدة) هو العقد الأساسي الذي يُوفر الاستقرار الوظيفي. عقد CDD (محدد المدة) يُقصر على المهام المؤقتة وتجديدات محدودة، وتحوّل تلقائياً إلى CDI إذا استمر العامل في العمل بعد انتهاء مدته." },
            { question: "ما هي حقوقي عند الطرد التعسفي في المغرب؟", answer: "في حالة الطرد التعسفي (licenciement abusif)، يحق للعامل الحصول على: تعويض عن فترة الإشعار، التعويض عن الفصل بحسب الأقدمية، وتعويض إضافي يُقدره القضاء. يمكن اللجوء إلى مفتش الشغل أو المحكمة الاجتماعية." },
            { question: "كم عدد أيام الإجازة السنوية في المغرب؟", answer: "يستحق العامل بعد 6 أشهر من الخدمة المتواصلة 1.5 يوم عمل عن كل شهر خدمة (18 يوماً في السنة). تزيد هذه المدة بيوم ونصف لكل 5 سنوات من الأقدمية. الشباب دون 18 سنة يستحقون يومين في الشهر." },
            { question: "ما هو الحد الأدنى للأجر (SMIG) في المغرب؟", answer: "الحد الأدنى للأجر (SMIG) يُحدد بمرسوم حكومي ويُراجع دورياً. يسري على جميع القطاعات. العمال الزراعيون لهم حد أدنى خاص (SMAG). أي مشغّل يدفع أقل من SMIG يتعرض للمتابعة القانونية." },
            { question: "ماذا يحق لي خلال فترة الإشعار بالفصل؟", answer: "خلال فترة الإشعار (préavis)، يحق للعامل بساعتين يومياً (أو 8 ساعات أسبوعياً) للبحث عن عمل جديد. يجب على المشغّل الاستمرار في دفع الأجر الكامل. عدم احترام الإشعار يُلزم المشغّل بدفع التعويض المقابل." },
        ],
        fr: [
            { question: "Quelle est la différence entre CDI et CDD au Maroc ?", answer: "Le CDI (Contrat à Durée Indéterminée) assure la stabilité de l'emploi. Le CDD (Contrat à Durée Déterminée) est limité aux missions temporaires avec renouvellements limités et se transforme automatiquement en CDI si le salarié continue après l'échéance." },
            { question: "Quels sont mes droits en cas de licenciement abusif au Maroc ?", answer: "En cas de licenciement abusif, le salarié a droit à: une indemnité de préavis, une indemnité de licenciement selon l'ancienneté, et des dommages-intérêts supplémentaires fixés par le tribunal. Recours possible auprès de l'Inspecteur du Travail ou du tribunal social." },
            { question: "Combien de jours de congés annuels au Maroc ?", answer: "Après 6 mois de service continu: 1,5 jour ouvrable par mois (18 jours/an), augmentant d'1,5 jour par tranche de 5 ans d'ancienneté. Les moins de 18 ans bénéficient de 2 jours par mois." },
            { question: "Quels sont mes droits pendant le préavis ?", answer: "Pendant le préavis, le salarié a droit à 2 heures par jour (ou 8 heures par semaine) pour chercher un emploi. L'employeur doit continuer à payer le plein salaire. Non-respect du préavis oblige l'employeur à verser l'indemnité correspondante." },
        ],
        en: [
            { question: "What is the difference between CDI and CDD in Morocco?", answer: "CDI (permanent contract) provides job stability. CDD (fixed-term contract) is limited to temporary roles with limited renewals and automatically converts to CDI if the employee continues working after expiry." },
            { question: "What are my rights if wrongfully terminated in Morocco?", answer: "For wrongful dismissal (licenciement abusif): the employee is entitled to notice period indemnity, severance pay based on seniority, and additional damages set by the court. Appeals can be made to the Labor Inspector or Social Tribunal." },
            { question: "How many annual leave days am I entitled to in Morocco?", answer: "After 6 months of continuous service: 1.5 working days per month (18 days/year), increasing by 1.5 days per 5 years of seniority. Workers under 18 get 2 days per month." },
            { question: "What are my rights during the notice period?", answer: "During the notice period (préavis), the employee is entitled to 2 hours off daily (or 8 hours weekly) to seek new employment. The employer must continue paying full salary. Failure to give notice requires the employer to pay the corresponding indemnity." },
        ],
    },
    features: {
        ar: [
            { icon: "📄", title: "عقود الشغل CDI/CDD", description: "الفرق بين العقد المحدد وغير المحدد المدة وحالات التحويل التلقائي." },
            { icon: "🚫", title: "الطرد التعسفي", description: "حقوقك عند الفصل التعسفي: التعويضات والإجراءات القضائية." },
            { icon: "💵", title: "الحد الأدنى للأجر SMIG", description: "قيمة SMIG الحالية وكيفية المطالبة به عند مخالفته." },
            { icon: "🏖️", title: "الإجازات والتعويضات", description: "حقوق الإجازة السنوية وتعويضات إنهاء العقد." },
            { icon: "👷", title: "حقوق الصحة والسلامة", description: "التزامات المشغّل بتوفير بيئة عمل آمنة والتعويض عن حوادث الشغل." },
            { icon: "🤖", title: "استشارة شغلية مجانية", description: "اسأل 9anon AI عن وضعيتك المهنية واحصل على إجابة قانونية فورية." },
        ],
        fr: [
            { icon: "📄", title: "Contrats CDI/CDD", description: "Différences entre contrats à durée déterminée et indéterminée et cas de conversion automatique." },
            { icon: "🚫", title: "Licenciement Abusif", description: "Vos droits en cas de licenciement injustifié: indemnités et procédures judiciaires." },
            { icon: "💵", title: "Salaire Minimum SMIG", description: "Valeur actuelle du SMIG et comment le réclamer en cas de violation." },
            { icon: "🏖️", title: "Congés et Indemnités", description: "Droits aux congés annuels et indemnités de rupture de contrat." },
            { icon: "👷", title: "Santé et Sécurité au Travail", description: "Obligations de l'employeur et indemnisation des accidents du travail." },
            { icon: "🤖", title: "Consultation Travail Gratuite", description: "Posez à 9anon AI votre question professionnelle pour une réponse juridique instantanée." },
        ],
        en: [
            { icon: "📄", title: "CDI/CDD Contracts", description: "Differences between fixed and permanent contracts and automatic conversion cases." },
            { icon: "🚫", title: "Wrongful Termination", description: "Your rights when unjustly dismissed: indemnities and court procedures." },
            { icon: "💵", title: "Minimum Wage SMIG", description: "Current SMIG value and how to claim it when violated." },
            { icon: "🏖️", title: "Leave & Indemnities", description: "Annual leave rights and contract termination indemnities." },
            { icon: "👷", title: "Occupational Health & Safety", description: "Employer obligations and compensation for workplace accidents." },
            { icon: "🤖", title: "Free Labor Law Consultation", description: "Ask 9anon AI your professional question and get an instant legal answer." },
        ],
    },
    contentSections: {
        ar: [
            { heading: "مدونة الشغل المغربية: حماية شاملة للعمال", text: "صدرت مدونة الشغل المغربية سنة 2003 لتوحيد وتحديث تشريع العمل. تُرسي الحماية من الطرد التعسفي، وتحدد ساعات العمل القصوى (44 ساعة أسبوعياً)، وتضمن الحد الأدنى للأجر، وتُلزم بالتغطية الاجتماعية (CNSS). الشركات ملزمة بتطبيق هذه الأحكام تحت طائلة عقوبات قانونية." },
            { heading: "التفتيش على الشغل: ضمانة التطبيق", text: "يُشكّل مفتشو الشغل (Inspecteurs du Travail) الذراع التنفيذي لمدونة الشغل. يحق للعامل تقديم شكوى لمفتشية الشغل المحلية عند أي خرق. تُحاول المفتشية أولاً الوساطة بين الطرفين قبل إحالة الملف إلى المحكمة الاجتماعية." },
        ],
        fr: [
            { heading: "Le Code du Travail Marocain : Une Protection Complète pour les Salariés", text: "Promulgué en 2003, le Code du Travail marocain unifie et modernise le droit du travail. Il instaure la protection contre le licenciement abusif, fixe les heures de travail maximales (44h/semaine), garantit le salaire minimum, et impose la couverture sociale (CNSS). Les entreprises sont tenues de respecter ces dispositions sous peine de sanctions." },
            { heading: "L'Inspection du Travail : Garant de l'Application", text: "Les Inspecteurs du Travail constituent le bras exécutif du Code du Travail. Le salarié peut déposer une plainte auprès de l'inspection du travail locale. L'inspection tente d'abord une médiation avant de transmettre le dossier au tribunal social." },
        ],
        en: [
            { heading: "Morocco's Code du Travail: Comprehensive Worker Protection", text: "Enacted in 2003, Morocco's Code du Travail unifies and modernizes labor law. It establishes protection against wrongful termination, sets maximum working hours (44h/week), guarantees minimum wages, and mandates CNSS social security coverage. Companies must comply or face legal penalties." },
            { heading: "Labor Inspection: Enforcing the Law", text: "Labor Inspectors (Inspecteurs du Travail) are the enforcement arm of the Code du Travail. Workers can file complaints with the local labor inspectorate. The inspection first attempts mediation before referring cases to the Social Tribunal." },
        ],
    },
    relatedLinks: [
        { href: "/employee-rights", label: "Employee Rights" },
        { href: "/family-law", label: "Family Law" },
        { href: "/contract-review", label: "Contract Review" },
        { href: "/business-legal", label: "Business Legal" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
    ],
    gradientFrom: "from-blue-600",
    gradientTo: "to-cyan-600",
    glowColor: "blue",
};

/** Traffic Law / Code de la Route hub page — targets مدونة السير / code de la route Maroc */
export const trafficLawPage: SEOPageConfig = {
    slug: "traffic-law",
    titles: {
        ar: "مدونة السير في المغرب | المخالفات والغرامات وحوادث السير - 9anon AI",
        fr: "Code de la Route Maroc | Amendes, Accidents & Permis - 9anon AI",
        en: "Morocco Traffic Law | Code de la Route — Fines, Accidents & Driving Rights - 9anon AI",
    },
    descriptions: {
        ar: "دليل شامل حول مدونة السير المغربية: الغرامات والمخالفات، سحب الرخصة، حوادث السير وإجراءاتها، التأمين الإلزامي، والحالات السكر خلف المقود. استشارة مجانية بالذكاء الاصطناعي.",
        fr: "Guide complet sur le Code de la Route marocain: amendes, infractions, suspension du permis, accidents de la route, assurance obligatoire et conduite en état d'ivresse. Consultation gratuite.",
        en: "Complete guide to Morocco's Code de la Route: fines, violations, license suspension, road accidents, mandatory insurance, and drunk driving. Free AI legal consultation.",
    },
    keywords: {
        ar: ["مدونة السير المغربية", "غرامات السير المغرب", "مخالفات المرور المغرب", "حوادث السير المغرب", "رخصة السياقة المغرب", "التأمين على السيارات المغرب", "السياقة في حالة سكر المغرب"],
        fr: ["code de la route Maroc", "amendes routières Maroc", "infractions Maroc", "accidents de la route Maroc", "permis de conduire Maroc", "assurance auto Maroc", "conduite en état d'ivresse Maroc"],
        en: ["morocco traffic law", "traffic fines morocco", "road violations morocco", "road accidents morocco", "driving license morocco", "car insurance morocco", "drunk driving morocco"],
    },
    h1: {
        ar: "مدونة السير في المغرب: دليلك القانوني الشامل",
        fr: "Le Code de la Route au Maroc : Guide Juridique Complet",
        en: "Morocco Traffic Law (Code de la Route): Your Complete Legal Guide",
    },
    badge: { ar: "مدونة السير", fr: "Code de la Route", en: "Traffic Law" },
    subtitle: {
        ar: "تلقيت غرامة؟ تعرضت لحادث؟ مشكلة في رخصة السياقة؟ 9anon AI يُجيبك فوراً على أسئلة مدونة السير المغربية باللغة العربية والفرنسية والإنجليزية.",
        fr: "Reçu une amende? Accident de la route? Problème de permis? 9anon AI répond instantanément à vos questions sur le Code de la Route marocain en arabe, français et anglais.",
        en: "Got a fine? Had an accident? License problem? 9anon AI answers your Morocco traffic law questions instantly in Arabic, French, and English.",
    },
    ctaText: { ar: "اسأل عن مدونة السير مجاناً", fr: "Posez Votre Question sur la Route", en: "Ask About Traffic Law Free" },
    faqTitle: { ar: "أسئلة شائعة حول مدونة السير في المغرب", fr: "FAQ Code de la Route Maroc", en: "Morocco Traffic Law FAQ" },
    faqItems: {
        ar: [
            { question: "ما هي أشهر غرامات السير في المغرب؟", answer: "أبرز غرامات السير: تجاوز السرعة (300-700 درهم حسب الزيادة)، احمرار الإشارة (700 درهم)، عدم ربط حزام الأمان (300 درهم)، استخدام الهاتف أثناء القيادة (300-700 درهم)، القيادة في حالة سكر (حتى 5000 درهم + سحب الرخصة). تتضاعف الغرامات عند التكرار." },
            { question: "ماذا يجب أن أفعل بعد حادثة السير في المغرب؟", answer: "بعد الحادثة: تأمين مكان الحادث، تبادل وثائق التأمين، ملء وثيقة الحادثة المتفق عليها (constat amiable)، استدعاء المساعدة عند الإصابات (15 أو 150)، تصوير الأضرار، وجمع بيانات الشهود. التبليغ للتأمين خلال 5 أيام." },
            { question: "كيف يعمل نظام النقاط في رخصة السياقة المغربية؟", answer: "تنطلق رخصة السياقة المغربية برصيد نقاط يتناقص مع المخالفات. عند استنفاد النقاط تُسحب الرخصة. يمكن استرجاع النقاط بعد فترة سلوك سليم أو إتمام دورات تكوينية في السلامة الطرقية." },
            { question: "هل يمكنني الطعن في غرامة السير في المغرب؟", answer: "نعم، يحق لك الاعتراض على الغرامة خلال 30 يوماً من التبليغ. تُقدم شكوى مكتوبة للمحكمة المختصة أو الحضور شخصياً. أدلة مثل تسجيلات الكاميرا أو شهادات الشهود تُعزز موقفك." },
            { question: "ما عقوبة القيادة بدون تأمين في المغرب؟", answer: "القيادة بدون تأمين مخالفة جسيمة: غرامة من 3000 إلى 10000 درهم، حجز السيارة، وقد تصل إلى الحبس. المُتسبب في حادثة بدون تأمين يتحمل تعويض الأضرار شخصياً." },
        ],
        fr: [
            { question: "Quelles sont les amendes les plus fréquentes au Maroc ?", answer: "Les amendes courantes: excès de vitesse (300-700 MAD selon le dépassement), griller un feu rouge (700 MAD), défaut de ceinture (300 MAD), téléphone au volant (300-700 MAD), conduite en état d'ivresse (jusqu'à 5 000 MAD + suspension). Les infractions répétées entraînent le doublement des amendes." },
            { question: "Que faire après un accident de la route au Maroc ?", answer: "Après l'accident: sécuriser les lieux, échanger les documents d'assurance, remplir le constat amiable, appeler les secours en cas de blessés (15 ou 150), photographier les dégâts, collecter les témoignages. Déclarer à l'assurance dans les 5 jours." },
            { question: "Puis-je contester une amende au Maroc ?", answer: "Oui, vous pouvez contester dans les 30 jours suivant la notification. Déposez une réclamation écrite au tribunal compétent ou comparaissez en personne. Les preuves (dashcam, témoins) renforcent votre dossier." },
            { question: "Quelles sont les sanctions pour conduite sans assurance au Maroc ?", answer: "Conduite sans assurance: amendes de 3 000 à 10 000 MAD, mise en fourrière, et risque d'emprisonnement. En cas d'accident, le conducteur non assuré est personnellement responsable de tous les dommages." },
        ],
        en: [
            { question: "What are the most common traffic fines in Morocco?", answer: "Common fines: speeding (300-700 MAD depending on excess), running a red light (700 MAD), no seatbelt (300 MAD), phone while driving (300-700 MAD), drunk driving (up to 5,000 MAD + license suspension). Repeat offenses carry doubled fines." },
            { question: "What should I do after a traffic accident in Morocco?", answer: "After an accident: secure the scene, exchange insurance documents, complete the accident report (constat amiable), call emergency services for injuries (15 or 150), photograph damage, collect witness information. Report to insurance within 5 days." },
            { question: "Can I dispute a traffic fine in Morocco?", answer: "Yes, you can contest within 30 days of notification. Submit a written complaint to the relevant tribunal or appear in person. Evidence like dashcam footage or witness statements strengthens your case." },
            { question: "What are the penalties for driving without insurance in Morocco?", answer: "Driving without insurance: fines of 3,000-10,000 MAD, vehicle impoundment, potential imprisonment. If an uninsured driver causes an accident, they are personally liable for all damages." },
        ],
    },
    features: {
        ar: [
            { icon: "🚦", title: "الغرامات والمخالفات", description: "جدول كامل بغرامات السير في المغرب وكيفية الاعتراض عليها." },
            { icon: "🚗", title: "حوادث السير", description: "إجراءات ما بعد الحادثة: constat amiable، التأمين، والتعويضات." },
            { icon: "🔑", title: "رخصة السياقة ونقاطها", description: "نظام النقاط وسحب الرخصة وكيفية استعادتها." },
            { icon: "🛡️", title: "التأمين الإلزامي", description: "شروط التأمين الإلزامي والتبعات القانونية عند غيابه." },
            { icon: "🍺", title: "القيادة في حالة سكر", description: "عقوبات القيادة في حالة سكر والنفوخ في جهاز الكحول." },
            { icon: "🤖", title: "استشارة مرورية مجانية", description: "اسأل 9anon AI عن وضعيتك القانونية بعد مخالفة أو حادثة." },
        ],
        fr: [
            { icon: "🚦", title: "Amendes & Infractions", description: "Tableau complet des amendes routières au Maroc et comment les contester." },
            { icon: "🚗", title: "Accidents de la Route", description: "Procédures après accident: constat amiable, assurance et indemnisations." },
            { icon: "🔑", title: "Permis & Système de Points", description: "Système de points, suspension du permis et comment le récupérer." },
            { icon: "🛡️", title: "Assurance Obligatoire", description: "Conditions de l'assurance obligatoire et conséquences légales en son absence." },
            { icon: "🍺", title: "Conduite en État d'Ivresse", description: "Sanctions pour conduite en état d'ivresse et refus d'alcootest." },
            { icon: "🤖", title: "Consultation Routière Gratuite", description: "Posez à 9anon AI votre question après une infraction ou un accident." },
        ],
        en: [
            { icon: "🚦", title: "Fines & Violations", description: "Complete table of traffic fines in Morocco and how to contest them." },
            { icon: "🚗", title: "Road Accidents", description: "Post-accident procedures: constat amiable, insurance, and compensation." },
            { icon: "🔑", title: "License & Points System", description: "Points system, license suspension, and how to recover it." },
            { icon: "🛡️", title: "Mandatory Insurance", description: "Mandatory insurance conditions and legal consequences of non-compliance." },
            { icon: "🍺", title: "Drunk Driving", description: "Penalties for drunk driving and breathalyzer refusal in Morocco." },
            { icon: "🤖", title: "Free Traffic Law Consultation", description: "Ask 9anon AI about your legal situation after a fine or accident." },
        ],
    },
    contentSections: {
        ar: [
            { heading: "مدونة السير المغربية: إصلاح 2010 والسلامة الطرقية", text: "خضعت مدونة السير المغربية لإصلاح جذري عام 2010 لمعالجة ارتفاع حوادث الطرق. أدخل الإصلاح نظام نقاط رخصة السياقة، وشدّد العقوبات على المخالفات المتكررة، وجعل الكشف التقني للمركبات إلزامياً، وأحكم تنظيم قيادة السيارات الثقيلة. يهدف الإطار التشريعي الجديد إلى خفض الحوادث المميتة بنسبة 50% بحلول 2030." },
            { heading: "ما يجب فعله بعد حادثة السير: دليل عملي", text: "بعد أي حادثة مرورية في المغرب: أولاً تأمين المكان وفحص الإصابات، ثانياً الاتصال بالإسعاف عند الحاجة (الرقم 15 أو 150)، ثالثاً تبادل وثائق التأمين وتعبئة constat amiable مع السائق الآخر، رابعاً تصوير الأضرار وتدوين بيانات الشهود، خامساً التبليغ لشركة التأمين خلال 5 أيام عمل. 9anon AI يُرشدك في كل خطوة." },
        ],
        fr: [
            { heading: "Le Code de la Route 2010 : Une Réforme pour la Sécurité Routière", text: "Le Code de la Route marocain a été réformé en profondeur en 2010 pour faire face à la hausse des accidents. La réforme a introduit le système de points du permis, durci les sanctions pour récidivistes, rendu le contrôle technique obligatoire et renforcé la réglementation des poids lourds. Le nouveau cadre vise à réduire les accidents mortels de 50% d'ici 2030." },
        ],
        en: [
            { heading: "Morocco's 2010 Traffic Law Reform: A Road Safety Overhaul", text: "Morocco's Code de la Route was significantly reformed in 2010 to address rising road accidents. The reform introduced the driving license points system, harsher penalties for repeat offenders, mandatory vehicle technical inspections, and stricter regulation of heavy vehicles. The new framework aims to reduce fatal accidents by 50% by 2030." },
        ],
    },
    relatedLinks: [
        { href: "/family-law", label: "Family Law" },
        { href: "/labor-law", label: "Labor Law" },
        { href: "/legal-ai", label: "AI Legal Assistant" },
        { href: "/legal-chatbot", label: "Legal Chatbot" },
        { href: "/tenant-rights", label: "Tenant Rights" },
    ],
    gradientFrom: "from-red-600",
    gradientTo: "to-orange-500",
    glowColor: "red",
};
