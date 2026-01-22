import { beforeEach, describe, expect, it, vi } from 'vitest'
import app from '@/api'

type ValidationError = {
  field: string
  message: string
}

type ProblemDetails = {
  type: string
  title: string
  status: number
  detail: string
  errors?: ValidationError[]
}

/**
 * Mock D1Database interface for testing.
 */
function createMockDB() {
  return {
    prepare: vi.fn().mockReturnThis(),
    bind: vi.fn().mockReturnThis(),
    all: vi.fn(),
    first: vi.fn(),
    run: vi.fn(),
  }
}

describe('Todo API', () => {
  let mockDB: ReturnType<typeof createMockDB>

  beforeEach(() => {
    mockDB = createMockDB()
    vi.clearAllMocks()
  })

  describe('GET /api', () => {
    it('should return health check message', async () => {
      const res = await app.request('/api', {}, { DB: mockDB as unknown as D1Database })

      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body).toEqual({ message: 'Hono🔥 React' })
    })
  })

  describe('GET /api/todo', () => {
    it('should return empty array when no todos exist', async () => {
      mockDB.all.mockResolvedValue({ results: [] })

      const res = await app.request('/api/todo', {}, { DB: mockDB as unknown as D1Database })

      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body).toEqual([])
    })

    it('should return todos list', async () => {
      const mockTodos = [
        {
          id: 'c6c0f743-01fa-4c23-80d6-1b358512e213',
          content: 'Test todo',
          completed: 0,
          createdAt: '2020-01-01T00:00:00Z',
          updatedAt: '2020-01-01T00:00:00Z',
        },
      ]
      mockDB.all.mockResolvedValue({ results: mockTodos })

      const res = await app.request('/api/todo', {}, { DB: mockDB as unknown as D1Database })

      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body).toEqual(mockTodos)
    })

    it('should support limit and offset query params', async () => {
      mockDB.all.mockResolvedValue({ results: [] })

      const res = await app.request(
        '/api/todo?limit=10&offset=5',
        {},
        { DB: mockDB as unknown as D1Database },
      )

      expect(res.status).toBe(200)
      expect(mockDB.prepare).toHaveBeenCalled()
      expect(mockDB.bind).toHaveBeenCalledWith(10, 5)
    })
  })

  describe('POST /api/todo', () => {
    it('should create a new todo', async () => {
      mockDB.run.mockResolvedValue({ success: true })

      const res = await app.request(
        '/api/todo',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: 'New todo' }),
        },
        { DB: mockDB as unknown as D1Database },
      )

      expect(res.status).toBe(201)
      const body = await res.json()
      expect(body).toEqual({ message: 'Created' })
    })

    it('should return 422 with RFC 7807 Problem Details for empty content', async () => {
      const res = await app.request(
        '/api/todo',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: '' }),
        },
        { DB: mockDB as unknown as D1Database },
      )

      expect(res.status).toBe(422)
      const body = (await res.json()) as ProblemDetails
      expect(body.type).toBe('about:blank')
      expect(body.title).toBe('Unprocessable Entity')
      expect(body.status).toBe(422)
      expect(body.detail).toBe('The request contains invalid parameters')
      expect(body.errors).toBeDefined()
      expect(body.errors).toContainEqual({
        field: 'content',
        message: 'This field is required',
      })
    })

    it('should return 422 with RFC 7807 Problem Details for content exceeding max length', async () => {
      const longContent = 'a'.repeat(141)
      const res = await app.request(
        '/api/todo',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: longContent }),
        },
        { DB: mockDB as unknown as D1Database },
      )

      expect(res.status).toBe(422)
      const body = (await res.json()) as ProblemDetails
      expect(body.type).toBe('about:blank')
      expect(body.title).toBe('Unprocessable Entity')
      expect(body.status).toBe(422)
      expect(body.errors).toBeDefined()
      expect(body.errors).toContainEqual({
        field: 'content',
        message: 'Must be at most 140 characters',
      })
    })

    it('should return 422 with RFC 7807 Problem Details for missing content field', async () => {
      const res = await app.request(
        '/api/todo',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        },
        { DB: mockDB as unknown as D1Database },
      )

      expect(res.status).toBe(422)
      const body = (await res.json()) as ProblemDetails
      expect(body.type).toBe('about:blank')
      expect(body.title).toBe('Unprocessable Entity')
      expect(body.status).toBe(422)
      expect(body.errors).toBeDefined()
      expect(Array.isArray(body.errors)).toBe(true)
    })
  })

  describe('GET /api/todo/:id', () => {
    it('should return a single todo', async () => {
      const mockTodo = {
        id: 'c6c0f743-01fa-4c23-80d6-1b358512e213',
        content: 'Test todo',
        completed: 0,
        createdAt: '2020-01-01T00:00:00Z',
        updatedAt: '2020-01-01T00:00:00Z',
      }
      mockDB.first.mockResolvedValue(mockTodo)

      const res = await app.request(
        '/api/todo/c6c0f743-01fa-4c23-80d6-1b358512e213',
        {},
        { DB: mockDB as unknown as D1Database },
      )

      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body).toEqual(mockTodo)
    })

    it('should return 404 when todo not found', async () => {
      mockDB.first.mockResolvedValue(null)

      const res = await app.request(
        '/api/todo/c6c0f743-01fa-4c23-80d6-1b358512e213',
        {},
        { DB: mockDB as unknown as D1Database },
      )

      expect(res.status).toBe(404)
    })

    it('should return 422 with RFC 7807 Problem Details for invalid UUID', async () => {
      const res = await app.request(
        '/api/todo/invalid-uuid',
        {},
        { DB: mockDB as unknown as D1Database },
      )

      expect(res.status).toBe(422)
      const body = (await res.json()) as ProblemDetails
      expect(body.type).toBe('about:blank')
      expect(body.title).toBe('Unprocessable Entity')
      expect(body.status).toBe(422)
      expect(body.errors).toBeDefined()
      expect(body.errors).toContainEqual({
        field: 'id',
        message: 'Must be a valid UUID',
      })
    })
  })

  describe('PUT /api/todo/:id', () => {
    it('should update todo content', async () => {
      mockDB.run.mockResolvedValue({ success: true })

      const res = await app.request(
        '/api/todo/c6c0f743-01fa-4c23-80d6-1b358512e213',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: 'Updated content' }),
        },
        { DB: mockDB as unknown as D1Database },
      )

      expect(res.status).toBe(204)
    })

    it('should update todo completed status', async () => {
      mockDB.run.mockResolvedValue({ success: true })

      const res = await app.request(
        '/api/todo/c6c0f743-01fa-4c23-80d6-1b358512e213',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completed: 1 }),
        },
        { DB: mockDB as unknown as D1Database },
      )

      expect(res.status).toBe(204)
    })

    it('should return 422 with RFC 7807 Problem Details for invalid UUID', async () => {
      const res = await app.request(
        '/api/todo/invalid-uuid',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: 'Updated' }),
        },
        { DB: mockDB as unknown as D1Database },
      )

      expect(res.status).toBe(422)
      const body = (await res.json()) as ProblemDetails
      expect(body.type).toBe('about:blank')
      expect(body.title).toBe('Unprocessable Entity')
      expect(body.status).toBe(422)
      expect(body.errors).toBeDefined()
      expect(body.errors).toContainEqual({
        field: 'id',
        message: 'Must be a valid UUID',
      })
    })

    it('should return 422 with RFC 7807 Problem Details for invalid content in update', async () => {
      const longContent = 'a'.repeat(141)
      const res = await app.request(
        '/api/todo/c6c0f743-01fa-4c23-80d6-1b358512e213',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: longContent }),
        },
        { DB: mockDB as unknown as D1Database },
      )

      expect(res.status).toBe(422)
      const body = (await res.json()) as ProblemDetails
      expect(body.type).toBe('about:blank')
      expect(body.title).toBe('Unprocessable Entity')
      expect(body.status).toBe(422)
      expect(body.errors).toBeDefined()
      expect(body.errors).toContainEqual({
        field: 'content',
        message: 'Must be at most 140 characters',
      })
    })
  })

  describe('DELETE /api/todo/:id', () => {
    it('should delete a todo', async () => {
      mockDB.run.mockResolvedValue({ success: true })

      const res = await app.request(
        '/api/todo/c6c0f743-01fa-4c23-80d6-1b358512e213',
        { method: 'DELETE' },
        { DB: mockDB as unknown as D1Database },
      )

      expect(res.status).toBe(204)
    })

    it('should return 422 with RFC 7807 Problem Details for invalid UUID', async () => {
      const res = await app.request(
        '/api/todo/invalid-uuid',
        { method: 'DELETE' },
        { DB: mockDB as unknown as D1Database },
      )

      expect(res.status).toBe(422)
      const body = (await res.json()) as ProblemDetails
      expect(body.type).toBe('about:blank')
      expect(body.title).toBe('Unprocessable Entity')
      expect(body.status).toBe(422)
      expect(body.errors).toBeDefined()
      expect(body.errors).toContainEqual({
        field: 'id',
        message: 'Must be a valid UUID',
      })
    })
  })

  describe('Database error handling', () => {
    it('should return 503 on database error for GET /api/todo', async () => {
      mockDB.all.mockRejectedValue(new Error('Connection failed'))

      const res = await app.request('/api/todo', {}, { DB: mockDB as unknown as D1Database })

      expect(res.status).toBe(503)
      const body = (await res.json()) as { message: string }
      expect(body.message).toBe('Connection failed')
    })

    it('should return 503 on database error for POST /api/todo', async () => {
      mockDB.run.mockRejectedValue(new Error('Insert failed'))

      const res = await app.request(
        '/api/todo',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: 'Test' }),
        },
        { DB: mockDB as unknown as D1Database },
      )

      expect(res.status).toBe(503)
    })
  })
})
