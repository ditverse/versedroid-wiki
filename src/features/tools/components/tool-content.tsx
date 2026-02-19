"use client";

import type { ToolArticle } from "@/features/tools/types";
import type { ContentBlock } from "@/features/faq/types";
import { Callout } from "@/components/shared/callout";
import { CopyButton } from "@/components/shared/copy-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, ExternalLink } from "lucide-react";

type ToolContentProps = {
    article: ToolArticle;
};

function renderContentBlock(block: ContentBlock, i: number) {
    switch (block.type) {
        case "heading":
            return (
                <h2 key={i} id={block.id} className="text-2xl font-bold text-vd-text-primary mt-10 mb-4">
                    {block.text}
                </h2>
            );
        case "paragraph":
            return (
                <p key={i} className="text-vd-text-secondary leading-relaxed mb-4">
                    {block.text}
                </p>
            );
        case "list":
            return (
                <ul key={i} className="list-disc pl-6 mb-4 text-vd-text-secondary">
                    {block.items.map((item, j) => (
                        <li key={j} className="mb-1">{item}</li>
                    ))}
                </ul>
            );
        case "callout":
            return (
                <Callout key={i} variant={block.variant} title={block.title}>
                    {block.text}
                </Callout>
            );
        case "code":
            return (
                <div key={i} className="group relative my-4 rounded-lg border border-vd-border bg-vd-bg-secondary">
                    <div className="flex items-center justify-between border-b border-vd-border px-4 py-2">
                        <span className="text-xs text-vd-text-secondary">{block.language}</span>
                        <CopyButton text={block.code} />
                    </div>
                    <pre className="p-4 overflow-x-auto">
                        <code className="text-sm font-mono text-vd-text-secondary">{block.code}</code>
                    </pre>
                </div>
            );
        default:
            return null;
    }
}

export function ToolContent({ article }: ToolContentProps) {
    return (
        <div>
            {/* Specs Table */}
            <div className="mb-8 overflow-hidden rounded-lg border border-vd-border">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-vd-border bg-vd-bg-tertiary">
                            <th className="px-4 py-3 text-left font-semibold text-vd-text-primary">
                                Spec
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-vd-text-primary">
                                Detail
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {article.specs.map((spec, i) => (
                            <tr
                                key={i}
                                className="border-b border-vd-border last:border-0"
                            >
                                <td className="px-4 py-3 font-medium text-vd-text-primary">
                                    {spec.label}
                                </td>
                                <td className="px-4 py-3 text-vd-text-secondary">
                                    {spec.value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Download Button */}
            <div className="mb-10">
                <Button
                    asChild
                    size="lg"
                    className="gap-2 bg-vd-accent px-8 font-semibold text-vd-bg-primary hover:bg-vd-accent/90 accent-glow"
                >
                    <a
                        href={article.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Download className="h-4 w-4" />
                        Download
                        <Badge
                            variant="secondary"
                            className="ml-1 bg-vd-bg-primary/20 text-vd-bg-primary"
                        >
                            v{article.downloadVersion}
                        </Badge>
                        <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                </Button>
            </div>

            {/* Content blocks */}
            {article.content.map((block, i) => renderContentBlock(block, i))}

            {/* Host/Client Tabs */}
            {article.tabs.length > 0 && (
                <div className="mt-10">
                    <h2 id="penggunaan" className="text-2xl font-bold text-vd-text-primary mb-4">
                        Penggunaan
                    </h2>
                    <Tabs defaultValue={article.tabs[0].label} className="w-full">
                        <TabsList className="mb-6 bg-vd-bg-tertiary border border-vd-border">
                            {article.tabs.map((tab) => (
                                <TabsTrigger
                                    key={tab.label}
                                    value={tab.label}
                                    className="data-[state=active]:bg-vd-accent data-[state=active]:text-vd-bg-primary"
                                >
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {article.tabs.map((tab) => (
                            <TabsContent key={tab.label} value={tab.label}>
                                <div className="relative space-y-6">
                                    {/* Vertical connector line */}
                                    <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-vd-border" />

                                    {tab.steps.map((step, i) => (
                                        <div key={i} className="relative flex gap-4">
                                            {/* Step number */}
                                            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-vd-accent bg-vd-bg-primary text-sm font-bold text-vd-accent">
                                                {i + 1}
                                            </div>

                                            {/* Step content */}
                                            <div className="flex-1 pb-2">
                                                <h4 className="mb-1 text-base font-semibold text-vd-text-primary">
                                                    {step.title}
                                                </h4>
                                                <p className="mb-3 text-sm leading-relaxed text-vd-text-secondary">
                                                    {step.description}
                                                </p>
                                                {step.code && (
                                                    <div className="rounded-lg border border-vd-border bg-vd-bg-secondary">
                                                        <div className="flex items-center justify-end border-b border-vd-border px-3 py-1.5">
                                                            <CopyButton text={step.code} />
                                                        </div>
                                                        <pre className="p-4 overflow-x-auto">
                                                            <code className="text-sm font-mono text-vd-text-secondary">
                                                                {step.code}
                                                            </code>
                                                        </pre>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            )}
        </div>
    );
}
