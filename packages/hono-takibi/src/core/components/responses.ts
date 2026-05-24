import path from 'node:path'

import { emit } from '../../emit/index.js'
import { responsesCode } from '../../generator/zod-openapi-hono/openapi/components/responses.js'
import { makeImports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { makeBarrel, uncapitalize } from '../../utils/index.js'

export async function responses(
  responses: Components['responses'],
  output: string,
  split: boolean,
  components?: {
    readonly [k: string]: {
      readonly output: string
      readonly split?: boolean
      readonly import?: string
    }
  },
  readonly?: boolean,
) {
  if (!responses) return { ok: false, error: 'No responses found' } as const
  const responseNames = Object.keys(responses)
  if (responseNames.length === 0) return { ok: true, value: 'No responses found' } as const
  if (split) {
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    const results = await Promise.all([
      ...responseNames.map((responseName) => {
        const singleComponent = { responses: { [responseName]: responses[responseName] } }
        const code = responsesCode(singleComponent, true, readonly)
        const filePath = path.join(outDir, `${uncapitalize(responseName)}.ts`)
        return emit(
          makeImports(code, filePath, components, split),
          path.dirname(filePath),
          filePath,
        )
      }),
      emit(makeBarrel(responses), outDir, path.join(outDir, 'index.ts')),
    ])
    const e = results.find((result) => !result.ok)
    if (e && !e.ok) return { ok: false, error: e.error } as const
    return {
      ok: true,
      value: `Generated responses code written to ${outDir}/*.ts (index.ts included)`,
    } as const
  }
  const responseDefinitions = responsesCode({ responses }, true, readonly)
  const emitResult = await emit(
    makeImports(responseDefinitions, output, components, split),
    path.dirname(output),
    output,
  )
  if (!emitResult.ok) return { ok: false, error: emitResult.error } as const
  return { ok: true, value: `Generated responses code written to ${output}` } as const
}
