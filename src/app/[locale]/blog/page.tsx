import { setRequestLocale } from "next-intl/server";
import { BlogIndexContent } from "@/features/blog/components/blog-index-content";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function BlogIndexPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <BlogIndexContent />;
}
