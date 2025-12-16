import path from 'node:path'
import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'
import { routeCode } from '../generator/zod-openapi-hono/openapi/route/index.js'
import { parseOpenAPI } from '../openapi/index.js'

const findSchemaTokens = (code: string): string[] =>
  Array.from(
    new Set(
      Array.from(code.matchAll(/\b([A-Za-z_$][A-Za-z0-9_$]*Schema)\b/g))
        .map((m) => m[1] ?? '')
        .filter(Boolean),
    ),
  )

const extractRouteBlocks = (src: string): { name: string; block: string }[] => {
  const re = /export\s+const\s+([A-Za-z_$][A-Za-z0-9_$]*)Route\s*=/g
  const hits: Array<{ name: string; start: number }> = []
  for (const m of src.matchAll(re)) {
    const name = (m[1] ?? '').trim()
    const start = m.index ?? 0
    if (name) hits.push({ name, start })
  }
  return hits.map((h, i) => {
    const start = h.start
    const end = i + 1 < hits.length ? (hits[i + 1]?.start ?? src.length) : src.length
    return { name: h.name, block: src.slice(start, end).trim() }
  })
}

const lowerFirst = (s: string) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s)

export async function route(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: string | `${string}.ts`,
  importPath: string,
  split?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
  const openAPI = openAPIResult.value

  const routesSrc = routeCode(openAPI)

  if (!split) {
    const includeZ = routesSrc.includes('z.')
    const schemaTokens = findSchemaTokens(routesSrc)
    const importHono = `import { createRoute${includeZ ? ', z' : ''} } from '@hono/zod-openapi'`
    const importSchemas =
      schemaTokens.length > 0 ? `import { ${schemaTokens.join(',')} } from '${importPath}'` : ''

    const finalSrc = [importHono, importSchemas, '\n', routesSrc].filter(Boolean).join('\n')
    const fmtResult = await fmt(finalSrc)
    if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
    const mkdirResult = await mkdir(path.dirname(output))
    if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
    const writeResult = await writeFile(output, fmtResult.value)
    if (!writeResult.ok) return { ok: false, error: writeResult.error }
    return { ok: true, value: `Generated route code written to ${output}` }
  }

  const outDir = (output as string).replace(/\.ts$/, '')
  const blocks = extractRouteBlocks(routesSrc)

  if (blocks.length === 0) {
    const includeZ = routesSrc.includes('z.')
    const schemaTokens = findSchemaTokens(routesSrc)
    const importHono = `import { createRoute${includeZ ? ', z' : ''} } from '@hono/zod-openapi'`
    const importSchemas =
      schemaTokens.length > 0 ? `import { ${schemaTokens.join(',')} } from '${importPath}'` : ''
    const finalSrc = [importHono, importSchemas, '\n', routesSrc].filter(Boolean).join('\n')

    const fmtResult = await fmt(finalSrc)
    if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
    const mkdirResult = await mkdir(path.dirname(output))
    if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
    const writeResult = await writeFile(output, fmtResult.value)
    if (!writeResult.ok) return { ok: false, error: writeResult.error }
    return { ok: true, value: `Generated route code written to ${output}` }
  }

  for (const { name, block } of blocks) {
    const includeZ = block.includes('z.')
    const schemaTokens = findSchemaTokens(block)
    const importHono = `import { createRoute${includeZ ? ', z' : ''} } from '@hono/zod-openapi'`
    const importSchemas =
      schemaTokens.length > 0 ? `import { ${schemaTokens.join(',')} } from '${importPath}'` : ''
    const fileSrc = [importHono, importSchemas, '\n', block, ''].filter(Boolean).join('\n')

    const fmtResult = await fmt(fileSrc)
    if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
    const filePath = `${outDir}/${lowerFirst(name)}.ts`
    const mkdirResult = await mkdir(path.dirname(filePath))
    if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
    const writeResult = await writeFile(filePath, fmtResult.value)
    if (!writeResult.ok) return { ok: false, error: writeResult.error }
  }

  const indexBody = `${blocks
    .sort()
    .map(({ name }) => `export * from './${lowerFirst(name)}'`)
    .join('\n')}\n`
  const fmtResult = await fmt(indexBody)
  if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
  const mkdirResult = await mkdir(path.dirname(`${outDir}/index.ts`))
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
  const writeResult = await writeFile(`${outDir}/index.ts`, fmtResult.value)
  if (!writeResult.ok) return { ok: false, error: writeResult.error }

  return { ok: true, value: `Generated route code written to ${outDir}/*.ts (index.ts included)` }
}
