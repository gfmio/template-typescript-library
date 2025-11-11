#!/usr/bin/env bun

/**
 * Compare benchmark results against baseline to detect performance regressions
 *
 * Usage:
 *   bun run scripts/compare-benchmarks.ts
 *   bun run scripts/compare-benchmarks.ts --baseline benchmarks/baseline.json
 *   bun run scripts/compare-benchmarks.ts --threshold 10
 */

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

interface BenchmarkResult {
  id: string;
  name: string;
  hz: number;
  mean: number;
  rme: number;
}

interface BenchmarkSuite {
  fullName: string;
  benchmarks: BenchmarkResult[];
}

interface BenchmarkData {
  suites: BenchmarkSuite[];
}

// Parse command line arguments
const args = process.argv.slice(2);
const baselineIndex = args.indexOf('--baseline');
const baselinePath =
  baselineIndex !== -1 ? args[baselineIndex + 1] : 'benchmarks/baseline.json';

const thresholdIndex = args.indexOf('--threshold');
const threshold = thresholdIndex !== -1 ? Number(args[thresholdIndex + 1]) : 10; // 10% by default

const rootDir = join(import.meta.dir, '..');
const currentPath = join(rootDir, 'benchmarks/results.json');
const fullBaselinePath = join(rootDir, baselinePath);

// Check if files exist
if (!existsSync(currentPath)) {
  console.error('❌ Current benchmark results not found at:', currentPath);
  console.error('Run benchmarks first: task bench');
  process.exit(1);
}

if (!existsSync(fullBaselinePath)) {
  console.warn('⚠️  Baseline not found at:', fullBaselinePath);
  console.warn('Creating baseline from current results...');
  // Copy current to baseline
  const { copyFileSync } = await import('node:fs');
  copyFileSync(currentPath, fullBaselinePath);
  console.log('✓ Baseline created');
  process.exit(0);
}

// Load benchmark data
const current: BenchmarkData = JSON.parse(readFileSync(currentPath, 'utf-8'));
const baseline: BenchmarkData = JSON.parse(readFileSync(fullBaselinePath, 'utf-8'));

// Build maps for easier lookup
const currentMap = new Map<string, BenchmarkResult>();
const baselineMap = new Map<string, BenchmarkResult>();

for (const suite of current.suites) {
  for (const bench of suite.benchmarks) {
    currentMap.set(bench.id, bench);
  }
}

for (const suite of baseline.suites) {
  for (const bench of suite.benchmarks) {
    baselineMap.set(bench.id, bench);
  }
}

// Compare benchmarks
interface Comparison {
  id: string;
  name: string;
  baselineHz: number;
  currentHz: number;
  change: number;
  changePercent: number;
  isRegression: boolean;
  isImprovement: boolean;
}

const comparisons: Comparison[] = [];

for (const [id, currentBench] of currentMap) {
  const baselineBench = baselineMap.get(id);

  if (!baselineBench) {
    console.log(`ℹ️  New benchmark: ${currentBench.name}`);
    continue;
  }

  const change = currentBench.hz - baselineBench.hz;
  const changePercent = (change / baselineBench.hz) * 100;

  comparisons.push({
    change,
    changePercent,
    currentHz: currentBench.hz,
    baselineHz: baselineBench.hz,
    id,
    isImprovement: changePercent > threshold,
    isRegression: changePercent < -threshold,
    name: currentBench.name,
  });
}

// Sort by absolute change percent (biggest changes first)
comparisons.sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));

// Display results
console.log('\n📊 Benchmark Comparison\n');
console.log(`Threshold: ±${threshold}%\n`);

const regressions = comparisons.filter((c) => c.isRegression);
const improvements = comparisons.filter((c) => c.isImprovement);
const stable = comparisons.filter((c) => !c.isRegression && !c.isImprovement);

if (regressions.length > 0) {
  console.log('🔴 Performance Regressions:\n');
  for (const comp of regressions) {
    console.log(`  ${comp.name}`);
    console.log(`    Baseline:  ${comp.baselineHz.toFixed(2)} ops/sec`);
    console.log(`    Current:   ${comp.currentHz.toFixed(2)} ops/sec`);
    console.log(`    Change:    ${comp.changePercent.toFixed(2)}%\n`);
  }
}

if (improvements.length > 0) {
  console.log('🟢 Performance Improvements:\n');
  for (const comp of improvements) {
    console.log(`  ${comp.name}`);
    console.log(`    Baseline:  ${comp.baselineHz.toFixed(2)} ops/sec`);
    console.log(`    Current:   ${comp.currentHz.toFixed(2)} ops/sec`);
    console.log(`    Change:    +${comp.changePercent.toFixed(2)}%\n`);
  }
}

if (stable.length > 0) {
  console.log(`⚪ Stable (${stable.length} benchmarks within ±${threshold}%)\n`);
}

// Summary
console.log('Summary:');
console.log(`  ✓ ${improvements.length} improvements`);
console.log(`  ✗ ${regressions.length} regressions`);
console.log(`  = ${stable.length} stable`);
console.log(`  Total: ${comparisons.length} benchmarks\n`);

// Exit with error if regressions detected
if (regressions.length > 0) {
  console.error('❌ Performance regressions detected!');
  process.exit(1);
}

console.log('✓ No performance regressions detected');
