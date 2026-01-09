import { client } from '../clients/fizz-buzz'

/**
 * GET /fizzbuzz
 *
 * Get FizzBuzz result
 *
 * Returns the FizzBuzz result for the given number.
 */
export async function getFizzbuzz(arg: { query: { number: number; details?: string } }) {
  return await client.fizzbuzz.$get(arg)
}
