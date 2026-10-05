import mongoose from 'mongoose';
import { Types } from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

type WorkoutSeed = {
  title: string;
  description: string;
  category: 'cardio' | 'strength' | 'flexibility';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  exercises: string[];
};

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    console.log('Seed the octofit_db database with test data');
    await connectDatabase();

    const teamIds = {
      trailblazers: new Types.ObjectId('650000000000000000000001'),
      waveRiders: new Types.ObjectId('650000000000000000000002'),
    };
    const userIds = {
      maya: new Types.ObjectId('650000000000000000000011'),
      leo: new Types.ObjectId('650000000000000000000012'),
      amina: new Types.ObjectId('650000000000000000000013'),
      noah: new Types.ObjectId('650000000000000000000014'),
    };
    const now = new Date();
    const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    await User.bulkWrite([
      { updateOne: { filter: { _id: userIds.maya }, update: { $set: { name: 'Maya Chen', email: 'maya.chen@example.com', team: teamIds.trailblazers } }, upsert: true } },
      { updateOne: { filter: { _id: userIds.leo }, update: { $set: { name: 'Leo Martin', email: 'leo.martin@example.com', team: teamIds.trailblazers } }, upsert: true } },
      { updateOne: { filter: { _id: userIds.amina }, update: { $set: { name: 'Amina Diallo', email: 'amina.diallo@example.com', team: teamIds.waveRiders } }, upsert: true } },
      { updateOne: { filter: { _id: userIds.noah }, update: { $set: { name: 'Noah Williams', email: 'noah.williams@example.com', team: teamIds.waveRiders } }, upsert: true } },
    ]);

    await Team.bulkWrite([
      {
        updateOne: {
          filter: { _id: teamIds.trailblazers },
          update: {
            $set: {
              name: 'Trailblazers',
              description: 'A running-focused team that loves exploring local trails.',
              members: [userIds.maya, userIds.leo],
              totalPoints: 385,
            },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { _id: teamIds.waveRiders },
          update: {
            $set: {
              name: 'Wave Riders',
              description: 'A balanced team building endurance in and out of the pool.',
              members: [userIds.amina, userIds.noah],
              totalPoints: 340,
            },
          },
          upsert: true,
        },
      },
    ]);

    const activityIds = [
      new Types.ObjectId('650000000000000000000021'),
      new Types.ObjectId('650000000000000000000022'),
      new Types.ObjectId('650000000000000000000023'),
      new Types.ObjectId('650000000000000000000024'),
    ];
    await Activity.bulkWrite([
      { updateOne: { filter: { _id: activityIds[0] }, update: { $set: { user: userIds.maya, type: 'running', durationMinutes: 35, distanceKm: 5.2, caloriesBurned: 340, points: 120, completedAt: daysAgo(1) } }, upsert: true } },
      { updateOne: { filter: { _id: activityIds[1] }, update: { $set: { user: userIds.leo, type: 'cycling', durationMinutes: 50, distanceKm: 18, caloriesBurned: 420, points: 145, completedAt: daysAgo(2) } }, upsert: true } },
      { updateOne: { filter: { _id: activityIds[2] }, update: { $set: { user: userIds.amina, type: 'swimming', durationMinutes: 40, distanceKm: 1.5, caloriesBurned: 310, points: 115, completedAt: daysAgo(1) } }, upsert: true } },
      { updateOne: { filter: { _id: activityIds[3] }, update: { $set: { user: userIds.noah, type: 'strength', durationMinutes: 45, distanceKm: 0, caloriesBurned: 280, points: 105, completedAt: daysAgo(3) } }, upsert: true } },
    ]);

    const period = now.toISOString().slice(0, 7);
    const leaderboardIds = [
      new Types.ObjectId('650000000000000000000031'),
      new Types.ObjectId('650000000000000000000032'),
      new Types.ObjectId('650000000000000000000033'),
      new Types.ObjectId('650000000000000000000034'),
    ];
    await Leaderboard.bulkWrite([
      { updateOne: { filter: { _id: leaderboardIds[0] }, update: { $set: { user: userIds.maya, team: teamIds.trailblazers, points: 210, rank: 1, period } }, upsert: true } },
      { updateOne: { filter: { _id: leaderboardIds[1] }, update: { $set: { user: userIds.leo, team: teamIds.trailblazers, points: 175, rank: 2, period } }, upsert: true } },
      { updateOne: { filter: { _id: leaderboardIds[2] }, update: { $set: { user: userIds.amina, team: teamIds.waveRiders, points: 185, rank: 3, period } }, upsert: true } },
      { updateOne: { filter: { _id: leaderboardIds[3] }, update: { $set: { user: userIds.noah, team: teamIds.waveRiders, points: 155, rank: 4, period } }, upsert: true } },
    ]);

    const workouts: WorkoutSeed[] = [
      { title: 'Beginner Endurance Run', description: 'A steady session to build aerobic fitness.', category: 'cardio', difficulty: 'beginner', durationMinutes: 30, exercises: ['5-minute warm-up walk', '20-minute easy run', '5-minute cool-down'] },
      { title: 'Full-body Strength Circuit', description: 'A balanced bodyweight circuit for overall strength.', category: 'strength', difficulty: 'intermediate', durationMinutes: 35, exercises: ['Squats: 3 x 12', 'Push-ups: 3 x 10', 'Reverse lunges: 3 x 10 each side', 'Plank: 3 x 30 seconds'] },
      { title: 'Recovery and Mobility', description: 'Gentle mobility work to support recovery.', category: 'flexibility', difficulty: 'beginner', durationMinutes: 20, exercises: ['Cat-cow: 2 minutes', 'Hip flexor stretch: 2 x 30 seconds each side', 'Hamstring stretch: 2 x 30 seconds each side', 'Child pose: 2 minutes'] },
    ];
    await Workout.bulkWrite(
      workouts.map((workout) => ({
        updateOne: {
          filter: { title: workout.title },
          update: { $set: workout },
          upsert: true,
        },
      })),
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

await seedDatabase();
