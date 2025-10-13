import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialComponentsModule } from '../../material/material-components.module';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AngularMaterialComponentsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemCount = 5;
  wishlistCount = 3;
  isLoggedIn = false;
  userName = '';
  private authSubscription!: Subscription;

  categories = [
    { name: 'Home', route: '/', icon: 'home' },
    { name: 'Men', route: '/men', icon: 'man' },
    { name: 'Women', route: '/women', icon: 'woman' },
    { name: 'Kids', route: '/kids', icon: 'child_care' },
    { name: 'Accessories', route: '/accessories', icon: 'watch' },
    { name: 'Sale', route: '/sale', icon: 'local_offer' },
    { name: 'New Arrivals', route: '/new', icon: 'new_releases' }
  ];
  userAvatar='';

  constructor(private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to auth state
    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isLoggedIn = isAuth;
      if (isAuth) {
        const user = this.authService.getCurrentUser();
        this.userName = user?.name || 'User';
        this.userAvatar = user?.avatar || '';
      } else {
        this.userName = '';
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  onSearch() {
    console.log('Searching for:');
  }

  navigateTo(route: string) {
    console.log('Navigating to:', route);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
    console.log('Going to profile');
  }

  goToCart() {
    console.log('Going to cart');
  }

}
