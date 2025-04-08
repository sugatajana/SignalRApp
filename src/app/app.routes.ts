import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from '../auth.guard';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'user', component: UserComponent, canActivate: [authGuard] },
    { path: 'user/:id', component: UserComponent, canActivate: [authGuard] },
    { path: 'orders', component: OrderComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
];
