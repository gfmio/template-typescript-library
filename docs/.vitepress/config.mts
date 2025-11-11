import { createVitepressConfig } from '@gfmio/config-vitepress'

export default createVitepressConfig({
  title: '@gfmio/template-typescript-library',
  description: 'Template for TypeScript libraries with best practices and tooling',
  base: '/',             // optional
  outDir: '../out/docs/site',      // optional
  githubRepo: 'https://github.com/gfmio/template-typescript-library',
  // You can also pass a custom nav/sidebar if you don’t want the preset
})
