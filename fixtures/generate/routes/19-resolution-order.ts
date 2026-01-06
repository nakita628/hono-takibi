import { createRoute, z } from '@hono/zod-openapi'

type ConfigValueType =
  | string
  | number
  | boolean
  | ConfigValueType[]
  | { [key: string]: ConfigValueType }

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

const FieldValidationSchema = z
  .object({
    required: z.boolean().exactOptional(),
    pattern: z.string().exactOptional(),
    min: z.number().exactOptional(),
    max: z.number().exactOptional(),
    enum: z.array(z.string()).exactOptional(),
  })
  .openapi('FieldValidation')

const FieldDefinitionSchema = z
  .object({
    name: z.string(),
    type: z.string(),
    nullable: z.boolean().exactOptional(),
    default: ConfigValueSchema.exactOptional(),
    validation: FieldValidationSchema.exactOptional(),
  })
  .openapi({ required: ['name', 'type'] })
  .openapi('FieldDefinition')

type DataSchemaType = {
  name?: string
  fields?: z.infer<typeof FieldDefinitionSchema>[]
  nested?: { [key: string]: DataSchemaType }
}

type SimpleConditionType = { field: string; operator: string; value: { [key: string]: unknown } }

type CompoundConditionType = { and?: ConditionType[]; or?: ConditionType[]; not?: ConditionType }

type ConditionType = SimpleConditionType | CompoundConditionType

const EntityTypeSchema = z
  .enum(['service', 'database', 'cache', 'queue', 'gateway'])
  .openapi('EntityType')

const EntityStatusSchema = z
  .enum(['active', 'inactive', 'maintenance', 'deprecated'])
  .openapi('EntityStatus')

const LabelSchema = z
  .object({
    name: z.string(),
    description: z.string().exactOptional(),
    required: z.boolean().exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('Label')

const CriticalitySchema = z.enum(['critical', 'high', 'medium', 'low']).openapi('Criticality')

const ThresholdSchema = z
  .object({
    level: CriticalitySchema.exactOptional(),
    operator: z.enum(['lt', 'lte', 'gt', 'gte', 'eq', 'ne']).exactOptional(),
    value: z.number().exactOptional(),
  })
  .openapi('Threshold')

const MetricDefinitionSchema = z
  .object({
    name: z.string(),
    type: z.enum(['counter', 'gauge', 'histogram', 'summary']),
    unit: z.string().exactOptional(),
    labels: z.array(LabelSchema).exactOptional(),
    thresholds: z.array(ThresholdSchema).exactOptional(),
  })
  .openapi({ required: ['name', 'type'] })
  .openapi('MetricDefinition')

const MetricValueSchema = z
  .object({
    value: z.number().exactOptional(),
    unit: z.string().exactOptional(),
    definition: MetricDefinitionSchema.exactOptional(),
    timestamp: z.iso.datetime().exactOptional(),
  })
  .openapi('MetricValue')

const HealthCheckSchema = z
  .object({
    name: z.string(),
    status: z.enum(['pass', 'fail', 'warn']),
    message: z.string().exactOptional(),
    metrics: z.record(z.string(), MetricValueSchema).exactOptional(),
  })
  .openapi({ required: ['name', 'status'] })
  .openapi('HealthCheck')

const HealthStatusSchema = z
  .object({
    status: z.enum(['healthy', 'degraded', 'unhealthy', 'unknown']),
    checks: z.array(HealthCheckSchema).exactOptional(),
    lastChecked: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['status'] })
  .openapi('HealthStatus')

const TagSchema = z
  .object({ key: z.string(), value: z.string() })
  .openapi({ required: ['key', 'value'] })
  .openapi('Tag')

const EntityDetailsSchema = z
  .object({
    name: z.string().exactOptional(),
    description: z.string().exactOptional(),
    version: z.string().exactOptional(),
    status: EntityStatusSchema.exactOptional(),
    health: HealthStatusSchema.exactOptional(),
    tags: z.array(TagSchema).exactOptional(),
  })
  .openapi('EntityDetails')

const SecretReferenceSchema = z
  .object({ name: z.string(), source: z.string(), version: z.string().exactOptional() })
  .openapi({ required: ['name', 'source'] })
  .openapi('SecretReference')

const EnvironmentSchema = z
  .object({
    name: z.string().exactOptional(),
    variables: z.record(z.string(), z.string()).exactOptional(),
    secrets: z.array(SecretReferenceSchema).exactOptional(),
  })
  .openapi('Environment')

const EntityConfigSchema = z
  .object({
    settings: z.record(z.string(), ConfigValueSchema).exactOptional(),
    secrets: z.array(SecretReferenceSchema).exactOptional(),
    environment: EnvironmentSchema.exactOptional(),
  })
  .openapi('EntityConfig')

const EntityCoreSchema = z
  .object({
    id: z.uuid(),
    type: EntityTypeSchema,
    details: EntityDetailsSchema,
    config: EntityConfigSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'type', 'details'] })
  .openapi('EntityCore')

const AnnotationSchema = z
  .object({
    value: z.string().exactOptional(),
    author: z.string().exactOptional(),
    timestamp: z.iso.datetime().exactOptional(),
  })
  .openapi('Annotation')

const LinkMetadataSchema = z
  .object({
    createdAt: z.iso.datetime().exactOptional(),
    createdBy: z.string().exactOptional(),
    annotations: z.record(z.string(), AnnotationSchema).exactOptional(),
  })
  .openapi('LinkMetadata')

const EntityLinkSchema = z
  .object({ id: z.uuid(), type: EntityTypeSchema, metadata: LinkMetadataSchema.exactOptional() })
  .openapi({ required: ['id', 'type'] })
  .openapi('EntityLink')

const DependencyTypeSchema = z.enum(['hard', 'soft', 'optional']).openapi('DependencyType')

const DependencyLinkSchema = EntityLinkSchema.and(
  z.object({
    dependencyType: DependencyTypeSchema.exactOptional(),
    criticality: CriticalitySchema.exactOptional(),
  }),
).openapi('DependencyLink')

const EntityRelationsSchema = z
  .object({
    parent: EntityLinkSchema.exactOptional(),
    children: z.array(EntityLinkSchema).exactOptional(),
    dependencies: z.array(DependencyLinkSchema).exactOptional(),
  })
  .openapi('EntityRelations')

const DimensionSchema = z
  .object({ name: z.string(), values: z.array(z.string()).exactOptional() })
  .openapi({ required: ['name'] })
  .openapi('Dimension')

const MetricAggregationSchema = z
  .object({
    metric: MetricDefinitionSchema.exactOptional(),
    function: z.enum(['sum', 'avg', 'min', 'max', 'count', 'p50', 'p95', 'p99']).exactOptional(),
    dimensions: z.array(DimensionSchema).exactOptional(),
  })
  .openapi('MetricAggregation')

const EntityMetricsSchema = z
  .object({
    metrics: z.record(z.string(), MetricValueSchema).exactOptional(),
    aggregations: z.array(MetricAggregationSchema).exactOptional(),
  })
  .openapi('EntityMetrics')

const EntityFullSchema = EntityCoreSchema.and(EntityRelationsSchema)
  .and(EntityMetricsSchema)
  .openapi('EntityFull')

const DataSchema: z.ZodType<DataSchemaType> = z
  .lazy(() =>
    z.object({
      name: z.string().exactOptional(),
      fields: z.array(FieldDefinitionSchema).exactOptional(),
      nested: z.record(z.string(), DataSchema).exactOptional(),
    }),
  )
  .openapi('DataSchema')

const StructuredDataSchema = z
  .object({ schema: DataSchema.exactOptional(), records: z.array(z.object({})).exactOptional() })
  .openapi('StructuredData')

const RawDataSchema = z
  .object({
    format: z.string().exactOptional(),
    content: z.string().exactOptional(),
    encoding: z.string().exactOptional(),
  })
  .openapi('RawData')

const StreamDataSchema = z
  .object({
    topic: z.string().exactOptional(),
    partition: z.int().exactOptional(),
    offset: z.int().exactOptional(),
  })
  .openapi('StreamData')

const InputDataSchema = z
  .xor([StructuredDataSchema, RawDataSchema, StreamDataSchema])
  .openapi('InputData')

const ConnectionConfigSchema = z
  .object({
    host: z.string().exactOptional(),
    port: z.int().exactOptional(),
    database: z.string().exactOptional(),
    options: ConfigValueSchema.exactOptional(),
  })
  .openapi('ConnectionConfig')

const CredentialsSchema = z
  .object({
    type: z.enum(['basic', 'token', 'oauth', 'certificate']).exactOptional(),
    secrets: z.array(SecretReferenceSchema).exactOptional(),
  })
  .openapi('Credentials')

const DataSourceSchema = z
  .object({
    type: z.string().exactOptional(),
    connection: ConnectionConfigSchema.exactOptional(),
    credentials: CredentialsSchema.exactOptional(),
  })
  .openapi('DataSource')

const ConditionSchema: z.ZodType<ConditionType> = z
  .lazy(() => z.xor([SimpleConditionSchema, CompoundConditionSchema]))
  .openapi('Condition')

const TransformSchema = z
  .object({
    type: z.string().exactOptional(),
    expression: z.string().exactOptional(),
    mapping: z.record(z.string(), z.string()).exactOptional(),
  })
  .openapi('Transform')

const ValidationActionSchema = z
  .object({
    type: z.enum(['reject', 'warn', 'transform', 'default']).exactOptional(),
    message: z.string().exactOptional(),
    transform: TransformSchema.exactOptional(),
  })
  .openapi('ValidationAction')

const ValidationRuleSchema = z
  .object({
    name: z.string().exactOptional(),
    condition: ConditionSchema.exactOptional(),
    action: ValidationActionSchema.exactOptional(),
  })
  .openapi('ValidationRule')

const ValidationRulesSchema = z
  .object({
    schema: DataSchema.exactOptional(),
    rules: z.array(ValidationRuleSchema).exactOptional(),
  })
  .openapi('ValidationRules')

const ProcessInputSchema = z
  .object({
    data: InputDataSchema.exactOptional(),
    source: DataSourceSchema.exactOptional(),
    validation: ValidationRulesSchema.exactOptional(),
  })
  .openapi('ProcessInput')

const StageConfigSchema = z.record(z.string(), ConfigValueSchema).openapi('StageConfig')

const StageOutputSchema = z
  .object({
    format: z.string().exactOptional(),
    schema: DataSchema.exactOptional(),
    destination: DataSourceSchema.exactOptional(),
  })
  .openapi('StageOutput')

const PipelineStageSchema = z
  .object({
    name: z.string(),
    type: z.string(),
    config: StageConfigSchema.exactOptional(),
    transform: TransformSchema.exactOptional(),
    output: StageOutputSchema.exactOptional(),
  })
  .openapi({ required: ['name', 'type'] })
  .openapi('PipelineStage')

const PipelineSchema = z
  .object({ name: z.string().exactOptional(), stages: z.array(PipelineStageSchema) })
  .openapi({ required: ['stages'] })
  .openapi('Pipeline')

const RetryPolicySchema = z
  .object({
    maxRetries: z.int().exactOptional(),
    backoff: z.enum(['fixed', 'exponential', 'linear']).exactOptional(),
    initialDelay: z.int().exactOptional(),
    maxDelay: z.int().exactOptional(),
  })
  .openapi('RetryPolicy')

const ProcessOptionsSchema = z
  .object({
    parallel: z.boolean().exactOptional(),
    batchSize: z.int().exactOptional(),
    timeout: z.int().exactOptional(),
    retryPolicy: RetryPolicySchema.exactOptional(),
  })
  .openapi('ProcessOptions')

const ProcessRequestSchema = z
  .object({
    input: ProcessInputSchema,
    pipeline: PipelineSchema,
    options: ProcessOptionsSchema.exactOptional(),
  })
  .openapi({ required: ['input', 'pipeline'] })
  .openapi('ProcessRequest')

const SimpleConditionSchema: z.ZodType<SimpleConditionType> = z
  .object({ field: z.string(), operator: z.string(), value: z.any() })
  .openapi({ required: ['field', 'operator', 'value'] })
  .openapi('SimpleCondition')

const CompoundConditionSchema: z.ZodType<CompoundConditionType> = z
  .lazy(() =>
    z.object({
      and: z.array(ConditionSchema).exactOptional(),
      or: z.array(ConditionSchema).exactOptional(),
      not: ConditionSchema.exactOptional(),
    }),
  )
  .openapi('CompoundCondition')

const ProcessErrorSchema = z
  .object({
    stage: z.string().exactOptional(),
    message: z.string().exactOptional(),
    details: z.object({}).exactOptional(),
  })
  .openapi('ProcessError')

const ProcessResultSchema = z
  .object({
    status: z.string().exactOptional(),
    output: StageOutputSchema.exactOptional(),
    metrics: z.record(z.string(), MetricValueSchema).exactOptional(),
    errors: z.array(ProcessErrorSchema).exactOptional(),
  })
  .openapi('ProcessResult')

const PositionSchema = z
  .object({ x: z.number().exactOptional(), y: z.number().exactOptional() })
  .openapi('Position')

const NodeStyleSchema = z
  .object({
    color: z.string().exactOptional(),
    shape: z.string().exactOptional(),
    size: z.number().exactOptional(),
  })
  .openapi('NodeStyle')

const GraphNodeSchema = z
  .object({
    id: z.string(),
    entity: EntityFullSchema.exactOptional(),
    position: PositionSchema.exactOptional(),
    style: NodeStyleSchema.exactOptional(),
  })
  .openapi({ required: ['id'] })
  .openapi('GraphNode')

const EdgeStyleSchema = z
  .object({
    color: z.string().exactOptional(),
    width: z.number().exactOptional(),
    style: z.enum(['solid', 'dashed', 'dotted']).exactOptional(),
    animated: z.boolean().exactOptional(),
  })
  .openapi('EdgeStyle')

const GraphEdgeSchema = z
  .object({
    id: z.string().exactOptional(),
    source: z.string(),
    target: z.string(),
    dependency: DependencyLinkSchema.exactOptional(),
    style: EdgeStyleSchema.exactOptional(),
  })
  .openapi({ required: ['source', 'target'] })
  .openapi('GraphEdge')

const ViewportSchema = z
  .object({
    x: z.number().exactOptional(),
    y: z.number().exactOptional(),
    width: z.number().exactOptional(),
    height: z.number().exactOptional(),
  })
  .openapi('Viewport')

const GraphMetadataSchema = z
  .object({
    layout: z.string().exactOptional(),
    zoom: z.number().exactOptional(),
    viewport: ViewportSchema.exactOptional(),
  })
  .openapi('GraphMetadata')

const DependencyGraphSchema = z
  .object({
    nodes: z.array(GraphNodeSchema),
    edges: z.array(GraphEdgeSchema),
    metadata: GraphMetadataSchema.exactOptional(),
  })
  .openapi({ required: ['nodes', 'edges'] })
  .openapi('DependencyGraph')

const TransformConfigSchema = StageConfigSchema.and(
  z.object({ errorHandling: ValidationActionSchema.exactOptional() }),
).openapi('TransformConfig')

const TransformStepSchema = z
  .object({
    type: z.string(),
    config: TransformConfigSchema.exactOptional(),
    transform: TransformSchema.exactOptional(),
  })
  .openapi({ required: ['type'] })
  .openapi('TransformStep')

const TransformPipelineSchema = z
  .object({ transforms: z.array(TransformStepSchema), input: ProcessInputSchema.exactOptional() })
  .openapi({ required: ['transforms'] })
  .openapi('TransformPipeline')

const TransformResultSchema = ProcessResultSchema.and(
  z.object({
    transformations: z
      .array(
        z.object({
          step: z.string().exactOptional(),
          inputCount: z.int().exactOptional(),
          outputCount: z.int().exactOptional(),
          duration: z.int().exactOptional(),
        }),
      )
      .exactOptional(),
  }),
).openapi('TransformResult')

export const getEntitiesRoute = createRoute({
  method: 'get',
  path: '/entities',
  operationId: 'listEntities',
  responses: {
    200: {
      description: 'Entities',
      content: { 'application/json': { schema: z.array(EntityFullSchema) } },
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
