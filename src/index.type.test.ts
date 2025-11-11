/**
 * Type Test Example
 *
 * Type tests verify that TypeScript types work correctly.
 * They should:
 * - Test type inference
 * - Verify type compatibility
 * - Check generic constraints
 * - Ensure proper type narrowing
 *
 * These tests don't run at runtime - they only check TypeScript compilation.
 * Use @ts-expect-error to test that invalid code correctly produces type errors.
 */

import { describe, expectTypeOf, it } from 'vitest';

import type { Calculator } from './index.ts';
import { Calculator as CalculatorClass, greet } from './index.ts';

describe('Type Tests', () => {
  describe('greet function types', () => {
    it('should accept string parameter', () => {
      expectTypeOf(greet).toBeFunction();
      expectTypeOf(greet).parameter(0).toBeString();
    });

    it('should return string', () => {
      expectTypeOf(greet).returns.toBeString();
    });

    it('should infer return type correctly', () => {
      const result = greet('test');
      expectTypeOf(result).toBeString();
    });

    it('should not accept non-string parameters', () => {
      // @ts-expect-error - number is not assignable to string
      greet(123);

      // @ts-expect-error - object is not assignable to string
      greet({});

      // @ts-expect-error - undefined is not assignable to string
      greet();
    });
  });

  describe('Calculator class types', () => {
    it('should be a class constructor', () => {
      expectTypeOf(CalculatorClass).toBeConstructibleWith();
    });

    it('should create Calculator instance', () => {
      const calc = new CalculatorClass();
      expectTypeOf(calc).toMatchTypeOf<Calculator>();
    });

    it('should have correct method signatures', () => {
      const calc = new CalculatorClass();

      expectTypeOf(calc.add).toBeFunction();
      expectTypeOf(calc.add).parameters.toMatchTypeOf<[number, number]>();
      expectTypeOf(calc.add).returns.toBeNumber();

      expectTypeOf(calc.subtract).toBeFunction();
      expectTypeOf(calc.subtract).parameters.toMatchTypeOf<[number, number]>();
      expectTypeOf(calc.subtract).returns.toBeNumber();

      expectTypeOf(calc.multiply).toBeFunction();
      expectTypeOf(calc.multiply).parameters.toMatchTypeOf<[number, number]>();
      expectTypeOf(calc.multiply).returns.toBeNumber();

      expectTypeOf(calc.divide).toBeFunction();
      expectTypeOf(calc.divide).parameters.toMatchTypeOf<[number, number]>();
      expectTypeOf(calc.divide).returns.toBeNumber();
    });

    it('should not accept wrong parameter types', () => {
      const calc = new CalculatorClass();

      // @ts-expect-error - string is not assignable to number
      calc.add('1', '2');

      // @ts-expect-error - missing second parameter
      calc.add(1);

      // @ts-expect-error - too many parameters
      calc.add(1, 2, 3);

      // @ts-expect-error - wrong type for first parameter
      calc.subtract('10', 5);

      // @ts-expect-error - wrong type for second parameter
      calc.multiply(10, '5');

      // @ts-expect-error - undefined is not assignable to number
      calc.divide(10, undefined);
    });

    it('should infer correct return types', () => {
      const calc = new CalculatorClass();

      const sum = calc.add(1, 2);
      expectTypeOf(sum).toBeNumber();

      const difference = calc.subtract(10, 5);
      expectTypeOf(difference).toBeNumber();

      const product = calc.multiply(3, 4);
      expectTypeOf(product).toBeNumber();

      const quotient = calc.divide(10, 2);
      expectTypeOf(quotient).toBeNumber();
    });
  });

  describe('Type exports', () => {
    it('should export Calculator as both type and value', () => {
      // Type export
      expectTypeOf<Calculator>().not.toBeAny();

      // Value export
      expectTypeOf(CalculatorClass).toBeConstructibleWith();
    });

    it('should allow Calculator type in type positions', () => {
      // Can use as type annotation
      const calc: Calculator = new CalculatorClass();
      expectTypeOf(calc).toMatchTypeOf<Calculator>();

      // Can use in function parameter
      const useCalculator = (calculator: Calculator): number => {
        return calculator.add(1, 2);
      };

      expectTypeOf(useCalculator).parameter(0).toMatchTypeOf<Calculator>();
    });

    it('should support type inference in generic contexts', () => {
      // Array of calculators
      const calculators: Calculator[] = [new CalculatorClass(), new CalculatorClass()];
      expectTypeOf(calculators).toMatchTypeOf<Calculator[]>();

      // Promise of calculator
      const promiseCalc: Promise<Calculator> = Promise.resolve(new CalculatorClass());
      expectTypeOf(promiseCalc).toMatchTypeOf<Promise<Calculator>>();

      // Record with calculator
      const record: Record<string, Calculator> = {
        calc1: new CalculatorClass(),
      };
      expectTypeOf(record).toMatchTypeOf<Record<string, Calculator>>();
    });
  });

  describe('Type narrowing and guards', () => {
    it('should work with typeof checks', () => {
      const maybeString: string | number = 'test';

      if (typeof maybeString === 'string') {
        const result = greet(maybeString);
        expectTypeOf(result).toBeString();
      }
    });

    it('should work with instanceof checks', () => {
      const maybeCalc: Calculator | null = new CalculatorClass();

      if (maybeCalc instanceof CalculatorClass) {
        const result = maybeCalc.add(1, 2);
        expectTypeOf(result).toBeNumber();
      }
    });
  });

  describe('Immutability', () => {
    it('should not allow modification of Calculator methods', () => {
      const calc = new CalculatorClass();

      // @ts-expect-error - cannot assign to method
      calc.add = () => 0;
    });
  });

  describe('Type compatibility', () => {
    it('should be compatible with number operations', () => {
      const calc = new CalculatorClass();

      const result = calc.add(1, 2);

      // Should work with number operations
      const doubled = result * 2;
      expectTypeOf(doubled).toBeNumber();

      const stringified = result.toString();
      expectTypeOf(stringified).toBeString();

      const fixed = result.toFixed(2);
      expectTypeOf(fixed).toBeString();
    });

    it('should be compatible with string operations', () => {
      const greeting = greet('World');

      // Should work with string operations
      const upper = greeting.toUpperCase();
      expectTypeOf(upper).toBeString();

      const length = greeting.length;
      expectTypeOf(length).toBeNumber();

      const includes = greeting.includes('Hello');
      expectTypeOf(includes).toBeBoolean();
    });
  });
});
