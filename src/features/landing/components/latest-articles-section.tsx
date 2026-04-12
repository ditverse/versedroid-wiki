import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getBlogPosts } from "@/features/blog/actions/queries";

type Props = { locale: string };

// Category surface colors — use CSS vars
const catStyles: Record<string, { bg: string; color: string }> = {
    tutorial: { bg: "var(--vd-accent-surface)",  color: "var(--vd-accent)" },
    tips:     { bg: "var(--vd-warning-surface)", color: "var(--vd-warning)" },
    news:     { bg: "var(--vd-badge-neutral)",   color: "var(--vd-text-muted)" },
};

const catLabel: Record<string, string> = {
    tutorial: "Tutorial",
    tips: "Tips & Tricks",
    news: "News",
};

export async function LatestArticlesSection({ locale }: Props) {
    const [posts, t] = await Promise.all([
        getBlogPosts(locale),
        getTranslations("Landing.LatestArticles"),
    ]);
    const latest = posts.slice(0, 3);
    if (latest.length === 0) return null;

    return (
        <section className="px-6 py-[72px]" style={{ background: "var(--vd-bg)" }}>
            <div
                className="mx-auto max-w-[1100px]"
                style={{ borderTop: "1px solid var(--vd-border)" }}
            >
                {/* Section header */}
                <div className="py-12">
                    <p
                        className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em]"
                        style={{ color: "var(--vd-text-muted)" }}
                    >
                        {t("eyebrow")}
                    </p>
                    <h2
                        style={{
                            fontFamily: "var(--font-dm-display), serif",
                            fontSize: "clamp(28px, 4vw, 36px)",
                            letterSpacing: "-0.025em",
                            color: "var(--vd-text)",
                            fontWeight: 400,
                            lineHeight: "1.2",
                        }}
                    >
                        {t("title")}
                    </h2>
                </div>

                {/* 3-column grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {latest.map((post) => {
                        const cat = catStyles[post.category] ?? catStyles.news;
                        return (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="vd-card flex flex-col overflow-hidden"
                            >
                                {/* Thumbnail placeholder */}
                                <div
                                    className="h-36 flex items-center justify-center"
                                    style={{ background: cat.bg }}
                                >
                                    <span
                                        className="text-[11px] font-medium uppercase tracking-widest"
                                        style={{ color: cat.color }}
                                    >
                                        {catLabel[post.category] ?? post.category}
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col p-5">
                                    <div className="mb-3 flex items-center gap-3">
                                        <span
                                            className="rounded-full px-2.5 py-0.5 text-[11px]"
                                            style={{ background: cat.bg, color: cat.color }}
                                        >
                                            {catLabel[post.category] ?? post.category}
                                        </span>
                                        {post.publishedAt && (
                                            <span className="text-xs" style={{ color: "var(--vd-text-muted)" }}>
                                                {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                                                    day: "numeric", month: "short", year: "numeric",
                                                })}
                                            </span>
                                        )}
                                        {post.readTime > 0 && (
                                            <span className="text-xs" style={{ color: "var(--vd-text-muted)" }}>
                                                {post.readTime} min
                                            </span>
                                        )}
                                    </div>
                                    <h3
                                        className="mb-2 flex-1 text-sm font-medium leading-snug"
                                        style={{ color: "var(--vd-text)" }}
                                    >
                                        {post.title}
                                    </h3>
                                    <p
                                        className="text-sm leading-relaxed line-clamp-2"
                                        style={{ color: "var(--vd-text-muted)", lineHeight: "1.7" }}
                                    >
                                        {post.excerpt}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-8">
                    <Link
                        href="/blog"
                        className="text-sm transition-colors"
                        style={{ color: "var(--vd-text-secondary)" }}
                    >
                        {t("viewAll")}
                    </Link>
                </div>
            </div>
        </section>
    );
}
