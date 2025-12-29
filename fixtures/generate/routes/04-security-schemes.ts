import { createRoute, z } from '@hono/zod-openapi'

const bearerAuthSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  description: 'JWT Bearer token authentication',
}

const apiKeySecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'X-API-Key',
  description: 'API key passed in header',
}

const apiKeyCookieSecurityScheme = {
  type: 'apiKey',
  in: 'cookie',
  name: 'session_id',
  description: 'Session ID in cookie',
}

const basicAuthSecurityScheme = {
  type: 'http',
  scheme: 'basic',
  description: 'HTTP Basic authentication',
}

const oauth2SecurityScheme = {
  type: 'oauth2',
  description: 'OAuth 2.0 authentication',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://auth.example.com/authorize',
      tokenUrl: 'https://auth.example.com/token',
      refreshUrl: 'https://auth.example.com/refresh',
      scopes: {
        'read:items': 'Read items',
        'write:items': 'Create and update items',
        'delete:items': 'Delete items',
        admin: 'Full administrative access',
      },
    },
    clientCredentials: {
      tokenUrl: 'https://auth.example.com/token',
      scopes: { 'read:items': 'Read items', 'write:items': 'Create and update items' },
    },
    implicit: {
      authorizationUrl: 'https://auth.example.com/authorize',
      scopes: { 'read:items': 'Read items' },
    },
  },
}

const openIdConnectSecurityScheme = {
  type: 'openIdConnect',
  openIdConnectUrl: 'https://auth.example.com/.well-known/openid-configuration',
  description: 'OpenID Connect authentication',
}

export const getPublicRoute = createRoute({
  method: 'get',
  path: '/public',
  operationId: 'getPublicData',
  responses: { 200: { description: 'Public data' } },
  security: [],
})

export const getProtectedRoute = createRoute({
  method: 'get',
  path: '/protected',
  operationId: 'getProtectedData',
  responses: { 200: { description: 'Protected data' }, 401: { description: 'Unauthorized' } },
  security: [{ bearerAuth: [] }],
})

export const getAdminRoute = createRoute({
  method: 'get',
  path: '/admin',
  operationId: 'getAdminData',
  responses: { 200: { description: 'Admin data' } },
  security: [{ bearerAuth: [] }, { apiKey: [] }],
})

export const getOauthResourceRoute = createRoute({
  method: 'get',
  path: '/oauth-resource',
  operationId: 'getOAuthResource',
  responses: { 200: { description: 'OAuth protected resource' } },
  security: [{ oauth2: ['read:items', 'write:items'] }],
})

export const getMultiAuthRoute = createRoute({
  method: 'get',
  path: '/multi-auth',
  operationId: 'getMultiAuthResource',
  responses: { 200: { description: 'Resource with multiple auth options' } },
  security: [{ bearerAuth: [], apiKey: [] }, { oauth2: ['read:items'] }],
})
