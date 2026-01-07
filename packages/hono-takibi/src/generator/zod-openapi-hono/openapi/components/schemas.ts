import {
  analyzeCircularSchemas,
  makeSchemaCode,
  makeSchemaInfos,
  makeTypeDefinitions,
} from '../../../../helper/index.js'
import type { Components } from '../../../../openapi/index.js'

export function schemasCode(
  components: Components,
  exportSchemas: boolean,
  exportSchemasTypes: boolean,
): string {
  const { schemas } = components
  if (!schemas) return ''

  const schemaNames = Object.keys(schemas)
  if (schemaNames.length === 0) return ''

  const analysis = analyzeCircularSchemas(schemas, schemaNames)
  const infos = makeSchemaInfos(schemas, schemaNames, analysis)

  const typeDefs = makeTypeDefinitions(infos, schemas, analysis.cyclicGroupPascal)
  const schemaBlocks = infos.map((info) =>
    makeSchemaCode(info, {
      exportKeyword: exportSchemas ? 'export ' : '',
      exportType: exportSchemasTypes,
    }),
  )

  const typeDefsBlock = typeDefs.join('\n\n')
  const schemasBlock = schemaBlocks.join('\n\n')

  return typeDefsBlock ? `${typeDefsBlock}\n\n${schemasBlock}` : schemasBlock
}
