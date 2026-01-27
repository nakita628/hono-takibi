import type { RouteHandler } from '@hono/zod-openapi'
import { createDb } from '@/api/db'
import { DatabaseError, DataNotFoundError } from '@/api/domain/error'
import {
  deleteTodoIdRoute,
  getTodoIdRoute,
  getTodoRoute,
  postTodoRoute,
  putTodoIdRoute,
} from '@/api/routes'
import * as TodoService from '@/api/services/todo'

/**
 * Handler for retrieving all todos.
 *
 * ```mermaid
 * sequenceDiagram
 *   participant Client
 *   participant Handler
 *   participant Service
 *   participant DB
 *   Client->>Handler: GET /api/todo
 *   Handler->>Service: readAll(db, limit, offset)
 *   Service->>DB: SELECT query
 *   DB-->>Service: Results
 *   Service-->>Handler: Result<Todo[]>
 *   alt Success
 *     Handler-->>Client: 200 OK [todos]
 *   else DatabaseError
 *     Handler-->>Client: 503 Service Unavailable
 *   else Other Error
 *     Handler-->>Client: 500 Internal Server Error
 *   end
 * ```
 *
 * @param c - The Hono context object with DB binding
 * @returns JSON response with array of todos or error
 */
export const getTodoRouteHandler: RouteHandler<
  typeof getTodoRoute,
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
 *
 * ```mermaid
 * sequenceDiagram
 *   participant Client
 *   participant Handler
 *   participant Service
 *   participant DB
 *   Client->>Handler: POST /api/todo { content }
 *   Handler->>Service: create(db, content)
 *   Service->>DB: INSERT query
 *   DB-->>Service: Success/Failure
 *   Service-->>Handler: Result<void>
 *   alt Success
 *     Handler-->>Client: 201 Created
 *   else DatabaseError
 *     Handler-->>Client: 503 Service Unavailable
 *   else Other Error
 *     Handler-->>Client: 500 Internal Server Error
 *   end
 * ```
 *
 * @param c - The Hono context object with DB binding
 * @returns JSON response indicating creation success or error
 */
export const postTodoRouteHandler: RouteHandler<
  typeof postTodoRoute,
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
 *
 * ```mermaid
 * sequenceDiagram
 *   participant Client
 *   participant Handler
 *   participant Service
 *   participant DB
 *   Client->>Handler: GET /api/todo/{id}
 *   Handler->>Service: readById(db, id)
 *   Service->>DB: SELECT query
 *   DB-->>Service: Result or null
 *   Service-->>Handler: Result<Todo>
 *   alt Success
 *     Handler-->>Client: 200 OK { todo }
 *   else Not Found
 *     Handler-->>Client: 404 Not Found
 *   else DatabaseError
 *     Handler-->>Client: 503 Service Unavailable
 *   else Other Error
 *     Handler-->>Client: 500 Internal Server Error
 *   end
 * ```
 *
 * @param c - The Hono context object with DB binding
 * @returns JSON response with the todo or error
 */
export const getTodoIdRouteHandler: RouteHandler<
  typeof getTodoIdRoute,
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
 *
 * ```mermaid
 * sequenceDiagram
 *   participant Client
 *   participant Handler
 *   participant Service
 *   participant DB
 *   Client->>Handler: PUT /api/todo/{id} { content?, completed? }
 *   Handler->>Service: update(db, id, data)
 *   Service->>DB: UPDATE query
 *   DB-->>Service: Success/Failure
 *   Service-->>Handler: Result<void>
 *   alt Success
 *     Handler-->>Client: 204 No Content
 *   else DatabaseError
 *     Handler-->>Client: 503 Service Unavailable
 *   else Other Error
 *     Handler-->>Client: 500 Internal Server Error
 *   end
 * ```
 *
 * @param c - The Hono context object with DB binding
 * @returns Empty response on success or JSON error
 */
export const putTodoIdRouteHandler: RouteHandler<
  typeof putTodoIdRoute,
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
 *
 * ```mermaid
 * sequenceDiagram
 *   participant Client
 *   participant Handler
 *   participant Service
 *   participant DB
 *   Client->>Handler: DELETE /api/todo/{id}
 *   Handler->>Service: remove(db, id)
 *   Service->>DB: DELETE query
 *   DB-->>Service: Success/Failure
 *   Service-->>Handler: Result<void>
 *   alt Success
 *     Handler-->>Client: 204 No Content
 *   else DatabaseError
 *     Handler-->>Client: 503 Service Unavailable
 *   else Other Error
 *     Handler-->>Client: 500 Internal Server Error
 *   end
 * ```
 *
 * @param c - The Hono context object with DB binding
 * @returns Empty response on success or JSON error
 */
export const deleteTodoIdRouteHandler: RouteHandler<
  typeof deleteTodoIdRoute,
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
