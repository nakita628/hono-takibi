import { z } from '@hono/zod-openapi'
import { MetaSchema } from './meta'

export const TokenResponseSchema = z
  .object({
    accessToken: z.string(),
    tokenType: z.literal('Bearer'),
    expiresIn: z.int().exactOptional(),
    refreshToken: z.string().exactOptional(),
    scope: z.string().exactOptional(),
    meta: MetaSchema.exactOptional(),
  })
  .openapi({ required: ['accessToken', 'tokenType'] })
  .openapi('TokenResponse')

export type TokenResponse = z.infer<typeof TokenResponseSchema>
