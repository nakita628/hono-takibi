import { desc, eq } from 'drizzle-orm'
import { err, ok, ResultAsync } from 'neverthrow'
import { db, todos } from '@/api/db'
import { DatabaseError, DataNotFoundError } from '@/api/domain'

export function readAll(limit = 10, offset = 0) {
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
      .orderBy(desc(todos.createdAt))
      .limit(limit)
      .offset(offset),
    (e) => new DatabaseError(e instanceof Error ? e.message : 'Database error', e),
  )
}

export function readById(id: string) {
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
    (e) => new DatabaseError(e instanceof Error ? e.message : 'Database error', e),
  ).andThen((result) => (result ? ok(result) : err(new DataNotFoundError('Todo not found'))))
}

export function create(content: string) {
  const id = crypto.randomUUID()
  return ResultAsync.fromPromise(
    db.insert(todos).values({ id, content }).run(),
    (e) => new DatabaseError(e instanceof Error ? e.message : 'Database error', e),
  ).map(() => undefined)
}

export function update(id: string, data: { content?: string; completed?: number }) {
  return ResultAsync.fromPromise(
    db
      .update(todos)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(todos.id, id))
      .run(),
    (e) => new DatabaseError(e instanceof Error ? e.message : 'Database error', e),
  ).map(() => undefined)
}

export function remove(id: string) {
  return ResultAsync.fromPromise(
    db.delete(todos).where(eq(todos.id, id)).run(),
    (e) => new DatabaseError(e instanceof Error ? e.message : 'Database error', e),
  ).map(() => undefined)
}
