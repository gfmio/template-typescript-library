import { createVitepressConfig } from '@gfmio/config-vitepress'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

// Load versions if available
interface VersionInfo {
  version: string
  label: string
  path: string
  date: string
  status: 'current' | 'maintenance' | 'eol'
}

let versions: VersionInfo[] = []
const versionsFile = join(__dirname, '../versions.json')
if (existsSync(versionsFile)) {
  versions = JSON.parse(readFileSync(versionsFile, 'utf-8'))
}

const baseConfig = createVitepressConfig({
  title: '@gfmio/template-typescript-library',
  description: 'Template for TypeScript libraries with best practices and tooling',
  base: '/',             // optional
  outDir: '../out/docs/site',      // optional
  githubRepo: 'https://github.com/gfmio/template-typescript-library',
  // You can also pass a custom nav/sidebar if you don't want the preset
})

// Add version selector if versions exist
if (versions.length > 0) {
  const versionItems = [
    {
      text: 'Latest (main)',
      link: '/',
    },
    ...versions.map(v => ({
      text: `${v.label}${v.status === 'current' ? ' (Current)' : ''}`,
      link: v.path,
    })),
    {
      text: 'All Versions',
      link: '/versions',
    },
  ]

  // Extend themeConfig with version selector
  baseConfig.themeConfig = {
    ...baseConfig.themeConfig,
    nav: [
      ...(baseConfig.themeConfig?.nav || []),
      {
        text: versions[0]?.label || 'Version',
        items: versionItems,
      },
    ],
  }
}

export default baseConfig
