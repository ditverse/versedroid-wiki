import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BlogPostForm } from "@/features/admin/components/blog-post-form";

async function getPostForEdit(id: string) {
    const supabase = await createClient();
    const { data } = await supabase
        .from("blog_posts")
        .select(`
            id, slug, category, read_time, author, featured, published, cover_image, published_at,
            blog_post_translations (locale, title, excerpt, content)
        `)
        .eq("id", id)
        .single();

    if (!data) return null;

    // Get related post IDs
    const { data: relations } = await supabase
        .from("blog_related_posts")
        .select("related_post_id")
        .eq("post_id", id);

    return { ...data, relatedPostIds: relations?.map((r: { related_post_id: string }) => r.related_post_id) ?? [] };
}

type Props = { params: Promise<{ id: string }> };

export default async function AdminBlogEditPage({ params }: Props) {
    const { id } = await params;
    const post = await getPostForEdit(id);
    if (!post) notFound();

    const translations = post.blog_post_translations as Array<{
        locale: string; title: string; excerpt: string; content: unknown[];
    }>;
    const idTrans = translations.find((t) => t.locale === "id");
    const enTrans = translations.find((t) => t.locale === "en");

    const initial = {
        slug: post.slug,
        category: post.category,
        readTime: post.read_time,
        author: post.author,
        featured: post.featured,
        published: post.published,
        coverImage: post.cover_image,
        publishedAt: post.published_at,
        relatedPostIds: post.relatedPostIds as string[],
        translations: {
            id: {
                title: idTrans?.title ?? "",
                excerpt: idTrans?.excerpt ?? "",
                content: (idTrans?.content ?? []) as unknown[],
            },
            en: {
                title: enTrans?.title ?? "",
                excerpt: enTrans?.excerpt ?? "",
                content: (enTrans?.content ?? []) as unknown[],
            },
        },
    };

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold text-vd-text-primary">Edit Blog Post</h1>
            <BlogPostForm mode="edit" postId={id} initial={initial} />
        </div>
    );
}
