import { Effect } from 'effect'
import { UnauthorizedError, ValidationError } from '@/backend/domain'
import { UserSchema } from '@/backend/routes'
import * as UserService from '@/backend/services/user'

/**
 * Update user name and/or profile fields.
 *
 * @mermaid
 * ```
 * flowchart TD
 *   A[findById] --> B{user?}
 *   B -- no --> C[fail Unauthorized]
 *   B -- yes --> D{name changed?}
 *   D -- yes --> E[updateName]
 *   D -- no --> F[updateProfile]
 *   E --> F
 *   F --> G[validate + return]
 * ```
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
    if (!user) {
      return yield* Effect.fail(new UnauthorizedError({ message: 'Not signed in' }))
    }

    const profile = user.userProfile

    // Update name on user table if provided
    if (args.name && args.name !== user.name) {
      yield* UserService.updateName(user.id, args.name)
    }

    // Update profile fields on userProfile table
    const updatedProfile = yield* UserService.updateProfile(user.id, {
      username: args.username ?? profile?.username ?? '',
      bio: args.bio ?? profile?.bio,
      coverImage: args.coverImage !== undefined ? args.coverImage : profile?.coverImage,
      profileImage: args.profileImage !== undefined ? args.profileImage : profile?.profileImage,
    })

    const data = {
      id: user.id,
      name: args.name ?? user.name,
      username: updatedProfile.username,
      bio: updatedProfile.bio,
      email: user.email,
      emailVerified: null,
      image: user.image ?? null,
      coverImage: updatedProfile.coverImage,
      profileImage: updatedProfile.profileImage,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      hasNotification: updatedProfile.hasNotification,
    }

    const valid = UserSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid user data' }))
    }
    return valid.data
  })
}
