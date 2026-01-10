# 🚀 React + Vite (frontend)

This folder contains a minimal React app scaffolded for Vite with ESLint configured.

What's included 🧩

- ✅ Vite + React (client)
- ✅ ESLint rules for React and hooks

Prerequisites ⚙️

- Node.js (LTS) installed
- npm (bundled with Node) or Yarn
- Docker & Docker Compose (optional)

Install required modules 🛠️

1. Install root dev tools (optional — only if you want workspace-level tools):

```bash
npm install
```

2. Install frontend dependencies (required to run the app):

```bash
cd frontend
npm install
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

- `tools:start` uses the `concurrently` package to run `eslint --watch` and Prettier together.
- `tools:stop` uses `pkill` (macOS/Linux); Windows does not have `pkill` by default — use `Ctrl+C` or PowerShell to stop processes.
- Install dev dependencies (including `concurrently`) by running `npm install` inside `frontend`.

One-line commands (from repository root)

You can run these from the repo root so you don't need to `cd` into `frontend`.

- Install frontend dependencies:

```bash
npm run frontend:install
```

- Start dev server:

```bash
npm run frontend:dev
```

- Start ESLint + Prettier watchers:

```bash
npm run frontend:tools:start
```

- Stop watchers (macOS / most Linux):

```bash
npm run frontend:tools:stop
```

- Stop watchers (Windows PowerShell):

```powershell
npm run frontend:tools:stop:win
```

Using Docker Compose (optional)

If you prefer running the app via Docker Compose from the repository root:

```bash
docker compose up --build
```

Notes

- ESLint configuration lives in `frontend/eslint.config.cjs`.
- If your editor supports "format on save" or ESLint code actions, enable `source.fixAll.eslint` for automatic fixes.

Where to go next 📌

- Edit `frontend/src/App.jsx` and `frontend/src/main.jsx` to modify the app.

License 📝

- MIT (or add your preferred license)
