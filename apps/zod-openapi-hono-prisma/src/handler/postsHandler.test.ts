import { testClient } from 'hono/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'node:crypto'
import prisma from '../infra/index.ts'
import { api } from '../index.ts'

const test = testClient(api)

describe('Hono Zod OpenAPI Test', () => {
  beforeEach(async () => {
    await prisma.post.deleteMany()
  })

  it('postPostsRouteHandler 201', async () => {
    const res = await test.posts.$post({
      json: {
        post: 'OpenAPIHono🔥',
      },
    })
    const input = await res.json()
    expect(input).toEqual({ message: 'Created' })
    expect(res.status).toBe(201)
  })

  it('postPostsHandler 400', async () => {
    const res = await test.posts.$post({
      json: {
        post: '',
      },
    })
    const input = await res.json()
    expect(res.status).toBe(400)
  })

  it('getPostsRouteHandler 200', async () => {
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

    expect(input).toEqual(expected)
    expect(res.status).toEqual(200)
  })

  it('getPostsRouteHandler 400', async () => {
    const res = await test.posts.$get({
      query: {
        page: '-1',
        rows: '-1',
      },
    })
    expect(res.status).toBe(400)
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

    expect(updatedPost?.post).toEqual('OpenAPIHono🔥🔥')
  })

  it('putPostsIdRouteHandler 400', async () => {
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

    expect(res.status).toEqual(400)
  })

  it('putPostsIdRouteHandler 400', async () => {
    const res = await test.posts[':id'].$put({
      param: {
        id: '🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥',
      },
      json: {
        post: 'test',
      },
    })

    expect(res.status).toBe(400)
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

  it('deletePostsIdRouteHandler 400', async () => {
    const res = await test.posts[':id'].$delete({
      param: {
        id: '🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥',
      },
    })
    expect(res.status).toBe(400)
  })
})
