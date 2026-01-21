import { Component, OnInit } from '@angular/core';
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
  allSegments$ = new BehaviorSubject<any[]>([]);
  stocks$!: Observable<any[]>;

  currentPage = new BehaviorSubject<number>(1);
  limitItems = 8;
  totalPages = 0;

  filter = new BehaviorSubject<string>('Default');
  segment = new BehaviorSubject<string>('Default');
  search = new BehaviorSubject<string>('');

  constructor(private stocksService: StocksService) {}

  ngOnInit(): void {
    this.stocksService.getStocks().subscribe(data => {
      this.allStocks$.next(data);      
    })

    this.stocksService.getSegments().subscribe(data => {
      this.allSegments$.next(data);
    })
    
    this.stocks$ = combineLatest([
      this.allStocks$,
      this.currentPage,
      this.segment,
      this.filter,
      this.search
    ]).pipe(
      map(([stocks, currentPage, segment, filter, search]) => {
        if (segment != 'Default'){
          stocks = stocks.filter(stock => stock.sector === segment);
        }

        if (search.trim() !== ''){
          const term = search.toLowerCase();
          stocks = stocks.filter(stock => stock.stock?.toLowerCase().includes(term))
        }

        if (filter === 'mostTraded'){
          const copia = [...stocks].sort((a,b) => b.volume - a.volume);
          stocks = copia;
        }
        if (filter === 'gainers'){
          const copia = [...stocks].sort((a,b) => b.change - a.change);
          stocks = copia;
        }
        if (filter === 'losers'){
          const copia = [...stocks].sort((a,b) => a.change - b.change);
          stocks = copia;
        }

        this.totalPages = Math.ceil(stocks.length / this.limitItems);

        const start = (currentPage - 1) * this.limitItems;
        const end = (start + this.limitItems);
        
        return stocks.slice(start, end);
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

  setFilter(filter: string) {
    this.currentPage.next(1);
    this.filter.next(filter);
  }

  setSegment(segment: string) {
    this.currentPage.next(1);
    this.segment.next(segment);
  }

  setSearch(term: string){
    this.currentPage.next(1);
    this.search.next(term);
  }

}