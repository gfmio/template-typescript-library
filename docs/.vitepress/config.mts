import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { createVitepressConfig } from '@gfmio/config-vitepress';

// Load versions if available
interface VersionInfo {
  version: string;
  label: string;
  path: string;
  date: string;
  status: 'current' | 'maintenance' | 'eol';
}

let versions: VersionInfo[] = [];
const versionsFile = join(__dirname, '../versions.json');
if (existsSync(versionsFile)) {
  versions = JSON.parse(readFileSync(versionsFile, 'utf-8'));
}

const baseConfig = createVitepressConfig({
  base: '/', // optional
  description: 'Template for TypeScript libraries with best practices and tooling',
  githubRepo: 'https://github.com/gfmio/template-typescript-library',
  outDir: '../out/docs/site', // optional
  title: '@gfmio/template-typescript-library',
  // You can also pass a custom nav/sidebar if you don't want the preset
});

// Add version selector if versions exist
if (versions.length > 0) {
  const versionItems = [
    {
      link: '/',
      text: 'Latest (main)',
    },
    ...versions.map((v) => ({
      link: v.path,
      text: `${v.label}${v.status === 'current' ? ' (Current)' : ''}`,
    })),
    {
      link: '/versions',
      text: 'All Versions',
    },
  ];

  // Extend themeConfig with version selector
  baseConfig.themeConfig = {
    ...baseConfig.themeConfig,
    nav: [
      ...(baseConfig.themeConfig?.nav || []),
      {
        items: versionItems,
        text: versions[0]?.label || 'Version',
      },
    ],
  };
}

export default baseConfig;
