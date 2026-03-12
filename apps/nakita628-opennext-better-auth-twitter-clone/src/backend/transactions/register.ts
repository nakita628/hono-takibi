import { Effect } from 'effect'
import { ContractViolationError } from '@/backend/domain'
import { UserSchema } from '@/backend/routes'
import * as AuthService from '@/backend/services/auth'
import * as UserService from '@/backend/services/user'

/**
 * Register a new user (Better Auth + profile creation).
 *
 * ||| What It Does |||
 *   Creates a complete user account: auth credentials, user row,
 *   and application profile — all in one transaction.
 *
 * ||| Flow |||
 *   1. UserService.exists(email) → duplicate check
 *      → SELECT * FROM user WHERE email = :email
 *      → found → ConflictError "Email already exists"
 *   2. AuthService.signUpEmail(email, password, name)
 *      Better Auth internally executes:
 *      → INSERT INTO user (id, name, email, ...) VALUES (...)
 *      → INSERT INTO account (id, userId, providerId: "credential", password: hash, ...) VALUES (...)
 *   3. UserService.createProfile(user.id, username)
 *      → INSERT INTO user_profile (userId, username, ...) VALUES (...) RETURNING *
 *   4. Validate response via UserSchema.safeParse()
 *
 * ||| Table Relationship (Registration) |||
 *
 *   +------+---1:1---+--------------+
 *   | user |         | user_profile |  (userId FK)
 *   +------+---1:N---+---------+----+
 *                    | account |       (userId FK, credential provider)
 *                    +---------+
 *
 * ||| Returns |||
 *   { id, name, username, bio, email, image, coverImage, profileImage, ... }
 */
export function create(email: string, name: string, username: string, password: string) {
  return Effect.gen(function* () {
    yield* UserService.exists(email)

    const { user } = yield* AuthService.signUpEmail(email, password, name)

    yield* UserService.createProfile(user.id, username)

    const valid = UserSchema.safeParse({
      id: user.id,
      name: user.name,
      username,
      bio: '',
      email: user.email,
      emailVerified: user.emailVerified ? user.createdAt.toISOString() : null,
      image: user.image,
      coverImage: null,
      profileImage: null,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    })
    if (!valid.success) {
      return yield* new ContractViolationError({ message: 'Invalid user data' })
    }
    return valid.data
  })
}
