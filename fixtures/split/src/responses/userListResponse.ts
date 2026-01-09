import { z } from '@hono/zod-openapi'
import { CursorSchema, MetaSchema, UserSchema } from '../schemas'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { UserListExample } from '../examples'
import { ListUsersNextPageLink } from '../links'

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
