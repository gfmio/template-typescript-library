# Publishing Strategy

This library uses a clean publishing approach that separates development files from the published package.

## How It Works

### Build Output Directory

All build artifacts are generated in `out/build/`:
- `out/build/index.cjs` - CommonJS bundle
- `out/build/index.mjs` - ESM bundle
- `out/build/index.d.ts` - TypeScript declarations
- `out/build/package.json` - Clean package.json (auto-generated)
- `out/build/README.md` - Copied from root
- `out/build/LICENSE` - Copied from root

### Publishing Configuration

The root `package.json` uses `publishConfig.directory` to publish from `out/build/`:

```json
{
  "publishConfig": {
    "directory": "out/build"
  }
}
```

This means when you run `npm publish`, npm will:
1. Run `prepublishOnly` script (validates and builds)
2. Publish the contents of `out/build/` instead of the root directory

### Clean Package Generation

The `scripts/prepare-package.ts` script runs after `tsup` and:
1. Reads the root `package.json`
2. Extracts only the fields needed for publishing (name, version, dependencies, etc.)
3. Adjusts file paths to be relative to `out/build/` (e.g., `./index.cjs` instead of `./out/build/index.cjs`)
4. Writes a clean `package.json` to `out/build/`
5. Copies `README.md` and `LICENSE` to `out/build/`

## Benefits

### Clean Package
The published package contains only:
- Built JavaScript/TypeScript files
- Clean package.json without dev dependencies
- README and LICENSE
- No build configs, no tests, no docs source

### Correct Path Resolution
Consumers install and import with simple paths:
```typescript
import { greet } from '@gfmio/template-typescript-library';
```

The paths in `out/build/package.json` are relative to the build directory:
```json
{
  "main": "./index.cjs",
  "module": "./index.mjs",
  "types": "./index.d.ts"
}
```

### Size Optimization
The published package is much smaller because it excludes:
- Source files (`src/`)
- Tests (`tests/`)
- Benchmarks (`benchmarks/`)
- Documentation source (`docs/`)
- Build configuration files
- Development dependencies
- Examples

## Publishing Workflow

### Manual Publishing

```bash
# 1. Ensure everything is validated
task validate

# 2. Build the package
task build

# 3. Preview what will be published
cd out/build
npm pack --dry-run

# 4. Publish
npm publish
```

### Automated Publishing

The GitHub Actions workflow with Release Please handles this automatically:
1. Release Please creates a release PR
2. When merged, it creates a git tag
3. CI runs validation and build
4. CI publishes to npm from `out/build/`

## Verifying the Published Package

After publishing, verify the package:

```bash
# Download and extract the published tarball
npm pack @gfmio/template-typescript-library
tar -xzf gfmio-template-typescript-library-*.tgz

# Check the contents
ls -la package/
cat package/package.json
```

You should see only the built files and a clean package.json.

## Alternative Approaches

If you prefer different strategies, here are some alternatives:

### Option 1: Using .npmignore (Not Recommended)
You could use `.npmignore` to exclude files, but this is error-prone and doesn't solve the package.json bloat issue.

### Option 2: Manual package.json in out/build/ (Not Recommended)
You could manually maintain a separate package.json in `out/build/`, but this leads to duplication and sync issues.

### Option 3: Build tool plugins
Some build tools (like `tsup`, `unbuild`, etc.) have plugins to generate clean package.json, but our custom script gives more control.

## Best Practices

1. **Always run `task validate` before publishing** to ensure quality
2. **Test the built package locally** using `npm pack` and `npm link`
3. **Check bundle size** with `npm pack` to ensure no unexpected files
4. **Verify exports** work correctly after building
5. **Use semantic versioning** - let Release Please handle this

## Troubleshooting

### Package.json paths are wrong
If import paths don't work after publishing, check that:
- `scripts/prepare-package.ts` is running after `tsup`
- Paths in `out/build/package.json` are relative (no `out/build/` prefix)

### Files missing from published package
Check that `scripts/prepare-package.ts` is copying all necessary files.

### Unexpected files in published package
The `publishConfig.directory` approach is very clean - only `out/build/` contents are published. If you see extra files, they're likely in `out/build/`.
