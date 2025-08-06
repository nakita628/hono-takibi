import type { RouteHandler } from '@hono/zod-openapi'
import type { deletePostsIdRoute, getPostsRoute, postPostsRoute, putPostsIdRoute } from '../routes'
import { deletePostsId, getPosts, postPosts, putPostsId } from '../services/postsService'

export const postPostsRouteHandler: RouteHandler<typeof postPostsRoute> = async (c) => {
  const { post } = c.req.valid('json')
  const result = await postPosts(post)
  if (!result.ok) {
    return c.json({ message: result.error }, 500)
  }
  return c.json({ message: 'Created' }, 201)
}

export const getPostsRouteHandler: RouteHandler<typeof getPostsRoute> = async (c) => {
  const { page, rows } = c.req.valid('query')
  const limit = rows
  const offset = (page - 1) * rows
  const result = await getPosts(limit, offset)
  if (!result.ok) {
    return c.json({ message: result.error }, 500)
  }
  const posts = result.value
  return c.json(posts, 200)
}

export const putPostsIdRouteHandler: RouteHandler<typeof putPostsIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const { post } = c.req.valid('json')
  const result = await putPostsId(id, post)
  if (!result.ok) {
    return c.json({ message: result.error }, 500)
  }
  return new Response(null, { status: 204 })
}

export const deletePostsIdRouteHandler: RouteHandler<typeof deletePostsIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const result = await deletePostsId(id)
  if (!result.ok) {
    return c.json({ message: result.error }, 500)
  }
  return new Response(null, { status: 204 })
}
