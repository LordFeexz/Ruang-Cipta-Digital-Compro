// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  integrations: [svelte()],

  vite: {
    plugins: [tailwindcss()]
  },
  output: 'server',
  site: import.meta.env.PUBLIC_DOMAIN,
  adapter: node({
    mode: 'standalone',
  }),
});