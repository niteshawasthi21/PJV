import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../core/services/dialog/notification.service';
import { AngularMaterialComponentsModule } from '../../../shared/material/material-components.module';
import { AuthService } from '../../../core/services/auth/auth.service';
import { catchError, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  imports: [AngularMaterialComponentsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  profileForm: FormGroup;
  passwordForm: FormGroup;
  addressForm: FormGroup;
  
  isEditingProfile = false;
  isEditingPassword = false;
  isAddingAddress = false;
  selectedFile: File | null = null;
  profileImageUrl = 'https://i.pravatar.cc/200?img=12';

  // User Data
  user = {
    id: 0,
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 9876543210',
    joinDate: new Date('2024-01-15'),
    totalOrders: 24,
    totalSpent: 45680,
    created_at: new Date('2024-01-15')
  };

  // Orders History
  orders: Order[] = [
    {
      id: 'ORD-2025-001',
      date: new Date('2025-10-05'),
      total: 2599,
      status: 'Delivered',
      items: 3
    },
    {
      id: 'ORD-2025-002',
      date: new Date('2025-09-28'),
      total: 1899,
      status: 'Delivered',
      items: 2
    },
    {
      id: 'ORD-2025-003',
      date: new Date('2025-09-15'),
      total: 3499,
      status: 'Delivered',
      items: 1
    },
    {
      id: 'ORD-2025-004',
      date: new Date('2025-08-30'),
      total: 4599,
      status: 'Delivered',
      items: 4
    },
    {
      id: 'ORD-2025-005',
      date: new Date('2025-08-10'),
      total: 1299,
      status: 'Delivered',
      items: 2
    }
  ];

  // Saved Addresses
  addresses: Address[] = [];

  // Wishlist Items
  wishlistItems = [
    {
      id: 1,
      name: 'Classic Cotton T-Shirt',
      price: 599,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200',
      inStock: true
    },
    {
      id: 2,
      name: 'Denim Jacket',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200',
      inStock: true
    },
    {
      id: 3,
      name: 'Leather Wallet',
      price: 899,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200',
      inStock: false
    }
  ];
  passwordResetToken='';

  constructor(
    private fb: FormBuilder,
    private notify: NotificationService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      joinDate:['']
    });

    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    this.addressForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  ngOnInit(): void {
    this.profileForm.disable();
    this.getUserProfile();
  }

  private getUserProfile() {
    // Call API to fetch user profile and populate forms
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.user.totalOrders = profile.totalOrders??24;
      this.user.totalSpent = profile.totalSpent??45680;
      this.user.joinDate = new Date(this.user.created_at); // convert string to Date
      this.profileImageUrl = profile.user.avatarUrl ?? this.profileImageUrl;
      this.addresses.push(...profile.user.addresses);
      this.profileForm.patchValue({
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone
    });
    });
   
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  // Profile Image Upload
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.authService.uploadAvatar(file, this.user.id).pipe(
        tap((response) => {
          console.log('Avatar uploaded successfully:', response);
        }),
        catchError((error) => {
          console.error('Error uploading avatar:', error);
          return of(null);
        })
      ).subscribe();
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      this.showSnackBar('Profile picture updated!');
    }

  }

  triggerFileInput() {
    document.getElementById('fileInput')?.click();
  }

  // Profile Edit
  enableProfileEdit() {
    this.isEditingProfile = true;
    this.profileForm.enable();
  }

  cancelProfileEdit() {
    this.isEditingProfile = false;
    this.profileForm.patchValue({
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone
    });
    this.profileForm.disable();
  }

  saveProfile() {
  if (this.profileForm.valid) {
    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: (res) => {        
          this.isEditingProfile = false;
          this.profileForm.disable();
          this.showSnackBar('Profile updated successfully!');
          this.getUserProfile(); // Refresh user data
      },
      error: (err) => {
        console.error('Profile update error:', err);
        this.showSnackBar('Error occurred while updating profile');
      }
    });
  }
}


  // // Password Change
   enablePasswordChange() {
  if (!this.user?.email) {
    this.showSnackBar('Email not available.');
    return;
  }

  this.authService.changePassword(this.user.email).subscribe({
    next: (res) => {
      this.passwordResetToken=res.resetToken;
      this.isEditingPassword = true;
    },
    error: (err) => {
      console.error('Password reset error:', err);
      this.showSnackBar('Error sending password reset link.');
      this.isEditingPassword = false; // Optional: revert state if applicable
    }
  });
}



  cancelPasswordChange() {
    this.isEditingPassword = false;
    this.passwordForm.reset();
  }

  changePassword() {
    if (this.passwordForm.valid) {
      // API call to change password
      this.authService.updatePassword(this.passwordResetToken,this.passwordForm.value.newPassword).subscribe({
        next: (res) => {
          this.showSnackBar('Password changed successfully!');
          this.isEditingPassword = false;
          this.passwordForm.reset();
        }
      });
    }
  }

  // // Address Management
  addNewAddress() {
    this.isAddingAddress = true;
    
  }

  cancelAddAddress() {
    this.isAddingAddress = false;
    this.addressForm.reset();
  }

  saveAddress() {
    if (this.addressForm.valid) {
      this.authService.updateOrAddAddress(this.addressForm.value).subscribe({
        next: (res) => {
          this.addresses.push(res);
          this.isAddingAddress = false;
          this.addressForm.reset();
          this.showSnackBar('Address added successfully!');
        },
        error: (err) => {
          console.error('Error adding address:', err);
          this.showSnackBar('Error occurred while adding address');
        }
      });
    }
  }

  setDefaultAddress(address: Address) {
  //   this.addresses.forEach(addr => addr.isDefault = false);
  //   address.isDefault = true;
  //   this.showSnackBar('Default address updated!');
  }

  deleteAddress(addressId: number) {
  //   this.addresses = this.addresses.filter(addr => addr.id !== addressId);
  //   this.showSnackBar('Address deleted successfully!');
  }

  // // Order Management
  viewOrder(order: Order) {
  //   console.log('Viewing order:', order);
  //   // Navigate to order details page
  }

  trackOrder(order: Order) {
  //   console.log('Tracking order:', order);
  //   // Open tracking dialog or navigate to tracking page
  }

  downloadInvoice(order: Order) {
  //   console.log('Downloading invoice for:', order);
  //   this.showSnackBar('Invoice downloaded!');
  }

  getStatusColor(status: string): string {
  //   const colors: { [key: string]: string } = {
  //     'Delivered': 'primary',
  //     'Shipped': 'accent',
  //     'Processing': 'warn',
  //     'Cancelled': 'basic'
  //   };
  //   return colors[status] || 'basic';
  return ''
  }

  // // Wishlist Management
  removeFromWishlist(itemId: number) {
  //   this.wishlistItems = this.wishlistItems.filter(item => item.id !== itemId);
  //   this.showSnackBar('Removed from wishlist!');
  }

  moveToCart(item: any) {
  //   console.log('Moving to cart:', item);
  //   this.showSnackBar('Item added to cart!');
  }

  // // Utility
  showSnackBar(message: string) {
    this.notify.show(message, 'success');
    return;
  }

}

export interface Order {
  id: string;
  date: Date;
  total: number;
  status: string;
  items: number;
}

export interface Address {
  id: number;
  type: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}