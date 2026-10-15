import { basename, dirname, join } from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { makeImports, makeRouteEntries } from '../../helper/index.js'
import type { OpenAPI } from '../../openapi/index.js'
import { makeBarrel } from '../../utils/index.js'

export function route(
  openAPI: OpenAPI,
  routes?: {
    readonly output: string
    readonly split?: boolean
  },
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
    if (!routes?.output) return yield* new GenerateError({ message: 'routes.output is required' })
    const { output, split = false } = routes
    const entries = makeRouteEntries(openAPI, readonly)
    if (!split || entries.length === 0) {
      const code = makeImports(entries.map((entry) => entry.code).join('\n\n'), output, components)
      yield* emit(code, dirname(output), output)
      return `Generated route code written to ${output}`
    }
    const outDir = join(dirname(output), basename(output, '.ts'))
    yield* Effect.all(
      [
        ...entries.map(({ name, code }) => {
          const filePath = `${outDir}/${name}.ts`
          return emit(makeImports(code, filePath, components), dirname(filePath), filePath)
        }),
        emit(
          makeBarrel(Object.fromEntries(entries.map((entry) => [entry.name, null]))),
          outDir,
          `${outDir}/index.ts`,
        ),
      ],
      { concurrency: 'unbounded' },
    )
    return `Generated route code written to ${outDir}/*.ts (index.ts included)`
  })
}
