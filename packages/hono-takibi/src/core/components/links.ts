import path from 'node:path'

import { emit } from '../../emit/index.js'
import { makeExportConst } from '../../helper/code.js'
import { makeExports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'

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
    const exportsResult = await makeExports(links, 'Link', output, readonly)
    if (!exportsResult.ok) return { ok: false, error: exportsResult.error } as const
    return { ok: true, value: exportsResult.value } as const
  }
  const code = makeExportConst(links, 'Link', readonly)
  const emitResult = await emit(code, path.dirname(output), output)
  if (!emitResult.ok) return { ok: false, error: emitResult.error } as const
  return { ok: true, value: `Generated links code written to ${output}` } as const
}
