import { defineConfig } from "vite"; // loadEnv 추가
import react from "@vitejs/plugin-react";
import nodePolyfills from "rollup-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  define: {
    global: "window", // global을 window로 대체
  },
});
