import { Effect } from 'effect'
import { ContractViolationError, makeFormatPublicUser } from '@/backend/domain'
import { SearchResultsSchema } from '@/backend/routes'
import * as PostService from '@/backend/services/post'
import * as SearchService from '@/backend/services/search'

export function search(query: string, page: number, limit: number) {
  return Effect.gen(function* () {
    const offset = (page - 1) * limit

    const [postsResult, usersResult] = yield* Effect.all([
      SearchService.searchPosts(query, limit, offset),
      SearchService.searchUsers(query, limit, offset),
    ])

    const postIds = postsResult.posts.map((p) => p.id)
    const { commentCounts, likeCounts } = yield* PostService.getCountsForPostIds(postIds)

    const result = {
      posts: postsResult.posts.map((post) => ({
        id: post.id,
        body: post.body,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        userId: post.userId,
        user: makeFormatPublicUser(post.user),
        commentCount: commentCounts[post.id] ?? 0,
        likeCount: likeCounts[post.id] ?? 0,
      })),
      users: usersResult.users.map((user) => makeFormatPublicUser(user)),
    }

    const valid = SearchResultsSchema.safeParse(result)
    if (!valid.success) {
      return yield* new ContractViolationError({ message: 'Invalid search results' })
    }
    return valid.data
  })
}
