import { WorkoutService } from '../../services/workout.service';

const workoutService = new WorkoutService();

export const workoutResolvers = {
  Query: {
    workoutStats: (_: any, { userId }: { userId: number }) => 
      workoutService.getWorkoutStats(userId),
    userWorkouts: (_: any, { userId }: { userId: number }) => 
      workoutService.getUserWorkouts(userId),
  },
  Mutation: {
    createWorkout: (_: any, args: any) => 
      workoutService.createWorkout(args),
  }
};