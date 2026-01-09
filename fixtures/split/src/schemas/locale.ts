import { z } from '@hono/zod-openapi'

type LocaleType = string

export const LocaleSchema: z.ZodType<LocaleType> = z
  .string()
  .regex(/^[a-z]{2}(-[A-Z]{2})?$/)
  .openapi({ examples: ['ja-JP', 'en-US'] })
  .openapi('Locale')

export type Locale = z.infer<typeof LocaleSchema>
