import { testClient } from 'hono/testing'
import { beforeAll, beforeEach, afterAll, describe, expect, it } from 'vitest'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import prisma from '../infra/index.ts'
import { api } from '../index.ts'

const test = testClient(api)

describe('Hono Zod OpenAPI Test', () => {
  beforeAll(async () => {
    execSync('DATABASE_URL=file:./test.db prisma migrate reset --force --skip-seed')
  })

  beforeEach(async () => {
    await prisma.post.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('postPostsRouteHandler', () => {
    it('201', async () => {
      const res = await test.posts.$post({
        json: {
          post: 'OpenAPIHono🔥',
        },
      })
      const input = await res.json()
      expect(input).toStrictEqual({ message: 'Created' })
      expect(res.status).toBe(201)
    })

    it('422', async () => {
      const res = await test.posts.$post({
        json: {
          post: '',
        },
      })
      const input = await res.json()
      const expected = {
        ok: false,
        errors: {
          errors: [],
          properties: {
            post: {
              errors: ['At least 1 character are required'],
            },
          },
        },
      }
      expect(input).toStrictEqual(expected)
      expect(res.status).toBe(422)
    })
  })

  describe('getPostsRouteHandler', () => {
    it('200', async () => {
      const generatePosts = (count: number) => {
        return Array.from({ length: count }, (_, i) => ({
          id: randomUUID(),
          post: `OpenAPIHono🔥${i + 1}`,
          createdAt: new Date(`2021-01-${i + 1}`),
          updatedAt: new Date(`2021-01-${i + 1}`),
        }))
      }

      const postDatas = await Promise.all(
        generatePosts(20).map(async (data) => {
          return prisma.post.create({
            data,
          })
        }),
      )

      const res = await test.posts.$get({
        query: {
          page: '1',
          rows: '15',
        },
      })

      const input = await res.json()

      const expected = postDatas
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 15)
        .map((post) => ({
          ...post,
          createdAt: new Date(post.createdAt).toISOString(),
          updatedAt: new Date(post.updatedAt).toISOString(),
        }))

      expect(input).toStrictEqual(expected)
      expect(res.status).toBe(200)
    })

    it('422', async () => {
      const res = await test.posts.$get({
        query: {
          page: '-1',
          rows: '-1',
        },
      })
      expect(res.status).toBe(422)
    })
  })

  it('putPostsIdRouteHandler 204', async () => {
    const post = await prisma.post.create({
      data: {
        id: randomUUID(),
        post: 'OpenAPIHono🔥',
        createdAt: new Date('2021-01-01'),
        updatedAt: new Date('2021-01-01'),
      },
    })

    const res = await test.posts[':id'].$put({
      param: {
        id: post.id,
      },
      json: {
        post: 'OpenAPIHono🔥🔥',
      },
    })

    expect(res.status).toBe(204)

    const updatedPost = await prisma.post.findUnique({
      where: {
        id: post.id,
      },
    })
    expect(updatedPost?.post).toStrictEqual('OpenAPIHono🔥🔥')
  })

  describe('putPostsIdRouteHandler', () => {
    it(`post '' 422`, async () => {
      const post = await prisma.post.create({
        data: {
          id: randomUUID(),
          post: 'Hono🔥',
          createdAt: new Date('2021-01-01'),
          updatedAt: new Date('2021-01-01'),
        },
      })

      const res = await test.posts[':id'].$put({
        param: {
          id: post.id,
        },
        json: {
          post: '',
        },
      })
      expect(res.status).toBe(422)
    })

    it('param 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 422', async () => {
      const res = await test.posts[':id'].$put({
        param: {
          id: '🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥',
        },
        json: {
          post: 'test',
        },
      })
      expect(res.status).toBe(422)
    })

    it('deletePostsIdRouteHandler 204', async () => {
      const post = await prisma.post.create({
        data: {
          id: randomUUID(),
          post: 'OpenAPIHono🔥',
          createdAt: new Date('2021-01-01'),
          updatedAt: new Date('2021-01-01'),
        },
      })

      const res = await test.posts[':id'].$delete({
        param: {
          id: post.id,
        },
      })

      expect(res.status).toBe(204)

      const deletedPost = await prisma.post.findUnique({
        where: {
          id: post.id,
        },
      })

      expect(deletedPost).toBeNull()
    })
  })

  describe('deletePostsIdRouteHandler', () => {
    it('422', async () => {
      const res = await test.posts[':id'].$delete({
        param: {
          id: '🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥',
        },
      })
      expect(res.status).toBe(422)
    })
  })
})
