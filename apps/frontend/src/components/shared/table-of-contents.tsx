"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";

type TocItem = {
    id: string;
    text: string;
};

type TableOfContentsProps = {
    items: TocItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
    const t = useTranslations("Common");
    const [activeId, setActiveId] = useState<string>("");
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (items.length === 0) return;

        const headingElements = items
            .map((item) => document.getElementById(item.id))
            .filter(Boolean) as HTMLElement[];

        if (headingElements.length === 0) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                        break;
                    }
                }
            },
            {
                rootMargin: "-80px 0px -60% 0px",
                threshold: 0.1,
            }
        );

        for (const el of headingElements) {
            observerRef.current.observe(el);
        }

        return () => {
            observerRef.current?.disconnect();
        };
    }, [items]);

    if (items.length === 0) return null;

    return (
        <aside className="hidden w-48 shrink-0 xl:block">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pl-4">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-vd-text-secondary">
                    {t("onThisPage")}
                </h4>
                <nav aria-label="Table of contents">
                    <ul className="space-y-1.5 border-l border-vd-border">
                        {items.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className={`block border-l-2 py-1 pl-3 text-xs transition-colors ${activeId === item.id
                                            ? "border-vd-accent font-medium text-vd-accent"
                                            : "border-transparent text-vd-text-secondary hover:border-vd-text-secondary/30 hover:text-vd-text-primary"
                                        }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const el = document.getElementById(item.id);
                                        el?.scrollIntoView({ behavior: "smooth", block: "start" });
                                    }}
                                >
                                    {item.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
