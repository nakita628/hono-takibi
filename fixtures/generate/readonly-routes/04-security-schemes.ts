import { createRoute, z } from '@hono/zod-openapi'

const BearerAuthSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  description: 'JWT Bearer token authentication',
} as const

const ApiKeySecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'X-API-Key',
  description: 'API key passed in header',
} as const

const ApiKeyCookieSecurityScheme = {
  type: 'apiKey',
  in: 'cookie',
  name: 'session_id',
  description: 'Session ID in cookie',
} as const

const BasicAuthSecurityScheme = {
  type: 'http',
  scheme: 'basic',
  description: 'HTTP Basic authentication',
} as const

const Oauth2SecurityScheme = {
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
} as const

const OpenIdConnectSecurityScheme = {
  type: 'openIdConnect',
  openIdConnectUrl: 'https://auth.example.com/.well-known/openid-configuration',
  description: 'OpenID Connect authentication',
} as const

export const getPublicRoute = createRoute({
  method: 'get',
  path: '/public',
  operationId: 'getPublicData',
  responses: { 200: { description: 'Public data' } },
  security: [],
} as const)

export const getProtectedRoute = createRoute({
  method: 'get',
  path: '/protected',
  operationId: 'getProtectedData',
  responses: { 200: { description: 'Protected data' }, 401: { description: 'Unauthorized' } },
  security: [{ bearerAuth: [] }],
} as const)

export const getAdminRoute = createRoute({
  method: 'get',
  path: '/admin',
  operationId: 'getAdminData',
  responses: { 200: { description: 'Admin data' } },
  security: [{ bearerAuth: [] }, { apiKey: [] }],
} as const)

export const getOauthResourceRoute = createRoute({
  method: 'get',
  path: '/oauth-resource',
  operationId: 'getOAuthResource',
  responses: { 200: { description: 'OAuth protected resource' } },
  security: [{ oauth2: ['read:items', 'write:items'] }],
} as const)

export const getMultiAuthRoute = createRoute({
  method: 'get',
  path: '/multi-auth',
  operationId: 'getMultiAuthResource',
  responses: { 200: { description: 'Resource with multiple auth options' } },
  security: [{ bearerAuth: [], apiKey: [] }, { oauth2: ['read:items'] }],
} as const)
