import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Refreshes the Supabase auth session on every request.
 * Must run in middleware to keep cookies up-to-date.
 */
export async function updateSession(request: NextRequest) {
    // Skip auth for public routes — only admin needs session refresh.
    // This avoids a network roundtrip to Supabase on every public page navigation.
    const pathname = request.nextUrl.pathname;
    const isAdminRoute = /\/[a-z]{2}\/admin(\/|$)/.test(pathname);
    if (!isAdminRoute) {
        return NextResponse.next({ request });
    }

    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        request.cookies.set(name, value);
                        supabaseResponse.cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    // Refresh session — this is critical for keeping auth tokens valid.
    // IMPORTANT: Use getUser() not getSession() for security.
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // At this point, we know this is an admin route. Check login page specifically.
    const isLoginPage = /\/[a-z]{2}\/admin\/login/.test(pathname);

    if (!isLoginPage && !user) {
        // Extract locale from the path
        const localeMatch = pathname.match(/^\/([a-z]{2})\//);
        const locale = localeMatch?.[1] ?? "id";
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = `/${locale}/admin/login`;
        return NextResponse.redirect(loginUrl);
    }

    // If logged in user visits login page, redirect to admin dashboard
    if (isLoginPage && user) {
        const localeMatch = pathname.match(/^\/([a-z]{2})\//);
        const locale = localeMatch?.[1] ?? "id";
        const adminUrl = request.nextUrl.clone();
        adminUrl.pathname = `/${locale}/admin`;
        return NextResponse.redirect(adminUrl);
    }

    return supabaseResponse;
}
