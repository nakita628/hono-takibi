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

const extractRouteBlocks = (src: string): { name: string; block: string }[] =>
  Array.from(
    src.matchAll(
      /export\s+const\s+([A-Za-z_$][A-Za-z0-9_$]*)Route\s*=\s*createRoute\(\s*\{[\s\S]*?\}\s*\)/g,
    ),
  ).map((m) => ({ name: m[1]!, block: m[0]! }))

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
  if (!openAPIResult.ok) {
    return { ok: false, error: openAPIResult.error }
  }
  const openAPI = openAPIResult.value

  const routesSrc = routeCode(openAPI.paths)

  if (!split) {
    const includeZ = routesSrc.includes('z.')
    const schemaTokens = findSchemaTokens(routesSrc)
    const importHono = `import { createRoute${includeZ ? ', z' : ''} } from '@hono/zod-openapi'`
    const importSchemas =
      schemaTokens.length > 0 ? `import { ${schemaTokens.join(', ')} } from '${importPath}'` : ''

    const finalSrc = [importHono, importSchemas, '\n', routesSrc].filter(Boolean).join('\n')
    const fmtCode = await fmt(finalSrc)
    if (!fmtCode.ok) return { ok: false, error: fmtCode.error }

    const mk = await mkdir(path.dirname(output))
    if (!mk.ok) return { ok: false, error: mk.error }

    const wr = await writeFile(output, fmtCode.value)
    return wr.ok
      ? { ok: true, value: `Generated route code written to ${output}` }
      : { ok: false, error: wr.error }
  }

  // --- split: ルートごとに分割し index.ts を生成 ---
  const outDir = (output as string).replace(/\.ts$/, '')
  const blocks = extractRouteBlocks(routesSrc)

  // ブロックが見つからない場合はフォールバックで一括出力
  if (blocks.length === 0) {
    const includeZ = routesSrc.includes('z.')
    const schemaTokens = findSchemaTokens(routesSrc)
    const importHono = `import { createRoute${includeZ ? ', z' : ''} } from '@hono/zod-openapi'`
    const importSchemas =
      schemaTokens.length > 0 ? `import { ${schemaTokens.join(',')} } from '${importPath}'` : ''
    const finalSrc = [importHono, importSchemas, '', routesSrc].filter(Boolean).join('\n')
    const fmtCode = await fmt(finalSrc)
    if (!fmtCode.ok) return { ok: false, error: fmtCode.error }
    const mk = await mkdir(path.dirname(output))
    if (!mk.ok) return { ok: false, error: mk.error }
    const wr = await writeFile(output, fmtCode.value)
    return wr.ok
      ? { ok: true, value: `Generated route code written to ${output}` }
      : { ok: false, error: wr.error }
  }

  for (const { name, block } of blocks) {
    const includeZ = block.includes('z.')
    const schemaTokens = findSchemaTokens(block)
    const importHono = `import { createRoute${includeZ ? ', z' : ''} } from '@hono/zod-openapi'`
    const importSchemas =
      schemaTokens.length > 0 ? `import { ${schemaTokens.join(',')} } from '${importPath}'` : ''
    const fileSrc = [importHono, importSchemas, '\n', block].filter(Boolean).join('\n')

    const fmtCode = await fmt(fileSrc)
    if (!fmtCode.ok) return { ok: false, error: fmtCode.error }

    const filePath = `${outDir}/${lowerFirst(name)}.ts`
    const mk = await mkdir(path.dirname(filePath))
    if (!mk.ok) return { ok: false, error: mk.error }

    const wr = await writeFile(filePath, fmtCode.value)
    if (!wr.ok) return { ok: false, error: wr.error }
  }

  const indexBody = `${blocks.map(({ name }) => `export * from './${lowerFirst(name)}'`).join('\n')}\n`
  const indexFmt = await fmt(indexBody)
  if (!indexFmt.ok) return { ok: false, error: indexFmt.error }

  const mkIndex = await mkdir(path.dirname(`${outDir}/index.ts`))
  if (!mkIndex.ok) return { ok: false, error: mkIndex.error }

  const wrIndex = await writeFile(`${outDir}/index.ts`, indexFmt.value)
  if (!wrIndex.ok) return { ok: false, error: wrIndex.error }

  return { ok: true, value: `Generated route code written to ${outDir}/*.ts (index.ts included)` }
}
