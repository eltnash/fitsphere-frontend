import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
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
    this.loading = true;
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.loading = false;
        this.user = user;
      },
      error: (err) => {
        this.loading = false;
        this.error = err.message;
      }
    });
  }
} 