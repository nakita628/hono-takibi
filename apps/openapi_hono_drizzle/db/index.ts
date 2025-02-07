import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

import dotenv from 'dotenv'

dotenv.config()

const client = createClient({
  url: process.env['DB_FILE_NAME']!,
})

const db = drizzle(client)

export default db
