"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Zap, Shield, Battery, Layers, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function WhyModdingSection() {
    const t = useTranslations("WhyModding");

    return (
        <section className="px-4 py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-transparent to-vd-bg-secondary/20">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
                    {/* Left: Philosophy Text */}
                    <ScrollReveal>
                        <div className="space-y-8 text-center lg:text-left relative z-10">
                            <Badge variant="outline" className="border-vd-accent/20 text-vd-accent bg-vd-accent/5 px-4 py-1.5 text-sm uppercase tracking-wider">
                                {t("title")}
                            </Badge>
                            <h2 className="text-4xl font-bold text-vd-text-primary sm:text-5xl md:text-6xl leading-[1.1] tracking-tight">
                                {t("philosophyTitle")}
                            </h2>
                            <p className="text-lg leading-relaxed text-vd-text-secondary max-w-xl mx-auto lg:mx-0">
                                {t("philosophyDesc")}
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Right: Elegant Cluster Infographic */}
                    <ScrollReveal delay={200} className="relative flex justify-center items-center h-[500px]">

                        {/* Background Ambient Glow */}
                        <div className="absolute inset-0 bg-vd-accent/5 blur-[100px] rounded-full scale-150 animate-pulse-slow" />

                        <div className="relative w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[500px] md:h-[500px] flex items-center justify-center">

                            {/* Connecting Lines (SVG) */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md">
                                <defs>
                                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="rgba(16, 185, 129, 0.1)" />
                                        <stop offset="50%" stopColor="rgba(16, 185, 129, 0.5)" />
                                        <stop offset="100%" stopColor="rgba(16, 185, 129, 0.1)" />
                                    </linearGradient>
                                </defs>
                                {/* Center to Top Left */}
                                <line x1="50%" y1="50%" x2="15%" y2="15%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4 4" className="animate-dash-flow" />
                                {/* Center to Top Right */}
                                <line x1="50%" y1="50%" x2="85%" y2="15%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4 4" className="animate-dash-flow" />
                                {/* Center to Bottom Left */}
                                <line x1="50%" y1="50%" x2="15%" y2="85%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4 4" className="animate-dash-flow-reverse" />
                                {/* Center to Bottom Right */}
                                <line x1="50%" y1="50%" x2="85%" y2="85%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4 4" className="animate-dash-flow-reverse" />
                            </svg>

                            {/* Center Node */}
                            <div className="relative z-20 flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-vd-bg-secondary border-4 border-vd-bg-primary shadow-2xl ring-4 ring-vd-accent/20 transition-transform duration-500 hover:scale-105">
                                <div className="absolute inset-0 rounded-full bg-vd-accent/5 blur-md" />
                                <Smartphone className="h-10 w-10 sm:h-12 sm:w-12 text-vd-accent" />
                            </div>

                            {/* Satellite Nodes */}
                            <ClusterNode
                                position="top-0 left-0"
                                icon={Zap}
                                title={t("infographic.node1Title")}
                                desc={t("infographic.node1Desc")}
                            />
                            <ClusterNode
                                position="top-0 right-0"
                                icon={Shield}
                                title={t("infographic.node2Title")}
                                desc={t("infographic.node2Desc")}
                            />
                            <ClusterNode
                                position="bottom-0 left-0"
                                icon={Battery}
                                title={t("infographic.node3Title")}
                                desc={t("infographic.node3Desc")}
                            />
                            <ClusterNode
                                position="bottom-0 right-0"
                                icon={Layers}
                                title={t("infographic.node4Title")}
                                desc={t("infographic.node4Desc")}
                            />
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ClusterNode({ position, icon: Icon, title, desc }: { position: string, icon: any, title: string, desc: string }) {
    return (
        <div className={`absolute ${position} flex flex-col items-center text-center max-w-[120px] sm:max-w-[140px] group cursor-default`}>
            <div className="mb-2 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-vd-accent/10 group-hover:border-vd-accent/30 dark:bg-slate-800/50 dark:border-slate-700">
                <Icon className="h-5 w-5 sm:h-7 sm:w-7 text-vd-text-primary transition-colors group-hover:text-vd-accent" />
            </div>
            <h3 className="mb-1 text-xs sm:text-sm font-bold text-vd-text-primary transition-colors group-hover:text-vd-accent leading-tight">
                {title}
            </h3>
            <p className="text-[10px] sm:text-xs leading-tight sm:leading-relaxed text-vd-text-secondary hidden sm:block">
                {desc}
            </p>
        </div>
    );
}
