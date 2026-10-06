import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/index.js';

const app = express();
const PORT = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const databaseRetryDelayMs = 5000;

app.use(express.json());
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type');

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  next();
});
app.use(apiRouter);

app.get('/api/', (_request, response) => {
  response.json({
    baseUrl: apiBaseUrl,
    endpoints: ['users', 'teams', 'activities', 'leaderboard', 'workouts'],
  });
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'An internal server error occurred.' });
});

async function connectWithRetry(): Promise<void> {
  try {
    await connectDatabase();
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.error(`Unable to connect to MongoDB: ${reason}. Retrying in ${databaseRetryDelayMs} ms.`);
    const retryTimer = setTimeout(() => void connectWithRetry(), databaseRetryDelayMs);
    retryTimer.unref();
  }
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`OctoFit API available at ${apiBaseUrl}`);
});

void connectWithRetry();
