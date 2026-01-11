import { z } from '@hono/zod-openapi'
import { TokenResponseExample } from '../examples'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { ListUsersLink } from '../links'
import { TokenResponseSchema } from '../schemas'

export const TokenResponse = {
  description: 'Token issued',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': { schema: TokenResponseSchema, examples: { token: TokenResponseExample } },
  },
  links: { me: ListUsersLink },
}
