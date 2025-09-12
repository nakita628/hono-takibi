import { err, ok, type ResultAsync } from 'neverthrow'
import type { AppError } from '@/domain/errorDomain'
import type { TodoRepo } from '@/repository/drizzle/todoRepository'
import { makeDrizzleTodoRepo } from '@/repository/drizzle/todoRepository'
// import { makePrismaTodoRepo } from '@/repository/prisma/todoRepository'
import { type Todo, TodoSchema } from '@/schema/todo'

export type TodoService = {
  getTodo: (limit?: number, offset?: number) => ResultAsync<Todo[], AppError>
  postTodo: (content: string) => ResultAsync<void, AppError>
  getTodoId: (id: string) => ResultAsync<Todo, AppError>
  putTodoId: (id: string, content: string) => ResultAsync<void, AppError>
  deleteTodoId: (id: string) => ResultAsync<void, AppError>
}

export const todoService = makeTodoService(makeDrizzleTodoRepo())

function makeTodoService(repo: TodoRepo): TodoService {
  return {
    getTodo: (limit: number = 10, offset: number = 0): ResultAsync<Todo[], AppError> => {
      return repo.getTodo(limit, offset).andThen((todos) => {
        const valid = TodoSchema.array().safeParse(todos)
        if (!valid.success) {
          return err({
            kind: 'INTERNAL_SERVER_ERROR',
            message: 'Todo Array validation error',
          } as const)
        }
        return ok(valid.data)
      })
    },
    postTodo: (content: string): ResultAsync<void, AppError> => {
      return repo.postTodo(content).map(() => undefined)
    },
    getTodoId: (id: string): ResultAsync<Todo, AppError> => {
      return repo.getTodoId(id).andThen((todo) => {
        const valid = TodoSchema.safeParse(todo)
        if (!valid.success) {
          return err({ kind: 'INTERNAL_SERVER_ERROR', message: 'Todo validation error' } as const)
        }
        return ok(valid.data)
      })
    },
    putTodoId: (id: string, content: string): ResultAsync<void, AppError> => {
      return repo.putTodoId(id, content).map(() => undefined)
    },
    deleteTodoId: (id: string): ResultAsync<void, AppError> => {
      return repo.deleteTodoId(id).map(() => undefined)
    },
  }
}
