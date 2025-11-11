#!/usr/bin/env bun
/**
 * Prepares a clean package.json for publishing by removing dev-only fields
 */
import { readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const rootDir = join(import.meta.dir, '..');
const outDir = join(rootDir, 'out/build');

// Read the root package.json
const rootPackage = JSON.parse(
  readFileSync(join(rootDir, 'package.json'), 'utf-8')
);

// Fields to keep for publishing
const publishPackage: Record<string, unknown> = {
  name: rootPackage.name,
  version: rootPackage.version,
  description: rootPackage.description,
  type: rootPackage.type,
  author: rootPackage.author,
  license: rootPackage.license,
  homepage: rootPackage.homepage,
  repository: rootPackage.repository,
  bugs: rootPackage.bugs,
  keywords: rootPackage.keywords,
  engines: rootPackage.engines,
  sideEffects: rootPackage.sideEffects,
  // Adjust paths to be relative to out/build
  main: './index.cjs',
  module: './index.mjs',
  types: './index.d.ts',
  exports: {
    '.': {
      types: './index.d.ts',
      import: './index.mjs',
      require: './index.cjs',
    },
  },
  // Include only runtime dependencies (if any)
  dependencies: rootPackage.dependencies,
  peerDependencies: rootPackage.peerDependencies,
};

// Remove undefined/empty fields
const cleanedPackage = Object.fromEntries(
  Object.entries(publishPackage).filter(
    ([_, value]) =>
      value !== undefined &&
      value !== null &&
      !(typeof value === 'object' && Object.keys(value as object).length === 0)
  )
);

// Write the clean package.json to out/build
writeFileSync(
  join(outDir, 'package.json'),
  JSON.stringify(cleanedPackage, null, 2) + '\n'
);

// Copy README.md and LICENSE to out/build
copyFileSync(join(rootDir, 'README.md'), join(outDir, 'README.md'));
copyFileSync(join(rootDir, 'LICENSE'), join(outDir, 'LICENSE'));

console.log('✓ Prepared package for publishing in out/build/');
console.log('  - Generated clean package.json');
console.log('  - Copied README.md');
console.log('  - Copied LICENSE');
