import { bench, describe } from 'vitest';
import { greet, Calculator } from '../src/index';

describe('greet() function benchmarks', () => {
  describe('@benchmark @performance', () => {
    // Test different input sizes to measure performance characteristics
    const inputs = {
      short: 'Alice',
      medium: 'Christopher',
      long: 'Bartholomew Maximilian',
      veryLong: 'A'.repeat(100),
    };

    bench('greet() - short name', () => {
      // Prevent optimization by using the result
      const result = greet(inputs.short);
      if (result.length === 0) throw new Error('Invalid result');
    });

    bench('greet() - medium name', () => {
      const result = greet(inputs.medium);
      if (result.length === 0) throw new Error('Invalid result');
    });

    bench('greet() - long name', () => {
      const result = greet(inputs.long);
      if (result.length === 0) throw new Error('Invalid result');
    });

    bench('greet() - very long name', () => {
      const result = greet(inputs.veryLong);
      if (result.length === 0) throw new Error('Invalid result');
    });

    // Batch operations to measure throughput
    bench('greet() - 1000 iterations', () => {
      for (let i = 0; i < 1000; i++) {
        const result = greet('User');
        if (result.length === 0) throw new Error('Invalid result');
      }
    });
  });
});

describe('Calculator class benchmarks', () => {
  describe('@benchmark @performance', () => {
    const calc = new Calculator();

    // Single operation benchmarks
    bench('Calculator.add() - single operation', () => {
      const result = calc.add(5, 3);
      if (result !== 8) throw new Error('Invalid result');
    });

    bench('Calculator.subtract() - single operation', () => {
      const result = calc.subtract(10, 4);
      if (result !== 6) throw new Error('Invalid result');
    });

    bench('Calculator.multiply() - single operation', () => {
      const result = calc.multiply(7, 6);
      if (result !== 42) throw new Error('Invalid result');
    });

    bench('Calculator.divide() - single operation', () => {
      const result = calc.divide(20, 4);
      if (result !== 5) throw new Error('Invalid result');
    });

    // Batch operations to measure throughput
    bench('Calculator.add() - 1000 iterations', () => {
      for (let i = 0; i < 1000; i++) {
        const result = calc.add(i, i + 1);
        if (result < 0) throw new Error('Invalid result');
      }
    });

    bench('Calculator mixed operations - 1000 iterations', () => {
      for (let i = 1; i < 1000; i++) {
        const sum = calc.add(i, i);
        const diff = calc.subtract(sum, i);
        const product = calc.multiply(diff, 2);
        const quotient = calc.divide(product, 2);
        if (quotient < 0) throw new Error('Invalid result');
      }
    });
  });
});

describe('Calculator instantiation benchmarks', () => {
  describe('@benchmark @performance @memory', () => {
    bench('Calculator - single instantiation', () => {
      const calc = new Calculator();
      // Use the instance to prevent optimization
      if (!calc) throw new Error('Invalid instance');
    });

    bench('Calculator - 100 instantiations', () => {
      const instances: Calculator[] = [];
      for (let i = 0; i < 100; i++) {
        instances.push(new Calculator());
      }
      if (instances.length === 0) throw new Error('Invalid result');
    });

    bench('Calculator - instantiation + operation', () => {
      const calc = new Calculator();
      const result = calc.add(1, 2);
      if (result !== 3) throw new Error('Invalid result');
    });
  });
});

describe('Error handling benchmarks', () => {
  describe('@benchmark @performance @error-handling', () => {
    const calc = new Calculator();

    bench('Calculator.divide() - valid division', () => {
      const result = calc.divide(10, 2);
      if (result !== 5) throw new Error('Invalid result');
    });

    bench('Calculator.divide() - error handling (try/catch)', () => {
      try {
        calc.divide(10, 0);
      } catch (error) {
        // Expected error, prevent optimization
        if (!error) throw new Error('Expected error');
      }
    });
  });
});