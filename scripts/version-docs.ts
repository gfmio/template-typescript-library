#!/usr/bin/env bun

/**
 * Creates a new versioned copy of the documentation
 *
 * Usage:
 *   bun run scripts/version-docs.ts <version>
 *   Example: bun run scripts/version-docs.ts v1.2.0
 */
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const rootDir = join(import.meta.dir, '..');
const docsDir = join(rootDir, 'docs');
const versionsFile = join(docsDir, 'versions.json');

// Get version from command line
const version = process.argv[2];
if (!version) {
  console.error('Error: Version argument required');
  console.error('Usage: bun run scripts/version-docs.ts <version>');
  console.error('Example: bun run scripts/version-docs.ts v1.2.0');
  process.exit(1);
}

// Validate version format
if (!/^v\d+\.\d+\.\d+$/.test(version)) {
  console.error('Error: Version must be in format vX.Y.Z (e.g., v1.2.0)');
  process.exit(1);
}

// Read package.json to verify version matches
const packageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
const expectedVersion = `v${packageJson.version}`;
if (version !== expectedVersion) {
  console.warn(`Warning: Version ${version} doesn't match package.json version ${expectedVersion}`);
}

// Create versions.json if it doesn't exist
interface VersionInfo {
  version: string;
  label: string;
  path: string;
  date: string;
  status: 'current' | 'maintenance' | 'eol';
}

let versions: VersionInfo[] = [];
if (existsSync(versionsFile)) {
  versions = JSON.parse(readFileSync(versionsFile, 'utf-8'));
}

// Check if version already exists
if (versions.some((v) => v.version === version)) {
  console.error(`Error: Version ${version} already exists`);
  process.exit(1);
}

// Create versioned docs directory
const versionPath = join(docsDir, version);
if (existsSync(versionPath)) {
  console.error(`Error: Directory ${versionPath} already exists`);
  process.exit(1);
}

mkdirSync(versionPath, {
  recursive: true,
});

// Copy documentation files (exclude .vitepress directory)
const filesToCopy = [
  'guide',
  'api',
];
for (const file of filesToCopy) {
  const src = join(docsDir, file);
  const dest = join(versionPath, file);
  if (existsSync(src)) {
    cpSync(src, dest, {
      recursive: true,
    });
    console.log(`✓ Copied ${file}/ to ${version}/${file}/`);
  }
}

// Copy index.md if it exists
const indexSrc = join(docsDir, 'index.md');
if (existsSync(indexSrc)) {
  cpSync(indexSrc, join(versionPath, 'index.md'));
  console.log(`✓ Copied index.md to ${version}/index.md`);
}

// Mark all existing versions as maintenance
versions = versions.map((v) => ({
  ...v,
  status: 'maintenance' as const,
}));

// Add new version as current
versions.unshift({
  date: new Date().toISOString().split('T')[0],
  label: version,
  path: `/${version}/`,
  status: 'current',
  version,
});

// Write updated versions.json
writeFileSync(versionsFile, JSON.stringify(versions, null, 2) + '\n');
console.log('✓ Updated versions.json');

// Update versions.md
const versionsMd = `# Documentation Versions

This page lists all available documentation versions.

## Latest Version

- [Latest (main)](/) - Development version, latest changes

## Released Versions

${versions
  .map(
    (v) =>
      `- [${v.label}](${v.path}) - Released ${v.date} ${
        v.status === 'current' ? '(Current)' : v.status === 'maintenance' ? '(Maintenance)' : '(EOL)'
      }`,
  )
  .join('\n')}

## Version Support

- **Current**: Actively maintained with bug fixes and new features
- **Maintenance**: Bug fixes only
- **End of Life**: No longer supported

## How Versioning Works

When a new version is released:

1. The current documentation is archived under \`/${version}/\`
2. The new version becomes the default documentation at \`/\`
3. A version selector appears in the navigation bar

## Archive

Looking for older documentation? Check the [GitHub releases](https://github.com/gfmio/template-typescript-library/releases) for documentation snapshots.
`;

writeFileSync(join(docsDir, 'versions.md'), versionsMd);
console.log('✓ Updated versions.md');

console.log('\n✅ Documentation versioned successfully!');
console.log('\nNext steps:');
console.log(`1. Review the versioned docs in docs/${version}/`);
console.log(`2. Commit the changes: git add docs/${version} docs/versions.json docs/versions.md`);
console.log('3. The version selector will appear after deploying to GitHub Pages');
