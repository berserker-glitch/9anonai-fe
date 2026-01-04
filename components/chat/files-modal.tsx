"use client";

import { Modal } from "../utility/modal";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";

interface FileItem {
    id: string;
    name: string;
    date: string;
    size: string;
    url: string;
}

interface FilesModalProps {
    isOpen: boolean;
    onClose: () => void;
    // In a real app efficiently, we would fetch these from an API
    files?: FileItem[];
}

export function FilesModal({ isOpen, onClose }: FilesModalProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [files, setFiles] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth(); // Provide token from context

    // Fetch files when modal opens
    useEffect(() => {
        if (isOpen && token) {
            fetchFiles();
        }
    }, [isOpen, token]);

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/pdf/list`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                // Map backend data to frontend interface
                const mapped = data.map((d: any) => ({
                    id: d.id,
                    name: d.filename,
                    date: new Date(d.createdAt).toLocaleDateString(),
                    size: "PDF", // info not currently available
                    url: "#"
                }));
                setFiles(mapped);
            }
        } catch (error) {
            console.error("Failed to fetch files", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (id: string, filename: string) => {
        if (!token) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/pdf/download/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Download failed");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (e) {
            console.error("Download error", e);
        }
    };

    const filteredFiles = files.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Generated Documents" size="lg">
            <div className="flex flex-col h-[500px] -m-4">
                {/* Header / Search */}
                <div className="p-4 border-b border-border">
                    <div className="relative">
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search files..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>

                {/* File List */}
                <div className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <div className="flex h-full items-center justify-center">
                            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
                        </div>
                    ) : filteredFiles.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className="group relative flex flex-col p-4 bg-muted/30 border border-border rounded-xl hover:bg-muted/50 hover:border-primary/30 transition-all duration-200"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="font-medium text-sm truncate mb-1 pr-2" title={file.name}>
                                        {file.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
                                        <span>{file.date}</span>
                                    </div>

                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 rounded-xl backdrop-blur-[1px]">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDownload(file.id, file.name);
                                            }}
                                            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg shadow-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                            <div className="h-16 w-16 mb-4 rounded-2xl bg-muted flex items-center justify-center">
                                <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <p className="font-medium">No documents found</p>
                            <p className="text-sm opacity-70 mt-1">Generated legal documents will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}
