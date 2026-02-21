import { Effect } from 'effect'
import * as UserDomain from '@/backend/domain'
import { ValidationError } from '@/backend/domain'
import { SearchResultsSchema } from '@/backend/routes'
import * as SearchService from '@/backend/services/search'

/**
 * Transaction that orchestrates post and user search with pagination.
 *
 * @param args - Search parameters
 * @param args.query - Search keyword
 * @param args.page - Current page number
 * @param args.limit - Results per page
 * @returns Effect yielding validated `SearchResults`
 *
 * @mermaid
 * graph TD
 *   A[search] --> B[Calculate offset]
 *   B --> C[Effect.all parallel]
 *   C --> D[searchPosts]
 *   C --> E[searchUsers]
 *   D --> F[Build response with meta]
 *   E --> F
 *   F --> G[SearchResultsSchema.safeParse]
 *   G -- valid --> H[return data]
 *   G -- invalid --> I[ValidationError]
 */
export function search(args: { query: string; page: number; limit: number }) {
  return Effect.gen(function* () {
    const offset = (args.page - 1) * args.limit

    const [postsResult, usersResult] = yield* Effect.all([
      SearchService.searchPosts({ query: args.query, limit: args.limit, offset }),
      SearchService.searchUsers({ query: args.query, limit: args.limit, offset }),
    ])

    const posts = {
      data: postsResult.posts.map((post) => ({
        id: post.id,
        body: post.body,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        userId: post.userId,
        user: UserDomain.makeFormatUser(post.user),
        commentCount: 0,
        likeCount: 0,
      })),
      meta: {
        page: args.page,
        limit: args.limit,
        total: postsResult.total,
        totalPages: Math.ceil(postsResult.total / args.limit),
      },
    }

    const users = {
      data: usersResult.users.map((user) => UserDomain.makeFormatUser(user)),
      meta: {
        page: args.page,
        limit: args.limit,
        total: usersResult.total,
        totalPages: Math.ceil(usersResult.total / args.limit),
      },
    }

    const valid = SearchResultsSchema.safeParse({ posts, users })
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid search results' }))
    }
    return valid.data
  })
}
