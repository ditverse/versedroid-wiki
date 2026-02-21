import { unstable_cache } from "next/cache";
import { createStaticClient } from "@/lib/supabase/static";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { ToolListActions } from "./list-actions";

const getAdminToolArticles = unstable_cache(
    async () => {
        const supabase = createStaticClient();
        const { data } = await supabase
            .from("tool_articles")
            .select(`
                id, slug, icon, sort_order, published,
                tool_article_translations (locale, title),
                tool_categories!inner (key)
            `)
            .order("sort_order", { ascending: true });
        return data ?? [];
    },
    ["admin-tool-articles"],
    { revalidate: 30 }
);

export default async function AdminToolsListPage() {
    const articles = await getAdminToolArticles();

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-vd-text-primary">Tool Articles</h1>
                <Link href="/admin/tools/new">
                    <Button className="bg-vd-accent text-vd-bg-primary hover:bg-vd-accent/90">
                        <Plus className="mr-2 h-4 w-4" />
                        New Tool
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
                            const translations = article.tool_article_translations as Array<{ locale: string; title: string }>;
                            const idTitle = translations?.find((t) => t.locale === "id")?.title ?? "Untitled";
                            const category = article.tool_categories as { key: string } | null;
                            return (
                                <TableRow key={article.id as string} className="border-vd-border">
                                    <TableCell className="text-lg">{article.icon as string}</TableCell>
                                    <TableCell>
                                        <Link href={`/admin/tools/${article.id}/edit`} className="font-medium text-vd-text-primary hover:text-vd-accent">
                                            {idTitle}
                                        </Link>
                                        <p className="text-xs text-vd-text-secondary">/{article.slug as string}</p>
                                    </TableCell>
                                    <TableCell className="text-sm text-vd-text-secondary capitalize">{category?.key ?? "-"}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${article.published ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                                            {article.published ? "Published" : "Draft"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <ToolListActions id={article.id as string} published={article.published as boolean} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {articles.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="py-8 text-center text-vd-text-secondary">No tool articles yet.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
