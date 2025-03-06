// import { resolveSchemasDependencies } from "../../core/schema/references/resolve-schemas-dependencies";
// import type { Components } from "../../type";

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

import { resolveSchemasDependencies } from '../../../../core/schema/references/resolve-schemas-dependencies'
import type { Components } from '../../../../type'
import { generateZodInfer } from '../../../zod/generate-zod-infer'
import type { Config } from '../../../../config'

export function generateTypesCode(components: Components, config: Config): string {
  // 1. schema extraction
  const { schemas } = components
  if (!schemas) {
    return ''
  }
  // 2. resolve schema dependencies to obtain proper ordering
  const orderedSchemas = resolveSchemasDependencies(schemas)
  // 3. if there are no schemas, return an empty string
  if (orderedSchemas.length === 0) {
    return ''
  }
  // 4. generate code for each schema
  const typeDefinitions = orderedSchemas.map((schemaName) => {
    return generateZodInfer(schemaName, config)
  })

  return typeDefinitions.join('\n\n')
}
