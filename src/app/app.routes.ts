import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { PjvDashboardComponent } from './shared/components/pjv-dashboard/pjv-dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: PjvDashboardComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { 
        path: 'profile', 
        loadComponent: () => import('./features/auth/user-profile/user-profile.component').then(m => m.UserProfileComponent)
    }
];
