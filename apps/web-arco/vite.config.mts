import process from 'node:process';

import { defineConfig } from '@vben/vite-config';

import { loadEnv } from 'vite';

export default defineConfig(async (config) => {
  const env = loadEnv(config?.mode || 'development', process.cwd());
  const apiPrefix: string = env.VITE_GLOB_API_URL || '/api';
  const rewriteApiPrefix = JSON.parse(
    env.VITE_GLOBAL_REWRITE_API_PREFIX || 'false',
  );
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          [apiPrefix]: {
            changeOrigin: true,
            rewrite: (path: string) => {
              if (rewriteApiPrefix) {
                return path.replace(new RegExp(`^${apiPrefix}`), '');
              }
              return path;
            },
            target: env.VITE_GLOBAL_SERVER_URL || 'http://localhost:5320',
            ws: true,
          },
        },
      },
    },
  };
});
