import React from 'react';
import { X, FileText, Image as ImageIcon, FileOutput, FileSpreadsheet, Download } from 'lucide-react';

export interface FileAttachment {
    id: string;        // ID or local object URL
    name: string;      // originalName or file.name
    url: string;       // download URL or local object URL
    mimetype: string;
    size: number;
}

interface FilePreviewProps {
    file: FileAttachment;
    onRemove?: () => void;
    mode?: 'input' | 'display';
}

const getFileIcon = (mimetype: string) => {
    if (mimetype.startsWith('image/')) return <ImageIcon className="w-5 h-5 text-purple-400" />;
    if (mimetype === 'application/pdf') return <FileOutput className="w-5 h-5 text-red-400" />;
    if (mimetype === 'text/plain' || mimetype === 'text/markdown') return <FileText className="w-5 h-5 text-blue-400" />;
    if (mimetype === 'text/csv') return <FileSpreadsheet className="w-5 h-5 text-green-400" />;
    return <FileText className="w-5 h-5 text-gray-400" />;
};

const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
};

export function FilePreview({ file, onRemove, mode = 'input' }: FilePreviewProps) {
    const isImage = file.mimetype.startsWith('image/');

    return (
        <div className={`relative flex items-center gap-3 p-2 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md shadow-sm overflow-hidden group transition-all duration-200 hover:border-[var(--glass-border-hover)] ${mode === 'input' ? 'pr-10' : 'pr-4 w-fit max-w-sm'}`}>

            {/* Thumbnail or Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--background)]/50 flex items-center justify-center overflow-hidden border border-[var(--glass-border)]">
                {isImage && file.url ? (
                    <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                ) : (
                    getFileIcon(file.mimetype)
                )}
            </div>

            {/* File Info */}
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-medium text-[var(--foreground)] truncate pr-2">
                    {file.name}
                </span>
                <span className="text-xs text-[var(--muted-foreground)]">
                    {formatSize(file.size)}
                </span>
            </div>

            {/* Actions */}
            {mode === 'input' && onRemove && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[var(--background)]/80 text-[var(--muted-foreground)] hover:text-red-400 hover:bg-black/40 transition-colors"
                    title="Remove attachment"
                >
                    <X className="w-4 h-4" />
                </button>
            )}

            {mode === 'display' && (
                <a
                    href={file.url}
                    download={file.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 ml-2 p-1.5 rounded-full text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors opacity-0 group-hover:opacity-100"
                    title="Download file"
                >
                    <Download className="w-4 h-4" />
                </a>
            )}
        </div>
    );
}
