import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { getFaqCategories } from "@/features/faq/actions/queries";
import { FaqCard } from "@/features/faq/components/faq-card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function FaqIndexPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const categories = await getFaqCategories(locale);

    return <FaqIndexContent categories={categories} />;
}

function FaqIndexContent({
    categories,
}: {
    categories: Awaited<ReturnType<typeof getFaqCategories>>;
}) {
    const t = useTranslations("FaqIndex");

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

                {/* Cards Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.flatMap((cat) =>
                        cat.articles.map((article, i) => (
                            <ScrollReveal key={article.slug} delay={50 * i}>
                                <FaqCard article={article} />
                            </ScrollReveal>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
