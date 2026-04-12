import { getTranslations } from "next-intl/server";

export async function WhyModdingSection() {
    const t = await getTranslations("Landing.WhyModding");

    const benefits = [
        {
            icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1L10 6H15L11 9.5L12.5 14.5L8 11.5L3.5 14.5L5 9.5L1 6H6L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
            ),
            title: t("b1Title"),
            desc:  t("b1Desc"),
        },
        {
            icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 8H11M8 5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            ),
            title: t("b2Title"),
            desc:  t("b2Desc"),
        },
        {
            icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="1" width="6" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M6 12H10V14H6V12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M6 4H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            ),
            title: t("b3Title"),
            desc:  t("b3Desc"),
        },
        {
            icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4H14M2 8H10M2 12H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            ),
            title: t("b4Title"),
            desc:  t("b4Desc"),
        },
    ];

    return (
        <section className="px-6 py-[72px]" style={{ background: "var(--vd-bg)" }}>
            <div
                className="mx-auto max-w-[1100px]"
                style={{ borderTop: "1px solid var(--vd-border)" }}
            >
                {/* Section header */}
                <div className="py-12">
                    <p
                        className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em]"
                        style={{ color: "var(--vd-text-muted)" }}
                    >
                        {t("eyebrow")}
                    </p>
                    <h2
                        style={{
                            fontFamily: "var(--font-dm-display), serif",
                            fontSize: "clamp(28px, 4vw, 36px)",
                            letterSpacing: "-0.025em",
                            color: "var(--vd-text)",
                            fontWeight: 400,
                            lineHeight: "1.2",
                        }}
                    >
                        {t("title")}
                    </h2>
                </div>

                {/* 4-column border-gapped grid */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                    style={{ background: "var(--vd-border)", gap: "1px" }}
                >
                    {benefits.map((b) => (
                        <div
                            key={b.title}
                            className="p-6"
                            style={{ background: "var(--vd-bg)" }}
                        >
                            <div
                                className="mb-4 flex h-8 w-8 items-center justify-center rounded-md"
                                style={{ background: "var(--vd-accent-surface)", color: "var(--vd-accent)" }}
                            >
                                {b.icon}
                            </div>
                            <h3 className="mb-2 text-sm font-medium" style={{ color: "var(--vd-text)" }}>
                                {b.title}
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--vd-text-muted)", lineHeight: "1.7" }}>
                                {b.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
