"use client";

import { useState } from "react";
import type { ToolCategory } from "@/features/tools/types";
import { ToolCard } from "@/features/tools/components/tool-card";

type Props = {
    categories: ToolCategory[];
};

const osPills = [
    { key: "all", label: "Semua" },
    { key: "windows", label: "Windows" },
    { key: "macos", label: "macOS" },
    { key: "linux", label: "Linux" },
];

export function ToolsIndexContent({ categories }: Props) {
    const [activeOs, setActiveOs] = useState("all");

    // Filter non-empty categories
    const visibleCategories = categories.filter((c) => c.articles.length > 0);

    return (
        <div style={{ background: "var(--vd-bg)", minHeight: "100vh" }}>
            {/* Page Header */}
            <div
                className="px-6 py-16 lg:py-20"
                style={{ borderBottom: "1px solid var(--vd-border)" }}
            >
                <div className="mx-auto max-w-[1100px]">
                    <p
                        className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em]"
                        style={{ color: "var(--vd-text-muted)" }}
                    >
                        Tools
                    </p>
                    <h1
                        className="mb-4"
                        style={{
                            fontFamily: "var(--font-dm-display), serif",
                            fontSize: "clamp(28px, 4vw, 36px)",
                            letterSpacing: "-0.025em",
                            color: "var(--vd-text)",
                            fontWeight: 400,
                            lineHeight: "1.2",
                        }}
                    >
                        Semua yang kamu butuhkan untuk mulai.
                    </h1>
                    <p
                        className="max-w-xl text-sm leading-relaxed"
                        style={{ color: "var(--vd-text-secondary)", lineHeight: "1.7" }}
                    >
                        Dari ADB sampai flashing tool. Dikelompokkan berdasarkan fungsi, bukan urutan abjad.
                    </p>
                </div>
            </div>

            {/* Filter + Grid */}
            <div className="px-6 py-12">
                <div className="mx-auto max-w-[1100px]">
                    {/* OS Filter */}
                    <div className="mb-10 flex flex-wrap gap-2">
                        {osPills.map((pill) => {
                            const isActive = pill.key === activeOs;
                            return (
                                <button
                                    key={pill.key}
                                    onClick={() => setActiveOs(pill.key)}
                                    className="rounded-full px-4 py-1.5 text-sm transition-colors"
                                    style={{
                                        background: isActive ? "var(--vd-accent)" : "transparent",
                                        color: isActive ? "var(--vd-bg)" : "var(--vd-text-muted)",
                                        border: isActive ? "1px solid var(--vd-accent)" : "1px solid var(--vd-border)",
                                    }}
                                >
                                    {pill.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Categories */}
                    {visibleCategories.length > 0 ? (
                        <div className="space-y-12">
                            {visibleCategories.map((category) => (
                                <div key={category.key}>
                                    {/* Category label */}
                                    <p
                                        className="mb-6 text-[11px] font-medium uppercase tracking-[0.1em]"
                                        style={{ color: "var(--vd-text-muted)" }}
                                    >
                                        {category.label}
                                    </p>

                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {category.articles.map((article) => (
                                            <ToolCard key={article.slug} article={article} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 text-center">
                            <p className="text-sm" style={{ color: "var(--vd-text-muted)" }}>
                                Belum ada tools. Segera hadir.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
