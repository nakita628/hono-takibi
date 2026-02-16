import { createRoute, z } from '@hono/zod-openapi'

const CreditCardSchema = z
  .object({ type: z.literal('credit_card'), cardNumber: z.string(), expiry: z.string() })
  .openapi({ required: ['type', 'cardNumber', 'expiry'] })
  .openapi('CreditCard')

const BankTransferSchema = z
  .object({ type: z.literal('bank_transfer'), bankCode: z.string(), accountNumber: z.string() })
  .openapi({ required: ['type', 'bankCode', 'accountNumber'] })
  .openapi('BankTransfer')

const PaymentMethodSchema = z
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
  .openapi('PaymentMethod')

const NullablePaymentSchema = z
  .xor([CreditCardSchema, BankTransferSchema])
  .nullable()
  .openapi('NullablePayment')

const SearchFilterSchema = z
  .union([
    z.object({ keyword: z.string() }).openapi({ required: ['keyword'] }),
    z.object({ category: z.int() }).openapi({ required: ['category'] }),
  ])
  .openapi('SearchFilter')

const FlexibleIdSchema = z
  .union([z.string(), z.int(), z.uuid()])
  .openapi({ description: 'Accepts string, integer, or UUID' })
  .openapi('FlexibleId')

const CatSchema = z
  .object({ name: z.string(), purring: z.boolean().exactOptional() })
  .openapi({ required: ['name'] })
  .openapi('Cat')

const DogSchema = z
  .object({ name: z.string(), barkVolume: z.number().exactOptional() })
  .openapi({ required: ['name'] })
  .openapi('Dog')

const PetChoiceSchema = z.union([CatSchema, DogSchema]).openapi('PetChoice')

const PersonSchema = z
  .object({ name: z.string(), email: z.email() })
  .openapi({ required: ['name', 'email'] })
  .openapi('Person')

const EmployeeInfoSchema = z
  .object({ employeeId: z.int(), department: z.string().exactOptional() })
  .openapi({ required: ['employeeId'] })
  .openapi('EmployeeInfo')

const EmployeeSchema = PersonSchema.and(EmployeeInfoSchema)
  .and(z.object({ startDate: z.iso.date().exactOptional() }))
  .openapi({ description: 'An employee with personal and work info' })
  .openapi('Employee')

const BaseEntitySchema = z
  .object({ id: z.int(), createdAt: z.iso.datetime() })
  .openapi({ required: ['id', 'createdAt'] })
  .openapi('BaseEntity')

const ExtendedWithSiblingSchema = BaseEntitySchema.and(
  z
    .object({ label: z.string(), active: z.boolean().exactOptional() })
    .openapi({ required: ['label'] }),
)
  .openapi({ description: 'allOf with sibling properties merged', required: ['label'] })
  .openapi('ExtendedWithSibling')

const NotStringValueSchema = z
  .any()
  .refine((v) => typeof v !== 'string')
  .openapi('NotStringValue')

const AdminRoleSchema = z
  .object({ role: z.literal('admin') })
  .openapi({ required: ['role'] })
  .openapi('AdminRole')

const NotAdminSchema = z
  .any()
  .refine((v) => !AdminRoleSchema.safeParse(v).success)
  .openapi('NotAdmin')

const NotDraftOrArchivedSchema = z
  .any()
  .refine((v) => !['draft', 'archived'].includes(v))
  .openapi('NotDraftOrArchived')

const NotSpecificValueSchema = z
  .any()
  .refine((v) => v !== 'forbidden')
  .openapi('NotSpecificValue')

const NotStringOrNumberSchema = z
  .any()
  .refine((v) => !z.union([z.string(), z.number()]).safeParse(v).success)
  .openapi({ description: 'Rejects if value matches string or number union' })
  .openapi('NotStringOrNumber')

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
})

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
})

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
})

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
})

export const getNotRefRoute = createRoute({
  method: 'get',
  path: '/not-ref',
  operationId: 'getNotRef',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: NotAdminSchema } } },
  },
})

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
})

export const getNotConstRoute = createRoute({
  method: 'get',
  path: '/not-const',
  operationId: 'getNotConst',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: NotSpecificValueSchema } } },
  },
})

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
})

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
})

export const getNullableOneOfRoute = createRoute({
  method: 'get',
  path: '/nullable-one-of',
  operationId: 'getNullableOneOf',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: NullablePaymentSchema } } },
  },
})

export const getAnyOfThreeRoute = createRoute({
  method: 'get',
  path: '/any-of-three',
  operationId: 'getAnyOfThree',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: FlexibleIdSchema } } },
  },
})

export const getAnyOfRefRoute = createRoute({
  method: 'get',
  path: '/any-of-ref',
  operationId: 'getAnyOfRef',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: PetChoiceSchema } } },
  },
})
