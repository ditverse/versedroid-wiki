import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { InteractiveTerminal } from "./interactive-terminal";

export async function HeroSection() {
    const t = await getTranslations("Landing.Hero");

    return (
        <section className="px-6 py-20 lg:py-28" style={{ background: "var(--vd-bg)" }}>
            <div className="mx-auto max-w-[1100px]">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    {/* Left: Copy */}
                    <div>
                        {/* Eyebrow */}
                        <p
                            className="mb-5 text-[11px] font-medium uppercase tracking-[0.1em] animate-fade-in"
                            style={{ color: "var(--vd-accent)" }}
                        >
                            {t("eyebrow")}
                        </p>

                        {/* Headline */}
                        <h1
                            className="mb-5 animate-fade-in stagger-1"
                            style={{
                                fontFamily: "var(--font-dm-display), serif",
                                fontSize: "clamp(36px, 5vw, 52px)",
                                lineHeight: "1.1",
                                letterSpacing: "-0.03em",
                                color: "var(--vd-text)",
                                fontWeight: 400,
                            }}
                        >
                            {t("titleLine1")}{" "}
                            <em style={{ color: "var(--vd-accent)", fontStyle: "italic" }}>
                                {t("titleAccent")}
                            </em>
                            {" "}{t("titleEnd")}
                        </h1>

                        {/* Subline */}
                        <p
                            className="mb-8 text-sm leading-relaxed animate-fade-in stagger-2"
                            style={{ color: "var(--vd-text-secondary)", lineHeight: "1.7", maxWidth: "480px" }}
                        >
                            {t("subtitle")}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col gap-3 sm:flex-row animate-fade-in stagger-3">
                            <Link
                                href="/faq"
                                className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
                                style={{ background: "var(--vd-accent)", color: "var(--vd-bg)" }}
                            >
                                {t("ctaPrimary")}
                                <span aria-hidden>→</span>
                            </Link>
                            <Link
                                href="/tools"
                                className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors"
                                style={{
                                    border: "1px solid var(--vd-border)",
                                    color: "var(--vd-text)",
                                    background: "transparent",
                                }}
                            >
                                {t("ctaSecondary")}
                            </Link>
                        </div>
                    </div>

                    {/* Right: Interactive terminal */}
                    <div className="animate-fade-in stagger-2">
                        <InteractiveTerminal />
                    </div>
                </div>
            </div>
        </section>
    );
}
