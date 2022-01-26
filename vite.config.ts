import { defineConfig, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import generateSitemap from "./scripts/generateSitemap";
import copyExtensionFiles from "./scripts/copyExtensionFiles";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const config: UserConfigExport = {
    plugins: [vue()],
    build: {
      emptyOutDir: true,
    },
  };

  if (mode === "extension") {
    config.root = "./src";
    config.publicDir = "../public";
    config.build = {
      ...config.build,
      outDir: "../dist",
      terserOptions: {
        mangle: false,
      },
      rollupOptions: {
        input: {
          popup: "./extension/popup.html",
        },
      },
    };

    if (command === "build") {
      copyExtensionFiles();
    }
  } else {
    generateSitemap();
  }

  return config;
});