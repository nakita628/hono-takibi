import {
  analyzeCircularSchemas,
  makeSchemaCode,
  makeSchemaInfos,
  makeTypeDefinitions,
} from '../../../../helper/index.js'
import type { Components } from '../../../../openapi/index.js'

/**
 * Generates TypeScript code for OpenAPI component schemas.
 *
 * Converts OpenAPI schemas to Zod schemas with OpenAPI registration,
 * handling circular references and type definitions.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchemas - Whether to export the Zod schema constants.
 * @param exportSchemasTypes - Whether to export the inferred Zod types.
 * @param readonly - Whether to add `.readonly()` modifier to schemas.
 * @returns A string of TypeScript code with schema definitions.
 *
 * @example
 * ```ts
 * schemasCode(components, true, true, false)
 * // → 'export const UserSchema = z.object({...}).openapi("User")\n\nexport type User = z.infer<typeof UserSchema>'
 *
 * schemasCode(components, true, true, true)
 * // → 'export const UserSchema = z.object({...}).readonly().openapi("User")\n\nexport type User = z.infer<typeof UserSchema>'
 * ```
 */
export function schemasCode(
  components: Components,
  exportSchemas: boolean,
  exportSchemasTypes: boolean,
  readonly?: boolean,
): string {
  const { schemas } = components
  if (!schemas) return ''

  const schemaNames = Object.keys(schemas)
  if (schemaNames.length === 0) return ''

  const analysis = analyzeCircularSchemas(schemas, schemaNames, readonly)
  const infos = makeSchemaInfos(schemas, schemaNames, analysis)

  const typeDefs = makeTypeDefinitions(infos, schemas, analysis.cyclicGroupPascal, readonly)
  const schemaBlocks = infos.map((info) =>
    makeSchemaCode(info, {
      exportKeyword: exportSchemas ? 'export ' : '',
      exportType: exportSchemasTypes,
      readonly,
    }),
  )

  const typeDefsBlock = typeDefs.join('\n\n')
  const schemasBlock = schemaBlocks.join('\n\n')

  return typeDefsBlock ? `${typeDefsBlock}\n\n${schemasBlock}` : schemasBlock
}
