"use client";

import { useState } from "react";
import type { FaqCategory } from "@/features/faq/types";
import { FaqCard } from "@/features/faq/components/faq-card";

type Props = {
    categories: FaqCategory[];
};

export function FaqIndexContent({ categories }: Props) {
    const allArticles = categories.flatMap((cat) => cat.articles);
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const filteredArticles =
        activeCategory === "all"
            ? allArticles
            : categories
                  .find((c) => c.key === activeCategory)
                  ?.articles ?? [];

    const pills = [
        { key: "all", label: "Semua" },
        ...categories.map((c) => ({ key: c.key, label: c.label })),
    ];

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
                        Panduan
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
                        Dari mana kamu mau mulai?
                    </h1>
                    <p
                        className="max-w-xl text-sm leading-relaxed"
                        style={{ color: "var(--vd-text-secondary)", lineHeight: "1.7" }}
                    >
                        Bingung mulai dari mana? Mulai dari Unlock Bootloader — satu langkah yang membuka semua pintu modifikasi.
                    </p>
                </div>
            </div>

            {/* Filter + Grid */}
            <div className="px-6 py-12">
                <div className="mx-auto max-w-[1100px]">
                    {/* Filter pills */}
                    <div className="mb-8 flex flex-wrap gap-2">
                        {pills.map((pill) => {
                            const isActive = pill.key === activeCategory;
                            return (
                                <button
                                    key={pill.key}
                                    onClick={() => setActiveCategory(pill.key)}
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

                    {/* Article Grid */}
                    {filteredArticles.length > 0 ? (
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredArticles.map((article) => (
                                <FaqCard key={article.slug} article={article} />
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="py-16 text-center">
                            <p className="text-sm" style={{ color: "var(--vd-text-muted)" }}>
                                Panduan sedang ditulis. Cek lagi sebentar.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
