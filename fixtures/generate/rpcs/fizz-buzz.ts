import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/fizz-buzz'

/**
 * GET /fizzbuzz
 *
 * Get FizzBuzz result
 *
 * Returns the FizzBuzz result for the given number.
 */
export async function getFizzbuzz(args: {
  query: { number: number; details?: string }
  options?: ClientRequestOptions
}) {
  return await client.fizzbuzz.$get(args)
}
