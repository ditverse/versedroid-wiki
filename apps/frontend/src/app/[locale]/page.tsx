import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/features/landing/components/hero-section";
import { WhatIsOprekSection } from "@/features/landing/components/what-is-oprek-section";
import { BeforeAfterSection } from "@/features/landing/components/before-after-section";
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
            <WhatIsOprekSection />
            <BeforeAfterSection />
            <OprekTypesSection />
        </>
    );
}
