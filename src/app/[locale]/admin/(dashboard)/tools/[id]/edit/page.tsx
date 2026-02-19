import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ToolArticleForm } from "@/features/admin/components/tool-article-form";

async function getCategories() {
    const supabase = await createClient();
    const { data } = await supabase.from("tool_categories").select("id, key").order("sort_order");
    return data ?? [];
}

async function getArticleForEdit(id: string) {
    const supabase = await createClient();
    const { data } = await supabase
        .from("tool_articles")
        .select(`
            id, slug, icon, category_id, sort_order, published, download_url, download_version,
            tool_article_translations (locale, title, description, content, specs, tabs)
        `)
        .eq("id", id)
        .single();
    return data;
}

type Props = { params: Promise<{ id: string }> };

export default async function AdminToolEditPage({ params }: Props) {
    const { id } = await params;
    const [categories, article] = await Promise.all([getCategories(), getArticleForEdit(id)]);

    if (!article) notFound();

    const translations = article.tool_article_translations as Array<{
        locale: string; title: string; description: string; content: unknown[]; specs: unknown[]; tabs: unknown[];
    }>;
    const idTrans = translations.find((t) => t.locale === "id");
    const enTrans = translations.find((t) => t.locale === "en");

    const initial = {
        slug: article.slug,
        icon: article.icon,
        categoryId: article.category_id,
        sortOrder: article.sort_order,
        published: article.published,
        downloadUrl: article.download_url,
        downloadVersion: article.download_version,
        translations: {
            id: {
                title: idTrans?.title ?? "",
                description: idTrans?.description ?? "",
                content: (idTrans?.content ?? []) as unknown[],
                specs: (idTrans?.specs ?? []) as { label: string; value: string }[],
                tabs: (idTrans?.tabs ?? []) as { label: string; steps: { title: string; description: string; code?: string }[] }[],
            },
            en: {
                title: enTrans?.title ?? "",
                description: enTrans?.description ?? "",
                content: (enTrans?.content ?? []) as unknown[],
                specs: (enTrans?.specs ?? []) as { label: string; value: string }[],
                tabs: (enTrans?.tabs ?? []) as { label: string; steps: { title: string; description: string; code?: string }[] }[],
            },
        },
    };

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold text-vd-text-primary">Edit Tool Article</h1>
            <ToolArticleForm mode="edit" articleId={id} categories={categories} initial={initial} />
        </div>
    );
}
