import { getCamelCaseSchemaName } from '../../../core/schema/references/get-camel-case-schema-name'

export function generateSchemasExport(orderedSchemas: string[]) {
  const camelCaseSchemas = orderedSchemas.map((schemaName) => getCamelCaseSchemaName(schemaName))
  return `export const schemas = {\n${camelCaseSchemas.join(',\n')}\n}`
}

// \n\n
