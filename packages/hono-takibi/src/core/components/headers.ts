import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { headersCode } from '../../generator/zod-openapi-hono/openapi/components/headers.js'
import { makeImports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { makeBarrel, uncapitalize } from '../../utils/index.js'

export function headers(
  // oxlint-disable-next-line no-shadow -- the parameter is the section this function emits
  headers: Components['headers'],
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
    if (!headers) return yield* new GenerateError({ message: 'No headers found' })
    const headerNames = Object.keys(headers)
    if (headerNames.length === 0) return 'No headers found'
    if (split) {
      const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
      yield* Effect.all(
        [
          ...headerNames.map((headerName) => {
            const singleComponent = { headers: { [headerName]: headers[headerName] } }
            const code = headersCode(singleComponent, true, exportType, readonly)
            const filePath = path.join(outDir, `${uncapitalize(headerName)}.ts`)
            return emit(
              makeImports(code, filePath, components, split),
              path.dirname(filePath),
              filePath,
            )
          }),
          emit(makeBarrel(headers), outDir, path.join(outDir, 'index.ts')),
        ],
        { concurrency: 'unbounded' },
      )
      return `Generated headers code written to ${outDir}/*.ts (index.ts included)`
    }
    const headerDefinitions = headersCode({ headers }, true, exportType, readonly)
    yield* emit(
      makeImports(headerDefinitions, output, components, split),
      path.dirname(output),
      output,
    )
    return `Generated headers code written to ${output}`
  })
}
