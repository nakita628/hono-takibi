import { analyzeCircularSchemas } from '../../../../helper/index.js'
import type { Components } from '../../../../openapi/index.js'
import { ensureSuffix, toIdentifierPascalCase } from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'
import { zodType } from '../../../zod-to-openapi/type/index.js'

export function schemasCode(
  components: Components,
  exportSchemas: boolean,
  exportSchemasTypes: boolean,
): string {
  const { schemas } = components
  if (!schemas) return ''

  const schemaNames = Object.keys(schemas)
  if (schemaNames.length === 0) return ''

  const { zSchemaMap, cyclicSchemas, extendedCyclicSchemas, cyclicGroupPascal } =
    analyzeCircularSchemas(schemas, schemaNames)

  // Single pass: compute all schema info
  const schemaInfos = schemaNames.map((schemaName) => {
    const schema = schemas[schemaName]
    const zSchema = zSchemaMap.get(schemaName) ?? zodToOpenAPI(schema)
    const safeSchemaName = toIdentifierPascalCase(schemaName)
    const variableName = toIdentifierPascalCase(ensureSuffix(schemaName, 'Schema'))

    const isCircular = cyclicSchemas.has(schemaName)
    const isSelfReferencing = zSchema.includes(variableName)
    const needsLazy = isCircular || isSelfReferencing
    const needsTypeDef = needsLazy || extendedCyclicSchemas.has(schemaName)

    return { schemaName, schema, zSchema, safeSchemaName, variableName, needsLazy, needsTypeDef }
  })

  // Collect type definitions
  const cyclicTypeDefinitions: string[] = []
  const generatedTypeNames = new Set<string>()

  for (const info of schemaInfos) {
    if (info.needsTypeDef) {
      cyclicTypeDefinitions.push(zodType(info.schema, info.safeSchemaName, cyclicGroupPascal))
      generatedTypeNames.add(`${info.safeSchemaName}Type`)
    }
  }

  // Add missing type definitions for referenced types
  const referencedTypes = new Set<string>()
  for (const typeDef of cyclicTypeDefinitions) {
    for (const match of typeDef.matchAll(/(\w+Type)\b/g)) {
      if (match[1]) referencedTypes.add(match[1])
    }
  }
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

  // Generate schema code blocks from pre-computed info
  const exportKeyword = exportSchemas ? 'export ' : ''
  const schemaBlocks = schemaInfos.map((info) => {
    const z = info.needsLazy ? `z.lazy(() => ${info.zSchema})` : info.zSchema
    const returnType = info.needsTypeDef ? `:z.ZodType<${info.safeSchemaName}Type>` : ''

    const schemaCode = `${exportKeyword}const ${info.variableName}${returnType}=${z}.openapi('${info.safeSchemaName}')`
    const zodInferCode = exportSchemasTypes
      ? `\n\nexport type ${info.safeSchemaName}=z.infer<typeof ${info.variableName}>`
      : ''

    return `${schemaCode}${zodInferCode}`
  })

  const typeDefsBlock = cyclicTypeDefinitions.join('\n\n')
  const schemasBlock = schemaBlocks.join('\n\n')

  return typeDefsBlock ? `${typeDefsBlock}\n\n${schemasBlock}` : schemasBlock
}
