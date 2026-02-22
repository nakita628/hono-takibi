import { faker } from '@faker-js/faker'
import { Effect } from 'effect'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import app from '@/backend'
import { ContractViolationError, DatabaseError } from '@/backend/domain'
import * as SearchTransaction from '@/backend/transactions/search'

function mockSearchResults() {
  return {
    posts: {
      data: [
        {
          id: faker.string.uuid(),
          body: 'Hello world',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: faker.string.uuid(),
          user: {
            id: faker.string.uuid(),
            name: 'Test User',
            username: 'testuser',
            bio: null,
            image: null,
            coverImage: null,
            profileImage: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          commentCount: 0,
          likeCount: 0,
        },
      ],
      meta: { page: 1, limit: 20, total: 1, totalPages: 1 },
    },
    users: {
      data: [
        {
          id: faker.string.uuid(),
          name: 'Test User',
          username: 'testuser',
          bio: null,
          image: null,
          coverImage: null,
          profileImage: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      meta: { page: 1, limit: 20, total: 1, totalPages: 1 },
    },
  }
}

function mockEmptySearchResults() {
  return {
    posts: { data: [], meta: { page: 1, limit: 20, total: 0, totalPages: 0 } },
    users: { data: [], meta: { page: 1, limit: 20, total: 0, totalPages: 0 } },
  }
}

describe('Search', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetSession.mockResolvedValue(null)
  })

  describe('GET /api/search', () => {
    it('should return 200 on success', async () => {
      const mockResults = mockSearchResults()
      vi.mocked(SearchTransaction.search).mockReturnValue(Effect.succeed(mockResults))

      const res = await app.request('/api/search?q=hello', { method: 'GET' })

      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json).toStrictEqual(mockResults)
    })

    it('should return 200 with empty results', async () => {
      const mockResults = mockEmptySearchResults()
      vi.mocked(SearchTransaction.search).mockReturnValue(Effect.succeed(mockResults))

      const res = await app.request('/api/search?q=nonexistent', { method: 'GET' })

      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json).toStrictEqual(mockResults)
    })

    it('should pass query and default pagination to transaction', async () => {
      vi.mocked(SearchTransaction.search).mockReturnValue(
        Effect.succeed(mockEmptySearchResults()),
      )

      await app.request('/api/search?q=test', { method: 'GET' })

      expect(SearchTransaction.search).toHaveBeenCalledWith({
        query: 'test',
        page: 1,
        limit: 20,
      })
    })

    it('should pass custom pagination to transaction', async () => {
      vi.mocked(SearchTransaction.search).mockReturnValue(
        Effect.succeed(mockEmptySearchResults()),
      )

      await app.request('/api/search?q=test&page=2&limit=10', { method: 'GET' })

      expect(SearchTransaction.search).toHaveBeenCalledWith({
        query: 'test',
        page: 2,
        limit: 10,
      })
    })

    it('should return 500 on ContractViolationError', async () => {
      vi.mocked(SearchTransaction.search).mockReturnValue(
        Effect.fail(new ContractViolationError({ message: 'Invalid search results' })),
      )

      const res = await app.request('/api/search?q=test', { method: 'GET' })

      expect(res.status).toBe(500)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Invalid search results' })
    })

    it('should return 503 on DatabaseError', async () => {
      vi.mocked(SearchTransaction.search).mockReturnValue(
        Effect.fail(new DatabaseError({ message: 'Database unavailable' })),
      )

      const res = await app.request('/api/search?q=test', { method: 'GET' })

      expect(res.status).toBe(503)
      const json = await res.json()
      expect(json).toStrictEqual({ message: 'Database unavailable' })
    })
  })
})
