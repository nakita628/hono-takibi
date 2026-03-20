import { Effect } from 'effect'

import { DatabaseError } from '@/backend/domain'
import { auth } from '@/infra'

/**
 * Sign up a new user account via Better Auth.
 *
 * @param email - User email
 * @param password - User password
 * @param name - Display name
 * @returns Effect yielding the signup result (user + session)
 */
export function signUpEmail(email: string, password: string, name: string) {
  return Effect.tryPromise({
    try: () => auth().api.signUpEmail({ body: { email, password, name } }),
    catch: () => new DatabaseError({ message: 'Failed to create user' }),
  })
}
