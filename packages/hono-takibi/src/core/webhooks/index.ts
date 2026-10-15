import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { makeImports, makeWebhookEntries } from '../../helper/index.js'
import type { OpenAPI } from '../../openapi/index.js'
import { makeBarrel } from '../../utils/index.js'

export function webhooks(
  openAPI: OpenAPI,
  // oxlint-disable-next-line no-shadow -- the parameter is the section this function emits
  webhooks?: {
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
    if (!webhooks?.output) {
      return yield* new GenerateError({ message: 'webhooks.output is required' })
    }
    if (!openAPI.webhooks) return yield* new GenerateError({ message: 'No webhooks found' })
    const { output, split = false } = webhooks
    const entries = makeWebhookEntries(openAPI, readonly)
    if (entries.length === 0) return 'No webhooks found'
    if (!split) {
      const code = makeImports(entries.map((entry) => entry.code).join('\n\n'), output, components)
      yield* emit(code, path.dirname(output), output)
      return `Generated webhooks code written to ${output}`
    }
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    yield* Effect.all(
      [
        ...entries.map(({ name, code }) => {
          const filePath = `${outDir}/${name}.ts`
          return emit(makeImports(code, filePath, components), path.dirname(filePath), filePath)
        }),
        emit(
          makeBarrel(Object.fromEntries(entries.map((entry) => [entry.name, null]))),
          outDir,
          `${outDir}/index.ts`,
        ),
      ],
      { concurrency: 'unbounded' },
    )
    return `Generated webhooks code written to ${outDir}/*.ts (index.ts included)`
  })
}
