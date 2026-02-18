import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/features/blog/types";
import { Calendar, Clock, ArrowRight } from "lucide-react";

type FeaturedPostProps = {
    post: BlogPost;
};

export function FeaturedPost({ post }: FeaturedPostProps) {
    const t = useTranslations("BlogIndex");
    const tPost = useTranslations("BlogPosts");

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group grid gap-6 rounded-xl border border-vd-border bg-vd-bg-secondary overflow-hidden transition-all duration-300 hover:border-vd-accent/40 sm:grid-cols-2"
        >
            {/* Cover */}
            <div className="h-48 bg-gradient-to-br from-vd-accent/10 via-vd-bg-tertiary to-vd-bg-secondary flex items-center justify-center sm:h-full sm:min-h-[260px]">
                <span className="text-6xl opacity-30">📝</span>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-6">
                <div className="mb-3 flex items-center gap-3">
                    <Badge className="bg-vd-accent text-vd-bg-primary text-[10px]">
                        {t("featured")}
                    </Badge>
                    <Badge variant="secondary" className="bg-vd-bg-tertiary text-vd-text-secondary text-[10px]">
                        {t(post.category)}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-vd-text-secondary">
                        <Clock className="h-3 w-3" />
                        {post.readTime} {t("minRead")}
                    </span>
                </div>

                <h2 className="mb-3 text-xl font-bold text-vd-text-primary group-hover:text-vd-accent transition-colors sm:text-2xl">
                    {tPost(post.titleKey)}
                </h2>

                <p className="mb-4 text-sm leading-relaxed text-vd-text-secondary">
                    {tPost(post.excerptKey)}
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-vd-text-secondary">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                        <span className="ml-1">• {post.author}</span>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-vd-accent group-hover:translate-x-1 transition-transform">
                        {t("readMore")}
                        <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
