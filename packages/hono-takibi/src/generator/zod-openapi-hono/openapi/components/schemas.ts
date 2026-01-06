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

export function schemasCode(
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

  // 4.5. Extend cyclic group to include all schemas referenced by cyclic schemas
  // This ensures that when a cyclic schema references another schema,
  // that schema also gets a type definition generated
  const varNameToName = new Map<string, string>()
  for (const name of schemaNames) {
    const varName = toIdentifierPascalCase(ensureSuffix(name, 'Schema'))
    varNameToName.set(varName, name)
  }
  const extendedCyclicSchemas = new Set(cyclicSchemas)
  for (const schemaName of cyclicSchemas) {
    const deps = depsMap.get(schemaName) ?? []
    for (const depVarName of deps) {
      const depName = varNameToName.get(depVarName)
      if (depName) extendedCyclicSchemas.add(depName)
    }
  }

  // 5. Create PascalCase set for cyclic group (for type generation)
  const cyclicGroupPascal = new Set(
    Array.from(extendedCyclicSchemas).map((name) => toIdentifierPascalCase(name)),
  )

  // 6. Generate type definitions for cyclic schemas first (all together)
  // Use extendedCyclicSchemas to include schemas referenced by cyclic schemas
  const cyclicTypeDefinitions: string[] = []
  const generatedTypeNames = new Set<string>()

  for (const schemaName of schemaNames) {
    const schema = schemas[schemaName]
    const zSchema = zSchemaMap.get(schemaName) ?? zodToOpenAPI(schema)
    const safeSchemaName = toIdentifierPascalCase(schemaName)
    const variableName = toIdentifierPascalCase(ensureSuffix(schemaName, 'Schema'))

    const isCircular = cyclicSchemas.has(schemaName)
    const isExtendedCircular = extendedCyclicSchemas.has(schemaName)
    const isSelfReferencing = zSchema.includes(variableName)
    const needsLazy = isCircular || isSelfReferencing
    const needsTypeDef = needsLazy || isExtendedCircular

    if (needsTypeDef) {
      cyclicTypeDefinitions.push(zodType(schema, safeSchemaName, cyclicGroupPascal))
      generatedTypeNames.add(`${safeSchemaName}Type`)
    }
  }

  // 6.5. Check for missing type definitions (referenced but not defined)
  // This handles cases where circular detection may have missed some schemas
  const referencedTypes = new Set<string>()
  for (const typeDef of cyclicTypeDefinitions) {
    const matches = typeDef.matchAll(/(\w+Type)\b/g)
    for (const match of matches) {
      if (match[1]) referencedTypes.add(match[1])
    }
  }

  // Add missing type definitions
  for (const refType of referencedTypes) {
    if (!generatedTypeNames.has(refType)) {
      const schemaName = refType.replace(/Type$/, '')
      const schema = schemas[schemaName]
      if (schema) {
        cyclicTypeDefinitions.push(zodType(schema, schemaName, cyclicGroupPascal))
        generatedTypeNames.add(refType)
      }
    }
  }

  // 7. Generate code blocks for each schema
  const schemaBlocks = schemaNames.map((schemaName) => {
    const schema = schemas[schemaName]
    const zSchema = zSchemaMap.get(schemaName) ?? zodToOpenAPI(schema)
    const safeSchemaName = toIdentifierPascalCase(schemaName)
    const variableName = toIdentifierPascalCase(ensureSuffix(schemaName, 'Schema'))

    // Check if this schema is part of a circular reference
    const isCircular = cyclicSchemas.has(schemaName)
    const isExtendedCircular = extendedCyclicSchemas.has(schemaName)
    const isSelfReferencing = zSchema.includes(variableName)
    const needsLazy = isCircular || isSelfReferencing
    // Use z.lazy for circular schemas, and add type annotation for extended circular schemas
    const needsTypeAnnotation = needsLazy || isExtendedCircular

    const z = needsLazy ? `z.lazy(() => ${zSchema})` : zSchema
    const returnValue = `:z.ZodType<${safeSchemaName}Type>`

    const schemaCode = exportSchemas
      ? `export const ${variableName}${needsTypeAnnotation ? returnValue : ''} = ${z}.openapi('${safeSchemaName}')`
      : `const ${variableName}${needsTypeAnnotation ? returnValue : ''} = ${z}.openapi('${safeSchemaName}')`

    const zodInferCode = exportSchemasTypes
      ? `\n\nexport type ${toIdentifierPascalCase(schemaName)} = z.infer<typeof ${variableName}>`
      : ''

    return `${schemaCode}${zodInferCode}`
  })

  // 8. Combine type definitions and schema blocks
  const typeDefsBlock = cyclicTypeDefinitions.length > 0 ? cyclicTypeDefinitions.join('\n\n') : ''
  const schemasBlock = schemaBlocks.join('\n\n')

  return typeDefsBlock ? `${typeDefsBlock}\n\n${schemasBlock}` : schemasBlock
}
