import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { isCallbacks } from '../../guard/index.js'
import { makeCallback, makeConst, makeImports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { makeBarrel, uncapitalize } from '../../utils/index.js'

export function callbacks(
  // oxlint-disable-next-line no-shadow -- the parameter is the section this function emits
  callbacks: Components['callbacks'],
  output: string,
  split: boolean,
  components?: {
    readonly [k: string]: {
      readonly output: string
      readonly split?: boolean
      readonly specifier?: (fromFile: string) => string
    }
  },
  readonly?: boolean,
) {
  return Effect.gen(function* () {
    if (!callbacks) return yield* new GenerateError({ message: 'No callbacks found' })
    const keys = Object.keys(callbacks)
    if (keys.length === 0) return 'No callbacks found'
    const asConst = readonly ? ' as const' : ''
    // What both outputs write: a `$ref` has nothing of its own, and neither has a callback
    // with no expression. The barrel of the split output lists these and no other (#607).
    const entries = Object.entries(callbacks).flatMap(([k, callbackOrRef]) => {
      if (!isCallbacks(callbackOrRef)) return []
      const callbackCode = makeCallback(callbackOrRef)
      return callbackCode
        ? [{ key: k, code: `${makeConst(true, k, 'Callback')}{${callbackCode}}${asConst}` }]
        : []
    })
    if (split) {
      const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
      yield* Effect.all(
        [
          ...entries.map(({ key, code }) => {
            const filePath = path.join(outDir, `${uncapitalize(key)}.ts`)
            return emit(
              makeImports(`${code}\n`, filePath, components, split),
              path.dirname(filePath),
              filePath,
            )
          }),
          emit(
            makeBarrel(Object.fromEntries(entries.map((entry) => [entry.key, null]))),
            outDir,
            path.join(outDir, 'index.ts'),
          ),
        ],
        { concurrency: 'unbounded' },
      )
      return `Generated Callback code written to ${outDir}/*.ts (index.ts included)`
    }
    const code = entries.map((entry) => entry.code).join('\n\n')
    yield* emit(makeImports(code, output, components, split), path.dirname(output), output)
    return `Generated callbacks code written to ${output}`
  })
}
