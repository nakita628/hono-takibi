import { desc, eq } from 'drizzle-orm'
import { err, fromPromise, ok } from 'neverthrow'
import { DatabaseError, NotFoundError } from '@/domain'
import db, { table } from '@/infra'

export function getTodo(limit: number = 10, offset: number = 0) {
  return fromPromise(
    db.select().from(table.todo).orderBy(desc(table.todo.createdAt)).limit(limit).offset(offset),
    () => new DatabaseError('Database Connection Error'),
  )
}

export function postTodo(content: string) {
  return fromPromise(
    db.insert(table.todo).values({ content }).returning(),
    () => new DatabaseError('Database Connection Error'),
  ).map(() => undefined)
}

export function getTodoId(id: string) {
  return fromPromise(
    db.select().from(table.todo).where(eq(table.todo.id, id)).limit(1),
    () => new DatabaseError('Database Connection Error'),
  ).andThen((todos) => {
    if (todos.length === 0) {
      return err(new NotFoundError('Todo not found'))
    }
    return ok(todos[0])
  })
}

export function putTodoId(id: string, content: string) {
  return fromPromise(
    db.update(table.todo).set({ content }).where(eq(table.todo.id, id)).returning(),
    () => new DatabaseError('Database Connection Error'),
  ).andThen((rows) => {
    if (rows.length === 0) {
      return err(new NotFoundError('Todo not found'))
    }
    return ok(rows[0])
  })
}

export function deleteTodoId(id: string) {
  return fromPromise(
    db.delete(table.todo).where(eq(table.todo.id, id)).returning(),
    () => new DatabaseError('Database Connection Error'),
  ).andThen((rows) => {
    if (rows.length === 0) {
      return err(new NotFoundError('Todo not found'))
    }
    return ok(rows[0])
  })
}
