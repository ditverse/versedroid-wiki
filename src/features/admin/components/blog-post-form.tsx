"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { LocaleTabs } from "@/features/admin/components/locale-tabs";
import { ContentEditor } from "@/features/admin/components/content-editor";
import { createBlogPost, updateBlogPost } from "@/features/blog/actions/mutations";

type TranslationData = {
    title: string;
    excerpt: string;
    content: unknown[];
};

type BlogFormProps = {
    mode: "create" | "edit";
    postId?: string;
    initial?: {
        slug: string;
        category: string;
        readTime: number;
        author: string;
        featured: boolean;
        published: boolean;
        coverImage: string | null;
        publishedAt: string | null;
        relatedPostIds: string[];
        translations: { id: TranslationData; en: TranslationData };
    };
};

function emptyTranslation(): TranslationData {
    return { title: "", excerpt: "", content: [] };
}

export function BlogPostForm({ mode, postId, initial }: BlogFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [slug, setSlug] = useState(initial?.slug ?? "");
    const [category, setCategory] = useState(initial?.category ?? "tutorial");
    const [readTime, setReadTime] = useState(initial?.readTime ?? 5);
    const [author, setAuthor] = useState(initial?.author ?? "versedroid");
    const [featured, setFeatured] = useState(initial?.featured ?? false);
    const [published, setPublished] = useState(initial?.published ?? false);
    const [publishedAt, setPublishedAt] = useState(initial?.publishedAt?.slice(0, 10) ?? "");
    const [translations, setTranslations] = useState<{ id: TranslationData; en: TranslationData }>(
        initial?.translations ?? { id: emptyTranslation(), en: emptyTranslation() }
    );

    function updateTranslation(locale: "id" | "en", field: keyof TranslationData, value: unknown) {
        setTranslations((prev) => ({
            ...prev,
            [locale]: { ...prev[locale], [field]: value },
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const input = {
            slug,
            category,
            readTime,
            author,
            featured,
            published,
            coverImage: null as string | null,
            publishedAt: publishedAt ? new Date(publishedAt).toISOString() : null,
            relatedPostIds: initial?.relatedPostIds ?? [],
            translations,
        };

        const result = mode === "create"
            ? await createBlogPost(input)
            : await updateBlogPost(postId!, input);

        if ("error" in result) {
            setError(result.error ?? "An error occurred");
            setLoading(false);
            return;
        }

        router.push("/admin/blog");
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">{error}</div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="my-blog-post" className="border-vd-border bg-vd-bg-primary" required />
                </div>
                <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="border-vd-border bg-vd-bg-primary"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="tutorial">Tutorial</SelectItem>
                            <SelectItem value="tips">Tips</SelectItem>
                            <SelectItem value="news">News</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Read Time (min)</Label>
                    <Input type="number" value={readTime} onChange={(e) => setReadTime(Number(e.target.value))} className="border-vd-border bg-vd-bg-primary" />
                </div>
                <div className="space-y-2">
                    <Label>Author</Label>
                    <Input value={author} onChange={(e) => setAuthor(e.target.value)} className="border-vd-border bg-vd-bg-primary" />
                </div>
                <div className="space-y-2">
                    <Label>Published Date</Label>
                    <Input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} className="border-vd-border bg-vd-bg-primary" />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <Switch checked={published} onCheckedChange={setPublished} />
                    <Label>Published</Label>
                </div>
                <div className="flex items-center gap-3">
                    <Switch checked={featured} onCheckedChange={setFeatured} />
                    <Label>Featured</Label>
                </div>
            </div>

            <LocaleTabs>
                {(locale) => (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Title ({locale.toUpperCase()})</Label>
                            <Input value={translations[locale].title} onChange={(e) => updateTranslation(locale, "title", e.target.value)} className="border-vd-border bg-vd-bg-primary" required={locale === "id"} />
                        </div>
                        <div className="space-y-2">
                            <Label>Excerpt ({locale.toUpperCase()})</Label>
                            <Textarea value={translations[locale].excerpt} onChange={(e) => updateTranslation(locale, "excerpt", e.target.value)} className="border-vd-border bg-vd-bg-primary" required={locale === "id"} />
                        </div>
                        <ContentEditor value={translations[locale].content as never[]} onChange={(blocks) => updateTranslation(locale, "content", blocks)} />
                    </div>
                )}
            </LocaleTabs>

            <div className="flex gap-3">
                <Button type="submit" disabled={loading} className="bg-vd-accent text-vd-bg-primary hover:bg-vd-accent/90">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {mode === "create" ? "Create Post" : "Save Changes"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")} className="border-vd-border">Cancel</Button>
            </div>
        </form>
    );
}
