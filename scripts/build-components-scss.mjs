import * as sass from 'sass';
import { readdir, mkdir, writeFile, access, constants } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const srcDir = join(root, 'src/components');
const distDir = join(root, 'dist/components');

const entries = await readdir(srcDir, { withFileTypes: true });

for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  const name = entry.name;
  const srcScss = join(srcDir, name, 'styles.scss');

  try {
    await access(srcScss, constants.F_OK);
  } catch {
    continue;
  }

  const result = sass.compile(srcScss);
  const outDir = join(distDir, name);
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, 'styles.css'), result.css);
  await writeFile(join(outDir, 'styles.scss'), result.css);
  console.log(`  ✓ ${name}/styles.{css,scss}`);
}
