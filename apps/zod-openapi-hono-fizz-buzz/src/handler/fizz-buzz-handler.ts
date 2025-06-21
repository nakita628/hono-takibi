import type { RouteHandler } from '@hono/zod-openapi'
import type { getFizzbuzzRoute } from '../route'

export const getFizzbuzzRouteHandler: RouteHandler<typeof getFizzbuzzRoute> = async (c) => {
  const { number, details } = c.req.valid('query')
  console.log(details)
  const result = fizzBuzz(number)

  return c.json(details ? { result, number } : { result }, 200)
}

function fizzBuzz(number: number): string {
  if (number % 15 === 0) return 'FizzBuzz'
  if (number % 3 === 0) return 'Fizz'
  if (number % 5 === 0) return 'Buzz'
  return number.toString()
}
