import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ForgotPasswordPayload, LoginPayload, RegisterPayload, ResetPasswordPayload } from '../../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';

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
    return this.http.post(`${this.baseUrl}/login`, loginPayload);
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
}
