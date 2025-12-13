import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as table from '@/db/schema.ts'
import 'dotenv/config'

if (process.env.DB_FILE_NAME === undefined) {
  throw new Error('DB_FILE_NAME is not defined in .env')
}

const client = createClient({
  url: process.env.DB_FILE_NAME,
})

export const db = drizzle(client)

export { table }
export default db
