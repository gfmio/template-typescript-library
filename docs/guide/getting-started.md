# Getting Started

This guide will help you get started with the Template TypeScript Library.

## Installation

```bash
npm install @gfmio/template-typescript-library
```

```bash
yarn add @gfmio/template-typescript-library
```

```bash
pnpm add @gfmio/template-typescript-library
```

```bash
bun add @gfmio/template-typescript-library
```

## Basic Usage

```typescript
import { greet, Calculator } from '@gfmio/template-typescript-library';

// Using the greet function
console.log(greet('World')); // Hello, World!

// Using the Calculator class
const calc = new Calculator();
console.log(calc.add(2, 3)); // 5
```

## Development Setup

### Prerequisites

- [Bun](https://bun.sh/) >= 1.1.0
- [Task](https://taskfile.dev/) (optional)

### Clone and Install

```bash
# Clone the repository
git clone https://github.com/gfmio/template-typescript-library.git
cd template-typescript-library

# Install dependencies
bun install
```

### Available Commands

```bash
# Build the library
bun run build

# Run tests
bun run test

# Run tests in watch mode
bun run test:watch

# Type checking
bun run typecheck

# Linting
bun run lint:check

# Format code
bun run format:apply

# Generate documentation
bun run docs:typedoc

# Start VitePress dev server
bun run docs:vitepress:dev

# Validate everything
bun run validate
```

## Next Steps

- Learn about [Configuration](/guide/configuration)
- Explore the [API Reference](/api/)
