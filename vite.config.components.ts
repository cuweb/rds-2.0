import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

const componentNames = [
  'Article',
  'Aside',
  'Badge',
  'BadgeGroup',
  'Body',
  'Column',
  'LinkProvider',
  'Main',
  'Section',
];

const entry = Object.fromEntries(
  componentNames.map((name) => {
    const ext = name === 'LinkProvider' ? 'tsx' : 'ts';
    return [`${name}/index`, resolve(__dirname, `src/components/${name}/index.${ext}`)];
  }),
);

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/components/**/*'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
      tsconfigPath: './tsconfig.build.json',
      outDir: 'dist/components',
      entryRoot: 'src/components',
    }),
  ],
  build: {
    emptyOutDir: false,
    outDir: 'dist/components',
    lib: {
      entry,
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.[0]?.endsWith('.css')) {
            return '[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
