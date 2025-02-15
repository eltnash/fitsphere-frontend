export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  stats: Stats;
}

export interface Stats {
  userId: string;
  totalWorkouts: number;
  totalCaloriesBurned: number;
  totalDistance: number;
  totalTime: number;
} 