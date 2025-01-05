// import { resolveSchemasDependencies } from "../../core/schema/references/resolve-schemas-dependencies";
// import type { Components } from "../../types";

// export function generateTypesCode(components: Components) {
//   // 1. schema extraction
//   const { schemas } = components
//   // 2. resolve schema dependencies to obtain proper ordering
//   const orderedSchemas = resolveSchemasDependencies(schemas)
//   // 3. if there are no schemas, return an empty string
//   if (orderedSchemas.length === 0) {
//     return ''
//   }
//   // 4. generate code for each schema

// }

import { resolveSchemasDependencies } from '../../core/schema/references/resolve-schemas-dependencies'
import type { Components } from '../../types'
import { getCamelCaseSchemaName } from '../../core/schema/references/get-camel-case-schema-name'
import { getPascalCaseSchemaName } from '../../core/schema/references/get-pascal-case-schema-name'
import { generateZodInfer } from '../zod/generate-zod-infer'

export function generateTypesCode(
  components: Components,
  namingCase: 'camelCase' | 'PascalCase' = 'camelCase',
): string {
  // 1. schema extraction
  const { schemas } = components
  // 2. resolve schema dependencies to obtain proper ordering
  const orderedSchemas = resolveSchemasDependencies(schemas)
  // 3. if there are no schemas, return an empty string
  if (orderedSchemas.length === 0) {
    return ''
  }
  // 4. generate code for each schema
  const typeDefinitions = orderedSchemas.map((schemaName) => {
    const variableName =
      namingCase === 'camelCase'
        ? getCamelCaseSchemaName(schemaName)
        : getPascalCaseSchemaName(schemaName)
    return generateZodInfer(variableName)
  })

  return typeDefinitions.join('\n\n')
}
