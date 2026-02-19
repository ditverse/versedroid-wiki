"use client";

import { useRouter } from "next/navigation";
import { toggleBlogPublish, toggleBlogFeatured, deleteBlogPost } from "@/features/blog/actions/mutations";
import { ConfirmDialog } from "@/features/admin/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Star, StarOff, Trash2 } from "lucide-react";

type Props = { id: string; published: boolean; featured: boolean };

export function BlogListActions({ id, published, featured }: Props) {
    const router = useRouter();

    async function handleTogglePublish() {
        await toggleBlogPublish(id, !published);
        router.refresh();
    }

    async function handleToggleFeatured() {
        await toggleBlogFeatured(id, !featured);
        router.refresh();
    }

    async function handleDelete() {
        await deleteBlogPost(id);
        router.refresh();
    }

    return (
        <div className="flex items-center justify-end gap-1">
            <Button variant="ghost" size="icon" onClick={handleToggleFeatured} className="h-8 w-8 text-vd-text-secondary hover:text-yellow-400" title={featured ? "Unfeature" : "Feature"}>
                {featured ? <StarOff className="h-4 w-4" /> : <Star className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleTogglePublish} className="h-8 w-8 text-vd-text-secondary hover:text-vd-text-primary" title={published ? "Unpublish" : "Publish"}>
                {published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <ConfirmDialog
                trigger={<Button variant="ghost" size="icon" className="h-8 w-8 text-vd-text-secondary hover:text-red-400"><Trash2 className="h-4 w-4" /></Button>}
                title="Delete Post"
                description="Are you sure? This action cannot be undone."
                onConfirm={handleDelete}
            />
        </div>
    );
}
