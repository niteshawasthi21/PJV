import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getToken();
  // Clone request and add Authorization header if token exists
  const newReq = authToken
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      })
    : req;
  return next(newReq);
};
