import { createClient as createBaseClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client for use in build-time contexts (e.g. generateStaticParams).
 * Does NOT use cookies — suitable for operations outside request scope.
 * Uses the anon key, so RLS still applies (only published content).
 */
export function createStaticClient() {
    return createBaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
}
