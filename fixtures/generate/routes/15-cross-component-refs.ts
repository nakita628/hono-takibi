import { createRoute, z } from '@hono/zod-openapi'

const EntityIdSchema = z
  .uuid()
  .openapi({ type: 'string', format: 'uuid', description: 'Unique entity identifier' })
  .openapi('EntityId')

const EntityTypeSchema = z
  .enum(['user', 'organization', 'project', 'resource'])
  .openapi({
    type: 'string',
    enum: ['user', 'organization', 'project', 'resource'],
    description: 'Entity type discriminator',
  })
  .openapi('EntityType')

const EntityStatusSchema = z
  .enum(['active', 'inactive', 'pending', 'archived'])
  .openapi({ type: 'string', enum: ['active', 'inactive', 'pending', 'archived'] })
  .openapi('EntityStatus')

const TagSchema = z
  .object({
    key: z.string().max(50).openapi({ type: 'string', maxLength: 50 }),
    value: z.string().max(200).openapi({ type: 'string', maxLength: 200 }),
  })
  .openapi({
    type: 'object',
    required: ['key', 'value'],
    properties: {
      key: { type: 'string', maxLength: 50 },
      value: { type: 'string', maxLength: 200 },
    },
  })
  .openapi('Tag')

const CustomFieldValueSchema: z.ZodType<CustomFieldValueType> = z
  .lazy(() =>
    z
      .union([
        z.string().openapi({ type: 'string' }),
        z.number().openapi({ type: 'number' }),
        z.boolean().openapi({ type: 'boolean' }),
        z
          .array(z.string().openapi({ type: 'string' }))
          .openapi({ type: 'array', items: { type: 'string' } }),
        NestedCustomFieldSchema,
      ])
      .openapi({
        oneOf: [
          { type: 'string' },
          { type: 'number' },
          { type: 'boolean' },
          { type: 'array', items: { type: 'string' } },
          { $ref: '#/components/schemas/NestedCustomField' },
        ],
      }),
  )
  .openapi('CustomFieldValue')

const EntityAttributesSchema = z
  .looseObject({
    name: z.string().exactOptional().openapi({ type: 'string' }),
    description: z.string().exactOptional().openapi({ type: 'string' }),
    status: EntityStatusSchema.exactOptional(),
    tags: z
      .array(TagSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Tag' } }),
    customFields: z
      .record(z.string(), CustomFieldValueSchema)
      .exactOptional()
      .openapi({
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/CustomFieldValue' },
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      status: { $ref: '#/components/schemas/EntityStatus' },
      tags: { type: 'array', items: { $ref: '#/components/schemas/Tag' } },
      customFields: {
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/CustomFieldValue' },
      },
    },
    additionalProperties: true,
  })
  .openapi('EntityAttributes')

const ResourceIdentifierSchema = z
  .object({ type: EntityTypeSchema, id: EntityIdSchema })
  .openapi({
    type: 'object',
    required: ['type', 'id'],
    properties: {
      type: { $ref: '#/components/schemas/EntityType' },
      id: { $ref: '#/components/schemas/EntityId' },
    },
  })
  .openapi('ResourceIdentifier')

const RelationshipLinkUrlsSchema = z
  .object({
    self: z.url().exactOptional().openapi({ type: 'string', format: 'uri' }),
    related: z.url().exactOptional().openapi({ type: 'string', format: 'uri' }),
  })
  .openapi({
    type: 'object',
    properties: {
      self: { type: 'string', format: 'uri' },
      related: { type: 'string', format: 'uri' },
    },
  })
  .openapi('RelationshipLinkUrls')

const RelationshipMetaSchema = z
  .object({
    count: z.int().exactOptional().openapi({ type: 'integer' }),
    createdAt: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    properties: { count: { type: 'integer' }, createdAt: { type: 'string', format: 'date-time' } },
  })
  .openapi('RelationshipMeta')

const RelationshipLinkSchema = z
  .object({
    data: ResourceIdentifierSchema.exactOptional(),
    links: RelationshipLinkUrlsSchema.exactOptional(),
    meta: RelationshipMetaSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    properties: {
      data: { $ref: '#/components/schemas/ResourceIdentifier' },
      links: { $ref: '#/components/schemas/RelationshipLinkUrls' },
      meta: { $ref: '#/components/schemas/RelationshipMeta' },
    },
  })
  .openapi('RelationshipLink')

const RelationshipLinksSchema = z
  .object({
    data: z
      .array(ResourceIdentifierSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/ResourceIdentifier' } }),
    links: RelationshipLinkUrlsSchema.exactOptional(),
    meta: RelationshipMetaSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/ResourceIdentifier' } },
      links: { $ref: '#/components/schemas/RelationshipLinkUrls' },
      meta: { $ref: '#/components/schemas/RelationshipMeta' },
    },
  })
  .openapi('RelationshipLinks')

const EntityRelationshipsSchema = z
  .object({
    parent: RelationshipLinkSchema.exactOptional(),
    children: RelationshipLinksSchema.exactOptional(),
    owner: RelationshipLinkSchema.exactOptional(),
    members: RelationshipLinksSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    properties: {
      parent: { $ref: '#/components/schemas/RelationshipLink' },
      children: { $ref: '#/components/schemas/RelationshipLinks' },
      owner: { $ref: '#/components/schemas/RelationshipLink' },
      members: { $ref: '#/components/schemas/RelationshipLinks' },
    },
  })
  .openapi('EntityRelationships')

const PermissionsSchema = z
  .object({
    canRead: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    canWrite: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    canDelete: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    canShare: z.boolean().exactOptional().openapi({ type: 'boolean' }),
  })
  .openapi({
    type: 'object',
    properties: {
      canRead: { type: 'boolean' },
      canWrite: { type: 'boolean' },
      canDelete: { type: 'boolean' },
      canShare: { type: 'boolean' },
    },
  })
  .openapi('Permissions')

const EntityMetaSchema = z
  .object({
    createdAt: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
    version: z.int().exactOptional().openapi({ type: 'integer' }),
    etag: z.string().exactOptional().openapi({ type: 'string' }),
    permissions: PermissionsSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    properties: {
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      version: { type: 'integer' },
      etag: { type: 'string' },
      permissions: { $ref: '#/components/schemas/Permissions' },
    },
  })
  .openapi('EntityMeta')

const EntityLinksSchema = z
  .object({
    self: z.url().exactOptional().openapi({ type: 'string', format: 'uri' }),
    collection: z.url().exactOptional().openapi({ type: 'string', format: 'uri' }),
    related: z
      .record(z.string(), z.url().openapi({ type: 'string', format: 'uri' }))
      .exactOptional()
      .openapi({ type: 'object', additionalProperties: { type: 'string', format: 'uri' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      self: { type: 'string', format: 'uri' },
      collection: { type: 'string', format: 'uri' },
      related: { type: 'object', additionalProperties: { type: 'string', format: 'uri' } },
    },
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
  .openapi({
    type: 'object',
    required: ['id', 'type', 'attributes'],
    properties: {
      id: { $ref: '#/components/schemas/EntityId' },
      type: { $ref: '#/components/schemas/EntityType' },
      attributes: { $ref: '#/components/schemas/EntityAttributes' },
      relationships: { $ref: '#/components/schemas/EntityRelationships' },
      meta: { $ref: '#/components/schemas/EntityMeta' },
      links: { $ref: '#/components/schemas/EntityLinks' },
    },
  })
  .openapi('Entity')

const NestedCustomFieldSchema: z.ZodType<NestedCustomFieldType> = z
  .lazy(() =>
    z
      .record(z.string(), CustomFieldValueSchema)
      .openapi({
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/CustomFieldValue' },
      }),
  )
  .openapi('NestedCustomField')

type CustomFieldValueType =
  | string
  | number
  | boolean
  | unknown[]
  | z.infer<typeof NestedCustomFieldSchema>

type NestedCustomFieldType = Record<string, z.infer<typeof CustomFieldValueSchema>>

const ListMetaSchema = z
  .object({
    total: z.int().exactOptional().openapi({ type: 'integer' }),
    page: z.int().exactOptional().openapi({ type: 'integer' }),
    perPage: z.int().exactOptional().openapi({ type: 'integer' }),
    totalPages: z.int().exactOptional().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    properties: {
      total: { type: 'integer' },
      page: { type: 'integer' },
      perPage: { type: 'integer' },
      totalPages: { type: 'integer' },
    },
  })
  .openapi('ListMeta')

const PaginationLinksSchema = z
  .object({
    self: z.url().exactOptional().openapi({ type: 'string', format: 'uri' }),
    first: z.url().exactOptional().openapi({ type: 'string', format: 'uri' }),
    last: z.url().exactOptional().openapi({ type: 'string', format: 'uri' }),
    prev: z.url().exactOptional().openapi({ type: 'string', format: 'uri' }),
    next: z.url().exactOptional().openapi({ type: 'string', format: 'uri' }),
  })
  .openapi({
    type: 'object',
    properties: {
      self: { type: 'string', format: 'uri' },
      first: { type: 'string', format: 'uri' },
      last: { type: 'string', format: 'uri' },
      prev: { type: 'string', format: 'uri' },
      next: { type: 'string', format: 'uri' },
    },
  })
  .openapi('PaginationLinks')

const EntityListWrapperSchema = z
  .object({
    data: z
      .array(EntitySchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Entity' } }),
    included: z
      .array(EntitySchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Entity' } }),
    meta: ListMetaSchema.exactOptional(),
    links: PaginationLinksSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['data'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/Entity' } },
      included: { type: 'array', items: { $ref: '#/components/schemas/Entity' } },
      meta: { $ref: '#/components/schemas/ListMeta' },
      links: { $ref: '#/components/schemas/PaginationLinks' },
    },
  })
  .openapi('EntityListWrapper')

const ResponseMetaSchema = z
  .object({
    requestId: z.uuid().exactOptional().openapi({ type: 'string', format: 'uuid' }),
    processingTime: z.number().exactOptional().openapi({ type: 'number' }),
  })
  .openapi({
    type: 'object',
    properties: {
      requestId: { type: 'string', format: 'uuid' },
      processingTime: { type: 'number' },
    },
  })
  .openapi('ResponseMeta')

const EntityWrapperSchema = z
  .object({
    data: EntitySchema,
    included: z
      .array(EntitySchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Entity' } }),
    meta: ResponseMetaSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['data'],
    properties: {
      data: { $ref: '#/components/schemas/Entity' },
      included: { type: 'array', items: { $ref: '#/components/schemas/Entity' } },
      meta: { $ref: '#/components/schemas/ResponseMeta' },
    },
  })
  .openapi('EntityWrapper')

const CreateEntityInputSchema = z
  .object({
    type: EntityTypeSchema,
    attributes: EntityAttributesSchema,
    relationships: EntityRelationshipsSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['type', 'attributes'],
    properties: {
      type: { $ref: '#/components/schemas/EntityType' },
      attributes: { $ref: '#/components/schemas/EntityAttributes' },
      relationships: { $ref: '#/components/schemas/EntityRelationships' },
    },
  })
  .openapi('CreateEntityInput')

const UpdateEntityInputSchema = z
  .object({
    attributes: EntityAttributesSchema.exactOptional(),
    relationships: EntityRelationshipsSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    properties: {
      attributes: { $ref: '#/components/schemas/EntityAttributes' },
      relationships: { $ref: '#/components/schemas/EntityRelationships' },
    },
  })
  .openapi('UpdateEntityInput')

const CreateRelationshipInputSchema = z
  .object({
    type: z.string().openapi({ type: 'string' }),
    targetId: EntityIdSchema,
    meta: RelationshipMetaSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['type', 'targetId'],
    properties: {
      type: { type: 'string' },
      targetId: { $ref: '#/components/schemas/EntityId' },
      meta: { $ref: '#/components/schemas/RelationshipMeta' },
    },
  })
  .openapi('CreateRelationshipInput')

const ErrorSourceSchema = z
  .object({
    pointer: z.string().exactOptional().openapi({ type: 'string' }),
    parameter: z.string().exactOptional().openapi({ type: 'string' }),
    header: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    properties: {
      pointer: { type: 'string' },
      parameter: { type: 'string' },
      header: { type: 'string' },
    },
  })
  .openapi('ErrorSource')

const ErrorMetaSchema = z
  .looseObject({})
  .openapi({ type: 'object', additionalProperties: true })
  .openapi('ErrorMeta')

const ErrorSchema = z
  .object({
    id: z.uuid().exactOptional().openapi({ type: 'string', format: 'uuid' }),
    status: z.string().openapi({ type: 'string' }),
    code: z.string().openapi({ type: 'string' }),
    title: z.string().openapi({ type: 'string' }),
    detail: z.string().exactOptional().openapi({ type: 'string' }),
    source: ErrorSourceSchema.exactOptional(),
    meta: ErrorMetaSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['status', 'code', 'title'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      status: { type: 'string' },
      code: { type: 'string' },
      title: { type: 'string' },
      detail: { type: 'string' },
      source: { $ref: '#/components/schemas/ErrorSource' },
      meta: { $ref: '#/components/schemas/ErrorMeta' },
    },
  })
  .openapi('Error')

const ErrorListSchema = z
  .object({
    errors: z
      .array(ErrorSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Error' } }),
    meta: ResponseMetaSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['errors'],
    properties: {
      errors: { type: 'array', items: { $ref: '#/components/schemas/Error' } },
      meta: { $ref: '#/components/schemas/ResponseMeta' },
    },
  })
  .openapi('ErrorList')

const BatchOperationSchema = z
  .object({
    id: z.string().exactOptional().openapi({ type: 'string' }),
    method: z
      .enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
      .openapi({ type: 'string', enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] }),
    path: z.string().openapi({ type: 'string' }),
    headers: z
      .record(z.string(), z.string().openapi({ type: 'string' }))
      .exactOptional()
      .openapi({ type: 'object', additionalProperties: { type: 'string' } }),
    body: z
      .union([CreateEntityInputSchema, UpdateEntityInputSchema])
      .exactOptional()
      .openapi({
        oneOf: [
          { $ref: '#/components/schemas/CreateEntityInput' },
          { $ref: '#/components/schemas/UpdateEntityInput' },
        ],
      }),
  })
  .openapi({
    type: 'object',
    required: ['method', 'path'],
    properties: {
      id: { type: 'string' },
      method: { type: 'string', enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] },
      path: { type: 'string' },
      headers: { type: 'object', additionalProperties: { type: 'string' } },
      body: {
        oneOf: [
          { $ref: '#/components/schemas/CreateEntityInput' },
          { $ref: '#/components/schemas/UpdateEntityInput' },
        ],
      },
    },
  })
  .openapi('BatchOperation')

const BatchResponseItemSchema = z
  .object({
    id: z.string().openapi({ type: 'string' }),
    status: z.int().openapi({ type: 'integer' }),
    headers: z
      .record(z.string(), z.string().openapi({ type: 'string' }))
      .exactOptional()
      .openapi({ type: 'object', additionalProperties: { type: 'string' } }),
    body: z
      .union([EntityWrapperSchema, ErrorListSchema])
      .exactOptional()
      .openapi({
        oneOf: [
          { $ref: '#/components/schemas/EntityWrapper' },
          { $ref: '#/components/schemas/ErrorList' },
        ],
      }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'status'],
    properties: {
      id: { type: 'string' },
      status: { type: 'integer' },
      headers: { type: 'object', additionalProperties: { type: 'string' } },
      body: {
        oneOf: [
          { $ref: '#/components/schemas/EntityWrapper' },
          { $ref: '#/components/schemas/ErrorList' },
        ],
      },
    },
  })
  .openapi('BatchResponseItem')

const BatchResultSchema = z
  .object({
    responses: z
      .array(BatchResponseItemSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/BatchResponseItem' } }),
    meta: ResponseMetaSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['responses'],
    properties: {
      responses: { type: 'array', items: { $ref: '#/components/schemas/BatchResponseItem' } },
      meta: { $ref: '#/components/schemas/ResponseMeta' },
    },
  })
  .openapi('BatchResult')

const WebhookEventSchema = z
  .enum(['entity.created', 'entity.updated', 'entity.deleted'])
  .openapi({ type: 'string', enum: ['entity.created', 'entity.updated', 'entity.deleted'] })
  .openapi('WebhookEvent')

const WebhookMetaSchema = z
  .object({
    triggeredBy: ResourceIdentifierSchema.exactOptional(),
    correlationId: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    properties: {
      triggeredBy: { $ref: '#/components/schemas/ResourceIdentifier' },
      correlationId: { type: 'string' },
    },
  })
  .openapi('WebhookMeta')

const WebhookPayloadSchema = z
  .object({
    id: z.uuid().exactOptional().openapi({ type: 'string', format: 'uuid' }),
    event: WebhookEventSchema,
    data: EntitySchema,
    previousData: EntitySchema.exactOptional(),
    timestamp: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    meta: WebhookMetaSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['event', 'data', 'timestamp'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      event: { $ref: '#/components/schemas/WebhookEvent' },
      data: { $ref: '#/components/schemas/Entity' },
      previousData: { $ref: '#/components/schemas/Entity' },
      timestamp: { type: 'string', format: 'date-time' },
      meta: { $ref: '#/components/schemas/WebhookMeta' },
    },
  })
  .openapi('WebhookPayload')

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
  value?: string | number | boolean | unknown[]
  and?: FilterExpressionType[]
  or?: FilterExpressionType[]
}

const FilterExpressionSchema: z.ZodType<FilterExpressionType> = z
  .lazy(() =>
    z
      .object({
        field: z.string().exactOptional().openapi({ type: 'string' }),
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
          .exactOptional()
          .openapi({
            type: 'string',
            enum: [
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
            ],
          }),
        value: z
          .union([
            z.string().openapi({ type: 'string' }),
            z.number().openapi({ type: 'number' }),
            z.boolean().openapi({ type: 'boolean' }),
            z
              .array(z.string().openapi({ type: 'string' }))
              .openapi({ type: 'array', items: { type: 'string' } }),
          ])
          .exactOptional()
          .openapi({
            oneOf: [
              { type: 'string' },
              { type: 'number' },
              { type: 'boolean' },
              { type: 'array', items: { type: 'string' } },
            ],
          }),
        and: z
          .array(FilterExpressionSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/FilterExpression' } }),
        or: z
          .array(FilterExpressionSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/FilterExpression' } }),
      })
      .openapi({
        type: 'object',
        properties: {
          field: { type: 'string' },
          operator: {
            type: 'string',
            enum: [
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
            ],
          },
          value: {
            oneOf: [
              { type: 'string' },
              { type: 'number' },
              { type: 'boolean' },
              { type: 'array', items: { type: 'string' } },
            ],
          },
          and: { type: 'array', items: { $ref: '#/components/schemas/FilterExpression' } },
          or: { type: 'array', items: { $ref: '#/components/schemas/FilterExpression' } },
        },
      }),
  )
  .openapi('FilterExpression')

const PaginationInputSchema = z
  .object({
    page: z
      .int()
      .min(1)
      .default(1)
      .exactOptional()
      .openapi({ type: 'integer', minimum: 1, default: 1 }),
    perPage: z
      .int()
      .min(1)
      .max(100)
      .default(20)
      .exactOptional()
      .openapi({ type: 'integer', minimum: 1, maximum: 100, default: 20 }),
    cursor: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1 },
      perPage: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
      cursor: { type: 'string' },
    },
  })
  .openapi('PaginationInput')

const SortExpressionSchema = z
  .object({
    field: z.string().exactOptional().openapi({ type: 'string' }),
    direction: z
      .enum(['asc', 'desc'])
      .default('asc')
      .exactOptional()
      .openapi({ type: 'string', enum: ['asc', 'desc'], default: 'asc' }),
  })
  .openapi({
    type: 'object',
    properties: {
      field: { type: 'string' },
      direction: { type: 'string', enum: ['asc', 'desc'], default: 'asc' },
    },
  })
  .openapi('SortExpression')

const EntityIdPathParamsSchema = EntityIdSchema.openapi({
  param: {
    name: 'entityId',
    in: 'path',
    required: true,
    description: 'Entity unique identifier',
    schema: { $ref: '#/components/schemas/EntityId' },
    examples: { validUuid: { $ref: '#/components/examples/EntityIdExample' } },
  },
})

const FilterParamParamsSchema = FilterExpressionSchema.exactOptional().openapi({
  param: {
    name: 'filter',
    in: 'query',
    description: 'Filter expression',
    required: false,
    style: 'deepObject',
    explode: true,
    schema: { $ref: '#/components/schemas/FilterExpression' },
    examples: {
      simpleFilter: { $ref: '#/components/examples/SimpleFilterExample' },
      complexFilter: { $ref: '#/components/examples/ComplexFilterExample' },
    },
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
    schema: { $ref: '#/components/schemas/PaginationInput' },
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
      schema: { type: 'array', items: { $ref: '#/components/schemas/SortExpression' } },
    },
    type: 'array',
    items: { $ref: '#/components/schemas/SortExpression' },
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
          schema: {
            type: 'array',
            items: { type: 'string', enum: ['parent', 'children', 'owner', 'members'] },
          },
          style: 'form',
          explode: false,
        },
        type: 'string',
        enum: ['parent', 'children', 'owner', 'members'],
      }),
  )
  .exactOptional()
  .openapi({
    param: {
      name: 'include',
      in: 'query',
      description: 'Related resources to include',
      required: false,
      schema: {
        type: 'array',
        items: { type: 'string', enum: ['parent', 'children', 'owner', 'members'] },
      },
      style: 'form',
      explode: false,
    },
    type: 'array',
    items: { type: 'string', enum: ['parent', 'children', 'owner', 'members'] },
  })

const IfMatchHeaderParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: {
      name: 'If-Match',
      in: 'header',
      description: 'ETag for optimistic locking',
      required: false,
      schema: { type: 'string' },
      examples: { etag: { $ref: '#/components/examples/EtagExample' } },
    },
    type: 'string',
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
      schema: { type: 'string' },
    },
    type: 'string',
  })

const IdempotencyKeyHeaderParamsSchema = z
  .uuid()
  .exactOptional()
  .openapi({
    param: {
      name: 'Idempotency-Key',
      in: 'header',
      description: 'Idempotency key for safe retries',
      required: false,
      schema: { type: 'string', format: 'uuid' },
      examples: { idempotencyKey: { $ref: '#/components/examples/IdempotencyKeyExample' } },
    },
    type: 'string',
    format: 'uuid',
  })

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const CreateEntityBodyRequestBody = {
  description: 'Create entity request',
  content: { 'application/json': { schema: CreateEntityInputSchema } },
  required: true,
}

const UpdateEntityBodyRequestBody = {
  description: 'Update entity request',
  content: { 'application/json': { schema: UpdateEntityInputSchema } },
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
        .object({
          operations: z
            .array(BatchOperationSchema)
            .min(1)
            .max(100)
            .openapi({
              type: 'array',
              items: { $ref: '#/components/schemas/BatchOperation' },
              minItems: 1,
              maxItems: 100,
            }),
        })
        .openapi({
          type: 'object',
          required: ['operations'],
          properties: {
            operations: {
              type: 'array',
              items: { $ref: '#/components/schemas/BatchOperation' },
              minItems: 1,
              maxItems: 100,
            },
          },
        }),
    },
  },
  required: true,
}

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
  content: {
    'application/json': {
      schema: EntityListWrapperSchema,
      examples: { entityList: EntityListExample },
    },
  },
}

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
  content: {
    'application/json': { schema: EntityWrapperSchema, examples: { entity: EntityExample } },
  },
}

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
  content: {
    'application/json': {
      schema: EntityWrapperSchema,
      examples: { createdEntity: CreatedEntityExample },
    },
  },
}

const RelationshipListResponse = {
  description: 'List of relationships',
  content: { 'application/json': { schema: RelationshipLinksSchema } },
}

const RelationshipResponse = {
  description: 'Single relationship',
  content: { 'application/json': { schema: RelationshipLinkSchema } },
}

const BatchResultResponse = {
  description: 'Batch operation result (all succeeded)',
  content: { 'application/json': { schema: BatchResultSchema } },
}

const MultiStatusResponse = {
  description: 'Batch operation result (partial success)',
  content: { 'application/json': { schema: BatchResultSchema } },
}

const NoContentResponse = { description: 'No content' }

const NotModifiedResponse = { description: 'Not modified' }

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
  content: {
    'application/json': {
      schema: ErrorListSchema,
      examples: { validationError: ValidationErrorExample },
    },
  },
}

const UnauthorizedResponse = {
  description: 'Unauthorized',
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
  content: {
    'application/json': { schema: ErrorListSchema, examples: { notFound: NotFoundErrorExample } },
  },
}

const ConflictResponse = {
  description: 'Conflict',
  content: { 'application/json': { schema: ErrorListSchema } },
}

const PreconditionFailedResponse = {
  description: 'Precondition failed',
  content: { 'application/json': { schema: ErrorListSchema } },
}

const XRequestIdHeader = z
  .uuid()
  .openapi({
    description: 'Unique request identifier',
    example: { $ref: '#/components/examples/RequestIdExample' },
    type: 'string',
    format: 'uuid',
  })

const XTotalCountHeader = z
  .int()
  .exactOptional()
  .openapi({ description: 'Total number of items', type: 'integer' })

const XPageHeader = z
  .int()
  .exactOptional()
  .openapi({ description: 'Current page number', type: 'integer' })

const XPerPageHeader = z
  .int()
  .exactOptional()
  .openapi({ description: 'Items per page', type: 'integer' })

const LinkHeader = z
  .string()
  .exactOptional()
  .openapi({ description: 'Pagination links (RFC 5988)', type: 'string' })

const ETagHeader = z.string().openapi({ description: 'Entity tag', type: 'string' })

const LastModifiedHeader = z.iso
  .datetime()
  .exactOptional()
  .openapi({ description: 'Last modification date', type: 'string', format: 'date-time' })

const LocationHeader = z
  .url()
  .openapi({ description: 'Created resource URL', type: 'string', format: 'uri' })

const WWWAuthenticateHeader = z
  .string()
  .openapi({ description: 'Authentication challenge', type: 'string' })

const EntityIdExample = {
  summary: 'Valid entity ID',
  value: '550e8400-e29b-41d4-a716-446655440000',
}

const EtagExample = { summary: 'ETag value', value: '"33a64df551425fcc55e4d42a148795d9f25f89d4"' }

const IdempotencyKeyExample = {
  summary: 'Idempotency key',
  value: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
}

const RequestIdExample = {
  summary: 'Request ID',
  value: 'req-550e8400-e29b-41d4-a716-446655440000',
}

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

const UpdateEntityExample = {
  summary: 'Update entity request',
  value: { attributes: { name: 'Updated Name', status: 'inactive' } },
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
        content: { 'application/json': { schema: WebhookPayloadSchema } },
        required: true,
      },
      responses: {
        '200': {
          description: 'Webhook received',
          headers: { 'X-Request-Id': XRequestIdHeaderSchema },
        },
        '400': ValidationErrorResponse,
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
    body: CreateEntityBodyRequestBody,
    headers: z.object({ 'Idempotency-Key': IdempotencyKeyHeaderParamsSchema }),
  },
  responses: { 201: EntityCreatedResponse, 400: ValidationErrorResponse, 409: ConflictResponse },
  callbacks: {},
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
    body: UpdateEntityBodyRequestBody,
    params: z.object({ entityId: EntityIdPathParamsSchema }),
    headers: z.object({ 'If-Match': IfMatchHeaderParamsSchema }),
  },
  responses: {
    200: EntityResponse,
    404: NotFoundResponse,
    409: ConflictResponse,
    412: PreconditionFailedResponse,
  },
  callbacks: {},
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
  callbacks: {},
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
    body: CreateRelationshipBodyRequestBody,
    params: z.object({ entityId: EntityIdPathParamsSchema }),
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
