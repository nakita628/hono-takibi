import { z } from '@hono/zod-openapi'
import { TokenResponseSchema } from '../schemas'
import { TokenResponseExampleExample } from '../examples'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { ListUsersLinkLink } from '../links'

export const TokenResponseResponse = {
  description: 'Token issued',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': {
      schema: TokenResponseSchema,
      examples: { token: TokenResponseExampleExample },
    },
  },
  links: { me: ListUsersLinkLink },
}
