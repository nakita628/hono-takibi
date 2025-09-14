import { client } from '../client'

/**
 * List users
 *
 * List users with pagination and optional role filter.
 *
 * GET /users
 */
export async function getUsers(params: {
  query: {
    limit: number
    offset: number
    role: (
      | 'attendee'
      | 'speaker'
      | 'lt-speaker'
      | 'staff'
      | 'sponsor'
      | 'mc'
      | 'ghost-wifi-fixer'
    )[]
    q: string
  }
}) {
  return await client.users.$get({ query: params.query })
}
