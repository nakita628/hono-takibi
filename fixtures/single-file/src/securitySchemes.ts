export const OAuth2SecurityScheme = {
  type: 'oauth2',
  description: 'OAuth2 (authorizationCode) - scopes used by top-level security',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://auth.inferno.example/oauth/authorize',
      tokenUrl: 'https://auth.inferno.example/oauth/token',
      scopes: { 'inferno.read': 'read everything', 'inferno.write': 'write everything' },
    },
  },
}

export const ApiKeyAuthSecurityScheme = { type: 'apiKey', name: 'x-api-key', in: 'header' }

export const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
