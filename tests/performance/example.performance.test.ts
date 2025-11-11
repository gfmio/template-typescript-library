import { describe, expect, it } from 'vitest';

import { Calculator, greet } from '../../src/index.ts';

/**
 * Performance Test Example
 *
 * Performance tests verify that code meets performance requirements.
 * They should:
 * - Measure execution time
 * - Test with realistic data volumes
 * - Verify memory usage patterns
 * - Check for performance regressions
 *
 * Note: For detailed benchmarking, use the benchmarks/ directory instead.
 * These are basic performance sanity checks.
 */
describe('Performance Tests', () => {
  describe('greet performance', () => {
    it('should handle many greetings quickly', () => {
      const startTime = performance.now();
      const iterations = 10000;

      for (let i = 0; i < iterations; i++) {
        greet(`User${i}`);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete 10,000 greetings in less than 100ms
      expect(duration).toBeLessThan(100);
    });

    it('should handle long strings efficiently', () => {
      const longString = 'A'.repeat(1000);
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        greet(longString);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should handle 1,000 long string greetings in less than 50ms
      expect(duration).toBeLessThan(50);
    });
  });

  describe('Calculator performance', () => {
    it('should perform calculations quickly', () => {
      const calc = new Calculator();
      const startTime = performance.now();
      const iterations = 100000;

      for (let i = 0; i < iterations; i++) {
        calc.add(i, i + 1);
        calc.subtract(i, i - 1);
        calc.multiply(i, 2);
        if (i !== 0) {
          calc.divide(i, 2);
        }
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete 400,000 operations in less than 200ms
      expect(duration).toBeLessThan(200);
    });

    it('should handle many instances efficiently', () => {
      const startTime = performance.now();
      const calculators: Calculator[] = [];

      // Create 10,000 calculator instances
      for (let i = 0; i < 10000; i++) {
        calculators.push(new Calculator());
      }

      // Use each calculator
      for (const calc of calculators) {
        calc.add(1, 1);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should handle 10,000 instances in less than 100ms
      expect(duration).toBeLessThan(100);
    });

    it('should not degrade with sequential operations', () => {
      const calc = new Calculator();
      const operations = 10000;

      // Measure first 1000 operations
      const start1 = performance.now();
      for (let i = 0; i < 1000; i++) {
        calc.add(i, i);
      }
      const duration1 = performance.now() - start1;

      // Measure next 1000 operations (after 8000 more)
      for (let i = 0; i < 8000; i++) {
        calc.add(i, i);
      }
      const start2 = performance.now();
      for (let i = 0; i < 1000; i++) {
        calc.add(i, i);
      }
      const duration2 = performance.now() - start2;

      // Performance should not degrade significantly
      // Allow up to 2x variance (performance can vary)
      expect(duration2).toBeLessThan(duration1 * 2);
    });
  });

  describe('Memory efficiency', () => {
    it('should not create excessive garbage', () => {
      const calc = new Calculator();
      const iterations = 10000;

      // Warm up
      for (let i = 0; i < 100; i++) {
        calc.add(i, i);
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const startMemory = process.memoryUsage().heapUsed;

      // Perform operations
      for (let i = 0; i < iterations; i++) {
        const result = calc.add(i, i);
        // Use the result to prevent optimization
        if (result < 0) throw new Error('Unexpected');
      }

      const endMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = endMemory - startMemory;

      // Should not use more than 1MB for 10,000 operations
      expect(memoryIncrease).toBeLessThan(1024 * 1024);
    });

    it('should handle string concatenation efficiently', () => {
      const iterations = 10000;

      // Warm up
      for (let i = 0; i < 100; i++) {
        greet(`test${i}`);
      }

      if (global.gc) {
        global.gc();
      }

      const startMemory = process.memoryUsage().heapUsed;

      // Perform string operations
      for (let i = 0; i < iterations; i++) {
        const result = greet(`User${i}`);
        // Use the result
        if (result.length === 0) throw new Error('Unexpected');
      }

      const endMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = endMemory - startMemory;

      // Should not use more than 5MB for 10,000 string operations
      expect(memoryIncrease).toBeLessThan(5 * 1024 * 1024);
    });
  });

  describe('Scalability', () => {
    it('should scale linearly with input size', () => {
      const calc = new Calculator();

      // Test with different input sizes
      const sizes = [1000, 2000, 4000];
      const durations: number[] = [];

      for (const size of sizes) {
        const start = performance.now();
        for (let i = 0; i < size; i++) {
          calc.add(i, i);
        }
        durations.push(performance.now() - start);
      }

      // Ratio between 2000 and 1000 operations
      const ratio1 = durations[1] / durations[0];

      // Ratio between 4000 and 2000 operations
      const ratio2 = durations[2] / durations[1];

      // Both ratios should be close to 2 (linear scaling)
      // Allow 3x variance due to system noise
      expect(ratio1).toBeLessThan(3);
      expect(ratio2).toBeLessThan(3);
    });
  });
});
