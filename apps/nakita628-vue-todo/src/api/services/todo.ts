import { z } from '@hono/zod-openapi'
import { desc, eq, sql } from 'drizzle-orm'
import { Effect } from 'effect'
import type { DrizzleDB } from '@/api/db'
import { todos } from '@/api/db'
import { DatabaseError, DataNotFoundError, ValidationError } from '@/api/domain/error'
import { TodoSchema } from '@/api/routes'

const TodoArraySchema = z.array(TodoSchema)

/**
 * Retrieves all todos from the database.
 *
 * @param db - The Drizzle database instance
 * @param limit - Optional maximum number of todos to return
 * @param offset - Optional number of todos to skip
 * @returns An Effect containing an array of todos or an error
 */
export function readAll(db: DrizzleDB, limit?: number, offset?: number) {
  return Effect.tryPromise({
    try: () =>
      db
        .select({
          id: todos.id,
          content: todos.content,
          completed: todos.completed,
          createdAt: sql<string>`strftime('%Y-%m-%dT%H:%M:%SZ', ${todos.createdAt})`,
          updatedAt: sql<string>`strftime('%Y-%m-%dT%H:%M:%SZ', ${todos.updatedAt})`,
        })
        .from(todos)
        .orderBy(desc(todos.createdAt))
        .limit(limit ?? 100)
        .offset(offset ?? 0),
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
 * @param db - The Drizzle database instance
 * @param id - The UUID of the todo to retrieve
 * @returns An Effect containing the todo or an error
 */
export function readById(db: DrizzleDB, id: string) {
  return Effect.tryPromise({
    try: () =>
      db
        .select({
          id: todos.id,
          content: todos.content,
          completed: todos.completed,
          createdAt: sql<string>`strftime('%Y-%m-%dT%H:%M:%SZ', ${todos.createdAt})`,
          updatedAt: sql<string>`strftime('%Y-%m-%dT%H:%M:%SZ', ${todos.updatedAt})`,
        })
        .from(todos)
        .where(eq(todos.id, id))
        .limit(1),
    catch: (e) =>
      new DatabaseError({
        message: e instanceof Error ? e.message : 'Database error',
        cause: e,
      }),
  }).pipe(
    Effect.flatMap((results) => {
      const result = results[0]
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
 * @param db - The Drizzle database instance
 * @param content - The content of the todo (1-140 characters)
 * @returns An Effect indicating success or an error
 */
export function create(db: DrizzleDB, content: string) {
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  return Effect.tryPromise({
    try: () => db.insert(todos).values({ id, content, createdAt: now, updatedAt: now }),
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
 * @param db - The Drizzle database instance
 * @param id - The UUID of the todo to update
 * @param data - The fields to update
 * @returns An Effect indicating success or an error
 */
export function update(db: DrizzleDB, id: string, data: { content?: string; completed?: number }) {
  if (data.content === undefined && data.completed === undefined) {
    return Effect.succeed(undefined)
  }

  const updateValues: Record<string, string | number> = {
    updatedAt: new Date().toISOString(),
  }
  if (data.content !== undefined) {
    updateValues.content = data.content
  }
  if (data.completed !== undefined) {
    updateValues.completed = data.completed
  }

  return Effect.tryPromise({
    try: () => db.update(todos).set(updateValues).where(eq(todos.id, id)),
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
 * @param db - The Drizzle database instance
 * @param id - The UUID of the todo to delete
 * @returns An Effect indicating success or an error
 */
export function remove(db: DrizzleDB, id: string) {
  return Effect.tryPromise({
    try: () => db.delete(todos).where(eq(todos.id, id)),
    catch: (e) =>
      new DatabaseError({
        message: e instanceof Error ? e.message : 'Database error',
        cause: e,
      }),
  }).pipe(Effect.map(() => undefined))
}
