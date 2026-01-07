import ts from 'typescript'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import type { Schema } from '../openapi/index.js'
import { ensureSuffix, toIdentifierPascalCase } from '../utils/index.js'

// =============================================================================
// AST-based identifier extraction
// =============================================================================

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

export interface CircularAnalysis {
  readonly zSchemaMap: ReadonlyMap<string, string>
  readonly depsMap: ReadonlyMap<string, readonly string[]>
  readonly cyclicSchemas: ReadonlySet<string>
  readonly extendedCyclicSchemas: ReadonlySet<string>
  readonly cyclicGroupPascal: ReadonlySet<string>
  readonly varNameToName: ReadonlyMap<string, string>
}

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

export function ast(code: string): string {
  const sourceFile = createSourceFile(code)
  const decls = parseStatements(sourceFile)
  if (decls.length === 0) return code
  return topoSort(decls)
    .map((d) => d.fullText)
    .join('\n\n')
}
