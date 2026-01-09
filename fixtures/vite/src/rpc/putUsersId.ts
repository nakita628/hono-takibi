import type { ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * PUT /users/{id}
 *
 * Replace user
 *
 * Full replace (PUT). All required fields must be present. Unspecified fields are treated as empty.
 */
export async function putUsersId(
  args: {
    param: { id: string }
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
  return await client.users[':id'].$put(args, options)
}
