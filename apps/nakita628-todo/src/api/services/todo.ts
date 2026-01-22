import { z } from '@hono/zod-openapi'
import { err, ok, ResultAsync } from 'neverthrow'
import { DatabaseError, DataNotFoundError, ValidationError } from '@/api/domain/error'
import { TodoSchema } from '@/api/routes'

const TodoArraySchema = z.array(TodoSchema)

/**
 * Retrieves all todos from the database.
 *
 * ```mermaid
 * flowchart TD
 *   A([Start]) --> B[Build SQL query]
 *   B --> C{Has limit/offset?}
 *   C -->|Yes| D[Add LIMIT/OFFSET clauses]
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
 * @param db - The D1 database instance
 * @param limit - Optional maximum number of todos to return
 * @param offset - Optional number of todos to skip
 * @returns A ResultAsync containing an array of todos or an error
 */
export function readAll(db: D1Database, limit?: number, offset?: number) {
  const baseQuery =
    "SELECT id, content, completed, strftime('%Y-%m-%dT%H:%M:%SZ', created_at) as createdAt, strftime('%Y-%m-%dT%H:%M:%SZ', updated_at) as updatedAt FROM todos ORDER BY created_at DESC"
  const params: number[] = [
    ...(limit !== undefined ? [limit] : []),
    ...(offset !== undefined ? [offset] : []),
  ]
  const limitClause = limit !== undefined ? ' LIMIT ?' : ''
  const offsetClause = offset !== undefined ? ' OFFSET ?' : ''
  const query = baseQuery + limitClause + offsetClause
  const stmt = params.length > 0 ? db.prepare(query).bind(...params) : db.prepare(query)

  return ResultAsync.fromPromise(
    stmt.all(),
    (e) => new DatabaseError(e instanceof Error ? e.message : 'Database error', e),
  ).andThen((result) => {
    const parsed = TodoArraySchema.safeParse(result.results)
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
 *   A([Start]) --> B[Execute SELECT query with ID]
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
 * @param db - The D1 database instance
 * @param id - The UUID of the todo to retrieve
 * @returns A ResultAsync containing the todo or an error
 */
export function readById(db: D1Database, id: string) {
  return ResultAsync.fromPromise(
    db
      .prepare(
        "SELECT id, content, completed, strftime('%Y-%m-%dT%H:%M:%SZ', created_at) as createdAt, strftime('%Y-%m-%dT%H:%M:%SZ', updated_at) as updatedAt FROM todos WHERE id = ?",
      )
      .bind(id)
      .first(),
    (e) => new DatabaseError(e instanceof Error ? e.message : 'Database error', e),
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
 *   B --> C[Execute INSERT query]
 *   C --> D{Insert success?}
 *   D -->|No| E[Return DatabaseError]
 *   D -->|Yes| F[Return undefined]
 *   E --> G([End])
 *   F --> G
 * ```
 *
 * @param db - The D1 database instance
 * @param content - The content of the todo (1-140 characters)
 * @returns A ResultAsync indicating success or an error
 */
export function create(db: D1Database, content: string) {
  const id = crypto.randomUUID()
  return ResultAsync.fromPromise(
    db.prepare('INSERT INTO todos (id, content) VALUES (?, ?)').bind(id, content).run(),
    (e) => new DatabaseError(e instanceof Error ? e.message : 'Database error', e),
  ).map(() => undefined)
}

/**
 * Updates an existing todo.
 *
 * ```mermaid
 * flowchart TD
 *   A([Start]) --> B{Has update fields?}
 *   B -->|No| C[Return undefined immediately]
 *   B -->|Yes| D[Build SET clause dynamically]
 *   D --> E[Add updated_at timestamp]
 *   E --> F[Execute UPDATE query]
 *   F --> G{Update success?}
 *   G -->|No| H[Return DatabaseError]
 *   G -->|Yes| I[Return undefined]
 *   C --> J([End])
 *   H --> J
 *   I --> J
 * ```
 *
 * @param db - The D1 database instance
 * @param id - The UUID of the todo to update
 * @param data - The fields to update
 * @returns A ResultAsync indicating success or an error
 */
export function update(db: D1Database, id: string, data: { content?: string; completed?: number }) {
  const contentUpdate = data.content !== undefined ? ['content = ?'] : []
  const completedUpdate = data.completed !== undefined ? ['completed = ?'] : []
  const updates = [...contentUpdate, ...completedUpdate]

  if (updates.length === 0) {
    return ResultAsync.fromSafePromise(Promise.resolve(undefined))
  }

  const contentValue = data.content !== undefined ? [data.content] : []
  const completedValue = data.completed !== undefined ? [data.completed] : []
  const values: (string | number)[] = [...contentValue, ...completedValue, id]
  const allUpdates = [...updates, "updated_at = datetime('now')"]

  return ResultAsync.fromPromise(
    db
      .prepare(`UPDATE todos SET ${allUpdates.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run(),
    (e) => new DatabaseError(e instanceof Error ? e.message : 'Database error', e),
  ).map(() => undefined)
}

/**
 * Deletes a todo by its ID.
 *
 * ```mermaid
 * flowchart TD
 *   A([Start]) --> B[Execute DELETE query with ID]
 *   B --> C{Delete success?}
 *   C -->|No| D[Return DatabaseError]
 *   C -->|Yes| E[Return undefined]
 *   D --> F([End])
 *   E --> F
 * ```
 *
 * @param db - The D1 database instance
 * @param id - The UUID of the todo to delete
 * @returns A ResultAsync indicating success or an error
 */
export function remove(db: D1Database, id: string) {
  return ResultAsync.fromPromise(
    db.prepare('DELETE FROM todos WHERE id = ?').bind(id).run(),
    (e) => new DatabaseError(e instanceof Error ? e.message : 'Database error', e),
  ).map(() => undefined)
}
