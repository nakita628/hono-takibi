import { createRoute, z } from '@hono/zod-openapi'

const AuthorizationCodeTokenRequestSchema = z
  .object({
    grant_type: z
      .literal('authorization_code')
      .openapi({ type: 'string', enum: ['authorization_code'] }),
    code: z.string().openapi({ type: 'string', description: '認可コード' }),
    redirect_uri: z.url().openapi({ type: 'string', format: 'uri' }),
    client_id: z.string().openapi({ type: 'string' }),
    client_secret: z.string().optional().openapi({ type: 'string' }),
    code_verifier: z
      .string()
      .optional()
      .openapi({ type: 'string', description: 'PKCE用コードベリファイア' }),
  })
  .openapi({
    type: 'object',
    required: ['grant_type', 'code', 'redirect_uri', 'client_id'],
    properties: {
      grant_type: { type: 'string', enum: ['authorization_code'] },
      code: { type: 'string', description: '認可コード' },
      redirect_uri: { type: 'string', format: 'uri' },
      client_id: { type: 'string' },
      client_secret: { type: 'string' },
      code_verifier: { type: 'string', description: 'PKCE用コードベリファイア' },
    },
  })
  .openapi('AuthorizationCodeTokenRequest')

const ClientCredentialsTokenRequestSchema = z
  .object({
    grant_type: z
      .literal('client_credentials')
      .openapi({ type: 'string', enum: ['client_credentials'] }),
    client_id: z.string().openapi({ type: 'string' }),
    client_secret: z.string().openapi({ type: 'string' }),
    scope: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['grant_type', 'client_id', 'client_secret'],
    properties: {
      grant_type: { type: 'string', enum: ['client_credentials'] },
      client_id: { type: 'string' },
      client_secret: { type: 'string' },
      scope: { type: 'string' },
    },
  })
  .openapi('ClientCredentialsTokenRequest')

const RefreshTokenRequestSchema = z
  .object({
    grant_type: z.literal('refresh_token').openapi({ type: 'string', enum: ['refresh_token'] }),
    refresh_token: z.string().openapi({ type: 'string' }),
    client_id: z.string().optional().openapi({ type: 'string' }),
    client_secret: z.string().optional().openapi({ type: 'string' }),
    scope: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['grant_type', 'refresh_token'],
    properties: {
      grant_type: { type: 'string', enum: ['refresh_token'] },
      refresh_token: { type: 'string' },
      client_id: { type: 'string' },
      client_secret: { type: 'string' },
      scope: { type: 'string' },
    },
  })
  .openapi('RefreshTokenRequest')

const DeviceCodeTokenRequestSchema = z
  .object({
    grant_type: z
      .literal('urn:ietf:params:oauth:grant-type:device_code')
      .openapi({ type: 'string', enum: ['urn:ietf:params:oauth:grant-type:device_code'] }),
    device_code: z.string().openapi({ type: 'string' }),
    client_id: z.string().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['grant_type', 'device_code', 'client_id'],
    properties: {
      grant_type: { type: 'string', enum: ['urn:ietf:params:oauth:grant-type:device_code'] },
      device_code: { type: 'string' },
      client_id: { type: 'string' },
    },
  })
  .openapi('DeviceCodeTokenRequest')

const PasswordTokenRequestSchema = z
  .object({
    grant_type: z.literal('password').openapi({ type: 'string', enum: ['password'] }),
    username: z.string().openapi({ type: 'string' }),
    password: z.string().openapi({ type: 'string' }),
    client_id: z.string().optional().openapi({ type: 'string' }),
    client_secret: z.string().optional().openapi({ type: 'string' }),
    scope: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['grant_type', 'username', 'password'],
    properties: {
      grant_type: { type: 'string', enum: ['password'] },
      username: { type: 'string' },
      password: { type: 'string' },
      client_id: { type: 'string' },
      client_secret: { type: 'string' },
      scope: { type: 'string' },
    },
  })
  .openapi('PasswordTokenRequest')

const TokenResponseSchema = z
  .object({
    access_token: z.string().openapi({ type: 'string' }),
    token_type: z.literal('Bearer').openapi({ type: 'string', enum: ['Bearer'] }),
    expires_in: z.int().optional().openapi({ type: 'integer', description: '有効期限（秒）' }),
    refresh_token: z.string().optional().openapi({ type: 'string' }),
    scope: z.string().optional().openapi({ type: 'string' }),
    id_token: z
      .string()
      .optional()
      .openapi({ type: 'string', description: 'OpenID Connect ID Token' }),
  })
  .openapi({
    type: 'object',
    required: ['access_token', 'token_type'],
    properties: {
      access_token: { type: 'string' },
      token_type: { type: 'string', enum: ['Bearer'] },
      expires_in: { type: 'integer', description: '有効期限（秒）' },
      refresh_token: { type: 'string' },
      scope: { type: 'string' },
      id_token: { type: 'string', description: 'OpenID Connect ID Token' },
    },
  })
  .openapi('TokenResponse')

const OAuthErrorSchema = z
  .object({
    error: z
      .enum([
        'invalid_request',
        'invalid_client',
        'invalid_grant',
        'unauthorized_client',
        'unsupported_grant_type',
        'invalid_scope',
        'access_denied',
        'expired_token',
        'authorization_pending',
        'slow_down',
      ])
      .openapi({
        type: 'string',
        enum: [
          'invalid_request',
          'invalid_client',
          'invalid_grant',
          'unauthorized_client',
          'unsupported_grant_type',
          'invalid_scope',
          'access_denied',
          'expired_token',
          'authorization_pending',
          'slow_down',
        ],
      }),
    error_description: z.string().optional().openapi({ type: 'string' }),
    error_uri: z.url().optional().openapi({ type: 'string', format: 'uri' }),
  })
  .openapi({
    type: 'object',
    required: ['error'],
    properties: {
      error: {
        type: 'string',
        enum: [
          'invalid_request',
          'invalid_client',
          'invalid_grant',
          'unauthorized_client',
          'unsupported_grant_type',
          'invalid_scope',
          'access_denied',
          'expired_token',
          'authorization_pending',
          'slow_down',
        ],
      },
      error_description: { type: 'string' },
      error_uri: { type: 'string', format: 'uri' },
    },
  })
  .openapi('OAuthError')

const IntrospectionResponseSchema = z
  .object({
    active: z.boolean().openapi({ type: 'boolean' }),
    scope: z.string().optional().openapi({ type: 'string' }),
    client_id: z.string().optional().openapi({ type: 'string' }),
    username: z.string().optional().openapi({ type: 'string' }),
    token_type: z.string().optional().openapi({ type: 'string' }),
    exp: z.int().optional().openapi({ type: 'integer', description: '有効期限（Unix timestamp）' }),
    iat: z.int().optional().openapi({ type: 'integer', description: '発行日時（Unix timestamp）' }),
    nbf: z.int().optional().openapi({ type: 'integer' }),
    sub: z.string().optional().openapi({ type: 'string', description: 'Subject（ユーザーID）' }),
    aud: z.string().optional().openapi({ type: 'string', description: 'Audience' }),
    iss: z.string().optional().openapi({ type: 'string', description: 'Issuer' }),
    jti: z.string().optional().openapi({ type: 'string', description: 'JWT ID' }),
  })
  .openapi({
    type: 'object',
    required: ['active'],
    properties: {
      active: { type: 'boolean' },
      scope: { type: 'string' },
      client_id: { type: 'string' },
      username: { type: 'string' },
      token_type: { type: 'string' },
      exp: { type: 'integer', description: '有効期限（Unix timestamp）' },
      iat: { type: 'integer', description: '発行日時（Unix timestamp）' },
      nbf: { type: 'integer' },
      sub: { type: 'string', description: 'Subject（ユーザーID）' },
      aud: { type: 'string', description: 'Audience' },
      iss: { type: 'string', description: 'Issuer' },
      jti: { type: 'string', description: 'JWT ID' },
    },
  })
  .openapi('IntrospectionResponse')

const DeviceAuthorizationResponseSchema = z
  .object({
    device_code: z.string().openapi({ type: 'string' }),
    user_code: z.string().openapi({ type: 'string', description: 'ユーザーが入力するコード' }),
    verification_uri: z
      .url()
      .openapi({ type: 'string', format: 'uri', description: 'ユーザーがアクセスするURL' }),
    verification_uri_complete: z
      .url()
      .optional()
      .openapi({ type: 'string', format: 'uri', description: 'user_codeを含む完全なURL' }),
    expires_in: z.int().openapi({ type: 'integer', description: '有効期限（秒）' }),
    interval: z
      .int()
      .default(5)
      .optional()
      .openapi({ type: 'integer', default: 5, description: 'ポーリング間隔（秒）' }),
  })
  .openapi({
    type: 'object',
    required: ['device_code', 'user_code', 'verification_uri', 'expires_in'],
    properties: {
      device_code: { type: 'string' },
      user_code: { type: 'string', description: 'ユーザーが入力するコード' },
      verification_uri: { type: 'string', format: 'uri', description: 'ユーザーがアクセスするURL' },
      verification_uri_complete: {
        type: 'string',
        format: 'uri',
        description: 'user_codeを含む完全なURL',
      },
      expires_in: { type: 'integer', description: '有効期限（秒）' },
      interval: { type: 'integer', default: 5, description: 'ポーリング間隔（秒）' },
    },
  })
  .openapi('DeviceAuthorizationResponse')

const UserInfoSchema = z
  .object({
    sub: z.string().openapi({ type: 'string', description: 'Subject（ユーザーID）' }),
    name: z.string().optional().openapi({ type: 'string' }),
    given_name: z.string().optional().openapi({ type: 'string' }),
    family_name: z.string().optional().openapi({ type: 'string' }),
    middle_name: z.string().optional().openapi({ type: 'string' }),
    nickname: z.string().optional().openapi({ type: 'string' }),
    preferred_username: z.string().optional().openapi({ type: 'string' }),
    profile: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    picture: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    website: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    email: z.email().optional().openapi({ type: 'string', format: 'email' }),
    email_verified: z.boolean().optional().openapi({ type: 'boolean' }),
    gender: z.string().optional().openapi({ type: 'string' }),
    birthdate: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
    zoneinfo: z.string().optional().openapi({ type: 'string' }),
    locale: z.string().optional().openapi({ type: 'string' }),
    phone_number: z.string().optional().openapi({ type: 'string' }),
    phone_number_verified: z.boolean().optional().openapi({ type: 'boolean' }),
    address: z
      .object({
        formatted: z.string().openapi({ type: 'string' }),
        street_address: z.string().openapi({ type: 'string' }),
        locality: z.string().openapi({ type: 'string' }),
        region: z.string().openapi({ type: 'string' }),
        postal_code: z.string().openapi({ type: 'string' }),
        country: z.string().openapi({ type: 'string' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          formatted: { type: 'string' },
          street_address: { type: 'string' },
          locality: { type: 'string' },
          region: { type: 'string' },
          postal_code: { type: 'string' },
          country: { type: 'string' },
        },
      }),
    updated_at: z.int().optional().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['sub'],
    properties: {
      sub: { type: 'string', description: 'Subject（ユーザーID）' },
      name: { type: 'string' },
      given_name: { type: 'string' },
      family_name: { type: 'string' },
      middle_name: { type: 'string' },
      nickname: { type: 'string' },
      preferred_username: { type: 'string' },
      profile: { type: 'string', format: 'uri' },
      picture: { type: 'string', format: 'uri' },
      website: { type: 'string', format: 'uri' },
      email: { type: 'string', format: 'email' },
      email_verified: { type: 'boolean' },
      gender: { type: 'string' },
      birthdate: { type: 'string', format: 'date' },
      zoneinfo: { type: 'string' },
      locale: { type: 'string' },
      phone_number: { type: 'string' },
      phone_number_verified: { type: 'boolean' },
      address: {
        type: 'object',
        properties: {
          formatted: { type: 'string' },
          street_address: { type: 'string' },
          locality: { type: 'string' },
          region: { type: 'string' },
          postal_code: { type: 'string' },
          country: { type: 'string' },
        },
      },
      updated_at: { type: 'integer' },
    },
  })
  .openapi('UserInfo')

const OpenIDConfigurationSchema = z
  .object({
    issuer: z.url().openapi({ type: 'string', format: 'uri' }),
    authorization_endpoint: z.url().openapi({ type: 'string', format: 'uri' }),
    token_endpoint: z.url().openapi({ type: 'string', format: 'uri' }),
    userinfo_endpoint: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    jwks_uri: z.url().openapi({ type: 'string', format: 'uri' }),
    registration_endpoint: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    scopes_supported: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    response_types_supported: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    response_modes_supported: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    grant_types_supported: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    subject_types_supported: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    id_token_signing_alg_values_supported: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    token_endpoint_auth_methods_supported: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    claims_supported: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    code_challenge_methods_supported: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    introspection_endpoint: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    revocation_endpoint: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    device_authorization_endpoint: z.url().optional().openapi({ type: 'string', format: 'uri' }),
  })
  .openapi({
    type: 'object',
    required: [
      'issuer',
      'authorization_endpoint',
      'token_endpoint',
      'jwks_uri',
      'response_types_supported',
      'subject_types_supported',
      'id_token_signing_alg_values_supported',
    ],
    properties: {
      issuer: { type: 'string', format: 'uri' },
      authorization_endpoint: { type: 'string', format: 'uri' },
      token_endpoint: { type: 'string', format: 'uri' },
      userinfo_endpoint: { type: 'string', format: 'uri' },
      jwks_uri: { type: 'string', format: 'uri' },
      registration_endpoint: { type: 'string', format: 'uri' },
      scopes_supported: { type: 'array', items: { type: 'string' } },
      response_types_supported: { type: 'array', items: { type: 'string' } },
      response_modes_supported: { type: 'array', items: { type: 'string' } },
      grant_types_supported: { type: 'array', items: { type: 'string' } },
      subject_types_supported: { type: 'array', items: { type: 'string' } },
      id_token_signing_alg_values_supported: { type: 'array', items: { type: 'string' } },
      token_endpoint_auth_methods_supported: { type: 'array', items: { type: 'string' } },
      claims_supported: { type: 'array', items: { type: 'string' } },
      code_challenge_methods_supported: { type: 'array', items: { type: 'string' } },
      introspection_endpoint: { type: 'string', format: 'uri' },
      revocation_endpoint: { type: 'string', format: 'uri' },
      device_authorization_endpoint: { type: 'string', format: 'uri' },
    },
  })
  .openapi('OpenIDConfiguration')

const JWKSchema = z
  .object({
    kty: z
      .enum(['RSA', 'EC'])
      .openapi({ type: 'string', description: 'Key Type', enum: ['RSA', 'EC'] }),
    kid: z.string().openapi({ type: 'string', description: 'Key ID' }),
    use: z
      .enum(['sig', 'enc'])
      .openapi({ type: 'string', description: 'Public Key Use', enum: ['sig', 'enc'] }),
    alg: z.string().optional().openapi({ type: 'string', description: 'Algorithm' }),
    n: z.string().optional().openapi({ type: 'string', description: 'RSA Modulus' }),
    e: z.string().optional().openapi({ type: 'string', description: 'RSA Exponent' }),
    x: z.string().optional().openapi({ type: 'string', description: 'EC X Coordinate' }),
    y: z.string().optional().openapi({ type: 'string', description: 'EC Y Coordinate' }),
    crv: z.string().optional().openapi({ type: 'string', description: 'EC Curve' }),
  })
  .openapi({
    type: 'object',
    required: ['kty', 'kid', 'use'],
    properties: {
      kty: { type: 'string', description: 'Key Type', enum: ['RSA', 'EC'] },
      kid: { type: 'string', description: 'Key ID' },
      use: { type: 'string', description: 'Public Key Use', enum: ['sig', 'enc'] },
      alg: { type: 'string', description: 'Algorithm' },
      n: { type: 'string', description: 'RSA Modulus' },
      e: { type: 'string', description: 'RSA Exponent' },
      x: { type: 'string', description: 'EC X Coordinate' },
      y: { type: 'string', description: 'EC Y Coordinate' },
      crv: { type: 'string', description: 'EC Curve' },
    },
  })
  .openapi('JWK')

const JWKSSchema = z
  .object({
    keys: z
      .array(JWKSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/JWK' } }),
  })
  .openapi({
    type: 'object',
    required: ['keys'],
    properties: { keys: { type: 'array', items: { $ref: '#/components/schemas/JWK' } } },
  })
  .openapi('JWKS')

const OAuthClientSchema = z
  .object({
    clientId: z.string().openapi({ type: 'string' }),
    clientName: z.string().openapi({ type: 'string' }),
    clientType: z
      .enum(['public', 'confidential'])
      .openapi({ type: 'string', enum: ['public', 'confidential'] }),
    redirectUris: z
      .array(z.url().optional().openapi({ type: 'string', format: 'uri' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string', format: 'uri' } }),
    grantTypes: z
      .array(
        z
          .enum([
            'authorization_code',
            'client_credentials',
            'refresh_token',
            'password',
            'urn:ietf:params:oauth:grant-type:device_code',
          ])
          .optional()
          .openapi({
            type: 'string',
            enum: [
              'authorization_code',
              'client_credentials',
              'refresh_token',
              'password',
              'urn:ietf:params:oauth:grant-type:device_code',
            ],
          }),
      )
      .optional()
      .openapi({
        type: 'array',
        items: {
          type: 'string',
          enum: [
            'authorization_code',
            'client_credentials',
            'refresh_token',
            'password',
            'urn:ietf:params:oauth:grant-type:device_code',
          ],
        },
      }),
    responseTypes: z
      .array(
        z
          .enum(['code', 'token'])
          .optional()
          .openapi({ type: 'string', enum: ['code', 'token'] }),
      )
      .optional()
      .openapi({ type: 'array', items: { type: 'string', enum: ['code', 'token'] } }),
    scope: z.string().optional().openapi({ type: 'string' }),
    logoUri: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    clientUri: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    policyUri: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    tosUri: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    contacts: z
      .array(z.email().optional().openapi({ type: 'string', format: 'email' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string', format: 'email' } }),
    tokenEndpointAuthMethod: z
      .enum(['client_secret_basic', 'client_secret_post', 'none'])
      .optional()
      .openapi({ type: 'string', enum: ['client_secret_basic', 'client_secret_post', 'none'] }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['clientId', 'clientName', 'clientType', 'createdAt'],
    properties: {
      clientId: { type: 'string' },
      clientName: { type: 'string' },
      clientType: { type: 'string', enum: ['public', 'confidential'] },
      redirectUris: { type: 'array', items: { type: 'string', format: 'uri' } },
      grantTypes: {
        type: 'array',
        items: {
          type: 'string',
          enum: [
            'authorization_code',
            'client_credentials',
            'refresh_token',
            'password',
            'urn:ietf:params:oauth:grant-type:device_code',
          ],
        },
      },
      responseTypes: { type: 'array', items: { type: 'string', enum: ['code', 'token'] } },
      scope: { type: 'string' },
      logoUri: { type: 'string', format: 'uri' },
      clientUri: { type: 'string', format: 'uri' },
      policyUri: { type: 'string', format: 'uri' },
      tosUri: { type: 'string', format: 'uri' },
      contacts: { type: 'array', items: { type: 'string', format: 'email' } },
      tokenEndpointAuthMethod: {
        type: 'string',
        enum: ['client_secret_basic', 'client_secret_post', 'none'],
      },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('OAuthClient')

const OAuthClientWithSecretSchema = z
  .intersection(
    OAuthClientSchema,
    z
      .object({
        clientSecret: z
          .string()
          .openapi({ type: 'string', description: 'クライアントシークレット（作成時のみ返却）' }),
      })
      .openapi({
        type: 'object',
        required: ['clientSecret'],
        properties: {
          clientSecret: {
            type: 'string',
            description: 'クライアントシークレット（作成時のみ返却）',
          },
        },
      }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/OAuthClient' },
      {
        type: 'object',
        required: ['clientSecret'],
        properties: {
          clientSecret: {
            type: 'string',
            description: 'クライアントシークレット（作成時のみ返却）',
          },
        },
      },
    ],
  })
  .openapi('OAuthClientWithSecret')

const CreateClientRequestSchema = z
  .object({
    clientName: z
      .string()
      .min(1)
      .max(200)
      .openapi({ type: 'string', minLength: 1, maxLength: 200 }),
    clientType: z
      .enum(['public', 'confidential'])
      .default('confidential')
      .optional()
      .openapi({ type: 'string', enum: ['public', 'confidential'], default: 'confidential' }),
    redirectUris: z
      .array(z.url().openapi({ type: 'string', format: 'uri' }))
      .min(1)
      .optional()
      .openapi({ type: 'array', minItems: 1, items: { type: 'string', format: 'uri' } }),
    grantTypes: z
      .array(
        z
          .enum([
            'authorization_code',
            'client_credentials',
            'refresh_token',
            'password',
            'urn:ietf:params:oauth:grant-type:device_code',
          ])
          .optional()
          .openapi({
            type: 'string',
            enum: [
              'authorization_code',
              'client_credentials',
              'refresh_token',
              'password',
              'urn:ietf:params:oauth:grant-type:device_code',
            ],
          }),
      )
      .optional()
      .openapi({
        type: 'array',
        items: {
          type: 'string',
          enum: [
            'authorization_code',
            'client_credentials',
            'refresh_token',
            'password',
            'urn:ietf:params:oauth:grant-type:device_code',
          ],
        },
      }),
    responseTypes: z
      .array(
        z
          .enum(['code', 'token'])
          .optional()
          .openapi({ type: 'string', enum: ['code', 'token'] }),
      )
      .optional()
      .openapi({ type: 'array', items: { type: 'string', enum: ['code', 'token'] } }),
    scope: z.string().optional().openapi({ type: 'string' }),
    logoUri: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    clientUri: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    policyUri: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    tosUri: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    contacts: z
      .array(z.email().optional().openapi({ type: 'string', format: 'email' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string', format: 'email' } }),
    tokenEndpointAuthMethod: z
      .enum(['client_secret_basic', 'client_secret_post', 'none'])
      .optional()
      .openapi({ type: 'string', enum: ['client_secret_basic', 'client_secret_post', 'none'] }),
  })
  .openapi({
    type: 'object',
    required: ['clientName', 'redirectUris'],
    properties: {
      clientName: { type: 'string', minLength: 1, maxLength: 200 },
      clientType: { type: 'string', enum: ['public', 'confidential'], default: 'confidential' },
      redirectUris: { type: 'array', minItems: 1, items: { type: 'string', format: 'uri' } },
      grantTypes: {
        type: 'array',
        items: {
          type: 'string',
          enum: [
            'authorization_code',
            'client_credentials',
            'refresh_token',
            'password',
            'urn:ietf:params:oauth:grant-type:device_code',
          ],
        },
      },
      responseTypes: { type: 'array', items: { type: 'string', enum: ['code', 'token'] } },
      scope: { type: 'string' },
      logoUri: { type: 'string', format: 'uri' },
      clientUri: { type: 'string', format: 'uri' },
      policyUri: { type: 'string', format: 'uri' },
      tosUri: { type: 'string', format: 'uri' },
      contacts: { type: 'array', items: { type: 'string', format: 'email' } },
      tokenEndpointAuthMethod: {
        type: 'string',
        enum: ['client_secret_basic', 'client_secret_post', 'none'],
      },
    },
  })
  .openapi('CreateClientRequest')

const UpdateClientRequestSchema = z
  .object({
    clientName: z
      .string()
      .min(1)
      .max(200)
      .openapi({ type: 'string', minLength: 1, maxLength: 200 }),
    redirectUris: z
      .array(z.url().openapi({ type: 'string', format: 'uri' }))
      .min(1)
      .optional()
      .openapi({ type: 'array', minItems: 1, items: { type: 'string', format: 'uri' } }),
    grantTypes: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    responseTypes: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    scope: z.string().openapi({ type: 'string' }),
    logoUri: z.url().openapi({ type: 'string', format: 'uri' }),
    clientUri: z.url().openapi({ type: 'string', format: 'uri' }),
    policyUri: z.url().openapi({ type: 'string', format: 'uri' }),
    tosUri: z.url().openapi({ type: 'string', format: 'uri' }),
    contacts: z
      .array(z.email().openapi({ type: 'string', format: 'email' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string', format: 'email' } }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      clientName: { type: 'string', minLength: 1, maxLength: 200 },
      redirectUris: { type: 'array', minItems: 1, items: { type: 'string', format: 'uri' } },
      grantTypes: { type: 'array', items: { type: 'string' } },
      responseTypes: { type: 'array', items: { type: 'string' } },
      scope: { type: 'string' },
      logoUri: { type: 'string', format: 'uri' },
      clientUri: { type: 'string', format: 'uri' },
      policyUri: { type: 'string', format: 'uri' },
      tosUri: { type: 'string', format: 'uri' },
      contacts: { type: 'array', items: { type: 'string', format: 'email' } },
    },
  })
  .openapi('UpdateClientRequest')

const ConsentSchema = z
  .object({
    clientId: z.string().openapi({ type: 'string' }),
    clientName: z.string().openapi({ type: 'string' }),
    clientLogoUri: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    scope: z.string().openapi({ type: 'string' }),
    grantedAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    lastUsedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['clientId', 'clientName', 'scope', 'grantedAt'],
    properties: {
      clientId: { type: 'string' },
      clientName: { type: 'string' },
      clientLogoUri: { type: 'string', format: 'uri' },
      scope: { type: 'string' },
      grantedAt: { type: 'string', format: 'date-time' },
      lastUsedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Consent')

const ErrorSchema = z
  .object({
    code: z.string().openapi({ type: 'string' }),
    message: z.string().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['code', 'message'],
    properties: { code: { type: 'string' }, message: { type: 'string' } },
  })
  .openapi('Error')

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const BasicAuthSecurityScheme = { type: 'http', scheme: 'basic' }

const BadRequestResponse = {
  description: 'リクエストが不正です',
  content: { 'application/json': { schema: ErrorSchema } },
}

const UnauthorizedResponse = {
  description: '認証が必要です',
  content: { 'application/json': { schema: ErrorSchema } },
}

const NotFoundResponse = {
  description: 'リソースが見つかりません',
  content: { 'application/json': { schema: ErrorSchema } },
}

export const getOauthAuthorizeRoute = createRoute({
  method: 'get',
  path: '/oauth/authorize',
  tags: ['OAuth'],
  summary: '認可エンドポイント',
  description:
    'Authorization Code フローの認可リクエスト。 ユーザーをログイン画面にリダイレクトし、認可後にコールバックURLへリダイレクトします。',
  operationId: 'authorize',
  request: {
    query: z.object({
      response_type: z
        .enum(['code', 'token'])
        .openapi({
          param: {
            name: 'response_type',
            in: 'query',
            required: true,
            description: 'レスポンスタイプ',
            schema: { type: 'string', enum: ['code', 'token'] },
          },
          type: 'string',
          enum: ['code', 'token'],
        }),
      client_id: z
        .string()
        .openapi({
          param: {
            name: 'client_id',
            in: 'query',
            required: true,
            description: 'クライアントID',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      redirect_uri: z
        .url()
        .openapi({
          param: {
            name: 'redirect_uri',
            in: 'query',
            required: true,
            description: 'コールバックURL',
            schema: { type: 'string', format: 'uri' },
          },
          type: 'string',
          format: 'uri',
        }),
      scope: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'scope',
            in: 'query',
            description: '要求するスコープ（スペース区切り）',
            schema: { type: 'string' },
            example: 'openid profile email',
          },
          type: 'string',
        }),
      state: z
        .string()
        .openapi({
          param: {
            name: 'state',
            in: 'query',
            required: true,
            description: 'CSRF対策用のランダム文字列',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      code_challenge: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'code_challenge',
            in: 'query',
            description: 'PKCE用コードチャレンジ',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      code_challenge_method: z
        .enum(['plain', 'S256'])
        .default('S256')
        .optional()
        .openapi({
          param: {
            name: 'code_challenge_method',
            in: 'query',
            description: 'コードチャレンジの生成方法',
            schema: { type: 'string', enum: ['plain', 'S256'], default: 'S256' },
          },
          type: 'string',
          enum: ['plain', 'S256'],
          default: 'S256',
        }),
      nonce: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'nonce',
            in: 'query',
            description: 'OpenID Connect用のnonce',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      prompt: z
        .enum(['none', 'login', 'consent', 'select_account'])
        .optional()
        .openapi({
          param: {
            name: 'prompt',
            in: 'query',
            description: '認証プロンプトの制御',
            schema: { type: 'string', enum: ['none', 'login', 'consent', 'select_account'] },
          },
          type: 'string',
          enum: ['none', 'login', 'consent', 'select_account'],
        }),
      login_hint: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'login_hint',
            in: 'query',
            description: 'ログインヒント（メールアドレス等）',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      ui_locales: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'ui_locales',
            in: 'query',
            description: 'UI言語設定',
            schema: { type: 'string' },
            example: 'ja',
          },
          type: 'string',
        }),
    }),
  },
  responses: {
    302: { description: 'ログイン画面またはコールバックURLへリダイレクト' },
    400: {
      description: '不正なリクエスト',
      content: { 'application/json': { schema: OAuthErrorSchema } },
    },
  },
})

export const postOauthTokenRoute = createRoute({
  method: 'post',
  path: '/oauth/token',
  tags: ['OAuth'],
  summary: 'トークンエンドポイント',
  description:
    'アクセストークンを発行します。 Authorization Code、Client Credentials、Refresh Token、Device Code の各フローに対応。',
  operationId: 'token',
  request: {
    body: {
      content: {
        'application/x-www-form-urlencoded': {
          schema: z
            .union([
              AuthorizationCodeTokenRequestSchema,
              ClientCredentialsTokenRequestSchema,
              RefreshTokenRequestSchema,
              DeviceCodeTokenRequestSchema,
              PasswordTokenRequestSchema,
            ])
            .optional()
            .openapi({
              oneOf: [
                { $ref: '#/components/schemas/AuthorizationCodeTokenRequest' },
                { $ref: '#/components/schemas/ClientCredentialsTokenRequest' },
                { $ref: '#/components/schemas/RefreshTokenRequest' },
                { $ref: '#/components/schemas/DeviceCodeTokenRequest' },
                { $ref: '#/components/schemas/PasswordTokenRequest' },
              ],
            }),
          examples: {
            authorization_code: {
              summary: 'Authorization Code フロー',
              value: {
                grant_type: 'authorization_code',
                code: 'SplxlOBeZQQYbYS6WxSbIA',
                redirect_uri: 'https://client.example.com/callback',
                client_id: 's6BhdRkqt3',
                code_verifier: 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk',
              },
            },
            client_credentials: {
              summary: 'Client Credentials フロー',
              value: {
                grant_type: 'client_credentials',
                client_id: 's6BhdRkqt3',
                client_secret: '7Fjfp0ZBr1KtDRbnfVdmIw',
                scope: 'read write',
              },
            },
            refresh_token: {
              summary: 'Refresh Token フロー',
              value: {
                grant_type: 'refresh_token',
                refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
                client_id: 's6BhdRkqt3',
              },
            },
          },
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'トークン発行成功',
      content: { 'application/json': { schema: TokenResponseSchema } },
    },
    400: {
      description: '不正なリクエスト',
      content: { 'application/json': { schema: OAuthErrorSchema } },
    },
    401: {
      description: 'クライアント認証失敗',
      content: { 'application/json': { schema: OAuthErrorSchema } },
    },
  },
})

export const postOauthRevokeRoute = createRoute({
  method: 'post',
  path: '/oauth/revoke',
  tags: ['Token Management'],
  summary: 'トークン無効化',
  description: 'アクセストークンまたはリフレッシュトークンを無効化します（RFC 7009）',
  operationId: 'revokeToken',
  request: {
    body: {
      content: {
        'application/x-www-form-urlencoded': {
          schema: z
            .object({
              token: z.string().openapi({ type: 'string', description: '無効化するトークン' }),
              token_type_hint: z
                .enum(['access_token', 'refresh_token'])
                .optional()
                .openapi({
                  type: 'string',
                  enum: ['access_token', 'refresh_token'],
                  description: 'トークンタイプのヒント',
                }),
              client_id: z.string().optional().openapi({ type: 'string' }),
              client_secret: z.string().optional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              required: ['token'],
              properties: {
                token: { type: 'string', description: '無効化するトークン' },
                token_type_hint: {
                  type: 'string',
                  enum: ['access_token', 'refresh_token'],
                  description: 'トークンタイプのヒント',
                },
                client_id: { type: 'string' },
                client_secret: { type: 'string' },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: '無効化成功（トークンが存在しない場合も成功）' },
    400: {
      description: '不正なリクエスト',
      content: { 'application/json': { schema: OAuthErrorSchema } },
    },
  },
})

export const postOauthIntrospectRoute = createRoute({
  method: 'post',
  path: '/oauth/introspect',
  tags: ['Token Management'],
  summary: 'トークン情報取得',
  description: 'トークンの有効性と情報を取得します（RFC 7662）',
  operationId: 'introspectToken',
  request: {
    body: {
      content: {
        'application/x-www-form-urlencoded': {
          schema: z
            .object({
              token: z.string().openapi({ type: 'string' }),
              token_type_hint: z
                .enum(['access_token', 'refresh_token'])
                .optional()
                .openapi({ type: 'string', enum: ['access_token', 'refresh_token'] }),
            })
            .openapi({
              type: 'object',
              required: ['token'],
              properties: {
                token: { type: 'string' },
                token_type_hint: { type: 'string', enum: ['access_token', 'refresh_token'] },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'トークン情報',
      content: { 'application/json': { schema: IntrospectionResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ basicAuth: [] }],
})

export const postOauthDeviceCodeRoute = createRoute({
  method: 'post',
  path: '/oauth/device/code',
  tags: ['OAuth'],
  summary: 'デバイス認可リクエスト',
  description: 'デバイスフロー用の認可コードを発行します（RFC 8628）',
  operationId: 'deviceAuthorization',
  request: {
    body: {
      content: {
        'application/x-www-form-urlencoded': {
          schema: z
            .object({
              client_id: z.string().openapi({ type: 'string' }),
              scope: z.string().optional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              required: ['client_id'],
              properties: { client_id: { type: 'string' }, scope: { type: 'string' } },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'デバイス認可レスポンス',
      content: { 'application/json': { schema: DeviceAuthorizationResponseSchema } },
    },
    400: {
      description: '不正なリクエスト',
      content: { 'application/json': { schema: OAuthErrorSchema } },
    },
  },
})

export const getOauthUserinfoRoute = createRoute({
  method: 'get',
  path: '/oauth/userinfo',
  tags: ['OAuth'],
  summary: 'ユーザー情報取得',
  description: 'OpenID Connect UserInfo エンドポイント',
  operationId: 'getUserInfo',
  responses: {
    200: {
      description: 'ユーザー情報',
      content: { 'application/json': { schema: UserInfoSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getWellKnownOpenidConfigurationRoute = createRoute({
  method: 'get',
  path: '/.well-known/openid-configuration',
  tags: ['OAuth'],
  summary: 'OpenID Connect Discovery',
  description: 'OpenID Connect の設定情報を返します',
  operationId: 'getOpenIDConfiguration',
  responses: {
    200: {
      description: 'OpenID Connect 設定',
      content: { 'application/json': { schema: OpenIDConfigurationSchema } },
    },
  },
})

export const getWellKnownJwksJsonRoute = createRoute({
  method: 'get',
  path: '/.well-known/jwks.json',
  tags: ['OAuth'],
  summary: 'JSON Web Key Set',
  description: 'JWTの検証に使用する公開鍵セット',
  operationId: 'getJWKS',
  responses: {
    200: { description: 'JWKS', content: { 'application/json': { schema: JWKSSchema } } },
  },
})

export const getOauthClientsRoute = createRoute({
  method: 'get',
  path: '/oauth/clients',
  tags: ['Client Management'],
  summary: 'クライアント一覧取得',
  operationId: 'listClients',
  responses: {
    200: {
      description: 'クライアント一覧',
      content: {
        'application/json': {
          schema: z
            .array(OAuthClientSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/OAuthClient' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postOauthClientsRoute = createRoute({
  method: 'post',
  path: '/oauth/clients',
  tags: ['Client Management'],
  summary: 'クライアント作成',
  operationId: 'createClient',
  request: {
    body: {
      content: { 'application/json': { schema: CreateClientRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: '作成成功',
      content: { 'application/json': { schema: OAuthClientWithSecretSchema } },
    },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getOauthClientsClientIdRoute = createRoute({
  method: 'get',
  path: '/oauth/clients/{clientId}',
  tags: ['Client Management'],
  summary: 'クライアント詳細取得',
  operationId: 'getClient',
  request: {
    params: z.object({
      clientId: z
        .string()
        .openapi({
          param: { name: 'clientId', in: 'path', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: {
    200: {
      description: 'クライアント詳細',
      content: { 'application/json': { schema: OAuthClientSchema } },
    },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putOauthClientsClientIdRoute = createRoute({
  method: 'put',
  path: '/oauth/clients/{clientId}',
  tags: ['Client Management'],
  summary: 'クライアント更新',
  operationId: 'updateClient',
  request: {
    body: {
      content: { 'application/json': { schema: UpdateClientRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: OAuthClientSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteOauthClientsClientIdRoute = createRoute({
  method: 'delete',
  path: '/oauth/clients/{clientId}',
  tags: ['Client Management'],
  summary: 'クライアント削除',
  operationId: 'deleteClient',
  request: {
    params: z.object({
      clientId: z
        .string()
        .openapi({
          param: { name: 'clientId', in: 'path', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const postOauthClientsClientIdSecretRoute = createRoute({
  method: 'post',
  path: '/oauth/clients/{clientId}/secret',
  tags: ['Client Management'],
  summary: 'クライアントシークレット再生成',
  operationId: 'rotateClientSecret',
  request: {
    params: z.object({
      clientId: z
        .string()
        .openapi({
          param: { name: 'clientId', in: 'path', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: {
    200: {
      description: '再生成成功',
      content: {
        'application/json': {
          schema: z
            .object({ clientSecret: z.string().openapi({ type: 'string' }) })
            .partial()
            .openapi({ type: 'object', properties: { clientSecret: { type: 'string' } } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getOauthConsentsRoute = createRoute({
  method: 'get',
  path: '/oauth/consents',
  tags: ['Consent'],
  summary: '同意一覧取得',
  description: 'ユーザーが許可したアプリケーション一覧',
  operationId: 'listConsents',
  responses: {
    200: {
      description: '同意一覧',
      content: {
        'application/json': {
          schema: z
            .array(ConsentSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Consent' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteOauthConsentsClientIdRoute = createRoute({
  method: 'delete',
  path: '/oauth/consents/{clientId}',
  tags: ['Consent'],
  summary: '同意取り消し',
  description: 'アプリケーションへのアクセス許可を取り消します',
  operationId: 'revokeConsent',
  request: {
    params: z.object({
      clientId: z
        .string()
        .openapi({
          param: { name: 'clientId', in: 'path', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: { 204: { description: '取り消し成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})
