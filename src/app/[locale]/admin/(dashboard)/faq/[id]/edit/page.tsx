import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FaqArticleForm } from "@/features/admin/components/faq-article-form";

async function getCategories() {
    const supabase = await createClient();
    const { data } = await supabase
        .from("faq_categories")
        .select("id, key")
        .order("sort_order");
    return data ?? [];
}

async function getArticleForEdit(id: string) {
    const supabase = await createClient();
    const { data } = await supabase
        .from("faq_articles")
        .select(`
            id, slug, icon, category_id, sort_order, published,
            faq_article_translations (locale, title, description, content, faq_items)
        `)
        .eq("id", id)
        .single();
    return data;
}

type Props = {
    params: Promise<{ id: string }>;
};

export default async function AdminFaqEditPage({ params }: Props) {
    const { id } = await params;
    const [categories, article] = await Promise.all([
        getCategories(),
        getArticleForEdit(id),
    ]);

    if (!article) notFound();

    const translations = article.faq_article_translations as Array<{
        locale: string;
        title: string;
        description: string;
        content: unknown[];
        faq_items: { question: string; answer: string }[];
    }>;

    const idTrans = translations.find((t) => t.locale === "id");
    const enTrans = translations.find((t) => t.locale === "en");

    const initial = {
        slug: article.slug,
        icon: article.icon,
        categoryId: article.category_id,
        sortOrder: article.sort_order,
        published: article.published,
        translations: {
            id: {
                title: idTrans?.title ?? "",
                description: idTrans?.description ?? "",
                content: (idTrans?.content ?? []) as unknown[],
                faqItems: (idTrans?.faq_items ?? []) as { question: string; answer: string }[],
            },
            en: {
                title: enTrans?.title ?? "",
                description: enTrans?.description ?? "",
                content: (enTrans?.content ?? []) as unknown[],
                faqItems: (enTrans?.faq_items ?? []) as { question: string; answer: string }[],
            },
        },
    };

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold text-vd-text-primary">
                Edit FAQ Article
            </h1>
            <FaqArticleForm
                mode="edit"
                articleId={id}
                categories={categories}
                initial={initial}
            />
        </div>
    );
}
