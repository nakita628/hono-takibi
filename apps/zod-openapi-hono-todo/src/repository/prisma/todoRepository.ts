import { err, fromPromise, ok, type ResultAsync } from 'neverthrow'
import type { AppError } from '@/domain/errorDomain'
import { dbErr } from '@/domain/errorDomain'
import type { Todo, TodoRepo } from '@/domain/todoDomain'
import prisma from '@/infra/prisma'

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
  ).andThen((rows) => ok(rows))
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
    return ok(row)
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
