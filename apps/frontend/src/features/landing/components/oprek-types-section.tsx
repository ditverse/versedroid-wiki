import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Unlock, Sprout, Disc3, Zap } from "lucide-react";

const oprekTypes = [
    {
        slug: "unlock-bootloader",
        icon: Unlock,
        titleKey: "ublTitle",
        descKey: "ublDesc",
    },
    {
        slug: "root",
        icon: Sprout,
        titleKey: "rootTitle",
        descKey: "rootDesc",
    },
    {
        slug: "custom-rom",
        icon: Disc3,
        titleKey: "romTitle",
        descKey: "romDesc",
    },
    {
        slug: "custom-kernel",
        icon: Zap,
        titleKey: "kernelTitle",
        descKey: "kernelDesc",
    },
] as const;

export function OprekTypesSection() {
    const t = useTranslations("OprekTypes");

    return (
        <section className="px-4 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl">
                <ScrollReveal>
                    <h2 className="mb-12 text-center text-3xl font-bold text-vd-text-primary sm:text-4xl">
                        {t("title")}
                    </h2>
                </ScrollReveal>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {oprekTypes.map((type, i) => (
                        <ScrollReveal key={type.slug} delay={100 + i * 50}>
                            <Link
                                href={`/faq/${type.slug}`}
                                className="group flex h-full flex-col rounded-xl border border-vd-border bg-vd-bg-secondary p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-vd-accent/40 hover:accent-glow"
                            >
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-vd-accent/10 text-vd-accent transition-colors group-hover:bg-vd-accent/20">
                                    <type.icon className="h-5 w-5" />
                                </div>
                                <h3 className="mb-2 text-base font-semibold text-vd-text-primary">
                                    {t(type.titleKey)}
                                </h3>
                                <p className="mb-4 flex-1 text-sm leading-relaxed text-vd-text-secondary">
                                    {t(type.descKey)}
                                </p>
                                <span className="text-sm font-medium text-vd-accent transition-transform group-hover:translate-x-1">
                                    {t("readMore")}
                                </span>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
