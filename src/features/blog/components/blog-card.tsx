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

type BlogCardProps = {
    post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
    const cat = categoryColor[post.category] ?? { bg: "var(--vd-badge-neutral)", color: "var(--vd-text-muted)" };

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="vd-card flex flex-col overflow-hidden"
        >
            {/* Thumbnail */}
            <div
                className="h-36 flex items-center justify-center"
                style={{ background: cat.bg }}
            >
                <span
                    className="text-[11px] font-medium uppercase tracking-widest"
                    style={{ color: cat.color }}
                >
                    {categoryLabel[post.category] ?? post.category}
                </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
                {/* Meta */}
                <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span
                        className="rounded-full px-2.5 py-0.5 text-[11px]"
                        style={{ background: cat.bg, color: cat.color }}
                    >
                        {categoryLabel[post.category] ?? post.category}
                    </span>
                    {post.publishedAt && (
                        <span className="text-xs" style={{ color: "var(--vd-text-muted)" }}>
                            {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </span>
                    )}
                    {post.readTime > 0 && (
                        <span className="text-xs" style={{ color: "var(--vd-text-muted)" }}>
                            {post.readTime} min baca
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3
                    className="mb-2 flex-1 text-sm font-medium leading-snug"
                    style={{ color: "var(--vd-text)" }}
                >
                    {post.title}
                </h3>

                {/* Excerpt — 2 lines max */}
                <p
                    className="text-sm line-clamp-2"
                    style={{ color: "var(--vd-text-muted)", lineHeight: "1.7" }}
                >
                    {post.excerpt}
                </p>
            </div>
        </Link>
    );
}
