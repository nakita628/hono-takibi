import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { isCallbacks } from '../../guard/index.js'
import { makeConst } from '../../helper/code.js'
import { makeCallback, makeImports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import {
  ensureSuffix,
  makeBarrel,
  toIdentifierPascalCase,
  uncapitalize,
} from '../../utils/index.js'

export function callbacks(
  // oxlint-disable-next-line no-shadow -- the parameter is the section this function emits
  callbacks: Components['callbacks'],
  output: string,
  split: boolean,
  components?: {
    readonly [k: string]: {
      readonly output: string
      readonly split?: boolean
      readonly import?: string
    }
  },
  readonly?: boolean,
) {
  return Effect.gen(function* () {
    if (!callbacks) return yield* new GenerateError({ message: 'No callbacks found' })
    const keys = Object.keys(callbacks)
    if (keys.length === 0) return 'No callbacks found'
    const asConst = readonly ? ' as const' : ''
    if (split) {
      const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
      yield* Effect.all(
        [
          ...keys.map((k) => {
            const callbackOrRef = callbacks[k]
            // A `$ref` in this slot has nothing of its own to write.
            if (!isCallbacks(callbackOrRef)) return Effect.void
            const name = toIdentifierPascalCase(ensureSuffix(k, 'Callback'))
            const callbackCode = makeCallback(callbackOrRef)
            const body = callbackCode
              ? `export const ${name} = {${callbackCode}}${asConst}\n`
              : `export const ${name} = {}${asConst}\n`
            const filePath = path.join(outDir, `${uncapitalize(k)}.ts`)
            return emit(
              makeImports(body, filePath, components, split),
              path.dirname(filePath),
              filePath,
            )
          }),
          emit(makeBarrel(callbacks), outDir, path.join(outDir, 'index.ts')),
        ],
        { concurrency: 'unbounded' },
      )
      return `Generated Callback code written to ${outDir}/*.ts (index.ts included)`
    }
    const code = Object.entries(callbacks)
      .map(([k, callbackOrRef]) => {
        if (!isCallbacks(callbackOrRef)) return undefined
        const callbackCode = makeCallback(callbackOrRef)
        return callbackCode
          ? `${makeConst(true, k, 'Callback')}{${callbackCode}}${asConst}`
          : undefined
      })
      .filter((v) => v !== undefined)
      .join('\n\n')
    yield* emit(makeImports(code, output, components, split), path.dirname(output), output)
    return `Generated callbacks code written to ${output}`
  })
}
