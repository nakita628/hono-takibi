import { err, fromPromise, ok, type ResultAsync } from 'neverthrow'
import type { AppError } from '@/domain/errorDomain'
import { dbErr } from '@/domain/errorDomain'
import prisma from '@/infra/prisma'

type Todo = {
  readonly id: string
  readonly content: string
  readonly createdAt: string | Date
  readonly updatedAt: string | Date
}

export type TodoRepo = {
  getTodo: (limit: number, offset: number) => ResultAsync<Todo[], AppError>
  postTodo: (content: string) => ResultAsync<void, AppError>
  getTodoId: (id: string) => ResultAsync<Todo, AppError>
  putTodoId: (id: string, content: string) => ResultAsync<void, AppError>
  deleteTodoId: (id: string) => ResultAsync<void, AppError>
}

export function makePrismaTodoRepo(): TodoRepo {
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
    prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    }),
    (e) => dbErr(e),
  ).andThen((rows) => {
    const todos = rows.map((row: Todo) => ({
      id: row.id,
      content: row.content,
      createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : row.createdAt,
      updatedAt: row.updatedAt instanceof Date ? row.updatedAt.toISOString() : row.updatedAt,
    }))
    return ok(todos)
  })
}

function postTodo(post: string): ResultAsync<void, AppError> {
  return fromPromise(
    prisma.todo.create({
      data: { content: post },
    }),
    (e) => dbErr(e),
  ).map(() => undefined)
}

function getTodoId(id: string): ResultAsync<Todo, AppError> {
  return fromPromise(
    prisma.todo.findUnique({
      where: { id },
    }),
    (e) => dbErr(e),
  ).andThen((row) => {
    if (!row) {
      return err({ kind: 'NOT_FOUND', message: 'Todo not found' } as const)
    }
    const todo: Todo = {
      id: row.id,
      content: row.content,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    }
    return ok(todo)
  })
}

function putTodoId(id: string, content: string): ResultAsync<void, AppError> {
  return fromPromise(
    prisma.todo.updateMany({
      where: { id },
      data: { content },
    }),
    (e) => dbErr(e),
  ).andThen((res) => {
    if (res.count === 0) {
      return err({ kind: 'NOT_FOUND', message: 'Todo not found' } as const)
    }
    return ok(undefined)
  })
}

function deleteTodoId(id: string): ResultAsync<void, AppError> {
  return fromPromise(
    prisma.todo.deleteMany({
      where: { id },
    }),
    (e) => dbErr(e),
  ).andThen((res) => {
    if (res.count === 0) {
      return err({ kind: 'NOT_FOUND', message: 'Todo not found' } as const)
    }
    return ok(undefined)
  })
}
