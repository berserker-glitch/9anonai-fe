"use client";

import { cn } from "@/lib/utils";

interface ContractWelcomeProps {
    onSelectType: (type: string, title: string) => void;
    className?: string;
}

export function ContractWelcome({ onSelectType, className }: ContractWelcomeProps) {
    const contractTypes = [
        {
            id: "rental",
            title: "Contrat de Bail",
            description: "Locaux d'habitation ou commerciaux",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            ),
        },
        {
            id: "employment",
            title: "Contrat de Travail",
            description: "CDI, CDD, ou stage",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
            ),
        },
        {
            id: "service",
            title: "Prestation de Service",
            description: "Freelance, conseil, maintenance",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
            ),
        },
        {
            id: "nda",
            title: "Confidentialité (NDA)",
            description: "Pour protéger vos idées",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
            ),
        },
        {
            id: "sale",
            title: "Contrat de Vente",
            description: "Biens mobiliers ou immobiliers",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
            ),
        },
        {
            id: "custom",
            title: "Autre Document",
            description: "Document sur mesure",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                </svg>
            ),
        },
    ];

    return (
        <div className={cn("max-w-4xl mx-auto p-6", className)}>
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-3">
                    Contract Builder
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Select a contract type to start drafting with our AI legal assistant.
                    All contracts are verified against Moroccan law.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contractTypes.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => onSelectType(type.id, type.title)}
                        className="flex flex-col items-center text-center p-6 rounded-xl border bg-card hover:bg-muted/50 transition-all hover:scale-[1.02] hover:shadow-md group"
                    >
                        <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                            {type.icon}
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{type.title}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
