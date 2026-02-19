"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

type SidebarCategory = {
    key: string;
    label: string;
    items: {
        slug: string;
        title: string;
    }[];
};

type DocSidebarProps = {
    categories: SidebarCategory[];
    basePath: string;
};

function SidebarContent({
    categories,
    basePath,
    onNavigate,
}: DocSidebarProps & { onNavigate?: () => void }) {
    const pathname = usePathname();
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
        Object.fromEntries(categories.map((c) => [c.key, true]))
    );

    function toggleCategory(key: string) {
        setOpenCategories((prev) => ({ ...prev, [key]: !prev[key] }));
    }

    return (
        <nav className="space-y-1" aria-label="Documentation sidebar">
            {categories.map((category) => (
                <div key={category.key}>
                    <button
                        onClick={() => toggleCategory(category.key)}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wider text-vd-text-secondary hover:text-vd-text-primary"
                    >
                        {category.label}
                        <ChevronDown
                            className={`h-3.5 w-3.5 transition-transform duration-200 ${openCategories[category.key] ? "rotate-0" : "-rotate-90"
                                }`}
                        />
                    </button>
                    {openCategories[category.key] && (
                        <div className="ml-1 border-l border-vd-border pl-2">
                            {category.items.map((item) => {
                                const href = `${basePath}/${item.slug}`;
                                const isActive = pathname === href;

                                return (
                                    <Link
                                        key={item.slug}
                                        href={href}
                                        onClick={onNavigate}
                                        className={`relative block rounded-md px-3 py-1.5 text-sm transition-colors ${isActive
                                            ? "bg-vd-accent/10 font-medium text-vd-accent"
                                            : "text-vd-text-secondary hover:bg-vd-bg-tertiary hover:text-vd-text-primary"
                                            }`}
                                    >
                                        {isActive && (
                                            <span className="absolute -left-[calc(0.5rem+1px)] top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-vd-accent" />
                                        )}
                                        {item.title}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    );
}

export function DocSidebar(props: DocSidebarProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden w-56 shrink-0 lg:block">
                <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4">
                    <SidebarContent {...props} />
                </div>
            </aside>

            {/* Mobile sidebar via Sheet */}
            <div className="fixed bottom-4 left-4 z-40 lg:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button
                            size="icon"
                            className="h-12 w-12 rounded-full bg-vd-accent text-vd-bg-primary shadow-lg hover:bg-vd-accent/90"
                            aria-label="Open navigation"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="w-72 border-vd-border bg-vd-bg-secondary"
                    >
                        <SheetHeader>
                            <SheetTitle className="text-left text-vd-text-primary">
                                Navigation
                            </SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                            <SidebarContent
                                {...props}
                                onNavigate={() => setOpen(false)}
                            />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}
