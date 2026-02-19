"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

type LocaleTabsProps = {
    children: (locale: "id" | "en") => React.ReactNode;
};

export function LocaleTabs({ children }: LocaleTabsProps) {
    const [locale, setLocale] = useState<"id" | "en">("id");

    return (
        <Tabs value={locale} onValueChange={(v) => setLocale(v as "id" | "en")}>
            <TabsList className="mb-4 bg-vd-bg-tertiary border border-vd-border">
                <TabsTrigger
                    value="id"
                    className="data-[state=active]:bg-vd-accent data-[state=active]:text-vd-bg-primary"
                >
                    🇮🇩 Bahasa Indonesia
                </TabsTrigger>
                <TabsTrigger
                    value="en"
                    className="data-[state=active]:bg-vd-accent data-[state=active]:text-vd-bg-primary"
                >
                    🇬🇧 English
                </TabsTrigger>
            </TabsList>
            <TabsContent value="id">{children("id")}</TabsContent>
            <TabsContent value="en">{children("en")}</TabsContent>
        </Tabs>
    );
}
