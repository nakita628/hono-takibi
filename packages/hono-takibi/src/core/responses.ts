import path from 'node:path'
import { responsesCode } from '../generator/zod-openapi-hono/openapi/components/responses.js'
import type { ComponentImports } from '../helper/index.js'
import { core, makeBarell, makeFileCodeWithImports } from '../helper/index.js'
import type { Components } from '../openapi/index.js'
import { lowerFirst } from '../utils/index.js'

/**
 * Generates `components.responses` constants (objects containing Zod schemas).
 */
export async function responses(
  components: Components,
  output: string | `${string}.ts`,
  split?: boolean,
  imports?: ComponentImports,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const { responses } = components
  if (!responses) return { ok: false, error: 'No responses found' }

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    for (const key of Object.keys(responses)) {
      const res = responses[key]
      if (!res) continue
      const code = responsesCode({ responses: { [key]: res } }, true)
      const filePath = path.join(outDir, `${lowerFirst(key)}.ts`)
      const fileCode = makeFileCodeWithImports(code, filePath, imports, '..', 'HeaderSchema')
      const coreResult = await core(fileCode, path.dirname(filePath), filePath)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
    }

    const coreResult = await core(
      makeBarell(responses),
      path.dirname(path.join(outDir, 'index.ts')),
      path.join(outDir, 'index.ts'),
    )
    if (!coreResult.ok) return { ok: false, error: coreResult.error }

    return {
      ok: true,
      value: `Generated responses code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const defs = responsesCode(components, true)
  const outFile = String(output)
  const fileCode = makeFileCodeWithImports(defs, outFile, imports, '.', 'HeaderSchema')
  const coreResult = await core(fileCode, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated responses code written to ${outFile}` }
}
