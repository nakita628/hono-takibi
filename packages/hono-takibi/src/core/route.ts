import path from 'node:path'
import { routeCode } from '../generator/zod-openapi-hono/openapi/routes/index.js'
import { core } from '../helper/core.js'
import { moduleSpecFrom } from '../helper/module-spec-from.js'
import { parseOpenAPI } from '../openapi/index.js'
import { findSchema, lowerFirst, renderNamedImport } from '../utils/index.js'

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
  const hits = Array.from(src.matchAll(re))
    .map((m) => ({
      name: (m[1] ?? '').trim(),
      start: m.index ?? 0,
    }))
    .filter((h) => h.name.length > 0)
  return hits.map((h, i) => {
    const start = h.start
    const end = i + 1 < hits.length ? (hits[i + 1]?.start ?? src.length) : src.length
    return { name: h.name, block: src.slice(start, end).trim() }
  })
}

export async function route(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  routes?: {
    readonly output: string | `${string}.ts`
    readonly split?: boolean
  },
  components?: {
    // # Reusable schemas (data models)
    readonly schemas?: {
      readonly output: string | `${string}.ts`
      readonly exportType?: boolean
      readonly split?: boolean
      readonly import?: string
    }
    // # Reusable path, query, header and cookie parameters
    readonly parameters?: {
      readonly output: string | `${string}.ts`
      readonly exportType?: boolean
      readonly split?: boolean
      readonly import?: string
    }
    // # Security scheme definitions (see Authentication)
    readonly securitySchemes?: {
      readonly output: string | `${string}.ts`
      readonly split?: boolean
      readonly import?: string
    }
    // # Reusable request bodies
    readonly requestBodies?: {
      readonly output: string | `${string}.ts`
      readonly split?: boolean
      readonly import?: string
    }
    // # Reusable responses, such as 401 Unauthorized or 400 Bad Request
    readonly responses?: {
      readonly output: string | `${string}.ts`
      readonly split?: boolean
      readonly import?: string
    }
    // # Reusable response headers
    readonly headers?: {
      readonly output: string | `${string}.ts`
      readonly exportType?: boolean
      readonly split?: boolean
      readonly import?: string
    }
    // # Reusable examples
    readonly examples?: {
      readonly output: string | `${string}.ts`
      readonly split?: boolean
      readonly import?: string
    }
    // # Reusable links
    readonly links?: {
      readonly output: string | `${string}.ts`
      readonly split?: boolean
      readonly import?: string
    }
    // # Reusable callbacks
    readonly callbacks?: {
      readonly output: string | `${string}.ts`
      readonly split?: boolean
      readonly import?: string
    }
  },
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!routes?.output) return { ok: false, error: 'routes.output is required' }
  const output = routes.output
  const split = routes.split ?? false

  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
  const openAPI = openAPIResult.value

  const componentConfig = components
  const schemas = componentConfig?.schemas

  // Determine if we should use component refs (when non-schema components are defined)
  const hasNonSchemaComponents =
    componentConfig?.requestBodies !== undefined ||
    componentConfig?.responses !== undefined ||
    componentConfig?.links !== undefined ||
    componentConfig?.callbacks !== undefined ||
    componentConfig?.headers !== undefined ||
    componentConfig?.examples !== undefined

  const routesSrc = routeCode(
    openAPI,
    hasNonSchemaComponents ? { useComponentRefs: true } : undefined,
  )

  const schemaKeys = new Set(Object.keys(openAPI.components?.schemas ?? {}))
  const parameterKeys = new Set(Object.keys(openAPI.components?.parameters ?? {}))
  const headerKeys = new Set(Object.keys(openAPI.components?.headers ?? {}))

  const schemaConstName = (key: string): string => `${key}Schema`
  const parameterConstName = (key: string): string => {
    if (key.endsWith('ParamsSchema')) return key
    if (key.endsWith('Params')) return `${key}Schema`
    return `${key}ParamsSchema`
  }
  const headerConstName = (key: string): string => {
    if (key.endsWith('HeaderSchema')) return key
    if (key.endsWith('Header')) return `${key}Schema`
    return `${key}HeaderSchema`
  }

  const buildImports = (fromFile: string, src: string): readonly string[] => {
    const schemaTokens = findSchema(src)
    if (schemaTokens.length === 0 && !hasNonSchemaComponents) return []

    // Check if we have other components that require import classification
    const hasOtherComponents =
      componentConfig?.parameters !== undefined ||
      componentConfig?.headers !== undefined ||
      componentConfig?.requestBodies !== undefined ||
      componentConfig?.responses !== undefined ||
      componentConfig?.links !== undefined ||
      componentConfig?.callbacks !== undefined ||
      componentConfig?.examples !== undefined

    // Default (backward compatible): import all *Schema tokens from schemas module spec
    if (!hasOtherComponents) {
      if (!schemas) {
        if (schemaTokens.length > 0) {
          throw new Error(
            'Missing zod-openapi.components.schemas output (required because generated routes reference schemas)',
          )
        }
        return []
      }
      const schemaSpec = schemas.import ?? moduleSpecFrom(fromFile, schemas)
      const line = renderNamedImport(schemaTokens, schemaSpec)
      return line ? [line] : []
    }

    const schemaConstNames = new Set<string>(Array.from(schemaKeys, schemaConstName))
    const parameterConstNames = new Set<string>(Array.from(parameterKeys, parameterConstName))
    const headerConstNames = new Set<string>(Array.from(headerKeys, headerConstName))

    const schemaImportFromRoute = new Set<string>()
    const parameterImportFromTarget = new Set<string>()
    const headerImportFromTarget = new Set<string>()

    for (const token of schemaTokens) {
      if (headerConstNames.has(token)) {
        headerImportFromTarget.add(token)
        continue
      }
      if (parameterConstNames.has(token)) {
        parameterImportFromTarget.add(token)
        continue
      }
      if (schemaConstNames.has(token)) {
        schemaImportFromRoute.add(token)
        continue
      }
      if (token.endsWith('HeaderSchema')) {
        headerImportFromTarget.add(token)
        continue
      }
      if (token.endsWith('ParamsSchema')) {
        parameterImportFromTarget.add(token)
        continue
      }
      schemaImportFromRoute.add(token)
    }

    if (schemaImportFromRoute.size > 0 && !schemas) {
      throw new Error(
        'Missing zod-openapi.components.schemas output (required because generated routes reference schemas)',
      )
    }
    if (parameterImportFromTarget.size > 0 && !componentConfig?.parameters) {
      throw new Error(
        'Missing zod-openapi.components.parameters output (required because generated routes reference parameters)',
      )
    }
    if (headerImportFromTarget.size > 0 && !componentConfig?.headers) {
      throw new Error(
        'Missing zod-openapi.components.headers output (required because generated routes reference headers)',
      )
    }

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
        : `Missing zod-openapi.components.${suffix} output (required because generated routes reference ${suffix} components)`

    const responseTokens = hasNonSchemaComponents ? findTokensBySuffix(src, 'Response') : []
    const requestBodyTokens = hasNonSchemaComponents ? findTokensBySuffix(src, 'RequestBody') : []
    const linkTokens = hasNonSchemaComponents ? findTokensBySuffix(src, 'Link') : []
    const callbackTokens = hasNonSchemaComponents ? findTokensBySuffix(src, 'Callback') : []
    const exampleTokens = hasNonSchemaComponents ? findTokensBySuffix(src, 'Example') : []

    const missing =
      requireTarget('responses', componentConfig?.responses, responseTokens) ??
      requireTarget('requestBodies', componentConfig?.requestBodies, requestBodyTokens) ??
      requireTarget('links', componentConfig?.links, linkTokens) ??
      requireTarget('callbacks', componentConfig?.callbacks, callbackTokens) ??
      requireTarget('examples', componentConfig?.examples, exampleTokens)

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
      const spec = target.import ?? moduleSpecFrom(fromFile, target)
      const line = renderNamedImport(arr, spec, { sort: true })
      return line || undefined
    }

    const schemaSpec = schemas ? (schemas.import ?? moduleSpecFrom(fromFile, schemas)) : undefined
    const schemaImportLine =
      schemaImportFromRoute.size > 0 && schemaSpec
        ? renderNamedImport(Array.from(schemaImportFromRoute), schemaSpec, { sort: true })
        : undefined

    return [
      schemaImportLine,
      makeImportLine(parameterImportFromTarget, componentConfig?.parameters),
      makeImportLine(headerImportFromTarget, componentConfig?.headers),
      makeImportLine(responseTokens, componentConfig?.responses),
      makeImportLine(requestBodyTokens, componentConfig?.requestBodies),
      makeImportLine(linkTokens, componentConfig?.links),
      makeImportLine(callbackTokens, componentConfig?.callbacks),
      makeImportLine(exampleTokens, componentConfig?.examples),
    ].filter((line): line is string => Boolean(line))
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
