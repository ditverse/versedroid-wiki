import { unstable_cache } from "next/cache";
import { createStaticClient } from "@/lib/supabase/static";
import type {
    ToolArticle,
    ToolCategory,
    ContentBlock,
    SpecItem,
    TabContent,
} from "../types";

/** Listing cache: 5 min revalidation */
const LISTING_REVALIDATE = 300;
/** Content cache: 15 min revalidation */
const CONTENT_REVALIDATE = 900;

/**
 * Fetches all tool categories with their articles for the index page.
 */
export const getToolCategories = unstable_cache(
    async (locale: string): Promise<ToolCategory[]> => {
        const supabase = createStaticClient();

        const { data: categories, error } = await supabase
            .from("tool_categories")
            .select(
                `
            id,
            key,
            sort_order,
            tool_category_translations!inner (locale, label),
            tool_articles (
                id,
                slug,
                icon,
                download_url,
                download_version,
                sort_order,
                published,
                tool_article_translations!inner (locale, title, description, content, specs, tabs)
            )
        `
            )
            .eq("tool_category_translations.locale", locale)
            .eq("tool_articles.published", true)
            .eq("tool_articles.tool_article_translations.locale", locale)
            .order("sort_order", { ascending: true });

        if (error) {
            console.error("Failed to fetch tool categories:", error.message);
            return [];
        }

        return (categories ?? []).map((cat) => {
            const translation = (
                cat.tool_category_translations as Array<{
                    locale: string;
                    label: string;
                }>
            )[0];
            const articles = (
                cat.tool_articles as Array<Record<string, unknown>>
            )
                .map((article) => mapToolArticle(article))
                .sort((a, b) => a.sortOrder - b.sortOrder);

            return {
                id: cat.id,
                key: cat.key,
                label: translation?.label ?? cat.key,
                articles,
            };
        });
    },
    ["tool-categories-key"],
    { tags: ["tool-categories"], revalidate: LISTING_REVALIDATE }
);

/**
 * Fetches a single tool article by slug.
 */
export const getToolBySlug = unstable_cache(
    async (slug: string, locale: string): Promise<ToolArticle | null> => {
        const supabase = createStaticClient();

        const { data, error } = await supabase
            .from("tool_articles")
            .select(
                `
            id,
            slug,
            icon,
            download_url,
            download_version,
            sort_order,
            published,
            tool_article_translations!inner (locale, title, description, content, specs, tabs)
        `
            )
            .eq("slug", slug)
            .eq("published", true)
            .eq("tool_article_translations.locale", locale)
            .single();

        if (error || !data) {
            return null;
        }

        return mapToolArticle(data as Record<string, unknown>);
    },
    ["tool-by-slug-key"],
    { tags: ["tool-by-slug"], revalidate: CONTENT_REVALIDATE }
);

/**
 * Returns previous and next tool articles for navigation.
 */
export const getAdjacentTools = unstable_cache(
    async (
        slug: string
    ): Promise<{ prev: ToolArticle | null; next: ToolArticle | null }> => {
        const supabase = createStaticClient();

        const { data: articles, error } = await supabase
            .from("tool_articles")
            .select(
                `
            id,
            slug,
            icon,
            download_url,
            download_version,
            sort_order,
            published,
            tool_article_translations (locale, title, description, content, specs, tabs)
        `
            )
            .eq("published", true)
            .order("sort_order", { ascending: true });

        if (error || !articles) {
            return { prev: null, next: null };
        }

        const idx = articles.findIndex((a) => a.slug === slug);

        return {
            prev:
                idx > 0
                    ? mapToolArticle(
                        articles[idx - 1] as Record<string, unknown>
                    )
                    : null,
            next:
                idx < articles.length - 1
                    ? mapToolArticle(
                        articles[idx + 1] as Record<string, unknown>
                    )
                    : null,
        };
    },
    ["tool-adjacent-key"],
    { tags: ["tool-adjacent"], revalidate: LISTING_REVALIDATE }
);

/**
 * Returns all published tool slugs for generateStaticParams().
 */
export async function getAllToolSlugs(): Promise<string[]> {
    const supabase = createStaticClient();

    const { data, error } = await supabase
        .from("tool_articles")
        .select("slug")
        .eq("published", true);

    if (error || !data) {
        return [];
    }

    return data.map((a) => a.slug);
}

// ─── Internal Helpers ────────────────────────────────

function mapToolArticle(raw: Record<string, unknown>): ToolArticle {
    const translations = raw.tool_article_translations as
        | Array<{
            locale: string;
            title: string;
            description: string;
            content: unknown;
            specs: unknown;
            tabs: unknown;
        }>
        | undefined;

    const t = translations?.[0];

    return {
        id: raw.id as string,
        slug: raw.slug as string,
        icon: raw.icon as string,
        downloadUrl: raw.download_url as string,
        downloadVersion: raw.download_version as string,
        sortOrder: raw.sort_order as number,
        published: raw.published as boolean,
        title: t?.title ?? "",
        description: t?.description ?? "",
        content: (t?.content ?? []) as ContentBlock[],
        specs: (t?.specs ?? []) as SpecItem[],
        tabs: (t?.tabs ?? []) as TabContent[],
    };
}
