import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

type CircularRefsTreeNodeType = { id: number; value: string; children?: CircularRefsTreeNodeType[] }

const CircularRefsNodeBSchema: z.ZodType<CircularRefsNodeBType> = z
  .lazy(() =>
    z
      .object({ id: z.int(), ref: CircularRefsNodeCSchema.exactOptional() })
      .openapi({ required: ['id'] }),
  )
  .openapi('CircularRefsNodeB')

type CircularRefsNodeAType = { id: number; ref?: z.infer<typeof CircularRefsNodeBSchema> }

const CircularRefsNodeCSchema: z.ZodType<CircularRefsNodeCType> = z
  .lazy(() =>
    z
      .object({ id: z.int(), ref: CircularRefsNodeASchema.exactOptional() })
      .openapi({ required: ['id'] }),
  )
  .openapi('CircularRefsNodeC')

type CircularRefsNodeBType = { id: number; ref?: z.infer<typeof CircularRefsNodeCSchema> }

const CircularRefsNodeASchema: z.ZodType<CircularRefsNodeAType> = z
  .lazy(() =>
    z
      .object({ id: z.int(), ref: CircularRefsNodeBSchema.exactOptional() })
      .openapi({ required: ['id'] }),
  )
  .openapi('CircularRefsNodeA')

type CircularRefsNodeCType = { id: number; ref?: z.infer<typeof CircularRefsNodeASchema> }

type ComplexSchemasLiteralExprType = { type: 'literal'; value: string | number | boolean }

const ComplexSchemasExpressionSchema: z.ZodType<ComplexSchemasExpressionType> = z
  .lazy(() =>
    z
      .xor([
        ComplexSchemasLiteralExprSchema,
        ComplexSchemasUnaryExprSchema,
        ComplexSchemasBinaryExprSchema,
      ])
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
  .openapi('ComplexSchemasExpression')

type ComplexSchemasUnaryExprType = {
  type: 'unary'
  operator: '-' | '!'
  operand: z.infer<typeof ComplexSchemasExpressionSchema>
}

type ComplexSchemasBinaryExprType = {
  type: 'binary'
  operator: '+' | '-' | '*' | '/'
  left: z.infer<typeof ComplexSchemasExpressionSchema>
  right: z.infer<typeof ComplexSchemasExpressionSchema>
}

const ComplexSchemasLiteralExprSchema: z.ZodType<ComplexSchemasLiteralExprType> = z
  .object({ type: z.literal('literal'), value: z.union([z.string(), z.number(), z.boolean()]) })
  .openapi({ required: ['type', 'value'] })
  .openapi('ComplexSchemasLiteralExpr')

const ComplexSchemasUnaryExprSchema: z.ZodType<ComplexSchemasUnaryExprType> = z
  .lazy(() =>
    z
      .object({
        type: z.literal('unary'),
        operator: z.enum(['-', '!']),
        operand: ComplexSchemasExpressionSchema,
      })
      .openapi({ required: ['type', 'operator', 'operand'] }),
  )
  .openapi('ComplexSchemasUnaryExpr')

const ComplexSchemasBinaryExprSchema: z.ZodType<ComplexSchemasBinaryExprType> = z
  .lazy(() =>
    z
      .object({
        type: z.literal('binary'),
        operator: z.enum(['+', '-', '*', '/']),
        left: ComplexSchemasExpressionSchema,
        right: ComplexSchemasExpressionSchema,
      })
      .openapi({ required: ['type', 'operator', 'left', 'right'] }),
  )
  .openapi('ComplexSchemasBinaryExpr')

type ComplexSchemasExpressionType =
  | z.infer<typeof ComplexSchemasLiteralExprSchema>
  | z.infer<typeof ComplexSchemasUnaryExprSchema>
  | z.infer<typeof ComplexSchemasBinaryExprSchema>

type ComplexSchemasCategoryType = {
  id: number
  name: string
  parent?: ComplexSchemasCategoryType
  children?: ComplexSchemasCategoryType[]
}

const AllExportsUserSchema = z
  .object({ id: z.int(), name: z.string(), email: z.email() })
  .openapi({ required: ['id', 'name', 'email'] })
  .openapi('AllExportsUser')

const AllExportsUserListSchema = z.array(AllExportsUserSchema).openapi('AllExportsUserList')

const CircularRefsTreeNodeSchema: z.ZodType<CircularRefsTreeNodeType> = z
  .lazy(() =>
    z
      .object({
        id: z.int(),
        value: z.string(),
        children: z.array(CircularRefsTreeNodeSchema).exactOptional(),
      })
      .openapi({ required: ['id', 'value'] }),
  )
  .openapi('CircularRefsTreeNode')

const ParametersMergeItemSchema = z
  .object({ id: z.int(), name: z.string(), createdAt: z.iso.datetime() })
  .openapi({ required: ['id', 'name', 'createdAt'] })
  .openapi('ParametersMergeItem')

const ParametersMergeItemUpdateSchema = z
  .object({ name: z.string().exactOptional() })
  .openapi('ParametersMergeItemUpdate')

const SchemaEdgeCasesNullableFieldsSchema = z
  .object({
    name: z.string(),
    nickname: z.string().nullable().exactOptional(),
    age: z.int().nullable().exactOptional(),
    tags: z.array(z.string()).nullable().exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('SchemaEdgeCasesNullableFields')

const SchemaEdgeCasesCircleSchema = z
  .object({ kind: z.literal('circle'), radius: z.number() })
  .openapi({ required: ['kind', 'radius'] })
  .openapi('SchemaEdgeCasesCircle')

const SchemaEdgeCasesRectangleSchema = z
  .object({ kind: z.literal('rectangle'), width: z.number(), height: z.number() })
  .openapi({ required: ['kind', 'width', 'height'] })
  .openapi('SchemaEdgeCasesRectangle')

const SchemaEdgeCasesShapeSchema = z
  .xor([SchemaEdgeCasesCircleSchema, SchemaEdgeCasesRectangleSchema])
  .openapi({
    discriminator: {
      propertyName: 'kind',
      mapping: {
        circle: '#/components/schemas/Circle',
        rectangle: '#/components/schemas/Rectangle',
      },
    },
  })
  .openapi('SchemaEdgeCasesShape')

const SchemaEdgeCasesBaseSchema = z
  .object({ id: z.int(), createdAt: z.iso.datetime() })
  .openapi({ required: ['id', 'createdAt'] })
  .openapi('SchemaEdgeCasesBase')

const SchemaEdgeCasesExtendedSchema = z
  .object({ name: z.string(), description: z.string().exactOptional() })
  .openapi({ required: ['name'] })
  .openapi('SchemaEdgeCasesExtended')

const SchemaEdgeCasesComposedObjectSchema = SchemaEdgeCasesBaseSchema.and(
  SchemaEdgeCasesExtendedSchema,
)
  .and(z.object({ extra: z.boolean().exactOptional() }))
  .openapi('SchemaEdgeCasesComposedObject')

const SchemaEdgeCasesLevel1Schema = z
  .object({
    level2: z
      .object({ level3: z.object({ value: z.string() }).openapi({ required: ['value'] }) })
      .openapi({ required: ['level3'] }),
  })
  .openapi({ required: ['level2'] })
  .openapi('SchemaEdgeCasesLevel1')

const SchemaEdgeCasesDynamicMapSchema = z
  .record(z.string(), z.string())
  .openapi('SchemaEdgeCasesDynamicMap')

const SchemaEdgeCasesAnyOfExampleSchema = z
  .union([z.string(), z.int(), z.boolean()])
  .openapi('SchemaEdgeCasesAnyOfExample')

const CallbacksLinksSubscriptionRequestSchema = z
  .object({ callbackUrl: z.url(), events: z.array(z.enum(['created', 'updated', 'deleted'])) })
  .openapi({ required: ['callbackUrl', 'events'] })
  .openapi('CallbacksLinksSubscriptionRequest')

const CallbacksLinksSubscriptionSchema = z
  .object({
    id: z.string(),
    callbackUrl: z.url(),
    events: z.array(z.string()),
    status: z.enum(['active', 'paused', 'cancelled']),
  })
  .openapi({ required: ['id', 'callbackUrl', 'events', 'status'] })
  .openapi('CallbacksLinksSubscription')

const CallbacksLinksEventPayloadSchema = z
  .object({
    event: z.string(),
    timestamp: z.iso.datetime(),
    data: z.looseObject({}).exactOptional(),
  })
  .openapi({ required: ['event', 'timestamp'] })
  .openapi('CallbacksLinksEventPayload')

const CrudRefsAuthorSchema = z
  .object({ id: z.int(), name: z.string(), avatarUrl: z.url().exactOptional() })
  .openapi({ required: ['id', 'name'] })
  .openapi('CrudRefsAuthor')

const CrudRefsTagSchema = z
  .object({ id: z.int(), name: z.string(), slug: z.string() })
  .openapi({ required: ['id', 'name', 'slug'] })
  .openapi('CrudRefsTag')

const CrudRefsPostSchema = z
  .object({
    id: z.int(),
    title: z.string(),
    body: z.string(),
    author: CrudRefsAuthorSchema,
    tags: z.array(CrudRefsTagSchema).exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'title', 'body', 'author', 'createdAt', 'updatedAt'] })
  .openapi('CrudRefsPost')

const CrudRefsCreatePostSchema = z
  .object({ title: z.string(), body: z.string(), tagIds: z.array(z.int()).exactOptional() })
  .openapi({ required: ['title', 'body'] })
  .openapi('CrudRefsCreatePost')

const CrudRefsUpdatePostSchema = z
  .object({
    title: z.string().exactOptional(),
    body: z.string().exactOptional(),
    tagIds: z.array(z.int()).exactOptional(),
  })
  .openapi('CrudRefsUpdatePost')

const CrudRefsCommentSchema = z
  .object({
    id: z.int(),
    body: z.string(),
    author: CrudRefsAuthorSchema,
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'body', 'author', 'createdAt'] })
  .openapi('CrudRefsComment')

const CrudRefsCreateCommentSchema = z
  .object({ body: z.string() })
  .openapi({ required: ['body'] })
  .openapi('CrudRefsCreateComment')

const CrudRefsPaginationSchema = z
  .object({ page: z.int(), limit: z.int(), total: z.int() })
  .openapi({ required: ['page', 'limit', 'total'] })
  .openapi('CrudRefsPagination')

const CrudRefsErrorSchema = z
  .object({ code: z.int(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .openapi('CrudRefsError')

const ComprehensiveAddressSchema = z
  .object({
    street: z.string(),
    city: z.string(),
    state: z.string().exactOptional(),
    zip: z.string().exactOptional(),
    country: z.string(),
  })
  .openapi({ required: ['street', 'city', 'country'] })
  .openapi('ComprehensiveAddress')

const ComprehensiveUserSchema = z
  .object({
    id: z.int(),
    name: z.string(),
    email: z.email(),
    role: z.enum(['admin', 'customer']),
    address: ComprehensiveAddressSchema.exactOptional(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'name', 'email', 'role', 'createdAt'] })
  .openapi('ComprehensiveUser')

const ComprehensiveCreateUserSchema = z
  .object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(8),
    role: z.enum(['admin', 'customer']).exactOptional(),
    address: ComprehensiveAddressSchema.exactOptional(),
  })
  .openapi({ required: ['name', 'email', 'password'] })
  .openapi('ComprehensiveCreateUser')

const ComprehensiveUpdateUserSchema = z
  .object({
    name: z.string().exactOptional(),
    email: z.email().exactOptional(),
    address: ComprehensiveAddressSchema.exactOptional(),
  })
  .openapi('ComprehensiveUpdateUser')

const ComprehensiveCategorySchema = z
  .object({ id: z.int(), name: z.string(), parentId: z.int().nullable().exactOptional() })
  .openapi({ required: ['id', 'name'] })
  .openapi('ComprehensiveCategory')

const ComprehensiveProductSchema = z
  .object({
    id: z.int(),
    name: z.string(),
    description: z.string().exactOptional(),
    price: z.number().min(0),
    category: ComprehensiveCategorySchema,
    tags: z.array(z.string()).exactOptional(),
    inStock: z.boolean(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'name', 'price', 'category', 'inStock', 'createdAt'] })
  .openapi('ComprehensiveProduct')

const ComprehensiveCreateProductSchema = z
  .object({
    name: z.string(),
    description: z.string().exactOptional(),
    price: z.number().min(0),
    categoryId: z.int(),
    tags: z.array(z.string()).exactOptional(),
  })
  .openapi({ required: ['name', 'price', 'categoryId'] })
  .openapi('ComprehensiveCreateProduct')

const ComprehensiveUpdateProductSchema = z
  .object({
    name: z.string().exactOptional(),
    description: z.string().exactOptional(),
    price: z.number().min(0).exactOptional(),
    categoryId: z.int().exactOptional(),
    tags: z.array(z.string()).exactOptional(),
  })
  .openapi('ComprehensiveUpdateProduct')

const ComprehensiveReviewSchema = z
  .object({
    id: z.int(),
    rating: z.int().min(1).max(5),
    comment: z.string().exactOptional(),
    author: ComprehensiveUserSchema,
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'rating', 'author', 'createdAt'] })
  .openapi('ComprehensiveReview')

const ComprehensiveCreateReviewSchema = z
  .object({ rating: z.int().min(1).max(5), comment: z.string().exactOptional() })
  .openapi({ required: ['rating'] })
  .openapi('ComprehensiveCreateReview')

const ComprehensiveOrderItemSchema = z
  .object({ product: ComprehensiveProductSchema, quantity: z.int().min(1), price: z.number() })
  .openapi({ required: ['product', 'quantity', 'price'] })
  .openapi('ComprehensiveOrderItem')

const ComprehensiveOrderSchema = z
  .object({
    id: z.int(),
    user: ComprehensiveUserSchema,
    items: z.array(ComprehensiveOrderItemSchema),
    status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
    totalPrice: z.number(),
    shippingAddress: ComprehensiveAddressSchema,
    createdAt: z.iso.datetime(),
  })
  .openapi({
    required: ['id', 'user', 'items', 'status', 'totalPrice', 'shippingAddress', 'createdAt'],
  })
  .openapi('ComprehensiveOrder')

const ComprehensiveCreateOrderSchema = z
  .object({
    items: z.array(
      z
        .object({ productId: z.int(), quantity: z.int().min(1) })
        .openapi({ required: ['productId', 'quantity'] }),
    ),
    shippingAddress: ComprehensiveAddressSchema,
    callbackUrl: z.url().exactOptional(),
  })
  .openapi({ required: ['items', 'shippingAddress'] })
  .openapi('ComprehensiveCreateOrder')

const ComprehensiveErrorSchema = z
  .object({ code: z.int(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .openapi('ComprehensiveError')

const CompositionKeywordsCreditCardSchema = z
  .object({ type: z.literal('credit_card'), cardNumber: z.string(), expiry: z.string() })
  .openapi({ required: ['type', 'cardNumber', 'expiry'] })
  .openapi('CompositionKeywordsCreditCard')

const CompositionKeywordsBankTransferSchema = z
  .object({ type: z.literal('bank_transfer'), bankCode: z.string(), accountNumber: z.string() })
  .openapi({ required: ['type', 'bankCode', 'accountNumber'] })
  .openapi('CompositionKeywordsBankTransfer')

const CompositionKeywordsPaymentMethodSchema = z
  .xor([CompositionKeywordsCreditCardSchema, CompositionKeywordsBankTransferSchema])
  .openapi({
    discriminator: {
      propertyName: 'type',
      mapping: {
        credit_card: '#/components/schemas/CreditCard',
        bank_transfer: '#/components/schemas/BankTransfer',
      },
    },
  })
  .openapi('CompositionKeywordsPaymentMethod')

const CompositionKeywordsNullablePaymentSchema = z
  .xor([CompositionKeywordsCreditCardSchema, CompositionKeywordsBankTransferSchema])
  .nullable()
  .openapi('CompositionKeywordsNullablePayment')

const CompositionKeywordsSearchFilterSchema = z
  .union([
    z.object({ keyword: z.string() }).openapi({ required: ['keyword'] }),
    z.object({ category: z.int() }).openapi({ required: ['category'] }),
  ])
  .openapi('CompositionKeywordsSearchFilter')

const CompositionKeywordsFlexibleIdSchema = z
  .union([z.string(), z.int(), z.uuid()])
  .openapi({ description: 'Accepts string, integer, or UUID' })
  .openapi('CompositionKeywordsFlexibleId')

const CompositionKeywordsCatSchema = z
  .object({ name: z.string(), purring: z.boolean().exactOptional() })
  .openapi({ required: ['name'] })
  .openapi('CompositionKeywordsCat')

const CompositionKeywordsDogSchema = z
  .object({ name: z.string(), barkVolume: z.number().exactOptional() })
  .openapi({ required: ['name'] })
  .openapi('CompositionKeywordsDog')

const CompositionKeywordsPetChoiceSchema = z
  .union([CompositionKeywordsCatSchema, CompositionKeywordsDogSchema])
  .openapi('CompositionKeywordsPetChoice')

const CompositionKeywordsPersonSchema = z
  .object({ name: z.string(), email: z.email() })
  .openapi({ required: ['name', 'email'] })
  .openapi('CompositionKeywordsPerson')

const CompositionKeywordsEmployeeInfoSchema = z
  .object({ employeeId: z.int(), department: z.string().exactOptional() })
  .openapi({ required: ['employeeId'] })
  .openapi('CompositionKeywordsEmployeeInfo')

const CompositionKeywordsEmployeeSchema = CompositionKeywordsPersonSchema.and(
  CompositionKeywordsEmployeeInfoSchema,
)
  .and(z.object({ startDate: z.iso.date().exactOptional() }))
  .openapi({ description: 'An employee with personal and work info' })
  .openapi('CompositionKeywordsEmployee')

const CompositionKeywordsBaseEntitySchema = z
  .object({ id: z.int(), createdAt: z.iso.datetime() })
  .openapi({ required: ['id', 'createdAt'] })
  .openapi('CompositionKeywordsBaseEntity')

const CompositionKeywordsExtendedWithSiblingSchema = CompositionKeywordsBaseEntitySchema.and(
  z
    .object({ label: z.string(), active: z.boolean().exactOptional() })
    .openapi({ required: ['label'] }),
)
  .openapi({ description: 'allOf with sibling properties merged', required: ['label'] })
  .openapi('CompositionKeywordsExtendedWithSibling')

const CompositionKeywordsNotStringValueSchema = z
  .any()
  .refine((val) => typeof val !== 'string')
  .openapi('CompositionKeywordsNotStringValue')

const CompositionKeywordsAdminRoleSchema = z
  .object({ role: z.literal('admin') })
  .openapi({ required: ['role'] })
  .openapi('CompositionKeywordsAdminRole')

const CompositionKeywordsNotAdminSchema = z
  .any()
  .refine((val) => !CompositionKeywordsAdminRoleSchema.safeParse(val).success)
  .openapi('CompositionKeywordsNotAdmin')

const CompositionKeywordsNotDraftOrArchivedSchema = z
  .any()
  .refine((val) => !['draft', 'archived'].includes(val))
  .openapi('CompositionKeywordsNotDraftOrArchived')

const CompositionKeywordsNotSpecificValueSchema = z
  .any()
  .refine((val) => val !== 'forbidden')
  .openapi('CompositionKeywordsNotSpecificValue')

const CompositionKeywordsNotStringOrNumberSchema = z
  .any()
  .refine((val) => !z.union([z.string(), z.number()]).safeParse(val).success)
  .openapi({ description: 'Rejects if value matches string or number union' })
  .openapi('CompositionKeywordsNotStringOrNumber')

const CallbacksFieldOrderRequestSchema = z
  .object({ item: z.string(), quantity: z.int(), callbackUrl: z.url() })
  .openapi({ required: ['item', 'quantity', 'callbackUrl'] })
  .openapi('CallbacksFieldOrderRequest')

const CallbacksFieldOrderSchema = z
  .object({ id: z.string(), item: z.string(), quantity: z.int(), status: z.string() })
  .openapi({ required: ['id', 'item', 'quantity', 'status'] })
  .openapi('CallbacksFieldOrder')

const CallbacksFieldOrderEventSchema = z
  .object({
    orderId: z.string(),
    event: z.enum(['created', 'confirmed', 'shipped']),
    timestamp: z.iso.datetime(),
  })
  .openapi({ required: ['orderId', 'event', 'timestamp'] })
  .openapi('CallbacksFieldOrderEvent')

const CallbacksFieldPaymentRequestSchema = z
  .object({ amount: z.number(), currency: z.string(), successUrl: z.url(), failureUrl: z.url() })
  .openapi({ required: ['amount', 'currency', 'successUrl', 'failureUrl'] })
  .openapi('CallbacksFieldPaymentRequest')

const CallbacksFieldPaymentSchema = z
  .object({ id: z.string(), amount: z.number(), currency: z.string(), status: z.string() })
  .openapi({ required: ['id', 'amount', 'currency', 'status'] })
  .openapi('CallbacksFieldPayment')

const CallbacksFieldPaymentEventSchema = z
  .object({
    paymentId: z.string(),
    status: z.enum(['success', 'failure']),
    timestamp: z.iso.datetime(),
  })
  .openapi({ required: ['paymentId', 'status', 'timestamp'] })
  .openapi('CallbacksFieldPaymentEvent')

const ReadonlyRefUserSchema = z
  .object({ id: z.string(), name: z.string(), email: z.email() })
  .openapi({ required: ['id', 'name', 'email'] })
  .openapi('ReadonlyRefUser')

const ReadonlyRefItemSchema = z
  .object({ id: z.int(), title: z.string() })
  .openapi({ required: ['id', 'title'] })
  .openapi('ReadonlyRefItem')

const ReadonlyRefErrorBodySchema = z
  .object({ code: z.int(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .openapi('ReadonlyRefErrorBody')

const DefaultResponseItemSchema = z
  .object({ id: z.string(), name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('DefaultResponseItem')

const ComplexSchemasCircleSchema = z
  .object({ kind: z.literal('circle'), radius: z.number() })
  .openapi({ required: ['kind', 'radius'] })
  .openapi('ComplexSchemasCircle')

const ComplexSchemasRectangleSchema = z
  .object({ kind: z.literal('rectangle'), width: z.number(), height: z.number() })
  .openapi({ required: ['kind', 'width', 'height'] })
  .openapi('ComplexSchemasRectangle')

const ComplexSchemasTriangleSchema = z
  .object({ kind: z.literal('triangle'), base: z.number(), height: z.number() })
  .openapi({ required: ['kind', 'base', 'height'] })
  .openapi('ComplexSchemasTriangle')

const ComplexSchemasPolygonSchema = z
  .object({ kind: z.literal('polygon'), sides: z.int().min(3), sideLength: z.number() })
  .openapi({ required: ['kind', 'sides', 'sideLength'] })
  .openapi('ComplexSchemasPolygon')

const ComplexSchemasEllipseSchema = z
  .object({ kind: z.literal('ellipse'), semiMajor: z.number(), semiMinor: z.number() })
  .openapi({ required: ['kind', 'semiMajor', 'semiMinor'] })
  .openapi('ComplexSchemasEllipse')

const ComplexSchemasShapeSchema = z
  .xor([
    ComplexSchemasCircleSchema,
    ComplexSchemasRectangleSchema,
    ComplexSchemasTriangleSchema,
    ComplexSchemasPolygonSchema,
    ComplexSchemasEllipseSchema,
  ])
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
  .openapi('ComplexSchemasShape')

const ComplexSchemasDocumentBaseSchema = z
  .object({ id: z.uuid(), title: z.string(), createdAt: z.iso.datetime() })
  .openapi({ required: ['id', 'title', 'createdAt'] })
  .openapi('ComplexSchemasDocumentBase')

const ComplexSchemasArticleContentSchema = z
  .object({ docType: z.literal('article'), body: z.string(), wordCount: z.int().exactOptional() })
  .openapi({ required: ['docType', 'body'] })
  .openapi('ComplexSchemasArticleContent')

const ComplexSchemasSpreadsheetContentSchema = z
  .object({ docType: z.literal('spreadsheet'), rows: z.int(), columns: z.int() })
  .openapi({ required: ['docType', 'rows', 'columns'] })
  .openapi('ComplexSchemasSpreadsheetContent')

const ComplexSchemasArticleSchema = ComplexSchemasDocumentBaseSchema.and(
  ComplexSchemasArticleContentSchema,
).openapi('ComplexSchemasArticle')

const ComplexSchemasSpreadsheetSchema = ComplexSchemasDocumentBaseSchema.and(
  ComplexSchemasSpreadsheetContentSchema,
).openapi('ComplexSchemasSpreadsheet')

const ComplexSchemasDocumentSchema = z
  .xor([ComplexSchemasArticleSchema, ComplexSchemasSpreadsheetSchema])
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
  .openapi('ComplexSchemasDocument')

const ComplexSchemasBaseConfigSchema = z
  .object({ version: z.int() })
  .openapi({ required: ['version'] })
  .openapi('ComplexSchemasBaseConfig')

const ComplexSchemasNetworkConfigSchema = z
  .object({ host: z.string(), port: z.int().min(1).max(65535) })
  .openapi({ required: ['host', 'port'] })
  .openapi('ComplexSchemasNetworkConfig')

const ComplexSchemasSecurityConfigSchema = z
  .object({ tlsEnabled: z.boolean(), certPath: z.string().exactOptional() })
  .openapi({ required: ['tlsEnabled'] })
  .openapi('ComplexSchemasSecurityConfig')

const ComplexSchemasFullConfigSchema = ComplexSchemasBaseConfigSchema.and(
  ComplexSchemasNetworkConfigSchema,
)
  .and(ComplexSchemasSecurityConfigSchema)
  .openapi({ description: 'Three-level allOf chain with all refs' })
  .openapi('ComplexSchemasFullConfig')

const ComplexSchemasSuccessResultSchema = z
  .object({ status: z.literal('success'), data: z.looseObject({}) })
  .openapi({ required: ['status', 'data'] })
  .openapi('ComplexSchemasSuccessResult')

const ComplexSchemasErrorResultSchema = z
  .object({ status: z.literal('error'), message: z.string(), code: z.int().exactOptional() })
  .openapi({ required: ['status', 'message'] })
  .openapi('ComplexSchemasErrorResult')

const ComplexSchemasNullableResultSchema = z
  .union([ComplexSchemasSuccessResultSchema, ComplexSchemasErrorResultSchema])
  .nullable()
  .openapi({ description: 'Nullable anyOf combining success and error' })
  .openapi('ComplexSchemasNullableResult')

const ComplexSchemasCategorySchema: z.ZodType<ComplexSchemasCategoryType> = z
  .lazy(() =>
    z
      .object({
        id: z.int(),
        name: z.string(),
        parent: ComplexSchemasCategorySchema.exactOptional(),
        children: z.array(ComplexSchemasCategorySchema).exactOptional(),
      })
      .openapi({ required: ['id', 'name'] }),
  )
  .openapi('ComplexSchemasCategory')

const VendorExtensionsUserIdSchema = z.uuid().brand<'UserId'>().openapi('VendorExtensionsUserId')

const VendorExtensionsPostIdSchema = z.uuid().brand<'PostId'>().openapi('VendorExtensionsPostId')

const VendorExtensionsEmailSchema = z.email().brand<'Email'>().openapi('VendorExtensionsEmail')

const VendorExtensionsPriceSchema = z
  .number()
  .min(0)
  .brand<'Price'>()
  .openapi('VendorExtensionsPrice')

const VendorExtensionsQuantitySchema = z
  .int()
  .min(0)
  .brand<'Quantity'>()
  .openapi('VendorExtensionsQuantity')

const VendorExtensionsUsernameSchema = z
  .string()
  .min(3)
  .max(20)
  .brand<'Username'>()
  .openapi('VendorExtensionsUsername')

const VendorExtensionsTagsSchema = z
  .array(z.string())
  .min(1)
  .max(10)
  .brand<'Tags'>()
  .openapi('VendorExtensionsTags')

const VendorExtensionsCreateUserSchema = z
  .object({
    email: VendorExtensionsEmailSchema,
    username: VendorExtensionsUsernameSchema,
    price: VendorExtensionsPriceSchema,
    tags: VendorExtensionsTagsSchema.exactOptional(),
  })
  .openapi({ required: ['email', 'username', 'price'] })
  .openapi('VendorExtensionsCreateUser')

const VendorExtensionsUserSchema = z
  .object({
    id: VendorExtensionsUserIdSchema,
    email: VendorExtensionsEmailSchema,
    username: VendorExtensionsUsernameSchema,
  })
  .openapi({ required: ['id', 'email', 'username'] })
  .openapi('VendorExtensionsUser')

const VendorExtensionsCreatePostSchema = z
  .object({
    authorId: VendorExtensionsUserIdSchema,
    title: z.string(),
    quantity: VendorExtensionsQuantitySchema,
  })
  .openapi({ required: ['authorId', 'title', 'quantity'] })
  .openapi('VendorExtensionsCreatePost')

const VendorExtensionsPostSchema = z
  .object({
    id: VendorExtensionsPostIdSchema,
    authorId: VendorExtensionsUserIdSchema,
    title: z.string(),
  })
  .openapi({ required: ['id', 'authorId', 'title'] })
  .openapi('VendorExtensionsPost')

const VendorExtensionsTransformFormSchema = z
  .object({
    trimmed: z.string().trim(),
    lowered: z.string().toLowerCase(),
    uppered: z.string().toUpperCase(),
    normalized: z.string().normalize('NFC'),
    lowercased: z.string().lowercase(),
    uppercased: z.string().uppercase(),
    startsWithHttps: z.string().startsWith('https://'),
    endsWithTest: z.string().endsWith('.test'),
    includesSlug: z.string().includes('/api/'),
    emailNormalized: z.string().trim().toLowerCase().pipe(z.email()),
    allChained: z.string().trim().toLowerCase().normalize('NFC'),
  })
  .openapi({
    required: [
      'trimmed',
      'lowered',
      'uppered',
      'normalized',
      'lowercased',
      'uppercased',
      'startsWithHttps',
      'endsWithTest',
      'includesSlug',
      'emailNormalized',
      'allChained',
    ],
  })
  .openapi('VendorExtensionsTransformForm')

const VendorExtensionsCoerceFormSchema = z
  .object({
    asString: z.coerce.string(),
    asDate: z.coerce.date(),
    asNumber: z.coerce.number(),
    asInt: z.coerce.number().int().min(0),
    asBool: z.coerce.boolean(),
  })
  .openapi({ required: ['asString', 'asDate', 'asNumber', 'asInt', 'asBool'] })
  .openapi('VendorExtensionsCoerceForm')

const VendorExtensionsReplacementFormSchema = z
  .object({
    codecDate: z.codec(z.iso.datetime(), z.date(), {
      decode: (isoString) => new Date(isoString),
      encode: (date) => date.toISOString(),
    }),
    transformed: z.string().transform((val) => val.toUpperCase()),
    piped: z
      .string()
      .transform((val) => Number(val))
      .pipe(z.number().int().positive()),
    preprocessed: z.preprocess((val) => (typeof val === 'string' ? val.trim() : val), z.string()),
    asStringBool: z.stringbool(),
    asStringBoolCustom: z.stringbool({
      truthy: ['yes', 'on'],
      falsy: ['no', 'off'],
      case: 'sensitive',
    }),
  })
  .openapi({
    required: [
      'codecDate',
      'transformed',
      'piped',
      'preprocessed',
      'asStringBool',
      'asStringBoolCustom',
    ],
  })
  .openapi('VendorExtensionsReplacementForm')

const VendorExtensionsFormatOptionsSchema = z
  .object({
    emailHtml5: z.email({ pattern: z.regexes.html5Email }),
    customEmail: z.email({ pattern: /^.+@example\.com$/ }),
    uuidV8: z.uuid({ version: 'v8' }),
    httpsUrl: z.url({ protocol: /^https$/, normalize: true }),
    hostScopedUrl: z.url({ hostname: /^example\.com$/ }),
    preciseDatetime: z.iso.datetime({ precision: 3, offset: true }),
    localDatetime: z.iso.datetime({ local: true }),
    colonMac: z.mac({ delimiter: ':' }),
    dotMac: z.mac({ delimiter: '.' }),
    hs256Jwt: z.jwt({ alg: 'HS256' }),
    sha256Hash: z.hash('sha256', { enc: 'hex' }),
  })
  .openapi({
    required: [
      'emailHtml5',
      'customEmail',
      'uuidV8',
      'httpsUrl',
      'hostScopedUrl',
      'preciseDatetime',
      'localDatetime',
      'colonMac',
      'dotMac',
      'hs256Jwt',
      'sha256Hash',
    ],
  })
  .openapi('VendorExtensionsFormatOptions')

const VendorExtensionsCustomFormSchema = z
  .object({
    password: z
      .string()
      .refine((val) => val.length >= 8, { message: 'Password must be at least 8 characters' })
      .refine((val) => /[A-Z]/.test(val), { message: 'Password must contain an uppercase letter' }),
    normalizedEmail: z.email().superRefine((val, ctx) => {
      if (val.endsWith('@blocked.example'))
        ctx.addIssue({ code: 'custom', message: 'Blocked domain' })
    }),
    config: z.object({ name: z.string().exactOptional() }).readonly(),
    greeting: z.string().prefault('hello'),
    retries: z.int().catch(0),
  })
  .openapi({ required: ['password', 'normalizedEmail', 'config', 'greeting', 'retries'] })
  .openapi('VendorExtensionsCustomForm')

const VendorExtensionsMessageFormSchema = z
  .object({
    username: z
      .string({ error: 'username must be a string' })
      .min(3, { error: 'username must be at least 3 characters' })
      .max(16, { error: 'username must be at most 16 characters' }),
    code: z.string().length(6, { error: 'code must be exactly 6 characters' }),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/, { error: 'slug must be lowercase alphanumeric with hyphens' }),
    age: z
      .int({ error: 'age must be an integer' })
      .min(0, { error: 'age must be >= 0' })
      .max(120, { error: 'age must be <= 120' }),
    score: z
      .number({ error: 'score must be a number' })
      .gt(0, { error: 'score must be > 0' })
      .lt(100, { error: 'score must be < 100' })
      .multipleOf(0.5, { error: 'score must be a multiple of 0.5' }),
    count: z.int().multipleOf(5, { error: 'count must be a multiple of 5' }),
    active: z.boolean({ error: 'active must be a boolean' }),
    tags: z
      .array(z.string(), { error: 'tags must be an array' })
      .min(1, { error: 'tags must contain at least 1 item' })
      .max(5, { error: 'tags must contain at most 5 items' }),
    pin: z.array(z.int()).length(4, { error: 'pin must contain exactly 4 digits' }),
    role: z.enum(['admin', 'editor', 'viewer'], {
      error: 'role must be one of admin, editor, viewer',
    }),
    priority: z.union([z.literal(1), z.literal(2), z.literal(3)], {
      error: 'priority must be 1, 2, or 3',
    }),
    color: z.literal('red', { error: 'color must be exactly "red"' }),
    kind: z.string({
      error: (issue) => (issue.input === undefined ? 'kind is required' : 'kind must be a string'),
    }),
    uniqueTags: z.array(z.string()).superRefine((items, ctx) => {
      const seen = new Map()
      for (const [i, val] of items.entries()) {
        const key = JSON.stringify(val)
        if (seen.has(key))
          ctx.addIssue({
            code: 'custom',
            path: [i],
            message: 'uniqueTags must contain unique values',
          })
        else seen.set(key, i)
      }
    }),
    namespaced: z
      .strictObject(
        {
          a: z.string().exactOptional(),
          b: z.string().exactOptional(),
          c: z.string().exactOptional(),
        },
        {
          error: (issue) =>
            issue.code === 'unrecognized_keys'
              ? 'namespaced contains an unrecognized key'
              : undefined,
        },
      )
      .refine((val) => Object.keys(val).length >= 1, {
        error: 'namespaced must have at least 1 property',
      })
      .refine((val) => Object.keys(val).length <= 3, {
        error: 'namespaced must have at most 3 properties',
      }),
    prefixed: z.looseObject({}).superRefine((o, ctx) => {
      const regex = new RegExp('^x_')
      const Schema = z.string()
      for (const [k, val] of Object.entries(o)) {
        if (!regex.test(k)) {
          continue
        }
        const result = Schema.safeParse(val)
        if (!result.success) {
          for (const issue of result.error.issues) {
            ctx.addIssue({ ...issue, path: [k, ...issue.path], message: 'x_ keys must be strings' })
          }
        }
      }
    }),
    payload: z.string({
      error: (issue) =>
        issue.input === undefined ? 'payload is required' : 'payload must be a string',
    }),
    token: z.string().exactOptional(),
    tokenLabel: z.string().exactOptional(),
  })
  .superRefine((o, ctx) => {
    if (!Object.hasOwn(o, 'token')) {
      return
    }
    if (!Object.hasOwn(o, 'tokenLabel')) {
      ctx.addIssue({
        code: 'custom',
        message: 'tokenLabel is required when token is provided',
        path: ['tokenLabel'],
      })
    }
  })
  .openapi({
    required: [
      'username',
      'code',
      'slug',
      'age',
      'score',
      'count',
      'active',
      'tags',
      'pin',
      'role',
      'priority',
      'color',
      'kind',
      'uniqueTags',
      'namespaced',
      'prefixed',
      'payload',
    ],
  })
  .openapi('VendorExtensionsMessageForm')

const VendorExtensionsCompositionSchema = z
  .union(
    [
      z.any().refine(
        (val) =>
          !z
            .unknown()
            .superRefine((val, ctx) => {
              if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
                if (!Object.hasOwn(val, 'hasLicense')) {
                  ctx.addIssue({ code: 'custom' })
                }
                if (Object.hasOwn(val, 'hasLicense')) {
                  const Schema = z.literal(true)
                  if (!Schema.safeParse(Reflect.get(val, 'hasLicense')).success) {
                    ctx.addIssue({ code: 'custom' })
                  }
                }
              }
            })
            .openapi({ required: ['hasLicense'] })
            .safeParse(val).success,
      ),
      z
        .unknown()
        .superRefine((val, ctx) => {
          if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
            if (!Object.hasOwn(val, 'licenseNumber')) {
              ctx.addIssue({ code: 'custom' })
            }
          }
        })
        .openapi({ required: ['licenseNumber'] }),
    ],
    { error: 'licenseNumber is required when hasLicense is true' },
  )
  .and(
    z
      .object({
        anyValue: z.union([z.string(), z.int()], { error: 'anyValue must be a string or integer' }),
        oneValue: z
          .xor([z.string(), z.int()], { error: 'oneValue must match exactly one type' })
          .exactOptional(),
        notString: z
          .any()
          .refine((val) => typeof val !== 'string', { error: 'notString must not be a string' })
          .exactOptional(),
        merged: (() => {
          const Schema = z
            .object({ name: z.string() })
            .openapi({ required: ['name'] })
            .and(z.object({ age: z.int() }).openapi({ required: ['age'] }))
          return z
            .unknown()
            .check((ctx) => {
              const result = Schema.safeParse(ctx.value)
              if (!result.success) {
                for (const issue of result.error.issues) {
                  if (issue.code === 'invalid_type') {
                    ctx.issues.push({
                      ...issue,
                      input: issue.input,
                      message: 'merged validation failed',
                    })
                  } else if (issue.code === 'too_big') {
                    ctx.issues.push({
                      ...issue,
                      input: issue.input,
                      message: 'merged validation failed',
                    })
                  } else if (issue.code === 'too_small') {
                    ctx.issues.push({
                      ...issue,
                      input: issue.input,
                      message: 'merged validation failed',
                    })
                  } else if (issue.code === 'invalid_format') {
                    ctx.issues.push({
                      ...issue,
                      input: issue.input,
                      message: 'merged validation failed',
                    })
                  } else if (issue.code === 'not_multiple_of') {
                    ctx.issues.push({
                      ...issue,
                      input: issue.input,
                      message: 'merged validation failed',
                    })
                  } else if (issue.code === 'unrecognized_keys') {
                    ctx.issues.push({
                      ...issue,
                      input: issue.input,
                      message: 'merged validation failed',
                    })
                  } else if (issue.code === 'invalid_union') {
                    ctx.issues.push({
                      ...issue,
                      input: issue.input,
                      message: 'merged validation failed',
                    })
                  } else if (issue.code === 'invalid_key') {
                    ctx.issues.push({
                      ...issue,
                      input: issue.input,
                      message: 'merged validation failed',
                    })
                  } else if (issue.code === 'invalid_element') {
                    ctx.issues.push({
                      ...issue,
                      input: issue.input,
                      message: 'merged validation failed',
                    })
                  } else if (issue.code === 'invalid_value') {
                    ctx.issues.push({
                      ...issue,
                      input: issue.input,
                      message: 'merged validation failed',
                    })
                  } else if (issue.code === 'custom') {
                    ctx.issues.push({
                      ...issue,
                      input: issue.input,
                      message: 'merged validation failed',
                    })
                  }
                }
              }
            })
            .pipe(Schema)
        })().exactOptional(),
        propertyNames: z
          .record(z.string(), z.string())
          .superRefine((o, ctx) => {
            const regex = new RegExp('^[a-z][a-z0-9_]*$')
            for (const k of Object.keys(o)) {
              if (!regex.test(k)) {
                ctx.addIssue({
                  code: 'custom',
                  path: [k],
                  message: 'keys must start with a lowercase letter',
                })
              }
            }
          })
          .exactOptional(),
      })
      .openapi({ required: ['anyValue'] }),
  )
  .openapi({
    required: ['anyValue'],
    'x-implication-message': 'licenseNumber is required when hasLicense is true',
  })
  .openapi('VendorExtensionsComposition')

const VendorExtensionsConditionalSchema = z
  .object({ kind: z.enum(['premium', 'basic']), feature: z.string().exactOptional() })
  .superRefine((o, ctx) => {
    const If = z.object({ kind: z.literal('premium') }).openapi({ required: ['kind'] })
    const ifOk = If.safeParse(o).success
    if (ifOk) {
      const Branch = z.object({ feature: z.string() }).openapi({ required: ['feature'] })
      if (!Branch) {
        return
      }
      const result = Branch.safeParse(o)
      if (!result.success) {
        for (const issue of result.error.issues) {
          ctx.addIssue({ ...issue, path: issue.path, message: 'feature is required for premium' })
        }
      }
    } else {
      const Branch = z.object({}).openapi({ required: [] })
      if (!Branch) {
        return
      }
      const result = Branch.safeParse(o)
      if (!result.success) {
        for (const issue of result.error.issues) {
          ctx.addIssue({ ...issue, path: issue.path, message: 'feature must be omitted for basic' })
        }
      }
    }
  })
  .openapi({ required: ['kind'] })
  .openapi('VendorExtensionsConditional')

const VendorExtensionsApplicatorsSchema = z
  .object({
    tuple: z.array(z.unknown()).superRefine((arr, ctx) => {
      const Prefix = [z.string(), z.int()]
      for (const [i, Schema] of Prefix.slice(0, arr.length).entries()) {
        const result = Schema.safeParse(arr[i])
        if (!result.success) {
          for (const issue of result.error.issues) {
            ctx.addIssue({
              ...issue,
              path: [i, ...issue.path],
              message: 'tuple positions must be [string, integer]',
            })
          }
        }
      }
      for (let i = Prefix.length; i < arr.length; i++) {
        ctx.addIssue({
          code: 'custom',
          path: [i],
          message: 'no items beyond the declared tuple shape',
        })
      }
    }),
    list: z.array(z.string()),
    meta: z.unknown().superRefine((val, ctx) => {
      if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        if (Object.hasOwn(val, 'id')) {
          const Schema = z.string()
          if (!Schema.safeParse(Reflect.get(val, 'id')).success) {
            ctx.addIssue({ code: 'custom', message: 'meta.id must be a string' })
          }
        }
        for (const k of Object.keys(val)) {
          if (!['id'].includes(k) && ![].some((p) => new RegExp(p).test(k))) {
            ctx.addIssue({ code: 'custom', message: 'meta only allows the id field' })
          }
        }
      }
    }),
  })
  .openapi({ required: ['tuple', 'list', 'meta'] })
  .openapi('VendorExtensionsApplicators')

const PaginationItemSchema = z
  .object({ id: z.string(), name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('PaginationItem')

const PaginationItemsPageSchema = z
  .object({ items: z.array(PaginationItemSchema), nextCursor: z.string().exactOptional() })
  .openapi({ required: ['items'] })
  .openapi('PaginationItemsPage')

const AllExportsUserListResponseResponse = {
  description: 'A list of users',
  content: { 'application/json': { schema: AllExportsUserListSchema } },
}

const ComprehensiveNotFoundResponse = {
  description: 'Resource not found',
  content: { 'application/json': { schema: ComprehensiveErrorSchema } },
}

const ReadonlyRefUserListResponse = {
  description: 'User list response',
  content: {
    'application/json': {
      schema: z
        .object({ users: z.array(ReadonlyRefUserSchema), total: z.int() })
        .openapi({ required: ['users', 'total'] }),
    },
  },
}

const ReadonlyRefNotFoundResponse = {
  description: 'Not found',
  content: { 'application/json': { schema: ReadonlyRefErrorBodySchema } },
}

const ReadonlyRefBadRequestResponse = {
  description: 'Bad request',
  content: { 'application/json': { schema: ReadonlyRefErrorBodySchema } },
}

const ReadonlyRefServerErrorResponse = {
  description: 'Server error',
  content: { 'application/json': { schema: ReadonlyRefErrorBodySchema } },
}

const AllExportsPageParamParamsSchema = z.coerce
  .number()
  .int()
  .default(1)
  .exactOptional()
  .openapi({ param: { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } } })

const AllExportsUserIdParamParamsSchema = z.coerce
  .number()
  .int()
  .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'integer' } } })

const ParametersMergeLimitParamParamsSchema = z.coerce
  .number()
  .int()
  .min(1)
  .max(100)
  .default(20)
  .exactOptional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      schema: { type: 'integer', default: 20, minimum: 1, maximum: 100 },
    },
  })

const ParametersMergeOffsetParamParamsSchema = z.coerce
  .number()
  .int()
  .min(0)
  .default(0)
  .exactOptional()
  .openapi({
    param: { name: 'offset', in: 'query', schema: { type: 'integer', default: 0, minimum: 0 } },
  })

const ComprehensivePageParamParamsSchema = z.coerce
  .number()
  .int()
  .default(1)
  .exactOptional()
  .openapi({ param: { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } } })

const ComprehensiveLimitParamParamsSchema = z.coerce
  .number()
  .int()
  .default(20)
  .exactOptional()
  .openapi({ param: { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } } })

const AllExportsUserExampleExample = {
  summary: 'Example user',
  value: { id: 1, name: 'Alice', email: 'alice@example.com' },
}

const ReadonlyRefUserExampleExample = {
  summary: 'A sample user',
  value: { id: 'u-001', name: 'Alice', email: 'alice@example.com' },
}

const ReadonlyRefUserAliasExample = ReadonlyRefUserExampleExample

const ReadonlyRefItemExampleExample = {
  summary: 'A sample item',
  value: { id: 1, title: 'Widget' },
}

const ReadonlyRefItemAliasExample = ReadonlyRefItemExampleExample

const AllExportsCreateUserBodyRequestBody = {
  content: {
    'application/json': {
      schema: z
        .object({ name: z.string(), email: z.email() })
        .openapi({ required: ['name', 'email'] }),
    },
  },
  required: true,
}

const ReadonlyRefCreateUserRequestBody = {
  content: {
    'application/json': {
      schema: z
        .object({ name: z.string(), email: z.email() })
        .openapi({ required: ['name', 'email'] }),
    },
  },
  required: true,
}

const ReadonlyRefUpdateUserRequestBody = {
  content: {
    'application/json': {
      schema: z.object({ name: z.string().exactOptional(), email: z.email().exactOptional() }),
    },
  },
  required: true,
}

const AllExportsXRequestIdHeaderSchema = z
  .uuid()
  .exactOptional()
  .openapi({ description: 'Unique request identifier' })

const AllExportsBearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const SecuritySchemesBearerAuthSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
}

const SecuritySchemesApiKeyAuthSecurityScheme = { type: 'apiKey', in: 'header', name: 'X-API-Key' }

const SecuritySchemesBasicAuthSecurityScheme = { type: 'http', scheme: 'basic' }

const SecuritySchemesOAuth2SecurityScheme = {
  type: 'oauth2',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://example.com/oauth/authorize',
      tokenUrl: 'https://example.com/oauth/token',
      scopes: { read: 'Read access', write: 'Write access' },
    },
  },
}

const ComprehensiveBearerAuthSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
}

const AllExportsGetUserLinkLink = {
  operationId: 'allExportsGetUserById',
  parameters: { id: '$response.body#/id' },
  description: 'Get the created user',
}

const CallbacksLinksGetSubscriptionLinkLink = {
  operationId: 'callbacksLinksGetSubscription',
  parameters: { id: '$response.body#/id' },
  description: 'Get the created subscription',
}

const CallbacksLinksDeleteSubscriptionLinkLink = {
  operationId: 'callbacksLinksDeleteSubscription',
  parameters: { id: '$request.path.id' },
  description: 'Delete this subscription',
}

const AllExportsUserCreatedCallback = {
  '{$request.body#/callbackUrl}': {
    post: {
      operationId: 'allExportsUserCreatedCallback',
      requestBody: { content: { 'application/json': { schema: AllExportsUserSchema } } },
      responses: { 200: { description: 'Callback processed' } },
    },
  },
}

const CallbacksLinksSubscriptionEventCallback = {
  '{$request.body#/callbackUrl}': {
    post: {
      operationId: 'callbacksLinksSubscriptionEventCallback',
      requestBody: {
        content: { 'application/json': { schema: CallbacksLinksEventPayloadSchema } },
      },
      responses: { 200: { description: 'Event processed' } },
    },
  },
}

const AllExportsUserItemPathItem = {
  get: {
    operationId: 'allExportsGetUserItem',
    responses: {
      200: { description: 'OK', content: { 'application/json': { schema: AllExportsUserSchema } } },
    },
  },
}

export const getMinimalHealthRoute = createRoute({
  method: 'get',
  path: '/minimal/health',
  operationId: 'minimalGetHealth',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ status: z.string() }).openapi({ required: ['status'] }),
        },
      },
    },
  },
})

export const getAllExportsUsersRoute = createRoute({
  method: 'get',
  path: '/allExports/users',
  operationId: 'allExportsGetUsers',
  request: { query: z.object({ page: AllExportsPageParamParamsSchema }) },
  responses: { 200: AllExportsUserListResponseResponse },
})

export const postAllExportsUsersRoute = createRoute({
  method: 'post',
  path: '/allExports/users',
  operationId: 'allExportsCreateUser',
  request: { body: AllExportsCreateUserBodyRequestBody },
  responses: {
    201: {
      description: 'Created',
      content: { 'application/json': { schema: AllExportsUserSchema } },
      links: { GetUser: AllExportsGetUserLinkLink },
    },
  },
})

export const getAllExportsUsersIdRoute = createRoute({
  method: 'get',
  path: '/allExports/users/{id}',
  operationId: 'allExportsGetUserById',
  request: { params: z.object({ id: AllExportsUserIdParamParamsSchema }) },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: AllExportsUserSchema } },
      headers: z.object({ 'X-Request-Id': AllExportsXRequestIdHeaderSchema }),
    },
  },
  security: [{ AllExportsBearerAuth: [] }],
})

export const getCircularRefsTreeRoute = createRoute({
  method: 'get',
  path: '/circularRefs/tree',
  operationId: 'circularRefsGetTree',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: CircularRefsTreeNodeSchema } },
    },
  },
})

export const postCircularRefsTreeRoute = createRoute({
  method: 'post',
  path: '/circularRefs/tree',
  operationId: 'circularRefsCreateTree',
  request: {
    body: {
      content: { 'application/json': { schema: CircularRefsTreeNodeSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Created',
      content: { 'application/json': { schema: CircularRefsTreeNodeSchema } },
    },
  },
})

export const getCircularRefsGraphRoute = createRoute({
  method: 'get',
  path: '/circularRefs/graph',
  operationId: 'circularRefsGetGraph',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: CircularRefsNodeASchema } },
    },
  },
})

export const getSecuritySchemesPublicRoute = createRoute({
  method: 'get',
  path: '/securitySchemes/public',
  operationId: 'securitySchemesGetPublic',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ message: z.string() }).openapi({ required: ['message'] }),
        },
      },
    },
  },
})

export const getSecuritySchemesBearerProtectedRoute = createRoute({
  method: 'get',
  path: '/securitySchemes/bearer-protected',
  operationId: 'securitySchemesGetBearerProtected',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ data: z.string() }).openapi({ required: ['data'] }),
        },
      },
    },
  },
  security: [{ SecuritySchemesBearerAuth: [] }],
})

export const getSecuritySchemesApiKeyProtectedRoute = createRoute({
  method: 'get',
  path: '/securitySchemes/api-key-protected',
  operationId: 'securitySchemesGetApiKeyProtected',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ data: z.string() }).openapi({ required: ['data'] }),
        },
      },
    },
  },
  security: [{ SecuritySchemesApiKeyAuth: [] }],
})

export const getSecuritySchemesBasicProtectedRoute = createRoute({
  method: 'get',
  path: '/securitySchemes/basic-protected',
  operationId: 'securitySchemesGetBasicProtected',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ data: z.string() }).openapi({ required: ['data'] }),
        },
      },
    },
  },
  security: [{ SecuritySchemesBasicAuth: [] }],
})

export const getSecuritySchemesOauthProtectedRoute = createRoute({
  method: 'get',
  path: '/securitySchemes/oauth-protected',
  operationId: 'securitySchemesGetOAuthProtected',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ data: z.string() }).openapi({ required: ['data'] }),
        },
      },
    },
  },
  security: [{ SecuritySchemesOAuth2: ['read'] }],
})

export const getSecuritySchemesMultiAuthRoute = createRoute({
  method: 'get',
  path: '/securitySchemes/multi-auth',
  operationId: 'securitySchemesGetMultiAuth',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ data: z.string() }).openapi({ required: ['data'] }),
        },
      },
    },
  },
  security: [{ SecuritySchemesBearerAuth: [], SecuritySchemesApiKeyAuth: [] }],
})

export const postContentTypesJsonRoute = createRoute({
  method: 'post',
  path: '/contentTypes/json',
  operationId: 'contentTypesPostJson',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ name: z.string(), value: z.int() })
            .openapi({ required: ['name', 'value'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ id: z.int(), name: z.string() }).openapi({ required: ['id', 'name'] }),
        },
      },
    },
  },
})

export const postContentTypesFormRoute = createRoute({
  method: 'post',
  path: '/contentTypes/form',
  operationId: 'contentTypesPostForm',
  request: {
    body: {
      content: {
        'application/x-www-form-urlencoded': {
          schema: z
            .object({ username: z.string(), password: z.string() })
            .openapi({ required: ['username', 'password'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ success: z.boolean() }).openapi({ required: ['success'] }),
        },
      },
    },
  },
})

export const postContentTypesUploadRoute = createRoute({
  method: 'post',
  path: '/contentTypes/upload',
  operationId: 'contentTypesUploadFile',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z
            .object({ file: z.file(), description: z.string().exactOptional() })
            .openapi({ required: ['file'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ url: z.string() }).openapi({ required: ['url'] }),
        },
      },
    },
  },
})

export const postContentTypesTextRoute = createRoute({
  method: 'post',
  path: '/contentTypes/text',
  operationId: 'contentTypesPostText',
  request: { body: { content: { 'text/plain': { schema: z.string() } }, required: true } },
  responses: { 200: { description: 'OK', content: { 'text/plain': { schema: z.string() } } } },
})

export const postContentTypesMultiContentRoute = createRoute({
  method: 'post',
  path: '/contentTypes/multi-content',
  operationId: 'contentTypesPostMultiContent',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({ data: z.string() }).openapi({ required: ['data'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ received: z.boolean() }).openapi({ required: ['received'] }),
        },
      },
    },
  },
})

export const getParametersMergeItemsItemIdRoute = createRoute({
  method: 'get',
  path: '/parametersMerge/items/{itemId}',
  operationId: 'parametersMergeGetItem',
  request: {
    params: z.object({
      itemId: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'itemId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
    headers: z.object({
      version: z
        .string()
        .default('1')
        .exactOptional()
        .openapi({
          param: { name: 'version', in: 'header', schema: { type: 'string', default: '1' } },
        }),
    }),
    query: z.object({
      fields: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'fields', in: 'query', schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: ParametersMergeItemSchema } },
    },
  },
})

export const putParametersMergeItemsItemIdRoute = createRoute({
  method: 'put',
  path: '/parametersMerge/items/{itemId}',
  operationId: 'parametersMergeUpdateItem',
  request: {
    params: z.object({
      itemId: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'itemId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
    headers: z.object({
      version: z
        .string()
        .openapi({
          param: { name: 'version', in: 'header', required: true, schema: { type: 'string' } },
        }),
    }),
    body: {
      content: { 'application/json': { schema: ParametersMergeItemUpdateSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: ParametersMergeItemSchema } },
    },
  },
})

export const deleteParametersMergeItemsItemIdRoute = createRoute({
  method: 'delete',
  path: '/parametersMerge/items/{itemId}',
  operationId: 'parametersMergeDeleteItem',
  request: {
    params: z.object({
      itemId: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'itemId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
    headers: z.object({
      version: z
        .string()
        .default('1')
        .exactOptional()
        .openapi({
          param: { name: 'version', in: 'header', schema: { type: 'string', default: '1' } },
        }),
    }),
  },
  responses: { 204: { description: 'Deleted' } },
})

export const getParametersMergeItemsRoute = createRoute({
  method: 'get',
  path: '/parametersMerge/items',
  operationId: 'parametersMergeListItems',
  request: {
    query: z.object({
      limit: ParametersMergeLimitParamParamsSchema,
      offset: ParametersMergeOffsetParamParamsSchema,
      sort: z
        .enum(['name', 'created', 'updated'])
        .exactOptional()
        .openapi({
          param: {
            name: 'sort',
            in: 'query',
            schema: { type: 'string', enum: ['name', 'created', 'updated'] },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ items: z.array(ParametersMergeItemSchema), total: z.int() })
            .openapi({ required: ['items', 'total'] }),
        },
      },
    },
  },
})

export const postSchemaEdgeCasesNullableRoute = createRoute({
  method: 'post',
  path: '/schemaEdgeCases/nullable',
  operationId: 'schemaEdgeCasesPostNullable',
  request: {
    body: {
      content: { 'application/json': { schema: SchemaEdgeCasesNullableFieldsSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: SchemaEdgeCasesNullableFieldsSchema } },
    },
  },
})

export const postSchemaEdgeCasesDiscriminatedRoute = createRoute({
  method: 'post',
  path: '/schemaEdgeCases/discriminated',
  operationId: 'schemaEdgeCasesPostDiscriminated',
  request: {
    body: {
      content: { 'application/json': { schema: SchemaEdgeCasesShapeSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: SchemaEdgeCasesShapeSchema } },
    },
  },
})

export const getSchemaEdgeCasesComposedRoute = createRoute({
  method: 'get',
  path: '/schemaEdgeCases/composed',
  operationId: 'schemaEdgeCasesGetComposed',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: SchemaEdgeCasesComposedObjectSchema } },
    },
  },
})

export const getSchemaEdgeCasesDeepNestedRoute = createRoute({
  method: 'get',
  path: '/schemaEdgeCases/deep-nested',
  operationId: 'schemaEdgeCasesGetDeepNested',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: SchemaEdgeCasesLevel1Schema } },
    },
  },
})

export const getSchemaEdgeCasesAdditionalPropsRoute = createRoute({
  method: 'get',
  path: '/schemaEdgeCases/additional-props',
  operationId: 'schemaEdgeCasesGetAdditionalProps',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: SchemaEdgeCasesDynamicMapSchema } },
    },
  },
})

export const postCallbacksLinksSubscriptionsRoute = createRoute({
  method: 'post',
  path: '/callbacksLinks/subscriptions',
  operationId: 'callbacksLinksCreateSubscription',
  request: {
    body: {
      content: { 'application/json': { schema: CallbacksLinksSubscriptionRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Created',
      content: { 'application/json': { schema: CallbacksLinksSubscriptionSchema } },
      links: { GetSubscription: CallbacksLinksGetSubscriptionLinkLink },
    },
  },
  callbacks: { onEvent: CallbacksLinksSubscriptionEventCallback },
})

export const getCallbacksLinksSubscriptionsIdRoute = createRoute({
  method: 'get',
  path: '/callbacksLinks/subscriptions/{id}',
  operationId: 'callbacksLinksGetSubscription',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: CallbacksLinksSubscriptionSchema } },
      links: { DeleteSubscription: CallbacksLinksDeleteSubscriptionLinkLink },
    },
  },
})

export const deleteCallbacksLinksSubscriptionsIdRoute = createRoute({
  method: 'delete',
  path: '/callbacksLinks/subscriptions/{id}',
  operationId: 'callbacksLinksDeleteSubscription',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
  },
  responses: { 204: { description: 'Deleted' } },
})

export const postCallbacksLinksWebhooksTestRoute = createRoute({
  method: 'post',
  path: '/callbacksLinks/webhooks/test',
  operationId: 'callbacksLinksTestWebhook',
  request: {
    body: {
      content: {
        'application/json': { schema: z.object({ url: z.url() }).openapi({ required: ['url'] }) },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ sent: z.boolean() }).openapi({ required: ['sent'] }),
        },
      },
    },
  },
})

export const getCrudRefsPostsRoute = createRoute({
  method: 'get',
  path: '/crudRefs/posts',
  operationId: 'crudRefsListPosts',
  request: {
    query: z.object({
      page: z.coerce
        .number()
        .int()
        .default(1)
        .exactOptional()
        .openapi({ param: { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } } }),
      limit: z.coerce
        .number()
        .int()
        .default(10)
        .exactOptional()
        .openapi({
          param: { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ posts: z.array(CrudRefsPostSchema), total: z.int() })
            .openapi({ required: ['posts', 'total'] }),
        },
      },
    },
  },
})

export const postCrudRefsPostsRoute = createRoute({
  method: 'post',
  path: '/crudRefs/posts',
  operationId: 'crudRefsCreatePost',
  request: {
    body: { content: { 'application/json': { schema: CrudRefsCreatePostSchema } }, required: true },
  },
  responses: {
    201: {
      description: 'Created',
      content: { 'application/json': { schema: CrudRefsPostSchema } },
    },
  },
})

export const getCrudRefsPostsIdRoute = createRoute({
  method: 'get',
  path: '/crudRefs/posts/{id}',
  operationId: 'crudRefsGetPost',
  request: {
    params: z.object({
      id: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: CrudRefsPostSchema } } },
  },
})

export const putCrudRefsPostsIdRoute = createRoute({
  method: 'put',
  path: '/crudRefs/posts/{id}',
  operationId: 'crudRefsUpdatePost',
  request: {
    params: z.object({
      id: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
    body: { content: { 'application/json': { schema: CrudRefsUpdatePostSchema } }, required: true },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: CrudRefsPostSchema } } },
  },
})

export const deleteCrudRefsPostsIdRoute = createRoute({
  method: 'delete',
  path: '/crudRefs/posts/{id}',
  operationId: 'crudRefsDeletePost',
  request: {
    params: z.object({
      id: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: { 204: { description: 'Deleted' } },
})

export const getCrudRefsPostsIdCommentsRoute = createRoute({
  method: 'get',
  path: '/crudRefs/posts/{id}/comments',
  operationId: 'crudRefsListComments',
  request: {
    params: z.object({
      id: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: z.array(CrudRefsCommentSchema) } },
    },
  },
})

export const postCrudRefsPostsIdCommentsRoute = createRoute({
  method: 'post',
  path: '/crudRefs/posts/{id}/comments',
  operationId: 'crudRefsCreateComment',
  request: {
    params: z.object({
      id: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
    body: {
      content: { 'application/json': { schema: CrudRefsCreateCommentSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Created',
      content: { 'application/json': { schema: CrudRefsCommentSchema } },
    },
  },
})

export const getCrudRefsTagsRoute = createRoute({
  method: 'get',
  path: '/crudRefs/tags',
  operationId: 'crudRefsListTags',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: z.array(CrudRefsTagSchema) } },
    },
  },
})

export const getComprehensiveUsersRoute = createRoute({
  method: 'get',
  path: '/comprehensive/users',
  operationId: 'comprehensiveListUsers',
  request: {
    query: z.object({
      page: ComprehensivePageParamParamsSchema,
      limit: ComprehensiveLimitParamParamsSchema,
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ users: z.array(ComprehensiveUserSchema), total: z.int() })
            .openapi({ required: ['users', 'total'] }),
        },
      },
    },
  },
})

export const postComprehensiveUsersRoute = createRoute({
  method: 'post',
  path: '/comprehensive/users',
  operationId: 'comprehensiveCreateUser',
  request: {
    body: {
      content: { 'application/json': { schema: ComprehensiveCreateUserSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Created',
      content: { 'application/json': { schema: ComprehensiveUserSchema } },
    },
  },
  security: [{ ComprehensiveBearerAuth: [] }],
})

export const getComprehensiveUsersUserIdRoute = createRoute({
  method: 'get',
  path: '/comprehensive/users/{userId}',
  operationId: 'comprehensiveGetUser',
  request: {
    params: z.object({
      userId: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'userId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: ComprehensiveUserSchema } },
    },
    404: ComprehensiveNotFoundResponse,
  },
})

export const putComprehensiveUsersUserIdRoute = createRoute({
  method: 'put',
  path: '/comprehensive/users/{userId}',
  operationId: 'comprehensiveUpdateUser',
  request: {
    params: z.object({
      userId: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'userId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
    body: {
      content: { 'application/json': { schema: ComprehensiveUpdateUserSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: ComprehensiveUserSchema } },
    },
  },
  security: [{ ComprehensiveBearerAuth: [] }],
})

export const deleteComprehensiveUsersUserIdRoute = createRoute({
  method: 'delete',
  path: '/comprehensive/users/{userId}',
  operationId: 'comprehensiveDeleteUser',
  request: {
    params: z.object({
      userId: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'userId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: { 204: { description: 'Deleted' } },
  security: [{ ComprehensiveBearerAuth: [] }],
})

export const getComprehensiveProductsRoute = createRoute({
  method: 'get',
  path: '/comprehensive/products',
  operationId: 'comprehensiveListProducts',
  request: {
    query: z.object({
      page: ComprehensivePageParamParamsSchema,
      limit: ComprehensiveLimitParamParamsSchema,
      category: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'category', in: 'query', schema: { type: 'string' } } }),
      minPrice: z.coerce
        .number()
        .exactOptional()
        .openapi({ param: { name: 'minPrice', in: 'query', schema: { type: 'number' } } }),
      maxPrice: z.coerce
        .number()
        .exactOptional()
        .openapi({ param: { name: 'maxPrice', in: 'query', schema: { type: 'number' } } }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ products: z.array(ComprehensiveProductSchema), total: z.int() })
            .openapi({ required: ['products', 'total'] }),
        },
      },
    },
  },
})

export const postComprehensiveProductsRoute = createRoute({
  method: 'post',
  path: '/comprehensive/products',
  operationId: 'comprehensiveCreateProduct',
  request: {
    body: {
      content: { 'application/json': { schema: ComprehensiveCreateProductSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Created',
      content: { 'application/json': { schema: ComprehensiveProductSchema } },
    },
  },
  security: [{ ComprehensiveBearerAuth: [] }],
})

export const getComprehensiveProductsProductIdRoute = createRoute({
  method: 'get',
  path: '/comprehensive/products/{productId}',
  operationId: 'comprehensiveGetProduct',
  request: {
    params: z.object({
      productId: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'productId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: ComprehensiveProductSchema } },
    },
    404: ComprehensiveNotFoundResponse,
  },
})

export const putComprehensiveProductsProductIdRoute = createRoute({
  method: 'put',
  path: '/comprehensive/products/{productId}',
  operationId: 'comprehensiveUpdateProduct',
  request: {
    params: z.object({
      productId: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'productId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
    body: {
      content: { 'application/json': { schema: ComprehensiveUpdateProductSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: ComprehensiveProductSchema } },
    },
  },
  security: [{ ComprehensiveBearerAuth: [] }],
})

export const getComprehensiveProductsProductIdReviewsRoute = createRoute({
  method: 'get',
  path: '/comprehensive/products/{productId}/reviews',
  operationId: 'comprehensiveListReviews',
  request: {
    params: z.object({
      productId: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'productId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: z.array(ComprehensiveReviewSchema) } },
    },
  },
})

export const postComprehensiveProductsProductIdReviewsRoute = createRoute({
  method: 'post',
  path: '/comprehensive/products/{productId}/reviews',
  operationId: 'comprehensiveCreateReview',
  request: {
    params: z.object({
      productId: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'productId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
    body: {
      content: { 'application/json': { schema: ComprehensiveCreateReviewSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Created',
      content: { 'application/json': { schema: ComprehensiveReviewSchema } },
    },
  },
  security: [{ ComprehensiveBearerAuth: [] }],
})

export const getComprehensiveOrdersRoute = createRoute({
  method: 'get',
  path: '/comprehensive/orders',
  operationId: 'comprehensiveListOrders',
  request: {
    query: z.object({
      page: ComprehensivePageParamParamsSchema,
      limit: ComprehensiveLimitParamParamsSchema,
      status: z
        .enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
        .exactOptional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
            },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ orders: z.array(ComprehensiveOrderSchema), total: z.int() })
            .openapi({ required: ['orders', 'total'] }),
        },
      },
    },
  },
  security: [{ ComprehensiveBearerAuth: [] }],
})

export const postComprehensiveOrdersRoute = createRoute({
  method: 'post',
  path: '/comprehensive/orders',
  operationId: 'comprehensiveCreateOrder',
  request: {
    body: {
      content: { 'application/json': { schema: ComprehensiveCreateOrderSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Created',
      content: { 'application/json': { schema: ComprehensiveOrderSchema } },
    },
  },
  security: [{ ComprehensiveBearerAuth: [] }],
})

export const getComprehensiveOrdersOrderIdRoute = createRoute({
  method: 'get',
  path: '/comprehensive/orders/{orderId}',
  operationId: 'comprehensiveGetOrder',
  request: {
    params: z.object({
      orderId: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'orderId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: ComprehensiveOrderSchema } },
    },
    404: ComprehensiveNotFoundResponse,
  },
  security: [{ ComprehensiveBearerAuth: [] }],
})

export const getComprehensiveCategoriesRoute = createRoute({
  method: 'get',
  path: '/comprehensive/categories',
  operationId: 'comprehensiveListCategories',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: z.array(ComprehensiveCategorySchema) } },
    },
  },
})

export const postComprehensiveUploadImageRoute = createRoute({
  method: 'post',
  path: '/comprehensive/upload/image',
  operationId: 'comprehensiveUploadImage',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z
            .object({ image: z.file(), alt: z.string().exactOptional() })
            .openapi({ required: ['image'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ url: z.url(), width: z.int(), height: z.int() })
            .openapi({ required: ['url', 'width', 'height'] }),
        },
      },
    },
  },
  security: [{ ComprehensiveBearerAuth: [] }],
})

export const postCompositionKeywordsOneOfRoute = createRoute({
  method: 'post',
  path: '/compositionKeywords/one-of',
  operationId: 'compositionKeywordsPostOneOf',
  request: {
    body: {
      content: { 'application/json': { schema: CompositionKeywordsPaymentMethodSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: CompositionKeywordsPaymentMethodSchema } },
    },
  },
})

export const postCompositionKeywordsAnyOfRoute = createRoute({
  method: 'post',
  path: '/compositionKeywords/any-of',
  operationId: 'compositionKeywordsPostAnyOf',
  request: {
    body: {
      content: { 'application/json': { schema: CompositionKeywordsSearchFilterSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: CompositionKeywordsSearchFilterSchema } },
    },
  },
})

export const postCompositionKeywordsAllOfRoute = createRoute({
  method: 'post',
  path: '/compositionKeywords/all-of',
  operationId: 'compositionKeywordsPostAllOf',
  request: {
    body: {
      content: { 'application/json': { schema: CompositionKeywordsEmployeeSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: CompositionKeywordsEmployeeSchema } },
    },
  },
})

export const postCompositionKeywordsNotRoute = createRoute({
  method: 'post',
  path: '/compositionKeywords/not',
  operationId: 'compositionKeywordsPostNot',
  request: {
    body: {
      content: { 'application/json': { schema: CompositionKeywordsNotStringValueSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: CompositionKeywordsNotStringValueSchema } },
    },
  },
})

export const getCompositionKeywordsNotRefRoute = createRoute({
  method: 'get',
  path: '/compositionKeywords/not-ref',
  operationId: 'compositionKeywordsGetNotRef',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: CompositionKeywordsNotAdminSchema } },
    },
  },
})

export const getCompositionKeywordsNotEnumRoute = createRoute({
  method: 'get',
  path: '/compositionKeywords/not-enum',
  operationId: 'compositionKeywordsGetNotEnum',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: CompositionKeywordsNotDraftOrArchivedSchema } },
    },
  },
})

export const getCompositionKeywordsNotConstRoute = createRoute({
  method: 'get',
  path: '/compositionKeywords/not-const',
  operationId: 'compositionKeywordsGetNotConst',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: CompositionKeywordsNotSpecificValueSchema } },
    },
  },
})

export const getCompositionKeywordsNotCompositionRoute = createRoute({
  method: 'get',
  path: '/compositionKeywords/not-composition',
  operationId: 'compositionKeywordsGetNotComposition',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: CompositionKeywordsNotStringOrNumberSchema } },
    },
  },
})

export const getCompositionKeywordsAllOfSiblingRoute = createRoute({
  method: 'get',
  path: '/compositionKeywords/all-of-sibling',
  operationId: 'compositionKeywordsGetAllOfSibling',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: CompositionKeywordsExtendedWithSiblingSchema } },
    },
  },
})

export const getCompositionKeywordsNullableOneOfRoute = createRoute({
  method: 'get',
  path: '/compositionKeywords/nullable-one-of',
  operationId: 'compositionKeywordsGetNullableOneOf',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: CompositionKeywordsNullablePaymentSchema } },
    },
  },
})

export const getCompositionKeywordsAnyOfThreeRoute = createRoute({
  method: 'get',
  path: '/compositionKeywords/any-of-three',
  operationId: 'compositionKeywordsGetAnyOfThree',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: CompositionKeywordsFlexibleIdSchema } },
    },
  },
})

export const getCompositionKeywordsAnyOfRefRoute = createRoute({
  method: 'get',
  path: '/compositionKeywords/any-of-ref',
  operationId: 'compositionKeywordsGetAnyOfRef',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: CompositionKeywordsPetChoiceSchema } },
    },
  },
})

export const postCallbacksFieldOrdersRoute = createRoute({
  method: 'post',
  path: '/callbacksField/orders',
  summary: 'Create an order with callback',
  operationId: 'callbacksFieldCreateOrder',
  request: {
    body: {
      content: { 'application/json': { schema: CallbacksFieldOrderRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Order created',
      content: { 'application/json': { schema: CallbacksFieldOrderSchema } },
    },
  },
  callbacks: {
    onOrderCreated: {
      '{$request.body#/callbackUrl}': {
        post: {
          summary: 'Order created notification',
          operationId: 'callbacksFieldOnOrderCreated',
          requestBody: {
            content: { 'application/json': { schema: CallbacksFieldOrderEventSchema } },
          },
          responses: { 200: { description: 'Callback received' } },
        },
      },
    },
  },
})

export const postCallbacksFieldPaymentsRoute = createRoute({
  method: 'post',
  path: '/callbacksField/payments',
  summary: 'Create a payment with multiple callbacks',
  operationId: 'callbacksFieldCreatePayment',
  request: {
    body: {
      content: { 'application/json': { schema: CallbacksFieldPaymentRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Payment created',
      content: { 'application/json': { schema: CallbacksFieldPaymentSchema } },
    },
  },
  callbacks: {
    onPaymentSuccess: {
      '{$request.body#/successUrl}': {
        post: {
          operationId: 'callbacksFieldOnPaymentSuccess',
          requestBody: {
            content: { 'application/json': { schema: CallbacksFieldPaymentEventSchema } },
          },
          responses: { 200: { description: 'OK' } },
        },
      },
    },
    onPaymentFailure: {
      '{$request.body#/failureUrl}': {
        post: {
          operationId: 'callbacksFieldOnPaymentFailure',
          requestBody: {
            content: { 'application/json': { schema: CallbacksFieldPaymentEventSchema } },
          },
          responses: { 200: { description: 'OK' } },
        },
      },
    },
  },
})

export const getCallbacksFieldItemsRoute = createRoute({
  method: 'get',
  path: '/callbacksField/items',
  summary: 'List items (no callbacks)',
  operationId: 'callbacksFieldListItems',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(
            z.object({ id: z.string(), name: z.string() }).openapi({ required: ['id', 'name'] }),
          ),
        },
      },
    },
  },
})

export const getArrayObjectConstraintsTagsRoute = createRoute({
  method: 'get',
  path: '/arrayObjectConstraints/tags',
  operationId: 'arrayObjectConstraintsGetTags',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({
              tags: z.array(z.string()).superRefine((items, ctx) => {
                const seen = new Map()
                for (const [i, val] of items.entries()) {
                  const key = JSON.stringify(val)
                  if (seen.has(key)) ctx.addIssue({ code: 'custom', path: [i] })
                  else seen.set(key, i)
                }
              }),
              ids: z
                .array(z.int())
                .min(1)
                .max(100)
                .superRefine((items, ctx) => {
                  const seen = new Map()
                  for (const [i, val] of items.entries()) {
                    const key = JSON.stringify(val)
                    if (seen.has(key)) ctx.addIssue({ code: 'custom', path: [i] })
                    else seen.set(key, i)
                  }
                }),
              labels: z
                .array(z.string())
                .length(3)
                .superRefine((items, ctx) => {
                  const seen = new Map()
                  for (const [i, val] of items.entries()) {
                    const key = JSON.stringify(val)
                    if (seen.has(key)) ctx.addIssue({ code: 'custom', path: [i] })
                    else seen.set(key, i)
                  }
                }),
            })
            .openapi({ required: ['tags', 'ids', 'labels'] }),
        },
      },
    },
  },
})

export const postArrayObjectConstraintsTagsRoute = createRoute({
  method: 'post',
  path: '/arrayObjectConstraints/tags',
  operationId: 'arrayObjectConstraintsCreateTag',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              metadata: z
                .object({ key: z.string().exactOptional(), value: z.string().exactOptional() })
                .refine((val) => Object.keys(val).length >= 1)
                .refine((val) => Object.keys(val).length <= 10),
              config: z
                .object({ name: z.string().exactOptional() })
                .refine((val) => Object.keys(val).length >= 1)
                .exactOptional(),
              limited: z
                .object({ a: z.string().exactOptional(), b: z.string().exactOptional() })
                .refine((val) => Object.keys(val).length <= 5)
                .exactOptional(),
            })
            .openapi({ required: ['metadata'] }),
        },
      },
    },
  },
  responses: { 201: { description: 'Created' } },
})

export const getArrayObjectConstraintsSettingsRoute = createRoute({
  method: 'get',
  path: '/arrayObjectConstraints/settings',
  operationId: 'arrayObjectConstraintsGetSettings',
  request: {
    query: z.object({
      filter: z
        .string()
        .exactOptional()
        .openapi({
          param: { name: 'filter', in: 'query', allowReserved: true, schema: { type: 'string' } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.record(z.string(), z.string()).superRefine((o, ctx) => {
            const regex = new RegExp('^[a-z_]+$')
            for (const k of Object.keys(o)) {
              if (!regex.test(k)) {
                ctx.addIssue({ code: 'custom', path: [k] })
              }
            }
          }),
        },
      },
    },
  },
})

export const putArrayObjectConstraintsSettingsRoute = createRoute({
  method: 'put',
  path: '/arrayObjectConstraints/settings',
  operationId: 'arrayObjectConstraintsUpdateSettings',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              avatar: z
                .base64()
                .transform((val) =>
                  typeof atob === 'function'
                    ? Uint8Array.from(atob(val), (c) => c.charCodeAt(0))
                    : new Uint8Array(Buffer.from(val, 'base64')),
                ),
            })
            .openapi({ required: ['avatar'] }),
        },
      },
    },
  },
  responses: { 200: { description: 'OK' } },
})

export const postArrayObjectConstraintsConfigRoute = createRoute({
  method: 'post',
  path: '/arrayObjectConstraints/config',
  operationId: 'arrayObjectConstraintsCreateConfig',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              data: z.record(z.string(), z.string()).superRefine((o, ctx) => {
                const regex = new RegExp('^x-')
                const Schema = z.string()
                for (const [k, val] of Object.entries(o)) {
                  if (!regex.test(k)) {
                    continue
                  }
                  const result = Schema.safeParse(val)
                  if (!result.success) {
                    for (const issue of result.error.issues) {
                      ctx.addIssue({ ...issue, path: [k, ...issue.path] })
                    }
                  }
                }
              }),
              headers: z
                .looseObject({})
                .superRefine((o, ctx) => {
                  const regex = new RegExp('^X-Custom-')
                  const Schema = z.string()
                  for (const [k, val] of Object.entries(o)) {
                    if (!regex.test(k)) {
                      continue
                    }
                    const result = Schema.safeParse(val)
                    if (!result.success) {
                      for (const issue of result.error.issues) {
                        ctx.addIssue({ ...issue, path: [k, ...issue.path] })
                      }
                    }
                  }
                })
                .exactOptional(),
              keys: z
                .record(z.string(), z.string())
                .superRefine((o, ctx) => {
                  const regex = new RegExp('^[a-z_]+$')
                  for (const k of Object.keys(o)) {
                    if (!regex.test(k)) {
                      ctx.addIssue({ code: 'custom', path: [k] })
                    }
                  }
                })
                .exactOptional(),
            })
            .openapi({ required: ['data'] }),
        },
      },
    },
  },
  responses: { 201: { description: 'Created' } },
})

export const postArrayObjectConstraintsPaymentRoute = createRoute({
  method: 'post',
  path: '/arrayObjectConstraints/payment',
  operationId: 'arrayObjectConstraintsCreatePayment',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              creditCard: z.string().exactOptional(),
              billingAddress: z.string().exactOptional(),
              email: z.string().exactOptional(),
            })
            .superRefine((o, ctx) => {
              if (!Object.hasOwn(o, 'creditCard')) {
                return
              }
              if (!Object.hasOwn(o, 'billingAddress')) {
                ctx.addIssue({
                  code: 'custom',
                  message: 'requires "billingAddress" when "creditCard" present',
                  path: ['billingAddress'],
                })
              }
            }),
        },
      },
    },
  },
  responses: { 201: { description: 'Created' } },
})

export const getTrailingSlashApiReverseChibanIndexRoute = createRoute({
  method: 'get',
  path: '/trailingSlash/api/reverseChiban/',
  summary: 'Reverse Chiban (trailing slash)',
  operationId: 'trailingSlashGetApiReverseChibanIndex',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ result: z.string() }).openapi({ required: ['result'] }),
        },
      },
    },
  },
})

export const getTrailingSlashApiReverseChibanRoute = createRoute({
  method: 'get',
  path: '/trailingSlash/api/reverseChiban',
  summary: 'Reverse Chiban (no trailing slash)',
  operationId: 'trailingSlashGetApiReverseChiban',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ result: z.string() }).openapi({ required: ['result'] }),
        },
      },
    },
  },
})

export const getTrailingSlashPostsIndexRoute = createRoute({
  method: 'get',
  path: '/trailingSlash/posts/',
  summary: 'List posts (trailing slash only)',
  operationId: 'trailingSlashGetPostsIndex',
  request: {
    query: z.object({
      limit: z.coerce
        .number()
        .int()
        .exactOptional()
        .openapi({
          param: { name: 'limit', in: 'query', required: false, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ items: z.array(z.string()), total: z.int() })
            .openapi({ required: ['items', 'total'] }),
        },
      },
    },
  },
})

export const postTrailingSlashPostsIndexRoute = createRoute({
  method: 'post',
  path: '/trailingSlash/posts/',
  summary: 'Create post (trailing slash only)',
  operationId: 'trailingSlashPostPostsIndex',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({ title: z.string() }).openapi({ required: ['title'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Created',
      content: {
        'application/json': {
          schema: z
            .object({ id: z.int(), title: z.string() })
            .openapi({ required: ['id', 'title'] }),
        },
      },
    },
  },
})

export const getTrailingSlashUsersIdIndexRoute = createRoute({
  method: 'get',
  path: '/trailingSlash/users/{id}/',
  summary: 'Get user (trailing slash with path param)',
  operationId: 'trailingSlashGetUsersIdIndex',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ id: z.string(), name: z.string() })
            .openapi({ required: ['id', 'name'] }),
        },
      },
    },
  },
})

export const getTrailingSlashItemsIndexRoute = createRoute({
  method: 'get',
  path: '/trailingSlash/items/',
  summary: 'List items (trailing slash only)',
  operationId: 'trailingSlashGetItemsIndex',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ items: z.array(z.string()) }).openapi({ required: ['items'] }),
        },
      },
    },
  },
})

export const getReadonlyRefUsersRoute = createRoute({
  method: 'get',
  path: '/readonlyRef/users',
  summary: 'List users',
  operationId: 'readonlyRefListUsers',
  responses: { 200: ReadonlyRefUserListResponse },
})

export const postReadonlyRefUsersRoute = createRoute({
  method: 'post',
  path: '/readonlyRef/users',
  summary: 'Create user',
  operationId: 'readonlyRefCreateUser',
  request: { body: ReadonlyRefCreateUserRequestBody },
  responses: {
    201: {
      description: 'Created',
      content: { 'application/json': { schema: ReadonlyRefUserSchema } },
    },
    400: ReadonlyRefBadRequestResponse,
  },
})

export const getReadonlyRefUsersIdRoute = createRoute({
  method: 'get',
  path: '/readonlyRef/users/{id}',
  summary: 'Get user by ID',
  operationId: 'readonlyRefGetUser',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ReadonlyRefUserSchema } } },
    404: ReadonlyRefNotFoundResponse,
  },
})

export const putReadonlyRefUsersIdRoute = createRoute({
  method: 'put',
  path: '/readonlyRef/users/{id}',
  summary: 'Update user',
  operationId: 'readonlyRefUpdateUser',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
    body: ReadonlyRefUpdateUserRequestBody,
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ReadonlyRefUserSchema } } },
  },
})

export const getReadonlyRefItemsRoute = createRoute({
  method: 'get',
  path: '/readonlyRef/items',
  summary: 'List items (uses $ref response alias)',
  operationId: 'readonlyRefListItems',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: z.array(ReadonlyRefItemSchema) } },
    },
    500: ReadonlyRefServerErrorResponse,
  },
})

export const getTrailingSlashRealApiReverseGeocodeIndexRoute = createRoute({
  method: 'get',
  path: '/trailingSlashReal/api/reverseGeocode/',
  summary: 'Reverse geocode lookup',
  operationId: 'trailingSlashRealGetApiReverseGeocodeIndex',
  request: {
    query: z.object({
      callback: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'callback',
            in: 'query',
            description: 'Callback function name for JSONP',
            required: false,
            schema: { type: 'string' },
          },
        }),
      search_type: z
        .enum(['0', '1', '2'])
        .default('0')
        .exactOptional()
        .openapi({
          param: {
            name: 'search_type',
            in: 'query',
            description: 'Search type',
            required: false,
            schema: { type: 'string', enum: ['0', '1', '2'], default: '0' },
          },
        }),
      lat: z.coerce
        .number()
        .pipe(z.float64())
        .exactOptional()
        .openapi({
          param: {
            name: 'lat',
            in: 'query',
            description: 'Latitude',
            required: false,
            schema: { type: 'number', format: 'double' },
          },
        }),
      lon: z.coerce
        .number()
        .pipe(z.float64())
        .exactOptional()
        .openapi({
          param: {
            name: 'lon',
            in: 'query',
            description: 'Longitude',
            required: false,
            schema: { type: 'number', format: 'double' },
          },
        }),
      polygon: z
        .string()
        .regex(/^(\d+\.\d+,\d+\.\d+,)*\d+\.\d+,\d+\.\d+$/)
        .exactOptional()
        .openapi({
          param: {
            name: 'polygon',
            in: 'query',
            description: 'Polygon coordinates',
            required: false,
            schema: {
              type: 'string',
              pattern: '^(\\d+\\.\\d+,\\d+\\.\\d+,)*\\d+\\.\\d+,\\d+\\.\\d+$',
            },
          },
        }),
      radius: z.coerce
        .number()
        .int()
        .max(200)
        .exactOptional()
        .openapi({
          param: {
            name: 'radius',
            in: 'query',
            description: 'Search radius in meters',
            required: false,
            schema: { type: 'integer', maximum: 200 },
          },
        }),
      include_shape: z
        .stringbool()
        .default(false)
        .exactOptional()
        .openapi({
          param: {
            name: 'include_shape',
            in: 'query',
            description: 'Include shape data',
            required: false,
            schema: { type: 'boolean', default: false },
          },
        }),
      include_count: z
        .stringbool()
        .default(false)
        .exactOptional()
        .openapi({
          param: {
            name: 'include_count',
            in: 'query',
            description: 'Include total count',
            required: false,
            schema: { type: 'boolean', default: false },
          },
        }),
      limit: z.coerce
        .number()
        .int()
        .max(50)
        .default(10)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            description: 'Number of results',
            required: false,
            schema: { type: 'integer', default: 10, maximum: 50 },
          },
        }),
      offset: z.coerce
        .number()
        .int()
        .default(0)
        .exactOptional()
        .openapi({
          param: {
            name: 'offset',
            in: 'query',
            description: 'Result offset',
            required: false,
            schema: { type: 'integer', default: 0 },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: z
            .object({
              status: z.enum(['success', 'zero results', 'error']),
              results: z.array(
                z
                  .object({
                    region: z.string(),
                    city: z.string(),
                    code: z.string(),
                    lat: z.string(),
                    lon: z.string(),
                  })
                  .openapi({ required: ['region', 'city', 'code', 'lat', 'lon'] }),
              ),
            })
            .openapi({ required: ['status', 'results'] }),
        },
      },
    },
  },
})

export const postTrailingSlashRealApiV2PublicBookingAccountRegisterOauthIndexRoute = createRoute({
  method: 'post',
  path: '/trailingSlashReal/api/v2/public/booking/account/register/oauth/',
  tags: ['v2/public/booking/account/register/oauth'],
  operationId: 'trailingSlashRealPostApiV2PublicBookingAccountRegisterOauthIndex',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ account: z.object({}), profile: z.object({}) })
            .openapi({ required: ['account', 'profile'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Default Response',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string(), provisionalId: z.string().exactOptional() })
            .openapi({ required: ['message'] }),
        },
      },
    },
    404: {
      description: 'Default Response',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string(), provisionalId: z.string().exactOptional() })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})

export const postTrailingSlashRealApiV2PublicBookingAccountRegisterEmailRoute = createRoute({
  method: 'post',
  path: '/trailingSlashReal/api/v2/public/booking/account/register/email',
  tags: ['v2/public/booking/account/register/email'],
  summary: 'Send registration URL via email',
  operationId: 'trailingSlashRealPostApiV2PublicBookingAccountRegisterEmail',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({ email: z.email() }).openapi({ required: ['email'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Default Response',
      content: {
        'application/json': {
          schema: z.object({ message: z.string() }).openapi({ required: ['message'] }),
        },
      },
    },
  },
})

export const postDefaultResponseItemsRoute = createRoute({
  method: 'post',
  path: '/defaultResponse/items',
  operationId: 'defaultResponseCreateItem',
  request: {
    body: {
      content: { 'application/json': { schema: DefaultResponseItemSchema } },
      required: true,
    },
  },
  responses: {
    default: {
      description: 'successful operation',
      content: { 'application/json': { schema: DefaultResponseItemSchema } },
    },
  },
})

export const getDefaultResponsePingRoute = createRoute({
  method: 'get',
  path: '/defaultResponse/ping',
  operationId: 'defaultResponsePing',
  responses: { '2XX': { description: 'ok', content: { 'text/plain': { schema: z.string() } } } },
})

export const postComplexSchemasExpressionsRoute = createRoute({
  method: 'post',
  path: '/complexSchemas/expressions',
  description: 'Circular reference with oneOf (expression tree)',
  operationId: 'complexSchemasEvaluateExpression',
  request: {
    body: {
      content: { 'application/json': { schema: ComplexSchemasExpressionSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Evaluation result',
      content: { 'application/json': { schema: ComplexSchemasExpressionSchema } },
    },
  },
})

export const postComplexSchemasShapesRoute = createRoute({
  method: 'post',
  path: '/complexSchemas/shapes',
  description: '5-variant discriminated union',
  operationId: 'complexSchemasCreateShape',
  request: {
    body: {
      content: { 'application/json': { schema: ComplexSchemasShapeSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Created shape',
      content: { 'application/json': { schema: ComplexSchemasShapeSchema } },
    },
  },
})

export const postComplexSchemasDocumentsRoute = createRoute({
  method: 'post',
  path: '/complexSchemas/documents',
  description: 'allOf inside oneOf (nested composition)',
  operationId: 'complexSchemasCreateDocument',
  request: {
    body: {
      content: { 'application/json': { schema: ComplexSchemasDocumentSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Created document',
      content: { 'application/json': { schema: ComplexSchemasDocumentSchema } },
    },
  },
})

export const postComplexSchemasConfigsRoute = createRoute({
  method: 'post',
  path: '/complexSchemas/configs',
  description: 'Deeply nested allOf chain',
  operationId: 'complexSchemasCreateConfig',
  request: {
    body: {
      content: { 'application/json': { schema: ComplexSchemasFullConfigSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Created config',
      content: { 'application/json': { schema: ComplexSchemasFullConfigSchema } },
    },
  },
})

export const getComplexSchemasNullableUnionRoute = createRoute({
  method: 'get',
  path: '/complexSchemas/nullable-union',
  description: 'Nullable anyOf with mixed types',
  operationId: 'complexSchemasGetNullableUnion',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: ComplexSchemasNullableResultSchema } },
    },
  },
})

export const getComplexSchemasNestedCircularRoute = createRoute({
  method: 'get',
  path: '/complexSchemas/nested-circular',
  description: 'Circular reference through allOf',
  operationId: 'complexSchemasGetNestedCircular',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: ComplexSchemasCategorySchema } },
    },
  },
})

export const postVendorExtensionsUsersRoute = createRoute({
  method: 'post',
  path: '/vendorExtensions/users',
  operationId: 'vendorExtensionsCreateUser',
  request: {
    body: {
      content: { 'application/json': { schema: VendorExtensionsCreateUserSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Created',
      content: { 'application/json': { schema: VendorExtensionsUserSchema } },
    },
  },
})

export const getVendorExtensionsUsersUserIdRoute = createRoute({
  method: 'get',
  path: '/vendorExtensions/users/{userId}',
  operationId: 'vendorExtensionsGetUser',
  request: {
    params: z.object({
      userId: VendorExtensionsUserIdSchema.openapi({
        param: {
          name: 'userId',
          in: 'path',
          required: true,
          schema: { $ref: '#/components/schemas/VendorExtensionsUserId' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: VendorExtensionsUserSchema } },
    },
  },
})

export const postVendorExtensionsPostsRoute = createRoute({
  method: 'post',
  path: '/vendorExtensions/posts',
  operationId: 'vendorExtensionsCreatePost',
  request: {
    body: {
      content: { 'application/json': { schema: VendorExtensionsCreatePostSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Created',
      content: { 'application/json': { schema: VendorExtensionsPostSchema } },
    },
  },
})

export const postVendorExtensionsTransformsRoute = createRoute({
  method: 'post',
  path: '/vendorExtensions/transforms',
  operationId: 'vendorExtensionsPostTransforms',
  request: {
    body: {
      content: { 'application/json': { schema: VendorExtensionsTransformFormSchema } },
      required: true,
    },
  },
  responses: { 200: { description: 'OK' } },
})

export const postVendorExtensionsCoerceRoute = createRoute({
  method: 'post',
  path: '/vendorExtensions/coerce',
  operationId: 'vendorExtensionsPostCoerce',
  request: {
    body: {
      content: { 'application/json': { schema: VendorExtensionsCoerceFormSchema } },
      required: true,
    },
  },
  responses: { 200: { description: 'OK' } },
})

export const postVendorExtensionsReplacementsRoute = createRoute({
  method: 'post',
  path: '/vendorExtensions/replacements',
  operationId: 'vendorExtensionsPostReplacements',
  request: {
    body: {
      content: { 'application/json': { schema: VendorExtensionsReplacementFormSchema } },
      required: true,
    },
  },
  responses: { 200: { description: 'OK' } },
})

export const postVendorExtensionsFormatsRoute = createRoute({
  method: 'post',
  path: '/vendorExtensions/formats',
  operationId: 'vendorExtensionsPostFormats',
  request: {
    body: {
      content: { 'application/json': { schema: VendorExtensionsFormatOptionsSchema } },
      required: true,
    },
  },
  responses: { 200: { description: 'OK' } },
})

export const postVendorExtensionsCustomRoute = createRoute({
  method: 'post',
  path: '/vendorExtensions/custom',
  operationId: 'vendorExtensionsPostCustom',
  request: {
    body: {
      content: { 'application/json': { schema: VendorExtensionsCustomFormSchema } },
      required: true,
    },
  },
  responses: { 200: { description: 'OK' } },
})

export const postVendorExtensionsMessagesRoute = createRoute({
  method: 'post',
  path: '/vendorExtensions/messages',
  operationId: 'vendorExtensionsPostMessages',
  request: {
    body: {
      content: { 'application/json': { schema: VendorExtensionsMessageFormSchema } },
      required: true,
    },
  },
  responses: { 200: { description: 'OK' } },
})

export const postVendorExtensionsCompositionRoute = createRoute({
  method: 'post',
  path: '/vendorExtensions/composition',
  operationId: 'vendorExtensionsPostComposition',
  request: {
    body: {
      content: { 'application/json': { schema: VendorExtensionsCompositionSchema } },
      required: true,
    },
  },
  responses: { 200: { description: 'OK' } },
})

export const postVendorExtensionsConditionalRoute = createRoute({
  method: 'post',
  path: '/vendorExtensions/conditional',
  operationId: 'vendorExtensionsPostConditional',
  request: {
    body: {
      content: { 'application/json': { schema: VendorExtensionsConditionalSchema } },
      required: true,
    },
  },
  responses: { 200: { description: 'OK' } },
})

export const postVendorExtensionsApplicatorsRoute = createRoute({
  method: 'post',
  path: '/vendorExtensions/applicators',
  operationId: 'vendorExtensionsPostApplicators',
  request: {
    body: {
      content: { 'application/json': { schema: VendorExtensionsApplicatorsSchema } },
      required: true,
    },
  },
  responses: { 200: { description: 'OK' } },
})

export const getPaginationItemsRoute = createRoute({
  method: 'get',
  path: '/pagination/items',
  summary: 'List items with pagination',
  operationId: 'paginationListItems',
  request: {
    query: z.object({
      limit: z.coerce
        .number()
        .int()
        .exactOptional()
        .openapi({ param: { name: 'limit', in: 'query', schema: { type: 'integer' } } }),
      cursor: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'cursor', in: 'query', schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: PaginationItemsPageSchema } },
    },
  },
})

export const getPaginationFeedsRoute = createRoute({
  method: 'get',
  path: '/pagination/feeds',
  summary: 'Feed (paginated, no args)',
  operationId: 'paginationListFeeds',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: PaginationItemsPageSchema } },
    },
  },
})

export const getPaginationUsersUserIdPostsRoute = createRoute({
  method: 'get',
  path: '/pagination/users/{userId}/posts',
  summary: "User's posts (paginated, path param)",
  operationId: 'paginationListUserPosts',
  request: {
    params: z.object({
      userId: z
        .string()
        .openapi({
          param: { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
        }),
    }),
    query: z.object({
      cursor: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'cursor', in: 'query', schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: PaginationItemsPageSchema } },
    },
  },
})

function mockAllExportsUser() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }
}

function mockAllExportsUserList() {
  return Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockAllExportsUser())
}

function mockCircularRefsTreeNode(): any {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    value: faker.string.alpha({ length: { min: 5, max: 20 } }),
    children: faker.helpers.arrayElement([
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        mockCircularRefsTreeNode(),
      ),
      undefined,
    ]),
  }
}

function mockCircularRefsNodeC(): any {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    ref: faker.helpers.arrayElement([mockCircularRefsNodeA(), undefined]),
  }
}

function mockCircularRefsNodeB(): any {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    ref: faker.helpers.arrayElement([mockCircularRefsNodeC(), undefined]),
  }
}

function mockCircularRefsNodeA(): any {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    ref: faker.helpers.arrayElement([mockCircularRefsNodeB(), undefined]),
  }
}

function mockParametersMergeItem() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    name: faker.person.fullName(),
    createdAt: faker.date.past().toISOString(),
  }
}

function mockSchemaEdgeCasesNullableFields() {
  return {
    name: faker.person.fullName(),
    nickname: faker.helpers.arrayElement([undefined, undefined]),
    age: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 120 }), undefined]),
    tags: faker.helpers.arrayElement([undefined, undefined]),
  }
}

function mockSchemaEdgeCasesCircle() {
  return {
    kind: 'circle' as const,
    radius: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockSchemaEdgeCasesRectangle() {
  return {
    kind: 'rectangle' as const,
    width: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    height: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockSchemaEdgeCasesShape() {
  return faker.helpers.arrayElement([mockSchemaEdgeCasesCircle(), mockSchemaEdgeCasesRectangle()])
}

function mockSchemaEdgeCasesBase() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    createdAt: faker.date.past().toISOString(),
  }
}

function mockSchemaEdgeCasesExtended() {
  return {
    name: faker.person.fullName(),
    description: faker.helpers.arrayElement([faker.lorem.paragraph(), undefined]),
  }
}

function mockSchemaEdgeCasesComposedObject() {
  return {
    ...mockSchemaEdgeCasesBase(),
    ...mockSchemaEdgeCasesExtended(),
    ...{ extra: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]) },
  }
}

function mockSchemaEdgeCasesLevel1() {
  return { level2: { level3: { value: faker.string.alpha({ length: { min: 5, max: 20 } }) } } }
}

function mockSchemaEdgeCasesDynamicMap() {
  return {}
}

function mockCallbacksLinksSubscription() {
  return {
    id: faker.string.alpha({ length: { min: 5, max: 20 } }),
    callbackUrl: faker.internet.url(),
    events: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      faker.string.alpha({ length: { min: 5, max: 20 } }),
    ),
    status: faker.helpers.arrayElement(['active', 'paused', 'cancelled'] as const),
  }
}

function mockCrudRefsAuthor() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    name: faker.person.fullName(),
    avatarUrl: faker.helpers.arrayElement([faker.internet.url(), undefined]),
  }
}

function mockCrudRefsTag() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    name: faker.person.fullName(),
    slug: faker.string.alpha({ length: { min: 5, max: 20 } }),
  }
}

function mockCrudRefsPost() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    title: faker.lorem.sentence(),
    body: faker.string.alpha({ length: { min: 5, max: 20 } }),
    author: mockCrudRefsAuthor(),
    tags: faker.helpers.arrayElement([
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockCrudRefsTag()),
      undefined,
    ]),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  }
}

function mockCrudRefsComment() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    body: faker.string.alpha({ length: { min: 5, max: 20 } }),
    author: mockCrudRefsAuthor(),
    createdAt: faker.date.past().toISOString(),
  }
}

function mockComprehensiveAddress() {
  return {
    street: faker.string.alpha({ length: { min: 5, max: 20 } }),
    city: faker.location.city(),
    state: faker.helpers.arrayElement([faker.location.state(), undefined]),
    zip: faker.helpers.arrayElement([faker.location.zipCode(), undefined]),
    country: faker.location.country(),
  }
}

function mockComprehensiveUser() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['admin', 'customer'] as const),
    address: faker.helpers.arrayElement([mockComprehensiveAddress(), undefined]),
    createdAt: faker.date.past().toISOString(),
  }
}

function mockComprehensiveCategory() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    name: faker.person.fullName(),
    parentId: faker.helpers.arrayElement([undefined, undefined]),
  }
}

function mockComprehensiveProduct() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    name: faker.person.fullName(),
    description: faker.helpers.arrayElement([faker.lorem.paragraph(), undefined]),
    price: faker.number.float({ min: 1, max: 10000, fractionDigits: 2 }),
    category: mockComprehensiveCategory(),
    tags: faker.helpers.arrayElement([
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.string.alpha({ length: { min: 5, max: 20 } }),
      ),
      undefined,
    ]),
    inStock: faker.datatype.boolean(),
    createdAt: faker.date.past().toISOString(),
  }
}

function mockComprehensiveReview() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
    author: mockComprehensiveUser(),
    createdAt: faker.date.past().toISOString(),
  }
}

function mockComprehensiveOrderItem() {
  return {
    product: mockComprehensiveProduct(),
    quantity: faker.number.int({ min: 1, max: 100 }),
    price: faker.number.float({ min: 1, max: 10000, fractionDigits: 2 }),
  }
}

function mockComprehensiveOrder() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    user: mockComprehensiveUser(),
    items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      mockComprehensiveOrderItem(),
    ),
    status: faker.helpers.arrayElement([
      'pending',
      'confirmed',
      'shipped',
      'delivered',
      'cancelled',
    ] as const),
    totalPrice: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    shippingAddress: mockComprehensiveAddress(),
    createdAt: faker.date.past().toISOString(),
  }
}

function mockCompositionKeywordsCreditCard() {
  return {
    type: 'credit_card' as const,
    cardNumber: faker.string.alpha({ length: { min: 5, max: 20 } }),
    expiry: faker.string.alpha({ length: { min: 5, max: 20 } }),
  }
}

function mockCompositionKeywordsBankTransfer() {
  return {
    type: 'bank_transfer' as const,
    bankCode: faker.string.alpha({ length: { min: 5, max: 20 } }),
    accountNumber: faker.string.alpha({ length: { min: 5, max: 20 } }),
  }
}

function mockCompositionKeywordsPaymentMethod() {
  return faker.helpers.arrayElement([
    mockCompositionKeywordsCreditCard(),
    mockCompositionKeywordsBankTransfer(),
  ])
}

function mockCompositionKeywordsSearchFilter() {
  return faker.helpers.arrayElement([
    { keyword: faker.string.alpha({ length: { min: 5, max: 20 } }) },
    { category: faker.number.int({ min: 1, max: 1000 }) },
  ])
}

function mockCompositionKeywordsPerson() {
  return { name: faker.person.fullName(), email: faker.internet.email() }
}

function mockCompositionKeywordsEmployeeInfo() {
  return {
    employeeId: faker.number.int({ min: 1, max: 1000 }),
    department: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
  }
}

function mockCompositionKeywordsEmployee() {
  return {
    ...mockCompositionKeywordsPerson(),
    ...mockCompositionKeywordsEmployeeInfo(),
    ...{
      startDate: faker.helpers.arrayElement([
        faker.date.past().toISOString().slice(0, 10),
        undefined,
      ]),
    },
  }
}

function mockCompositionKeywordsNotStringValue() {
  return undefined
}

function mockCompositionKeywordsNotAdmin() {
  return undefined
}

function mockCompositionKeywordsNotDraftOrArchived() {
  return undefined
}

function mockCompositionKeywordsNotSpecificValue() {
  return undefined
}

function mockCompositionKeywordsNotStringOrNumber() {
  return undefined
}

function mockCompositionKeywordsBaseEntity() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    createdAt: faker.date.past().toISOString(),
  }
}

function mockCompositionKeywordsExtendedWithSibling() {
  return {
    ...mockCompositionKeywordsBaseEntity(),
    label: faker.string.alpha({ length: { min: 5, max: 20 } }),
    active: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
  }
}

function mockCompositionKeywordsNullablePayment() {
  return faker.helpers.arrayElement([
    mockCompositionKeywordsCreditCard(),
    mockCompositionKeywordsBankTransfer(),
  ])
}

function mockCompositionKeywordsFlexibleId() {
  return faker.helpers.arrayElement([
    faker.string.alpha({ length: { min: 5, max: 20 } }),
    faker.number.int({ min: 1, max: 1000 }),
    faker.string.uuid(),
  ])
}

function mockCompositionKeywordsCat() {
  return {
    name: faker.person.fullName(),
    purring: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
  }
}

function mockCompositionKeywordsDog() {
  return {
    name: faker.person.fullName(),
    barkVolume: faker.helpers.arrayElement([
      faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
      undefined,
    ]),
  }
}

function mockCompositionKeywordsPetChoice() {
  return faker.helpers.arrayElement([mockCompositionKeywordsCat(), mockCompositionKeywordsDog()])
}

function mockCallbacksFieldOrder() {
  return {
    id: faker.string.alpha({ length: { min: 5, max: 20 } }),
    item: faker.string.alpha({ length: { min: 5, max: 20 } }),
    quantity: faker.number.int({ min: 1, max: 100 }),
    status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
  }
}

function mockCallbacksFieldPayment() {
  return {
    id: faker.string.alpha({ length: { min: 5, max: 20 } }),
    amount: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    currency: faker.string.alpha({ length: { min: 5, max: 20 } }),
    status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
  }
}

function mockReadonlyRefUser() {
  return {
    id: faker.string.alpha({ length: { min: 5, max: 20 } }),
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }
}

function mockReadonlyRefItem() {
  return { id: faker.number.int({ min: 1, max: 99999 }), title: faker.lorem.sentence() }
}

function mockDefaultResponseItem() {
  return { id: faker.string.alpha({ length: { min: 5, max: 20 } }), name: faker.person.fullName() }
}

function mockComplexSchemasLiteralExpr() {
  return {
    type: 'literal' as const,
    value: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
      faker.datatype.boolean(),
    ]),
  }
}

function mockComplexSchemasUnaryExpr(): any {
  return {
    type: 'unary' as const,
    operator: faker.helpers.arrayElement(['-', '!'] as const),
    operand: mockComplexSchemasExpression(),
  }
}

function mockComplexSchemasBinaryExpr(): any {
  return {
    type: 'binary' as const,
    operator: faker.helpers.arrayElement(['+', '-', '*', '/'] as const),
    left: mockComplexSchemasExpression(),
    right: mockComplexSchemasExpression(),
  }
}

function mockComplexSchemasExpression(): any {
  return faker.helpers.arrayElement([
    mockComplexSchemasLiteralExpr(),
    mockComplexSchemasUnaryExpr(),
    mockComplexSchemasBinaryExpr(),
  ])
}

function mockComplexSchemasCircle() {
  return {
    kind: 'circle' as const,
    radius: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockComplexSchemasRectangle() {
  return {
    kind: 'rectangle' as const,
    width: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    height: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockComplexSchemasTriangle() {
  return {
    kind: 'triangle' as const,
    base: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    height: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockComplexSchemasPolygon() {
  return {
    kind: 'polygon' as const,
    sides: faker.number.int({ min: 3, max: 1000 }),
    sideLength: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockComplexSchemasEllipse() {
  return {
    kind: 'ellipse' as const,
    semiMajor: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    semiMinor: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockComplexSchemasShape() {
  return faker.helpers.arrayElement([
    mockComplexSchemasCircle(),
    mockComplexSchemasRectangle(),
    mockComplexSchemasTriangle(),
    mockComplexSchemasPolygon(),
    mockComplexSchemasEllipse(),
  ])
}

function mockComplexSchemasDocumentBase() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    createdAt: faker.date.past().toISOString(),
  }
}

function mockComplexSchemasArticleContent() {
  return {
    docType: 'article' as const,
    body: faker.string.alpha({ length: { min: 5, max: 20 } }),
    wordCount: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 1000 }), undefined]),
  }
}

function mockComplexSchemasArticle() {
  return { ...mockComplexSchemasDocumentBase(), ...mockComplexSchemasArticleContent() }
}

function mockComplexSchemasSpreadsheetContent() {
  return {
    docType: 'spreadsheet' as const,
    rows: faker.number.int({ min: 1, max: 1000 }),
    columns: faker.number.int({ min: 1, max: 1000 }),
  }
}

function mockComplexSchemasSpreadsheet() {
  return { ...mockComplexSchemasDocumentBase(), ...mockComplexSchemasSpreadsheetContent() }
}

function mockComplexSchemasDocument() {
  return faker.helpers.arrayElement([mockComplexSchemasArticle(), mockComplexSchemasSpreadsheet()])
}

function mockComplexSchemasBaseConfig() {
  return { version: faker.number.int({ min: 1, max: 1000 }) }
}

function mockComplexSchemasNetworkConfig() {
  return {
    host: faker.string.alpha({ length: { min: 5, max: 20 } }),
    port: faker.number.int({ min: 1, max: 65535 }),
  }
}

function mockComplexSchemasSecurityConfig() {
  return {
    tlsEnabled: faker.datatype.boolean(),
    certPath: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
  }
}

function mockComplexSchemasFullConfig() {
  return {
    ...mockComplexSchemasBaseConfig(),
    ...mockComplexSchemasNetworkConfig(),
    ...mockComplexSchemasSecurityConfig(),
  }
}

function mockComplexSchemasSuccessResult() {
  return { status: 'success' as const, data: {} }
}

function mockComplexSchemasErrorResult() {
  return {
    status: 'error' as const,
    message: faker.string.alpha({ length: { min: 5, max: 20 } }),
    code: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 1000 }), undefined]),
  }
}

function mockComplexSchemasNullableResult() {
  return faker.helpers.arrayElement([
    mockComplexSchemasSuccessResult(),
    mockComplexSchemasErrorResult(),
  ])
}

function mockComplexSchemasCategory(): any {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    name: faker.person.fullName(),
    parent: faker.helpers.arrayElement([mockComplexSchemasCategory(), undefined]),
    children: faker.helpers.arrayElement([
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        mockComplexSchemasCategory(),
      ),
      undefined,
    ]),
  }
}

function mockVendorExtensionsUserId() {
  return faker.string.uuid() as z.infer<typeof VendorExtensionsUserIdSchema>
}

function mockVendorExtensionsEmail() {
  return faker.internet.email() as z.infer<typeof VendorExtensionsEmailSchema>
}

function mockVendorExtensionsUsername() {
  return faker.string.alpha({ length: { min: 3, max: 20 } }) as z.infer<
    typeof VendorExtensionsUsernameSchema
  >
}

function mockVendorExtensionsUser() {
  return {
    id: mockVendorExtensionsUserId(),
    email: mockVendorExtensionsEmail(),
    username: mockVendorExtensionsUsername(),
  }
}

function mockVendorExtensionsPostId() {
  return faker.string.uuid() as z.infer<typeof VendorExtensionsPostIdSchema>
}

function mockVendorExtensionsPost() {
  return {
    id: mockVendorExtensionsPostId(),
    authorId: mockVendorExtensionsUserId(),
    title: faker.lorem.sentence(),
  }
}

function mockPaginationItem() {
  return { id: faker.string.alpha({ length: { min: 5, max: 20 } }), name: faker.person.fullName() }
}

function mockPaginationItemsPage() {
  return {
    items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockPaginationItem()),
    nextCursor: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
  }
}

const getMinimalHealthRouteHandler: RouteHandler<typeof getMinimalHealthRoute> = async (c) => {
  return c.json({ status: faker.helpers.arrayElement(['active', 'inactive', 'pending']) }, 200)
}

const getAllExportsUsersRouteHandler: RouteHandler<typeof getAllExportsUsersRoute> = async (c) => {
  return c.json(mockAllExportsUserList(), 200)
}

const postAllExportsUsersRouteHandler: RouteHandler<typeof postAllExportsUsersRoute> = async (
  c,
) => {
  return c.json(mockAllExportsUser(), 201)
}

const getAllExportsUsersIdRouteHandler: RouteHandler<typeof getAllExportsUsersIdRoute> = async (
  c,
) => {
  return c.json(mockAllExportsUser(), 200)
}

const getCircularRefsTreeRouteHandler: RouteHandler<typeof getCircularRefsTreeRoute> = async (
  c,
) => {
  return c.json(mockCircularRefsTreeNode(), 200)
}

const postCircularRefsTreeRouteHandler: RouteHandler<typeof postCircularRefsTreeRoute> = async (
  c,
) => {
  return c.json(mockCircularRefsTreeNode(), 201)
}

const getCircularRefsGraphRouteHandler: RouteHandler<typeof getCircularRefsGraphRoute> = async (
  c,
) => {
  return c.json(mockCircularRefsNodeA(), 200)
}

const getSecuritySchemesPublicRouteHandler: RouteHandler<
  typeof getSecuritySchemesPublicRoute
> = async (c) => {
  return c.json({ message: faker.string.alpha({ length: { min: 5, max: 20 } }) }, 200)
}

const getSecuritySchemesBearerProtectedRouteHandler: RouteHandler<
  typeof getSecuritySchemesBearerProtectedRoute
> = async (c) => {
  return c.json({ data: faker.string.alpha({ length: { min: 5, max: 20 } }) }, 200)
}

const getSecuritySchemesApiKeyProtectedRouteHandler: RouteHandler<
  typeof getSecuritySchemesApiKeyProtectedRoute
> = async (c) => {
  return c.json({ data: faker.string.alpha({ length: { min: 5, max: 20 } }) }, 200)
}

const getSecuritySchemesBasicProtectedRouteHandler: RouteHandler<
  typeof getSecuritySchemesBasicProtectedRoute
> = async (c) => {
  return c.json({ data: faker.string.alpha({ length: { min: 5, max: 20 } }) }, 200)
}

const getSecuritySchemesOauthProtectedRouteHandler: RouteHandler<
  typeof getSecuritySchemesOauthProtectedRoute
> = async (c) => {
  return c.json({ data: faker.string.alpha({ length: { min: 5, max: 20 } }) }, 200)
}

const getSecuritySchemesMultiAuthRouteHandler: RouteHandler<
  typeof getSecuritySchemesMultiAuthRoute
> = async (c) => {
  return c.json({ data: faker.string.alpha({ length: { min: 5, max: 20 } }) }, 200)
}

const postContentTypesJsonRouteHandler: RouteHandler<typeof postContentTypesJsonRoute> = async (
  c,
) => {
  return c.json(
    { id: faker.number.int({ min: 1, max: 99999 }), name: faker.person.fullName() },
    200,
  )
}

const postContentTypesFormRouteHandler: RouteHandler<typeof postContentTypesFormRoute> = async (
  c,
) => {
  return c.json({ success: faker.datatype.boolean() }, 200)
}

const postContentTypesUploadRouteHandler: RouteHandler<typeof postContentTypesUploadRoute> = async (
  c,
) => {
  return c.json({ url: faker.internet.url() }, 200)
}

const postContentTypesTextRouteHandler: RouteHandler<typeof postContentTypesTextRoute> = async (
  c,
) => {
  return c.text(faker.string.alpha({ length: { min: 5, max: 20 } }), 200)
}

const postContentTypesMultiContentRouteHandler: RouteHandler<
  typeof postContentTypesMultiContentRoute
> = async (c) => {
  return c.json({ received: faker.datatype.boolean() }, 200)
}

const getParametersMergeItemsItemIdRouteHandler: RouteHandler<
  typeof getParametersMergeItemsItemIdRoute
> = async (c) => {
  return c.json(mockParametersMergeItem(), 200)
}

const putParametersMergeItemsItemIdRouteHandler: RouteHandler<
  typeof putParametersMergeItemsItemIdRoute
> = async (c) => {
  return c.json(mockParametersMergeItem(), 200)
}

const deleteParametersMergeItemsItemIdRouteHandler: RouteHandler<
  typeof deleteParametersMergeItemsItemIdRoute
> = async (_c) => {
  return new Response(null, { status: 204 })
}

const getParametersMergeItemsRouteHandler: RouteHandler<
  typeof getParametersMergeItemsRoute
> = async (c) => {
  return c.json(
    {
      items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        mockParametersMergeItem(),
      ),
      total: faker.number.int({ min: 1, max: 1000 }),
    },
    200,
  )
}

const postSchemaEdgeCasesNullableRouteHandler: RouteHandler<
  typeof postSchemaEdgeCasesNullableRoute
> = async (c) => {
  return c.json(mockSchemaEdgeCasesNullableFields(), 200)
}

const postSchemaEdgeCasesDiscriminatedRouteHandler: RouteHandler<
  typeof postSchemaEdgeCasesDiscriminatedRoute
> = async (c) => {
  return c.json(mockSchemaEdgeCasesShape(), 200)
}

const getSchemaEdgeCasesComposedRouteHandler: RouteHandler<
  typeof getSchemaEdgeCasesComposedRoute
> = async (c) => {
  return c.json(mockSchemaEdgeCasesComposedObject(), 200)
}

const getSchemaEdgeCasesDeepNestedRouteHandler: RouteHandler<
  typeof getSchemaEdgeCasesDeepNestedRoute
> = async (c) => {
  return c.json(mockSchemaEdgeCasesLevel1(), 200)
}

const getSchemaEdgeCasesAdditionalPropsRouteHandler: RouteHandler<
  typeof getSchemaEdgeCasesAdditionalPropsRoute
> = async (c) => {
  return c.json(mockSchemaEdgeCasesDynamicMap(), 200)
}

const postCallbacksLinksSubscriptionsRouteHandler: RouteHandler<
  typeof postCallbacksLinksSubscriptionsRoute
> = async (c) => {
  return c.json(mockCallbacksLinksSubscription(), 201)
}

const getCallbacksLinksSubscriptionsIdRouteHandler: RouteHandler<
  typeof getCallbacksLinksSubscriptionsIdRoute
> = async (c) => {
  return c.json(mockCallbacksLinksSubscription(), 200)
}

const deleteCallbacksLinksSubscriptionsIdRouteHandler: RouteHandler<
  typeof deleteCallbacksLinksSubscriptionsIdRoute
> = async (_c) => {
  return new Response(null, { status: 204 })
}

const postCallbacksLinksWebhooksTestRouteHandler: RouteHandler<
  typeof postCallbacksLinksWebhooksTestRoute
> = async (c) => {
  return c.json({ sent: faker.datatype.boolean() }, 200)
}

const getCrudRefsPostsRouteHandler: RouteHandler<typeof getCrudRefsPostsRoute> = async (c) => {
  return c.json(
    {
      posts: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockCrudRefsPost()),
      total: faker.number.int({ min: 1, max: 1000 }),
    },
    200,
  )
}

const postCrudRefsPostsRouteHandler: RouteHandler<typeof postCrudRefsPostsRoute> = async (c) => {
  return c.json(mockCrudRefsPost(), 201)
}

const getCrudRefsPostsIdRouteHandler: RouteHandler<typeof getCrudRefsPostsIdRoute> = async (c) => {
  return c.json(mockCrudRefsPost(), 200)
}

const putCrudRefsPostsIdRouteHandler: RouteHandler<typeof putCrudRefsPostsIdRoute> = async (c) => {
  return c.json(mockCrudRefsPost(), 200)
}

const deleteCrudRefsPostsIdRouteHandler: RouteHandler<typeof deleteCrudRefsPostsIdRoute> = async (
  _c,
) => {
  return new Response(null, { status: 204 })
}

const getCrudRefsPostsIdCommentsRouteHandler: RouteHandler<
  typeof getCrudRefsPostsIdCommentsRoute
> = async (c) => {
  return c.json(
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockCrudRefsComment()),
    200,
  )
}

const postCrudRefsPostsIdCommentsRouteHandler: RouteHandler<
  typeof postCrudRefsPostsIdCommentsRoute
> = async (c) => {
  return c.json(mockCrudRefsComment(), 201)
}

const getCrudRefsTagsRouteHandler: RouteHandler<typeof getCrudRefsTagsRoute> = async (c) => {
  return c.json(
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockCrudRefsTag()),
    200,
  )
}

const getComprehensiveUsersRouteHandler: RouteHandler<typeof getComprehensiveUsersRoute> = async (
  c,
) => {
  return c.json(
    {
      users: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        mockComprehensiveUser(),
      ),
      total: faker.number.int({ min: 1, max: 1000 }),
    },
    200,
  )
}

const postComprehensiveUsersRouteHandler: RouteHandler<typeof postComprehensiveUsersRoute> = async (
  c,
) => {
  return c.json(mockComprehensiveUser(), 201)
}

const getComprehensiveUsersUserIdRouteHandler: RouteHandler<
  typeof getComprehensiveUsersUserIdRoute
> = async (c) => {
  return c.json(mockComprehensiveUser(), 200)
}

const putComprehensiveUsersUserIdRouteHandler: RouteHandler<
  typeof putComprehensiveUsersUserIdRoute
> = async (c) => {
  return c.json(mockComprehensiveUser(), 200)
}

const deleteComprehensiveUsersUserIdRouteHandler: RouteHandler<
  typeof deleteComprehensiveUsersUserIdRoute
> = async (_c) => {
  return new Response(null, { status: 204 })
}

const getComprehensiveProductsRouteHandler: RouteHandler<
  typeof getComprehensiveProductsRoute
> = async (c) => {
  return c.json(
    {
      products: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        mockComprehensiveProduct(),
      ),
      total: faker.number.int({ min: 1, max: 1000 }),
    },
    200,
  )
}

const postComprehensiveProductsRouteHandler: RouteHandler<
  typeof postComprehensiveProductsRoute
> = async (c) => {
  return c.json(mockComprehensiveProduct(), 201)
}

const getComprehensiveProductsProductIdRouteHandler: RouteHandler<
  typeof getComprehensiveProductsProductIdRoute
> = async (c) => {
  return c.json(mockComprehensiveProduct(), 200)
}

const putComprehensiveProductsProductIdRouteHandler: RouteHandler<
  typeof putComprehensiveProductsProductIdRoute
> = async (c) => {
  return c.json(mockComprehensiveProduct(), 200)
}

const getComprehensiveProductsProductIdReviewsRouteHandler: RouteHandler<
  typeof getComprehensiveProductsProductIdReviewsRoute
> = async (c) => {
  return c.json(
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockComprehensiveReview()),
    200,
  )
}

const postComprehensiveProductsProductIdReviewsRouteHandler: RouteHandler<
  typeof postComprehensiveProductsProductIdReviewsRoute
> = async (c) => {
  return c.json(mockComprehensiveReview(), 201)
}

const getComprehensiveOrdersRouteHandler: RouteHandler<typeof getComprehensiveOrdersRoute> = async (
  c,
) => {
  return c.json(
    {
      orders: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        mockComprehensiveOrder(),
      ),
      total: faker.number.int({ min: 1, max: 1000 }),
    },
    200,
  )
}

const postComprehensiveOrdersRouteHandler: RouteHandler<
  typeof postComprehensiveOrdersRoute
> = async (c) => {
  return c.json(mockComprehensiveOrder(), 201)
}

const getComprehensiveOrdersOrderIdRouteHandler: RouteHandler<
  typeof getComprehensiveOrdersOrderIdRoute
> = async (c) => {
  return c.json(mockComprehensiveOrder(), 200)
}

const getComprehensiveCategoriesRouteHandler: RouteHandler<
  typeof getComprehensiveCategoriesRoute
> = async (c) => {
  return c.json(
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockComprehensiveCategory()),
    200,
  )
}

const postComprehensiveUploadImageRouteHandler: RouteHandler<
  typeof postComprehensiveUploadImageRoute
> = async (c) => {
  return c.json(
    {
      url: faker.internet.url(),
      width: faker.number.int({ min: 1, max: 1000 }),
      height: faker.number.int({ min: 1, max: 1000 }),
    },
    200,
  )
}

const postCompositionKeywordsOneOfRouteHandler: RouteHandler<
  typeof postCompositionKeywordsOneOfRoute
> = async (c) => {
  return c.json(mockCompositionKeywordsPaymentMethod(), 200)
}

const postCompositionKeywordsAnyOfRouteHandler: RouteHandler<
  typeof postCompositionKeywordsAnyOfRoute
> = async (c) => {
  return c.json(mockCompositionKeywordsSearchFilter(), 200)
}

const postCompositionKeywordsAllOfRouteHandler: RouteHandler<
  typeof postCompositionKeywordsAllOfRoute
> = async (c) => {
  return c.json(mockCompositionKeywordsEmployee(), 200)
}

const postCompositionKeywordsNotRouteHandler: RouteHandler<
  typeof postCompositionKeywordsNotRoute
> = async (c) => {
  return c.json(mockCompositionKeywordsNotStringValue(), 200)
}

const getCompositionKeywordsNotRefRouteHandler: RouteHandler<
  typeof getCompositionKeywordsNotRefRoute
> = async (c) => {
  return c.json(mockCompositionKeywordsNotAdmin(), 200)
}

const getCompositionKeywordsNotEnumRouteHandler: RouteHandler<
  typeof getCompositionKeywordsNotEnumRoute
> = async (c) => {
  return c.json(mockCompositionKeywordsNotDraftOrArchived(), 200)
}

const getCompositionKeywordsNotConstRouteHandler: RouteHandler<
  typeof getCompositionKeywordsNotConstRoute
> = async (c) => {
  return c.json(mockCompositionKeywordsNotSpecificValue(), 200)
}

const getCompositionKeywordsNotCompositionRouteHandler: RouteHandler<
  typeof getCompositionKeywordsNotCompositionRoute
> = async (c) => {
  return c.json(mockCompositionKeywordsNotStringOrNumber(), 200)
}

const getCompositionKeywordsAllOfSiblingRouteHandler: RouteHandler<
  typeof getCompositionKeywordsAllOfSiblingRoute
> = async (c) => {
  return c.json(mockCompositionKeywordsExtendedWithSibling(), 200)
}

const getCompositionKeywordsNullableOneOfRouteHandler: RouteHandler<
  typeof getCompositionKeywordsNullableOneOfRoute
> = async (c) => {
  return c.json(mockCompositionKeywordsNullablePayment(), 200)
}

const getCompositionKeywordsAnyOfThreeRouteHandler: RouteHandler<
  typeof getCompositionKeywordsAnyOfThreeRoute
> = async (c) => {
  return c.json(mockCompositionKeywordsFlexibleId(), 200)
}

const getCompositionKeywordsAnyOfRefRouteHandler: RouteHandler<
  typeof getCompositionKeywordsAnyOfRefRoute
> = async (c) => {
  return c.json(mockCompositionKeywordsPetChoice(), 200)
}

const postCallbacksFieldOrdersRouteHandler: RouteHandler<
  typeof postCallbacksFieldOrdersRoute
> = async (c) => {
  return c.json(mockCallbacksFieldOrder(), 201)
}

const postCallbacksFieldPaymentsRouteHandler: RouteHandler<
  typeof postCallbacksFieldPaymentsRoute
> = async (c) => {
  return c.json(mockCallbacksFieldPayment(), 201)
}

const getCallbacksFieldItemsRouteHandler: RouteHandler<typeof getCallbacksFieldItemsRoute> = async (
  c,
) => {
  return c.json(
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      id: faker.string.alpha({ length: { min: 5, max: 20 } }),
      name: faker.person.fullName(),
    })),
    200,
  )
}

const getArrayObjectConstraintsTagsRouteHandler: RouteHandler<
  typeof getArrayObjectConstraintsTagsRoute
> = async (c) => {
  return c.json(
    {
      tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.string.alpha({ length: { min: 5, max: 20 } }),
      ),
      ids: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.number.int({ min: 1, max: 1000 }),
      ),
      labels: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.string.alpha({ length: { min: 5, max: 20 } }),
      ),
    },
    200,
  )
}

const postArrayObjectConstraintsTagsRouteHandler: RouteHandler<
  typeof postArrayObjectConstraintsTagsRoute
> = async (c) => {
  return c.body(null, 201)
}

const getArrayObjectConstraintsSettingsRouteHandler: RouteHandler<
  typeof getArrayObjectConstraintsSettingsRoute
> = async (c) => {
  return c.json({}, 200)
}

const putArrayObjectConstraintsSettingsRouteHandler: RouteHandler<
  typeof putArrayObjectConstraintsSettingsRoute
> = async (c) => {
  return c.body(null, 200)
}

const postArrayObjectConstraintsConfigRouteHandler: RouteHandler<
  typeof postArrayObjectConstraintsConfigRoute
> = async (c) => {
  return c.body(null, 201)
}

const postArrayObjectConstraintsPaymentRouteHandler: RouteHandler<
  typeof postArrayObjectConstraintsPaymentRoute
> = async (c) => {
  return c.body(null, 201)
}

const getTrailingSlashApiReverseChibanIndexRouteHandler: RouteHandler<
  typeof getTrailingSlashApiReverseChibanIndexRoute
> = async (c) => {
  return c.json({ result: faker.string.alpha({ length: { min: 5, max: 20 } }) }, 200)
}

const getTrailingSlashApiReverseChibanRouteHandler: RouteHandler<
  typeof getTrailingSlashApiReverseChibanRoute
> = async (c) => {
  return c.json({ result: faker.string.alpha({ length: { min: 5, max: 20 } }) }, 200)
}

const getTrailingSlashPostsIndexRouteHandler: RouteHandler<
  typeof getTrailingSlashPostsIndexRoute
> = async (c) => {
  return c.json(
    {
      items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.string.alpha({ length: { min: 5, max: 20 } }),
      ),
      total: faker.number.int({ min: 1, max: 1000 }),
    },
    200,
  )
}

const postTrailingSlashPostsIndexRouteHandler: RouteHandler<
  typeof postTrailingSlashPostsIndexRoute
> = async (c) => {
  return c.json(
    { id: faker.number.int({ min: 1, max: 99999 }), title: faker.lorem.sentence() },
    201,
  )
}

const getTrailingSlashUsersIdIndexRouteHandler: RouteHandler<
  typeof getTrailingSlashUsersIdIndexRoute
> = async (c) => {
  return c.json(
    { id: faker.string.alpha({ length: { min: 5, max: 20 } }), name: faker.person.fullName() },
    200,
  )
}

const getTrailingSlashItemsIndexRouteHandler: RouteHandler<
  typeof getTrailingSlashItemsIndexRoute
> = async (c) => {
  return c.json(
    {
      items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.string.alpha({ length: { min: 5, max: 20 } }),
      ),
    },
    200,
  )
}

const getReadonlyRefUsersRouteHandler: RouteHandler<typeof getReadonlyRefUsersRoute> = async (
  c,
) => {
  return c.json(
    {
      users: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        mockReadonlyRefUser(),
      ),
      total: faker.number.int({ min: 1, max: 1000 }),
    },
    200,
  )
}

const postReadonlyRefUsersRouteHandler: RouteHandler<typeof postReadonlyRefUsersRoute> = async (
  c,
) => {
  return c.json(mockReadonlyRefUser(), 201)
}

const getReadonlyRefUsersIdRouteHandler: RouteHandler<typeof getReadonlyRefUsersIdRoute> = async (
  c,
) => {
  return c.json(mockReadonlyRefUser(), 200)
}

const putReadonlyRefUsersIdRouteHandler: RouteHandler<typeof putReadonlyRefUsersIdRoute> = async (
  c,
) => {
  return c.json(mockReadonlyRefUser(), 200)
}

const getReadonlyRefItemsRouteHandler: RouteHandler<typeof getReadonlyRefItemsRoute> = async (
  c,
) => {
  return c.json(
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockReadonlyRefItem()),
    200,
  )
}

const getTrailingSlashRealApiReverseGeocodeIndexRouteHandler: RouteHandler<
  typeof getTrailingSlashRealApiReverseGeocodeIndexRoute
> = async (c) => {
  return c.json(
    {
      status: faker.helpers.arrayElement(['success', 'zero results', 'error'] as const),
      results: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
        region: faker.string.alpha({ length: { min: 5, max: 20 } }),
        city: faker.location.city(),
        code: faker.string.alpha({ length: { min: 5, max: 20 } }),
        lat: faker.string.alpha({ length: { min: 5, max: 20 } }),
        lon: faker.string.alpha({ length: { min: 5, max: 20 } }),
      })),
    },
    200,
  )
}

const postTrailingSlashRealApiV2PublicBookingAccountRegisterOauthIndexRouteHandler: RouteHandler<
  typeof postTrailingSlashRealApiV2PublicBookingAccountRegisterOauthIndexRoute
> = async (c) => {
  return c.json(
    {
      message: faker.string.alpha({ length: { min: 5, max: 20 } }),
      provisionalId: faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 5, max: 20 } }),
        undefined,
      ]),
    },
    200,
  )
}

const postTrailingSlashRealApiV2PublicBookingAccountRegisterEmailRouteHandler: RouteHandler<
  typeof postTrailingSlashRealApiV2PublicBookingAccountRegisterEmailRoute
> = async (c) => {
  return c.json({ message: faker.string.alpha({ length: { min: 5, max: 20 } }) }, 200)
}

const postDefaultResponseItemsRouteHandler: RouteHandler<
  typeof postDefaultResponseItemsRoute
> = async (c) => {
  return c.json(mockDefaultResponseItem(), 200)
}

const getDefaultResponsePingRouteHandler: RouteHandler<typeof getDefaultResponsePingRoute> = async (
  c,
) => {
  return c.text(faker.string.alpha({ length: { min: 5, max: 20 } }), 200)
}

const postComplexSchemasExpressionsRouteHandler: RouteHandler<
  typeof postComplexSchemasExpressionsRoute
> = async (c) => {
  return c.json(mockComplexSchemasExpression(), 200)
}

const postComplexSchemasShapesRouteHandler: RouteHandler<
  typeof postComplexSchemasShapesRoute
> = async (c) => {
  return c.json(mockComplexSchemasShape(), 200)
}

const postComplexSchemasDocumentsRouteHandler: RouteHandler<
  typeof postComplexSchemasDocumentsRoute
> = async (c) => {
  return c.json(mockComplexSchemasDocument(), 200)
}

const postComplexSchemasConfigsRouteHandler: RouteHandler<
  typeof postComplexSchemasConfigsRoute
> = async (c) => {
  return c.json(mockComplexSchemasFullConfig(), 200)
}

const getComplexSchemasNullableUnionRouteHandler: RouteHandler<
  typeof getComplexSchemasNullableUnionRoute
> = async (c) => {
  return c.json(mockComplexSchemasNullableResult(), 200)
}

const getComplexSchemasNestedCircularRouteHandler: RouteHandler<
  typeof getComplexSchemasNestedCircularRoute
> = async (c) => {
  return c.json(mockComplexSchemasCategory(), 200)
}

const postVendorExtensionsUsersRouteHandler: RouteHandler<
  typeof postVendorExtensionsUsersRoute
> = async (c) => {
  return c.json(mockVendorExtensionsUser(), 201)
}

const getVendorExtensionsUsersUserIdRouteHandler: RouteHandler<
  typeof getVendorExtensionsUsersUserIdRoute
> = async (c) => {
  return c.json(mockVendorExtensionsUser(), 200)
}

const postVendorExtensionsPostsRouteHandler: RouteHandler<
  typeof postVendorExtensionsPostsRoute
> = async (c) => {
  return c.json(mockVendorExtensionsPost(), 201)
}

const postVendorExtensionsTransformsRouteHandler: RouteHandler<
  typeof postVendorExtensionsTransformsRoute
> = async (c) => {
  return c.body(null, 200)
}

const postVendorExtensionsCoerceRouteHandler: RouteHandler<
  typeof postVendorExtensionsCoerceRoute
> = async (c) => {
  return c.body(null, 200)
}

const postVendorExtensionsReplacementsRouteHandler: RouteHandler<
  typeof postVendorExtensionsReplacementsRoute
> = async (c) => {
  return c.body(null, 200)
}

const postVendorExtensionsFormatsRouteHandler: RouteHandler<
  typeof postVendorExtensionsFormatsRoute
> = async (c) => {
  return c.body(null, 200)
}

const postVendorExtensionsCustomRouteHandler: RouteHandler<
  typeof postVendorExtensionsCustomRoute
> = async (c) => {
  return c.body(null, 200)
}

const postVendorExtensionsMessagesRouteHandler: RouteHandler<
  typeof postVendorExtensionsMessagesRoute
> = async (c) => {
  return c.body(null, 200)
}

const postVendorExtensionsCompositionRouteHandler: RouteHandler<
  typeof postVendorExtensionsCompositionRoute
> = async (c) => {
  return c.body(null, 200)
}

const postVendorExtensionsConditionalRouteHandler: RouteHandler<
  typeof postVendorExtensionsConditionalRoute
> = async (c) => {
  return c.body(null, 200)
}

const postVendorExtensionsApplicatorsRouteHandler: RouteHandler<
  typeof postVendorExtensionsApplicatorsRoute
> = async (c) => {
  return c.body(null, 200)
}

const getPaginationItemsRouteHandler: RouteHandler<typeof getPaginationItemsRoute> = async (c) => {
  return c.json(mockPaginationItemsPage(), 200)
}

const getPaginationFeedsRouteHandler: RouteHandler<typeof getPaginationFeedsRoute> = async (c) => {
  return c.json(mockPaginationItemsPage(), 200)
}

const getPaginationUsersUserIdPostsRouteHandler: RouteHandler<
  typeof getPaginationUsersUserIdPostsRoute
> = async (c) => {
  return c.json(mockPaginationItemsPage(), 200)
}

const app = new OpenAPIHono()

export const api = app
  .openapi(getMinimalHealthRoute, getMinimalHealthRouteHandler)
  .openapi(getAllExportsUsersRoute, getAllExportsUsersRouteHandler)
  .openapi(postAllExportsUsersRoute, postAllExportsUsersRouteHandler)
  .openapi(getAllExportsUsersIdRoute, getAllExportsUsersIdRouteHandler)
  .openapi(getCircularRefsTreeRoute, getCircularRefsTreeRouteHandler)
  .openapi(postCircularRefsTreeRoute, postCircularRefsTreeRouteHandler)
  .openapi(getCircularRefsGraphRoute, getCircularRefsGraphRouteHandler)
  .openapi(getSecuritySchemesPublicRoute, getSecuritySchemesPublicRouteHandler)
  .openapi(getSecuritySchemesBearerProtectedRoute, getSecuritySchemesBearerProtectedRouteHandler)
  .openapi(getSecuritySchemesApiKeyProtectedRoute, getSecuritySchemesApiKeyProtectedRouteHandler)
  .openapi(getSecuritySchemesBasicProtectedRoute, getSecuritySchemesBasicProtectedRouteHandler)
  .openapi(getSecuritySchemesOauthProtectedRoute, getSecuritySchemesOauthProtectedRouteHandler)
  .openapi(getSecuritySchemesMultiAuthRoute, getSecuritySchemesMultiAuthRouteHandler)
  .openapi(postContentTypesJsonRoute, postContentTypesJsonRouteHandler)
  .openapi(postContentTypesFormRoute, postContentTypesFormRouteHandler)
  .openapi(postContentTypesUploadRoute, postContentTypesUploadRouteHandler)
  .openapi(postContentTypesTextRoute, postContentTypesTextRouteHandler)
  .openapi(postContentTypesMultiContentRoute, postContentTypesMultiContentRouteHandler)
  .openapi(getParametersMergeItemsItemIdRoute, getParametersMergeItemsItemIdRouteHandler)
  .openapi(putParametersMergeItemsItemIdRoute, putParametersMergeItemsItemIdRouteHandler)
  .openapi(deleteParametersMergeItemsItemIdRoute, deleteParametersMergeItemsItemIdRouteHandler)
  .openapi(getParametersMergeItemsRoute, getParametersMergeItemsRouteHandler)
  .openapi(postSchemaEdgeCasesNullableRoute, postSchemaEdgeCasesNullableRouteHandler)
  .openapi(postSchemaEdgeCasesDiscriminatedRoute, postSchemaEdgeCasesDiscriminatedRouteHandler)
  .openapi(getSchemaEdgeCasesComposedRoute, getSchemaEdgeCasesComposedRouteHandler)
  .openapi(getSchemaEdgeCasesDeepNestedRoute, getSchemaEdgeCasesDeepNestedRouteHandler)
  .openapi(getSchemaEdgeCasesAdditionalPropsRoute, getSchemaEdgeCasesAdditionalPropsRouteHandler)
  .openapi(postCallbacksLinksSubscriptionsRoute, postCallbacksLinksSubscriptionsRouteHandler)
  .openapi(getCallbacksLinksSubscriptionsIdRoute, getCallbacksLinksSubscriptionsIdRouteHandler)
  .openapi(
    deleteCallbacksLinksSubscriptionsIdRoute,
    deleteCallbacksLinksSubscriptionsIdRouteHandler,
  )
  .openapi(postCallbacksLinksWebhooksTestRoute, postCallbacksLinksWebhooksTestRouteHandler)
  .openapi(getCrudRefsPostsRoute, getCrudRefsPostsRouteHandler)
  .openapi(postCrudRefsPostsRoute, postCrudRefsPostsRouteHandler)
  .openapi(getCrudRefsPostsIdRoute, getCrudRefsPostsIdRouteHandler)
  .openapi(putCrudRefsPostsIdRoute, putCrudRefsPostsIdRouteHandler)
  .openapi(deleteCrudRefsPostsIdRoute, deleteCrudRefsPostsIdRouteHandler)
  .openapi(getCrudRefsPostsIdCommentsRoute, getCrudRefsPostsIdCommentsRouteHandler)
  .openapi(postCrudRefsPostsIdCommentsRoute, postCrudRefsPostsIdCommentsRouteHandler)
  .openapi(getCrudRefsTagsRoute, getCrudRefsTagsRouteHandler)
  .openapi(getComprehensiveUsersRoute, getComprehensiveUsersRouteHandler)
  .openapi(postComprehensiveUsersRoute, postComprehensiveUsersRouteHandler)
  .openapi(getComprehensiveUsersUserIdRoute, getComprehensiveUsersUserIdRouteHandler)
  .openapi(putComprehensiveUsersUserIdRoute, putComprehensiveUsersUserIdRouteHandler)
  .openapi(deleteComprehensiveUsersUserIdRoute, deleteComprehensiveUsersUserIdRouteHandler)
  .openapi(getComprehensiveProductsRoute, getComprehensiveProductsRouteHandler)
  .openapi(postComprehensiveProductsRoute, postComprehensiveProductsRouteHandler)
  .openapi(getComprehensiveProductsProductIdRoute, getComprehensiveProductsProductIdRouteHandler)
  .openapi(putComprehensiveProductsProductIdRoute, putComprehensiveProductsProductIdRouteHandler)
  .openapi(
    getComprehensiveProductsProductIdReviewsRoute,
    getComprehensiveProductsProductIdReviewsRouteHandler,
  )
  .openapi(
    postComprehensiveProductsProductIdReviewsRoute,
    postComprehensiveProductsProductIdReviewsRouteHandler,
  )
  .openapi(getComprehensiveOrdersRoute, getComprehensiveOrdersRouteHandler)
  .openapi(postComprehensiveOrdersRoute, postComprehensiveOrdersRouteHandler)
  .openapi(getComprehensiveOrdersOrderIdRoute, getComprehensiveOrdersOrderIdRouteHandler)
  .openapi(getComprehensiveCategoriesRoute, getComprehensiveCategoriesRouteHandler)
  .openapi(postComprehensiveUploadImageRoute, postComprehensiveUploadImageRouteHandler)
  .openapi(postCompositionKeywordsOneOfRoute, postCompositionKeywordsOneOfRouteHandler)
  .openapi(postCompositionKeywordsAnyOfRoute, postCompositionKeywordsAnyOfRouteHandler)
  .openapi(postCompositionKeywordsAllOfRoute, postCompositionKeywordsAllOfRouteHandler)
  .openapi(postCompositionKeywordsNotRoute, postCompositionKeywordsNotRouteHandler)
  .openapi(getCompositionKeywordsNotRefRoute, getCompositionKeywordsNotRefRouteHandler)
  .openapi(getCompositionKeywordsNotEnumRoute, getCompositionKeywordsNotEnumRouteHandler)
  .openapi(getCompositionKeywordsNotConstRoute, getCompositionKeywordsNotConstRouteHandler)
  .openapi(
    getCompositionKeywordsNotCompositionRoute,
    getCompositionKeywordsNotCompositionRouteHandler,
  )
  .openapi(getCompositionKeywordsAllOfSiblingRoute, getCompositionKeywordsAllOfSiblingRouteHandler)
  .openapi(
    getCompositionKeywordsNullableOneOfRoute,
    getCompositionKeywordsNullableOneOfRouteHandler,
  )
  .openapi(getCompositionKeywordsAnyOfThreeRoute, getCompositionKeywordsAnyOfThreeRouteHandler)
  .openapi(getCompositionKeywordsAnyOfRefRoute, getCompositionKeywordsAnyOfRefRouteHandler)
  .openapi(postCallbacksFieldOrdersRoute, postCallbacksFieldOrdersRouteHandler)
  .openapi(postCallbacksFieldPaymentsRoute, postCallbacksFieldPaymentsRouteHandler)
  .openapi(getCallbacksFieldItemsRoute, getCallbacksFieldItemsRouteHandler)
  .openapi(getArrayObjectConstraintsTagsRoute, getArrayObjectConstraintsTagsRouteHandler)
  .openapi(postArrayObjectConstraintsTagsRoute, postArrayObjectConstraintsTagsRouteHandler)
  .openapi(getArrayObjectConstraintsSettingsRoute, getArrayObjectConstraintsSettingsRouteHandler)
  .openapi(putArrayObjectConstraintsSettingsRoute, putArrayObjectConstraintsSettingsRouteHandler)
  .openapi(postArrayObjectConstraintsConfigRoute, postArrayObjectConstraintsConfigRouteHandler)
  .openapi(postArrayObjectConstraintsPaymentRoute, postArrayObjectConstraintsPaymentRouteHandler)
  .openapi(
    getTrailingSlashApiReverseChibanIndexRoute,
    getTrailingSlashApiReverseChibanIndexRouteHandler,
  )
  .openapi(getTrailingSlashApiReverseChibanRoute, getTrailingSlashApiReverseChibanRouteHandler)
  .openapi(getTrailingSlashPostsIndexRoute, getTrailingSlashPostsIndexRouteHandler)
  .openapi(postTrailingSlashPostsIndexRoute, postTrailingSlashPostsIndexRouteHandler)
  .openapi(getTrailingSlashUsersIdIndexRoute, getTrailingSlashUsersIdIndexRouteHandler)
  .openapi(getTrailingSlashItemsIndexRoute, getTrailingSlashItemsIndexRouteHandler)
  .openapi(getReadonlyRefUsersRoute, getReadonlyRefUsersRouteHandler)
  .openapi(postReadonlyRefUsersRoute, postReadonlyRefUsersRouteHandler)
  .openapi(getReadonlyRefUsersIdRoute, getReadonlyRefUsersIdRouteHandler)
  .openapi(putReadonlyRefUsersIdRoute, putReadonlyRefUsersIdRouteHandler)
  .openapi(getReadonlyRefItemsRoute, getReadonlyRefItemsRouteHandler)
  .openapi(
    getTrailingSlashRealApiReverseGeocodeIndexRoute,
    getTrailingSlashRealApiReverseGeocodeIndexRouteHandler,
  )
  .openapi(
    postTrailingSlashRealApiV2PublicBookingAccountRegisterOauthIndexRoute,
    postTrailingSlashRealApiV2PublicBookingAccountRegisterOauthIndexRouteHandler,
  )
  .openapi(
    postTrailingSlashRealApiV2PublicBookingAccountRegisterEmailRoute,
    postTrailingSlashRealApiV2PublicBookingAccountRegisterEmailRouteHandler,
  )
  .openapi(postDefaultResponseItemsRoute, postDefaultResponseItemsRouteHandler)
  .openapi(getDefaultResponsePingRoute, getDefaultResponsePingRouteHandler)
  .openapi(postComplexSchemasExpressionsRoute, postComplexSchemasExpressionsRouteHandler)
  .openapi(postComplexSchemasShapesRoute, postComplexSchemasShapesRouteHandler)
  .openapi(postComplexSchemasDocumentsRoute, postComplexSchemasDocumentsRouteHandler)
  .openapi(postComplexSchemasConfigsRoute, postComplexSchemasConfigsRouteHandler)
  .openapi(getComplexSchemasNullableUnionRoute, getComplexSchemasNullableUnionRouteHandler)
  .openapi(getComplexSchemasNestedCircularRoute, getComplexSchemasNestedCircularRouteHandler)
  .openapi(postVendorExtensionsUsersRoute, postVendorExtensionsUsersRouteHandler)
  .openapi(getVendorExtensionsUsersUserIdRoute, getVendorExtensionsUsersUserIdRouteHandler)
  .openapi(postVendorExtensionsPostsRoute, postVendorExtensionsPostsRouteHandler)
  .openapi(postVendorExtensionsTransformsRoute, postVendorExtensionsTransformsRouteHandler)
  .openapi(postVendorExtensionsCoerceRoute, postVendorExtensionsCoerceRouteHandler)
  .openapi(postVendorExtensionsReplacementsRoute, postVendorExtensionsReplacementsRouteHandler)
  .openapi(postVendorExtensionsFormatsRoute, postVendorExtensionsFormatsRouteHandler)
  .openapi(postVendorExtensionsCustomRoute, postVendorExtensionsCustomRouteHandler)
  .openapi(postVendorExtensionsMessagesRoute, postVendorExtensionsMessagesRouteHandler)
  .openapi(postVendorExtensionsCompositionRoute, postVendorExtensionsCompositionRouteHandler)
  .openapi(postVendorExtensionsConditionalRoute, postVendorExtensionsConditionalRouteHandler)
  .openapi(postVendorExtensionsApplicatorsRoute, postVendorExtensionsApplicatorsRouteHandler)
  .openapi(getPaginationItemsRoute, getPaginationItemsRouteHandler)
  .openapi(getPaginationFeedsRoute, getPaginationFeedsRouteHandler)
  .openapi(getPaginationUsersUserIdPostsRoute, getPaginationUsersUserIdPostsRouteHandler)

export default app
