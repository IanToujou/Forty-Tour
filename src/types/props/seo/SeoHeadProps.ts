export type SeoHeadProps = {
    path: string;
    title: string;
    description: string;
    image?: string;
    robots?: string;
    ogType?: "website" | "article" | "profile" | "book";
    jsonLd?: Record<string, unknown>;
};
