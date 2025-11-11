# Contributing to @gfmio/template-typescript-library

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

This project adheres to the Contributor Covenant [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to npm@gfm.io.

## Getting Started

### Prerequisites

This project uses [devenv](https://devenv.sh/) with [direnv](https://direnv.net/) to manage development dependencies. This approach ensures all tooling (yamllint, taplo, Task, etc.) is automatically available without manual installation.

#### Option 1: Dev Container / GitHub Codespaces (Easiest)

Use a pre-configured development container with everything set up:

- **VS Code**: Install [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers), then open the project and click "Reopen in Container"
- **GitHub Codespaces**: Click "Code" → "Codespaces" → "Create codespace on main"

All dependencies are automatically installed and configured. See [.devcontainer/README.md](.devcontainer/README.md) for details.

#### Option 2: Using devenv + direnv (Recommended for local development)

1. **Install Nix**: Follow instructions at [nixos.org](https://nixos.org/download.html)
2. **Install devenv**: Follow instructions at [devenv.sh](https://devenv.sh/getting-started/)
3. **Install direnv**: Follow instructions at [direnv.net](https://direnv.net/docs/installation.html)
4. **Configure direnv**: Add to your shell rc file:
   ```bash
   eval "$(direnv hook bash)"  # for bash
   eval "$(direnv hook zsh)"   # for zsh
   ```

With this setup, all dependencies (Bun, Task, yamllint, taplo, etc.) will be automatically available when you `cd` into the project directory.

#### Option 3: Manual Installation

If you prefer not to use devenv/direnv, install these manually:

- [Bun](https://bun.sh/) >= 1.1.0
- [Task](https://taskfile.dev/) >= 3.0.0
- [Git](https://git-scm.com/)
- [yamllint](https://yamllint.readthedocs.io/)
- [taplo](https://taplo.tamasfe.dev/)
- Node.js >= 22 (for npm tooling)

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/template-typescript-library.git
   cd template-typescript-library
   ```
3. **Allow direnv** (if using devenv):
   ```bash
   direnv allow
   ```
   This will automatically install all dependencies via Nix and activate the development environment.

4. **Install Node.js dependencies**:
   ```bash
   task install
   ```
5. **Create a new branch** for your work:
   ```bash
   git checkout -b feature/my-new-feature
   ```

## Development Workflow

### Available Commands

All project commands are managed through [Task](https://taskfile.dev/). To see all available commands:

```bash
task --list-all
```

### Build and Test

```bash
# Build the library
task build

# Run tests
task test

# Run tests in watch mode (recommended during development)
task test:watch

# Run tests with coverage
task test:coverage

# Run benchmarks
task bench

# Type checking
task typecheck
```

### Code Quality

Before submitting your changes, ensure your code passes all quality checks:

```bash
# Lint with Biome
task lint

# Lint and auto-fix with Biome
task fix

# Lint JSDoc comments with ESLint
task lint:eslint

# Lint and fix JSDoc
task lint:eslint:fix

# Check code formatting
task format:check

# Auto-format code with Biome
task format

# Check YAML/Markdown with Prettier
task format:prettier

# Format YAML/Markdown
task format:prettier:fix

# Lint Markdown files
task format:markdown

# Lint and fix Markdown
task format:markdown:fix

# Lint YAML files
task format:yaml

# Check TOML files
task format:toml

# Format TOML files
task format:toml:fix
```

### Comprehensive Validation

Run all checks at once before committing:

```bash
# Run all checks (lint + format)
task check

# Run all checks with auto-fix
task check:fix

# Validate everything (typecheck + all checks + test)
task validate
```

### Documentation

```bash
# Generate TypeDoc API documentation
task docs:typedoc

# Start VitePress development server
task docs:vitepress:dev

# Build VitePress documentation
task docs:vitepress:build

# Preview built documentation
task docs:vitepress:preview
```

### Examples

Test your changes with the example projects:

```bash
# Build all examples
task examples:build

# Test all examples
task examples:test

# Validate all examples
task examples:validate
```

## Making Changes

### Commit Messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Your commit messages should follow this format:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to build process or auxiliary tools
- `ci`: Changes to CI configuration files and scripts

**Examples:**
```
feat(calculator): add modulo operation
fix(greet): handle empty string input
docs(readme): update installation instructions
test(calculator): add division by zero tests
```

Commits are validated using commitlint. Invalid commit messages will be rejected.

### Code Style

- **TypeScript**: Use TypeScript for all source code
- **Formatting**: Code is automatically formatted using Biome
- **Linting**: Follow Biome's recommended rules
- **JSDoc**: Document public APIs with JSDoc comments (validated by ESLint)
- **Types**: Prefer explicit types over `any`
- **Exports**: Only export public APIs from `src/index.ts`

### Testing

- Write tests for all new features and bug fixes
- Aim for high test coverage (run `task test:coverage`)
- Use descriptive test names
- Follow the existing test patterns in `src/index.test.ts`

### Documentation

- Update JSDoc comments for any API changes
- Update the README.md if you add new features
- Update or add examples in `examples/` directory if applicable
- Generate and review API docs: `task docs:typedoc`

## Submitting Changes

### Before Submitting

1. **Validate your changes**:
   ```bash
   task validate
   ```
   This runs type checking, linting, formatting checks, and all tests.

2. **Update documentation** if needed

3. **Add tests** for new features or bug fixes

4. **Update CHANGELOG.md** following [Keep a Changelog](https://keepachangelog.com/) format (if applicable)

### Pull Request Process

1. **Push your changes** to your fork:
   ```bash
   git push origin feature/my-new-feature
   ```

2. **Open a Pull Request** on GitHub with:
   - Clear title following conventional commit format
   - Description of what changed and why
   - Reference to any related issues (e.g., "Fixes #123")
   - Screenshots or examples if applicable

3. **Wait for review**:
   - Address any feedback from maintainers
   - Keep your PR up to date with the main branch
   - CI checks must pass before merging

4. **After approval**, a maintainer will merge your PR

## Project Structure

```
.
├── src/                      # Source code
│   ├── index.ts             # Main entry point (exports)
│   └── index.test.ts        # Tests
├── benchmarks/              # Performance benchmarks
│   ├── example.bench.ts     # Benchmark files
│   └── README.md            # Benchmark documentation
├── examples/                # Example projects (workspaces)
│   └── basic/               # Basic usage example
├── docs/                    # Documentation
│   ├── .vitepress/          # VitePress config
│   ├── guide/               # User guides
│   └── api/                 # API reference (auto-generated)
├── scripts/                 # Build and utility scripts
│   └── prepare-package.ts   # Package preparation for publishing
├── out/                     # Build output (gitignored)
│   └── build/               # Published package contents
├── package.json             # Package configuration
├── tsconfig.json            # TypeScript configuration
├── tsup.config.ts           # Build configuration
├── vitest.config.ts         # Test configuration
├── vitest.bench.config.ts   # Benchmark configuration
├── biome.json               # Biome configuration
├── eslint.config.mjs        # ESLint configuration (JSDoc only)
├── .prettierrc.json         # Prettier configuration (YAML/MD only)
├── taplo.toml               # TOML formatter configuration
├── Taskfile.yml             # Task automation
└── README.md                # Project overview
```

## Release Process

Releases are automated using [Release Please](https://github.com/googleapis/release-please):

1. Make changes following conventional commits
2. Release Please creates/updates a release PR automatically
3. When the release PR is merged, it:
   - Creates a GitHub release
   - Publishes to npm automatically
   - Updates CHANGELOG.md

You don't need to manually bump versions or create releases.

## Tooling Reference

### Biome
- **Purpose**: Fast linting and formatting for TypeScript/JavaScript/JSON
- **Config**: `biome.json`
- **Commands**: `task lint`, `task format`, `task check`

### ESLint
- **Purpose**: JSDoc validation only
- **Config**: `eslint.config.mjs`
- **Commands**: `task lint:eslint`

### Prettier
- **Purpose**: Format YAML and Markdown files only
- **Config**: `.prettierrc.json`
- **Commands**: `task format:prettier`

### Markdownlint
- **Purpose**: Markdown linting
- **Config**: `.markdownlint.json`
- **Commands**: `task format:markdown`

### Yamllint
- **Purpose**: YAML linting
- **Config**: `.yamllint.yml`
- **Commands**: `task format:yaml`

### Taplo
- **Purpose**: TOML formatting
- **Config**: `taplo.toml`
- **Commands**: `task format:toml`

### TypeScript
- **Config**: `tsconfig.json` (extends `@gfmio/tsconfig/library.json`)
- **Commands**: `task typecheck`

### tsup
- **Purpose**: Fast TypeScript bundler
- **Config**: `tsup.config.ts` (uses `@gfmio/config-tsup`)
- **Output**: CJS, ESM, and TypeScript declarations
- **Commands**: `task build`

### Vitest
- **Purpose**: Fast unit testing and benchmarking
- **Config**: `vitest.config.ts` (tests), `vitest.bench.config.ts` (benchmarks)
- **Commands**: `task test`, `task bench`

### TypeDoc
- **Purpose**: API documentation generation
- **Config**: `typedoc.config.ts` (uses `@gfmio/config-typedoc`)
- **Commands**: `task docs:typedoc`

### VitePress
- **Purpose**: Documentation site
- **Config**: `docs/.vitepress/config.ts`
- **Commands**: `task docs:vitepress:dev`

## Getting Help

- **Questions**: Open a [GitHub Discussion](https://github.com/gfmio/template-typescript-library/discussions)
- **Bug Reports**: Open a [GitHub Issue](https://github.com/gfmio/template-typescript-library/issues)
- **Security Issues**: Email npm@gfm.io privately

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
