"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Menu, Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "@/components/shared/theme-provider";

const navLinks = [
    { href: "/", labelKey: "home" },
    { href: "/faq", labelKey: "faq" },
    { href: "/tools", labelKey: "tools" },
    { href: "/blog", labelKey: "blog" },
] as const;

export function Navbar() {
    const t = useTranslations("Navbar");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    function switchLocale(newLocale: "id" | "en") {
        router.replace(pathname, { locale: newLocale });
    }

    function isActive(href: string) {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    }

    return (
        <header
            className="sticky top-0 z-50 border-b"
            style={{ background: "var(--vd-bg)", borderColor: "var(--vd-border)" }}
        >
            <nav
                className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-6"
                aria-label="Main navigation"
            >
                {/* Brand */}
                <Link
                    href="/"
                    className="text-base font-semibold tracking-tight"
                    style={{ color: "var(--vd-text)", fontFamily: "var(--font-dm-sans)" }}
                >
                    versedroid<span style={{ color: "var(--vd-accent)" }}>.</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="px-4 py-2 text-sm transition-colors"
                            style={{
                                color: isActive(link.href)
                                    ? "var(--vd-text)"
                                    : "var(--vd-text-muted)",
                            }}
                        >
                            {t(link.labelKey)}
                        </Link>
                    ))}
                </div>

                {/* Right: Theme toggle + Language toggle */}
                <div className="flex items-center gap-1">
                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="h-8 w-8 hover:bg-transparent"
                        style={{ color: "var(--vd-text-muted)" }}
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-4 w-4" />
                        ) : (
                            <Moon className="h-4 w-4" />
                        )}
                    </Button>

                    {/* Language Switcher */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="gap-1.5 text-xs font-medium hover:bg-transparent"
                                style={{ color: "var(--vd-text-muted)" }}
                                aria-label={t("language")}
                            >
                                <Globe className="h-3.5 w-3.5" />
                                <span className="uppercase">{locale}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            style={{
                                background: "var(--vd-surface)",
                                borderColor: "var(--vd-border)",
                            }}
                        >
                            <DropdownMenuItem
                                onClick={() => switchLocale("id")}
                                style={{
                                    color: locale === "id"
                                        ? "var(--vd-accent)"
                                        : "var(--vd-text-secondary)",
                                }}
                                className="cursor-pointer text-sm"
                            >
                                ID — Bahasa Indonesia
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => switchLocale("en")}
                                style={{
                                    color: locale === "en"
                                        ? "var(--vd-accent)"
                                        : "var(--vd-text-secondary)",
                                }}
                                className="cursor-pointer text-sm"
                            >
                                EN — English
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Mobile Hamburger */}
                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                style={{ color: "var(--vd-text-muted)" }}
                                aria-label="Open menu"
                            >
                                <Menu className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-64"
                            style={{
                                background: "var(--vd-surface)",
                                borderColor: "var(--vd-border)",
                            }}
                        >
                            <SheetHeader>
                                <SheetTitle
                                    className="text-left text-base font-semibold"
                                    style={{ color: "var(--vd-text)" }}
                                >
                                    versedroid
                                    <span style={{ color: "var(--vd-accent)" }}>.</span>
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="mt-8 flex flex-col" aria-label="Mobile navigation">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="px-4 py-3 text-sm transition-colors"
                                        style={{
                                            color: isActive(link.href)
                                                ? "var(--vd-text)"
                                                : "var(--vd-text-muted)",
                                        }}
                                    >
                                        {t(link.labelKey)}
                                    </Link>
                                ))}
                            </nav>
                            {/* Theme toggle in mobile menu */}
                            <div className="mt-4 px-4">
                                <button
                                    onClick={toggleTheme}
                                    className="flex items-center gap-2 text-sm transition-colors"
                                    style={{ color: "var(--vd-text-muted)" }}
                                >
                                    {theme === "dark" ? (
                                        <><Sun className="h-4 w-4" /> Light mode</>
                                    ) : (
                                        <><Moon className="h-4 w-4" /> Dark mode</>
                                    )}
                                </button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}
