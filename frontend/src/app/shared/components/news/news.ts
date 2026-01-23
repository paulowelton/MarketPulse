import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { NewsService } from '../../../core/services/news-service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-news',
  imports: [AsyncPipe],
  templateUrl: './news.html',
  styleUrl: './news.css',
})
export class News implements OnInit{
  @Input() subject: string = '';
  allNews$!: Observable<any[]>;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.allNews$ = this.newsService.getNews(this.subject).pipe(
      map(response => response.articles.slice(0, 3))
    )
  }
}