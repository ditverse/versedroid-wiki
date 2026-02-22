"use client";

import { useRouter } from "next/navigation";
import { toggleToolPublish, deleteToolArticle } from "@/features/tools/actions/mutations";
import { ConfirmDialog } from "@/features/admin/components/confirm-dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Trash2 } from "lucide-react";

type Props = { id: string; published: boolean };

export function ToolListActions({ id, published }: Props) {
    const router = useRouter();

    async function handleToggle() {
        const result = await toggleToolPublish(id, !published);
        if (result.error) toast.error(result.error);
        else router.refresh();
    }

    async function handleDelete() {
        const result = await deleteToolArticle(id);
        if (result.error) toast.error(result.error);
        else router.refresh();
    }

    return (
        <div className="flex items-center justify-end gap-1">
            <Button variant="ghost" size="icon" onClick={handleToggle} className="h-8 w-8 text-vd-text-secondary hover:text-vd-text-primary" title={published ? "Unpublish" : "Publish"}>
                {published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <ConfirmDialog
                trigger={<Button variant="ghost" size="icon" className="h-8 w-8 text-vd-text-secondary hover:text-red-400"><Trash2 className="h-4 w-4" /></Button>}
                title="Delete Tool"
                description="Are you sure? This action cannot be undone."
                onConfirm={handleDelete}
            />
        </div>
    );
}
