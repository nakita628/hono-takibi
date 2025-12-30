import { createRoute, z } from '@hono/zod-openapi'

const BearerAuthSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  description: 'JWT Bearer token with RS256 signature',
}

const BasicAuthSecurityScheme = {
  type: 'http',
  scheme: 'basic',
  description: 'HTTP Basic authentication',
}

const DigestAuthSecurityScheme = {
  type: 'http',
  scheme: 'digest',
  description: 'HTTP Digest authentication',
}

const HobaAuthSecurityScheme = {
  type: 'http',
  scheme: 'hoba',
  description: 'HTTP Origin-Bound Authentication',
}

const NegotiateAuthSecurityScheme = {
  type: 'http',
  scheme: 'negotiate',
  description: 'SPNEGO/Kerberos authentication',
}

const ScramAuthSecurityScheme = {
  type: 'http',
  scheme: 'scram-sha-256',
  description: 'SCRAM-SHA-256 authentication',
}

const VapidAuthSecurityScheme = {
  type: 'http',
  scheme: 'vapid',
  description: 'VAPID authentication for push notifications',
}

const ApiKeyHeaderSecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'X-API-Key',
  description: 'API key in header',
}

const ApiKeyQuerySecurityScheme = {
  type: 'apiKey',
  in: 'query',
  name: 'api_key',
  description: 'API key in query string',
}

const ApiKeyCookieSecurityScheme = {
  type: 'apiKey',
  in: 'cookie',
  name: 'api_key',
  description: 'API key in cookie',
}

const PrimaryApiKeySecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'X-Primary-Key',
  description: 'Primary API key for main operations',
}

const SecondaryApiKeySecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'X-Secondary-Key',
  description: 'Secondary API key for backup',
}

const RateLimitKeySecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'X-RateLimit-Key',
  description: 'Key for rate limit bucket',
}

const EncryptionKeySecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'X-Encryption-Key',
  description: 'Key for payload encryption',
}

const SignatureKeySecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'X-Signature-Key',
  description: 'Key for request signing',
}

const MfaTokenSecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'X-MFA-Token',
  description: 'Multi-factor authentication token',
}

const DeviceAuthSecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'X-Device-Token',
  description: 'Device authentication token',
}

const SessionTokenSecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'X-Session-Token',
  description: 'Session token',
}

const CsrfTokenSecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'X-CSRF-Token',
  description: 'CSRF protection token',
}

const IdempotencyKeySecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'Idempotency-Key',
  description: 'Idempotency key for safe retries',
}

const TenantHeaderSecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'X-Tenant-ID',
  description: 'Multi-tenant organization identifier',
}

const SpecialHeaderSecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'X-Special-Access',
  description: 'Special access token',
}

const Oauth2AuthCodeSecurityScheme = {
  type: 'oauth2',
  description: 'OAuth 2.0 Authorization Code flow',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://auth.example.com/oauth/authorize',
      tokenUrl: 'https://auth.example.com/oauth/token',
      refreshUrl: 'https://auth.example.com/oauth/refresh',
      scopes: {
        read: 'Read access',
        write: 'Write access',
        delete: 'Delete access',
        admin: 'Admin access',
        superadmin: 'Super admin access',
        'users:read': 'Read users',
        'users:write': 'Write users',
        'users:delete': 'Delete users',
        'users:admin': 'Admin users',
        'organizations:read': 'Read organizations',
        'organizations:write': 'Write organizations',
        'organizations:delete': 'Delete organizations',
        'organizations:admin': 'Admin organizations',
        'projects:read': 'Read projects',
        'projects:write': 'Write projects',
        'projects:delete': 'Delete projects',
        'projects:admin': 'Admin projects',
        'billing:read': 'Read billing',
        'billing:write': 'Write billing',
        'audit:read': 'Read audit logs',
        'settings:read': 'Read settings',
        'settings:write': 'Write settings',
        'webhooks:read': 'Read webhooks',
        'webhooks:write': 'Write webhooks',
        'webhooks:delete': 'Delete webhooks',
        'api_keys:read': 'Read API keys',
        'api_keys:write': 'Write API keys',
        'api_keys:delete': 'Delete API keys',
        'integrations:read': 'Read integrations',
        'integrations:write': 'Write integrations',
        'integrations:delete': 'Delete integrations',
        'tenant:read': 'Read tenant data',
        'machine:read': 'Machine read access',
        'machine:write': 'Machine write access',
      },
    },
  },
}

const Oauth2ImplicitSecurityScheme = {
  type: 'oauth2',
  description: 'OAuth 2.0 Implicit flow (legacy)',
  flows: {
    implicit: {
      authorizationUrl: 'https://auth.example.com/oauth/authorize',
      scopes: { read: 'Read access', profile: 'Access user profile' },
    },
  },
}

const Oauth2ClientCredsSecurityScheme = {
  type: 'oauth2',
  description: 'OAuth 2.0 Client Credentials flow',
  flows: {
    clientCredentials: {
      tokenUrl: 'https://auth.example.com/oauth/token',
      scopes: {
        'machine:read': 'Machine read access',
        'machine:write': 'Machine write access',
        'service:access': 'Service-to-service access',
      },
    },
  },
}

const Oauth2PasswordSecurityScheme = {
  type: 'oauth2',
  description: 'OAuth 2.0 Resource Owner Password Credentials flow',
  flows: {
    password: {
      tokenUrl: 'https://auth.example.com/oauth/token',
      scopes: { read: 'Read access', write: 'Write access' },
    },
  },
}

const Oauth2MultiSecurityScheme = {
  type: 'oauth2',
  description: 'OAuth 2.0 with multiple flows',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://auth.example.com/oauth/authorize',
      tokenUrl: 'https://auth.example.com/oauth/token',
      scopes: { read: 'Read access', write: 'Write access' },
    },
    clientCredentials: {
      tokenUrl: 'https://auth.example.com/oauth/token',
      scopes: { 'machine:access': 'Machine access' },
    },
    implicit: {
      authorizationUrl: 'https://auth.example.com/oauth/authorize',
      scopes: { read: 'Read access' },
    },
  },
}

const OpenIdConnectSecurityScheme = {
  type: 'openIdConnect',
  openIdConnectUrl: 'https://auth.example.com/.well-known/openid-configuration',
  description: 'OpenID Connect authentication',
}

const MutualTLSSecurityScheme = {
  type: 'mutualTLS',
  description: 'Client certificate authentication',
}

const CustomSchemeSecurityScheme = {
  type: 'http',
  scheme: 'custom',
  description: 'Custom authentication scheme',
}

const AwsSigV4SecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'Authorization',
  description: 'AWS Signature Version 4',
}

const HawkAuthSecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'Authorization',
  description: 'Hawk authentication',
}

const NtlmAuthSecurityScheme = { type: 'http', scheme: 'ntlm', description: 'NTLM authentication' }

export const getPublicRoute = createRoute({
  method: 'get',
  path: '/public',
  summary: 'Completely public endpoint',
  operationId: 'getPublic',
  responses: { 200: { description: 'OK' } },
  security: [],
})

export const getSingleAuthRoute = createRoute({
  method: 'get',
  path: '/single-auth',
  summary: 'Single authentication required',
  operationId: 'getSingleAuth',
  responses: { 200: { description: 'OK' } },
  security: [{ bearerAuth: [] }],
})

export const getAnyAuthRoute = createRoute({
  method: 'get',
  path: '/any-auth',
  summary: 'Any of these auth methods works (OR)',
  operationId: 'getAnyAuth',
  responses: { 200: { description: 'OK' } },
  security: [
    { bearerAuth: [] },
    { apiKeyHeader: [] },
    { apiKeyQuery: [] },
    { apiKeyCookie: [] },
    { basicAuth: [] },
    { digestAuth: [] },
    { oauth2AuthCode: ['read'] },
    { oauth2Implicit: ['read'] },
    { oauth2ClientCreds: ['read'] },
    { oauth2Password: ['read'] },
    { openIdConnect: ['openid'] },
    { mutualTLS: [] },
  ],
})

export const getAllAuthRoute = createRoute({
  method: 'get',
  path: '/all-auth',
  summary: 'All of these auth methods required (AND)',
  operationId: 'getAllAuth',
  responses: { 200: { description: 'OK' } },
  security: [{ bearerAuth: [], apiKeyHeader: [], mfaToken: [] }],
})

export const getComplexAuthRoute = createRoute({
  method: 'get',
  path: '/complex-auth',
  summary: 'Complex AND/OR security requirements',
  operationId: 'getComplexAuth',
  responses: { 200: { description: 'OK' } },
  security: [
    { bearerAuth: [], apiKeyHeader: [], mfaToken: [] },
    { oauth2AuthCode: ['read', 'write', 'delete', 'admin', 'superadmin'] },
    { basicAuth: [], specialHeader: [] },
    { oauth2ClientCreds: ['machine:read', 'machine:write'], deviceAuth: [] },
    { mutualTLS: [] },
  ],
})

export const getScopedOauthRoute = createRoute({
  method: 'get',
  path: '/scoped-oauth',
  summary: 'OAuth with many specific scopes',
  operationId: 'getScopedOAuth',
  responses: { 200: { description: 'OK' } },
  security: [
    {
      oauth2AuthCode: [
        'users:read',
        'users:write',
        'users:delete',
        'users:admin',
        'organizations:read',
        'organizations:write',
        'organizations:delete',
        'organizations:admin',
        'projects:read',
        'projects:write',
        'projects:delete',
        'projects:admin',
        'billing:read',
        'billing:write',
        'audit:read',
        'settings:read',
        'settings:write',
        'webhooks:read',
        'webhooks:write',
        'webhooks:delete',
        'api_keys:read',
        'api_keys:write',
        'api_keys:delete',
        'integrations:read',
        'integrations:write',
        'integrations:delete',
      ],
    },
  ],
})

export const getMixedLevelSecurityRoute = createRoute({
  method: 'get',
  path: '/mixed-level-security',
  summary: 'Path level + operation level security',
  operationId: 'getMixedSecurity',
  responses: { 200: { description: 'OK' } },
  security: [{ bearerAuth: [] }],
})

export const putMixedLevelSecurityRoute = createRoute({
  method: 'put',
  path: '/mixed-level-security',
  summary: 'Admin-only security',
  operationId: 'putMixedSecurity',
  responses: { 200: { description: 'OK' } },
  security: [{ oauth2AuthCode: ['admin', 'write'] }],
})

export const postMixedLevelSecurityRoute = createRoute({
  method: 'post',
  path: '/mixed-level-security',
  summary: 'Different security for POST',
  operationId: 'postMixedSecurity',
  responses: { 201: { description: 'Created' } },
  security: [{ bearerAuth: [], apiKeyHeader: [] }],
})

export const deleteMixedLevelSecurityRoute = createRoute({
  method: 'delete',
  path: '/mixed-level-security',
  summary: 'Super admin security',
  operationId: 'deleteMixedSecurity',
  responses: { 204: { description: 'Deleted' } },
  security: [{ oauth2AuthCode: ['superadmin'], mfaToken: [] }],
})

export const getOverrideGlobalRoute = createRoute({
  method: 'get',
  path: '/override-global',
  summary: 'Override global security with public',
  operationId: 'getOverrideGlobal',
  responses: { 200: { description: 'OK' } },
  security: [],
})

export const getOptionalEnhancedRoute = createRoute({
  method: 'get',
  path: '/optional-enhanced',
  summary: 'Optional auth with enhanced access if authenticated',
  operationId: 'getOptionalEnhanced',
  responses: { 200: { description: 'OK - Different response based on auth' } },
  security: [{}, { bearerAuth: [] }, { oauth2AuthCode: ['read'] }],
})

export const getMultiTenantRoute = createRoute({
  method: 'get',
  path: '/multi-tenant',
  summary: 'Multi-tenant with org-level auth',
  operationId: 'getMultiTenant',
  responses: { 200: { description: 'OK' } },
  security: [
    { bearerAuth: [], tenantHeader: [] },
    { oauth2AuthCode: ['tenant:read'], tenantHeader: [] },
  ],
})
