/**
 * Database type definitions matching the Supabase PostgreSQL schema.
 * These types define the shape of data as stored in the database.
 *
 * Note: In production, prefer generating these automatically via
 * `npx supabase gen types typescript` for perfect sync with schema.
 */

// ─────────────────────────────────────────────────────
// Shared Content Types (matches frontend ContentBlock)
// ─────────────────────────────────────────────────────

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

// ─────────────────────────────────────────────────────
// Database Schema Definition
// ─────────────────────────────────────────────────────

export type Database = {
    public: {
        Tables: {
            // FAQ
            faq_categories: {
                Row: {
                    id: string;
                    key: string;
                    sort_order: number;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    key: string;
                    sort_order?: number;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    key?: string;
                    sort_order?: number;
                    created_at?: string;
                };
            };
            faq_category_translations: {
                Row: {
                    id: string;
                    category_id: string;
                    locale: string;
                    label: string;
                };
                Insert: {
                    id?: string;
                    category_id: string;
                    locale: string;
                    label: string;
                };
                Update: {
                    id?: string;
                    category_id?: string;
                    locale?: string;
                    label?: string;
                };
            };
            faq_articles: {
                Row: {
                    id: string;
                    category_id: string;
                    slug: string;
                    icon: string;
                    sort_order: number;
                    published: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    category_id: string;
                    slug: string;
                    icon?: string;
                    sort_order?: number;
                    published?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    category_id?: string;
                    slug?: string;
                    icon?: string;
                    sort_order?: number;
                    published?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            faq_article_translations: {
                Row: {
                    id: string;
                    article_id: string;
                    locale: string;
                    title: string;
                    description: string;
                    content: Json;
                    faq_items: Json;
                };
                Insert: {
                    id?: string;
                    article_id: string;
                    locale: string;
                    title: string;
                    description: string;
                    content?: Json;
                    faq_items?: Json;
                };
                Update: {
                    id?: string;
                    article_id?: string;
                    locale?: string;
                    title?: string;
                    description?: string;
                    content?: Json;
                    faq_items?: Json;
                };
            };

            // Tools
            tool_categories: {
                Row: {
                    id: string;
                    key: string;
                    sort_order: number;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    key: string;
                    sort_order?: number;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    key?: string;
                    sort_order?: number;
                    created_at?: string;
                };
            };
            tool_category_translations: {
                Row: {
                    id: string;
                    category_id: string;
                    locale: string;
                    label: string;
                };
                Insert: {
                    id?: string;
                    category_id: string;
                    locale: string;
                    label: string;
                };
                Update: {
                    id?: string;
                    category_id?: string;
                    locale?: string;
                    label?: string;
                };
            };
            tool_articles: {
                Row: {
                    id: string;
                    category_id: string;
                    slug: string;
                    icon: string;
                    download_url: string;
                    download_version: string;
                    sort_order: number;
                    published: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    category_id: string;
                    slug: string;
                    icon?: string;
                    download_url?: string;
                    download_version?: string;
                    sort_order?: number;
                    published?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    category_id?: string;
                    slug?: string;
                    icon?: string;
                    download_url?: string;
                    download_version?: string;
                    sort_order?: number;
                    published?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            tool_article_translations: {
                Row: {
                    id: string;
                    article_id: string;
                    locale: string;
                    title: string;
                    description: string;
                    content: Json;
                    specs: Json;
                    tabs: Json;
                };
                Insert: {
                    id?: string;
                    article_id: string;
                    locale: string;
                    title: string;
                    description: string;
                    content?: Json;
                    specs?: Json;
                    tabs?: Json;
                };
                Update: {
                    id?: string;
                    article_id?: string;
                    locale?: string;
                    title?: string;
                    description?: string;
                    content?: Json;
                    specs?: Json;
                    tabs?: Json;
                };
            };

            // Blog
            blog_posts: {
                Row: {
                    id: string;
                    slug: string;
                    category: string;
                    read_time: number;
                    author: string;
                    featured: boolean;
                    published: boolean;
                    cover_image: string | null;
                    published_at: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    slug: string;
                    category: string;
                    read_time?: number;
                    author?: string;
                    featured?: boolean;
                    published?: boolean;
                    cover_image?: string | null;
                    published_at?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    slug?: string;
                    category?: string;
                    read_time?: number;
                    author?: string;
                    featured?: boolean;
                    published?: boolean;
                    cover_image?: string | null;
                    published_at?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            blog_post_translations: {
                Row: {
                    id: string;
                    post_id: string;
                    locale: string;
                    title: string;
                    excerpt: string;
                    content: Json;
                };
                Insert: {
                    id?: string;
                    post_id: string;
                    locale: string;
                    title: string;
                    excerpt: string;
                    content?: Json;
                };
                Update: {
                    id?: string;
                    post_id?: string;
                    locale?: string;
                    title?: string;
                    excerpt?: string;
                    content?: Json;
                };
            };
            blog_related_posts: {
                Row: {
                    post_id: string;
                    related_post_id: string;
                };
                Insert: {
                    post_id: string;
                    related_post_id: string;
                };
                Update: {
                    post_id?: string;
                    related_post_id?: string;
                };
            };
        };
    };
};
