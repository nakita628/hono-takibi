import type { ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination and optional role filter.
 */
export async function getUsers(
  args: {
    query: {
      limit?: number
      offset?: number
      role?: (
        | 'attendee'
        | 'speaker'
        | 'lt-speaker'
        | 'staff'
        | 'sponsor'
        | 'mc'
        | 'ghost-wifi-fixer'
      )[]
      q?: string
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.users.$get(args, options)
}
