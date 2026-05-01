import ts from 'typescript'

import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import type { Schema } from '../openapi/index.js'
import { ensureSuffix, toIdentifierPascalCase } from '../utils/index.js'

function makeSourceFile(code: string) {
  return ts.createSourceFile('temp.ts', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
}

function getChildren(node: ts.Node): readonly ts.Node[] {
  const syntaxChildren = node.getChildren()
  if (syntaxChildren.length > 0) return syntaxChildren
  const semanticChildren: ts.Node[] = []
  ts.forEachChild(node, (child) => {
    semanticChildren[semanticChildren.length] = child
  })
  return semanticChildren
}

function collectIdentifiers(node: ts.Node) {
  const visit = (n: ts.Node): readonly string[] => {
    const current = ts.isIdentifier(n) ? [n.text] : []
    const children = getChildren(n).flatMap(visit)
    return [...current, ...children] as const
  }
  return visit(node)
}

function extractIdentifiers(code: string, varNames: ReadonlySet<string>) {
  const sourceFile = makeSourceFile(code)
  const allIdentifiers = collectIdentifiers(sourceFile)
  const found = new Set(allIdentifiers.filter((id) => varNames.has(id)))
  return [...found] as const
}

function createInitialState(): {
  readonly indices: Map<string, number>
  readonly lowLinks: Map<string, number>
  readonly onStack: Set<string>
  readonly stack: readonly string[]
  readonly sccs: readonly (readonly string[])[]
  readonly index: number
} {
  return {
    indices: new Map<string, number>(),
    lowLinks: new Map<string, number>(),
    onStack: new Set<string>(),
    stack: [],
    sccs: [],
    index: 0,
  } as const
}

function popStackUntil(
  stack: readonly string[],
  onStack: Set<string>,
  name: string,
): {
  readonly scc: readonly string[]
  readonly newStack: readonly string[]
  readonly newOnStack: Set<string>
} {
  const idx = stack.lastIndexOf(name)
  if (idx === -1) return { scc: [], newStack: stack, newOnStack: onStack }
  const scc = stack.slice(idx)
  const newStack = stack.slice(0, idx)
  const newOnStack = new Set([...onStack].filter((n) => !scc.includes(n)))
  return { scc, newStack, newOnStack }
}

function tarjanConnect(
  name: string,
  deps: ReadonlyMap<string, readonly string[]>,
  var2name: ReadonlyMap<string, string>,
  state: {
    readonly indices: Map<string, number>
    readonly lowLinks: Map<string, number>
    readonly onStack: Set<string>
    readonly stack: readonly string[]
    readonly sccs: readonly (readonly string[])[]
    readonly index: number
  },
) {
  const currentIndex = state.index
  const indices = new Map(state.indices).set(name, currentIndex)
  const lowLinks = new Map(state.lowLinks).set(name, currentIndex)
  const stack: readonly string[] = [...state.stack, name]
  const onStack = new Set([...state.onStack, name])

  const initialState: {
    readonly indices: Map<string, number>
    readonly lowLinks: Map<string, number>
    readonly onStack: Set<string>
    readonly stack: readonly string[]
    readonly sccs: readonly (readonly string[])[]
    readonly index: number
  } = {
    ...state,
    indices,
    lowLinks,
    stack,
    onStack,
    index: currentIndex + 1,
  } as const

  const afterDeps = (deps.get(name) ?? []).reduce<{
    readonly indices: Map<string, number>
    readonly lowLinks: Map<string, number>
    readonly onStack: Set<string>
    readonly stack: readonly string[]
    readonly sccs: readonly (readonly string[])[]
    readonly index: number
  }>((s, depVar) => {
    const depName = var2name.get(depVar)
    if (depName === undefined) return s

    if (!s.indices.has(depName)) {
      const afterConnect = tarjanConnect(depName, deps, var2name, s)
      const newLowLink = Math.min(
        afterConnect.lowLinks.get(name) ?? 0,
        afterConnect.lowLinks.get(depName) ?? 0,
      )
      const updatedLowLinks = new Map(afterConnect.lowLinks).set(name, newLowLink)
      const result: {
        readonly indices: Map<string, number>
        readonly lowLinks: Map<string, number>
        readonly onStack: Set<string>
        readonly stack: readonly string[]
        readonly sccs: readonly (readonly string[])[]
        readonly index: number
      } = { ...afterConnect, lowLinks: updatedLowLinks }
      return result
    }
    if (s.onStack.has(depName)) {
      const newLowLink = Math.min(s.lowLinks.get(name) ?? 0, s.indices.get(depName) ?? 0)
      const updatedLowLinks = new Map(s.lowLinks).set(name, newLowLink)
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

function findCyclicSchemas(
  names: readonly string[],
  deps: ReadonlyMap<string, readonly string[]>,
): ReadonlySet<string> {
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

export function analyzeCircularSchemas(
  schemas: { readonly [k: string]: Schema },
  schemaNames: readonly string[],
  readonly?: boolean,
) {
  const varNameSet = new Set(
    schemaNames.map((n) => toIdentifierPascalCase(ensureSuffix(n, 'Schema'))),
  )
  const varNameToName = new Map(
    schemaNames.map((n) => [toIdentifierPascalCase(ensureSuffix(n, 'Schema')), n]),
  )
  const zSchemaMap = new Map(
    schemaNames.map((n) => [n, zodToOpenAPI(schemas[n], undefined, readonly)]),
  )
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
      (depsMap.get(n) ?? []).map((v) => varNameToName.get(v)).filter((x) => x !== undefined),
    ),
  ])
  return {
    zSchemaMap,
    depsMap,
    cyclicSchemas,
    extendedCyclicSchemas,
    cyclicGroupPascal: new Set([...extendedCyclicSchemas].map(toIdentifierPascalCase)),
    varNameToName,
  } as const
}

function createDeclaration(
  name: string,
  fullText: string,
  refs: readonly string[],
  kind: 'variable' | 'type' | 'interface',
) {
  return {
    name,
    fullText,
    refs,
    kind,
  } as const
}

function getDeclarationName(statement: ts.Statement) {
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

function getDeclarationKind(statement: ts.Statement) {
  if (ts.isVariableStatement(statement)) return 'variable'
  if (ts.isTypeAliasDeclaration(statement)) return 'type'
  if (ts.isInterfaceDeclaration(statement)) return 'interface'
  return undefined
}

function isLazySchema(statement: ts.Statement) {
  if (!ts.isVariableStatement(statement)) return false
  const declaration = statement.declarationList.declarations[0]
  if (!declaration?.initializer) return false
  const initText = declaration.initializer.getText()
  return /^z\.lazy\s*\(/.test(initText)
}

function getStatementReferences(
  statement: ts.Statement,
  declNames: ReadonlySet<string>,
  selfName: string,
  selfKind: 'variable' | 'type' | 'interface',
) {
  if (isLazySchema(statement)) return [] as const
  const identifiers = collectIdentifiers(statement)
  return [
    ...new Set(
      identifiers.filter((id) => {
        if (!declNames.has(id)) return false
        if (id === selfName && (selfKind === 'type' || selfKind === 'interface')) {
          return true
        }
        return id !== selfName
      }),
    ),
  ] as const
}

function parseStatements(sourceFile: ts.SourceFile) {
  const statements = sourceFile.statements.filter(
    (s) =>
      ts.isVariableStatement(s) || ts.isTypeAliasDeclaration(s) || ts.isInterfaceDeclaration(s),
  )
  const declNames = new Set(
    statements.map(getDeclarationName).filter((n) => n !== undefined),
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
    .filter((d) => d !== undefined)
}

function topoSort(
  decls: readonly {
    readonly name: string
    readonly fullText: string
    readonly refs: readonly string[]
    readonly kind: 'variable' | 'type' | 'interface'
  }[],
) {
  const makeKey = (kind: 'variable' | 'type' | 'interface', name: string): string =>
    `${kind}:${name}`
  const map = new Map(decls.map((d) => [makeKey(d.kind, d.name), d]))
  const findByName = (name: string): ReturnType<typeof createDeclaration> | undefined =>
    map.get(makeKey('variable', name)) ??
    map.get(makeKey('type', name)) ??
    map.get(makeKey('interface', name))
  const visit = (
    key: string,
    state: {
      readonly sorted: readonly {
        readonly name: string
        readonly fullText: string
        readonly refs: readonly string[]
        readonly kind: 'variable' | 'type' | 'interface'
      }[]
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
      .filter((d) => d !== undefined)
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

export function ast(code: string) {
  const sourceFile = makeSourceFile(code)
  const decls = parseStatements(sourceFile)
  if (decls.length === 0) return code
  return topoSort(decls)
    .map((d) => d.fullText)
    .join('\n\n')
}
