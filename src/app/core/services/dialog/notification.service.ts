import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  private getSnackBarConfig(type: NotificationType): MatSnackBarConfig {
    let panelClass = '';
    switch (type) {
      case 'success':
        panelClass = 'snack-success';
        break;
      case 'error':
        panelClass = 'snack-error';
        break;
      case 'warning':
        panelClass = 'snack-warning';
        break;
      case 'info':
        panelClass = 'snack-info';
        break;
      default:
        panelClass = '';
    }

    return {
      duration: 3000, // default 3 seconds
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: panelClass
    };
  }

  show(message: string, type: NotificationType = 'info') {
    const config = this.getSnackBarConfig(type);
    this.snackBar.open(message, 'close', config);
  }
}
