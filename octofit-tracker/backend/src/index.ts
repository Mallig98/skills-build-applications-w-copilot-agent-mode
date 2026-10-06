import express from 'express';
import { apiBaseUrl } from './config/api.js';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/index.js';

const app = express();
const port = 8000;

app.use(express.json());
app.use(apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'An internal server error occurred.' });
});

async function startServer(): Promise<void> {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`OctoFit API available at ${apiBaseUrl}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit API:', error);
  process.exitCode = 1;
});
