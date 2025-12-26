import path from 'node:path'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { core } from '../helper/core.js'
import { examplesPropExpr } from '../helper/examples.js'
import { moduleSpecFrom } from '../helper/module-spec-from.js'
import type { Components, Content, RequestBody, Schema } from '../openapi/index.js'
import { parseOpenAPI } from '../openapi/index.js'
import {
  ensureSuffix,
  findSchema,
  isRecord,
  lowerFirst,
  renderNamedImport,
  toIdentifier,
} from '../utils/index.js'

const isSchema = (v: unknown): v is Schema => isRecord(v)
const isMedia = (v: unknown): v is Content[string] => isRecord(v) && isSchema(v.schema)

const replaceSuffix = (name: string, fromSuffix: string, toSuffix: string): string =>
  name.endsWith(fromSuffix)
    ? `${name.slice(0, -fromSuffix.length)}${toSuffix}`
    : `${name}${toSuffix}`

const requestBodyConstName = (key: string): string =>
  toIdentifier(replaceSuffix(key, 'Body', 'RequestBody'))

const coerceDateIfNeeded = (schemaExpr: string): string =>
  schemaExpr.includes('z.date()') ? `z.coerce.${schemaExpr.replace('z.', '')}` : schemaExpr

type Imports = {
  readonly schemas?: {
    readonly output: string | `${string}.ts`
    readonly split?: boolean
    readonly import?: string
  }
  readonly examples?: {
    readonly output: string | `${string}.ts`
    readonly split?: boolean
    readonly import?: string
  }
}

const mediaTypeExpr = (
  media: unknown,
  components: Components,
  usedExampleKeys: Set<string>,
  imports: Imports | undefined,
): string => {
  if (!isMedia(media)) return '{schema:z.any()}'
  const schema = coerceDateIfNeeded(zodToOpenAPI(media.schema))
  const examples = examplesPropExpr(media.examples, components, usedExampleKeys, imports)
  return `{${[`schema:${schema}`, examples].filter(Boolean).join(',')}}`
}

const requestBodyExpr = (
  body: RequestBody,
  components: Components,
  usedExampleKeys: Set<string>,
  imports: Imports | undefined,
): string => {
  const required = body.required ?? false
  const description =
    body.description !== undefined ? `description:${JSON.stringify(body.description)}` : undefined
  const content = body.content
  if (!content) {
    return `{${[description, `required:${required}`].filter(Boolean).join(',')}}`
  }

  const contentEntries = Object.entries(content).map(([contentType, media]) => {
    return `${JSON.stringify(contentType)}:${mediaTypeExpr(media, components, usedExampleKeys, imports)}`
  })
  const contentExpr = `content:{${contentEntries.join(',')}}`
  return `{${[description, `required:${required}`, contentExpr].filter(Boolean).join(',')}}`
}

const buildImportSchemas = (
  fromFile: string,
  code: string,
  locals: ReadonlySet<string>,
  imports: Imports | undefined,
): string => {
  const target = imports?.schemas
  if (!target) return ''
  const tokens = findSchema(code).filter((t) => !locals.has(t))
  if (tokens.length === 0) return ''
  const spec = target.import ?? moduleSpecFrom(fromFile, target)
  return renderNamedImport(tokens, spec)
}

const buildImportExamples = (
  fromFile: string,
  usedExampleKeys: ReadonlySet<string>,
  imports: Imports | undefined,
): string => {
  const target = imports?.examples
  if (!target) return ''
  const names = Array.from(usedExampleKeys)
    .sort()
    .map((k) => toIdentifier(ensureSuffix(k, 'Example')))
  if (names.length === 0) return ''
  const spec = target.import ?? moduleSpecFrom(fromFile, target)
  return renderNamedImport(names, spec)
}

/**
 * Generates `components.requestBodies` constants (objects containing Zod schemas).
 */
export async function requestBodies(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: string | `${string}.ts`,
  split?: boolean,
  imports?: Imports,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
  const openAPI = openAPIResult.value

  const bodies = openAPI.components?.requestBodies
  if (!bodies || Object.keys(bodies).length === 0)
    return { ok: false, error: 'No requestBodies found' }

  const components = openAPI.components ?? {}

  const makeOne = (key: string): { name: string; code: string; usedExampleKeys: Set<string> } => {
    const usedExampleKeys = new Set<string>()
    const body = bodies[key]
    const expr = body ? requestBodyExpr(body, components, usedExampleKeys, imports) : '{}'
    const name = requestBodyConstName(key)
    return { name, usedExampleKeys, code: `export const ${name} = ${expr}` }
  }

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    for (const key of Object.keys(bodies)) {
      const one = makeOne(key)
      const filePath = path.join(outDir, `${lowerFirst(one.name)}.ts`)
      const importZ = one.code.includes('z.') ? `import { z } from '@hono/zod-openapi'` : ''
      const importSchemas = buildImportSchemas(filePath, one.code, new Set(), imports)
      const importExamples = buildImportExamples(filePath, one.usedExampleKeys, imports)
      const fileCode = [importZ, importSchemas, importExamples, '\n', one.code, '']
        .filter(Boolean)
        .join('\n')

      const coreResult = await core(fileCode, path.dirname(filePath), filePath)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
    }

    const indexBody = `${Object.keys(bodies)
      .map((n) => `export * from './${lowerFirst(requestBodyConstName(n))}'`)
      .join('\n')}\n`

    const coreResult = await core(
      indexBody,
      path.dirname(path.join(outDir, 'index.ts')),
      path.join(outDir, 'index.ts'),
    )
    if (!coreResult.ok) return { ok: false, error: coreResult.error }

    return {
      ok: true,
      value: `Generated requestBodies code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const usedExampleKeys = new Set<string>()
  const defs = Object.keys(bodies)
    .map((key) => {
      const body = bodies[key]
      const expr = body ? requestBodyExpr(body, components, usedExampleKeys, imports) : '{}'
      return `export const ${requestBodyConstName(key)} = ${expr}`
    })
    .join('\n\n')

  const outFile = String(output)
  const importZ = defs.includes('z.') ? `import { z } from '@hono/zod-openapi'` : ''
  const importSchemas = buildImportSchemas(outFile, defs, new Set(), imports)
  const importExamples = buildImportExamples(outFile, usedExampleKeys, imports)
  const fileCode = [importZ, importSchemas, importExamples, '\n', defs, '']
    .filter(Boolean)
    .join('\n')

  const coreResult = await core(fileCode, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated requestBodies code written to ${outFile}` }
}
