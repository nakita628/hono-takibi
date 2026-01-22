import { createRoute, z } from '@hono/zod-openapi'

const NestedCustomFieldSchema: z.ZodType<NestedCustomFieldType> = z
  .lazy(() => z.record(z.string(), CustomFieldValueSchema))
  .openapi('NestedCustomField')

type CustomFieldValueType =
  | string
  | number
  | boolean
  | string[]
  | z.infer<typeof NestedCustomFieldSchema>

const CustomFieldValueSchema: z.ZodType<CustomFieldValueType> = z
  .lazy(() =>
    z.xor([z.string(), z.number(), z.boolean(), z.array(z.string()), NestedCustomFieldSchema]),
  )
  .openapi('CustomFieldValue')

type NestedCustomFieldType = { [key: string]: z.infer<typeof CustomFieldValueSchema> }

type FilterExpressionType = {
  field?: string
  operator?:
    | 'eq'
    | 'ne'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'in'
    | 'nin'
    | 'contains'
    | 'startsWith'
    | 'endsWith'
  value?: string | number | boolean | string[]
  and?: FilterExpressionType[]
  or?: FilterExpressionType[]
}

const EntityIdSchema = z
  .uuid()
  .openapi({ description: 'Unique entity identifier' })
  .openapi('EntityId')

const EntityTypeSchema = z
  .enum(['user', 'organization', 'project', 'resource'])
  .openapi({ description: 'Entity type discriminator' })
  .openapi('EntityType')

const EntityStatusSchema = z
  .enum(['active', 'inactive', 'pending', 'archived'])
  .openapi('EntityStatus')

const TagSchema = z
  .object({ key: z.string().max(50), value: z.string().max(200) })
  .openapi({ required: ['key', 'value'] })
  .openapi('Tag')

const EntityAttributesSchema = z
  .looseObject({
    name: z.string().exactOptional(),
    description: z.string().exactOptional(),
    status: EntityStatusSchema.exactOptional(),
    tags: z.array(TagSchema).exactOptional(),
    customFields: z.record(z.string(), CustomFieldValueSchema).exactOptional(),
  })
  .openapi('EntityAttributes')

const ResourceIdentifierSchema = z
  .object({ type: EntityTypeSchema, id: EntityIdSchema })
  .openapi({ required: ['type', 'id'] })
  .openapi('ResourceIdentifier')

const RelationshipLinkUrlsSchema = z
  .object({ self: z.url().exactOptional(), related: z.url().exactOptional() })
  .openapi('RelationshipLinkUrls')

const RelationshipMetaSchema = z
  .object({ count: z.int().exactOptional(), createdAt: z.iso.datetime().exactOptional() })
  .openapi('RelationshipMeta')

const RelationshipLinkSchema = z
  .object({
    data: ResourceIdentifierSchema.exactOptional(),
    links: RelationshipLinkUrlsSchema.exactOptional(),
    meta: RelationshipMetaSchema.exactOptional(),
  })
  .openapi('RelationshipLink')

const RelationshipLinksSchema = z
  .object({
    data: z.array(ResourceIdentifierSchema).exactOptional(),
    links: RelationshipLinkUrlsSchema.exactOptional(),
    meta: RelationshipMetaSchema.exactOptional(),
  })
  .openapi('RelationshipLinks')

const EntityRelationshipsSchema = z
  .object({
    parent: RelationshipLinkSchema.exactOptional(),
    children: RelationshipLinksSchema.exactOptional(),
    owner: RelationshipLinkSchema.exactOptional(),
    members: RelationshipLinksSchema.exactOptional(),
  })
  .openapi('EntityRelationships')

const PermissionsSchema = z
  .object({
    canRead: z.boolean().exactOptional(),
    canWrite: z.boolean().exactOptional(),
    canDelete: z.boolean().exactOptional(),
    canShare: z.boolean().exactOptional(),
  })
  .openapi('Permissions')

const EntityMetaSchema = z
  .object({
    createdAt: z.iso.datetime().exactOptional(),
    updatedAt: z.iso.datetime().exactOptional(),
    version: z.int().exactOptional(),
    etag: z.string().exactOptional(),
    permissions: PermissionsSchema.exactOptional(),
  })
  .openapi('EntityMeta')

const EntityLinksSchema = z
  .object({
    self: z.url().exactOptional(),
    collection: z.url().exactOptional(),
    related: z.record(z.string(), z.url()).exactOptional(),
  })
  .openapi('EntityLinks')

const EntitySchema = z
  .object({
    id: EntityIdSchema,
    type: EntityTypeSchema,
    attributes: EntityAttributesSchema,
    relationships: EntityRelationshipsSchema.exactOptional(),
    meta: EntityMetaSchema.exactOptional(),
    links: EntityLinksSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'type', 'attributes'] })
  .openapi('Entity')

const ListMetaSchema = z
  .object({
    total: z.int().exactOptional(),
    page: z.int().exactOptional(),
    perPage: z.int().exactOptional(),
    totalPages: z.int().exactOptional(),
  })
  .openapi('ListMeta')

const PaginationLinksSchema = z
  .object({
    self: z.url().exactOptional(),
    first: z.url().exactOptional(),
    last: z.url().exactOptional(),
    prev: z.url().exactOptional(),
    next: z.url().exactOptional(),
  })
  .openapi('PaginationLinks')

const EntityListWrapperSchema = z
  .object({
    data: z.array(EntitySchema),
    included: z.array(EntitySchema).exactOptional(),
    meta: ListMetaSchema.exactOptional(),
    links: PaginationLinksSchema.exactOptional(),
  })
  .openapi({ required: ['data'] })
  .openapi('EntityListWrapper')

const ResponseMetaSchema = z
  .object({ requestId: z.uuid().exactOptional(), processingTime: z.number().exactOptional() })
  .openapi('ResponseMeta')

const EntityWrapperSchema = z
  .object({
    data: EntitySchema,
    included: z.array(EntitySchema).exactOptional(),
    meta: ResponseMetaSchema.exactOptional(),
  })
  .openapi({ required: ['data'] })
  .openapi('EntityWrapper')

const CreateEntityInputSchema = z
  .object({
    type: EntityTypeSchema,
    attributes: EntityAttributesSchema,
    relationships: EntityRelationshipsSchema.exactOptional(),
  })
  .openapi({ required: ['type', 'attributes'] })
  .openapi('CreateEntityInput')

const UpdateEntityInputSchema = z
  .object({
    attributes: EntityAttributesSchema.exactOptional(),
    relationships: EntityRelationshipsSchema.exactOptional(),
  })
  .openapi('UpdateEntityInput')

const CreateRelationshipInputSchema = z
  .object({
    type: z.string(),
    targetId: EntityIdSchema,
    meta: RelationshipMetaSchema.exactOptional(),
  })
  .openapi({ required: ['type', 'targetId'] })
  .openapi('CreateRelationshipInput')

const ErrorSourceSchema = z
  .object({
    pointer: z.string().exactOptional(),
    parameter: z.string().exactOptional(),
    header: z.string().exactOptional(),
  })
  .openapi('ErrorSource')

const ErrorMetaSchema = z.looseObject({}).openapi('ErrorMeta')

const ErrorSchema = z
  .object({
    id: z.uuid().exactOptional(),
    status: z.string(),
    code: z.string(),
    title: z.string(),
    detail: z.string().exactOptional(),
    source: ErrorSourceSchema.exactOptional(),
    meta: ErrorMetaSchema.exactOptional(),
  })
  .openapi({ required: ['status', 'code', 'title'] })
  .openapi('Error')

const ErrorListSchema = z
  .object({ errors: z.array(ErrorSchema), meta: ResponseMetaSchema.exactOptional() })
  .openapi({ required: ['errors'] })
  .openapi('ErrorList')

const BatchOperationSchema = z
  .object({
    id: z.string().exactOptional(),
    method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
    path: z.string(),
    headers: z.record(z.string(), z.string()).exactOptional(),
    body: z.xor([CreateEntityInputSchema, UpdateEntityInputSchema]).exactOptional(),
  })
  .openapi({ required: ['method', 'path'] })
  .openapi('BatchOperation')

const BatchResponseItemSchema = z
  .object({
    id: z.string(),
    status: z.int(),
    headers: z.record(z.string(), z.string()).exactOptional(),
    body: z.xor([EntityWrapperSchema, ErrorListSchema]).exactOptional(),
  })
  .openapi({ required: ['id', 'status'] })
  .openapi('BatchResponseItem')

const BatchResultSchema = z
  .object({ responses: z.array(BatchResponseItemSchema), meta: ResponseMetaSchema.exactOptional() })
  .openapi({ required: ['responses'] })
  .openapi('BatchResult')

const WebhookEventSchema = z
  .enum(['entity.created', 'entity.updated', 'entity.deleted'])
  .openapi('WebhookEvent')

const WebhookMetaSchema = z
  .object({
    triggeredBy: ResourceIdentifierSchema.exactOptional(),
    correlationId: z.string().exactOptional(),
  })
  .openapi('WebhookMeta')

const WebhookPayloadSchema = z
  .object({
    id: z.uuid().exactOptional(),
    event: WebhookEventSchema,
    data: EntitySchema,
    previousData: EntitySchema.exactOptional(),
    timestamp: z.iso.datetime(),
    meta: WebhookMetaSchema.exactOptional(),
  })
  .openapi({ required: ['event', 'data', 'timestamp'] })
  .openapi('WebhookPayload')

const FilterExpressionSchema: z.ZodType<FilterExpressionType> = z
  .lazy(() =>
    z.object({
      field: z.string().exactOptional(),
      operator: z
        .enum([
          'eq',
          'ne',
          'gt',
          'gte',
          'lt',
          'lte',
          'in',
          'nin',
          'contains',
          'startsWith',
          'endsWith',
        ])
        .exactOptional(),
      value: z.xor([z.string(), z.number(), z.boolean(), z.array(z.string())]).exactOptional(),
      and: z.array(FilterExpressionSchema).exactOptional(),
      or: z.array(FilterExpressionSchema).exactOptional(),
    }),
  )
  .openapi('FilterExpression')

const PaginationInputSchema = z
  .object({
    page: z.int().min(1).default(1).exactOptional(),
    perPage: z.int().min(1).max(100).default(20).exactOptional(),
    cursor: z.string().exactOptional(),
  })
  .openapi('PaginationInput')

const SortExpressionSchema = z
  .object({
    field: z.string().exactOptional(),
    direction: z.enum(['asc', 'desc']).default('asc').exactOptional(),
  })
  .openapi('SortExpression')

const EntityIdExample = {
  summary: 'Valid entity ID',
  value: '550e8400-e29b-41d4-a716-446655440000',
}

const EntityIdPathParamsSchema = EntityIdSchema.openapi({
  param: {
    name: 'entityId',
    in: 'path',
    required: true,
    description: 'Entity unique identifier',
    examples: { validUuid: EntityIdExample },
  },
})

const SimpleFilterExample = {
  summary: 'Simple filter',
  value: { field: 'status', operator: 'eq', value: 'active' },
}

const ComplexFilterExample = {
  summary: 'Complex filter with AND/OR',
  value: {
    and: [
      { field: 'status', operator: 'eq', value: 'active' },
      {
        or: [
          { field: 'type', operator: 'eq', value: 'user' },
          { field: 'type', operator: 'eq', value: 'project' },
        ],
      },
    ],
  },
}

const FilterParamParamsSchema = FilterExpressionSchema.exactOptional().openapi({
  param: {
    name: 'filter',
    in: 'query',
    description: 'Filter expression',
    required: false,
    style: 'deepObject',
    explode: true,
    examples: { simpleFilter: SimpleFilterExample, complexFilter: ComplexFilterExample },
  },
})

const PaginationParamParamsSchema = PaginationInputSchema.exactOptional().openapi({
  param: {
    name: 'page',
    in: 'query',
    description: 'Pagination parameters',
    required: false,
    style: 'deepObject',
    explode: true,
  },
})

const SortParamParamsSchema = z
  .array(SortExpressionSchema)
  .exactOptional()
  .openapi({
    param: {
      name: 'sort',
      in: 'query',
      description: 'Sort expression',
      required: false,
      style: 'form',
      explode: true,
    },
  })

const IncludeParamParamsSchema = z
  .array(
    z
      .enum(['parent', 'children', 'owner', 'members'])
      .exactOptional()
      .openapi({
        param: {
          name: 'include',
          in: 'query',
          description: 'Related resources to include',
          required: false,
          style: 'form',
          explode: false,
        },
      }),
  )
  .exactOptional()
  .openapi({
    param: {
      name: 'include',
      in: 'query',
      description: 'Related resources to include',
      required: false,
      style: 'form',
      explode: false,
    },
  })

const EtagExample = { summary: 'ETag value', value: '"33a64df551425fcc55e4d42a148795d9f25f89d4"' }

const IfMatchHeaderParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: {
      name: 'If-Match',
      in: 'header',
      description: 'ETag for optimistic locking',
      required: false,
      examples: { etag: EtagExample },
    },
  })

const IfNoneMatchHeaderParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: {
      name: 'If-None-Match',
      in: 'header',
      description: 'ETag for cache validation',
      required: false,
    },
  })

const IdempotencyKeyExample = {
  summary: 'Idempotency key',
  value: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
}

const IdempotencyKeyHeaderParamsSchema = z
  .uuid()
  .exactOptional()
  .openapi({
    param: {
      name: 'Idempotency-Key',
      in: 'header',
      description: 'Idempotency key for safe retries',
      required: false,
      examples: { idempotencyKey: IdempotencyKeyExample },
    },
  })

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const CreateUserExample = {
  summary: 'Create user request',
  value: { type: 'user', attributes: { name: 'John Doe', status: 'active' } },
}

const CreateProjectExample = {
  summary: 'Create project request',
  value: {
    type: 'project',
    attributes: { name: 'New Project', description: 'Project description' },
  },
}

const CreateEntityBodyRequestBody = {
  description: 'Create entity request',
  content: {
    'application/json': {
      schema: CreateEntityInputSchema,
      examples: { createUser: CreateUserExample, createProject: CreateProjectExample },
    },
  },
  required: true,
}

const UpdateEntityExample = {
  summary: 'Update entity request',
  value: { attributes: { name: 'Updated Name', status: 'inactive' } },
}

const UpdateEntityBodyRequestBody = {
  description: 'Update entity request',
  content: {
    'application/json': {
      schema: UpdateEntityInputSchema,
      examples: { updateEntity: UpdateEntityExample },
    },
  },
  required: true,
}

const CreateRelationshipBodyRequestBody = {
  description: 'Create relationship request',
  content: { 'application/json': { schema: CreateRelationshipInputSchema } },
  required: true,
}

const BatchOperationBodyRequestBody = {
  description: 'Batch operation request',
  content: {
    'application/json': {
      schema: z
        .object({ operations: z.array(BatchOperationSchema).min(1).max(100) })
        .openapi({ required: ['operations'] }),
    },
  },
  required: true,
}

const XTotalCountHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Total number of items' })

const XPageHeaderSchema = z.int().exactOptional().openapi({ description: 'Current page number' })

const XPerPageHeaderSchema = z.int().exactOptional().openapi({ description: 'Items per page' })

const LinkHeaderHeaderSchema = z
  .string()
  .exactOptional()
  .openapi({ description: 'Pagination links (RFC 5988)' })

const XRequestIdHeaderSchema = z
  .uuid()
  .openapi({
    description: 'Unique request identifier',
    example: { $ref: '#/components/examples/RequestIdExample' },
  })

const EntityListExample = {
  summary: 'Entity list',
  value: {
    data: [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        type: 'user',
        attributes: { name: 'John Doe' },
      },
    ],
    meta: { total: 1, page: 1, perPage: 20 },
  },
}

const EntityListResponse = {
  description: 'List of entities',
  headers: z.object({
    'X-Total-Count': XTotalCountHeaderSchema,
    'X-Page': XPageHeaderSchema,
    'X-Per-Page': XPerPageHeaderSchema,
    Link: LinkHeaderHeaderSchema,
    'X-Request-Id': XRequestIdHeaderSchema,
  }),
  content: {
    'application/json': {
      schema: EntityListWrapperSchema,
      examples: { entityList: EntityListExample },
    },
  },
}

const ETagHeaderSchema = z.string().openapi({ description: 'Entity tag' })

const LastModifiedHeaderSchema = z.iso
  .datetime()
  .exactOptional()
  .openapi({ description: 'Last modification date' })

const EntityExample = {
  summary: 'Complete entity',
  value: {
    data: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      type: 'user',
      attributes: { name: 'John Doe', status: 'active' },
      relationships: {
        owner: { data: { type: 'organization', id: '660e8400-e29b-41d4-a716-446655440001' } },
      },
      meta: { createdAt: '2024-01-15T10:30:00Z', version: 1 },
    },
  },
}

const EntityResponse = {
  description: 'Single entity',
  headers: z.object({
    ETag: ETagHeaderSchema,
    'Last-Modified': LastModifiedHeaderSchema,
    'X-Request-Id': XRequestIdHeaderSchema,
  }),
  content: {
    'application/json': { schema: EntityWrapperSchema, examples: { entity: EntityExample } },
  },
}

const LocationHeaderSchema = z.url().openapi({ description: 'Created resource URL' })

const CreatedEntityExample = {
  summary: 'Newly created entity',
  value: {
    data: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      type: 'user',
      attributes: { name: 'John Doe', status: 'active' },
    },
  },
}

const EntityCreatedResponse = {
  description: 'Entity created',
  headers: z.object({
    Location: LocationHeaderSchema,
    ETag: ETagHeaderSchema,
    'X-Request-Id': XRequestIdHeaderSchema,
  }),
  content: {
    'application/json': {
      schema: EntityWrapperSchema,
      examples: { createdEntity: CreatedEntityExample },
    },
  },
}

const RelationshipListResponse = {
  description: 'List of relationships',
  headers: z.object({ 'X-Request-Id': XRequestIdHeaderSchema }),
  content: { 'application/json': { schema: RelationshipLinksSchema } },
}

const RelationshipResponse = {
  description: 'Single relationship',
  headers: z.object({ 'X-Request-Id': XRequestIdHeaderSchema }),
  content: { 'application/json': { schema: RelationshipLinkSchema } },
}

const BatchResultResponse = {
  description: 'Batch operation result (all succeeded)',
  headers: z.object({ 'X-Request-Id': XRequestIdHeaderSchema }),
  content: { 'application/json': { schema: BatchResultSchema } },
}

const MultiStatusResponse = {
  description: 'Batch operation result (partial success)',
  headers: z.object({ 'X-Request-Id': XRequestIdHeaderSchema }),
  content: { 'application/json': { schema: BatchResultSchema } },
}

const NoContentResponse = {
  description: 'No content',
  headers: z.object({ 'X-Request-Id': XRequestIdHeaderSchema }),
}

const NotModifiedResponse = {
  description: 'Not modified',
  headers: z.object({ ETag: ETagHeaderSchema, 'X-Request-Id': XRequestIdHeaderSchema }),
}

const ValidationErrorExample = {
  summary: 'Validation error response',
  value: {
    errors: [
      {
        status: '400',
        code: 'VALIDATION_ERROR',
        title: 'Validation Failed',
        detail: 'Name is required',
        source: { pointer: '/data/attributes/name' },
      },
    ],
  },
}

const ValidationErrorResponse = {
  description: 'Validation error',
  headers: z.object({ 'X-Request-Id': XRequestIdHeaderSchema }),
  content: {
    'application/json': {
      schema: ErrorListSchema,
      examples: { validationError: ValidationErrorExample },
    },
  },
}

const WWWAuthenticateHeaderSchema = z.string().openapi({ description: 'Authentication challenge' })

const UnauthorizedResponse = {
  description: 'Unauthorized',
  headers: z.object({
    'WWW-Authenticate': WWWAuthenticateHeaderSchema,
    'X-Request-Id': XRequestIdHeaderSchema,
  }),
  content: { 'application/json': { schema: ErrorListSchema } },
}

const NotFoundErrorExample = {
  summary: 'Not found error response',
  value: {
    errors: [
      {
        status: '404',
        code: 'NOT_FOUND',
        title: 'Resource Not Found',
        detail: 'Entity with ID 550e8400-e29b-41d4-a716-446655440000 not found',
      },
    ],
  },
}

const NotFoundResponse = {
  description: 'Not found',
  headers: z.object({ 'X-Request-Id': XRequestIdHeaderSchema }),
  content: {
    'application/json': { schema: ErrorListSchema, examples: { notFound: NotFoundErrorExample } },
  },
}

const ConflictResponse = {
  description: 'Conflict',
  headers: z.object({ 'X-Request-Id': XRequestIdHeaderSchema }),
  content: { 'application/json': { schema: ErrorListSchema } },
}

const PreconditionFailedResponse = {
  description: 'Precondition failed',
  headers: z.object({ 'X-Request-Id': XRequestIdHeaderSchema }),
  content: { 'application/json': { schema: ErrorListSchema } },
}

const RequestIdExample = {
  summary: 'Request ID',
  value: 'req-550e8400-e29b-41d4-a716-446655440000',
}

const GetEntityByIdLink = {
  operationId: 'getEntity',
  parameters: { entityId: '$response.body#/data/id' },
}

const GetEntityRelationshipsLink = {
  operationId: 'getEntityRelationships',
  parameters: { entityId: '$response.body#/data/id' },
}

const EntityWebhookCallback = {
  '{$request.header.X-Callback-Url}': {
    post: {
      operationId: 'entityWebhookCallback',
      requestBody: {
        content: {
          'application/json': {
            schema: WebhookPayloadSchema,
            examples: {
              created: {
                summary: 'Entity created event',
                value: {
                  event: 'entity.created',
                  data: { id: '550e8400-e29b-41d4-a716-446655440000', type: 'user' },
                  timestamp: '2024-01-15T10:30:00Z',
                },
              },
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'Webhook received',
          headers: z.object({ 'X-Request-Id': XRequestIdHeaderSchema }),
        },
        400: ValidationErrorResponse,
      },
    },
  },
}

export const getEntitiesRoute = createRoute({
  method: 'get',
  path: '/entities',
  operationId: 'listEntities',
  request: {
    query: z.object({
      filter: FilterParamParamsSchema,
      page: PaginationParamParamsSchema,
      sort: SortParamParamsSchema,
    }),
  },
  responses: { 200: EntityListResponse, 400: ValidationErrorResponse, 401: UnauthorizedResponse },
})

export const postEntitiesRoute = createRoute({
  method: 'post',
  path: '/entities',
  operationId: 'createEntity',
  request: {
    headers: z.object({ 'Idempotency-Key': IdempotencyKeyHeaderParamsSchema }),
    body: CreateEntityBodyRequestBody,
  },
  responses: { 201: EntityCreatedResponse, 400: ValidationErrorResponse, 409: ConflictResponse },
  onEntityCreated: EntityWebhookCallback,
})

export const getEntitiesEntityIdRoute = createRoute({
  method: 'get',
  path: '/entities/{entityId}',
  operationId: 'getEntity',
  request: {
    params: z.object({ entityId: EntityIdPathParamsSchema }),
    query: z.object({ include: IncludeParamParamsSchema }),
    headers: z.object({ 'If-None-Match': IfNoneMatchHeaderParamsSchema }),
  },
  responses: { 200: EntityResponse, 304: NotModifiedResponse, 404: NotFoundResponse },
})

export const putEntitiesEntityIdRoute = createRoute({
  method: 'put',
  path: '/entities/{entityId}',
  operationId: 'updateEntity',
  request: {
    params: z.object({ entityId: EntityIdPathParamsSchema }),
    headers: z.object({ 'If-Match': IfMatchHeaderParamsSchema }),
    body: UpdateEntityBodyRequestBody,
  },
  responses: {
    200: EntityResponse,
    404: NotFoundResponse,
    409: ConflictResponse,
    412: PreconditionFailedResponse,
  },
  onEntityUpdated: EntityWebhookCallback,
})

export const deleteEntitiesEntityIdRoute = createRoute({
  method: 'delete',
  path: '/entities/{entityId}',
  operationId: 'deleteEntity',
  request: {
    params: z.object({ entityId: EntityIdPathParamsSchema }),
    headers: z.object({ 'If-Match': IfMatchHeaderParamsSchema }),
  },
  responses: { 204: NoContentResponse, 404: NotFoundResponse },
  onEntityDeleted: EntityWebhookCallback,
})

export const getEntitiesEntityIdRelationshipsRoute = createRoute({
  method: 'get',
  path: '/entities/{entityId}/relationships',
  operationId: 'getEntityRelationships',
  request: { params: z.object({ entityId: EntityIdPathParamsSchema }) },
  responses: { 200: RelationshipListResponse },
})

export const postEntitiesEntityIdRelationshipsRoute = createRoute({
  method: 'post',
  path: '/entities/{entityId}/relationships',
  operationId: 'createRelationship',
  request: {
    params: z.object({ entityId: EntityIdPathParamsSchema }),
    body: CreateRelationshipBodyRequestBody,
  },
  responses: { 201: RelationshipResponse },
})

export const postBatchRoute = createRoute({
  method: 'post',
  path: '/batch',
  operationId: 'batchOperation',
  request: { body: BatchOperationBodyRequestBody },
  responses: { 200: BatchResultResponse, 207: MultiStatusResponse },
})
