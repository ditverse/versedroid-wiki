import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { X, Check } from "lucide-react";

export function BeforeAfterSection() {
    const t = useTranslations("BeforeAfter");

    const beforeItems = [
        t("before1"),
        t("before2"),
        t("before3"),
        t("before4"),
        t("before5"),
    ];

    const afterItems = [
        t("after1"),
        t("after2"),
        t("after3"),
        t("after4"),
        t("after5"),
    ];

    return (
        <section className="px-4 py-20 sm:py-28">
            <div className="mx-auto max-w-5xl">
                <ScrollReveal>
                    <h2 className="mb-12 text-center text-3xl font-bold text-vd-text-primary sm:text-4xl">
                        {t("title")}
                    </h2>
                </ScrollReveal>

                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Before Card */}
                    <ScrollReveal delay={100}>
                        <div className="rounded-xl border border-vd-danger/20 bg-vd-danger/5 p-6 sm:p-8">
                            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-vd-danger">
                                <X className="h-5 w-5" />
                                {t("beforeTitle")}
                            </h3>
                            <ul className="space-y-3" role="list">
                                {beforeItems.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-3 text-sm text-vd-text-secondary sm:text-base"
                                    >
                                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-vd-danger/20">
                                            <X className="h-3 w-3 text-vd-danger" />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>

                    {/* After Card */}
                    <ScrollReveal delay={200}>
                        <div className="rounded-xl border border-vd-accent/20 bg-vd-accent/5 p-6 accent-glow sm:p-8">
                            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-vd-accent">
                                <Check className="h-5 w-5" />
                                {t("afterTitle")}
                            </h3>
                            <ul className="space-y-3" role="list">
                                {afterItems.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-3 text-sm text-vd-text-secondary sm:text-base"
                                    >
                                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-vd-accent/20">
                                            <Check className="h-3 w-3 text-vd-accent" />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
