import { z } from '@hono/zod-openapi'
import { TokenResponseSchema } from '../schemas'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { TokenResponseExample } from '../examples'
import { ListUsersLink } from '../links'

export const TokenResponse = {
  description: 'Token issued',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': { schema: TokenResponseSchema, examples: { token: TokenResponseExample } },
  },
  links: { me: ListUsersLink },
}
