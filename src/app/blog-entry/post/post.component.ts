import { Component, Input, OnInit } from '@angular/core';
import { DocumentModel } from '../model/documentModel';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() Document: DocumentModel;
  PostDate: Date = new Date();

  constructor() { }

  ngOnInit() {
  }

}
