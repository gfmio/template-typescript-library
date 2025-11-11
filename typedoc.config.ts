import { createVitePressTypeDocConfig } from '@gfmio/config-typedoc';

export default createVitePressTypeDocConfig('@gfmio/template-typescript-library', {
  entryPoints: ['src/index.ts'],
  out: "docs/api/generated",
  readme: "none"
});
