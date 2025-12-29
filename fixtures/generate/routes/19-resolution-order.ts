import { createRoute, z } from '@hono/zod-openapi'

const DimensionSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    values: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .openapi({
    type: 'object',
    required: ['name'],
    properties: { name: { type: 'string' }, values: { type: 'array', items: { type: 'string' } } },
  })
  .openapi('Dimension')

const CriticalitySchema = z
  .enum(['critical', 'high', 'medium', 'low'])
  .optional()
  .openapi({ type: 'string', enum: ['critical', 'high', 'medium', 'low'] })
  .openapi('Criticality')

const ThresholdSchema = z
  .object({
    level: CriticalitySchema,
    operator: z
      .enum(['lt', 'lte', 'gt', 'gte', 'eq', 'ne'])
      .optional()
      .openapi({ type: 'string', enum: ['lt', 'lte', 'gt', 'gte', 'eq', 'ne'] }),
    value: z.number().optional().openapi({ type: 'number' }),
  })
  .openapi({
    type: 'object',
    properties: {
      level: { $ref: '#/components/schemas/Criticality' },
      operator: { type: 'string', enum: ['lt', 'lte', 'gt', 'gte', 'eq', 'ne'] },
      value: { type: 'number' },
    },
  })
  .openapi('Threshold')

const LabelSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    required: z.boolean().optional().openapi({ type: 'boolean' }),
  })
  .openapi({
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      required: { type: 'boolean' },
    },
  })
  .openapi('Label')

const MetricDefinitionSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    type: z
      .enum(['counter', 'gauge', 'histogram', 'summary'])
      .openapi({ type: 'string', enum: ['counter', 'gauge', 'histogram', 'summary'] }),
    unit: z.string().optional().openapi({ type: 'string' }),
    labels: z
      .array(LabelSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Label' } }),
    thresholds: z
      .array(ThresholdSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Threshold' } }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'type'],
    properties: {
      name: { type: 'string' },
      type: { type: 'string', enum: ['counter', 'gauge', 'histogram', 'summary'] },
      unit: { type: 'string' },
      labels: { type: 'array', items: { $ref: '#/components/schemas/Label' } },
      thresholds: { type: 'array', items: { $ref: '#/components/schemas/Threshold' } },
    },
  })
  .openapi('MetricDefinition')

const MetricAggregationSchema = z
  .object({
    metric: MetricDefinitionSchema,
    function: z
      .enum(['sum', 'avg', 'min', 'max', 'count', 'p50', 'p95', 'p99'])
      .optional()
      .openapi({
        type: 'string',
        enum: ['sum', 'avg', 'min', 'max', 'count', 'p50', 'p95', 'p99'],
      }),
    dimensions: z
      .array(DimensionSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Dimension' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      metric: { $ref: '#/components/schemas/MetricDefinition' },
      function: {
        type: 'string',
        enum: ['sum', 'avg', 'min', 'max', 'count', 'p50', 'p95', 'p99'],
      },
      dimensions: { type: 'array', items: { $ref: '#/components/schemas/Dimension' } },
    },
  })
  .openapi('MetricAggregation')

const MetricValueSchema = z
  .object({
    value: z.number().optional().openapi({ type: 'number' }),
    unit: z.string().optional().openapi({ type: 'string' }),
    definition: MetricDefinitionSchema,
    timestamp: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    properties: {
      value: { type: 'number' },
      unit: { type: 'string' },
      definition: { $ref: '#/components/schemas/MetricDefinition' },
      timestamp: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('MetricValue')

const EntityMetricsSchema = z
  .object({
    metrics: z
      .record(z.string(), MetricValueSchema)
      .openapi({
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/MetricValue' },
      }),
    aggregations: z
      .array(MetricAggregationSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/MetricAggregation' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      metrics: {
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/MetricValue' },
      },
      aggregations: { type: 'array', items: { $ref: '#/components/schemas/MetricAggregation' } },
    },
  })
  .openapi('EntityMetrics')

const DependencyTypeSchema = z
  .enum(['hard', 'soft', 'optional'])
  .optional()
  .openapi({ type: 'string', enum: ['hard', 'soft', 'optional'] })
  .openapi('DependencyType')

const AnnotationSchema = z
  .object({
    value: z.string().openapi({ type: 'string' }),
    author: z.string().openapi({ type: 'string' }),
    timestamp: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      value: { type: 'string' },
      author: { type: 'string' },
      timestamp: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Annotation')

const LinkMetadataSchema = z
  .object({
    createdAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    createdBy: z.string().optional().openapi({ type: 'string' }),
    annotations: z
      .record(z.string(), AnnotationSchema)
      .openapi({
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/Annotation' },
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      createdAt: { type: 'string', format: 'date-time' },
      createdBy: { type: 'string' },
      annotations: {
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/Annotation' },
      },
    },
  })
  .openapi('LinkMetadata')

const EntityTypeSchema = z
  .enum(['service', 'database', 'cache', 'queue', 'gateway'])
  .optional()
  .openapi({ type: 'string', enum: ['service', 'database', 'cache', 'queue', 'gateway'] })
  .openapi('EntityType')

const EntityLinkSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    type: EntityTypeSchema,
    metadata: LinkMetadataSchema,
  })
  .openapi({
    type: 'object',
    required: ['id', 'type'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      type: { $ref: '#/components/schemas/EntityType' },
      metadata: { $ref: '#/components/schemas/LinkMetadata' },
    },
  })
  .openapi('EntityLink')

const DependencyLinkSchema = z
  .intersection(
    EntityLinkSchema,
    z
      .object({ dependencyType: DependencyTypeSchema, criticality: CriticalitySchema })
      .openapi({
        type: 'object',
        properties: {
          dependencyType: { $ref: '#/components/schemas/DependencyType' },
          criticality: { $ref: '#/components/schemas/Criticality' },
        },
      }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/EntityLink' },
      {
        type: 'object',
        properties: {
          dependencyType: { $ref: '#/components/schemas/DependencyType' },
          criticality: { $ref: '#/components/schemas/Criticality' },
        },
      },
    ],
  })
  .openapi('DependencyLink')

const EntityRelationsSchema = z
  .object({
    parent: EntityLinkSchema,
    children: z
      .array(EntityLinkSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/EntityLink' } }),
    dependencies: z
      .array(DependencyLinkSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/DependencyLink' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      parent: { $ref: '#/components/schemas/EntityLink' },
      children: { type: 'array', items: { $ref: '#/components/schemas/EntityLink' } },
      dependencies: { type: 'array', items: { $ref: '#/components/schemas/DependencyLink' } },
    },
  })
  .openapi('EntityRelations')

const SecretReferenceSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    source: z.string().openapi({ type: 'string' }),
    version: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'source'],
    properties: {
      name: { type: 'string' },
      source: { type: 'string' },
      version: { type: 'string' },
    },
  })
  .openapi('SecretReference')

const EnvironmentSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    variables: z
      .record(z.string(), z.string().openapi({ type: 'string' }))
      .openapi({ type: 'object', additionalProperties: { type: 'string' } }),
    secrets: z
      .array(SecretReferenceSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/SecretReference' } }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string' },
      variables: { type: 'object', additionalProperties: { type: 'string' } },
      secrets: { type: 'array', items: { $ref: '#/components/schemas/SecretReference' } },
    },
  })
  .openapi('Environment')

const ConfigValueSchema = z
  .lazy(() =>
    z
      .union([
        z.string().optional().openapi({ type: 'string' }),
        z.number().optional().openapi({ type: 'number' }),
        z.boolean().optional().openapi({ type: 'boolean' }),
        z
          .array(ConfigValueSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/ConfigValue' } }),
        z
          .record(z.string(), ConfigValueSchema)
          .openapi({
            type: 'object',
            additionalProperties: { $ref: '#/components/schemas/ConfigValue' },
          }),
      ])
      .optional()
      .openapi({
        oneOf: [
          { type: 'string' },
          { type: 'number' },
          { type: 'boolean' },
          { type: 'array', items: { $ref: '#/components/schemas/ConfigValue' } },
          { type: 'object', additionalProperties: { $ref: '#/components/schemas/ConfigValue' } },
        ],
      }),
  )
  .openapi('ConfigValue')

const EntityConfigSchema = z
  .object({
    settings: z
      .record(z.string(), ConfigValueSchema)
      .openapi({
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/ConfigValue' },
      }),
    secrets: z
      .array(SecretReferenceSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/SecretReference' } }),
    environment: EnvironmentSchema,
  })
  .openapi({
    type: 'object',
    properties: {
      settings: {
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/ConfigValue' },
      },
      secrets: { type: 'array', items: { $ref: '#/components/schemas/SecretReference' } },
      environment: { $ref: '#/components/schemas/Environment' },
    },
  })
  .openapi('EntityConfig')

const TagSchema = z
  .object({
    key: z.string().openapi({ type: 'string' }),
    value: z.string().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['key', 'value'],
    properties: { key: { type: 'string' }, value: { type: 'string' } },
  })
  .openapi('Tag')

const HealthCheckSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    status: z
      .enum(['pass', 'fail', 'warn'])
      .openapi({ type: 'string', enum: ['pass', 'fail', 'warn'] }),
    message: z.string().optional().openapi({ type: 'string' }),
    metrics: z
      .record(z.string(), MetricValueSchema)
      .openapi({
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/MetricValue' },
      }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'status'],
    properties: {
      name: { type: 'string' },
      status: { type: 'string', enum: ['pass', 'fail', 'warn'] },
      message: { type: 'string' },
      metrics: {
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/MetricValue' },
      },
    },
  })
  .openapi('HealthCheck')

const HealthStatusSchema = z
  .object({
    status: z
      .enum(['healthy', 'degraded', 'unhealthy', 'unknown'])
      .openapi({ type: 'string', enum: ['healthy', 'degraded', 'unhealthy', 'unknown'] }),
    checks: z
      .array(HealthCheckSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/HealthCheck' } }),
    lastChecked: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['status'],
    properties: {
      status: { type: 'string', enum: ['healthy', 'degraded', 'unhealthy', 'unknown'] },
      checks: { type: 'array', items: { $ref: '#/components/schemas/HealthCheck' } },
      lastChecked: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('HealthStatus')

const EntityStatusSchema = z
  .enum(['active', 'inactive', 'maintenance', 'deprecated'])
  .optional()
  .openapi({ type: 'string', enum: ['active', 'inactive', 'maintenance', 'deprecated'] })
  .openapi('EntityStatus')

const EntityDetailsSchema = z
  .object({
    name: z.string().optional().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    version: z.string().optional().openapi({ type: 'string' }),
    status: EntityStatusSchema,
    health: HealthStatusSchema,
    tags: z
      .array(TagSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Tag' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      version: { type: 'string' },
      status: { $ref: '#/components/schemas/EntityStatus' },
      health: { $ref: '#/components/schemas/HealthStatus' },
      tags: { type: 'array', items: { $ref: '#/components/schemas/Tag' } },
    },
  })
  .openapi('EntityDetails')

const EntityCoreSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    type: EntityTypeSchema,
    details: EntityDetailsSchema,
    config: EntityConfigSchema,
  })
  .openapi({
    type: 'object',
    required: ['id', 'type', 'details'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      type: { $ref: '#/components/schemas/EntityType' },
      details: { $ref: '#/components/schemas/EntityDetails' },
      config: { $ref: '#/components/schemas/EntityConfig' },
    },
  })
  .openapi('EntityCore')

const EntityFullSchema = z
  .intersection(EntityCoreSchema, EntityRelationsSchema, EntityMetricsSchema)
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/EntityCore' },
      { $ref: '#/components/schemas/EntityRelations' },
      { $ref: '#/components/schemas/EntityMetrics' },
    ],
  })
  .openapi('EntityFull')

const RetryPolicySchema = z
  .object({
    maxRetries: z.int().openapi({ type: 'integer' }),
    backoff: z
      .enum(['fixed', 'exponential', 'linear'])
      .openapi({ type: 'string', enum: ['fixed', 'exponential', 'linear'] }),
    initialDelay: z.int().openapi({ type: 'integer' }),
    maxDelay: z.int().openapi({ type: 'integer' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      maxRetries: { type: 'integer' },
      backoff: { type: 'string', enum: ['fixed', 'exponential', 'linear'] },
      initialDelay: { type: 'integer' },
      maxDelay: { type: 'integer' },
    },
  })
  .openapi('RetryPolicy')

const ProcessOptionsSchema = z
  .object({
    parallel: z.boolean().optional().openapi({ type: 'boolean' }),
    batchSize: z.int().optional().openapi({ type: 'integer' }),
    timeout: z.int().optional().openapi({ type: 'integer' }),
    retryPolicy: RetryPolicySchema,
  })
  .openapi({
    type: 'object',
    properties: {
      parallel: { type: 'boolean' },
      batchSize: { type: 'integer' },
      timeout: { type: 'integer' },
      retryPolicy: { $ref: '#/components/schemas/RetryPolicy' },
    },
  })
  .openapi('ProcessOptions')

const CredentialsSchema = z
  .object({
    type: z
      .enum(['basic', 'token', 'oauth', 'certificate'])
      .openapi({ type: 'string', enum: ['basic', 'token', 'oauth', 'certificate'] }),
    secrets: z
      .array(SecretReferenceSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/SecretReference' } }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      type: { type: 'string', enum: ['basic', 'token', 'oauth', 'certificate'] },
      secrets: { type: 'array', items: { $ref: '#/components/schemas/SecretReference' } },
    },
  })
  .openapi('Credentials')

const ConnectionConfigSchema = z
  .object({
    host: z.string().optional().openapi({ type: 'string' }),
    port: z.int().optional().openapi({ type: 'integer' }),
    database: z.string().optional().openapi({ type: 'string' }),
    options: ConfigValueSchema,
  })
  .openapi({
    type: 'object',
    properties: {
      host: { type: 'string' },
      port: { type: 'integer' },
      database: { type: 'string' },
      options: { $ref: '#/components/schemas/ConfigValue' },
    },
  })
  .openapi('ConnectionConfig')

const DataSourceSchema = z
  .object({
    type: z.string().optional().openapi({ type: 'string' }),
    connection: ConnectionConfigSchema,
    credentials: CredentialsSchema,
  })
  .openapi({
    type: 'object',
    properties: {
      type: { type: 'string' },
      connection: { $ref: '#/components/schemas/ConnectionConfig' },
      credentials: { $ref: '#/components/schemas/Credentials' },
    },
  })
  .openapi('DataSource')

const FieldValidationSchema = z
  .object({
    required: z.boolean().openapi({ type: 'boolean' }),
    pattern: z.string().openapi({ type: 'string' }),
    min: z.number().openapi({ type: 'number' }),
    max: z.number().openapi({ type: 'number' }),
    enum: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      required: { type: 'boolean' },
      pattern: { type: 'string' },
      min: { type: 'number' },
      max: { type: 'number' },
      enum: { type: 'array', items: { type: 'string' } },
    },
  })
  .openapi('FieldValidation')

const FieldDefinitionSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    type: z.string().openapi({ type: 'string' }),
    nullable: z.boolean().optional().openapi({ type: 'boolean' }),
    default: ConfigValueSchema,
    validation: FieldValidationSchema,
  })
  .openapi({
    type: 'object',
    required: ['name', 'type'],
    properties: {
      name: { type: 'string' },
      type: { type: 'string' },
      nullable: { type: 'boolean' },
      default: { $ref: '#/components/schemas/ConfigValue' },
      validation: { $ref: '#/components/schemas/FieldValidation' },
    },
  })
  .openapi('FieldDefinition')

const DataSchema = z
  .object({
    name: z.string().optional().openapi({ type: 'string' }),
    fields: z
      .array(FieldDefinitionSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/FieldDefinition' } }),
    nested: z
      .record(z.string(), DataSchema)
      .openapi({
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/DataSchema' },
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string' },
      fields: { type: 'array', items: { $ref: '#/components/schemas/FieldDefinition' } },
      nested: { type: 'object', additionalProperties: { $ref: '#/components/schemas/DataSchema' } },
    },
  })
  .openapi('DataSchema')

const StageOutputSchema = z
  .object({
    format: z.string().optional().openapi({ type: 'string' }),
    schema: DataSchema,
    destination: DataSourceSchema,
  })
  .openapi({
    type: 'object',
    properties: {
      format: { type: 'string' },
      schema: { $ref: '#/components/schemas/DataSchema' },
      destination: { $ref: '#/components/schemas/DataSource' },
    },
  })
  .openapi('StageOutput')

const TransformSchema = z
  .object({
    type: z.string().openapi({ type: 'string' }),
    expression: z.string().openapi({ type: 'string' }),
    mapping: z
      .record(z.string(), z.string().openapi({ type: 'string' }))
      .openapi({ type: 'object', additionalProperties: { type: 'string' } }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      type: { type: 'string' },
      expression: { type: 'string' },
      mapping: { type: 'object', additionalProperties: { type: 'string' } },
    },
  })
  .openapi('Transform')

const StageConfigSchema = z
  .record(z.string(), ConfigValueSchema)
  .openapi({ type: 'object', additionalProperties: { $ref: '#/components/schemas/ConfigValue' } })
  .openapi('StageConfig')

const PipelineStageSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    type: z.string().openapi({ type: 'string' }),
    config: StageConfigSchema,
    transform: TransformSchema,
    output: StageOutputSchema,
  })
  .openapi({
    type: 'object',
    required: ['name', 'type'],
    properties: {
      name: { type: 'string' },
      type: { type: 'string' },
      config: { $ref: '#/components/schemas/StageConfig' },
      transform: { $ref: '#/components/schemas/Transform' },
      output: { $ref: '#/components/schemas/StageOutput' },
    },
  })
  .openapi('PipelineStage')

const PipelineSchema = z
  .object({
    name: z.string().optional().openapi({ type: 'string' }),
    stages: z
      .array(PipelineStageSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/PipelineStage' } }),
  })
  .openapi({
    type: 'object',
    required: ['stages'],
    properties: {
      name: { type: 'string' },
      stages: { type: 'array', items: { $ref: '#/components/schemas/PipelineStage' } },
    },
  })
  .openapi('Pipeline')

const ValidationActionSchema = z
  .object({
    type: z
      .enum(['reject', 'warn', 'transform', 'default'])
      .optional()
      .openapi({ type: 'string', enum: ['reject', 'warn', 'transform', 'default'] }),
    message: z.string().optional().openapi({ type: 'string' }),
    transform: TransformSchema,
  })
  .openapi({
    type: 'object',
    properties: {
      type: { type: 'string', enum: ['reject', 'warn', 'transform', 'default'] },
      message: { type: 'string' },
      transform: { $ref: '#/components/schemas/Transform' },
    },
  })
  .openapi('ValidationAction')

const CompoundConditionSchema = z
  .object({
    and: z
      .array(ConditionSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Condition' } }),
    or: z
      .array(ConditionSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Condition' } }),
    not: ConditionSchema,
  })
  .openapi({
    type: 'object',
    properties: {
      and: { type: 'array', items: { $ref: '#/components/schemas/Condition' } },
      or: { type: 'array', items: { $ref: '#/components/schemas/Condition' } },
      not: { $ref: '#/components/schemas/Condition' },
    },
  })
  .openapi('CompoundCondition')

const SimpleConditionSchema = z
  .object({
    field: z.string().openapi({ type: 'string' }),
    operator: z.string().openapi({ type: 'string' }),
    value: z.any(),
  })
  .openapi({
    type: 'object',
    required: ['field', 'operator', 'value'],
    properties: { field: { type: 'string' }, operator: { type: 'string' }, value: {} },
  })
  .openapi('SimpleCondition')

const ConditionSchema = z
  .lazy(() =>
    z
      .union([SimpleConditionSchema, CompoundConditionSchema])
      .optional()
      .openapi({
        oneOf: [
          { $ref: '#/components/schemas/SimpleCondition' },
          { $ref: '#/components/schemas/CompoundCondition' },
        ],
      }),
  )
  .openapi('Condition')

const ValidationRuleSchema = z
  .object({
    name: z.string().optional().openapi({ type: 'string' }),
    condition: ConditionSchema,
    action: ValidationActionSchema,
  })
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string' },
      condition: { $ref: '#/components/schemas/Condition' },
      action: { $ref: '#/components/schemas/ValidationAction' },
    },
  })
  .openapi('ValidationRule')

const ValidationRulesSchema = z
  .object({
    schema: DataSchema,
    rules: z
      .array(ValidationRuleSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/ValidationRule' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      schema: { $ref: '#/components/schemas/DataSchema' },
      rules: { type: 'array', items: { $ref: '#/components/schemas/ValidationRule' } },
    },
  })
  .openapi('ValidationRules')

const StreamDataSchema = z
  .object({
    topic: z.string().openapi({ type: 'string' }),
    partition: z.int().openapi({ type: 'integer' }),
    offset: z.int().openapi({ type: 'integer' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      topic: { type: 'string' },
      partition: { type: 'integer' },
      offset: { type: 'integer' },
    },
  })
  .openapi('StreamData')

const RawDataSchema = z
  .object({
    format: z.string().openapi({ type: 'string' }),
    content: z.string().openapi({ type: 'string' }),
    encoding: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      format: { type: 'string' },
      content: { type: 'string' },
      encoding: { type: 'string' },
    },
  })
  .openapi('RawData')

const StructuredDataSchema = z
  .object({
    schema: DataSchema,
    records: z
      .array(z.object({}).openapi({ type: 'object' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'object' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      schema: { $ref: '#/components/schemas/DataSchema' },
      records: { type: 'array', items: { type: 'object' } },
    },
  })
  .openapi('StructuredData')

const InputDataSchema = z
  .union([StructuredDataSchema, RawDataSchema, StreamDataSchema])
  .optional()
  .openapi({
    oneOf: [
      { $ref: '#/components/schemas/StructuredData' },
      { $ref: '#/components/schemas/RawData' },
      { $ref: '#/components/schemas/StreamData' },
    ],
  })
  .openapi('InputData')

const ProcessInputSchema = z
  .object({ data: InputDataSchema, source: DataSourceSchema, validation: ValidationRulesSchema })
  .openapi({
    type: 'object',
    properties: {
      data: { $ref: '#/components/schemas/InputData' },
      source: { $ref: '#/components/schemas/DataSource' },
      validation: { $ref: '#/components/schemas/ValidationRules' },
    },
  })
  .openapi('ProcessInput')

const ProcessRequestSchema = z
  .object({ input: ProcessInputSchema, pipeline: PipelineSchema, options: ProcessOptionsSchema })
  .openapi({
    type: 'object',
    required: ['input', 'pipeline'],
    properties: {
      input: { $ref: '#/components/schemas/ProcessInput' },
      pipeline: { $ref: '#/components/schemas/Pipeline' },
      options: { $ref: '#/components/schemas/ProcessOptions' },
    },
  })
  .openapi('ProcessRequest')

const ProcessErrorSchema = z
  .object({
    stage: z.string().optional().openapi({ type: 'string' }),
    message: z.string().optional().openapi({ type: 'string' }),
    details: z.object({}).openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    properties: {
      stage: { type: 'string' },
      message: { type: 'string' },
      details: { type: 'object' },
    },
  })
  .openapi('ProcessError')

const ProcessResultSchema = z
  .object({
    status: z.string().optional().openapi({ type: 'string' }),
    output: StageOutputSchema,
    metrics: z
      .record(z.string(), MetricValueSchema)
      .openapi({
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/MetricValue' },
      }),
    errors: z
      .array(ProcessErrorSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/ProcessError' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      status: { type: 'string' },
      output: { $ref: '#/components/schemas/StageOutput' },
      metrics: {
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/MetricValue' },
      },
      errors: { type: 'array', items: { $ref: '#/components/schemas/ProcessError' } },
    },
  })
  .openapi('ProcessResult')

const ViewportSchema = z
  .object({
    x: z.number().openapi({ type: 'number' }),
    y: z.number().openapi({ type: 'number' }),
    width: z.number().openapi({ type: 'number' }),
    height: z.number().openapi({ type: 'number' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      x: { type: 'number' },
      y: { type: 'number' },
      width: { type: 'number' },
      height: { type: 'number' },
    },
  })
  .openapi('Viewport')

const GraphMetadataSchema = z
  .object({
    layout: z.string().optional().openapi({ type: 'string' }),
    zoom: z.number().optional().openapi({ type: 'number' }),
    viewport: ViewportSchema,
  })
  .openapi({
    type: 'object',
    properties: {
      layout: { type: 'string' },
      zoom: { type: 'number' },
      viewport: { $ref: '#/components/schemas/Viewport' },
    },
  })
  .openapi('GraphMetadata')

const EdgeStyleSchema = z
  .object({
    color: z.string().openapi({ type: 'string' }),
    width: z.number().openapi({ type: 'number' }),
    style: z
      .enum(['solid', 'dashed', 'dotted'])
      .openapi({ type: 'string', enum: ['solid', 'dashed', 'dotted'] }),
    animated: z.boolean().openapi({ type: 'boolean' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      color: { type: 'string' },
      width: { type: 'number' },
      style: { type: 'string', enum: ['solid', 'dashed', 'dotted'] },
      animated: { type: 'boolean' },
    },
  })
  .openapi('EdgeStyle')

const GraphEdgeSchema = z
  .object({
    id: z.string().optional().openapi({ type: 'string' }),
    source: z.string().openapi({ type: 'string' }),
    target: z.string().openapi({ type: 'string' }),
    dependency: DependencyLinkSchema,
    style: EdgeStyleSchema,
  })
  .openapi({
    type: 'object',
    required: ['source', 'target'],
    properties: {
      id: { type: 'string' },
      source: { type: 'string' },
      target: { type: 'string' },
      dependency: { $ref: '#/components/schemas/DependencyLink' },
      style: { $ref: '#/components/schemas/EdgeStyle' },
    },
  })
  .openapi('GraphEdge')

const NodeStyleSchema = z
  .object({
    color: z.string().openapi({ type: 'string' }),
    shape: z.string().openapi({ type: 'string' }),
    size: z.number().openapi({ type: 'number' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { color: { type: 'string' }, shape: { type: 'string' }, size: { type: 'number' } },
  })
  .openapi('NodeStyle')

const PositionSchema = z
  .object({ x: z.number().openapi({ type: 'number' }), y: z.number().openapi({ type: 'number' }) })
  .partial()
  .openapi({ type: 'object', properties: { x: { type: 'number' }, y: { type: 'number' } } })
  .openapi('Position')

const GraphNodeSchema = z
  .object({
    id: z.string().openapi({ type: 'string' }),
    entity: EntityFullSchema,
    position: PositionSchema,
    style: NodeStyleSchema,
  })
  .openapi({
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
      entity: { $ref: '#/components/schemas/EntityFull' },
      position: { $ref: '#/components/schemas/Position' },
      style: { $ref: '#/components/schemas/NodeStyle' },
    },
  })
  .openapi('GraphNode')

const DependencyGraphSchema = z
  .object({
    nodes: z
      .array(GraphNodeSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/GraphNode' } }),
    edges: z
      .array(GraphEdgeSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/GraphEdge' } }),
    metadata: GraphMetadataSchema,
  })
  .openapi({
    type: 'object',
    required: ['nodes', 'edges'],
    properties: {
      nodes: { type: 'array', items: { $ref: '#/components/schemas/GraphNode' } },
      edges: { type: 'array', items: { $ref: '#/components/schemas/GraphEdge' } },
      metadata: { $ref: '#/components/schemas/GraphMetadata' },
    },
  })
  .openapi('DependencyGraph')

const TransformConfigSchema = z
  .intersection(
    StageConfigSchema,
    z
      .object({ errorHandling: ValidationActionSchema })
      .openapi({
        type: 'object',
        properties: { errorHandling: { $ref: '#/components/schemas/ValidationAction' } },
      }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/StageConfig' },
      {
        type: 'object',
        properties: { errorHandling: { $ref: '#/components/schemas/ValidationAction' } },
      },
    ],
  })
  .openapi('TransformConfig')

const TransformStepSchema = z
  .object({
    type: z.string().openapi({ type: 'string' }),
    config: TransformConfigSchema,
    transform: TransformSchema,
  })
  .openapi({
    type: 'object',
    required: ['type'],
    properties: {
      type: { type: 'string' },
      config: { $ref: '#/components/schemas/TransformConfig' },
      transform: { $ref: '#/components/schemas/Transform' },
    },
  })
  .openapi('TransformStep')

const TransformPipelineSchema = z
  .object({
    transforms: z
      .array(TransformStepSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/TransformStep' } }),
    input: ProcessInputSchema,
  })
  .openapi({
    type: 'object',
    required: ['transforms'],
    properties: {
      transforms: { type: 'array', items: { $ref: '#/components/schemas/TransformStep' } },
      input: { $ref: '#/components/schemas/ProcessInput' },
    },
  })
  .openapi('TransformPipeline')

const TransformResultSchema = z
  .intersection(
    ProcessResultSchema,
    z
      .object({
        transformations: z
          .array(
            z
              .object({
                step: z.string().openapi({ type: 'string' }),
                inputCount: z.int().openapi({ type: 'integer' }),
                outputCount: z.int().openapi({ type: 'integer' }),
                duration: z.int().openapi({ type: 'integer' }),
              })
              .partial()
              .openapi({
                type: 'object',
                properties: {
                  step: { type: 'string' },
                  inputCount: { type: 'integer' },
                  outputCount: { type: 'integer' },
                  duration: { type: 'integer' },
                },
              }),
          )
          .openapi({
            type: 'array',
            items: {
              type: 'object',
              properties: {
                step: { type: 'string' },
                inputCount: { type: 'integer' },
                outputCount: { type: 'integer' },
                duration: { type: 'integer' },
              },
            },
          }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          transformations: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                step: { type: 'string' },
                inputCount: { type: 'integer' },
                outputCount: { type: 'integer' },
                duration: { type: 'integer' },
              },
            },
          },
        },
      }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/ProcessResult' },
      {
        type: 'object',
        properties: {
          transformations: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                step: { type: 'string' },
                inputCount: { type: 'integer' },
                outputCount: { type: 'integer' },
                duration: { type: 'integer' },
              },
            },
          },
        },
      },
    ],
  })
  .openapi('TransformResult')

export const getEntitiesRoute = createRoute({
  method: 'get',
  path: '/entities',
  operationId: 'listEntities',
  responses: {
    200: {
      description: 'Entities',
      content: {
        'application/json': {
          schema: z
            .array(EntityFullSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/EntityFull' } }),
        },
      },
    },
  },
})

export const postProcessRoute = createRoute({
  method: 'post',
  path: '/process',
  operationId: 'processData',
  request: { body: { content: { 'application/json': { schema: ProcessRequestSchema } } } },
  responses: {
    200: {
      description: 'Result',
      content: { 'application/json': { schema: ProcessResultSchema } },
    },
  },
})

export const getGraphRoute = createRoute({
  method: 'get',
  path: '/graph',
  operationId: 'getGraph',
  responses: {
    200: {
      description: 'Graph',
      content: { 'application/json': { schema: DependencyGraphSchema } },
    },
  },
})

export const postTransformRoute = createRoute({
  method: 'post',
  path: '/transform',
  operationId: 'transform',
  request: { body: { content: { 'application/json': { schema: TransformPipelineSchema } } } },
  responses: {
    200: {
      description: 'Transformed',
      content: { 'application/json': { schema: TransformResultSchema } },
    },
  },
})
