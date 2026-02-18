import type { ContentBlock } from "@/features/faq/types";

export type BlogCategory = "tutorial" | "news" | "tips";

export type BlogPost = {
    slug: string;
    titleKey: string;
    excerptKey: string;
    category: BlogCategory;
    readTime: number;
    date: string;
    author: string;
    featured: boolean;
    content: ContentBlock[];
    relatedSlugs: string[];
};
