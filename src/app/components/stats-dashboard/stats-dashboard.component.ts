import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GraphQLService } from '../../services/graphql.service';
import { User, Stats } from '../../interfaces/user.interface';

@Component({
  selector: 'app-stats-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ProgressSpinnerModule],
  templateUrl: './stats-dashboard.component.html'
})
export class StatsDashboardComponent implements OnInit {
  user?: User;
  loading = false;
  error: string | null = null;

  constructor(private graphQLService: GraphQLService) {}

  ngOnInit() {
    this.loading = true;
    this.graphQLService.getUserById('1').subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  // Example method to update stats
  updateStats(newStats: Partial<Stats>) {
    this.graphQLService.updateUserStats(newStats).subscribe({
      next: (updatedStats) => {
        if (this.user) {
          this.user.stats = updatedStats;
        }
      },
      error: (error) => {
        console.error('Error updating stats:', error);
      }
    });
  }
} 