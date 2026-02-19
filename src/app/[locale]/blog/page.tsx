import { setRequestLocale } from "next-intl/server";
import { getBlogPosts, getFeaturedPost } from "@/features/blog/actions/queries";
import { BlogIndexContent } from "@/features/blog/components/blog-index-content";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function BlogIndexPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const [posts, featured] = await Promise.all([
        getBlogPosts(locale),
        getFeaturedPost(locale),
    ]);

    return <BlogIndexContent posts={posts} featured={featured} />;
}
