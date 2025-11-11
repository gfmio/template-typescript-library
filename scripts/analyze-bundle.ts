#!/usr/bin/env bun

/**
 * Analyze bundle size and report statistics
 *
 * Usage:
 *   bun run scripts/analyze-bundle.ts
 */

import { gzipSync } from 'node:zlib';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const rootDir = join(import.meta.dir, '..');
const buildDir = join(rootDir, 'out/build');

// Check if build directory exists
if (!existsSync(buildDir)) {
  console.error('❌ Build directory not found');
  console.error('Run the build first: task build');
  process.exit(1);
}

interface BundleStats {
  file: string;
  size: number;
  gzipSize: number;
  formatSize: string;
  formatGzip: string;
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

const analyzeBundleFile = (filePath: string): BundleStats | null => {
  if (!existsSync(filePath)) {
    return null;
  }

  const content = readFileSync(filePath);
  const size = statSync(filePath).size;
  const gzipSize = gzipSync(content).length;

  return {
    file: filePath.split('/').pop() || filePath,
    formatGzip: formatBytes(gzipSize),
    formatSize: formatBytes(size),
    gzipSize,
    size,
  };
};

// Analyze all bundle files
const files = ['index.cjs', 'index.mjs', 'index.d.ts'];
const stats: BundleStats[] = [];

for (const file of files) {
  const filePath = join(buildDir, file);
  const stat = analyzeBundleFile(filePath);
  if (stat) {
    stats.push(stat);
  }
}

if (stats.length === 0) {
  console.error('❌ No bundle files found in out/build/');
  process.exit(1);
}

// Calculate totals
const totalSize = stats.reduce((sum, s) => sum + s.size, 0);
const totalGzip = stats.reduce((sum, s) => sum + s.gzipSize, 0);

// Display results
console.log('\n📦 Bundle Size Analysis\n');
console.log('File                Size       Gzipped');
console.log('─'.repeat(45));

for (const stat of stats) {
  const name = stat.file.padEnd(20);
  const size = stat.formatSize.padEnd(10);
  const gzip = stat.formatGzip;
  console.log(`${name} ${size} ${gzip}`);
}

console.log('─'.repeat(45));
console.log(`${'Total'.padEnd(20)} ${formatBytes(totalSize).padEnd(10)} ${formatBytes(totalGzip)}`);
console.log();

// Calculate compression ratio
const compressionRatio = ((1 - totalGzip / totalSize) * 100).toFixed(1);
console.log(`Compression ratio: ${compressionRatio}%`);

// Size recommendations
const mainBundle = stats.find((s) => s.file === 'index.mjs');
if (mainBundle) {
  console.log('\nBundle Size Guidelines:');
  if (mainBundle.gzipSize < 10 * 1024) {
    console.log('✓ Excellent: <10 KB gzipped');
  } else if (mainBundle.gzipSize < 50 * 1024) {
    console.log('✓ Good: <50 KB gzipped');
  } else if (mainBundle.gzipSize < 100 * 1024) {
    console.log('⚠️  Fair: <100 KB gzipped - consider optimizing');
  } else {
    console.log('❌ Large: >100 KB gzipped - optimization recommended');
  }
}

// Check for package.json
const packageJsonPath = join(buildDir, 'package.json');
if (existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  console.log(`\nPackage: ${packageJson.name}@${packageJson.version}`);
}

console.log();
