import { defineConfig } from 'cf/config'

/**
 * Secret-like files were detected but not read or migrated: .env.example. Only `secrets.required` entries are migrated.
 * @see https://developers.cloudflare.com/workers/configuration/secrets/
 */

export default defineConfig({
  worker: {
    name: 'nakita628-fizz-buzz',
    compatibilityDate: '2026-06-14',
    entrypoint: 'src/index.ts',
  },
})
