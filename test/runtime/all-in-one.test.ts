// The fifteen `export*` flags (cases/all-in-one, generated from specs/all-in-one.yaml with
// every flag on).
//
// Each flag exports one section of `components` from routes.ts as constants, and a
// `*Types` flag adds the inferred type beside each. The routes are built from those very
// constants, not from copies of them, which is what the identity assertions (`toBe`) in
// this file prove. The last part assembles an app from the exported routes and checks
// that it validates requests and documents the components the way the spec declares them.
//
// 15 個の `export*` フラグの検証(cases/all-in-one。specs/all-in-one.yaml から、すべての
// フラグを有効にして生成)。
//
// 各フラグは、`components` の1セクションを routes.ts から定数としてエクスポートする。
// `*Types` フラグは、それぞれの定数に対応する推論型を追加する。ルートは、定数のコピーでは
// なく、まさにその定数から組み立てられる。このファイルの同一性アサーション(`toBe`)は、
// それを検証している。最後のパートでは、エクスポートされたルートからアプリを組み立て、
// リクエストの検証とコンポーネントのドキュメント化が、仕様の宣言どおりであることを確認する。
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

// The user every handler below answers with.
// 以下のすべてのハンドラが応答に使うユーザー。
const alice = { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', name: 'Alice', role: 'member' }

// The runtime constants each flag exports. `*Types` flags export types only and are asserted
// with `assertType` below.
// 各フラグがエクスポートする実行時の定数。`*Types` フラグは型だけをエクスポートするため、
// 後述の `assertType` で検証する。
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
  // The list of exports is compared whole: a constant that goes missing fails the test, and so
  // does one that appears unannounced.
  // エクスポートの一覧を丸ごと比較する。定数が欠落した場合も、予告なく増えた場合も、
  // テストは失敗する。
  it('routes.ts exports exactly the routes plus every section the flags turn on', () => {
    expect(Object.keys(generated).sort()).toStrictEqual(
      [...ROUTES, ...Object.values(EXPORTS_BY_FLAG).flat()].sort(),
    )
  })

  describe('exportSchemas / exportSchemasTypes', () => {
    // An exported schema is a working Zod schema: it accepts a valid user, rejects a role
    // outside the enum, and accepts {} for a schema with no required property.
    // エクスポートされたスキーマは、実際に動作する Zod スキーマである。有効なユーザーを受理し、
    // enum に含まれない role を拒否し、必須プロパティのないスキーマでは {} を受理する。
    it('exports each schema as a Zod schema that validates the component', () => {
      expect(UserSchema.safeParse(alice).success).toBe(true)
      expect(UserSchema.safeParse({ ...alice, role: 'owner' }).success).toBe(false)
      expect(UserFilterSchema.safeParse({}).success).toBe(true)
    })

    // Checked by tsc: each exported type is exactly the shape the spec declares, optional
    // properties included. Category refers to itself.
    // tsc によって検証される。エクスポートされた各型は、任意プロパティを含め、
    // 仕様で宣言された形と完全に一致する。Category は自己参照型である。
    it('exports the inferred type next to each schema', () => {
      assertType<Equal<Role, 'admin' | 'member'>>(true)
      assertType<Equal<Address, { city: string; zip?: string }>>(true)
      assertType<Equal<User, { id: string; name: string; role: Role; address?: Address }>>(true)
      assertType<Equal<UserFilter, { role?: Role; nameContains?: string }>>(true)
      // Self-referencing: the type comes from the explicit `CategoryType` annotation.
      // 自己参照型。型は、明示的な `CategoryType` アノテーションから得られる。
      assertType<Equal<Category, { name: string; children?: Category[] }>>(true)
    })
  })

  describe('exportParameters / exportParametersTypes', () => {
    // A parameter arrives as text, so its exported schema coerces: "5" becomes the number 5,
    // "0" fails minimum: 1, and "true" becomes the boolean true.
    // パラメータは文字列として届くため、エクスポートされたスキーマは coerce を行う。
    // "5" は number の 5 になり、"0" は minimum: 1 で失敗し、"true" は boolean の true になる。
    it('exports each parameter as a schema that coerces the wire string', () => {
      expect(LimitParamsSchema.parse('5')).toBe(5)
      expect(LimitParamsSchema.safeParse('0').success).toBe(false)
      expect(VerboseParamsSchema.parse('true')).toBe(true)
    })

    // Checked by tsc: the type is that of the coerced value, not string.
    // tsc によって検証される。型は string ではなく、coerce 後の値の型である。
    it('exports the inferred type next to each parameter', () => {
      assertType<Equal<LimitParams, number>>(true)
      assertType<Equal<VerboseParams, boolean>>(true)
      assertType<Equal<SessionParams, string>>(true)
      assertType<Equal<UserIdParams, string>>(true)
    })
  })

  describe('exportExamples', () => {
    // An example is exported verbatim. An example that is only a $ref to another is the very
    // same constant, not a copy. The OpenAPI 3.2 fields dataValue and serializedValue are kept.
    // example は、そのままエクスポートされる。他の example への $ref にすぎない example は、
    // コピーではなく、まったく同じ定数になる。
    // OpenAPI 3.2 のフィールドである dataValue と serializedValue も保持される。
    it('exports each example as-is, an aliased example as its target', () => {
      expect(AliceExample).toStrictEqual({ summary: 'A member user', value: alice })
      expect(DefaultUserExample).toBe(AliceExample)
      // OpenAPI 3.2 dataValue / serializedValue survive untouched.
      // OpenAPI 3.2 の dataValue / serializedValue は、変更されずに保持される。
      expect(LimitTenExample).toStrictEqual({
        summary: 'Ten per page (OpenAPI 3.2 dataValue / serializedValue)',
        dataValue: 10,
        serializedValue: 'limit=10',
      })
    })
  })

  describe('exportRequestBodies', () => {
    // The route holds the exported request body itself, and the request body holds the exported
    // schema itself.
    // ルートは、エクスポートされたリクエストボディそのものを保持する。リクエストボディは、
    // エクスポートされたスキーマそのものを保持する。
    it('exports the request body the route binds', () => {
      expect(postUsersRoute.request.body).toBe(CreateUserRequestBody)
      expect(CreateUserRequestBody.content['application/json'].schema).toBe(NewUserSchema)
    })
  })

  describe('exportResponses', () => {
    // Each route holds the exported responses themselves, and a response holds the exported
    // header, example and link themselves.
    // 各ルートは、エクスポートされたレスポンスそのものを保持する。レスポンスは、
    // エクスポートされたヘッダー・example・リンクそのものを保持する。
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
    // A response header is exported as a schema. It is not coerced: a response is written by
    // the handler, which has a number, not text.
    // レスポンスヘッダーは、スキーマとしてエクスポートされる。coerce は行われない。
    // レスポンスはハンドラが書き出すものであり、
    // ハンドラが持つのは文字列ではなく number である。
    it('exports each header as a schema the responses bind', () => {
      expect(getUsersRoute.responses[200].headers.shape['X-Rate-Limit']).toBe(
        XRateLimitHeaderSchema,
      )
      expect(XRateLimitHeaderSchema.safeParse(3).success).toBe(true)
      expect(XRateLimitHeaderSchema.safeParse(-1).success).toBe(false)
    })

    // Checked by tsc.
    // tsc によって検証される。
    it('exports the inferred type next to each header', () => {
      assertType<Equal<XRateLimitHeader, number>>(true)
      assertType<Equal<XRequestIdHeader, string>>(true)
    })
  })

  describe('exportSecuritySchemes', () => {
    // Every field of a security scheme is kept, the OpenAPI 3.2 ones included: deprecated,
    // oauth2MetadataUrl and the deviceAuthorization flow.
    // セキュリティスキームのすべてのフィールドが保持される。
    // OpenAPI 3.2 のフィールドである deprecated・oauth2MetadataUrl・deviceAuthorization
    // フローも含まれる。
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
    // Every field of a link is kept, the runtime expression included.
    // リンクのすべてのフィールドが保持される。ランタイム式も含まれる。
    it('exports each link verbatim', () => {
      expect(GetUserByIdLink).toStrictEqual({
        operationId: 'getUser',
        parameters: { userId: '$response.body#/id' },
        description: 'Fetch the user that was just returned',
      })
    })
  })

  describe('exportCallbacks', () => {
    // The route holds the exported callback itself, and the callback reaches the exported media
    // type through its request body.
    // ルートは、エクスポートされたコールバックそのものを保持する。コールバックは、
    // リクエストボディを通じて、エクスポートされたメディアタイプに到達する。
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
    // A path item that paths only refers to is exported, with its OpenAPI 3.2
    // additionalOperations, and a route is still generated for the path.
    // paths から参照されているだけのパスアイテムも、
    // OpenAPI 3.2 の additionalOperations を含めてエクスポートされる。
    // そのパスに対するルートも生成される。
    it('exports the path item a `paths` entry only references, and routes it', () => {
      expect(HealthPathItem.get.operationId).toBe('getHealth')
      expect(Object.keys(HealthPathItem.additionalOperations)).toStrictEqual(['PURGE'])
      expect(getHealthRoute.path).toBe('/health')
      expect(getHealthRoute.operationId).toBe(HealthPathItem.get.operationId)
    })
  })

  describe('exportMediaTypes / exportMediaTypesTypes', () => {
    // OpenAPI 3.2 lets content refer to a media type component. The route holds the exported
    // media type as the schema of that content.
    // OpenAPI 3.2 では、content からメディアタイプのコンポーネントを参照できる。ルートは、
    // エクスポートされたメディアタイプを、その content のスキーマとして保持する。
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

    // A media type that is only a schema $ref is that schema; one that refers to another media
    // type is that media type; one with no schema at all accepts anything.
    // スキーマへの $ref にすぎないメディアタイプは、そのスキーマそのものになる。
    // 他のメディアタイプを参照するものは、そのメディアタイプそのものになる。
    // スキーマを持たないものは、任意の値を受理する。
    it('exports an aliased media type as its target, one without a body schema as unknown', () => {
      expect(UserJsonMediaTypeSchema).toBe(UserSchema)
      expect(LegacyUserJsonMediaTypeSchema).toBe(UserJsonMediaTypeSchema)
      expect(HealthEventStreamMediaTypeSchema.safeParse('anything').success).toBe(true)
    })

    // Checked by tsc. A media type with no schema is unknown, not any.
    // tsc によって検証される。スキーマを持たないメディアタイプは、any ではなく unknown になる。
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
  // セキュリティスキームは、どの Zod スキーマからも参照されないため、手動で登録する。
  // `readonly: true`(`as const`)を指定しない場合、エクスポートされた定数は通常の
  // オブジェクトとなり、`type` が `string` に拡大される。そのため、レジストリの
  // `SecuritySchemeObject` に合わせて、リテラル型を明示し直す必要がある。
  type SecurityScheme = Parameters<
    typeof app.openAPIRegistry.registerComponent<'securitySchemes'>
  >[2]
  app.openAPIRegistry.registerComponent(
    'securitySchemes',
    'bearerAuth',
    BearerAuthSecurityScheme as SecurityScheme,
  )

  type ZodFailure = { success: boolean; error: { name: string; message: string } }

  // limit and verbose are optional.
  // limit と verbose は任意である。
  it('GET /users answers the list when no parameter is sent', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual([alice])
  })

  // The exported LimitParamsSchema coerces the text "1" to a number and checks minimum: 1.
  // エクスポートされた LimitParamsSchema は、文字列 "1" を number に coerce し、
  // minimum: 1 を検証する。
  it('GET /users accepts limit=1, its minimum', async () => {
    const res = await app.request('/users?limit=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual([alice])
  })

  // The upper bound is inclusive.
  // 上限は範囲に含まれる。
  it('GET /users accepts limit=100, its maximum', async () => {
    const res = await app.request('/users?limit=100')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual([alice])
  })

  // verbose is a boolean, read from the text "true".
  // verbose は boolean であり、文字列 "true" から読み取られる。
  it('GET /users accepts limit and verbose together', async () => {
    const res = await app.request('/users?limit=5&verbose=true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual([alice])
  })

  // One below the minimum.
  // 最小値を 1 下回る。
  it('GET /users rejects limit=0', async () => {
    const res = await app.request('/users?limit=0')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_small', path: ['limit'] }])
  })

  // One above the maximum.
  // 最大値を 1 超える。
  it('GET /users rejects limit=101', async () => {
    const res = await app.request('/users?limit=101')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_big', path: ['limit'] }])
  })

  // A fraction is not an integer.
  // 小数は整数ではない。
  it('GET /users rejects limit=1.5', async () => {
    const res = await app.request('/users?limit=1.5')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_type', path: ['limit'] },
    ])
  })

  // A word is not a number.
  // 単語は数値ではない。
  it('GET /users rejects limit=x', async () => {
    const res = await app.request('/users?limit=x')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_type', path: ['limit'] },
    ])
  })

  // Not a boolean spelling.
  // 真偽値の表記ではない。
  it('GET /users rejects verbose=maybe', async () => {
    const res = await app.request('/users?verbose=maybe')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_value', path: ['verbose'] },
    ])
  })

  // userId is a $ref to a parameter whose schema is a $ref to the UserId schema, a UUID.
  // userId はパラメータへの $ref であり、
  // そのスキーマは UUID である UserId スキーマへの $ref である。
  it('GET /users/{userId} answers the user for a UUID', async () => {
    const res = await app.request('/users/3fa85f64-5717-4562-b3fc-2c963f66afa6')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual(alice)
  })

  // The value is a valid UUID, so it passes validation and reaches the handler, which answers
  // the declared 404.
  // 値は有効な UUID なので検証を通過し、ハンドラに到達する。ハンドラは、宣言された 404 を返す。
  it('GET /users/{userId} answers 404 for a UUID that names no user', async () => {
    const res = await app.request('/users/00000000-0000-0000-0000-000000000000')
    expect(res.status).toBe(404)
    expect(await res.json()).toStrictEqual({ code: 404, message: 'User not found' })
  })

  // The format is checked before the handler runs.
  // フォーマットは、ハンドラの実行前に検証される。
  it('GET /users/{userId} rejects a value that is not a UUID', async () => {
    const res = await app.request('/users/not-a-uuid')
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_format', path: ['userId'] },
    ])
  })

  // name and callbackUrl are the required properties of NewUser, the schema of the exported
  // request body.
  // name と callbackUrl は、エクスポートされたリクエストボディのスキーマである NewUser
  // の必須プロパティである。
  it('POST /users creates a user from a name and a callback URL', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Bob', callbackUrl: 'https://example.com/cb' }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ ...alice, name: 'Bob' })
  })

  // role is a $ref to the Role schema.
  // role は Role スキーマへの $ref である。
  it('POST /users accepts a role of the enum', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Bob', callbackUrl: 'https://example.com/cb', role: 'admin' }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({ ...alice, name: 'Bob' })
  })

  // callbackUrl is required.
  // callbackUrl は必須である。
  it('POST /users rejects a body with no callbackUrl', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Bob' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_type', path: ['callbackUrl'] },
    ])
  })

  // name is required.
  // name は必須である。
  it('POST /users rejects a body with no name', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ callbackUrl: 'https://example.com/cb' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'invalid_type', path: ['name'] }])
  })

  // One below minLength: 1.
  // minLength: 1 を 1 下回る。
  it('POST /users rejects an empty name', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: '', callbackUrl: 'https://example.com/cb' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([{ code: 'too_small', path: ['name'] }])
  })

  // format: uri.
  // format: uri の検証。
  it('POST /users rejects a callbackUrl that is not a URI', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Bob', callbackUrl: 'nope' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_format', path: ['callbackUrl'] },
    ])
  })

  // "owner" is not a member of Role.
  // "owner" は Role のメンバーではない。
  it('POST /users rejects a role outside the enum', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Bob', callbackUrl: 'https://example.com/cb', role: 'owner' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_value', path: ['role'] },
    ])
  })

  // QUERY is the OpenAPI 3.2 method that is safe like GET and carries a body like POST. The
  // route is registered under that method.
  // QUERY は OpenAPI 3.2 のメソッドであり、GET のように安全で、POST のようにボディを持つ。
  // ルートは、このメソッドで登録される。
  it('QUERY /users/search accepts a filter', async () => {
    const res = await app.request('/users/search', {
      method: 'QUERY',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ role: 'admin' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual([alice])
  })

  // UserFilter declares no required property, so {} is valid.
  // UserFilter は必須プロパティを宣言していないため、{} は有効である。
  it('QUERY /users/search accepts an empty filter', async () => {
    const res = await app.request('/users/search', {
      method: 'QUERY',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual([alice])
  })

  // The body of a QUERY request is validated like any other.
  // QUERY リクエストのボディも、他のメソッドと同じように検証される。
  it('QUERY /users/search rejects a role outside the enum', async () => {
    const res = await app.request('/users/search', {
      method: 'QUERY',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ role: 'owner' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_value', path: ['role'] },
    ])
  })

  // A body is typed JSON, so nothing is coerced.
  // ボディは型付きの JSON であるため、coerce は行われない。
  it('QUERY /users/search rejects a nameContains that is a number', async () => {
    const res = await app.request('/users/search', {
      method: 'QUERY',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ nameContains: 1 }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as ZodFailure
    expect(body.success).toBe(false)
    expect(body.error.name).toBe('ZodError')
    expect(JSON.parse(body.error.message)).toMatchObject([
      { code: 'invalid_type', path: ['nameContains'] },
    ])
  })

  // The path declares QUERY only.
  // このパスが宣言しているのは QUERY だけである。
  it('POST /users/search is not routed', async () => {
    const res = await app.request('/users/search', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(404)
  })

  // The paths entry /health is only a $ref to the path item component; the route is built from
  // the component.
  // paths の /health は、パスアイテムのコンポーネントへの $ref にすぎない。ルートは、
  // そのコンポーネントから組み立てられる。
  it('GET /health answers through the referenced path item', async () => {
    const res = await app.request('/health')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ status: 'ok' })
  })

  const doc = app.getOpenAPI31Document({ openapi: '3.1.0', info: { title: 't', version: '1' } })

  // The OpenAPI document generated back from the routes lists exactly the properties the spec
  // requires, and none for a schema that requires none.
  // ルートから再生成した OpenAPI ドキュメントには、
  // 仕様で必須とされたプロパティだけが列挙される。必須プロパティのないスキーマでは、
  // 何も列挙されない。
  it('documents only the required properties an object declares', () => {
    expect(doc.components?.schemas?.User).toMatchObject({ required: ['id', 'name', 'role'] })
    // No `required` in the spec: every property is optional.
    // 仕様に `required` がないため、すべてのプロパティは任意である。
    expect(doc.components?.schemas?.UserFilter).toMatchObject({ required: [] })
  })

  // required: false in the document, for every parameter and header the spec does not require.
  // 仕様で必須とされていないパラメータとヘッダーは、
  // ドキュメント上ですべて required: false になる。
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

  // The document shows the schema behind the media type reference.
  // ドキュメントには、メディアタイプ参照の先にあるスキーマが表示される。
  it('documents a media type reference as its schema', () => {
    expect(doc.paths?.['/users']?.get?.responses?.[200]).toMatchObject({
      content: {
        'application/json': {
          schema: { type: 'array', items: { $ref: '#/components/schemas/User' } },
        },
      },
    })
  })

  // The exported constant is what a caller registers, and what the document then shows.
  // 呼び出し側が登録するのは、エクスポートされた定数である。ドキュメントにも、
  // その内容が表示される。
  it('documents the security scheme registered from the exported constant', () => {
    expect(doc.components?.securitySchemes).toStrictEqual({ bearerAuth: BearerAuthSecurityScheme })
  })
})
