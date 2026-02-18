import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/features/landing/components/hero-section";
import { WhyModdingSection } from "@/features/landing/components/why-modding-section";
import { OprekTypesSection } from "@/features/landing/components/oprek-types-section";

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <HeroSection />
            <WhyModdingSection />
            <OprekTypesSection />
        </>
    );
}
