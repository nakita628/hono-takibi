import { createRoute, z } from '@hono/zod-openapi'

const JsonSchema2020FeaturesSchema = z
  .object({
    prefixItems: z
      .array(z.null().nullable().optional().openapi({ type: 'null' }))
      .optional()
      .openapi({
        type: 'array',
        prefixItems: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
        items: { type: 'null' },
      }),
    unevaluatedItems: z
      .array(z.any())
      .optional()
      .openapi({ type: 'array', prefixItems: [{ type: 'string' }], unevaluatedItems: false }),
    unevaluatedProperties: z
      .object({ known: z.string().openapi({ type: 'string' }) })
      .partial()
      .openapi({
        type: 'object',
        properties: { known: { type: 'string' } },
        unevaluatedProperties: false,
      }),
    dependentRequired: z
      .object({
        a: z.string().openapi({ type: 'string' }),
        b: z.string().openapi({ type: 'string' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: { a: { type: 'string' }, b: { type: 'string' } },
        dependentRequired: { a: ['b'] },
      }),
    dependentSchemas: z
      .object({ creditCard: z.string().openapi({ type: 'string' }) })
      .partial()
      .openapi({
        type: 'object',
        properties: { creditCard: { type: 'string' } },
        dependentSchemas: {
          creditCard: {
            properties: { billingAddress: { type: 'string' } },
            required: ['billingAddress'],
          },
        },
      }),
    propertyNames: z.object({}).openapi({ type: 'object', propertyNames: { pattern: '^[a-z]+$' } }),
    minContains: z
      .array(z.any())
      .optional()
      .openapi({ type: 'array', contains: { type: 'string' }, minContains: 2 }),
    maxContains: z
      .array(z.any())
      .optional()
      .openapi({ type: 'array', contains: { type: 'number' }, maxContains: 5 }),
    contentEncoding: z.string().optional().openapi({ type: 'string', contentEncoding: 'base64' }),
    contentMediaType: z
      .string()
      .optional()
      .openapi({ type: 'string', contentMediaType: 'application/json' }),
    contentSchema: z
      .string()
      .optional()
      .openapi({
        type: 'string',
        contentMediaType: 'application/json',
        contentSchema: { type: 'object', properties: { nested: { type: 'string' } } },
      }),
  })
  .openapi({
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: 'https://example.com/schemas/features',
    type: 'object',
    properties: {
      prefixItems: {
        type: 'array',
        prefixItems: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
        items: { type: 'null' },
      },
      unevaluatedItems: {
        type: 'array',
        prefixItems: [{ type: 'string' }],
        unevaluatedItems: false,
      },
      unevaluatedProperties: {
        type: 'object',
        properties: { known: { type: 'string' } },
        unevaluatedProperties: false,
      },
      dependentRequired: {
        type: 'object',
        properties: { a: { type: 'string' }, b: { type: 'string' } },
        dependentRequired: { a: ['b'] },
      },
      dependentSchemas: {
        type: 'object',
        properties: { creditCard: { type: 'string' } },
        dependentSchemas: {
          creditCard: {
            properties: { billingAddress: { type: 'string' } },
            required: ['billingAddress'],
          },
        },
      },
      propertyNames: { type: 'object', propertyNames: { pattern: '^[a-z]+$' } },
      minContains: { type: 'array', contains: { type: 'string' }, minContains: 2 },
      maxContains: { type: 'array', contains: { type: 'number' }, maxContains: 5 },
      contentEncoding: { type: 'string', contentEncoding: 'base64' },
      contentMediaType: { type: 'string', contentMediaType: 'application/json' },
      contentSchema: {
        type: 'string',
        contentMediaType: 'application/json',
        contentSchema: { type: 'object', properties: { nested: { type: 'string' } } },
      },
    },
  })
  .openapi('JsonSchema2020Features')

const ItemSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    metadata: z.looseObject({}).openapi({ type: 'object', additionalProperties: true }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      description: { type: 'string' },
      metadata: { type: 'object', additionalProperties: true },
    },
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Example Item',
      description: 'An example item',
    },
  })
  .openapi('Item')

const ItemCreatedEventSchema = z
  .object({
    event: z.literal('item.created'),
    data: ItemSchema,
    timestamp: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    metadata: z.object({}).openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    required: ['event', 'data', 'timestamp'],
    properties: {
      event: { const: 'item.created' },
      data: { $ref: '#/components/schemas/Item' },
      timestamp: { type: 'string', format: 'date-time' },
      metadata: { type: 'object' },
    },
  })
  .openapi('ItemCreatedEvent')

const ItemUpdatedEventSchema = z
  .object({
    event: z.literal('item.updated'),
    data: ItemSchema,
    previousData: ItemSchema,
    timestamp: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    changedFields: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .openapi({
    type: 'object',
    required: ['event', 'data', 'timestamp'],
    properties: {
      event: { const: 'item.updated' },
      data: { $ref: '#/components/schemas/Item' },
      previousData: { $ref: '#/components/schemas/Item' },
      timestamp: { type: 'string', format: 'date-time' },
      changedFields: { type: 'array', items: { type: 'string' } },
    },
  })
  .openapi('ItemUpdatedEvent')

const ItemDeletedEventSchema = z
  .object({
    event: z.literal('item.deleted'),
    itemId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    timestamp: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['event', 'itemId', 'timestamp'],
    properties: {
      event: { const: 'item.deleted' },
      itemId: { type: 'string', format: 'uuid' },
      timestamp: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('ItemDeletedEvent')

const XmlFeaturesSchema = z
  .object({
    attribute: z
      .string()
      .optional()
      .openapi({ type: 'string', xml: { attribute: true, name: 'attr' } }),
    wrapped: z
      .array(
        z
          .string()
          .optional()
          .openapi({ type: 'string', xml: { name: 'item' } }),
      )
      .optional()
      .openapi({
        type: 'array',
        xml: { wrapped: true, name: 'items' },
        items: { type: 'string', xml: { name: 'item' } },
      }),
    namespacedChild: z
      .object({ value: z.string().openapi({ type: 'string' }) })
      .partial()
      .openapi({
        type: 'object',
        xml: { namespace: 'http://example.com/child', prefix: 'ch' },
        properties: { value: { type: 'string' } },
      }),
  })
  .openapi({
    type: 'object',
    xml: { name: 'root', namespace: 'http://example.com/schema', prefix: 'ex' },
    properties: {
      attribute: { type: 'string', xml: { attribute: true, name: 'attr' } },
      wrapped: {
        type: 'array',
        xml: { wrapped: true, name: 'items' },
        items: { type: 'string', xml: { name: 'item' } },
      },
      namespacedChild: {
        type: 'object',
        xml: { namespace: 'http://example.com/child', prefix: 'ch' },
        properties: { value: { type: 'string' } },
      },
    },
  })
  .openapi('XmlFeatures')

const PetSchema = z
  .object({
    petType: z.string().openapi({ type: 'string' }),
    name: z.string().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['petType', 'name'],
    properties: { petType: { type: 'string' }, name: { type: 'string' } },
  })
  .openapi('Pet')

const DogSchema = z
  .intersection(
    PetSchema,
    z
      .object({
        petType: z.literal('dog'),
        breed: z.string().openapi({ type: 'string' }),
        barkVolume: z.int().openapi({ type: 'integer' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          petType: { const: 'dog' },
          breed: { type: 'string' },
          barkVolume: { type: 'integer' },
        },
      }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/Pet' },
      {
        type: 'object',
        properties: {
          petType: { const: 'dog' },
          breed: { type: 'string' },
          barkVolume: { type: 'integer' },
        },
      },
    ],
  })
  .openapi('Dog')

const CatSchema = z
  .intersection(
    PetSchema,
    z
      .object({
        petType: z.literal('cat'),
        breed: z.string().openapi({ type: 'string' }),
        meowPitch: z.int().openapi({ type: 'integer' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          petType: { const: 'cat' },
          breed: { type: 'string' },
          meowPitch: { type: 'integer' },
        },
      }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/Pet' },
      {
        type: 'object',
        properties: {
          petType: { const: 'cat' },
          breed: { type: 'string' },
          meowPitch: { type: 'integer' },
        },
      },
    ],
  })
  .openapi('Cat')

const BirdSchema = z
  .intersection(
    PetSchema,
    z
      .object({
        petType: z.literal('bird'),
        species: z.string().openapi({ type: 'string' }),
        canFly: z.boolean().openapi({ type: 'boolean' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          petType: { const: 'bird' },
          species: { type: 'string' },
          canFly: { type: 'boolean' },
        },
      }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/Pet' },
      {
        type: 'object',
        properties: {
          petType: { const: 'bird' },
          species: { type: 'string' },
          canFly: { type: 'boolean' },
        },
      },
    ],
  })
  .openapi('Bird')

const DiscriminatedUnionSchema = z
  .union([DogSchema, CatSchema, BirdSchema])
  .optional()
  .openapi({
    oneOf: [
      { $ref: '#/components/schemas/Dog' },
      { $ref: '#/components/schemas/Cat' },
      { $ref: '#/components/schemas/Bird' },
    ],
    discriminator: {
      propertyName: 'petType',
      mapping: {
        dog: '#/components/schemas/Dog',
        cat: '#/components/schemas/Cat',
        bird: '#/components/schemas/Bird',
        canine: '#/components/schemas/Dog',
        feline: '#/components/schemas/Cat',
        avian: '#/components/schemas/Bird',
      },
    },
  })
  .openapi('DiscriminatedUnion')

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

const PageParamParamsSchema = z
  .int()
  .min(1)
  .default(1)
  .optional()
  .openapi({
    param: { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
    type: 'integer',
    minimum: 1,
    default: 1,
  })

const LimitParamParamsSchema = z
  .int()
  .min(1)
  .max(100)
  .default(20)
  .optional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
    },
    type: 'integer',
    minimum: 1,
    maximum: 100,
    default: 20,
  })

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const NotFoundResponse = {
  description: 'Resource not found',
  content: { 'application/json': { schema: ErrorSchema } },
}

const ServerErrorResponse = {
  description: 'Internal server error',
  content: { 'application/json': { schema: ErrorSchema } },
}

export const getStreamRoute = createRoute({
  method: 'get',
  path: '/stream',
  tags: ['Advanced'],
  summary: 'Stream data with Server-Sent Events',
  operationId: 'streamData',
  responses: {
    200: {
      description: 'Event stream',
      content: {
        'text/event-stream': { schema: z.string().optional().openapi({ type: 'string' }) },
      },
    },
  },
})

export const postGraphqlRoute = createRoute({
  method: 'post',
  path: '/graphql',
  tags: ['Advanced'],
  summary: 'GraphQL endpoint',
  operationId: 'graphqlQuery',
  request: {
    body: {
      content: {
        'application/graphql': { schema: z.string().optional().openapi({ type: 'string' }) },
        'application/json': {
          schema: z
            .object({
              query: z.string().optional().openapi({ type: 'string' }),
              variables: z.object({}).openapi({ type: 'object' }),
              operationName: z.string().optional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              properties: {
                query: { type: 'string' },
                variables: { type: 'object' },
                operationName: { type: 'string' },
              },
            }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'GraphQL response',
      content: {
        'application/graphql+json': {
          schema: z
            .object({
              data: z.object({}).openapi({ type: 'object' }),
              errors: z
                .array(z.object({}).openapi({ type: 'object' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'object' } }),
            })
            .openapi({
              type: 'object',
              properties: {
                data: { type: 'object' },
                errors: { type: 'array', items: { type: 'object' } },
              },
            }),
        },
      },
    },
  },
})

export const postGrpcGatewayRoute = createRoute({
  method: 'post',
  path: '/grpc-gateway',
  tags: ['Advanced'],
  summary: 'gRPC-Gateway endpoint',
  operationId: 'grpcGateway',
  request: {
    body: {
      content: {
        'application/grpc': {
          schema: z.file().optional().openapi({ type: 'string', format: 'binary' }),
        },
        'application/grpc+proto': {
          schema: z.file().optional().openapi({ type: 'string', format: 'binary' }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'gRPC response',
      content: {
        'application/grpc': {
          schema: z.file().optional().openapi({ type: 'string', format: 'binary' }),
        },
      },
    },
  },
})

export const getDeprecatedEndpointRoute = createRoute({
  method: 'get',
  path: '/deprecated-endpoint',
  tags: ['Deprecated'],
  summary: 'This endpoint is deprecated',
  description:
    '**DEPRECATED**: This endpoint will be removed in v3. Please use `/new-endpoint` instead.',
  operationId: 'deprecatedOperation',
  responses: { 200: { description: 'OK' } },
  deprecated: true,
})
