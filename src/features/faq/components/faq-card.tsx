import { Link } from "@/i18n/navigation";
import type { FaqArticle } from "@/features/faq/types";

type FaqCardProps = {
    article: FaqArticle;
};

export function FaqCard({ article }: FaqCardProps) {
    return (
        <Link
            href={`/faq/${article.slug}`}
            className="vd-card group flex flex-col p-6"
        >
            {/* Icon placeholder */}
            <div
                className="mb-4 flex h-8 w-8 items-center justify-center rounded-md"
                style={{ background: "var(--vd-border)" }}
            >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3 2H9L11 4V12H3V2Z"
                        stroke="var(--vd-text-secondary)"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M5 6H9M5 8H8"
                        stroke="var(--vd-text-secondary)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            <h3
                className="mb-2 text-sm font-medium"
                style={{ color: "var(--vd-text)" }}
            >
                {article.title}
            </h3>
            <p
                className="mb-4 flex-1 text-sm leading-relaxed"
                style={{ color: "var(--vd-text-secondary)", lineHeight: "1.7" }}
            >
                {article.description}
            </p>
            <span
                className="text-sm"
                style={{ color: "var(--vd-accent)" }}
            >
                Baca →
            </span>
        </Link>
    );
}
