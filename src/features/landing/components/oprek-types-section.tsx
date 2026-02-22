"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Unlock, Sprout, Disc3, Zap, Box, ArrowRight, Settings, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";

const mainTypes = [
    {
        slug: "unlock-bootloader",
        icon: Unlock,
        titleKey: "ublTitle",
        descKey: "ublDesc",
        benefitKey: "ublBenefit",
        technicalKey: "ublTechnical",
        features: ["ublFeat1", "ublFeat2", "ublFeat3"],
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
    },
    {
        slug: "root",
        icon: Sprout,
        titleKey: "rootTitle",
        descKey: "rootDesc",
        benefitKey: "rootBenefit",
        technicalKey: "rootTechnical",
        features: ["rootFeat1", "rootFeat2", "rootFeat3"],
        color: "text-green-500",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
    },
] as const;

const secondaryTypes = [
    {
        slug: "custom-rom",
        icon: Disc3,
        titleKey: "romTitle",
        descKey: "romDesc",
        technicalKey: "romTechnical",
        features: ["romFeat1", "romFeat2", "romFeat3"],
    },
    {
        slug: "custom-kernel",
        icon: Zap,
        titleKey: "kernelTitle",
        descKey: "kernelDesc",
        technicalKey: "kernelTechnical",
        features: ["kernelFeat1", "kernelFeat2", "kernelFeat3"],
    },
    {
        slug: "magisk-modules",
        icon: Box,
        titleKey: "modulesTitle",
        descKey: "modulesDesc",
        technicalKey: "modulesTechnical",
        features: ["modulesFeat1", "modulesFeat2", "modulesFeat3"],
    },
] as const;

export function OprekTypesSection() {
    const t = useTranslations("OprekTypes");

    return (
        <section className="px-4 py-20 bg-vd-bg-secondary/30">
            <div className="mx-auto max-w-6xl">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-vd-text-primary sm:text-4xl mb-4">
                            {t("title")}
                        </h2>
                        <p className="text-vd-text-secondary text-lg">
                            {t("subtitle")}
                        </p>
                    </div>
                </ScrollReveal>

                {/* Primary Grid (UBL & Root) */}
                <div className="grid gap-6 md:grid-cols-2 mb-6">
                    {mainTypes.map((type, i) => (
                        <ScrollReveal key={type.slug} delay={i * 100}>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div
                                        className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border ${type.border} bg-vd-bg-secondary p-8 text-left transition-all hover:border-opacity-50 hover:shadow-lg`}
                                    >
                                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] transition-opacity group-hover:opacity-[0.08]">
                                            <type.icon className="h-32 w-32" />
                                        </div>

                                        <div className="mb-6 flex items-start justify-between">
                                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${type.bg} ${type.color}`}>
                                                <type.icon className="h-6 w-6" />
                                            </div>
                                            <Badge variant="secondary" className={`${type.bg} ${type.color} border-0`}>
                                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                                {t(type.benefitKey as any)}
                                            </Badge>
                                        </div>

                                        <h3 className="mb-3 text-xl font-bold text-vd-text-primary">
                                            {t(type.titleKey)}
                                        </h3>
                                        <p className="mb-6 flex-1 text-base leading-relaxed text-vd-text-secondary">
                                            {t(type.descKey)}
                                        </p>

                                        <div className={`flex items-center gap-2 font-semibold ${type.color}`}>
                                            {t("readMore")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <ModalContent t={t} type={type} />
                            </Dialog>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Secondary Grid (ROM, Kernel, Modules) - Swipeable on mobile */}
                <div className="flex -mx-4 gap-4 overflow-x-auto px-4 pb-6 pt-2 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-0 lg:grid-cols-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {secondaryTypes.map((type, i) => (
                        <div key={type.slug} className="w-[80vw] shrink-0 snap-center sm:w-auto transition-transform active:scale-[0.98] sm:active:scale-100">
                            <ScrollReveal delay={200 + i * 50}>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div
                                            className="group flex h-full cursor-pointer flex-col rounded-xl border border-vd-border bg-vd-bg-secondary p-6 text-left transition-all hover:border-vd-accent/50 hover:bg-vd-bg-secondary/80 hover:shadow-lg hover:shadow-vd-accent/5"
                                        >
                                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-vd-bg-tertiary text-vd-text-primary group-hover:bg-vd-accent/10 group-hover:text-vd-accent transition-colors">
                                                <type.icon className="h-5 w-5" />
                                            </div>
                                            <h3 className="mb-2 text-base font-semibold text-vd-text-primary">
                                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                                {t(type.titleKey as any)}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-vd-text-secondary">
                                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                                {t(type.descKey as any)}
                                            </p>
                                        </div>
                                    </DialogTrigger>
                                    <ModalContent t={t} type={type} />
                                </Dialog>
                            </ScrollReveal>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Reusable Modal Content Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ModalContent({ t, type }: { t: any, type: any }) {
    const Icon = type.icon;

    return (
        <DialogContent className="max-w-xl border-none bg-white dark:bg-[#0B1221] p-0 shadow-2xl overflow-hidden text-slate-900 dark:text-white sm:rounded-2xl">
            <div className="p-6 sm:p-8">
                <DialogHeader className="mb-6 text-left">
                    <DialogTitle className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                        {t(type.titleKey)}
                    </DialogTitle>

                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400">
                            <Icon className="h-6 w-6" />
                        </div>
                        <DialogDescription className="text-base text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                            {t(type.descKey)}
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    <div>
                        <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500">
                            TECHNICAL BREAKDOWN
                        </h4>
                        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-400">
                            {t(type.technicalKey)}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-[#131B2D]">
                        <div className="mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                            <Settings className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            <h4 className="font-semibold text-sm">Key Implementation Details</h4>
                        </div>
                        <ul className="space-y-3">
                            {type.features.map((featKey: string) => (
                                <li key={featKey} className="flex items-start gap-3">
                                    <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">{t(featKey)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <DialogFooter className="border-t border-slate-200 bg-slate-50 p-6 sm:justify-between sm:gap-0 gap-3 dark:border-slate-800 dark:bg-[#0B1221]">
                <DialogClose asChild>
                    <Button variant="ghost" className="text-slate-600 hover:bg-slate-200 dark:text-emerald-400 dark:hover:text-emerald-300 dark:hover:bg-emerald-400/10">
                        Close Specs
                    </Button>
                </DialogClose>
                <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-black dark:hover:bg-emerald-400 font-semibold px-6">
                    <Link href={`/faq/${type.slug}`}>
                        Pelajari Lebih Lanjut
                    </Link>
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}
