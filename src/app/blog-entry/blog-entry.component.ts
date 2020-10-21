import { Component, OnInit } from '@angular/core';
import { BogEntryService } from './bog-entry.service';
@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.css']
})
export class BlogEntryComponent implements OnInit {

  dateCreated: number = 4;
  numbers = [1];
  constructor(private blogService: BogEntryService) { }
  ngOnInit() {
    console.log("called");
    this.blogService.getDocuments().subscribe(result => {
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }
}
