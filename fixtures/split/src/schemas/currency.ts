import { z } from '@hono/zod-openapi'

export const CurrencySchema = z.enum(['JPY', 'USD', 'EUR']).openapi('Currency')

export type Currency = z.infer<typeof CurrencySchema>
