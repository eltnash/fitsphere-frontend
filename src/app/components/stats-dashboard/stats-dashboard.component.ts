import { Component, OnInit } from '@angular/core';
import { Card } from 'primeng/card';
import { ProgressSpinner } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

interface WorkoutStats {
  totalWorkouts: number;
  totalCaloriesBurned: number;
  totalDistance: number;  // in kilometers
  totalTime: number;     // in minutes
}

@Component({
  selector: 'app-stats-dashboard',
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, Card, ProgressSpinner]
})
export class StatsDashboardComponent implements OnInit {
  stats: WorkoutStats | null = null;
  loading: boolean = false;
  error: boolean = false;

  constructor() {}

  ngOnInit() {
    this.loadStats();
  }

  private loadStats() {
    this.loading = true;
    this.error = false;
    
    // TODO: Replace with actual API call
    setTimeout(() => {
      this.stats = {
        totalWorkouts: 0,
        totalCaloriesBurned: 0,
        totalDistance: 0,
        totalTime: 0
      };
      this.loading = false;
    }, 1000);
  }
} 