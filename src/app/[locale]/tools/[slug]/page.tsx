import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
    toolArticles,
    toolCategories,
    getToolBySlug,
    getAdjacentTools,
} from "@/features/tools";
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

export function generateStaticParams() {
    return toolArticles.map((article) => ({ slug: article.slug }));
}

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export default async function ToolsDetailPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const article = getToolBySlug(slug);
    if (!article) notFound();

    return <ToolsDetailContent slug={slug} />;
}

function ToolsDetailContent({ slug }: { slug: string }) {
    const t = useTranslations("ToolsDetail");
    const tCommon = useTranslations("Common");

    const article = getToolBySlug(slug)!;
    const { prev, next } = getAdjacentTools(slug);

    const sidebarCategories = toolCategories.map((cat) => ({
        key: cat.key,
        labelKey: cat.labelKey,
        items: cat.articles.map((a) => ({
            slug: a.slug,
            titleKey: a.titleKey,
        })),
    }));

    const tocItems = article.content
        .filter((block): block is Extract<typeof block, { type: "heading" }> =>
            block.type === "heading"
        )
        .map((block) => ({ id: block.id, text: block.text }));

    // Add usage section to TOC if there are tabs
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
                    translationNamespace="ToolsDetail"
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
                                    {t(article.titleKey)}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {/* Article title */}
                    <h1 className="mb-8 text-3xl font-bold text-vd-text-primary sm:text-4xl animate-fade-in">
                        {t(article.titleKey)}
                    </h1>

                    {/* Tool content */}
                    <ToolContent article={article} />

                    {/* Prev / Next */}
                    <PrevNextNav
                        prev={
                            prev
                                ? { slug: prev.slug, titleKey: prev.titleKey }
                                : null
                        }
                        next={
                            next
                                ? { slug: next.slug, titleKey: next.titleKey }
                                : null
                        }
                        basePath="/tools"
                        translationNamespace="ToolsDetail"
                    />
                </div>

                {/* TOC */}
                <TableOfContents items={tocItems} />
            </div>
        </section>
    );
}
