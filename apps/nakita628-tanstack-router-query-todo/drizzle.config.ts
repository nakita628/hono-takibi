import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './src/api/db/schema.ts',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: env vars are required at build time
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    // biome-ignore lint/style/noNonNullAssertion: env vars are required at build time
    databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    // biome-ignore lint/style/noNonNullAssertion: env vars are required at build time
    token: process.env.CLOUDFLARE_API_TOKEN!,
  },
})
