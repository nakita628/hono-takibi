import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

// 環境変数に基づいてデータベースファイルを選択
const dbFileName =
  process.env.NODE_ENV === 'test' ? 'file:test.db' : process.env.DB_FILE_NAME || 'file:local.db'

export default defineConfig({
  out: './drizzle/migrations',
  schema: './db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: dbFileName,
  },
})
