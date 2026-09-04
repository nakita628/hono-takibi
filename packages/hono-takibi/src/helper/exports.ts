import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../emit/index.js'
import { ensureSuffix, toIdentifierPascalCase, uncapitalize } from '../utils/index.js'

export function makeExports(
  value: { readonly [k: string]: unknown },
  suffix:
    | 'Schema'
    | 'Parameter'
    | 'SecurityScheme'
    | 'RequestBody'
    | 'Response'
    | 'Header'
    | 'Example'
    | 'Link'
    | 'Callback'
    | 'PathItem'
    | 'Webhook',
  output: string,
  readonly?: boolean,
) {
  return Effect.gen(function* () {
    const keys = Object.keys(value)
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    const indexCode = `${keys
      .toSorted()
      .map((v) => `export * from './${uncapitalize(v)}'`)
      .join('\n')}\n`
    const asConst = readonly ? ' as const' : ''
    yield* Effect.all(
      [
        ...keys.map((k) => {
          const v = value[k]
          const name = toIdentifierPascalCase(ensureSuffix(k, suffix))
          const body = `export const ${name} = ${JSON.stringify(v ?? {})}${asConst}\n`
          const filePath = path.join(outDir, `${uncapitalize(k)}.ts`)
          return emit(body, path.dirname(filePath), filePath)
        }),
        emit(indexCode, path.dirname(path.join(outDir, 'index.ts')), path.join(outDir, 'index.ts')),
      ],
      { concurrency: 'unbounded' },
    )
    return `Generated ${suffix} code written to ${outDir}/*.ts (index.ts included)`
  })
}
