import { createRoute, z } from '@hono/zod-openapi'

export const BearerAuthSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
} as const

export const ApiKeyAuthSecurityScheme = { type: 'apiKey', in: 'header', name: 'X-API-Key' } as const

export const BasicAuthSecurityScheme = { type: 'http', scheme: 'basic' } as const

export const OAuth2SecurityScheme = {
  type: 'oauth2',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://example.com/oauth/authorize',
      tokenUrl: 'https://example.com/oauth/token',
      scopes: { read: 'Read access', write: 'Write access' },
    },
  },
} as const

export const getPublicRoute = createRoute({
  method: 'get',
  path: '/public',
  operationId: 'getPublic',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ message: z.string() }).openapi({ required: ['message'] }),
        },
      },
    },
  },
} as const)

export const getBearerProtectedRoute = createRoute({
  method: 'get',
  path: '/bearer-protected',
  operationId: 'getBearerProtected',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ data: z.string() }).openapi({ required: ['data'] }),
        },
      },
    },
  },
  security: [{ BearerAuth: [] }],
} as const)

export const getApiKeyProtectedRoute = createRoute({
  method: 'get',
  path: '/api-key-protected',
  operationId: 'getApiKeyProtected',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ data: z.string() }).openapi({ required: ['data'] }),
        },
      },
    },
  },
  security: [{ ApiKeyAuth: [] }],
} as const)

export const getBasicProtectedRoute = createRoute({
  method: 'get',
  path: '/basic-protected',
  operationId: 'getBasicProtected',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ data: z.string() }).openapi({ required: ['data'] }),
        },
      },
    },
  },
  security: [{ BasicAuth: [] }],
} as const)

export const getOauthProtectedRoute = createRoute({
  method: 'get',
  path: '/oauth-protected',
  operationId: 'getOAuthProtected',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ data: z.string() }).openapi({ required: ['data'] }),
        },
      },
    },
  },
  security: [{ OAuth2: ['read'] }],
} as const)

export const getMultiAuthRoute = createRoute({
  method: 'get',
  path: '/multi-auth',
  operationId: 'getMultiAuth',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ data: z.string() }).openapi({ required: ['data'] }),
        },
      },
    },
  },
  security: [{ BearerAuth: [], ApiKeyAuth: [] }],
} as const)
