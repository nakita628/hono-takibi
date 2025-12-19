import path from 'node:path'
import { routeCode } from '../generator/zod-openapi-hono/openapi/routes/index.js'
import { core } from '../helper/core.js'
import { moduleSpecFrom } from '../helper/module-spec-from.js'
import { parseOpenAPI } from '../openapi/index.js'
import { findSchema } from '../utils/index.js'

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

const lowerFirst = (s: string) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s)

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

  const buildImports = (fromFile: string, src: string): string[] => {
    const specFrom = (target: {
      readonly output: string | `${string}.ts`
      readonly split?: boolean
      readonly import?: string
    }): string => {
      return target.import ?? moduleSpecFrom(fromFile, target)
    }

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

    const schemaImportFromRoute = new Set<string>()
    const parameterImportFromTarget = new Set<string>()
    const headerImportFromTarget = new Set<string>()

    for (const token of nonHeaderSchemaTokens) {
      const base = token.endsWith('Schema') ? token.slice(0, -'Schema'.length) : token
      if (schemaKeys.has(base)) {
        schemaImportFromRoute.add(token)
        continue
      }
      if (parameterKeys.has(base) && options.imports.parameters) {
        parameterImportFromTarget.add(token)
        continue
      }
      schemaImportFromRoute.add(token)
    }

    for (const token of headerSchemaTokens) {
      const base = token.endsWith('Schema') ? token.slice(0, -'Schema'.length) : token
      if (schemaKeys.has(base)) {
        schemaImportFromRoute.add(token)
        continue
      }
      if (parameterKeys.has(base) && options.imports.parameters) {
        parameterImportFromTarget.add(token)
        continue
      }
      if (options.imports.headers) {
        headerImportFromTarget.add(token)
        continue
      }
      schemaImportFromRoute.add(token)
    }

    const lines: string[] = []

    const schemaNames = Array.from(schemaImportFromRoute)
    if (schemaNames.length > 0)
      lines.push(`import { ${schemaNames.sort().join(',')} } from '${schemasSpec}'`)

    const parameterTarget = options.imports.parameters
    if (parameterTarget && parameterImportFromTarget.size > 0) {
      const spec = specFrom(parameterTarget)
      lines.push(
        `import { ${Array.from(parameterImportFromTarget).sort().join(',')} } from '${spec}'`,
      )
    }

    const headersTarget = options.imports.headers
    if (headersTarget && headerImportFromTarget.size > 0) {
      const spec = specFrom(headersTarget)
      lines.push(`import { ${Array.from(headerImportFromTarget).sort().join(',')} } from '${spec}'`)
    }

    const requireTarget = (
      suffix: string,
      target: unknown,
      tokens: string[],
    ): string | undefined => {
      if (tokens.length === 0) return undefined
      if (target) return undefined
      return `Missing zod-openapi.${suffix} output (required because generated routes reference ${suffix} components)`
    }

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

    if (responseTokens.length > 0 && options.imports.responses) {
      const spec = specFrom(options.imports.responses)
      lines.push(
        `import { ${Array.from(new Set(responseTokens)).sort().join(',')} } from '${spec}'`,
      )
    }

    if (requestBodyTokens.length > 0 && options.imports.requestBodies) {
      const spec = specFrom(options.imports.requestBodies)
      lines.push(
        `import { ${Array.from(new Set(requestBodyTokens)).sort().join(',')} } from '${spec}'`,
      )
    }

    if (linkTokens.length > 0 && options.imports.links) {
      const spec = specFrom(options.imports.links)
      lines.push(`import { ${Array.from(new Set(linkTokens)).sort().join(',')} } from '${spec}'`)
    }

    if (callbackTokens.length > 0 && options.imports.callbacks) {
      const spec = specFrom(options.imports.callbacks)
      lines.push(
        `import { ${Array.from(new Set(callbackTokens)).sort().join(',')} } from '${spec}'`,
      )
    }

    if (exampleTokens.length > 0 && options.imports.examples) {
      const spec = specFrom(options.imports.examples)
      lines.push(`import { ${Array.from(new Set(exampleTokens)).sort().join(',')} } from '${spec}'`)
    }

    return lines
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
