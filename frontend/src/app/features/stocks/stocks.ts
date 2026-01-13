import { Component } from '@angular/core';
import { Header } from "../../core/layout/header/header";
import { Footer } from "../../core/layout/footer/footer";
import { Kpi } from "../../shared/components/kpi-card/kpi-card";
import { Hero } from "./components/hero/hero";

@Component({
  selector: 'app-stocks',
  imports: [Header, Footer, Hero],
  templateUrl: './stocks.html',
  styleUrl: './stocks.css',
})
export class Stocks {

}
