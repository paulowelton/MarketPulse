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

  ibov$!: Observable<Number>;
  ibovPercent$!: Observable<Number>;
  segments$!: Observable<Number>;
  amountStocks$!: Observable<Number>;

  constructor(private stocksServices: StocksService) {}
  
  ngOnInit(): void {
    this.stocks$ = this.stocksServices.getStocks()

    this.riseStocks$ = this.stocks$.pipe(
      map(stocks => [...stocks].sort((a,b) => b.market_cap - a.market_cap).slice(0,7))
    )
    
    this.downStocks$ = this.stocks$.pipe(
      map(stocks => [...stocks].sort((a,b) => a.market_cap - b.market_cap).slice(0,7))
    )
    
    this.volumeStocks$ = this.stocks$.pipe(
      map(stocks => [...stocks].sort((a,b) => b.volume - a.volume).slice(0,7))
    )

    this.ibov$ = this.stocksServices.getStockDetail('^BVSP').pipe(
      map(res => res[0].regularMarketPrice)
    );
    
    this.ibovPercent$ = this.stocksServices.getStockDetail('^BVSP').pipe(
      map(res => res[0].regularMarketChangePercent)
    );
    
    this.segments$ = this.stocksServices.getSegments().pipe(
      map(segments => segments.length)
    )
    
    this.amountStocks$ = this.stocksServices.getStocks().pipe(
      map(amount => amount.length)
    )
    
  }
}