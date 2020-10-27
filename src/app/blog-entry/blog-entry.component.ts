import { Component, OnInit } from '@angular/core';
import { BogEntryService } from './bog-entry.service';
import{ DocumentModel } from './model/documentModel';
@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.css']
})
export class BlogEntryComponent implements OnInit {

  document: DocumentModel[] = [];
  selectedDocument: DocumentModel;
  onDocumentEnter: boolean = false;
  constructor(private blogService: BogEntryService) { }
  ngOnInit() {
    this.blogService.getDocuments().subscribe(result => {
      this.document = result;
    }, (error) => {
      console.log(error);
    });
  }

  postEnter(id: string): void {
    console.log("The id " + id);
    this.selectedDocument = this.document.find(o => o.id === id);
    console.log(this.selectedDocument);
    this.onDocumentEnter = true;
  }

  exitPost(): void {
    this.onDocumentEnter = false;
  }
}
