import type { RouteHandler } from '@hono/zod-openapi'
import { Effect, Layer } from 'effect'
import { DatabaseError, UnauthorizedError } from '@/backend/domain'
import type { postCommentsRoute } from '@/backend/routes'
import type { AppEnv } from '@/backend/types'
import { DbClient } from '@/backend/types'
import * as CommentsTransaction from '@/backend/transactions/comments'

export const postCommentsRouteHandler: RouteHandler<typeof postCommentsRoute, AppEnv> = async (
  c,
) => {
  const authUser = c.get('authUser')
  const email = authUser?.token?.email
  if (!email) {
    return c.json({ message: 'Not signed in' }, 500)
  }

  const { postId } = c.req.valid('query')
  const { body } = c.req.valid('json')
  const layer = Layer.succeed(DbClient, c.get('db'))

  return Effect.runPromise(
    CommentsTransaction.create(email, { body, postId }).pipe(
      Effect.provide(layer),
      Effect.match({
        onSuccess: (comment) => c.json(comment, 200),
        onFailure: (e) => {
          if (e instanceof UnauthorizedError) return c.json({ message: e.message }, 500)
          if (e instanceof DatabaseError) return c.json({ message: e.message }, 500)
          return c.json({ message: 'Internal server error' }, 500)
        },
      }),
    ),
  )
}
