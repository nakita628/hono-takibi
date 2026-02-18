import { describe, expect, it } from 'vitest'
import { analyzeCircularSchemas, ast } from './ast.js'

describe('ast', () => {
  it.concurrent('should sort User API schemas by dependency order', () => {
    // Based on fixtures/generate/openapi/29-practical-user-api.yaml
    // UserListResponse depends on User and Pagination
    const input = `const UserListResponseSchema = z.object({
  data: z.array(UserSchema),
  pagination: PaginationSchema
})
const PaginationSchema = z.object({
  page: z.int32(),
  limit: z.int32(),
  total: z.int32(),
  totalPages: z.int32()
})
const UserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string(),
  status: z.enum(["active", "inactive", "suspended"])
})`
    const result = ast(input)
    // UserSchema and PaginationSchema should come before UserListResponseSchema
    expect(result.indexOf('UserSchema')).toBeLessThan(result.indexOf('UserListResponseSchema'))
    expect(result.indexOf('PaginationSchema')).toBeLessThan(
      result.indexOf('UserListResponseSchema'),
    )
  })

  it.concurrent('should sort AuthResponse with nested User dependency', () => {
    // Based on fixtures/generate/openapi/29-practical-user-api.yaml
    const input = `const AuthResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.int32(),
  user: UserSchema
})
const UserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string()
})`
    const result = ast(input)
    expect(result.indexOf('UserSchema')).toBeLessThan(result.indexOf('AuthResponseSchema'))
  })

  it.concurrent('should return original code when only imports', () => {
    const input = `import { z } from "zod"
import { createRoute } from "@hono/zod-openapi"`
    const result = ast(input)
    expect(result).toBe(input)
  })

  it.concurrent('should handle Error schema with nested details array', () => {
    // Based on fixtures/generate/openapi/29-practical-user-api.yaml Error schema
    const input = `const ErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.array(ErrorDetailSchema).optional()
})
const ErrorDetailSchema = z.object({
  field: z.string(),
  message: z.string()
})`
    const result = ast(input)
    expect(result.indexOf('ErrorDetailSchema')).toBeLessThan(result.indexOf('ErrorSchema'))
  })

  it.concurrent('should handle z.lazy for TreeNode self-reference', () => {
    // Based on fixtures/generate/openapi/14-circular-refs.yaml TreeNode
    const input = `const TreeNodeSchema = z.lazy(() => z.object({
  id: z.uuid(),
  value: z.string(),
  parent: TreeNodeSchema.optional(),
  children: z.array(TreeNodeSchema).optional()
}))`
    const result = ast(input)
    // z.lazy schemas should not be reordered (no dependency tracking)
    expect(result).toBe(input)
  })

  it.concurrent('should sort type aliases for API types', () => {
    const input = `type UserListResponse = z.infer<typeof UserListResponseSchema>
type User = z.infer<typeof UserSchema>
type Pagination = z.infer<typeof PaginationSchema>`
    const result = ast(input)
    // Type aliases have no dependencies on each other, order is preserved
    expect(result).toBe(`type UserListResponse = z.infer<typeof UserListResponseSchema>\n\ntype User = z.infer<typeof UserSchema>\n\ntype Pagination = z.infer<typeof PaginationSchema>`)
  })

  it.concurrent('should preserve both const and type when name ends with Schema', () => {
    // Bug fix: When schema name ends with "Schema", both const and type should be preserved
    // Previously, topoSort used only name as Map key, causing type to overwrite const
    const input = `export const MergedSchema = z.object({
  id: z.string(),
  name: z.string()
}).openapi('Merged')

export type MergedSchema = z.infer<typeof MergedSchema>`
    const result = ast(input)
    // Both const and type should be present, const before type
    expect(result).toBe(`export const MergedSchema = z.object({
  id: z.string(),
  name: z.string()
}).openapi('Merged')

export type MergedSchema = z.infer<typeof MergedSchema>`)
  })

  it.concurrent('should handle multiple schema names ending with Schema', () => {
    // Multiple schemas with names ending in "Schema"
    const input = `export const DataSchema = z.object({ value: z.string() }).openapi('Data')
export type DataSchema = z.infer<typeof DataSchema>
export const UserSchema = z.object({ name: z.string() }).openapi('User')
export type UserSchema = z.infer<typeof UserSchema>
export const ConfigSchema = z.object({ DataSchema, UserSchema }).openapi('Config')
export type ConfigSchema = z.infer<typeof ConfigSchema>`
    const result = ast(input)
    // All 6 declarations should be present
    expect((result.match(/export const/g) || []).length).toBe(3)
    expect((result.match(/export type/g) || []).length).toBe(3)
    // Dependencies should be sorted correctly
    expect(result.indexOf('const DataSchema')).toBeLessThan(result.indexOf('const ConfigSchema'))
    expect(result.indexOf('const UserSchema')).toBeLessThan(result.indexOf('const ConfigSchema'))
  })

  it.concurrent('should sort const before type when type references const with same name', () => {
    // Type references its own const with same name
    const input = `export type TestSchema = z.infer<typeof TestSchema>
export const TestSchema = z.string()`
    const result = ast(input)
    // const should come before type
    expect(result.indexOf('const TestSchema')).toBeLessThan(result.indexOf('type TestSchema'))
  })
})

describe('analyzeCircularSchemas', () => {
  it.concurrent('should detect SocialUser <-> UserProfile mutual reference', () => {
    // Based on fixtures/generate/openapi/14-circular-refs.yaml
    const schemas = {
      SocialUser: {
        type: 'object',
        required: ['id', 'username'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          username: { type: 'string' },
          profile: { $ref: '#/components/schemas/UserProfile' },
          followers: {
            type: 'array',
            items: { $ref: '#/components/schemas/SocialUser' },
          },
        },
      },
      UserProfile: {
        type: 'object',
        properties: {
          bio: { type: 'string' },
          avatar: { type: 'string', format: 'uri' },
          user: { $ref: '#/components/schemas/SocialUser' },
        },
      },
    } as const
    const result = analyzeCircularSchemas(schemas, ['SocialUser', 'UserProfile'])
    expect(result.cyclicSchemas.has('SocialUser')).toBe(true)
    expect(result.cyclicSchemas.has('UserProfile')).toBe(true)
  })

  it.concurrent('should not mark User API schemas as cyclic', () => {
    // Based on fixtures/generate/openapi/29-practical-user-api.yaml
    const schemas = {
      User: {
        type: 'object',
        required: ['id', 'email', 'name', 'status', 'createdAt'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          email: { type: 'string', format: 'email' },
          name: { type: 'string' },
          status: { type: 'string', enum: ['active', 'inactive', 'suspended'] },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      UserListResponse: {
        type: 'object',
        required: ['data', 'pagination'],
        properties: {
          data: { type: 'array', items: { $ref: '#/components/schemas/User' } },
          pagination: { $ref: '#/components/schemas/Pagination' },
        },
      },
      Pagination: {
        type: 'object',
        required: ['page', 'limit', 'total', 'totalPages'],
        properties: {
          page: { type: 'integer' },
          limit: { type: 'integer' },
          total: { type: 'integer' },
          totalPages: { type: 'integer' },
        },
      },
    } as const
    const result = analyzeCircularSchemas(schemas, ['User', 'UserListResponse', 'Pagination'])
    expect(result.cyclicSchemas.has('User')).toBe(false)
    expect(result.cyclicSchemas.has('UserListResponse')).toBe(false)
    expect(result.cyclicSchemas.has('Pagination')).toBe(false)
  })

  it.concurrent('should generate correct zSchemaMap for User schema', () => {
    // Schema without required to keep output simple
    const schemas = {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          email: { type: 'string', format: 'email' },
        },
      },
    } as const
    const result = analyzeCircularSchemas(schemas, ['User'])
    expect(result.zSchemaMap.get('User')).toBe(
      'z.object({id:z.uuid().exactOptional(),email:z.email().exactOptional()})',
    )
  })

  it.concurrent('should track AuthResponse -> User dependency', () => {
    // Based on fixtures/generate/openapi/29-practical-user-api.yaml
    const schemas = {
      AuthResponse: {
        type: 'object',
        required: ['accessToken', 'refreshToken', 'user'],
        properties: {
          accessToken: { type: 'string' },
          refreshToken: { type: 'string' },
          expiresIn: { type: 'integer' },
          user: { $ref: '#/components/schemas/User' },
        },
      },
      User: {
        type: 'object',
        required: ['id', 'email'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          email: { type: 'string', format: 'email' },
        },
      },
    } as const
    const result = analyzeCircularSchemas(schemas, ['AuthResponse', 'User'])
    expect(result.depsMap.get('AuthResponse')).toStrictEqual(['UserSchema'])
    expect(result.depsMap.get('User')).toStrictEqual([])
  })

  it.concurrent('should detect Graph cycle: GraphNode <-> GraphEdge', () => {
    // Based on fixtures/generate/openapi/14-circular-refs.yaml
    const schemas = {
      GraphNode: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' },
          data: { type: 'object' },
          edges: {
            type: 'array',
            items: { $ref: '#/components/schemas/GraphEdge' },
          },
        },
      },
      GraphEdge: {
        type: 'object',
        required: ['source', 'target'],
        properties: {
          id: { type: 'string' },
          source: { $ref: '#/components/schemas/GraphNode' },
          target: { $ref: '#/components/schemas/GraphNode' },
          weight: { type: 'number' },
        },
      },
    } as const
    const result = analyzeCircularSchemas(schemas, ['GraphNode', 'GraphEdge'])
    expect(result.cyclicSchemas.has('GraphNode')).toBe(true)
    expect(result.cyclicSchemas.has('GraphEdge')).toBe(true)
  })

  it.concurrent('should include EdgeMetadata in extendedCyclicSchemas', () => {
    // Based on fixtures/generate/openapi/14-circular-refs.yaml
    const schemas = {
      GraphNode: {
        type: 'object',
        properties: {
          edges: {
            type: 'array',
            items: { $ref: '#/components/schemas/GraphEdge' },
          },
        },
      },
      GraphEdge: {
        type: 'object',
        properties: {
          source: { $ref: '#/components/schemas/GraphNode' },
          metadata: { $ref: '#/components/schemas/EdgeMetadata' },
        },
      },
      EdgeMetadata: {
        type: 'object',
        properties: {
          label: { type: 'string' },
        },
      },
    } as const
    const result = analyzeCircularSchemas(schemas, ['GraphNode', 'GraphEdge', 'EdgeMetadata'])
    // GraphNode and GraphEdge form a cycle
    expect(result.cyclicSchemas.has('GraphNode')).toBe(true)
    expect(result.cyclicSchemas.has('GraphEdge')).toBe(true)
    // EdgeMetadata is not cyclic
    expect(result.cyclicSchemas.has('EdgeMetadata')).toBe(false)
    // EdgeMetadata is extended because GraphEdge depends on it
    expect(result.extendedCyclicSchemas.has('EdgeMetadata')).toBe(true)
  })

  it.concurrent('should detect Comment -> CommentAuthor -> Comment indirect cycle', () => {
    // Based on fixtures/generate/openapi/14-circular-refs.yaml
    const schemas = {
      Comment: {
        type: 'object',
        required: ['id', 'content'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          content: { type: 'string' },
          author: { $ref: '#/components/schemas/CommentAuthor' },
          replies: {
            type: 'array',
            items: { $ref: '#/components/schemas/Comment' },
          },
        },
      },
      CommentAuthor: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          recentComments: {
            type: 'array',
            items: { $ref: '#/components/schemas/Comment' },
          },
        },
      },
    } as const
    const result = analyzeCircularSchemas(schemas, ['Comment', 'CommentAuthor'])
    expect(result.cyclicSchemas.has('Comment')).toBe(true)
    expect(result.cyclicSchemas.has('CommentAuthor')).toBe(true)
  })
})
