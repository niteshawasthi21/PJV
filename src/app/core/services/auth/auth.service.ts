import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ForgotPasswordPayload, LoginPayload, RegisterPayload, ResetPasswordPayload } from '../../models/auth';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ----------------------------
  // Register a new user
  // ----------------------------
  register(payload: RegisterPayload): Observable<any> {
    const registerPayload = {
      name: payload.fullName,
      email: payload.email,
      password: payload.password
    };
    return this.http.post(`${this.baseUrl}/register`, registerPayload);
  }

  // ----------------------------
  // Login
  // ----------------------------
  login(payload: LoginPayload): Observable<any> {
    const loginPayload = {
      email: payload.email,
      password: payload.password
    };
    return this.http.post(`${this.baseUrl}/login`, loginPayload).pipe(
      tap((response: any) => {
        if (response.token && response.user) {
          this.setAuthData(response.token, response.user);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  // ----------------------------
  // Forgot Password
  // ----------------------------
  forgotPassword(payload: ForgotPasswordPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, payload);
  }

  // ----------------------------
  // Reset Password
  // ----------------------------
  resetPassword(payload: ResetPasswordPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, payload);
  }

  // ----------------------------
  // Authentication State Management
  // ----------------------------
  
  // Check if user is logged in
  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return !!(token && user);
  }

  // Set authentication data
  private setAuthData(token: string, user: any): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Get current user
  getCurrentUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Get auth token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Logout
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
  }

  //get profile
  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`);
  }

  // Upload Avatar
  uploadAvatar(file: File, userId: number): Observable<any> {
  const formData = new FormData();
  formData.append('avatar', file);

    return this.http.post(`${this.baseUrl}/avatar`, formData);
  }
}
