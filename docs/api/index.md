# API Reference

For detailed API documentation, see the [TypeDoc generated documentation](./generated/).

## Quick Reference

### Functions

#### `greet(name: string): string`

Returns a greeting message for the given name.

**Parameters:**
- `name` - The name to greet

**Returns:** A greeting message

**Example:**
```typescript
import { greet } from '@gfmio/template-typescript-library';

console.log(greet('World')); // "Hello, World!"
```

### Classes

#### `Calculator`

A simple calculator class for basic arithmetic operations.

**Methods:**

- `add(a: number, b: number): number` - Adds two numbers
- `subtract(a: number, b: number): number` - Subtracts b from a
- `multiply(a: number, b: number): number` - Multiplies two numbers
- `divide(a: number, b: number): number` - Divides a by b (throws on division by zero)

**Example:**
```typescript
import { Calculator } from '@gfmio/template-typescript-library';

const calc = new Calculator();
console.log(calc.add(2, 3));      // 5
console.log(calc.subtract(10, 4)); // 6
console.log(calc.multiply(5, 6));  // 30
console.log(calc.divide(15, 3));   // 5
```
