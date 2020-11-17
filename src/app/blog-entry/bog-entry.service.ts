import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DocumentModel } from './model/documentModel';



@Injectable({
  providedIn: 'root'
})
export class BogEntryService {

  baseUrl = ""
  constructor(private http: HttpClient) {
  }

  getDocuments(): Observable<DocumentModel[]> {
    return this.http.get<DocumentModel[]>("http://localhost:14181/getDocuments");
  }
  
  getAppVersion(): Observable<any> {
    return this.http.get("http://localhost:14181/getCurrentVersion");
  }

  parseDocument(documentObject: DocumentModel): Observable<any> {
    return this.http.post<any>("http://localhost:14181/parseDocument", documentObject);
  }
}
