import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/ui")
    }
  },
  root: path.resolve(__dirname, "./src/ui/"),
  build: {
    target: "esnext",
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    brotliSize: false,
    emptyOutDir: false,
    outDir: "./dist",
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      },
      input: {
        index: path.resolve(__dirname, "./src/ui/index.html")
      }
    }
  }
});
