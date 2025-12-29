import { resolveSchemasDependencies } from '../../../../helper/resolve-schemas-dependencies.js'
import { zodToOpenAPISchema } from '../../../../helper/zod-to-openapi-schema.js'
import type { Components } from '../../../../openapi/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

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
      const selfToken = `${schemaName}Schema`

      console.log('--------------------------------')
      console.log(selfToken)
      console.log('--------------------------------')

      const zExpr = zSchema.includes(selfToken) ? `z.lazy(() => ${zSchema})` : zSchema
      // 4.4 generate zod schema definition
      return zodToOpenAPISchema(schemaName, zExpr, exportSchemas, exportSchemasTypes)
    })
    .join('\n\n')
  // 5. return code
  return schemaDefinitions
}
