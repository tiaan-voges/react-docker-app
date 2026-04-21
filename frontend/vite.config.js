import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Use root base in local dev; keep repo base for production deploy.
  base: command === "build" ? "/react-docker-app/" : "/",
  plugins: [react()],
}));
