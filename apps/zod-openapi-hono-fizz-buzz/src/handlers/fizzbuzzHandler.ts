import type { RouteHandler } from '@hono/zod-openapi'
import type { getFizzBuzzRoute } from '../routes'
import { fizzBuzz } from '../domain/fizzBuzz'

export const getFizzBuzzRouteHandler: RouteHandler<typeof getFizzBuzzRoute> = async (c) => {
  const { number, details } = c.req.valid('query')
  const result = fizzBuzz(number)
  return c.json(details ? { result, number } : { result }, 200)
}
