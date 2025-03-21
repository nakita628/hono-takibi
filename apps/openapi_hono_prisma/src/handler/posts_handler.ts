import type { RouteHandler } from '@hono/zod-openapi'
import type { postPostsRoute, getPostsRoute, putPostsIdRoute, deletePostsIdRoute } from '../route'
import { postPosts, getPosts, putPostsId, deletePostsId } from '../service/posts_service'

export const postPostsRouteHandler: RouteHandler<typeof postPostsRoute> = async (c) => {
  const { post } = c.req.valid('json')
  await postPosts(post)
  return c.json({ message: 'Created' }, 201)
}

export const getPostsRouteHandler: RouteHandler<typeof getPostsRoute> = async (c) => {
  const { page, rows } = c.req.valid('query')
  const limit = rows
  const offset = (page - 1) * rows
  const posts = await getPosts(limit, offset)
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
