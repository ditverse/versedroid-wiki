"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type ToolArticleInput = {
    slug: string;
    icon: string;
    categoryId: string;
    sortOrder: number;
    published: boolean;
    downloadUrl: string;
    downloadVersion: string;
    translations: {
        id: { title: string; description: string; content: unknown[]; specs: unknown[]; tabs: unknown[] };
        en: { title: string; description: string; content: unknown[]; specs: unknown[]; tabs: unknown[] };
    };
};

export async function createToolArticle(input: ToolArticleInput) {
    const supabase = await createClient();

    const { data: article, error } = await supabase
        .from("tool_articles")
        .insert({
            category_id: input.categoryId,
            slug: input.slug,
            icon: input.icon,
            download_url: input.downloadUrl,
            download_version: input.downloadVersion,
            sort_order: input.sortOrder,
            published: input.published,
        })
        .select("id")
        .single();

    if (error) return { error: error.message };

    for (const [locale, trans] of Object.entries(input.translations)) {
        const { error: tErr } = await supabase
            .from("tool_article_translations")
            .insert({
                article_id: article.id,
                locale,
                title: trans.title,
                description: trans.description,
                content: trans.content,
                specs: trans.specs,
                tabs: trans.tabs,
            });
        if (tErr) return { error: tErr.message };
    }

    revalidatePath("/tools");
    return { id: article.id };
}

export async function updateToolArticle(id: string, input: ToolArticleInput) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("tool_articles")
        .update({
            category_id: input.categoryId,
            slug: input.slug,
            icon: input.icon,
            download_url: input.downloadUrl,
            download_version: input.downloadVersion,
            sort_order: input.sortOrder,
            published: input.published,
        })
        .eq("id", id);

    if (error) return { error: error.message };

    for (const [locale, trans] of Object.entries(input.translations)) {
        const { error: tErr } = await supabase
            .from("tool_article_translations")
            .upsert(
                {
                    article_id: id,
                    locale,
                    title: trans.title,
                    description: trans.description,
                    content: trans.content,
                    specs: trans.specs,
                    tabs: trans.tabs,
                },
                { onConflict: "article_id,locale" }
            );
        if (tErr) return { error: tErr.message };
    }

    revalidatePath("/tools");
    revalidatePath(`/tools/${input.slug}`);
    return { success: true };
}

export async function deleteToolArticle(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("tool_articles").delete().eq("id", id);
    if (error) return { error: error.message };

    revalidatePath("/tools");
    return { success: true };
}

export async function toggleToolPublish(id: string, published: boolean) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("tool_articles")
        .update({ published })
        .eq("id", id);
    if (error) return { error: error.message };

    revalidatePath("/tools");
    return { success: true };
}
