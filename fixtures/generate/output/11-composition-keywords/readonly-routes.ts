import { createRoute, z } from '@hono/zod-openapi'

export const CreditCardSchema = z
  .object({ type: z.literal('credit_card'), cardNumber: z.string(), expiry: z.string() })
  .openapi({ required: ['type', 'cardNumber', 'expiry'] })
  .readonly()
  .openapi('CreditCard')

export type CreditCard = z.infer<typeof CreditCardSchema>

export const BankTransferSchema = z
  .object({ type: z.literal('bank_transfer'), bankCode: z.string(), accountNumber: z.string() })
  .openapi({ required: ['type', 'bankCode', 'accountNumber'] })
  .readonly()
  .openapi('BankTransfer')

export type BankTransfer = z.infer<typeof BankTransferSchema>

export const PaymentMethodSchema = z
  .xor([CreditCardSchema, BankTransferSchema])
  .openapi({
    discriminator: {
      propertyName: 'type',
      mapping: {
        credit_card: '#/components/schemas/CreditCard',
        bank_transfer: '#/components/schemas/BankTransfer',
      },
    },
  })
  .readonly()
  .openapi('PaymentMethod')

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>

export const NullablePaymentSchema = z
  .xor([CreditCardSchema, BankTransferSchema])
  .nullable()
  .readonly()
  .openapi('NullablePayment')

export type NullablePayment = z.infer<typeof NullablePaymentSchema>

export const SearchFilterSchema = z
  .union([
    z.object({ keyword: z.string() }).openapi({ required: ['keyword'] }),
    z.object({ category: z.int() }).openapi({ required: ['category'] }),
  ])
  .readonly()
  .openapi('SearchFilter')

export type SearchFilter = z.infer<typeof SearchFilterSchema>

export const FlexibleIdSchema = z
  .union([z.string(), z.int(), z.uuid()])
  .openapi({ description: 'Accepts string, integer, or UUID' })
  .readonly()
  .openapi('FlexibleId')

export type FlexibleId = z.infer<typeof FlexibleIdSchema>

export const CatSchema = z
  .object({ name: z.string(), purring: z.boolean().exactOptional() })
  .openapi({ required: ['name'] })
  .readonly()
  .openapi('Cat')

export type Cat = z.infer<typeof CatSchema>

export const DogSchema = z
  .object({ name: z.string(), barkVolume: z.number().exactOptional() })
  .openapi({ required: ['name'] })
  .readonly()
  .openapi('Dog')

export type Dog = z.infer<typeof DogSchema>

export const PetChoiceSchema = z.union([CatSchema, DogSchema]).readonly().openapi('PetChoice')

export type PetChoice = z.infer<typeof PetChoiceSchema>

export const PersonSchema = z
  .object({ name: z.string(), email: z.email() })
  .openapi({ required: ['name', 'email'] })
  .readonly()
  .openapi('Person')

export type Person = z.infer<typeof PersonSchema>

export const EmployeeInfoSchema = z
  .object({ employeeId: z.int(), department: z.string().exactOptional() })
  .openapi({ required: ['employeeId'] })
  .readonly()
  .openapi('EmployeeInfo')

export type EmployeeInfo = z.infer<typeof EmployeeInfoSchema>

export const EmployeeSchema = PersonSchema.and(EmployeeInfoSchema)
  .and(z.object({ startDate: z.iso.date().exactOptional() }))
  .openapi({ description: 'An employee with personal and work info' })
  .readonly()
  .openapi('Employee')

export type Employee = z.infer<typeof EmployeeSchema>

export const BaseEntitySchema = z
  .object({ id: z.int(), createdAt: z.iso.datetime() })
  .openapi({ required: ['id', 'createdAt'] })
  .readonly()
  .openapi('BaseEntity')

export type BaseEntity = z.infer<typeof BaseEntitySchema>

export const ExtendedWithSiblingSchema = BaseEntitySchema.and(
  z
    .object({ label: z.string(), active: z.boolean().exactOptional() })
    .openapi({ required: ['label'] }),
)
  .openapi({ description: 'allOf with sibling properties merged', required: ['label'] })
  .readonly()
  .openapi('ExtendedWithSibling')

export type ExtendedWithSibling = z.infer<typeof ExtendedWithSiblingSchema>

export const NotStringValueSchema = z
  .any()
  .refine((v) => typeof v !== 'string')
  .readonly()
  .openapi('NotStringValue')

export type NotStringValue = z.infer<typeof NotStringValueSchema>

export const AdminRoleSchema = z
  .object({ role: z.literal('admin') })
  .openapi({ required: ['role'] })
  .readonly()
  .openapi('AdminRole')

export const NotAdminSchema = z
  .any()
  .refine((v) => !AdminRoleSchema.safeParse(v).success)
  .readonly()
  .openapi('NotAdmin')

export type NotAdmin = z.infer<typeof NotAdminSchema>

export type AdminRole = z.infer<typeof AdminRoleSchema>

export const NotDraftOrArchivedSchema = z
  .any()
  .refine((v) => !['draft', 'archived'].includes(v))
  .readonly()
  .openapi('NotDraftOrArchived')

export type NotDraftOrArchived = z.infer<typeof NotDraftOrArchivedSchema>

export const NotSpecificValueSchema = z
  .any()
  .refine((v) => v !== 'forbidden')
  .readonly()
  .openapi('NotSpecificValue')

export type NotSpecificValue = z.infer<typeof NotSpecificValueSchema>

export const NotStringOrNumberSchema = z
  .any()
  .refine((v) => !z.union([z.string(), z.number()]).safeParse(v).success)
  .openapi({ description: 'Rejects if value matches string or number union' })
  .readonly()
  .openapi('NotStringOrNumber')

export type NotStringOrNumber = z.infer<typeof NotStringOrNumberSchema>

export const postOneOfRoute = createRoute({
  method: 'post',
  path: '/one-of',
  operationId: 'postOneOf',
  request: {
    body: { content: { 'application/json': { schema: PaymentMethodSchema } }, required: true },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: PaymentMethodSchema } } },
  },
} as const)

export const postAnyOfRoute = createRoute({
  method: 'post',
  path: '/any-of',
  operationId: 'postAnyOf',
  request: {
    body: { content: { 'application/json': { schema: SearchFilterSchema } }, required: true },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: SearchFilterSchema } } },
  },
} as const)

export const postAllOfRoute = createRoute({
  method: 'post',
  path: '/all-of',
  operationId: 'postAllOf',
  request: {
    body: { content: { 'application/json': { schema: EmployeeSchema } }, required: true },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: EmployeeSchema } } },
  },
} as const)

export const postNotRoute = createRoute({
  method: 'post',
  path: '/not',
  operationId: 'postNot',
  request: {
    body: { content: { 'application/json': { schema: NotStringValueSchema } }, required: true },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: NotStringValueSchema } } },
  },
} as const)

export const getNotRefRoute = createRoute({
  method: 'get',
  path: '/not-ref',
  operationId: 'getNotRef',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: NotAdminSchema } } },
  },
} as const)

export const getNotEnumRoute = createRoute({
  method: 'get',
  path: '/not-enum',
  operationId: 'getNotEnum',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: NotDraftOrArchivedSchema } },
    },
  },
} as const)

export const getNotConstRoute = createRoute({
  method: 'get',
  path: '/not-const',
  operationId: 'getNotConst',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: NotSpecificValueSchema } } },
  },
} as const)

export const getNotCompositionRoute = createRoute({
  method: 'get',
  path: '/not-composition',
  operationId: 'getNotComposition',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: NotStringOrNumberSchema } },
    },
  },
} as const)

export const getAllOfSiblingRoute = createRoute({
  method: 'get',
  path: '/all-of-sibling',
  operationId: 'getAllOfSibling',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: ExtendedWithSiblingSchema } },
    },
  },
} as const)

export const getNullableOneOfRoute = createRoute({
  method: 'get',
  path: '/nullable-one-of',
  operationId: 'getNullableOneOf',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: NullablePaymentSchema } } },
  },
} as const)

export const getAnyOfThreeRoute = createRoute({
  method: 'get',
  path: '/any-of-three',
  operationId: 'getAnyOfThree',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: FlexibleIdSchema } } },
  },
} as const)

export const getAnyOfRefRoute = createRoute({
  method: 'get',
  path: '/any-of-ref',
  operationId: 'getAnyOfRef',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: PetChoiceSchema } } },
  },
} as const)
