import { Effect } from 'effect'
import { ContractViolationError, UnauthorizedError } from '@/backend/domain'
import { CurrentUserSchema } from '@/backend/routes'
import * as UserService from '@/backend/services/user'

/**
 * Fetch the current authenticated user with follow lists.
 *
 * @mermaid
 * ```
 * flowchart TD
 *   A[findByIdWithFollowCount] --> B{user?}
 *   B -- no --> C[fail Unauthorized]
 *   B -- yes --> D[format followers/following]
 *   D --> E[validate + return]
 * ```
 */
export function get(userId: string) {
  return Effect.gen(function* () {
    const user = yield* UserService.findByIdWithFollows(userId)
    if (!user) {
      return yield* Effect.fail(new UnauthorizedError({ message: 'Unauthorized' }))
    }

    const profile = user.userProfile

    const data = {
      id: user.id,
      name: user.name,
      username: profile?.username ?? '',
      bio: profile?.bio ?? null,
      email: user.email,
      image: user.image,
      coverImage: profile?.coverImage ?? null,
      profileImage: profile?.profileImage ?? null,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      followers: user.followers.map((f) => ({
        followerId: f.followerId,
        followingId: f.followingId,
        createdAt: f.createdAt.toISOString(),
      })),
      following: user.following.map((f) => ({
        followerId: f.followerId,
        followingId: f.followingId,
        createdAt: f.createdAt.toISOString(),
      })),
      hasNotification: profile?.hasNotification ?? null,
    }

    const valid = CurrentUserSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(
        new ContractViolationError({ message: 'Invalid current user data' }),
      )
    }
    return valid.data
  })
}
