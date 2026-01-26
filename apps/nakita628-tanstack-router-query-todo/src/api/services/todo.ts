import { z } from '@hono/zod-openapi'
import { desc, eq } from 'drizzle-orm'
import { err, ok, ResultAsync } from 'neverthrow'
import type { Database } from '@/api/db'
import { todos } from '@/api/db'
import { DatabaseError, DataNotFoundError, ValidationError } from '@/api/domain/error'
import { TodoSchema } from '@/api/routes'

export function readAll(db: Database, limit?: number, offset?: number) {
  const TodoArraySchema = z.array(TodoSchema)
  const baseQuery = db
    .select({
      id: todos.id,
      content: todos.content,
      completed: todos.completed,
      createdAt: todos.createdAt,
      updatedAt: todos.updatedAt,
    })
    .from(todos)
    .orderBy(desc(todos.createdAt))

  const queryWithLimit = limit !== undefined ? baseQuery.limit(limit) : baseQuery
  const queryWithOffset = offset !== undefined ? queryWithLimit.offset(offset) : queryWithLimit

  return ResultAsync.fromPromise(queryWithOffset, (e) =>
    e instanceof Error ? new DatabaseError(e.message, e) : new DatabaseError('Database error', e),
  ).andThen((results) => {
    const parsed = TodoArraySchema.safeParse(results)
    if (!parsed.success) {
      return err(new ValidationError('Invalid data from database'))
    }
    return ok(parsed.data)
  })
}

export function readById(db: Database, id: string) {
  return ResultAsync.fromPromise(
    db
      .select({
        id: todos.id,
        content: todos.content,
        completed: todos.completed,
        createdAt: todos.createdAt,
        updatedAt: todos.updatedAt,
      })
      .from(todos)
      .where(eq(todos.id, id))
      .get(),
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

export function create(db: Database, content: string) {
  const id = crypto.randomUUID()
  return ResultAsync.fromPromise(db.insert(todos).values({ id, content }).run(), (e) =>
    e instanceof Error ? new DatabaseError(e.message, e) : new DatabaseError('Database error', e),
  ).map(() => undefined)
}

export function update(db: Database, id: string, data: { content?: string; completed?: number }) {
  return ResultAsync.fromPromise(
    db
      .update(todos)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(todos.id, id))
      .run(),
    (e) =>
      e instanceof Error ? new DatabaseError(e.message, e) : new DatabaseError('Database error', e),
  ).map(() => undefined)
}

export function remove(db: Database, id: string) {
  return ResultAsync.fromPromise(db.delete(todos).where(eq(todos.id, id)).run(), (e) =>
    e instanceof Error ? new DatabaseError(e.message, e) : new DatabaseError('Database error', e),
  ).map(() => undefined)
}
