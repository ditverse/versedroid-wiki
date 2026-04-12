"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type BadgeVariant = "required" | "advanced" | "optional";
type ModalSlug = "unlock-bootloader" | "root" | "custom-rom" | "custom-kernel" | "magisk" | null;

const badgeCss: Record<BadgeVariant, { bg: string; color: string }> = {
    required: { bg: "var(--vd-accent-surface)",  color: "var(--vd-accent)" },
    advanced:  { bg: "var(--vd-warning-surface)", color: "var(--vd-warning)" },
    optional:  { bg: "var(--vd-badge-neutral)",   color: "var(--vd-text-muted)" },
};

export function OprekTypesSection() {
    const t      = useTranslations("Landing.OprekTypes");
    const tOprek = useTranslations("OprekTypes");
    const [openModal, setOpenModal] = useState<ModalSlug>(null);

    const cards = [
        {
            slug:         "unlock-bootloader" as ModalSlug,
            title:        tOprek("ublTitle"),
            desc:         tOprek("ublDesc"),
            badge:        t("badgeRequired"),
            badgeVariant: "required" as BadgeVariant,
        },
        {
            slug:         "root" as ModalSlug,
            title:        tOprek("rootTitle"),
            desc:         tOprek("rootDesc"),
            badge:        t("badgeAdvanced"),
            badgeVariant: "advanced" as BadgeVariant,
        },
        {
            slug:         "custom-rom" as ModalSlug,
            title:        tOprek("romTitle"),
            desc:         tOprek("romDesc"),
            badge:        t("badgeAdvanced"),
            badgeVariant: "advanced" as BadgeVariant,
        },
        {
            slug:         "custom-kernel" as ModalSlug,
            title:        tOprek("kernelTitle"),
            desc:         tOprek("kernelDesc"),
            badge:        t("badgeAdvanced"),
            badgeVariant: "advanced" as BadgeVariant,
        },
        {
            slug:         "magisk" as ModalSlug,
            title:        tOprek("modulesTitle"),
            desc:         tOprek("modulesDesc"),
            badge:        t("badgeOptional"),
            badgeVariant: "optional" as BadgeVariant,
        },
    ];

    const [featured, ...rest] = cards;

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

                {/* Grid: featured (UBL) spans 2 of 3 cols */}
                <div className="grid gap-4 lg:grid-cols-3">
                    {/* Featured card */}
                    <div className="lg:col-span-2">
                        <button
                            className="vd-card flex h-full w-full flex-col p-8 text-left"
                            onClick={() => setOpenModal(featured.slug)}
                        >
                            <div className="mb-5">
                                <span
                                    className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                                    style={{ background: badgeCss[featured.badgeVariant].bg, color: badgeCss[featured.badgeVariant].color }}
                                >
                                    {featured.badge}
                                </span>
                            </div>
                            <h3
                                className="mb-3"
                                style={{
                                    fontFamily: "var(--font-dm-display), serif",
                                    fontSize: "22px",
                                    fontWeight: 400,
                                    color: "var(--vd-text)",
                                    letterSpacing: "-0.01em",
                                }}
                            >
                                {featured.title}
                            </h3>
                            <p
                                className="mb-6 flex-1 text-sm leading-relaxed"
                                style={{ color: "var(--vd-text-secondary)", lineHeight: "1.7" }}
                            >
                                {featured.desc}
                            </p>
                            <span className="text-sm font-medium" style={{ color: "var(--vd-accent)" }}>
                                {t("learnMore")}
                            </span>
                        </button>
                    </div>

                    {/* Remaining cards — all open modals */}
                    {rest.map((card) => {
                        const badge = badgeCss[card.badgeVariant];
                        return (
                            <button
                                key={card.slug}
                                className="flex text-left"
                                onClick={() => setOpenModal(card.slug)}
                            >
                                <div className="vd-card flex h-full w-full flex-col p-6">
                                    <div className="mb-4">
                                        <span
                                            className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                                            style={{ background: badge.bg, color: badge.color }}
                                        >
                                            {card.badge}
                                        </span>
                                    </div>
                                    <h3
                                        className="mb-2 flex-shrink-0"
                                        style={{
                                            fontFamily: "var(--font-dm-display), serif",
                                            fontSize: "18px",
                                            fontWeight: 400,
                                            color: "var(--vd-text)",
                                            letterSpacing: "-0.01em",
                                        }}
                                    >
                                        {card.title}
                                    </h3>
                                    <p
                                        className="mb-5 flex-1 text-sm leading-relaxed"
                                        style={{ color: "var(--vd-text-secondary)", lineHeight: "1.7" }}
                                    >
                                        {card.desc}
                                    </p>
                                    <span className="text-sm font-medium" style={{ color: "var(--vd-accent)" }}>
                                        {t("learnMore")}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── Modals ── */}
            <UblModal     open={openModal === "unlock-bootloader"} onClose={() => setOpenModal(null)} t={t} tOprek={tOprek} />
            <RootModal    open={openModal === "root"}              onClose={() => setOpenModal(null)} t={t} tOprek={tOprek} />
            <RomModal     open={openModal === "custom-rom"}        onClose={() => setOpenModal(null)} t={t} tOprek={tOprek} />
            <KernelModal  open={openModal === "custom-kernel"}     onClose={() => setOpenModal(null)} t={t} tOprek={tOprek} />
            <MagiskModal  open={openModal === "magisk"}            onClose={() => setOpenModal(null)} t={t} tOprek={tOprek} />
        </section>
    );
}

/* ── Shared modal shell ── */
type ModalShellProps = {
    open: boolean;
    onClose: () => void;
    badge: string;
    badgeVariant: BadgeVariant;
    title: string;
    desc: string;
    infographic: React.ReactNode;
    children: React.ReactNode;
    cta?: React.ReactNode;
};

function ModalShell({ open, onClose, badge, badgeVariant, title, desc, infographic, children, cta }: ModalShellProps) {
    const bg = badgeCss[badgeVariant];
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="max-w-2xl overflow-y-auto"
                style={{
                    background: "var(--vd-surface)",
                    border: "1px solid var(--vd-border)",
                    maxHeight: "90vh",
                }}
            >
                <DialogHeader>
                    <div className="mb-3">
                        <span
                            className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                            style={{ background: bg.bg, color: bg.color }}
                        >
                            {badge}
                        </span>
                    </div>
                    <DialogTitle
                        style={{
                            fontFamily: "var(--font-dm-display), serif",
                            fontSize: "clamp(22px, 3vw, 28px)",
                            fontWeight: 400,
                            color: "var(--vd-text)",
                            letterSpacing: "-0.025em",
                        }}
                    >
                        {title}
                    </DialogTitle>
                    <p
                        className="text-sm leading-relaxed mt-2"
                        style={{ color: "var(--vd-text-secondary)", lineHeight: "1.7" }}
                    >
                        {desc}
                    </p>
                </DialogHeader>

                {/* Infographic */}
                <div
                    className="rounded-xl p-4 my-2"
                    style={{ background: "var(--vd-bg)", border: "1px solid var(--vd-border)" }}
                >
                    {infographic}
                </div>

                <div className="space-y-4">
                    {children}
                </div>

                {cta && <div className="pt-2">{cta}</div>}
            </DialogContent>
        </Dialog>
    );
}

/* ── Section blocks reused inside modals ── */
function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h4 className="mb-2 text-sm font-medium" style={{ color: "var(--vd-text)" }}>{title}</h4>
            {children}
        </div>
    );
}

function FeatureList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-1.5">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--vd-accent)" }} />
                    <span className="text-sm" style={{ color: "var(--vd-text-secondary)" }}>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function PrerequisiteBox({ text }: { text: string }) {
    return (
        <div
            className="rounded-lg p-3 flex items-start gap-2"
            style={{ background: "var(--vd-border)", border: "1px solid var(--vd-border-hover)" }}
        >
            <span className="text-base leading-none mt-0.5">🔗</span>
            <p className="text-sm" style={{ color: "var(--vd-text-secondary)" }}>{text}</p>
        </div>
    );
}

function ModalCta({ href, label, onClose }: { href: string; label: string; onClose: () => void }) {
    return (
        <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--vd-accent)", color: "var(--vd-bg)" }}
            onClick={onClose}
        >
            {label}
        </Link>
    );
}

/* ─────────────────────────────────────────── */
/* 1. Unlock Bootloader Modal                  */
/* ─────────────────────────────────────────── */
function UblModal({ open, onClose, t, tOprek }: ModalProps) {
    return (
        <ModalShell
            open={open} onClose={onClose}
            badge={t("badgeRequired")} badgeVariant="required"
            title={tOprek("ublTitle")}
            desc={t("ublModal.desc")}
            infographic={<UblDiagram />}
            cta={<ModalCta href="/faq/unlock-bootloader" label={t("readFullUbl")} onClose={onClose} />}
        >
            <SectionBlock title={t("ublModal.whatTitle")}>
                <p className="text-sm leading-relaxed" style={{ color: "var(--vd-text-secondary)", lineHeight: "1.7" }}>
                    {t("ublModal.whatDesc")}
                </p>
            </SectionBlock>

            <SectionBlock title={t("ublModal.whyTitle")}>
                <p className="text-sm leading-relaxed" style={{ color: "var(--vd-text-secondary)", lineHeight: "1.7" }}>
                    {t("ublModal.whyDesc")}
                </p>
            </SectionBlock>

            <SectionBlock title={t("ublModal.stepsTitle")}>
                <ol className="space-y-2">
                    {(["step1", "step2", "step3", "step4"] as const).map((key, i) => (
                        <li key={key} className="flex items-start gap-3">
                            <span
                                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-medium mt-0.5"
                                style={{ background: "var(--vd-accent-surface)", color: "var(--vd-accent)" }}
                            >
                                {i + 1}
                            </span>
                            <span className="text-sm" style={{ color: "var(--vd-text-secondary)" }}>
                                {t(`ublModal.${key}`)}
                            </span>
                        </li>
                    ))}
                </ol>
            </SectionBlock>

            <div
                className="rounded-lg p-4"
                style={{ background: "var(--vd-warning-surface)", border: "1px solid rgba(202,138,4,0.3)" }}
            >
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--vd-warning)" }}>
                    {t("ublModal.warningTitle")}
                </p>
                <p className="text-sm" style={{ color: "var(--vd-text-secondary)" }}>
                    {t("ublModal.warningDesc")}
                </p>
            </div>
        </ModalShell>
    );
}

/* ─────────────────────────────────────────── */
/* 2. Root Access Modal                        */
/* ─────────────────────────────────────────── */
function RootModal({ open, onClose, t, tOprek }: ModalProps) {
    return (
        <ModalShell
            open={open} onClose={onClose}
            badge={t("badgeAdvanced")} badgeVariant="advanced"
            title={tOprek("rootTitle")}
            desc={t("rootModal.desc")}
            infographic={<RootDiagram />}
            cta={<ModalCta href="/faq/root" label={t("readFullRoot")} onClose={onClose} />}
        >
            <PrerequisiteBox text={t("rootModal.requiresDesc")} />

            <SectionBlock title={t("technicalTitle")}>
                <p className="text-sm leading-relaxed" style={{ color: "var(--vd-text-secondary)", lineHeight: "1.7" }}>
                    {tOprek("rootTechnical")}
                </p>
            </SectionBlock>

            <SectionBlock title={t("featuresTitle")}>
                <FeatureList items={[tOprek("rootFeat1"), tOprek("rootFeat2"), tOprek("rootFeat3")]} />
            </SectionBlock>
        </ModalShell>
    );
}

/* ─────────────────────────────────────────── */
/* 3. Custom ROM Modal                         */
/* ─────────────────────────────────────────── */
function RomModal({ open, onClose, t, tOprek }: ModalProps) {
    return (
        <ModalShell
            open={open} onClose={onClose}
            badge={t("badgeAdvanced")} badgeVariant="advanced"
            title={tOprek("romTitle")}
            desc={t("romModal.desc")}
            infographic={<RomDiagram />}
            cta={<ModalCta href="/faq/custom-rom" label={t("readFullRom")} onClose={onClose} />}
        >
            <PrerequisiteBox text={t("romModal.requiresDesc")} />

            <SectionBlock title={t("technicalTitle")}>
                <p className="text-sm leading-relaxed" style={{ color: "var(--vd-text-secondary)", lineHeight: "1.7" }}>
                    {tOprek("romTechnical")}
                </p>
            </SectionBlock>

            <SectionBlock title={t("featuresTitle")}>
                <FeatureList items={[tOprek("romFeat1"), tOprek("romFeat2"), tOprek("romFeat3")]} />
            </SectionBlock>
        </ModalShell>
    );
}

/* ─────────────────────────────────────────── */
/* 4. Custom Kernel Modal                      */
/* ─────────────────────────────────────────── */
function KernelModal({ open, onClose, t, tOprek }: ModalProps) {
    return (
        <ModalShell
            open={open} onClose={onClose}
            badge={t("badgeAdvanced")} badgeVariant="advanced"
            title={tOprek("kernelTitle")}
            desc={t("kernelModal.desc")}
            infographic={<KernelDiagram />}
        >
            <PrerequisiteBox text={t("kernelModal.requiresDesc")} />

            <SectionBlock title={t("technicalTitle")}>
                <p className="text-sm leading-relaxed" style={{ color: "var(--vd-text-secondary)", lineHeight: "1.7" }}>
                    {tOprek("kernelTechnical")}
                </p>
            </SectionBlock>

            <SectionBlock title={t("featuresTitle")}>
                <FeatureList items={[tOprek("kernelFeat1"), tOprek("kernelFeat2"), tOprek("kernelFeat3")]} />
            </SectionBlock>

            {/* Coming soon note */}
            <div
                className="rounded-lg p-3"
                style={{ background: "var(--vd-border)", border: "1px solid var(--vd-border-hover)" }}
            >
                <p className="text-sm" style={{ color: "var(--vd-text-muted)" }}>
                    {t("kernelModal.comingSoon")}
                </p>
            </div>
        </ModalShell>
    );
}

/* ─────────────────────────────────────────── */
/* 5. Magisk Modules Modal                     */
/* ─────────────────────────────────────────── */
function MagiskModal({ open, onClose, t, tOprek }: ModalProps) {
    return (
        <ModalShell
            open={open} onClose={onClose}
            badge={t("badgeOptional")} badgeVariant="optional"
            title={tOprek("modulesTitle")}
            desc={t("modulesModal.desc")}
            infographic={<MagiskDiagram />}
            cta={<ModalCta href="/faq/magisk" label={t("readFullModules")} onClose={onClose} />}
        >
            <PrerequisiteBox text={t("modulesModal.requiresDesc")} />

            <SectionBlock title={t("technicalTitle")}>
                <p className="text-sm leading-relaxed" style={{ color: "var(--vd-text-secondary)", lineHeight: "1.7" }}>
                    {tOprek("modulesTechnical")}
                </p>
            </SectionBlock>

            <SectionBlock title={t("featuresTitle")}>
                <FeatureList items={[tOprek("modulesFeat1"), tOprek("modulesFeat2"), tOprek("modulesFeat3")]} />
            </SectionBlock>
        </ModalShell>
    );
}

/* ─────────────────────────────────────────── */
/* Shared type for modal props                 */
/* ─────────────────────────────────────────── */
type ModalProps = {
    open: boolean;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t: (key: string, ...args: any[]) => string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tOprek: (key: string, ...args: any[]) => string;
};

/* ─────────────────────────────────────────── */
/* SVG Infographics                            */
/* ─────────────────────────────────────────── */

/** 1. UBL: Android → Unlock Bootloader → (Root / ROM / Kernel / Magisk) */
function UblDiagram() {
    return (
        <svg viewBox="0 0 480 140" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" aria-hidden>
            <rect x="4" y="50" width="76" height="40" rx="7" fill="var(--vd-border)" stroke="var(--vd-border-hover)" strokeWidth="1" />
            <text x="42" y="67" textAnchor="middle" fontSize="8.5" fill="var(--vd-text-muted)" fontFamily="sans-serif">Android</text>
            <text x="42" y="80" textAnchor="middle" fontSize="8.5" fill="var(--vd-text-muted)" fontFamily="sans-serif">Device</text>
            <line x1="80" y1="70" x2="110" y2="70" stroke="var(--vd-border-hover)" strokeWidth="1.5" />
            <polygon points="110,65.5 118,70 110,74.5" fill="var(--vd-border-hover)" />
            <rect x="118" y="34" width="116" height="72" rx="8" fill="var(--vd-accent-surface)" stroke="var(--vd-accent)" strokeWidth="1.5" />
            <text x="176" y="62" textAnchor="middle" fontSize="9.5" fill="var(--vd-accent)" fontFamily="sans-serif" fontWeight="600">Unlock</text>
            <text x="176" y="76" textAnchor="middle" fontSize="9.5" fill="var(--vd-accent)" fontFamily="sans-serif" fontWeight="600">Bootloader</text>
            <text x="176" y="93" textAnchor="middle" fontSize="7.5" fill="var(--vd-text-muted)" fontFamily="monospace">fastboot flashing</text>
            <text x="176" y="103" textAnchor="middle" fontSize="7.5" fill="var(--vd-text-muted)" fontFamily="monospace">unlock</text>
            <line x1="234" y1="70" x2="260" y2="70" stroke="var(--vd-border-hover)" strokeWidth="1.5" />
            <polygon points="260,65.5 268,70 260,74.5" fill="var(--vd-border-hover)" />
            <line x1="272" y1="18" x2="272" y2="122" stroke="var(--vd-border-hover)" strokeWidth="1" strokeDasharray="3,2" />
            {[["18", "Root Access"], ["54", "Custom ROM"], ["90", "Custom Kernel"], ["122", "Magisk"]].map(([y, label]) => (
                <g key={label}>
                    <line x1="272" y1={y} x2="295" y2={y} stroke="var(--vd-border-hover)" strokeWidth="1" strokeDasharray="3,2" />
                    <rect x="295" y={String(Number(y) - 12)} width="82" height="24" rx="6" fill="var(--vd-border)" stroke="var(--vd-border-hover)" strokeWidth="1" />
                    <text x="336" y={String(Number(y) + 3)} textAnchor="middle" fontSize="8.5" fill="var(--vd-text-secondary)" fontFamily="sans-serif">{label}</text>
                </g>
            ))}
        </svg>
    );
}

/** 2. Root: Android → Patch boot.img → Flash → su Access */
function RootDiagram() {
    return (
        <svg viewBox="0 0 480 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" aria-hidden>
            {[
                { x: 4,   label1: "Android",   label2: "(UBL)",      accent: false },
                { x: 126, label1: "Patch",      label2: "boot.img",   accent: true },
                { x: 248, label1: "Flash",      label2: "Magisk",     accent: true },
                { x: 370, label1: "Root",       label2: "Granted",    accent: false },
            ].map(({ x, label1, label2, accent }, i) => (
                <g key={x}>
                    <rect x={x} y="20" width="96" height="40" rx="7"
                        fill={accent ? "var(--vd-warning-surface)" : "var(--vd-border)"}
                        stroke={accent ? "var(--vd-warning)" : "var(--vd-border-hover)"} strokeWidth={accent ? "1.5" : "1"} />
                    <text x={x + 48} y="37" textAnchor="middle" fontSize="8.5"
                        fill={accent ? "var(--vd-warning)" : "var(--vd-text-muted)"} fontFamily="sans-serif" fontWeight={accent ? "600" : "400"}>
                        {label1}
                    </text>
                    <text x={x + 48} y="50" textAnchor="middle" fontSize="8.5"
                        fill={accent ? "var(--vd-warning)" : "var(--vd-text-muted)"} fontFamily="sans-serif">
                        {label2}
                    </text>
                    {i < 3 && (
                        <>
                            <line x1={x + 96} y1="40" x2={x + 116} y2="40" stroke="var(--vd-border-hover)" strokeWidth="1.5" />
                            <polygon points={`${x + 116},35.5 ${x + 124},40 ${x + 116},44.5`} fill="var(--vd-border-hover)" />
                        </>
                    )}
                </g>
            ))}
        </svg>
    );
}

/** 3. Custom ROM: Stock OS → Flash Recovery → Wipe → Flash ROM → New OS */
function RomDiagram() {
    const steps = [
        { label1: "Stock",    label2: "Android" },
        { label1: "Custom",   label2: "Recovery" },
        { label1: "Wipe",     label2: "Data" },
        { label1: "Flash",    label2: "Custom ROM" },
    ];
    const w = 90, gap = 30, startX = 10;
    return (
        <svg viewBox="0 0 480 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" aria-hidden>
            {steps.map(({ label1, label2 }, i) => {
                const x = startX + i * (w + gap);
                const accent = i >= 1;
                return (
                    <g key={i}>
                        <rect x={x} y="20" width={w} height="40" rx="7"
                            fill={accent ? "var(--vd-warning-surface)" : "var(--vd-border)"}
                            stroke={accent ? "var(--vd-warning)" : "var(--vd-border-hover)"} strokeWidth={accent ? "1.5" : "1"} />
                        <text x={x + w / 2} y="37" textAnchor="middle" fontSize="8.5"
                            fill={accent ? "var(--vd-warning)" : "var(--vd-text-muted)"} fontFamily="sans-serif" fontWeight={accent ? "600" : "400"}>
                            {label1}
                        </text>
                        <text x={x + w / 2} y="50" textAnchor="middle" fontSize="8.5"
                            fill={accent ? "var(--vd-warning)" : "var(--vd-text-muted)"} fontFamily="sans-serif">
                            {label2}
                        </text>
                        {i < steps.length - 1 && (
                            <>
                                <line x1={x + w} y1="40" x2={x + w + gap - 8} y2="40" stroke="var(--vd-border-hover)" strokeWidth="1.5" />
                                <polygon points={`${x + w + gap - 8},35.5 ${x + w + gap},40 ${x + w + gap - 8},44.5`} fill="var(--vd-border-hover)" />
                            </>
                        )}
                    </g>
                );
            })}
            {/* Final "New Android" */}
            <rect x={startX + 4 * (w + gap)} y="20" width={w} height="40" rx="7"
                fill="var(--vd-accent-surface)" stroke="var(--vd-accent)" strokeWidth="1.5" />
            <text x={startX + 4 * (w + gap) + w / 2} y="37" textAnchor="middle" fontSize="8.5" fill="var(--vd-accent)" fontFamily="sans-serif" fontWeight="600">New</text>
            <text x={startX + 4 * (w + gap) + w / 2} y="50" textAnchor="middle" fontSize="8.5" fill="var(--vd-accent)" fontFamily="sans-serif" fontWeight="600">Android</text>
            <line x1={startX + 4 * (w + gap) - gap} y1="40" x2={startX + 4 * (w + gap) - 8} y2="40" stroke="var(--vd-border-hover)" strokeWidth="1.5" />
            <polygon points={`${startX + 4 * (w + gap) - 8},35.5 ${startX + 4 * (w + gap)},40 ${startX + 4 * (w + gap) - 8},44.5`} fill="var(--vd-border-hover)" />
        </svg>
    );
}

/** 4. Custom Kernel: Linux Kernel → fan out to CPU / GPU / I/O / Power */
function KernelDiagram() {
    const leaves = [
        { y: "14",  label: "CPU Governor" },
        { y: "46",  label: "GPU Freq" },
        { y: "78",  label: "I/O Scheduler" },
        { y: "110", label: "Power Profile" },
    ];
    return (
        <svg viewBox="0 0 480 124" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" aria-hidden>
            {/* Center box */}
            <rect x="160" y="28" width="120" height="68" rx="8"
                fill="var(--vd-warning-surface)" stroke="var(--vd-warning)" strokeWidth="1.5" />
            <text x="220" y="58" textAnchor="middle" fontSize="9.5" fill="var(--vd-warning)" fontFamily="sans-serif" fontWeight="600">Custom</text>
            <text x="220" y="72" textAnchor="middle" fontSize="9.5" fill="var(--vd-warning)" fontFamily="sans-serif" fontWeight="600">Kernel</text>
            {/* Vertical rail */}
            <line x1="310" y1="62" x2="340" y2="62" stroke="var(--vd-border-hover)" strokeWidth="1.5" />
            <polygon points="340,57.5 348,62 340,66.5" fill="var(--vd-border-hover)" />
            <line x1="352" y1={leaves[0].y} x2="352" y2={leaves[3].y} stroke="var(--vd-border-hover)" strokeWidth="1" strokeDasharray="3,2" />
            {leaves.map(({ y, label }) => (
                <g key={label}>
                    <line x1="352" y1={y} x2="372" y2={y} stroke="var(--vd-border-hover)" strokeWidth="1" strokeDasharray="3,2" />
                    <rect x="372" y={String(Number(y) - 12)} width="100" height="24" rx="6"
                        fill="var(--vd-border)" stroke="var(--vd-border-hover)" strokeWidth="1" />
                    <text x="422" y={String(Number(y) + 3)} textAnchor="middle" fontSize="8.5" fill="var(--vd-text-secondary)" fontFamily="sans-serif">{label}</text>
                </g>
            ))}
            {/* Left side: Stock Kernel */}
            <rect x="20" y="42" width="100" height="40" rx="7"
                fill="var(--vd-border)" stroke="var(--vd-border-hover)" strokeWidth="1" />
            <text x="70" y="59" textAnchor="middle" fontSize="8.5" fill="var(--vd-text-muted)" fontFamily="sans-serif">Stock</text>
            <text x="70" y="72" textAnchor="middle" fontSize="8.5" fill="var(--vd-text-muted)" fontFamily="sans-serif">Kernel</text>
            <line x1="120" y1="62" x2="152" y2="62" stroke="var(--vd-border-hover)" strokeWidth="1.5" />
            <polygon points="152,57.5 160,62 152,66.5" fill="var(--vd-border-hover)" />
        </svg>
    );
}

/** 5. Magisk: Android System → Magisk Overlay → Modules (systemless) */
function MagiskDiagram() {
    return (
        <svg viewBox="0 0 480 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" aria-hidden>
            {/* System partition */}
            <rect x="4" y="40" width="100" height="40" rx="7"
                fill="var(--vd-border)" stroke="var(--vd-border-hover)" strokeWidth="1" />
            <text x="54" y="57" textAnchor="middle" fontSize="8.5" fill="var(--vd-text-muted)" fontFamily="sans-serif">Android</text>
            <text x="54" y="70" textAnchor="middle" fontSize="8.5" fill="var(--vd-text-muted)" fontFamily="sans-serif">System</text>
            <text x="54" y="98" textAnchor="middle" fontSize="7" fill="var(--vd-text-muted)" fontFamily="sans-serif">(unchanged)</text>

            {/* Arrow */}
            <line x1="104" y1="60" x2="134" y2="60" stroke="var(--vd-border-hover)" strokeWidth="1.5" />
            <polygon points="134,55.5 142,60 134,64.5" fill="var(--vd-border-hover)" />

            {/* Magisk overlay */}
            <rect x="142" y="26" width="110" height="68" rx="8"
                fill="var(--vd-badge-neutral)" stroke="var(--vd-border-hover)" strokeWidth="1.5" />
            <text x="197" y="53" textAnchor="middle" fontSize="9.5" fill="var(--vd-text)" fontFamily="sans-serif" fontWeight="600">Magisk</text>
            <text x="197" y="67" textAnchor="middle" fontSize="9.5" fill="var(--vd-text)" fontFamily="sans-serif" fontWeight="600">Overlay</text>
            <text x="197" y="83" textAnchor="middle" fontSize="7.5" fill="var(--vd-text-muted)" fontFamily="sans-serif">(systemless)</text>

            {/* Arrow */}
            <line x1="252" y1="60" x2="278" y2="60" stroke="var(--vd-border-hover)" strokeWidth="1.5" />
            <polygon points="278,55.5 286,60 278,64.5" fill="var(--vd-border-hover)" />

            {/* Rail */}
            <line x1="290" y1="20" x2="290" y2="100" stroke="var(--vd-border-hover)" strokeWidth="1" strokeDasharray="3,2" />

            {[["20", "Module A"], ["56", "Module B"], ["92", "Module C"]].map(([y, label]) => (
                <g key={label}>
                    <line x1="290" y1={y} x2="310" y2={y} stroke="var(--vd-border-hover)" strokeWidth="1" strokeDasharray="3,2" />
                    <rect x="310" y={String(Number(y) - 12)} width="112" height="24" rx="6"
                        fill="var(--vd-accent-surface)" stroke="var(--vd-accent)" strokeWidth="1" />
                    <text x="366" y={String(Number(y) + 3)} textAnchor="middle" fontSize="8.5" fill="var(--vd-accent)" fontFamily="sans-serif">{label}</text>
                </g>
            ))}
        </svg>
    );
}
