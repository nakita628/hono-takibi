import { z } from '@hono/zod-openapi'
import { UserListSchema } from '~/components/schemas'
import { XRateLimitHeaderSchema } from '~/components/headers'

export const UserListResponseResponse = {
  description: 'A list of users',
  headers: z.object({ 'X-Rate-Limit': XRateLimitHeaderSchema }),
  content: { 'application/json': { schema: UserListSchema } },
}
