import type { RouteHandler } from '@hono/zod-openapi'
import { createDb } from '@/api/db'
import { DatabaseError, DataNotFoundError } from '@/api/domain/error'
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
  return c.json({ message: 'Hono🔥 SvelteKit' }, 200)
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
  return TodoService.readAll(db, limit, offset).match(
    (value) => c.json(value, 200),
    (e) => {
      if (e instanceof DatabaseError) {
        return c.json({ message: e.message }, 503)
      }
      return c.json({ message: 'Internal server error' }, 500)
    },
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
  return TodoService.create(db, content).match(
    () => c.json({ message: 'Created' }, 201),
    (e) => {
      if (e instanceof DatabaseError) {
        return c.json({ message: e.message }, 503)
      }
      return c.json({ message: 'Internal server error' }, 500)
    },
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
  return TodoService.readById(db, id).match(
    (value) => c.json(value, 200),
    (e) => {
      if (e instanceof DataNotFoundError) {
        return c.json({ message: e.message }, 404)
      }
      if (e instanceof DatabaseError) {
        return c.json({ message: e.message }, 503)
      }
      return c.json({ message: 'Internal server error' }, 500)
    },
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
  return TodoService.update(db, id, body).match(
    () => c.body(null, 204),
    (e) => {
      if (e instanceof DatabaseError) {
        return c.json({ message: e.message }, 503)
      }
      return c.json({ message: 'Internal server error' }, 500)
    },
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
  return TodoService.remove(db, id).match(
    () => c.body(null, 204),
    (e) => {
      if (e instanceof DatabaseError) {
        return c.json({ message: e.message }, 503)
      }
      return c.json({ message: 'Internal server error' }, 500)
    },
  )
}
