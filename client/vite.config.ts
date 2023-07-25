import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // find '@' and replace with full directory path, starting with 'src':
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});