import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Stocks } from './features/stocks/stocks';
import { StockDetails } from './features/stock-details/stock-details';

export const routes: Routes = [
    {
        path: "",
        component: Home,
        pathMatch: 'full'
    },
    {
        path: "acoes",
        component: Stocks
    },
    {
        path: "acoes/:ticker",
        component: StockDetails
    }
];
