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
 *     E --> F["Return CircularAnalysis"]
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
  const result: ts.Node[] = []
  ts.forEachChild(node, (child) => {
    result.push(child)
  })
  return result
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
  readonly indices: ReadonlyMap<string, number>
  readonly lowLinks: ReadonlyMap<string, number>
  readonly onStack: ReadonlySet<string>
  readonly stack: readonly string[]
  readonly sccs: readonly (readonly string[])[]
  readonly index: number
}

const createInitialState = (): TarjanState => ({
  indices: new Map(),
  lowLinks: new Map(),
  onStack: new Set(),
  stack: [],
  sccs: [],
  index: 0,
})

const popStackUntil = (
  stack: readonly string[],
  onStack: ReadonlySet<string>,
  name: string,
): {
  readonly scc: readonly string[]
  readonly newStack: readonly string[]
  readonly newOnStack: ReadonlySet<string>
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
  const indices: ReadonlyMap<string, number> = new Map(state.indices).set(name, currentIndex)
  const lowLinks: ReadonlyMap<string, number> = new Map(state.lowLinks).set(name, currentIndex)
  const stack: readonly string[] = [...state.stack, name]
  const onStack: ReadonlySet<string> = new Set([...state.onStack, name])

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
      const updatedLowLinks: ReadonlyMap<string, number> = new Map(afterConnect.lowLinks).set(
        name,
        newLowLink,
      )
      return { ...afterConnect, lowLinks: updatedLowLinks }
    }
    if (s.onStack.has(depName)) {
      const newLowLink = Math.min(s.lowLinks.get(name) ?? 0, s.indices.get(depName) ?? 0)
      const updatedLowLinks: ReadonlyMap<string, number> = new Map(s.lowLinks).set(name, newLowLink)
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
 * Result of circular dependency analysis.
 *
 * ```mermaid
 * classDiagram
 *   class CircularAnalysis {
 *     +zSchemaMap: Map~string, string~
 *     +depsMap: Map~string, string[]~
 *     +cyclicSchemas: Set~string~
 *     +extendedCyclicSchemas: Set~string~
 *     +cyclicGroupPascal: Set~string~
 *     +varNameToName: Map~string, string~
 *   }
 * ```
 */
export interface CircularAnalysis {
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
 * @returns CircularAnalysis containing dependency information
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
): CircularAnalysis {
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

type Declaration = {
  readonly name: string
  readonly fullText: string
  readonly refs: readonly string[]
}

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

const parseStatements = (sourceFile: ts.SourceFile): readonly Declaration[] => {
  const statements = sourceFile.statements.filter(
    (s) =>
      ts.isVariableStatement(s) || ts.isTypeAliasDeclaration(s) || ts.isInterfaceDeclaration(s),
  )

  const declNames = new Set(
    statements.map(getDeclarationName).filter((n): n is string => n !== undefined),
  )

  return statements
    .map((statement): Declaration | undefined => {
      const name = getDeclarationName(statement)
      if (!name) return undefined

      const fullText = statement.getText(sourceFile)
      const refs = getStatementReferences(statement, declNames, name)

      return { name, fullText, refs }
    })
    .filter((d): d is Declaration => d !== undefined)
}

const topoSort = (decls: readonly Declaration[]): readonly Declaration[] => {
  const map = new Map(decls.map((d) => [d.name, d]))

  type State = {
    readonly sorted: readonly Declaration[]
    readonly perm: ReadonlySet<string>
    readonly temp: ReadonlySet<string>
  }

  const visit = (name: string, state: State): State => {
    if (state.perm.has(name) || state.temp.has(name)) return state
    const decl = map.get(name)
    if (!decl) return state

    const withTemp: State = { ...state, temp: new Set([...state.temp, name]) }
    const afterRefs = decl.refs
      .filter((ref) => map.has(ref))
      .reduce((s, ref) => visit(ref, s), withTemp)

    return {
      sorted: [...afterRefs.sorted, decl],
      perm: new Set([...afterRefs.perm, name]),
      temp: new Set([...afterRefs.temp].filter((t) => t !== name)),
    }
  }

  const initial: State = { sorted: [], perm: new Set(), temp: new Set() }
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
