import { desc, eq } from 'drizzle-orm'
import { err, fromPromise, ok, type ResultAsync } from 'neverthrow'
import { type AppError, dbErr } from '@/domain/errorDomain'
import db, { table } from '@/infra/drizzle'

type Todo = {
  readonly id: string
  readonly content: string
  readonly createdAt: string
  readonly updatedAt: string
}

export type TodoRepo = {
  getTodo: (limit: number, offset: number) => ResultAsync<Todo[], AppError>
  postTodo: (content: string) => ResultAsync<void, AppError>
  getTodoId: (id: string) => ResultAsync<Todo, AppError>
  putTodoId: (id: string, content: string) => ResultAsync<void, AppError>
  deleteTodoId: (id: string) => ResultAsync<void, AppError>
}

export function makeDrizzleTodoRepo(): TodoRepo {
  return {
    getTodo,
    postTodo,
    getTodoId,
    putTodoId,
    deleteTodoId,
  }
}

function getTodo(limit: number = 10, offset: number = 0): ResultAsync<Todo[], AppError> {
  return fromPromise(
    db.select().from(table.todo).orderBy(desc(table.todo.createdAt)).limit(limit).offset(offset),
    (e) => dbErr(e),
  )
}

function postTodo(post: string): ResultAsync<void, AppError> {
  return fromPromise(db.insert(table.todo).values({ content: post }), (e) => dbErr(e)).map(
    () => undefined,
  )
}

function getTodoId(id: string): ResultAsync<Todo, AppError> {
  return fromPromise(db.select().from(table.todo).where(eq(table.todo.id, id)).limit(1), (e) =>
    dbErr(e),
  ).andThen((rows) => {
    if (rows.length === 0) {
      return err({ kind: 'NOT_FOUND', message: 'Todo not found' } as const)
    }
    return ok(rows[0])
  })
}

function putTodoId(id: string, content: string): ResultAsync<void, AppError> {
  return fromPromise(
    db
      .update(table.todo)
      .set({ content })
      .where(eq(table.todo.id, id))
      .returning({ id: table.todo.id }),
    (e) => dbErr(e),
  ).andThen((rows) => {
    if (rows.length === 0) {
      return err({ kind: 'NOT_FOUND', message: 'Todo not found' } as const)
    }
    return ok(undefined)
  })
}

function deleteTodoId(id: string): ResultAsync<void, AppError> {
  return fromPromise(
    db.delete(table.todo).where(eq(table.todo.id, id)).returning({ id: table.todo.id }),
    (e) => dbErr(e),
  ).andThen((rows) => {
    if (rows.length === 0) {
      return err({ kind: 'NOT_FOUND', message: 'Todo not found' } as const)
    }
    return ok(undefined)
  })
}
