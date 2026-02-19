import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "./lib/supabase/middleware";
import { type NextRequest } from "next/server";

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
    // 1. Refresh Supabase auth session + admin route protection
    const supabaseResponse = await updateSession(request);

    // If Supabase middleware redirected (e.g. to login), return that response
    if (supabaseResponse.headers.get("location")) {
        return supabaseResponse;
    }

    // 2. Run next-intl middleware for locale routing
    const intlResponse = intlMiddleware(request);

    // Copy Supabase auth cookies to the intl response
    supabaseResponse.cookies.getAll().forEach((cookie) => {
        intlResponse.cookies.set(cookie.name, cookie.value);
    });

    return intlResponse;
}

export const config = {
    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
