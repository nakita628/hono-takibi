import path from 'node:path'
import { routeCode } from '../generator/zod-openapi-hono/openapi/routes/index.js'
import { core, makeBarell, makeModuleSpec } from '../helper/index.js'
import type { OpenAPI } from '../openapi/index.js'
import { findSchema, findTokensBySuffix, lowerFirst, renderNamedImport } from '../utils/index.js'

// Common type for component configuration
type ComponentTarget = {
  readonly output: string | `${string}.ts`
  readonly split?: boolean
  readonly import?: string
}

type ComponentsConfig = {
  readonly schemas?: ComponentTarget & { readonly exportTypes?: boolean }
  readonly parameters?: ComponentTarget & { readonly exportTypes?: boolean }
  readonly securitySchemes?: ComponentTarget
  readonly requestBodies?: ComponentTarget
  readonly responses?: ComponentTarget
  readonly headers?: ComponentTarget & { readonly exportTypes?: boolean }
  readonly examples?: ComponentTarget
  readonly links?: ComponentTarget
  readonly callbacks?: ComponentTarget
}

type Result =
  | { readonly ok: true; readonly value: string }
  | { readonly ok: false; readonly error: string }

// Extract route blocks from source code
const extractRouteBlocks = (
  src: string,
): readonly { readonly name: string; readonly block: string }[] => {
  const re = /export\s+const\s+([A-Za-z_$][A-Za-z0-9_$]*)Route\s*=/g
  const hits = Array.from(src.matchAll(re))
    .map((m) => ({ name: (m[1] ?? '').trim(), start: m.index ?? 0 }))
    .filter((h) => h.name.length > 0)

  return hits.map((h, i) => ({
    name: h.name,
    block: src.slice(h.start, hits[i + 1]?.start ?? src.length).trim(),
  }))
}

// Generate Hono import statement
const makeHonoImport = (src: string): string => {
  const includeZ = src.includes('z.')
  return `import { createRoute${includeZ ? ', z' : ''} } from '@hono/zod-openapi'`
}

// Build complete source with imports
const buildSource = (src: string, importLines: readonly string[]): string =>
  [makeHonoImport(src), ...importLines, '\n', src, ''].filter(Boolean).join('\n')

// Classify schema tokens into their respective component types
const classifySchemaTokens = (
  tokens: readonly string[],
  parameterNames: ReadonlySet<string>,
  headerNames: ReadonlySet<string>,
): {
  readonly schemas: ReadonlySet<string>
  readonly parameters: ReadonlySet<string>
  readonly headers: ReadonlySet<string>
} => {
  const schemas = new Set<string>()
  const parameters = new Set<string>()
  const headers = new Set<string>()

  for (const token of tokens) {
    if (headerNames.has(token) || token.endsWith('HeaderSchema')) {
      headers.add(token)
    } else if (parameterNames.has(token) || token.endsWith('ParamsSchema')) {
      parameters.add(token)
    } else {
      schemas.add(token)
    }
  }
  return { schemas, parameters, headers }
}

// Create import line from tokens and target
const makeImportLine = (
  tokens: ReadonlySet<string> | readonly string[],
  target: ComponentTarget | undefined,
  fromFile: string,
): string | undefined => {
  const arr = Array.isArray(tokens) ? tokens : Array.from(tokens)
  if (arr.length === 0 || !target) return undefined
  const spec = target.import ?? makeModuleSpec(fromFile, target)
  return renderNamedImport(arr, spec, { sort: true }) || undefined
}

// Validate required component configuration
const validateRequiredComponents = (
  components: ComponentsConfig | undefined,
  classified: {
    readonly schemas: ReadonlySet<string>
    readonly parameters: ReadonlySet<string>
    readonly headers: ReadonlySet<string>
  },
  suffixTokens: { readonly [suffix: string]: readonly string[] },
): void => {
  const checks: readonly [string, ComponentTarget | undefined, number][] = [
    ['schemas', components?.schemas, classified.schemas.size],
    ['parameters', components?.parameters, classified.parameters.size],
    ['headers', components?.headers, classified.headers.size],
    ['responses', components?.responses, suffixTokens.Response?.length ?? 0],
    ['requestBodies', components?.requestBodies, suffixTokens.RequestBody?.length ?? 0],
    ['links', components?.links, suffixTokens.Link?.length ?? 0],
    ['callbacks', components?.callbacks, suffixTokens.Callback?.length ?? 0],
    ['examples', components?.examples, suffixTokens.Example?.length ?? 0],
  ]

  for (const [name, target, count] of checks) {
    if (count > 0 && !target) {
      throw new Error(
        `Missing zod-openapi.components.${name} output (required because generated routes reference ${name})`,
      )
    }
  }
}

export async function route(
  openAPI: OpenAPI,
  routes?: { readonly output: string | `${string}.ts`; readonly split?: boolean },
  components?: ComponentsConfig,
): Promise<Result> {
  if (!routes?.output) return { ok: false, error: 'routes.output is required' }

  const { output, split = false } = routes
  const routesSrc = routeCode(openAPI)

  // Build const name sets from OpenAPI components
  const parameterNames = new Set(
    Object.keys(openAPI.components?.parameters ?? {}).map((k) => {
      if (k.endsWith('ParamsSchema')) return k
      if (k.endsWith('Params')) return `${k}Schema`
      return `${k}ParamsSchema`
    }),
  )
  const headerNames = new Set(
    Object.keys(openAPI.components?.headers ?? {}).map((k) => {
      if (k.endsWith('HeaderSchema')) return k
      if (k.endsWith('Header')) return `${k}Schema`
      return `${k}HeaderSchema`
    }),
  )

  // Check for non-schema components
  const hasOtherComponents =
    components?.parameters !== undefined ||
    components?.headers !== undefined ||
    components?.requestBodies !== undefined ||
    components?.responses !== undefined ||
    components?.links !== undefined ||
    components?.callbacks !== undefined ||
    components?.examples !== undefined

  const buildImports = (fromFile: string, src: string): readonly string[] => {
    const schemaTokens = findSchema(src)
    if (schemaTokens.length === 0 && !hasOtherComponents) return []

    // Simple case: only schemas configured
    if (!hasOtherComponents) {
      if (!components?.schemas) {
        if (schemaTokens.length > 0) {
          throw new Error(
            'Missing zod-openapi.components.schemas output (required because generated routes reference schemas)',
          )
        }
        return []
      }
      const spec = components.schemas.import ?? makeModuleSpec(fromFile, components.schemas)
      const line = renderNamedImport(schemaTokens, spec)
      return line ? [line] : []
    }

    // Classify tokens and find suffix-based tokens
    const classified = classifySchemaTokens(schemaTokens, parameterNames, headerNames)
    const suffixTokens = {
      Response: findTokensBySuffix(src, 'Response'),
      RequestBody: findTokensBySuffix(src, 'RequestBody'),
      Link: findTokensBySuffix(src, 'Link'),
      Callback: findTokensBySuffix(src, 'Callback'),
      Example: findTokensBySuffix(src, 'Example'),
    }

    validateRequiredComponents(components, classified, suffixTokens)

    // Build import lines in OpenAPI Specification order
    return [
      makeImportLine(classified.schemas, components?.schemas, fromFile),
      makeImportLine(classified.parameters, components?.parameters, fromFile),
      makeImportLine(suffixTokens.RequestBody, components?.requestBodies, fromFile),
      makeImportLine(suffixTokens.Response, components?.responses, fromFile),
      makeImportLine(classified.headers, components?.headers, fromFile),
      makeImportLine(suffixTokens.Example, components?.examples, fromFile),
      makeImportLine(suffixTokens.Link, components?.links, fromFile),
      makeImportLine(suffixTokens.Callback, components?.callbacks, fromFile),
    ].filter((line): line is string => Boolean(line))
  }

  // Write a single route file
  const writeFile = async (filePath: string, src: string): Promise<Result> => {
    try {
      const importLines = buildImports(filePath, src)
      const finalSrc = buildSource(src, importLines)
      const result = await core(finalSrc, path.dirname(filePath), filePath)
      return result.ok ? { ok: true, value: filePath } : { ok: false, error: result.error }
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) }
    }
  }

  // Non-split mode: single file
  if (!split) {
    const result = await writeFile(String(output), routesSrc)
    if (!result.ok) return result
    return { ok: true, value: `Generated route code written to ${output}` }
  }

  // Split mode
  const outDir = output.replace(/\.ts$/, '')
  const blocks = extractRouteBlocks(routesSrc)

  // No blocks found: write as single file
  if (blocks.length === 0) {
    const result = await writeFile(String(output), routesSrc)
    if (!result.ok) return result
    return { ok: true, value: `Generated route code written to ${output}` }
  }

  // Write each route block and barrel file in parallel
  const allResults = await Promise.all([
    ...blocks.map(({ name, block }) => {
      const filePath = `${outDir}/${lowerFirst(name)}.ts`
      return writeFile(filePath, block)
    }),
    core(
      makeBarell(Object.fromEntries(blocks.map((b) => [b.name, null]))),
      outDir,
      `${outDir}/index.ts`,
    ),
  ])

  const firstError = allResults.find((r) => !r.ok)
  if (firstError && !firstError.ok) return { ok: false, error: firstError.error }

  return { ok: true, value: `Generated route code written to ${outDir}/*.ts (index.ts included)` }
}
