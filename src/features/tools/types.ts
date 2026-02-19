import type { ContentBlock, CalloutType } from "@/features/faq/types";

export type { ContentBlock, CalloutType };

export type SpecItem = {
    label: string;
    value: string;
};

export type StepItem = {
    title: string;
    description: string;
    code?: string;
};

export type TabContent = {
    label: string;
    steps: StepItem[];
};

export type ToolArticle = {
    id: string;
    slug: string;
    icon: string;
    sortOrder: number;
    published: boolean;
    downloadUrl: string;
    downloadVersion: string;
    title: string;
    description: string;
    content: ContentBlock[];
    specs: SpecItem[];
    tabs: TabContent[];
};

export type ToolCategory = {
    id: string;
    key: string;
    label: string;
    articles: ToolArticle[];
};
