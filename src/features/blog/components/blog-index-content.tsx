"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { blogPosts, getFeaturedPost, getPostsByCategory } from "@/features/blog";
import { BlogCard } from "@/features/blog/components/blog-card";
import { FeaturedPost } from "@/features/blog/components/featured-post";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Badge } from "@/components/ui/badge";

const categories = ["all", "tutorial", "tips", "news"] as const;

export function BlogIndexContent() {
    const t = useTranslations("BlogIndex");
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const featured = getFeaturedPost();
    const filteredPosts = getPostsByCategory(activeCategory).filter(
        (p) => !p.featured || activeCategory !== "all"
    );

    return (
        <section className="px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-vd-text-primary sm:text-4xl md:text-5xl animate-fade-in">
                        {t("title")}
                    </h1>
                    <p className="mx-auto max-w-2xl text-base text-vd-text-secondary sm:text-lg animate-fade-in stagger-2">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Featured Post */}
                {featured && activeCategory === "all" && (
                    <ScrollReveal>
                        <div className="mb-10">
                            <FeaturedPost post={featured} />
                        </div>
                    </ScrollReveal>
                )}

                {/* Category Filter */}
                <div className="mb-8 flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className="focus:outline-none"
                        >
                            <Badge
                                variant={activeCategory === cat ? "default" : "secondary"}
                                className={`cursor-pointer text-xs px-3 py-1.5 transition-colors ${activeCategory === cat
                                        ? "bg-vd-accent text-vd-bg-primary"
                                        : "bg-vd-bg-tertiary text-vd-text-secondary hover:text-vd-text-primary"
                                    }`}
                            >
                                {t(cat)}
                            </Badge>
                        </button>
                    ))}
                </div>

                {/* Blog Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post, i) => (
                        <ScrollReveal key={post.slug} delay={50 * i}>
                            <BlogCard post={post} />
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
