import path from 'node:path'
import { core } from '../helper/core.js'
import { parseOpenAPI } from '../openapi/index.js'
import { ensureSuffix, lowerFirst, toIdentifier } from '../utils/index.js'

export async function callbacks(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: string | `${string}.ts`,
  split?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
  const openAPI = openAPIResult.value

  const cbs = openAPI.components?.callbacks
  if (!cbs || Object.keys(cbs).length === 0) return { ok: false, error: 'No callbacks found' }

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    for (const key of Object.keys(cbs)) {
      const val = cbs[key]
      const name = toIdentifier(ensureSuffix(key, 'Callback'))
      const body = `export const ${name} = ${JSON.stringify(val ?? {})}\n`
      const filePath = path.join(outDir, `${lowerFirst(name)}.ts`)
      const coreResult = await core(body, path.dirname(filePath), filePath)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
    }

    const indexBody = `${Object.keys(cbs)
      .map((n) => `export * from './${lowerFirst(toIdentifier(ensureSuffix(n, 'Callback')))}'`)
      .join('\n')}\n`
    const coreResult = await core(
      indexBody,
      path.dirname(path.join(outDir, 'index.ts')),
      path.join(outDir, 'index.ts'),
    )
    if (!coreResult.ok) return { ok: false, error: coreResult.error }

    return {
      ok: true,
      value: `Generated callbacks code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const outFile = String(output)
  const defs = Object.keys(cbs)
    .map(
      (key) =>
        `export const ${toIdentifier(ensureSuffix(key, 'Callback'))} = ${JSON.stringify(cbs[key] ?? {})}`,
    )
    .join('\n\n')

  const coreResult = await core(defs, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated callbacks code written to ${outFile}` }
}
