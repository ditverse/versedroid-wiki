import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { toolCategories } from "@/features/tools";
import { ToolCard } from "@/features/tools/components/tool-card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function ToolsIndexPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <ToolsIndexContent />;
}

function ToolsIndexContent() {
    const t = useTranslations("ToolsIndex");
    const tDetail = useTranslations("ToolsDetail");

    return (
        <section className="px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-vd-text-primary sm:text-4xl md:text-5xl animate-fade-in">
                        {t("title")}
                    </h1>
                    <p className="mx-auto max-w-2xl text-base text-vd-text-secondary sm:text-lg animate-fade-in stagger-2">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Grouped by category */}
                {toolCategories.map((category) => (
                    <div key={category.key} className="mb-12 last:mb-0">
                        <ScrollReveal>
                            <h2 className="mb-6 text-xl font-bold text-vd-text-primary">
                                {tDetail(category.labelKey)}
                            </h2>
                        </ScrollReveal>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {category.articles.map((article, i) => (
                                <ScrollReveal key={article.slug} delay={50 * i}>
                                    <ToolCard article={article} />
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
