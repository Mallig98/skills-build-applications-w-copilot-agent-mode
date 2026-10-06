import { Router } from 'express';
import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const router = Router();
const databaseRoutes = ['/api/users', '/api/teams', '/api/activities', '/api/leaderboard', '/api/workouts'];

router.use(databaseRoutes, (_request, response, next) => {
  if (mongoose.connection.readyState !== 1) {
    response.status(503).json({ error: 'Database is unavailable. Please try again later.' });
    return;
  }

  next();
});

router.get('/api/users/', async (_request, response) => {
  response.json(await User.find().populate('team').lean());
});
router.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members').lean());
});
router.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user').sort({ completedAt: -1 }).lean());
});
router.get('/api/leaderboard/', async (_request, response) => {
  response.json(
    await Leaderboard.find()
      .populate('user')
      .populate('team')
      .sort({ period: -1, rank: 1 })
      .lean(),
  );
});
router.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ title: 1 }).lean());
});

export default router;
