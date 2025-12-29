import { resolveSchemasDependencies } from '../../../../helper/resolve-schemas-dependencies.js'
import type { Components } from '../../../../openapi/index.js'
import { ensureSuffix, sanitizeIdentifier, toIdentifier } from '../../../../utils/index.js'
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
  // 2. resolve schema dependencies to obtain proper ordering
  const orderedSchemas = resolveSchemasDependencies(schemas)
  // 3. if there are no schemas, return an empty string
  if (orderedSchemas.length === 0) return ''
  // 4. generate code for each schema
  const schemaDefinitions = orderedSchemas
    .map((schemaName) => {
      // 4.1 get schema definition corresponding to schema name
      const schema = schemas[schemaName]
      // 4.2 generate zod schema
      const zSchema = zodToOpenAPI(schema)
      // 4.3 wrap self-referencing schemas with z.lazy() to handle circular dependencies
      const selfToken = toIdentifier(ensureSuffix(schemaName, 'Schema'))

      const isSelfReferencing = zSchema.includes(selfToken)
      
      const typeDefinition = isSelfReferencing ? `${zodType(schema, schemaName)}\n\n` : ''

      const z = isSelfReferencing ? `z.lazy(() => ${zSchema})` : zSchema
      const returnValue = `:z.ZodType<${schemaName}Type>`

      // 4.4 generate zod schema definition
      const variableName = toIdentifier(ensureSuffix(schemaName, 'Schema'))
      const safeVariableName = variableName
      const schemaCode = exportSchemas
        ? `export const ${safeVariableName}${isSelfReferencing ? returnValue : ''} = ${z}`
        : `const ${safeVariableName}${isSelfReferencing ? returnValue : ''} = ${z}`

      const safeTypeVariableName = sanitizeIdentifier(schemaName)

      const zodInferCode = exportSchemasTypes
        ? `\n\nexport type ${safeTypeVariableName} = z.infer<typeof ${safeVariableName}>`
        : ''

      return `${typeDefinition}${schemaCode}${zodInferCode}`
    })
    .join('\n\n')
  // 5. return code
  return schemaDefinitions
}
