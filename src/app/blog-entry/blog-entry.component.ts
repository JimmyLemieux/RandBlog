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
  dateCreated: number = 4;
  numbers = [1];

  constructor(private blogService: BogEntryService) { }
  ngOnInit() {
    this.blogService.getDocuments().subscribe(result => {
      this.document = result;
      console.log(this.document[0].type);
    }, (error) => {
      console.log(error);
    });
  }
}
