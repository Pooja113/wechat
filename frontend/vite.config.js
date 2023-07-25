import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load the appropriate .env file based on the build mode
  const env = dotenv.config({
    path: `.env.${mode}`,
  }).parsed;

  // Process the environment variables and make them available to the client-side code
  const processEnv = {};
  for (const key in env) {
    processEnv[`import.meta.env.${key}`] = env[key];
  }

  return {
    plugins: [react()],
    define: processEnv,
  };
});
