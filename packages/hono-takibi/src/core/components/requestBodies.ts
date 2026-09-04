import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { requestBodiesCode } from '../../generator/zod-openapi-hono/openapi/components/request-bodies.js'
import { makeImports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { makeBarrel, uncapitalize } from '../../utils/index.js'

export function requestBodies(
  // oxlint-disable-next-line no-shadow -- the parameter is the section this function emits
  requestBodies: Components['requestBodies'],
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
    if (!requestBodies) return yield* new GenerateError({ message: 'No requestBodies found' })
    const bodyNames = Object.keys(requestBodies)
    if (bodyNames.length === 0) return 'No requestBodies found'
    if (split) {
      const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
      yield* Effect.all(
        [
          ...bodyNames.map((bodyName) => {
            const singleComponent = { requestBodies: { [bodyName]: requestBodies[bodyName] } }
            const code = requestBodiesCode(singleComponent, true, readonly)
            const filePath = path.join(outDir, `${uncapitalize(bodyName)}.ts`)
            return emit(
              makeImports(code, filePath, components, split),
              path.dirname(filePath),
              filePath,
            )
          }),
          emit(makeBarrel(requestBodies), outDir, path.join(outDir, 'index.ts')),
        ],
        { concurrency: 'unbounded' },
      )
      return `Generated requestBodies code written to ${outDir}/*.ts (index.ts included)`
    }
    const bodyDefinitions = requestBodiesCode({ requestBodies }, true, readonly)
    yield* emit(
      makeImports(bodyDefinitions, output, components, split),
      path.dirname(output),
      output,
    )
    return `Generated requestBodies code written to ${output}`
  })
}
