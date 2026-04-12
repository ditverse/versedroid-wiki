import { createClient } from "@/lib/supabase/server";
import { ToolArticleForm } from "@/features/admin/components/tool-article-form";
import { AdminPageHeader } from "@/features/admin/components/admin-page-header";

async function getCategories() {
    const supabase = await createClient();
    const { data } = await supabase.from("tool_categories").select("id, key").order("sort_order");
    return data ?? [];
}

export default async function AdminToolNewPage() {
    const categories = await getCategories();
    return (
        <div>
            <AdminPageHeader title="New Tool Article" eyebrow="Tools" />
            <ToolArticleForm mode="create" categories={categories} />
        </div>
    );
}
