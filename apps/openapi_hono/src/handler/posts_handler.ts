import { type RouteHandler } from '@hono/zod-openapi'
import type { deletePostsIdRoute, getPostsRoute, postPostsRoute, putPostsIdRoute } from '../openapi/index.js'
import { deletePostsId, getPosts, postPosts, putPostsId } from '../service/posts_service.js'
import type { Post } from '@prisma/client'

export const postPostsRouteHandler: RouteHandler<typeof postPostsRoute> = async (c) => {
  const { post } = c.req.valid('json')
  await postPosts(post)
  return c.json({ message: 'Created' }, 201)
}

export const getPostsRouteHandler: RouteHandler<typeof getPostsRoute> = async (c) => {
  const { page, rows } = c.req.valid('query')
  const pageNumber = parseInt(page)
  const rowsPerPage = parseInt(rows)
  if (isNaN(pageNumber) || isNaN(rowsPerPage) || pageNumber < 1 || rowsPerPage < 1) {
    return c.json({ message: 'Bad Request' }, 400)
  }
  const limit = rowsPerPage
  const offset = (pageNumber - 1) * rowsPerPage
  const posts: Post[] = await getPosts(limit, offset)
  return c.json(posts, 200)
}

export const putPostsIdRouteHandler: RouteHandler<typeof putPostsIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const { post } = c.req.valid('json')
  await putPostsId(id, post)
  return new Response(null, { status: 204 })
}

export const deletePostsIdRouteHandler: RouteHandler<typeof deletePostsIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  await deletePostsId(id)
  return new Response(null, { status: 204 })
}
