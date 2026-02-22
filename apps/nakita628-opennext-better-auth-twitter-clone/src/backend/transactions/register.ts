import { Effect } from 'effect'
import { ContractViolationError } from '@/backend/domain'
import { UserSchema } from '@/backend/routes'
import * as AuthService from '@/backend/services/auth'
import * as UserService from '@/backend/services/user'

/**
 * Register a new user account with Better Auth and create a profile.
 *
 * @mermaid
 * ```
 * flowchart TD
 *   A[exists check] --> B{duplicate?}
 *   B -- yes --> C[fail Conflict]
 *   B -- no --> D[AuthService.signUpEmail]
 *   D --> E[createProfile]
 *   E --> F[validate + return]
 * ```
 */
export function create(args: { email: string; name: string; username: string; password: string }) {
  return Effect.gen(function* () {
    yield* UserService.exists({ email: args.email })

    const signUpResult = yield* AuthService.signUpEmail({
      email: args.email,
      password: args.password,
      name: args.name,
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
      image: user.image,
      coverImage: null,
      profileImage: null,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }
    const valid = UserSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ContractViolationError({ message: 'Invalid user data' }))
    }
    return valid.data
  })
}
