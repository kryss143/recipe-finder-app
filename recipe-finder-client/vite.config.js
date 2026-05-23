import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// Ensure Buffer and other Node built-ins are polyfilled during dev + build

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss(), nodePolyfills()],
  optimizeDeps: {
    include: ["buffer"],
    // use `rolldownOptions` (Vite's new optimizer backend) instead of deprecated esbuildOptions
    rolldownOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // ensure imports from 'buffer' resolve to the npm package
      buffer: "buffer/",
      // alias `vm` and `vm-browserify` to a small browser-friendly shim
      vm: fileURLToPath(new URL("./src/shims/vm.js", import.meta.url)),
      "vm-browserify": fileURLToPath(new URL("./src/shims/vm.js", import.meta.url)),
    },
  },
  define: {
    global: "globalThis",
  },
  build: {
    // increase limit to avoid noisy warnings while we apply code-splitting
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // separate large vendor libraries into chunks
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("parse") ||
              id.includes("vm-browserify") ||
              id.includes("buffer")
            ) {
              return "vendor-parse";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
