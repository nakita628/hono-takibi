import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { isRefObject } from '../../guard/index.js'
import { ast, makeRef } from '../../helper/index.js'
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
    const asConst = readonly ? ' as const' : ''
    if (split) {
      const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
      yield* Effect.all(
        [
          ...keys.map((k) => {
            const v = links[k]
            const name = toIdentifierPascalCase(ensureSuffix(k, 'Link'))
            const filePath = path.join(outDir, `${uncapitalize(k)}.ts`)
            // A `$ref` link is its target's constant, in the single file and here alike (#607).
            if (isRefObject(v)) {
              const refName = makeRef(v.$ref)
              const refKey = v.$ref.split('/').at(-1) ?? ''
              const alias = `import { ${refName} } from './${uncapitalize(refKey)}'\n\nexport const ${name} = ${refName}\n`
              return emit(alias, path.dirname(filePath), filePath)
            }
            const body = `export const ${name} = ${JSON.stringify(v ?? {})}${asConst}\n`
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
    // Sorted, so that the constant a `$ref` link names is declared before it.
    const code = ast(
      keys
        .map((k) => {
          const v = links[k]
          const name = toIdentifierPascalCase(ensureSuffix(k, 'Link'))
          return isRefObject(v)
            ? `export const ${name}=${makeRef(v.$ref)}`
            : `export const ${name}=${JSON.stringify(v)}${asConst}`
        })
        .join('\n\n'),
    )
    yield* emit(code, path.dirname(output), output)
    return `Generated links code written to ${output}`
  })
}
