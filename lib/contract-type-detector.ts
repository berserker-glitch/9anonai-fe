/**
 * @fileoverview Contract type detection utilities.
 * Used by:
 *   - /contract-builder: to auto-detect the contract type from a user's free-form description
 *   - /chat: to detect when a user is asking about drafting a contract
 */

// ─────────────────────────────────────────────────────────────────────────────
// Keyword Maps (FR / AR / EN)
// ─────────────────────────────────────────────────────────────────────────────

const TYPE_KEYWORDS: Record<string, string[]> = {
    rental: [
        // French
        "bail", "loyer", "locataire", "bailleur", "location", "louer", "appartement",
        "logement", "habitation", "résidence", "immeuble", "chambre", "studio",
        // Arabic
        "إيجار", "كراء", "مستأجر", "مؤجر", "سكن", "شقة", "منزل", "بيت",
        // English
        "rent", "rental", "lease", "tenant", "landlord", "apartment", "flat",
        "housing", "accommodation",
    ],
    employment: [
        // French
        "travail", "emploi", "employé", "employeur", "salaire", "salarié",
        "cdi", "cdd", "stage", "embauche", "recrutement", "poste", "mission",
        "contrat de travail", "licenciement", "congé",
        // Arabic
        "عمل", "وظيفة", "موظف", "صاحب العمل", "راتب", "أجر", "توظيف",
        "عقد عمل", "تدريب", "مهنة",
        // English
        "employment", "employee", "employer", "salary", "wage", "hire", "hiring",
        "job", "position", "worker", "payroll", "dismissal",
    ],
    service: [
        // French
        "prestation", "freelance", "consultant", "conseil", "maintenance",
        "informatique", "développement", "mission", "sous-traitance", "honoraires",
        "contrat de service", "prestataire", "client",
        // Arabic
        "خدمة", "خدمات", "مقاول", "استشارة", "صيانة", "تطوير", "مهمة",
        // English
        "service", "services", "freelance", "consulting", "consultant",
        "maintenance", "development", "provider", "contractor", "outsource",
    ],
    nda: [
        // French
        "confidentialité", "nda", "secret", "non-divulgation", "accord de confidentialité",
        "information confidentielle", "propriété intellectuelle", "secret commercial",
        // Arabic
        "سرية", "اتفاقية سرية", "معلومات سرية", "ملكية فكرية", "سري",
        // English
        "nda", "confidentiality", "non-disclosure", "confidential", "secret",
        "intellectual property", "trade secret",
    ],
    sale: [
        // French
        "vente", "achat", "vendeur", "acheteur", "cession", "acquéreur",
        "bien", "marchandise", "prix de vente", "transaction",
        // Arabic
        "بيع", "شراء", "بائع", "مشتري", "مبيع", "صفقة", "ثمن",
        // English
        "sale", "purchase", "sell", "buy", "vendor", "buyer", "seller",
        "goods", "merchandise", "transaction",
    ],
};

// Action verbs that signal the user WANTS to draft/create something
// (used by looksLikeContractRequest)
const CONTRACT_ACTION_KEYWORDS: string[] = [
    // French
    "rédiger", "rediger", "créer", "creer", "établir", "etablir", "préparer",
    "preparer", "faire", "besoin", "veux", "voudrais", "souhaite", "souhait",
    "générer", "generer", "drafting", "contrat", "document", "accord",
    // Arabic
    "صياغة", "إنشاء", "إعداد", "تحضير", "أريد", "أحتاج", "عقد", "وثيقة", "اتفاقية",
    // English
    "draft", "drafting", "create", "write", "need", "want", "prepare",
    "generate", "make", "contract", "agreement", "document",
];

// ─────────────────────────────────────────────────────────────────────────────
// detectContractType
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Detects the most likely contract type from a user's free-form description.
 * Used in the contract builder to pick the right RAG domain.
 *
 * @param text - The user's description in any language (FR/AR/EN)
 * @returns One of: "rental" | "employment" | "service" | "nda" | "sale" | "custom"
 */
export function detectContractType(text: string): string {
    const lower = text.toLowerCase();

    // Score each type by keyword hits
    const scores: Record<string, number> = {
        rental: 0,
        employment: 0,
        service: 0,
        nda: 0,
        sale: 0,
    };

    for (const [type, keywords] of Object.entries(TYPE_KEYWORDS)) {
        for (const kw of keywords) {
            if (lower.includes(kw.toLowerCase())) {
                scores[type] += 1;
            }
        }
    }

    // Find the type with the highest score
    let bestType = "custom";
    let bestScore = 0;

    for (const [type, score] of Object.entries(scores)) {
        if (score > bestScore) {
            bestScore = score;
            bestType = type;
        }
    }

    return bestType;
}

// ─────────────────────────────────────────────────────────────────────────────
// getContractTitle
// ─────────────────────────────────────────────────────────────────────────────

const TITLES: Record<string, Record<string, string>> = {
    rental: {
        fr: "Contrat de Bail",
        ar: "عقد الإيجار",
        en: "Rental Agreement",
    },
    employment: {
        fr: "Contrat de Travail",
        ar: "عقد العمل",
        en: "Employment Contract",
    },
    service: {
        fr: "Contrat de Prestation de Services",
        ar: "عقد تقديم الخدمات",
        en: "Service Agreement",
    },
    nda: {
        fr: "Accord de Confidentialité",
        ar: "اتفاقية السرية",
        en: "Non-Disclosure Agreement",
    },
    sale: {
        fr: "Contrat de Vente",
        ar: "عقد البيع",
        en: "Sale Contract",
    },
    custom: {
        fr: "Document Juridique",
        ar: "وثيقة قانونية",
        en: "Legal Document",
    },
};

/**
 * Returns a human-readable contract title in the specified language.
 */
export function getContractTitle(type: string, language: string): string {
    return TITLES[type]?.[language] ?? TITLES.custom[language] ?? "Legal Document";
}

// ─────────────────────────────────────────────────────────────────────────────
// looksLikeContractRequest
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns true if the text looks like the user wants to CREATE/DRAFT a contract.
 * Used in /chat to decide whether to show the Contract Builder suggestion.
 *
 * Requires both:
 *   1. A contract-related keyword (any type)
 *   2. An action verb (rédiger, créer, draft, etc.)
 */
export function looksLikeContractRequest(text: string): boolean {
    const lower = text.toLowerCase();

    // Check for any contract-type keyword
    const hasContractKeyword = Object.values(TYPE_KEYWORDS)
        .flat()
        .some(kw => lower.includes(kw.toLowerCase()));

    // Check for any action verb
    const hasActionVerb = CONTRACT_ACTION_KEYWORDS.some(kw =>
        lower.includes(kw.toLowerCase())
    );

    return hasContractKeyword && hasActionVerb;
}
