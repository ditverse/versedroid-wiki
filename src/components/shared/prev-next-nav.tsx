import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ArticleRef = {
    slug: string;
    title: string;
};

type PrevNextNavProps = {
    prev: ArticleRef | null;
    next: ArticleRef | null;
    basePath: string;
};

export function PrevNextNav({
    prev,
    next,
    basePath,
}: PrevNextNavProps) {
    const tCommon = useTranslations("Common");

    return (
        <nav
            className="mt-12 grid grid-cols-2 gap-4"
            aria-label="Article navigation"
        >
            {prev ? (
                <Link
                    href={`${basePath}/${prev.slug}`}
                    className="group flex flex-col rounded-lg border border-vd-border p-4 transition-colors hover:border-vd-accent/40"
                >
                    <span className="mb-1 flex items-center gap-1 text-xs text-vd-text-secondary">
                        <ChevronLeft className="h-3 w-3" />
                        {tCommon("prevArticle")}
                    </span>
                    <span className="text-sm font-medium text-vd-text-primary group-hover:text-vd-accent">
                        {prev.title}
                    </span>
                </Link>
            ) : (
                <div />
            )}

            {next ? (
                <Link
                    href={`${basePath}/${next.slug}`}
                    className="group flex flex-col items-end rounded-lg border border-vd-border p-4 text-right transition-colors hover:border-vd-accent/40"
                >
                    <span className="mb-1 flex items-center gap-1 text-xs text-vd-text-secondary">
                        {tCommon("nextArticle")}
                        <ChevronRight className="h-3 w-3" />
                    </span>
                    <span className="text-sm font-medium text-vd-text-primary group-hover:text-vd-accent">
                        {next.title}
                    </span>
                </Link>
            ) : (
                <div />
            )}
        </nav>
    );
}
