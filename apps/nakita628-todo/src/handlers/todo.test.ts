// ./src/handlers/todoHandler.test.ts
import { testClient } from 'hono/testing'
import { errAsync, okAsync } from 'neverthrow'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { api } from '@/index'
import * as todoService from '@/services'

// Test run
// pnpm vitest run ./src/handlers/todo.test.ts

vi.mock('@/services', () => ({
  postTodo: vi.fn(),
  getTodo: vi.fn(),
  getTodoId: vi.fn(),
  putTodoId: vi.fn(),
  deleteTodoId: vi.fn(),
}))

const client = testClient(api)

describe('todo route handlers (transactions mocked)', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('POST /todo', () => {
    it.concurrent('200 OK', async () => {
      vi.mocked(todoService.postTodo).mockReturnValueOnce(okAsync(undefined))

      const res = await client.todo.$post({ json: { content: 'Hono🔥' } })

      expect(res.status).toBe(201)
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
      vi.mocked(todoService.getTodo).mockReturnValueOnce(
        okAsync<
          { id: string; content: string; createdAt: string; updatedAt: string }[],
          { readonly kind: 'DatabaseError'; readonly message: string; readonly cause: unknown }
        >(todos),
      )

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
      vi.mocked(todoService.getTodoId).mockReturnValueOnce(okAsync(todo))

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
      vi.mocked(todoService.getTodoId).mockReturnValueOnce(
        errAsync({ kind: 'NotFound', message: 'Todo not found' } as const),
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
      vi.mocked(todoService.putTodoId).mockReturnValueOnce(
        okAsync({
          content: 'updated',
          id: 'c6c0f743-01fa-4c23-80d6-1b358512e213',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        }),
      )

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
      vi.mocked(todoService.deleteTodoId).mockReturnValueOnce(
        okAsync({
          content: 'updated',
          id: 'c6c0f743-01fa-4c23-80d6-1b358512e213',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        }),
      )

      const res = await client.todo[':id'].$delete({
        param: { id: 'c6c0f743-01fa-4c23-80d6-1b358512e213' },
      })

      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual({ message: 'Todo deleted' })
    })
  })
})
