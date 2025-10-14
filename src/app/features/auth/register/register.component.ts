import { Component } from '@angular/core';
import { AngularMaterialComponentsModule } from '../../../shared/material/material-components.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [AngularMaterialComponentsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

   passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
   if (this.registerForm.valid) {
    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        console.log('✅ Registration success:', res);
      },
      error: (err) => {
        console.error('❌ Registration error:', err);
      }
    });
  }
  }

  get f() {
    return this.registerForm.controls;
  }
}
