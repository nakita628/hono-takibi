import { z } from '@hono/zod-openapi'
import { Effect } from 'effect'
import { NotFoundError, UnauthorizedError, ValidationError } from '@/backend/domain'
import { PostDetailSchema, PostSchema, PostWithDetailsSchema } from '@/backend/routes'
import * as PostService from '@/backend/services/post'
import * as UserService from '@/backend/services/user'

function formatUser(u: {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image: string | null | undefined
  createdAt: Date
  updatedAt: Date
  userProfile: {
    username: string | null
    bio: string | null
    coverImage: string | null
    profileImage: string | null
    hasNotification: boolean | null
  } | null
}) {
  const profile = u.userProfile
  return {
    id: u.id,
    name: u.name,
    username: profile?.username ?? '',
    bio: profile?.bio ?? null,
    email: u.email,
    emailVerified: null,
    image: u.image ?? null,
    coverImage: profile?.coverImage ?? null,
    profileImage: profile?.profileImage ?? null,
    createdAt: u.createdAt.toISOString(),
    updatedAt: u.updatedAt.toISOString(),
    hasNotification: profile?.hasNotification ?? null,
  }
}

export function create(email: string, args: { body: string }) {
  return Effect.gen(function* () {
    const user = yield* UserService.findByEmail(email)
    if (!user) {
      return yield* Effect.fail(new UnauthorizedError({ message: 'Not signed in' }))
    }

    const post = yield* PostService.create({ body: args.body, userId: user.id })

    const data = {
      id: post.id,
      body: post.body,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      userId: post.userId,
    }

    const valid = PostSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid post data' }))
    }
    return valid.data
  })
}

export function getAll(userId?: string) {
  return Effect.gen(function* () {
    const posts = yield* PostService.findAllWithRelations(userId)

    const data = posts.map((p) => ({
      id: p.id,
      body: p.body,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
      userId: p.userId,
      user: formatUser(p.user as any),
      comments: p.comments.map((c) => ({
        id: c.id,
        body: c.body,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
        userId: c.userId,
        postId: c.postId,
      })),
      likes: p.likes.map((l) => ({
        userId: l.userId,
        postId: l.postId,
        createdAt: l.createdAt.toISOString(),
      })),
    }))

    const valid = z.array(PostWithDetailsSchema).safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid posts data' }))
    }
    return valid.data
  })
}

export function getById(postId: string) {
  return Effect.gen(function* () {
    const post = yield* PostService.findByIdWithRelations(postId)
    if (!post) {
      return yield* Effect.fail(new NotFoundError({ message: 'Post not found' }))
    }

    const data = {
      id: post.id,
      body: post.body,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      userId: post.userId,
      user: formatUser(post.user as any),
      comments: post.comments.map((c) => ({
        id: c.id,
        body: c.body,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
        userId: c.userId,
        postId: c.postId,
        user: formatUser((c as any).user),
      })),
      likes: post.likes.map((l) => ({ userId: l.userId })),
      _count: { likes: post.likes.length },
    }

    const valid = PostDetailSchema.safeParse(data)
    if (!valid.success) {
      return yield* Effect.fail(new ValidationError({ message: 'Invalid post data' }))
    }
    return valid.data
  })
}
