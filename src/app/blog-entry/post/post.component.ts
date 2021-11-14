import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DocumentModel, NotionModel } from '../model/documentModel';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  _Document: NotionModel;
  @Input() set Document(doc: NotionModel) {
    this._Document = doc;
  }
  @Output() onPostEntered: EventEmitter<any> = new EventEmitter();
  PostDate: Date = new Date();

  constructor() { }

  ngOnInit() {
  }

  postEntered() {
    this.onPostEntered.emit(this._Document.title);
  }

}
