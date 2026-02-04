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

type DeclarationKind = 'variable' | 'type' | 'interface'

const createDeclaration = (
  name: string,
  fullText: string,
  refs: readonly string[],
  kind: DeclarationKind,
) => ({
  name,
  fullText,
  refs,
  kind,
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

const getDeclarationKind = (statement: ts.Statement): DeclarationKind | undefined => {
  if (ts.isVariableStatement(statement)) return 'variable'
  if (ts.isTypeAliasDeclaration(statement)) return 'type'
  if (ts.isInterfaceDeclaration(statement)) return 'interface'
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
  selfKind: DeclarationKind,
): readonly string[] => {
  if (isLazySchema(statement)) return []

  const identifiers = collectIdentifiers(statement)
  // Filter out self-references, but allow references to same-named declarations of different kind
  // e.g., type TestSchema can reference const TestSchema
  return [
    ...new Set(
      identifiers.filter((id) => {
        if (!declNames.has(id)) return false
        // If same name but different kind (e.g., type referencing variable), allow it
        // For self-reference check, we only exclude if it's exactly the same declaration
        // However, at this point we don't have kind info for the referenced decl
        // So we need to check if this is a type/interface referencing a variable with same name
        if (id === selfName && (selfKind === 'type' || selfKind === 'interface')) {
          // Type/interface can reference variable with same name, so don't exclude
          return true
        }
        return id !== selfName
      }),
    ),
  ]
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
      const kind = getDeclarationKind(statement)
      if (!(name && kind)) return undefined

      const fullText = statement.getText(sourceFile)
      const refs = getStatementReferences(statement, declNames, name, kind)

      return createDeclaration(name, fullText, refs, kind)
    })
    .filter((d): d is ReturnType<typeof createDeclaration> => d !== undefined)
}

const topoSort = (
  decls: readonly ReturnType<typeof createDeclaration>[],
): readonly ReturnType<typeof createDeclaration>[] => {
  // Use composite key (kind:name) to distinguish const and type with same name
  const makeKey = (kind: DeclarationKind, name: string): string => `${kind}:${name}`
  const map = new Map(decls.map((d) => [makeKey(d.kind, d.name), d]))

  // For dependency resolution, prefer variable declarations (since types reference variables)
  const findByName = (name: string): ReturnType<typeof createDeclaration> | undefined =>
    map.get(makeKey('variable', name)) ??
    map.get(makeKey('type', name)) ??
    map.get(makeKey('interface', name))

  const visit = (
    key: string,
    state: {
      readonly sorted: readonly ReturnType<typeof createDeclaration>[]
      readonly perm: ReadonlySet<string>
      readonly temp: ReadonlySet<string>
    },
  ): typeof state => {
    if (state.perm.has(key) || state.temp.has(key)) return state
    const decl = map.get(key)
    if (!decl) return state

    const withTemp: typeof state = { ...state, temp: new Set([...state.temp, key]) }
    const afterRefs = decl.refs
      .map((ref) => findByName(ref))
      .filter((d): d is ReturnType<typeof createDeclaration> => d !== undefined)
      .reduce((s, d) => visit(makeKey(d.kind, d.name), s), withTemp)

    return {
      sorted: [...afterRefs.sorted, decl],
      perm: new Set([...afterRefs.perm, key]),
      temp: new Set([...afterRefs.temp].filter((t) => t !== key)),
    }
  }

  const initial: Parameters<typeof visit>[1] = { sorted: [], perm: new Set(), temp: new Set() }
  return decls.reduce((state, d) => visit(makeKey(d.kind, d.name), state), initial).sorted
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
