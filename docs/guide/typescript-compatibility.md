# TypeScript Compatibility Testing

This guide explains how to test your library against multiple TypeScript versions.

## Current Version

The template uses TypeScript `~5.9.3` as specified in [package.json](../../package.json:640).

## Testing Multiple Versions

To ensure your library works with different TypeScript versions, you can test against multiple versions locally or in CI.

### Local Testing

#### Option 1: Using the Compatibility Task (Recommended)

The repository includes a dedicated task for testing multiple TypeScript versions:

```bash
# Test against multiple versions
task typecheck:compat -- 5.7 5.8 5.9

# Test a single version
task typecheck:compat -- 5.9

# CI-friendly version with verbose output
task typecheck:compat:ci -- 5.7 5.8 5.9
```

**Features:**
- Automatically saves and restores the original TypeScript version
- Does not modify the lockfile
- Tests each version sequentially
- Provides clear pass/fail reporting
- Safe rollback on errors

#### Option 2: Manual Testing

```bash
# Install a specific TypeScript version
bun add -D typescript@5.7.0

# Run type checking
task typecheck

# Restore original version
bun add -D typescript@~5.9.3
```

**Note:** Manual testing requires careful lockfile management.

#### Option 3: Using npm-check-updates

```bash
# Check what TypeScript versions are available
bun run npm-check-updates typescript

# Test with latest
bun run npm-check-updates -u typescript
task typecheck
```

### CI Testing

#### Enable TypeScript Compatibility Testing in CI

To enable TypeScript compatibility testing in CI, replace the typecheck step in [.github/workflows/ci.yml](../../.github/workflows/ci.yml:49-62):

**Default (single version):**
```yaml
- name: Type check
  id: typecheck
  continue-on-error: true
  run: devenv shell task ci:typecheck
```

**With compatibility testing (multiple versions):**
```yaml
- name: Type check
  id: typecheck
  continue-on-error: true
  run: |
    devenv shell task typecheck:compat:ci -- 5.7 5.8 5.9
    if git diff --exit-code bun.lockb; then
      echo "✅ Lockfile unchanged"
    else
      echo "❌ Lockfile was modified"
      exit 1
    fi
```

**Benefits:**
- Tests multiple TypeScript versions in CI
- Verifies lockfile remains unchanged
- Exits with error if any version fails
- Clear reporting with GitHub Actions groups

## Version Support Policy

We recommend:

1. **Primary Version**: Use the latest stable TypeScript minor version
2. **Compatibility**: Test against N-1 and N minor versions
3. **Breaking Changes**: Document any TypeScript version requirements

### Example Support Matrix

| Library Version | Minimum TypeScript | Tested Versions |
|----------------|-------------------|----------------|
| 1.x.x          | 5.7.0             | 5.7, 5.8, 5.9  |

## Type Compatibility Issues

### Common Issues

1. **New TypeScript Features**: Using features from newer TypeScript versions may break for older versions
2. **Type Changes**: TypeScript may change how it infers or checks types between versions
3. **Lib Updates**: New `lib` options or changes to built-in types

### Best Practices

1. **Avoid Bleeding Edge**: Don't use features from the absolute latest TypeScript
2. **Test Regularly**: Run compatibility tests before releases
3. **Document Requirements**: Clearly state minimum TypeScript version
4. **Use Type Tests**: Type tests ([src/index.type.test.ts](../../src/index.type.test.ts)) catch compatibility issues

## Semver and TypeScript

Follow semantic versioning for TypeScript compatibility:

- **Major**: Breaking type changes, minimum TypeScript version increase
- **Minor**: New features that are backward compatible
- **Patch**: Bug fixes that don't affect types

## Automation

### Pre-Release Checklist

Before releasing, verify:

```bash
# Type check with current version
task typecheck

# Run all tests including type tests
task test

# Build successfully
task build

# Validate package
task validate
```

### Task Implementation

The compatibility tasks are implemented in [tasks/logical/typecheck-compat.yml](../../tasks/logical/typecheck-compat.yml):

- **`typecheck:compat`**: Interactive version for local development
- **`typecheck:compat:ci`**: CI-optimized version with GitHub Actions output groups

Both tasks:
- Create backups of `package.json` and `bun.lockb`
- Test each version sequentially
- Restore original files after each test
- Provide comprehensive reporting
- Exit with error code if any version fails

## See Also

- [TypeScript Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html)
- [TypeScript Breaking Changes](https://github.com/microsoft/TypeScript/wiki/Breaking-Changes)
- [Type Tests Guide](./testing.md#type-tests)
