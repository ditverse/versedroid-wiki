import { setRequestLocale } from "next-intl/server";
import { getBlogPosts, getFeaturedPost } from "@/features/blog/actions/queries";
import { BlogIndexContent } from "@/features/blog/components/blog-index-content";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function BlogIndexPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const [posts, featured] = await Promise.all([
        getBlogPosts(locale),
        getFeaturedPost(locale),
    ]);

    return (
        <div style={{ background: "var(--vd-bg)" }}>
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
                        Blog
                    </p>
                    <h1
                        style={{
                            fontFamily: "var(--font-dm-display), serif",
                            fontSize: "clamp(28px, 4vw, 36px)",
                            letterSpacing: "-0.025em",
                            color: "var(--vd-text)",
                            fontWeight: 400,
                            lineHeight: "1.2",
                        }}
                    >
                        Artikel &amp; Tutorial.
                    </h1>
                </div>
            </div>

            <BlogIndexContent posts={posts} featured={featured} />
        </div>
    );
}
