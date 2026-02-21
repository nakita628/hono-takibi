import { Effect } from 'effect'
import { DatabaseError, ValidationError } from '@/backend/domain'
import { UserSchema } from '@/backend/routes'
import * as UserService from '@/backend/services/user'
import { auth } from '@/lib/auth'

/**
 * Register a new user account with Better Auth and create a profile.
 *
 * @mermaid
 * ```
 * flowchart TD
 *   A[exists check] --> B{duplicate?}
 *   B -- yes --> C[fail Conflict]
 *   B -- no --> D[auth.signUpEmail]
 *   D --> E[createProfile]
 *   E --> F[validate + return]
 * ```
 */
export const create = (args: { email: string; name: string; username: string; password: string }) =>
  Effect.gen(function* () {
    yield* UserService.exists({ email: args.email })

    const signUpResult = yield* Effect.tryPromise({
      try: () =>
        auth().api.signUpEmail({
          body: {
            email: args.email,
            password: args.password,
            name: args.name,
          },
        }),
      catch: () => new DatabaseError({ message: 'Failed to create user' }),
    })

    const user = signUpResult.user

    yield* UserService.createProfile({
      userId: user.id,
      username: args.username,
    })

    const data = {
      id: user.id,
      name: user.name,
      username: args.username,
      bio: '',
      email: user.email,
      emailVerified: null,
      image: user.image,
      coverImage: null,
      profileImage: null,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      hasNotification: false,
    }
    const valid = UserSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid user data' }))
    }
    return valid.data
  })
