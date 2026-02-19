import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import type { BlogPost, BlogCategory } from "../types";
import type { ContentBlock } from "@/features/faq/types";

/**
 * Fetches blog posts with optional category filter.
 * Only returns published posts, ordered by published_at desc.
 */
export async function getBlogPosts(
    locale: string,
    category?: string | null
): Promise<BlogPost[]> {
    const supabase = await createClient();

    let query = supabase
        .from("blog_posts")
        .select(
            `
            id,
            slug,
            category,
            read_time,
            author,
            featured,
            published,
            cover_image,
            published_at,
            blog_post_translations!inner (locale, title, excerpt, content)
        `
        )
        .eq("published", true)
        .eq("blog_post_translations.locale", locale)
        .order("published_at", { ascending: false });

    if (category && category !== "all") {
        query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Failed to fetch blog posts:", error.message);
        return [];
    }

    return (data ?? []).map((row) => mapBlogPost(row as Record<string, unknown>));
}

/**
 * Fetches the featured blog post.
 */
export async function getFeaturedPost(
    locale: string
): Promise<BlogPost | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("blog_posts")
        .select(
            `
            id,
            slug,
            category,
            read_time,
            author,
            featured,
            published,
            cover_image,
            published_at,
            blog_post_translations!inner (locale, title, excerpt, content)
        `
        )
        .eq("published", true)
        .eq("featured", true)
        .eq("blog_post_translations.locale", locale)
        .limit(1)
        .single();

    if (error || !data) {
        return null;
    }

    return mapBlogPost(data as Record<string, unknown>);
}

/**
 * Fetches a single blog post by slug.
 */
export async function getBlogBySlug(
    slug: string,
    locale: string
): Promise<BlogPost | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("blog_posts")
        .select(
            `
            id,
            slug,
            category,
            read_time,
            author,
            featured,
            published,
            cover_image,
            published_at,
            blog_post_translations!inner (locale, title, excerpt, content)
        `
        )
        .eq("slug", slug)
        .eq("published", true)
        .eq("blog_post_translations.locale", locale)
        .single();

    if (error || !data) {
        return null;
    }

    return mapBlogPost(data as Record<string, unknown>);
}

/**
 * Fetches related posts for a given blog post slug.
 */
export async function getRelatedPosts(
    slug: string,
    locale: string
): Promise<BlogPost[]> {
    const supabase = await createClient();

    // First get the post ID
    const { data: current } = await supabase
        .from("blog_posts")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

    if (!current) return [];

    // Get related post IDs
    const { data: relations } = await supabase
        .from("blog_related_posts")
        .select("related_post_id")
        .eq("post_id", current.id);

    if (!relations || relations.length === 0) return [];

    const relatedIds = relations.map((r) => r.related_post_id);

    // Fetch the related posts
    const { data: posts, error } = await supabase
        .from("blog_posts")
        .select(
            `
            id,
            slug,
            category,
            read_time,
            author,
            featured,
            published,
            cover_image,
            published_at,
            blog_post_translations!inner (locale, title, excerpt, content)
        `
        )
        .in("id", relatedIds)
        .eq("published", true)
        .eq("blog_post_translations.locale", locale);

    if (error || !posts) {
        return [];
    }

    return posts.map((row) => mapBlogPost(row as Record<string, unknown>));
}

/**
 * Returns all published blog slugs for generateStaticParams().
 */
export async function getAllBlogSlugs(): Promise<string[]> {
    const supabase = createStaticClient();

    const { data, error } = await supabase
        .from("blog_posts")
        .select("slug")
        .eq("published", true);

    if (error || !data) {
        return [];
    }

    return data.map((p) => p.slug);
}

// ─── Internal Helpers ────────────────────────────────

function mapBlogPost(raw: Record<string, unknown>): BlogPost {
    const translations = raw.blog_post_translations as
        | Array<{ locale: string; title: string; excerpt: string; content: unknown }>
        | undefined;

    const t = translations?.[0];

    return {
        id: raw.id as string,
        slug: raw.slug as string,
        category: raw.category as BlogCategory,
        readTime: raw.read_time as number,
        author: raw.author as string,
        featured: raw.featured as boolean,
        published: raw.published as boolean,
        coverImage: raw.cover_image as string | null,
        publishedAt: raw.published_at as string | null,
        title: t?.title ?? "",
        excerpt: t?.excerpt ?? "",
        content: (t?.content ?? []) as ContentBlock[],
        relatedPosts: [], // Populated separately via getRelatedPosts()
    };
}
