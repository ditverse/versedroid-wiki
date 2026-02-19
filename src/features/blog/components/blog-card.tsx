import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/features/blog/types";
import { Calendar, Clock } from "lucide-react";

type BlogCardProps = {
    post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
    const t = useTranslations("BlogIndex");

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-xl border border-vd-border bg-vd-bg-secondary overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-vd-accent/40"
        >
            {/* Cover placeholder */}
            <div className="h-40 bg-gradient-to-br from-vd-bg-tertiary to-vd-bg-secondary flex items-center justify-center">
                <span className="text-4xl opacity-30">📝</span>
            </div>

            <div className="flex flex-1 flex-col p-5">
                {/* Meta */}
                <div className="mb-3 flex items-center gap-3 text-xs text-vd-text-secondary">
                    <Badge variant="secondary" className="bg-vd-bg-tertiary text-vd-text-secondary text-[10px]">
                        {t(post.category)}
                    </Badge>
                    <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime} {t("minRead")}
                    </span>
                </div>

                {/* Title */}
                <h3 className="mb-2 text-base font-semibold text-vd-text-primary group-hover:text-vd-accent transition-colors">
                    {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mb-4 flex-1 text-sm leading-relaxed text-vd-text-secondary line-clamp-2">
                    {post.excerpt}
                </p>

                {/* Date */}
                <div className="flex items-center gap-1 text-xs text-vd-text-secondary">
                    <Calendar className="h-3 w-3" />
                    {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })
                        : "Draft"}
                    <span className="ml-1">• {post.author}</span>
                </div>
            </div>
        </Link>
    );
}
