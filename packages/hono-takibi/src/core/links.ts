import path from 'node:path'
import { core } from '../helper/core.js'
import { parseOpenAPI } from '../openapi/index.js'
import { ensureSuffix, lowerFirst, toIdentifier } from '../utils/index.js'

export async function links(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: string | `${string}.ts`,
  split?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
  const openAPI = openAPIResult.value

  const ls = openAPI.components?.links
  if (!ls || Object.keys(ls).length === 0) return { ok: false, error: 'No links found' }

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    for (const key of Object.keys(ls).sort()) {
      const val = ls[key]
      const name = toIdentifier(ensureSuffix(key, 'Link'))
      const body = `export const ${name} = ${JSON.stringify(val ?? {})}\n`
      const filePath = path.join(outDir, `${lowerFirst(name)}.ts`)
      const coreResult = await core(body, path.dirname(filePath), filePath)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
    }

    const indexBody = `${Object.keys(ls)
      .sort()
      .map((n) => `export * from './${lowerFirst(toIdentifier(ensureSuffix(n, 'Link')))}'`)
      .join('\n')}\n`
    const coreResult = await core(
      indexBody,
      path.dirname(path.join(outDir, 'index.ts')),
      path.join(outDir, 'index.ts'),
    )
    if (!coreResult.ok) return { ok: false, error: coreResult.error }

    return { ok: true, value: `Generated links code written to ${outDir}/*.ts (index.ts included)` }
  }

  const outFile = String(output)
  const defs = Object.keys(ls)
    .map(
      (key) =>
        `export const ${toIdentifier(ensureSuffix(key, 'Link'))} = ${JSON.stringify(ls[key] ?? {})}`,
    )
    .join('\n\n')

  const coreResult = await core(defs, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated links code written to ${outFile}` }
}
