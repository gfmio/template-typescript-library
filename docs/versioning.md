# Documentation Versioning

This project maintains versioned documentation to ensure users can always access docs that match their installed version.

## How It Works

### Automatic Versioning on Release

When a new release is published:

1. **GitHub Actions triggers** the docs deployment workflow
2. **Version script runs** to create a snapshot of current docs
3. **Docs are copied** to `docs/vX.Y.Z/` directory
4. **versions.json is updated** with the new version metadata
5. **Version selector appears** in the navigation bar
6. **Docs are deployed** to GitHub Pages with all versions

### Manual Versioning (for testing)

You can create a versioned snapshot manually:

```bash
# Create a version snapshot
task docs:version -- v1.2.3

# This will:
# - Copy docs to docs/v1.2.3/
# - Update versions.json
# - Update versions.md
```

## Directory Structure

```
docs/
├── index.md           # Latest (main) documentation
├── guide/             # Latest guides
├── api/               # Latest API reference (generated)
├── versions.md        # List of all versions
├── versions.json      # Version metadata
├── v1.0.0/           # Versioned docs for v1.0.0
│   ├── index.md
│   ├── guide/
│   └── api/
├── v1.1.0/           # Versioned docs for v1.1.0
│   ├── index.md
│   ├── guide/
│   └── api/
└── .vitepress/
    └── config.mts     # VitePress config with version selector
```

## Version Selector

The version selector appears in the navigation bar when versions exist:

- **Latest (main)** - Development version, unreleased changes
- **v1.2.0 (Current)** - Latest stable release
- **v1.1.0** - Previous releases
- **All Versions** - Link to versions page

## Version Status

Each version has a status indicating its support level:

- **Current**: Latest stable release, actively maintained
- **Maintenance**: Older release, bug fixes only
- **EOL**: End of life, no longer supported

## URLs

Versioned docs are accessible at:

- Latest (main): `https://yoursite.github.io/repo/`
- Specific version: `https://yoursite.github.io/repo/v1.2.0/`
- Versions list: `https://yoursite.github.io/repo/versions`

## Workflow Integration

### Release Workflow

```yaml
# .github/workflows/docs.yml
- name: Extract version from release tag
  run: echo "version=${{ github.event.release.tag_name }}"

- name: Create versioned documentation
  run: bun run scripts/version-docs.ts $VERSION

- name: Build and deploy docs
  run: bun run docs:vitepress:build
```

### What Gets Versioned

- ✅ Guide documentation (`docs/guide/`)
- ✅ API reference (`docs/api/`)
- ✅ Index page (`docs/index.md`)
- ❌ `.vitepress` config (stays in main only)
- ❌ Build artifacts (generated fresh each time)

## Best Practices

### When to Version

- **Major releases**: Always create a versioned snapshot
- **Minor releases**: Create a version for significant API changes
- **Patch releases**: Usually not needed unless docs changed significantly

### Maintaining Old Versions

Old version docs are **read-only**:
- They're copied once and never updated
- Bug fixes go to the current version
- Users on old versions see docs as they were at release time

### Breaking Changes

When making breaking changes:
1. Document them in the current (main) docs
2. Keep old version docs showing the old API
3. Users can compare versions to see what changed

## Troubleshooting

### Version selector not showing

Check that `docs/versions.json` exists and is valid JSON:

```bash
cat docs/versions.json
```

### Docs not updating

The versioned docs are static snapshots. To update:
1. Make changes to the main docs
2. Create a new release
3. New version automatically includes your changes

### Manual cleanup

To remove a version:

```bash
# Remove version directory
rm -rf docs/v1.0.0

# Update versions.json manually
# Remove the entry for v1.0.0

# Rebuild docs
task docs:vitepress:build
```

## Implementation Details

### versions.json Format

```json
[
  {
    "version": "v1.2.0",
    "label": "v1.2.0",
    "path": "/v1.2.0/",
    "date": "2024-01-15",
    "status": "current"
  },
  {
    "version": "v1.1.0",
    "label": "v1.1.0",
    "path": "/v1.1.0/",
    "date": "2023-12-01",
    "status": "maintenance"
  }
]
```

### Config Integration

The VitePress config reads `versions.json` and dynamically creates navigation items:

```typescript
// docs/.vitepress/config.mts
const versions = JSON.parse(readFileSync('docs/versions.json'))

export default {
  themeConfig: {
    nav: [
      {
        text: versions[0].label,
        items: versions.map(v => ({
          text: v.label,
          link: v.path
        }))
      }
    ]
  }
}
```

## See Also

- [VitePress Documentation](https://vitepress.dev/)
- [All Versions](./versions.md)
- [Contributing Guide](../CONTRIBUTING.md)
