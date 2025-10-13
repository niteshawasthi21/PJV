import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularMaterialComponentsModule } from '../../../shared/material/material-components.module';
import { AuthService } from '../../../core/services/auth/auth.service';
import { NotificationService } from '../../../core/services/dialog/notification.service';

@Component({
  selector: 'app-login',
  imports: [AngularMaterialComponentsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hidePassword = true;
  isLoading = false;
  rememberMe = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private notify: NotificationService,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // Check if user is already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    }
    
    // Load saved credentials if remember me was checked
    this.loadSavedCredentials();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  private loadSavedCredentials(): void {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    
    if (savedEmail && rememberMe) {
      this.loginForm.patchValue({
        email: savedEmail,
        rememberMe: true
      });
      this.rememberMe = true;
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(loginData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.handleLoginSuccess();
      },
      error: (err) => {
        this.isLoading = false;
        this.handleLoginError(err);
      }
    });
  }

  private handleLoginSuccess(): void {
    this.notify.show('Login successful! Welcome back!', 'success');
    
    // Handle remember me functionality
    this.handleRememberMe();
    
    // Navigate to profile page
    setTimeout(() => {
      this.router.navigate(['/profile']);
    }, 1000);
  }

  private handleLoginError(err: any): void {
    let errorMessage = 'Login failed. Please try again.';
    
    if (err.error?.message) {
      errorMessage = err.error.message;
    } else if (err.status === 401) {
      errorMessage = 'Invalid email or password.';
    } else if (err.status === 0) {
      errorMessage = 'Unable to connect to server. Please check your internet connection.';
    }
    
    this.notify.show(errorMessage, 'error');
    console.error('❌ Login error:', err);
  }

  private handleRememberMe(): void {
    if (this.loginForm.value.rememberMe) {
      localStorage.setItem('rememberedEmail', this.loginForm.value.email);
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberMe');
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  toggleRememberMe(): void {
    this.rememberMe = !this.rememberMe;
    this.loginForm.patchValue({ rememberMe: this.rememberMe });
  }

  clearForm(): void {
    this.loginForm.reset();
    this.isLoading = false;
  }
}
