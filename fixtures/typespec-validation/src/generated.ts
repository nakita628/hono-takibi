import { createRoute, z } from '@hono/zod-openapi'

const CreateUserSchema = z
  .object({
    code: z.string().length(6, { error: 'Code must be exactly 6 characters' }).exactOptional(),
    name: z
      .string()
      .min(2, { error: 'Name must be at least 2 characters' })
      .max(50, { error: 'Name must be at most 50 characters' }),
    email: z.email({ error: 'Invalid email address' }),
    requestId: z.uuid({ error: 'Invalid UUID format' }).exactOptional(),
    website: z.url({ error: 'Invalid URL' }).exactOptional(),
    password: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/, {
        error: 'Password must have uppercase + number, min 8 chars',
      })
      .exactOptional(),
    nickname: z.string({ error: 'Nickname must be a string' }).exactOptional(),
    dynamicField: z.string({ error: () => 'dynamic validation error' }).exactOptional(),
    role: z.enum(['admin', 'user', 'guest'], { error: 'Role must be admin, user, or guest' }),
    status: z.literal('active', { error: 'Status must be active' }),
    age: z
      .int()
      .min(0, { error: 'Age must be >= 0' })
      .max(150, { error: 'Age must be <= 150' })
      .exactOptional(),
    score: z.number({ error: 'Score must be a number' }),
    level: z
      .int({
        error: (iss) =>
          iss.input === undefined ? 'Level is required' : 'Level must be an integer',
      })
      .min(1, { error: 'Level must be >= 1' })
      .max(100, { error: 'Level must be <= 100' }),
    rating: z
      .number({ error: 'Rating must be a multiple of 0.5' })
      .multipleOf(0.5, { error: 'Rating must be a multiple of 0.5' })
      .exactOptional(),
    agreed: z.boolean({ error: 'Must be a boolean' }).exactOptional(),
    tags: z
      .array(z.string())
      .min(1, { error: 'At least 1 tag required' })
      .max(10, { error: 'At most 10 tags allowed' }),
    coordinates: z
      .array(z.number())
      .length(2, { error: 'Must have exactly 2 coordinates' })
      .exactOptional(),
    favoriteNumbers: z.array(z.int(), { error: 'Must be an array' }).exactOptional(),
    deletedAt: z.null({ error: 'Must be null' }).nullable().exactOptional(),
  })
  .openapi({ required: ['name', 'email', 'role', 'status', 'tags', 'score', 'level'] })
  .openapi('CreateUser')

const UserSchema = z
  .object({
    id: z.int().exactOptional(),
    name: z.string().exactOptional(),
    email: z.string().exactOptional(),
  })
  .openapi('User')

const CreateProductSchema = z
  .object({
    type: z.literal('product', { error: 'Type must be "product"' }),
    priority: z.literal(1, { error: 'Priority must be 1' }),
    enabled: z.literal(true, { error: 'Must be true' }).exactOptional(),
  })
  .openapi({ required: ['type', 'priority'] })
  .openapi('CreateProduct')

const ProductSchema = z
  .object({ id: z.int().exactOptional(), type: z.string().exactOptional() })
  .openapi('Product')

const SettingsSchema = z
  .object({ theme: z.string().exactOptional(), locale: z.string().exactOptional() })
  .refine((o) => Object.keys(o).length >= 1, { error: 'At least 1 setting required' })
  .refine((o) => Object.keys(o).length <= 20, { error: 'At most 20 settings allowed' })
  .openapi('Settings')

const AddressSchema = z
  .object({
    street: z.string().min(1, { error: 'Street is required' }),
    city: z.string().min(1, { error: 'City is required' }),
    zip: z.string().regex(/^[0-9]{3}-[0-9]{4}$/, { error: 'Zip code must be format: 000-0000' }),
  })
  .openapi({ required: ['street', 'city', 'zip'] })
  .openapi('Address')

const CreateOrderSchema = z
  .object({
    productName: z
      .string()
      .min(1, { error: 'Product name is required' })
      .max(100, { error: 'Product name must be at most 100 characters' }),
    quantity: z.int().min(1, { error: 'Quantity must be >= 1' }),
    address: AddressSchema,
  })
  .openapi({ required: ['productName', 'quantity', 'address'] })
  .openapi('CreateOrder')

const OrderSchema = z
  .object({
    id: z.int().exactOptional(),
    productName: z.string().exactOptional(),
    quantity: z.int().exactOptional(),
  })
  .openapi('Order')

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  operationId: 'createUser',
  request: {
    body: { content: { 'application/json': { schema: CreateUserSchema } }, required: true },
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: UserSchema } } },
  },
})

export const postProductsRoute = createRoute({
  method: 'post',
  path: '/products',
  operationId: 'createProduct',
  request: {
    body: { content: { 'application/json': { schema: CreateProductSchema } }, required: true },
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: ProductSchema } } },
  },
})

export const putSettingsRoute = createRoute({
  method: 'put',
  path: '/settings',
  operationId: 'updateSettings',
  request: {
    body: { content: { 'application/json': { schema: SettingsSchema } }, required: true },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: SettingsSchema } } },
  },
})

export const postOrdersRoute = createRoute({
  method: 'post',
  path: '/orders',
  operationId: 'createOrder',
  request: {
    body: { content: { 'application/json': { schema: CreateOrderSchema } }, required: true },
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: OrderSchema } } },
  },
})
