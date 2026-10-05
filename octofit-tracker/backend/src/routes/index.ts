import { Router } from 'express';
import { apiBaseUrl } from '../config/api.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const router = Router();

router.get('/', (_request, response) => {
  response.json({
    baseUrl: apiBaseUrl,
    endpoints: ['users', 'teams', 'activities', 'leaderboard', 'workouts'],
  });
});

router.get('/users/', async (_request, response) => {
  response.json(await User.find().populate('team').lean());
});
router.get('/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members').lean());
});
router.get('/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user').sort({ completedAt: -1 }).lean());
});
router.get('/leaderboard/', async (_request, response) => {
  response.json(
    await Leaderboard.find()
      .populate('user')
      .populate('team')
      .sort({ period: -1, rank: 1 })
      .lean(),
  );
});
router.get('/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ title: 1 }).lean());
});

export default router;
