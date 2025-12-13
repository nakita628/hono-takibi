import { desc, eq } from 'drizzle-orm'
import { err, fromPromise, ok } from 'neverthrow'
import { dbError } from '@/domain'
import db, { table } from '@/infra'

export function getTodo(limit: number = 10, offset: number = 0) {
  return fromPromise(
    db.select().from(table.todo).orderBy(desc(table.todo.createdAt)).limit(limit).offset(offset),
    (e) => dbError(e),
  )
}

export function postTodo(content: string) {
  return fromPromise(db.insert(table.todo).values({ content }).returning(), (e) => dbError(e)).map(
    () => undefined,
  )
}

export function getTodoId(id: string) {
  return fromPromise(db.select().from(table.todo).where(eq(table.todo.id, id)).limit(1), (e) =>
    dbError(e),
  ).andThen((todos) => {
    if (todos.length === 0) {
      return err({ kind: 'NotFound', message: 'Todo not found' } as const)
    }
    return ok(todos[0])
  })
}

export function putTodoId(id: string, content: string) {
  return fromPromise(
    db.update(table.todo).set({ content }).where(eq(table.todo.id, id)).returning(),
    (e) => dbError(e),
  ).andThen((rows) => {
    if (rows.length === 0) {
      return err({ kind: 'NotFound', message: 'Todo not found' } as const)
    }
    return ok(rows[0])
  })
}

export function deleteTodoId(id: string) {
  return fromPromise(db.delete(table.todo).where(eq(table.todo.id, id)).returning(), (e) =>
    dbError(e),
  ).andThen((rows) => {
    if (rows.length === 0) {
      return err({ kind: 'NotFound', message: 'Todo not found' } as const)
    }
    return ok(rows[0])
  })
}
