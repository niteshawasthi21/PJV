import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialComponentsModule } from '../../material/material-components.module';

@Component({
  selector: 'app-header',
  imports: [CommonModule, AngularMaterialComponentsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
cartItemCount = 5;
  wishlistCount = 3;
  isLoggedIn = false; // Change based on auth state
  userName = 'John Doe';

  categories = [
    { name: 'Home', route: '/', icon: 'home' },
    { name: 'Men', route: '/men', icon: 'man' },
    { name: 'Women', route: '/women', icon: 'woman' },
    { name: 'Kids', route: '/kids', icon: 'child_care' },
    { name: 'Accessories', route: '/accessories', icon: 'watch' },
    { name: 'Sale', route: '/sale', icon: 'local_offer' },
    { name: 'New Arrivals', route: '/new', icon: 'new_releases' }
  ];

  onSearch( ) {
    console.log('Searching for:');
    // Implement search logic here
  }

  navigateTo(route: string) {
    console.log('Navigating to:', route);
    // Use Angular Router: this.router.navigate([route]);
  }

  logout() {
    console.log('Logging out...');
    // Implement logout logic
  }

  goToProfile() {
    console.log('Going to profile');
  }

  goToOrders() {
    console.log('Going to orders');
  }

  goToWishlist() {
    console.log('Going to wishlist');
  }

  goToCart() {
    console.log('Going to cart');
  }

  login() {
    console.log('Opening login dialog');
    // Open login dialog or navigate to login page
  }

}
