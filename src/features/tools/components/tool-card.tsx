import { Link } from "@/i18n/navigation";
import type { ToolArticle } from "@/features/tools/types";
import { ExternalLink } from "lucide-react";

type ToolCardProps = {
    article: ToolArticle;
};

export function ToolCard({ article }: ToolCardProps) {
    return (
        <div className="vd-card flex flex-col p-6">
            {/* Title */}
            <h3
                className="mb-2 text-sm font-medium"
                style={{ color: "var(--vd-text)" }}
            >
                {article.title}
            </h3>

            {/* Description */}
            <p
                className="mb-4 flex-1 text-sm leading-relaxed"
                style={{ color: "var(--vd-text-secondary)", lineHeight: "1.7" }}
            >
                {article.description}
            </p>

            {/* Version info */}
            {article.downloadVersion && (
                <p
                    className="mb-4 text-xs"
                    style={{ color: "var(--vd-text-muted)", fontFamily: "var(--font-dm-mono)" }}
                >
                    v{article.downloadVersion}
                </p>
            )}

            {/* CTA */}
            <div className="flex items-center justify-between">
                <Link
                    href={`/tools/${article.slug}`}
                    className="text-sm transition-colors"
                    style={{ color: "var(--vd-text-secondary)" }}
                >
                    Detail →
                </Link>
                {article.downloadUrl && (
                    <a
                        href={article.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80"
                        style={{ background: "var(--vd-accent-surface)", color: "var(--vd-accent)" }}
                    >
                        <ExternalLink className="h-3 w-3" />
                        Download
                    </a>
                )}
            </div>
        </div>
    );
}
