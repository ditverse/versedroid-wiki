import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
    getToolCategories,
    getToolBySlug,
    getAdjacentTools,
    getAllToolSlugs,
} from "@/features/tools/actions/queries";
import type { ToolArticle, ToolCategory } from "@/features/tools/types";
import { DocSidebar } from "@/components/shared/doc-sidebar";
import { TableOfContents } from "@/components/shared/table-of-contents";
import { PrevNextNav } from "@/components/shared/prev-next-nav";
import { ToolContent } from "@/features/tools/components/tool-content";
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
    const slugs = await getAllToolSlugs();
    return slugs.map((slug) => ({ slug }));
}

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export default async function ToolsDetailPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const [article, categories, adjacent] = await Promise.all([
        getToolBySlug(slug, locale),
        getToolCategories(locale),
        getAdjacentTools(slug),
    ]);

    if (!article) notFound();

    return (
        <ToolsDetailContent
            article={article}
            categories={categories}
            prev={adjacent.prev}
            next={adjacent.next}
        />
    );
}

function ToolsDetailContent({
    article,
    categories,
    prev,
    next,
}: {
    article: ToolArticle;
    categories: ToolCategory[];
    prev: ToolArticle | null;
    next: ToolArticle | null;
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

    if (article.tabs.length > 0) {
        tocItems.push({ id: "penggunaan", text: "Penggunaan" });
    }

    return (
        <section className="px-4 py-8 sm:py-12">
            <div className="mx-auto flex max-w-7xl gap-8">
                {/* Sidebar */}
                <DocSidebar
                    categories={sidebarCategories}
                    basePath="/tools"
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
                                    <Link href="/tools">Tools</Link>
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

                    {/* Tool content */}
                    <ToolContent article={article} />

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
                        basePath="/tools"
                    />
                </div>

                {/* TOC */}
                <TableOfContents items={tocItems} />
            </div>
        </section>
    );
}
