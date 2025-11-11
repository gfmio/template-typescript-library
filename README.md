# @gfmio/template-typescript-library

[![npm version](https://img.shields.io/npm/v/@gfmio/template-typescript-library.svg)](https://www.npmjs.com/package/@gfmio/template-typescript-library)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-ready template for TypeScript libraries with modern tooling and best practices.

## Features

- 🚀 **Fast Build** - [tsup](https://tsup.egoist.dev/) for blazing-fast bundling with dual CJS/ESM output
- ✅ **Type Safety** - Full TypeScript support with strict mode
- 🧪 **Testing** - [Vitest](https://vitest.dev/) for unit tests and benchmarks
- 📝 **Documentation** - [TypeDoc](https://typedoc.org/) + [VitePress](https://vitepress.dev/) for beautiful docs
- 🎨 **Code Quality** - [Biome](https://biomejs.dev/) for fast linting and formatting
- 🔄 **CI/CD** - GitHub Actions with automated releases via [Release Please](https://github.com/googleapis/release-please)
- 📦 **Clean Publishing** - Optimized package structure with minimal bundle size
- 🤖 **Automated Maintenance** - [Renovate](https://github.com/renovatebot/renovate) for dependency updates
- 🔒 **Security** - [CodeQL](https://codeql.github.com/) scanning and security policies
- 🛠️ **Developer Experience** - [Task](https://taskfile.dev/) automation, [devenv](https://devenv.sh/), pre-commit hooks, and comprehensive tooling

## Installation

```bash
npm install @gfmio/template-typescript-library
# or
yarn add @gfmio/template-typescript-library
# or
pnpm add @gfmio/template-typescript-library
# or
bun add @gfmio/template-typescript-library
```

## Quick Start

```typescript
import { greet, Calculator } from '@gfmio/template-typescript-library';

// Use the greet function
console.log(greet('World')); // "Hello, World!"

// Use the Calculator class
const calc = new Calculator();
console.log(calc.add(5, 3)); // 8
```

## Documentation

- [API Reference](https://github.com/gfmio/template-typescript-library#api) - Full API documentation
- [Examples](./examples) - Usage examples and demos
- [Publishing Guide](./docs/publishing.md) - How the clean publishing strategy works

## Development

### Quick Setup

```bash
# Clone the repository
git clone https://github.com/gfmio/template-typescript-library.git
cd template-typescript-library

# Install dependencies
task install

# Run tests in watch mode
task test:watch
```

### Common Commands

```bash
task build          # Build the library
task test           # Run tests
task validate       # Run all checks (typecheck + lint + test)
task docs:vitepress:dev  # Start documentation dev server
```

See all available commands: `task --list-all`

For detailed development instructions, see [CONTRIBUTING.md](./CONTRIBUTING.md).

### Automated Maintenance

This repository uses [Renovate](https://github.com/renovatebot/renovate) for automated dependency updates. To enable it:

1. Install the [Renovate GitHub App](https://github.com/apps/renovate) on your repository
2. Renovate will automatically create PRs for dependency updates based on the configuration in [.github/renovate.json](.github/renovate.json)

### Repository Configuration

This repository includes automated configuration via [.github/settings.yml](.github/settings.yml). To use it:

1. Install the [Probot Settings App](https://github.com/apps/settings) (optional)
2. Or configure these settings manually in your GitHub repository settings

## Project Structure

```
├── src/                 # Source code
├── benchmarks/          # Performance benchmarks
├── examples/            # Usage examples (workspaces)
├── docs/                # Documentation
├── scripts/             # Build and utility scripts
└── out/build/           # Published package (generated)
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details on:

- Setting up your development environment
- Code style and conventions
- Submitting pull requests
- Running tests and validation

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) before contributing.

## License

[MIT](LICENSE)

## Support

- 🐛 [Report a Bug](https://github.com/gfmio/template-typescript-library/issues/new?template=bug_report.md)
- 💡 [Request a Feature](https://github.com/gfmio/template-typescript-library/issues/new?template=feature_request.md)
- 💬 [Discussions](https://github.com/gfmio/template-typescript-library/discussions)

---

**Note**: This is a template repository. Use it as a starting point for your own TypeScript libraries.
