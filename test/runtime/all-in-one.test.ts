// Verifies the fifteen `export*` flags (cases/all-in-one, specs/all-in-one.yaml): each flag
// exports one components section from routes.ts (a `*Types` flag adds the inferred type), the
// routes are built from those constants, and an app assembled from the routes validates requests
// and documents the components the way the spec declares them.
import { OpenAPIHono } from '@hono/zod-openapi'
import { describe, expect, it } from 'vite-plus/test'

import * as generated from '../__generated__/all-in-one/routes'
import type {
  Address,
  Category,
  HealthEventStreamMediaType,
  LegacyUserJsonMediaType,
  LimitParams,
  Role,
  SessionParams,
  User,
  UserFilter,
  UserIdParams,
  UserJsonMediaType,
  UserListJsonMediaType,
  VerboseParams,
  XRateLimitHeader,
  XRequestIdHeader,
} from '../__generated__/all-in-one/routes'
import {
  AliceExample,
  ApiKeyAuthSecurityScheme,
  BearerAuthSecurityScheme,
  CreateUserRequestBody,
  DefaultUserExample,
  GetUserByIdLink,
  HealthEventStreamMediaTypeSchema,
  HealthPathItem,
  LegacyUserJsonMediaTypeSchema,
  LimitParamsSchema,
  LimitTenExample,
  NewUserSchema,
  NotFoundResponse,
  Oauth2SecurityScheme,
  UnauthorizedResponse,
  UserCreatedCallback,
  UserFilterSchema,
  UserJsonMediaTypeSchema,
  UserListJsonMediaTypeSchema,
  UserResponse,
  UserSchema,
  ValidationFailedResponse,
  VerboseParamsSchema,
  XRateLimitHeaderSchema,
  XRequestIdHeaderSchema,
  getHealthEventsRoute,
  getHealthRoute,
  getUsersRoute,
  getUsersUserIdRoute,
  postUsersRoute,
  queryUsersSearchRoute,
} from '../__generated__/all-in-one/routes'
import type { Equal } from '../types/assert'
import { assertType } from '../types/assert'

const alice = { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', name: 'Alice', role: 'member' }

// The runtime constants each flag exports. `*Types` flags export types only and are asserted
// with `assertType` below.
const EXPORTS_BY_FLAG = {
  exportSchemas: [
    'AddressSchema',
    'CategorySchema',
    'ErrorSchema',
    'HealthEventSchema',
    'HealthSchema',
    'NewUserSchema',
    'RoleSchema',
    'UserFilterSchema',
    'UserIdSchema',
    'UserSchema',
  ],
  exportResponses: [
    'NotFoundResponse',
    'UnauthorizedResponse',
    'UserResponse',
    'ValidationFailedResponse',
  ],
  exportParameters: [
    'LimitParamsSchema',
    'RequestIdParamsSchema',
    'SessionParamsSchema',
    'UserIdParamsSchema',
    'VerboseParamsSchema',
  ],
  exportExamples: [
    'AliceExample',
    'DefaultUserExample',
    'LimitTenExample',
    'NewAliceExample',
    'NotFoundExample',
  ],
  exportRequestBodies: ['CreateUserRequestBody'],
  exportHeaders: ['XRateLimitHeaderSchema', 'XRequestIdHeaderSchema'],
  exportSecuritySchemes: [
    'ApiKeyAuthSecurityScheme',
    'BearerAuthSecurityScheme',
    'Oauth2SecurityScheme',
  ],
  exportLinks: ['GetUserByIdLink'],
  exportCallbacks: ['UserCreatedCallback'],
  exportPathItems: ['HealthPathItem'],
  exportMediaTypes: [
    'HealthEventStreamMediaTypeSchema',
    'LegacyUserJsonMediaTypeSchema',
    'UserJsonMediaTypeSchema',
    'UserListJsonMediaTypeSchema',
  ],
} as const

const ROUTES = [
  'getHealthEventsRoute',
  'getHealthRoute',
  'getUsersRoute',
  'getUsersUserIdRoute',
  'postUsersRoute',
  'queryUsersSearchRoute',
]

describe('export flags', () => {
  it('routes.ts exports exactly the routes plus every section the flags turn on', () => {
    expect(Object.keys(generated).sort()).toStrictEqual(
      [...ROUTES, ...Object.values(EXPORTS_BY_FLAG).flat()].sort(),
    )
  })

  describe('exportSchemas / exportSchemasTypes', () => {
    it('exports each schema as a Zod schema that validates the component', () => {
      expect(UserSchema.safeParse(alice).success).toBe(true)
      expect(UserSchema.safeParse({ ...alice, role: 'owner' }).success).toBe(false)
      expect(UserFilterSchema.safeParse({}).success).toBe(true)
    })

    it('exports the inferred type next to each schema', () => {
      assertType<Equal<Role, 'admin' | 'member'>>(true)
      assertType<Equal<Address, { city: string; zip?: string }>>(true)
      assertType<Equal<User, { id: string; name: string; role: Role; address?: Address }>>(true)
      assertType<Equal<UserFilter, { role?: Role; nameContains?: string }>>(true)
      // Self-referencing: the type comes from the explicit `CategoryType` annotation.
      assertType<Equal<Category, { name: string; children?: Category[] }>>(true)
    })
  })

  describe('exportParameters / exportParametersTypes', () => {
    it('exports each parameter as a schema that coerces the wire string', () => {
      expect(LimitParamsSchema.parse('5')).toBe(5)
      expect(LimitParamsSchema.safeParse('0').success).toBe(false)
      expect(VerboseParamsSchema.parse('true')).toBe(true)
    })

    it('exports the inferred type next to each parameter', () => {
      assertType<Equal<LimitParams, number>>(true)
      assertType<Equal<VerboseParams, boolean>>(true)
      assertType<Equal<SessionParams, string>>(true)
      assertType<Equal<UserIdParams, string>>(true)
    })
  })

  describe('exportExamples', () => {
    it('exports each example as-is, an aliased example as its target', () => {
      expect(AliceExample).toStrictEqual({ summary: 'A member user', value: alice })
      expect(DefaultUserExample).toBe(AliceExample)
      // OpenAPI 3.2 dataValue / serializedValue survive untouched.
      expect(LimitTenExample).toStrictEqual({
        summary: 'Ten per page (OpenAPI 3.2 dataValue / serializedValue)',
        dataValue: 10,
        serializedValue: 'limit=10',
      })
    })
  })

  describe('exportRequestBodies', () => {
    it('exports the request body the route binds', () => {
      expect(postUsersRoute.request.body).toBe(CreateUserRequestBody)
      expect(CreateUserRequestBody.content['application/json'].schema).toBe(NewUserSchema)
    })
  })

  describe('exportResponses', () => {
    it('exports the responses the routes bind, wired to headers, examples and links', () => {
      expect(getUsersUserIdRoute.responses).toStrictEqual({
        200: UserResponse,
        404: NotFoundResponse,
      })
      expect(postUsersRoute.responses).toStrictEqual({
        201: UserResponse,
        422: ValidationFailedResponse,
      })
      expect(getUsersRoute.responses[401]).toBe(UnauthorizedResponse)
      expect(UserResponse.headers.shape['X-Request-Id']).toBe(XRequestIdHeaderSchema)
      expect(UserResponse.content['application/json'].examples.alice).toBe(AliceExample)
      expect(UserResponse.links.self).toBe(GetUserByIdLink)
    })
  })

  describe('exportHeaders / exportHeadersTypes', () => {
    it('exports each header as a schema the responses bind', () => {
      expect(getUsersRoute.responses[200].headers.shape['X-Rate-Limit']).toBe(
        XRateLimitHeaderSchema,
      )
      expect(XRateLimitHeaderSchema.safeParse(3).success).toBe(true)
      expect(XRateLimitHeaderSchema.safeParse(-1).success).toBe(false)
    })

    it('exports the inferred type next to each header', () => {
      assertType<Equal<XRateLimitHeader, number>>(true)
      assertType<Equal<XRequestIdHeader, string>>(true)
    })
  })

  describe('exportSecuritySchemes', () => {
    it('exports each security scheme verbatim, OpenAPI 3.2 fields included', () => {
      expect(BearerAuthSecurityScheme).toStrictEqual({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      })
      expect(ApiKeyAuthSecurityScheme).toStrictEqual({
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
        deprecated: true,
      })
      expect(Oauth2SecurityScheme).toStrictEqual({
        type: 'oauth2',
        oauth2MetadataUrl: 'https://auth.example.com/.well-known/oauth-authorization-server',
        flows: {
          deviceAuthorization: {
            deviceAuthorizationUrl: 'https://auth.example.com/device',
            tokenUrl: 'https://auth.example.com/token',
            scopes: { 'users:read': 'Read users' },
          },
        },
      })
    })
  })

  describe('exportLinks', () => {
    it('exports each link verbatim', () => {
      expect(GetUserByIdLink).toStrictEqual({
        operationId: 'getUser',
        parameters: { userId: '$response.body#/id' },
        description: 'Fetch the user that was just returned',
      })
    })
  })

  describe('exportCallbacks', () => {
    it('exports the callback the route binds', () => {
      expect(postUsersRoute.callbacks.userCreated).toBe(UserCreatedCallback)
      expect(
        UserCreatedCallback['{$request.body#/callbackUrl}'].post.requestBody.content[
          'application/json'
        ].schema,
      ).toBe(UserJsonMediaTypeSchema)
    })
  })

  describe('exportPathItems', () => {
    it('exports the path item a `paths` entry only references, and routes it', () => {
      expect(HealthPathItem.get.operationId).toBe('getHealth')
      expect(Object.keys(HealthPathItem.additionalOperations)).toStrictEqual(['PURGE'])
      expect(getHealthRoute.path).toBe('/health')
      expect(getHealthRoute.operationId).toBe(HealthPathItem.get.operationId)
    })
  })

  describe('exportMediaTypes / exportMediaTypesTypes', () => {
    it('binds a `content` reference to the media type constant as its schema', () => {
      expect(getUsersRoute.responses[200].content['application/json'].schema).toBe(
        UserListJsonMediaTypeSchema,
      )
      expect(queryUsersSearchRoute.responses[200].content['application/json'].schema).toBe(
        UserListJsonMediaTypeSchema,
      )
      expect(getHealthEventsRoute.responses[200].content['text/event-stream'].schema).toBe(
        HealthEventStreamMediaTypeSchema,
      )
    })

    it('exports an aliased media type as its target, one without a body schema as unknown', () => {
      expect(UserJsonMediaTypeSchema).toBe(UserSchema)
      expect(LegacyUserJsonMediaTypeSchema).toBe(UserJsonMediaTypeSchema)
      expect(HealthEventStreamMediaTypeSchema.safeParse('anything').success).toBe(true)
    })

    it('exports the inferred type next to each media type', () => {
      assertType<Equal<UserJsonMediaType, User>>(true)
      assertType<Equal<LegacyUserJsonMediaType, User>>(true)
      assertType<Equal<UserListJsonMediaType, User[]>>(true)
      assertType<Equal<HealthEventStreamMediaType, unknown>>(true)
    })
  })
})

describe('an app built from the exported routes', () => {
  const app = new OpenAPIHono()
    .openapi(getUsersRoute, (c) => c.json([alice] as User[], 200))
    .openapi(postUsersRoute, (c) =>
      c.json({ ...alice, name: c.req.valid('json').name } as User, 201),
    )
    .openapi(getUsersUserIdRoute, (c) =>
      c.req.valid('param').userId === alice.id
        ? c.json(alice as User, 200)
        : c.json({ code: 404, message: 'User not found' }, 404),
    )
    .openapi(queryUsersSearchRoute, (c) => c.json([alice] as User[], 200))
    .openapi(getHealthRoute, (c) => c.json({ status: 'ok' as const }, 200))
  // Security schemes are not referenced by any Zod schema, so they are registered by hand.
  // Without `readonly: true` (`as const`) the exported constant is a plain object whose `type`
  // widens to `string`, so the registry's `SecuritySchemeObject` needs the literal restated.
  type SecurityScheme = Parameters<
    typeof app.openAPIRegistry.registerComponent<'securitySchemes'>
  >[2]
  app.openAPIRegistry.registerComponent(
    'securitySchemes',
    'bearerAuth',
    BearerAuthSecurityScheme as SecurityScheme,
  )

  const request = (path: string, init?: RequestInit) => app.request(path, init)
  const json = (method: string, path: string, body: unknown) =>
    request(path, {
      method,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })

  it('validates query, path and body with the exported schemas', async () => {
    const tooSmall = await request('/users?limit=0')
    expect(tooSmall.status).toBe(400)
    const coerced = await request('/users?limit=5&verbose=true')
    expect(coerced.status).toBe(200)
    const badId = await request('/users/not-a-uuid')
    expect(badId.status).toBe(400)
    const found = await request(`/users/${alice.id}`)
    expect(found.status).toBe(200)
    const missingCallback = await json('POST', '/users', { name: 'Bob' })
    expect(missingCallback.status).toBe(400)
    const created = await json('POST', '/users', {
      name: 'Bob',
      callbackUrl: 'https://example.com/cb',
    })
    expect(created.status).toBe(201)
  })

  it('routes the OpenAPI 3.2 QUERY method', async () => {
    const invalid = await json('QUERY', '/users/search', { role: 'owner' })
    expect(invalid.status).toBe(400)
    const valid = await json('QUERY', '/users/search', { role: 'admin' })
    expect(valid.status).toBe(200)
  })

  const doc = app.getOpenAPI31Document({ openapi: '3.1.0', info: { title: 't', version: '1' } })

  it('documents only the required properties an object declares', () => {
    expect(doc.components?.schemas?.User).toMatchObject({ required: ['id', 'name', 'role'] })
    // No `required` in the spec: every property is optional.
    expect(doc.components?.schemas?.UserFilter).toMatchObject({ required: [] })
  })

  it('documents parameters and headers as optional unless the spec requires them', () => {
    const listUsers = doc.paths?.['/users']?.get
    expect(
      listUsers?.parameters?.map((p) => ('name' in p ? [p.name, p.required] : [])),
    ).toStrictEqual([
      ['limit', false],
      ['verbose', false],
      ['X-Request-Id', false],
    ])
    expect(listUsers?.responses?.[200]).toMatchObject({
      headers: { 'X-Rate-Limit': { required: false } },
    })
  })

  it('documents a media type reference as its schema', () => {
    expect(doc.paths?.['/users']?.get?.responses?.[200]).toMatchObject({
      content: {
        'application/json': {
          schema: { type: 'array', items: { $ref: '#/components/schemas/User' } },
        },
      },
    })
  })

  it('documents the security scheme registered from the exported constant', () => {
    expect(doc.components?.securitySchemes).toStrictEqual({ bearerAuth: BearerAuthSecurityScheme })
  })
})
