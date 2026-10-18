// @ts-check
import { defineConfig } from 'astro/config';
import noOrphans from './src/integrations/no-orphans.mjs';

// `site` and `base` come from the Pages workflow (`astro build --site ... --base ...`),
// so the same build works at a project URL (/allen-huang-portfolio/) and at a custom domain.
export default defineConfig({
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [noOrphans()],
});
