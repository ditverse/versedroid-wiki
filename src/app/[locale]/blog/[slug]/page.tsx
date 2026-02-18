import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { blogPosts, getBlogBySlug, getRelatedPosts } from "@/features/blog";
import { FaqContent } from "@/features/faq/components/faq-content";
import { TableOfContents } from "@/components/shared/table-of-contents";
import { ShareButtons } from "@/features/blog/components/share-buttons";
import { BlogCard } from "@/features/blog/components/blog-card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";
import { Calendar, Clock, User } from "lucide-react";

export function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export default async function BlogDetailPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const post = getBlogBySlug(slug);
    if (!post) notFound();

    return <BlogDetailContent slug={slug} />;
}

function BlogDetailContent({ slug }: { slug: string }) {
    const t = useTranslations("BlogDetail");
    const tCommon = useTranslations("Common");
    const tIndex = useTranslations("BlogIndex");
    const tPost = useTranslations("BlogPosts");

    const post = getBlogBySlug(slug)!;
    const related = getRelatedPosts(post.relatedSlugs);

    const tocItems = post.content
        .filter((block): block is Extract<typeof block, { type: "heading" }> =>
            block.type === "heading"
        )
        .map((block) => ({ id: block.id, text: block.text }));

    return (
        <section className="px-4 py-8 sm:py-12">
            <div className="mx-auto max-w-7xl">
                {/* Breadcrumbs */}
                <Breadcrumb className="mb-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">{tCommon("home")}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/blog">Blog</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {tPost(post.titleKey)}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="flex gap-8">
                    {/* Main content */}
                    <article className="min-w-0 flex-1">
                        {/* Meta */}
                        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-vd-text-secondary">
                            <Badge variant="secondary" className="bg-vd-bg-tertiary text-vd-text-secondary text-[10px]">
                                {tIndex(post.category)}
                            </Badge>
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {new Date(post.date).toLocaleDateString("id-ID", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {post.readTime} {tIndex("minRead")}
                            </span>
                            <span className="flex items-center gap-1">
                                <User className="h-3.5 w-3.5" />
                                {post.author}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="mb-8 text-3xl font-bold text-vd-text-primary sm:text-4xl animate-fade-in">
                            {tPost(post.titleKey)}
                        </h1>

                        {/* Content — reuse FaqContent renderer */}
                        <FaqContent content={post.content} faqItems={[]} />

                        {/* Share + Divider */}
                        <Separator className="my-10 bg-vd-border" />
                        <ShareButtons />

                        {/* Related Posts */}
                        {related.length > 0 && (
                            <div className="mt-12">
                                <h2 className="mb-6 text-xl font-bold text-vd-text-primary">
                                    {t("relatedPosts")}
                                </h2>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    {related.map((rp) => (
                                        <BlogCard key={rp.slug} post={rp} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>

                    {/* TOC */}
                    <TableOfContents items={tocItems} />
                </div>
            </div>
        </section>
    );
}
