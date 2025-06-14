import { testClient } from 'hono/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'node:crypto'
import { api } from '../index.ts'
import db, { table } from '../infra/index.ts'
import { eq } from 'drizzle-orm'

const test = testClient(api)

describe('Hono Zod OpenAPI Test', () => {
  beforeEach(async () => {
    await db.delete(table.post)
  })

  it('postPostsRouteHandler 201', async () => {
    const res = await test.posts.$post({
      json: { post: 'OpenAPIHono🔥' },
    })
    const input = await res.json()
    expect(input).toEqual({ message: 'Created' })
    expect(res.status).toBe(201)
  })

  it('postPostsRouteHandler ZodError', async () => {
    const res = await test.posts.$post({
      json: { post: '' },
    })
    const input = await res.json()
    expect(input).toEqual({
      success: false,
      error: {
        issues: [
          {
            code: 'too_small',
            minimum: 1,
            type: 'string',
            inclusive: true,
            exact: false,
            message: 'String must contain at least 1 character(s)',
            path: ['post'],
          },
        ],
        name: 'ZodError',
      },
    })
    expect(res.status).toBe(400)
  })

  it('getPostsRouteHandler 200', async () => {
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
      query: { page: '1', rows: '15' },
    })

    const input = await res.json()

    const expected = posts
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 15)

    expect(input).toEqual(expected)
  })

  it('getPostsRouteHandler 400', async () => {
    const res = await test.posts.$get({
      query: {
        page: '-1',
        rows: '-1',
      },
    })
    const input = await res.json()

    expect(input).toEqual({
      success: false,
      error: {
        issues: [
          {
            code: 'too_small',
            minimum: 0,
            type: 'number',
            inclusive: true,
            exact: false,
            message: 'Number must be greater than or equal to 0',
            path: ['page'],
          },
          {
            code: 'too_small',
            minimum: 0,
            type: 'number',
            inclusive: true,
            exact: false,
            message: 'Number must be greater than or equal to 0',
            path: ['rows'],
          },
        ],
        name: 'ZodError',
      },
    })
    expect(res.status).toBe(400)
  })

  it('putPostsIdRouteHandler 204', async () => {
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

  it('putPostsIdRouteHandler ZodError', async () => {
    await db.insert(table.post).values({
      id: randomUUID(),
      post: 'OpenAPIHono🔥',
    })

    const post = await db.select().from(table.post)

    const res = await test.posts[':id'].$put({
      param: { id: post[0].id },
      json: { post: '' },
    })

    const input = await res.json()

    expect(input).toEqual({
      success: false,
      error: {
        issues: [
          {
            code: 'too_small',
            minimum: 1,
            type: 'string',
            inclusive: true,
            exact: false,
            message: 'String must contain at least 1 character(s)',
            path: ['post'],
          },
        ],
        name: 'ZodError',
      },
    })

    expect(res.status).toEqual(400)
  })

  it('putPostsIdRouteHandler ZodError', async () => {
    const res = await test.posts[':id'].$put({
      param: { id: '🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥' },
      json: { post: 'test' },
    })

    const input = await res.json()

    expect(input).toEqual({
      success: false,
      error: {
        issues: [
          {
            code: 'invalid_string',
            message: 'Invalid uuid',
            path: ['id'],
            validation: 'uuid',
          },
        ],
        name: 'ZodError',
      },
    })
  })

  it('deletePostsIdRouteHandler 204', async () => {
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

  it('deletePostsIdRouteHandler ZodError', async () => {
    const res = await test.posts[':id'].$delete({
      param: { id: '🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥' },
    })

    const input = await res.json()

    expect(input).toEqual({
      success: false,
      error: {
        issues: [
          {
            code: 'invalid_string',
            message: 'Invalid uuid',
            path: ['id'],
            validation: 'uuid',
          },
        ],
        name: 'ZodError',
      },
    })
  })
})
