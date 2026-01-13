import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Stocks } from './features/stocks/stocks';

export const routes: Routes = [
    {
        path: "",
        component: Home,
        pathMatch: 'full'
    },
    {
        path: "acoes",
        component: Stocks
    }
];
