import { Effect } from 'effect'
import { ContractViolationError, UnauthorizedError } from '@/backend/domain'
import { CurrentUserSchema } from '@/backend/routes'
import * as UserService from '@/backend/services/user'

/**
 * Fetch the authenticated user's full profile.
 *
 * ||| Flow |||
 *   1. UserService.findByIdWithFollows(userId)
 *      → 2 SQL queries: user+profile, then followers+following arrays
 *   2. If not found → UnauthorizedError
 *   3. Map database columns to response fields (see table below)
 *   4. Validate via CurrentUserSchema.safeParse()
 *
 * ||| What the Query Looks Like |||
 *
 *   +------+ LEFT JOIN +--------------+
 *   | user |---------->| user_profile |
 *   +------+           +--------------+
 *       |
 *       | then separately:
 *       v
 *   +---------+
 *   | follows | WHERE followingId = me  → followers[]
 *   | follows | WHERE followerId  = me  → following[]
 *   +---------+
 *
 * ||| Table → Response Mapping |||
 *
 *   +---------------------------+---+---------------------------+
 *   | Database Column           |   | Response Field            |
 *   +---------------------------+---+---------------------------+
 *   | user.id                   | → | id                        |
 *   | user.name                 | → | name                      |
 *   | user.email                | → | email                     |
 *   | user.image                | → | image                     |
 *   | user_profile.username     | → | username                  |
 *   | user_profile.bio          | → | bio                       |
 *   | user_profile.coverImage   | → | coverImage                |
 *   | user_profile.profileImage | → | profileImage              |
 *   | user_profile.hasNotification | → | hasNotification        |
 *   | follows[] (followingId=me)| → | followers[]               |
 *   | follows[] (followerId=me) | → | following[]               |
 *   +---------------------------+---+---------------------------+
 */
export function get(userId: string) {
  return Effect.gen(function* () {
    const user = yield* UserService.findByIdWithFollows(userId)
    if (user == null) {
      return yield* new UnauthorizedError({ message: 'Unauthorized' })
    }

    const profile = user.userProfile

    const valid = CurrentUserSchema.safeParse({
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
    })
    if (!valid.success) {
      return yield* new ContractViolationError({ message: 'Invalid current user data' })
    }
    return valid.data
  })
}
