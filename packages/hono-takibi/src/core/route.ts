import path from 'node:path'
import { routeCode } from '../generator/zod-openapi-hono/openapi/routes/index.js'
import { core } from '../helper/core.js'
import { moduleSpecFrom } from '../helper/module-spec-from.js'
import { parseOpenAPI } from '../openapi/index.js'
import { findSchema, lowerFirst } from '../utils/index.js'

const stripStringLiterals = (code: string): string => {
  // Remove simple single/double-quoted string literals to avoid treating object keys as identifiers.
  return code.replace(/'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/g, '')
}

const findTokensBySuffix = (code: string, suffix: string): string[] => {
  const tokens = stripStringLiterals(code).match(/\b[A-Za-z_$][A-Za-z0-9_$]*\b/g)
  if (!tokens) return []
  return Array.from(new Set(tokens.filter((t) => t.endsWith(suffix))))
}

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

export async function route(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: string | `${string}.ts`,
  schemas: {
    readonly output: string | `${string}.ts`
    readonly split?: boolean
    readonly import?: string
  },
  split?: boolean,
  options?: {
    readonly useComponentRefs?: boolean
    readonly imports?: {
      readonly [K in
        | 'parameters'
        | 'securitySchemes'
        | 'requestBodies'
        | 'responses'
        | 'headers'
        | 'examples'
        | 'links'
        | 'callbacks']?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
    }
  },
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
  const openAPI = openAPIResult.value

  const routesSrc = routeCode(
    openAPI,
    options?.useComponentRefs ? { useComponentRefs: true } : undefined,
  )

  const schemaKeys = new Set(Object.keys(openAPI.components?.schemas ?? {}))
  const parameterKeys = new Set(Object.keys(openAPI.components?.parameters ?? {}))

  const buildImports = (fromFile: string, src: string): readonly string[] => {
    const specFrom = (target: {
      readonly output: string | `${string}.ts`
      readonly split?: boolean
      readonly import?: string
    }): string => target.import ?? moduleSpecFrom(fromFile, target)

    const schemaTokens = findSchema(src)
    if (schemaTokens.length === 0 && !options?.useComponentRefs) return []

    const schemasSpec = specFrom(schemas)

    // Default (backward compatible): import all *Schema tokens from schemas module spec
    if (!options?.imports) {
      return schemaTokens.length > 0
        ? [`import { ${schemaTokens.join(',')} } from '${schemasSpec}'`]
        : []
    }

    const headerSchemaTokens = schemaTokens.filter((t) => t.endsWith('HeaderSchema'))
    const nonHeaderSchemaTokens = schemaTokens.filter((t) => !t.endsWith('HeaderSchema'))

    const classifyToken = (token: string, isHeader: boolean): 'schema' | 'parameter' | 'header' => {
      const base = token.endsWith('Schema') ? token.slice(0, -'Schema'.length) : token
      if (schemaKeys.has(base)) return 'schema'
      if (parameterKeys.has(base) && options.imports?.parameters) return 'parameter'
      if (isHeader && options.imports?.headers) return 'header'
      return 'schema'
    }

    const schemaImportFromRoute = new Set<string>(
      [...nonHeaderSchemaTokens, ...headerSchemaTokens].filter(
        (t) => classifyToken(t, t.endsWith('HeaderSchema')) === 'schema',
      ),
    )
    const parameterImportFromTarget = new Set<string>(
      [...nonHeaderSchemaTokens, ...headerSchemaTokens].filter(
        (t) => classifyToken(t, t.endsWith('HeaderSchema')) === 'parameter',
      ),
    )
    const headerImportFromTarget = new Set<string>(
      headerSchemaTokens.filter((t) => classifyToken(t, true) === 'header'),
    )

    const requireTarget = (
      suffix: string,
      target:
        | {
            readonly output: string | `${string}.ts`
            readonly split?: boolean
            readonly import?: string
          }
        | undefined,
      tokens: readonly string[],
    ): string | undefined =>
      tokens.length === 0 || target
        ? undefined
        : `Missing zod-openapi.${suffix} output (required because generated routes reference ${suffix} components)`

    const responseTokens = options.useComponentRefs ? findTokensBySuffix(src, 'Response') : []
    const requestBodyTokens = options.useComponentRefs ? findTokensBySuffix(src, 'RequestBody') : []
    const linkTokens = options.useComponentRefs ? findTokensBySuffix(src, 'Link') : []
    const callbackTokens = options.useComponentRefs ? findTokensBySuffix(src, 'Callback') : []
    const exampleTokens = options.useComponentRefs ? findTokensBySuffix(src, 'Example') : []

    const missing =
      requireTarget('responses', options.imports.responses, responseTokens) ??
      requireTarget('requestBodies', options.imports.requestBodies, requestBodyTokens) ??
      requireTarget('links', options.imports.links, linkTokens) ??
      requireTarget('callbacks', options.imports.callbacks, callbackTokens) ??
      requireTarget('examples', options.imports.examples, exampleTokens)

    if (missing) throw new Error(missing)

    const makeImportLine = (
      tokens: ReadonlySet<string> | readonly string[],
      target:
        | {
            readonly output: string | `${string}.ts`
            readonly split?: boolean
            readonly import?: string
          }
        | undefined,
    ): string | undefined => {
      const arr = Array.isArray(tokens) ? tokens : Array.from(tokens)
      if (arr.length === 0 || !target) return undefined
      const spec = specFrom(target)
      return `import { ${Array.from(new Set(arr)).sort().join(',')} } from '${spec}'`
    }

    return [
      schemaImportFromRoute.size > 0
        ? `import { ${Array.from(schemaImportFromRoute).sort().join(',')} } from '${schemasSpec}'`
        : undefined,
      makeImportLine(parameterImportFromTarget, options.imports.parameters),
      makeImportLine(headerImportFromTarget, options.imports.headers),
      makeImportLine(responseTokens, options.imports.responses),
      makeImportLine(requestBodyTokens, options.imports.requestBodies),
      makeImportLine(linkTokens, options.imports.links),
      makeImportLine(callbackTokens, options.imports.callbacks),
      makeImportLine(exampleTokens, options.imports.examples),
    ].filter((line): line is string => line !== undefined)
  }

  if (!split) {
    try {
      const includeZ = routesSrc.includes('z.')
      const importHono = `import { createRoute${includeZ ? ', z' : ''} } from '@hono/zod-openapi'`
      const importLines = buildImports(String(output), routesSrc)

      const finalSrc = [importHono, ...importLines, '\n', routesSrc].filter(Boolean).join('\n')

      const coreResult = await core(finalSrc, path.dirname(output), output)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
      return { ok: true, value: `Generated route code written to ${output}` }
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) }
    }
  }

  const outDir = output.replace(/\.ts$/, '')
  const blocks = extractRouteBlocks(routesSrc)

  if (blocks.length === 0) {
    try {
      const includeZ = routesSrc.includes('z.')
      const importHono = `import { createRoute${includeZ ? ', z' : ''} } from '@hono/zod-openapi'`
      const importLines = buildImports(String(output), routesSrc)
      const finalSrc = [importHono, ...importLines, '\n', routesSrc].filter(Boolean).join('\n')

      const coreResult = await core(finalSrc, path.dirname(output), output)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
      return { ok: true, value: `Generated route code written to ${output}` }
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) }
    }
  }

  try {
    for (const { name, block } of blocks) {
      const includeZ = block.includes('z.')
      const importHono = `import { createRoute${includeZ ? ', z' : ''} } from '@hono/zod-openapi'`
      const filePath = `${outDir}/${lowerFirst(name)}.ts`
      const importLines = buildImports(filePath, block)
      const fileSrc = [importHono, ...importLines, '\n', block, ''].filter(Boolean).join('\n')

      const coreResult = await core(fileSrc, path.dirname(filePath), filePath)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
    }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }

  const indexBody = `${blocks
    .sort()
    .map(({ name }) => `export * from './${lowerFirst(name)}'`)
    .join('\n')}\n`

  const coreResult = await core(indexBody, outDir, `${outDir}/index.ts`)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated route code written to ${outDir}/*.ts (index.ts included)` }
}
