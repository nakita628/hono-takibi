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

export async function links(
  links: Components['links'],
  output: string,
  split: boolean,
  readonly?: boolean,
) {
  if (!links) return { ok: false, error: 'No links found' } as const
  const keys = Object.keys(links)
  if (keys.length === 0) return { ok: true, value: 'No links found' } as const
  if (split) {
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    const asConst = readonly ? ' as const' : ''
    const results = await Promise.all([
      ...keys.map((k) => {
        const v = links[k]
        const name = toIdentifierPascalCase(ensureSuffix(k, 'Link'))
        const body = `export const ${name} = ${JSON.stringify(v ?? {})}${asConst}\n`
        const filePath = path.join(outDir, `${uncapitalize(k)}.ts`)
        return emit(body, path.dirname(filePath), filePath)
      }),
      emit(
        makeBarrel(links),
        path.dirname(path.join(outDir, 'index.ts')),
        path.join(outDir, 'index.ts'),
      ),
    ])
    const e = results.find((result) => !result.ok)
    if (e) return e
    return {
      ok: true,
      value: `Generated Link code written to ${outDir}/*.ts (index.ts included)`,
    } as const
  }
  const code = makeExportConst(links, 'Link', readonly)
  const emitResult = await emit(code, path.dirname(output), output)
  if (!emitResult.ok) return { ok: false, error: emitResult.error } as const
  return { ok: true, value: `Generated links code written to ${output}` } as const
}
