import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

type LiteralExprType = { type: 'literal'; value: string | number | boolean }

const ExpressionSchema: z.ZodType<ExpressionType> = z
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
  type: 'unary'
  operator: '-' | '!'
  operand: z.infer<typeof ExpressionSchema>
}

type BinaryExprType = {
  type: 'binary'
  operator: '+' | '-' | '*' | '/'
  left: z.infer<typeof ExpressionSchema>
  right: z.infer<typeof ExpressionSchema>
}

const LiteralExprSchema: z.ZodType<LiteralExprType> = z
  .object({ type: z.literal('literal'), value: z.union([z.string(), z.number(), z.boolean()]) })
  .openapi({ required: ['type', 'value'] })
  .openapi('LiteralExpr')

const UnaryExprSchema: z.ZodType<UnaryExprType> = z
  .lazy(() =>
    z
      .object({ type: z.literal('unary'), operator: z.enum(['-', '!']), operand: ExpressionSchema })
      .openapi({ required: ['type', 'operator', 'operand'] }),
  )
  .openapi('UnaryExpr')

const BinaryExprSchema: z.ZodType<BinaryExprType> = z
  .lazy(() =>
    z
      .object({
        type: z.literal('binary'),
        operator: z.enum(['+', '-', '*', '/']),
        left: ExpressionSchema,
        right: ExpressionSchema,
      })
      .openapi({ required: ['type', 'operator', 'left', 'right'] }),
  )
  .openapi('BinaryExpr')

type ExpressionType =
  | z.infer<typeof LiteralExprSchema>
  | z.infer<typeof UnaryExprSchema>
  | z.infer<typeof BinaryExprSchema>

type CategoryType = { id: number; name: string; parent?: CategoryType; children?: CategoryType[] }

const CircleSchema = z
  .object({ kind: z.literal('circle'), radius: z.number() })
  .openapi({ required: ['kind', 'radius'] })
  .openapi('Circle')

const RectangleSchema = z
  .object({ kind: z.literal('rectangle'), width: z.number(), height: z.number() })
  .openapi({ required: ['kind', 'width', 'height'] })
  .openapi('Rectangle')

const TriangleSchema = z
  .object({ kind: z.literal('triangle'), base: z.number(), height: z.number() })
  .openapi({ required: ['kind', 'base', 'height'] })
  .openapi('Triangle')

const PolygonSchema = z
  .object({ kind: z.literal('polygon'), sides: z.int().min(3), sideLength: z.number() })
  .openapi({ required: ['kind', 'sides', 'sideLength'] })
  .openapi('Polygon')

const EllipseSchema = z
  .object({ kind: z.literal('ellipse'), semiMajor: z.number(), semiMinor: z.number() })
  .openapi({ required: ['kind', 'semiMajor', 'semiMinor'] })
  .openapi('Ellipse')

const ShapeSchema = z
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

const DocumentBaseSchema = z
  .object({ id: z.uuid(), title: z.string(), createdAt: z.iso.datetime() })
  .openapi({ required: ['id', 'title', 'createdAt'] })
  .openapi('DocumentBase')

const ArticleContentSchema = z
  .object({ docType: z.literal('article'), body: z.string(), wordCount: z.int().exactOptional() })
  .openapi({ required: ['docType', 'body'] })
  .openapi('ArticleContent')

const SpreadsheetContentSchema = z
  .object({ docType: z.literal('spreadsheet'), rows: z.int(), columns: z.int() })
  .openapi({ required: ['docType', 'rows', 'columns'] })
  .openapi('SpreadsheetContent')

const ArticleSchema = DocumentBaseSchema.and(ArticleContentSchema).openapi('Article')

const SpreadsheetSchema = DocumentBaseSchema.and(SpreadsheetContentSchema).openapi('Spreadsheet')

const DocumentSchema = z
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

const BaseConfigSchema = z
  .object({ version: z.int() })
  .openapi({ required: ['version'] })
  .openapi('BaseConfig')

const NetworkConfigSchema = z
  .object({ host: z.string(), port: z.int().min(1).max(65535) })
  .openapi({ required: ['host', 'port'] })
  .openapi('NetworkConfig')

const SecurityConfigSchema = z
  .object({ tlsEnabled: z.boolean(), certPath: z.string().exactOptional() })
  .openapi({ required: ['tlsEnabled'] })
  .openapi('SecurityConfig')

const FullConfigSchema = BaseConfigSchema.and(NetworkConfigSchema)
  .and(SecurityConfigSchema)
  .openapi({ description: 'Three-level allOf chain with all refs' })
  .openapi('FullConfig')

const SuccessResultSchema = z
  .object({ status: z.literal('success'), data: z.looseObject({}) })
  .openapi({ required: ['status', 'data'] })
  .openapi('SuccessResult')

const ErrorResultSchema = z
  .object({ status: z.literal('error'), message: z.string(), code: z.int().exactOptional() })
  .openapi({ required: ['status', 'message'] })
  .openapi('ErrorResult')

const NullableResultSchema = z
  .union([SuccessResultSchema, ErrorResultSchema])
  .nullable()
  .openapi({ description: 'Nullable anyOf combining success and error' })
  .openapi('NullableResult')

const CategorySchema: z.ZodType<CategoryType> = z
  .lazy(() =>
    z
      .object({
        id: z.int(),
        name: z.string(),
        parent: CategorySchema.exactOptional(),
        children: z.array(CategorySchema).exactOptional(),
      })
      .openapi({ required: ['id', 'name'] }),
  )
  .openapi('Category')

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
})

export const postShapesRoute = createRoute({
  method: 'post',
  path: '/shapes',
  description: '5-variant discriminated union',
  operationId: 'createShape',
  request: { body: { content: { 'application/json': { schema: ShapeSchema } }, required: true } },
  responses: {
    200: { description: 'Created shape', content: { 'application/json': { schema: ShapeSchema } } },
  },
})

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
})

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
})

export const getNullableUnionRoute = createRoute({
  method: 'get',
  path: '/nullable-union',
  description: 'Nullable anyOf with mixed types',
  operationId: 'getNullableUnion',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: NullableResultSchema } } },
  },
})

export const getNestedCircularRoute = createRoute({
  method: 'get',
  path: '/nested-circular',
  description: 'Circular reference through allOf',
  operationId: 'getNestedCircular',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: CategorySchema } } },
  },
})

function mockLiteralExpr() {
  return {
    type: 'literal' as const,
    value: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
      faker.datatype.boolean(),
    ]),
  }
}

function mockUnaryExpr(): any {
  return {
    type: 'unary' as const,
    operator: faker.helpers.arrayElement(['-', '!'] as const),
    operand: mockExpression(),
  }
}

function mockBinaryExpr(): any {
  return {
    type: 'binary' as const,
    operator: faker.helpers.arrayElement(['+', '-', '*', '/'] as const),
    left: mockExpression(),
    right: mockExpression(),
  }
}

function mockExpression(): any {
  return faker.helpers.arrayElement([mockLiteralExpr(), mockUnaryExpr(), mockBinaryExpr()])
}

function mockCircle() {
  return {
    kind: 'circle' as const,
    radius: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockRectangle() {
  return {
    kind: 'rectangle' as const,
    width: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    height: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockTriangle() {
  return {
    kind: 'triangle' as const,
    base: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    height: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockPolygon() {
  return {
    kind: 'polygon' as const,
    sides: faker.number.int({ min: 3, max: 1000 }),
    sideLength: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockEllipse() {
  return {
    kind: 'ellipse' as const,
    semiMajor: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    semiMinor: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockShape() {
  return faker.helpers.arrayElement([
    mockCircle(),
    mockRectangle(),
    mockTriangle(),
    mockPolygon(),
    mockEllipse(),
  ])
}

function mockDocumentBase() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    createdAt: faker.date.past().toISOString(),
  }
}

function mockArticleContent() {
  return {
    docType: 'article' as const,
    body: faker.string.alpha({ length: { min: 5, max: 20 } }),
    wordCount: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 1000 }), undefined]),
  }
}

function mockArticle() {
  return { ...mockDocumentBase(), ...mockArticleContent() }
}

function mockSpreadsheetContent() {
  return {
    docType: 'spreadsheet' as const,
    rows: faker.number.int({ min: 1, max: 1000 }),
    columns: faker.number.int({ min: 1, max: 1000 }),
  }
}

function mockSpreadsheet() {
  return { ...mockDocumentBase(), ...mockSpreadsheetContent() }
}

function mockDocument() {
  return faker.helpers.arrayElement([mockArticle(), mockSpreadsheet()])
}

function mockBaseConfig() {
  return {
    version: faker.number.int({ min: 1, max: 1000 }),
  }
}

function mockNetworkConfig() {
  return {
    host: faker.string.alpha({ length: { min: 5, max: 20 } }),
    port: faker.number.int({ min: 1, max: 65535 }),
  }
}

function mockSecurityConfig() {
  return {
    tlsEnabled: faker.datatype.boolean(),
    certPath: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
  }
}

function mockFullConfig() {
  return { ...mockBaseConfig(), ...mockNetworkConfig(), ...mockSecurityConfig() }
}

function mockSuccessResult() {
  return {
    status: 'success' as const,
    data: undefined,
  }
}

function mockErrorResult() {
  return {
    status: 'error' as const,
    message: faker.string.alpha({ length: { min: 5, max: 20 } }),
    code: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 1000 }), undefined]),
  }
}

function mockNullableResult() {
  return faker.helpers.arrayElement([mockSuccessResult(), mockErrorResult()])
}

function mockCategory(): any {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    name: faker.person.fullName(),
    parent: faker.helpers.arrayElement([mockCategory(), undefined]),
    children: faker.helpers.arrayElement([
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockCategory()),
      undefined,
    ]),
  }
}

const postExpressionsRouteHandler: RouteHandler<typeof postExpressionsRoute> = async (c) => {
  return c.json(mockExpression(), 200)
}

const postShapesRouteHandler: RouteHandler<typeof postShapesRoute> = async (c) => {
  return c.json(mockShape(), 200)
}

const postDocumentsRouteHandler: RouteHandler<typeof postDocumentsRoute> = async (c) => {
  return c.json(mockDocument(), 200)
}

const postConfigsRouteHandler: RouteHandler<typeof postConfigsRoute> = async (c) => {
  return c.json(mockFullConfig(), 200)
}

const getNullableUnionRouteHandler: RouteHandler<typeof getNullableUnionRoute> = async (c) => {
  return c.json(mockNullableResult(), 200)
}

const getNestedCircularRouteHandler: RouteHandler<typeof getNestedCircularRoute> = async (c) => {
  return c.json(mockCategory(), 200)
}

const app = new OpenAPIHono().basePath('undefined')

export const api = app
  .openapi(postExpressionsRoute, postExpressionsRouteHandler)
  .openapi(postShapesRoute, postShapesRouteHandler)
  .openapi(postDocumentsRoute, postDocumentsRouteHandler)
  .openapi(postConfigsRoute, postConfigsRouteHandler)
  .openapi(getNullableUnionRoute, getNullableUnionRouteHandler)
  .openapi(getNestedCircularRoute, getNestedCircularRouteHandler)

export default app
