import { createRoute, z } from '@hono/zod-openapi'

export const WidgetBaseSchema = z
  .object({ id: z.string(), weight: z.number().int(), color: z.enum(['red', 'blue']) })
  .openapi('WidgetBase')

export type WidgetBase = z.infer<typeof WidgetBaseSchema>

export const LightWidgetSchema = WidgetBaseSchema.openapi('LightWidget')

export type LightWidget = z.infer<typeof LightWidgetSchema>

export const HeavyWidgetSchema = WidgetBaseSchema.openapi('HeavyWidget')

export type HeavyWidget = z.infer<typeof HeavyWidgetSchema>

export const WidgetHeavySchema = z
  .object({ kind: z.literal('heavy'), value: HeavyWidgetSchema })
  .openapi('WidgetHeavy')

export type WidgetHeavy = z.infer<typeof WidgetHeavySchema>

export const WidgetLightSchema = z
  .object({ kind: z.literal('light'), value: LightWidgetSchema })
  .openapi('WidgetLight')

export type WidgetLight = z.infer<typeof WidgetLightSchema>

export const WidgetSchema = z.union([WidgetHeavySchema, WidgetLightSchema]).openapi('Widget')

export type Widget = z.infer<typeof WidgetSchema>

export const ErrorSchema = z
  .object({ code: z.number().int(), message: z.string() })
  .openapi('Error')

export type Error = z.infer<typeof ErrorSchema>

export const WidgetKindSchema = z.enum(['Heavy', 'Light']).openapi('WidgetKind')

export type WidgetKind = z.infer<typeof WidgetKindSchema>

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
