import { Effect } from 'effect'
import { NotFoundError, UnauthorizedError, ValidationError } from '@/backend/domain'
import { PostDetailSchema, PostSchema, PostWithDetailsSchema } from '@/backend/routes'
import * as PostService from '@/backend/services/post'
import * as UserService from '@/backend/services/user'
import { z } from '@hono/zod-openapi'

function formatUser(u: {
  id: string
  name: string
  username: string
  bio: string | null
  email: string
  emailVerified: Date | null
  image: string | null
  coverImage: string | null
  profileImage: string | null
  createdAt: Date
  updatedAt: Date
  hasNotification: boolean | null
}) {
  return {
    id: u.id,
    name: u.name,
    username: u.username,
    bio: u.bio,
    email: u.email,
    emailVerified: u.emailVerified?.toISOString() ?? null,
    image: u.image,
    coverImage: u.coverImage,
    profileImage: u.profileImage,
    createdAt: u.createdAt.toISOString(),
    updatedAt: u.updatedAt.toISOString(),
    hasNotification: u.hasNotification,
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
      user: formatUser(p.user),
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
      user: formatUser(post.user),
      comments: post.comments.map((c) => ({
        id: c.id,
        body: c.body,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
        userId: c.userId,
        postId: c.postId,
        user: formatUser(c.user),
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
