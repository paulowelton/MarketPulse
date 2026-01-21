import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Header } from "../../core/layout/header/header";
import { Footer } from "../../core/layout/footer/footer";
import { StocksService } from '../../core/services/stocks-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-stock-details',
  imports: [Header, Footer],
  templateUrl: './stock-details.html',
  styleUrl: './stock-details.css',
})
export class StockDetails {
  stockDetail$ = new BehaviorSubject<any[]>([]);
  ticker!: string;

  constructor(private route: ActivatedRoute, private stockService: StocksService) {}

  ngOnInit(): void {
    this.ticker = this.route.snapshot.paramMap.get('ticker')!;
    
    this.stockService.getStockDetail(this.ticker).subscribe(data => {
      this.stockDetail$.next(data)
      console.log(data)
    })
  }
}
