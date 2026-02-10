/**
 * AST-based merge module for generated files.
 *
 * Uses ts-morph for AST analysis and original text slicing for output,
 * preserving user edits (including comments) while syncing with OpenAPI spec changes.
 *
 * Supports four file types:
 * - Handler files: add/remove/preserve handlers based on OpenAPI routes
 * - App file (index.ts): replace the `.openapi()` chain while preserving middleware/comments
 * - Test files: preserve user mocks/tests, add/remove route test stubs based on OpenAPI routes
 * - Barrel files: sync with generated (source of truth)
 *
 * @module merge
 */
import { Project } from 'ts-morph'

/**
 * Finds the end position of a balanced parenthesized expression.
 *
 * Recursively scans from `start`, counting opening/closing parens,
 * and returns the position just after the matching closing paren.
 */
function findBalancedParenEnd(code: string, start: number): number {
  const scan = (pos: number, depth: number): number => {
    if (pos >= code.length) return start
    const ch = code[pos]
    const nextDepth = depth + (ch === '(' ? 1 : ch === ')' ? -1 : 0)
    if (ch === ')' && nextDepth === 0) return pos + 1
    return scan(pos + 1, nextDepth)
  }
  return scan(start, 0)
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
 * A "handler" is identified as an exported variable declaration whose name ends with `RouteHandler`.
 *
 * @param existingCode - The current file content (user-modified).
 * @param generatedCode - The newly generated file content.
 * @returns The merged source code.
 */
export function mergeHandlerFile(existingCode: string, generatedCode: string): string {
  const project = new Project({ useInMemoryFileSystem: true })
  const existingFile = project.createSourceFile('existing.ts', existingCode)
  const generatedFile = project.createSourceFile('generated.ts', generatedCode)

  const collectHandlerNames = (file: ReturnType<typeof project.createSourceFile>) =>
    new Set(
      file
        .getVariableStatements()
        .filter((stmt) => stmt.isExported())
        .flatMap((stmt) => stmt.getDeclarations())
        .filter((decl) => decl.getName().endsWith('RouteHandler'))
        .map((decl) => decl.getName()),
    )

  const generatedHandlerNames = collectHandlerNames(generatedFile)
  const existingHandlerNames = collectHandlerNames(existingFile)

  // Delete ranges: handlers in existing but not in generated (route removed from OpenAPI)
  const deleteRanges = existingFile
    .getVariableStatements()
    .filter(
      (stmt) =>
        stmt.isExported() &&
        stmt
          .getDeclarations()
          .some(
            (decl) =>
              decl.getName().endsWith('RouteHandler') && !generatedHandlerNames.has(decl.getName()),
          ),
    )
    .map((stmt): [number, number] => [stmt.getFullStart(), stmt.getEnd()])
    .toSorted((a, b) => a[0] - b[0])

  // Find body start (after last import declaration)
  const importDecls = existingFile.getImportDeclarations()
  const bodyStart = importDecls.length > 0 ? importDecls[importDecls.length - 1].getEnd() : 0

  // Build body by removing deleted ranges from original text
  const filteredRanges = deleteRanges.filter(([start]) => start >= bodyStart)
  const keepSlices = [
    ...filteredRanges.map(([start], i) =>
      existingCode.slice(i === 0 ? bodyStart : filteredRanges[i - 1][1], start),
    ),
    existingCode.slice(
      filteredRanges.length > 0 ? filteredRanges[filteredRanges.length - 1][1] : bodyStart,
    ),
  ]
  // Clean up excessive blank lines from deletions
  const body = keepSlices.join('').replace(/\n{3,}/g, '\n\n')

  // New handlers: in generated but not in existing
  const newHandlerStatements = generatedFile
    .getVariableStatements()
    .filter(
      (stmt) =>
        stmt.isExported() &&
        stmt
          .getDeclarations()
          .some(
            (decl) =>
              decl.getName().endsWith('RouteHandler') && !existingHandlerNames.has(decl.getName()),
          ),
    )
    .map((stmt) => stmt.getText())

  const mergedImports = mergeImports(existingCode, generatedCode)

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
export function mergeAppFile(existingCode: string, generatedCode: string): string {
  const project = new Project({ useInMemoryFileSystem: true })
  const existingFile = project.createSourceFile('existing.ts', existingCode)
  const generatedFile = project.createSourceFile('generated.ts', generatedCode)

  // Find 'export const api = ...' in existing (position for replacement)
  // Use getStart() (not getFullStart()) to preserve leading comments
  const existingApiStmt = existingFile
    .getVariableStatements()
    .find(
      (stmt) =>
        stmt.isExported() && stmt.getDeclarations().some((decl) => decl.getName() === 'api'),
    )
  const apiReplaceRange: [number, number] | null = existingApiStmt
    ? [existingApiStmt.getStart(), existingApiStmt.getEnd()]
    : null

  // Get 'export const api = ...' text from generated
  const generatedApiStmt = generatedFile
    .getVariableStatements()
    .find(
      (stmt) =>
        stmt.isExported() && stmt.getDeclarations().some((decl) => decl.getName() === 'api'),
    )
  const generatedApiText = generatedApiStmt?.getText() ?? ''

  const mergedImports = mergeImports(existingCode, generatedCode)

  // Find body start (after last import declaration)
  const importDecls = existingFile.getImportDeclarations()
  const bodyStart = importDecls.length > 0 ? importDecls[importDecls.length - 1].getEnd() : 0

  // Build body: replace api statement, keep everything else
  const existingBody = apiReplaceRange
    ? existingCode.slice(bodyStart, apiReplaceRange[0]) +
      generatedApiText +
      existingCode.slice(apiReplaceRange[1])
    : existingCode.slice(bodyStart)

  // Fallback to generated body when existing file has no body content
  // (e.g., existing file contains only imports)
  const generatedImportDecls = generatedFile.getImportDeclarations()
  const generatedBodyStart =
    generatedImportDecls.length > 0
      ? generatedImportDecls[generatedImportDecls.length - 1].getEnd()
      : 0
  const body = existingBody.trim() || generatedCode.slice(generatedBodyStart).trim()

  const parts = [mergedImports.length > 0 ? mergedImports.join('\n') : '', body].filter(Boolean)

  return `${parts.join('\n\n')}\n`
}

/**
 * Merges import declarations from two source files.
 *
 * For each module specifier, named imports are unioned with the following exception:
 * named imports ending in `Route` or `RouteHandler` from the existing file are only kept
 * if they also appear in the generated file (to remove imports for deleted routes).
 *
 * Type-only imports are preserved as type-only when they appear as type-only in both sources,
 * or when they only appear in one source as type-only.
 *
 * @param existingCode - The current file content.
 * @param generatedCode - The newly generated file content.
 * @returns Array of merged import declaration strings.
 */
function mergeImports(existingCode: string, generatedCode: string): string[] {
  const project = new Project({ useInMemoryFileSystem: true })
  const existingFile = project.createSourceFile('existing.ts', existingCode)
  const generatedFile = project.createSourceFile('generated.ts', generatedCode)

  // Parse raw import declarations from a single file
  const parseDeclarations = (file: ReturnType<typeof project.createSourceFile>) =>
    file.getImportDeclarations().map((imp) => ({
      moduleSpecifier: imp.getModuleSpecifierValue(),
      isTypeOnlyImport: imp.isTypeOnly(),
      defaultImport: imp.getDefaultImport()?.getText(),
      namespaceImport: imp.getNamespaceImport()?.getText(),
      namedImports: imp.getNamedImports().map((n) => ({
        name: n.getName(),
        isTypeOnly: n.isTypeOnly(),
      })),
    }))

  const existingImports = parseDeclarations(existingFile)
  const generatedImports = parseDeclarations(generatedFile)

  // Collect auto-generated names (ending in Route or RouteHandler) as source of truth
  const generatedAutoNames = new Set<string>()
  // Map: auto-name → module specifier in generated code (canonical path)
  const generatedAutoNameModules = new Map<string, string>()
  for (const imp of generatedImports) {
    for (const n of imp.namedImports) {
      if (n.name.endsWith('Route') || n.name.endsWith('RouteHandler')) {
        generatedAutoNames.add(n.name)
        generatedAutoNameModules.set(n.name, imp.moduleSpecifier)
      }
    }
  }

  // Filter existing: remove auto-names not in generated (deleted routes)
  // AND auto-names imported from a different module specifier (path-alias changed)
  const filteredExistingImports = existingImports.map((imp) => ({
    ...imp,
    namedImports: imp.namedImports.filter((n) => {
      const isAutoName = n.name.endsWith('Route') || n.name.endsWith('RouteHandler')
      if (!isAutoName) return true
      if (!generatedAutoNames.has(n.name)) return false
      const canonicalModule = generatedAutoNameModules.get(n.name)
      return canonicalModule === undefined || canonicalModule === imp.moduleSpecifier
    }),
  }))

  // Build merged import map (existing first, then generated overrides isTypeOnlyImport)
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
    for (const n of entry.namedImports) {
      const prevTypeOnly = mergedNamedImports.get(n.name)
      mergedNamedImports.set(
        n.name,
        prevTypeOnly === undefined ? n.isTypeOnly : prevTypeOnly && n.isTypeOnly,
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
 * Extracts `describe('METHOD /path', ...)` blocks from test code.
 *
 * Uses balanced-paren counting to find the full extent of each describe call.
 * Returns a map of route identifier (e.g., "GET /users") to block info
 * including text and source positions for removal.
 */
function extractRouteDescribeBlocks(
  code: string,
): Map<string, { readonly text: string; readonly start: number; readonly end: number }> {
  const regex = /describe\(\s*['"]([A-Z]+\s+\/[^'"]*)['"]/g

  return new Map(
    [...code.matchAll(regex)]
      .filter((match) => match.index !== undefined)
      .map((match) => {
        const route = match[1]
        const start = match.index
        const end = findBalancedParenEnd(code, start)
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
export function mergeTestFile(existingCode: string, generatedCode: string): string {
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

  // 4. Merge imports
  const mergedImports = mergeImports(existingCode, generatedCode)

  // 5. Find body start (after imports) in existing code
  const project = new Project({ useInMemoryFileSystem: true })
  const existFile = project.createSourceFile('existing.ts', existingCode)
  const importDecls = existFile.getImportDeclarations()
  const bodyStart = importDecls.length > 0 ? importDecls[importDecls.length - 1].getEnd() : 0

  // 6. Build body by removing stale describe blocks from original text
  const filteredRanges = staleRanges.filter(([start]) => start >= bodyStart)
  const keepSlices = [
    ...filteredRanges.map(([start], i) =>
      existingCode.slice(i === 0 ? bodyStart : filteredRanges[i - 1][1], start),
    ),
    existingCode.slice(
      filteredRanges.length > 0 ? filteredRanges[filteredRanges.length - 1][1] : bodyStart,
    ),
  ]
  const bodyWithRemovals = keepSlices.join('').replace(/\n{3,}/g, '\n\n')

  if (newBlocks.length === 0) {
    const parts = [
      mergedImports.length > 0 ? mergedImports.join('\n') : '',
      bodyWithRemovals.trim(),
    ].filter(Boolean)
    return `${parts.join('\n\n')}\n`
  }

  // 7. Find insertion point: last line matching /^\s*\}\s*\)\s*;?\s*$/ (outer describe close)
  const lines = bodyWithRemovals.split('\n')
  const insertLineIndex = lines.findLastIndex((line) => /^\s*\}\s*\)\s*;?\s*$/.test(line))

  const modifiedLines =
    insertLineIndex !== -1
      ? [
          ...lines.slice(0, insertLineIndex),
          '',
          ...newBlocks.map((b) => `  ${b}`),
          ...lines.slice(insertLineIndex),
        ]
      : [...lines, '', ...newBlocks]

  const body = modifiedLines.join('\n').trim()
  const parts = [mergedImports.length > 0 ? mergedImports.join('\n') : '', body].filter(Boolean)
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
export function mergeBarrelFile(_existingCode: string, generatedCode: string): string {
  return generatedCode
}
