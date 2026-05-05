import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Standalone vanilla-JS bundles. No React, no externals. These can be
// dropped into a WordPress theme or any plain-HTML page via <script>.
// Output goes to dist/vanilla-js/ so future standalone scripts can
// share the same folder without cluttering the React dist root.
export default defineConfig({
  // Don't copy public/ assets into dist/vanilla-js — those belong to the main bundle.
  publicDir: false,
  build: {
    emptyOutDir: false,
    outDir: 'dist/vanilla-js',
    lib: {
      entry: {
        videoCard: resolve(__dirname, 'src/utils/video/vanilla.ts'),
      },
      formats: ['iife', 'es'],
      name: 'RDSVideoCard',
      fileName: (format, entryName) => {
        if (format === 'iife') return `${entryName}.js`;
        return `${entryName}.mjs`;
      },
    },
    minify: 'esbuild',
  },
});
