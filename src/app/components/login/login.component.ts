import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = null;
      
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          // Store the token
          localStorage.setItem('token', response.token);
          // Optional: log the successful login without accessing .data
          console.log('Login successful:', response);
          // Navigate to profile or dashboard
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          this.loading = false;
          this.error = err.message;
        }
      });
    }
  }
} 