/**
 * AST-based merge module for handler files.
 *
 * Uses ts-morph to parse and merge generated handler code with existing user implementations,
 * preserving user edits while adding new handlers.
 *
 * @module merge
 */
import { Project, SyntaxKind } from 'ts-morph'

/**
 * Merges generated handler code with existing handler code.
 *
 * Merge rules:
 * - Handlers in both: keep existing (user implementation wins)
 * - Handlers only in generated: add (new endpoints)
 * - Handlers only in existing: keep (user-added code)
 * - Imports: union of both
 * - Non-handler code (helpers, constants): keep existing
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

  // Collect existing non-import statements (preserve all)
  const existingNonImportLines: string[] = []
  for (const stmt of existingFile.getStatements()) {
    if (stmt.getKind() === SyntaxKind.ImportDeclaration) continue
    existingNonImportLines.push(stmt.getText())
  }

  // Build output
  const parts: string[] = []

  if (mergedImports.length > 0) {
    parts.push(mergedImports.join('\n'))
  }

  if (existingNonImportLines.length > 0) {
    parts.push(existingNonImportLines.join('\n\n'))
  }

  if (newHandlerStatements.length > 0) {
    parts.push(newHandlerStatements.join('\n\n'))
  }

  return `${parts.join('\n\n')}\n`
}

/**
 * Merges import declarations from two source files.
 *
 * For each module specifier, named imports are unioned.
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

      let info = importMap.get(moduleSpecifier)
      if (info) {
        // If either source has a non-type-only import, the merged result should be non-type-only
        // unless both are type-only
        if (!isExisting) {
          info.isTypeOnlyImport = info.isTypeOnlyImport && isTypeOnlyImport
        }
      } else {
        info = {
          namedImports: new Map(),
          isTypeOnlyImport: isTypeOnlyImport,
        }
        importMap.set(moduleSpecifier, info)
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
  const lines: string[] = []
  for (const mod of allModules) {
    lines.push(existingExports.get(mod) ?? generatedExports.get(mod)!)
  }

  return `${lines.join('\n')}\n`
}
