import { createRoute, z } from '@hono/zod-openapi'

export const getArrayRoute = createRoute({
  method: 'get',
  path: '/array',
  summary: 'zod array',
  description: 'zod array',
  responses: {
    200: {
      description: 'zod array',
      content: {
        'application/json': {
          schema: z
            .object({
              string_array: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string' } }),
              number_array: z
                .array(z.number().optional().openapi({ type: 'number' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'number' } }),
              boolean_array: z
                .array(z.boolean().optional().openapi({ type: 'boolean' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'boolean' } }),
              nested_array: z
                .array(
                  z
                    .array(z.string().optional().openapi({ type: 'string' }))
                    .optional()
                    .openapi({ type: 'array', items: { type: 'string' } }),
                )
                .optional()
                .openapi({ type: 'array', items: { type: 'array', items: { type: 'string' } } }),
              deep_nested_array: z
                .array(
                  z
                    .array(
                      z
                        .array(z.number().optional().openapi({ type: 'number' }))
                        .optional()
                        .openapi({ type: 'array', items: { type: 'number' } }),
                    )
                    .optional()
                    .openapi({
                      type: 'array',
                      items: { type: 'array', items: { type: 'number' } },
                    }),
                )
                .optional()
                .openapi({
                  type: 'array',
                  items: { type: 'array', items: { type: 'array', items: { type: 'number' } } },
                }),
              first_element_fixed: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .min(1)
                .optional()
                .openapi({ type: 'array', items: { type: 'string' }, minItems: 1 }),
              optional_array: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string' } }),
              optional_elements_array: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string' } }),
              min5_array: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .min(5)
                .optional()
                .openapi({ type: 'array', items: { type: 'string' }, minItems: 5 }),
              max5_array: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .max(5)
                .optional()
                .openapi({ type: 'array', items: { type: 'string' }, maxItems: 5 }),
              length5_array: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string' }, minLength: 5, maxLength: 5 }),
              nonempty_array: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .min(1)
                .optional()
                .openapi({ type: 'array', items: { type: 'string' }, minItems: 1 }),
              unique_array: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string' } }),
              mixed_array: z
                .array(
                  z
                    .union([
                      z.string().optional().openapi({ type: 'string' }),
                      z.number().optional().openapi({ type: 'number' }),
                      z.boolean().optional().openapi({ type: 'boolean' }),
                    ])
                    .optional()
                    .openapi({
                      anyOf: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
                    }),
                )
                .optional()
                .openapi({
                  type: 'array',
                  items: { anyOf: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }] },
                }),
              object_array: z
                .array(
                  z
                    .object({
                      id: z
                        .int()
                        .positive()
                        .optional()
                        .openapi({ type: 'integer', minimum: 0, exclusiveMinimum: true }),
                      name: z.string().optional().openapi({ type: 'string' }),
                      active: z.boolean().optional().openapi({ type: 'boolean' }),
                    })
                    .optional()
                    .openapi({
                      type: 'object',
                      properties: {
                        id: { type: 'integer', minimum: 0, exclusiveMinimum: true },
                        name: { type: 'string' },
                        active: { type: 'boolean' },
                      },
                    }),
                )
                .optional()
                .openapi({
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', minimum: 0, exclusiveMinimum: true },
                      name: { type: 'string' },
                      active: { type: 'boolean' },
                    },
                    required: ['id', 'name'],
                  },
                }),
              fixed_values_array: z
                .array(
                  z
                    .enum(['small', 'medium', 'large'])
                    .optional()
                    .openapi({ type: 'string', enum: ['small', 'medium', 'large'] }),
                )
                .optional()
                .openapi({
                  type: 'array',
                  items: { type: 'string', enum: ['small', 'medium', 'large'] },
                }),
              email_array: z
                .array(z.email().optional().openapi({ type: 'string', format: 'email' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string', format: 'email' } }),
              sorted_number_array: z
                .array(z.number().optional().openapi({ type: 'number' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'number' } }),
              at_least_one_even_number: z
                .array(z.number().optional().openapi({ type: 'number' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'number' } }),
            })
            .optional()
            .openapi({
              type: 'object',
              properties: {
                string_array: { type: 'array', items: { type: 'string' } },
                number_array: { type: 'array', items: { type: 'number' } },
                boolean_array: { type: 'array', items: { type: 'boolean' } },
                nested_array: {
                  type: 'array',
                  items: { type: 'array', items: { type: 'string' } },
                },
                deep_nested_array: {
                  type: 'array',
                  items: { type: 'array', items: { type: 'array', items: { type: 'number' } } },
                },
                first_element_fixed: { type: 'array', items: { type: 'string' }, minItems: 1 },
                optional_array: { type: 'array', items: { type: 'string' } },
                optional_elements_array: { type: 'array', items: { type: 'string' } },
                min5_array: { type: 'array', items: { type: 'string' }, minItems: 5 },
                max5_array: { type: 'array', items: { type: 'string' }, maxItems: 5 },
                length5_array: {
                  type: 'array',
                  items: { type: 'string' },
                  minLength: 5,
                  maxLength: 5,
                },
                nonempty_array: { type: 'array', items: { type: 'string' }, minItems: 1 },
                unique_array: { type: 'array', items: { type: 'string' } },
                mixed_array: {
                  type: 'array',
                  items: { anyOf: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }] },
                },
                object_array: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', minimum: 0, exclusiveMinimum: true },
                      name: { type: 'string' },
                      active: { type: 'boolean' },
                    },
                    required: ['id', 'name'],
                  },
                },
                fixed_values_array: {
                  type: 'array',
                  items: { type: 'string', enum: ['small', 'medium', 'large'] },
                },
                email_array: { type: 'array', items: { type: 'string', format: 'email' } },
                sorted_number_array: { type: 'array', items: { type: 'number' } },
                at_least_one_even_number: { type: 'array', items: { type: 'number' } },
              },
            }),
        },
      },
    },
  },
})
