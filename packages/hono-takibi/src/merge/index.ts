import { Project, type SourceFile, type VariableStatement } from 'ts-morph'

/**
 * Finds the end position of a balanced expression.
 *
 * Scans from `start`, counting opening/closing characters,
 * and returns the position just after the matching closing character.
 * Skips string literals (single/double/backtick) so that brackets
 * inside strings are not counted.
 */
function findBalancedEnd(code: string, start: number, open: string, close: string) {
  let pos = start
  let depth = 0
  while (pos < code.length) {
    const ch = code[pos]
    // Skip string/template literals
    if (ch === "'" || ch === '"' || ch === '`') {
      pos++
      while (pos < code.length) {
        if (code[pos] === '\\') {
          pos += 2
          continue
        }
        if (code[pos] === ch) {
          pos++
          break
        }
        pos++
      }
      continue
    }
    depth += ch === open ? 1 : ch === close ? -1 : 0
    if (ch === close && depth === 0) return pos + 1
    pos++
  }
  return start
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
  const slices: string[] = []
  let cursor = startPos
  for (const [start, end, replacement] of ops) {
    slices.push(code.slice(cursor, start), replacement)
    cursor = end
  }
  slices.push(code.slice(cursor))
  return slices.join('')
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
    .flatMap(([name, stmt]): readonly [number, number, string][] => {
      const genStmt = generatedHandlers.get(name)
      if (!genStmt) return []
      const merged = mergeInlineHandler(stmt.getText(), genStmt.getText())
      if (merged === stmt.getText()) return []
      return [[stmt.getStart(), stmt.getEnd(), merged]]
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

  const parts = [
    mergedImports.length > 0 ? mergedImports.join('\n') : '',
    body.trim(),
    newHandlerStatements.length > 0 ? newHandlerStatements.join('\n\n') : '',
  ].filter(Boolean)

  return `${parts.join('\n\n')}\n`
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
  const findApiStmt = (file: SourceFile) =>
    file
      .getVariableStatements()
      .find(
        (stmt) =>
          stmt.isExported() && stmt.getDeclarations().some((decl) => decl.getName() === 'api'),
      )
  const existingApiStmt = findApiStmt(existingFile)
  const apiReplaceRange: [number, number] | null = existingApiStmt
    ? [existingApiStmt.getStart(), existingApiStmt.getEnd()]
    : null
  const generatedApiStmt = findApiStmt(generatedFile)
  const rawGeneratedApiText = generatedApiStmt?.getText() ?? ''
  const existingApiText = existingApiStmt?.getText() ?? ''
  const chainPrefix = extractChainPrefix(existingApiText)
  const generatedApiText = chainPrefix
    ? rawGeneratedApiText.replace(
        /\bapp(\s*)\.(?=\s*(?:openapi|route)\s*\()/,
        (_, ws) => `app${chainPrefix}${ws}.`,
      )
    : rawGeneratedApiText
  const mergedImports = mergeImports(existingFile, generatedFile)
  const bodyStart = getBodyStart(existingFile)
  const generatedBodyStart = getBodyStart(generatedFile)
  const existingBody = (() => {
    if (apiReplaceRange) {
      return (
        existingCode.slice(bodyStart, apiReplaceRange[0]) +
        generatedApiText +
        existingCode.slice(apiReplaceRange[1])
      )
    }
    // No api in existing. Only append the generated api block + trailing exports when
    // existing also lacks `export default` — i.e., the file looks incomplete (e.g. user
    // has middleware but never wrote api/default). When existing keeps `export default`,
    // assume the omission of api is intentional and leave the body untouched.
    const slice = existingCode.slice(bodyStart)
    if (slice.trim().length === 0 || !generatedApiStmt) return slice
    if (/\bexport\s+default\b/.test(slice)) return slice
    const trailing = generatedCode.slice(generatedApiStmt.getEnd())
    return `${slice.trimEnd()}\n\n${generatedApiText}${trailing}`
  })()
  const body = existingBody.trim() || generatedCode.slice(generatedBodyStart).trim()

  const parts = [mergedImports.length > 0 ? mergedImports.join('\n') : '', body].filter(Boolean)

  return `${parts.join('\n\n')}\n`
}

/**
 * Merges import declarations from two source files.
 *
 * For each module specifier, named imports are unioned with the following exception:
 * named imports ending in `Route` or `Handler` from the existing file are only kept
 * if they also appear in the generated file (to remove imports for deleted routes).
 *
 * Type-only imports are preserved as type-only when they appear as type-only in both sources,
 * or when they only appear in one source as type-only.
 *
 * @param existingFile - The existing source file (already parsed).
 * @param generatedFile - The generated source file (already parsed).
 * @returns Array of merged import declaration strings.
 */
function mergeImports(existingFile: SourceFile, generatedFile: SourceFile): string[] {
  // Parse raw import declarations from a single file
  const parseDeclarations = (file: SourceFile) =>
    file.getImportDeclarations().map((importDeclaration) => ({
      moduleSpecifier: importDeclaration.getModuleSpecifierValue(),
      isTypeOnlyImport: importDeclaration.isTypeOnly(),
      defaultImport: importDeclaration.getDefaultImport()?.getText(),
      namespaceImport: importDeclaration.getNamespaceImport()?.getText(),
      namedImports: importDeclaration.getNamedImports().map((namedImport) => ({
        name: namedImport.getName(),
        isTypeOnly: namedImport.isTypeOnly(),
      })),
    }))

  const existingImports = parseDeclarations(existingFile)
  const generatedImports = parseDeclarations(generatedFile)
  // Detect if a name is auto-generated (Route or Handler suffix)
  const isAutoName = (name: string): boolean => name.endsWith('Route') || name.endsWith('Handler')
  // Collect auto-generated names as source of truth
  const generatedAutoNames = new Set<string>()
  // Map: auto-name → module specifier in generated code (canonical path)
  const generatedAutoNameModules = new Map<string, string>()
  // Map: default import name → module specifier in generated code (canonical path)
  const generatedDefaultImportModules = new Map<string, string>()
  for (const importEntry of generatedImports) {
    if (importEntry.defaultImport) {
      generatedDefaultImportModules.set(importEntry.defaultImport, importEntry.moduleSpecifier)
    }
    for (const namedImport of importEntry.namedImports) {
      if (isAutoName(namedImport.name)) {
        generatedAutoNames.add(namedImport.name)
        generatedAutoNameModules.set(namedImport.name, importEntry.moduleSpecifier)
      }
    }
  }

  /**
   *Filter existing imports:
   * - Remove auto-names not in generated (deleted routes)
   * - Remove auto-names imported from a different module specifier (path-alias changed)
   * - Clear default imports when the same name is generated from a different module specifier
   */
  const filteredExistingImports = existingImports.map((importEntry) => {
    const defaultImport =
      importEntry.defaultImport !== undefined &&
      generatedDefaultImportModules.has(importEntry.defaultImport) &&
      generatedDefaultImportModules.get(importEntry.defaultImport) !== importEntry.moduleSpecifier
        ? undefined
        : importEntry.defaultImport
    return {
      ...importEntry,
      defaultImport,
      namedImports: importEntry.namedImports.filter((namedImport) => {
        if (!isAutoName(namedImport.name)) return true
        if (!generatedAutoNames.has(namedImport.name)) return false
        const canonicalModule = generatedAutoNameModules.get(namedImport.name)
        return canonicalModule === undefined || canonicalModule === importEntry.moduleSpecifier
      }),
    }
  })
  const importMap = new Map<
    string,
    {
      namedImports: Map<string, boolean>
      isTypeOnlyImport: boolean
      defaultImport?: string
      namespaceImport?: string
    }
  >()
  for (const entry of [...filteredExistingImports, ...generatedImports]) {
    const prev = importMap.get(entry.moduleSpecifier)
    const mergedNamedImports = new Map(prev?.namedImports ?? [])
    for (const namedImport of entry.namedImports) {
      const prevTypeOnly = mergedNamedImports.get(namedImport.name)
      mergedNamedImports.set(
        namedImport.name,
        prevTypeOnly === undefined
          ? namedImport.isTypeOnly
          : prevTypeOnly && namedImport.isTypeOnly,
      )
    }
    const defaultImport = entry.defaultImport ?? prev?.defaultImport
    const namespaceImport = entry.namespaceImport ?? prev?.namespaceImport
    importMap.set(entry.moduleSpecifier, {
      namedImports: mergedNamedImports,
      isTypeOnlyImport: prev
        ? prev.isTypeOnlyImport && entry.isTypeOnlyImport
        : entry.isTypeOnlyImport,
      ...(defaultImport !== undefined && { defaultImport }),
      ...(namespaceImport !== undefined && { namespaceImport }),
    })
  }

  return Array.from(importMap.entries())
    .map(([moduleSpecifier, info]) => {
      const namedPart =
        info.namedImports.size > 0
          ? `{ ${Array.from(info.namedImports.entries())
              .toSorted(([a], [b]) => a.localeCompare(b))
              .map(([name, isTypeOnly]) =>
                isTypeOnly && !info.isTypeOnlyImport ? `type ${name}` : name,
              )
              .join(', ')} }`
          : undefined
      const importParts = [
        info.defaultImport,
        info.namespaceImport ? `* as ${info.namespaceImport}` : undefined,
        namedPart,
      ].filter((p): p is string => p !== undefined)

      if (importParts.length === 0) return undefined

      const typePrefix = info.isTypeOnlyImport ? 'import type' : 'import'
      return `${typePrefix} ${importParts.join(', ')} from '${moduleSpecifier}'`
    })
    .filter((line): line is string => line !== undefined)
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
 * Returns a map of route name (first argument) to the full `.openapi(...)` text.
 */
function extractOpenApiCalls(code: string) {
  return new Map(
    [...code.matchAll(/\.openapi\s*\(/g)]
      .filter((match) => match.index !== undefined)
      .flatMap((match) => {
        const dotPos = match.index
        const parenPos = dotPos + match[0].length - 1
        const afterParen = code.slice(parenPos + 1).trimStart()
        const routeNameMatch = afterParen.match(/^(\w+)/)
        if (!routeNameMatch) return []
        const routeName = routeNameMatch[1]
        const end = findBalancedEnd(code, parenPos, '(', ')')
        return [[routeName, code.slice(dotPos, end)] as const]
      }),
  )
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
 * Extracts `function mockXxx(...)` definitions from test code.
 *
 * Uses balanced-brace counting to find the full extent of each function body.
 * Returns a map of function name to block info including text and source positions.
 */
function extractMockFunctions(code: string) {
  const regex = /function\s+(mock[A-Z]\w*)\s*\([^)]*\)\s*\{/g
  return new Map(
    [...code.matchAll(regex)]
      .filter((match) => match.index !== undefined)
      .map((match) => {
        const name = match[1]
        const start = match.index
        const braceStart = code.indexOf('{', start + match[0].length - 1)
        const end = findBalancedEnd(code, braceStart, '{', '}')
        return [name, { text: code.slice(start, end), start, end }] as const
      }),
  )
}

/**
 * Extracts `describe('METHOD /path', ...)` blocks from test code.
 *
 * Uses balanced-paren counting to find the full extent of each describe call.
 * Returns a map of route identifier (e.g., "GET /users") to block info
 * including text and source positions for removal.
 */
function extractRouteDescribeBlocks(code: string) {
  const regex = /describe\(\s*['"]([A-Z]+\s+\/[^'"]*)['"]/g
  return new Map(
    [...code.matchAll(regex)]
      .filter((match) => match.index !== undefined)
      .map((match) => {
        const route = match[1]
        const start = match.index
        const end = findBalancedEnd(code, start, '(', ')')
        return [route, { text: code.slice(start, end), start, end }] as const
      }),
  )
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
  // 1. Extract route describe blocks from both files
  const existingBlocks = extractRouteDescribeBlocks(existingCode)
  const generatedBlocks = extractRouteDescribeBlocks(generatedCode)
  const generatedRoutes = new Set(generatedBlocks.keys())
  const existingRoutes = new Set(existingBlocks.keys())
  // 2. Stale routes: in existing but not in generated → remove
  const staleRanges = [...existingBlocks.entries()]
    .filter(([route]) => !generatedRoutes.has(route))
    .map(([, block]): [number, number] => [block.start, block.end])
    .toSorted((a, b) => a[0] - b[0])
  // 3. New routes: in generated but not in existing → add
  const newBlocks = [...generatedBlocks.entries()]
    .filter(([route]) => !existingRoutes.has(route))
    .map(([, block]) => block.text)
  // 4. Merge imports (reuses the same Project — no redundant creation)
  const { existingFile, generatedFile } = createSourcePair(existingCode, generatedCode)
  const mergedImports = mergeImports(existingFile, generatedFile)
  const TEST_FRAMEWORK_MODULES = new Set(['vitest', 'bun:test', 'vite-plus/test'])
  const generatedTestModule = generatedFile
    .getImportDeclarations()
    .map((d) => d.getModuleSpecifierValue())
    .find((spec) => TEST_FRAMEWORK_MODULES.has(spec))
  const filteredImports = generatedTestModule
    ? mergedImports.filter((line) => {
        const spec = line.match(/from\s+'([^']+)'/)?.[1] ?? ''
        return !TEST_FRAMEWORK_MODULES.has(spec) || spec === generatedTestModule
      })
    : mergedImports
  // 5. Find body start (after imports) in existing code
  const bodyStart = getBodyStart(existingFile)
  // 6. Build body by removing stale describe blocks from original text
  const filteredRanges = staleRanges.filter(([start]) => start >= bodyStart)
  const bodyWithStaleRemoved = applyRangeOps(
    existingCode,
    bodyStart,
    filteredRanges.map(([start, end]) => [start, end, ''] as const),
  ).replace(/\n{3,}/g, '\n\n')
  // 7. Merge mock functions: add missing mock functions from generated code
  const existingMocks = extractMockFunctions(existingCode)
  const generatedMocks = extractMockFunctions(generatedCode)
  const missingMocks = [...generatedMocks.entries()]
    .filter(([name]) => !existingMocks.has(name))
    .map(([, block]) => block.text)
  const bodyWithRemovals = insertMissingMocks(bodyWithStaleRemoved, missingMocks)
  if (newBlocks.length === 0) {
    const parts = [
      filteredImports.length > 0 ? filteredImports.join('\n') : '',
      bodyWithRemovals.trim(),
    ].filter(Boolean)
    return `${parts.join('\n\n')}\n`
  }
  // 8. Find insertion point.
  // If existing has an outer non-route describe wrapper (e.g. `describe('Users', ...)`),
  // insert new route blocks BEFORE its closing `})`. Otherwise (route describes are
  // top-level) append at end — without this check, the last `})` belongs to the last
  // route describe and new blocks would be nested inside it.
  const lines = bodyWithRemovals.split('\n')
  const isRouteDescribeTitle = (title: string) => /^[A-Z]+\s+\//.test(title)
  const hasOuterWrapper = [
    ...bodyWithRemovals.matchAll(/^describe\s*\(\s*['"]([^'"]+)['"]/gm),
  ].some((m) => !isRouteDescribeTitle(m[1] ?? ''))
  const insertLineIndex = hasOuterWrapper
    ? lines.findLastIndex((line: string) => /^\s*\}\s*\)\s*;?\s*$/.test(line))
    : -1
  const modifiedLines =
    insertLineIndex !== -1
      ? [
          ...lines.slice(0, insertLineIndex),
          '',
          ...newBlocks.map((block) => `  ${block}`),
          ...lines.slice(insertLineIndex),
        ]
      : [...lines, '', ...newBlocks]
  const body = modifiedLines.join('\n').trim()
  const parts = [filteredImports.length > 0 ? filteredImports.join('\n') : '', body].filter(Boolean)
  return `${parts.join('\n\n')}\n`
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
