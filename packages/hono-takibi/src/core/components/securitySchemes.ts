import path from 'node:path'

import { emit } from '../../emit/index.js'
import { makeExportConst } from '../../helper/code.js'
import type { Components } from '../../openapi/index.js'
import {
  ensureSuffix,
  makeBarrel,
  toIdentifierPascalCase,
  uncapitalize,
} from '../../utils/index.js'

export async function securitySchemes(
  securitySchemes: Components['securitySchemes'],
  output: string,
  split: boolean,
  readonly?: boolean,
) {
  if (!securitySchemes) return { ok: false, error: 'No securitySchemes found' } as const
  const keys = Object.keys(securitySchemes)
  if (keys.length === 0) return { ok: true, value: 'No securitySchemes found' } as const
  if (split) {
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    const asConst = readonly ? ' as const' : ''
    const results = await Promise.all([
      ...keys.map((k) => {
        const v = securitySchemes[k]
        const name = toIdentifierPascalCase(ensureSuffix(k, 'SecurityScheme'))
        const body = `export const ${name} = ${JSON.stringify(v ?? {})}${asConst}\n`
        const filePath = path.join(outDir, `${uncapitalize(k)}.ts`)
        return emit(body, path.dirname(filePath), filePath)
      }),
      emit(
        makeBarrel(securitySchemes),
        path.dirname(path.join(outDir, 'index.ts')),
        path.join(outDir, 'index.ts'),
      ),
    ])
    const e = results.find((result) => !result.ok)
    if (e) return e
    return {
      ok: true,
      value: `Generated SecurityScheme code written to ${outDir}/*.ts (index.ts included)`,
    } as const
  }
  const code = makeExportConst(securitySchemes, 'SecurityScheme', readonly)
  const emitResult = await emit(code, path.dirname(output), output)
  if (!emitResult.ok) return { ok: false, error: emitResult.error } as const
  return { ok: true, value: `Generated securitySchemes code written to ${output}` } as const
}
