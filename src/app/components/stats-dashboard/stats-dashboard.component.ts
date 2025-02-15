import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphQLService } from '../../services/graphql.service';
import { User, Stats } from '../../interfaces/user.interface';

@Component({
  selector: 'app-stats-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="user">
      <h2>Welcome {{ user.name }}</h2>
      <div *ngIf="user.stats">
        <h3>Your Stats</h3>
        <p>Total Workouts: {{ user.stats.totalWorkouts }}</p>
        <p>Total Calories Burned: {{ user.stats.totalCaloriesBurned }}</p>
        <p>Total Distance: {{ user.stats.totalDistance }}</p>
        <p>Total Time: {{ user.stats.totalTime }}</p>
      </div>
    </div>
  `
})
export class StatsDashboardComponent implements OnInit {
  user?: User;

  constructor(private graphQLService: GraphQLService) {}

  ngOnInit() {
    // Replace this hardcoded ID with a real user ID
    const userId = 'actual-user-id'; // Get this from your auth service
    
    this.graphQLService.getUserById(userId).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Error fetching user:', error);
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