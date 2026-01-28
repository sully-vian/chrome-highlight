import { resolve } from "node:path";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      // copy css files to vendor
      targets: [
        {
          src: resolve(__dirname, "node_modules/highlight.js/styles/*.min.css"),
          dest: resolve(__dirname, "dist/vendor"),
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "src/popup.ts"),
        content: resolve(__dirname, "src/content.ts"),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          switch (chunkInfo.name) {
            case "popup":
              return "popup.js";
            case "content":
              return "content.js";
            default:
              return "[name].js";
          }
        },
      },
    },
  },
});
