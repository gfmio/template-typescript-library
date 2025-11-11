import { describe, expect, it } from 'vitest';

import { Calculator, greet } from './index.ts';

/**
 * Unit Test Example
 *
 * Unit tests focus on testing individual functions or classes in isolation.
 * They should be:
 * - Fast to execute
 * - Independent of external dependencies
 * - Testing a single unit of functionality
 *
 * This example demonstrates testing the Calculator class in isolation.
 */

describe('greet', () => {
  it('should return a greeting message', () => {
    expect(greet('World')).toBe('Hello, World!');
  });

  it('should handle empty strings', () => {
    expect(greet('')).toBe('Hello, !');
  });

  it('should handle special characters', () => {
    expect(greet('Alice & Bob')).toBe('Hello, Alice & Bob!');
  });
});

describe('Calculator', () => {
  const calc = new Calculator();

  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(calc.add(2, 3)).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(calc.add(-2, -3)).toBe(-5);
    });

    it('should add zero', () => {
      expect(calc.add(5, 0)).toBe(5);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers', () => {
      expect(calc.subtract(5, 3)).toBe(2);
    });

    it('should handle negative results', () => {
      expect(calc.subtract(3, 5)).toBe(-2);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(calc.multiply(3, 4)).toBe(12);
    });

    it('should handle multiplication by zero', () => {
      expect(calc.multiply(5, 0)).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(calc.multiply(-3, 4)).toBe(-12);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(calc.divide(10, 2)).toBe(5);
    });

    it('should handle decimal results', () => {
      expect(calc.divide(10, 3)).toBeCloseTo(3.333, 3);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => calc.divide(10, 0)).toThrow('Division by zero is not allowed');
    });
  });
});
