import { Component, OnInit, signal } from '@angular/core';
import { StocksService } from '../../../../core/services/stocks-service';
import { Observable, combineLatest, map, BehaviorSubject } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-stocks-table',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './stocks-table.html',
})
export class StocksTable implements OnInit {
  allStocks$ = new BehaviorSubject<any[]>([]);
  stocks$!: Observable<any[]>;

  currentPage = new BehaviorSubject<number>(1);
  limitItems = 12;
  totalPages = 0;

  mostTraded = new BehaviorSubject<boolean>(false);

  constructor(private stocksService: StocksService) {}

  ngOnInit(): void {
    this.stocksService.getStocks().subscribe(data => {
      this.allStocks$.next(data)
      this.totalPages = Math.ceil(data.length / this.limitItems)
      
    })
    
    this.stocks$ = combineLatest([
      this.allStocks$,
      this.currentPage,
      this.mostTraded
    ]).pipe(
      map(([stocks, currentPage, mostTraded]) => {
        if (mostTraded){
          const copia = stocks.sort((a,b) => b.market_cap - a.market_cap)
          stocks = copia
        }

        const start = (currentPage - 1) * this.limitItems;
        const end = (start + this.limitItems);
        return stocks.slice(start, end)
      })
    )
  }
  
  nextPage(){
    if (this.currentPage.value < this.totalPages){
      this.currentPage.next(this.currentPage.value + 1);
    }
  }
  
  prevPage(){
    if (this.currentPage.value > 1){
      this.currentPage.next(this.currentPage.value - 1);
    }
  }

  mostTradedStocks(){
      this.currentPage.next(1)
      this.mostTraded.next(true)
  }
}