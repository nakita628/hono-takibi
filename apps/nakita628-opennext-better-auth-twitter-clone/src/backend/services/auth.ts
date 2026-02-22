import { Effect } from 'effect'
import { DatabaseError } from '@/backend/domain'
import { auth } from '@/infra'

/**
 * Sign up a new user account via Better Auth.
 *
 * @param args - Signup credentials
 * @param args.email - User email
 * @param args.password - User password
 * @param args.name - Display name
 * @returns Effect yielding the signup result (user + session)
 */
export function signUpEmail(args: { email: string; password: string; name: string }) {
  return Effect.tryPromise({
    try: () => auth().api.signUpEmail({ body: args }),
    catch: () => new DatabaseError({ message: 'Failed to create user' }),
  })
}
