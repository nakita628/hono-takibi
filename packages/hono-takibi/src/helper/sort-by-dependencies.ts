import ts from 'typescript'

interface Declaration {
  readonly name: string
  readonly fullText: string
  readonly references: readonly string[]
}

interface SchemaBlock {
  readonly name: string
  readonly code: string
}

/**
 * Parses TypeScript code and extracts variable and type alias declarations with their references.
 *
 * @param code - The TypeScript code to parse.
 * @returns An array of declarations with their names, full text, and references.
 */
function parseDeclarations(code: string): readonly Declaration[] {
  const sourceFile = ts.createSourceFile('temp.ts', code, ts.ScriptTarget.Latest, true)
  const declarations: Declaration[] = []

  const visit = (node: ts.Node): void => {
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) {
          const name = decl.name.text
          const fullText = node.getFullText(sourceFile).trim()
          const references = extractReferences(decl, name)
          declarations.push({ name, fullText, references })
        }
      }
    } else if (ts.isTypeAliasDeclaration(node)) {
      const name = node.name.text
      const fullText = node.getFullText(sourceFile).trim()
      const references = extractTypeReferences(node, name)
      declarations.push({ name, fullText, references })
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return declarations
}

/**
 * Extracts schema references from a variable declaration.
 *
 * @param decl - The variable declaration node.
 * @param selfName - The name of the current declaration (to exclude self-references).
 * @returns An array of referenced schema names.
 */
function extractReferences(decl: ts.VariableDeclaration, selfName: string): readonly string[] {
  const refs = new Set<string>()

  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node)) {
      const name = node.text
      if (name !== selfName && name.endsWith('Schema')) {
        refs.add(name)
      }
    }
    ts.forEachChild(node, visit)
  }

  if (decl.initializer) {
    visit(decl.initializer)
  }

  return Array.from(refs)
}

/**
 * Extracts schema references from a type alias declaration.
 *
 * @param node - The type alias declaration node.
 * @param selfName - The name of the current declaration (to exclude self-references).
 * @returns An array of referenced schema names.
 */
function extractTypeReferences(node: ts.TypeAliasDeclaration, selfName: string): readonly string[] {
  const refs = new Set<string>()

  const visit = (n: ts.Node): void => {
    if (ts.isIdentifier(n)) {
      const name = n.text
      if (name !== selfName && name.endsWith('Schema')) {
        refs.add(name)
      }
    }
    ts.forEachChild(n, visit)
  }

  visit(node.type)

  return Array.from(refs)
}

/**
 * Extracts schema references from a code block using regex.
 *
 * @param code - The code block to analyze.
 * @param selfName - The name of the current schema (to exclude self-references).
 * @returns An array of referenced schema names.
 */
function extractReferencesFromCode(code: string, selfName: string): readonly string[] {
  const refs = new Set<string>()
  const re = /\b([A-Za-z_$][A-Za-z0-9_$]*Schema)\b/g

  for (const m of code.matchAll(re)) {
    const name = m[1] ?? ''
    if (name && name !== selfName) {
      refs.add(name)
    }
  }

  return Array.from(refs)
}

/**
 * Sorts declarations in topological order based on their dependencies.
 *
 * @param declarations - The declarations to sort.
 * @returns The sorted declarations.
 */
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
 *
 * @param code - The TypeScript code containing schema declarations.
 * @returns The code with declarations sorted by dependencies.
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
 *
 * @param blocks - Array of schema blocks with name and code.
 * @returns Array of sorted schema blocks.
 */
export function sortSchemaBlocks(blocks: readonly SchemaBlock[]): readonly SchemaBlock[] {
  if (blocks.length === 0) return blocks

  const blockMap = new Map<string, SchemaBlock>()
  const depsMap = new Map<string, readonly string[]>()

  for (const block of blocks) {
    blockMap.set(block.name, block)
    depsMap.set(block.name, extractReferencesFromCode(block.code, block.name))
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
