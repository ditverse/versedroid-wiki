"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type ConfirmDialogProps = {
    trigger: React.ReactNode;
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
    variant?: "destructive" | "default";
};

export function ConfirmDialog({
    trigger,
    title,
    description,
    onConfirm,
    variant = "destructive",
}: ConfirmDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleConfirm() {
        setLoading(true);
        await onConfirm();
        setLoading(false);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="border-vd-border bg-vd-bg-secondary">
                <DialogHeader>
                    <DialogTitle className="text-vd-text-primary">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="border-vd-border"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant={variant}
                        onClick={handleConfirm}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
