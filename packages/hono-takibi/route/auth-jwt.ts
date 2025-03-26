import { createRoute, z } from '@hono/zod-openapi'

const LoginInputSchema = z
  .object({
    username: z.string().openapi({ example: 'user@example.com' }),
    password: z.string().openapi({ example: 'P@ssw0rd!' }),
  })
  .openapi('LoginInput')

const LoginResponseSchema = z
  .object({
    two_factor_required: z.boolean(),
    temp_token: z.string().openapi({ example: 'temp1234567890' }).optional(),
    message: z
      .string()
      .openapi({ example: '2FA required. Please verify using the code sent to your device.' })
      .optional(),
  })
  .openapi('LoginResponse')

const VerifyInputSchema = z
  .object({
    temp_token: z.string().openapi({ example: 'temp1234567890' }),
    code: z.string().openapi({ example: '123456' }),
  })
  .openapi('VerifyInput')

const VerifyResponseSchema = z
  .object({
    token: z.string().openapi({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }),
    expires_in: z.number().int().openapi({ example: 3600 }),
  })
  .openapi('VerifyResponse')

const ProfileSchema = z
  .object({
    id: z.string().openapi({ example: 'user-123' }),
    username: z.string().openapi({ example: 'user@example.com' }),
    fullName: z.string().openapi({ example: 'John Doe' }),
  })
  .openapi('Profile')

export const postAuthLoginRoute = createRoute({
  method: 'post',
  path: '/auth/login',
  operationId: 'undefined',
  summary: 'User Login',
  description: 'Authenticate user credentials and initiate two-factor authentication if enabled.',
  request: {
    body: { required: true, content: { 'application/json': { schema: LoginInputSchema } } },
  },
  responses: {
    200: {
      description:
        'Login successful. If 2FA is enabled for the account, a temporary token is returned along with a flag indicating that 2FA verification is required.',
      content: { 'application/json': { schema: LoginResponseSchema } },
    },
    401: { description: 'Invalid credentials.' },
  },
})

export const postAuthVerifyRoute = createRoute({
  method: 'post',
  path: '/auth/verify',
  operationId: 'undefined',
  summary: 'Verify Two-Factor Authentication Code',
  description:
    'Verify the 2FA code using the temporary token obtained from the login endpoint. Upon successful verification, a JWT token is issued.',
  request: {
    body: { required: true, content: { 'application/json': { schema: VerifyInputSchema } } },
  },
  responses: {
    200: {
      description: '2FA verified successfully; JWT token issued.',
      content: { 'application/json': { schema: VerifyResponseSchema } },
    },
    401: { description: 'Invalid or expired 2FA code.' },
  },
})

export const getProfileRoute = createRoute({
  method: 'get',
  path: '/profile',
  operationId: 'undefined',
  summary: 'Get User Profile',
  description: 'Retrieve the profile of the authenticated user.',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'User profile retrieved successfully.',
      content: { 'application/json': { schema: ProfileSchema } },
    },
    401: { description: 'Unauthorized – invalid or missing JWT token.' },
  },
})
