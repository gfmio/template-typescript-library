# Benchmarks

This directory contains performance benchmarks for the library using Vitest's built-in benchmarking capabilities.

## Running Benchmarks

```bash
# Run all benchmarks
bun run bench
task bench

# Run benchmarks with specific filter
bun run bench -- greet

# Run benchmarks and save results
bun run bench
```

## Benchmark Output

Benchmark results are automatically saved to `benchmarks/results.json` after each run. This file contains detailed performance metrics including:

- Operations per second (ops/sec)
- Mean execution time
- Variance and standard deviation
- Margin of error
- Sample size

## Benchmark Categories

The benchmarks are organized into several categories using descriptive tags:

### `@benchmark @performance`
Core performance benchmarks for library functions:
- `greet()` function with various input sizes
- Calculator operations (add, subtract, multiply, divide)
- Batch operations to measure throughput

### `@benchmark @performance @memory`
Memory and instantiation benchmarks:
- Calculator class instantiation overhead
- Multiple instance creation
- Instantiation + operation combined

### `@benchmark @performance @error-handling`
Error handling performance:
- Valid operations
- Error throwing and catching performance

## Understanding Results

### Operations per Second (ops/sec)
Higher is better. This shows how many times the operation can be executed per second.

### Mean Time
Lower is better. The average time it takes to execute the operation.

### Margin of Error
Indicates the reliability of the benchmark. Lower percentages mean more consistent results.

## Writing New Benchmarks

When adding new benchmarks:

1. Import the functions/classes you want to benchmark
2. Use descriptive names that explain what's being tested
3. Add appropriate tags for categorization
4. Prevent JIT optimization by using results:

```typescript
import { bench, describe } from 'vitest';
import { myFunction } from '../src/index';

describe('myFunction benchmarks', () => {
  describe('@benchmark @performance', () => {
    bench('myFunction - typical usage', () => {
      const result = myFunction(input);
      // Use the result to prevent optimization
      if (!result) throw new Error('Invalid result');
    });
  });
});
```

## Best Practices

1. **Prevent Optimization**: Always use the result of benchmarked code to prevent V8 from optimizing it away
2. **Consistent Inputs**: Use fixed input data to ensure reproducible results
3. **Warm-up**: Vitest automatically handles warm-up periods, but be aware the first few iterations may be slower
4. **Multiple Iterations**: Include both single-operation and batch benchmarks to measure different performance characteristics
5. **Realistic Data**: Use data that represents actual usage patterns
6. **Categorize**: Use tags to organize benchmarks by type and purpose

## Interpreting Performance Changes

When comparing benchmark results across versions:

- **5-10% difference**: May be within normal variance, run multiple times to confirm
- **10-25% difference**: Likely indicates a real performance change
- **>25% difference**: Significant performance impact, investigate thoroughly

Always compare results on the same hardware and under similar system load conditions.

## CI/CD Integration

Benchmarks are not run as part of the standard `validate` script to keep CI fast. Run them manually when:

- Implementing performance-critical features
- Before releasing major versions
- Investigating performance regressions
- Comparing different implementation approaches

## Benchmark Configuration

The benchmark configuration is defined in `vitest.bench.config.ts` which extends `@gfmio/config-vitest`:

```typescript
import { createBenchConfig } from '@gfmio/config-vitest';

export default createBenchConfig();
```

This provides sensible defaults including:
- Output to `benchmarks/results.json`
- Multiple reporters (default and verbose)
- Proper file matching for `*.bench.ts` files
