import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  constructor(private http: HttpClient) { }


  getAnimeList() {
    const headers = new HttpHeaders();
    headers.append('Access Control Origin', '*');
    this.http.get('url', {headers})
  }
}
