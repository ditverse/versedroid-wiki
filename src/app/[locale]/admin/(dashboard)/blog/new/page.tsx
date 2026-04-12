import { BlogPostForm } from "@/features/admin/components/blog-post-form";
import { AdminPageHeader } from "@/features/admin/components/admin-page-header";

export default function AdminBlogNewPage() {
    return (
        <div>
            <AdminPageHeader title="New Blog Post" eyebrow="Blog" />
            <BlogPostForm mode="create" />
        </div>
    );
}
