import { z } from '@hono/zod-openapi'
import { UserSchema } from '../schemas'
import { UserFullExample } from '../examples'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { GetCompanyFromUserLinkLink, GetUserLinkLink, ListOrdersForUserLinkLink } from '../links'

export const UserResponseResponse = {
  description: 'A user',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: UserSchema, examples: { full: UserFullExample } } },
  links: {
    self: GetUserLinkLink,
    company: GetCompanyFromUserLinkLink,
    orders: ListOrdersForUserLinkLink,
  },
}
