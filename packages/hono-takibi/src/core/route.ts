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

const findTokensBySuffix = (code: string, suffix: string): readonly string[] => {
  const tokens = stripStringLiterals(code).match(/\b[A-Za-z_$][A-Za-z0-9_$]*\b/g)
  if (!tokens) return []
  return Array.from(new Set(tokens.filter((t) => t.endsWith(suffix))))
}

const extractRouteBlocks = (
  src: string,
): readonly { readonly name: string; readonly block: string }[] => {
  const re = /export\s+const\s+([A-Za-z_$][A-Za-z0-9_$]*)Route\s*=/g
  const hits: Array<{ readonly name: string; readonly start: number }> = []
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
  options?: {
    readonly split?: boolean
    readonly components?: {
      readonly schemas?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
      readonly parameters?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
      readonly securitySchemes?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
      readonly requestBodies?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
      readonly responses?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
      readonly headers?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
      readonly examples?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
      readonly links?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
      readonly callbacks?: {
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

  const components = options?.components
  const schemas = components?.schemas
  const split = options?.split ?? false

  // Determine if we should use component refs (when non-schema components are defined)
  const hasNonSchemaComponents =
    components?.requestBodies !== undefined ||
    components?.responses !== undefined ||
    components?.links !== undefined ||
    components?.callbacks !== undefined ||
    components?.headers !== undefined ||
    components?.examples !== undefined

  const routesSrc = routeCode(
    openAPI,
    hasNonSchemaComponents ? { useComponentRefs: true } : undefined,
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
    if (schemaTokens.length === 0 && !hasNonSchemaComponents) return []

    // If no schemas config, return empty (no imports)
    if (!schemas) {
      return schemaTokens.length > 0
        ? ['// Warning: schemas config is missing, cannot resolve schema imports']
        : []
    }

    const schemasSpec = specFrom(schemas)

    // Check if we have other components that require import classification
    const hasOtherComponents =
      components?.parameters !== undefined ||
      components?.headers !== undefined ||
      components?.requestBodies !== undefined ||
      components?.responses !== undefined ||
      components?.links !== undefined ||
      components?.callbacks !== undefined ||
      components?.examples !== undefined

    // Default (backward compatible): import all *Schema tokens from schemas module spec
    if (!hasOtherComponents) {
      return schemaTokens.length > 0
        ? [`import { ${schemaTokens.join(',')} } from '${schemasSpec}'`]
        : []
    }

    const headerSchemaTokens = schemaTokens.filter((t) => t.endsWith('HeaderSchema'))
    const nonHeaderSchemaTokens = schemaTokens.filter((t) => !t.endsWith('HeaderSchema'))

    const classifyToken = (token: string, isHeader: boolean): 'schema' | 'parameter' | 'header' => {
      const base = token.endsWith('Schema') ? token.slice(0, -'Schema'.length) : token
      if (schemaKeys.has(base)) return 'schema'
      if (parameterKeys.has(base) && components?.parameters) return 'parameter'
      if (isHeader && components?.headers) return 'header'
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

    const responseTokens = hasNonSchemaComponents ? findTokensBySuffix(src, 'Response') : []
    const requestBodyTokens = hasNonSchemaComponents ? findTokensBySuffix(src, 'RequestBody') : []
    const linkTokens = hasNonSchemaComponents ? findTokensBySuffix(src, 'Link') : []
    const callbackTokens = hasNonSchemaComponents ? findTokensBySuffix(src, 'Callback') : []
    const exampleTokens = hasNonSchemaComponents ? findTokensBySuffix(src, 'Example') : []

    const missing =
      requireTarget('responses', components?.responses, responseTokens) ??
      requireTarget('requestBodies', components?.requestBodies, requestBodyTokens) ??
      requireTarget('links', components?.links, linkTokens) ??
      requireTarget('callbacks', components?.callbacks, callbackTokens) ??
      requireTarget('examples', components?.examples, exampleTokens)

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
      makeImportLine(parameterImportFromTarget, components?.parameters),
      makeImportLine(headerImportFromTarget, components?.headers),
      makeImportLine(responseTokens, components?.responses),
      makeImportLine(requestBodyTokens, components?.requestBodies),
      makeImportLine(linkTokens, components?.links),
      makeImportLine(callbackTokens, components?.callbacks),
      makeImportLine(exampleTokens, components?.examples),
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
    .toSorted((a, b) => a.name.localeCompare(b.name))
    .map(({ name }) => `export * from './${lowerFirst(name)}'`)
    .join('\n')}\n`

  const coreResult = await core(indexBody, outDir, `${outDir}/index.ts`)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated route code written to ${outDir}/*.ts (index.ts included)` }
}
