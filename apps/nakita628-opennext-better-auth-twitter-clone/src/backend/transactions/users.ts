import { Effect } from 'effect'
import { ContractViolationError, makeFormatPublicUser, NotFoundError } from '@/backend/domain'
import { PaginatedUsersSchema, UserWithFollowCountSchema } from '@/backend/routes'
import * as UserService from '@/backend/services/user'

/**
 * Fetch user detail with follower/following counts.
 *
 * ||| What It Does |||
 *   Loads a user's public profile along with how many followers
 *   and how many people they follow (counts, not full lists).
 *
 * ||| Flow |||
 *   1. UserService.findByIdWithFollowCount(userId)
 *      → SELECT * FROM user LEFT JOIN user_profile WHERE user.id = :userId
 *      → SELECT COUNT(*) FROM follows WHERE followingId = :userId  (followers)
 *      → SELECT COUNT(*) FROM follows WHERE followerId  = :userId  (following)
 *   2. If not found → NotFoundError
 *   3. Validate via UserWithFollowCountSchema.safeParse()
 *
 * ||| Table → Response Mapping |||
 *
 *   +---------------------------+---+--------------------+
 *   | Source                    |   | Response Field     |
 *   +---------------------------+---+--------------------+
 *   | user.id                   | → | id                 |
 *   | user.name                 | → | name               |
 *   | user_profile.username     | → | username           |
 *   | user_profile.bio          | → | bio                |
 *   | user_profile.coverImage   | → | coverImage         |
 *   | user_profile.profileImage | → | profileImage       |
 *   | COUNT(follows.followingId)| → | _count.followers   |
 *   | COUNT(follows.followerId) | → | _count.following   |
 *   +---------------------------+---+--------------------+
 */
export function getById(userId: string) {
  return Effect.gen(function* () {
    const user = yield* UserService.findByIdWithFollowCount(userId)
    if (user == null) {
      return yield* new NotFoundError({ message: 'User not found' })
    }
    const profile = user.userProfile
    const valid = UserWithFollowCountSchema.safeParse({
      id: user.id,
      name: user.name,
      username: profile?.username ?? '',
      bio: profile?.bio ?? null,
      image: user.image ?? null,
      coverImage: profile?.coverImage ?? null,
      profileImage: profile?.profileImage ?? null,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      _count: {
        followers: user.followersCount,
        following: user.followingCount,
      },
    })
    if (!valid.success) {
      return yield* new ContractViolationError({ message: 'Invalid user data' })
    }
    return valid.data
  })
}

/**
 * List all users with pagination.
 *
 * ||| What It Does |||
 *   Returns a page of users with their profiles, formatted for
 *   public display (emails are stripped out).
 *
 * ||| Flow |||
 *   1. Calculate offset = (page - 1) * limit
 *   2. UserService.findAllPaginated(limit, offset)
 *      → SELECT * FROM user LEFT JOIN user_profile ORDER BY createdAt DESC LIMIT/OFFSET
 *      → SELECT COUNT(*) FROM user
 *   3. Format each user via makeFormatPublicUser() (strips email)
 *   4. Validate via PaginatedUsersSchema.safeParse({ data, meta })
 *
 * ||| Returns |||
 *   { data: PublicUser[], meta: { page, limit, total, totalPages } }
 */
export function getAll(page: number, limit: number) {
  return Effect.gen(function* () {
    const offset = (page - 1) * limit
    const result = yield* UserService.findAllPaginated(limit, offset)
    const valid = PaginatedUsersSchema.safeParse({
      data: result.users.map((user) => makeFormatPublicUser(user)),
      meta: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
      },
    })
    if (!valid.success) {
      return yield* new ContractViolationError({ message: 'Invalid users data' })
    }
    return valid.data
  })
}
