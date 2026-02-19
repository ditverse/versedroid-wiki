import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/features/admin/components/admin-sidebar";

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
        <div className="flex min-h-screen bg-vd-bg-primary">
            <AdminSidebar userEmail={user.email ?? "admin"} />
            <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
            </main>
        </div>
    );
}
