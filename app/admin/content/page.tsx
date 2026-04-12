"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FileText, Zap, Upload, HardDrive, ThumbsUp, ThumbsDown } from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { ChartCard } from "@/components/admin/chart-card";
import { AreaChartWrapper } from "@/components/admin/area-chart-wrapper";
import { BarChartWrapper } from "@/components/admin/bar-chart-wrapper";
import { PieChartWrapper } from "@/components/admin/pie-chart-wrapper";
import { useAdminFetch } from "@/components/admin/use-admin-fetch";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ContentData {
    contracts: {
        total: number;
        byType: Array<{ type: string; count: number }>;
        byLanguage: Array<{ language: string; count: number }>;
        byStatus: Array<{ status: string; count: number }>;
        timeseries: Array<{ date: string; count: number }>;
    };
    documents: {
        total: number;
        byType: Array<{ type: string; count: number }>;
        timeseries: Array<{ date: string; count: number }>;
    };
    files: {
        total: number;
        totalSizeBytes: number;
        byMimetype: Array<{ mimetype: string; count: number }>;
        timeseries: Array<{ date: string; count: number }>;
    };
    feedback: {
        totalLikes: number;
        totalDislikes: number;
        rateOverTime: Array<{ date: string; likes: number; dislikes: number }>;
    };
    featureAdoption: {
        chatUsersPercent: number;
        contractUsersPercent: number;
        fileUploadUsersPercent: number;
        docGenUsersPercent: number;
    };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
    if (!bytes || bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function formatXAxisDate(dateStr: string): string {
    try {
        if (dateStr.length === 7) {
            const [year, month] = dateStr.split("-");
            return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", { month: "short", year: "2-digit" });
        }
        return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
        return dateStr;
    }
}

function sanitizeMimetype(mime: string): string {
    if (mime.includes("pdf")) return "PDF";
    if (mime.includes("word") || mime.includes("docx")) return "Word";
    if (mime.includes("image")) return "Image";
    if (mime.includes("text")) return "Text";
    if (mime.includes("excel") || mime.includes("xlsx")) return "Excel";
    return mime.split("/")[1]?.toUpperCase() || mime;
}

const LANGUAGE_LABELS: Record<string, string> = { fr: "French", ar: "Arabic", en: "English" };
const CONTRACT_TYPE_LABELS: Record<string, string> = {
    rental: "Rental",
    employment: "Employment",
    nda: "NDA",
    service: "Service",
    custom: "Custom",
};

// ─── Content & Features Page ─────────────────────────────────────────────────

function ContentContent({ range }: { range: string }) {
    const { data: content, isLoading } = useAdminFetch<ContentData>("/admin/analytics/content/overview", range);

    const contracts = content?.contracts;
    const documents = content?.documents;
    const files = content?.files;
    const feedback = content?.feedback;
    const adoption = content?.featureAdoption;

    // Charts data
    const adoptionData = adoption ? [
        { name: "Chat / Q&A", value: adoption.chatUsersPercent },
        { name: "Contract Builder", value: adoption.contractUsersPercent },
        { name: "File Uploads", value: adoption.fileUploadUsersPercent },
        { name: "Doc Generation", value: adoption.docGenUsersPercent },
    ] : [];

    const contractTypePie = (contracts?.byType || []).map((t) => ({
        name: CONTRACT_TYPE_LABELS[t.type] || t.type,
        value: t.count,
    }));

    const contractLangPie = (contracts?.byLanguage || []).map((l) => ({
        name: LANGUAGE_LABELS[l.language] || l.language,
        value: l.count,
    }));

    const docTypeBar = (documents?.byType || []).map((t) => ({
        name: CONTRACT_TYPE_LABELS[t.type] || t.type,
        count: t.count,
    }));

    const mimetypeBar = (files?.byMimetype || []).map((m) => ({
        name: sanitizeMimetype(m.mimetype),
        count: m.count,
    }));

    const feedbackChartData = (feedback?.rateOverTime || []).map((f) => ({
        date: formatXAxisDate(f.date),
        likes: f.likes,
        dislikes: f.dislikes,
    }));

    const contractTimeseriesData = (contracts?.timeseries || []).map((t) => ({
        date: formatXAxisDate(t.date),
        count: t.count,
    }));

    const LoadingSpinner = () => (
        <div className="h-48 flex items-center justify-center">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Title */}
            <div>
                <h2 className="text-2xl font-bold">Content & Features</h2>
                <p className="text-muted-foreground text-sm mt-1">Usage analytics for all platform features</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard
                    title="Contract Sessions"
                    value={isLoading ? "—" : (contracts?.total ?? 0)}
                    subtitle="Builder sessions created"
                    icon={<Zap className="h-6 w-6" />}
                    iconBg="bg-cyan-500/10"
                    iconColor="text-cyan-500"
                />
                <StatCard
                    title="Documents Generated"
                    value={isLoading ? "—" : (documents?.total ?? 0)}
                    subtitle="Legal docs exported"
                    icon={<FileText className="h-6 w-6" />}
                    iconBg="bg-orange-500/10"
                    iconColor="text-orange-500"
                />
                <StatCard
                    title="Files Uploaded"
                    value={isLoading ? "—" : (files?.total ?? 0)}
                    subtitle={isLoading ? "" : `Total: ${formatBytes(files?.totalSizeBytes ?? 0)}`}
                    icon={<Upload className="h-6 w-6" />}
                    iconBg="bg-violet-500/10"
                    iconColor="text-violet-500"
                />
                <StatCard
                    title="Total Storage"
                    value={isLoading ? "—" : formatBytes(files?.totalSizeBytes ?? 0)}
                    subtitle="Files storage used"
                    icon={<HardDrive className="h-6 w-6" />}
                    iconBg="bg-rose-500/10"
                    iconColor="text-rose-500"
                />
            </div>

            {/* Feedback KPI Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                    title="Positive Feedback"
                    value={isLoading ? "—" : (feedback?.totalLikes ?? 0)}
                    subtitle={isLoading ? "" : `${
                        feedback && (feedback.totalLikes + feedback.totalDislikes) > 0
                            ? Math.round((feedback.totalLikes / (feedback.totalLikes + feedback.totalDislikes)) * 100)
                            : 0
                    }% satisfaction rate`}
                    icon={<ThumbsUp className="h-6 w-6" />}
                    iconBg="bg-green-500/10"
                    iconColor="text-green-500"
                />
                <StatCard
                    title="Negative Feedback"
                    value={isLoading ? "—" : (feedback?.totalDislikes ?? 0)}
                    subtitle="User dislikes"
                    icon={<ThumbsDown className="h-6 w-6" />}
                    iconBg="bg-red-500/10"
                    iconColor="text-red-500"
                />
            </div>

            {/* Feature Adoption */}
            <ChartCard
                title="Feature Adoption Rates"
                subtitle="Percentage of users who have used each feature (all time)"
            >
                {isLoading ? <LoadingSpinner /> : (
                    <div className="space-y-4">
                        {adoptionData.map((item) => (
                            <div key={item.name}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-sm font-medium">{item.name}</span>
                                    <span className="text-sm font-bold">{item.value}%</span>
                                </div>
                                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-700"
                                        style={{ width: `${Math.min(item.value, 100)}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                        {adoptionData.length === 0 && (
                            <p className="text-muted-foreground text-sm text-center py-4">No data available</p>
                        )}
                    </div>
                )}
            </ChartCard>

            {/* Contract type + language pies */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ChartCard title="Contracts by Type" subtitle="Distribution of contract types created">
                    {isLoading ? <LoadingSpinner /> : (
                        <PieChartWrapper
                            data={contractTypePie}
                            height={260}
                            emptyMessage="No contract sessions yet"
                            showLegend
                        />
                    )}
                </ChartCard>
                <ChartCard title="Contracts by Language" subtitle="ar · fr · en breakdown">
                    {isLoading ? <LoadingSpinner /> : (
                        <PieChartWrapper
                            data={contractLangPie}
                            height={260}
                            emptyMessage="No contract sessions yet"
                            showLegend
                        />
                    )}
                </ChartCard>
            </div>

            {/* Documents by type + Feedback over time */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ChartCard title="Documents by Type" subtitle="Generated document categories">
                    {isLoading ? <LoadingSpinner /> : (
                        <BarChartWrapper
                            data={docTypeBar}
                            xKey="name"
                            bars={[{ key: "count", label: "Documents" }]}
                            height={260}
                            emptyMessage="No documents generated yet"
                        />
                    )}
                </ChartCard>
                <ChartCard title="Feedback Over Time" subtitle="Likes vs dislikes trend">
                    {isLoading ? <LoadingSpinner /> : (
                        <AreaChartWrapper
                            data={feedbackChartData}
                            series={[
                                { key: "likes", label: "Likes", color: "chart-1" },
                                { key: "dislikes", label: "Dislikes", color: "chart-4" },
                            ]}
                            height={260}
                            emptyMessage="No feedback data in this period"
                        />
                    )}
                </ChartCard>
            </div>

            {/* File types */}
            <ChartCard title="File Types Uploaded" subtitle="Breakdown of uploaded file formats">
                {isLoading ? <LoadingSpinner /> : (
                    <BarChartWrapper
                        data={mimetypeBar}
                        xKey="name"
                        bars={[{ key: "count", label: "Files" }]}
                        height={220}
                        emptyMessage="No files uploaded yet"
                    />
                )}
            </ChartCard>

            {/* Contract sessions timeseries */}
            <ChartCard
                title="Contract Sessions Over Time"
                subtitle="Builder activity trend"
            >
                {isLoading ? <LoadingSpinner /> : (
                    <AreaChartWrapper
                        data={contractTimeseriesData}
                        series={[{ key: "count", label: "Sessions", color: "chart-2" }]}
                        height={260}
                        emptyMessage="No contract sessions in this period"
                    />
                )}
            </ChartCard>
        </div>
    );
}

function ContentPageInner() {
    const searchParams = useSearchParams();
    const range = searchParams.get("range") || "30d";
    return <ContentContent range={range} />;
}

export default function ContentPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        }>
            <ContentPageInner />
        </Suspense>
    );
}
