import type { Components } from '../../../../openapi/index.js'
import { ensureSuffix, toIdentifierPascalCase } from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'
import { zodType } from '../../../zod-to-openapi/type/index.js'

/**
 * Extracts schema references from generated Zod code.
 *
 * @param zSchema - Generated Zod schema code.
 * @param varNames - Set of all schema variable names.
 * @returns Array of referenced variable names.
 */
function extractSchemaRefs(zSchema: string, varNames: ReadonlySet<string>): readonly string[] {
  const refs: string[] = []
  for (const varName of varNames) {
    // Check if the variable name appears in the schema code
    // Use word boundary to avoid partial matches
    const pattern = new RegExp(`\\b${varName}\\b`)
    if (pattern.test(zSchema)) {
      refs.push(varName)
    }
  }
  return refs
}

/**
 * Detects schemas involved in circular references using Tarjan's algorithm.
 *
 * @param schemaNames - Array of schema names.
 * @param depsMap - Map of schema name to its dependencies (variable names).
 * @returns Set of schema names that are part of circular references.
 */
function detectCircularSchemas(
  schemaNames: readonly string[],
  depsMap: ReadonlyMap<string, readonly string[]>,
): ReadonlySet<string> {
  const cyclicSchemas = new Set<string>()

  // Build adjacency list using variable names
  const nameToVarName = new Map<string, string>()
  const varNameToName = new Map<string, string>()
  for (const name of schemaNames) {
    const varName = toIdentifierPascalCase(ensureSuffix(name, 'Schema'))
    nameToVarName.set(name, varName)
    varNameToName.set(varName, name)
  }

  // Tarjan's algorithm for finding strongly connected components
  let index = 0
  const indices = new Map<string, number>()
  const lowLinks = new Map<string, number>()
  const onStack = new Set<string>()
  const stack: string[] = []
  const sccs: string[][] = []

  const strongConnect = (name: string): void => {
    indices.set(name, index)
    lowLinks.set(name, index)
    index++
    stack.push(name)
    onStack.add(name)

    const deps = depsMap.get(name) ?? []
    for (const depVarName of deps) {
      const depName = varNameToName.get(depVarName)
      if (depName === undefined) continue

      if (!indices.has(depName)) {
        strongConnect(depName)
        lowLinks.set(name, Math.min(lowLinks.get(name) ?? 0, lowLinks.get(depName) ?? 0))
      } else if (onStack.has(depName)) {
        lowLinks.set(name, Math.min(lowLinks.get(name) ?? 0, indices.get(depName) ?? 0))
      }
    }

    if (lowLinks.get(name) === indices.get(name)) {
      const scc: string[] = []
      let w: string | undefined
      do {
        w = stack.pop()
        if (w !== undefined) {
          onStack.delete(w)
          scc.push(w)
        }
      } while (w !== name && w !== undefined)
      sccs.push(scc)
    }
  }

  for (const name of schemaNames) {
    if (!indices.has(name)) {
      strongConnect(name)
    }
  }

  // SCCs with more than one node, or self-referencing, are cyclic
  for (const scc of sccs) {
    if (scc.length > 1) {
      for (const name of scc) {
        cyclicSchemas.add(name)
      }
    } else if (scc.length === 1) {
      // Check for self-reference
      const name = scc[0]
      if (name !== undefined) {
        const varName = nameToVarName.get(name)
        const deps = depsMap.get(name) ?? []
        if (varName && deps.includes(varName)) {
          cyclicSchemas.add(name)
        }
      }
    }
  }

  return cyclicSchemas
}

export function schemas(
  components: Components,
  exportSchemas: boolean,
  exportSchemasTypes: boolean,
): string {
  // 1. schema extraction
  const { schemas } = components
  if (!schemas) return ''
  // 2. if there are no schemas, return an empty string
  const schemaNames = Object.keys(schemas)
  if (schemaNames.length === 0) return ''

  // 3. Pre-generate all Zod schemas to analyze dependencies
  const varNameSet = new Set(
    schemaNames.map((name) => toIdentifierPascalCase(ensureSuffix(name, 'Schema'))),
  )

  const zSchemaMap = new Map<string, string>()
  const depsMap = new Map<string, readonly string[]>()

  for (const schemaName of schemaNames) {
    const schema = schemas[schemaName]
    const zSchema = zodToOpenAPI(schema)
    const varName = toIdentifierPascalCase(ensureSuffix(schemaName, 'Schema'))

    zSchemaMap.set(schemaName, zSchema)

    // Extract dependencies (excluding self)
    const refs = extractSchemaRefs(zSchema, varNameSet).filter((ref) => ref !== varName)
    depsMap.set(schemaName, refs)
  }

  // 4. Detect circular references
  const cyclicSchemas = detectCircularSchemas(schemaNames, depsMap)

  // 5. generate code blocks for each schema
  const schemaBlocks = schemaNames.map((schemaName) => {
    const schema = schemas[schemaName]
    const zSchema = zSchemaMap.get(schemaName) ?? zodToOpenAPI(schema)
    const safeSchemaName = toIdentifierPascalCase(schemaName)
    const variableName = toIdentifierPascalCase(ensureSuffix(schemaName, 'Schema'))

    // Check if this schema is part of a circular reference
    const isCircular = cyclicSchemas.has(schemaName)
    const isSelfReferencing = zSchema.includes(variableName)
    const needsLazy = isCircular || isSelfReferencing

    const typeDefinition = needsLazy ? `${zodType(schema, safeSchemaName)}\n\n` : ''

    const z = needsLazy ? `z.lazy(() => ${zSchema})` : zSchema
    const returnValue = `:z.ZodType<${safeSchemaName}Type>`

    const schemaCode = exportSchemas
      ? `export const ${variableName}${needsLazy ? returnValue : ''} = ${z}.openapi('${safeSchemaName}')`
      : `const ${variableName}${needsLazy ? returnValue : ''} = ${z}.openapi('${safeSchemaName}')`

    const zodInferCode = exportSchemasTypes
      ? `\n\nexport type ${toIdentifierPascalCase(schemaName)} = z.infer<typeof ${variableName}>`
      : ''

    return `${typeDefinition}${schemaCode}${zodInferCode}`
  })
  // 6. return code
  return schemaBlocks.join('\n\n')
}
