import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { createClient } from '@libsql/client'
import { eq } from 'drizzle-orm'
import { testClient } from 'hono/testing'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { api } from '../index.ts'
import db, { table } from '../infra/index.ts'

const test = testClient(api)
const client = createClient({
  url:
    process.env.NODE_ENV === 'test'
      ? 'file:test.db'
      : (() => {
          throw new Error('DB_FILE_NAME environment variable is not set')
        })(),
})

describe('Hono Zod OpenAPI Test', () => {
  beforeAll(async () => {
    execSync('NODE_ENV=test drizzle-kit push')
  })

  beforeEach(async () => {
    await db.delete(table.post)
  })

  afterAll(async () => {
    client.close()
  })

  describe('postPostsRouteHandler', () => {
    it('201', async () => {
      const res = await test.posts.$post({
        json: { post: 'OpenAPIHono🔥' },
      })
      const input = await res.json()
      expect(input).toEqual({ message: 'Created' })
      expect(res.status).toBe(201)
    })

    it('422', async () => {
      const res = await test.posts.$post({
        json: { post: '' },
      })

      expect(res.status).toBe(422)
    })
  })

  describe('postPostsRouteHandler', async () => {
    it('200', async () => {
      const generatePosts = (count: number) => {
        return Array.from({ length: count }, (_, i) => ({
          id: randomUUID(),
          post: `OpenAPIHono🔥${i + 1}`,
          createdAt: new Date(`2021-01-${i + 1}`).toISOString(),
          updatedAt: new Date(`2021-01-${i + 1}`).toISOString(),
        }))
      }

      await Promise.all(
        generatePosts(20).map(async (data) => {
          return db.insert(table.post).values(data)
        }),
      )

      const posts = await db.select().from(table.post)

      const res = await test.posts.$get({
        query: { page: 1, rows: 15 },
      })

      const input = await res.json()

      const expected = posts
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 15)

      expect(input).toEqual(expected)
    })

    it('422', async () => {
      const res = await test.posts.$get({
        query: {
          page: -1,
          rows: -1,
        },
      })

      expect(res.status).toBe(422)
    })
  })

  describe('putPostsIdRouteHandler', async () => {
    it('204', async () => {
      await db.insert(table.post).values({
        id: randomUUID(),
        post: 'OpenAPIHono🔥',
      })

      const post = await db.select().from(table.post)

      const res = await test.posts[':id'].$put({
        param: { id: post[0].id },
        json: { post: 'OpenAPIHono🔥🔥' },
      })

      expect(res.status).toBe(204)
    })

    it('422', async () => {
      await db.insert(table.post).values({
        id: randomUUID(),
        post: 'OpenAPIHono🔥',
      })

      const post = await db.select().from(table.post)

      const res = await test.posts[':id'].$put({
        param: { id: post[0].id },
        json: { post: '' },
      })

      expect(res.status).toEqual(422)
    })
  })

  describe('deletePostsIdRouteHandler', async () => {
    it('204', async () => {
      await db.insert(table.post).values({
        id: randomUUID(),
        post: 'OpenAPIHono🔥',
      })

      const post = await db.select().from(table.post)

      const res = await test.posts[':id'].$delete({
        param: { id: post[0].id },
      })

      expect(res.status).toBe(204)

      const deletedPost = await db.select().from(table.post).where(eq(table.post.id, post[0].id))

      expect(deletedPost).toEqual([])
    })
  })
})
