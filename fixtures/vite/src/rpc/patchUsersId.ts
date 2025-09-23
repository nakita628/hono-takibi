import { client } from '../client'

/**
 * PATCH /users/{id}
 *
 * Update user (partial)
 *
 * Partial update (PATCH). Only provided fields will be updated.
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
  return await client.users[':id'].$patch({ param: params.path, json: body })
}
