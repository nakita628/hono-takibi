import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as table from '../../db/schema'

import dotenv from 'dotenv'

dotenv.config()

if (!process.env.DB_FILE_NAME) {
  throw new Error('DB_FILE_NAME is not set')
}

const client = createClient({
  url: process.env.DB_FILE_NAME,
})

if (!client) {
  throw new Error('DB_FILE_NAME is not set')
}

const db = drizzle(client)

export { table }
export default db
