import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    // Check if user is authenticated using the auth service
    const isAuthenticated = this.authService.isLoggedIn();
    
    if (isAuthenticated) {
      return true;
    } else {
      // Redirect to dashboard if not authenticated
      console.log('User not authenticated, redirecting to dashboard');
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
