import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import path from "path";
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineConfig({
  base: './',
  plugins: [
    vue({
      template: {
        transformAssetUrls,
      },
    }),
    vuetify({
      autoImport: true,
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, "../server/public"),
  },
  define: {
    "process.env": {}, // Fix for some Vuetify packages expecting process.env
  },
  optimizeDeps: {
    include: ["vuetify"],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2'],
});
