import { createClient } from "@/lib/supabase/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { FaqListActions } from "./list-actions";

async function getAdminFaqArticles() {
    const supabase = await createClient();
    const { data } = await supabase
        .from("faq_articles")
        .select(`
            id, slug, icon, sort_order, published, created_at,
            faq_article_translations (locale, title),
            faq_categories!inner (key)
        `)
        .order("sort_order", { ascending: true });
    return data ?? [];
}

export default async function AdminFaqListPage() {
    const articles = await getAdminFaqArticles();

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-vd-text-primary">
                    FAQ Articles
                </h1>
                <Link href="/admin/faq/new">
                    <Button className="bg-vd-accent text-vd-bg-primary hover:bg-vd-accent/90">
                        <Plus className="mr-2 h-4 w-4" />
                        New Article
                    </Button>
                </Link>
            </div>

            <div className="rounded-lg border border-vd-border">
                <Table>
                    <TableHeader>
                        <TableRow className="border-vd-border hover:bg-transparent">
                            <TableHead className="w-12">Icon</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="w-24">Status</TableHead>
                            <TableHead className="w-24 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {articles.map((article: Record<string, unknown>) => {
                            const translations = article.faq_article_translations as Array<{ locale: string; title: string }>;
                            const idTitle = translations?.find((t) => t.locale === "id")?.title ?? "Untitled";
                            const category = article.faq_categories as { key: string } | null;

                            return (
                                <TableRow key={article.id as string} className="border-vd-border">
                                    <TableCell className="text-lg">{article.icon as string}</TableCell>
                                    <TableCell>
                                        <Link
                                            href={`/admin/faq/${article.id}/edit`}
                                            className="font-medium text-vd-text-primary hover:text-vd-accent"
                                        >
                                            {idTitle}
                                        </Link>
                                        <p className="text-xs text-vd-text-secondary">/{article.slug as string}</p>
                                    </TableCell>
                                    <TableCell className="text-sm text-vd-text-secondary capitalize">
                                        {category?.key ?? "-"}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${article.published
                                                    ? "bg-green-500/10 text-green-400"
                                                    : "bg-yellow-500/10 text-yellow-400"
                                                }`}
                                        >
                                            {article.published ? "Published" : "Draft"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <FaqListActions
                                            id={article.id as string}
                                            published={article.published as boolean}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {articles.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="py-8 text-center text-vd-text-secondary">
                                    No FAQ articles yet. Create your first one!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
