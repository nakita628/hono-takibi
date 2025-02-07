import type { RouteHandler } from '@hono/zod-openapi'
import type {
  postPostsRoute,
  getPostsRoute,
  putPostsIdRoute,
  deletePostsIdRoute,
} from '../routes.ts'
import db from '../../db'
import { Post } from '../../db/schema'
import { eq, desc } from 'drizzle-orm'
export const postPostsRouteHandler: RouteHandler<typeof postPostsRoute> = async (c) => {
  const { post } = c.req.valid('json')
  await db.insert(Post).values({ post })
  return c.json({ message: 'Created' }, 201)
}

export const getPostsRouteHandler: RouteHandler<typeof getPostsRoute> = async (c) => {
  const { page, rows } = c.req.valid('query')
  const limit = rows
  const offset = (page - 1) * rows
  const posts = await db
    .select()
    .from(Post)
    .orderBy(desc(Post.createdAt))
    .limit(limit)
    .offset(offset)
  return c.json(posts, 200)
}

export const putPostsIdRouteHandler: RouteHandler<typeof putPostsIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const { post } = c.req.valid('json')
  await db.update(Post).set({ post }).where(eq(Post.id, id))
  return new Response(null, { status: 204 })
}

export const deletePostsIdRouteHandler: RouteHandler<typeof deletePostsIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  await db.delete(Post).where(eq(Post.id, id))
  return new Response(null, { status: 204 })
}
