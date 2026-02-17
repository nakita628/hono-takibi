import { createRoute, z } from '@hono/zod-openapi'

export const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

export const ApiKeyAuthSecurityScheme = { type: 'apiKey', in: 'header', name: 'X-API-Key' }

export const BasicAuthSecurityScheme = { type: 'http', scheme: 'basic' }

export const OAuth2SecurityScheme = {
  type: 'oauth2',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://example.com/oauth/authorize',
      tokenUrl: 'https://example.com/oauth/token',
      scopes: { read: 'Read access', write: 'Write access' },
    },
  },
}

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
})

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
})

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
})

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
})

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
})

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
})
