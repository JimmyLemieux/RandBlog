export interface DocumentModel {
    lang: string;
    type: string;
    data: {
        blogtitle: Array<string>;
        image: Object;
        figure_caption: string;
        blog_body: Array<string>;
    };
    slugs: Array<string>;
}