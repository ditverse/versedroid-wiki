import { createClient } from "@/lib/supabase/server";
import { ToolArticleForm } from "@/features/admin/components/tool-article-form";

async function getCategories() {
    const supabase = await createClient();
    const { data } = await supabase.from("tool_categories").select("id, key").order("sort_order");
    return data ?? [];
}

export default async function AdminToolNewPage() {
    const categories = await getCategories();
    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold text-vd-text-primary">New Tool Article</h1>
            <ToolArticleForm mode="create" categories={categories} />
        </div>
    );
}
