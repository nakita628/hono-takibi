import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { getDb } from '@/infra'

export const auth = () =>
  betterAuth({
    baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:8787',
    database: drizzleAdapter(getDb(), { provider: 'sqlite' }),
    emailAndPassword: { enabled: true },
    advanced: {
      database: {
        generateId: 'uuid',
      },
    },
  })

type Auth = ReturnType<typeof auth>

export type AuthType = {
  user: Auth['$Infer']['Session']['user'] | null
  session: Auth['$Infer']['Session']['session'] | null
}
