/**
 * AST-based utilities for schema dependency analysis and topological sorting.
 *
 * This module provides:
 * - Circular dependency detection using Tarjan's algorithm
 * - Topological sorting for schema declarations
 * - AST-based identifier extraction
 *
 * ```mermaid
 * flowchart TD
 *   subgraph "Circular Analysis"
 *     A["analyzeCircularSchemas(schemas, names)"] --> B["Generate zod code for each schema"]
 *     B --> C["Extract identifier references"]
 *     C --> D["Build dependency graph"]
 *     D --> E["Run Tarjan's SCC algorithm"]
 *     E --> F["Return analysis result"]
 *   end
 *   subgraph "Topological Sort"
 *     G["ast(code)"] --> H["Parse TypeScript AST"]
 *     H --> I["Extract declarations"]
 *     I --> J["Analyze references"]
 *     J --> K["Topological sort"]
 *     K --> L["Return sorted code"]
 *   end
 * ```
 *
 * @module helper/ast
 */
import ts from 'typescript'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import type { Schema } from '../openapi/index.js'
import { ensureSuffix, toIdentifierPascalCase } from '../utils/index.js'

// =============================================================================
// AST-based identifier extraction
// =============================================================================

/**
 * Creates a TypeScript source file from code string.
 *
 * @param code - TypeScript code to parse
 * @returns Parsed TypeScript SourceFile
 */
const createSourceFile = (code: string): ts.SourceFile =>
  ts.createSourceFile('temp.ts', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

const getChildren = (node: ts.Node): readonly ts.Node[] => {
  const syntaxChildren = node.getChildren()
  if (syntaxChildren.length > 0) return syntaxChildren
  const semanticChildren: ts.Node[] = []
  ts.forEachChild(node, (child) => {
    semanticChildren[semanticChildren.length] = child
  })
  return semanticChildren
}

const collectIdentifiers = (node: ts.Node): readonly string[] => {
  const visit = (n: ts.Node): readonly string[] => {
    const current = ts.isIdentifier(n) ? [n.text] : []
    const children = getChildren(n).flatMap(visit)
    return [...current, ...children]
  }
  return visit(node)
}

const extractIdentifiers = (code: string, varNames: ReadonlySet<string>): readonly string[] => {
  const sourceFile = createSourceFile(code)
  const allIdentifiers = collectIdentifiers(sourceFile)
  const found = new Set(allIdentifiers.filter((id) => varNames.has(id)))
  return [...found]
}

// =============================================================================
// Circular dependency analysis (Tarjan's algorithm)
// =============================================================================

type TarjanState = {
  readonly indices: Map<string, number>
  readonly lowLinks: Map<string, number>
  readonly onStack: Set<string>
  readonly stack: readonly string[]
  readonly sccs: readonly (readonly string[])[]
  readonly index: number
}

const createInitialState = (): TarjanState => ({
  indices: new Map<string, number>(),
  lowLinks: new Map<string, number>(),
  onStack: new Set<string>(),
  stack: [],
  sccs: [],
  index: 0,
})

const popStackUntil = (
  stack: readonly string[],
  onStack: Set<string>,
  name: string,
): {
  readonly scc: readonly string[]
  readonly newStack: readonly string[]
  readonly newOnStack: Set<string>
} => {
  const idx = stack.lastIndexOf(name)
  if (idx === -1) return { scc: [], newStack: stack, newOnStack: onStack }
  const scc = stack.slice(idx)
  const newStack = stack.slice(0, idx)
  const newOnStack = new Set([...onStack].filter((n) => !scc.includes(n)))
  return { scc, newStack, newOnStack }
}

const tarjanConnect = (
  name: string,
  deps: ReadonlyMap<string, readonly string[]>,
  var2name: ReadonlyMap<string, string>,
  state: TarjanState,
): TarjanState => {
  const currentIndex = state.index
  const indices = new Map(state.indices).set(name, currentIndex)
  const lowLinks = new Map(state.lowLinks).set(name, currentIndex)
  const stack: readonly string[] = [...state.stack, name]
  const onStack = new Set([...state.onStack, name])

  const initialState: TarjanState = {
    ...state,
    indices,
    lowLinks,
    stack,
    onStack,
    index: currentIndex + 1,
  }

  const afterDeps = (deps.get(name) ?? []).reduce<TarjanState>((s, depVar) => {
    const depName = var2name.get(depVar)
    if (depName === undefined) return s

    if (!s.indices.has(depName)) {
      const afterConnect = tarjanConnect(depName, deps, var2name, s)
      const newLowLink = Math.min(
        afterConnect.lowLinks.get(name) ?? 0,
        afterConnect.lowLinks.get(depName) ?? 0,
      )
      const updatedLowLinks = new Map(afterConnect.lowLinks).set(name, newLowLink)
      const result: TarjanState = { ...afterConnect, lowLinks: updatedLowLinks }
      return result
    }
    if (s.onStack.has(depName)) {
      const newLowLink = Math.min(s.lowLinks.get(name) ?? 0, s.indices.get(depName) ?? 0)
      const updatedLowLinks = new Map(s.lowLinks).set(name, newLowLink)
      // biome-ignore lint/performance/noAccumulatingSpread: Tarjan's algorithm requires immutable state updates; the graph size is typically small
      return { ...s, lowLinks: updatedLowLinks }
    }
    return s
  }, initialState)

  if (afterDeps.lowLinks.get(name) === afterDeps.indices.get(name)) {
    const { scc, newStack, newOnStack } = popStackUntil(afterDeps.stack, afterDeps.onStack, name)
    return {
      ...afterDeps,
      stack: newStack,
      onStack: newOnStack,
      sccs: [...afterDeps.sccs, scc],
    }
  }

  return afterDeps
}

const findCyclicSchemas = (
  names: readonly string[],
  deps: ReadonlyMap<string, readonly string[]>,
): ReadonlySet<string> => {
  const name2var = new Map(names.map((n) => [n, toIdentifierPascalCase(ensureSuffix(n, 'Schema'))]))
  const var2name = new Map(names.map((n) => [toIdentifierPascalCase(ensureSuffix(n, 'Schema')), n]))

  const finalState = names.reduce(
    (state, n) => (state.indices.has(n) ? state : tarjanConnect(n, deps, var2name, state)),
    createInitialState(),
  )

  return new Set(
    finalState.sccs.flatMap((scc) => {
      if (scc.length > 1) return [...scc]
      const single = scc[0]
      if (!single) return []
      const selfVar = name2var.get(single)
      return selfVar && (deps.get(single) ?? []).includes(selfVar) ? [single] : []
    }),
  )
}

/**
 * Analyzes OpenAPI schemas for circular dependencies using Tarjan's algorithm.
 *
 * This function:
 * 1. Generates Zod code for each schema
 * 2. Extracts identifier references from the code
 * 3. Builds a dependency graph
 * 4. Detects strongly connected components (cycles)
 *
 * ```mermaid
 * flowchart LR
 *   A["Schema A"] --> B["Schema B"]
 *   B --> C["Schema C"]
 *   C --> A
 *   D["Schema D"] --> B
 * ```
 *
 * In this example, A, B, C form a cycle. D depends on B but is not cyclic.
 *
 * @param schemas - Record of schema name to Schema definition
 * @param schemaNames - Array of schema names to analyze
 * @returns Analysis result containing dependency information
 *
 * @example
 * ```ts
 * const schemas = {
 *   User: { type: 'object', properties: { friend: { $ref: '#/components/schemas/User' } } }
 * }
 * const analysis = analyzeCircularSchemas(schemas, ['User'])
 * // analysis.cyclicSchemas contains 'User' (self-referential)
 * ```
 */
export function analyzeCircularSchemas(
  schemas: Record<string, Schema>,
  schemaNames: readonly string[],
): {
  /** Map from schema name to generated Zod code */
  readonly zSchemaMap: ReadonlyMap<string, string>
  /** Map from schema name to its dependency variable names */
  readonly depsMap: ReadonlyMap<string, readonly string[]>
  /** Set of schema names that are part of a cycle */
  readonly cyclicSchemas: ReadonlySet<string>
  /** Set of cyclic schemas plus their direct dependencies */
  readonly extendedCyclicSchemas: ReadonlySet<string>
  /** PascalCase versions of extended cyclic schemas */
  readonly cyclicGroupPascal: ReadonlySet<string>
  /** Map from variable name to original schema name */
  readonly varNameToName: ReadonlyMap<string, string>
} {
  const varNameSet = new Set(
    schemaNames.map((n) => toIdentifierPascalCase(ensureSuffix(n, 'Schema'))),
  )
  const varNameToName = new Map(
    schemaNames.map((n) => [toIdentifierPascalCase(ensureSuffix(n, 'Schema')), n]),
  )

  const zSchemaMap = new Map(schemaNames.map((n) => [n, zodToOpenAPI(schemas[n])]))

  const depsMap = new Map(
    schemaNames.map((n) => {
      const code = zSchemaMap.get(n) ?? ''
      const selfVar = toIdentifierPascalCase(ensureSuffix(n, 'Schema'))
      return [n, extractIdentifiers(code, varNameSet).filter((v) => v !== selfVar)]
    }),
  )

  const cyclicSchemas = findCyclicSchemas(schemaNames, depsMap)

  const extendedCyclicSchemas = new Set([
    ...cyclicSchemas,
    ...[...cyclicSchemas].flatMap((n) =>
      (depsMap.get(n) ?? [])
        .map((v) => varNameToName.get(v))
        .filter((x): x is string => x !== undefined),
    ),
  ])

  return {
    zSchemaMap,
    depsMap,
    cyclicSchemas,
    extendedCyclicSchemas,
    cyclicGroupPascal: new Set([...extendedCyclicSchemas].map(toIdentifierPascalCase)),
    varNameToName,
  }
}

// =============================================================================
// AST-based dependency sorting
// =============================================================================

const createDeclaration = (name: string, fullText: string, refs: readonly string[]) => ({
  name,
  fullText,
  refs,
})

const getDeclarationName = (statement: ts.Statement): string | undefined => {
  if (ts.isVariableStatement(statement)) {
    const declaration = statement.declarationList.declarations[0]
    return declaration && ts.isIdentifier(declaration.name) ? declaration.name.text : undefined
  }
  if (ts.isTypeAliasDeclaration(statement)) {
    return statement.name.text
  }
  if (ts.isInterfaceDeclaration(statement)) {
    return statement.name.text
  }
  return undefined
}

const isLazySchema = (statement: ts.Statement): boolean => {
  if (!ts.isVariableStatement(statement)) return false
  const declaration = statement.declarationList.declarations[0]
  if (!declaration?.initializer) return false

  const initText = declaration.initializer.getText()
  return /^z\.lazy\s*\(/.test(initText)
}

const getStatementReferences = (
  statement: ts.Statement,
  declNames: ReadonlySet<string>,
  selfName: string,
): readonly string[] => {
  if (isLazySchema(statement)) return []

  const identifiers = collectIdentifiers(statement)
  return [...new Set(identifiers.filter((id) => declNames.has(id) && id !== selfName))]
}

const parseStatements = (
  sourceFile: ts.SourceFile,
): readonly ReturnType<typeof createDeclaration>[] => {
  const statements = sourceFile.statements.filter(
    (s) =>
      ts.isVariableStatement(s) || ts.isTypeAliasDeclaration(s) || ts.isInterfaceDeclaration(s),
  )

  const declNames = new Set(
    statements.map(getDeclarationName).filter((n): n is string => n !== undefined),
  )

  return statements
    .map((statement): ReturnType<typeof createDeclaration> | undefined => {
      const name = getDeclarationName(statement)
      if (!name) return undefined

      const fullText = statement.getText(sourceFile)
      const refs = getStatementReferences(statement, declNames, name)

      return createDeclaration(name, fullText, refs)
    })
    .filter((d): d is ReturnType<typeof createDeclaration> => d !== undefined)
}

const topoSort = (
  decls: readonly ReturnType<typeof createDeclaration>[],
): readonly ReturnType<typeof createDeclaration>[] => {
  const map = new Map(decls.map((d) => [d.name, d]))

  const visit = (
    name: string,
    state: {
      readonly sorted: readonly ReturnType<typeof createDeclaration>[]
      readonly perm: ReadonlySet<string>
      readonly temp: ReadonlySet<string>
    },
  ): typeof state => {
    if (state.perm.has(name) || state.temp.has(name)) return state
    const decl = map.get(name)
    if (!decl) return state

    const withTemp: typeof state = { ...state, temp: new Set([...state.temp, name]) }
    const afterRefs = decl.refs
      .filter((ref) => map.has(ref))
      .reduce((s, ref) => visit(ref, s), withTemp)

    return {
      sorted: [...afterRefs.sorted, decl],
      perm: new Set([...afterRefs.perm, name]),
      temp: new Set([...afterRefs.temp].filter((t) => t !== name)),
    }
  }

  const initial: Parameters<typeof visit>[1] = { sorted: [], perm: new Set(), temp: new Set() }
  return decls.reduce((state, d) => visit(d.name, state), initial).sorted
}

/**
 * Sorts TypeScript declarations by dependency order using topological sort.
 *
 * Parses the given TypeScript code, extracts variable/type/interface declarations,
 * analyzes their dependencies, and returns the code with declarations reordered
 * so that dependencies appear before dependents.
 *
 * ```mermaid
 * flowchart TD
 *   A["Input: const B = A; const A = z.string();"] --> B["Parse AST"]
 *   B --> C["Extract declarations: B, A"]
 *   C --> D["Analyze refs: B depends on A"]
 *   D --> E["Topological sort: A, B"]
 *   E --> F["Output: const A = z.string(); const B = A;"]
 * ```
 *
 * @param code - TypeScript source code containing declarations
 * @returns Code with declarations sorted by dependency order
 *
 * @example
 * ```ts
 * const input = `
 *   const UserSchema = z.object({ name: NameSchema })
 *   const NameSchema = z.string()
 * `
 * const sorted = ast(input)
 * // Result:
 * // const NameSchema = z.string()
 * //
 * // const UserSchema = z.object({ name: NameSchema })
 * ```
 */
export function ast(code: string): string {
  const sourceFile = createSourceFile(code)
  const decls = parseStatements(sourceFile)
  if (decls.length === 0) return code
  return topoSort(decls)
    .map((d) => d.fullText)
    .join('\n\n')
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/helper/ast.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

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
      expect(result).toContain('UserListResponse')
      expect(result).toContain('User')
      expect(result).toContain('Pagination')
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
      expect(result.depsMap.get('AuthResponse')).toContain('UserSchema')
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
}
