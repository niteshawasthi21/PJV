import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const networkGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (!navigator.onLine) {
    router.navigate(['/fallback']);
    return false;
  }
  return true;
};
