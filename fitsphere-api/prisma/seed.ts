import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean the database
  await prisma.workout.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      age: 28,
    },
  });

  // Create workouts
  await prisma.workout.createMany({
    data: [
      {
        userId: user1.id,
        type: 'Running',
        duration: 30,
        caloriesBurned: 300,
      },
      {
        userId: user1.id,
        type: 'Weight Training',
        duration: 45,
        caloriesBurned: 200,
      },
      {
        userId: user2.id,
        type: 'Yoga',
        duration: 60,
        caloriesBurned: 150,
      },
    ],
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 