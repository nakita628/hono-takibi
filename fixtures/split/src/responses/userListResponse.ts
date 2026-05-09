import { z } from '@hono/zod-openapi'
import { CursorSchema, MetaSchema, UserSchema } from '../schemas'
import { UserListExampleExample } from '../examples'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { ListUsersNextPageLinkLink } from '../links'

export const UserListResponseResponse = {
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
      examples: { list: UserListExampleExample },
    },
  },
  links: { next: ListUsersNextPageLinkLink },
}
