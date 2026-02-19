"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type FaqArticleInput = {
    slug: string;
    icon: string;
    categoryId: string;
    sortOrder: number;
    published: boolean;
    translations: {
        id: { title: string; description: string; content: unknown[]; faqItems: unknown[] };
        en: { title: string; description: string; content: unknown[]; faqItems: unknown[] };
    };
};

export async function createFaqArticle(input: FaqArticleInput) {
    const supabase = await createClient();

    const { data: article, error } = await supabase
        .from("faq_articles")
        .insert({
            category_id: input.categoryId,
            slug: input.slug,
            icon: input.icon,
            sort_order: input.sortOrder,
            published: input.published,
        })
        .select("id")
        .single();

    if (error) return { error: error.message };

    // Insert translations for both locales
    for (const [locale, trans] of Object.entries(input.translations)) {
        const { error: tErr } = await supabase
            .from("faq_article_translations")
            .insert({
                article_id: article.id,
                locale,
                title: trans.title,
                description: trans.description,
                content: trans.content,
                faq_items: trans.faqItems,
            });
        if (tErr) return { error: tErr.message };
    }

    revalidatePath("/faq");
    return { id: article.id };
}

export async function updateFaqArticle(id: string, input: FaqArticleInput) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("faq_articles")
        .update({
            category_id: input.categoryId,
            slug: input.slug,
            icon: input.icon,
            sort_order: input.sortOrder,
            published: input.published,
        })
        .eq("id", id);

    if (error) return { error: error.message };

    for (const [locale, trans] of Object.entries(input.translations)) {
        const { error: tErr } = await supabase
            .from("faq_article_translations")
            .upsert(
                {
                    article_id: id,
                    locale,
                    title: trans.title,
                    description: trans.description,
                    content: trans.content,
                    faq_items: trans.faqItems,
                },
                { onConflict: "article_id,locale" }
            );
        if (tErr) return { error: tErr.message };
    }

    revalidatePath("/faq");
    revalidatePath(`/faq/${input.slug}`);
    return { success: true };
}

export async function deleteFaqArticle(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("faq_articles").delete().eq("id", id);
    if (error) return { error: error.message };

    revalidatePath("/faq");
    return { success: true };
}

export async function toggleFaqPublish(id: string, published: boolean) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("faq_articles")
        .update({ published })
        .eq("id", id);
    if (error) return { error: error.message };

    revalidatePath("/faq");
    return { success: true };
}
