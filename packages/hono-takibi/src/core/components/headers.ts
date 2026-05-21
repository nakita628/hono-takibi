import path from 'node:path'

import { emit } from '../../emit/index.js'
import { headersCode } from '../../generator/zod-openapi-hono/openapi/components/headers.js'
import { makeImports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { makeBarrel, uncapitalize } from '../../utils/index.js'

export async function headers(
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
  if (!headers) return { ok: false, error: 'No headers found' } as const
  const headerNames = Object.keys(headers)
  if (headerNames.length === 0) return { ok: true, value: 'No headers found' } as const
  if (split) {
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    const results = await Promise.all([
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
    ])
    const e = results.find((result) => !result.ok)
    if (e) return e
    return {
      ok: true,
      value: `Generated headers code written to ${outDir}/*.ts (index.ts included)`,
    } as const
  }
  const headerDefinitions = headersCode({ headers }, true, exportType, readonly)
  const emitResult = await emit(
    makeImports(headerDefinitions, output, components, split),
    path.dirname(output),
    output,
  )
  if (!emitResult.ok) return { ok: false, error: emitResult.error } as const
  return { ok: true, value: `Generated headers code written to ${output}` } as const
}
