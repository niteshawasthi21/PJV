import { Component, ViewChild } from '@angular/core';
import { AngularMaterialComponentsModule } from '../../material/material-components.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-pjv-dashboard',
  imports: [AngularMaterialComponentsModule],
  templateUrl: './pjv-dashboard.component.html',
  styleUrls: ['./pjv-dashboard.component.scss']
})
export class PjvDashboardComponent {
 heroSlides = [
    {
      title: 'Summer Collection 2025',
      subtitle: 'Up to 50% Off on Selected Items',
      buttonText: 'Shop Now',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200',
      link: '/collection/summer'
    },
    {
      title: 'New Arrivals',
      subtitle: 'Trending Styles This Season',
      buttonText: 'Explore',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f5c65?w=1200',
      link: '/new-arrivals'
    },
    {
      title: 'Premium Ethnic Wear',
      subtitle: 'Elegant Designs for Every Occasion',
      buttonText: 'Discover',
      image: 'https://images.unsplash.com/photo-1610652492500-ded49ceeb3b8?w=1200',
      link: '/ethnic-wear'
    }
  ];

  currentSlide = 0;

  // Categories
  categories: Category[] = [
    {
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400',
      route: '/men'
    },
    {
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
      route: '/women'
    },
    {
      name: 'Kids',
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400',
      route: '/kids'
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=400',
      route: '/accessories'
    }
  ];

  // Featured Products
  featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Classic Cotton T-Shirt',
      price: 599,
      originalPrice: 999,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      category: 'Men',
      discount: 40,
      isNew: true
    },
    {
      id: 2,
      name: 'Slim Fit Denim Jeans',
      price: 1299,
      originalPrice: 1999,
      image: 'https://images.unsplash.com/photo-1542272454315-7bfb7b9f5d6c?w=400',
      category: 'Men',
      discount: 35
    },
    {
      id: 3,
      name: 'Floral Summer Dress',
      price: 1499,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
      category: 'Women',
      isNew: true
    },
    {
      id: 4,
      name: 'Leather Handbag',
      price: 2499,
      originalPrice: 3499,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
      category: 'Accessories',
      discount: 28
    },
    {
      id: 5,
      name: 'Casual Sneakers',
      price: 1799,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      category: 'Footwear',
      isNew: true
    },
    {
      id: 6,
      name: 'Formal Blazer',
      price: 3999,
      originalPrice: 5999,
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400',
      category: 'Men',
      discount: 33
    },
    {
      id: 7,
      name: 'Silk Saree',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1610652492500-ded49ceeb3b8?w=400',
      category: 'Women'
    },
    {
      id: 8,
      name: 'Kids Party Dress',
      price: 899,
      originalPrice: 1299,
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400',
      category: 'Kids',
      discount: 30
    }
  ];

  // Features
  features = [
    {
      icon: 'local_shipping',
      title: 'Free Shipping',
      description: 'On orders above ₹999'
    },
    {
      icon: 'cached',
      title: 'Easy Returns',
      description: '30 days return policy'
    },
    {
      icon: 'verified_user',
      title: 'Secure Payment',
      description: '100% secure checkout'
    },
    {
      icon: 'support_agent',
      title: '24/7 Support',
      description: 'Dedicated customer service'
    }
  ];

  // Testimonials
  testimonials = [
    {
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Amazing quality and fast delivery! Love the collection.',
      image: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Rajesh Kumar',
      rating: 5,
      comment: 'Great prices and excellent customer service. Highly recommended!',
      image: 'https://i.pravatar.cc/150?img=12'
    },
    {
      name: 'Anjali Patel',
      rating: 4,
      comment: 'Beautiful ethnic wear collection. Will definitely shop again.',
      image: 'https://i.pravatar.cc/150?img=5'
    }
  ];

  ngOnInit(): void {
    this.startAutoSlide();
  }

  startAutoSlide() {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.heroSlides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  viewProduct(product: Product) {
    console.log('Viewing product:', product);
    // Navigate to product details
  }

  addToCart(product: Product) {
    console.log('Adding to cart:', product);
    // Add to cart logic
  }

  addToWishlist(product: Product) {
    console.log('Adding to wishlist:', product);
    // Add to wishlist logic
  }

  navigateToCategory(route: string) {
    console.log('Navigating to:', route);
    // Navigate to category
  }

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  discount?: number;
}

export interface Category {
  name: string;
  image: string;
  route: string;
}