import { defineConfig } from 'vite';
import path from 'path';
import { readdirSync } from 'fs';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

const absolutePathAliases = {};

const srcPath = path.resolve('./src/');

const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map((dirent) =>
  dirent.name.replace(/(\.ts){1}(x?)/, '')
);

srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = path.join(srcPath, directory);
});

export default defineConfig({
  root: './',
  resolve: {
    alias: {
      ...absolutePathAliases,
    },
  },
  plugins: [react()],
  //@ts-ignore
  test: {
    ...configDefaults,
    environment: 'jsdom',
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 8088,
  },
});
