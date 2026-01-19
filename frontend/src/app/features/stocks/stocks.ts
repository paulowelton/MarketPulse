import { Component } from '@angular/core';
import { Header } from "../../core/layout/header/header";
import { Footer } from "../../core/layout/footer/footer";
import { Hero } from "./components/hero/hero";
import { StocksTable } from "./components/stocks-table/stocks-table";

@Component({
  selector: 'app-stocks',
  imports: [Header, Footer, Hero, StocksTable],
  templateUrl: './stocks.html',
  styleUrl: './stocks.css',
})
export class Stocks {

}
