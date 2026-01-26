import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Stocks } from './features/stocks/stocks';
import { StockDetails } from './features/stock-details/stock-details';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';

export const routes: Routes = [
    {
        path: "",
        component: Home,
        pathMatch: 'full'
    },
    {
        path: "login",
        component: Login
    },
    {
        path: "register",
        component: Register
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
