import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class WorkoutService {
  async getWorkoutStats(userId: number) {
    return prisma.workout.aggregate({
      where: { userId },
      _sum: { caloriesBurned: true },
      _count: { id: true }
    });
  }

  async getUserWorkouts(userId: number) {
    return prisma.workout.findMany({
      where: { userId }
    });
  }

  async createWorkout(data: any) {
    return prisma.workout.create({
      data
    });
  }
}