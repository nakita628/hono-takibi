import path from 'node:path'
import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'
import { parseOpenAPI } from '../openapi/index.js'
import { sanitizeIdentifier } from '../utils/index.js'

const toIdentifier = (raw: string): string => {
  const sanitized = sanitizeIdentifier(raw)
  return /^[A-Za-z_$]/.test(sanitized) ? sanitized : `_${sanitized}`
}

const linkConstName = (key: string): string => {
  const base = key.endsWith('Link') ? key : `${key}Link`
  return toIdentifier(base)
}

const lowerFirst = (s: string) => (s ? (s[0]?.toLowerCase() ?? '') + s.slice(1) : s)

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
      const name = linkConstName(key)
      const body = `export const ${name} = ${JSON.stringify(val ?? {})}\n`
      const filePath = path.join(outDir, `${lowerFirst(name)}.ts`)
      const fmtResult = await fmt(body)
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
      const mkdirResult = await mkdir(path.dirname(filePath))
      if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
      const writeResult = await writeFile(filePath, fmtResult.value)
      if (!writeResult.ok) return { ok: false, error: writeResult.error }
    }

    const indexBody = `${Object.keys(ls)
      .sort()
      .map((n) => `export * from './${lowerFirst(linkConstName(n))}'`)
      .join('\n')}\n`
    const fmtResult = await fmt(indexBody)
    if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
    const mkdirResult = await mkdir(path.dirname(path.join(outDir, 'index.ts')))
    if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
    const writeResult = await writeFile(path.join(outDir, 'index.ts'), fmtResult.value)
    if (!writeResult.ok) return { ok: false, error: writeResult.error }

    return { ok: true, value: `Generated links code written to ${outDir}/*.ts (index.ts included)` }
  }

  const outFile = String(output)
  const defs = Object.keys(ls)
    .sort()
    .map((key) => `export const ${linkConstName(key)} = ${JSON.stringify(ls[key] ?? {})}`)
    .join('\n\n')

  const fmtResult = await fmt(`${defs}\n`)
  if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
  const mkdirResult = await mkdir(path.dirname(outFile))
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
  const writeResult = await writeFile(outFile, fmtResult.value)
  if (!writeResult.ok) return { ok: false, error: writeResult.error }

  return { ok: true, value: `Generated links code written to ${outFile}` }
}
