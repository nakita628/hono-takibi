import { z } from '@hono/zod-openapi'
import type { Kysely } from 'kysely'
import { err, ok, ResultAsync } from 'neverthrow'
import type { Database } from '@/api/db'
import { DatabaseError, DataNotFoundError, ValidationError } from '@/api/domain/error'
import { TodoSchema } from '@/api/routes'

const TodoArraySchema = z.array(TodoSchema)

/**
 * Retrieves all todos from the database.
 *
 * ```mermaid
 * flowchart TD
 *   A([Start]) --> B[Build Kysely query]
 *   B --> C{Has limit/offset?}
 *   C -->|Yes| D[Add limit/offset]
 *   C -->|No| E[Use base query]
 *   D --> F[Execute query]
 *   E --> F
 *   F --> G{Query success?}
 *   G -->|No| H[Return DatabaseError]
 *   G -->|Yes| I{Parse result}
 *   I -->|Invalid| J[Return ValidationError]
 *   I -->|Valid| K[Return Todo array]
 *   H --> L([End])
 *   J --> L
 *   K --> L
 * ```
 *
 * @param db - The Kysely database instance
 * @param limit - Optional maximum number of todos to return
 * @param offset - Optional number of todos to skip
 * @returns A ResultAsync containing an array of todos or an error
 */
export function readAll(db: Kysely<Database>, limit?: number, offset?: number) {
  const baseQuery = db
    .selectFrom('todos')
    .select([
      'id',
      'content',
      'completed',
      (eb) => eb.fn('strftime', ['%Y-%m-%dT%H:%M:%SZ', eb.ref('created_at')]).as('createdAt'),
      (eb) => eb.fn('strftime', ['%Y-%m-%dT%H:%M:%SZ', eb.ref('updated_at')]).as('updatedAt'),
    ])
    .orderBy('created_at', 'desc')

  const queryWithLimit = limit !== undefined ? baseQuery.limit(limit) : baseQuery
  const queryWithOffset = offset !== undefined ? queryWithLimit.offset(offset) : queryWithLimit

  return ResultAsync.fromPromise(queryWithOffset.execute(), (e) =>
    e instanceof Error ? new DatabaseError(e.message, e) : new DatabaseError('Database error', e),
  ).andThen((results) => {
    const parsed = TodoArraySchema.safeParse(results)
    if (!parsed.success) {
      return err(new ValidationError('Invalid data from database'))
    }
    return ok(parsed.data)
  })
}

/**
 * Retrieves a single todo by its ID.
 *
 * ```mermaid
 * flowchart TD
 *   A([Start]) --> B[Execute Kysely SELECT query with ID]
 *   B --> C{Query success?}
 *   C -->|No| D[Return DatabaseError]
 *   C -->|Yes| E{Result exists?}
 *   E -->|No| F[Return DataNotFoundError]
 *   E -->|Yes| G{Parse result}
 *   G -->|Invalid| H[Return ValidationError]
 *   G -->|Valid| I[Return Todo]
 *   D --> J([End])
 *   F --> J
 *   H --> J
 *   I --> J
 * ```
 *
 * @param db - The Kysely database instance
 * @param id - The UUID of the todo to retrieve
 * @returns A ResultAsync containing the todo or an error
 */
export function readById(db: Kysely<Database>, id: string) {
  return ResultAsync.fromPromise(
    db
      .selectFrom('todos')
      .select([
        'id',
        'content',
        'completed',
        (eb) => eb.fn('strftime', ['%Y-%m-%dT%H:%M:%SZ', eb.ref('created_at')]).as('createdAt'),
        (eb) => eb.fn('strftime', ['%Y-%m-%dT%H:%M:%SZ', eb.ref('updated_at')]).as('updatedAt'),
      ])
      .where('id', '=', id)
      .executeTakeFirst(),
    (e) =>
      e instanceof Error ? new DatabaseError(e.message, e) : new DatabaseError('Database error', e),
  ).andThen((result) => {
    if (!result) {
      return err(new DataNotFoundError('Todo not found'))
    }
    const parsed = TodoSchema.safeParse(result)
    if (!parsed.success) {
      return err(new ValidationError('Invalid data from database'))
    }
    return ok(parsed.data)
  })
}

/**
 * Creates a new todo.
 *
 * ```mermaid
 * flowchart TD
 *   A([Start]) --> B[Generate UUID]
 *   B --> C[Execute Kysely INSERT query]
 *   C --> D{Insert success?}
 *   D -->|No| E[Return DatabaseError]
 *   D -->|Yes| F[Return undefined]
 *   E --> G([End])
 *   F --> G
 * ```
 *
 * @param db - The Kysely database instance
 * @param content - The content of the todo (1-140 characters)
 * @returns A ResultAsync indicating success or an error
 */
export function create(db: Kysely<Database>, content: string) {
  const id = crypto.randomUUID()
  return ResultAsync.fromPromise(db.insertInto('todos').values({ id, content }).execute(), (e) =>
    e instanceof Error ? new DatabaseError(e.message, e) : new DatabaseError('Database error', e),
  ).map(() => undefined)
}

/**
 * Updates an existing todo.
 *
 * ```mermaid
 * flowchart TD
 *   A([Start]) --> B{Has update fields?}
 *   B -->|No| C[Return undefined immediately]
 *   B -->|Yes| D[Build Kysely UPDATE query dynamically]
 *   D --> E[Execute query]
 *   E --> F{Update success?}
 *   F -->|No| G[Return DatabaseError]
 *   F -->|Yes| H[Return undefined]
 *   C --> I([End])
 *   G --> I
 *   H --> I
 * ```
 *
 * @param db - The Kysely database instance
 * @param id - The UUID of the todo to update
 * @param data - The fields to update
 * @returns A ResultAsync indicating success or an error
 */
export function update(
  db: Kysely<Database>,
  id: string,
  data: { content?: string; completed?: number },
) {
  if (data.content === undefined && data.completed === undefined) {
    return ResultAsync.fromSafePromise(Promise.resolve(undefined))
  }

  const updateValues: Record<string, string | number> = {}
  if (data.content !== undefined) {
    updateValues.content = data.content
  }
  if (data.completed !== undefined) {
    updateValues.completed = data.completed
  }

  return ResultAsync.fromPromise(
    db
      .updateTable('todos')
      .set({
        ...updateValues,
        updated_at: new Date().toISOString().replace('T', ' ').split('.')[0],
      })
      .where('id', '=', id)
      .execute(),
    (e) =>
      e instanceof Error ? new DatabaseError(e.message, e) : new DatabaseError('Database error', e),
  ).map(() => undefined)
}

/**
 * Deletes a todo by its ID.
 *
 * ```mermaid
 * flowchart TD
 *   A([Start]) --> B[Execute Kysely DELETE query with ID]
 *   B --> C{Delete success?}
 *   C -->|No| D[Return DatabaseError]
 *   C -->|Yes| E[Return undefined]
 *   D --> F([End])
 *   E --> F
 * ```
 *
 * @param db - The Kysely database instance
 * @param id - The UUID of the todo to delete
 * @returns A ResultAsync indicating success or an error
 */
export function remove(db: Kysely<Database>, id: string) {
  return ResultAsync.fromPromise(db.deleteFrom('todos').where('id', '=', id).execute(), (e) =>
    e instanceof Error ? new DatabaseError(e.message, e) : new DatabaseError('Database error', e),
  ).map(() => undefined)
}
