import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

if (process.env.DB_FILE_NAME === undefined) {
  throw new Error('DB_FILE_NAME is not defined in .env')
}

export default defineConfig({
  out: './drizzle/migrations',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_FILE_NAME,
  },
})
