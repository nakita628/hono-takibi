import type { ResultAsync } from 'neverthrow'
import type { AppError } from '@/domain/errorDomain'

export type Todo = Readonly<{
  id: string
  content: string
  createdAt: string
  updatedAt: string
}>

export type TodoRepo = Readonly<{
  getTodo: (limit?: number, offset?: number) => ResultAsync<Todo[], AppError>
  postTodo: (content: string) => ResultAsync<void, AppError>
  getTodoId: (id: string) => ResultAsync<Todo, AppError>
  putTodoId: (id: string, content: string) => ResultAsync<void, AppError>
  deleteTodoId: (id: string) => ResultAsync<void, AppError>
}>
