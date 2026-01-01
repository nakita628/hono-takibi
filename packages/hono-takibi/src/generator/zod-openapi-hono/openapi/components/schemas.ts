import type { Components } from '../../../../openapi/index.js'
import { ensureSuffix, toIdentifierPascalCase } from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'
import { zodType } from '../../../zod-to-openapi/type/index.js'

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
  // 3. generate code blocks for each schema
  const schemaBlocks = schemaNames.map((schemaName) => {
    // 3.1 get schema definition corresponding to schema name
    const schema = schemas[schemaName]
    // 3.2 generate zod schema
    const zSchema = zodToOpenAPI(schema)
    const safeSchemaName = toIdentifierPascalCase(schemaName)
    // 3.3 wrap self-referencing schemas with z.lazy() to handle circular dependencies
    const variableName = toIdentifierPascalCase(ensureSuffix(schemaName, 'Schema'))

    const isSelfReferencing = zSchema.includes(variableName)

    const typeDefinition = isSelfReferencing ? `${zodType(schema, safeSchemaName)}\n\n` : ''

    const z = isSelfReferencing ? `z.lazy(() => ${zSchema})` : zSchema
    const returnValue = `:z.ZodType<${safeSchemaName}Type>`

    // 3.4 generate zod schema definition
    const schemaCode = exportSchemas
      ? `export const ${variableName}${isSelfReferencing ? returnValue : ''} = ${z}.openapi('${safeSchemaName}')`
      : `const ${variableName}${isSelfReferencing ? returnValue : ''} = ${z}.openapi('${safeSchemaName}')`

    const zodInferCode = exportSchemasTypes
      ? `\n\nexport type ${toIdentifierPascalCase(schemaName)} = z.infer<typeof ${variableName}>`
      : ''

    return `${typeDefinition}${schemaCode}${zodInferCode}`
  })
  // 4. return code
  return schemaBlocks.join('\n\n')
}
