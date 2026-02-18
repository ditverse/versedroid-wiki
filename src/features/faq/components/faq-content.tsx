"use client";

import type { ContentBlock, FaqItem } from "@/features/faq/types";
import { Callout } from "@/components/shared/callout";
import { CopyButton } from "@/components/shared/copy-button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

type FaqContentProps = {
    content: ContentBlock[];
    faqItems: FaqItem[];
};

export function FaqContent({ content, faqItems }: FaqContentProps) {
    return (
        <div className="prose-vd">
            {content.map((block, i) => {
                switch (block.type) {
                    case "heading":
                        return (
                            <h2 key={i} id={block.id}>
                                {block.text}
                            </h2>
                        );
                    case "paragraph":
                        return <p key={i}>{block.text}</p>;
                    case "list":
                        return (
                            <ul key={i}>
                                {block.items.map((item, j) => (
                                    <li key={j}>{item}</li>
                                ))}
                            </ul>
                        );
                    case "callout":
                        return (
                            <Callout
                                key={i}
                                variant={block.variant}
                                title={block.title}
                            >
                                {block.text}
                            </Callout>
                        );
                    case "code":
                        return (
                            <div
                                key={i}
                                className="group relative my-4 rounded-lg border border-vd-border bg-vd-bg-secondary"
                            >
                                <div className="flex items-center justify-between border-b border-vd-border px-4 py-2">
                                    <span className="text-xs text-vd-text-secondary">
                                        {block.language}
                                    </span>
                                    <CopyButton text={block.code} />
                                </div>
                                <pre className="!my-0 !border-0 !bg-transparent p-4">
                                    <code className="!bg-transparent text-sm font-mono">
                                        {block.code}
                                    </code>
                                </pre>
                            </div>
                        );
                    default:
                        return null;
                }
            })}

            {/* FAQ Accordion Section */}
            {faqItems.length > 0 && (
                <>
                    <h2 id="faq">FAQ</h2>
                    <Accordion type="multiple" className="w-full">
                        {faqItems.map((item, i) => (
                            <AccordionItem
                                key={i}
                                value={`faq-${i}`}
                                className="border-vd-border"
                            >
                                <AccordionTrigger className="text-left text-sm font-medium text-vd-text-primary hover:text-vd-accent [&[data-state=open]>svg]:text-vd-accent">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-sm leading-relaxed text-vd-text-secondary">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </>
            )}
        </div>
    );
}
