import * as moment from 'moment';
export class DocumentModel {
    public id: string;
    public lang: string;
    public type: string;
    public last_publication_date: Date;
    public data: {
        blogtitle: Array<any>;
        image: Object;
        publish_date: Date;
        tag: Object;
        figure_caption: string;
        blog_body: Array<string>;
        thumbnail: {
            url: string;
        },
        synopsis: Array<any>
    };
    public slugs: Array<string>;
}

export class NotionModel {
    public title: string;
    public createOn: string;
    public synopsis: string;
    public image: string;
    public sortable: number;
    constructor(Title: string, CreateOn: string, Synopsis: string, Image: string, Sortable: number) {
        this.title = Title;
        this.createOn = CreateOn;
        this.synopsis = Synopsis;
        this.image = Image;
        this.sortable = Sortable;
    }
}

export class NotionData {
    public title: string;
    public blogBody: string;
}