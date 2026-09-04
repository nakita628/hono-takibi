import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { parametersCode } from '../../generator/zod-openapi-hono/openapi/components/parameters.js'
import { makeImports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { makeBarrel, uncapitalize } from '../../utils/index.js'

export function parameters(
  // oxlint-disable-next-line no-shadow -- the parameter is the section this function emits
  parameters: Components['parameters'],
  output: string,
  split: boolean,
  exportType: boolean,
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
    if (!parameters) return yield* new GenerateError({ message: 'No parameters found' })
    const parameterNames = Object.keys(parameters)
    if (parameterNames.length === 0) return 'No parameters found'
    if (split) {
      const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
      yield* Effect.all(
        [
          ...parameterNames.map((parameterName) => {
            const singleComponent = { parameters: { [parameterName]: parameters[parameterName] } }
            const code = parametersCode(singleComponent, true, exportType, readonly)
            const filePath = path.join(outDir, `${uncapitalize(parameterName)}.ts`)
            return emit(
              makeImports(code, filePath, components, split),
              path.dirname(filePath),
              filePath,
            )
          }),
          emit(makeBarrel(parameters), outDir, path.join(outDir, 'index.ts')),
        ],
        { concurrency: 'unbounded' },
      )
      return `Generated parameters code written to ${outDir}/*.ts (index.ts included)`
    }
    const parameterDefinitions = parametersCode({ parameters }, true, exportType, readonly)
    yield* emit(
      makeImports(parameterDefinitions, output, components, split),
      path.dirname(output),
      output,
    )
    return `Generated parameters code written to ${output}`
  })
}
