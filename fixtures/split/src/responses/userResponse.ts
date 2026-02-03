import { z } from '@hono/zod-openapi'
import { UserSchema } from '../schemas'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { UserFullExample } from '../examples'
import { GetCompanyFromUserLink, GetUserLink, ListOrdersForUserLink } from '../links'

export const UserResponse = {
  description: 'A user',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: UserSchema, examples: { full: UserFullExample } } },
  links: { self: GetUserLink, company: GetCompanyFromUserLink, orders: ListOrdersForUserLink },
}
