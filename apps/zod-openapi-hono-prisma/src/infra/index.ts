import { PrismaClient } from '@prisma/client'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}
const databaseUrl = process.env.NODE_ENV === 'test' ? 'file:./test.db' : process.env.DATABASE_URL

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
})

export default prisma
