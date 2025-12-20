import path from 'node:path'
import { core } from '../helper/core.js'
import { parseOpenAPI } from '../openapi/index.js'
import { ensureSuffix, lowerFirst, toIdentifier } from '../utils/index.js'

export async function examples(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: string | `${string}.ts`,
  split?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
  const openAPI = openAPIResult.value

  const ex = openAPI.components?.examples
  if (!ex || Object.keys(ex).length === 0) return { ok: false, error: 'No examples found' }

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    for (const key of Object.keys(ex).sort()) {
      const val = ex[key]
      const name = toIdentifier(ensureSuffix(key, 'Example'))
      const body = `export const ${name} = ${JSON.stringify(val ?? {})}\n`
      const filePath = path.join(outDir, `${lowerFirst(name)}.ts`)
      const coreResult = await core(body, path.dirname(filePath), filePath)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
    }

    const indexBody = `${Object.keys(ex)
      .sort()
      .map((n) => `export * from './${lowerFirst(toIdentifier(ensureSuffix(n, 'Example')))}'`)
      .join('\n')}\n`
    const coreResult = await core(
      indexBody,
      path.dirname(path.join(outDir, 'index.ts')),
      path.join(outDir, 'index.ts'),
    )
    if (!coreResult.ok) return { ok: false, error: coreResult.error }

    return {
      ok: true,
      value: `Generated examples code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const outFile = String(output)
  const defs = Object.keys(ex)
    .map(
      (key) =>
        `export const ${toIdentifier(ensureSuffix(key, 'Example'))} = ${JSON.stringify(ex[key] ?? {})}`,
    )
    .join('\n\n')

  const coreResult = await core(defs, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated examples code written to ${outFile}` }
}
