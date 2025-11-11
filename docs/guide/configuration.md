# Configuration

This library uses several configuration files to maintain code quality and consistency.

## TypeScript Configuration

The library uses `@gfmio/tsconfig` for TypeScript configuration:

```json
{
  "extends": "@gfmio/tsconfig/library.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

## Build Configuration

The build process uses `tsup` with configuration from `@gfmio/config-tsup`:

```typescript
import { createLibraryConfig } from '@gfmio/config-tsup';

export default createLibraryConfig(['src/index.ts'], {
  outDir: 'dist',
});
```

This generates:
- `dist/index.cjs` - CommonJS bundle
- `dist/index.mjs` - ESM bundle
- `dist/index.d.ts` - TypeScript declarations

## Testing Configuration

Tests are configured using Vitest with `@gfmio/config-vitest`:

```typescript
import { createTestConfig } from '@gfmio/config-vitest';

export default createTestConfig();
```

## Linting & Formatting

### Biome

Primary linting and formatting using `@gfmio/config-biome`:

```json
{
  "extends": ["@gfmio/config-biome/biome.json"]
}
```

### ESLint (JSDoc)

ESLint is configured specifically for JSDoc linting:

```javascript
import { jsdocConfig } from '@gfmio/config-eslint';

export default [jsdocConfig];
```

### Prettier (YAML/Markdown only)

Prettier is configured to format only YAML and Markdown files:

```json
{
  "overrides": [
    {
      "files": ["*.yaml", "*.yml"],
      "options": { "singleQuote": false }
    },
    {
      "files": ["*.md"],
      "options": { "printWidth": 80 }
    }
  ]
}
```

### Markdownlint

Markdown linting with auto-fix support:

```json
{
  "default": true,
  "MD013": false
}
```

### Yamllint

YAML linting configuration:

```yaml
extends: default
rules:
  line-length:
    max: 120
```

## Documentation

### TypeDoc

API documentation generation:

```json
{
  "entryPoints": ["src/index.ts"],
  "out": "docs/api"
}
```

### VitePress

Documentation site configuration in `docs/.vitepress/config.ts`.

## Commit Messages

Conventional commits enforced with `@gfmio/config-commitlint`:

```json
{
  "extends": ["@gfmio/config-commitlint/commitlint.config.js"]
}
```
