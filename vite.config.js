import { defineConfig } from "vite"; // loadEnv 추가
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
