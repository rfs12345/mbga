import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron/simple";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`
        entry: "src/main.ts",
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`
        input: "src/preload.ts",
      },
    }),
  ],
  build: {
    outDir: "dist", // Output directory for the build files
  },
  server: {
    port: 3000,
  },
});
