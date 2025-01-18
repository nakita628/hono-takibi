---
prev: false
next: false
---

# Zod to OpenAPI

* [Zod to OpenAPI](https://github.com/asteasolutions/zod-to-openapi)

## Schema

```ts
const orderSchema = z
  .object({
    id: z.number().int().openapi({ example: 10 }),
    petId: z.number().int().openapi({ example: 198772 }),
    quantity: z.number().int().openapi({ example: 7 }),
    shipDate: z.string().datetime(),
    status: z.enum(['placed', 'approved', 'delivered']).openapi({ example: 'approved' }),
    complete: z.boolean(),
  })
  .partial()
  .openapi('Order')

const addressSchema = z
  .object({
    street: z.string().openapi({ example: '437 Lytton' }),
    city: z.string().openapi({ example: 'Palo Alto' }),
    state: z.string().openapi({ example: 'CA' }),
    zip: z.string().openapi({ example: '94301' }),
  })
  .partial()
  .openapi('Address')

const customerSchema = z
  .object({
    id: z.number().int().openapi({ example: 100000 }),
    username: z.string().openapi({ example: 'fehguy' }),
    address: z.array(addressSchema),
  })
  .partial()
  .openapi('Customer')

const categorySchema = z
  .object({
    id: z.number().int().openapi({ example: 1 }),
    name: z.string().openapi({ example: 'Dogs' }),
  })
  .partial()
  .openapi('Category')

const userSchema = z
  .object({
    id: z.number().int().openapi({ example: 10 }),
    username: z.string().openapi({ example: 'theUser' }),
    firstName: z.string().openapi({ example: 'John' }),
    lastName: z.string().openapi({ example: 'James' }),
    email: z.string().openapi({ example: 'john@email.com' }),
    password: z.string().openapi({ example: '12345' }),
    phone: z.string().openapi({ example: '12345' }),
    userStatus: z.number().int().openapi({ example: 1 }),
  })
  .partial()
  .openapi('User')

const tagSchema = z.object({ id: z.number().int(), name: z.string() }).partial().openapi('Tag')

const petSchema = z
  .object({
    id: z.number().int().openapi({ example: 10 }).optional(),
    name: z.string().openapi({ example: 'doggie' }),
    category: categorySchema.optional(),
    photoUrls: z.array(z.string()),
    tags: z.array(tagSchema).optional(),
    status: z.enum(['available', 'pending', 'sold']).optional(),
  })
  .openapi('Pet')

const apiResponseSchema = z
  .object({ code: z.number().int(), type: z.string(), message: z.string() })
  .partial()
  .openapi('ApiResponse')
```

## Path Parameters

```ts
export const deletePostsIdRoute = createRoute({
  tags: ['Post'],
  method: 'delete',
  path: '/posts/{id}',
  summary: 'Delete a post',
  description: 'Delete an existing post identified by its unique ID.',
  request: {
    params: z.object({
      id: z
        .string()
        .uuid()
        .openapi({
          param: { name: 'id', in: 'path' },
          example: '123e4567-e89b-12d3-a456-426614174000',
        }),
    }),
  },
  responses: {
    204: { description: 'Post successfully deleted.' },
    400: {
      description: 'Invalid input.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})
```

