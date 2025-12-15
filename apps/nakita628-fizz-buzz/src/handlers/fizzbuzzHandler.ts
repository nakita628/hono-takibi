import type { RouteHandler } from '@hono/zod-openapi'
import * as FizzBuzzDomain from '../domain'
import type { getFizzBuzzRoute } from '../routes'

export const getFizzBuzzRouteHandler: RouteHandler<typeof getFizzBuzzRoute> = async (c) => {
  const { number, details } = c.req.valid('query')
  const result = FizzBuzzDomain.fizzBuzz(number)
  return c.json(details ? { result, number } : { result }, 200)
}
