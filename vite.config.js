import federation from "@originjs/vite-plugin-federation";
import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  plugins: [
    glsl(),
    federation({
      remotes: {
        SDK: {
          external: "http://192.168.31.195:13333/sdkEntry.js",
          format: "var",
        },
      },
    }),
  ],
});
