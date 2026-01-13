import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/fizz-buzz'

/**
 * GET /fizzbuzz
 *
 * Get FizzBuzz result
 *
 * Returns the FizzBuzz result for the given number.
 */
export async function getFizzbuzz(
  args: InferRequestType<typeof client.fizzbuzz.$get>,
  options?: ClientRequestOptions,
) {
  return await client.fizzbuzz.$get(args, options)
}
