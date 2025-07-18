import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as table from '../../db/schema'
import dotenv from 'dotenv'

dotenv.config()

if (!process.env.DB_FILE_NAME) {
  throw new Error('DB_FILE_NAME environment variable is not set')
}

const dbFileName = process.env.NODE_ENV === 'test' ? 'file:test.db' : process.env.DB_FILE_NAME

const client = createClient({
  url: dbFileName,
})

if (!client) {
  throw new Error('Database client could not be created')
}

const db = drizzle(client)

export { table }
export default db
