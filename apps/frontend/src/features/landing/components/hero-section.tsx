import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { BookOpen, Wrench } from "lucide-react";

export function HeroSection() {
    const t = useTranslations("Hero");

    return (
        <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4">
            {/* Background glow */}
            <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
            >
                <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-vd-accent/8 blur-[120px] animate-glow-pulse" />
                <div className="absolute left-1/3 top-1/3 h-[300px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-vd-info/5 blur-[100px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl text-center">
                {/* Tagline */}
                <h1 className="mb-6 animate-fade-in">
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
                <p className="mx-auto mb-10 max-w-2xl animate-fade-in stagger-2 text-base text-vd-text-secondary sm:text-lg md:text-xl">
                    {t("subtitle")}
                </p>

                {/* CTAs */}
                <div className="flex animate-fade-in stagger-3 flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        asChild
                        size="lg"
                        className="gap-2 bg-vd-accent px-8 text-vd-bg-primary font-semibold hover:bg-vd-accent/90 accent-glow"
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
                        className="gap-2 border-vd-border px-8 text-vd-text-primary hover:border-vd-accent hover:text-vd-accent"
                    >
                        <Link href="/tools">
                            <Wrench className="h-4 w-4" />
                            {t("ctaTools")}
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
