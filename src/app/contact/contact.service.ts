import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {emailModel} from './emailModel';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl = "http://localhost:14181";
  constructor(private http: HttpClient) { 
    if (environment.production) {
      this.baseUrl = "https://my-madness.vercel.app";
    }
  }


  sendEmail(emailContent: emailModel): Observable<any> {
    return this.http.post( this.baseUrl + "/sendEmail", emailContent);
  }
}
