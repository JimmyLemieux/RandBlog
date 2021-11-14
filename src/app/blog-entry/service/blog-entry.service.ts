import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DocumentModel, NotionData, NotionModel } from '../model/documentModel';
import { environment } from '../../../environments/environment';
import { not } from '@angular/compiler/src/output/output_ast';




@Injectable({
  providedIn: 'root'
})
export class BlogEntryService {


  baseUrl = "";
  constructor(private http: HttpClient) {
    if (environment.production) {
      this.baseUrl = "http://pseudorandomblog.us-east-2.elasticbeanstalk.com";
    } else {
      this.baseUrl = "http://localhost:14181";
    }
  }

  getDocuments(): Observable<NotionModel[]> {
    return this.http.get<NotionModel[]>( this.baseUrl + "/getDocuments");
  }
  
  getAppVersion(): Observable<any> {
    return this.http.get( this.baseUrl + "/getCurrentVersion");
  }

  readDocument(notionDocument: NotionModel): Observable<NotionData> {
    const headers = new HttpHeaders();
    headers.append('Access Control Origin', '*');
    console.log("in web");
    console.log(notionDocument.title);
    return this.http.post<NotionData>(this.baseUrl + '/readDocument', {title: notionDocument.title}, {
      headers: headers
    });
  }
  
  parseDocument(documentObject: DocumentModel): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Access Control Origin', '*');
    return this.http.post<any>( this.baseUrl + "/parseDocument", documentObject, {
      headers: headers
    });
  }
}
