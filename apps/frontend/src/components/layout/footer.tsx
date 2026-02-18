import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";

const faqLinks = [
    { href: "/faq/unlock-bootloader", label: "Unlock Bootloader" },
    { href: "/faq/root", label: "Root" },
    { href: "/faq/custom-rom", label: "Custom ROM" },
    { href: "/faq/custom-kernel", label: "Custom Kernel" },
];

const socialLinks = [
    {
        href: "https://instagram.com/versedroid",
        label: "Instagram",
    },
    {
        href: "https://youtube.com/@versedroid",
        label: "YouTube",
    },
];

export function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="border-t border-vd-border bg-vd-bg-primary">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="mb-8">
                    <span className="text-xl font-bold tracking-tight text-vd-text-primary">
                        versedroid<span className="text-vd-accent">.</span>
                    </span>
                </div>

                {/* Columns */}
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                    {/* FAQ Column */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-vd-text-primary">
                            {t("faqTitle")}
                        </h3>
                        <ul className="space-y-3" role="list">
                            {faqLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-vd-text-secondary transition-colors hover:text-vd-accent"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Blog Column */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-vd-text-primary">
                            {t("blogTitle")}
                        </h3>
                        <ul className="space-y-3" role="list">
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-sm text-vd-text-secondary transition-colors hover:text-vd-accent"
                                >
                                    {t("latestPosts")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-sm text-vd-text-secondary transition-colors hover:text-vd-accent"
                                >
                                    {t("popularPosts")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Column */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-vd-text-primary">
                            {t("socialTitle")}
                        </h3>
                        <ul className="space-y-3" role="list">
                            {socialLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-vd-text-secondary transition-colors hover:text-vd-accent"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator className="my-8 bg-vd-border" />

                {/* Copyright */}
                <p className="text-center text-xs text-vd-text-secondary">
                    {t("copyright")}
                </p>
            </div>
        </footer>
    );
}
