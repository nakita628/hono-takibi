import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { makeExportConst } from '../../helper/code.js'
import { makeRef } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import {
  ensureSuffix,
  makeBarrel,
  toIdentifierPascalCase,
  uncapitalize,
} from '../../utils/index.js'

export function examples(
  // oxlint-disable-next-line no-shadow -- the parameter is the section this function emits
  examples: Components['examples'],
  output: string,
  split: boolean,
  readonly?: boolean,
) {
  return Effect.gen(function* () {
    if (!examples) return yield* new GenerateError({ message: 'No examples found' })
    const keys = Object.keys(examples)
    if (keys.length === 0) return 'No examples found'
    const asConst = readonly ? ' as const' : ''
    if (split) {
      const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
      yield* Effect.all(
        [
          ...keys.map((k) => {
            const v = examples[k]
            const name = toIdentifierPascalCase(ensureSuffix(k, 'Example'))
            const filePath = path.join(outDir, `${uncapitalize(k)}.ts`)
            if (typeof v === 'object' && v !== null && '$ref' in v && typeof v.$ref === 'string') {
              const refName = makeRef(v.$ref)
              const refKey = v.$ref.split('/').at(-1) ?? ''
              const importPath = `./${uncapitalize(refKey)}`
              const body = `import { ${refName} } from '${importPath}'\n\nexport const ${name} = ${refName}\n`
              return emit(body, path.dirname(filePath), filePath)
            }
            const body = `export const ${name} = ${JSON.stringify(v)}${asConst}\n`
            return emit(body, path.dirname(filePath), filePath)
          }),
          emit(
            makeBarrel(examples),
            path.dirname(path.join(outDir, 'index.ts')),
            path.join(outDir, 'index.ts'),
          ),
        ],
        { concurrency: 'unbounded' },
      )
      return `Generated Example code written to ${outDir}/*.ts (index.ts included)`
    }
    const code = makeExportConst(examples, 'Example', readonly)
    yield* emit(code, path.dirname(output), output)
    return `Generated examples code written to ${output}`
  })
}
