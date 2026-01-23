import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private everythingNewsEndpoint = 'http://127.0.0.1:5000/news/'
  
  constructor(private http: HttpClient) {}

  getNews(subject: string){
    return this.http.get<any>(this.everythingNewsEndpoint + subject)
  }
}
