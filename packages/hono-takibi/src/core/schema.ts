import path from 'node:path'
import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { resolveSchemasDependencies } from '../helper/resolve-schemas-dependencies.js'
import { zodToOpenAPISchema } from '../helper/zod-to-openapi-schema.js'
import { parseOpenAPI } from '../openapi/index.js'

const lowerFirst = (s: string) => (s ? (s[0]?.toLowerCase() ?? '') + s.slice(1) : s)
const findSchemaRefs = (code: string, selfName: string): string[] => {
  const re = /\b([A-Za-z_$][A-Za-z0-9_$]*)Schema\b/g
  const out = new Set<string>()
  for (const m of code.matchAll(re)) {
    const base = m[1] ?? ''
    if (base !== selfName && base) out.add(base)
  }
  return Array.from(out)
}

export async function schema(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: string | `${string}.ts`,
  exportType: boolean,
  split?: boolean,
): Promise<
  | {
      readonly ok: true
      readonly value: string
    }
  | {
      readonly ok: false
      readonly error: string
    }
> {
  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) {
    return { ok: false, error: openAPIResult.error }
  }
  const openAPI = openAPIResult.value
  const { schemas } = openAPI.components ? openAPI.components : {}
  if (!schemas) {
    return { ok: false, error: 'No schemas found' }
  }

  // split
  if (split) {
    const outDir = output.replace(/\.ts$/, '')
    for (const schemaName of Object.keys(schemas)) {
      const schema = schemas[schemaName]
      const z = zodToOpenAPI(schema)
      // export schema must be true
      const zs = zodToOpenAPISchema(schemaName, z, true, exportType)

      const importZ = `import { z } from '@hono/zod-openapi'`
      const deps = findSchemaRefs(zs, schemaName).filter((d) => d in schemas)
      const depImports =
        deps.length > 0
          ? deps.map((d) => `import { ${d}Schema } from './${lowerFirst(d)}'`).join('\n')
          : ''
      const fileCode = [importZ, depImports, '\n', zs].filter(Boolean).join('\n')

      const fmtCode = await fmt(fileCode)
      if (!fmtCode.ok) {
        return { ok: false, error: fmtCode.error }
      }

      const filePath = `${outDir}/${lowerFirst(schemaName)}.ts`
      const mkdirResult = await mkdir(path.dirname(filePath))
      if (!mkdirResult.ok) {
        return { ok: false, error: mkdirResult.error }
      }
      const writeResult = await writeFile(filePath, fmtCode.value)
      if (!writeResult.ok) {
        return { ok: false, error: writeResult.error }
      }
    }

    // index.ts
    const indexBody = `${Object.keys(schemas)
      .map((n) => `export * from './${lowerFirst(n)}'`)
      .join('\n')}\n`
    const indexFmt = await fmt(indexBody)
    if (!indexFmt.ok) {
      return { ok: false, error: indexFmt.error }
    }
    const mkIndex = await mkdir(path.dirname(`${outDir}/index.ts`))
    if (!mkIndex.ok) {
      return { ok: false, error: mkIndex.error }
    }
    const wrIndex = await writeFile(`${outDir}/index.ts`, indexFmt.value)
    if (!wrIndex.ok) {
      return { ok: false, error: wrIndex.error }
    }

    return {
      ok: true,
      value: `Generated schema code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const orderedSchemas = resolveSchemasDependencies(schemas)
  if (orderedSchemas.length === 0) {
    return { ok: true, value: 'No schemas found' }
  }

  const schemaDefinitions = orderedSchemas
    .map((schemaName) => {
      const schema = schemas[schemaName]
      const z = zodToOpenAPI(schema)
      return zodToOpenAPISchema(schemaName, z, true, exportType)
    })
    .join('\n\n')
  const importCode = `import { z } from '@hono/zod-openapi'`
  const schemaDefinitionsCode = `${importCode}\n\n${schemaDefinitions}`
  const fmtCode = await fmt(schemaDefinitionsCode)
  if (!fmtCode.ok) {
    return { ok: false, error: fmtCode.error }
  }
  const mkdirResult = await mkdir(path.dirname(output))
  if (!mkdirResult.ok) {
    return { ok: false, error: mkdirResult.error }
  }
  const writeResult = await writeFile(output, fmtCode.value)
  if (!writeResult.ok) {
    return { ok: false, error: writeResult.error }
  }
  return { ok: true, value: `Generated schema code written to ${output}` }
}
