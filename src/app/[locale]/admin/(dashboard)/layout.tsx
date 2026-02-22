import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/features/admin/components/admin-sidebar";
import { MobileHeader } from "@/features/admin/components/mobile-header";

type Props = {
    children: React.ReactNode;
};

export default async function AdminLayout({ children }: Props) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/admin/login");
    }

    return (
        <div className="flex min-h-screen flex-col bg-vd-bg-primary md:flex-row">
            <MobileHeader userEmail={user.email ?? "admin"} />
            <AdminSidebar userEmail={user.email ?? "admin"} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                <div className="mx-auto w-full max-w-5xl px-4 py-6 md:px-6 md:py-8">{children}</div>
            </main>
        </div>
    );
}
