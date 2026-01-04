import { createRoute, z } from '@hono/zod-openapi'

const UserSchema = z
  .object({
    id: z.string().openapi({ type: 'string' }),
    email: z.email().openapi({ type: 'string', format: 'email' }),
    name: z.string().exactOptional().openapi({ type: 'string' }),
    role: z
      .enum(['admin', 'user', 'guest'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['admin', 'user', 'guest'] }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'email'],
    properties: {
      id: { type: 'string' },
      email: { type: 'string', format: 'email' },
      name: { type: 'string' },
      role: { type: 'string', enum: ['admin', 'user', 'guest'] },
    },
  })
  .openapi('User')

const CreateUserInputSchema = z
  .object({
    email: z.email().openapi({ type: 'string', format: 'email' }),
    name: z.string().exactOptional().openapi({ type: 'string' }),
    password: z
      .file()
      .min(8)
      .exactOptional()
      .openapi({ type: 'string', format: 'binary', minLength: 8 }),
  })
  .openapi({
    type: 'object',
    required: ['email'],
    properties: {
      email: { type: 'string', format: 'email' },
      name: { type: 'string' },
      password: { type: 'string', format: 'binary', minLength: 8 },
    },
  })
  .openapi('CreateUserInput')

const UpdateUserInputSchema = z
  .object({
    email: z.email().openapi({ type: 'string', format: 'email' }),
    name: z.string().openapi({ type: 'string' }),
    role: z
      .enum(['admin', 'user', 'guest'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['admin', 'user', 'guest'] }),
  })
  .openapi({
    type: 'object',
    required: ['email', 'name'],
    properties: {
      email: { type: 'string', format: 'email' },
      name: { type: 'string' },
      role: { type: 'string', enum: ['admin', 'user', 'guest'] },
    },
  })
  .openapi('UpdateUserInput')

const PatchUserInputSchema = z
  .object({
    email: z.email().exactOptional().openapi({ type: 'string', format: 'email' }),
    name: z.string().exactOptional().openapi({ type: 'string' }),
    role: z
      .enum(['admin', 'user', 'guest'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['admin', 'user', 'guest'] }),
  })
  .openapi({
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      name: { type: 'string' },
      role: { type: 'string', enum: ['admin', 'user', 'guest'] },
    },
  })
  .openapi('PatchUserInput')

const CreateUserRequestBody = {
  description: 'User creation request',
  content: {
    'application/json': {
      schema: CreateUserInputSchema,
      examples: {
        basicUser: {
          summary: 'Basic user creation',
          value: { email: 'user@example.com', name: 'John Doe', password: 'securePassword123' },
        },
        minimalUser: { summary: 'Minimal user creation', value: { email: 'minimal@example.com' } },
      },
    },
  },
  required: true,
}

const UpdateUserRequestBody = {
  description: 'Full user update request',
  content: { 'application/json': { schema: UpdateUserInputSchema } },
  required: true,
}

const PatchUserRequestBody = {
  description: 'Partial user update request',
  content: {
    'application/json': { schema: PatchUserInputSchema },
    'application/merge-patch+json': { schema: PatchUserInputSchema },
  },
}

const FileUploadRequestBody = {
  description: 'File upload request',
  content: {
    'multipart/form-data': {
      schema: z
        .object({
          file: z.file().openapi({ type: 'string', format: 'binary' }),
          description: z.string().exactOptional().openapi({ type: 'string' }),
        })
        .openapi({
          type: 'object',
          required: ['file'],
          properties: {
            file: { type: 'string', format: 'binary' },
            description: { type: 'string' },
          },
        }),
    },
    'image/png': { schema: z.file().openapi({ type: 'string', format: 'binary' }) },
    'image/jpeg': { schema: z.file().openapi({ type: 'string', format: 'binary' }) },
  },
  required: true,
}

const BulkCreateUsersRequestBody = {
  description: 'Bulk user creation request',
  content: {
    'application/json': {
      schema: z
        .array(CreateUserInputSchema)
        .min(1)
        .max(100)
        .openapi({
          type: 'array',
          minItems: 1,
          maxItems: 100,
          items: { $ref: '#/components/schemas/CreateUserInput' },
        }),
    },
    'application/x-ndjson': { schema: CreateUserInputSchema },
  },
  required: true,
}

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  operationId: 'createUser',
  request: { body: CreateUserRequestBody },
  responses: { 201: { description: 'User created' } },
})

export const putUsersUserIdRoute = createRoute({
  method: 'put',
  path: '/users/{userId}',
  operationId: 'updateUser',
  request: {
    params: z.object({
      userId: z
        .string()
        .openapi({
          param: { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
    }),
    body: UpdateUserRequestBody,
  },
  responses: { 200: { description: 'User updated' } },
})

export const patchUsersUserIdRoute = createRoute({
  method: 'patch',
  path: '/users/{userId}',
  operationId: 'patchUser',
  request: {
    params: z.object({
      userId: z
        .string()
        .openapi({
          param: { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
    }),
    body: PatchUserRequestBody,
  },
  responses: { 200: { description: 'User patched' } },
})

export const postUsersUserIdAvatarRoute = createRoute({
  method: 'post',
  path: '/users/{userId}/avatar',
  operationId: 'uploadAvatar',
  request: {
    params: z.object({
      userId: z
        .string()
        .openapi({
          param: { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
    }),
    body: FileUploadRequestBody,
  },
  responses: { 200: { description: 'Avatar uploaded' } },
})

export const postBulkUsersRoute = createRoute({
  method: 'post',
  path: '/bulk/users',
  operationId: 'bulkCreateUsers',
  request: { body: BulkCreateUsersRequestBody },
  responses: { 201: { description: 'Users created' } },
})
