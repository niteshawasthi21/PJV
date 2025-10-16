import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload
} from '../../models/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ----------------------------
  // Auth Actions
  // ----------------------------

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, {
      name: payload.fullName,
      email: payload.email,
      password: payload.password
    });
  }

  login(payload: LoginPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {
      email: payload.email,
      password: payload.password
    }).pipe(
      tap((response: any) => {
        if (response.token && response.user) {
          this.setAuthData(response.token, response.user);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
  }

  // ----------------------------
  // Password Management
  // ----------------------------

  changePassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
  }

  updatePassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { token, newPassword });
  }

  // ----------------------------
  // Profile & User Data
  // ----------------------------

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`);
  }

  updateProfile(data: { name: string; email: string; phone: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-profile`, data).pipe(
      tap((response: any) => {
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      })
    );
  }

  uploadAvatar(file: File, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http.post(`${this.baseUrl}/avatar`, formData);
  }

  updateOrAddAddress(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user-address`, data);
  }

  // ----------------------------
  // Local Auth State
  // ----------------------------

  isLoggedIn(): boolean {
    return !!(localStorage.getItem('authToken') && localStorage.getItem('user'));
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private setAuthData(token: string, user: any): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
}