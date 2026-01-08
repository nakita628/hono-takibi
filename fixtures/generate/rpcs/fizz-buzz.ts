import type { InferRequestType } from 'hono/client'
import { client } from '../clients/fizz-buzz'

/**
 * GET /fizzbuzz
 *
 * Get FizzBuzz result
 *
 * Returns the FizzBuzz result for the given number.
 */
export async function getFizzbuzz(arg: InferRequestType<typeof client.fizzbuzz.$get>) {
  return await client.fizzbuzz.$get(arg)
}
