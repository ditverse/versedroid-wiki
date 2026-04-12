import { setRequestLocale } from "next-intl/server";
import { getToolCategories } from "@/features/tools/actions/queries";
import { ToolsIndexContent } from "@/features/tools/components/tools-index-content";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function ToolsIndexPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const categories = await getToolCategories(locale);

    return <ToolsIndexContent categories={categories} />;
}
