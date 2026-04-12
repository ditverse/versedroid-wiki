import { Link } from "@/i18n/navigation";

const faqLinks = [
    { href: "/faq/unlock-bootloader", label: "Unlock Bootloader" },
    { href: "/faq/root", label: "Root Access" },
    { href: "/faq/custom-rom", label: "Custom ROM" },
    { href: "/faq/magisk", label: "Magisk" },
];

const blogLinks = [
    { href: "/blog", label: "Semua Artikel" },
    { href: "/blog", label: "Tutorial" },
    { href: "/blog", label: "Tips & Tricks" },
];

const socialLinks = [
    { href: "https://instagram.com/rise.dit", label: "Instagram" },
    { href: "https://youtube.com/@versedroid", label: "YouTube" },
    { href: "https://tiktok.com/@versedroid", label: "TikTok" },
];

export function Footer() {
    return (
        <footer style={{ borderTop: "1px solid var(--vd-border)", background: "var(--vd-bg)" }}>
            <div className="mx-auto max-w-[1100px] px-6 py-16">
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Col 1: Brand tagline */}
                    <div className="lg:col-span-1">
                        <div className="mb-4 text-base font-semibold" style={{ color: "var(--vd-text)" }}>
                            versedroid<span style={{ color: "var(--vd-accent)" }}>.</span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--vd-text-muted)" }}>
                            Wiki oprek Android berbahasa Indonesia. Panduan terstruktur untuk semua level.
                        </p>
                    </div>

                    {/* Col 2: FAQ links */}
                    <div>
                        <h3
                            className="mb-5 text-[11px] font-medium uppercase tracking-widest"
                            style={{ color: "var(--vd-text-muted)" }}
                        >
                            FAQ
                        </h3>
                        <ul className="space-y-3" role="list">
                            {faqLinks.map((link) => (
                                <li key={link.href + link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm transition-colors"
                                        style={{ color: "var(--vd-text-secondary)" }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Blog links */}
                    <div>
                        <h3
                            className="mb-5 text-[11px] font-medium uppercase tracking-widest"
                            style={{ color: "var(--vd-text-muted)" }}
                        >
                            Blog
                        </h3>
                        <ul className="space-y-3" role="list">
                            {blogLinks.map((link) => (
                                <li key={link.href + link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm transition-colors"
                                        style={{ color: "var(--vd-text-secondary)" }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4: Social links */}
                    <div>
                        <h3
                            className="mb-5 text-[11px] font-medium uppercase tracking-widest"
                            style={{ color: "var(--vd-text-muted)" }}
                        >
                            Social
                        </h3>
                        <ul className="space-y-3" role="list">
                            {socialLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm transition-colors"
                                        style={{ color: "var(--vd-text-secondary)" }}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    className="mt-12 flex flex-col items-center justify-between gap-3 pt-6 sm:flex-row"
                    style={{ borderTop: "1px solid var(--vd-border)" }}
                >
                    <p className="text-xs" style={{ color: "var(--vd-text-muted)" }}>
                        &copy; 2026 versedroid. All rights reserved.
                    </p>
                    <p className="text-xs" style={{ color: "var(--vd-text-muted)" }}>
                        Made in Bandung.
                    </p>
                </div>
            </div>
        </footer>
    );
}
