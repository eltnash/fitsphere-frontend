import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const GET_STATS = gql`
  query GetUserStats($userId: ID!) {
    getUserStats(userId: $userId) {
      totalWorkouts
      totalCaloriesBurned
    }
  }
`;

@Component({
  selector: 'app-stats-dashboard',
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, CardModule, ProgressSpinnerModule]
})
export class StatsDashboardComponent implements OnInit {
  stats: any;
  loading = false;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.loading = true;
    this.apollo
      .watchQuery({
        query: GET_STATS,
        variables: { userId: 1 }, // Replace with dynamic userId later
      })
      .valueChanges.subscribe(({ data, loading, error }: any) => {
        this.stats = data.getUserStats;
        this.loading = loading;
        this.error = error;
      });
  }
} 