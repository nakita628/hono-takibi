import { createRoute, z } from '@hono/zod-openapi'

type TreeNodeType = {
  readonly value?: string
  readonly children?: readonly TreeNodeType[]
  readonly parent?: TreeNodeType
}

const CompanySchema: z.ZodType<CompanyType> = z
  .lazy(() =>
    z.object({
      name: z.string().exactOptional(),
      employees: z.array(PersonSchema).exactOptional(),
    }),
  )
  .readonly()
  .openapi('Company')

type PersonType = { readonly name?: string; readonly company?: z.infer<typeof CompanySchema> }

const PersonSchema: z.ZodType<PersonType> = z
  .lazy(() =>
    z.object({ name: z.string().exactOptional(), company: CompanySchema.exactOptional() }),
  )
  .readonly()
  .openapi('Person')

type CompanyType = {
  readonly name?: string
  readonly employees?: readonly z.infer<typeof PersonSchema>[]
}

const EmptyObjectSchema = z.object({}).readonly().openapi('EmptyObject')

const FreeFormObjectSchema = z.looseObject({}).readonly().openapi('FreeFormObject')

const StrictObjectSchema = z
  .strictObject({ known: z.string().exactOptional() })
  .readonly()
  .openapi('StrictObject')

const TypedAdditionalPropsSchema = z
  .record(z.string(), z.int())
  .readonly()
  .openapi('TypedAdditionalProps')

const ComplexAdditionalPropsSchema = z
  .record(
    z.string(),
    z.object({ value: z.string().exactOptional(), count: z.int().exactOptional() }),
  )
  .readonly()
  .openapi('ComplexAdditionalProps')

const AllPrimitivesSchema = z
  .object({
    stringProp: z.string().exactOptional(),
    numberProp: z.number().exactOptional(),
    integerProp: z.int().exactOptional(),
    booleanProp: z.boolean().exactOptional(),
    nullProp: z.null().nullable().exactOptional(),
  })
  .readonly()
  .openapi('AllPrimitives')

const AllStringFormatsSchema = z
  .object({
    email: z.email().exactOptional(),
    uuid: z.uuid().exactOptional(),
    uri: z.url().exactOptional(),
    date: z.iso.date().exactOptional(),
    time: z.iso.time().exactOptional(),
    dateTime: z.iso.datetime().exactOptional(),
    duration: z.iso.duration().exactOptional(),
    binary: z.file().exactOptional(),
    base64: z.base64().exactOptional(),
    ipv4: z.ipv4().exactOptional(),
    ipv6: z.ipv6().exactOptional(),
    jwt: z.jwt().exactOptional(),
  })
  .readonly()
  .openapi('AllStringFormats')

const AllNumberFormatsSchema = z
  .object({
    int32: z.int32().exactOptional(),
    int64: z.int64().exactOptional(),
    float: z.float32().exactOptional(),
    double: z.number().exactOptional(),
    float32: z.float32().exactOptional(),
    float64: z.float64().exactOptional(),
  })
  .readonly()
  .openapi('AllNumberFormats')

const AllValidationsSchema = z
  .object({
    minMaxString: z.string().min(1).max(100).exactOptional(),
    patternString: z
      .string()
      .regex(/^[a-z]+$/)
      .exactOptional(),
    minMaxNumber: z.number().min(0).max(100).exactOptional(),
    exclusiveMinMax: z.number().gt(0).lt(100).exactOptional(),
    multipleOf: z.number().multipleOf(0.5).exactOptional(),
    minMaxItems: z.array(z.string()).min(1).max(10).exactOptional(),
    uniqueItems: z.array(z.string()).exactOptional(),
  })
  .readonly()
  .openapi('AllValidations')

const StringEnumSchema = z.enum(['value1', 'value2', 'value3']).readonly().openapi('StringEnum')

const IntegerEnumSchema = z
  .union([z.literal(1), z.literal(2), z.literal(3)])
  .readonly()
  .openapi('IntegerEnum')

const MixedEnumSchema = z
  .union([z.literal('string_value'), z.literal(123), z.literal(true), z.literal(null)])
  .readonly()
  .openapi('MixedEnum')

const ConstValueSchema = z
  .object({ type: z.literal('fixed_type').exactOptional(), version: z.literal(1).exactOptional() })
  .readonly()
  .openapi('ConstValue')

const NullableStringSchema = z.string().nullable().readonly().openapi('NullableString')

const NullableObjectSchema = z
  .object({ name: z.string().exactOptional() })
  .nullable()
  .readonly()
  .openapi('NullableObject')

const WithDefaultsSchema = z
  .object({
    status: z.string().default('active').exactOptional(),
    count: z.int().default(0).exactOptional(),
    enabled: z.boolean().default(true).exactOptional(),
    tags: z.array(z.string()).default([]).exactOptional(),
  })
  .readonly()
  .openapi('WithDefaults')

const ReadWriteOnlySchema = z
  .object({
    id: z.string().exactOptional().openapi({ readOnly: true }),
    password: z.string().exactOptional().openapi({ writeOnly: true }),
    name: z.string().exactOptional(),
  })
  .readonly()
  .openapi('ReadWriteOnly')

const TreeNodeSchema: z.ZodType<TreeNodeType> = z
  .lazy(() =>
    z.object({
      value: z.string().exactOptional(),
      children: z.array(TreeNodeSchema).exactOptional(),
      parent: TreeNodeSchema.exactOptional(),
    }),
  )
  .readonly()
  .openapi('TreeNode')

const DeepNestedSchema = z
  .object({
    level1: z
      .object({
        level2: z
          .object({
            level3: z
              .object({
                level4: z
                  .object({
                    level5: z.object({ value: z.string().exactOptional() }).exactOptional(),
                  })
                  .exactOptional(),
              })
              .exactOptional(),
          })
          .exactOptional(),
      })
      .exactOptional(),
  })
  .readonly()
  .openapi('DeepNested')

const MatrixDataSchema = z
  .array(z.array(z.array(z.number())))
  .readonly()
  .openapi('MatrixData')

const CoordinateSchema = z.array(z.number()).length(3).readonly().openapi('Coordinate')

const ComplexUnionSchema = z
  .xor([z.string(), z.number(), z.array(z.string()), z.object({ key: z.string().exactOptional() })])
  .readonly()
  .openapi('ComplexUnion')

const MergedSchema = z
  .object({ id: z.string().exactOptional(), name: z.string().exactOptional() })
  .and(z.object({ id: z.uuid().exactOptional(), createdAt: z.iso.datetime().exactOptional() }))
  .readonly()
  .openapi('MergedSchema')

const SingleValueEnumSchema = z.literal('only_value').readonly().openapi('SingleValueEnum')

const DataJsonSchema = z
  .object({ data: z.object({}).exactOptional() })
  .readonly()
  .openapi('DataJson')

const DataXmlSchema = z
  .object({ data: z.string().exactOptional() })
  .openapi({ xml: { name: 'data', namespace: 'http://example.com/schema' } })
  .readonly()
  .openapi('DataXml')

const SpecialPropertyNamesSchema = z
  .object({
    normal_name: z.string().exactOptional(),
    'kebab-case': z.string().exactOptional(),
    'with.dots': z.string().exactOptional(),
    '@special': z.string().exactOptional(),
    $dollar: z.string().exactOptional(),
  })
  .readonly()
  .openapi('SpecialPropertyNames')

const UnicodePropertiesSchema = z
  .object({
    名前: z.string().exactOptional(),
    prénom: z.string().exactOptional(),
    имя: z.string().exactOptional(),
  })
  .readonly()
  .openapi('UnicodeProperties')

const RequiredParamParamsSchema = z
  .string()
  .openapi({ param: { name: 'required', in: 'query', required: true, schema: { type: 'string' } } })
  .readonly()

const OptionalParamParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: { name: 'optional', in: 'query', required: false, schema: { type: 'string' } },
  })
  .readonly()

const DeprecatedParamParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: { name: 'deprecated', in: 'query', deprecated: true, schema: { type: 'string' } },
  })
  .readonly()

const AllowEmptyParamParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: { name: 'allowEmpty', in: 'query', allowEmptyValue: true, schema: { type: 'string' } },
  })
  .readonly()

const ApiKeyHeaderSecurityScheme = { type: 'apiKey', in: 'header', name: 'X-API-Key' } as const

const ApiKeyQuerySecurityScheme = { type: 'apiKey', in: 'query', name: 'api_key' } as const

const ApiKeyCookieSecurityScheme = { type: 'apiKey', in: 'cookie', name: 'session' } as const

const BasicAuthSecurityScheme = { type: 'http', scheme: 'basic' } as const

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer' } as const

const BearerJwtSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } as const

const DigestAuthSecurityScheme = { type: 'http', scheme: 'digest' } as const

const Oauth2ImplicitSecurityScheme = {
  type: 'oauth2',
  flows: {
    implicit: {
      authorizationUrl: 'https://example.com/oauth/authorize',
      scopes: { read: 'Read access', write: 'Write access' },
    },
  },
} as const

const Oauth2AuthCodeSecurityScheme = {
  type: 'oauth2',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://example.com/oauth/authorize',
      tokenUrl: 'https://example.com/oauth/token',
      scopes: { read: 'Read access' },
    },
  },
} as const

const Oauth2ClientCredsSecurityScheme = {
  type: 'oauth2',
  flows: {
    clientCredentials: {
      tokenUrl: 'https://example.com/oauth/token',
      scopes: { admin: 'Admin access' },
    },
  },
} as const

const OpenIdConnectSecurityScheme = {
  type: 'openIdConnect',
  openIdConnectUrl: 'https://example.com/.well-known/openid-configuration',
} as const

const NoContentResponse = { description: 'No content response' } as const

const HeadersOnlyResponse = {
  description: 'Response with headers only',
  headers: z.object({
    'X-Custom-Header': { schema: z.string().exactOptional() },
    'X-Another-Header': { schema: z.int().exactOptional() },
  }),
} as const

const StringHeaderHeaderSchema = z.string().exactOptional().readonly()

const IntegerHeaderHeaderSchema = z.int().exactOptional().readonly()

const BooleanHeaderHeaderSchema = z.boolean().exactOptional().readonly()

const ArrayHeaderHeaderSchema = z.array(z.string().exactOptional()).exactOptional().readonly()

const NullExample = { summary: 'Null value example', value: null } as const

const EmptyObjectExample = { summary: 'Empty object', value: {} } as const

const EmptyArrayExample = { summary: 'Empty array', value: [] } as const

const ComplexExample = {
  summary: 'Complex nested structure',
  value: {
    users: [
      {
        id: 1,
        name: 'Alice',
        roles: ['admin', 'user'],
        metadata: {
          lastLogin: '2024-01-15T10:30:00Z',
          preferences: { theme: 'dark', notifications: true },
        },
      },
      { id: 2, name: 'Bob', roles: ['user'], metadata: null },
    ],
  },
} as const

export const getAllMethodsRoute = createRoute({
  method: 'get',
  path: '/all-methods',
  operationId: 'getAllMethods',
  responses: { 200: { description: 'GET response' } },
} as const)

export const putAllMethodsRoute = createRoute({
  method: 'put',
  path: '/all-methods',
  operationId: 'putAllMethods',
  responses: { 200: { description: 'PUT response' } },
} as const)

export const postAllMethodsRoute = createRoute({
  method: 'post',
  path: '/all-methods',
  operationId: 'postAllMethods',
  responses: { 200: { description: 'POST response' } },
} as const)

export const deleteAllMethodsRoute = createRoute({
  method: 'delete',
  path: '/all-methods',
  operationId: 'deleteAllMethods',
  responses: { 200: { description: 'DELETE response' } },
} as const)

export const patchAllMethodsRoute = createRoute({
  method: 'patch',
  path: '/all-methods',
  operationId: 'patchAllMethods',
  responses: { 200: { description: 'PATCH response' } },
} as const)

export const optionsAllMethodsRoute = createRoute({
  method: 'options',
  path: '/all-methods',
  operationId: 'optionsAllMethods',
  responses: { 200: { description: 'OPTIONS response' } },
} as const)

export const headAllMethodsRoute = createRoute({
  method: 'head',
  path: '/all-methods',
  operationId: 'headAllMethods',
  responses: { 200: { description: 'HEAD response' } },
} as const)

export const traceAllMethodsRoute = createRoute({
  method: 'trace',
  path: '/all-methods',
  operationId: 'traceAllMethods',
  responses: { 200: { description: 'TRACE response' } },
} as const)

export const getUsersUserIdPostsPostIdCommentsCommentIdRoute = createRoute({
  method: 'get',
  path: '/users/{userId}/posts/{postId}/comments/{commentId}',
  operationId: 'getNestedResource',
  request: {
    params: z.object({
      userId: z.string().openapi({
        param: { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
      }),
      postId: z.int().openapi({
        param: { name: 'postId', in: 'path', required: true, schema: { type: 'integer' } },
      }),
      commentId: z.uuid().openapi({
        param: {
          name: 'commentId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: { 200: { description: 'Nested resource' } },
} as const)

export const getParamsTestPathParamRoute = createRoute({
  method: 'get',
  path: '/params-test/{pathParam}',
  operationId: 'testAllParamLocations',
  request: {
    params: z.object({
      pathParam: z.string().openapi({
        param: { name: 'pathParam', in: 'path', required: true, schema: { type: 'string' } },
      }),
    }),
    query: z.object({
      queryParam: z
        .string()
        .exactOptional()
        .openapi({
          param: { name: 'queryParam', in: 'query', required: false, schema: { type: 'string' } },
        }),
    }),
    headers: z.object({
      'X-Header-Param': z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'X-Header-Param',
            in: 'header',
            required: false,
            schema: { type: 'string' },
          },
        }),
    }),
    cookies: z.object({
      session_id: z
        .string()
        .exactOptional()
        .openapi({
          param: { name: 'session_id', in: 'cookie', required: false, schema: { type: 'string' } },
        }),
    }),
  },
  responses: { 200: { description: 'Success' } },
} as const)

export const postNoContentRoute = createRoute({
  method: 'post',
  path: '/no-content',
  operationId: 'createNoContent',
  responses: { 204: { description: 'No content' } },
} as const)

export const getMultiContentRoute = createRoute({
  method: 'get',
  path: '/multi-content',
  operationId: 'getMultiContent',
  responses: {
    200: {
      description: 'Multiple content types',
      content: {
        'application/json': { schema: DataJsonSchema },
        'application/xml': { schema: DataXmlSchema },
        'text/plain': { schema: z.string() },
        'text/csv': { schema: z.string() },
        'application/octet-stream': { schema: z.file() },
        'image/png': { schema: z.file() },
      },
    },
  },
} as const)

export const postMultiContentRoute = createRoute({
  method: 'post',
  path: '/multi-content',
  operationId: 'postMultiContent',
  request: {
    body: {
      content: {
        'application/json': { schema: DataJsonSchema },
        'multipart/form-data': {
          schema: z.object({
            file: z.file().exactOptional(),
            metadata: z.string().exactOptional(),
          }),
        },
        'application/x-www-form-urlencoded': {
          schema: z.object({
            field1: z.string().exactOptional(),
            field2: z.string().exactOptional(),
          }),
        },
      },
    },
  },
  responses: { 201: { description: 'Created' } },
} as const)

export const getResponseRangesRoute = createRoute({
  method: 'get',
  path: '/response-ranges',
  operationId: 'getResponseRanges',
  responses: {
    200: { description: 'Success' },
    201: { description: 'Created' },
    202: { description: 'Accepted' },
    204: { description: 'No content' },
    301: { description: 'Moved permanently' },
    302: { description: 'Found' },
    304: { description: 'Not modified' },
    400: { description: 'Bad request' },
    401: { description: 'Unauthorized' },
    403: { description: 'Forbidden' },
    404: { description: 'Not found' },
    405: { description: 'Method not allowed' },
    409: { description: 'Conflict' },
    410: { description: 'Gone' },
    412: { description: 'Precondition failed' },
    415: { description: 'Unsupported media type' },
    422: { description: 'Unprocessable entity' },
    429: { description: 'Too many requests' },
    500: { description: 'Internal server error' },
    502: { description: 'Bad gateway' },
    503: { description: 'Service unavailable' },
    504: { description: 'Gateway timeout' },
    default: { description: 'Unexpected error' },
  },
} as const)

export const getDeprecatedRoute = createRoute({
  method: 'get',
  path: '/deprecated',
  summary: 'This operation is deprecated',
  operationId: 'getDeprecated',
  responses: { 200: { description: 'Success' } },
  deprecated: true,
} as const)

export const getNoOperationIdRoute = createRoute({
  method: 'get',
  path: '/no-operation-id',
  summary: 'Operation without operationId',
  responses: { 200: { description: 'Success' } },
} as const)

export const postEmptyBodyRoute = createRoute({
  method: 'post',
  path: '/empty-body',
  operationId: 'postEmptyBody',
  request: { body: { content: { 'application/json': { schema: z.object({}) } } } },
  responses: { 200: { description: 'Success' } },
} as const)

export const getCircularRoute = createRoute({
  method: 'get',
  path: '/circular',
  operationId: 'getCircular',
  responses: {
    200: {
      description: 'Circular reference',
      content: { 'application/json': { schema: TreeNodeSchema } },
    },
  },
} as const)

export const getDeepNestingRoute = createRoute({
  method: 'get',
  path: '/deep-nesting',
  operationId: 'getDeepNesting',
  responses: {
    200: {
      description: 'Deeply nested structure',
      content: { 'application/json': { schema: DeepNestedSchema } },
    },
  },
} as const)

export const getArrayParamsRoute = createRoute({
  method: 'get',
  path: '/array-params',
  operationId: 'getWithArrayParams',
  request: {
    query: z.object({
      ids: z
        .array(
          z
            .string()
            .exactOptional()
            .openapi({
              param: {
                name: 'ids',
                in: 'query',
                required: false,
                schema: { type: 'array', items: { type: 'string' } },
                style: 'form',
                explode: true,
              },
            }),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'ids',
            in: 'query',
            required: false,
            schema: { type: 'array', items: { type: 'string' } },
            style: 'form',
            explode: true,
          },
        }),
      tags: z
        .array(
          z
            .string()
            .exactOptional()
            .openapi({
              param: {
                name: 'tags',
                in: 'query',
                required: false,
                schema: { type: 'array', items: { type: 'string' } },
                style: 'form',
                explode: false,
              },
            }),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'tags',
            in: 'query',
            required: false,
            schema: { type: 'array', items: { type: 'string' } },
            style: 'form',
            explode: false,
          },
        }),
      values: z
        .array(
          z
            .int()
            .exactOptional()
            .openapi({
              param: {
                name: 'values',
                in: 'query',
                schema: { type: 'array', items: { type: 'integer' } },
                style: 'pipeDelimited',
              },
            }),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'values',
            in: 'query',
            schema: { type: 'array', items: { type: 'integer' } },
            style: 'pipeDelimited',
          },
        }),
      coords: z
        .array(
          z
            .number()
            .exactOptional()
            .openapi({
              param: {
                name: 'coords',
                in: 'query',
                schema: { type: 'array', items: { type: 'number' } },
                style: 'spaceDelimited',
              },
            }),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'coords',
            in: 'query',
            schema: { type: 'array', items: { type: 'number' } },
            style: 'spaceDelimited',
          },
        }),
    }),
  },
  responses: { 200: { description: 'Success' } },
} as const)

export const getObjectParamRoute = createRoute({
  method: 'get',
  path: '/object-param',
  operationId: 'getWithObjectParam',
  request: {
    query: z.object({
      filter: z
        .object({
          name: z.string().exactOptional(),
          minPrice: z.number().exactOptional(),
          maxPrice: z.number().exactOptional(),
        })
        .exactOptional()
        .openapi({
          param: {
            name: 'filter',
            in: 'query',
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                minPrice: { type: 'number' },
                maxPrice: { type: 'number' },
              },
            },
            style: 'deepObject',
            explode: true,
          },
        }),
    }),
  },
  responses: { 200: { description: 'Success' } },
} as const)
