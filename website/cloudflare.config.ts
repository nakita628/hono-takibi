import { defineConfig } from 'cf/config'

/**
 * Secret-like files were detected but not read or migrated: .env. Only `secrets.required` entries are migrated.
 * @see https://developers.cloudflare.com/workers/configuration/secrets/
 */

// oxlint-disable-next-line import/no-default-export -- cf resolves the config through its default export
export default defineConfig({
  worker: {
    name: 'hono-takibi-website',
    compatibilityDate: '2026-06-11',
    assets: {
      notFoundHandling: '404-page',
    },
    domains: ['hono-takibi.dev'],
  },
})
