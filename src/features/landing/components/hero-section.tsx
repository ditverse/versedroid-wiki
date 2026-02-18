import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Wrench, ChevronRight } from "lucide-react";

export function HeroSection() {
    const t = useTranslations("Hero");

    return (
        <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center sm:min-h-[70vh]">
            {/* Background glow */}
            <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
            >
                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-vd-accent/5 blur-[100px] animate-glow-pulse" />
                <div className="absolute left-1/3 top-1/4 h-[300px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-vd-info/5 blur-[80px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center">
                {/* Badge */}
                <Badge
                    variant="outline"
                    className="mb-6 animate-fade-in px-4 py-1.5 text-sm font-medium text-vd-accent bg-vd-accent/5 border-vd-accent/20 hover:bg-vd-accent/10 transition-colors"
                >
                    {t("badge")}
                </Badge>

                {/* Tagline */}
                <h1 className="mb-6 animate-fade-in max-w-3xl">
                    <span className="block text-4xl font-extrabold leading-tight tracking-tight text-vd-text-primary sm:text-5xl md:text-6xl lg:text-7xl">
                        {t("title1")}
                    </span>
                    <span className="block text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                        <span className="bg-gradient-to-r from-vd-accent to-emerald-400 bg-clip-text text-transparent">
                            {t("title2")}
                        </span>
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="mx-auto mb-10 max-w-xl animate-fade-in stagger-2 text-base leading-relaxed text-vd-text-secondary sm:text-lg">
                    {t("subtitle")}
                </p>

                {/* CTAs */}
                <div className="flex animate-fade-in stagger-3 flex-col items-center justify-center gap-4 w-full sm:w-auto sm:flex-row">
                    <Button
                        asChild
                        size="lg"
                        className="gap-2 w-full sm:w-auto bg-vd-accent px-8 font-semibold text-vd-bg-primary hover:bg-vd-accent/90 accent-glow h-12"
                    >
                        <Link href="/faq">
                            <BookOpen className="h-4 w-4" />
                            {t("ctaLearn")}
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="gap-2 w-full sm:w-auto border-vd-border px-8 text-vd-text-primary hover:border-vd-accent hover:text-vd-accent h-12 bg-vd-bg-secondary/50 backdrop-blur-sm"
                    >
                        <Link href="/tools">
                            <Wrench className="h-4 w-4" />
                            {t("ctaTools")}
                        </Link>
                    </Button>
                </div>

                {/* Trust Footer */}
                <p className="mt-12 text-sm font-medium text-vd-text-secondary/60 animate-fade-in stagger-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-vd-accent/50 animate-pulse" />
                    {t("trust")}
                </p>
            </div>
        </section>
    );
}
