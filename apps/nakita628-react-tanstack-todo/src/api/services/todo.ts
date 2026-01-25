import { z } from '@hono/zod-openapi'
import { Effect } from 'effect'
import type { Kysely } from 'kysely'
import type { Database } from '@/api/db'
import { DatabaseError, DataNotFoundError, ValidationError } from '@/api/domain/error'
import { TodoSchema } from '@/api/routes'

const TodoArraySchema = z.array(TodoSchema)

/**
 * Retrieves all todos from the database.
 *
 * @param db - The Kysely database instance
 * @param limit - Optional maximum number of todos to return
 * @param offset - Optional number of todos to skip
 * @returns An Effect containing an array of todos or an error
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

  return Effect.tryPromise({
    try: () => queryWithOffset.execute(),
    catch: (e) =>
      new DatabaseError({
        message: e instanceof Error ? e.message : 'Database error',
        cause: e,
      }),
  }).pipe(
    Effect.flatMap((results) => {
      const parsed = TodoArraySchema.safeParse(results)
      if (!parsed.success) {
        return Effect.fail(new ValidationError({ message: 'Invalid data from database' }))
      }
      return Effect.succeed(parsed.data)
    }),
  )
}

/**
 * Retrieves a single todo by its ID.
 *
 * @param db - The Kysely database instance
 * @param id - The UUID of the todo to retrieve
 * @returns An Effect containing the todo or an error
 */
export function readById(db: Kysely<Database>, id: string) {
  return Effect.tryPromise({
    try: () =>
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
    catch: (e) =>
      new DatabaseError({
        message: e instanceof Error ? e.message : 'Database error',
        cause: e,
      }),
  }).pipe(
    Effect.flatMap((result) => {
      if (!result) {
        return Effect.fail(new DataNotFoundError({ message: 'Todo not found' }))
      }
      const parsed = TodoSchema.safeParse(result)
      if (!parsed.success) {
        return Effect.fail(new ValidationError({ message: 'Invalid data from database' }))
      }
      return Effect.succeed(parsed.data)
    }),
  )
}

/**
 * Creates a new todo.
 *
 * @param db - The Kysely database instance
 * @param content - The content of the todo (1-140 characters)
 * @returns An Effect indicating success or an error
 */
export function create(db: Kysely<Database>, content: string) {
  const id = crypto.randomUUID()
  return Effect.tryPromise({
    try: () => db.insertInto('todos').values({ id, content }).execute(),
    catch: (e) =>
      new DatabaseError({
        message: e instanceof Error ? e.message : 'Database error',
        cause: e,
      }),
  }).pipe(Effect.map(() => undefined))
}

/**
 * Updates an existing todo.
 *
 * @param db - The Kysely database instance
 * @param id - The UUID of the todo to update
 * @param data - The fields to update
 * @returns An Effect indicating success or an error
 */
export function update(
  db: Kysely<Database>,
  id: string,
  data: { content?: string; completed?: number },
) {
  if (data.content === undefined && data.completed === undefined) {
    return Effect.succeed(undefined)
  }

  const updateValues: Record<string, string | number> = {}
  if (data.content !== undefined) {
    updateValues.content = data.content
  }
  if (data.completed !== undefined) {
    updateValues.completed = data.completed
  }

  return Effect.tryPromise({
    try: () =>
      db
        .updateTable('todos')
        .set({
          ...updateValues,
          updated_at: new Date().toISOString().replace('T', ' ').split('.')[0],
        })
        .where('id', '=', id)
        .execute(),
    catch: (e) =>
      new DatabaseError({
        message: e instanceof Error ? e.message : 'Database error',
        cause: e,
      }),
  }).pipe(Effect.map(() => undefined))
}

/**
 * Deletes a todo by its ID.
 *
 * @param db - The Kysely database instance
 * @param id - The UUID of the todo to delete
 * @returns An Effect indicating success or an error
 */
export function remove(db: Kysely<Database>, id: string) {
  return Effect.tryPromise({
    try: () => db.deleteFrom('todos').where('id', '=', id).execute(),
    catch: (e) =>
      new DatabaseError({
        message: e instanceof Error ? e.message : 'Database error',
        cause: e,
      }),
  }).pipe(Effect.map(() => undefined))
}
