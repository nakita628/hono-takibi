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
              string_array: z.array(z.string()),
              number_array: z.array(z.number()),
              boolean_array: z.array(z.boolean()),
              nested_array: z.array(z.array(z.string())),
              deep_nested_array: z.array(z.array(z.array(z.number()))),
              first_element_fixed: z.array(z.string()).min(1).openapi({ minItems: 1 }),
              optional_array: z.array(z.string()).exactOptional(),
              optional_elements_array: z.array(z.string()),
              min5_array: z.array(z.string()).min(5).openapi({ minItems: 5 }),
              max5_array: z.array(z.string()).max(5).openapi({ maxItems: 5 }),
              length5_array: z.array(z.string()),
              nonempty_array: z.array(z.string()).min(1).openapi({ minItems: 1 }),
              unique_array: z.array(z.string()),
              mixed_array: z.array(z.union([z.string(), z.number(), z.boolean()])),
              object_array: z.array(
                z
                  .object({
                    id: z.int().positive(),
                    name: z.string(),
                    active: z.boolean().exactOptional(),
                  })
                  .openapi({ required: ['id', 'name'] }),
              ),
              fixed_values_array: z.array(z.enum(['small', 'medium', 'large'])),
              email_array: z.array(z.email()),
              sorted_number_array: z.array(z.number()),
              at_least_one_even_number: z.array(z.number()),
            })
            .openapi({
              required: [
                'string_array',
                'number_array',
                'boolean_array',
                'nested_array',
                'deep_nested_array',
                'first_element_fixed',
                'optional_elements_array',
                'min5_array',
                'max5_array',
                'length5_array',
                'nonempty_array',
                'unique_array',
                'mixed_array',
                'object_array',
                'fixed_values_array',
                'email_array',
                'sorted_number_array',
                'at_least_one_even_number',
              ],
            }),
        },
      },
    },
  },
})
