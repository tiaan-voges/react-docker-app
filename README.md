# 🚀 React + Vite (frontend)

This repository contains a minimal React app (Vite) with ESLint configured.

What's included

- Vite + React
- ESLint rules for React + hooks

Prerequisites

- Node.js (LTS) and npm (or Yarn)
- Docker & Docker Compose (optional)

Installation

1. (Optional) Install workspace dev tools from the repo root:

```bash
npm install
```

2. Install frontend dependencies:

```bash
npm --prefix frontend install
```

3. Or run both installs from the repo root:

```bash
npm run install:all
```

Common commands ✨

- ▶️ Start development server (from `frontend`):

```bash
cd frontend
npm run dev
```

- 🔎 Run the linter:

```bash
cd frontend
npm run lint
```

- 🛠️ Automatically fix lintable issues:

```bash
cd frontend
npm run lint:fix
```

- 📦 Build for production:

```bash
cd frontend
npm run build
```

- ▶️ Preview production build locally:

```bash
cd frontend
npm run preview
```

Start / Stop tooling (OS-specific) 🧰

Start the watcher pair (same on all OSes):

From the repository root (recommended):

```bash
npm run tools:start
```

Or from the `frontend` folder:

```bash
cd frontend
npm run tools:start
```

macOS 🍎

- 🛑 Stop the watchers using the provided script (uses `pkill`):

```bash
cd frontend
npm run tools:stop
```

- Alternatively, stop the terminal running `tools:start` with `Ctrl+C`.

Linux 🐧

- 🛑 `tools:stop` also works on many Linux distros (uses `pkill`).
- Or stop with `Ctrl+C` in the terminal where `tools:start` is running.

Windows 🪟

- If you launched the watchers in a terminal (PowerShell, Command Prompt, or Git Bash), stop them with `Ctrl+C`.
- If you need to kill processes from PowerShell, you can list Node processes and stop them (use with care):

```powershell
Get-Process node | Where-Object { $_.Path -like '*eslint*' -or $_.Path -like '*prettier*' } | Stop-Process
```

- A safer Windows workflow is to run `tools:start` in a dedicated terminal and stop with `Ctrl+C` or closing that terminal.

Notes about the tooling scripts 🔧

- `tools:start` uses `concurrently` to run two `nodemon` watchers:

  - `nodemon` watches `src/**` for changes (extensions: `js,jsx,css`).
  - On change one watcher runs `npm run lint`, the other runs `npx prettier --write .`.

- Why `nodemon`? ESLint removed the `--watch` CLI option, so we use `nodemon` to re-run the lint/format commands on file changes.

- Caveats:

  - Each change re-runs the full `eslint` command as configured; consider using `lint-staged` for committing flow or customizing the watcher to limit scope.
  - `prettier --write .` will format matched files each time; you may prefer running `prettier` only on changed files in CI or with `lint-staged`.

- `tools:stop` uses `pkill` (macOS/Linux). On Windows use `npm run tools:stop:win` or stop the terminal with `Ctrl+C`.

- Install dev dependencies (including `concurrently` and `nodemon`) by running `npm install` inside `frontend`.

One-line commands (from repository root) 🔗

You can run these from the repo root so you don't need to `cd` into `frontend`.

- Install frontend dependencies:

```bash
npm run frontend:install
```

- Start dev server:

```bash
npm run frontend:dev
```

- Start ESLint + Prettier watchers (recommended — runs from repo root):

```bash
npm run tools:start
```

- Stop watchers (macOS / most Linux):

```bash
npm run tools:stop
```

- Stop watchers (Windows PowerShell):

```powershell
npm run tools:stop:win
```

Using Docker Compose (optional)

If you prefer running the app via Docker Compose from the repository root:

```bash
# Build and start (modern Docker Compose)
docker compose up --build

# Or, rebuild with no cache then start
docker compose build --no-cache
docker compose up
```

Troubleshooting: ENOENT: no such file or directory, open '/app/index.html'

- Cause: a bind mount can hide files copied into the image during build. For
  example, mounting the project folder into `/app` will shadow files that the
  Dockerfile previously placed there.
- Quick fixes:
  - Run Compose from the repository root so `${PWD}/frontend` resolves correctly.
  - Use an absolute host path for the bind mount (the compose file in this
    repo uses `${PWD}/frontend:/app` to avoid relative-path resolution issues).
  - If you want the built image contents (not the host files) use the image
    without mounting the source folder, or remove the `./frontend:/app` bind mount.

Example (ensure you run this from the repo root):

```bash
# Use absolute host path for the frontend mount (resolved by Compose):
docker compose up --build
```

Notes

- ESLint configuration lives in `frontend/eslint.config.cjs`.
- If your editor supports "format on save" or ESLint code actions, enable `source.fixAll.eslint` for automatic fixes.

Where to go next 📌

- Edit `frontend/src/App.jsx` and `frontend/src/main.jsx` to modify the app.

License 📝

- MIT (or add your preferred license)
