import { unstable_cache } from "next/cache";
import { createStaticClient } from "@/lib/supabase/static";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import { BlogListActions } from "./list-actions";

const getAdminBlogPosts = unstable_cache(
    async () => {
        const supabase = createStaticClient();
        const { data } = await supabase
            .from("blog_posts")
            .select(`
                id, slug, category, author, published, featured, published_at,
                blog_post_translations (locale, title)
            `)
            .order("created_at", { ascending: false });
        return data ?? [];
    },
    ["admin-blog-posts"],
    { revalidate: 30 }
);

export default async function AdminBlogListPage() {
    const posts = await getAdminBlogPosts();

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-vd-text-primary">Blog Posts</h1>
                <Link href="/admin/blog/new">
                    <Button className="bg-vd-accent text-vd-bg-primary hover:bg-vd-accent/90">
                        <Plus className="mr-2 h-4 w-4" />
                        New Post
                    </Button>
                </Link>
            </div>

            <div className="rounded-lg border border-vd-border">
                <Table>
                    <TableHeader>
                        <TableRow className="border-vd-border hover:bg-transparent">
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead className="w-20">Status</TableHead>
                            <TableHead className="w-20">Featured</TableHead>
                            <TableHead className="w-24 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post: Record<string, unknown>) => {
                            const translations = post.blog_post_translations as Array<{ locale: string; title: string }>;
                            const idTitle = translations?.find((t) => t.locale === "id")?.title ?? "Untitled";
                            return (
                                <TableRow key={post.id as string} className="border-vd-border">
                                    <TableCell>
                                        <Link href={`/admin/blog/${post.id}/edit`} className="font-medium text-vd-text-primary hover:text-vd-accent">
                                            {idTitle}
                                        </Link>
                                        <p className="text-xs text-vd-text-secondary">/{post.slug as string}</p>
                                    </TableCell>
                                    <TableCell className="text-sm text-vd-text-secondary capitalize">{post.category as string}</TableCell>
                                    <TableCell className="text-sm text-vd-text-secondary">{post.author as string}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${post.published ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                                            {post.published ? "Published" : "Draft"}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {(post.featured as boolean) && (
                                            <span className="inline-flex rounded-full bg-vd-accent/10 px-2 py-0.5 text-xs font-medium text-vd-accent">
                                                ⭐ Featured
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <BlogListActions
                                            id={post.id as string}
                                            published={post.published as boolean}
                                            featured={post.featured as boolean}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {posts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="py-8 text-center text-vd-text-secondary">No blog posts yet.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
