import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { zodToOpenAPI } from '../../generator/zod-to-openapi/index.js'
import { makeImports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import {
  ensureSuffix,
  makeBarrel,
  renderNamedImport,
  toIdentifierPascalCase,
  uncapitalize,
  zodToOpenAPISchema,
} from '../../utils/index.js'

export function mediaTypes(
  // oxlint-disable-next-line no-shadow -- the parameter is the section this function emits
  mediaTypes: Components['mediaTypes'],
  output: string,
  split: boolean,
  readonly?: boolean,
  components?: {
    readonly [k: string]: {
      readonly output: string
      readonly split?: boolean
      readonly import?: string
    }
  },
) {
  return Effect.gen(function* () {
    if (!mediaTypes) return yield* new GenerateError({ message: 'No mediaTypes found' })
    const keys = Object.keys(mediaTypes)
    if (keys.length === 0) return 'No mediaTypes found'
    const importCode = renderNamedImport(['z'], '@hono/zod-openapi')
    if (split) {
      const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
      yield* Effect.all(
        [
          ...keys.map((k) => {
            const v = mediaTypes[k]
            const name = toIdentifierPascalCase(ensureSuffix(k, 'MediaTypeSchema'))
            const filePath = path.join(outDir, `${uncapitalize(k)}.ts`)
            if (typeof v === 'object' && v !== null && '$ref' in v && v.$ref) {
              const refKey = v.$ref.split('/').at(-1) ?? ''
              const refName = toIdentifierPascalCase(ensureSuffix(refKey, 'MediaTypeSchema'))
              const body = `export const ${name} = ${refName}\n`
              return emit(
                makeImports(body, filePath, components, split),
                path.dirname(filePath),
                filePath,
              )
            }
            if (typeof v === 'object' && v !== null && 'schema' in v) {
              const zodCode = zodToOpenAPI(v.schema)
              const schemaCode = zodToOpenAPISchema(name, zodCode, true, false, true, readonly)
              return emit(
                makeImports(schemaCode, filePath, components, split),
                path.dirname(filePath),
                filePath,
              )
            }
            const body = `export const ${name} = z.unknown()\n`
            return emit(
              makeImports(body, filePath, components, split),
              path.dirname(filePath),
              filePath,
            )
          }),
          emit(
            makeBarrel(mediaTypes),
            path.dirname(path.join(outDir, 'index.ts')),
            path.join(outDir, 'index.ts'),
          ),
        ],
        { concurrency: 'unbounded' },
      )
      return `Generated MediaType code written to ${outDir}/*.ts (index.ts included)`
    }
    const definitions = keys
      .map((k) => {
        const v = mediaTypes[k]
        const name = toIdentifierPascalCase(ensureSuffix(k, 'MediaTypeSchema'))
        if (typeof v === 'object' && v !== null && '$ref' in v && v.$ref) {
          const refKey = v.$ref.split('/').at(-1) ?? ''
          const refName = toIdentifierPascalCase(ensureSuffix(refKey, 'MediaTypeSchema'))
          return `export const ${name} = ${refName}`
        }
        if (typeof v === 'object' && v !== null && 'schema' in v) {
          const zodCode = zodToOpenAPI(v.schema)
          return zodToOpenAPISchema(name, zodCode, true, false, true, readonly)
        }
        return `export const ${name} = z.unknown()`
      })
      .join('\n\n')
    const code = `${importCode}\n\n${definitions}\n`
    yield* emit(code, path.dirname(output), output)
    return `Generated mediaTypes code written to ${output}`
  })
}
