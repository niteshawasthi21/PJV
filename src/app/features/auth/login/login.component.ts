import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularMaterialComponentsModule } from '../../../shared/material/material-components.module';
import { AuthService } from '../../../core/services/auth/auth.service';
import { NotificationService } from '../../../core/services/dialog/notification.service';

@Component({
  selector: 'app-login',
  imports: [AngularMaterialComponentsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private notify: NotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
  //   const messages = [
  //   { text: 'Login successful!', type: 'success' },
  //   { text: 'Login failed. Please try again.', type: 'error' },
  //   { text: 'This is an info message.', type: 'info' },
  //   { text: 'This is a warning message.', type: 'warning' },
  // ];
  // messages.forEach((msg, idx) => {
  //   setTimeout(() => {
  //     this.notify.show(msg.text, msg.type.toString() as 'success' | 'error' | 'info' | 'warning');
  //   }, idx * 3000); // schedule each message 3 seconds apart
  // });


    if (this.loginForm.valid) {
       this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.notify.show('Login successful!', 'success');
        console.log('✅ Login success:', res);
      },
      error: (err) => {
        this.notify.show('Login failed. Please try again.', 'error');
        console.error('❌ Login error:', err);
      }
    });
    }
  }

}
