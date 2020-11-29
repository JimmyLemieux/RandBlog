import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {emailModel} from './emailModel';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }


  sendEmail(emailContent: emailModel): Observable<any> {
    return this.http.post("http://localhost:14181/sendEmail", emailContent);
  }
}
