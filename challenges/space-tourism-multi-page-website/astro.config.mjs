import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import compress from 'astro-compress'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://space-tourism.ahmedzougari.com',
  integrations: [react(), tailwind(), compress(), sitemap()],
})
