import { setRequestLocale } from "next-intl/server";
import { getFaqCategories } from "@/features/faq/actions/queries";
import { FaqIndexContent } from "@/features/faq/components/faq-index-content";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function FaqIndexPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const categories = await getFaqCategories(locale);

    return <FaqIndexContent categories={categories} />;
}
