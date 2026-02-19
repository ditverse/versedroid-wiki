import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
    getFaqCategories,
    getFaqBySlug,
    getAdjacentFaqArticles,
    getAllFaqSlugs,
} from "@/features/faq/actions/queries";
import type { FaqArticle, FaqCategory } from "@/features/faq/types";
import { DocSidebar } from "@/components/shared/doc-sidebar";
import { TableOfContents } from "@/components/shared/table-of-contents";
import { PrevNextNav } from "@/components/shared/prev-next-nav";
import { FaqContent } from "@/features/faq/components/faq-content";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";

export async function generateStaticParams() {
    const slugs = await getAllFaqSlugs();
    return slugs.map((slug) => ({ slug }));
}

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export default async function FaqDetailPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const [article, categories, adjacent] = await Promise.all([
        getFaqBySlug(slug, locale),
        getFaqCategories(locale),
        getAdjacentFaqArticles(slug),
    ]);

    if (!article) notFound();

    return (
        <FaqDetailContent
            article={article}
            categories={categories}
            prev={adjacent.prev}
            next={adjacent.next}
        />
    );
}

function FaqDetailContent({
    article,
    categories,
    prev,
    next,
}: {
    article: FaqArticle;
    categories: FaqCategory[];
    prev: FaqArticle | null;
    next: FaqArticle | null;
}) {
    const tCommon = useTranslations("Common");

    const sidebarCategories = categories.map((cat) => ({
        key: cat.key,
        label: cat.label,
        items: cat.articles.map((a) => ({
            slug: a.slug,
            title: a.title,
        })),
    }));

    const tocItems = article.content
        .filter((block): block is Extract<typeof block, { type: "heading" }> =>
            block.type === "heading"
        )
        .map((block) => ({ id: block.id, text: block.text }));

    if (article.faqItems.length > 0) {
        tocItems.push({ id: "faq", text: "FAQ" });
    }

    return (
        <section className="px-4 py-8 sm:py-12">
            <div className="mx-auto flex max-w-7xl gap-8">
                {/* Sidebar */}
                <DocSidebar
                    categories={sidebarCategories}
                    basePath="/faq"
                />

                {/* Main content */}
                <div className="min-w-0 flex-1">
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
                                    <Link href="/faq">FAQ</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    {article.title}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {/* Article title */}
                    <h1 className="mb-8 text-3xl font-bold text-vd-text-primary sm:text-4xl animate-fade-in">
                        {article.title}
                    </h1>

                    {/* Article content */}
                    <FaqContent
                        content={article.content}
                        faqItems={article.faqItems}
                    />

                    {/* Prev / Next */}
                    <PrevNextNav
                        prev={
                            prev
                                ? { slug: prev.slug, title: prev.title }
                                : null
                        }
                        next={
                            next
                                ? { slug: next.slug, title: next.title }
                                : null
                        }
                        basePath="/faq"
                    />
                </div>

                {/* TOC */}
                <TableOfContents items={tocItems} />
            </div>
        </section>
    );
}
