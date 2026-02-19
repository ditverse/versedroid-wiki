"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { LocaleTabs } from "@/features/admin/components/locale-tabs";
import { ContentEditor } from "@/features/admin/components/content-editor";
import { createFaqArticle, updateFaqArticle } from "@/features/faq/actions/mutations";

type TranslationData = {
    title: string;
    description: string;
    content: unknown[];
    faqItems: { question: string; answer: string }[];
};

type FaqFormProps = {
    mode: "create" | "edit";
    articleId?: string;
    categories: { id: string; key: string }[];
    initial?: {
        slug: string;
        icon: string;
        categoryId: string;
        sortOrder: number;
        published: boolean;
        translations: { id: TranslationData; en: TranslationData };
    };
};

function emptyTranslation(): TranslationData {
    return { title: "", description: "", content: [], faqItems: [] };
}

export function FaqArticleForm({ mode, articleId, categories, initial }: FaqFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [slug, setSlug] = useState(initial?.slug ?? "");
    const [icon, setIcon] = useState(initial?.icon ?? "📄");
    const [categoryId, setCategoryId] = useState(initial?.categoryId ?? categories[0]?.id ?? "");
    const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);
    const [published, setPublished] = useState(initial?.published ?? false);
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
            icon,
            categoryId,
            sortOrder,
            published,
            translations,
        };

        const result =
            mode === "create"
                ? await createFaqArticle(input)
                : await updateFaqArticle(articleId!, input);

        if ("error" in result) {
            setError(result.error ?? "An error occurred");
            setLoading(false);
            return;
        }

        router.push("/admin/faq");
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            {/* Meta fields */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="my-article-slug"
                        className="border-vd-border bg-vd-bg-primary"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label>Icon (emoji)</Label>
                    <Input
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                        placeholder="📄"
                        className="border-vd-border bg-vd-bg-primary"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={categoryId} onValueChange={setCategoryId}>
                        <SelectTrigger className="border-vd-border bg-vd-bg-primary">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                    {cat.key}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Sort Order</Label>
                    <Input
                        type="number"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(Number(e.target.value))}
                        className="border-vd-border bg-vd-bg-primary"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Switch checked={published} onCheckedChange={setPublished} />
                <Label>Published</Label>
            </div>

            {/* Locale-specific content */}
            <LocaleTabs>
                {(locale) => (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Title ({locale.toUpperCase()})</Label>
                            <Input
                                value={translations[locale].title}
                                onChange={(e) => updateTranslation(locale, "title", e.target.value)}
                                placeholder="Article title..."
                                className="border-vd-border bg-vd-bg-primary"
                                required={locale === "id"}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Description ({locale.toUpperCase()})</Label>
                            <Textarea
                                value={translations[locale].description}
                                onChange={(e) => updateTranslation(locale, "description", e.target.value)}
                                placeholder="Short description..."
                                className="border-vd-border bg-vd-bg-primary"
                                required={locale === "id"}
                            />
                        </div>
                        <ContentEditor
                            value={translations[locale].content as never[]}
                            onChange={(blocks) => updateTranslation(locale, "content", blocks)}
                        />

                        {/* FAQ Items */}
                        <div className="space-y-3">
                            <Label>FAQ Items ({locale.toUpperCase()})</Label>
                            {translations[locale].faqItems.map((item, i) => (
                                <div key={i} className="rounded-lg border border-vd-border p-3 space-y-2">
                                    <Input
                                        value={item.question}
                                        onChange={(e) => {
                                            const newItems = [...translations[locale].faqItems];
                                            newItems[i] = { ...newItems[i], question: e.target.value };
                                            updateTranslation(locale, "faqItems", newItems);
                                        }}
                                        placeholder="Question..."
                                        className="border-vd-border bg-vd-bg-primary"
                                    />
                                    <Textarea
                                        value={item.answer}
                                        onChange={(e) => {
                                            const newItems = [...translations[locale].faqItems];
                                            newItems[i] = { ...newItems[i], answer: e.target.value };
                                            updateTranslation(locale, "faqItems", newItems);
                                        }}
                                        placeholder="Answer..."
                                        className="border-vd-border bg-vd-bg-primary"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            const newItems = translations[locale].faqItems.filter((_, j) => j !== i);
                                            updateTranslation(locale, "faqItems", newItems);
                                        }}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    updateTranslation(locale, "faqItems", [
                                        ...translations[locale].faqItems,
                                        { question: "", answer: "" },
                                    ]);
                                }}
                                className="border-vd-border"
                            >
                                + Add FAQ Item
                            </Button>
                        </div>
                    </div>
                )}
            </LocaleTabs>

            {/* Submit */}
            <div className="flex gap-3">
                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-vd-accent text-vd-bg-primary hover:bg-vd-accent/90"
                >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {mode === "create" ? "Create Article" : "Save Changes"}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/faq")}
                    className="border-vd-border"
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
