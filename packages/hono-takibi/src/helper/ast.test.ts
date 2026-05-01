import { describe, expect, it } from 'vite-plus/test'

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
    expect(ast(input)).toBe(`const UserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string(),
  status: z.enum(["active", "inactive", "suspended"])
})

const PaginationSchema = z.object({
  page: z.int32(),
  limit: z.int32(),
  total: z.int32(),
  totalPages: z.int32()
})

const UserListResponseSchema = z.object({
  data: z.array(UserSchema),
  pagination: PaginationSchema
})`)
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
    expect(ast(input)).toBe(`const UserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string()
})

const AuthResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.int32(),
  user: UserSchema
})`)
  })

  it.concurrent('should return original code when only imports', () => {
    const input = `import { z } from "zod"
import { createRoute } from "@hono/zod-openapi"`
    expect(ast(input)).toBe(input)
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
    expect(ast(input)).toBe(`const ErrorDetailSchema = z.object({
  field: z.string(),
  message: z.string()
})

const ErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.array(ErrorDetailSchema).optional()
})`)
  })

  it.concurrent('should handle z.lazy for TreeNode self-reference', () => {
    // Based on fixtures/generate/openapi/14-circular-refs.yaml TreeNode
    const input = `const TreeNodeSchema = z.lazy(() => z.object({
  id: z.uuid(),
  value: z.string(),
  parent: TreeNodeSchema.optional(),
  children: z.array(TreeNodeSchema).optional()
}))`
    // z.lazy schemas should not be reordered (no dependency tracking)
    expect(ast(input)).toBe(input)
  })

  it.concurrent('should sort type aliases for API types', () => {
    const input = `type UserListResponse = z.infer<typeof UserListResponseSchema>
type User = z.infer<typeof UserSchema>
type Pagination = z.infer<typeof PaginationSchema>`
    // Type aliases have no dependencies on each other, order is preserved
    expect(ast(input)).toBe(
      'type UserListResponse = z.infer<typeof UserListResponseSchema>\n\ntype User = z.infer<typeof UserSchema>\n\ntype Pagination = z.infer<typeof PaginationSchema>',
    )
  })

  it.concurrent('should preserve both const and type when name ends with Schema', () => {
    // Bug fix: When schema name ends with "Schema", both const and type should be preserved
    // Previously, topoSort used only name as Map key, causing type to overwrite const
    const input = `export const MergedSchema = z.object({
  id: z.string(),
  name: z.string()
}).openapi('Merged')

export type MergedSchema = z.infer<typeof MergedSchema>`
    // Both const and type should be present, const before type
    expect(ast(input)).toBe(`export const MergedSchema = z.object({
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
    expect(ast(input))
      .toBe(`export const DataSchema = z.object({ value: z.string() }).openapi('Data')

export type DataSchema = z.infer<typeof DataSchema>

export const UserSchema = z.object({ name: z.string() }).openapi('User')

export type UserSchema = z.infer<typeof UserSchema>

export const ConfigSchema = z.object({ DataSchema, UserSchema }).openapi('Config')

export type ConfigSchema = z.infer<typeof ConfigSchema>`)
  })

  it.concurrent('should sort const before type when type references const with same name', () => {
    // Type references its own const with same name
    const input = `export type TestSchema = z.infer<typeof TestSchema>
export const TestSchema = z.string()`
    expect(ast(input)).toBe(`export const TestSchema = z.string()

export type TestSchema = z.infer<typeof TestSchema>`)
  })

  it.concurrent('should sort const followed by its type alias', () => {
    const input = `export type User = z.infer<typeof UserSchema>
export const UserSchema = z.object({ id: z.string(), name: z.string() })`
    expect(ast(input))
      .toBe(`export const UserSchema = z.object({ id: z.string(), name: z.string() })

export type User = z.infer<typeof UserSchema>`)
  })

  it.concurrent('should preserve order when no dependencies exist', () => {
    const input = `const ASchema = z.string()
const BSchema = z.number()`
    expect(ast(input)).toBe(`const ASchema = z.string()

const BSchema = z.number()`)
  })

  it.concurrent('should return empty string for empty input', () => {
    expect(ast('')).toBe('')
  })

  it.concurrent('should return single declaration unchanged', () => {
    expect(ast('const FooSchema = z.string()')).toBe('const FooSchema = z.string()')
  })

  it.concurrent('should preserve chained .openapi() calls verbatim', () => {
    const input = `const UserSchema = z
  .object({ id: z.string() })
  .openapi({ required: ['id'] })
  .openapi('User')`
    expect(ast(input)).toBe(input)
  })

  it.concurrent('should sort interface declarations by extends dependency', () => {
    const input = `interface User extends Base { name: string }
interface Base { id: string }`
    expect(ast(input)).toBe(`interface Base { id: string }

interface User extends Base { name: string }`)
  })

  it.concurrent('should sort type alias chain bottom-up', () => {
    const input = `type C = B
type B = A
type A = string`
    expect(ast(input)).toBe(`type A = string

type B = A

type C = B`)
  })

  it.concurrent('should handle mixed const, type, and interface declarations', () => {
    const input = `interface Foo { x: string }
type Bar = z.infer<typeof BarSchema>
const BarSchema = z.object({ name: z.string() })`
    expect(ast(input)).toBe(`interface Foo { x: string }

const BarSchema = z.object({ name: z.string() })

type Bar = z.infer<typeof BarSchema>`)
  })

  it.concurrent('should skip function declarations and only keep declarations', () => {
    const input = `function foo() { return 1 }
const BarSchema = z.string()
type Bar = z.infer<typeof BarSchema>`
    expect(ast(input)).toBe(`const BarSchema = z.string()

type Bar = z.infer<typeof BarSchema>`)
  })

  it.concurrent('should skip expression statements and only keep declarations', () => {
    const input = `console.log('hi')
const FooSchema = z.string()`
    expect(ast(input)).toBe('const FooSchema = z.string()')
  })

  it.concurrent('should preserve const+type pairs across schemas with deps', () => {
    const input = `export const FooSchema = z.object({ x: z.string() })
export type Foo = z.infer<typeof FooSchema>
export const BarSchema = z.object({ foo: FooSchema })
export type Bar = z.infer<typeof BarSchema>`
    expect(ast(input)).toBe(`export const FooSchema = z.object({ x: z.string() })

export type Foo = z.infer<typeof FooSchema>

export const BarSchema = z.object({ foo: FooSchema })

export type Bar = z.infer<typeof BarSchema>`)
  })

  it.concurrent('should strip JSDoc leading comments (current behavior)', () => {
    // KNOWN LIMITATION: ast() uses statement.getText() which excludes leading trivia.
    // JSDoc comments attached to declarations are stripped during reordering.
    const input = `/**
 * User entity
 */
const UserSchema = z.object({ id: z.string() })`
    expect(ast(input)).toBe('const UserSchema = z.object({ id: z.string() })')
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
    expect(result.cyclicSchemas).toStrictEqual(new Set(['SocialUser', 'UserProfile']))
    expect(result.extendedCyclicSchemas).toStrictEqual(new Set(['SocialUser', 'UserProfile']))
    expect(result.cyclicGroupPascal).toStrictEqual(new Set(['SocialUser', 'UserProfile']))
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
    expect(result.cyclicSchemas).toStrictEqual(new Set())
    expect(result.extendedCyclicSchemas).toStrictEqual(new Set())
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
    expect(result.cyclicSchemas).toStrictEqual(new Set(['GraphNode', 'GraphEdge']))
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
    expect(result.cyclicSchemas).toStrictEqual(new Set(['GraphNode', 'GraphEdge']))
    // EdgeMetadata is extended because GraphEdge depends on it
    expect(result.extendedCyclicSchemas).toStrictEqual(
      new Set(['GraphNode', 'GraphEdge', 'EdgeMetadata']),
    )
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
    expect(result.cyclicSchemas).toStrictEqual(new Set(['Comment', 'CommentAuthor']))
  })

  it.concurrent('should detect 3-way cycle A -> B -> C -> A', () => {
    const schemas = {
      A: { type: 'object', properties: { b: { $ref: '#/components/schemas/B' } } },
      B: { type: 'object', properties: { c: { $ref: '#/components/schemas/C' } } },
      C: { type: 'object', properties: { a: { $ref: '#/components/schemas/A' } } },
    } as const
    const result = analyzeCircularSchemas(schemas, ['A', 'B', 'C'])
    expect(result.cyclicSchemas).toStrictEqual(new Set(['A', 'B', 'C']))
    expect(result.extendedCyclicSchemas).toStrictEqual(new Set(['A', 'B', 'C']))
  })

  it.concurrent('should not mark direct self-reference as cyclic (self-deps excluded; use z.lazy)', () => {
    // Self-references are excluded from depsMap by design — they should be
    // wrapped with z.lazy() at the generator level. analyzeCircularSchemas
    // only flags mutual references between distinct schemas.
    const schemas = {
      Self: {
        type: 'object',
        properties: { next: { $ref: '#/components/schemas/Self' } },
      },
    } as const
    const result = analyzeCircularSchemas(schemas, ['Self'])
    expect(result.cyclicSchemas).toStrictEqual(new Set())
    expect(result.depsMap.get('Self')).toStrictEqual([])
  })

  it.concurrent('should return empty maps for empty input', () => {
    const result = analyzeCircularSchemas({}, [])
    expect(result.cyclicSchemas).toStrictEqual(new Set())
    expect(result.extendedCyclicSchemas).toStrictEqual(new Set())
    expect(result.cyclicGroupPascal).toStrictEqual(new Set())
    expect([...result.depsMap.entries()]).toStrictEqual([])
    expect([...result.zSchemaMap.entries()]).toStrictEqual([])
  })

  it.concurrent('should compute zSchemaMap with readonly modifier when enabled', () => {
    const schemas = {
      User: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } },
      },
    } as const
    const withReadonly = analyzeCircularSchemas(schemas, ['User'], true)
    const withoutReadonly = analyzeCircularSchemas(schemas, ['User'], false)
    expect(withReadonly.zSchemaMap.get('User')).toBe(
      'z.object({id:z.string()}).readonly().openapi({"required":["id"]})',
    )
    expect(withoutReadonly.zSchemaMap.get('User')).toBe(
      'z.object({id:z.string()}).openapi({"required":["id"]})',
    )
  })

  it.concurrent('should expose varNameToName mapping in PascalCase Schema form', () => {
    const schemas = {
      'auth-user': { type: 'object', properties: {} },
      Order: { type: 'object', properties: {} },
    } as const
    const result = analyzeCircularSchemas(schemas, ['auth-user', 'Order'])
    expect(result.varNameToName.get('AuthUserSchema')).toBe('auth-user')
    expect(result.varNameToName.get('OrderSchema')).toBe('Order')
  })
})
