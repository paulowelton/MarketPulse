import { Component, OnInit, signal } from '@angular/core';
import { StocksService } from '../../../../core/services/stocks-service';
import { Observable, combineLatest, map, BehaviorSubject, switchMap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-stocks-table',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './stocks-table.html',
})
export class StocksTable implements OnInit {
  private allStocks$ = new BehaviorSubject<any[]>([]); // Todos os dados
  paginatedStocks$!: Observable<any[]>;
  
  currentPage = new BehaviorSubject<number>(1);
  pageSize = 12;
  totalPages = 0;

  constructor(private stocksService: StocksService) {}

  ngOnInit(): void {
    this.stocksService.getStocks().subscribe(data => {
      this.allStocks$.next(data);
      this.totalPages = Math.ceil(data.length / this.pageSize);
    });

    this.paginatedStocks$ = combineLatest([
      this.allStocks$,
      this.currentPage
    ]).pipe(
      map(([stocks, page]) => {
        const start = (page - 1) * this.pageSize;
        const end = start + this.pageSize;
        return stocks.slice(start, end);
      })
    );
  }

  nextPage() {
    if (this.currentPage.value < this.totalPages) {
      this.currentPage.next(this.currentPage.value + 1);
    }
  }

  prevPage() {
    if (this.currentPage.value > 1) {
      this.currentPage.next(this.currentPage.value - 1);
    }
  }
}