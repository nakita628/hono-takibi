import ts from 'typescript'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import type { Schema } from '../openapi/index.js'
import { ensureSuffix, toIdentifierPascalCase } from '../utils/index.js'

// =============================================================================
// AST-based identifier extraction
// =============================================================================

const createSourceFile = (code: string): ts.SourceFile =>
  ts.createSourceFile('temp.ts', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

const collectIdentifiers = (node: ts.Node): readonly string[] => {
  const identifiers: string[] = []

  const visit = (n: ts.Node): void => {
    if (ts.isIdentifier(n)) {
      identifiers.push(n.text)
    }
    ts.forEachChild(n, visit)
  }

  visit(node)
  return identifiers
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
  readonly stack: string[]
  readonly sccs: string[][]
  index: number
}

const tarjanConnect = (
  name: string,
  deps: ReadonlyMap<string, readonly string[]>,
  var2name: ReadonlyMap<string, string>,
  state: TarjanState,
): void => {
  const currentIndex = state.index++
  state.indices.set(name, currentIndex)
  state.lowLinks.set(name, currentIndex)
  state.stack.push(name)
  state.onStack.add(name)

  for (const depVar of deps.get(name) ?? []) {
    const depName = var2name.get(depVar)
    if (depName === undefined) continue

    if (!state.indices.has(depName)) {
      tarjanConnect(depName, deps, var2name, state)
      state.lowLinks.set(
        name,
        Math.min(state.lowLinks.get(name) ?? 0, state.lowLinks.get(depName) ?? 0),
      )
    } else if (state.onStack.has(depName)) {
      state.lowLinks.set(
        name,
        Math.min(state.lowLinks.get(name) ?? 0, state.indices.get(depName) ?? 0),
      )
    }
  }

  if (state.lowLinks.get(name) === state.indices.get(name)) {
    const scc: string[] = []
    for (;;) {
      const node = state.stack.pop()
      if (node === undefined) break
      state.onStack.delete(node)
      scc.push(node)
      if (node === name) break
    }
    state.sccs.push(scc)
  }
}

const findCyclicSchemas = (
  names: readonly string[],
  deps: ReadonlyMap<string, readonly string[]>,
): ReadonlySet<string> => {
  const name2var = new Map(names.map((n) => [n, toIdentifierPascalCase(ensureSuffix(n, 'Schema'))]))
  const var2name = new Map(names.map((n) => [toIdentifierPascalCase(ensureSuffix(n, 'Schema')), n]))
  const state: TarjanState = {
    indices: new Map(),
    lowLinks: new Map(),
    onStack: new Set(),
    stack: [],
    sccs: [],
    index: 0,
  }

  for (const n of names) {
    if (!state.indices.has(n)) tarjanConnect(n, deps, var2name, state)
  }

  return new Set(
    state.sccs.flatMap((scc) => {
      if (scc.length > 1) return scc
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
  const sorted: Declaration[] = []
  const perm = new Set<string>()
  const temp = new Set<string>()

  const visit = (name: string): void => {
    if (perm.has(name) || temp.has(name)) return
    const decl = map.get(name)
    if (!decl) return
    temp.add(name)
    for (const ref of decl.refs) {
      if (map.has(ref)) visit(ref)
    }
    temp.delete(name)
    perm.add(name)
    sorted.push(decl)
  }

  for (const d of decls) {
    visit(d.name)
  }
  return sorted
}

export function ast(code: string): string {
  const sourceFile = createSourceFile(code)
  const decls = parseStatements(sourceFile)
  if (decls.length === 0) return code
  return topoSort(decls)
    .map((d) => d.fullText)
    .join('\n\n')
}

export const sortByDependencies = ast
