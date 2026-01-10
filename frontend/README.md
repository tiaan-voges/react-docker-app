# React + Vite (frontend)

This folder contains a minimal React app scaffolded for Vite with ESLint configured.

What's included

- Vite + React (client)
- ESLint rules for React and hooks

Prerequisites

- Node.js (LTS) installed
- npm (bundled with Node) or Yarn
- Docker & Docker Compose (optional)

Install required modules

1. Install root dev tools (optional — only if you want workspace-level tools):

```bash
npm install
```

2. Install frontend dependencies (required to run the app):

```bash
cd frontend
npm install
```

Common commands

- Start development server (from `frontend`):

```bash
cd frontend
npm run dev
```

- Run the linter:

```bash
cd frontend
npm run lint
```

- Automatically fix lintable issues:

```bash
cd frontend
npm run lint:fix
```

- Build for production:

```bash
cd frontend
npm run build
```

- Preview production build locally:

```bash
cd frontend
npm run preview
```

Using Docker Compose (optional)

If you prefer running the app via Docker Compose from the repository root:

```bash
docker compose up --build
```

Notes

- ESLint configuration lives in `frontend/eslint.config.cjs`.
- If your editor supports "format on save" or ESLint code actions, enable `source.fixAll.eslint` for automatic fixes.

Where to go next

- Edit `frontend/src/App.jsx` and `frontend/src/main.jsx` to modify the app.

License

- MIT (or add your preferred license)
