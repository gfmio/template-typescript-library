import { describe, expect, it } from 'vitest';

import { Calculator, greet } from '../../src/index.ts';

/**
 * Integration Test Example
 *
 * Integration tests verify that multiple components work together correctly.
 * They should:
 * - Test interactions between multiple units
 * - Verify data flow between components
 * - Test realistic usage scenarios
 *
 * This example demonstrates testing multiple functions working together.
 */
describe('Library Integration', () => {
  it('should use calculator and greet together', () => {
    const calc = new Calculator();
    const sum = calc.add(2, 3);
    const greeting = greet(`User ${sum}`);

    expect(greeting).toBe('Hello, User 5!');
  });

  it('should perform complex calculations and format results', () => {
    const calc = new Calculator();

    // Perform a series of operations
    const step1 = calc.add(10, 5); // 15
    const step2 = calc.multiply(step1, 2); // 30
    const step3 = calc.divide(step2, 3); // 10
    const result = calc.subtract(step3, 2); // 8

    expect(result).toBe(8);

    // Use the result in a greeting
    const message = greet(`Result is ${result}`);
    expect(message).toBe('Hello, Result is 8!');
  });

  it('should handle multiple calculator instances', () => {
    const calc1 = new Calculator();
    const calc2 = new Calculator();

    const result1 = calc1.add(5, 5);
    const result2 = calc2.multiply(result1, 2);

    expect(result1).toBe(10);
    expect(result2).toBe(20);
  });

  it('should format calculations in greetings', () => {
    const calc = new Calculator();
    const operations = [
      { a: 10, b: 5, op: 'add', expected: 15 },
      { a: 10, b: 5, op: 'subtract', expected: 5 },
      { a: 10, b: 5, op: 'multiply', expected: 50 },
      { a: 10, b: 5, op: 'divide', expected: 2 },
    ];

    for (const { a, b, op, expected } of operations) {
      let result: number;
      switch (op) {
        case 'add':
          result = calc.add(a, b);
          break;
        case 'subtract':
          result = calc.subtract(a, b);
          break;
        case 'multiply':
          result = calc.multiply(a, b);
          break;
        case 'divide':
          result = calc.divide(a, b);
          break;
        default:
          throw new Error(`Unknown operation: ${op}`);
      }

      expect(result).toBe(expected);
      const greeting = greet(`${a} ${op} ${b} = ${result}`);
      expect(greeting).toContain(`${expected}`);
    }
  });
});
