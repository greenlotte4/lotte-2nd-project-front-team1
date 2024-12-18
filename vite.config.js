import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      util: "rollup-plugin-node-polyfills/polyfills/util",
    },
  },
  define: {
    global: "window", // global을 window로 대체
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      external: [],
    },
  },
});
