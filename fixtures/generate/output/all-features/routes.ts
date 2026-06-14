import { createRoute, z } from '@hono/zod-openapi'

type CircularRefsTreeNodeType = { id: number; value: string; children?: CircularRefsTreeNodeType[] }

export const CircularRefsNodeBSchema: z.ZodType<CircularRefsNodeBType> = z
  .lazy(() =>
    z
      .object({ id: z.int(), ref: CircularRefsNodeCSchema.exactOptional() })
      .openapi({ required: ['id'] }),
  )
  .openapi('CircularRefsNodeB')

type CircularRefsNodeAType = { id: number; ref?: z.infer<typeof CircularRefsNodeBSchema> }

export const CircularRefsNodeCSchema: z.ZodType<CircularRefsNodeCType> = z
  .lazy(() =>
    z
      .object({ id: z.int(), ref: CircularRefsNodeASchema.exactOptional() })
      .openapi({ required: ['id'] }),
  )
  .openapi('CircularRefsNodeC')

type CircularRefsNodeBType = { id: number; ref?: z.infer<typeof CircularRefsNodeCSchema> }

export const CircularRefsNodeASchema: z.ZodType<CircularRefsNodeAType> = z
  .lazy(() =>
    z
      .object({ id: z.int(), ref: CircularRefsNodeBSchema.exactOptional() })
      .openapi({ required: ['id'] }),
  )
  .openapi('CircularRefsNodeA')

type CircularRefsNodeCType = { id: number; ref?: z.infer<typeof CircularRefsNodeASchema> }

type ComplexSchemasLiteralExprType = { type: 'literal'; value: string | number | boolean }

export const ComplexSchemasExpressionSchema: z.ZodType<ComplexSchemasExpressionType> = z
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

export const ComplexSchemasLiteralExprSchema: z.ZodType<ComplexSchemasLiteralExprType> = z
  .object({ type: z.literal('literal'), value: z.union([z.string(), z.number(), z.boolean()]) })
  .openapi({ required: ['type', 'value'] })
  .openapi('ComplexSchemasLiteralExpr')

export const ComplexSchemasUnaryExprSchema: z.ZodType<ComplexSchemasUnaryExprType> = z
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

export const ComplexSchemasBinaryExprSchema: z.ZodType<ComplexSchemasBinaryExprType> = z
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

export const AllExportsUserSchema = z
  .object({ id: z.int(), name: z.string(), email: z.email() })
  .openapi({ required: ['id', 'name', 'email'] })
  .openapi('AllExportsUser')

export type AllExportsUser = z.infer<typeof AllExportsUserSchema>

export const AllExportsUserListSchema = z.array(AllExportsUserSchema).openapi('AllExportsUserList')

export type AllExportsUserList = z.infer<typeof AllExportsUserListSchema>

export const CircularRefsTreeNodeSchema: z.ZodType<CircularRefsTreeNodeType> = z
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

export type CircularRefsTreeNode = z.infer<typeof CircularRefsTreeNodeSchema>

export type CircularRefsNodeA = z.infer<typeof CircularRefsNodeASchema>

export type CircularRefsNodeB = z.infer<typeof CircularRefsNodeBSchema>

export type CircularRefsNodeC = z.infer<typeof CircularRefsNodeCSchema>

export const ParametersMergeItemSchema = z
  .object({ id: z.int(), name: z.string(), createdAt: z.iso.datetime() })
  .openapi({ required: ['id', 'name', 'createdAt'] })
  .openapi('ParametersMergeItem')

export type ParametersMergeItem = z.infer<typeof ParametersMergeItemSchema>

export const ParametersMergeItemUpdateSchema = z
  .object({ name: z.string().exactOptional() })
  .openapi('ParametersMergeItemUpdate')

export type ParametersMergeItemUpdate = z.infer<typeof ParametersMergeItemUpdateSchema>

export const SchemaEdgeCasesNullableFieldsSchema = z
  .object({
    name: z.string(),
    nickname: z.string().nullable().exactOptional(),
    age: z.int().nullable().exactOptional(),
    tags: z.array(z.string()).nullable().exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('SchemaEdgeCasesNullableFields')

export type SchemaEdgeCasesNullableFields = z.infer<typeof SchemaEdgeCasesNullableFieldsSchema>

export const SchemaEdgeCasesCircleSchema = z
  .object({ kind: z.literal('circle'), radius: z.number() })
  .openapi({ required: ['kind', 'radius'] })
  .openapi('SchemaEdgeCasesCircle')

export type SchemaEdgeCasesCircle = z.infer<typeof SchemaEdgeCasesCircleSchema>

export const SchemaEdgeCasesRectangleSchema = z
  .object({ kind: z.literal('rectangle'), width: z.number(), height: z.number() })
  .openapi({ required: ['kind', 'width', 'height'] })
  .openapi('SchemaEdgeCasesRectangle')

export type SchemaEdgeCasesRectangle = z.infer<typeof SchemaEdgeCasesRectangleSchema>

export const SchemaEdgeCasesShapeSchema = z
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

export type SchemaEdgeCasesShape = z.infer<typeof SchemaEdgeCasesShapeSchema>

export const SchemaEdgeCasesBaseSchema = z
  .object({ id: z.int(), createdAt: z.iso.datetime() })
  .openapi({ required: ['id', 'createdAt'] })
  .openapi('SchemaEdgeCasesBase')

export type SchemaEdgeCasesBase = z.infer<typeof SchemaEdgeCasesBaseSchema>

export const SchemaEdgeCasesExtendedSchema = z
  .object({ name: z.string(), description: z.string().exactOptional() })
  .openapi({ required: ['name'] })
  .openapi('SchemaEdgeCasesExtended')

export type SchemaEdgeCasesExtended = z.infer<typeof SchemaEdgeCasesExtendedSchema>

export const SchemaEdgeCasesComposedObjectSchema = SchemaEdgeCasesBaseSchema.and(
  SchemaEdgeCasesExtendedSchema,
)
  .and(z.object({ extra: z.boolean().exactOptional() }))
  .openapi('SchemaEdgeCasesComposedObject')

export type SchemaEdgeCasesComposedObject = z.infer<typeof SchemaEdgeCasesComposedObjectSchema>

export const SchemaEdgeCasesLevel1Schema = z
  .object({
    level2: z
      .object({ level3: z.object({ value: z.string() }).openapi({ required: ['value'] }) })
      .openapi({ required: ['level3'] }),
  })
  .openapi({ required: ['level2'] })
  .openapi('SchemaEdgeCasesLevel1')

export type SchemaEdgeCasesLevel1 = z.infer<typeof SchemaEdgeCasesLevel1Schema>

export const SchemaEdgeCasesDynamicMapSchema = z
  .record(z.string(), z.string())
  .openapi('SchemaEdgeCasesDynamicMap')

export type SchemaEdgeCasesDynamicMap = z.infer<typeof SchemaEdgeCasesDynamicMapSchema>

export const SchemaEdgeCasesAnyOfExampleSchema = z
  .union([z.string(), z.int(), z.boolean()])
  .openapi('SchemaEdgeCasesAnyOfExample')

export type SchemaEdgeCasesAnyOfExample = z.infer<typeof SchemaEdgeCasesAnyOfExampleSchema>

export const CallbacksLinksSubscriptionRequestSchema = z
  .object({ callbackUrl: z.url(), events: z.array(z.enum(['created', 'updated', 'deleted'])) })
  .openapi({ required: ['callbackUrl', 'events'] })
  .openapi('CallbacksLinksSubscriptionRequest')

export type CallbacksLinksSubscriptionRequest = z.infer<
  typeof CallbacksLinksSubscriptionRequestSchema
>

export const CallbacksLinksSubscriptionSchema = z
  .object({
    id: z.string(),
    callbackUrl: z.url(),
    events: z.array(z.string()),
    status: z.enum(['active', 'paused', 'cancelled']),
  })
  .openapi({ required: ['id', 'callbackUrl', 'events', 'status'] })
  .openapi('CallbacksLinksSubscription')

export type CallbacksLinksSubscription = z.infer<typeof CallbacksLinksSubscriptionSchema>

export const CallbacksLinksEventPayloadSchema = z
  .object({
    event: z.string(),
    timestamp: z.iso.datetime(),
    data: z.looseObject({}).exactOptional(),
  })
  .openapi({ required: ['event', 'timestamp'] })
  .openapi('CallbacksLinksEventPayload')

export type CallbacksLinksEventPayload = z.infer<typeof CallbacksLinksEventPayloadSchema>

export const CrudRefsAuthorSchema = z
  .object({ id: z.int(), name: z.string(), avatarUrl: z.url().exactOptional() })
  .openapi({ required: ['id', 'name'] })
  .openapi('CrudRefsAuthor')

export const CrudRefsTagSchema = z
  .object({ id: z.int(), name: z.string(), slug: z.string() })
  .openapi({ required: ['id', 'name', 'slug'] })
  .openapi('CrudRefsTag')

export const CrudRefsPostSchema = z
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

export type CrudRefsPost = z.infer<typeof CrudRefsPostSchema>

export const CrudRefsCreatePostSchema = z
  .object({ title: z.string(), body: z.string(), tagIds: z.array(z.int()).exactOptional() })
  .openapi({ required: ['title', 'body'] })
  .openapi('CrudRefsCreatePost')

export type CrudRefsCreatePost = z.infer<typeof CrudRefsCreatePostSchema>

export const CrudRefsUpdatePostSchema = z
  .object({
    title: z.string().exactOptional(),
    body: z.string().exactOptional(),
    tagIds: z.array(z.int()).exactOptional(),
  })
  .openapi('CrudRefsUpdatePost')

export type CrudRefsUpdatePost = z.infer<typeof CrudRefsUpdatePostSchema>

export const CrudRefsCommentSchema = z
  .object({
    id: z.int(),
    body: z.string(),
    author: CrudRefsAuthorSchema,
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'body', 'author', 'createdAt'] })
  .openapi('CrudRefsComment')

export type CrudRefsComment = z.infer<typeof CrudRefsCommentSchema>

export const CrudRefsCreateCommentSchema = z
  .object({ body: z.string() })
  .openapi({ required: ['body'] })
  .openapi('CrudRefsCreateComment')

export type CrudRefsCreateComment = z.infer<typeof CrudRefsCreateCommentSchema>

export type CrudRefsAuthor = z.infer<typeof CrudRefsAuthorSchema>

export type CrudRefsTag = z.infer<typeof CrudRefsTagSchema>

export const CrudRefsPaginationSchema = z
  .object({ page: z.int(), limit: z.int(), total: z.int() })
  .openapi({ required: ['page', 'limit', 'total'] })
  .openapi('CrudRefsPagination')

export type CrudRefsPagination = z.infer<typeof CrudRefsPaginationSchema>

export const CrudRefsErrorSchema = z
  .object({ code: z.int(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .openapi('CrudRefsError')

export type CrudRefsError = z.infer<typeof CrudRefsErrorSchema>

export const ComprehensiveAddressSchema = z
  .object({
    street: z.string(),
    city: z.string(),
    state: z.string().exactOptional(),
    zip: z.string().exactOptional(),
    country: z.string(),
  })
  .openapi({ required: ['street', 'city', 'country'] })
  .openapi('ComprehensiveAddress')

export const ComprehensiveUserSchema = z
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

export type ComprehensiveUser = z.infer<typeof ComprehensiveUserSchema>

export const ComprehensiveCreateUserSchema = z
  .object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(8),
    role: z.enum(['admin', 'customer']).exactOptional(),
    address: ComprehensiveAddressSchema.exactOptional(),
  })
  .openapi({ required: ['name', 'email', 'password'] })
  .openapi('ComprehensiveCreateUser')

export type ComprehensiveCreateUser = z.infer<typeof ComprehensiveCreateUserSchema>

export const ComprehensiveUpdateUserSchema = z
  .object({
    name: z.string().exactOptional(),
    email: z.email().exactOptional(),
    address: ComprehensiveAddressSchema.exactOptional(),
  })
  .openapi('ComprehensiveUpdateUser')

export type ComprehensiveUpdateUser = z.infer<typeof ComprehensiveUpdateUserSchema>

export type ComprehensiveAddress = z.infer<typeof ComprehensiveAddressSchema>

export const ComprehensiveCategorySchema = z
  .object({ id: z.int(), name: z.string(), parentId: z.int().nullable().exactOptional() })
  .openapi({ required: ['id', 'name'] })
  .openapi('ComprehensiveCategory')

export const ComprehensiveProductSchema = z
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

export type ComprehensiveProduct = z.infer<typeof ComprehensiveProductSchema>

export const ComprehensiveCreateProductSchema = z
  .object({
    name: z.string(),
    description: z.string().exactOptional(),
    price: z.number().min(0),
    categoryId: z.int(),
    tags: z.array(z.string()).exactOptional(),
  })
  .openapi({ required: ['name', 'price', 'categoryId'] })
  .openapi('ComprehensiveCreateProduct')

export type ComprehensiveCreateProduct = z.infer<typeof ComprehensiveCreateProductSchema>

export const ComprehensiveUpdateProductSchema = z
  .object({
    name: z.string().exactOptional(),
    description: z.string().exactOptional(),
    price: z.number().min(0).exactOptional(),
    categoryId: z.int().exactOptional(),
    tags: z.array(z.string()).exactOptional(),
  })
  .openapi('ComprehensiveUpdateProduct')

export type ComprehensiveUpdateProduct = z.infer<typeof ComprehensiveUpdateProductSchema>

export type ComprehensiveCategory = z.infer<typeof ComprehensiveCategorySchema>

export const ComprehensiveReviewSchema = z
  .object({
    id: z.int(),
    rating: z.int().min(1).max(5),
    comment: z.string().exactOptional(),
    author: ComprehensiveUserSchema,
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'rating', 'author', 'createdAt'] })
  .openapi('ComprehensiveReview')

export type ComprehensiveReview = z.infer<typeof ComprehensiveReviewSchema>

export const ComprehensiveCreateReviewSchema = z
  .object({ rating: z.int().min(1).max(5), comment: z.string().exactOptional() })
  .openapi({ required: ['rating'] })
  .openapi('ComprehensiveCreateReview')

export type ComprehensiveCreateReview = z.infer<typeof ComprehensiveCreateReviewSchema>

export const ComprehensiveOrderItemSchema = z
  .object({ product: ComprehensiveProductSchema, quantity: z.int().min(1), price: z.number() })
  .openapi({ required: ['product', 'quantity', 'price'] })
  .openapi('ComprehensiveOrderItem')

export const ComprehensiveOrderSchema = z
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

export type ComprehensiveOrder = z.infer<typeof ComprehensiveOrderSchema>

export type ComprehensiveOrderItem = z.infer<typeof ComprehensiveOrderItemSchema>

export const ComprehensiveCreateOrderSchema = z
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

export type ComprehensiveCreateOrder = z.infer<typeof ComprehensiveCreateOrderSchema>

export const ComprehensiveErrorSchema = z
  .object({ code: z.int(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .openapi('ComprehensiveError')

export type ComprehensiveError = z.infer<typeof ComprehensiveErrorSchema>

export const CompositionKeywordsCreditCardSchema = z
  .object({ type: z.literal('credit_card'), cardNumber: z.string(), expiry: z.string() })
  .openapi({ required: ['type', 'cardNumber', 'expiry'] })
  .openapi('CompositionKeywordsCreditCard')

export type CompositionKeywordsCreditCard = z.infer<typeof CompositionKeywordsCreditCardSchema>

export const CompositionKeywordsBankTransferSchema = z
  .object({ type: z.literal('bank_transfer'), bankCode: z.string(), accountNumber: z.string() })
  .openapi({ required: ['type', 'bankCode', 'accountNumber'] })
  .openapi('CompositionKeywordsBankTransfer')

export type CompositionKeywordsBankTransfer = z.infer<typeof CompositionKeywordsBankTransferSchema>

export const CompositionKeywordsPaymentMethodSchema = z
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

export type CompositionKeywordsPaymentMethod = z.infer<
  typeof CompositionKeywordsPaymentMethodSchema
>

export const CompositionKeywordsNullablePaymentSchema = z
  .xor([CompositionKeywordsCreditCardSchema, CompositionKeywordsBankTransferSchema])
  .nullable()
  .openapi('CompositionKeywordsNullablePayment')

export type CompositionKeywordsNullablePayment = z.infer<
  typeof CompositionKeywordsNullablePaymentSchema
>

export const CompositionKeywordsSearchFilterSchema = z
  .union([
    z.object({ keyword: z.string() }).openapi({ required: ['keyword'] }),
    z.object({ category: z.int() }).openapi({ required: ['category'] }),
  ])
  .openapi('CompositionKeywordsSearchFilter')

export type CompositionKeywordsSearchFilter = z.infer<typeof CompositionKeywordsSearchFilterSchema>

export const CompositionKeywordsFlexibleIdSchema = z
  .union([z.string(), z.int(), z.uuid()])
  .openapi({ description: 'Accepts string, integer, or UUID' })
  .openapi('CompositionKeywordsFlexibleId')

export type CompositionKeywordsFlexibleId = z.infer<typeof CompositionKeywordsFlexibleIdSchema>

export const CompositionKeywordsCatSchema = z
  .object({ name: z.string(), purring: z.boolean().exactOptional() })
  .openapi({ required: ['name'] })
  .openapi('CompositionKeywordsCat')

export type CompositionKeywordsCat = z.infer<typeof CompositionKeywordsCatSchema>

export const CompositionKeywordsDogSchema = z
  .object({ name: z.string(), barkVolume: z.number().exactOptional() })
  .openapi({ required: ['name'] })
  .openapi('CompositionKeywordsDog')

export type CompositionKeywordsDog = z.infer<typeof CompositionKeywordsDogSchema>

export const CompositionKeywordsPetChoiceSchema = z
  .union([CompositionKeywordsCatSchema, CompositionKeywordsDogSchema])
  .openapi('CompositionKeywordsPetChoice')

export type CompositionKeywordsPetChoice = z.infer<typeof CompositionKeywordsPetChoiceSchema>

export const CompositionKeywordsPersonSchema = z
  .object({ name: z.string(), email: z.email() })
  .openapi({ required: ['name', 'email'] })
  .openapi('CompositionKeywordsPerson')

export type CompositionKeywordsPerson = z.infer<typeof CompositionKeywordsPersonSchema>

export const CompositionKeywordsEmployeeInfoSchema = z
  .object({ employeeId: z.int(), department: z.string().exactOptional() })
  .openapi({ required: ['employeeId'] })
  .openapi('CompositionKeywordsEmployeeInfo')

export type CompositionKeywordsEmployeeInfo = z.infer<typeof CompositionKeywordsEmployeeInfoSchema>

export const CompositionKeywordsEmployeeSchema = CompositionKeywordsPersonSchema.and(
  CompositionKeywordsEmployeeInfoSchema,
)
  .and(z.object({ startDate: z.iso.date().exactOptional() }))
  .openapi({ description: 'An employee with personal and work info' })
  .openapi('CompositionKeywordsEmployee')

export type CompositionKeywordsEmployee = z.infer<typeof CompositionKeywordsEmployeeSchema>

export const CompositionKeywordsBaseEntitySchema = z
  .object({ id: z.int(), createdAt: z.iso.datetime() })
  .openapi({ required: ['id', 'createdAt'] })
  .openapi('CompositionKeywordsBaseEntity')

export type CompositionKeywordsBaseEntity = z.infer<typeof CompositionKeywordsBaseEntitySchema>

export const CompositionKeywordsExtendedWithSiblingSchema = CompositionKeywordsBaseEntitySchema.and(
  z
    .object({ label: z.string(), active: z.boolean().exactOptional() })
    .openapi({ required: ['label'] }),
)
  .openapi({ description: 'allOf with sibling properties merged', required: ['label'] })
  .openapi('CompositionKeywordsExtendedWithSibling')

export type CompositionKeywordsExtendedWithSibling = z.infer<
  typeof CompositionKeywordsExtendedWithSiblingSchema
>

export const CompositionKeywordsNotStringValueSchema = z
  .any()
  .refine((val) => typeof val !== 'string')
  .openapi('CompositionKeywordsNotStringValue')

export type CompositionKeywordsNotStringValue = z.infer<
  typeof CompositionKeywordsNotStringValueSchema
>

export const CompositionKeywordsAdminRoleSchema = z
  .object({ role: z.literal('admin') })
  .openapi({ required: ['role'] })
  .openapi('CompositionKeywordsAdminRole')

export const CompositionKeywordsNotAdminSchema = z
  .any()
  .refine((val) => !CompositionKeywordsAdminRoleSchema.safeParse(val).success)
  .openapi('CompositionKeywordsNotAdmin')

export type CompositionKeywordsNotAdmin = z.infer<typeof CompositionKeywordsNotAdminSchema>

export type CompositionKeywordsAdminRole = z.infer<typeof CompositionKeywordsAdminRoleSchema>

export const CompositionKeywordsNotDraftOrArchivedSchema = z
  .any()
  .refine((val) => !['draft', 'archived'].includes(val))
  .openapi('CompositionKeywordsNotDraftOrArchived')

export type CompositionKeywordsNotDraftOrArchived = z.infer<
  typeof CompositionKeywordsNotDraftOrArchivedSchema
>

export const CompositionKeywordsNotSpecificValueSchema = z
  .any()
  .refine((val) => val !== 'forbidden')
  .openapi('CompositionKeywordsNotSpecificValue')

export type CompositionKeywordsNotSpecificValue = z.infer<
  typeof CompositionKeywordsNotSpecificValueSchema
>

export const CompositionKeywordsNotStringOrNumberSchema = z
  .any()
  .refine((val) => !z.union([z.string(), z.number()]).safeParse(val).success)
  .openapi({ description: 'Rejects if value matches string or number union' })
  .openapi('CompositionKeywordsNotStringOrNumber')

export type CompositionKeywordsNotStringOrNumber = z.infer<
  typeof CompositionKeywordsNotStringOrNumberSchema
>

export const CallbacksFieldOrderRequestSchema = z
  .object({ item: z.string(), quantity: z.int(), callbackUrl: z.url() })
  .openapi({ required: ['item', 'quantity', 'callbackUrl'] })
  .openapi('CallbacksFieldOrderRequest')

export type CallbacksFieldOrderRequest = z.infer<typeof CallbacksFieldOrderRequestSchema>

export const CallbacksFieldOrderSchema = z
  .object({ id: z.string(), item: z.string(), quantity: z.int(), status: z.string() })
  .openapi({ required: ['id', 'item', 'quantity', 'status'] })
  .openapi('CallbacksFieldOrder')

export type CallbacksFieldOrder = z.infer<typeof CallbacksFieldOrderSchema>

export const CallbacksFieldOrderEventSchema = z
  .object({
    orderId: z.string(),
    event: z.enum(['created', 'confirmed', 'shipped']),
    timestamp: z.iso.datetime(),
  })
  .openapi({ required: ['orderId', 'event', 'timestamp'] })
  .openapi('CallbacksFieldOrderEvent')

export type CallbacksFieldOrderEvent = z.infer<typeof CallbacksFieldOrderEventSchema>

export const CallbacksFieldPaymentRequestSchema = z
  .object({ amount: z.number(), currency: z.string(), successUrl: z.url(), failureUrl: z.url() })
  .openapi({ required: ['amount', 'currency', 'successUrl', 'failureUrl'] })
  .openapi('CallbacksFieldPaymentRequest')

export type CallbacksFieldPaymentRequest = z.infer<typeof CallbacksFieldPaymentRequestSchema>

export const CallbacksFieldPaymentSchema = z
  .object({ id: z.string(), amount: z.number(), currency: z.string(), status: z.string() })
  .openapi({ required: ['id', 'amount', 'currency', 'status'] })
  .openapi('CallbacksFieldPayment')

export type CallbacksFieldPayment = z.infer<typeof CallbacksFieldPaymentSchema>

export const CallbacksFieldPaymentEventSchema = z
  .object({
    paymentId: z.string(),
    status: z.enum(['success', 'failure']),
    timestamp: z.iso.datetime(),
  })
  .openapi({ required: ['paymentId', 'status', 'timestamp'] })
  .openapi('CallbacksFieldPaymentEvent')

export type CallbacksFieldPaymentEvent = z.infer<typeof CallbacksFieldPaymentEventSchema>

export const ReadonlyRefUserSchema = z
  .object({ id: z.string(), name: z.string(), email: z.email() })
  .openapi({ required: ['id', 'name', 'email'] })
  .openapi('ReadonlyRefUser')

export type ReadonlyRefUser = z.infer<typeof ReadonlyRefUserSchema>

export const ReadonlyRefItemSchema = z
  .object({ id: z.int(), title: z.string() })
  .openapi({ required: ['id', 'title'] })
  .openapi('ReadonlyRefItem')

export type ReadonlyRefItem = z.infer<typeof ReadonlyRefItemSchema>

export const ReadonlyRefErrorBodySchema = z
  .object({ code: z.int(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .openapi('ReadonlyRefErrorBody')

export type ReadonlyRefErrorBody = z.infer<typeof ReadonlyRefErrorBodySchema>

export const DefaultResponseItemSchema = z
  .object({ id: z.string(), name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('DefaultResponseItem')

export type DefaultResponseItem = z.infer<typeof DefaultResponseItemSchema>

export type ComplexSchemasLiteralExpr = z.infer<typeof ComplexSchemasLiteralExprSchema>

export type ComplexSchemasUnaryExpr = z.infer<typeof ComplexSchemasUnaryExprSchema>

export type ComplexSchemasBinaryExpr = z.infer<typeof ComplexSchemasBinaryExprSchema>

export type ComplexSchemasExpression = z.infer<typeof ComplexSchemasExpressionSchema>

export const ComplexSchemasCircleSchema = z
  .object({ kind: z.literal('circle'), radius: z.number() })
  .openapi({ required: ['kind', 'radius'] })
  .openapi('ComplexSchemasCircle')

export type ComplexSchemasCircle = z.infer<typeof ComplexSchemasCircleSchema>

export const ComplexSchemasRectangleSchema = z
  .object({ kind: z.literal('rectangle'), width: z.number(), height: z.number() })
  .openapi({ required: ['kind', 'width', 'height'] })
  .openapi('ComplexSchemasRectangle')

export type ComplexSchemasRectangle = z.infer<typeof ComplexSchemasRectangleSchema>

export const ComplexSchemasTriangleSchema = z
  .object({ kind: z.literal('triangle'), base: z.number(), height: z.number() })
  .openapi({ required: ['kind', 'base', 'height'] })
  .openapi('ComplexSchemasTriangle')

export type ComplexSchemasTriangle = z.infer<typeof ComplexSchemasTriangleSchema>

export const ComplexSchemasPolygonSchema = z
  .object({ kind: z.literal('polygon'), sides: z.int().min(3), sideLength: z.number() })
  .openapi({ required: ['kind', 'sides', 'sideLength'] })
  .openapi('ComplexSchemasPolygon')

export type ComplexSchemasPolygon = z.infer<typeof ComplexSchemasPolygonSchema>

export const ComplexSchemasEllipseSchema = z
  .object({ kind: z.literal('ellipse'), semiMajor: z.number(), semiMinor: z.number() })
  .openapi({ required: ['kind', 'semiMajor', 'semiMinor'] })
  .openapi('ComplexSchemasEllipse')

export type ComplexSchemasEllipse = z.infer<typeof ComplexSchemasEllipseSchema>

export const ComplexSchemasShapeSchema = z
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

export type ComplexSchemasShape = z.infer<typeof ComplexSchemasShapeSchema>

export const ComplexSchemasDocumentBaseSchema = z
  .object({ id: z.uuid(), title: z.string(), createdAt: z.iso.datetime() })
  .openapi({ required: ['id', 'title', 'createdAt'] })
  .openapi('ComplexSchemasDocumentBase')

export type ComplexSchemasDocumentBase = z.infer<typeof ComplexSchemasDocumentBaseSchema>

export const ComplexSchemasArticleContentSchema = z
  .object({ docType: z.literal('article'), body: z.string(), wordCount: z.int().exactOptional() })
  .openapi({ required: ['docType', 'body'] })
  .openapi('ComplexSchemasArticleContent')

export type ComplexSchemasArticleContent = z.infer<typeof ComplexSchemasArticleContentSchema>

export const ComplexSchemasSpreadsheetContentSchema = z
  .object({ docType: z.literal('spreadsheet'), rows: z.int(), columns: z.int() })
  .openapi({ required: ['docType', 'rows', 'columns'] })
  .openapi('ComplexSchemasSpreadsheetContent')

export type ComplexSchemasSpreadsheetContent = z.infer<
  typeof ComplexSchemasSpreadsheetContentSchema
>

export const ComplexSchemasArticleSchema = ComplexSchemasDocumentBaseSchema.and(
  ComplexSchemasArticleContentSchema,
).openapi('ComplexSchemasArticle')

export type ComplexSchemasArticle = z.infer<typeof ComplexSchemasArticleSchema>

export const ComplexSchemasSpreadsheetSchema = ComplexSchemasDocumentBaseSchema.and(
  ComplexSchemasSpreadsheetContentSchema,
).openapi('ComplexSchemasSpreadsheet')

export type ComplexSchemasSpreadsheet = z.infer<typeof ComplexSchemasSpreadsheetSchema>

export const ComplexSchemasDocumentSchema = z
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

export type ComplexSchemasDocument = z.infer<typeof ComplexSchemasDocumentSchema>

export const ComplexSchemasBaseConfigSchema = z
  .object({ version: z.int() })
  .openapi({ required: ['version'] })
  .openapi('ComplexSchemasBaseConfig')

export type ComplexSchemasBaseConfig = z.infer<typeof ComplexSchemasBaseConfigSchema>

export const ComplexSchemasNetworkConfigSchema = z
  .object({ host: z.string(), port: z.int().min(1).max(65535) })
  .openapi({ required: ['host', 'port'] })
  .openapi('ComplexSchemasNetworkConfig')

export type ComplexSchemasNetworkConfig = z.infer<typeof ComplexSchemasNetworkConfigSchema>

export const ComplexSchemasSecurityConfigSchema = z
  .object({ tlsEnabled: z.boolean(), certPath: z.string().exactOptional() })
  .openapi({ required: ['tlsEnabled'] })
  .openapi('ComplexSchemasSecurityConfig')

export type ComplexSchemasSecurityConfig = z.infer<typeof ComplexSchemasSecurityConfigSchema>

export const ComplexSchemasFullConfigSchema = ComplexSchemasBaseConfigSchema.and(
  ComplexSchemasNetworkConfigSchema,
)
  .and(ComplexSchemasSecurityConfigSchema)
  .openapi({ description: 'Three-level allOf chain with all refs' })
  .openapi('ComplexSchemasFullConfig')

export type ComplexSchemasFullConfig = z.infer<typeof ComplexSchemasFullConfigSchema>

export const ComplexSchemasSuccessResultSchema = z
  .object({ status: z.literal('success'), data: z.looseObject({}) })
  .openapi({ required: ['status', 'data'] })
  .openapi('ComplexSchemasSuccessResult')

export type ComplexSchemasSuccessResult = z.infer<typeof ComplexSchemasSuccessResultSchema>

export const ComplexSchemasErrorResultSchema = z
  .object({ status: z.literal('error'), message: z.string(), code: z.int().exactOptional() })
  .openapi({ required: ['status', 'message'] })
  .openapi('ComplexSchemasErrorResult')

export type ComplexSchemasErrorResult = z.infer<typeof ComplexSchemasErrorResultSchema>

export const ComplexSchemasNullableResultSchema = z
  .union([ComplexSchemasSuccessResultSchema, ComplexSchemasErrorResultSchema])
  .nullable()
  .openapi({ description: 'Nullable anyOf combining success and error' })
  .openapi('ComplexSchemasNullableResult')

export type ComplexSchemasNullableResult = z.infer<typeof ComplexSchemasNullableResultSchema>

export const ComplexSchemasCategorySchema: z.ZodType<ComplexSchemasCategoryType> = z
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

export type ComplexSchemasCategory = z.infer<typeof ComplexSchemasCategorySchema>

export const VendorExtensionsUserIdSchema = z
  .uuid()
  .brand<'UserId'>()
  .openapi('VendorExtensionsUserId')

export type VendorExtensionsUserId = z.infer<typeof VendorExtensionsUserIdSchema>

export const VendorExtensionsPostIdSchema = z
  .uuid()
  .brand<'PostId'>()
  .openapi('VendorExtensionsPostId')

export type VendorExtensionsPostId = z.infer<typeof VendorExtensionsPostIdSchema>

export const VendorExtensionsEmailSchema = z
  .email()
  .brand<'Email'>()
  .openapi('VendorExtensionsEmail')

export type VendorExtensionsEmail = z.infer<typeof VendorExtensionsEmailSchema>

export const VendorExtensionsPriceSchema = z
  .number()
  .min(0)
  .brand<'Price'>()
  .openapi('VendorExtensionsPrice')

export type VendorExtensionsPrice = z.infer<typeof VendorExtensionsPriceSchema>

export const VendorExtensionsQuantitySchema = z
  .int()
  .min(0)
  .brand<'Quantity'>()
  .openapi('VendorExtensionsQuantity')

export type VendorExtensionsQuantity = z.infer<typeof VendorExtensionsQuantitySchema>

export const VendorExtensionsUsernameSchema = z
  .string()
  .min(3)
  .max(20)
  .brand<'Username'>()
  .openapi('VendorExtensionsUsername')

export type VendorExtensionsUsername = z.infer<typeof VendorExtensionsUsernameSchema>

export const VendorExtensionsTagsSchema = z
  .array(z.string())
  .min(1)
  .max(10)
  .brand<'Tags'>()
  .openapi('VendorExtensionsTags')

export type VendorExtensionsTags = z.infer<typeof VendorExtensionsTagsSchema>

export const VendorExtensionsCreateUserSchema = z
  .object({
    email: VendorExtensionsEmailSchema,
    username: VendorExtensionsUsernameSchema,
    price: VendorExtensionsPriceSchema,
    tags: VendorExtensionsTagsSchema.exactOptional(),
  })
  .openapi({ required: ['email', 'username', 'price'] })
  .openapi('VendorExtensionsCreateUser')

export type VendorExtensionsCreateUser = z.infer<typeof VendorExtensionsCreateUserSchema>

export const VendorExtensionsUserSchema = z
  .object({
    id: VendorExtensionsUserIdSchema,
    email: VendorExtensionsEmailSchema,
    username: VendorExtensionsUsernameSchema,
  })
  .openapi({ required: ['id', 'email', 'username'] })
  .openapi('VendorExtensionsUser')

export type VendorExtensionsUser = z.infer<typeof VendorExtensionsUserSchema>

export const VendorExtensionsCreatePostSchema = z
  .object({
    authorId: VendorExtensionsUserIdSchema,
    title: z.string(),
    quantity: VendorExtensionsQuantitySchema,
  })
  .openapi({ required: ['authorId', 'title', 'quantity'] })
  .openapi('VendorExtensionsCreatePost')

export type VendorExtensionsCreatePost = z.infer<typeof VendorExtensionsCreatePostSchema>

export const VendorExtensionsPostSchema = z
  .object({
    id: VendorExtensionsPostIdSchema,
    authorId: VendorExtensionsUserIdSchema,
    title: z.string(),
  })
  .openapi({ required: ['id', 'authorId', 'title'] })
  .openapi('VendorExtensionsPost')

export type VendorExtensionsPost = z.infer<typeof VendorExtensionsPostSchema>

export const VendorExtensionsTransformFormSchema = z
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

export type VendorExtensionsTransformForm = z.infer<typeof VendorExtensionsTransformFormSchema>

export const VendorExtensionsCoerceFormSchema = z
  .object({
    asString: z.coerce.string(),
    asDate: z.coerce.date(),
    asNumber: z.coerce.number(),
    asInt: z.coerce.number().int().min(0),
    asBool: z.coerce.boolean(),
  })
  .openapi({ required: ['asString', 'asDate', 'asNumber', 'asInt', 'asBool'] })
  .openapi('VendorExtensionsCoerceForm')

export type VendorExtensionsCoerceForm = z.infer<typeof VendorExtensionsCoerceFormSchema>

export const VendorExtensionsReplacementFormSchema = z
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

export type VendorExtensionsReplacementForm = z.infer<typeof VendorExtensionsReplacementFormSchema>

export const VendorExtensionsFormatOptionsSchema = z
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

export type VendorExtensionsFormatOptions = z.infer<typeof VendorExtensionsFormatOptionsSchema>

export const VendorExtensionsCustomFormSchema = z
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

export type VendorExtensionsCustomForm = z.infer<typeof VendorExtensionsCustomFormSchema>

export const VendorExtensionsMessageFormSchema = z
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

export type VendorExtensionsMessageForm = z.infer<typeof VendorExtensionsMessageFormSchema>

export const VendorExtensionsCompositionSchema = z
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

export type VendorExtensionsComposition = z.infer<typeof VendorExtensionsCompositionSchema>

export const VendorExtensionsConditionalSchema = z
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

export type VendorExtensionsConditional = z.infer<typeof VendorExtensionsConditionalSchema>

export const VendorExtensionsApplicatorsSchema = z
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

export type VendorExtensionsApplicators = z.infer<typeof VendorExtensionsApplicatorsSchema>

export const PaginationItemSchema = z
  .object({ id: z.string(), name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('PaginationItem')

export type PaginationItem = z.infer<typeof PaginationItemSchema>

export const PaginationItemsPageSchema = z
  .object({ items: z.array(PaginationItemSchema), nextCursor: z.string().exactOptional() })
  .openapi({ required: ['items'] })
  .openapi('PaginationItemsPage')

export type PaginationItemsPage = z.infer<typeof PaginationItemsPageSchema>

export const AllExportsUserListResponseResponse = {
  description: 'A list of users',
  content: { 'application/json': { schema: AllExportsUserListSchema } },
}

export const ComprehensiveNotFoundResponse = {
  description: 'Resource not found',
  content: { 'application/json': { schema: ComprehensiveErrorSchema } },
}

export const ReadonlyRefUserListResponse = {
  description: 'User list response',
  content: {
    'application/json': {
      schema: z
        .object({ users: z.array(ReadonlyRefUserSchema), total: z.int() })
        .openapi({ required: ['users', 'total'] }),
    },
  },
}

export const ReadonlyRefNotFoundResponse = {
  description: 'Not found',
  content: { 'application/json': { schema: ReadonlyRefErrorBodySchema } },
}

export const ReadonlyRefBadRequestResponse = {
  description: 'Bad request',
  content: { 'application/json': { schema: ReadonlyRefErrorBodySchema } },
}

export const ReadonlyRefServerErrorResponse = {
  description: 'Server error',
  content: { 'application/json': { schema: ReadonlyRefErrorBodySchema } },
}

export const AllExportsPageParamParamsSchema = z.coerce
  .number()
  .int()
  .default(1)
  .exactOptional()
  .openapi({ param: { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } } })

export type AllExportsPageParamParams = z.infer<typeof AllExportsPageParamParamsSchema>

export const AllExportsUserIdParamParamsSchema = z.coerce
  .number()
  .int()
  .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'integer' } } })

export type AllExportsUserIdParamParams = z.infer<typeof AllExportsUserIdParamParamsSchema>

export const ParametersMergeLimitParamParamsSchema = z.coerce
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

export type ParametersMergeLimitParamParams = z.infer<typeof ParametersMergeLimitParamParamsSchema>

export const ParametersMergeOffsetParamParamsSchema = z.coerce
  .number()
  .int()
  .min(0)
  .default(0)
  .exactOptional()
  .openapi({
    param: { name: 'offset', in: 'query', schema: { type: 'integer', default: 0, minimum: 0 } },
  })

export type ParametersMergeOffsetParamParams = z.infer<
  typeof ParametersMergeOffsetParamParamsSchema
>

export const ComprehensivePageParamParamsSchema = z.coerce
  .number()
  .int()
  .default(1)
  .exactOptional()
  .openapi({ param: { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } } })

export type ComprehensivePageParamParams = z.infer<typeof ComprehensivePageParamParamsSchema>

export const ComprehensiveLimitParamParamsSchema = z.coerce
  .number()
  .int()
  .default(20)
  .exactOptional()
  .openapi({ param: { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } } })

export type ComprehensiveLimitParamParams = z.infer<typeof ComprehensiveLimitParamParamsSchema>

export const AllExportsUserExampleExample = {
  summary: 'Example user',
  value: { id: 1, name: 'Alice', email: 'alice@example.com' },
}

export const ReadonlyRefUserExampleExample = {
  summary: 'A sample user',
  value: { id: 'u-001', name: 'Alice', email: 'alice@example.com' },
}

export const ReadonlyRefUserAliasExample = ReadonlyRefUserExampleExample

export const ReadonlyRefItemExampleExample = {
  summary: 'A sample item',
  value: { id: 1, title: 'Widget' },
}

export const ReadonlyRefItemAliasExample = ReadonlyRefItemExampleExample

export const AllExportsCreateUserBodyRequestBody = {
  content: {
    'application/json': {
      schema: z
        .object({ name: z.string(), email: z.email() })
        .openapi({ required: ['name', 'email'] }),
    },
  },
  required: true,
}

export const ReadonlyRefCreateUserRequestBody = {
  content: {
    'application/json': {
      schema: z
        .object({ name: z.string(), email: z.email() })
        .openapi({ required: ['name', 'email'] }),
    },
  },
  required: true,
}

export const ReadonlyRefUpdateUserRequestBody = {
  content: {
    'application/json': {
      schema: z.object({ name: z.string().exactOptional(), email: z.email().exactOptional() }),
    },
  },
  required: true,
}

export const AllExportsXRequestIdHeaderSchema = z
  .uuid()
  .exactOptional()
  .openapi({ description: 'Unique request identifier' })

export type AllExportsXRequestIdHeader = z.infer<typeof AllExportsXRequestIdHeaderSchema>

export const AllExportsBearerAuthSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
}

export const SecuritySchemesBearerAuthSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
}

export const SecuritySchemesApiKeyAuthSecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'X-API-Key',
}

export const SecuritySchemesBasicAuthSecurityScheme = { type: 'http', scheme: 'basic' }

export const SecuritySchemesOAuth2SecurityScheme = {
  type: 'oauth2',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://example.com/oauth/authorize',
      tokenUrl: 'https://example.com/oauth/token',
      scopes: { read: 'Read access', write: 'Write access' },
    },
  },
}

export const ComprehensiveBearerAuthSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
}

export const AllExportsGetUserLinkLink = {
  operationId: 'allExportsGetUserById',
  parameters: { id: '$response.body#/id' },
  description: 'Get the created user',
}

export const CallbacksLinksGetSubscriptionLinkLink = {
  operationId: 'callbacksLinksGetSubscription',
  parameters: { id: '$response.body#/id' },
  description: 'Get the created subscription',
}

export const CallbacksLinksDeleteSubscriptionLinkLink = {
  operationId: 'callbacksLinksDeleteSubscription',
  parameters: { id: '$request.path.id' },
  description: 'Delete this subscription',
}

export const AllExportsUserCreatedCallback = {
  '{$request.body#/callbackUrl}': {
    post: {
      operationId: 'allExportsUserCreatedCallback',
      requestBody: { content: { 'application/json': { schema: AllExportsUserSchema } } },
      responses: { 200: { description: 'Callback processed' } },
    },
  },
}

export const CallbacksLinksSubscriptionEventCallback = {
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

export const AllExportsUserItemPathItem = {
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
        'application/x-www-form-urlencoded': {
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
