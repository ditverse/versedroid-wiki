import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/features/blog/types";

const categoryLabel: Record<string, string> = {
    tutorial: "Tutorial",
    tips: "Tips & Tricks",
    news: "News",
};

const categoryColor: Record<string, { bg: string; color: string }> = {
    tutorial: { bg: "var(--vd-accent-surface)",  color: "var(--vd-accent)" },
    tips:     { bg: "var(--vd-warning-surface)", color: "var(--vd-warning)" },
    news:     { bg: "var(--vd-badge-neutral)",   color: "var(--vd-text-muted)" },
};

type FeaturedPostProps = {
    post: BlogPost;
};

export function FeaturedPost({ post }: FeaturedPostProps) {
    const cat = categoryColor[post.category] ?? { bg: "var(--vd-badge-neutral)", color: "var(--vd-text-muted)" };

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="vd-card grid overflow-hidden sm:grid-cols-2"
        >
            {/* Thumbnail */}
            <div
                className="flex h-48 items-center justify-center sm:h-full sm:min-h-[260px]"
                style={{ background: cat.bg }}
            >
                <span
                    className="text-[11px] font-medium uppercase tracking-widest"
                    style={{ color: cat.color }}
                >
                    {categoryLabel[post.category] ?? post.category}
                </span>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-8">
                {/* Meta */}
                <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span
                        className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                        style={{ background: "var(--vd-accent)", color: "var(--vd-bg)" }}
                    >
                        Featured
                    </span>
                    <span
                        className="rounded-full px-2.5 py-0.5 text-[11px]"
                        style={{ background: cat.bg, color: cat.color }}
                    >
                        {categoryLabel[post.category] ?? post.category}
                    </span>
                    {post.readTime > 0 && (
                        <span className="text-xs" style={{ color: "var(--vd-text-muted)" }}>
                            {post.readTime} min baca
                        </span>
                    )}
                </div>

                <h2
                    className="mb-3"
                    style={{
                        fontFamily: "var(--font-dm-display), serif",
                        fontSize: "clamp(22px, 3vw, 32px)",
                        fontWeight: 400,
                        color: "var(--vd-text)",
                        letterSpacing: "-0.02em",
                        lineHeight: "1.25",
                    }}
                >
                    {post.title}
                </h2>

                <p
                    className="mb-5 text-sm leading-relaxed"
                    style={{ color: "var(--vd-text-secondary)", lineHeight: "1.7" }}
                >
                    {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                    <div className="text-xs" style={{ color: "var(--vd-text-muted)" }}>
                        {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString("id-ID", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                              })
                            : "Draft"}
                        {post.author && (
                            <span className="ml-2">· {post.author}</span>
                        )}
                    </div>
                    <span
                        className="text-sm font-medium"
                        style={{ color: "var(--vd-accent)" }}
                    >
                        Baca →
                    </span>
                </div>
            </div>
        </Link>
    );
}
