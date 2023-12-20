import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    exclude: ["**/e2e/**", "**/node_modules/**"],
    environment: "jsdom",
  },
});
