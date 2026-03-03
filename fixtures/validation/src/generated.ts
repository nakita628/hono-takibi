import { createRoute, z } from '@hono/zod-openapi'

const CreateUserSchema = z
  .object({
    name: z
      .string()
      .min(3, { error: 'Name must be 3-20 characters' })
      .max(20, { error: 'Name must be 3-20 characters' }),
    email: z.email({ error: 'Invalid email address' }),
    age: z.int().min(0, { error: 'Age must be >= 0' }).max(150, { error: 'Age must be <= 150' }),
    password: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/, {
        error: 'Password must contain uppercase and number, min 8 chars',
      })
      .exactOptional(),
    code: z.string().length(5, { error: 'Code must be exactly 5 characters' }).exactOptional(),
    tags: z
      .array(z.string())
      .min(1, { error: 'Must have 1-5 tags' })
      .max(5, { error: 'Must have 1-5 tags' }),
  })
  .openapi({ required: ['name', 'email', 'age', 'tags'] })
  .openapi('CreateUser')

const UserSchema = z
  .object({
    id: z.int().exactOptional(),
    name: z.string().exactOptional(),
    email: z.string().exactOptional(),
    age: z.int().exactOptional(),
  })
  .openapi('User')

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
