import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  features = [
    {
      title: 'Workout Tracking',
      description: 'Track your workouts and monitor your progress over time',
      icon: '💪'
    },
    {
      title: 'Nutrition Planning',
      description: 'Plan your meals and track your nutritional intake',
      icon: '🥗'
    },
    {
      title: 'Community Support',
      description: 'Connect with like-minded fitness enthusiasts',
      icon: '👥'
    }
  ];
} 