import { err, ok, type ResultAsync } from 'neverthrow'
import type { AppError } from '@/domain/errorDomain'
import { type Todo, TodoSchema } from '@/schema/todo'
import type { TodoRepo } from '@/services/todoService'

export function getTodoTransaction(
  repo: TodoRepo,
  limit: number = 10,
  offset: number = 0,
): ResultAsync<Todo[], AppError> {
  return repo.getTodo(limit, offset).andThen((todos) => {
    const valid = TodoSchema.array().safeParse(todos)
    if (!valid.success) {
      return err({ kind: 'INTERNAL_SERVER_ERROR', message: 'Todo Array validation error' } as const)
    }
    return ok(valid.data)
  })
}

export function postTodoTransaction(repo: TodoRepo, content: string): ResultAsync<void, AppError> {
  return repo.postTodo(content).andThen(() => ok(undefined))
}

export function getTodoIdTransaction(repo: TodoRepo, id: string): ResultAsync<Todo, AppError> {
  return repo.getTodoId(id).andThen((todo) => {
    const valid = TodoSchema.safeParse(todo)
    if (!valid.success) {
      return err({ kind: 'INTERNAL_SERVER_ERROR', message: 'Todo validation error' } as const)
    }
    return ok(valid.data)
  })
}

export function putTodoIdTransaction(
  repo: TodoRepo,
  id: string,
  content: string,
): ResultAsync<void, AppError> {
  return repo.putTodoId(id, content).andThen(() => ok(undefined))
}

export function deleteTodoIdTransaction(repo: TodoRepo, id: string): ResultAsync<void, AppError> {
  return repo.deleteTodoId(id).andThen(() => ok(undefined))
}
