import ts from 'typescript'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import type { Schema } from '../openapi/index.js'
import { ensureSuffix, toIdentifierPascalCase } from '../utils/index.js'

// =============================================================================
// Core AST utilities
// =============================================================================

/** Parse TypeScript code string into a SourceFile */
export function parseSourceFile(code: string): ts.SourceFile {
  return ts.createSourceFile('temp.ts', code, ts.ScriptTarget.Latest, true)
}

/** Collect all identifiers from TypeScript AST recursively */
export function collectAllIdentifiers(node: ts.Node, result: Set<string>): void {
  if (ts.isIdentifier(node)) {
    result.add(node.text)
  }
  ts.forEachChild(node, (child) => collectAllIdentifiers(child, result))
}

/** Extract identifiers from TypeScript code that match the given variable names */
export function extractIdentifiers(code: string, varNames: ReadonlySet<string>): readonly string[] {
  const sourceFile = parseSourceFile(code)
  const identifiers = new Set<string>()
  collectAllIdentifiers(sourceFile, identifiers)
  return [...varNames].filter((v) => identifiers.has(v))
}

/** Extract schema references from code (identifiers ending with "Schema") */
export function extractSchemaReferences(code: string, selfName: string): readonly string[] {
  const sourceFile = parseSourceFile(code)
  const identifiers = new Set<string>()
  collectAllIdentifiers(sourceFile, identifiers)
  return [...identifiers].filter((name) => name.endsWith('Schema') && name !== selfName)
}

// =============================================================================
// Circular dependency analysis (Tarjan's algorithm)
// =============================================================================

/** Convert schema name to variable name (e.g., "User" -> "UserSchema") */
const toVarName = (name: string): string => toIdentifierPascalCase(ensureSuffix(name, 'Schema'))

/** Tarjan's algorithm state */
type TarjanState = {
  readonly indices: Map<string, number>
  readonly lowLinks: Map<string, number>
  readonly onStack: Set<string>
  readonly stack: string[]
  readonly sccs: string[][]
  index: number
}

/** Create initial Tarjan state */
const createTarjanState = (): TarjanState => ({
  indices: new Map(),
  lowLinks: new Map(),
  onStack: new Set(),
  stack: [],
  sccs: [],
  index: 0,
})

/** Pop SCC from stack until reaching the root node */
const popScc = (state: TarjanState, root: string): readonly string[] => {
  const scc: string[] = []
  let node: string | undefined
  do {
    node = state.stack.pop()
    if (node !== undefined) {
      state.onStack.delete(node)
      scc.push(node)
    }
  } while (node !== root && node !== undefined)
  return scc
}

/** Tarjan's strongly connected components algorithm */
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

  const dependencies = deps.get(name) ?? []
  for (const depVar of dependencies) {
    const depName = var2name.get(depVar)
    if (depName === undefined) continue

    if (!state.indices.has(depName)) {
      tarjanConnect(depName, deps, var2name, state)
      const currentLow = state.lowLinks.get(name) ?? 0
      const depLow = state.lowLinks.get(depName) ?? 0
      state.lowLinks.set(name, Math.min(currentLow, depLow))
    } else if (state.onStack.has(depName)) {
      const currentLow = state.lowLinks.get(name) ?? 0
      const depIndex = state.indices.get(depName) ?? 0
      state.lowLinks.set(name, Math.min(currentLow, depIndex))
    }
  }

  if (state.lowLinks.get(name) === state.indices.get(name)) {
    state.sccs.push([...popScc(state, name)])
  }
}

/** Check if a single-node SCC has a self-reference */
const hasSelfReference = (
  name: string,
  deps: ReadonlyMap<string, readonly string[]>,
  name2var: ReadonlyMap<string, string>,
): boolean => {
  const selfVar = name2var.get(name)
  return selfVar !== undefined && (deps.get(name) ?? []).includes(selfVar)
}

/** Extract cyclic schemas from SCCs */
const extractCyclicFromSccs = (
  sccs: readonly (readonly string[])[],
  deps: ReadonlyMap<string, readonly string[]>,
  name2var: ReadonlyMap<string, string>,
): ReadonlySet<string> =>
  new Set(
    sccs.flatMap((scc) => {
      if (scc.length > 1) return scc
      const single = scc[0]
      return single && hasSelfReference(single, deps, name2var) ? [single] : []
    }),
  )

/** Find all cyclic schemas using Tarjan's algorithm */
const findCyclicSchemas = (
  names: readonly string[],
  deps: ReadonlyMap<string, readonly string[]>,
): ReadonlySet<string> => {
  const name2var = new Map(names.map((n) => [n, toVarName(n)]))
  const var2name = new Map(names.map((n) => [toVarName(n), n]))
  const state = createTarjanState()

  for (const n of names) {
    if (!state.indices.has(n)) {
      tarjanConnect(n, deps, var2name, state)
    }
  }

  return extractCyclicFromSccs(state.sccs, deps, name2var)
}

/** Extend cyclic schemas to include their direct dependencies */
const extendCyclicSchemas = (
  cyclicSchemas: ReadonlySet<string>,
  depsMap: ReadonlyMap<string, readonly string[]>,
  varNameToName: ReadonlyMap<string, string>,
): ReadonlySet<string> =>
  new Set([
    ...cyclicSchemas,
    ...[...cyclicSchemas].flatMap((n) =>
      (depsMap.get(n) ?? [])
        .map((v) => varNameToName.get(v))
        .filter((x): x is string => x !== undefined),
    ),
  ])

export interface CircularAnalysis {
  readonly zSchemaMap: ReadonlyMap<string, string>
  readonly depsMap: ReadonlyMap<string, readonly string[]>
  readonly cyclicSchemas: ReadonlySet<string>
  readonly extendedCyclicSchemas: ReadonlySet<string>
  readonly cyclicGroupPascal: ReadonlySet<string>
  readonly varNameToName: ReadonlyMap<string, string>
}

/** Analyze schemas for circular references */
export function analyzeCircularSchemas(
  schemas: Record<string, Schema>,
  schemaNames: readonly string[],
): CircularAnalysis {
  const varNameSet = new Set(schemaNames.map(toVarName))
  const varNameToName = new Map(schemaNames.map((n) => [toVarName(n), n]))

  const zSchemaMap = new Map(schemaNames.map((n) => [n, zodToOpenAPI(schemas[n])]))

  const depsMap = new Map(
    schemaNames.map((n) => {
      const code = zSchemaMap.get(n) ?? ''
      const selfVar = toVarName(n)
      const refs = extractIdentifiers(code, varNameSet).filter((v) => v !== selfVar)
      return [n, refs]
    }),
  )

  const cyclicSchemas = findCyclicSchemas(schemaNames, depsMap)
  const extendedCyclicSchemas = extendCyclicSchemas(cyclicSchemas, depsMap, varNameToName)
  const cyclicGroupPascal = new Set([...extendedCyclicSchemas].map(toIdentifierPascalCase))

  return {
    zSchemaMap,
    depsMap,
    cyclicSchemas,
    extendedCyclicSchemas,
    cyclicGroupPascal,
    varNameToName,
  }
}

// =============================================================================
// Dependency sorting
// =============================================================================

type Declaration = {
  readonly name: string
  readonly fullText: string
  readonly references: readonly string[]
}

type SchemaBlock = {
  readonly name: string
  readonly code: string
}

/** Collects all declaration names from TypeScript code */
function collectDeclaredNames(sourceFile: ts.SourceFile): ReadonlySet<string> {
  const names = new Set<string>()

  const visit = (node: ts.Node): void => {
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) {
          names.add(decl.name.text)
        }
      }
    } else if (ts.isTypeAliasDeclaration(node)) {
      names.add(node.name.text)
    } else if (ts.isInterfaceDeclaration(node)) {
      names.add(node.name.text)
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return names
}

/** Checks if a variable declaration is wrapped with z.lazy() */
function isLazyWrapped(decl: ts.VariableDeclaration): boolean {
  if (!decl.initializer) return false
  const initText = decl.initializer.getFullText().trimStart()
  return initText.startsWith('z.lazy(') || initText.startsWith('z.lazy (')
}

/** Extracts references from a variable declaration */
function extractReferences(
  decl: ts.VariableDeclaration,
  selfName: string,
  declaredNames: ReadonlySet<string>,
): readonly string[] {
  if (isLazyWrapped(decl)) {
    return []
  }

  if (!decl.initializer) {
    return []
  }

  const refs = new Set<string>()
  collectAllIdentifiers(decl.initializer, refs)
  return [...refs].filter((name) => name !== selfName && declaredNames.has(name))
}

/** Extracts references from a type alias declaration */
function extractTypeReferences(
  node: ts.TypeAliasDeclaration,
  selfName: string,
  declaredNames: ReadonlySet<string>,
): readonly string[] {
  const refs = new Set<string>()
  collectAllIdentifiers(node.type, refs)
  return [...refs].filter((name) => name !== selfName && declaredNames.has(name))
}

/** Extracts references from an interface declaration */
function extractInterfaceReferences(
  node: ts.InterfaceDeclaration,
  selfName: string,
  declaredNames: ReadonlySet<string>,
): readonly string[] {
  const refs = new Set<string>()
  for (const member of node.members) {
    collectAllIdentifiers(member, refs)
  }
  return [...refs].filter((name) => name !== selfName && declaredNames.has(name))
}

/** Parses TypeScript code and extracts declarations with their references */
function parseDeclarations(code: string): readonly Declaration[] {
  const sourceFile = parseSourceFile(code)
  const declaredNames = collectDeclaredNames(sourceFile)
  const declarations: Declaration[] = []

  const visit = (node: ts.Node): void => {
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) {
          const name = decl.name.text
          const fullText = node.getFullText(sourceFile).trim()
          const references = extractReferences(decl, name, declaredNames)
          declarations.push({ name, fullText, references })
        }
      }
    } else if (ts.isTypeAliasDeclaration(node)) {
      const name = node.name.text
      const fullText = node.getFullText(sourceFile).trim()
      const references = extractTypeReferences(node, name, declaredNames)
      declarations.push({ name, fullText, references })
    } else if (ts.isInterfaceDeclaration(node)) {
      const name = node.name.text
      const fullText = node.getFullText(sourceFile).trim()
      const references = extractInterfaceReferences(node, name, declaredNames)
      declarations.push({ name, fullText, references })
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return declarations
}

/** Sorts declarations in topological order based on their dependencies */
function topologicalSort(declarations: readonly Declaration[]): readonly Declaration[] {
  const declMap = new Map<string, Declaration>()
  for (const decl of declarations) {
    declMap.set(decl.name, decl)
  }

  const sorted: Declaration[] = []
  const perm = new Set<string>()
  const temp = new Set<string>()

  const visit = (name: string): void => {
    if (perm.has(name)) return
    if (temp.has(name)) return

    const decl = declMap.get(name)
    if (!decl) return

    temp.add(name)
    for (const ref of decl.references) {
      if (declMap.has(ref)) {
        visit(ref)
      }
    }
    temp.delete(name)

    perm.add(name)
    sorted.push(decl)
  }

  for (const decl of declarations) {
    visit(decl.name)
  }

  return sorted
}

/**
 * Sorts TypeScript schema declarations by their dependencies using AST analysis.
 *
 * This function parses the generated TypeScript code, extracts variable declarations,
 * analyzes their dependencies, and returns the code with declarations reordered
 * so that referenced schemas appear before the ones that depend on them.
 */
export function sortByDependencies(code: string): string {
  const declarations = parseDeclarations(code)
  if (declarations.length === 0) return code

  const sorted = topologicalSort(declarations)
  return sorted.map((d) => d.fullText).join('\n\n')
}

/**
 * Sorts schema code blocks by their dependencies.
 *
 * Each block contains the complete code for a schema (type definition, variable declaration, type inference).
 * The function extracts dependencies from each block and sorts them topologically.
 */
export function sortSchemaBlocks(blocks: readonly SchemaBlock[]): readonly SchemaBlock[] {
  if (blocks.length === 0) return blocks

  const blockMap = new Map<string, SchemaBlock>()
  const depsMap = new Map<string, readonly string[]>()

  for (const block of blocks) {
    blockMap.set(block.name, block)
    depsMap.set(block.name, extractSchemaReferences(block.code, block.name))
  }

  const sorted: SchemaBlock[] = []
  const perm = new Set<string>()
  const temp = new Set<string>()

  const visit = (name: string): void => {
    if (perm.has(name)) return
    if (temp.has(name)) return

    const block = blockMap.get(name)
    if (!block) return

    temp.add(name)
    const deps = depsMap.get(name) ?? []
    for (const dep of deps) {
      if (blockMap.has(dep)) {
        visit(dep)
      }
    }
    temp.delete(name)

    perm.add(name)
    sorted.push(block)
  }

  for (const block of blocks) {
    visit(block.name)
  }

  return sorted
}
