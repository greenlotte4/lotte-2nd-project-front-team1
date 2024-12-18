import { defineConfig } from "vite"; // loadEnv 추가
import react from "@vitejs/plugin-react";
import nodePolyfills from "rollup-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  define: {
    global: "window", // global을 window로 대체
  },

  build: {
    rollupOptions: {
      external: ["react-redux", "use-sync-external-store"], // 외부 모듈 처리
    },
  },
  resolve: {
    alias: {
      // 필요한 경우 별칭 추가
      "use-sync-external-store": "use-sync-external-store/shim",
    },
  },
});
