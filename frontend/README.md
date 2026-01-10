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

````bash
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
````

2. Install frontend dependencies:

```bash
npm --prefix frontend install
```

Quick commands (from repository root)

- Install frontend deps: `npm run frontend:install`
- Start dev server: `npm run frontend:dev`
- Start lint & format watchers: `npm run tools:start`
- Stop watchers (macOS/Linux): `npm run tools:stop`
- Stop watchers (Windows PowerShell): `npm run tools:stop:win`

Common local commands (from `frontend`)

- Start dev server: `npm run dev`
- Run linter: `npm run lint`
- Fix lint: `npm run lint:fix`
- Format: `npm run format`
- Build: `npm run build`
- Preview: `npm run preview`

Tooling (watchers)

`tools:start` runs two watchers via `concurrently`:

- A `nodemon` watcher that runs `npm run lint` on changes to `src` files
- A second `nodemon` watcher that runs `npx prettier --write .` on changes

Notes:

- ESLint removed a `--watch` flag, so we use `nodemon` to re-run lint/format.
- `prettier --write .` rewrites files; consider running it only on changed files in CI or with `lint-staged`.
- Ensure dev deps (including `concurrently` and `nodemon`) are installed in `frontend`.

Platform stop notes

- macOS/Linux: `npm run tools:stop` (uses `pkill`) or stop the terminal with `Ctrl+C`.
- Windows: stop the terminal with `Ctrl+C`, or use `npm run tools:stop:win` for a PowerShell approach.

Docker Compose (optional)

```bash
docker compose up --build

# rebuild if needed
docker compose build --no-cache
docker compose up
```

Troubleshooting: ENOENT for `/app/index.html`

- If a bind mount hides files copied during image build, run Compose from the repo root or avoid mounting the source into the container.

Notes

- ESLint config: `frontend/eslint.config.cjs`
- Editor: enable `source.fixAll.eslint` or format-on-save for convenience

Where to go next

- Edit `frontend/src/App.jsx` and `frontend/src/main.jsx` to modify the app.

License

- MIT (or add your preferred license)

Development note

- From repo root: `npm run tools:start` to run the lint + format watchers.
- Ensure frontend deps are installed: `npm --prefix frontend install`.
