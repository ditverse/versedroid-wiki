import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { plusJakarta, jetbrainsMono } from "@/lib/fonts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/shared/theme-provider";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
    title: "versedroid. — Wiki Oprek Android",
    description:
        "Pelajari seni oprek Android — dari unlock bootloader hingga custom ROM, dengan panduan lengkap dan tools yang tepat.",
};

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    return (
        // suppressHydrationWarning prevents SSR/client mismatch when
        // ThemeProvider adds "dark" or "light" class on the client
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`${plusJakarta.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
            >
                <NextIntlClientProvider>
                    <ThemeProvider>
                        <div className="flex min-h-screen flex-col">
                            <Navbar />
                            <main className="flex-1">{children}</main>
                            <Footer />
                        </div>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
