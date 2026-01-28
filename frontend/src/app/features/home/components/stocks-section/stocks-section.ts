import { Component, OnInit } from '@angular/core';
import { AssetTable } from "../../../../shared/components/asset-table/asset-table";
import { Kpi } from '../../../../shared/components/kpi-card/kpi-card';
import { StocksService } from '../../../../core/services/stocks-service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-stocks-section',
  imports: [AssetTable, Kpi, AsyncPipe],
  templateUrl: './stocks-section.html',
  styleUrl: './stocks-section.css',
})
export class StocksSection implements OnInit{
  stocks$!: Observable<any[]>;
  riseStocks$!: Observable<any[]>;
  downStocks$!: Observable<any[]>;
  volumeStocks$!: Observable<any[]>;
  segments$!: Observable<Number>;

  constructor(private stocksServices: StocksService) {}
  
  ngOnInit(): void {
    this.stocks$ = this.stocksServices.getStocks()
    this.stocksServices.getStocks().subscribe({next: (res) => {console.log(res)}})

    this.riseStocks$ = this.stocks$.pipe(
      map(stocks => [...stocks].sort((a,b) => b.market_cap - a.market_cap).slice(0,7))
    )
    
    this.downStocks$ = this.stocks$.pipe(
      map(stocks => [...stocks].sort((a,b) => a.market_cap - b.market_cap).slice(0,7))
    )
    
    this.volumeStocks$ = this.stocks$.pipe(
      map(stocks => [...stocks].sort((a,b) => b.volume - a.volume).slice(0,7))
    )

    this.segments$ = this.stocksServices.getSegments().pipe(
      map(segments => segments.length)
    )
    
  }
}