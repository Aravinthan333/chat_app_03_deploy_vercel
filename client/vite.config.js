import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 10000,
//   },
//   define: {
//     "process.env": process.env,
//   },
// });

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
});

// export default defineConfig(({ command, mode }) => {
//   // Load env file based on `mode` in the current working directory.
//   // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
//   const env = loadEnv(mode, process.cwd(), "");

//   return {
//     plugins: [react()],
//     // vite config
//     define: {
//       ...Object.keys(env).reduce((prev, key) => {
//         prev[`process.env.${key}`] = JSON.stringify(env[key]);
//         return prev;
//       }, {}),
//     },
//   };
// });
