import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function WhatIsOprekSection() {
    const t = useTranslations("WhatIsOprek");

    return (
        <section className="px-4 py-20 sm:py-28">
            <div className="mx-auto max-w-4xl">
                <ScrollReveal>
                    <h2 className="mb-8 text-center text-3xl font-bold text-vd-text-primary sm:text-4xl">
                        {t("title")}
                    </h2>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                    <div className="rounded-xl border border-vd-border bg-vd-bg-secondary p-8 sm:p-10">
                        <p className="mb-6 text-base leading-relaxed text-vd-text-secondary sm:text-lg">
                            {t("description")}
                        </p>
                        <p className="border-l-2 border-vd-accent pl-4 text-base font-medium italic text-vd-accent sm:text-lg">
                            {t("highlight")}
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
