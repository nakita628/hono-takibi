import { client } from '../index.ts'

/**
 * GET /fizzbuzz
 *
 * Get FizzBuzz result
 *
 * Returns the FizzBuzz result for the given number.
 */
export async function getFizzbuzz(params: { query: { number: number; details: boolean } }) {
  return await client.fizzbuzz.$get({ query: params.query })
}
