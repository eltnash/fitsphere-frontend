import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/graphql.types';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <div *ngIf="loading" class="loading">Loading...</div>
      
      <div *ngIf="error" class="error">
        {{ error }}
      </div>

      <div *ngIf="user" class="user-info">
        <h2>Profile</h2>
        <div class="info-item">
          <label>Name:</label>
          <span>{{ user.name }}</span>
        </div>
        <div class="info-item">
          <label>Email:</label>
          <span>{{ user.email }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .loading {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    .error {
      color: red;
      padding: 1rem;
      border: 1px solid red;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .user-info {
      h2 {
        margin-bottom: 1.5rem;
        color: #333;
      }

      .info-item {
        display: flex;
        margin-bottom: 1rem;
        
        label {
          width: 100px;
          font-weight: bold;
          color: #666;
        }

        span {
          color: #333;
        }
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  loading = true;
  error: string | null = null;
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.authService.getCurrentUser().subscribe({
      next: (response) => {
        this.loading = response.loading;
        if (response.error) {
          this.error = response.error.message;
        } else if (response.data?.me) {
          this.user = response.data.me;
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.message;
      }
    });
  }
} 