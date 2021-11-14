import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AboutService {

  baseUrl:string = "http://localhost:14181";
  constructor(private http: HttpClient) {
    if (environment.production) {
      this.baseUrl = "https://the-rand-blog.herokuapp.com";
    }
   }


  getProfileImage(): Observable<Blob> {
    return this.http.get( this.baseUrl + "/getProfilePic", {responseType: "blob"});
  }

  getIntroduction(): Observable<any> {
    return this.http.get( this.baseUrl + "/getIntroduction");
  }
}
