import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const ApiKeyAuthSecurityScheme = { type: 'apiKey', in: 'header', name: 'X-API-Key' }

const BasicAuthSecurityScheme = { type: 'http', scheme: 'basic' }

const OAuth2SecurityScheme = {
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

const getPublicRouteHandler: RouteHandler<typeof getPublicRoute> = async (c) => {
  return c.json(
    {
      message: faker.string.alpha({ length: { min: 5, max: 20 } }),
    },
    200,
  )
}

const getBearerProtectedRouteHandler: RouteHandler<typeof getBearerProtectedRoute> = async (c) => {
  return c.json(
    {
      data: faker.string.alpha({ length: { min: 5, max: 20 } }),
    },
    200,
  )
}

const getApiKeyProtectedRouteHandler: RouteHandler<typeof getApiKeyProtectedRoute> = async (c) => {
  return c.json(
    {
      data: faker.string.alpha({ length: { min: 5, max: 20 } }),
    },
    200,
  )
}

const getBasicProtectedRouteHandler: RouteHandler<typeof getBasicProtectedRoute> = async (c) => {
  return c.json(
    {
      data: faker.string.alpha({ length: { min: 5, max: 20 } }),
    },
    200,
  )
}

const getOauthProtectedRouteHandler: RouteHandler<typeof getOauthProtectedRoute> = async (c) => {
  return c.json(
    {
      data: faker.string.alpha({ length: { min: 5, max: 20 } }),
    },
    200,
  )
}

const getMultiAuthRouteHandler: RouteHandler<typeof getMultiAuthRoute> = async (c) => {
  return c.json(
    {
      data: faker.string.alpha({ length: { min: 5, max: 20 } }),
    },
    200,
  )
}

const app = new OpenAPIHono()

export const api = app
  .openapi(getPublicRoute, getPublicRouteHandler)
  .openapi(getBearerProtectedRoute, getBearerProtectedRouteHandler)
  .openapi(getApiKeyProtectedRoute, getApiKeyProtectedRouteHandler)
  .openapi(getBasicProtectedRoute, getBasicProtectedRouteHandler)
  .openapi(getOauthProtectedRoute, getOauthProtectedRouteHandler)
  .openapi(getMultiAuthRoute, getMultiAuthRouteHandler)

export type AppType = typeof api

export default app
