import { Effect } from 'effect'

import { ContractViolationError, UnauthorizedError } from '@/backend/domain'
import { UserSchema } from '@/backend/routes'
import * as UserService from '@/backend/services/user'

/**
 * Update user profile (name + profile fields)
 *
 * --- Flow ---
 * 1. UserService.findById(userId) → verify exists (null → UnauthorizedError)
 * 2. If name changed → UserService.updateName(id, name)
 *    ||| UPDATE user SET name = :name WHERE id = :userId
 * 3. UserService.updateProfile(userId, { username, bio, coverImage, profileImage })
 *    ||| INSERT INTO user_profile ... ON CONFLICT(userId) DO UPDATE SET ...
 * 4. Validate response via UserSchema.safeParse()
 *
 * ||| Table → Response Mapping |||
 *
 *   +------------------------+---+------------------+
 *   | Source Column           |   | Response Field   |
 *   +------------------------+---+------------------+
 *   | user.id                 | → | id               |
 *   | user.name / args.name   | → | name             |
 *   | user.email              | → | email            |
 *   | user.emailVerified      | → | emailVerified    |
 *   | user.image              | → | image            |
 *   | user_profile.username   | → | username         |
 *   | user_profile.bio        | → | bio              |
 *   | user_profile.coverImage | → | coverImage       |
 *   | user_profile.profileImage| →| profileImage     |
 *   +------------------------+---+------------------+
 */
export function update(
  userId: string,
  args: {
    name?: string
    username?: string
    bio?: string
    coverImage?: string | null
    profileImage?: string | null
  },
) {
  return Effect.gen(function* () {
    const user = yield* UserService.findById(userId)
    if (user == null) {
      return yield* new UnauthorizedError({ message: 'Not signed in' })
    }

    const profile = user.userProfile
    const newUsername = args.username ?? profile?.username ?? ''

    if (args.name && args.name !== user.name) {
      yield* UserService.updateName(user.id, args.name)
    }

    const updatedProfile = yield* UserService.updateProfile(user.id, {
      username: newUsername,
      bio: args.bio ?? profile?.bio,
      coverImage: args.coverImage !== undefined ? args.coverImage : profile?.coverImage,
      profileImage: args.profileImage !== undefined ? args.profileImage : profile?.profileImage,
    })

    const valid = UserSchema.safeParse({
      id: user.id,
      name: args.name ?? user.name,
      username: updatedProfile.username,
      bio: updatedProfile.bio,
      email: user.email,
      emailVerified: user.emailVerified ? user.createdAt.toISOString() : null,
      image: user.image ?? null,
      coverImage: updatedProfile.coverImage,
      profileImage: updatedProfile.profileImage,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    })
    if (!valid.success) {
      return yield* new ContractViolationError({ message: 'Invalid user data' })
    }
    return valid.data
  })
}
