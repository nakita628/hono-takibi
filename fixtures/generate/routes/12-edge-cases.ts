import { createRoute, z } from '@hono/zod-openapi'

const EmptyObjectSchema = z.object({}).openapi({ type: 'object' }).openapi('EmptyObject')

const FreeFormObjectSchema = z
  .looseObject({})
  .openapi({ type: 'object', additionalProperties: true })
  .openapi('FreeFormObject')

const StrictObjectSchema = z
  .strictObject({ known: z.string().exactOptional().openapi({ type: 'string' }) })
  .openapi({
    type: 'object',
    properties: { known: { type: 'string' } },
    additionalProperties: false,
  })
  .openapi('StrictObject')

const TypedAdditionalPropsSchema = z
  .record(z.string(), z.int().openapi({ type: 'integer' }))
  .openapi({
    type: 'object',
    properties: { id: { type: 'string' } },
    additionalProperties: { type: 'integer' },
  })
  .openapi('TypedAdditionalProps')

const ComplexAdditionalPropsSchema = z
  .record(
    z.string(),
    z
      .object({
        value: z.string().exactOptional().openapi({ type: 'string' }),
        count: z.int().exactOptional().openapi({ type: 'integer' }),
      })
      .openapi({
        type: 'object',
        properties: { value: { type: 'string' }, count: { type: 'integer' } },
      }),
  )
  .openapi({
    type: 'object',
    additionalProperties: {
      type: 'object',
      properties: { value: { type: 'string' }, count: { type: 'integer' } },
    },
  })
  .openapi('ComplexAdditionalProps')

const AllPrimitivesSchema = z
  .object({
    stringProp: z.string().exactOptional().openapi({ type: 'string' }),
    numberProp: z.number().exactOptional().openapi({ type: 'number' }),
    integerProp: z.int().exactOptional().openapi({ type: 'integer' }),
    booleanProp: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    nullProp: z.null().nullable().exactOptional().openapi({ type: 'null' }),
  })
  .openapi({
    type: 'object',
    properties: {
      stringProp: { type: 'string' },
      numberProp: { type: 'number' },
      integerProp: { type: 'integer' },
      booleanProp: { type: 'boolean' },
      nullProp: { type: 'null' },
    },
  })
  .openapi('AllPrimitives')

const AllStringFormatsSchema = z
  .object({
    email: z.email().exactOptional().openapi({ type: 'string', format: 'email' }),
    uuid: z.uuid().exactOptional().openapi({ type: 'string', format: 'uuid' }),
    uri: z.url().exactOptional().openapi({ type: 'string', format: 'uri' }),
    date: z.iso.date().exactOptional().openapi({ type: 'string', format: 'date' }),
    time: z.iso.time().exactOptional().openapi({ type: 'string', format: 'time' }),
    dateTime: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
    duration: z.iso.duration().exactOptional().openapi({ type: 'string', format: 'duration' }),
    binary: z.file().exactOptional().openapi({ type: 'string', format: 'binary' }),
    base64: z.base64().exactOptional().openapi({ type: 'string', format: 'base64' }),
    ipv4: z.ipv4().exactOptional().openapi({ type: 'string', format: 'ipv4' }),
    ipv6: z.ipv6().exactOptional().openapi({ type: 'string', format: 'ipv6' }),
    jwt: z.jwt().exactOptional().openapi({ type: 'string', format: 'jwt' }),
  })
  .openapi({
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      uuid: { type: 'string', format: 'uuid' },
      uri: { type: 'string', format: 'uri' },
      date: { type: 'string', format: 'date' },
      time: { type: 'string', format: 'time' },
      dateTime: { type: 'string', format: 'date-time' },
      duration: { type: 'string', format: 'duration' },
      binary: { type: 'string', format: 'binary' },
      base64: { type: 'string', format: 'base64' },
      ipv4: { type: 'string', format: 'ipv4' },
      ipv6: { type: 'string', format: 'ipv6' },
      jwt: { type: 'string', format: 'jwt' },
    },
  })
  .openapi('AllStringFormats')

const AllNumberFormatsSchema = z
  .object({
    int32: z.int32().exactOptional().openapi({ type: 'integer', format: 'int32' }),
    int64: z.int64().exactOptional().openapi({ type: 'integer', format: 'int64' }),
    float: z.float32().exactOptional().openapi({ type: 'number', format: 'float' }),
    double: z.number().exactOptional().openapi({ type: 'number', format: 'double' }),
    float32: z.float32().exactOptional().openapi({ type: 'number', format: 'float32' }),
    float64: z.float64().exactOptional().openapi({ type: 'number', format: 'float64' }),
  })
  .openapi({
    type: 'object',
    properties: {
      int32: { type: 'integer', format: 'int32' },
      int64: { type: 'integer', format: 'int64' },
      float: { type: 'number', format: 'float' },
      double: { type: 'number', format: 'double' },
      float32: { type: 'number', format: 'float32' },
      float64: { type: 'number', format: 'float64' },
    },
  })
  .openapi('AllNumberFormats')

const AllValidationsSchema = z
  .object({
    minMaxString: z
      .string()
      .min(1)
      .max(100)
      .exactOptional()
      .openapi({ type: 'string', minLength: 1, maxLength: 100 }),
    patternString: z
      .string()
      .regex(/^[a-z]+$/)
      .exactOptional()
      .openapi({ type: 'string', pattern: '^[a-z]+$' }),
    minMaxNumber: z
      .number()
      .min(0)
      .max(100)
      .exactOptional()
      .openapi({ type: 'number', minimum: 0, maximum: 100 }),
    exclusiveMinMax: z
      .number()
      .gt(0)
      .lt(100)
      .exactOptional()
      .openapi({ type: 'number', exclusiveMinimum: 0, exclusiveMaximum: 100 }),
    multipleOf: z
      .number()
      .multipleOf(0.5)
      .exactOptional()
      .openapi({ type: 'number', multipleOf: 0.5 }),
    minMaxItems: z
      .array(z.string().openapi({ type: 'string' }))
      .min(1)
      .max(10)
      .exactOptional()
      .openapi({ type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 10 }),
    uniqueItems: z
      .array(z.string().openapi({ type: 'string' }))
      .exactOptional()
      .openapi({ type: 'array', items: { type: 'string' }, uniqueItems: true }),
  })
  .openapi({
    type: 'object',
    properties: {
      minMaxString: { type: 'string', minLength: 1, maxLength: 100 },
      patternString: { type: 'string', pattern: '^[a-z]+$' },
      minMaxNumber: { type: 'number', minimum: 0, maximum: 100 },
      exclusiveMinMax: { type: 'number', exclusiveMinimum: 0, exclusiveMaximum: 100 },
      multipleOf: { type: 'number', multipleOf: 0.5 },
      minMaxItems: { type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 10 },
      uniqueItems: { type: 'array', items: { type: 'string' }, uniqueItems: true },
    },
  })
  .openapi('AllValidations')

const StringEnumSchema = z
  .enum(['value1', 'value2', 'value3'])
  .openapi({ type: 'string', enum: ['value1', 'value2', 'value3'] })
  .openapi('StringEnum')

const IntegerEnumSchema = z
  .union([z.literal(1), z.literal(2), z.literal(3)])
  .openapi({ type: 'integer', enum: [1, 2, 3] })
  .openapi('IntegerEnum')

const MixedEnumSchema = z
  .union([z.literal('string_value'), z.literal(123), z.literal(true), z.literal(null)])
  .openapi({ enum: ['string_value', 123, true, null] })
  .openapi('MixedEnum')

const ConstValueSchema = z
  .object({
    type: z.literal('fixed_type').exactOptional().openapi({ type: 'string' }),
    version: z.literal(1).exactOptional().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    properties: {
      type: { type: 'string', const: 'fixed_type' },
      version: { type: 'integer', const: 1 },
    },
  })
  .openapi('ConstValue')

const NullableStringSchema = z
  .string()
  .nullable()
  .openapi({ type: ['string', 'null'] })
  .openapi('NullableString')

const NullableObjectSchema = z
  .object({ name: z.string().exactOptional().openapi({ type: 'string' }) })
  .nullable()
  .openapi({ type: ['object', 'null'], properties: { name: { type: 'string' } } })
  .openapi('NullableObject')

const WithDefaultsSchema = z
  .object({
    status: z
      .string()
      .default('active')
      .exactOptional()
      .openapi({ type: 'string', default: 'active' }),
    count: z.int().default(0).exactOptional().openapi({ type: 'integer', default: 0 }),
    enabled: z.boolean().default(true).exactOptional().openapi({ type: 'boolean', default: true }),
    tags: z
      .array(z.string().openapi({ type: 'string' }))
      .default([])
      .exactOptional()
      .openapi({ type: 'array', items: { type: 'string' }, default: [] }),
  })
  .openapi({
    type: 'object',
    properties: {
      status: { type: 'string', default: 'active' },
      count: { type: 'integer', default: 0 },
      enabled: { type: 'boolean', default: true },
      tags: { type: 'array', items: { type: 'string' }, default: [] },
    },
  })
  .openapi('WithDefaults')

const ReadWriteOnlySchema = z
  .object({
    id: z.string().exactOptional().openapi({ type: 'string', readOnly: true }),
    password: z.string().exactOptional().openapi({ type: 'string', writeOnly: true }),
    name: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string', readOnly: true },
      password: { type: 'string', writeOnly: true },
      name: { type: 'string' },
    },
  })
  .openapi('ReadWriteOnly')

type TreeNodeType = { value?: string; children?: TreeNodeType[]; parent?: TreeNodeType }

const TreeNodeSchema: z.ZodType<TreeNodeType> = z
  .lazy(() =>
    z
      .object({
        value: z.string().exactOptional().openapi({ type: 'string' }),
        children: z
          .array(TreeNodeSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/TreeNode' } }),
        parent: TreeNodeSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        properties: {
          value: { type: 'string' },
          children: { type: 'array', items: { $ref: '#/components/schemas/TreeNode' } },
          parent: { $ref: '#/components/schemas/TreeNode' },
        },
      }),
  )
  .openapi('TreeNode')

const CompanySchema: z.ZodType<CompanyType> = z
  .lazy(() =>
    z
      .object({
        name: z.string().exactOptional().openapi({ type: 'string' }),
        employees: z
          .array(PersonSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Person' } }),
      })
      .openapi({
        type: 'object',
        properties: {
          name: { type: 'string' },
          employees: { type: 'array', items: { $ref: '#/components/schemas/Person' } },
        },
      }),
  )
  .openapi('Company')

type PersonType = { name?: string; company?: z.infer<typeof CompanySchema> }

const PersonSchema: z.ZodType<PersonType> = z
  .lazy(() =>
    z
      .object({
        name: z.string().exactOptional().openapi({ type: 'string' }),
        company: CompanySchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        properties: { name: { type: 'string' }, company: { $ref: '#/components/schemas/Company' } },
      }),
  )
  .openapi('Person')

type CompanyType = { name?: string; employees?: z.infer<typeof PersonSchema>[] }

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
                    level5: z
                      .object({ value: z.string().exactOptional().openapi({ type: 'string' }) })
                      .exactOptional()
                      .openapi({ type: 'object', properties: { value: { type: 'string' } } }),
                  })
                  .exactOptional()
                  .openapi({
                    type: 'object',
                    properties: {
                      level5: { type: 'object', properties: { value: { type: 'string' } } },
                    },
                  }),
              })
              .exactOptional()
              .openapi({
                type: 'object',
                properties: {
                  level4: {
                    type: 'object',
                    properties: {
                      level5: { type: 'object', properties: { value: { type: 'string' } } },
                    },
                  },
                },
              }),
          })
          .exactOptional()
          .openapi({
            type: 'object',
            properties: {
              level3: {
                type: 'object',
                properties: {
                  level4: {
                    type: 'object',
                    properties: {
                      level5: { type: 'object', properties: { value: { type: 'string' } } },
                    },
                  },
                },
              },
            },
          }),
      })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: {
          level2: {
            type: 'object',
            properties: {
              level3: {
                type: 'object',
                properties: {
                  level4: {
                    type: 'object',
                    properties: {
                      level5: { type: 'object', properties: { value: { type: 'string' } } },
                    },
                  },
                },
              },
            },
          },
        },
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      level1: {
        type: 'object',
        properties: {
          level2: {
            type: 'object',
            properties: {
              level3: {
                type: 'object',
                properties: {
                  level4: {
                    type: 'object',
                    properties: {
                      level5: { type: 'object', properties: { value: { type: 'string' } } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  .openapi('DeepNested')

const MatrixDataSchema = z
  .array(
    z
      .array(
        z
          .array(z.number().openapi({ type: 'number' }))
          .openapi({ type: 'array', items: { type: 'number' } }),
      )
      .openapi({ type: 'array', items: { type: 'array', items: { type: 'number' } } }),
  )
  .openapi({
    type: 'array',
    items: { type: 'array', items: { type: 'array', items: { type: 'number' } } },
  })
  .openapi('MatrixData')

const CoordinateSchema = z
  .array(z.number().openapi({ type: 'number' }))
  .length(3)
  .openapi({
    type: 'array',
    items: [{ type: 'number' }, { type: 'number' }, { type: 'number' }],
    minItems: 3,
    maxItems: 3,
  })
  .openapi('Coordinate')

const ComplexUnionSchema = z
  .union([
    z.string().openapi({ type: 'string' }),
    z.number().openapi({ type: 'number' }),
    z
      .array(z.string().openapi({ type: 'string' }))
      .openapi({ type: 'array', items: { type: 'string' } }),
    z
      .object({ key: z.string().exactOptional().openapi({ type: 'string' }) })
      .openapi({ type: 'object', properties: { key: { type: 'string' } } }),
  ])
  .openapi({
    oneOf: [
      { type: 'string' },
      { type: 'number' },
      { type: 'array', items: { type: 'string' } },
      { type: 'object', properties: { key: { type: 'string' } } },
    ],
  })
  .openapi('ComplexUnion')

const MergedSchema = z
  .intersection(
    z
      .object({
        id: z.string().exactOptional().openapi({ type: 'string' }),
        name: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        properties: { id: { type: 'string' }, name: { type: 'string' } },
      }),
    z
      .object({
        id: z.uuid().exactOptional().openapi({ type: 'string', format: 'uuid' }),
        createdAt: z.iso
          .datetime()
          .exactOptional()
          .openapi({ type: 'string', format: 'date-time' }),
      })
      .openapi({
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      }),
  )
  .openapi({
    allOf: [
      { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' } } },
      {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    ],
  })
  .openapi('MergedSchema')

const SingleValueEnumSchema = z
  .literal('only_value')
  .openapi({ type: 'string', enum: ['only_value'] })
  .openapi('SingleValueEnum')

const DataJsonSchema = z
  .object({ data: z.object({}).exactOptional().openapi({ type: 'object' }) })
  .openapi({ type: 'object', properties: { data: { type: 'object' } } })
  .openapi('DataJson')

const DataXmlSchema = z
  .object({ data: z.string().exactOptional().openapi({ type: 'string' }) })
  .openapi({
    type: 'object',
    properties: { data: { type: 'string' } },
    xml: { name: 'data', namespace: 'http://example.com/schema' },
  })
  .openapi('DataXml')

const SpecialPropertyNamesSchema = z
  .object({
    normal_name: z.string().exactOptional().openapi({ type: 'string' }),
    'kebab-case': z.string().exactOptional().openapi({ type: 'string' }),
    'with.dots': z.string().exactOptional().openapi({ type: 'string' }),
    '@special': z.string().exactOptional().openapi({ type: 'string' }),
    $dollar: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    properties: {
      normal_name: { type: 'string' },
      'kebab-case': { type: 'string' },
      'with.dots': { type: 'string' },
      '@special': { type: 'string' },
      $dollar: { type: 'string' },
    },
  })
  .openapi('SpecialPropertyNames')

const UnicodePropertiesSchema = z
  .object({
    名前: z.string().exactOptional().openapi({ type: 'string' }),
    prénom: z.string().exactOptional().openapi({ type: 'string' }),
    имя: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    properties: { 名前: { type: 'string' }, prénom: { type: 'string' }, имя: { type: 'string' } },
  })
  .openapi('UnicodeProperties')

const RequiredParamParamsSchema = z
  .string()
  .openapi({
    param: { name: 'required', in: 'query', required: true, schema: { type: 'string' } },
    type: 'string',
  })

const OptionalParamParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: { name: 'optional', in: 'query', required: false, schema: { type: 'string' } },
    type: 'string',
  })

const DeprecatedParamParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: { name: 'deprecated', in: 'query', deprecated: true, schema: { type: 'string' } },
    type: 'string',
  })

const AllowEmptyParamParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: { name: 'allowEmpty', in: 'query', allowEmptyValue: true, schema: { type: 'string' } },
    type: 'string',
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

const HeadersOnlyResponse = { description: 'Response with headers only' }

const StringHeader = z.string().exactOptional().openapi({ type: 'string' })

const IntegerHeader = z.int().exactOptional().openapi({ type: 'integer' })

const BooleanHeader = z.boolean().exactOptional().openapi({ type: 'boolean' })

const ArrayHeader = z
  .array(z.string().exactOptional().openapi({ type: 'string' }))
  .exactOptional()
  .openapi({ type: 'array', items: { type: 'string' } })

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
          type: 'string',
        }),
      postId: z
        .int()
        .openapi({
          param: { name: 'postId', in: 'path', required: true, schema: { type: 'integer' } },
          type: 'integer',
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
          type: 'string',
          format: 'uuid',
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
          type: 'string',
        }),
    }),
    query: z.object({
      queryParam: z
        .string()
        .exactOptional()
        .openapi({
          param: { name: 'queryParam', in: 'query', required: false, schema: { type: 'string' } },
          type: 'string',
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
          type: 'string',
        }),
    }),
    cookies: z.object({
      session_id: z
        .string()
        .exactOptional()
        .openapi({
          param: { name: 'session_id', in: 'cookie', required: false, schema: { type: 'string' } },
          type: 'string',
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
        'text/plain': { schema: z.string().openapi({ type: 'string' }) },
        'text/csv': { schema: z.string().openapi({ type: 'string' }) },
        'application/octet-stream': {
          schema: z.file().openapi({ type: 'string', format: 'binary' }),
        },
        'image/png': { schema: z.file().openapi({ type: 'string', format: 'binary' }) },
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
          schema: z
            .object({
              file: z.file().exactOptional().openapi({ type: 'string', format: 'binary' }),
              metadata: z.string().exactOptional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              properties: {
                file: { type: 'string', format: 'binary' },
                metadata: { type: 'string' },
              },
            }),
        },
        'application/x-www-form-urlencoded': {
          schema: z
            .object({
              field1: z.string().exactOptional().openapi({ type: 'string' }),
              field2: z.string().exactOptional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              properties: { field1: { type: 'string' }, field2: { type: 'string' } },
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
  request: {
    body: { content: { 'application/json': { schema: z.object({}).openapi({ type: 'object' }) } } },
  },
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
              type: 'string',
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
          type: 'array',
          items: { type: 'string' },
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
              type: 'string',
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
          type: 'array',
          items: { type: 'string' },
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
              type: 'integer',
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
          type: 'array',
          items: { type: 'integer' },
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
              type: 'number',
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
          type: 'array',
          items: { type: 'number' },
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
          name: z.string().exactOptional().openapi({ type: 'string' }),
          minPrice: z.number().exactOptional().openapi({ type: 'number' }),
          maxPrice: z.number().exactOptional().openapi({ type: 'number' }),
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
          type: 'object',
          properties: {
            name: { type: 'string' },
            minPrice: { type: 'number' },
            maxPrice: { type: 'number' },
          },
        }),
    }),
  },
  responses: { 200: { description: 'Success' } },
})
