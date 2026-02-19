import { BlogPostForm } from "@/features/admin/components/blog-post-form";

export default function AdminBlogNewPage() {
    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold text-vd-text-primary">New Blog Post</h1>
            <BlogPostForm mode="create" />
        </div>
    );
}
