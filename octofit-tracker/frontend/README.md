# OctoFit Tracker presentation tier

The React 19/Vite frontend reads members, teams, activities, leaderboard entries, and workout suggestions from the API on port `8000`.

## API URL configuration

Vite exposes `VITE_CODESPACE_NAME` through `import.meta.env`. For Codespaces, define it in `octofit-tracker/frontend/.env.local` using your Codespace name:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then uses `https://your-codespace-name-8000.app.github.dev`. When `VITE_CODESPACE_NAME` is unset, it safely falls back to `http://localhost:8000`. Restart the Vite development server after changing `.env.local` so Vite reloads the environment.

## Run locally

```sh
npm run dev --prefix octofit-tracker/frontend
```

The data views accept both plain JSON arrays and paginated responses with a `results` array.
