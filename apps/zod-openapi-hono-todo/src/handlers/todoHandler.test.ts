// ./src/handlers/todoHandler.test.ts
import { testClient } from 'hono/testing'
import { errAsync, okAsync } from 'neverthrow'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { AppError } from '@/domain/errorDomain'
import { api } from '@/index.ts'
import type { Todo } from '@/schema/todo'

// Test run
// pnpm vitest run ./src/handlers/todoHandler.test.ts

vi.mock('@/transactions/todoTransaction.ts', () => ({
  getTodoTransaction: vi.fn(),
  postTodoTransaction: vi.fn(),
  getTodoIdTransaction: vi.fn(),
  putTodoIdTransaction: vi.fn(),
  deleteTodoIdTransaction: vi.fn(),
}))

import * as todoTransaction from '@/transactions/todoTransaction.ts'

const mockTodoTransaction = vi.mocked(todoTransaction, true)

const client = testClient(api)

describe('todo route handlers (transactions mocked)', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('POST /todo', () => {
    it.concurrent('200 OK', async () => {
      mockTodoTransaction.postTodoTransaction.mockReturnValueOnce(
        okAsync<void, AppError>(undefined),
      )

      const res = await client.todo.$post({ json: { content: 'Hono🔥' } })

      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual({ message: 'Todo created' })
      expect(mockTodoTransaction.postTodoTransaction).toHaveBeenCalledWith(
        expect.any(Object),
        'Hono🔥',
      )
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
      mockTodoTransaction.getTodoTransaction.mockReturnValueOnce(okAsync<Todo[], AppError>(todos))

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
      mockTodoTransaction.getTodoIdTransaction.mockReturnValueOnce(okAsync<Todo, AppError>(todo))

      const res = await client.todo[':id'].$get({
        param: { id: 'c6c0f743-01fa-4c23-80d6-1b358512e213' },
      })

      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual(todo)
    })

    it.concurrent('404 Not Found', async () => {
      mockTodoTransaction.getTodoIdTransaction.mockReturnValueOnce(
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
      mockTodoTransaction.putTodoIdTransaction.mockReturnValueOnce(
        okAsync<void, AppError>(undefined),
      )

      const res = await client.todo[':id'].$put({
        param: { id: 'c6c0f743-01fa-4c23-80d6-1b358512e213' },
        json: { content: 'updated' },
      })

      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual({ message: 'Todo updated' })
      expect(mockTodoTransaction.putTodoIdTransaction).toHaveBeenCalledWith(
        expect.any(Object),
        'c6c0f743-01fa-4c23-80d6-1b358512e213',
        'updated',
      )
    })
  })

  describe('DELETE /todo/:id', () => {
    it.concurrent('200 OK', async () => {
      mockTodoTransaction.deleteTodoIdTransaction.mockReturnValueOnce(
        okAsync<void, AppError>(undefined),
      )

      const res = await client.todo[':id'].$delete({
        param: { id: 'c6c0f743-01fa-4c23-80d6-1b358512e213' },
      })

      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual({ message: 'Todo deleted' })
    })
  })
})
