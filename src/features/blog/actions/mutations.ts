"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type BlogPostInput = {
    slug: string;
    category: string;
    readTime: number;
    author: string;
    featured: boolean;
    published: boolean;
    coverImage: string | null;
    publishedAt: string | null;
    relatedPostIds: string[];
    translations: {
        id: { title: string; excerpt: string; content: unknown[] };
        en: { title: string; excerpt: string; content: unknown[] };
    };
};

export async function createBlogPost(input: BlogPostInput) {
    const supabase = await createClient();

    const { data: post, error } = await supabase
        .from("blog_posts")
        .insert({
            slug: input.slug,
            category: input.category,
            read_time: input.readTime,
            author: input.author,
            featured: input.featured,
            published: input.published,
            cover_image: input.coverImage,
            published_at: input.publishedAt,
        })
        .select("id")
        .single();

    if (error) return { error: error.message };

    for (const [locale, trans] of Object.entries(input.translations)) {
        const { error: tErr } = await supabase
            .from("blog_post_translations")
            .insert({
                post_id: post.id,
                locale,
                title: trans.title,
                excerpt: trans.excerpt,
                content: trans.content,
            });
        if (tErr) return { error: tErr.message };
    }

    // Related posts
    if (input.relatedPostIds.length > 0) {
        const rows = input.relatedPostIds.map((relatedId) => ({
            post_id: post.id,
            related_post_id: relatedId,
        }));
        await supabase.from("blog_related_posts").insert(rows);
    }

    revalidatePath("/blog");
    return { id: post.id };
}

export async function updateBlogPost(id: string, input: BlogPostInput) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("blog_posts")
        .update({
            slug: input.slug,
            category: input.category,
            read_time: input.readTime,
            author: input.author,
            featured: input.featured,
            published: input.published,
            cover_image: input.coverImage,
            published_at: input.publishedAt,
        })
        .eq("id", id);

    if (error) return { error: error.message };

    for (const [locale, trans] of Object.entries(input.translations)) {
        const { error: tErr } = await supabase
            .from("blog_post_translations")
            .upsert(
                {
                    post_id: id,
                    locale,
                    title: trans.title,
                    excerpt: trans.excerpt,
                    content: trans.content,
                },
                { onConflict: "post_id,locale" }
            );
        if (tErr) return { error: tErr.message };
    }

    // Replace related posts
    await supabase.from("blog_related_posts").delete().eq("post_id", id);
    if (input.relatedPostIds.length > 0) {
        const rows = input.relatedPostIds.map((relatedId) => ({
            post_id: id,
            related_post_id: relatedId,
        }));
        await supabase.from("blog_related_posts").insert(rows);
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${input.slug}`);
    return { success: true };
}

export async function deleteBlogPost(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return { error: error.message };

    revalidatePath("/blog");
    return { success: true };
}

export async function toggleBlogPublish(id: string, published: boolean) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("blog_posts")
        .update({ published })
        .eq("id", id);
    if (error) return { error: error.message };

    revalidatePath("/blog");
    return { success: true };
}

export async function toggleBlogFeatured(id: string, featured: boolean) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("blog_posts")
        .update({ featured })
        .eq("id", id);
    if (error) return { error: error.message };

    revalidatePath("/blog");
    return { success: true };
}
