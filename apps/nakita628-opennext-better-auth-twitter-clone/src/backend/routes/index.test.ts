import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import {
  CommentSchema,
  CurrentUserSchema,
  EditUserRequestSchema,
  FollowSchema,
  FollowUserRequestSchema,
  LikePostRequestSchema,
  LikeSchema,
  MessageResponseSchema,
  NotificationSchema,
  PostSchema,
  PostWithDetailsSchema,
  PostWithLikesSchema,
  PostDetailSchema,
  RegisterRequestSchema,
  UserSchema,
  UserWithFollowCountSchema,
  ValidationErrorSchema,
} from './index'

function mockUser() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    emailVerified: null,
    image: null,
    coverImage: null,
    profileImage: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hasNotification: false,
  }
}

describe('Schema Validation', () => {
  describe('UserSchema', () => {
    it('should accept valid user data', () => {
      const data = mockUser()
      const result = UserSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const data = { ...mockUser(), email: 'not-an-email' }
      const result = UserSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('should reject invalid uuid for id', () => {
      const data = { ...mockUser(), id: 'not-uuid' }
      const result = UserSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('should accept nullable bio', () => {
      const data = { ...mockUser(), bio: null }
      const result = UserSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should accept string bio', () => {
      const data = { ...mockUser(), bio: 'Hello world' }
      const result = UserSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('RegisterRequestSchema', () => {
    it('should accept valid registration', () => {
      const data = {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        username: faker.internet.username(),
        password: faker.internet.password(),
      }
      const result = RegisterRequestSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should reject missing email', () => {
      const data = {
        name: faker.person.fullName(),
        username: faker.internet.username(),
        password: faker.internet.password(),
      }
      const result = RegisterRequestSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('should reject invalid email format', () => {
      const data = {
        email: 'not-email',
        name: faker.person.fullName(),
        username: faker.internet.username(),
        password: faker.internet.password(),
      }
      const result = RegisterRequestSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('should reject missing password', () => {
      const data = {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        username: faker.internet.username(),
      }
      const result = RegisterRequestSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('PostSchema', () => {
    it('should accept valid post', () => {
      const data = {
        id: faker.string.uuid(),
        body: 'Hello world',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: faker.string.uuid(),
      }
      const result = PostSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should reject missing body', () => {
      const data = {
        id: faker.string.uuid(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: faker.string.uuid(),
      }
      const result = PostSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('CommentSchema', () => {
    it('should accept valid comment', () => {
      const data = {
        id: faker.string.uuid(),
        body: 'Nice post!',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: faker.string.uuid(),
        postId: faker.string.uuid(),
      }
      const result = CommentSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should reject invalid postId', () => {
      const data = {
        id: faker.string.uuid(),
        body: 'Nice post!',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: faker.string.uuid(),
        postId: 'not-uuid',
      }
      const result = CommentSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('FollowSchema', () => {
    it('should accept valid follow', () => {
      const data = {
        followerId: faker.string.uuid(),
        followingId: faker.string.uuid(),
        createdAt: new Date().toISOString(),
      }
      const result = FollowSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('LikeSchema', () => {
    it('should accept valid like', () => {
      const data = {
        userId: faker.string.uuid(),
        postId: faker.string.uuid(),
        createdAt: new Date().toISOString(),
      }
      const result = LikeSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('NotificationSchema', () => {
    it('should accept valid notification', () => {
      const data = {
        id: faker.string.uuid(),
        body: 'Someone liked your tweet',
        userId: faker.string.uuid(),
        createdAt: new Date().toISOString(),
      }
      const result = NotificationSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('CurrentUserSchema', () => {
    it('should accept valid current user with followers', () => {
      const data = {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        image: null,
        coverImage: null,
        profileImage: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        followers: [
          {
            followerId: faker.string.uuid(),
            followingId: faker.string.uuid(),
            createdAt: new Date().toISOString(),
          },
        ],
        following: [],
        hasNotification: false,
      }
      const result = CurrentUserSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should accept empty followers/following arrays', () => {
      const data = {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        image: null,
        coverImage: null,
        profileImage: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        followers: [],
        following: [],
        hasNotification: null,
      }
      const result = CurrentUserSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('EditUserRequestSchema', () => {
    it('should accept partial update', () => {
      const data = { name: 'New Name' }
      const result = EditUserRequestSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should accept empty object', () => {
      const result = EditUserRequestSchema.safeParse({})
      expect(result.success).toBe(true)
    })

    it('should accept nullable coverImage', () => {
      const data = { coverImage: null }
      const result = EditUserRequestSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should accept url coverImage', () => {
      const data = { coverImage: 'https://example.com/image.png' }
      const result = EditUserRequestSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('FollowUserRequestSchema', () => {
    it('should accept valid userId', () => {
      const data = { userId: faker.string.uuid() }
      const result = FollowUserRequestSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should reject non-uuid userId', () => {
      const data = { userId: 'not-uuid' }
      const result = FollowUserRequestSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('LikePostRequestSchema', () => {
    it('should accept valid postId', () => {
      const data = { postId: faker.string.uuid() }
      const result = LikePostRequestSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should reject non-uuid postId', () => {
      const data = { postId: 'not-uuid' }
      const result = LikePostRequestSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('MessageResponseSchema', () => {
    it('should accept valid message', () => {
      const data = { message: 'Success' }
      const result = MessageResponseSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should reject missing message', () => {
      const result = MessageResponseSchema.safeParse({})
      expect(result.success).toBe(false)
    })
  })

  describe('PostWithLikesSchema', () => {
    it('should accept post with likes', () => {
      const data = {
        id: faker.string.uuid(),
        body: 'Hello',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: faker.string.uuid(),
        likes: [
          {
            userId: faker.string.uuid(),
            postId: faker.string.uuid(),
            createdAt: new Date().toISOString(),
          },
        ],
      }
      const result = PostWithLikesSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should accept post with empty likes', () => {
      const data = {
        id: faker.string.uuid(),
        body: 'Hello',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: faker.string.uuid(),
        likes: [],
      }
      const result = PostWithLikesSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('PostWithDetailsSchema', () => {
    it('should accept post with user, comments, and likes', () => {
      const user = mockUser()
      const data = {
        id: faker.string.uuid(),
        body: 'Hello',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.id,
        user,
        comments: [
          {
            id: faker.string.uuid(),
            body: 'Nice!',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userId: faker.string.uuid(),
            postId: faker.string.uuid(),
          },
        ],
        likes: [
          {
            userId: faker.string.uuid(),
            postId: faker.string.uuid(),
            createdAt: new Date().toISOString(),
          },
        ],
      }
      const result = PostWithDetailsSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('PostDetailSchema', () => {
    it('should accept full post detail', () => {
      const user = mockUser()
      const data = {
        id: faker.string.uuid(),
        body: 'Hello',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.id,
        user,
        comments: [
          {
            id: faker.string.uuid(),
            body: 'Nice!',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userId: faker.string.uuid(),
            postId: faker.string.uuid(),
            user: mockUser(),
          },
        ],
        likes: [{ userId: faker.string.uuid() }],
        _count: { likes: 1 },
      }
      const result = PostDetailSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should reject missing _count', () => {
      const user = mockUser()
      const data = {
        id: faker.string.uuid(),
        body: 'Hello',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.id,
        user,
        comments: [],
        likes: [],
      }
      const result = PostDetailSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('UserWithFollowCountSchema', () => {
    it('should accept user with follow counts', () => {
      const data = {
        ...mockUser(),
        _count: { followers: 5, following: 3 },
      }
      const result = UserWithFollowCountSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should reject missing _count', () => {
      const data = mockUser()
      const result = UserWithFollowCountSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('ValidationErrorSchema', () => {
    it('should accept valid validation error response', () => {
      const data = {
        type: 'about:blank' as const,
        title: 'Unprocessable Content' as const,
        status: 422 as const,
        detail: 'Request validation failed' as const,
        errors: [{ pointer: '/email', detail: 'Invalid email' }],
      }
      const result = ValidationErrorSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })
})
