import { createRoute, z } from '@hono/zod-openapi'

const CreateUserSchema = z
  .object({
    name: z
      .string()
      .min(3, { error: 'Name must be at least 3 characters' })
      .max(20, { error: 'Name must be at most 20 characters' }),
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
      .array(z.string(), { error: 'Must have 1-5 tags' })
      .min(1, { error: 'Must have 1-5 tags' })
      .max(5, { error: 'Must have 1-5 tags' }),
    nickname: z.string({ error: () => 'Nickname is invalid' }).exactOptional(),
    priority: z
      .int({
        error: (iss) =>
          iss.input === undefined ? 'Priority is required' : 'Priority must be an integer',
      })
      .min(1, { error: 'Priority must be >= 1' })
      .max(10, { error: 'Priority must be <= 10' }),
    score: z.int().multipleOf(5, { error: 'Score must be a multiple of 5' }).exactOptional(),
    role: z
      .union(
        [
          z.literal('admin', { error: 'Select admin role' }),
          z.literal('user', { error: 'Select user role' }),
          z.literal('guest', { error: 'Select guest role' }),
        ],
        { error: 'Must be a valid role' },
      )
      .exactOptional(),
  })
  .refine((o) => !('password' in o) || ('code' in o), {
    error: 'Code is required when password is provided',
  })
  .openapi({ required: ['name', 'email', 'age', 'tags', 'priority'] })
  .openapi('CreateUser')

const UserSchema = z
  .object({
    id: z.int().exactOptional(),
    name: z.string().exactOptional(),
    email: z.string().exactOptional(),
    age: z.int().exactOptional(),
  })
  .openapi('User')

const ValidateInputSchema = z
  .object({
    value: z.union([z.string(), z.int()], { error: 'Must be a string or integer' }),
    category: z
      .xor([z.string(), z.int()], { error: 'Must be exactly one type' })
      .exactOptional(),
    forbidden: z
      .any()
      .refine((v) => typeof v !== 'string', { error: 'Must not be a string' })
      .exactOptional(),
  })
  .openapi({ required: ['value'] })
  .openapi('ValidateInput')

const MetadataSchema = z
  .record(z.string(), z.string())
  .refine(
    (o) => Object.keys(o).every((k) => new RegExp('^[a-z_]+$').test(k)),
    { error: 'Keys must be lowercase with underscores only' },
  )
  .openapi('Metadata')

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

export const postValidateRoute = createRoute({
  method: 'post',
  path: '/validate',
  operationId: 'validateData',
  request: {
    body: { content: { 'application/json': { schema: ValidateInputSchema } }, required: true },
  },
  responses: {
    200: { description: 'OK' },
  },
})

export const postMetadataRoute = createRoute({
  method: 'post',
  path: '/metadata',
  operationId: 'createMetadata',
  request: {
    body: { content: { 'application/json': { schema: MetadataSchema } }, required: true },
  },
  responses: {
    200: { description: 'OK' },
  },
})
