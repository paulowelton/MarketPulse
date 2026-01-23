import { Component } from '@angular/core';
import { Header } from "../../core/layout/header/header";
import { Footer } from "../../core/layout/footer/footer";
import { Hero } from "./components/hero/hero";
import { StocksSection } from "./components/stocks-section/stocks-section";
import { News } from "../../shared/components/news/news";

@Component({
  selector: 'app-home',
  imports: [Header, Footer, Hero, StocksSection, News],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
