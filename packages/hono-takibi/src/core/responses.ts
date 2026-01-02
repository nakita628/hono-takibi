import path from 'node:path'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { core } from '../helper/core.js'
import type { Components, Content, Responses, Schema } from '../openapi/index.js'
import {
  buildExamples,
  ensureSuffix,
  findSchema,
  isRecord,
  lowerFirst,
  ref,
  renderNamedImport,
  toIdentifierPascalCase,
} from '../utils/index.js'

const isRef = (v: unknown): v is { $ref: string } => isRecord(v) && typeof v.$ref === 'string'

const headerSchemaExpr = (header: unknown): string => {
  if (!isRecord(header)) return 'z.any()'
  const rawSchema = header.schema
  const schema = isRecord(rawSchema) ? (rawSchema as Schema) : {}
  const description = typeof header.description === 'string' ? header.description : undefined
  const example = 'example' in header ? header.example : undefined
  const merged: Schema = {
    ...schema,
    ...(description !== undefined && schema.description === undefined ? { description } : {}),
    ...(example !== undefined && schema.example === undefined ? { example } : {}),
  }
  return zodToOpenAPI(merged)
}

const headersPropExpr = (
  headers: Responses['headers'] | undefined,
  components: Components,
): string | undefined => {
  if (!headers) return undefined
  const entries = Object.entries(headers).map(([name, header]) => {
    if (isRef(header) && header.$ref.startsWith('#/components/headers/')) {
      const resolved = (() => {
        const key = header.$ref.slice('#/components/headers/'.length)
        return key ? components.headers?.[key] : undefined
      })()
      const base = headerSchemaExpr(resolved ?? header)
      return `${JSON.stringify(name)}:${base}`
    }
    const base = headerSchemaExpr(header)
    return `${JSON.stringify(name)}:${base}`
  })

  return entries.length > 0 ? `headers:z.object({${entries.join(',')}})` : undefined
}

const mediaTypeExpr = (media: Content[string]): string => {
  const schema = zodToOpenAPI(media.schema)
  const examples = buildExamples(media.examples)
  const examplesProp = examples ? `examples:${examples}` : undefined
  return `{${[`schema:${schema}`, examplesProp].filter(Boolean).join(',')}}`
}

const linksPropExpr = (
  links: Responses['links'] | undefined,
  components: Components,
): string | undefined => {
  if (!links) return undefined
  const entries = Object.entries(links).map(([name, link]) => {
    if (isRef(link) && link.$ref.startsWith('#/components/links/')) {
      const key = link.$ref.slice('#/components/links/'.length)
      const resolved = key ? components.links?.[key] : undefined
      if (resolved)
        return `${JSON.stringify(name)}:${ref(link.$ref as `#/components/${string}/${string}`)}`
      return `${JSON.stringify(name)}:{$ref:${JSON.stringify(link.$ref)}}`
    }
    return `${JSON.stringify(name)}:${JSON.stringify(link)}`
  })
  return entries.length > 0 ? `links:{${entries.join(',')}}` : undefined
}

const responseDefinitionExpr = (res: Responses, components: Components): string => {
  if (typeof res.$ref === 'string') return `{$ref:${JSON.stringify(res.$ref)}}`
  const description = `description:${JSON.stringify(res.description ?? '')}`
  const headers = headersPropExpr(res.headers, components)
  const links = linksPropExpr(res.links, components)
  const content = (() => {
    if (!res.content) return undefined
    const contentEntries = Object.entries(res.content).map(([contentType, media]) => {
      return `${JSON.stringify(contentType)}:${mediaTypeExpr(media)}`
    })
    return contentEntries.length > 0 ? `content:{${contentEntries.join(',')}}` : undefined
  })()

  return `{${[description, headers, links, content].filter(Boolean).join(',')}}`
}

const buildImportSchemas = (code: string): readonly string[] => {
  return findSchema(code).filter((t) => !t.endsWith('HeaderSchema'))
}

/**
 * Generates `components.responses` constants (objects containing Zod schemas).
 */
export async function responses(
  components: Components,
  output: string | `${string}.ts`,
  split?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const { responses } = components
  if (!responses) return { ok: false, error: 'No responses found' }

  const makeOne = (key: string): { name: string; code: string } => {
    const res = responses[key]
    const expr = res ? responseDefinitionExpr(res, components) : '{}'
    const name = toIdentifierPascalCase(ensureSuffix(key, 'Response'))
    return { name, code: `export const ${name} = ${expr}` }
  }

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    for (const key of Object.keys(responses)) {
      const one = makeOne(key)
      const filePath = path.join(outDir, `${lowerFirst(one.name)}.ts`)
      const importZ = one.code.includes('z.') ? `import { z } from '@hono/zod-openapi'` : ''
      const schemaTokens = buildImportSchemas(one.code)
      const importSchemas =
        schemaTokens.length > 0 ? renderNamedImport(schemaTokens, '../schemas') : ''
      const fileCode = [importZ, importSchemas, '\n', one.code, ''].filter(Boolean).join('\n')

      const coreResult = await core(fileCode, path.dirname(filePath), filePath)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
    }

    const indexBody = `${Object.keys(responses)
      .map(
        (n) =>
          `export * from './${lowerFirst(toIdentifierPascalCase(ensureSuffix(n, 'Response')))}'`,
      )
      .join('\n')}\n`

    const coreResult = await core(
      indexBody,
      path.dirname(path.join(outDir, 'index.ts')),
      path.join(outDir, 'index.ts'),
    )
    if (!coreResult.ok) return { ok: false, error: coreResult.error }

    return {
      ok: true,
      value: `Generated responses code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const defs = Object.keys(responses)
    .map((key) => {
      const res = responses[key]
      const expr = res ? responseDefinitionExpr(res, components) : '{}'
      return `export const ${toIdentifierPascalCase(ensureSuffix(key, 'Response'))} = ${expr}`
    })
    .join('\n\n')

  const outFile = String(output)
  const importZ = defs.includes('z.') ? `import { z } from '@hono/zod-openapi'` : ''
  const schemaTokens = buildImportSchemas(defs)
  const importSchemas = schemaTokens.length > 0 ? renderNamedImport(schemaTokens, './schemas') : ''
  const fileCode = [importZ, importSchemas, '\n', defs, ''].filter(Boolean).join('\n')

  const coreResult = await core(fileCode, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated responses code written to ${outFile}` }
}
