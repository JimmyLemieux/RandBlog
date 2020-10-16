import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.css']
})
export class BlogEntryComponent implements OnInit {

  numbers = [1,2,3,5,5,5,5,5,5,5,5,5];
  constructor() { }

  ngOnInit() {
  }

}
