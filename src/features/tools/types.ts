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
    labelKey: string;
    steps: StepItem[];
};

export type ToolArticle = {
    slug: string;
    icon: string;
    titleKey: string;
    descriptionKey: string;
    category: string;
    specs: SpecItem[];
    downloadUrl: string;
    downloadVersion: string;
    tabs: TabContent[];
    content: ContentBlock[];
};

export type ToolCategory = {
    key: string;
    labelKey: string;
    articles: ToolArticle[];
};
