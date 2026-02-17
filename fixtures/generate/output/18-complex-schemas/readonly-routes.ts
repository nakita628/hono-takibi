import { createRoute, z } from '@hono/zod-openapi'

type LiteralExprType = { readonly type: 'literal'; readonly value: string | number | boolean }

export const ExpressionSchema: z.ZodType<ExpressionType> = z
  .lazy(() =>
    z
      .xor([LiteralExprSchema, UnaryExprSchema, BinaryExprSchema])
      .openapi({
        discriminator: {
          propertyName: 'type',
          mapping: {
            literal: '#/components/schemas/LiteralExpr',
            unary: '#/components/schemas/UnaryExpr',
            binary: '#/components/schemas/BinaryExpr',
          },
        },
      }),
  )
  .openapi('Expression')

type UnaryExprType = {
  readonly type: 'unary'
  readonly operator: '-' | '!'
  readonly operand: z.infer<typeof ExpressionSchema>
}

type BinaryExprType = {
  readonly type: 'binary'
  readonly operator: '+' | '-' | '*' | '/'
  readonly left: z.infer<typeof ExpressionSchema>
  readonly right: z.infer<typeof ExpressionSchema>
}

export const LiteralExprSchema: z.ZodType<LiteralExprType> = z
  .object({ type: z.literal('literal'), value: z.union([z.string(), z.number(), z.boolean()]) })
  .readonly()
  .openapi({ required: ['type', 'value'] })
  .openapi('LiteralExpr')

export const UnaryExprSchema: z.ZodType<UnaryExprType> = z
  .lazy(() =>
    z
      .object({ type: z.literal('unary'), operator: z.enum(['-', '!']), operand: ExpressionSchema })
      .readonly()
      .openapi({ required: ['type', 'operator', 'operand'] }),
  )
  .openapi('UnaryExpr')

export const BinaryExprSchema: z.ZodType<BinaryExprType> = z
  .lazy(() =>
    z
      .object({
        type: z.literal('binary'),
        operator: z.enum(['+', '-', '*', '/']),
        left: ExpressionSchema,
        right: ExpressionSchema,
      })
      .readonly()
      .openapi({ required: ['type', 'operator', 'left', 'right'] }),
  )
  .openapi('BinaryExpr')

type ExpressionType =
  | z.infer<typeof LiteralExprSchema>
  | z.infer<typeof UnaryExprSchema>
  | z.infer<typeof BinaryExprSchema>

type CategoryType = {
  readonly id: number
  readonly name: string
  readonly parent?: CategoryType
  readonly children?: readonly CategoryType[]
}

export type LiteralExpr = z.infer<typeof LiteralExprSchema>

export type UnaryExpr = z.infer<typeof UnaryExprSchema>

export type BinaryExpr = z.infer<typeof BinaryExprSchema>

export type Expression = z.infer<typeof ExpressionSchema>

export const CircleSchema = z
  .object({ kind: z.literal('circle'), radius: z.number() })
  .readonly()
  .openapi({ required: ['kind', 'radius'] })
  .openapi('Circle')

export type Circle = z.infer<typeof CircleSchema>

export const RectangleSchema = z
  .object({ kind: z.literal('rectangle'), width: z.number(), height: z.number() })
  .readonly()
  .openapi({ required: ['kind', 'width', 'height'] })
  .openapi('Rectangle')

export type Rectangle = z.infer<typeof RectangleSchema>

export const TriangleSchema = z
  .object({ kind: z.literal('triangle'), base: z.number(), height: z.number() })
  .readonly()
  .openapi({ required: ['kind', 'base', 'height'] })
  .openapi('Triangle')

export type Triangle = z.infer<typeof TriangleSchema>

export const PolygonSchema = z
  .object({ kind: z.literal('polygon'), sides: z.int().min(3), sideLength: z.number() })
  .readonly()
  .openapi({ required: ['kind', 'sides', 'sideLength'] })
  .openapi('Polygon')

export type Polygon = z.infer<typeof PolygonSchema>

export const EllipseSchema = z
  .object({ kind: z.literal('ellipse'), semiMajor: z.number(), semiMinor: z.number() })
  .readonly()
  .openapi({ required: ['kind', 'semiMajor', 'semiMinor'] })
  .openapi('Ellipse')

export type Ellipse = z.infer<typeof EllipseSchema>

export const ShapeSchema = z
  .xor([CircleSchema, RectangleSchema, TriangleSchema, PolygonSchema, EllipseSchema])
  .openapi({
    discriminator: {
      propertyName: 'kind',
      mapping: {
        circle: '#/components/schemas/Circle',
        rectangle: '#/components/schemas/Rectangle',
        triangle: '#/components/schemas/Triangle',
        polygon: '#/components/schemas/Polygon',
        ellipse: '#/components/schemas/Ellipse',
      },
    },
  })
  .openapi('Shape')

export type Shape = z.infer<typeof ShapeSchema>

export const DocumentBaseSchema = z
  .object({ id: z.uuid(), title: z.string(), createdAt: z.iso.datetime() })
  .readonly()
  .openapi({ required: ['id', 'title', 'createdAt'] })
  .openapi('DocumentBase')

export type DocumentBase = z.infer<typeof DocumentBaseSchema>

export const ArticleContentSchema = z
  .object({ docType: z.literal('article'), body: z.string(), wordCount: z.int().exactOptional() })
  .readonly()
  .openapi({ required: ['docType', 'body'] })
  .openapi('ArticleContent')

export type ArticleContent = z.infer<typeof ArticleContentSchema>

export const SpreadsheetContentSchema = z
  .object({ docType: z.literal('spreadsheet'), rows: z.int(), columns: z.int() })
  .readonly()
  .openapi({ required: ['docType', 'rows', 'columns'] })
  .openapi('SpreadsheetContent')

export type SpreadsheetContent = z.infer<typeof SpreadsheetContentSchema>

export const ArticleSchema = DocumentBaseSchema.and(ArticleContentSchema).openapi('Article')

export type Article = z.infer<typeof ArticleSchema>

export const SpreadsheetSchema =
  DocumentBaseSchema.and(SpreadsheetContentSchema).openapi('Spreadsheet')

export type Spreadsheet = z.infer<typeof SpreadsheetSchema>

export const DocumentSchema = z
  .xor([ArticleSchema, SpreadsheetSchema])
  .openapi({
    description: 'oneOf where each branch is an allOf composition',
    discriminator: {
      propertyName: 'docType',
      mapping: {
        article: '#/components/schemas/Article',
        spreadsheet: '#/components/schemas/Spreadsheet',
      },
    },
  })
  .openapi('Document')

export type Document = z.infer<typeof DocumentSchema>

export const BaseConfigSchema = z
  .object({ version: z.int() })
  .readonly()
  .openapi({ required: ['version'] })
  .openapi('BaseConfig')

export type BaseConfig = z.infer<typeof BaseConfigSchema>

export const NetworkConfigSchema = z
  .object({ host: z.string(), port: z.int().min(1).max(65535) })
  .readonly()
  .openapi({ required: ['host', 'port'] })
  .openapi('NetworkConfig')

export type NetworkConfig = z.infer<typeof NetworkConfigSchema>

export const SecurityConfigSchema = z
  .object({ tlsEnabled: z.boolean(), certPath: z.string().exactOptional() })
  .readonly()
  .openapi({ required: ['tlsEnabled'] })
  .openapi('SecurityConfig')

export type SecurityConfig = z.infer<typeof SecurityConfigSchema>

export const FullConfigSchema = BaseConfigSchema.and(NetworkConfigSchema)
  .and(SecurityConfigSchema)
  .openapi({ description: 'Three-level allOf chain with all refs' })
  .openapi('FullConfig')

export type FullConfig = z.infer<typeof FullConfigSchema>

export const SuccessResultSchema = z
  .object({ status: z.literal('success'), data: z.looseObject({}).readonly() })
  .readonly()
  .openapi({ required: ['status', 'data'] })
  .openapi('SuccessResult')

export type SuccessResult = z.infer<typeof SuccessResultSchema>

export const ErrorResultSchema = z
  .object({ status: z.literal('error'), message: z.string(), code: z.int().exactOptional() })
  .readonly()
  .openapi({ required: ['status', 'message'] })
  .openapi('ErrorResult')

export type ErrorResult = z.infer<typeof ErrorResultSchema>

export const NullableResultSchema = z
  .union([SuccessResultSchema, ErrorResultSchema])
  .nullable()
  .openapi({ description: 'Nullable anyOf combining success and error' })
  .openapi('NullableResult')

export type NullableResult = z.infer<typeof NullableResultSchema>

export const CategorySchema: z.ZodType<CategoryType> = z
  .lazy(() =>
    z
      .object({
        id: z.int(),
        name: z.string(),
        parent: CategorySchema.exactOptional(),
        children: z.array(CategorySchema).readonly().exactOptional(),
      })
      .readonly()
      .openapi({ required: ['id', 'name'] }),
  )
  .openapi('Category')

export type Category = z.infer<typeof CategorySchema>

export const postExpressionsRoute = createRoute({
  method: 'post',
  path: '/expressions',
  description: 'Circular reference with oneOf (expression tree)',
  operationId: 'evaluateExpression',
  request: {
    body: { content: { 'application/json': { schema: ExpressionSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'Evaluation result',
      content: { 'application/json': { schema: ExpressionSchema } },
    },
  },
} as const)

export const postShapesRoute = createRoute({
  method: 'post',
  path: '/shapes',
  description: '5-variant discriminated union',
  operationId: 'createShape',
  request: { body: { content: { 'application/json': { schema: ShapeSchema } }, required: true } },
  responses: {
    200: { description: 'Created shape', content: { 'application/json': { schema: ShapeSchema } } },
  },
} as const)

export const postDocumentsRoute = createRoute({
  method: 'post',
  path: '/documents',
  description: 'allOf inside oneOf (nested composition)',
  operationId: 'createDocument',
  request: {
    body: { content: { 'application/json': { schema: DocumentSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'Created document',
      content: { 'application/json': { schema: DocumentSchema } },
    },
  },
} as const)

export const postConfigsRoute = createRoute({
  method: 'post',
  path: '/configs',
  description: 'Deeply nested allOf chain',
  operationId: 'createConfig',
  request: {
    body: { content: { 'application/json': { schema: FullConfigSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'Created config',
      content: { 'application/json': { schema: FullConfigSchema } },
    },
  },
} as const)

export const getNullableUnionRoute = createRoute({
  method: 'get',
  path: '/nullable-union',
  description: 'Nullable anyOf with mixed types',
  operationId: 'getNullableUnion',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: NullableResultSchema } } },
  },
} as const)

export const getNestedCircularRoute = createRoute({
  method: 'get',
  path: '/nested-circular',
  description: 'Circular reference through allOf',
  operationId: 'getNestedCircular',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: CategorySchema } } },
  },
} as const)
