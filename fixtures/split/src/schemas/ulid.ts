import { z } from '@hono/zod-openapi'

export const UlidSchema = z
  .string()
  .regex(/^[0-9A-HJKMNP-TV-Z]{26}$/)
  .openapi({ examples: ['01J1K9N3E6R6ZK7Z6B0Q9Q3H3J'] })
  .openapi('Ulid')

export type Ulid = z.infer<typeof UlidSchema>
