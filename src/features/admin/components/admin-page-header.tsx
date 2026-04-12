import { ReactNode } from "react";

type AdminPageHeaderProps = {
    title: string;
    eyebrow?: string;
    actions?: ReactNode;
};

export function AdminPageHeader({ title, eyebrow, actions }: AdminPageHeaderProps) {
    return (
        <div
            className="mb-8 flex items-end justify-between pb-6"
            style={{ borderBottom: "1px solid var(--vd-border)" }}
        >
            <div>
                {eyebrow && (
                    <p
                        className="mb-2 text-[11px] font-medium uppercase tracking-[0.1em]"
                        style={{ color: "var(--vd-text-muted)" }}
                    >
                        {eyebrow}
                    </p>
                )}
                <h1
                    style={{
                        fontFamily: "var(--font-dm-display), serif",
                        fontSize: "clamp(22px, 3vw, 28px)",
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                        color: "var(--vd-text)",
                        lineHeight: "1.2",
                    }}
                >
                    {title}
                </h1>
            </div>
            {actions && <div className="shrink-0">{actions}</div>}
        </div>
    );
}
