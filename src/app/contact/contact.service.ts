import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {emailModel} from './emailModel';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl: string = "http://pseudorandomblog.us-east-2.elasticbeanstalk.com"
  constructor(private http: HttpClient) { 
  }


  sendEmail(emailContent: emailModel): Observable<any> {
    return this.http.post( this.baseUrl + "/sendEmail", emailContent);
  }
}
