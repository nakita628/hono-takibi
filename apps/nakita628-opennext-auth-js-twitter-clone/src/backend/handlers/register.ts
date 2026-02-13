import type { RouteHandler } from '@hono/zod-openapi'
import { ConflictError, DatabaseError, NotFoundError } from '@/backend/domain'
import type { postRegisterRoute } from '@/backend/routes'
import * as UserTransaction from '@/backend/transactions/register'

export const postRegisterRouteHandler: RouteHandler<typeof postRegisterRoute> = async (c) => {
  const { email, name, username, password } = c.req.valid('json')
  return (await UserTransaction.create({ email, name, username, password })).match(
    (user) => c.json(user, 201),
    (e) => {
      if (e instanceof NotFoundError) return c.json({ message: e.message }, 404)
      if (e instanceof ConflictError) return c.json({ message: e.message }, 409)
      if (e instanceof DatabaseError) return c.json({ message: e.message }, 503)
      return c.json({ message: 'Internal server error' }, 500)
    },
  )
}
