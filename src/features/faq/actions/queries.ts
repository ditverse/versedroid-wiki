import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import type { FaqArticle, FaqCategory, ContentBlock, FaqItem } from "../types";

/**
 * Fetches all FAQ categories with their articles for the index page.
 * Only returns published articles, ordered by sort_order.
 */
export async function getFaqCategories(
    locale: string
): Promise<FaqCategory[]> {
    const supabase = await createClient();

    const { data: categories, error } = await supabase
        .from("faq_categories")
        .select(
            `
            id,
            key,
            sort_order,
            faq_category_translations!inner (locale, label),
            faq_articles (
                id,
                slug,
                icon,
                sort_order,
                published,
                created_at,
                updated_at,
                faq_article_translations!inner (locale, title, description, content, faq_items)
            )
        `
        )
        .eq("faq_category_translations.locale", locale)
        .eq("faq_articles.published", true)
        .eq("faq_articles.faq_article_translations.locale", locale)
        .order("sort_order", { ascending: true });

    if (error) {
        console.error("Failed to fetch FAQ categories:", error.message);
        return [];
    }

    return (categories ?? []).map((cat) => {
        const translation = (cat.faq_category_translations as Array<{ locale: string; label: string }>)[0];
        const articles = (cat.faq_articles as Array<Record<string, unknown>>)
            .map((article) => mapFaqArticle(article))
            .sort((a, b) => a.sortOrder - b.sortOrder);

        return {
            id: cat.id,
            key: cat.key,
            label: translation?.label ?? cat.key,
            articles,
        };
    });
}

/**
 * Fetches a single FAQ article by slug.
 */
export async function getFaqBySlug(
    slug: string,
    locale: string
): Promise<FaqArticle | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("faq_articles")
        .select(
            `
            id,
            slug,
            icon,
            sort_order,
            published,
            faq_article_translations!inner (locale, title, description, content, faq_items)
        `
        )
        .eq("slug", slug)
        .eq("published", true)
        .eq("faq_article_translations.locale", locale)
        .single();

    if (error || !data) {
        return null;
    }

    return mapFaqArticle(data as Record<string, unknown>);
}

/**
 * Returns the previous and next FAQ articles relative to current slug.
 * Used for prev/next navigation at the bottom of detail pages.
 */
export async function getAdjacentFaqArticles(
    slug: string
): Promise<{ prev: FaqArticle | null; next: FaqArticle | null }> {
    const supabase = await createClient();

    // Fetch all published articles ordered by sort_order to determine position
    const { data: articles, error } = await supabase
        .from("faq_articles")
        .select(
            `
            id,
            slug,
            icon,
            sort_order,
            published,
            faq_article_translations (locale, title, description, content, faq_items)
        `
        )
        .eq("published", true)
        .order("sort_order", { ascending: true });

    if (error || !articles) {
        return { prev: null, next: null };
    }

    const idx = articles.findIndex((a) => a.slug === slug);

    return {
        prev: idx > 0
            ? mapFaqArticle(articles[idx - 1] as Record<string, unknown>)
            : null,
        next: idx < articles.length - 1
            ? mapFaqArticle(articles[idx + 1] as Record<string, unknown>)
            : null,
    };
}

/**
 * Returns all published FAQ slugs for generateStaticParams().
 */
export async function getAllFaqSlugs(): Promise<string[]> {
    const supabase = createStaticClient();

    const { data, error } = await supabase
        .from("faq_articles")
        .select("slug")
        .eq("published", true);

    if (error || !data) {
        return [];
    }

    return data.map((a) => a.slug);
}

// ─── Internal Helpers ────────────────────────────────

function mapFaqArticle(raw: Record<string, unknown>): FaqArticle {
    const translations = raw.faq_article_translations as
        | Array<{ locale: string; title: string; description: string; content: unknown; faq_items: unknown }>
        | undefined;

    // Pick the first available translation (already filtered by locale in query)
    const t = translations?.[0];

    return {
        id: raw.id as string,
        slug: raw.slug as string,
        icon: raw.icon as string,
        sortOrder: raw.sort_order as number,
        published: raw.published as boolean,
        title: t?.title ?? "",
        description: t?.description ?? "",
        content: (t?.content ?? []) as ContentBlock[],
        faqItems: (t?.faq_items ?? []) as FaqItem[],
    };
}
