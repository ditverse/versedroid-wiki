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
    slug: string;
    icon: string;
    titleKey: string;
    descriptionKey: string;
    category: string;
    content: ContentBlock[];
    faqItems: FaqItem[];
};

export type FaqCategory = {
    key: string;
    labelKey: string;
    articles: FaqArticle[];
};
