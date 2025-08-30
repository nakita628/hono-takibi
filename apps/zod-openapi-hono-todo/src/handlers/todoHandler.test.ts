// ./src/handlers/todoHandler.test.ts
import { testClient } from 'hono/testing'
import { errAsync, okAsync } from 'neverthrow'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { AppError } from '@/domain/errorDomain'
import { api } from '@/index'
import type { Todo } from '@/schema/todo'
import { todoService } from '@/services/todoService'

// Test run
// pnpm vitest run ./src/handlers/todoHandler.test.ts

vi.mock('@/services/todoService', () => ({
  todoService: {
    getTodo: vi.fn(),
    postTodo: vi.fn(),
    getTodoId: vi.fn(),
    putTodoId: vi.fn(),
    deleteTodoId: vi.fn(),
  },
}))

const mockTodoService = vi.mocked(todoService)

const client = testClient(api)

describe('todo route handlers (transactions mocked)', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('POST /todo', () => {
    it.concurrent('200 OK', async () => {
      mockTodoService.postTodo.mockReturnValueOnce(okAsync<void, AppError>(undefined))

      const res = await client.todo.$post({ json: { content: 'Hono🔥' } })

      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual({ message: 'Todo created' })
    })
  })

  describe('GET /todo', () => {
    it.concurrent('200 OK', async () => {
      const todos = [
        {
          id: 'c6c0f743-01fa-4c23-80d6-1b358512e213',
          content: 'Hono🔥',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ]
      mockTodoService.getTodo.mockReturnValueOnce(okAsync<Todo[], AppError>(todos))

      const res = await client.todo.$get({ query: { limit: '10', offset: '0' } })

      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual(todos)
    })
  })

  describe('GET /todo/:id', () => {
    it.concurrent('200 OK', async () => {
      const todo = {
        id: 'c6c0f743-01fa-4c23-80d6-1b358512e213',
        content: 'Hono🔥',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      }
      mockTodoService.getTodoId.mockReturnValueOnce(okAsync<Todo, AppError>(todo))

      const res = await client.todo[':id'].$get({
        param: { id: 'c6c0f743-01fa-4c23-80d6-1b358512e213' },
      })

      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual(todo)
    })

    it.concurrent('422 Unprocessable Content', async () => {
      const res = await client.todo[':id'].$get({
        param: { id: 'invalid-id' },
      })

      expect(res.status).toBe(422)
      expect(await res.json()).toStrictEqual({
        ok: false,
        errors: {
          errors: [],
          properties: {
            id: {
              errors: ['id must be UUID'],
            },
          },
        },
      })
    })

    it.concurrent('404 Not Found', async () => {
      mockTodoService.getTodoId.mockReturnValueOnce(
        errAsync({ kind: 'NOT_FOUND', message: 'Todo not found' }),
      )

      const res = await client.todo[':id'].$get({
        param: { id: 'c6c0f743-01fa-4c23-80d6-1b358512e213' },
      })

      expect(res.status).toBe(404)
      expect(await res.json()).toStrictEqual({ message: 'Todo not found' })
    })
  })

  describe('PUT /todo/:id', () => {
    it.concurrent('200 OK', async () => {
      mockTodoService.putTodoId.mockReturnValueOnce(okAsync<void, AppError>(undefined))

      const res = await client.todo[':id'].$put({
        param: { id: 'c6c0f743-01fa-4c23-80d6-1b358512e213' },
        json: { content: 'updated' },
      })

      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual({ message: 'Todo updated' })
    })
  })

  describe('DELETE /todo/:id', () => {
    it.concurrent('200 OK', async () => {
      mockTodoService.deleteTodoId.mockReturnValueOnce(okAsync<void, AppError>(undefined))

      const res = await client.todo[':id'].$delete({
        param: { id: 'c6c0f743-01fa-4c23-80d6-1b358512e213' },
      })

      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual({ message: 'Todo deleted' })
    })
  })
})
