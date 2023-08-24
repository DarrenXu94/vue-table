import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import * as packageJson from "./package.json";
import tsConfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tsConfigPaths(),
    dts({
      include: ["src/components/"],
    }),
  ],
  build: {
    lib: {
      entry: resolve("src", "components/index.ts"),
      name: "VueTable",
      formats: ["es", "umd"],
      fileName: (format) => `vue-table-accessible.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
});
