import { createRoute, z } from '@hono/zod-openapi'

const IdentifiableSchema = z
  .object({ id: z.uuid() })
  .openapi({ required: ['id'] })
  .openapi('Identifiable')

const TimestampedSchema = z
  .object({
    createdAt: z.iso.datetime().exactOptional(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi('Timestamped')

const AuditableSchema = TimestampedSchema.and(
  z.object({ createdBy: z.string().exactOptional(), updatedBy: z.string().exactOptional() }),
).openapi('Auditable')

const VersionableSchema = z
  .object({ version: z.int().exactOptional(), etag: z.string().exactOptional() })
  .openapi('Versionable')

type BaseEntityType = z.infer<typeof IdentifiableSchema> &
  z.infer<typeof AuditableSchema> &
  z.infer<typeof VersionableSchema>

const BaseEntitySchema: z.ZodType<BaseEntityType> = IdentifiableSchema.and(AuditableSchema)
  .and(VersionableSchema)
  .openapi('BaseEntity')

type ExtendedEntityType = z.infer<typeof BaseEntitySchema> & {
  name: string
  description?: string
  tags?: string[]
}

const TextMessageSchema: z.ZodType<TextMessageType> = z
  .lazy(() =>
    BaseMessageSchema.and(
      z
        .object({
          type: z.literal('text').exactOptional(),
          content: z.string(),
          formatting: TextFormattingSchema.exactOptional(),
        })
        .openapi({ required: ['content'] }),
    ),
  )
  .openapi('TextMessage')

const ImageMessageSchema: z.ZodType<ImageMessageType> = z
  .lazy(() =>
    BaseMessageSchema.and(MediaContentSchema).and(
      z.object({
        type: z.literal('image').exactOptional(),
        dimensions: DimensionsSchema.exactOptional(),
        alt: z.string().exactOptional(),
      }),
    ),
  )
  .openapi('ImageMessage')

const VideoMessageSchema: z.ZodType<VideoMessageType> = z
  .lazy(() =>
    BaseMessageSchema.and(MediaContentSchema).and(
      z.object({
        type: z.literal('video').exactOptional(),
        duration: z.int().exactOptional(),
        thumbnail: ImageMessageSchema.exactOptional(),
      }),
    ),
  )
  .openapi('VideoMessage')

const DocumentMessageSchema: z.ZodType<DocumentMessageType> = z
  .lazy(() =>
    BaseMessageSchema.and(MediaContentSchema).and(
      z.object({
        type: z.literal('document').exactOptional(),
        pageCount: z.int().exactOptional(),
        preview: ImageMessageSchema.exactOptional(),
      }),
    ),
  )
  .openapi('DocumentMessage')

const CompositeMessageSchema: z.ZodType<CompositeMessageType> = z
  .lazy(() =>
    BaseMessageSchema.and(
      z
        .object({
          type: z.literal('composite').exactOptional(),
          parts: z.array(MessageSchema).min(2),
        })
        .openapi({ required: ['parts'] }),
    ),
  )
  .openapi('CompositeMessage')

type MessageType =
  | z.infer<typeof TextMessageSchema>
  | z.infer<typeof ImageMessageSchema>
  | z.infer<typeof VideoMessageSchema>
  | z.infer<typeof DocumentMessageSchema>
  | z.infer<typeof CompositeMessageSchema>

type ParticipantType = z.infer<typeof IdentifiableSchema> & { name: string; avatar?: string }

const ParticipantSchema: z.ZodType<ParticipantType> = IdentifiableSchema.and(
  z.object({ name: z.string(), avatar: z.url().exactOptional() }).openapi({ required: ['name'] }),
).openapi('Participant')

const MessageMetadataSchema: z.ZodType<MessageMetadataType> = z
  .lazy(() =>
    z.object({
      priority: z.enum(['low', 'normal', 'high', 'urgent']).exactOptional(),
      expiresAt: z.iso.datetime().exactOptional(),
      replyTo: MessageSchema.exactOptional(),
    }),
  )
  .openapi('MessageMetadata')

type BaseMessageType = z.infer<typeof BaseEntitySchema> & {
  type: string
  sender: z.infer<typeof ParticipantSchema>
  recipient: z.infer<typeof ParticipantSchema>
  metadata?: z.infer<typeof MessageMetadataSchema>
}

const MessageSchema: z.ZodType<MessageType> = z
  .lazy(() =>
    z
      .xor([
        TextMessageSchema,
        ImageMessageSchema,
        VideoMessageSchema,
        DocumentMessageSchema,
        CompositeMessageSchema,
      ])
      .openapi({
        discriminator: {
          propertyName: 'type',
          mapping: {
            text: '#/components/schemas/TextMessage',
            image: '#/components/schemas/ImageMessage',
            video: '#/components/schemas/VideoMessage',
            document: '#/components/schemas/DocumentMessage',
            composite: '#/components/schemas/CompositeMessage',
          },
        },
      }),
  )
  .openapi('Message')

type MessageMetadataType = {
  priority?: 'low' | 'normal' | 'high' | 'urgent'
  expiresAt?: string
  replyTo?: z.infer<typeof MessageSchema>
}

const BaseMessageSchema: z.ZodType<BaseMessageType> = z
  .lazy(() =>
    BaseEntitySchema.and(
      z
        .object({
          type: z.string(),
          sender: ParticipantSchema,
          recipient: ParticipantSchema,
          metadata: MessageMetadataSchema.exactOptional(),
        })
        .openapi({ required: ['type', 'sender', 'recipient'] }),
    ),
  )
  .openapi('BaseMessage')

const TextRangeSchema = z
  .object({ start: z.int(), end: z.int() })
  .openapi({ required: ['start', 'end'] })
  .openapi('TextRange')

const LinkRangeSchema = TextRangeSchema.and(
  z.object({ url: z.url() }).openapi({ required: ['url'] }),
).openapi('LinkRange')

type TextFormattingType = {
  bold?: z.infer<typeof TextRangeSchema>[]
  italic?: z.infer<typeof TextRangeSchema>[]
  links?: z.infer<typeof LinkRangeSchema>[]
}

const TextFormattingSchema: z.ZodType<TextFormattingType> = z
  .object({
    bold: z.array(TextRangeSchema).exactOptional(),
    italic: z.array(TextRangeSchema).exactOptional(),
    links: z.array(LinkRangeSchema).exactOptional(),
  })
  .openapi('TextFormatting')

type TextMessageType = z.infer<typeof BaseMessageSchema> & {
  type?: 'text'
  content: string
  formatting?: z.infer<typeof TextFormattingSchema>
}

type MediaContentType = { url: string; mimeType: string; size: number; checksum?: string }

const MediaContentSchema: z.ZodType<MediaContentType> = z
  .object({
    url: z.url(),
    mimeType: z.string(),
    size: z.int(),
    checksum: z.string().exactOptional(),
  })
  .openapi({ required: ['url', 'mimeType', 'size'] })
  .openapi('MediaContent')

type DimensionsType = { width: number; height: number }

const DimensionsSchema: z.ZodType<DimensionsType> = z
  .object({ width: z.int(), height: z.int() })
  .openapi({ required: ['width', 'height'] })
  .openapi('Dimensions')

type ImageMessageType = z.infer<typeof BaseMessageSchema> &
  z.infer<typeof MediaContentSchema> & {
    type?: 'image'
    dimensions?: z.infer<typeof DimensionsSchema>
    alt?: string
  }

type VideoMessageType = z.infer<typeof BaseMessageSchema> &
  z.infer<typeof MediaContentSchema> & {
    type?: 'video'
    duration?: number
    thumbnail?: z.infer<typeof ImageMessageSchema>
  }

type DocumentMessageType = z.infer<typeof BaseMessageSchema> &
  z.infer<typeof MediaContentSchema> & {
    type?: 'document'
    pageCount?: number
    preview?: z.infer<typeof ImageMessageSchema>
  }

type CompositeMessageType = z.infer<typeof BaseMessageSchema> & {
  type?: 'composite'
  parts: z.infer<typeof MessageSchema>[]
}

const BaseEventPayloadSchema = z
  .object({
    timestamp: z.iso.datetime().exactOptional(),
    source: z.string().exactOptional(),
    correlationId: z.string().exactOptional(),
  })
  .openapi('BaseEventPayload')

const UserStateSchema = z
  .object({
    status: z.string().exactOptional(),
    roles: z.array(z.string()).exactOptional(),
    preferences: z.object({}).exactOptional(),
  })
  .openapi('UserState')

const UserEventPayloadSchema = BaseEventPayloadSchema.and(
  z
    .object({
      userId: z.uuid(),
      userAction: z.enum(['login', 'logout', 'register', 'update', 'delete']).exactOptional(),
      previousState: UserStateSchema.exactOptional(),
      newState: UserStateSchema.exactOptional(),
    })
    .openapi({ required: ['userId'] }),
).openapi('UserEventPayload')

const OrderItemSchema = z
  .object({ productId: z.string(), quantity: z.int(), price: z.number().exactOptional() })
  .openapi({ required: ['productId', 'quantity'] })
  .openapi('OrderItem')

const OrderEventPayloadSchema = BaseEventPayloadSchema.and(
  z
    .object({
      orderId: z.string(),
      orderAction: z.enum(['created', 'updated', 'cancelled', 'completed']).exactOptional(),
      items: z.array(OrderItemSchema).exactOptional(),
    })
    .openapi({ required: ['orderId'] }),
).openapi('OrderEventPayload')

const SystemEventPayloadSchema = BaseEventPayloadSchema.and(
  z
    .object({
      component: z.string(),
      severity: z.enum(['info', 'warning', 'error', 'critical']),
      metrics: z.record(z.string(), z.number()).exactOptional(),
    })
    .openapi({ required: ['component', 'severity'] }),
).openapi('SystemEventPayload')

const CustomEventPayloadSchema = BaseEventPayloadSchema.and(
  z.object({ customType: z.string().exactOptional(), data: z.looseObject({}).exactOptional() }),
).openapi('CustomEventPayload')

type EventPayloadType =
  | z.infer<typeof UserEventPayloadSchema>
  | z.infer<typeof OrderEventPayloadSchema>
  | z.infer<typeof SystemEventPayloadSchema>
  | z.infer<typeof CustomEventPayloadSchema>

const UserConditionSchema = z
  .object({ type: z.literal('user'), userIds: z.array(z.string()) })
  .openapi({ required: ['type', 'userIds'] })
  .openapi('UserCondition')

const TimeConditionSchema = z
  .object({
    type: z.literal('time'),
    startTime: z.iso.datetime().exactOptional(),
    endTime: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['type'] })
  .openapi('TimeCondition')

const GeoConditionSchema = z
  .object({ type: z.literal('geo'), regions: z.array(z.string()) })
  .openapi({ required: ['type', 'regions'] })
  .openapi('GeoCondition')

const FeatureConditionSchema = z
  .union([UserConditionSchema, TimeConditionSchema, GeoConditionSchema])
  .openapi('FeatureCondition')

const ConditionalFeatureFlagSchema = z
  .object({
    enabled: z.boolean(),
    conditions: z.array(FeatureConditionSchema).exactOptional(),
    rolloutPercentage: z.int().min(0).max(100).exactOptional(),
  })
  .openapi({ required: ['enabled'] })
  .openapi('ConditionalFeatureFlag')

type FeatureFlagType = boolean | z.infer<typeof ConditionalFeatureFlagSchema>

type ConfigValueType =
  | string
  | number
  | boolean
  | ConfigValueType[]
  | { [key: string]: ConfigValueType }

const ComputeResourceSchema: z.ZodType<ComputeResourceType> = z
  .lazy(() =>
    BaseResourceSchema.and(
      z
        .object({
          resourceType: z.literal('compute').exactOptional(),
          cpu: CpuSpecSchema,
          memory: MemorySpecSchema,
          storage: z.array(StorageResourceSchema).exactOptional(),
        })
        .openapi({ required: ['cpu', 'memory'] }),
    ),
  )
  .openapi('ComputeResource')

const StorageResourceSchema: z.ZodType<StorageResourceType> = z
  .lazy(() =>
    BaseResourceSchema.and(
      z
        .object({
          resourceType: z.literal('storage').exactOptional(),
          size: z.int(),
          storageType: z.enum(['ssd', 'hdd', 'nvme']),
          iops: z.int().exactOptional(),
          attachedTo: ComputeResourceSchema.exactOptional(),
        })
        .openapi({ required: ['size', 'storageType'] }),
    ),
  )
  .openapi('StorageResource')

const NetworkResourceSchema: z.ZodType<NetworkResourceType> = z
  .lazy(() =>
    BaseResourceSchema.and(
      z
        .object({
          resourceType: z.literal('network').exactOptional(),
          cidr: z.string(),
          subnets: z.array(NetworkResourceSchema).exactOptional(),
          parentNetwork: NetworkResourceSchema.exactOptional(),
          connectedResources: z
            .array(z.union([ComputeResourceSchema, StorageResourceSchema]))
            .exactOptional(),
        })
        .openapi({ required: ['cidr'] }),
    ),
  )
  .openapi('NetworkResource')

const CompositeResourceSchema: z.ZodType<CompositeResourceType> = z
  .lazy(() =>
    BaseResourceSchema.and(
      z
        .object({
          resourceType: z.literal('composite').exactOptional(),
          components: z.array(ResourceSchema),
          template: ResourceTemplateSchema.exactOptional(),
        })
        .openapi({ required: ['components'] }),
    ),
  )
  .openapi('CompositeResource')

type ResourceType =
  | z.infer<typeof ComputeResourceSchema>
  | z.infer<typeof StorageResourceSchema>
  | z.infer<typeof NetworkResourceSchema>
  | z.infer<typeof CompositeResourceSchema>

const ExtendedEntitySchema: z.ZodType<ExtendedEntityType> = BaseEntitySchema.and(
  z
    .object({
      name: z.string(),
      description: z.string().exactOptional(),
      tags: z.array(z.string()).exactOptional(),
    })
    .openapi({ required: ['name'] }),
).openapi('ExtendedEntity')

type ResourceStatusType = {
  state: 'pending' | 'provisioning' | 'running' | 'stopped' | 'failed' | 'terminated'
  health?: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
  lastChecked?: string
}

const ResourceStatusSchema: z.ZodType<ResourceStatusType> = z
  .object({
    state: z.enum(['pending', 'provisioning', 'running', 'stopped', 'failed', 'terminated']),
    health: z.enum(['healthy', 'degraded', 'unhealthy', 'unknown']).exactOptional(),
    lastChecked: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['state'] })
  .openapi('ResourceStatus')

const ResourceDependencySchema: z.ZodType<ResourceDependencyType> = z
  .lazy(() =>
    z
      .object({
        resourceId: z.string(),
        type: z.enum(['hard', 'soft']),
        resource: ResourceSchema.exactOptional(),
      })
      .openapi({ required: ['resourceId', 'type'] }),
  )
  .openapi('ResourceDependency')

type ResourceCostType = { hourly?: number; monthly?: number; currency?: string }

const ResourceCostSchema: z.ZodType<ResourceCostType> = z
  .object({
    hourly: z.number().exactOptional(),
    monthly: z.number().exactOptional(),
    currency: z.string().exactOptional(),
  })
  .openapi('ResourceCost')

type BaseResourceType = z.infer<typeof ExtendedEntitySchema> & {
  resourceType: string
  status: z.infer<typeof ResourceStatusSchema>
  dependencies?: z.infer<typeof ResourceDependencySchema>[]
  cost?: z.infer<typeof ResourceCostSchema>
}

const ResourceSchema: z.ZodType<ResourceType> = z
  .lazy(() =>
    z
      .xor([
        ComputeResourceSchema,
        StorageResourceSchema,
        NetworkResourceSchema,
        CompositeResourceSchema,
      ])
      .openapi({
        discriminator: {
          propertyName: 'resourceType',
          mapping: {
            compute: '#/components/schemas/ComputeResource',
            storage: '#/components/schemas/StorageResource',
            network: '#/components/schemas/NetworkResource',
            composite: '#/components/schemas/CompositeResource',
          },
        },
      }),
  )
  .openapi('Resource')

type ResourceDependencyType = {
  resourceId: string
  type: 'hard' | 'soft'
  resource?: z.infer<typeof ResourceSchema>
}

const BaseResourceSchema: z.ZodType<BaseResourceType> = z
  .lazy(() =>
    ExtendedEntitySchema.and(
      z
        .object({
          resourceType: z.string(),
          status: ResourceStatusSchema,
          dependencies: z.array(ResourceDependencySchema).exactOptional(),
          cost: ResourceCostSchema.exactOptional(),
        })
        .openapi({ required: ['resourceType', 'status'] }),
    ),
  )
  .openapi('BaseResource')

type CpuSpecType = { cores: number; architecture?: string }

const CpuSpecSchema: z.ZodType<CpuSpecType> = z
  .object({ cores: z.int(), architecture: z.string().exactOptional() })
  .openapi({ required: ['cores'] })
  .openapi('CpuSpec')

type MemorySpecType = { size: number; unit?: 'MB' | 'GB' | 'TB' }

const MemorySpecSchema: z.ZodType<MemorySpecType> = z
  .object({ size: z.int(), unit: z.enum(['MB', 'GB', 'TB']).exactOptional() })
  .openapi({ required: ['size'] })
  .openapi('MemorySpec')

type ComputeResourceType = z.infer<typeof BaseResourceSchema> & {
  resourceType?: 'compute'
  cpu: z.infer<typeof CpuSpecSchema>
  memory: z.infer<typeof MemorySpecSchema>
  storage?: z.infer<typeof StorageResourceSchema>[]
}

type StorageResourceType = z.infer<typeof BaseResourceSchema> & {
  resourceType?: 'storage'
  size: number
  storageType: 'ssd' | 'hdd' | 'nvme'
  iops?: number
  attachedTo?: z.infer<typeof ComputeResourceSchema>
}

type NetworkResourceType = z.infer<typeof BaseResourceSchema> & {
  resourceType?: 'network'
  cidr: string
  subnets?: NetworkResourceType[]
  parentNetwork?: NetworkResourceType
  connectedResources?: (
    | z.infer<typeof ComputeResourceSchema>
    | z.infer<typeof StorageResourceSchema>
  )[]
}

const ConfigValueSchema: z.ZodType<ConfigValueType> = z
  .lazy(() =>
    z.xor([
      z.string(),
      z.number(),
      z.boolean(),
      z.array(ConfigValueSchema),
      z.record(z.string(), ConfigValueSchema),
    ]),
  )
  .openapi('ConfigValue')

type ResourceTemplateType = {
  name?: string
  version?: string
  parameters?: { [key: string]: z.infer<typeof ConfigValueSchema> }
}

const ResourceTemplateSchema: z.ZodType<ResourceTemplateType> = z
  .object({
    name: z.string().exactOptional(),
    version: z.string().exactOptional(),
    parameters: z.record(z.string(), ConfigValueSchema).exactOptional(),
  })
  .openapi('ResourceTemplate')

type CompositeResourceType = z.infer<typeof BaseResourceSchema> & {
  resourceType?: 'composite'
  components: z.infer<typeof ResourceSchema>[]
  template?: z.infer<typeof ResourceTemplateSchema>
}

const SchemaValidationRuleSchema = z
  .object({ ruleType: z.literal('schema').exactOptional(), schema: z.object({}) })
  .openapi({ required: ['schema'] })
  .openapi('SchemaValidationRule')

const BusinessValidationRuleSchema = z
  .object({
    ruleType: z.literal('business').exactOptional(),
    expression: z.string(),
    parameters: z.object({}).exactOptional(),
  })
  .openapi({ required: ['expression'] })
  .openapi('BusinessValidationRule')

const CustomValidationRuleSchema = z
  .object({
    ruleType: z.literal('custom').exactOptional(),
    handler: z.string(),
    config: z.object({}).exactOptional(),
  })
  .openapi({ required: ['handler'] })
  .openapi('CustomValidationRule')

type ValidationRuleType = { ruleType: string; severity?: 'error' | 'warning' | 'info' } & (
  | z.infer<typeof SchemaValidationRuleSchema>
  | z.infer<typeof BusinessValidationRuleSchema>
  | z.infer<typeof CustomValidationRuleSchema>
)

const DeliveryStatusSchema = z
  .object({
    sent: z.boolean().exactOptional(),
    delivered: z.boolean().exactOptional(),
    read: z.boolean().exactOptional(),
    timestamps: z
      .object({
        sentAt: z.iso.datetime().exactOptional(),
        deliveredAt: z.iso.datetime().exactOptional(),
        readAt: z.iso.datetime().exactOptional(),
      })
      .exactOptional(),
  })
  .openapi('DeliveryStatus')

const MessageResponseSchema = MessageSchema.and(
  z.object({ deliveryStatus: DeliveryStatusSchema.exactOptional() }),
).openapi('MessageResponse')

const EventPayloadSchema: z.ZodType<EventPayloadType> = z
  .lazy(() =>
    z.union([
      UserEventPayloadSchema,
      OrderEventPayloadSchema,
      SystemEventPayloadSchema,
      CustomEventPayloadSchema,
    ]),
  )
  .openapi('EventPayload')

const WebContextSchema = z
  .object({
    userAgent: z.string().exactOptional(),
    referrer: z.string().exactOptional(),
    sessionId: z.string().exactOptional(),
  })
  .openapi('WebContext')

const MobileContextSchema = z
  .object({
    deviceId: z.string().exactOptional(),
    platform: z.enum(['ios', 'android']).exactOptional(),
    appVersion: z.string().exactOptional(),
  })
  .openapi('MobileContext')

const ApiContextSchema = z
  .object({
    apiKey: z.string().exactOptional(),
    clientId: z.string().exactOptional(),
    ipAddress: z.string().exactOptional(),
  })
  .openapi('ApiContext')

const EventContextSchema = z
  .union([WebContextSchema, MobileContextSchema, ApiContextSchema])
  .openapi('EventContext')

const EventSchema = z
  .object({
    eventType: z.string(),
    payload: EventPayloadSchema,
    context: EventContextSchema.exactOptional(),
  })
  .openapi({ required: ['eventType', 'payload'] })
  .openapi('Event')

const ConfigSectionSchema = z
  .object({ enabled: z.boolean().exactOptional(), description: z.string().exactOptional() })
  .openapi('ConfigSection')

const ConfigSettingsSchema = z.record(z.string(), ConfigSectionSchema).openapi('ConfigSettings')

const ConfigurationSchema = BaseEntitySchema.and(
  z
    .object({
      settings: ConfigSettingsSchema,
      overrides: z.record(z.string(), ConfigValueSchema).exactOptional(),
    })
    .openapi({ required: ['settings'] }),
).openapi('Configuration')

const GeneralSettingsSchema = ConfigSectionSchema.and(
  z.object({
    environment: z.string().exactOptional(),
    debug: z.boolean().exactOptional(),
    logLevel: z.string().exactOptional(),
  }),
).openapi('GeneralSettings')

const FeatureFlagSchema: z.ZodType<FeatureFlagType> = z
  .lazy(() => z.xor([z.boolean(), ConditionalFeatureFlagSchema]))
  .openapi('FeatureFlag')

const FeatureFlagsSchema = ConfigSectionSchema.and(z.record(z.string(), FeatureFlagSchema)).openapi(
  'FeatureFlags',
)

const RateLimitSchema = z
  .object({ limit: z.int(), window: z.int(), burstLimit: z.int().exactOptional() })
  .openapi({ required: ['limit', 'window'] })
  .openapi('RateLimit')

const RateLimitsSchema = ConfigSectionSchema.and(z.record(z.string(), RateLimitSchema)).openapi(
  'RateLimits',
)

const ConfigurationUpdateSchema = z
  .object({
    settings: ConfigSettingsSchema.exactOptional(),
    overrides: z.record(z.string(), ConfigValueSchema).exactOptional(),
  })
  .and(VersionableSchema)
  .openapi('ConfigurationUpdate')

const ValidationTargetSchema = z
  .xor([ResourceSchema, ConfigurationSchema, MessageSchema])
  .openapi('ValidationTarget')

const ValidationRuleSchema: z.ZodType<ValidationRuleType> = z
  .lazy(() =>
    z
      .object({
        ruleType: z.string(),
        severity: z.enum(['error', 'warning', 'info']).exactOptional(),
      })
      .openapi({ required: ['ruleType'] })
      .and(
        z.xor([
          SchemaValidationRuleSchema,
          BusinessValidationRuleSchema,
          CustomValidationRuleSchema,
        ]),
      ),
  )
  .openapi('ValidationRule')

const ValidationRequestSchema = z
  .object({ target: ValidationTargetSchema, rules: z.array(ValidationRuleSchema) })
  .openapi({ required: ['target', 'rules'] })
  .openapi('ValidationRequest')

const SchemaIssueSchema = z
  .object({
    keyword: z.string().exactOptional(),
    expected: z.object({}).exactOptional(),
    actual: z.object({}).exactOptional(),
  })
  .openapi('SchemaIssue')

const BusinessIssueSchema = z
  .object({ rule: z.string().exactOptional(), context: z.object({}).exactOptional() })
  .openapi('BusinessIssue')

const ValidationIssueSchema = z
  .object({
    path: z.string(),
    message: z.string(),
    severity: z.enum(['error', 'warning', 'info']),
    code: z.string().exactOptional(),
  })
  .openapi({ required: ['path', 'message', 'severity'] })
  .and(z.union([SchemaIssueSchema, BusinessIssueSchema]))
  .openapi('ValidationIssue')

const ValidationResultSchema = z
  .object({
    valid: z.boolean(),
    issues: z.array(ValidationIssueSchema),
    metadata: z.object({}).exactOptional(),
  })
  .openapi({ required: ['valid', 'issues'] })
  .openapi('ValidationResult')

export const postMessagesRoute = createRoute({
  method: 'post',
  path: '/messages',
  operationId: 'sendMessage',
  request: { body: { content: { 'application/json': { schema: MessageSchema } } } },
  responses: {
    201: {
      description: 'Message sent',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const postEventsRoute = createRoute({
  method: 'post',
  path: '/events',
  operationId: 'processEvent',
  request: { body: { content: { 'application/json': { schema: EventSchema } } } },
  responses: { 200: { description: 'Event processed' } },
})

export const getConfigsRoute = createRoute({
  method: 'get',
  path: '/configs',
  operationId: 'getConfig',
  responses: {
    200: {
      description: 'Configuration',
      content: { 'application/json': { schema: ConfigurationSchema } },
    },
  },
})

export const putConfigsRoute = createRoute({
  method: 'put',
  path: '/configs',
  operationId: 'updateConfig',
  request: { body: { content: { 'application/json': { schema: ConfigurationUpdateSchema } } } },
  responses: { 200: { description: 'Updated' } },
})

export const postResourcesRoute = createRoute({
  method: 'post',
  path: '/resources',
  operationId: 'createResource',
  request: { body: { content: { 'application/json': { schema: ResourceSchema } } } },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: ResourceSchema } } },
  },
})

export const postValidationsRoute = createRoute({
  method: 'post',
  path: '/validations',
  operationId: 'validate',
  request: { body: { content: { 'application/json': { schema: ValidationRequestSchema } } } },
  responses: {
    200: {
      description: 'Validation result',
      content: { 'application/json': { schema: ValidationResultSchema } },
    },
  },
})
