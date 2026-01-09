import type { ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * POST /users
 *
 * Create user
 *
 * Create a new user.
 */
export async function postUsers(
  args: {
    json: {
      displayName: string
      email: string
      roles?: (
        | 'attendee'
        | 'speaker'
        | 'lt-speaker'
        | 'staff'
        | 'sponsor'
        | 'mc'
        | 'ghost-wifi-fixer'
      )[]
      isStudent?: boolean
      pronouns?: string
      affiliations?: string[]
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.users.$post(args, options)
}
