/**
 * @fileoverview SEO page data for general/high-intent pages: legal-ai, legal-chatbot, online-consultation.
 * These pages target the primary conversion keywords.
 * @module lib/seo-data-general
 */

import { SEOPageConfig } from "./seo-page-types";

/** Legal AI Assistant page — targets "legal AI assistant Morocco", "AI lawyer Morocco", etc. */
export const legalAiPage: SEOPageConfig = {
    slug: "legal-ai",
    titles: {
        en: "Legal AI Assistant Morocco | Free AI Lawyer - 9anon AI",
        fr: "Assistant Juridique IA Maroc | Avocat IA Gratuit - 9anon AI",
        ar: "مساعد قانوني ذكي المغرب | محامي ذكاء اصطناعي مجاني - 9anon AI",
    },
    descriptions: {
        en: "Free AI legal assistant for Moroccan law. Get instant online legal advice from an AI lawyer covering family law, labor law, commercial law, and more. Available 24/7 in Arabic, French, and English.",
        fr: "Assistant juridique IA gratuit pour le droit marocain. Obtenez des conseils juridiques instantanés d'un avocat IA couvrant le droit de la famille, du travail, commercial et plus. Disponible 24/7.",
        ar: "مساعد قانوني ذكي مجاني للقانون المغربي. احصل على استشارة قانونية فورية من محامي ذكاء اصطناعي يغطي قانون الأسرة والشغل والتجاري. متاح 24/7.",
    },
    keywords: {
        en: ["legal AI assistant Morocco", "AI lawyer Morocco", "online legal advice Morocco", "legal chatbot Morocco", "Moroccan legal consultation online"],
        fr: ["assistant juridique IA Maroc", "avocat en ligne Maroc", "conseil juridique en ligne Maroc", "chatbot juridique Maroc", "consultation juridique digitale Maroc"],
        ar: ["مساعد قانوني ذكي المغرب", "محامي اونلاين المغرب", "استشارة قانونية اونلاين المغرب", "ذكاء اصطناعي قانوني المغرب"],
    },
    h1: {
        en: "Your Free AI Legal Assistant in Morocco",
        fr: "Votre Assistant Juridique IA Gratuit au Maroc",
        ar: "مساعدك القانوني الذكي المجاني في المغرب",
    },
    badge: { en: "AI Legal Assistant", fr: "Assistant Juridique IA", ar: "مساعد قانوني ذكي" },
    subtitle: {
        en: "Get instant, accurate legal advice powered by AI. 9anon AI is Morocco's first AI lawyer — covering family law, labor law, commercial law, contracts, and more. Ask any legal question in Arabic, French, or English.",
        fr: "Obtenez des conseils juridiques instantanés et précis grâce à l'IA. 9anon AI est le premier avocat IA du Maroc — couvrant le droit de la famille, du travail, commercial, les contrats et plus.",
        ar: "احصل على استشارة قانونية فورية ودقيقة بالذكاء الاصطناعي. 9anon AI هو أول محامي ذكاء اصطناعي في المغرب — يغطي قانون الأسرة والشغل والتجاري والعقود.",
    },
    ctaText: { en: "Ask Your Legal Question Free", fr: "Posez Votre Question Juridique Gratuitement", ar: "اطرح سؤالك القانوني مجاناً" },
    faqTitle: { en: "Frequently Asked Questions", fr: "Questions Fréquemment Posées", ar: "الأسئلة الشائعة" },
    faqItems: {
        en: [
            { question: "What is a legal AI assistant?", answer: "A legal AI assistant is an artificial intelligence tool that provides instant legal guidance about Moroccan law. 9anon AI covers the Moudawana (family code), labor law, commercial law, penal code, and more — in Arabic, French, and English." },
            { question: "Is 9anon AI a real lawyer?", answer: "No. 9anon AI provides educational legal information based on Moroccan law texts. For binding legal advice, consult a licensed Moroccan lawyer (avocat)." },
            { question: "What areas of Moroccan law does 9anon AI cover?", answer: "Family law (Moudawana), labor law (Code du Travail), commercial law, penal code, traffic law, tenant rights, employee rights, inheritance law, contract law, and company registration." },
            { question: "Is it free to use?", answer: "Yes! 9anon AI provides free legal consultations. Ask unlimited questions about Moroccan law without any cost." },
            { question: "What languages does the AI lawyer support?", answer: "Arabic (including Darija), French, and English. Ask in any language and receive answers in the same language." },
        ],
        fr: [
            { question: "Qu'est-ce qu'un assistant juridique IA ?", answer: "Un assistant juridique IA est un outil d'intelligence artificielle qui fournit des conseils juridiques instantanés sur le droit marocain. 9anon AI couvre la Moudawana, le Code du Travail, le droit commercial, le Code Pénal et plus — en arabe, français et anglais." },
            { question: "9anon AI est-il un vrai avocat ?", answer: "Non. 9anon AI fournit des informations juridiques éducatives basées sur les textes de loi marocains. Pour des conseils juridiques contraignants, consultez un avocat marocain agréé." },
            { question: "Quels domaines du droit marocain couvre 9anon AI ?", answer: "Droit de la famille (Moudawana), droit du travail (Code du Travail), droit commercial, Code Pénal, droit de la circulation, droits des locataires, droits des employés, droit successoral et création d'entreprise." },
            { question: "Est-ce gratuit ?", answer: "Oui ! 9anon AI offre des consultations juridiques gratuites. Posez autant de questions que vous voulez sans frais." },
            { question: "Quelles langues l'avocat IA supporte-t-il ?", answer: "Arabe (y compris le Darija), français et anglais. Posez votre question dans n'importe quelle langue." },
        ],
        ar: [
            { question: "ما هو المساعد القانوني الذكي؟", answer: "المساعد القانوني الذكي هو أداة ذكاء اصطناعي توفر إرشادات قانونية فورية حول القانون المغربي. يغطي 9anon AI مدونة الأسرة وقانون الشغل والقانون التجاري والقانون الجنائي والمزيد — بالعربية والفرنسية والإنجليزية." },
            { question: "هل 9anon AI محامي حقيقي؟", answer: "لا. يقدم 9anon AI معلومات قانونية تعليمية مبنية على النصوص القانونية المغربية. للحصول على استشارة قانونية ملزمة، استشر محامياً مرخصاً." },
            { question: "ما هي مجالات القانون المغربي التي يغطيها؟", answer: "قانون الأسرة (المدونة)، قانون الشغل، القانون التجاري، القانون الجنائي، قانون السير، حقوق المستأجر، حقوق الموظف، قانون الإرث، وتسجيل الشركات." },
            { question: "هل هو مجاني؟", answer: "نعم! يوفر 9anon AI استشارات قانونية مجانية بالكامل. اطرح أسئلة غير محدودة بدون أي تكاليف." },
            { question: "ما اللغات المدعومة؟", answer: "العربية (بما في ذلك الدارجة) والفرنسية والإنجليزية. اطرح سؤالك بأي لغة واحصل على الإجابة بنفس اللغة." },
        ],
    },
    features: {
        en: [
            { icon: "⚖️", title: "Complete Moroccan Law Coverage", description: "Covers Moudawana, Labor Code, Commercial Law, Penal Code, Traffic Law, Property Law and more." },
            { icon: "🌍", title: "Trilingual Support", description: "Ask in Arabic (including Darija), French, or English. Natural responses in all three languages." },
            { icon: "🔒", title: "Private & Anonymous", description: "No registration required. Your questions are handled confidentially." },
            { icon: "⚡", title: "Instant Answers 24/7", description: "No appointments needed. Get immediate legal guidance any time." },
            { icon: "💰", title: "100% Free Access", description: "No subscription, no hidden fees. Completely free." },
            { icon: "🤖", title: "AI-Powered Accuracy", description: "Trained on thousands of Moroccan legal texts for maximum accuracy." },
        ],
        fr: [
            { icon: "⚖️", title: "Couverture Complète du Droit Marocain", description: "Couvre la Moudawana, le Code du Travail, le Droit Commercial, le Code Pénal et plus." },
            { icon: "🌍", title: "Support Trilingue", description: "Posez en arabe (y compris Darija), français ou anglais. Réponses naturelles dans les trois langues." },
            { icon: "🔒", title: "Privé et Anonyme", description: "Aucune inscription requise. Vos questions sont traitées confidentiellement." },
            { icon: "⚡", title: "Réponses Instantanées 24/7", description: "Pas de rendez-vous. Obtenez une guidance juridique à tout moment." },
            { icon: "💰", title: "Accès 100% Gratuit", description: "Pas d'abonnement, pas de frais cachés. Entièrement gratuit." },
            { icon: "🤖", title: "Précision par IA", description: "Entraîné sur des milliers de textes juridiques marocains." },
        ],
        ar: [
            { icon: "⚖️", title: "تغطية شاملة للقانون المغربي", description: "يغطي مدونة الأسرة وقانون الشغل والقانون التجاري والقانون الجنائي وقانون السير والمزيد." },
            { icon: "🌍", title: "دعم ثلاثي اللغات", description: "اسأل بالعربية (بما فيها الدارجة) أو الفرنسية أو الإنجليزية. إجابات طبيعية بجميع اللغات." },
            { icon: "🔒", title: "خاص ومجهول", description: "لا حاجة للتسجيل. أسئلتك تعالج بسرية تامة." },
            { icon: "⚡", title: "إجابات فورية 24/7", description: "لا حاجة لمواعيد. احصل على إرشاد قانوني فوري في أي وقت." },
            { icon: "💰", title: "مجاني 100%", description: "لا اشتراك ولا رسوم مخفية. مجاني بالكامل." },
            { icon: "🤖", title: "دقة الذكاء الاصطناعي", description: "مدرب على آلاف النصوص القانونية المغربية لأقصى دقة." },
        ],
    },
    contentSections: {
        en: [
            { heading: "Why Use an AI Legal Assistant in Morocco?", text: "Legal advice in Morocco has traditionally been expensive and inaccessible. Whether you need guidance on divorce proceedings under the Moudawana, understanding your employee rights under the Code du Travail, or navigating commercial law — finding reliable legal information shouldn't require expensive consultations. 9anon AI democratizes access to legal knowledge by providing instant, AI-powered legal guidance based on official Moroccan law texts." },
            { heading: "How Our AI Lawyer Works", text: "9anon AI uses advanced artificial intelligence trained specifically on Moroccan legal codes including the Family Code (Moudawana), Labor Code (Code du Travail), Commercial Code, Penal Code, and dozens of other texts. Simply type your legal question in Arabic, French, or English and receive a detailed response within seconds." },
            { heading: "Legal Topics Covered", text: "Our AI legal assistant covers every area of Moroccan law: family law including marriage, divorce, custody, and inheritance; labor law covering contracts (CDI/CDD), wrongful termination, and worker protections; commercial law for business registration and corporate compliance; tenant rights and rental disputes; traffic law; criminal law; property law; and administrative procedures." },
        ],
        fr: [
            { heading: "Pourquoi Utiliser un Assistant Juridique IA au Maroc ?", text: "Les conseils juridiques au Maroc ont traditionnellement été coûteux et inaccessibles. Que vous ayez besoin d'aide sur une procédure de divorce selon la Moudawana, de comprendre vos droits d'employé selon le Code du Travail, ou de naviguer le droit commercial — 9anon AI démocratise l'accès au savoir juridique en fournissant une guidance instantanée basée sur les textes officiels." },
            { heading: "Comment Fonctionne Notre Avocat IA", text: "9anon AI utilise une intelligence artificielle avancée entraînée spécifiquement sur les codes juridiques marocains incluant le Code de la Famille (Moudawana), le Code du Travail, le Code de Commerce, le Code Pénal et des dizaines d'autres textes. Tapez simplement votre question juridique et recevez une réponse détaillée en quelques secondes." },
            { heading: "Domaines Juridiques Couverts", text: "Notre assistant couvre tous les domaines du droit marocain : droit de la famille incluant mariage, divorce, garde d'enfants et succession ; droit du travail couvrant les contrats (CDI/CDD), licenciement et protections ; droit commercial pour la création d'entreprise ; droits des locataires ; droit de la circulation ; droit pénal ; droit immobilier ; et procédures administratives." },
        ],
        ar: [
            { heading: "لماذا تستخدم مساعداً قانونياً ذكياً في المغرب؟", text: "الاستشارة القانونية في المغرب كانت تقليدياً مكلفة وغير متاحة للجميع. سواء كنت تحتاج إرشاداً حول إجراءات الطلاق وفق مدونة الأسرة، أو فهم حقوقك كموظف وفق مدونة الشغل، أو التنقل في القانون التجاري — 9anon AI يوفر استشارة قانونية فورية مبنية على النصوص القانونية الرسمية المغربية." },
            { heading: "كيف يعمل المحامي الذكي", text: "يستخدم 9anon AI ذكاءً اصطناعياً متقدماً مدرباً خصيصاً على القوانين المغربية بما فيها مدونة الأسرة ومدونة الشغل والقانون التجاري والقانون الجنائي وعشرات النصوص الأخرى. اكتب سؤالك القانوني بالعربية أو الفرنسية أو الإنجليزية واحصل على إجابة مفصلة في ثوانٍ." },
            { heading: "المجالات القانونية المغطاة", text: "يغطي مساعدنا القانوني كل مجالات القانون المغربي: قانون الأسرة بما فيه الزواج والطلاق والحضانة والإرث؛ قانون الشغل بما فيه العقود والفصل التعسفي وحماية العمال؛ القانون التجاري لتسجيل الشركات؛ حقوق المستأجر؛ قانون السير؛ القانون الجنائي؛ قانون العقار؛ والإجراءات الإدارية." },
        ],
    },
    relatedLinks: [
        { href: "/legal-chatbot", label: "Legal Chatbot" },
        { href: "/family-law", label: "Family Law" },
        { href: "/labor-law", label: "Labor Law" },
        { href: "/business-legal", label: "Business Legal" },
        { href: "/contract-review", label: "Contract Review" },
        { href: "/employee-rights", label: "Employee Rights" },
    ],
};

/** Legal Chatbot page — targets "legal chatbot Morocco", "online legal advice", etc. */
export const legalChatbotPage: SEOPageConfig = {
    slug: "legal-chatbot",
    titles: {
        en: "Legal Chatbot Morocco | Online Legal Advice Free - 9anon AI",
        fr: "Chatbot Juridique Maroc | Conseil Juridique en Ligne Gratuit - 9anon AI",
        ar: "شات بوت قانوني المغرب | استشارة قانونية اونلاين مجانية - 9anon AI",
    },
    descriptions: {
        en: "Free legal chatbot for instant online legal advice in Morocco. Ask about family law, labor law, commercial law, and more. Available 24/7 in Arabic, French, and English.",
        fr: "Chatbot juridique gratuit pour des conseils juridiques en ligne au Maroc. Consultation juridique digitale disponible 24/7 en arabe, français et anglais.",
        ar: "شات بوت قانوني مجاني للحصول على استشارة قانونية اونلاين في المغرب. متاح 24/7 بالعربية والفرنسية والإنجليزية.",
    },
    keywords: {
        en: ["legal chatbot Morocco", "online legal advice Morocco", "Moroccan legal consultation online", "free legal chatbot"],
        fr: ["chatbot juridique Maroc", "conseil juridique en ligne Maroc", "consultation juridique digitale Maroc"],
        ar: ["شات بوت قانوني المغرب", "استشارة قانونية اونلاين المغرب", "ذكاء اصطناعي قانوني المغرب"],
    },
    h1: {
        en: "Instant Legal Chatbot for Moroccan Law",
        fr: "Chatbot Juridique Instantané pour le Droit Marocain",
        ar: "شات بوت قانوني فوري للقانون المغربي",
    },
    badge: { en: "Legal Chatbot", fr: "Chatbot Juridique", ar: "شات بوت قانوني" },
    subtitle: {
        en: "Get instant online legal advice through our AI-powered chatbot. Ask any legal question about Moroccan law and receive accurate, detailed answers in seconds — completely free, 24/7.",
        fr: "Obtenez des conseils juridiques en ligne instantanés via notre chatbot IA. Posez toute question sur le droit marocain et recevez des réponses précises en quelques secondes — gratuit, 24/7.",
        ar: "احصل على استشارة قانونية اونلاين فورية عبر شات بوتنا القانوني الذكي. اطرح أي سؤال عن القانون المغربي واحصل على إجابات دقيقة في ثوانٍ — مجاناً بالكامل.",
    },
    ctaText: { en: "Start Chatting Free", fr: "Commencer à Discuter Gratuitement", ar: "ابدأ المحادثة مجاناً" },
    faqTitle: { en: "Frequently Asked Questions", fr: "Questions Fréquemment Posées", ar: "الأسئلة الشائعة" },
    faqItems: {
        en: [
            { question: "How does the legal chatbot work?", answer: "Simply type your legal question and our AI analyzes it against Moroccan legal codes to provide an accurate answer. No registration or payment required." },
            { question: "Is online legal advice reliable?", answer: "9anon AI is trained on official Moroccan legal texts. While highly accurate, for binding legal decisions consult a licensed avocat." },
            { question: "Can I use the chatbot in Arabic?", answer: "Yes! Our chatbot supports Arabic (including Darija), French, and English. Ask in whichever language you're comfortable with." },
            { question: "What legal topics can I ask about?", answer: "Family law, divorce, inheritance, labor law, commercial law, tenant rights, employee rights, traffic law, criminal law, company registration, and more." },
        ],
        fr: [
            { question: "Comment fonctionne le chatbot juridique ?", answer: "Tapez simplement votre question juridique et notre IA l'analyse par rapport aux codes juridiques marocains. Aucune inscription ni paiement requis." },
            { question: "Les conseils juridiques en ligne sont-ils fiables ?", answer: "9anon AI est entraîné sur les textes juridiques officiels marocains. Pour des décisions juridiques contraignantes, consultez un avocat agréé." },
            { question: "Puis-je utiliser le chatbot en arabe ?", answer: "Oui ! Notre chatbot supporte l'arabe (y compris le Darija), le français et l'anglais." },
            { question: "Quels sujets juridiques puis-je aborder ?", answer: "Droit de la famille, divorce, succession, droit du travail, droit commercial, droits des locataires, droit de la circulation, et plus." },
        ],
        ar: [
            { question: "كيف يعمل الشات بوت القانوني؟", answer: "اكتب سؤالك القانوني وسيقوم الذكاء الاصطناعي بتحليله مقابل القوانين المغربية لتقديم إجابة دقيقة. لا حاجة للتسجيل أو الدفع." },
            { question: "هل الاستشارة القانونية اونلاين موثوقة؟", answer: "9anon AI مدرب على النصوص القانونية المغربية الرسمية. للقرارات القانونية الملزمة استشر محامياً مرخصاً." },
            { question: "هل يمكنني استخدام الشات بوت بالعربية؟", answer: "نعم! يدعم شات بوتنا العربية (بما فيها الدارجة) والفرنسية والإنجليزية." },
            { question: "ما المواضيع القانونية التي يمكنني السؤال عنها؟", answer: "قانون الأسرة، الطلاق، الإرث، قانون الشغل، القانون التجاري، حقوق المستأجر، حقوق الموظف، قانون السير، وأكثر." },
        ],
    },
    features: {
        en: [
            { icon: "💬", title: "Natural Conversation", description: "Chat naturally like you would with a lawyer. Our AI understands context and follow-up questions." },
            { icon: "⚡", title: "Instant Responses", description: "Get answers in seconds, not days. No waiting for appointments or callbacks." },
            { icon: "🔒", title: "100% Private", description: "Your conversations are confidential. No data shared with third parties." },
            { icon: "🌍", title: "Three Languages", description: "Arabic, French, and English. Switch languages mid-conversation if needed." },
            { icon: "📱", title: "Works Everywhere", description: "Use on phone, tablet, or computer. No app download required." },
            { icon: "💰", title: "Always Free", description: "No hidden costs, no premium tiers. Free legal chatbot for everyone." },
        ],
        fr: [
            { icon: "💬", title: "Conversation Naturelle", description: "Discutez naturellement comme avec un avocat. Notre IA comprend le contexte." },
            { icon: "⚡", title: "Réponses Instantanées", description: "Obtenez des réponses en secondes, pas en jours." },
            { icon: "🔒", title: "100% Privé", description: "Vos conversations sont confidentielles." },
            { icon: "🌍", title: "Trois Langues", description: "Arabe, français et anglais. Changez de langue en cours de conversation." },
            { icon: "📱", title: "Fonctionne Partout", description: "Téléphone, tablette ou ordinateur. Aucun téléchargement requis." },
            { icon: "💰", title: "Toujours Gratuit", description: "Pas de coûts cachés. Chatbot juridique gratuit pour tous." },
        ],
        ar: [
            { icon: "💬", title: "محادثة طبيعية", description: "تحدث بشكل طبيعي كما مع محامٍ. ذكاؤنا الاصطناعي يفهم السياق والأسئلة المتتابعة." },
            { icon: "⚡", title: "إجابات فورية", description: "احصل على إجابات في ثوانٍ وليس أيام. لا انتظار لمواعيد." },
            { icon: "🔒", title: "خاص 100%", description: "محادثاتك سرية. لا مشاركة بيانات مع أطراف ثالثة." },
            { icon: "🌍", title: "ثلاث لغات", description: "العربية والفرنسية والإنجليزية. غير اللغة أثناء المحادثة." },
            { icon: "📱", title: "يعمل في كل مكان", description: "استخدمه على الهاتف أو الحاسوب. لا حاجة لتحميل تطبيق." },
            { icon: "💰", title: "مجاني دائماً", description: "لا تكاليف مخفية. شات بوت قانوني مجاني للجميع." },
        ],
    },
    contentSections: {
        en: [
            { heading: "What is a Legal Chatbot?", text: "A legal chatbot is an AI-powered conversational tool that provides legal information and guidance. Unlike traditional legal consultation that requires appointments and fees, our chatbot offers instant, free access to legal knowledge about Moroccan law. It can answer questions about the Moudawana, Code du Travail, commercial law, and dozens of other legal areas." },
            { heading: "Why Choose Online Legal Advice in Morocco?", text: "Traditional legal consultation in Morocco can cost hundreds of dirhams per session. Many citizens, especially in rural areas, have limited access to legal professionals. Online legal advice through AI chatbots bridges this gap, providing free, instant, and confidential legal guidance to anyone with an internet connection." },
        ],
        fr: [
            { heading: "Qu'est-ce qu'un Chatbot Juridique ?", text: "Un chatbot juridique est un outil conversationnel alimenté par l'IA qui fournit des informations et des conseils juridiques. Contrairement à la consultation traditionnelle qui nécessite des rendez-vous et des frais, notre chatbot offre un accès instantané et gratuit aux connaissances juridiques sur le droit marocain." },
            { heading: "Pourquoi Choisir le Conseil Juridique en Ligne au Maroc ?", text: "La consultation juridique traditionnelle au Maroc peut coûter des centaines de dirhams par séance. De nombreux citoyens ont un accès limité aux professionnels du droit. Les conseils juridiques en ligne via les chatbots IA comblent cette lacune, fournissant une guidance gratuite et confidentielle à tous." },
        ],
        ar: [
            { heading: "ما هو الشات بوت القانوني؟", text: "الشات بوت القانوني هو أداة محادثة تعمل بالذكاء الاصطناعي توفر معلومات وإرشادات قانونية. على عكس الاستشارة التقليدية التي تتطلب مواعيد ورسوماً، يوفر شات بوتنا وصولاً فورياً ومجانياً للمعرفة القانونية حول القانون المغربي." },
            { heading: "لماذا تختار الاستشارة القانونية اونلاين في المغرب؟", text: "الاستشارة القانونية التقليدية في المغرب قد تكلف مئات الدراهم للجلسة الواحدة. العديد من المواطنين لديهم وصول محدود للمحامين. الاستشارة القانونية اونلاين عبر الذكاء الاصطناعي تسد هذه الفجوة، وتوفر إرشاداً مجانياً وسرياً للجميع." },
        ],
    },
    relatedLinks: [
        { href: "/legal-ai", label: "AI Legal Assistant" },
        { href: "/family-law", label: "Family Law" },
        { href: "/labor-law", label: "Labor Law" },
        { href: "/divorce-law", label: "Divorce Law" },
        { href: "/employee-rights", label: "Employee Rights" },
        { href: "/tenant-rights", label: "Tenant Rights" },
    ],
};

/**
 * Online Consultation page — targets استشارة قانونية مجانية (position 1.91!) +
 * consultation juridique en ligne + online legal advice Morocco.
 * This is the highest-converting entry point for Moroccans seeking free legal help.
 */
export const onlineConsultationPage: SEOPageConfig = {
    slug: "online-consultation",
    titles: {
        ar: "استشارة قانونية مجانية اونلاين بالمغرب | 9anon AI",
        fr: "Consultation Juridique Gratuite en Ligne au Maroc | 9anon AI",
        en: "Free Online Legal Consultation Morocco | 9anon AI",
    },
    descriptions: {
        ar: "احصل على استشارة قانونية مجانية اونلاين في المغرب عبر الذكاء الاصطناعي. إجابات فورية ودقيقة حول قانون الأسرة، الشغل، الكراء، الإرث والتجارة. متاح 24/7 بالعربية والفرنسية والدارجة.",
        fr: "Obtenez une consultation juridique gratuite en ligne au Maroc via IA. Réponses instantanées sur le droit de la famille, du travail, de la location et des affaires. Disponible 24h/24 en arabe et français.",
        en: "Get free online legal consultation in Morocco via AI. Instant accurate answers on family law, labor law, rental, inheritance, and commercial law. Available 24/7 in Arabic, French, and English.",
    },
    keywords: {
        ar: ["استشارة قانونية مجانية المغرب", "استشارة قانونية اونلاين", "محامي مجاني اونلاين المغرب", "ذكاء اصطناعي قانوني مجاني", "مساعد قانوني مجاني", "سؤال قانوني مجاني المغرب"],
        fr: ["consultation juridique gratuite Maroc", "avocat gratuit en ligne Maroc", "aide juridique gratuite Maroc", "conseil juridique en ligne Maroc", "consultation juridique IA Maroc"],
        en: ["free legal consultation morocco", "online legal advice morocco free", "free legal help morocco", "legal question morocco online", "free AI lawyer morocco"],
    },
    h1: {
        ar: "استشارة قانونية مجانية اونلاين في المغرب",
        fr: "Consultation Juridique Gratuite en Ligne au Maroc",
        en: "Free Online Legal Consultation in Morocco",
    },
    badge: { ar: "مجاناً 100%", fr: "100% Gratuit", en: "100% Free" },
    subtitle: {
        ar: "9anon AI هو مساعدك القانوني الذكي المجاني — متاح على مدار الساعة بالعربية والفرنسية والدارجة. اطرح أي سؤال قانوني يخصك وفق القانون المغربي واحصل على إجابة فورية ودقيقة بدون مواعيد ولا رسوم.",
        fr: "9anon AI est votre assistant juridique IA gratuit — disponible 24h/24 en arabe et français. Posez toute question juridique selon le droit marocain et obtenez une réponse instantanée sans rendez-vous ni frais.",
        en: "9anon AI is your free AI legal assistant — available 24/7 in Arabic, French, and English. Ask any legal question about Moroccan law and get an instant, accurate answer with no appointments and no fees.",
    },
    ctaText: { ar: "ابدأ استشارتك المجانية الآن", fr: "Démarrer Ma Consultation Gratuite", en: "Start My Free Consultation" },
    faqTitle: { ar: "أسئلة شائعة عن الاستشارة القانونية المجانية", fr: "FAQ Consultation Juridique Gratuite", en: "Free Legal Consultation FAQ" },
    faqItems: {
        ar: [
            { question: "هل الاستشارة القانونية عبر 9anon AI مجانية فعلاً؟", answer: "نعم، تماماً مجانية بدون أي رسوم أو اشتراكات. يمكنك طرح أي عدد من الأسئلة القانونية في أي وقت دون الحاجة لإنشاء حساب." },
            { question: "ما المجالات القانونية التي يغطيها 9anon AI؟", answer: "يغطي 9anon AI جميع فروع القانون المغربي: مدونة الأسرة (الطلاق، الحضانة، الإرث)، قانون الشغل، القانون التجاري، قانون الكراء، القانون الجنائي، قانون السير، والقانون الإداري." },
            { question: "هل يمكنني الاستشارة بالدارجة المغربية؟", answer: "نعم! 9anon AI يفهم ويجيب بالدارجة المغربية إضافة إلى العربية الفصحى والفرنسية والإنجليزية. يمكنك الكتابة بأي لغة تريح وتحصل على الإجابة بنفس اللغة." },
            { question: "هل الاستشارة عبر 9anon AI تُغني عن المحامي؟", answer: "9anon AI يوفر معلومات قانونية تعليمية دقيقة مبنية على النصوص القانونية المغربية. للقضايا المعقدة التي تتطلب تمثيلاً قانونياً أمام المحاكم، يُنصح بالتواصل مع محامٍ مُرخّص. 9anon AI هو خطوتك الأولى الذكية." },
            { question: "هل معلوماتي القانونية آمنة ومحمية؟", answer: "نعم، جلساتك مشفرة وسرية تماماً. لا نشارك أي معلومات مع أطراف ثالثة. يمكنك الاستشارة بثقة تامة حول أي موضوع قانوني حساس." },
        ],
        fr: [
            { question: "La consultation juridique via 9anon AI est-elle vraiment gratuite ?", answer: "Oui, totalement gratuite sans frais ni abonnements. Posez autant de questions juridiques que vous voulez à tout moment sans créer de compte." },
            { question: "Quels domaines juridiques 9anon AI couvre-t-il ?", answer: "9anon AI couvre tout le droit marocain: Moudawana (divorce, garde, succession), Code du Travail, droit commercial, droit locatif, Code Pénal, Code de la Route et droit administratif." },
            { question: "Puis-je consulter en Darija marocain ?", answer: "Oui ! 9anon AI comprend et répond en Darija marocain, en arabe classique, en français et en anglais." },
            { question: "La consultation IA remplace-t-elle un avocat ?", answer: "9anon AI fournit des informations juridiques précises basées sur les textes de loi marocains. Pour les affaires complexes nécessitant une représentation en justice, consultez un avocat agréé. 9anon AI est votre premier pas intelligent." },
        ],
        en: [
            { question: "Is the legal consultation via 9anon AI really free?", answer: "Yes, completely free with no fees or subscriptions. Ask as many legal questions as you want at any time, no account required." },
            { question: "What legal areas does 9anon AI cover?", answer: "9anon AI covers all Moroccan law: Family Code (Moudawana), Labor Law, Commercial Law, Rental Law, Penal Code, Traffic Law, and Administrative Law." },
            { question: "Can I consult in Moroccan Darija?", answer: "Yes! 9anon AI understands and responds in Moroccan Darija as well as standard Arabic, French, and English." },
            { question: "Does AI consultation replace a lawyer?", answer: "9anon AI provides accurate legal information based on Moroccan legal texts. For complex cases requiring court representation, consult a licensed attorney. 9anon AI is your smart first step." },
        ],
    },
    features: {
        ar: [
            { icon: "🆓", title: "مجاناً 100%", description: "لا رسوم، لا اشتراكات، لا حاجة لحساب. استشارة قانونية مجانية حقيقية." },
            { icon: "⚡", title: "إجابة فورية", description: "احصل على إجابتك القانونية في ثوانٍ، على مدار الساعة 24/7." },
            { icon: "🌍", title: "عربي، فرنسي، دارجة", description: "اطرح سؤالك بأي لغة تريحك — العربية، الفرنسية، الدارجة أو الإنجليزية." },
            { icon: "📚", title: "مبني على القانون الفعلي", description: "إجابات مستندة إلى النصوص القانونية المغربية الرسمية: مدونات وقوانين ومراسيم." },
            { icon: "🔒", title: "سري وخاص", description: "لا أحد يعلم بأسئلتك. استشارتك محمية ومشفرة تماماً." },
            { icon: "📱", title: "متاح على الهاتف", description: "استشارتك القانونية في جيبك — استعمل 9anon AI من أي هاتف أو حاسوب." },
        ],
        fr: [
            { icon: "🆓", title: "100% Gratuit", description: "Aucun frais, aucun abonnement, aucun compte requis." },
            { icon: "⚡", title: "Réponse Instantanée", description: "Obtenez votre réponse juridique en secondes, 24h/24 7j/7." },
            { icon: "🌍", title: "Arabe, Français, Darija", description: "Posez votre question dans la langue qui vous convient." },
            { icon: "📚", title: "Basé sur le Droit Réel", description: "Réponses fondées sur les textes juridiques marocains officiels." },
            { icon: "🔒", title: "Confidentiel et Privé", description: "Vos questions restent totalement privées et chiffrées." },
            { icon: "📱", title: "Disponible sur Mobile", description: "Votre consultation juridique dans votre poche." },
        ],
        en: [
            { icon: "🆓", title: "100% Free", description: "No fees, no subscriptions, no account required." },
            { icon: "⚡", title: "Instant Answer", description: "Get your legal answer in seconds, 24/7." },
            { icon: "🌍", title: "Arabic, French, Darija", description: "Ask in whatever language you're comfortable with." },
            { icon: "📚", title: "Based on Real Law", description: "Answers grounded in official Moroccan legal texts." },
            { icon: "🔒", title: "Confidential & Private", description: "Your questions stay fully private and encrypted." },
            { icon: "📱", title: "Mobile-Ready", description: "Your legal consultation in your pocket." },
        ],
    },
    contentSections: {
        ar: [
            { heading: "لماذا تختار 9anon AI للاستشارة القانونية المجانية؟", text: "الاستشارة القانونية التقليدية في المغرب قد تكلف ما بين 500 و2000 درهم للجلسة الواحدة. كثير من المواطنين، خاصة في المدن الصغيرة والأرياف، يجدون صعوبة في الوصول إلى محامٍ. 9anon AI يسد هذه الفجوة بتوفير إرشادات قانونية دقيقة ومجانية لكل مغربي في أي مكان." },
            { heading: "كيف يعمل 9anon AI؟", text: "يعتمد 9anon AI على قاعدة بيانات قانونية شاملة تشمل جميع القوانين والمراسيم والتشريعات المغربية. عند طرح سؤالك، يحلل الذكاء الاصطناعي النصوص القانونية ذات الصلة ويقدم لك إجابة واضحة ومستندة إلى المراجع القانونية الرسمية. يمكنك الاستمرار في طرح أسئلة متابعة للحصول على توضيحات إضافية." },
            { heading: "ما الذي يميز 9anon AI عن المواقع الإخبارية القانونية؟", text: "المواقع الإخبارية تقدم معلومات عامة، بينما يتعامل 9anon AI مع وضعيتك القانونية الخاصة. يمكنك وصف حالتك بالتفصيل وسيقدم لك الذكاء الاصطناعي تحليلاً مخصصاً مبنياً على القانون المغربي الفعلي، مع الإشارة إلى المواد القانونية والمسطرة المناسبة لوضعيتك." },
        ],
        fr: [
            { heading: "Pourquoi Choisir 9anon AI pour la Consultation Juridique Gratuite ?", text: "La consultation juridique traditionnelle au Maroc peut coûter entre 500 et 2 000 MAD par séance. De nombreux citoyens, surtout dans les petites villes, ont un accès limité aux avocats. 9anon AI comble cette lacune en fournissant des conseils juridiques précis et gratuits à tous les Marocains." },
            { heading: "Comment Fonctionne 9anon AI ?", text: "9anon AI s'appuie sur une base de données juridique complète incluant toutes les lois, décrets et réglementations marocains. Il analyse les textes pertinents et fournit une réponse claire référencée sur les sources juridiques officielles." },
        ],
        en: [
            { heading: "Why Choose 9anon AI for Free Legal Consultation?", text: "Traditional legal consultation in Morocco costs between 500-2,000 MAD per session. Many citizens, especially in smaller towns, have limited access to lawyers. 9anon AI bridges this gap by providing accurate, free legal guidance to every Moroccan anywhere." },
            { heading: "How Does 9anon AI Work?", text: "9anon AI relies on a comprehensive legal database covering all Moroccan laws, decrees, and regulations. It analyzes relevant legal texts and provides clear, referenced answers backed by official legal sources." },
        ],
    },
    relatedLinks: [
        { href: "/legal-ai", label: "AI Legal Assistant" },
        { href: "/legal-chatbot", label: "Legal Chatbot" },
        { href: "/family-law", label: "Family Law" },
        { href: "/labor-law", label: "Labor Law" },
        { href: "/divorce-law", label: "Divorce Law" },
        { href: "/tenant-rights", label: "Tenant Rights" },
    ],
};
