import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BogEntryService } from './bog-entry.service';
import{ DocumentModel } from './model/documentModel';
@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlogEntryComponent implements OnInit {

  document: DocumentModel[] = [];
  selectedTag: string = 'home';
  selectedDocument: DocumentModel;
  onDocumentEnter: boolean = false;
  documentBody: any;
  applicationVersion: string;
  constructor(private blogService: BogEntryService) { }
  ngOnInit() {
    this.blogService.getAppVersion().subscribe(result => {
      console.log(result);
      this.applicationVersion = result.version;
    });


    this.blogService.getDocuments().subscribe(result => {
      this.document = result;
    }, (error) => {
      console.log(error);
    });
  }

  postEnter(id: string): void {
    this.selectedDocument = this.document.find(o => o.id === id);
    window.scrollTo(0,0);
    console.log(this.selectedDocument);
    this.blogService.parseDocument(this.selectedDocument).subscribe(result => {
      console.log(result);
      this.documentBody = result.blogBody;
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
