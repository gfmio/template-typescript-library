# AI Instructions for TypeScript Library Projects

This document provides comprehensive instructions for AI assistants working on TypeScript library projects based on this template. Following these guidelines will ensure effective, high-quality contributions.

## Project Overview

This is a **TypeScript library template** designed for creating modern, well-tested, and well-documented npm packages. The project emphasizes:

- **Type safety**: Strict TypeScript with comprehensive type checking
- **Quality**: Multi-layered linting, formatting, and validation
- **Testing**: Unit, integration, e2e, performance, and type tests
- **Documentation**: Auto-generated API docs and versioned user guides
- **Developer experience**: Automated workflows, pre-commit hooks, and clear error messages
- **Reproducibility**: Nix-based development environment with devenv

## Core Technologies

### Build & Runtime
- **Bun**: Primary runtime and package manager (fast, modern alternative to Node.js/npm)
- **TypeScript**: Strict mode with comprehensive type checking
- **tsup**: Fast bundler for TypeScript libraries (outputs CJS, ESM, and type declarations)

### Code Quality
- **Biome**: Primary linter and formatter (fast, opinionated, replaces ESLint + Prettier for TS/JS/JSON)
- **ESLint**: JSDoc validation only (with `eslint-plugin-jsdoc`)
- **Prettier**: YAML and Markdown formatting only
- **markdownlint**: Markdown linting
- **yamllint**: YAML linting (via Nix, not npm)
- **taplo**: TOML formatting (via Nix, not npm)

### Testing & Benchmarking
- **Vitest**: Fast unit testing framework with coverage support
- **Benchmark support**: Performance testing with Vitest bench mode

### Documentation
- **TypeDoc**: Auto-generated API documentation from JSDoc comments
- **VitePress**: Documentation site with versioning support

### Task Automation
- **Task (go-task)**: Modern task runner (replaces npm scripts)
- **Two-layer task architecture**:
  - `tasks/tools/`: Direct tool wrappers (biome, vitest, tsc, etc.)
  - `tasks/logical/`: High-level workflows (lint, format, test, build, ci, etc.)

### Development Environment
- **devenv**: Nix-based reproducible development environments
- **direnv**: Automatic environment activation
- **Dev Containers**: VSCode/Codespaces support

## Project Structure

```
.
├── src/                      # TypeScript source code
│   ├── index.ts             # Main entry point (public API exports)
│   └── *.test.ts            # Co-located unit tests
├── tests/                   # Additional test suites
│   ├── unit/                # Unit tests
│   ├── integration/         # Integration tests
│   ├── e2e/                 # End-to-end tests
│   ├── performance/         # Performance tests
│   └── types/               # Type tests
├── benchmarks/              # Performance benchmarks
├── examples/                # Usage examples (Bun workspaces)
├── docs/                    # VitePress documentation
│   ├── .vitepress/          # VitePress config
│   ├── guide/               # User guides
│   └── api/                 # API reference (auto-generated)
├── scripts/                 # Build and utility scripts
├── tasks/                   # Task definitions
│   ├── tools/               # Tool-specific tasks
│   └── logical/             # Workflow tasks
├── out/                     # Build output (gitignored)
│   └── build/               # Publishable package contents
├── package.json             # Package configuration
├── Taskfile.yml             # Root task configuration
├── tsconfig.json            # TypeScript configuration
├── biome.json               # Biome configuration
├── vitest.config.ts         # Vitest configuration
└── devenv.nix               # Development environment
```

## Key Principles

### 1. Build Output is Separate from Source

- **Source**: `src/` directory contains TypeScript source
- **Build output**: `out/build/` directory contains compiled code
- **Publishing**: Only `out/build/` contents are published to npm
- The build process (`scripts/prepare-package.ts`) copies and modifies `package.json` for publishing
- **Never** import from `out/` in source code
- **Never** commit `out/` directory (it's gitignored)

### 2. Multiple Test Types

Support different test patterns using filename conventions:
- `*.test.ts` or `*.spec.ts`: General tests
- `*.unit.test.ts`: Unit tests (fast, isolated)
- `*.integration.test.ts`: Integration tests (multiple components)
- `*.e2e.test.ts`: End-to-end tests (full system)
- `*.performance.test.ts`: Performance tests
- `*.type.test.ts`: Type-level tests

### 3. Task-Based Workflows

**Never use npm scripts** - all automation is through Task:
- Use `task <name>` to run tasks, not `npm run <name>`
- Task definitions are in `Taskfile.yml` and `tasks/` directory
- Tasks support incremental builds (checksums in `.task/` directory)
- Common tasks:
  - `task install`: Install dependencies
  - `task build`: Build the library
  - `task test`: Run all tests
  - `task lint`: Check code quality
  - `task format`: Format code
  - `task validate`: Run all CI checks locally

### 4. Strict Quality Standards

Code must pass **all** of these before committing:
1. **Type checking**: `task typecheck` (no TypeScript errors)
2. **Linting**: `task lint:check` (Biome + ESLint for JSDoc)
3. **Formatting**: `task format:check` (Biome + Prettier + markdownlint + yamllint + taplo)
4. **Tests**: `task test` (all tests passing with good coverage)
5. **Build**: `task build` (successful compilation)

Run `task validate` to check everything at once.

### 5. Conventional Commits

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/):
- Format: `<type>(<scope>): <description>`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`
- Validated by commitlint
- Used for automatic changelog generation and semantic versioning

## Working with Code

### TypeScript Best Practices

1. **Use strict TypeScript**:
   - Enable all strict mode options
   - Avoid `any` - use `unknown` if type is truly unknown
   - Prefer explicit return types on exported functions
   - Use const assertions where appropriate

2. **Export patterns**:
   - Only export public API from `src/index.ts`
   - Keep internal utilities private (don't export)
   - Use named exports (avoid default exports)

3. **Documentation**:
   - Add JSDoc comments to all exported functions, classes, and types
   - Include `@param`, `@returns`, `@throws` tags
   - Provide usage examples in JSDoc when helpful
   - ESLint validates JSDoc completeness

### Testing Best Practices

1. **Write comprehensive tests**:
   - Aim for >90% code coverage
   - Test happy paths and error cases
   - Use descriptive test names: `it('should throw error when input is negative')`
   - Group related tests with `describe` blocks

2. **Test organization**:
   - Co-locate unit tests with source: `src/utils.ts` → `src/utils.test.ts`
   - Put integration/e2e tests in `tests/` directory
   - Use appropriate test type suffixes

3. **Performance tests**:
   - Use Vitest bench mode for benchmarks
   - Store benchmarks in `benchmarks/` directory
   - Run with `task bench`

### Code Quality Workflow

1. **During development**:
   ```bash
   task test:watch        # Run tests in watch mode
   task typecheck        # Check types
   task lint:check       # Check linting
   ```

2. **Before committing**:
   ```bash
   task validate         # Run all checks
   task format          # Auto-format code
   ```

3. **Fix issues automatically**:
   ```bash
   task lint:fix         # Fix auto-fixable lint issues
   task format:fix       # Format all files
   ```

## Working with Tasks

### Understanding the Task System

Tasks are organized in two layers:

1. **Tool layer** (`tasks/tools/*.yml`):
   - Direct wrappers around specific tools
   - Example: `tasks/tools/biome.yml` contains `biome:check`, `biome:format`, etc.
   - These are implementation details

2. **Logical layer** (`tasks/logical/*.yml`):
   - High-level, intent-revealing workflows
   - Example: `tasks/logical/lint.yml` orchestrates `biome:check` + `eslint:check`
   - These are what developers use

### Common Task Patterns

**Checking vs. Fixing**:
- `task lint:check`: Check for issues (fails on error)
- `task lint:fix`: Fix issues automatically
- `task format:check`: Check formatting (fails on error)
- `task format:fix`: Format files

**Watch mode**:
- Many tasks support `:watch` suffix for continuous monitoring
- Example: `task test:watch`, `task build:watch`

**CI-specific tasks**:
- `task ci:*`: Variants optimized for CI (frozen lockfile, verbose output, etc.)

### Adding New Tasks

1. **Create tool wrapper** in `tasks/tools/`:
   ```yaml
   # tasks/tools/mytool.yml
   version: "3"
   tasks:
     mytool:check:
       desc: Check with mytool
       cmds:
         - mytool check
     mytool:fix:
       desc: Fix with mytool
       cmds:
         - mytool fix --write
   ```

2. **Add to root Taskfile**:
   ```yaml
   # Taskfile.yml
   includes:
     tools-mytool:
       taskfile: ./tasks/tools/mytool.yml
       flatten: true
   ```

3. **Integrate into logical workflow**:
   ```yaml
   # tasks/logical/lint.yml
   tasks:
     lint:check:
       cmds:
         - task: biome:check
         - task: mytool:check  # Add here
   ```

## Working with Dependencies

### Installing Dependencies

```bash
task install              # Install with package.json versions
task install:frozen       # Install with frozen lockfile (CI)
```

### Adding Dependencies

1. Add to `package.json` manually or via Bun:
   ```bash
   bun add <package>           # Production dependency
   bun add -D <package>        # Dev dependency
   ```

2. Run `task install` to update lockfile

3. Commit both `package.json` and `bun.lock`

### Workspace Dependencies

Examples are Bun workspaces and reference the library via `workspace:*`:
- Examples depend on the **built** library (`out/build/`)
- Always run `task build` before working with examples
- Example tasks have `deps: [build]` to ensure library is built first

## Working with Examples

### Structure

Examples are in `examples/` directory:
- Each example is a separate Bun workspace
- Examples use `workspace:*` to reference the library
- Each example has its own `Taskfile.yml` and `package.json`

### Running Examples

```bash
task examples:basic       # Run the basic example
task examples            # Run all examples
```

### Creating New Examples

1. Create directory: `examples/my-example/`
2. Add `package.json`:
   ```json
   {
     "name": "example-my-example",
     "private": true,
     "type": "module",
     "dependencies": {
       "@your-org/your-package": "workspace:*"
     }
   }
   ```
3. Add `Taskfile.yml`:
   ```yaml
   version: "3"
   tasks:
     default:
       desc: Run the example
       cmd: bun run index.ts
       silent: true
   ```
4. Add to workspace in root `package.json`:
   ```json
   {
     "workspaces": ["examples/*"]
   }
   ```

## Working with Documentation

### API Documentation (TypeDoc)

1. **Write JSDoc comments**:
   ```typescript
   /**
    * Calculates the sum of two numbers.
    *
    * @param a - The first number
    * @param b - The second number
    * @returns The sum of a and b
    * @throws {TypeError} If either parameter is not a number
    *
    * @example
    * ```typescript
    * add(2, 3); // Returns 5
    * ```
    */
   export function add(a: number, b: number): number {
     return a + b;
   }
   ```

2. **Generate docs**:
   ```bash
   task docs:typedoc        # Generate API docs to out/docs/api/
   ```

### User Documentation (VitePress)

1. **Edit markdown files** in `docs/`:
   - `docs/guide/`: User guides
   - `docs/index.md`: Homepage

2. **Develop locally**:
   ```bash
   task docs:vitepress:dev  # Start dev server at http://localhost:5173
   ```

3. **Build**:
   ```bash
   task docs:vitepress:build  # Build to out/docs/site/
   ```

### Versioning Documentation

Create a snapshot of current docs for a specific version:
```bash
task docs:version -- 1.0.0   # Creates docs/1.0.0/ directory
```

## CI/CD Workflow

### GitHub Actions

The CI workflow (`.github/workflows/ci.yml`) runs:
1. Install Nix and devenv (reproducible environment)
2. Install dependencies (with frozen lockfile)
3. Type check (TypeScript)
4. Lint (Biome + ESLint)
5. Format check (Biome + Prettier + markdownlint + yamllint + taplo)
6. Build (tsup)
7. Test (Vitest with coverage)
8. Run examples
9. Build documentation
10. Lint commit messages (commitlint)

All steps run with `continue-on-error: true` and a final status check reports all failures.

### Publishing

Publishing is automated via Release Please:
1. Make commits following conventional commit format
2. Release Please creates/updates a release PR automatically
3. When merged, it:
   - Updates CHANGELOG.md
   - Creates a GitHub release
   - Publishes to npm
   - Bumps version (semantic versioning)

**Never manually**:
- Bump version numbers
- Update CHANGELOG.md
- Publish to npm
- Create GitHub releases

## Development Environment

### Using devenv (Recommended)

1. **Install prerequisites**:
   - Nix
   - devenv
   - direnv

2. **Activate environment**:
   ```bash
   cd project-directory  # direnv auto-activates
   direnv allow         # First time only
   ```

3. **All tools available**:
   - Bun, Node.js, Task, yamllint, taplo, etc.
   - No manual installation needed

### Using Dev Container

1. **Open in VS Code** with Dev Containers extension
2. **Click "Reopen in Container"**
3. **Wait for setup** (first time only)
4. **All tools pre-installed and configured**

### Manual Installation

If not using devenv:
- Install Bun, Task, Git, yamllint, taplo manually
- Follow versions specified in `devenv.nix`

## Common Pitfalls & Solutions

### Problem: Tests fail after changing code

**Solution**: Run `task test` to see failures, fix issues, ensure coverage is maintained.

### Problem: Linting errors

**Solution**:
1. Try auto-fix: `task lint:fix`
2. If still failing: `task lint:check` to see remaining issues
3. Fix manually or adjust Biome config if rule is too strict

### Problem: Type errors in examples

**Solution**:
1. Ensure library is built: `task build`
2. Check `out/build/index.d.ts` exists
3. Examples reference `workspace:*` which resolves to `out/build/`

### Problem: Import errors

**Solution**:
- Import from `@your-org/your-package`, not relative paths outside `src/`
- Use named imports: `import { foo } from '...'`
- Check exports in `src/index.ts`

### Problem: Task not found

**Solution**:
1. Check task exists: `task --list-all`
2. Check Taskfile includes the tool: `Taskfile.yml` → `includes:`
3. Ensure task file exists in `tasks/tools/` or `tasks/logical/`

## AI-Specific Behavioral Guidelines

### Code Changes

1. **Read before editing**:
   - Always read files with the Read tool before editing
   - Never edit files you haven't read in this conversation
   - Understand existing patterns before changing them

2. **Preserve existing style**:
   - Match indentation (spaces vs tabs)
   - Follow existing naming conventions
   - Maintain consistency with surrounding code

3. **Validate changes**:
   - After code changes, suggest running `task validate`
   - Consider impact on tests, types, and documentation
   - Update tests if behavior changes

### Communication

1. **Be concise**:
   - Provide clear, actionable responses
   - Use code blocks with syntax highlighting
   - Reference file paths with line numbers: `src/index.ts:42`

2. **Explain reasoning**:
   - When making architectural decisions, explain trade-offs
   - Reference this document or TypeScript best practices
   - Justify departures from established patterns

3. **Provide context**:
   - When suggesting changes, show before/after
   - Explain how changes fit into the larger system
   - Link to relevant documentation

### Task Management

1. **Use the TodoWrite tool**:
   - For multi-step tasks, create a todo list
   - Mark items in_progress before starting
   - Mark completed immediately after finishing
   - Keep user informed of progress

2. **Break down complex tasks**:
   - Split large changes into logical steps
   - Complete and test each step before moving on
   - Commit frequently with good messages

### Error Handling

1. **Anticipate errors**:
   - Check for edge cases in code
   - Add appropriate error handling
   - Document error conditions in JSDoc

2. **Debug systematically**:
   - Read error messages carefully
   - Check relevant files and configurations
   - Suggest specific commands to diagnose issues

## Quick Reference

### Essential Commands

```bash
# Setup
task install              # Install dependencies
task setup               # Full project setup (install, typecheck, build, lint, test)

# Development
task build               # Build library
task test                # Run all tests
task test:watch          # Run tests in watch mode
task typecheck           # Type check
task lint                # Lint code
task format              # Format code

# Validation
task validate            # Run all CI checks locally

# Documentation
task docs:typedoc        # Generate API docs
task docs:vitepress:dev  # Start docs dev server

# Examples
task examples:basic      # Run basic example

# CI tasks (used in GitHub Actions)
task ci:install          # Install with frozen lockfile
task ci:typecheck        # Type check for CI
task ci:lint             # Lint for CI
task ci:format           # Format check for CI
task ci:build            # Build for CI
task ci:test             # Test for CI
task ci:docs             # Build docs for CI
task ci:examples         # Run examples for CI
```

### File Locations

- Source code: `src/`
- Tests: `src/**/*.test.ts`, `tests/`
- Build output: `out/build/`
- Documentation: `docs/`
- Examples: `examples/`
- Tasks: `Taskfile.yml`, `tasks/`
- Configs: `*.config.ts`, `*.json` in root

### Getting Help

- Project docs: `README.md`, `CONTRIBUTING.md`
- Task list: `task --list-all`
- CI workflow: `.github/workflows/ci.yml`
- Dev environment: `devenv.nix`, `.devcontainer/`

## Summary

When working on TypeScript library projects based on this template:

1. **Use Task for all automation** (not npm scripts)
2. **Maintain strict type safety** (no `any`, comprehensive JSDoc)
3. **Write comprehensive tests** (unit, integration, e2e)
4. **Follow quality standards** (lint, format, typecheck)
5. **Use conventional commits** (for automatic releases)
6. **Keep build separate** (`src/` vs `out/build/`)
7. **Document thoroughly** (JSDoc + user guides)
8. **Leverage devenv** (reproducible environments)
9. **Validate before committing** (`task validate`)
10. **Let automation handle releases** (Release Please)

Following these guidelines will result in high-quality, maintainable, and well-documented TypeScript libraries.
