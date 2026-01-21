import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-details',
  imports: [],
  templateUrl: './stock-details.html',
  styleUrl: './stock-details.css',
})
export class StockDetails {
  ticker!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.ticker = this.route.snapshot.paramMap.get('ticker')!;
    console.log(this.ticker);
  }
}
