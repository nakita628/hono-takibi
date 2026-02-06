import { createRoute, z } from '@hono/zod-openapi'

type TreeNodeType = {
  readonly id: number
  readonly value: string
  readonly children?: readonly TreeNodeType[]
}

const NodeBSchema: z.ZodType<NodeBType> = z
  .lazy(() =>
    z.object({ id: z.int(), ref: NodeCSchema.exactOptional() }).openapi({ required: ['id'] }),
  )
  .readonly()
  .openapi('NodeB')

type NodeAType = { readonly id: number; readonly ref?: z.infer<typeof NodeBSchema> }

const NodeCSchema: z.ZodType<NodeCType> = z
  .lazy(() =>
    z.object({ id: z.int(), ref: NodeASchema.exactOptional() }).openapi({ required: ['id'] }),
  )
  .readonly()
  .openapi('NodeC')

type NodeBType = { readonly id: number; readonly ref?: z.infer<typeof NodeCSchema> }

const NodeASchema: z.ZodType<NodeAType> = z
  .lazy(() =>
    z.object({ id: z.int(), ref: NodeBSchema.exactOptional() }).openapi({ required: ['id'] }),
  )
  .readonly()
  .openapi('NodeA')

type NodeCType = { readonly id: number; readonly ref?: z.infer<typeof NodeASchema> }

const TreeNodeSchema: z.ZodType<TreeNodeType> = z
  .lazy(() =>
    z
      .object({ id: z.int(), value: z.string(), children: z.array(TreeNodeSchema).exactOptional() })
      .openapi({ required: ['id', 'value'] }),
  )
  .readonly()
  .openapi('TreeNode')

export const getTreeRoute = createRoute({
  method: 'get',
  path: '/tree',
  operationId: 'getTree',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: TreeNodeSchema } } },
  },
} as const)

export const postTreeRoute = createRoute({
  method: 'post',
  path: '/tree',
  operationId: 'createTree',
  request: {
    body: { content: { 'application/json': { schema: TreeNodeSchema } }, required: true },
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: TreeNodeSchema } } },
  },
} as const)

export const getGraphRoute = createRoute({
  method: 'get',
  path: '/graph',
  operationId: 'getGraph',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: NodeASchema } } },
  },
} as const)
