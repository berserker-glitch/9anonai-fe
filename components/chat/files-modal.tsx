"use client";

import { Modal } from "../utility/modal";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";

interface FileItem {
    id: string;
    name: string;
    originalName: string;
    date: string;
    size: number;
    mimetype: string;
    url: string;
}

interface FilesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FilesModal({ isOpen, onClose }: FilesModalProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [files, setFiles] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    useEffect(() => {
        if (isOpen && token) {
            fetchFiles();
        }
    }, [isOpen, token]);

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/upload/files`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.files) {
                    const mapped = data.files.map((d: any) => ({
                        id: d.id,
                        name: d.filename,
                        originalName: d.originalName,
                        date: new Date(d.createdAt).toLocaleDateString(),
                        size: d.size,
                        mimetype: d.mimetype,
                        url: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/upload/files/${d.id}/download`
                    }));
                    setFiles(mapped);
                }
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/upload/files/${id}/download`, {
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

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!token || !confirm("Are you sure you want to delete this file?")) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/upload/files/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                setFiles(prev => prev.filter(f => f.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete file", error);
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const getFileIcon = (mimetype: string) => {
        if (mimetype.startsWith('image/')) {
            return (
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                </div>
            );
        }
        if (mimetype === 'application/pdf') {
            return (
                <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                </div>
            );
        }
        if (mimetype.includes('csv') || mimetype.includes('excel') || mimetype.includes('spreadsheet')) {
            return (
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="8" y1="13" x2="16" y2="13"></line>
                        <line x1="8" y1="17" x2="16" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                </div>
            );
        }
        return (
            <div className="h-10 w-10 rounded-lg bg-gray-500/10 flex items-center justify-center text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
        );
    };

    const filteredFiles = files.filter(f =>
        f.originalName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Uploaded Files" size="lg">
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
                                        {getFileIcon(file.mimetype)}
                                        <button
                                            onClick={(e) => handleDelete(file.id, e)}
                                            className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Delete file"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                    <h3 className="font-medium text-sm truncate mb-1 pr-2" title={file.originalName}>
                                        {file.originalName}
                                    </h3>
                                    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground mt-auto">
                                        <span>{file.date}</span>
                                        <span>{formatSize(file.size)}</span>
                                    </div>

                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 rounded-xl backdrop-blur-[1px] pointer-events-none">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDownload(file.id, file.originalName);
                                            }}
                                            className="pointer-events-auto px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg shadow-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
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
                            <p className="font-medium">No files found</p>
                            <p className="text-sm opacity-70 mt-1">Uploaded files will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}
