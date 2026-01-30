import { Component } from '@angular/core';
import { Header } from "../../core/layout/header/header";
import { Footer } from "../../core/layout/footer/footer";
import { StocksTable } from "./components/stocks-table/stocks-table";

@Component({
  selector: 'app-stocks',
  imports: [Header, Footer, StocksTable],
  templateUrl: './stocks.html',
  styleUrl: './stocks.css',
})
export class Stocks {

}
