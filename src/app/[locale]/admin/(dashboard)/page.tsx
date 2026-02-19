import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Wrench, FileText, Eye, EyeOff } from "lucide-react";
import { Link } from "@/i18n/navigation";

async function getStats() {
    const supabase = await createClient();

    const [faqRes, toolRes, blogRes] = await Promise.all([
        supabase.from("faq_articles").select("id, published", { count: "exact" }),
        supabase.from("tool_articles").select("id, published", { count: "exact" }),
        supabase.from("blog_posts").select("id, published", { count: "exact" }),
    ]);

    const faqArticles = faqRes.data ?? [];
    const toolArticles = toolRes.data ?? [];
    const blogPosts = blogRes.data ?? [];

    return {
        faq: {
            total: faqArticles.length,
            published: faqArticles.filter((a: { published: boolean }) => a.published).length,
        },
        tools: {
            total: toolArticles.length,
            published: toolArticles.filter((a: { published: boolean }) => a.published).length,
        },
        blog: {
            total: blogPosts.length,
            published: blogPosts.filter((p: { published: boolean }) => p.published).length,
        },
    };
}

export default async function AdminDashboardPage() {
    const stats = await getStats();

    const cards = [
        {
            title: "FAQ Articles",
            icon: BookOpen,
            total: stats.faq.total,
            published: stats.faq.published,
            href: "/admin/faq",
        },
        {
            title: "Tool Articles",
            icon: Wrench,
            total: stats.tools.total,
            published: stats.tools.published,
            href: "/admin/tools",
        },
        {
            title: "Blog Posts",
            icon: FileText,
            total: stats.blog.total,
            published: stats.blog.published,
            href: "/admin/blog",
        },
    ];

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold text-vd-text-primary">
                Dashboard
            </h1>

            <div className="grid gap-4 sm:grid-cols-3">
                {cards.map((card) => (
                    <Link key={card.href} href={card.href}>
                        <Card className="border-vd-border bg-vd-bg-secondary transition-colors hover:border-vd-accent/40">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-vd-text-secondary">
                                    {card.title}
                                </CardTitle>
                                <card.icon className="h-4 w-4 text-vd-text-secondary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-vd-text-primary">
                                    {card.total}
                                </div>
                                <div className="mt-2 flex items-center gap-4 text-xs text-vd-text-secondary">
                                    <span className="flex items-center gap-1">
                                        <Eye className="h-3 w-3 text-green-400" />
                                        {card.published} published
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <EyeOff className="h-3 w-3 text-yellow-400" />
                                        {card.total - card.published} draft
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
