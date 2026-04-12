"use client";

import { useState } from "react";
import type { BlogPost } from "@/features/blog/types";
import { BlogCard } from "@/features/blog/components/blog-card";
import { FeaturedPost } from "@/features/blog/components/featured-post";

const categories = [
    { key: "all", label: "Semua" },
    { key: "tutorial", label: "Tutorial" },
    { key: "tips", label: "Tips & Tricks" },
    { key: "news", label: "News" },
] as const;

type BlogIndexContentProps = {
    posts: BlogPost[];
    featured: BlogPost | null;
};

export function BlogIndexContent({ posts, featured }: BlogIndexContentProps) {
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const filteredPosts =
        activeCategory === "all"
            ? posts.filter((p) => !p.featured)
            : posts.filter((p) => p.category === activeCategory);

    return (
        <div style={{ background: "var(--vd-bg)", minHeight: "100vh" }}>
            {/* Featured Article */}
            {featured && activeCategory === "all" && (
                <div className="px-6 pt-10 pb-0">
                    <div className="mx-auto max-w-[1100px]">
                        <FeaturedPost post={featured} />
                    </div>
                </div>
            )}

            {/* Filter + Grid */}
            <div className="px-6 py-10">
                <div className="mx-auto max-w-[1100px]">
                    {/* Filter pills */}
                    <div className="mb-8 flex flex-wrap gap-2">
                        {categories.map((cat) => {
                            const isActive = cat.key === activeCategory;
                            return (
                                <button
                                    key={cat.key}
                                    onClick={() => setActiveCategory(cat.key)}
                                    className="rounded-full px-4 py-1.5 text-sm transition-colors"
                                    style={{
                                        background: isActive ? "var(--vd-accent)" : "transparent",
                                        color: isActive ? "var(--vd-bg)" : "var(--vd-text-muted)",
                                        border: isActive ? "1px solid var(--vd-accent)" : "1px solid var(--vd-border)",
                                    }}
                                >
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Blog Grid */}
                    {filteredPosts.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredPosts.map((post) => (
                                <BlogCard key={post.slug} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 text-center">
                            <p className="text-sm" style={{ color: "var(--vd-text-muted)" }}>
                                Belum ada artikel. Segera hadir.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
