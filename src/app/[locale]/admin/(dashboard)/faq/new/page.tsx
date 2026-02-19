import { createClient } from "@/lib/supabase/server";
import { FaqArticleForm } from "@/features/admin/components/faq-article-form";

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
            <h1 className="mb-6 text-2xl font-bold text-vd-text-primary">
                New FAQ Article
            </h1>
            <FaqArticleForm mode="create" categories={categories} />
        </div>
    );
}
