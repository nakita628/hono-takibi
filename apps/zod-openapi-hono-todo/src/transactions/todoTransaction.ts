import { err, ok, type ResultAsync } from 'neverthrow'
import type { AppError } from '@/domain/errorDomain'
import type { TodoRepo } from '@/domain/todoDomain'
import { type Todo, TodoSchema } from '@/schema/todo'

export async function getTodoTransaction(
  repo: TodoRepo,
  limit: number = 10,
  offset: number = 0,
): Promise<ResultAsync<Todo[], AppError>> {
  const result = await repo.getTodo(limit, offset)
  const valid = TodoSchema.array().safeParse(result)
  if (!valid.success) {
    return err({ kind: 'INTERNAL_SERVER_ERROR', message: 'Todo Array validation error' })
  }
  return ok(valid.data)
}

export async function postTodoTransaction(
  repo: TodoRepo,
  content: string,
): Promise<ResultAsync<void, AppError>> {
  return await repo.postTodo(content)
}

export async function getTodoIdTransaction(
  repo: TodoRepo,
  id: string,
): Promise<ResultAsync<Todo, AppError>> {
  const result = await repo.getTodoId(id)
  const valid = TodoSchema.safeParse(result)
  if (!valid.success) {
    return err({ kind: 'INTERNAL_SERVER_ERROR', message: 'Todo validation error' })
  }
  return ok(valid.data)
}

export async function putTodoIdTransaction(
  repo: TodoRepo,
  id: string,
  content: string,
): Promise<ResultAsync<void, AppError>> {
  return await repo.putTodoId(id, content)
}

export async function deleteTodoIdTransaction(
  repo: TodoRepo,
  id: string,
): Promise<ResultAsync<void, AppError>> {
  return await repo.deleteTodoId(id)
}
