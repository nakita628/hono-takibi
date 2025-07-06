import { createRoute, z } from '@hono/zod-openapi'

const WidgetBaseSchema = z
  .object({ id: z.string(), weight: z.int32(), color: z.enum(['red', 'blue']) })
  .openapi('WidgetBase')

const LightWidgetSchema = WidgetBaseSchema.openapi('LightWidget')

const HeavyWidgetSchema = WidgetBaseSchema.openapi('HeavyWidget')

const WidgetHeavySchema = z
  .object({ kind: z.literal('heavy'), value: HeavyWidgetSchema })
  .openapi('WidgetHeavy')

const WidgetLightSchema = z
  .object({ kind: z.literal('light'), value: LightWidgetSchema })
  .openapi('WidgetLight')

const WidgetSchema = z.union([WidgetHeavySchema, WidgetLightSchema]).openapi('Widget')

const ErrorSchema = z.object({ code: z.int32(), message: z.string() }).openapi('Error')

const WidgetKindSchema = z.enum(['Heavy', 'Light']).openapi('WidgetKind')

export const getIdRoute = createRoute({
  method: 'get',
  path: '/{id}',
  operationId: 'read',
  request: {
    params: z.object({
      id: z.string().openapi({ param: { in: 'path', name: 'id', required: true } }),
    }),
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: WidgetSchema } },
    },
    default: {
      description: 'An unexpected error response.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})
