import { Component } from '@angular/core';
import { AssetTable } from "../../../../shared/components/asset-table/asset-table";
import { Kpi } from '../../../../shared/components/kpi/kpi';

@Component({
  selector: 'app-stocks-section',
  imports: [AssetTable, Kpi],
  templateUrl: './stocks-section.html',
  styleUrl: './stocks-section.css',
})
export class StocksSection {
  stocks = [
    { imageUrl: 'https://icons.brapi.dev/icons/PETR4.svg', ticker: 'PETR4', variation:2.2, price: 37.5 },
    { imageUrl: 'https://icons.brapi.dev/icons/MGLU3.svg', ticker: 'MGLU3', variation:1.4, price: 17.6 },
    { imageUrl: 'https://icons.brapi.dev/icons/BBAS3.svg', ticker: 'BBAS3', variation:4.7, price: 21.6 },
    { imageUrl: 'https://icons.brapi.dev/icons/ITUB.svg', ticker: 'ITUB3', variation:-5.2, price: 31.6 },
    { imageUrl: 'https://icons.brapi.dev/icons/CASH.svg', ticker: 'CASH3', variation:6.9, price: 7.6 },
    { imageUrl: 'https://icons.brapi.dev/icons/CMIG.svg', ticker: 'CMIG3', variation:-0.1, price: 10.6 },
  ];
}