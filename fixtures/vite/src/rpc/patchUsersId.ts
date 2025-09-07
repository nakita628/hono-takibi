import { client } from '../client'

/**
 * Update user (partial)
 *
 * Partial update (PATCH). Only provided fields will be updated.
 *
 * PATCH /users/{id}
 */
export async function patchUsersId(
  params: { path: { id: string } },
  body: {
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
  },
) {
  return await client.users[':id'].$patch({ param: { id: params.path.id }, json: body })
}
