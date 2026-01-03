import path from 'node:path'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { barell } from '../helper/barell.js'
import { core } from '../helper/core.js'
import { makeExamples } from '../helper/openapi.js'
import type { Content, OpenAPI, RequestBody } from '../openapi/index.js'
import {
  ensureSuffix,
  findSchema,
  isRecord,
  lowerFirst,
  renderNamedImport,
  toIdentifierPascalCase,
} from '../utils/index.js'

const isMedia = (v: unknown): v is Content[string] =>
  isRecord(v) && 'schema' in v && isRecord(v.schema)

const coerceDateIfNeeded = (schemaExpr: string): string =>
  schemaExpr.includes('z.date()') ? `z.coerce.${schemaExpr.replace('z.', '')}` : schemaExpr

const mediaTypeExpr = (media: unknown): string => {
  if (!isMedia(media)) return '{schema:z.any()}'
  const schema = coerceDateIfNeeded(zodToOpenAPI(media.schema))
  const examples = media.examples ? makeExamples(media.examples) : undefined
  const examplesProp = examples ? `examples:${examples}` : undefined
  return `{${[`schema:${schema}`, examplesProp].filter(Boolean).join(',')}}`
}

const requestBodyExpr = (body: RequestBody): string => {
  const required = body.required ?? false
  const description =
    body.description !== undefined ? `description:${JSON.stringify(body.description)}` : undefined
  const content = body.content
  if (!content) {
    return `{${[description, `required:${required}`].filter(Boolean).join(',')}}`
  }

  const contentEntries = Object.entries(content).map(([contentType, media]) => {
    return `${JSON.stringify(contentType)}:${mediaTypeExpr(media)}`
  })
  const contentExpr = `content:{${contentEntries.join(',')}}`
  return `{${[description, `required:${required}`, contentExpr].filter(Boolean).join(',')}}`
}

const buildImportSchemas = (code: string): readonly string[] => {
  return findSchema(code)
}

/**
 * Generates `components.requestBodies` constants (objects containing Zod schemas).
 */
export async function requestBodies(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  split?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const bodies = openAPI.components?.requestBodies
  if (!bodies || Object.keys(bodies).length === 0)
    return { ok: false, error: 'No requestBodies found' }

  const makeOne = (key: string): { name: string; code: string } => {
    const body = bodies[key]
    const expr = body ? requestBodyExpr(body) : '{}'
    const name = toIdentifierPascalCase(ensureSuffix(key, 'RequestBody'))
    return { name, code: `export const ${name} = ${expr}` }
  }

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    for (const key of Object.keys(bodies)) {
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
      barell(bodies),
      path.dirname(path.join(outDir, 'index.ts')),
      path.join(outDir, 'index.ts'),
    )
    if (!coreResult.ok) return { ok: false, error: coreResult.error }

    return {
      ok: true,
      value: `Generated requestBodies code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const defs = Object.keys(bodies)
    .map((key) => {
      const body = bodies[key]
      const expr = body ? requestBodyExpr(body) : '{}'
      return `export const ${toIdentifierPascalCase(ensureSuffix(key, 'RequestBody'))} = ${expr}`
    })
    .join('\n\n')

  const outFile = String(output)
  const importZ = defs.includes('z.') ? `import { z } from '@hono/zod-openapi'` : ''
  const schemaTokens = buildImportSchemas(defs)
  const importSchemas = schemaTokens.length > 0 ? renderNamedImport(schemaTokens, './schemas') : ''
  const fileCode = [importZ, importSchemas, '\n', defs, ''].filter(Boolean).join('\n')

  const coreResult = await core(fileCode, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated requestBodies code written to ${outFile}` }
}
