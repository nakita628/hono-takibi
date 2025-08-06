import { testClient } from 'hono/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { api } from '../index.ts'
import * as postsService from '../services/postsService'

// Test run
// pnpm vitest run ./src/handlers/postsHandler.test.ts

const test = testClient(api)

vi.mock('../services/postsService', () => ({
  postPosts: vi.fn(),
  getPosts: vi.fn(),
  putPostsId: vi.fn(),
  deletePostsId: vi.fn(),
}))

describe('postPostsRouteHandler (via service mock)', () => {
  const mockedService = vi.mocked(postsService)
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('POST /posts', () => {
    it('201', async () => {
      mockedService.postPosts.mockResolvedValueOnce(undefined)

      const res = await test.posts.$post({
        json: {
          post: 'Hono🔥',
        },
      })

      expect(res.status).toBe(201)
      expect(await res.json()).toStrictEqual({ message: 'Created' })
      expect(mockedService.postPosts).toHaveBeenCalledWith('Hono🔥')
    })
  })

  describe('GET /posts', () => {
    it('200', async () => {
      mockedService.getPosts.mockResolvedValueOnce([
        {
          id: 'abc',
          post: 'Post1',
          createdAt: new Date('2024-01-01T00:00:00.000Z').toISOString(),
          updatedAt: new Date('2024-01-01T00:00:00.000Z').toISOString(),
        },
      ])

      const res = await test.posts.$get({
        query: {
          page: '1',
          rows: '10',
        },
      })

      expect(res.status).toBe(200)
      expect(await res.json()).toStrictEqual([
        {
          id: 'abc',
          post: 'Post1',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ])
      expect(mockedService.getPosts).toHaveBeenCalledWith(10, 0)
    })
  })

  describe('PUT /posts/:id', () => {
    it('204', async () => {
      mockedService.postPosts.mockResolvedValueOnce(undefined)

      const res = await test.posts[':id'].$put({
        param: { id: 'c6c0f743-01fa-4c23-80d6-1b358512e213' },
        json: { post: 'updated' },
      })

      expect(res.status).toBe(204)
      expect(mockedService.putPostsId).toHaveBeenCalledWith(
        'c6c0f743-01fa-4c23-80d6-1b358512e213',
        'updated',
      )
    })
  })

  describe('DELETE /posts/:id', () => {
    it('204', async () => {
      mockedService.postPosts.mockResolvedValueOnce(undefined)

      const res = await test.posts[':id'].$delete({
        param: { id: 'c6c0f743-01fa-4c23-80d6-1b358512e213' },
      })

      expect(res.status).toBe(204)
      expect(mockedService.deletePostsId).toHaveBeenCalledWith(
        'c6c0f743-01fa-4c23-80d6-1b358512e213',
      )
    })
  })
})
