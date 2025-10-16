import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialComponentsModule } from '../../material/material-components.module';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AngularMaterialComponentsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Reactive signals
  isLoggedIn = toSignal(this.authService.isAuthenticated$, { initialValue: false });

  user = computed(() => this.authService.getCurrentUser());
  userName = computed(() => this.user()?.name ?? 'User');
  userAvatar = signal(this.user()?.avatar ?? '');

  cartItemCount = signal(5);
  wishlistCount = signal(3);

  categories = [
    { name: 'Home', route: '/', icon: 'home' },
    { name: 'Men', route: '/men', icon: 'man' },
    { name: 'Women', route: '/women', icon: 'woman' },
    { name: 'Kids', route: '/kids', icon: 'child_care' },
    { name: 'Accessories', route: '/accessories', icon: 'watch' },
    { name: 'Sale', route: '/sale', icon: 'local_offer' },
    { name: 'New Arrivals', route: '/new', icon: 'new_releases' },
  ];

  onSearch() {
    console.log('Searching...');
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  onAvatarError() {
    this.userAvatar.set('/PJV.png');
  }
}
