import path from 'node:path'

import { emit } from '../../emit/index.js'
import { schemasCode } from '../../generator/zod-openapi-hono/openapi/components/schemas.js'
import { analyzeCircularSchemas, ast, makeSplitSchemaFile } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { makeBarrel, renderNamedImport, uncapitalize } from '../../utils/index.js'

export async function schemas(
  schemas: Components['schemas'],
  output: string,
  split: boolean,
  exportType: boolean,
  readonly?: boolean,
) {
  if (!schemas) return { ok: false, error: 'No schemas found' } as const
  const schemaNames = Object.keys(schemas)
  if (schemaNames.length === 0) return { ok: true, value: 'No schemas found' } as const
  if (split) {
    const outDir = output.replace(/\.ts$/, '')
    const analysis = analyzeCircularSchemas(schemas, schemaNames, readonly)
    const results = await Promise.all([
      ...schemaNames.map((schemaName) => {
        const fileCode = makeSplitSchemaFile(
          schemaName,
          schemas[schemaName],
          schemas,
          analysis,
          exportType,
          readonly,
        )
        const filePath = `${outDir}/${uncapitalize(schemaName)}.ts`
        return emit(fileCode, path.dirname(filePath), filePath)
      }),
      emit(makeBarrel(schemas), path.dirname(`${outDir}/index.ts`), `${outDir}/index.ts`),
    ])
    const e = results.find((result) => !result.ok)
    if (e) return e
    return {
      ok: true,
      value: `Generated schema code written to ${outDir}/*.ts (index.ts included)`,
    } as const
  }
  const importCode = renderNamedImport(['z'], '@hono/zod-openapi')
  const schemaDefinitions = schemasCode({ schemas }, true, exportType, readonly)
  const sorted = ast(schemaDefinitions)
  const schemaDefinitionsCode = `${importCode}\n\n${sorted}`
  const emitResult = await emit(schemaDefinitionsCode, path.dirname(output), output)
  if (!emitResult.ok) return { ok: false, error: emitResult.error } as const
  return { ok: true, value: `Generated schema code written to ${output}` } as const
}
