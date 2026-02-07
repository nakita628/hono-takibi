/**
 * AST-based merge module for generated files.
 *
 * Uses ts-morph for AST analysis and original text slicing for output,
 * preserving user edits (including comments) while syncing with OpenAPI spec changes.
 *
 * Supports three file types:
 * - Handler files: add/remove/preserve handlers based on OpenAPI routes
 * - App file (index.ts): replace the `.openapi()` chain while preserving middleware/comments
 * - Barrel files: union of `export * from` statements
 *
 * @module merge
 */
import { Project } from 'ts-morph'

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

  // Collect generated handler names (source of truth from OpenAPI)
  const generatedHandlerNames = new Set<string>()
  for (const stmt of generatedFile.getVariableStatements()) {
    if (!stmt.isExported()) continue
    for (const decl of stmt.getDeclarations()) {
      if (decl.getName().endsWith('RouteHandler')) {
        generatedHandlerNames.add(decl.getName())
      }
    }
  }

  // Collect existing handler names
  const existingHandlerNames = new Set<string>()
  for (const stmt of existingFile.getVariableStatements()) {
    if (!stmt.isExported()) continue
    for (const decl of stmt.getDeclarations()) {
      if (decl.getName().endsWith('RouteHandler')) {
        existingHandlerNames.add(decl.getName())
      }
    }
  }

  // Determine delete ranges (handlers in existing but not in generated)
  const deleteRanges: Array<[number, number]> = []
  for (const stmt of existingFile.getVariableStatements()) {
    if (!stmt.isExported()) continue
    for (const decl of stmt.getDeclarations()) {
      if (decl.getName().endsWith('RouteHandler') && !generatedHandlerNames.has(decl.getName())) {
        deleteRanges.push([stmt.getFullStart(), stmt.getEnd()])
        break
      }
    }
  }
  deleteRanges.sort((a, b) => a[0] - b[0])

  // Find body start (after last import declaration)
  const importDecls = existingFile.getImportDeclarations()
  const bodyStart =
    importDecls.length > 0 ? importDecls[importDecls.length - 1].getEnd() : 0

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

  // Collect new handlers (in generated but not in existing)
  const newHandlerStatements: string[] = []
  for (const stmt of generatedFile.getVariableStatements()) {
    if (!stmt.isExported()) continue
    for (const decl of stmt.getDeclarations()) {
      if (decl.getName().endsWith('RouteHandler') && !existingHandlerNames.has(decl.getName())) {
        newHandlerStatements.push(stmt.getText())
        break
      }
    }
  }

  // Merge imports
  const mergedImports = mergeImports(existingCode, generatedCode)

  // Build output
  const parts: string[] = []

  if (mergedImports.length > 0) {
    parts.push(mergedImports.join('\n'))
  }

  const trimmedBody = body.trim()
  if (trimmedBody) {
    parts.push(trimmedBody)
  }

  if (newHandlerStatements.length > 0) {
    parts.push(newHandlerStatements.join('\n\n'))
  }

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

  // Merge imports
  const mergedImports = mergeImports(existingCode, generatedCode)

  // Find body start (after last import declaration)
  const importDecls = existingFile.getImportDeclarations()
  const bodyStart =
    importDecls.length > 0 ? importDecls[importDecls.length - 1].getEnd() : 0

  // Build body: replace api statement, keep everything else
  const body = apiReplaceRange
    ? existingCode.slice(bodyStart, apiReplaceRange[0]) +
      generatedApiText +
      existingCode.slice(apiReplaceRange[1])
    : existingCode.slice(bodyStart)

  // Build output
  const parts: string[] = []

  if (mergedImports.length > 0) {
    parts.push(mergedImports.join('\n'))
  }

  const trimmedBody = body.trim()
  if (trimmedBody) {
    parts.push(trimmedBody)
  }

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

  // Collect auto-generated names (ending in Route or RouteHandler) as source of truth
  const generatedAutoNames = new Set<string>()
  for (const imp of generatedFile.getImportDeclarations()) {
    for (const named of imp.getNamedImports()) {
      const name = named.getName()
      if (name.endsWith('Route') || name.endsWith('RouteHandler')) {
        generatedAutoNames.add(name)
      }
    }
  }

  // Map: moduleSpecifier → { namedImports: Map<name, isTypeOnly>, isTypeOnlyImport: boolean }
  type ImportInfo = {
    namedImports: Map<string, boolean>
    isTypeOnlyImport: boolean
    defaultImport?: string
    namespaceImport?: string
  }

  const importMap = new Map<string, ImportInfo>()

  function collectImports(
    file: ReturnType<typeof project.createSourceFile>,
    isExisting: boolean,
  ): void {
    for (const imp of file.getImportDeclarations()) {
      const moduleSpecifier = imp.getModuleSpecifierValue()
      const isTypeOnlyImport = imp.isTypeOnly()

      if (!importMap.has(moduleSpecifier)) {
        importMap.set(moduleSpecifier, {
          namedImports: new Map(),
          isTypeOnlyImport: isTypeOnlyImport,
        })
      }
      const info = importMap.get(moduleSpecifier) as ImportInfo
      // If either source has a non-type-only import, the merged result should be non-type-only
      // unless both are type-only
      if (!isExisting) {
        info.isTypeOnlyImport = info.isTypeOnlyImport && isTypeOnlyImport
      }

      const defaultImport = imp.getDefaultImport()
      if (defaultImport) {
        info.defaultImport = defaultImport.getText()
      }

      const namespaceImport = imp.getNamespaceImport()
      if (namespaceImport) {
        info.namespaceImport = namespaceImport.getText()
      }

      for (const named of imp.getNamedImports()) {
        const name = named.getName()
        const isTypeOnlySpecifier = named.isTypeOnly()

        // For existing imports: skip auto-generated names not in generated (deleted routes)
        if (
          isExisting &&
          (name.endsWith('Route') || name.endsWith('RouteHandler')) &&
          !generatedAutoNames.has(name)
        ) {
          continue
        }

        const existingTypeOnly = info.namedImports.get(name)
        if (existingTypeOnly === undefined) {
          info.namedImports.set(name, isTypeOnlySpecifier)
        } else {
          // Keep as type-only only if both are type-only
          info.namedImports.set(name, existingTypeOnly && isTypeOnlySpecifier)
        }
      }
    }
  }

  collectImports(existingFile, true)
  collectImports(generatedFile, false)

  const result: string[] = []
  for (const [moduleSpecifier, info] of importMap) {
    const parts: string[] = []

    if (info.defaultImport) {
      parts.push(info.defaultImport)
    }

    if (info.namespaceImport) {
      parts.push(`* as ${info.namespaceImport}`)
    }

    if (info.namedImports.size > 0) {
      const namedParts = Array.from(info.namedImports.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, isTypeOnly]) => {
          if (isTypeOnly && !info.isTypeOnlyImport) {
            return `type ${name}`
          }
          return name
        })
      parts.push(`{ ${namedParts.join(', ')} }`)
    }

    // Skip empty import declarations (all named imports were filtered out)
    if (parts.length === 0) continue

    const typePrefix = info.isTypeOnlyImport ? 'import type' : 'import'
    result.push(`${typePrefix} ${parts.join(', ')} from '${moduleSpecifier}'`)
  }

  return result
}

/**
 * Merges barrel file (index.ts) content by taking the union of `export * from '...'` statements.
 *
 * @param existingCode - The current barrel file content.
 * @param generatedCode - The newly generated barrel file content.
 * @returns The merged barrel file content.
 */
export function mergeBarrelFile(existingCode: string, generatedCode: string): string {
  const exportPattern = /^export \* from ['"]([^'"]+)['"]/
  const existingExports = new Map<string, string>()
  const generatedExports = new Map<string, string>()

  for (const line of existingCode.split('\n')) {
    const match = line.match(exportPattern)
    if (match) {
      existingExports.set(match[1], line)
    }
  }

  for (const line of generatedCode.split('\n')) {
    const match = line.match(exportPattern)
    if (match) {
      generatedExports.set(match[1], line)
    }
  }

  // Union: keep existing lines, add new ones from generated
  const allModules = new Set([...existingExports.keys(), ...generatedExports.keys()])
  const lines = [...allModules]
    .map((mod) => existingExports.get(mod) ?? generatedExports.get(mod) ?? '')
    .filter((line) => line !== '')

  return `${lines.join('\n')}\n`
}
