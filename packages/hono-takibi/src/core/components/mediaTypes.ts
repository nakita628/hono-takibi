import path from 'node:path'

import { emit } from '../../emit/index.js'
import { zodToOpenAPI } from '../../generator/zod-to-openapi/index.js'
import { makeImports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import {
  ensureSuffix,
  renderNamedImport,
  toIdentifierPascalCase,
  uncapitalize,
  zodToOpenAPISchema,
} from '../../utils/index.js'

export async function mediaTypes(
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
  if (!mediaTypes) return { ok: false, error: 'No mediaTypes found' } as const
  const keys = Object.keys(mediaTypes)
  if (keys.length === 0) return { ok: true, value: 'No mediaTypes found' } as const
  const importCode = renderNamedImport(['z'], '@hono/zod-openapi')
  if (split) {
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    const indexCode = `${keys
      .sort()
      .map((v) => `export * from './${uncapitalize(v)}.ts'`)
      .join('\n')}\n`
    const results = await Promise.all([
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
      emit(indexCode, path.dirname(path.join(outDir, 'index.ts')), path.join(outDir, 'index.ts')),
    ])
    const e = results.find((result) => !result.ok)
    if (e) return e
    return {
      ok: true,
      value: `Generated MediaType code written to ${outDir}/*.ts (index.ts included)`,
    } as const
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
  const emitResult = await emit(code, path.dirname(output), output)
  if (!emitResult.ok) return { ok: false, error: emitResult.error } as const
  return { ok: true, value: `Generated mediaTypes code written to ${output}` } as const
}
