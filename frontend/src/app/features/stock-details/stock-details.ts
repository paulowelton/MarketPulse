import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Header } from "../../core/layout/header/header";
import { Footer } from "../../core/layout/footer/footer";
import { StocksService } from '../../core/services/stocks-service';
import { map, Observable } from 'rxjs';
import { AsyncPipe, NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-stock-details',
  imports: [Header, Footer, AsyncPipe, NgIf, NgClass],
  templateUrl: './stock-details.html',
  styleUrl: './stock-details.css',
})
export class StockDetails implements OnInit{
  ticker!: string;
  stockDetail$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
     private stockService: StocksService
  ) {}

  ngOnInit(): void {
    this.ticker = this.route.snapshot.paramMap.get('ticker')!;
    
    this.stockDetail$ = this.stockService.getStockDetail(this.ticker).pipe(
      map(data => data[0])
    )
  }
}
