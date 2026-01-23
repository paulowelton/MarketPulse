import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StocksService {
  private allStocksEndpoint = 'http://127.0.0.1:5000/stocks/quote/all'
  private allSegmentsEndpoint = 'http://127.0.0.1:5000/stocks/segments/all'
  private stockDetails = 'http://127.0.0.1:5000/stocks/quote/'

  constructor(private http: HttpClient) {}

  getSegments(): Observable<any[]> {
    return this.http.get<any[]>(this.allSegmentsEndpoint);
  }

  getStocks(): Observable<any[]> {
    return this.http.get<any[]>(this.allStocksEndpoint);
  }

  getStockDetail(ticker: string): Observable<any[]> {
    return this.http.get<any[]>(this.stockDetails + ticker)
  }
  
}