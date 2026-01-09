import type { ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * PATCH /users/{id}
 *
 * Update user (partial)
 *
 * Partial update (PATCH). Only provided fields will be updated.
 */
export async function patchUsersId(
  args: {
    param: { id: string }
    json: {
      displayName?: string
      email?: string
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
  return await client.users[':id'].$patch(args, options)
}
