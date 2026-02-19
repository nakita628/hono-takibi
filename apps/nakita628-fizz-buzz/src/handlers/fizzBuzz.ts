import { getFizzBuzzRoute } from '../routes'
import * as FizzBuzzDomain from '../domain'
import app from '../app'

export const fizzBuzzHandler = app.openapi(getFizzBuzzRoute, (c) => {
    const { number, details } = c.req.valid('query')
  const result = FizzBuzzDomain.fizzBuzz(number)
  if (details) {
    return c.json({ result, number }, 200)
  }
  return c.json({ result }, 200)
})
