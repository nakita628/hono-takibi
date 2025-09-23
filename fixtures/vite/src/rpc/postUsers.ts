import { client } from '../client'

/**
 * POST /users
 *
 * Create user
 *
 * Create a new user.
 */
export async function postUsers(body: {
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
}) {
  return await client.users.$post({ json: body })
}
