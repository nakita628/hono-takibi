import type { ClientRequestOptions } from 'hono/client'
import { client } from '../client'

export async function getHonoX(options?: ClientRequestOptions) {
  return await client['hono-x'].$get(undefined, options)
}
