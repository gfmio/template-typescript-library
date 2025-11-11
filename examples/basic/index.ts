import { Calculator, greet } from '@gfmio/template-typescript-library';

// Example: Using the greet function
console.log(greet('World'));
console.log(greet('TypeScript'));

// Example: Using the Calculator class
const calc = new Calculator();

console.log('\nCalculator Examples:');
console.log(`2 + 3 = ${calc.add(2, 3)}`);
console.log(`10 - 4 = ${calc.subtract(10, 4)}`);
console.log(`5 * 6 = ${calc.multiply(5, 6)}`);
console.log(`15 / 3 = ${calc.divide(15, 3)}`);

// Example: Error handling
try {
  calc.divide(10, 0);
} catch (error) {
  console.log(`\nError caught: ${error instanceof Error ? error.message : String(error)}`);
}
