"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Copy, Check, Share2 } from "lucide-react";

export function ShareButtons() {
    const t = useTranslations("BlogDetail");
    const [copied, setCopied] = useState(false);

    async function handleCopyLink() {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard API not available
        }
    }

    function handleShareTwitter() {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(document.title);
        window.open(
            `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
            "_blank",
            "noopener,noreferrer"
        );
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-vd-text-secondary">
                <Share2 className="mr-1 inline h-4 w-4" />
                {t("shareTitle")}
            </span>

            <Button
                variant="outline"
                size="sm"
                onClick={handleShareTwitter}
                className="gap-1.5 border-vd-border text-vd-text-secondary hover:text-vd-text-primary text-xs"
            >
                𝕏 Twitter
            </Button>

            <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="gap-1.5 border-vd-border text-vd-text-secondary hover:text-vd-text-primary text-xs"
            >
                {copied ? (
                    <>
                        <Check className="h-3 w-3 text-vd-accent" />
                        {t("copied")}
                    </>
                ) : (
                    <>
                        <Copy className="h-3 w-3" />
                        {t("copyLink")}
                    </>
                )}
            </Button>
        </div>
    );
}
