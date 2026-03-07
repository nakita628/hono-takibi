import { Effect } from 'effect'
import { ContractViolationError, makeFormatPublicUser, NotFoundError } from '@/backend/domain'
import { PaginatedPostsSchema, PostDetailSchema, PostSchema } from '@/backend/routes'
import * as PostService from '@/backend/services/post'

/**
 * Create a new post for the authenticated user.
 *
 * @mermaid
 * ```
 * flowchart TD
 *   A[createPost] --> B[safeParse + return]
 * ```
 */
export function create(userId: string, body: string) {
  return PostService.create(body, userId).pipe(
    Effect.andThen((post) => {
      const valid = PostSchema.safeParse({
        id: post.id,
        body: post.body,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        userId: post.userId,
      })
      if (!valid.success) {
        return Effect.fail(new ContractViolationError({ message: 'Invalid post data' }))
      }
      return Effect.succeed(valid.data)
    }),
  )
}

/**
 * List posts with pagination, comment counts, and like counts.
 *
 * @mermaid
 * ```
 * flowchart TD
 *   A[compute offset] --> B[findAllPaginated]
 *   B --> C[map posts with counts]
 *   C --> D[buildMeta page/limit/total]
 *   D --> E[safeParse + return]
 * ```
 */
export function getAll(page: number, limit: number, userId?: string) {
  const offset = (page - 1) * limit

  return PostService.findAllPaginated(limit, offset, userId).pipe(
    Effect.andThen((result) => {
      const valid = PaginatedPostsSchema.safeParse({
        data: result.posts.map((post) => ({
          id: post.id,
          body: post.body,
          createdAt: post.createdAt.toISOString(),
          updatedAt: post.updatedAt.toISOString(),
          userId: post.userId,
          user: makeFormatPublicUser(post.user),
          commentCount: result.commentCounts[post.id] ?? 0,
          likeCount: result.likeCounts[post.id] ?? 0,
        })),
        meta: {
          page,
          limit,
          total: result.total,
          totalPages: Math.ceil(result.total / limit),
        },
      })
      if (!valid.success) {
        return Effect.fail(new ContractViolationError({ message: 'Invalid posts data' }))
      }
      return Effect.succeed(valid.data)
    }),
  )
}

/**
 * Fetch a single post with user, comments, and likes.
 *
 * @mermaid
 * ```
 * flowchart TD
 *   A[findByIdWithRelations] --> B{post?}
 *   B -- no --> C[fail NotFound]
 *   B -- yes --> D[format comments/likes/user]
 *   D --> E[safeParse + return]
 * ```
 */
export function getById(postId: string) {
  return PostService.findByIdWithRelations(postId).pipe(
    Effect.filterOrFail(
      (p): p is NonNullable<typeof p> => p != null,
      () => new NotFoundError({ message: 'Post not found' }),
    ),
    Effect.andThen((post) => {
      const valid = PostDetailSchema.safeParse({
        id: post.id,
        body: post.body,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        userId: post.userId,
        user: makeFormatPublicUser(post.user),
        comments: post.comments.map((comment) => ({
          id: comment.id,
          body: comment.body,
          createdAt: comment.createdAt.toISOString(),
          updatedAt: comment.updatedAt.toISOString(),
          userId: comment.userId,
          postId: comment.postId,
          user: makeFormatPublicUser(comment.user),
        })),
        likes: post.likes.map((like) => ({ userId: like.userId })),
        _count: { likes: post.likes.length },
      })
      if (!valid.success) {
        return Effect.fail(new ContractViolationError({ message: 'Invalid post data' }))
      }
      return Effect.succeed(valid.data)
    }),
  )
}
