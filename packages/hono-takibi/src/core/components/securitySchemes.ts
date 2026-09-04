import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { makeExportConst } from '../../helper/code.js'
import type { Components } from '../../openapi/index.js'
import {
  ensureSuffix,
  makeBarrel,
  toIdentifierPascalCase,
  uncapitalize,
} from '../../utils/index.js'

export function securitySchemes(
  // oxlint-disable-next-line no-shadow -- the parameter is the section this function emits
  securitySchemes: Components['securitySchemes'],
  output: string,
  split: boolean,
  readonly?: boolean,
) {
  return Effect.gen(function* () {
    if (!securitySchemes) return yield* new GenerateError({ message: 'No securitySchemes found' })
    const keys = Object.keys(securitySchemes)
    if (keys.length === 0) return 'No securitySchemes found'
    if (split) {
      const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
      const asConst = readonly ? ' as const' : ''
      yield* Effect.all(
        [
          ...keys.map((k) => {
            const v = securitySchemes[k]
            const name = toIdentifierPascalCase(ensureSuffix(k, 'SecurityScheme'))
            const body = `export const ${name} = ${JSON.stringify(v ?? {})}${asConst}\n`
            const filePath = path.join(outDir, `${uncapitalize(k)}.ts`)
            return emit(body, path.dirname(filePath), filePath)
          }),
          emit(
            makeBarrel(securitySchemes),
            path.dirname(path.join(outDir, 'index.ts')),
            path.join(outDir, 'index.ts'),
          ),
        ],
        { concurrency: 'unbounded' },
      )
      return `Generated SecurityScheme code written to ${outDir}/*.ts (index.ts included)`
    }
    const code = makeExportConst(securitySchemes, 'SecurityScheme', readonly)
    yield* emit(code, path.dirname(output), output)
    return `Generated securitySchemes code written to ${output}`
  })
}
