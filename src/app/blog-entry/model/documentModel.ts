export interface DocumentModel {
    id: string;
    lang: string;
    type: string;
    data: {
        blogtitle: Array<string>;
        image: Object;
        tag: Object;
        figure_caption: string;
        blog_body: Array<string>;
    };
    slugs: Array<string>;
}