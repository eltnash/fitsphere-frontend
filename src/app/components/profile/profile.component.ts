import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/graphql.types';
import { StatsDashboardComponent } from '../stats-dashboard/stats-dashboard.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, StatsDashboardComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
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