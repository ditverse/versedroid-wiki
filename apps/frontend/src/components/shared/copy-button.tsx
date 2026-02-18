"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type CopyButtonProps = {
    text: string;
};

export function CopyButton({ text }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard API not available — silently ignore
        }
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 gap-1.5 px-2 text-xs text-vd-text-secondary hover:text-vd-text-primary"
            aria-label={copied ? "Copied" : "Copy code"}
        >
            {copied ? (
                <>
                    <Check className="h-3 w-3 text-vd-accent" />
                    <span className="text-vd-accent">Copied ✓</span>
                </>
            ) : (
                <>
                    <Copy className="h-3 w-3" />
                    Copy
                </>
            )}
        </Button>
    );
}
