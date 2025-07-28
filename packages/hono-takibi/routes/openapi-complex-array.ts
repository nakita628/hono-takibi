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
          schema: z.object({
            string_array: z.array(z.string()),
            number_array: z.array(z.number()),
            boolean_array: z.array(z.boolean()),
            nested_array: z.array(z.array(z.string())),
            deep_nested_array: z.array(z.array(z.array(z.number()))),
            first_element_fixed: z.array(z.string()).min(1),
            optional_array: z.array(z.string()).optional(),
            optional_elements_array: z.array(z.string()),
            min5_array: z.array(z.string()).min(5),
            max5_array: z.array(z.string()).max(5),
            length5_array: z.array(z.string()),
            nonempty_array: z.array(z.string()).min(1),
            unique_array: z.array(z.string()),
            mixed_array: z.array(z.union([z.string(), z.number(), z.boolean()])),
            object_array: z.array(
              z.object({
                id: z.int().positive(),
                name: z.string(),
                active: z.boolean().optional(),
              }),
            ),
            fixed_values_array: z.array(z.enum(['small', 'medium', 'large'])),
            email_array: z.array(z.email()),
            sorted_number_array: z.array(z.number()),
            at_least_one_even_number: z.array(z.number()),
          }),
        },
      },
    },
  },
})
