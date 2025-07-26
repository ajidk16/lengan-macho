import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seeding...');

  // Create admin user
  const adminEmail = 'admin@lenganmacho.com';
  const adminPassword = 'admin123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: hashedPassword,
      name: 'Admin',
      role: Role.ADMIN,
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create sample exercises
  const exercises = [
    {
      name: 'Push Up',
      category: 'Bodyweight',
      muscleGroup: 'Chest',
      equipment: 'None',
    },
    {
      name: 'Pull Up',
      category: 'Bodyweight',
      muscleGroup: 'Back',
      equipment: 'Pull-up Bar',
    },
    {
      name: 'Squat',
      category: 'Bodyweight',
      muscleGroup: 'Legs',
      equipment: 'None',
    },
    {
      name: 'Bench Press',
      category: 'Strength',
      muscleGroup: 'Chest',
      equipment: 'Barbell',
    },
    {
      name: 'Deadlift',
      category: 'Strength',
      muscleGroup: 'Back',
      equipment: 'Barbell',
    },
    {
      name: 'Shoulder Press',
      category: 'Strength',
      muscleGroup: 'Shoulders',
      equipment: 'Dumbbell',
    },
  ];

  for (const exercise of exercises) {
    const existingExercise = await prisma.exercise.findFirst({
      where: { name: exercise.name },
    });
    
    if (!existingExercise) {
      await prisma.exercise.create({
        data: exercise,
      });
    }
  }

  console.log('✅ Sample exercises created');

  // Create badges
  const badges = [
    {
      name: 'First Workout',
      description: 'Complete your first workout session',
      iconUrl: '/badges/first-workout.png',
    },
    {
      name: 'Consistency King',
      description: 'Work out for 7 days in a row',
      iconUrl: '/badges/consistency.png',
    },
    {
      name: 'Strength Builder',
      description: 'Lift 100kg total volume in a session',
      iconUrl: '/badges/strength.png',
    },
    {
      name: 'Body Tracker',
      description: 'Log your body measurements for 30 days',
      iconUrl: '/badges/tracker.png',
    },
  ];

  for (const badge of badges) {
    const existingBadge = await prisma.badge.findFirst({
      where: { name: badge.name },
    });
    
    if (!existingBadge) {
      await prisma.badge.create({
        data: badge,
      });
    }
  }

  console.log('✅ Badges created');

  // Create sample user
  const userEmail = 'user@example.com';
  const userPassword = 'user123';
  const userHashedPassword = await bcrypt.hash(userPassword, 10);

  const user = await prisma.user.upsert({
    where: { email: userEmail },
    update: {},
    create: {
      email: userEmail,
      passwordHash: userHashedPassword,
      name: 'John Doe',
      role: Role.USER,
      birthDate: new Date('1990-01-01'),
      gender: 1, // Male
      heightCm: 175,
    },
  });

  console.log('✅ Sample user created:', user.email);

  console.log('🎉 Seeding completed!');
  console.log('📋 Login credentials:');
  console.log(`Admin: ${adminEmail} / ${adminPassword}`);
  console.log(`User: ${userEmail} / ${userPassword}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });