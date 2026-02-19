export type CalloutType = "info" | "warning" | "danger" | "tip";

export type ContentBlock =
    | { type: "paragraph"; text: string }
    | { type: "heading"; text: string; id: string }
    | { type: "list"; items: string[] }
    | { type: "callout"; variant: CalloutType; title: string; text: string }
    | { type: "code"; language: string; code: string };

export type FaqItem = {
    question: string;
    answer: string;
};

export type FaqArticle = {
    id: string;
    slug: string;
    icon: string;
    sortOrder: number;
    published: boolean;
    title: string;
    description: string;
    content: ContentBlock[];
    faqItems: FaqItem[];
};

export type FaqCategory = {
    id: string;
    key: string;
    label: string;
    articles: FaqArticle[];
};
