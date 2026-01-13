import { Component } from '@angular/core';
import { Header } from "../../core/layout/header/header";
import { Footer } from "../../core/layout/footer/footer";

@Component({
  selector: 'app-stocks',
  imports: [Header, Footer],
  templateUrl: './stocks.html',
  styleUrl: './stocks.css',
})
export class Stocks {

}
