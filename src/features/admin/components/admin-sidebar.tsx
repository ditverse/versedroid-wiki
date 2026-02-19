"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { LayoutDashboard, BookOpen, Wrench, FileText, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/faq", label: "FAQ", icon: BookOpen },
    { href: "/admin/tools", label: "Tools", icon: Wrench },
    { href: "/admin/blog", label: "Blog", icon: FileText },
];

type AdminSidebarProps = {
    userEmail: string;
};

export function AdminSidebar({ userEmail }: AdminSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    async function handleLogout() {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
    }

    return (
        <aside className="flex h-screen w-60 flex-col border-r border-vd-border bg-vd-bg-secondary">
            {/* Logo */}
            <div className="flex h-14 items-center border-b border-vd-border px-4">
                <Link href="/admin" className="text-lg font-bold text-vd-text-primary">
                    versedroid<span className="text-vd-accent">.</span>
                    <span className="ml-1 text-xs font-normal text-vd-text-secondary">admin</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-3">
                {navItems.map((item) => {
                    const isActive =
                        item.href === "/admin"
                            ? pathname === "/admin"
                            : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                    ? "bg-vd-accent/10 text-vd-accent"
                                    : "text-vd-text-secondary hover:bg-vd-bg-tertiary hover:text-vd-text-primary"
                                }`}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* User + Logout */}
            <div className="border-t border-vd-border p-3">
                <div className="mb-2 truncate px-3 text-xs text-vd-text-secondary">
                    {userEmail}
                </div>
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-vd-text-secondary transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
