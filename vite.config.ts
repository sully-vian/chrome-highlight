import { extname, join, relative, resolve } from "node:path";
import { renderFile } from "ejs";
import { defineConfig, type PluginOption } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import styles from "./styles.json";

function ejsPlugin(ejsFiles: string[]): PluginOption {
  const srcRoot = join(__dirname, "src");
  return {
    name: "ejs",
    async generateBundle() {
      for (const filePath of ejsFiles) {
        const html = await renderFile(filePath, { styles });
        const relPath = relative(srcRoot, filePath);
        const outName = relPath.replace(extname(relPath), ".html");
        this.emitFile({
          type: "asset",
          fileName: outName,
          source: html,
        });
      }
    },
  };
}

export default defineConfig({
  plugins: [
    ejsPlugin(["src/popup.ejs"]),
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
          console.log(chunkInfo.name);
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
