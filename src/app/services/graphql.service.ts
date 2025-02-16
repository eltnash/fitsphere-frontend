import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';
import { Observable, map } from 'rxjs';
import { User, Stats } from '../interfaces/user.interface'; // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class GraphQLService {
  constructor(private apollo: Apollo) {}

  // Query to get user by ID
  getUserById(id: string): Observable<User> {
    return this.apollo.query<{ user: User }>({
      query: gql`
        query GetUser($id: ID!) {
          user(id: $id) {
            id
            name
            email
            stats {
              userId
              totalWorkouts
              totalCaloriesBurned
              totalDistance
              totalTime
            }
          }
        }
      `,
      variables: { id: '2' }
    }).pipe(
      map(result => result.data.user)
    );
  }

  // Query to get stats by user ID
  getUserStats(userId: string): Observable<Stats> {
    return this.apollo.query<{ stats: Stats }>({
      query: gql`
        query GetUserStats($userId: ID!) {
          stats(userId: $userId) {
            userId
            totalWorkouts
            totalCaloriesBurned
            totalDistance
            totalTime
          }
        }
      `,
      variables: {
        userId
      }
    }).pipe(
      map(result => result.data.stats)
    );
  }

  // Mutation to update user stats
  updateUserStats(stats: Partial<Stats>): Observable<Stats> {
    return this.apollo.mutate<{ updateStats: Stats }>({
      mutation: gql`
        mutation UpdateStats(
          $userId: ID!
          $totalWorkouts: Int
          $totalCaloriesBurned: Float
          $totalDistance: Float
          $totalTime: Float
        ) {
          updateStats(
            userId: $userId
            totalWorkouts: $totalWorkouts
            totalCaloriesBurned: $totalCaloriesBurned
            totalDistance: $totalDistance
            totalTime: $totalTime
          ) {
            userId
            totalWorkouts
            totalCaloriesBurned
            totalDistance
            totalTime
          }
        }
      `,
      variables: stats
    }).pipe(
      map(result => result.data!.updateStats)
    );
  }
} 