import type { RouteHandler } from '@hono/zod-openapi'
import { Effect, Match } from 'effect'
import { createDb } from '@/api/db'
import { DatabaseError, DataNotFoundError, ValidationError } from '@/api/domain/error'
import {
  deleteApiTodoIdRoute,
  getApiRoute,
  getApiTodoIdRoute,
  getApiTodoRoute,
  postApiTodoRoute,
  putApiTodoIdRoute,
} from '@/api/routes'
import * as TodoService from '@/api/services/todo'

/**
 * Handler for the health check endpoint.
 */
export const getApiRouteHandler: RouteHandler<
  typeof getApiRoute,
  { Bindings: { DB: D1Database } }
> = async (c) => {
  return c.json({ message: 'Hono🔥 Vue' }, 200)
}

/**
 * Handler for retrieving all todos.
 */
export const getApiTodoRouteHandler: RouteHandler<
  typeof getApiTodoRoute,
  { Bindings: { DB: D1Database } }
> = async (c) => {
  const { limit, offset } = c.req.valid('query')
  const db = createDb(c.env.DB)

  const result = await Effect.runPromise(
    TodoService.readAll(db, limit, offset).pipe(
      Effect.matchEffect({
        onSuccess: (value) => Effect.succeed({ type: 'success' as const, value }),
        onFailure: (error) => Effect.succeed({ type: 'error' as const, error }),
      }),
    ),
  )

  if (result.type === 'success') {
    return c.json(result.value, 200)
  }

  return Match.value(result.error).pipe(
    Match.tag('DatabaseError', (e) => c.json({ message: e.message }, 503)),
    Match.tag('ValidationError', (e) => c.json({ message: e.message }, 500)),
    Match.orElse(() => c.json({ message: 'Internal server error' }, 500)),
  )
}

/**
 * Handler for creating a new todo.
 */
export const postApiTodoRouteHandler: RouteHandler<
  typeof postApiTodoRoute,
  { Bindings: { DB: D1Database } }
> = async (c) => {
  const { content } = c.req.valid('json')
  const db = createDb(c.env.DB)

  const result = await Effect.runPromise(
    TodoService.create(db, content).pipe(
      Effect.matchEffect({
        onSuccess: () => Effect.succeed({ type: 'success' as const }),
        onFailure: (error) => Effect.succeed({ type: 'error' as const, error }),
      }),
    ),
  )

  if (result.type === 'success') {
    return c.json({ message: 'Created' }, 201)
  }

  return Match.value(result.error).pipe(
    Match.tag('DatabaseError', (e) => c.json({ message: e.message }, 503)),
    Match.orElse(() => c.json({ message: 'Internal server error' }, 500)),
  )
}

/**
 * Handler for retrieving a single todo by ID.
 */
export const getApiTodoIdRouteHandler: RouteHandler<
  typeof getApiTodoIdRoute,
  { Bindings: { DB: D1Database } }
> = async (c) => {
  const { id } = c.req.valid('param')
  const db = createDb(c.env.DB)

  const result = await Effect.runPromise(
    TodoService.readById(db, id).pipe(
      Effect.matchEffect({
        onSuccess: (value) => Effect.succeed({ type: 'success' as const, value }),
        onFailure: (error) => Effect.succeed({ type: 'error' as const, error }),
      }),
    ),
  )

  if (result.type === 'success') {
    return c.json(result.value, 200)
  }

  return Match.value(result.error).pipe(
    Match.tag('DataNotFoundError', (e) => c.json({ message: e.message }, 404)),
    Match.tag('DatabaseError', (e) => c.json({ message: e.message }, 503)),
    Match.tag('ValidationError', (e) => c.json({ message: e.message }, 500)),
    Match.orElse(() => c.json({ message: 'Internal server error' }, 500)),
  )
}

/**
 * Handler for updating an existing todo.
 */
export const putApiTodoIdRouteHandler: RouteHandler<
  typeof putApiTodoIdRoute,
  { Bindings: { DB: D1Database } }
> = async (c) => {
  const { id } = c.req.valid('param')
  const body = c.req.valid('json')
  const db = createDb(c.env.DB)

  const result = await Effect.runPromise(
    TodoService.update(db, id, body).pipe(
      Effect.matchEffect({
        onSuccess: () => Effect.succeed({ type: 'success' as const }),
        onFailure: (error) => Effect.succeed({ type: 'error' as const, error }),
      }),
    ),
  )

  if (result.type === 'success') {
    return c.body(null, 204)
  }

  return Match.value(result.error).pipe(
    Match.tag('DatabaseError', (e) => c.json({ message: e.message }, 503)),
    Match.orElse(() => c.json({ message: 'Internal server error' }, 500)),
  )
}

/**
 * Handler for deleting a todo.
 */
export const deleteApiTodoIdRouteHandler: RouteHandler<
  typeof deleteApiTodoIdRoute,
  { Bindings: { DB: D1Database } }
> = async (c) => {
  const { id } = c.req.valid('param')
  const db = createDb(c.env.DB)

  const result = await Effect.runPromise(
    TodoService.remove(db, id).pipe(
      Effect.matchEffect({
        onSuccess: () => Effect.succeed({ type: 'success' as const }),
        onFailure: (error) => Effect.succeed({ type: 'error' as const, error }),
      }),
    ),
  )

  if (result.type === 'success') {
    return c.body(null, 204)
  }

  return Match.value(result.error).pipe(
    Match.tag('DatabaseError', (e) => c.json({ message: e.message }, 503)),
    Match.orElse(() => c.json({ message: 'Internal server error' }, 500)),
  )
}
