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

export function links(
  // oxlint-disable-next-line no-shadow -- the parameter is the section this function emits
  links: Components['links'],
  output: string,
  split: boolean,
  readonly?: boolean,
) {
  return Effect.gen(function* () {
    if (!links) return yield* new GenerateError({ message: 'No links found' })
    const keys = Object.keys(links)
    if (keys.length === 0) return 'No links found'
    if (split) {
      const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
      const asConst = readonly ? ' as const' : ''
      yield* Effect.all(
        [
          ...keys.map((k) => {
            const v = links[k]
            const name = toIdentifierPascalCase(ensureSuffix(k, 'Link'))
            const body = `export const ${name} = ${JSON.stringify(v ?? {})}${asConst}\n`
            const filePath = path.join(outDir, `${uncapitalize(k)}.ts`)
            return emit(body, path.dirname(filePath), filePath)
          }),
          emit(
            makeBarrel(links),
            path.dirname(path.join(outDir, 'index.ts')),
            path.join(outDir, 'index.ts'),
          ),
        ],
        { concurrency: 'unbounded' },
      )
      return `Generated Link code written to ${outDir}/*.ts (index.ts included)`
    }
    const code = makeExportConst(links, 'Link', readonly)
    yield* emit(code, path.dirname(output), output)
    return `Generated links code written to ${output}`
  })
}
