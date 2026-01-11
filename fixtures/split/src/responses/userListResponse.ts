import { z } from '@hono/zod-openapi'
import { UserListExample } from '../examples'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { ListUsersNextPageLink } from '../links'
import { CursorSchema, MetaSchema, UserSchema } from '../schemas'

export const UserListResponse = {
  description: 'Users list (paged)',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': {
      schema: z
        .object({
          items: z.array(UserSchema),
          nextCursor: CursorSchema.exactOptional(),
          meta: MetaSchema.exactOptional(),
        })
        .openapi({ required: ['items'] }),
      examples: { list: UserListExample },
    },
  },
  links: { next: ListUsersNextPageLink },
}
