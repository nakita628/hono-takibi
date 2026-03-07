import { Effect } from 'effect'
import { ContractViolationError, makeFormatPublicUser, NotFoundError } from '@/backend/domain'
import { PaginatedUsersSchema, UserWithFollowCountSchema } from '@/backend/routes'
import * as UserService from '@/backend/services/user'

/**
 * Fetch a user by ID with follower/following counts.
 *
 * @mermaid
 * ```
 * flowchart TD
 *   A[findByIdWithFollowCount] --> B{user?}
 *   B -- no --> C[fail NotFound]
 *   B -- yes --> D[format with _count]
 *   D --> E[safeParse + return]
 * ```
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
 * @mermaid
 * ```
 * flowchart TD
 *   A[compute offset] --> B[findAllPaginated]
 *   B --> C[format users]
 *   C --> D[buildMeta page/limit/total]
 *   D --> E[safeParse + return]
 * ```
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
