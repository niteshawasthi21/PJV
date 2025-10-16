import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialComponentsModule } from '../../material/material-components.module';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services/dialog/notification.service';

@Component({
  selector: 'app-fallback',
  standalone: true,
  imports: [CommonModule, AngularMaterialComponentsModule],
  templateUrl: './fallback.component.html',
  styleUrls: ['./fallback.component.scss']
})
export class FallbackComponent implements OnInit {
  isOffline = signal(false);

  constructor(private router: Router,
    private notifyService: NotificationService
  ) {}

  ngOnInit() {
    // Detect network connectivity
    this.isOffline.set(!navigator.onLine);

    window.addEventListener('offline', () => this.isOffline.set(true));
    window.addEventListener('online', () => this.isOffline.set(false));
  }

  retry() {
    if (navigator.onLine) {
      this.router.navigateByUrl('/');
    } else {
      this.notifyService.show('You are still offline. Please check your network connection.', 'warning');
    }
  }
}
