import { createRoute, z } from '@hono/zod-openapi'

export const UserIdSchema = z.uuid().brand<'UserId'>().openapi('UserId')

export type UserId = z.infer<typeof UserIdSchema>

export const PostIdSchema = z.uuid().brand<'PostId'>().openapi('PostId')

export type PostId = z.infer<typeof PostIdSchema>

export const EmailSchema = z.email().brand<'Email'>().openapi('Email')

export type Email = z.infer<typeof EmailSchema>

export const PriceSchema = z.number().min(0).brand<'Price'>().openapi('Price')

export type Price = z.infer<typeof PriceSchema>

export const QuantitySchema = z.int().min(0).brand<'Quantity'>().openapi('Quantity')

export type Quantity = z.infer<typeof QuantitySchema>

export const UsernameSchema = z.string().min(3).max(20).brand<'Username'>().openapi('Username')

export type Username = z.infer<typeof UsernameSchema>

export const TagsSchema = z.array(z.string()).min(1).max(10).brand<'Tags'>().openapi('Tags')

export type Tags = z.infer<typeof TagsSchema>

export const CreateUserSchema = z
  .object({
    email: EmailSchema,
    username: UsernameSchema,
    price: PriceSchema,
    tags: TagsSchema.exactOptional(),
  })
  .openapi({ required: ['email', 'username', 'price'] })
  .openapi('CreateUser')

export type CreateUser = z.infer<typeof CreateUserSchema>

export const UserSchema = z
  .object({ id: UserIdSchema, email: EmailSchema, username: UsernameSchema })
  .openapi({ required: ['id', 'email', 'username'] })
  .openapi('User')

export type User = z.infer<typeof UserSchema>

export const CreatePostSchema = z
  .object({ authorId: UserIdSchema, title: z.string(), quantity: QuantitySchema })
  .openapi({ required: ['authorId', 'title', 'quantity'] })
  .openapi('CreatePost')

export type CreatePost = z.infer<typeof CreatePostSchema>

export const PostSchema = z
  .object({ id: PostIdSchema, authorId: UserIdSchema, title: z.string() })
  .openapi({ required: ['id', 'authorId', 'title'] })
  .openapi('Post')

export type Post = z.infer<typeof PostSchema>

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  operationId: 'createUser',
  request: {
    body: { content: { 'application/json': { schema: CreateUserSchema } }, required: true },
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: UserSchema } } },
  },
})

export const getUsersUserIdRoute = createRoute({
  method: 'get',
  path: '/users/{userId}',
  operationId: 'getUser',
  request: {
    params: z.object({
      userId: UserIdSchema.openapi({
        param: {
          name: 'userId',
          in: 'path',
          required: true,
          schema: { $ref: '#/components/schemas/UserId' },
        },
      }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: UserSchema } } },
  },
})

export const postPostsRoute = createRoute({
  method: 'post',
  path: '/posts',
  operationId: 'createPost',
  request: {
    body: { content: { 'application/json': { schema: CreatePostSchema } }, required: true },
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: PostSchema } } },
  },
})
