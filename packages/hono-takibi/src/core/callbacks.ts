import path from 'node:path'
import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'
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

    for (const key of Object.keys(cbs).sort()) {
      const val = cbs[key]
      const name = toIdentifier(ensureSuffix(key, 'Callback'))
      const body = `export const ${name} = ${JSON.stringify(val ?? {})}\n`
      const filePath = path.join(outDir, `${lowerFirst(name)}.ts`)
      const fmtResult = await fmt(body)
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
      const mkdirResult = await mkdir(path.dirname(filePath))
      if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
      const writeResult = await writeFile(filePath, fmtResult.value)
      if (!writeResult.ok) return { ok: false, error: writeResult.error }
    }

    const indexBody = `${Object.keys(cbs)
      .sort()
      .map((n) => `export * from './${lowerFirst(toIdentifier(ensureSuffix(n, 'Callback')))}'`)
      .join('\n')}\n`
    const fmtResult = await fmt(indexBody)
    if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
    const mkdirResult = await mkdir(path.dirname(path.join(outDir, 'index.ts')))
    if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
    const writeResult = await writeFile(path.join(outDir, 'index.ts'), fmtResult.value)
    if (!writeResult.ok) return { ok: false, error: writeResult.error }

    return {
      ok: true,
      value: `Generated callbacks code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const outFile = String(output)
  const defs = Object.keys(cbs)
    .sort()
    .map(
      (key) =>
        `export const ${toIdentifier(ensureSuffix(key, 'Callback'))} = ${JSON.stringify(cbs[key] ?? {})}`,
    )
    .join('\n\n')

  const fmtResult = await fmt(`${defs}\n`)
  if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
  const mkdirResult = await mkdir(path.dirname(outFile))
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
  const writeResult = await writeFile(outFile, fmtResult.value)
  if (!writeResult.ok) return { ok: false, error: writeResult.error }

  return { ok: true, value: `Generated callbacks code written to ${outFile}` }
}
