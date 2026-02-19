import type { ContentBlock } from "@/features/faq/types";

export type BlogCategory = "tutorial" | "news" | "tips";

export type BlogPost = {
    id: string;
    slug: string;
    category: BlogCategory;
    readTime: number;
    author: string;
    featured: boolean;
    published: boolean;
    coverImage: string | null;
    publishedAt: string | null;
    title: string;
    excerpt: string;
    content: ContentBlock[];
    relatedPosts: BlogPost[];
};
