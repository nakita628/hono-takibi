import { sql } from 'kysely'
import { err, ok, ResultAsync } from 'neverthrow'
import { db } from '@/api/db'
import { DatabaseError, DataNotFoundError } from '@/api/domain'

export function readAll(limit = 10, offset = 0) {
  return ResultAsync.fromPromise(
    db
      .selectFrom('todos')
      .select([
        'id',
        'content',
        'completed',
        sql<string>`strftime('%Y-%m-%dT%H:%M:%SZ', created_at)`.as('createdAt'),
        sql<string>`strftime('%Y-%m-%dT%H:%M:%SZ', updated_at)`.as('updatedAt'),
      ])
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset)
      .execute(),
    (e) => new DatabaseError(e instanceof Error ? e.message : 'Database error', e),
  )
}

export function readById(id: string) {
  return ResultAsync.fromPromise(
    db
      .selectFrom('todos')
      .select([
        'id',
        'content',
        'completed',
        sql<string>`strftime('%Y-%m-%dT%H:%M:%SZ', created_at)`.as('createdAt'),
        sql<string>`strftime('%Y-%m-%dT%H:%M:%SZ', updated_at)`.as('updatedAt'),
      ])
      .where('id', '=', id)
      .executeTakeFirst(),
    (e) => new DatabaseError(e instanceof Error ? e.message : 'Database error', e),
  ).andThen((result) => (result ? ok(result) : err(new DataNotFoundError('Todo not found'))))
}

export function create(content: string) {
  const id = crypto.randomUUID()
  return ResultAsync.fromPromise(
    db.insertInto('todos').values({ id, content }).execute(),
    (e) => new DatabaseError(e instanceof Error ? e.message : 'Database error', e),
  ).map(() => undefined)
}

export function update(id: string, data: { content?: string; completed?: number }) {
  const updateValues: Record<string, string | number> = {
    updated_at: new Date().toISOString().replace('T', ' ').split('.')[0],
  }
  if (data.content !== undefined) updateValues.content = data.content
  if (data.completed !== undefined) updateValues.completed = data.completed

  return ResultAsync.fromPromise(
    db.updateTable('todos').set(updateValues).where('id', '=', id).execute(),
    (e) => new DatabaseError(e instanceof Error ? e.message : 'Database error', e),
  ).map(() => undefined)
}

export function remove(id: string) {
  return ResultAsync.fromPromise(
    db.deleteFrom('todos').where('id', '=', id).execute(),
    (e) => new DatabaseError(e instanceof Error ? e.message : 'Database error', e),
  ).map(() => undefined)
}
