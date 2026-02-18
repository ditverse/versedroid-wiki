import { Info, AlertTriangle, ShieldAlert, Lightbulb } from "lucide-react";
import type { CalloutType } from "@/features/faq/types";

const calloutConfig: Record<
    CalloutType,
    { icon: typeof Info; className: string }
> = {
    info: {
        icon: Info,
        className: "callout callout-info",
    },
    warning: {
        icon: AlertTriangle,
        className: "callout callout-warning",
    },
    danger: {
        icon: ShieldAlert,
        className: "callout callout-danger",
    },
    tip: {
        icon: Lightbulb,
        className: "callout callout-tip",
    },
};

type CalloutProps = {
    variant: CalloutType;
    title: string;
    children: React.ReactNode;
};

export function Callout({ variant, title, children }: CalloutProps) {
    const config = calloutConfig[variant];
    const Icon = config.icon;

    return (
        <div className={config.className}>
            <div className="mb-2 flex items-center gap-2 font-semibold text-vd-text-primary">
                <Icon className="h-4 w-4 shrink-0" />
                {title}
            </div>
            <div className="text-sm leading-relaxed text-vd-text-secondary">
                {children}
            </div>
        </div>
    );
}
