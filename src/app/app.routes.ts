import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { PjvDashboardComponent } from './shared/components/pjv-dashboard/pjv-dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { FallbackComponent } from './shared/components/fallback/fallback.component';
import { networkGuard } from './core/guards/network.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: PjvDashboardComponent ,canActivate: [networkGuard]},
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { 
        path: 'profile', 
        loadComponent: () => import('./features/auth/user-profile/user-profile.component').then(m => m.UserProfileComponent),
        canActivate: [AuthGuard]
    },
    { path: '**', component: FallbackComponent }
];
