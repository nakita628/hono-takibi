import type { RouteHandler } from '@hono/zod-openapi'
import { fizzBuzz } from '../domain/fizzBuzz'
import type { getFizzBuzzRoute } from '../routes'

export const getFizzBuzzRouteHandler: RouteHandler<typeof getFizzBuzzRoute> = async (c) => {
  const { number, details } = c.req.valid('query')
  const result = fizzBuzz(number)
  return c.json(details ? { result, number } : { result }, 200)
}
