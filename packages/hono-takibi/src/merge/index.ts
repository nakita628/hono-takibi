import { Node, Project, type SourceFile, SyntaxKind, type VariableStatement } from 'ts-morph'

/**
 * Parses a code snippet into a temporary in-memory SourceFile for AST analysis.
 */
function parseSnippet(code: string) {
  return new Project({ useInMemoryFileSystem: true }).createSourceFile('snippet.ts', code)
}

/**
 * Returns the source position just after the last import declaration.
 * Returns 0 if there are no import declarations.
 */
function getBodyStart(file: SourceFile) {
  const decls = file.getImportDeclarations()
  return decls.length > 0 ? decls[decls.length - 1].getEnd() : 0
}

/**
 * Applies range operations (replacements/deletions) to source code.
 *
 * Each op is [start, end, replacement]. Ops must be sorted by start position.
 * Returns the code with all operations applied.
 */
function applyRangeOps(
  code: string,
  startPos: number,
  ops: readonly (readonly [number, number, string])[],
) {
  const cursors = [startPos, ...ops.map(([, end]) => end)]
  const segments = ops.flatMap(([start, , repl], i) => [code.slice(cursors[i], start), repl])
  return [...segments, code.slice(cursors.at(-1) ?? startPos)].join('')
}

/**
 * Creates a pair of in-memory source files for AST analysis.
 *
 * Centralizes Project creation to avoid redundant instances.
 */
function createSourcePair(existingCode: string, generatedCode: string) {
  const project = new Project({ useInMemoryFileSystem: true })
  return {
    existingFile: project.createSourceFile('existing.ts', existingCode),
    generatedFile: project.createSourceFile('generated.ts', generatedCode),
  }
}

/**
 * Collects exported handler declarations from a source file in a single pass.
 *
 * Returns a Map from handler name to its VariableStatement AST node.
 * A "handler" is any exported variable whose name ends with `Handler`.
 */
function collectHandlerMap(file: SourceFile) {
  const map = new Map<string, VariableStatement>()
  for (const stmt of file.getVariableStatements()) {
    if (!stmt.isExported()) continue
    for (const decl of stmt.getDeclarations()) {
      if (decl.getName().endsWith('Handler')) {
        map.set(decl.getName(), stmt)
      }
    }
  }
  return map
}

/**
 * Merges generated handler code with existing handler code.
 *
 * Merge rules:
 * - Handlers in both: keep existing (user implementation wins, comments preserved)
 * - Handlers only in generated: add (new endpoints)
 * - Handlers only in existing (RouteHandler): delete (route removed from OpenAPI)
 * - Non-handler code (helpers, constants, comments): keep existing
 * - Imports: sync with generated (remove deleted route imports, add new ones, keep user imports)
 *
 * Uses AST for analysis only. The existing file's original text (including comments)
 * is preserved by slicing the source string, not by reconstructing from AST nodes.
 *
 * @param existingCode - The current file content (user-modified).
 * @param generatedCode - The newly generated file content.
 * @returns The merged source code.
 */
export function mergeHandlerFile(existingCode: string, generatedCode: string) {
  const { existingFile, generatedFile } = createSourcePair(existingCode, generatedCode)

  const isInlineHandlerName = (name: string): boolean =>
    name.endsWith('Handler') && !name.endsWith('RouteHandler')

  // Single pass over each file to collect handler name → statement maps
  const existingHandlers = collectHandlerMap(existingFile)
  const generatedHandlers = collectHandlerMap(generatedFile)

  // Delete operations: handlers in existing but not in generated
  const deleteOps = [...existingHandlers.entries()]
    .filter(([name]) => !generatedHandlers.has(name))
    .map(([, stmt]): readonly [number, number, string] => [stmt.getFullStart(), stmt.getEnd(), ''])

  // Chain-merge operations: inline handlers in both — merge .openapi() calls
  const mergeOps: readonly [number, number, string][] = [...existingHandlers.entries()]
    .filter(([name]) => isInlineHandlerName(name) && generatedHandlers.has(name))
    .flatMap(([name, stmt]) => {
      const genStmt = generatedHandlers.get(name)
      if (!genStmt) return []
      const merged = mergeInlineHandler(stmt.getText(), genStmt.getText())
      if (merged === stmt.getText()) return []
      return [[stmt.getStart(), stmt.getEnd(), merged]] as const
    })

  const bodyStart = getBodyStart(existingFile)

  const allOps = [...deleteOps, ...mergeOps]
    .filter(([start]) => start >= bodyStart)
    .toSorted(([a], [b]) => a - b)

  const body = applyRangeOps(existingCode, bodyStart, allOps).replace(/\n{3,}/g, '\n\n')

  // New handlers: in generated but not in existing
  const newHandlerStatements = [...generatedHandlers.entries()]
    .filter(([name]) => !existingHandlers.has(name))
    .map(([, stmt]) => stmt.getText())

  const mergedImports = mergeImports(existingFile, generatedFile)

  return joinSections([mergedImports.join('\n'), body.trim(), newHandlerStatements.join('\n\n')])
}

/**
 * Merges generated app file (index.ts) with existing user-modified version.
 *
 * Merge rules:
 * - `export const api = app.openapi(...)` chain: replaced with generated version (reflects current routes)
 * - Imports: sync with generated (remove deleted route/handler imports, add new ones, keep user imports)
 * - Everything else (middleware, comments, helpers): keep existing
 *
 * Uses AST for analysis only. The existing file's original text is preserved by slicing.
 *
 * @param existingCode - The current file content (user-modified).
 * @param generatedCode - The newly generated file content.
 * @returns The merged source code.
 */
export function mergeAppFile(existingCode: string, generatedCode: string) {
  const { existingFile, generatedFile } = createSourcePair(existingCode, generatedCode)
  const existingApiStmt = findApiStatement(existingFile)
  const generatedApiStmt = findApiStatement(generatedFile)
  const generatedApiText = injectChainPrefix(
    generatedApiStmt?.getText() ?? '',
    extractChainPrefix(existingApiStmt?.getText() ?? ''),
  )
  const existingBody = buildAppBody({
    existingCode,
    generatedCode,
    bodyStart: getBodyStart(existingFile),
    existingApiStmt,
    generatedApiStmt,
    generatedApiText,
  })
  const body = existingBody.trim() || generatedCode.slice(getBodyStart(generatedFile)).trim()
  const mergedImports = mergeImports(existingFile, generatedFile)
  return joinSections([mergedImports.join('\n'), body])
}

function findApiStatement(file: SourceFile) {
  return file
    .getVariableStatements()
    .find(
      (stmt) =>
        stmt.isExported() && stmt.getDeclarations().some((decl) => decl.getName() === 'api'),
    )
}

function injectChainPrefix(generatedApiText: string, chainPrefix: string) {
  if (!chainPrefix) return generatedApiText
  return generatedApiText.replace(
    /\bapp(\s*)\.(?=\s*(?:openapi|route)\s*\()/,
    (_, ws) => `app${chainPrefix}${ws}.`,
  )
}

/**
 * Builds the merged app body by either replacing the existing api statement in place,
 * or — when existing has no api but is incomplete (lacks `export default`) — appending
 * the generated api block plus any trailing exports. When existing keeps `export default`
 * but no api, treats the omission as intentional and leaves the body untouched.
 */
function buildAppBody(args: {
  readonly existingCode: string
  readonly generatedCode: string
  readonly bodyStart: number
  readonly existingApiStmt: VariableStatement | undefined
  readonly generatedApiStmt: VariableStatement | undefined
  readonly generatedApiText: string
}) {
  const { existingCode, generatedCode, bodyStart, existingApiStmt, generatedApiStmt } = args
  if (existingApiStmt) {
    return (
      existingCode.slice(bodyStart, existingApiStmt.getStart()) +
      args.generatedApiText +
      existingCode.slice(existingApiStmt.getEnd())
    )
  }
  const slice = existingCode.slice(bodyStart)
  if (slice.trim().length === 0 || !generatedApiStmt) return slice
  if (/\bexport\s+default\b/.test(slice)) return slice
  const trailing = generatedCode.slice(generatedApiStmt.getEnd())
  return `${slice.trimEnd()}\n\n${args.generatedApiText}${trailing}`
}

/**
 * Joins non-empty sections with double newlines and ensures a trailing newline.
 */
function joinSections(sections: readonly string[]) {
  return `${sections.filter((s) => s.length > 0).join('\n\n')}\n`
}

/** A name auto-generated by the codegen (route or handler symbol). */
const isAutoName = (name: string): boolean => name.endsWith('Route') || name.endsWith('Handler')

/**
 * Merges import declarations from two source files.
 *
 * For each module specifier, named imports are unioned with the following exception:
 * named imports ending in `Route` or `Handler` from the existing file are only kept
 * if they also appear in the generated file (to remove imports for deleted routes).
 *
 * Type-only imports are preserved as type-only when they appear as type-only in both sources,
 * or when they only appear in one source as type-only.
 */
function mergeImports(existingFile: SourceFile, generatedFile: SourceFile): string[] {
  const existingImports = parseImportDeclarations(existingFile)
  const generatedImports = parseImportDeclarations(generatedFile)
  const generatedIndex = buildGeneratedImportIndex(generatedImports)
  const filteredExisting = filterExistingImports(existingImports, generatedIndex)
  const importMap = mergeImportEntries([...filteredExisting, ...generatedImports])
  return [...importMap.entries()]
    .map(([spec, info]) => formatImportLine(spec, info))
    .filter((line): line is string => line !== undefined)
}

function parseImportDeclarations(file: SourceFile) {
  return file.getImportDeclarations().map((d) => ({
    moduleSpecifier: d.getModuleSpecifierValue(),
    isTypeOnlyImport: d.isTypeOnly(),
    defaultImport: d.getDefaultImport()?.getText(),
    namespaceImport: d.getNamespaceImport()?.getText(),
    namedImports: d.getNamedImports().map((n) => ({
      name: n.getName(),
      isTypeOnly: n.isTypeOnly(),
    })),
  }))
}

/**
 * Builds canonical-path lookup tables for generated imports. Used to detect when an
 * existing import refers to a stale path (e.g., path-alias re-config) so it can be
 * dropped in favor of the generated path.
 */
function buildGeneratedImportIndex(
  generatedImports: readonly {
    readonly moduleSpecifier: string
    readonly defaultImport: string | undefined
    readonly namedImports: readonly { readonly name: string }[]
  }[],
) {
  const autoNameModules = new Map<string, string>()
  const defaultImportModules = new Map<string, string>()
  for (const entry of generatedImports) {
    if (entry.defaultImport) {
      defaultImportModules.set(entry.defaultImport, entry.moduleSpecifier)
    }
    for (const named of entry.namedImports) {
      if (isAutoName(named.name)) {
        autoNameModules.set(named.name, entry.moduleSpecifier)
      }
    }
  }
  return { autoNameModules, defaultImportModules }
}

/**
 * Filters existing imports against the generated index:
 * - Removes auto-names not present in generated (route/handler deleted)
 * - Removes auto-names whose canonical module differs (path-alias changed)
 * - Clears default imports whose canonical module differs (default re-pathed)
 */
function filterExistingImports(
  existingImports: readonly {
    readonly moduleSpecifier: string
    readonly isTypeOnlyImport: boolean
    readonly defaultImport: string | undefined
    readonly namespaceImport: string | undefined
    readonly namedImports: readonly { readonly name: string; readonly isTypeOnly: boolean }[]
  }[],
  index: {
    readonly autoNameModules: ReadonlyMap<string, string>
    readonly defaultImportModules: ReadonlyMap<string, string>
  },
) {
  return existingImports.map((entry) => {
    const defaultIsStale =
      entry.defaultImport !== undefined &&
      index.defaultImportModules.has(entry.defaultImport) &&
      index.defaultImportModules.get(entry.defaultImport) !== entry.moduleSpecifier
    return {
      ...entry,
      defaultImport: defaultIsStale ? undefined : entry.defaultImport,
      namedImports: entry.namedImports.filter((named) => {
        if (!isAutoName(named.name)) return true
        const canonical = index.autoNameModules.get(named.name)
        return canonical !== undefined && canonical === entry.moduleSpecifier
      }),
    }
  })
}

/**
 * Combines parsed import entries by module specifier. Named imports are unioned and
 * type-only flags are AND-merged (type-only only when type-only in every occurrence).
 */
function mergeImportEntries(
  entries: readonly {
    readonly moduleSpecifier: string
    readonly isTypeOnlyImport: boolean
    readonly defaultImport: string | undefined
    readonly namespaceImport: string | undefined
    readonly namedImports: readonly { readonly name: string; readonly isTypeOnly: boolean }[]
  }[],
) {
  const map = new Map<
    string,
    {
      namedImports: Map<string, boolean>
      isTypeOnlyImport: boolean
      defaultImport?: string
      namespaceImport?: string
    }
  >()
  for (const entry of entries) {
    const prev = map.get(entry.moduleSpecifier)
    const namedImports = new Map(prev?.namedImports ?? [])
    for (const named of entry.namedImports) {
      const prevTypeOnly = namedImports.get(named.name)
      namedImports.set(
        named.name,
        prevTypeOnly === undefined ? named.isTypeOnly : prevTypeOnly && named.isTypeOnly,
      )
    }
    map.set(entry.moduleSpecifier, {
      namedImports,
      isTypeOnlyImport: prev
        ? prev.isTypeOnlyImport && entry.isTypeOnlyImport
        : entry.isTypeOnlyImport,
      ...(entry.defaultImport !== undefined && { defaultImport: entry.defaultImport }),
      ...(prev?.defaultImport !== undefined &&
        entry.defaultImport === undefined && { defaultImport: prev.defaultImport }),
      ...(entry.namespaceImport !== undefined && { namespaceImport: entry.namespaceImport }),
      ...(prev?.namespaceImport !== undefined &&
        entry.namespaceImport === undefined && { namespaceImport: prev.namespaceImport }),
    })
  }
  return map
}

function formatImportLine(
  moduleSpecifier: string,
  info: {
    namedImports: Map<string, boolean>
    isTypeOnlyImport: boolean
    defaultImport?: string
    namespaceImport?: string
  },
) {
  const namedPart =
    info.namedImports.size > 0
      ? `{ ${[...info.namedImports.entries()]
          .toSorted(([a], [b]) => a.localeCompare(b))
          .map(([name, isTypeOnly]) =>
            isTypeOnly && !info.isTypeOnlyImport ? `type ${name}` : name,
          )
          .join(', ')} }`
      : undefined
  const parts = [
    info.defaultImport,
    info.namespaceImport ? `* as ${info.namespaceImport}` : undefined,
    namedPart,
  ].filter((p): p is string => p !== undefined)
  if (parts.length === 0) return undefined
  const prefix = info.isTypeOnlyImport ? 'import type' : 'import'
  return `${prefix} ${parts.join(', ')} from '${moduleSpecifier}'`
}

/**
 * Extracts the method chain between `app` and the first `.openapi(`/`.route(` call.
 *
 * For example, from `export const api=app.basePath('/api').openapi(...)`,
 * this returns `.basePath('/api')`.
 * Returns empty string if there is no prefix chain.
 */
function extractChainPrefix(apiStmtText: string) {
  const initMatch = apiStmtText.match(/=\s*app\b/)
  if (!initMatch || initMatch.index === undefined) return ''
  const afterApp = apiStmtText.slice(initMatch.index + initMatch[0].length)
  const routeMatch = afterApp.match(/\.(?:openapi|route)\s*\(/)
  if (!routeMatch || routeMatch.index === undefined || routeMatch.index === 0) return ''
  const candidate = afterApp.slice(0, routeMatch.index).trim()
  // Only treat as chain prefix when it actually starts with a method call (e.g. `.basePath('/api')`).
  // Why: comments alone (`// Public routes`) get returned by the trim() above and would be
  // injected directly after `app`, producing invalid `app// Public routes.openapi(...)`.
  return candidate.startsWith('.') ? candidate : ''
}

/**
 * Extracts individual .openapi() call blocks from a handler chain.
 *
 * Returns a map of route name (first argument) to the full `.openapi(...)` text,
 * ordered by appearance in the source (left-to-right within the chain).
 */
function extractOpenApiCalls(code: string) {
  // ts-morph traverses chained calls outer-first (right-to-left), so sort by the position
  // of the `openapi` identifier to restore source order before populating the Map.
  const calls = parseSnippet(code)
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .filter((call) => {
      const expr = call.getExpression()
      return Node.isPropertyAccessExpression(expr) && expr.getName() === 'openapi'
    })
    .toSorted((a, b) => {
      const aExpr = a.getExpression()
      const bExpr = b.getExpression()
      const aPos = Node.isPropertyAccessExpression(aExpr) ? aExpr.getNameNode().getStart() : 0
      const bPos = Node.isPropertyAccessExpression(bExpr) ? bExpr.getNameNode().getStart() : 0
      return aPos - bPos
    })
  const result = new Map<string, string>()
  for (const call of calls) {
    const expr = call.getExpression()
    if (!Node.isPropertyAccessExpression(expr)) continue
    const arg = call.getArguments()[0]
    if (!arg || !Node.isIdentifier(arg)) continue
    const dotPos = expr.getNameNode().getStart() - 1
    result.set(arg.getText(), code.slice(dotPos, call.getEnd()))
  }
  return result
}

/**
 * Merges .openapi() call chains in an inline handler.
 *
 * Uses generated handler's route list as source of truth:
 * - Routes in both: keep existing implementation
 * - Routes only in generated: add from generated (new route stubs)
 * - Routes only in existing: remove (route deleted from OpenAPI spec)
 */
function mergeInlineHandler(existingText: string, generatedText: string) {
  const generatedCalls = extractOpenApiCalls(generatedText)
  if (generatedCalls.size === 0) return generatedText
  const existingCalls = extractOpenApiCalls(existingText)
  const firstCallMatch = generatedText.match(/\.openapi\s*\(/)
  if (!firstCallMatch || firstCallMatch.index === undefined) return generatedText
  const prefix = generatedText.slice(0, firstCallMatch.index).trimEnd()
  const mergedCalls = [...generatedCalls.entries()].map(
    ([routeName, genCall]) => existingCalls.get(routeName) ?? genCall,
  )
  return `${prefix}\n${mergedCalls.join('\n')}`
}

/**
 * Extracts top-level `function mockXxx(...) { ... }` definitions from test code.
 *
 * Returns a map of function name to block info including text and source positions.
 */
function extractMockFunctions(code: string) {
  const result = new Map<string, { text: string; start: number; end: number }>()
  for (const fn of parseSnippet(code).getFunctions()) {
    const name = fn.getName()
    if (!name || !/^mock[A-Z]/.test(name)) continue
    const [start, end] = [fn.getStart(), fn.getEnd()]
    result.set(name, { text: code.slice(start, end), start, end })
  }
  return result
}

/**
 * Extracts `describe('METHOD /path', ...)` calls from test code.
 *
 * Returns a map of route identifier (e.g., "GET /users") to block info
 * including text and source positions for removal.
 */
function extractRouteDescribeBlocks(code: string) {
  const result = new Map<string, { text: string; start: number; end: number }>()
  for (const call of parseSnippet(code).getDescendantsOfKind(SyntaxKind.CallExpression)) {
    const expr = call.getExpression()
    if (!Node.isIdentifier(expr) || expr.getText() !== 'describe') continue
    const firstArg = call.getArguments()[0]
    if (
      !firstArg ||
      (!Node.isStringLiteral(firstArg) && !Node.isNoSubstitutionTemplateLiteral(firstArg))
    )
      continue
    const title = firstArg.getLiteralText()
    if (!/^[A-Z]+\s+\//.test(title)) continue
    const [start, end] = [call.getStart(), call.getEnd()]
    result.set(title, { text: code.slice(start, end), start, end })
  }
  return result
}

/**
 * Merges generated test file with existing user-modified test file.
 *
 * Merge rules:
 * - Route describe blocks (`describe('METHOD /path', ...)`) in both: keep existing (user mocks/edits preserved)
 * - Route describe blocks only in generated: add (new route test stubs)
 * - Route describe blocks only in existing: delete (route removed from OpenAPI)
 * - Everything else (user mocks, custom tests, helpers): keep existing
 * - Imports: merge (add missing, keep user imports)
 *
 * A "route describe block" is identified by the pattern `describe('METHOD /path', ...)`.
 *
 * @param existingCode - The current test file content (user-modified).
 * @param generatedCode - The newly generated test file content.
 * @returns The merged test code.
 */
export function mergeTestFile(existingCode: string, generatedCode: string) {
  const existingBlocks = extractRouteDescribeBlocks(existingCode)
  const generatedBlocks = extractRouteDescribeBlocks(generatedCode)
  const { existingFile, generatedFile } = createSourcePair(existingCode, generatedCode)
  const filteredImports = filterTestFrameworkImports(
    mergeImports(existingFile, generatedFile),
    generatedFile,
  )
  const bodyStart = getBodyStart(existingFile)
  const staleRanges = [...existingBlocks.entries()]
    .filter(([route]) => !generatedBlocks.has(route))
    .map(([, block]) => [block.start, block.end] as const)
    .filter(([start]) => start >= bodyStart)
    .toSorted(([a], [b]) => a - b)
  const newBlocks = [...generatedBlocks.entries()]
    .filter(([route]) => !existingBlocks.has(route))
    .map(([, block]) => block.text)
  const bodyWithStaleRemoved = applyRangeOps(
    existingCode,
    bodyStart,
    staleRanges.map(([start, end]) => [start, end, ''] as const),
  ).replace(/\n{3,}/g, '\n\n')
  const missingMocks = [...extractMockFunctions(generatedCode).entries()]
    .filter(([name]) => !extractMockFunctions(existingCode).has(name))
    .map(([, block]) => block.text)
  const bodyAfterMocks = insertMissingMocks(bodyWithStaleRemoved, missingMocks)
  const body = insertNewRouteDescribes(bodyAfterMocks, newBlocks).trim()
  return joinSections([filteredImports.join('\n'), body])
}

const TEST_FRAMEWORK_MODULES = new Set(['vitest', 'bun:test', 'vite-plus/test'])

/**
 * Drops test-framework imports from any module other than the one used by the generated
 * file. Without this, switching frameworks (e.g. existing `vitest` → generated
 * `vite-plus/test`) would leave duplicate framework imports.
 */
function filterTestFrameworkImports(mergedImports: readonly string[], generatedFile: SourceFile) {
  const generatedTestModule = generatedFile
    .getImportDeclarations()
    .map((d) => d.getModuleSpecifierValue())
    .find((spec) => TEST_FRAMEWORK_MODULES.has(spec))
  if (!generatedTestModule) return [...mergedImports]
  return mergedImports.filter((line) => {
    const spec = line.match(/from\s+'([^']+)'/)?.[1] ?? ''
    return !TEST_FRAMEWORK_MODULES.has(spec) || spec === generatedTestModule
  })
}

/**
 * Inserts new route describe blocks. When the body has an outer non-route describe wrapper
 * (e.g. `describe('Users', ...)`), inserts before its closing `})` so new blocks remain
 * nested. Otherwise appends at end — preventing the last `})` (which belongs to the last
 * route describe) from being treated as the wrapper close.
 */
function insertNewRouteDescribes(body: string, newBlocks: readonly string[]) {
  if (newBlocks.length === 0) return body
  const lines = body.split('\n')
  const isRouteDescribeTitle = (title: string) => /^[A-Z]+\s+\//.test(title)
  const hasOuterWrapper = [...body.matchAll(/^describe\s*\(\s*['"]([^'"]+)['"]/gm)].some(
    (m) => !isRouteDescribeTitle(m[1] ?? ''),
  )
  const insertLineIndex = hasOuterWrapper
    ? lines.findLastIndex((line) => /^\s*\}\s*\)\s*;?\s*$/.test(line))
    : -1
  if (insertLineIndex === -1) return [...lines, '', ...newBlocks].join('\n')
  return [
    ...lines.slice(0, insertLineIndex),
    '',
    ...newBlocks.map((block) => `  ${block}`),
    ...lines.slice(insertLineIndex),
  ].join('\n')
}

/**
 * Syncs barrel file (index.ts) with the generated version.
 *
 * The generated file is the source of truth (reflects current OpenAPI spec).
 * Exports for deleted handler files are removed.
 *
 * @param _existingCode - The current barrel file content (unused, kept for API compatibility).
 * @param generatedCode - The newly generated barrel file content.
 * @returns The synced barrel file content.
 */
export function mergeBarrelFile(_existingCode: string, generatedCode: string) {
  return generatedCode
}

/**
 * Inserts missing mock function definitions into the test body.
 *
 * Inserts before the first `describe(` block, or at the start of body if none found.
 * Collapses triple+ newlines after insertion.
 */
function insertMissingMocks(body: string, missingMocks: readonly string[]) {
  if (missingMocks.length === 0) return body
  const describeMatch = body.match(/\n(?=describe\s*\()/)
  const inserted =
    describeMatch?.index !== undefined
      ? `${body.slice(0, describeMatch.index)}\n${missingMocks.join('\n\n')}\n${body.slice(describeMatch.index)}`
      : `\n${missingMocks.join('\n\n')}\n${body}`
  return inserted.replace(/\n{3,}/g, '\n\n')
}
