import { client } from '../index.ts'

/**
 * Get FizzBuzz result
 *
 * Returns the FizzBuzz result for the given number.
 *
 * GET /fizzbuzz
 */
export async function getFizzbuzz(params: { query: { number: number; details: boolean } }) {
  return await client.fizzbuzz.$get({
    query: { number: params.query.number, details: params.query.details },
  })
}
