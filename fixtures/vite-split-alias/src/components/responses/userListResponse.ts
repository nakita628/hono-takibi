import { z } from '@hono/zod-openapi'
import { XRateLimitHeaderSchema } from '~/components/headers'
import { UserListSchema } from '~/components/schemas'

export const UserListResponseResponse = {
  description: 'A list of users',
  headers: z.object({ 'X-Rate-Limit': XRateLimitHeaderSchema }),
  content: { 'application/json': { schema: UserListSchema } },
}
