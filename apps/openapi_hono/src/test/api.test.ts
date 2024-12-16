import { testClient } from 'hono/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'crypto'
import prisma from '../infra/index.js'
import api from '../index.js'

const test = testClient(api)

describe('Hono Zod OpenAPI Test', () => {
  beforeEach(async () => {
    await prisma.post.deleteMany()
  })
  // getHandler
  it('getHandler', async () => {
    const res = await test.index.$get()
    const input = await res.json()
    expect(input).toEqual({
      message: 'Hono🔥',
    })
    expect(res.status).toBe(200)
  })

  //   postPostsHandler
  it('postPostsHandler 201', async () => {
    const res = await test.posts.$post({
      json: {
        post: 'OpenAPIHono🔥',
      },
    })
    const input = await res.json()
    expect(input).toEqual({ message: 'Created' })
    expect(res.status).toBe(201)
  })

  it('postPostsHandler ZodError', async () => {
    const res = await test.posts.$post({
      json: {
        post: '',
      },
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

  it('getPostsHandler 200', async () => {
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
        rows: '10',
      },
    })

    const input = await res.json()

    const expected = postDatas
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10)
      .map((post) => ({
        ...post,
        createdAt: new Date(post.createdAt).toISOString(),
        updatedAt: new Date(post.updatedAt).toISOString(),
      }))

    expect(input).toEqual(expected)
    expect(res.status).toEqual(200)
  })

  it('getPostsHandler 400', async () => {
    const res = await test.posts.$get({
      query: {
        page: '-1',
        rows: '-1',
      },
    })
    const input = await res.json()

    expect(input).toEqual({ message: 'Bad Request' })
    expect(res.status).toBe(400)
  })

  // putPostsIdHandler
  it('putPostsIdHandler 204', async () => {
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

    expect(updatedPost?.post).toEqual('OpenAPIHono🔥🔥')
  })

  it('putPostsIdHandler ZodError', async () => {
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

  it('putPostsIdHandler ZodError', async () => {
    const res = await test.posts[':id'].$put({
      param: {
        id: '🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥',
      },
      json: {
        post: 'test',
      },
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

  // deletePostsIdHandler
  it('deletePostsIdHandler', async () => {
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

  it('deletePostsIdHandler', async () => {
    const res = await test.posts[':id'].$delete({
      param: {
        id: '🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥',
      },
    })

    const input2 = await res.json()

    expect(input2).toEqual({
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
