import path from 'node:path'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { barell } from '../helper/barell.js'
import { core } from '../helper/core.js'
import { makeRef } from '../helper/index.js'
import type { Components, Content, Header, Reference, Responses } from '../openapi/index.js'
import {
  buildExamples,
  ensureSuffix,
  findSchema,
  isRecord,
  lowerFirst,
  renderNamedImport,
  toIdentifierPascalCase,
} from '../utils/index.js'

const isRef = (v: unknown): v is Reference & { $ref: string } =>
  isRecord(v) && typeof v.$ref === 'string'

const isHeader = (v: unknown): v is Header => isRecord(v) && !('$ref' in v)

const headerSchemaExpr = (header: Header | Reference): string => {
  if (!isHeader(header)) return 'z.any()'
  return zodToOpenAPI(header.schema ?? {}, { headers: header })
}

const resolveHeader = (header: Header | Reference, components: Components): Header | Reference => {
  if (!(isRef(header) && header.$ref.startsWith('#/components/headers/'))) return header
  const key = header.$ref.slice('#/components/headers/'.length)
  if (!key) return header
  return components.headers?.[key] ?? header
}

const headersPropExpr = (
  headers: Responses['headers'] | undefined,
  components: Components,
): string | undefined => {
  if (!headers) return undefined
  const entries = Object.entries(headers).map(([name, header]) => {
    const resolved = resolveHeader(header, components)
    return `${JSON.stringify(name)}:${headerSchemaExpr(resolved)}`
  })
  return entries.length > 0 ? `headers:z.object({${entries.join(',')}})` : undefined
}

const mediaTypeExpr = (media: Content[string]): string => {
  const schema = zodToOpenAPI(media.schema)
  const examples = buildExamples(media.examples)
  const examplesProp = examples ? `examples:${examples}` : undefined
  return `{${[`schema:${schema}`, examplesProp].filter(Boolean).join(',')}}`
}

const linkEntryExpr = (
  name: string,
  link: Responses['links'] extends Record<string, infer V> | undefined ? V : never,
  components: Components,
): string => {
  const key = JSON.stringify(name)
  if (!(isRef(link) && link.$ref.startsWith('#/components/links/'))) {
    return `${key}:${JSON.stringify(link)}`
  }
  const refKey = link.$ref.slice('#/components/links/'.length)
  const resolved = refKey ? components.links?.[refKey] : undefined
  return resolved
    ? `${key}:${makeRef(link.$ref as `#/components/${string}/${string}`)}`
    : `${key}:{$ref:${JSON.stringify(link.$ref)}}`
}

const linksPropExpr = (
  links: Responses['links'] | undefined,
  components: Components,
): string | undefined => {
  if (!links) return undefined
  const entries = Object.entries(links).map(([name, link]) => linkEntryExpr(name, link, components))
  return entries.length > 0 ? `links:{${entries.join(',')}}` : undefined
}

const contentPropExpr = (content: Responses['content'] | undefined): string | undefined => {
  if (!content) return undefined
  const entries = Object.entries(content).map(
    ([contentType, media]) => `${JSON.stringify(contentType)}:${mediaTypeExpr(media)}`,
  )
  return entries.length > 0 ? `content:{${entries.join(',')}}` : undefined
}

const responseDefinitionExpr = (res: Responses, components: Components): string => {
  if (typeof res.$ref === 'string') return `{$ref:${JSON.stringify(res.$ref)}}`
  const props = [
    `description:${JSON.stringify(res.description ?? '')}`,
    headersPropExpr(res.headers, components),
    linksPropExpr(res.links, components),
    contentPropExpr(res.content),
  ].filter(Boolean)
  return `{${props.join(',')}}`
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
    const name = key
    return { name, code: `export const ${name} = ${expr}` }
  }

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    for (const key of Object.keys(responses)) {
      const one = makeOne(key)
      const filePath = path.join(outDir, `${lowerFirst(key)}.ts`)
      const importZ = one.code.includes('z.') ? `import { z } from '@hono/zod-openapi'` : ''
      const schemaTokens = buildImportSchemas(one.code)
      const importSchemas =
        schemaTokens.length > 0 ? renderNamedImport(schemaTokens, '../schemas') : ''
      const fileCode = [importZ, importSchemas, '\n', one.code, ''].filter(Boolean).join('\n')

      const coreResult = await core(fileCode, path.dirname(filePath), filePath)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
    }

    const coreResult = await core(
      barell(responses),
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
