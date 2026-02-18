"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Menu, Globe, X } from "lucide-react";
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

const navLinks = [
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

    function switchLocale(newLocale: "id" | "en") {
        router.replace(pathname, { locale: newLocale });
    }

    return (
        <header className="sticky top-0 z-50 border-b border-vd-border/50 bg-vd-bg-primary/80 backdrop-blur-xl">
            <nav
                className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
                aria-label="Main navigation"
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight text-vd-text-primary"
                >
                    versedroid
                    <span className="text-vd-accent">.</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group relative px-4 py-2 text-sm font-medium text-vd-text-secondary transition-colors hover:text-vd-text-primary"
                        >
                            {t(link.labelKey)}
                            <span className="absolute bottom-0 left-4 right-4 h-0.5 origin-left scale-x-0 bg-vd-accent transition-transform duration-300 group-hover:scale-x-100" />
                        </Link>
                    ))}
                </div>

                {/* Right side: Language + Mobile menu */}
                <div className="flex items-center gap-2">
                    {/* Language Switcher */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="gap-1.5 text-vd-text-secondary hover:text-vd-text-primary"
                                aria-label={t("language")}
                            >
                                <Globe className="h-4 w-4" />
                                <span className="text-xs font-medium uppercase">
                                    {locale}
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="border-vd-border bg-vd-bg-secondary"
                        >
                            <DropdownMenuItem
                                onClick={() => switchLocale("id")}
                                className={
                                    locale === "id"
                                        ? "text-vd-accent"
                                        : "text-vd-text-secondary"
                                }
                            >
                                🇮🇩 Bahasa Indonesia
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => switchLocale("en")}
                                className={
                                    locale === "en"
                                        ? "text-vd-accent"
                                        : "text-vd-text-secondary"
                                }
                            >
                                🇺🇸 English
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Mobile Hamburger */}
                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden text-vd-text-secondary"
                                aria-label="Open menu"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-72 border-vd-border bg-vd-bg-secondary"
                        >
                            <SheetHeader>
                                <SheetTitle className="text-left text-vd-text-primary">
                                    versedroid<span className="text-vd-accent">.</span>
                                </SheetTitle>
                            </SheetHeader>
                            <nav
                                className="mt-8 flex flex-col gap-2"
                                aria-label="Mobile navigation"
                            >
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="rounded-lg px-4 py-3 text-sm font-medium text-vd-text-secondary transition-colors hover:bg-vd-bg-tertiary hover:text-vd-text-primary"
                                    >
                                        {t(link.labelKey)}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}
