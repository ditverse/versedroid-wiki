import { createClient } from "@/lib/supabase/server";
import { FaqArticleForm } from "@/features/admin/components/faq-article-form";
import { AdminPageHeader } from "@/features/admin/components/admin-page-header";

async function getCategories() {
    const supabase = await createClient();
    const { data } = await supabase
        .from("faq_categories")
        .select("id, key")
        .order("sort_order");
    return data ?? [];
}

export default async function AdminFaqNewPage() {
    const categories = await getCategories();

    return (
        <div>
            <AdminPageHeader title="New FAQ Article" eyebrow="FAQ" />
            <FaqArticleForm mode="create" categories={categories} />
        </div>
    );
}
