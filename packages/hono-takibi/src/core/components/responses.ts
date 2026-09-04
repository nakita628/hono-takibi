import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { responsesCode } from '../../generator/zod-openapi-hono/openapi/components/responses.js'
import { makeImports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { makeBarrel, uncapitalize } from '../../utils/index.js'

export function responses(
  // oxlint-disable-next-line no-shadow -- the parameter is the section this function emits
  responses: Components['responses'],
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
    if (!responses) return yield* new GenerateError({ message: 'No responses found' })
    const responseNames = Object.keys(responses)
    if (responseNames.length === 0) return 'No responses found'
    if (split) {
      const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
      yield* Effect.all(
        [
          ...responseNames.map((responseName) => {
            const singleComponent = { responses: { [responseName]: responses[responseName] } }
            const code = responsesCode(singleComponent, true, readonly)
            const filePath = path.join(outDir, `${uncapitalize(responseName)}.ts`)
            return emit(
              makeImports(code, filePath, components, split),
              path.dirname(filePath),
              filePath,
            )
          }),
          emit(makeBarrel(responses), outDir, path.join(outDir, 'index.ts')),
        ],
        { concurrency: 'unbounded' },
      )
      return `Generated responses code written to ${outDir}/*.ts (index.ts included)`
    }
    const responseDefinitions = responsesCode({ responses }, true, readonly)
    yield* emit(
      makeImports(responseDefinitions, output, components, split),
      path.dirname(output),
      output,
    )
    return `Generated responses code written to ${output}`
  })
}
