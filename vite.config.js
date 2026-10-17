import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/fahim-portfolio/",
  server: {
    port: 5173,
    // This tells Vite to serve index.html for all client-side routes
    historyApiFallback: true,
  },
  build: {
    assetsInlineLimit: 0,
  },
});