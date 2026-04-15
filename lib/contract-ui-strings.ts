/**
 * @fileoverview Trilingual UI strings for the Contract Builder feature.
 * Supports: French (fr), Arabic (ar), English (en)
 */

export type SupportedLanguage = "fr" | "ar" | "en";

type StringMap = Record<SupportedLanguage, string>;

export const CONTRACT_UI: Record<string, StringMap> = {
    // ── Welcome Page ─────────────────────────────────────────────────────────
    welcomeTitle: {
        fr: "Générateur de Contrats",
        ar: "منشئ العقود",
        en: "Contract Builder",
    },
    welcomeSubtitle: {
        fr: "Décrivez le contrat dont vous avez besoin et notre assistant juridique IA le rédigera conformément au droit marocain.",
        ar: "صف العقد الذي تحتاجه وسيقوم مساعدنا القانوني بالذكاء الاصطناعي بصياغته وفقاً للقانون المغربي.",
        en: "Describe the contract you need and our AI legal assistant will draft it under Moroccan law.",
    },
    welcomeBadge: {
        fr: "Vérifié par le droit marocain • Révision juridique automatique • Export PDF",
        ar: "مُتحقق من القانون المغربي • مراجعة قانونية تلقائية • تصدير PDF",
        en: "Verified against Moroccan law • Automatic legal review • PDF export",
    },
    placeholder: {
        fr: "Ex: Je veux un contrat de bail pour un appartement à Casablanca, loyer 5000 DH/mois, durée 1 an, entre Ahmed Benali (bailleur) et Sara Tazi (locataire)...",
        ar: "مثال: أريد عقد إيجار لشقة في الدار البيضاء، الإيجار 5000 درهم شهرياً، لمدة سنة واحدة، بين أحمد بن علي (المؤجر) وسارة الطازي (المستأجرة)...",
        en: "E.g.: I need a rental agreement for an apartment in Casablanca, rent 5000 MAD/month, 1 year duration, between Ahmed Benali (landlord) and Sara Tazi (tenant)...",
    },
    generateButton: {
        fr: "Générer le contrat",
        ar: "إنشاء العقد",
        en: "Generate Contract",
    },
    exampleChipsLabel: {
        fr: "Exemples rapides :",
        ar: "أمثلة سريعة:",
        en: "Quick examples:",
    },

    // ── Sidebar ───────────────────────────────────────────────────────────────
    backToChat: {
        fr: "Retour au chat",
        ar: "العودة إلى المحادثة",
        en: "Back to Chat",
    },
    newContract: {
        fr: "+ Nouveau contrat",
        ar: "+ عقد جديد",
        en: "+ New Contract",
    },
    recentContracts: {
        fr: "Contrats récents",
        ar: "العقود الأخيرة",
        en: "Recent Contracts",
    },

    // ── Chat Panel ────────────────────────────────────────────────────────────
    chatEmptyTitle: {
        fr: "Assistant Contractuel",
        ar: "مساعد العقود",
        en: "Contract Assistant",
    },
    chatEmptySubtitle: {
        fr: "Décrivez les modifications souhaitées ou posez une question sur votre contrat.",
        ar: "صف التعديلات المطلوبة أو اطرح سؤالاً حول عقدك.",
        en: "Describe the changes you need or ask a question about your contract.",
    },
    chatInputPlaceholder: {
        fr: "Modifier le contrat, poser une question... (ex: ajouter une clause de résiliation)",
        ar: "تعديل العقد، طرح سؤال... (مثال: إضافة شرط إنهاء)",
        en: "Modify the contract, ask a question... (e.g. add a termination clause)",
    },
    suggestionsLabel: {
        fr: "Suggestions :",
        ar: "اقتراحات:",
        en: "Suggestions:",
    },

    // ── Progress Steps ────────────────────────────────────────────────────────
    stepSearching: {
        fr: "Recherche dans la base juridique marocaine...",
        ar: "البحث في قاعدة البيانات القانونية المغربية...",
        en: "Searching Moroccan legal database...",
    },
    stepDrafting: {
        fr: "Rédaction du contrat...",
        ar: "صياغة العقد...",
        en: "Drafting contract...",
    },
    stepReviewing: {
        fr: "Révision de conformité juridique...",
        ar: "مراجعة الامتثال القانوني...",
        en: "Reviewing legal compliance...",
    },
    stepDone: {
        fr: "Contrat prêt",
        ar: "العقد جاهز",
        en: "Contract ready",
    },

    // ── Error Messages ────────────────────────────────────────────────────────
    errorLoadSessions: {
        fr: "Impossible de charger vos contrats",
        ar: "تعذّر تحميل عقودك",
        en: "Failed to load your contracts",
    },
    errorLoadSession: {
        fr: "Impossible de charger ce contrat",
        ar: "تعذّر تحميل هذا العقد",
        en: "Failed to load this contract",
    },
    errorCreateSession: {
        fr: "Impossible de créer le contrat",
        ar: "تعذّر إنشاء العقد",
        en: "Failed to create contract",
    },
    errorStream: {
        fr: "Une erreur s'est produite. Veuillez réessayer.",
        ar: "حدث خطأ. يرجى المحاولة مجدداً.",
        en: "An error occurred. Please try again.",
    },
    errorExport: {
        fr: "Échec de l'export PDF",
        ar: "فشل تصدير PDF",
        en: "PDF export failed",
    },
    errorDelete: {
        fr: "Impossible de supprimer le contrat",
        ar: "تعذّر حذف العقد",
        en: "Failed to delete contract",
    },
    errorRename: {
        fr: "Impossible de renommer le contrat",
        ar: "تعذّر إعادة تسمية العقد",
        en: "Failed to rename contract",
    },
    successDelete: {
        fr: "Contrat supprimé",
        ar: "تم حذف العقد",
        en: "Contract deleted",
    },
    successRename: {
        fr: "Contrat renommé",
        ar: "تمت إعادة تسمية العقد",
        en: "Contract renamed",
    },
    renamePrompt: {
        fr: "Nouveau nom du contrat :",
        ar: "الاسم الجديد للعقد:",
        en: "New contract name:",
    },
    validationEmpty: {
        fr: "Veuillez décrire le contrat dont vous avez besoin.",
        ar: "يرجى وصف العقد الذي تحتاجه.",
        en: "Please describe the contract you need.",
    },
};

/**
 * Helper to get a UI string in the specified language with a fallback to French.
 */
export function t(key: string, lang: string): string {
    const entry = CONTRACT_UI[key];
    if (!entry) return key;
    return entry[lang as SupportedLanguage] ?? entry.fr ?? key;
}

// ── Quick-action suggestion chips per language ────────────────────────────────
export const QUICK_ACTIONS: Record<SupportedLanguage, string[]> = {
    fr: [
        "Ajouter une clause pénale",
        "Modifier la durée",
        "Ajouter une clause de résiliation",
        "Ajouter une clause de confidentialité",
        "Ajouter une clause de force majeure",
        "Traduire en arabe",
    ],
    ar: [
        "إضافة شرط جزائي",
        "تعديل المدة",
        "إضافة شرط إنهاء",
        "إضافة شرط سرية",
        "إضافة شرط القوة القاهرة",
        "ترجمة إلى الفرنسية",
    ],
    en: [
        "Add a penalty clause",
        "Change the duration",
        "Add a termination clause",
        "Add a confidentiality clause",
        "Add a force majeure clause",
        "Translate to French",
    ],
};

// ── Example chips on the welcome page per language ────────────────────────────
export const WELCOME_EXAMPLES: Record<SupportedLanguage, string[]> = {
    fr: [
        "Contrat de bail pour appartement à Casablanca",
        "Contrat de travail CDI",
        "Accord de confidentialité (NDA)",
        "Contrat de vente immobilière",
        "Contrat de prestation de services freelance",
    ],
    ar: [
        "عقد إيجار شقة في الدار البيضاء",
        "عقد عمل دائم (CDI)",
        "اتفاقية سرية (NDA)",
        "عقد بيع عقار",
        "عقد تقديم خدمات استشارية",
    ],
    en: [
        "Apartment rental agreement in Casablanca",
        "Permanent employment contract (CDI)",
        "Non-disclosure agreement (NDA)",
        "Real estate sale contract",
        "Freelance service agreement",
    ],
};
