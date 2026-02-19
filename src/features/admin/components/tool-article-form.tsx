"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { LocaleTabs } from "@/features/admin/components/locale-tabs";
import { ContentEditor } from "@/features/admin/components/content-editor";
import { createToolArticle, updateToolArticle } from "@/features/tools/actions/mutations";

type SpecItem = { label: string; value: string };
type StepItem = { title: string; description: string; code?: string };
type TabItem = { label: string; steps: StepItem[] };

type TranslationData = {
    title: string;
    description: string;
    content: unknown[];
    specs: SpecItem[];
    tabs: TabItem[];
};

type ToolFormProps = {
    mode: "create" | "edit";
    articleId?: string;
    categories: { id: string; key: string }[];
    initial?: {
        slug: string;
        icon: string;
        categoryId: string;
        sortOrder: number;
        published: boolean;
        downloadUrl: string;
        downloadVersion: string;
        translations: { id: TranslationData; en: TranslationData };
    };
};

function emptyTranslation(): TranslationData {
    return { title: "", description: "", content: [], specs: [], tabs: [] };
}

export function ToolArticleForm({ mode, articleId, categories, initial }: ToolFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [slug, setSlug] = useState(initial?.slug ?? "");
    const [icon, setIcon] = useState(initial?.icon ?? "🔧");
    const [categoryId, setCategoryId] = useState(initial?.categoryId ?? categories[0]?.id ?? "");
    const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);
    const [published, setPublished] = useState(initial?.published ?? false);
    const [downloadUrl, setDownloadUrl] = useState(initial?.downloadUrl ?? "");
    const [downloadVersion, setDownloadVersion] = useState(initial?.downloadVersion ?? "");
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

        const input = { slug, icon, categoryId, sortOrder, published, downloadUrl, downloadVersion, translations };

        const result = mode === "create"
            ? await createToolArticle(input)
            : await updateToolArticle(articleId!, input);

        if ("error" in result) {
            setError(result.error ?? "An error occurred");
            setLoading(false);
            return;
        }

        router.push("/admin/tools");
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
                    <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="platform-tools" className="border-vd-border bg-vd-bg-primary" required />
                </div>
                <div className="space-y-2">
                    <Label>Icon (emoji)</Label>
                    <Input value={icon} onChange={(e) => setIcon(e.target.value)} className="border-vd-border bg-vd-bg-primary" />
                </div>
                <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={categoryId} onValueChange={setCategoryId}>
                        <SelectTrigger className="border-vd-border bg-vd-bg-primary"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (<SelectItem key={cat.id} value={cat.id}>{cat.key}</SelectItem>))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Sort Order</Label>
                    <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} className="border-vd-border bg-vd-bg-primary" />
                </div>
                <div className="space-y-2">
                    <Label>Download URL</Label>
                    <Input value={downloadUrl} onChange={(e) => setDownloadUrl(e.target.value)} placeholder="https://..." className="border-vd-border bg-vd-bg-primary" />
                </div>
                <div className="space-y-2">
                    <Label>Version</Label>
                    <Input value={downloadVersion} onChange={(e) => setDownloadVersion(e.target.value)} placeholder="1.0.0" className="border-vd-border bg-vd-bg-primary" />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Switch checked={published} onCheckedChange={setPublished} />
                <Label>Published</Label>
            </div>

            <LocaleTabs>
                {(locale) => (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Title ({locale.toUpperCase()})</Label>
                            <Input value={translations[locale].title} onChange={(e) => updateTranslation(locale, "title", e.target.value)} className="border-vd-border bg-vd-bg-primary" required={locale === "id"} />
                        </div>
                        <div className="space-y-2">
                            <Label>Description ({locale.toUpperCase()})</Label>
                            <Textarea value={translations[locale].description} onChange={(e) => updateTranslation(locale, "description", e.target.value)} className="border-vd-border bg-vd-bg-primary" required={locale === "id"} />
                        </div>
                        <ContentEditor value={translations[locale].content as never[]} onChange={(blocks) => updateTranslation(locale, "content", blocks)} />

                        {/* Specs */}
                        <div className="space-y-3">
                            <Label>Specs ({locale.toUpperCase()})</Label>
                            {translations[locale].specs.map((spec, i) => (
                                <div key={i} className="flex gap-2">
                                    <Input placeholder="Label" value={spec.label} onChange={(e) => {
                                        const newSpecs = [...translations[locale].specs];
                                        newSpecs[i] = { ...spec, label: e.target.value };
                                        updateTranslation(locale, "specs", newSpecs);
                                    }} className="border-vd-border bg-vd-bg-primary" />
                                    <Input placeholder="Value" value={spec.value} onChange={(e) => {
                                        const newSpecs = [...translations[locale].specs];
                                        newSpecs[i] = { ...spec, value: e.target.value };
                                        updateTranslation(locale, "specs", newSpecs);
                                    }} className="border-vd-border bg-vd-bg-primary" />
                                    <Button type="button" variant="ghost" size="icon" onClick={() => {
                                        updateTranslation(locale, "specs", translations[locale].specs.filter((_, j) => j !== i));
                                    }} className="shrink-0 text-red-400"><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={() => {
                                updateTranslation(locale, "specs", [...translations[locale].specs, { label: "", value: "" }]);
                            }} className="border-vd-border"><Plus className="mr-1 h-3.5 w-3.5" />Add Spec</Button>
                        </div>

                        {/* Tabs */}
                        <div className="space-y-3">
                            <Label>Usage Tabs ({locale.toUpperCase()})</Label>
                            {translations[locale].tabs.map((tab, i) => (
                                <div key={i} className="rounded-lg border border-vd-border p-3 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Input placeholder="Tab label (e.g. Host)" value={tab.label} onChange={(e) => {
                                            const newTabs = [...translations[locale].tabs];
                                            newTabs[i] = { ...tab, label: e.target.value };
                                            updateTranslation(locale, "tabs", newTabs);
                                        }} className="border-vd-border bg-vd-bg-primary" />
                                        <Button type="button" variant="ghost" size="icon" onClick={() => {
                                            updateTranslation(locale, "tabs", translations[locale].tabs.filter((_, j) => j !== i));
                                        }} className="shrink-0 text-red-400"><Trash2 className="h-4 w-4" /></Button>
                                    </div>
                                    {tab.steps.map((step, si) => (
                                        <div key={si} className="ml-4 space-y-1 border-l-2 border-vd-border pl-3">
                                            <Input placeholder="Step title" value={step.title} onChange={(e) => {
                                                const newTabs = [...translations[locale].tabs];
                                                const newSteps = [...tab.steps];
                                                newSteps[si] = { ...step, title: e.target.value };
                                                newTabs[i] = { ...tab, steps: newSteps };
                                                updateTranslation(locale, "tabs", newTabs);
                                            }} className="border-vd-border bg-vd-bg-primary text-sm" />
                                            <Input placeholder="Step description" value={step.description} onChange={(e) => {
                                                const newTabs = [...translations[locale].tabs];
                                                const newSteps = [...tab.steps];
                                                newSteps[si] = { ...step, description: e.target.value };
                                                newTabs[i] = { ...tab, steps: newSteps };
                                                updateTranslation(locale, "tabs", newTabs);
                                            }} className="border-vd-border bg-vd-bg-primary text-sm" />
                                            <Input placeholder="Code (optional)" value={step.code ?? ""} onChange={(e) => {
                                                const newTabs = [...translations[locale].tabs];
                                                const newSteps = [...tab.steps];
                                                newSteps[si] = { ...step, code: e.target.value || undefined };
                                                newTabs[i] = { ...tab, steps: newSteps };
                                                updateTranslation(locale, "tabs", newTabs);
                                            }} className="border-vd-border bg-vd-bg-primary text-sm font-mono" />
                                        </div>
                                    ))}
                                    <Button type="button" variant="ghost" size="sm" onClick={() => {
                                        const newTabs = [...translations[locale].tabs];
                                        newTabs[i] = { ...tab, steps: [...tab.steps, { title: "", description: "" }] };
                                        updateTranslation(locale, "tabs", newTabs);
                                    }} className="ml-4 text-vd-accent"><Plus className="mr-1 h-3.5 w-3.5" />Add Step</Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={() => {
                                updateTranslation(locale, "tabs", [...translations[locale].tabs, { label: "", steps: [] }]);
                            }} className="border-vd-border"><Plus className="mr-1 h-3.5 w-3.5" />Add Tab</Button>
                        </div>
                    </div>
                )}
            </LocaleTabs>

            <div className="flex gap-3">
                <Button type="submit" disabled={loading} className="bg-vd-accent text-vd-bg-primary hover:bg-vd-accent/90">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {mode === "create" ? "Create Tool" : "Save Changes"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/admin/tools")} className="border-vd-border">Cancel</Button>
            </div>
        </form>
    );
}
