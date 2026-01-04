import path from 'node:path'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { makeBarell } from '../helper/barell.js'
import { makeFileCode } from '../helper/code.js'
import { core } from '../helper/core.js'
import { makeContent, makeLinkOrReference, makeRef } from '../helper/index.js'
import type { Components, Header, Reference, Responses } from '../openapi/index.js'
import {
  ensureSuffix,
  lowerFirst,
  renderNamedImport,
  toIdentifierPascalCase,
} from '../utils/index.js'

/**
 * Finds tokens with a specific suffix pattern in code.
 */
const findTokensBySuffix = (code: string, suffix: string): readonly string[] => {
  const pattern = new RegExp(`\\b([A-Za-z_$][A-Za-z0-9_$]*${suffix})\\b`, 'g')
  return Array.from(
    new Set(
      Array.from(code.matchAll(pattern))
        .map((m) => m[1] ?? '')
        .filter(Boolean),
    ),
  )
}

/**
 * Makes import lines for examples and links.
 */
const makeExtraImports = (code: string, prefix: string): string => {
  const examples = findTokensBySuffix(code, 'Example')
  const links = findTokensBySuffix(code, 'Link')
  const importExamples =
    examples.length > 0 ? renderNamedImport(examples, `${prefix}/examples`) : ''
  const importLinks = links.length > 0 ? renderNamedImport(links, `${prefix}/links`) : ''
  return [importExamples, importLinks].filter(Boolean).join('\n')
}

/**
 * Build a single header schema code from Header or Reference.
 */
function makeHeaderSchema(header: Header | Reference): string {
  if ('$ref' in header && header.$ref) {
    return makeRef(header.$ref)
  }
  if ('schema' in header && header.schema) {
    return zodToOpenAPI(header.schema, { headers: header })
  }
  return 'z.any()'
}

/**
 * Build headers as z.object({...}) from multiple headers.
 */
function makeResponseHeaders(headers: { readonly [k: string]: Header | Reference }): string {
  const entries = Object.entries(headers)
  if (entries.length === 0) return ''
  const result = entries
    .map(([key, header]) => `${JSON.stringify(key)}:${makeHeaderSchema(header)}`)
    .join(',')
  return `z.object({${result}})`
}

/**
 * Build a response object code using openapi.ts functions.
 */
function buildResponse(res: Responses): string {
  if (res.$ref) {
    return makeRef(res.$ref)
  }

  const headersCode =
    res.headers && Object.keys(res.headers).length > 0
      ? `headers:${makeResponseHeaders(res.headers)}`
      : undefined

  const result = [
    res.summary ? `summary:${JSON.stringify(res.summary)}` : undefined,
    res.description ? `description:${JSON.stringify(res.description)}` : undefined,
    headersCode,
    res.content ? `content:{${makeContent(res.content)}}` : undefined,
    res.links
      ? `links:{${Object.entries(res.links)
          .map(([key, link]) =>
            '$ref' in link && link.$ref
              ? `${JSON.stringify(key)}:${makeRef(link.$ref)}`
              : `${JSON.stringify(key)}:${makeLinkOrReference(link)}`,
          )
          .join(',')}}`
      : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
  return `{${result}}`
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
    const expr = res ? buildResponse(res) : '{}'
    const name = toIdentifierPascalCase(ensureSuffix(key, 'Response'))
    return { name, code: `export const ${name} = ${expr}` }
  }

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    for (const key of Object.keys(responses)) {
      const one = makeOne(key)
      const filePath = path.join(outDir, `${lowerFirst(key)}.ts`)
      const baseCode = makeFileCode(one.code, '../schemas', 'HeaderSchema')
      const extraImports = makeExtraImports(one.code, '..')
      const fileCode = extraImports
        ? `${baseCode.split('\n')[0]}\n${extraImports}\n${baseCode.split('\n').slice(1).join('\n')}`
        : baseCode
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
      const expr = res ? buildResponse(res) : '{}'
      return `export const ${toIdentifierPascalCase(ensureSuffix(key, 'Response'))} = ${expr}`
    })
    .join('\n\n')

  const outFile = String(output)
  const baseCode = makeFileCode(defs, './schemas', 'HeaderSchema')
  const extraImports = makeExtraImports(defs, '.')
  const fileCode = extraImports
    ? `${baseCode.split('\n')[0]}\n${extraImports}\n${baseCode.split('\n').slice(1).join('\n')}`
    : baseCode
  const coreResult = await core(fileCode, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated responses code written to ${outFile}` }
}
