import { createRoute, z } from '@hono/zod-openapi'

const UserSchema = z
  .object({
    id: z.string(),
    email: z.email(),
    name: z.string().exactOptional(),
    role: z.enum(['admin', 'user', 'guest']).exactOptional(),
  })
  .openapi({ required: ['id', 'email'] })
  .openapi('User')

const CreateUserInputSchema = z
  .object({
    email: z.email(),
    name: z.string().exactOptional(),
    password: z.file().min(8).exactOptional(),
  })
  .openapi({ required: ['email'] })
  .openapi('CreateUserInput')

const UpdateUserInputSchema = z
  .object({
    email: z.email(),
    name: z.string(),
    role: z.enum(['admin', 'user', 'guest']).exactOptional(),
  })
  .openapi({ required: ['email', 'name'] })
  .openapi('UpdateUserInput')

const PatchUserInputSchema = z
  .object({
    email: z.email().exactOptional(),
    name: z.string().exactOptional(),
    role: z.enum(['admin', 'user', 'guest']).exactOptional(),
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
        .object({ file: z.file(), description: z.string().exactOptional() })
        .openapi({ required: ['file'] }),
    },
    'image/png': { schema: z.file() },
    'image/jpeg': { schema: z.file() },
  },
  required: true,
}

const BulkCreateUsersRequestBody = {
  description: 'Bulk user creation request',
  content: {
    'application/json': { schema: z.array(CreateUserInputSchema).min(1).max(100) },
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
      userId: z.string().openapi({ param: { name: 'userId', in: 'path', required: true } }),
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
      userId: z.string().openapi({ param: { name: 'userId', in: 'path', required: true } }),
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
      userId: z.string().openapi({ param: { name: 'userId', in: 'path', required: true } }),
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
