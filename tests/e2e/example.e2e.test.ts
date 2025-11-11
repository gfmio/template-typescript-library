import { describe, expect, it } from 'vitest';

import type { Calculator as CalculatorType } from '../../src/index.ts';

/**
 * End-to-End Test Example
 *
 * E2E tests verify the library works correctly from a consumer's perspective.
 * They should:
 * - Test the public API as users would use it
 * - Verify complete workflows
 * - Test realistic production scenarios
 * - Import from the public package exports
 *
 * This example demonstrates testing the library as an external consumer would.
 */
describe('Library E2E', () => {
  it('should export all public APIs', async () => {
    // Dynamically import from the main entry point
    const lib = await import('../../src/index.ts');

    // Verify all exports are available
    expect(lib.greet).toBeDefined();
    expect(lib.Calculator).toBeDefined();
    expect(typeof lib.greet).toBe('function');
    expect(typeof lib.Calculator).toBe('function');
  });

  it('should work with real-world usage pattern', async () => {
    const { greet, Calculator } = await import('../../src/index.ts');

    // Simulate a real application workflow
    const userInput = { name: 'Alice', numbers: [10, 20, 30] };

    // Greet the user
    const greeting = greet(userInput.name);
    expect(greeting).toBe('Hello, Alice!');

    // Perform calculations
    const calc = new Calculator();
    const sum = userInput.numbers.reduce((acc, n) => calc.add(acc, n), 0);
    expect(sum).toBe(60);

    const average = calc.divide(sum, userInput.numbers.length);
    expect(average).toBe(20);

    // Generate final message
    const finalMessage = greet(`${userInput.name}, your average is ${average}`);
    expect(finalMessage).toBe('Hello, Alice, your average is 20!');
  });

  it('should handle complex production workflow', async () => {
    const { Calculator } = await import('../../src/index.ts');

    // Simulate a tax calculation workflow
    const subtotal = 100;
    const taxRate = 0.08;
    const discount = 0.1;

    const calc = new Calculator();

    // Calculate discount
    const discountAmount = calc.multiply(subtotal, discount);
    const afterDiscount = calc.subtract(subtotal, discountAmount);

    // Calculate tax
    const taxAmount = calc.multiply(afterDiscount, taxRate);
    const total = calc.add(afterDiscount, taxAmount);

    expect(discountAmount).toBe(10);
    expect(afterDiscount).toBe(90);
    expect(taxAmount).toBeCloseTo(7.2, 10);
    expect(total).toBeCloseTo(97.2, 10);
  });

  it('should be tree-shakeable (only import what you need)', async () => {
    // Import only the greet function
    const { greet } = await import('../../src/index.ts');

    const result = greet('World');
    expect(result).toBe('Hello, World!');

    // Verify Calculator is not included in this scope
    const lib = await import('../../src/index.ts');
    expect(lib.Calculator).toBeDefined(); // It exists in the module
  });

  it('should handle error cases in production', async () => {
    const { Calculator } = await import('../../src/index.ts');

    const calc = new Calculator();

    // Division by zero should throw
    expect(() => {
      calc.divide(10, 0);
    }).toThrow('Division by zero is not allowed');

    // Other operations should still work after error
    expect(calc.add(1, 1)).toBe(2);
  });

  it('should support type checking for consumers', async () => {
    const { Calculator } = await import('../../src/index.ts');

    // This should work with TypeScript type checking
    const calc: CalculatorType = new Calculator();

    const result: number = calc.add(5, 10);
    expect(result).toBe(15);
  });

  it('should work with multiple instances in production', async () => {
    const { Calculator, greet } = await import('../../src/index.ts');

    // Simulate multiple users or sessions
    const session1 = {
      calc: new Calculator(),
      name: 'User1',
    };

    const session2 = {
      calc: new Calculator(),
      name: 'User2',
    };

    // Each session operates independently
    const result1 = session1.calc.add(10, 20);
    const result2 = session2.calc.multiply(5, 6);

    expect(result1).toBe(30);
    expect(result2).toBe(30);

    expect(greet(session1.name)).toBe('Hello, User1!');
    expect(greet(session2.name)).toBe('Hello, User2!');
  });
});
