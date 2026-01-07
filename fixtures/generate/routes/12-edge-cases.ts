import { createRoute, z } from '@hono/zod-openapi'

type TreeNodeType = { value?: string; children?: TreeNodeType[]; parent?: TreeNodeType }

type CompanyType = { name?: string; employees?: PersonType[] }

type PersonType = { name?: string; company?: CompanyType }

const EmptyObjectSchema = z.object({}).openapi('EmptyObject')

const FreeFormObjectSchema = z.looseObject({}).openapi('FreeFormObject')

const StrictObjectSchema = z
  .strictObject({ known: z.string().exactOptional() })
  .openapi('StrictObject')

const TypedAdditionalPropsSchema = z.record(z.string(), z.int()).openapi('TypedAdditionalProps')

const ComplexAdditionalPropsSchema = z
  .record(
    z.string(),
    z.object({ value: z.string().exactOptional(), count: z.int().exactOptional() }),
  )
  .openapi('ComplexAdditionalProps')

const AllPrimitivesSchema = z
  .object({
    stringProp: z.string().exactOptional(),
    numberProp: z.number().exactOptional(),
    integerProp: z.int().exactOptional(),
    booleanProp: z.boolean().exactOptional(),
    nullProp: z.null().nullable().exactOptional(),
  })
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
  .openapi('AllValidations')

const StringEnumSchema = z.enum(['value1', 'value2', 'value3']).openapi('StringEnum')

const IntegerEnumSchema = z.union([z.literal(1), z.literal(2), z.literal(3)]).openapi('IntegerEnum')

const MixedEnumSchema = z
  .union([z.literal('string_value'), z.literal(123), z.literal(true), z.literal(null)])
  .openapi('MixedEnum')

const ConstValueSchema = z
  .object({ type: z.literal('fixed_type').exactOptional(), version: z.literal(1).exactOptional() })
  .openapi('ConstValue')

const NullableStringSchema = z.string().nullable().openapi('NullableString')

const NullableObjectSchema = z
  .object({ name: z.string().exactOptional() })
  .nullable()
  .openapi('NullableObject')

const WithDefaultsSchema = z
  .object({
    status: z.string().default('active').exactOptional(),
    count: z.int().default(0).exactOptional(),
    enabled: z.boolean().default(true).exactOptional(),
    tags: z.array(z.string()).default([]).exactOptional(),
  })
  .openapi('WithDefaults')

const ReadWriteOnlySchema = z
  .object({
    id: z.string().exactOptional().openapi({ readOnly: true }),
    password: z.string().exactOptional().openapi({ writeOnly: true }),
    name: z.string().exactOptional(),
  })
  .openapi('ReadWriteOnly')

const TreeNodeSchema: z.ZodType<TreeNodeType> = z
  .lazy(() =>
    z.object({
      value: z.string().exactOptional(),
      children: z.array(TreeNodeSchema).exactOptional(),
      parent: TreeNodeSchema.exactOptional(),
    }),
  )
  .openapi('TreeNode')

const PersonSchema: z.ZodType<PersonType> = z
  .lazy(() =>
    z.object({ name: z.string().exactOptional(), company: CompanySchema.exactOptional() }),
  )
  .openapi('Person')

const CompanySchema: z.ZodType<CompanyType> = z
  .lazy(() =>
    z.object({
      name: z.string().exactOptional(),
      employees: z.array(PersonSchema).exactOptional(),
    }),
  )
  .openapi('Company')

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
  .openapi('DeepNested')

const MatrixDataSchema = z.array(z.array(z.array(z.number()))).openapi('MatrixData')

const CoordinateSchema = z.array(z.number()).length(3).openapi('Coordinate')

const ComplexUnionSchema = z
  .xor([z.string(), z.number(), z.array(z.string()), z.object({ key: z.string().exactOptional() })])
  .openapi('ComplexUnion')

const MergedSchema = z
  .object({ id: z.string().exactOptional(), name: z.string().exactOptional() })
  .and(z.object({ id: z.uuid().exactOptional(), createdAt: z.iso.datetime().exactOptional() }))
  .openapi('MergedSchema')

const SingleValueEnumSchema = z.literal('only_value').openapi('SingleValueEnum')

const DataJsonSchema = z.object({ data: z.object({}).exactOptional() }).openapi('DataJson')

const DataXmlSchema = z
  .object({ data: z.string().exactOptional() })
  .openapi({ xml: { name: 'data', namespace: 'http://example.com/schema' } })
  .openapi('DataXml')

const SpecialPropertyNamesSchema = z
  .object({
    normal_name: z.string().exactOptional(),
    'kebab-case': z.string().exactOptional(),
    'with.dots': z.string().exactOptional(),
    '@special': z.string().exactOptional(),
    $dollar: z.string().exactOptional(),
  })
  .openapi('SpecialPropertyNames')

const UnicodePropertiesSchema = z
  .object({
    名前: z.string().exactOptional(),
    prénom: z.string().exactOptional(),
    имя: z.string().exactOptional(),
  })
  .openapi('UnicodeProperties')

const RequiredParamParamsSchema = z
  .string()
  .openapi({ param: { name: 'required', in: 'query', required: true, schema: { type: 'string' } } })

const OptionalParamParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: { name: 'optional', in: 'query', required: false, schema: { type: 'string' } },
  })

const DeprecatedParamParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: { name: 'deprecated', in: 'query', deprecated: true, schema: { type: 'string' } },
  })

const AllowEmptyParamParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: { name: 'allowEmpty', in: 'query', allowEmptyValue: true, schema: { type: 'string' } },
  })

const ApiKeyHeaderSecurityScheme = { type: 'apiKey', in: 'header', name: 'X-API-Key' }

const ApiKeyQuerySecurityScheme = { type: 'apiKey', in: 'query', name: 'api_key' }

const ApiKeyCookieSecurityScheme = { type: 'apiKey', in: 'cookie', name: 'session' }

const BasicAuthSecurityScheme = { type: 'http', scheme: 'basic' }

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer' }

const BearerJwtSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const DigestAuthSecurityScheme = { type: 'http', scheme: 'digest' }

const Oauth2ImplicitSecurityScheme = {
  type: 'oauth2',
  flows: {
    implicit: {
      authorizationUrl: 'https://example.com/oauth/authorize',
      scopes: { read: 'Read access', write: 'Write access' },
    },
  },
}

const Oauth2AuthCodeSecurityScheme = {
  type: 'oauth2',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://example.com/oauth/authorize',
      tokenUrl: 'https://example.com/oauth/token',
      scopes: { read: 'Read access' },
    },
  },
}

const Oauth2ClientCredsSecurityScheme = {
  type: 'oauth2',
  flows: {
    clientCredentials: {
      tokenUrl: 'https://example.com/oauth/token',
      scopes: { admin: 'Admin access' },
    },
  },
}

const OpenIdConnectSecurityScheme = {
  type: 'openIdConnect',
  openIdConnectUrl: 'https://example.com/.well-known/openid-configuration',
}

const NoContentResponse = { description: 'No content response' }

const HeadersOnlyResponse = {
  description: 'Response with headers only',
  headers: z.object({
    'X-Custom-Header': { schema: z.string().exactOptional() },
    'X-Another-Header': { schema: z.int().exactOptional() },
  }),
}

const StringHeaderHeaderSchema = z.string().exactOptional()

const IntegerHeaderHeaderSchema = z.int().exactOptional()

const BooleanHeaderHeaderSchema = z.boolean().exactOptional()

const ArrayHeaderHeaderSchema = z.array(z.string().exactOptional()).exactOptional()

const NullExample = { summary: 'Null value example', value: null }

const EmptyObjectExample = { summary: 'Empty object', value: {} }

const EmptyArrayExample = { summary: 'Empty array', value: [] }

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
}

export const getAllMethodsRoute = createRoute({
  method: 'get',
  path: '/all-methods',
  operationId: 'getAllMethods',
  responses: { 200: { description: 'GET response' } },
})

export const putAllMethodsRoute = createRoute({
  method: 'put',
  path: '/all-methods',
  operationId: 'putAllMethods',
  responses: { 200: { description: 'PUT response' } },
})

export const postAllMethodsRoute = createRoute({
  method: 'post',
  path: '/all-methods',
  operationId: 'postAllMethods',
  responses: { 200: { description: 'POST response' } },
})

export const deleteAllMethodsRoute = createRoute({
  method: 'delete',
  path: '/all-methods',
  operationId: 'deleteAllMethods',
  responses: { 200: { description: 'DELETE response' } },
})

export const patchAllMethodsRoute = createRoute({
  method: 'patch',
  path: '/all-methods',
  operationId: 'patchAllMethods',
  responses: { 200: { description: 'PATCH response' } },
})

export const optionsAllMethodsRoute = createRoute({
  method: 'options',
  path: '/all-methods',
  operationId: 'optionsAllMethods',
  responses: { 200: { description: 'OPTIONS response' } },
})

export const headAllMethodsRoute = createRoute({
  method: 'head',
  path: '/all-methods',
  operationId: 'headAllMethods',
  responses: { 200: { description: 'HEAD response' } },
})

export const traceAllMethodsRoute = createRoute({
  method: 'trace',
  path: '/all-methods',
  operationId: 'traceAllMethods',
  responses: { 200: { description: 'TRACE response' } },
})

export const getUsersUserIdPostsPostIdCommentsCommentIdRoute = createRoute({
  method: 'get',
  path: '/users/{userId}/posts/{postId}/comments/{commentId}',
  operationId: 'getNestedResource',
  request: {
    params: z.object({
      userId: z
        .string()
        .openapi({
          param: { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
        }),
      postId: z
        .int()
        .openapi({
          param: { name: 'postId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
      commentId: z
        .uuid()
        .openapi({
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
})

export const getParamsTestPathParamRoute = createRoute({
  method: 'get',
  path: '/params-test/{pathParam}',
  operationId: 'testAllParamLocations',
  request: {
    params: z.object({
      pathParam: z
        .string()
        .openapi({
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
})

export const postNoContentRoute = createRoute({
  method: 'post',
  path: '/no-content',
  operationId: 'createNoContent',
  responses: { 204: { description: 'No content' } },
})

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
})

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
})

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
})

export const getDeprecatedRoute = createRoute({
  method: 'get',
  path: '/deprecated',
  summary: 'This operation is deprecated',
  operationId: 'getDeprecated',
  responses: { 200: { description: 'Success' } },
  deprecated: true,
})

export const getNoOperationIdRoute = createRoute({
  method: 'get',
  path: '/no-operation-id',
  summary: 'Operation without operationId',
  responses: { 200: { description: 'Success' } },
})

export const postEmptyBodyRoute = createRoute({
  method: 'post',
  path: '/empty-body',
  operationId: 'postEmptyBody',
  request: { body: { content: { 'application/json': { schema: z.object({}) } } } },
  responses: { 200: { description: 'Success' } },
})

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
})

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
})

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
})

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
})
