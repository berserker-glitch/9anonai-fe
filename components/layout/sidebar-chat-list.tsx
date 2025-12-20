import { ReactNode } from "react";

interface SidebarChatListProps {
    children: ReactNode;
    title?: string;
}

export function SidebarChatList({ children, title }: SidebarChatListProps) {
    return (
        <div className="flex-1 overflow-y-auto py-2">
            {title && (
                <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {title}
                </h3>
            )}
            <nav className="flex flex-col gap-0.5 px-2">
                {children}
            </nav>
        </div>
    );
}
