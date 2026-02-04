import { z } from '@hono/zod-openapi'
import { UserFullExample } from '../examples'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { GetCompanyFromUserLink, GetUserLink, ListOrdersForUserLink } from '../links'
import { UserSchema } from '../schemas'

export const UserResponse = {
  description: 'A user',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: UserSchema, examples: { full: UserFullExample } } },
  links: { self: GetUserLink, company: GetCompanyFromUserLink, orders: ListOrdersForUserLink },
}
