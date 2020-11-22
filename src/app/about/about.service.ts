import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient) { }


  getProfileImage(): Observable<Blob> {
    return this.http.get("http://localhost:14181/getProfilePic", {responseType: "blob"});
  }
}
