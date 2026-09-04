import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { schemasCode } from '../../generator/zod-openapi-hono/openapi/components/schemas.js'
import { analyzeCircularSchemas, ast, makeSplitSchemaFile } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { makeBarrel, renderNamedImport, uncapitalize } from '../../utils/index.js'

export function schemas(
  // oxlint-disable-next-line no-shadow -- the parameter is the section this function emits
  schemas: Components['schemas'],
  output: string,
  split: boolean,
  exportType: boolean,
  readonly?: boolean,
) {
  return Effect.gen(function* () {
    if (!schemas) return yield* new GenerateError({ message: 'No schemas found' })
    const schemaNames = Object.keys(schemas)
    if (schemaNames.length === 0) return 'No schemas found'
    if (split) {
      const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
      const analysis = analyzeCircularSchemas(schemas, schemaNames, readonly)
      yield* Effect.all(
        [
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
        ],
        { concurrency: 'unbounded' },
      )
      return `Generated schema code written to ${outDir}/*.ts (index.ts included)`
    }
    const importCode = renderNamedImport(['z'], '@hono/zod-openapi')
    const schemaDefinitions = schemasCode({ schemas }, true, exportType, readonly)
    const sorted = ast(schemaDefinitions)
    const schemaDefinitionsCode = `${importCode}\n\n${sorted}`
    yield* emit(schemaDefinitionsCode, path.dirname(output), output)
    return `Generated schema code written to ${output}`
  })
}
