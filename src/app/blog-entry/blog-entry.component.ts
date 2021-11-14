import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BlogEntryService } from './service/blog-entry.service';
import{ DocumentModel, NotionModel } from './model/documentModel';
import {DomSanitizer} from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlogEntryComponent implements OnInit {

  documents: NotionModel[] = [];
  selectedTag: string = 'home';
  selectedDocument: NotionModel;
  onDocumentEnter: boolean = false;
  documentBody: any;
  applicationVersion: string;
  notLoaded: boolean = false;
  constructor(private blogService: BlogEntryService,
    private sanatizer: DomSanitizer) { }
  ngOnInit() {
    this.blogService.getAppVersion().subscribe(result => {
      this.applicationVersion = result.version;
    });
    this.blogService.getDocuments()
    .subscribe(result => {
      this.documents = result.map(x => new NotionModel(x.title, x.createOn, x.synopsis, x.image, +x.sortable));
      console.log(this.documents);
      this.documents.sort((x, y) => {
        return y.sortable - x.sortable;
      });
    }, (error) => {
      this.notLoaded = true;
      console.log(error);
    });
  }

  postEnter(Title: string): void {
    this.selectedDocument = this.documents.find(o => o.title === Title);
    window.scrollTo(0,0);
    this.blogService.readDocument(this.selectedDocument).subscribe(result => {
      this.documentBody = this.sanatizer.bypassSecurityTrustHtml(result.blogBody);
    }, (error) => {
      console.log(error);
    });
    this.onDocumentEnter = true;
  }

  exitPost(): void {
    window.scrollTo(0, 0);
    this.onDocumentEnter = false;
  }
}
