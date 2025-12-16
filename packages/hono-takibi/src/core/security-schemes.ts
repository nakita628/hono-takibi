import path from 'node:path'
import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'
import { parseOpenAPI } from '../openapi/index.js'
import { sanitizeIdentifier } from '../utils/index.js'

const toIdentifier = (raw: string): string => {
  const sanitized = sanitizeIdentifier(raw)
  return /^[A-Za-z_$]/.test(sanitized) ? sanitized : `_${sanitized}`
}

const securitySchemeConstName = (key: string): string => {
  const base = key.endsWith('SecurityScheme') ? key : `${key}SecurityScheme`
  return toIdentifier(base)
}

const lowerFirst = (s: string) => (s ? (s[0]?.toLowerCase() ?? '') + s.slice(1) : s)

export async function securitySchemes(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: string | `${string}.ts`,
  exportType: boolean,
  split?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
  const openAPI = openAPIResult.value

  const schemes = openAPI.components?.securitySchemes
  if (!schemes || Object.keys(schemes).length === 0) {
    return { ok: false, error: 'No securitySchemes found' }
  }

  const defs = Object.keys(schemes)
    .sort()
    .map((key) => {
      const scheme = schemes[key]
      const name = securitySchemeConstName(key)
      const schemaExpr = JSON.stringify(scheme ?? {})
      const typeExpr = exportType ? `\n\nexport type ${toIdentifier(key)} = typeof ${name}` : ''
      return `export const ${name} = ${schemaExpr}${typeExpr}`
    })

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    for (const key of Object.keys(schemes).sort()) {
      const scheme = schemes[key]
      const name = securitySchemeConstName(key)
      const schemaExpr = JSON.stringify(scheme ?? {})
      const typeExpr = exportType ? `\n\nexport type ${toIdentifier(key)} = typeof ${name}` : ''
      const body = `export const ${name} = ${schemaExpr}${typeExpr}\n`
      const filePath = path.join(outDir, `${lowerFirst(toIdentifier(key))}.ts`)
      const fmtResult = await fmt(body)
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
      const mkdirResult = await mkdir(path.dirname(filePath))
      if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
      const writeResult = await writeFile(filePath, fmtResult.value)
      if (!writeResult.ok) return { ok: false, error: writeResult.error }
    }

    const indexBody = `${Object.keys(schemes)
      .sort()
      .map((n) => `export * from './${lowerFirst(toIdentifier(n))}'`)
      .join('\n')}\n`
    const fmtResult = await fmt(indexBody)
    if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
    const mkdirResult = await mkdir(path.dirname(path.join(outDir, 'index.ts')))
    if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
    const writeResult = await writeFile(path.join(outDir, 'index.ts'), fmtResult.value)
    if (!writeResult.ok) return { ok: false, error: writeResult.error }

    return {
      ok: true,
      value: `Generated securitySchemes code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const outFile = String(output)
  const fmtResult = await fmt(`${defs.join('\n\n')}\n`)
  if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
  const mkdirResult = await mkdir(path.dirname(outFile))
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
  const writeResult = await writeFile(outFile, fmtResult.value)
  if (!writeResult.ok) return { ok: false, error: writeResult.error }

  return { ok: true, value: `Generated securitySchemes code written to ${outFile}` }
}
