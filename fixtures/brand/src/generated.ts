import { createRoute, z } from '@hono/zod-openapi'

const UserIdSchema = z.uuid().brand<'UserId'>().openapi('UserId')

const PostIdSchema = z.uuid().brand<'PostId'>().openapi('PostId')

const EmailSchema = z.email().brand<'Email'>().openapi('Email')

const PriceSchema = z.number().min(0).brand<'Price'>().openapi('Price')

const QuantitySchema = z.int().min(0).brand<'Quantity'>().openapi('Quantity')

const UsernameSchema = z.string().min(3).max(20).brand<'Username'>().openapi('Username')

const TagsSchema = z.array(z.string()).min(1).max(10).brand<'Tags'>().openapi('Tags')

const CreateUserSchema = z
  .object({
    email: EmailSchema,
    username: UsernameSchema,
    price: PriceSchema,
    tags: TagsSchema.exactOptional(),
  })
  .openapi({ required: ['email', 'username', 'price'] })
  .openapi('CreateUser')

const UserSchema = z
  .object({ id: UserIdSchema, email: EmailSchema, username: UsernameSchema })
  .openapi({ required: ['id', 'email', 'username'] })
  .openapi('User')

const CreatePostSchema = z
  .object({ authorId: UserIdSchema, title: z.string(), quantity: QuantitySchema })
  .openapi({ required: ['authorId', 'title', 'quantity'] })
  .openapi('CreatePost')

const PostSchema = z
  .object({ id: PostIdSchema, authorId: UserIdSchema, title: z.string() })
  .openapi({ required: ['id', 'authorId', 'title'] })
  .openapi('Post')

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
