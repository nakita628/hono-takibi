import { z } from '@hono/zod-openapi'
import { TraceContextSchema } from './traceContext'

export const TokenRequestSchema = z
  .object({
    grantType: z.enum(['client_credentials', 'refresh_token']),
    clientId: z.string().exactOptional(),
    clientSecret: z.string().exactOptional(),
    refreshToken: z.string().exactOptional(),
    trace: TraceContextSchema.exactOptional(),
  })
  .openapi({ required: ['grantType'] })
  .openapi('TokenRequest')

export type TokenRequest = z.infer<typeof TokenRequestSchema>
