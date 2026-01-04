import path from 'node:path'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { makeBarell } from '../helper/barell.js'
import { buildFileCode } from '../helper/code.js'
import { core } from '../helper/core.js'
import { makeContent, makeRef } from '../helper/index.js'
import type { Components, Header, Reference, Responses } from '../openapi/index.js'
import { ensureSuffix, isRecord, lowerFirst, toIdentifierPascalCase } from '../utils/index.js'

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

const linksPropExpr = (
  links: Responses['links'] | undefined,
  components: Components,
): string | undefined => {
  if (!links) return undefined
  const entries = Object.entries(links).map(([name, link]) => {
    const key = JSON.stringify(name)
    if (!(isRef(link) && link.$ref.startsWith('#/components/links/'))) {
      return `${key}:${JSON.stringify(link)}`
    }
    const refKey = link.$ref.slice('#/components/links/'.length)
    const resolved = refKey ? components.links?.[refKey] : undefined
    return resolved
      ? `${key}:${makeRef(link.$ref as `#/components/${string}/${string}`)}`
      : `${key}:{$ref:${JSON.stringify(link.$ref)}}`
  })
  return entries.length > 0 ? `links:{${entries.join(',')}}` : undefined
}

const responseDefinitionExpr = (res: Responses, components: Components): string => {
  if (typeof res.$ref === 'string') return `{$ref:${JSON.stringify(res.$ref)}}`
  const contentExpr = res.content ? `content:{${makeContent(res.content).join(',')}}` : undefined
  const props = [
    `description:${JSON.stringify(res.description ?? '')}`,
    headersPropExpr(res.headers, components),
    linksPropExpr(res.links, components),
    contentExpr,
  ].filter(Boolean)
  return `{${props.join(',')}}`
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
      const fileCode = buildFileCode(one.code, '../schemas', 'HeaderSchema')
      const coreResult = await core(fileCode, path.dirname(filePath), filePath)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
    }

    const coreResult = await core(
      makeBarell(responses),
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
  const fileCode = buildFileCode(defs, './schemas', 'HeaderSchema')
  const coreResult = await core(fileCode, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated responses code written to ${outFile}` }
}
