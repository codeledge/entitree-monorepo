declare type Response = {
    type: string;
    title: string;
    displaytitle: string;
    namespace: {
        id: number;
        text: string;
    };
    wikibase_item: string;
    titles: {
        canonical: string;
        normalized: string;
        display: string;
    };
    pageid: number;
    thumbnail: {
        source: string;
        width: number;
        height: number;
    };
    originalimage: {
        source: string;
        width: number;
        height: number;
    };
    lang: string;
    dir: string;
    revision: string;
    tid: string;
    timestamp: string;
    description: string;
    description_source: string;
    content_urls: {
        desktop: unknown;
        mobile: unknown;
    };
    extract: string;
    extract_html: string;
};
declare function getWikipediaArticle(wikipediaSlug: string, langCode?: string): Promise<Response>;

declare function getWikipediaDescription(wikipediaSlug: string, langCode?: string): Promise<string>;

export { getWikipediaArticle, getWikipediaDescription };
