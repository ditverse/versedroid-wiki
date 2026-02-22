"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SidebarContent } from "./admin-sidebar";
import { Link } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type MobileHeaderProps = {
    userEmail: string;
};

export function MobileHeader({ userEmail }: MobileHeaderProps) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    // Close sheet when route changes
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-vd-border bg-vd-bg-secondary px-4 md:hidden">
            <Link href="/admin" className="text-lg font-bold text-vd-text-primary">
                versedroid<span className="text-vd-accent">.</span>
                <span className="ml-1 text-xs font-normal text-vd-text-secondary">admin</span>
            </Link>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-vd-text-secondary hover:bg-vd-bg-tertiary hover:text-vd-text-primary">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 border-r border-vd-border bg-vd-bg-secondary p-0">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <SheetDescription className="sr-only">Admin dashboard navigation menu</SheetDescription>
                    <SidebarContent userEmail={userEmail} onNavigate={() => setOpen(false)} />
                </SheetContent>
            </Sheet>
        </header>
    );
}
