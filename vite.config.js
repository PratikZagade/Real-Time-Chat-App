import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // ✅ FIX for SockJS + Vite
  define: {
    global: "window",
  },
});