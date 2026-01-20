import { createRoute, z } from '@hono/zod-openapi'

const JsonSchema2020FeaturesSchema = z
  .object({
    prefixItems: z.array(z.null().nullable()).exactOptional(),
    unevaluatedItems: z.array(z.any()).exactOptional(),
    unevaluatedProperties: z.object({ known: z.string().exactOptional() }).exactOptional(),
    dependentRequired: z
      .object({ a: z.string().exactOptional(), b: z.string().exactOptional() })
      .exactOptional(),
    dependentSchemas: z.object({ creditCard: z.string().exactOptional() }).exactOptional(),
    propertyNames: z.object({}).exactOptional(),
    minContains: z.array(z.any()).exactOptional(),
    maxContains: z.array(z.any()).exactOptional(),
    contentEncoding: z.string().exactOptional(),
    contentMediaType: z.string().exactOptional(),
    contentSchema: z.string().exactOptional(),
  })
  .readonly()
  .openapi('JsonSchema2020Features')

const ItemSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    description: z.string().exactOptional(),
    metadata: z.looseObject({}).exactOptional(),
  })
  .openapi({
    required: ['id', 'name'],
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Example Item',
      description: 'An example item',
    },
  })
  .readonly()
  .openapi('Item')

const ItemCreatedEventSchema = z
  .object({
    event: z.literal('item.created'),
    data: ItemSchema,
    timestamp: z.iso.datetime(),
    metadata: z.object({}).exactOptional(),
  })
  .openapi({ required: ['event', 'data', 'timestamp'] })
  .readonly()
  .openapi('ItemCreatedEvent')

const ItemUpdatedEventSchema = z
  .object({
    event: z.literal('item.updated'),
    data: ItemSchema,
    previousData: ItemSchema.exactOptional(),
    timestamp: z.iso.datetime(),
    changedFields: z.array(z.string()).exactOptional(),
  })
  .openapi({ required: ['event', 'data', 'timestamp'] })
  .readonly()
  .openapi('ItemUpdatedEvent')

const ItemDeletedEventSchema = z
  .object({ event: z.literal('item.deleted'), itemId: z.uuid(), timestamp: z.iso.datetime() })
  .openapi({ required: ['event', 'itemId', 'timestamp'] })
  .readonly()
  .openapi('ItemDeletedEvent')

const XmlFeaturesSchema = z
  .object({
    attribute: z
      .string()
      .exactOptional()
      .openapi({ xml: { attribute: true, name: 'attr' } }),
    wrapped: z
      .array(z.string().openapi({ xml: { name: 'item' } }))
      .exactOptional()
      .openapi({ xml: { wrapped: true, name: 'items' } }),
    namespacedChild: z
      .object({ value: z.string().exactOptional() })
      .exactOptional()
      .openapi({ xml: { namespace: 'http://example.com/child', prefix: 'ch' } }),
  })
  .openapi({ xml: { name: 'root', namespace: 'http://example.com/schema', prefix: 'ex' } })
  .readonly()
  .openapi('XmlFeatures')

const PetSchema = z
  .object({ petType: z.string(), name: z.string() })
  .openapi({ required: ['petType', 'name'] })
  .readonly()
  .openapi('Pet')

const DogSchema = PetSchema.and(
  z.object({
    petType: z.literal('dog').exactOptional(),
    breed: z.string().exactOptional(),
    barkVolume: z.int().exactOptional(),
  }),
)
  .readonly()
  .openapi('Dog')

const CatSchema = PetSchema.and(
  z.object({
    petType: z.literal('cat').exactOptional(),
    breed: z.string().exactOptional(),
    meowPitch: z.int().exactOptional(),
  }),
)
  .readonly()
  .openapi('Cat')

const BirdSchema = PetSchema.and(
  z.object({
    petType: z.literal('bird').exactOptional(),
    species: z.string().exactOptional(),
    canFly: z.boolean().exactOptional(),
  }),
)
  .readonly()
  .openapi('Bird')

const DiscriminatedUnionSchema = z
  .xor([DogSchema, CatSchema, BirdSchema])
  .openapi({
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
  .readonly()
  .openapi('DiscriminatedUnion')

const ErrorSchema = z
  .object({ code: z.string(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .readonly()
  .openapi('Error')

const PageParamParamsSchema = z
  .int()
  .min(1)
  .default(1)
  .exactOptional()
  .openapi({
    param: { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
  })
  .readonly()

const LimitParamParamsSchema = z
  .int()
  .min(1)
  .max(100)
  .default(20)
  .exactOptional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
    },
  })
  .readonly()

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } as const

const NotFoundResponse = {
  description: 'Resource not found',
  content: { 'application/json': { schema: ErrorSchema } },
} as const

const ServerErrorResponse = {
  description: 'Internal server error',
  content: { 'application/json': { schema: ErrorSchema } },
} as const

export const getStreamRoute = createRoute({
  method: 'get',
  path: '/stream',
  tags: ['Advanced'],
  summary: 'Stream data with Server-Sent Events',
  operationId: 'streamData',
  responses: {
    200: { description: 'Event stream', content: { 'text/event-stream': { schema: z.string() } } },
  },
} as const)

export const postGraphqlRoute = createRoute({
  method: 'post',
  path: '/graphql',
  tags: ['Advanced'],
  summary: 'GraphQL endpoint',
  operationId: 'graphqlQuery',
  request: {
    body: {
      content: {
        'application/graphql': { schema: z.string() },
        'application/json': {
          schema: z.object({
            query: z.string().exactOptional(),
            variables: z.object({}).exactOptional(),
            operationName: z.string().exactOptional(),
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
          schema: z.object({
            data: z.object({}).exactOptional(),
            errors: z.array(z.object({})).exactOptional(),
          }),
        },
      },
    },
  },
} as const)

export const postGrpcGatewayRoute = createRoute({
  method: 'post',
  path: '/grpc-gateway',
  tags: ['Advanced'],
  summary: 'gRPC-Gateway endpoint',
  operationId: 'grpcGateway',
  request: {
    body: {
      content: {
        'application/grpc': { schema: z.file() },
        'application/grpc+proto': { schema: z.file() },
      },
    },
  },
  responses: {
    200: { description: 'gRPC response', content: { 'application/grpc': { schema: z.file() } } },
  },
} as const)

export const getDeprecatedEndpointRoute = createRoute({
  method: 'get',
  path: '/deprecated-endpoint',
  tags: ['Deprecated'],
  summary: 'This endpoint is deprecated',
  description:
    '**DEPRECATED**: This endpoint will be removed in v3.\n\nPlease use `/new-endpoint` instead.\n',
  operationId: 'deprecatedOperation',
  responses: {
    200: {
      description: 'OK',
      headers: z.object({
        Deprecation: {
          description: 'Deprecation date',
          schema: z.string().exactOptional().openapi({ description: 'Deprecation date' }),
        },
        Sunset: {
          description: 'Removal date',
          schema: z.string().exactOptional().openapi({ description: 'Removal date' }),
        },
        Link: {
          description: 'Link to replacement',
          schema: z.string().exactOptional().openapi({ description: 'Link to replacement' }),
        },
      }),
    },
  },
  deprecated: true,
} as const)
