import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

import dotenv from 'dotenv'

dotenv.config()

const client = process.env.DB_FILE_NAME
  ? createClient({
      url: process.env.DB_FILE_NAME,
    })
  : undefined

if (!client) {
  throw new Error('DB_FILE_NAME is not set')
}

const db = drizzle(client)

export default db
