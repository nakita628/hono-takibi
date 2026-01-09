import { z } from '@hono/zod-openapi'

export const WwwAuthenticateHeaderHeaderSchema = z
  .string()
  .exactOptional()
  .openapi({
    description: 'WWW-Authenticate for Bearer',
    example: 'Bearer realm="inferno", error="invalid_token"',
  })

export type WwwAuthenticateHeaderHeader = z.infer<typeof WwwAuthenticateHeaderHeaderSchema>
