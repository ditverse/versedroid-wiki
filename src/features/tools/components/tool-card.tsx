import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { ToolArticle } from "@/features/tools/types";

type ToolCardProps = {
    article: ToolArticle;
};

export function ToolCard({ article }: ToolCardProps) {
    const t = useTranslations("ToolsDetail");

    return (
        <Link
            href={`/tools/${article.slug}`}
            className="group flex flex-col rounded-xl border border-vd-border bg-vd-bg-secondary p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-vd-accent/40 hover:accent-glow"
        >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-vd-accent/10 text-lg transition-colors group-hover:bg-vd-accent/20">
                {article.icon}
            </div>
            <h3 className="mb-2 text-base font-semibold text-vd-text-primary">
                {article.title}
            </h3>
            <p className="mb-4 flex-1 text-sm leading-relaxed text-vd-text-secondary">
                {article.description}
            </p>
            <span className="text-sm font-medium text-vd-accent transition-transform group-hover:translate-x-1">
                {t("readMore")}
            </span>
        </Link>
    );
}
