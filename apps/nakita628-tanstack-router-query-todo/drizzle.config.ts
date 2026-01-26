import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './migrations',
  schema: './src/api/db/schema.ts',
  dialect: 'sqlite',
})
