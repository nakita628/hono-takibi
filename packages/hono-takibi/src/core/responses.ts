import path from 'node:path'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { core } from '../helper/core.js'
import { moduleSpecFrom } from '../helper/module-spec-from.js'
import type { Components, Content, ResponseDefinition, Schema } from '../openapi/index.js'
import { parseOpenAPI } from '../openapi/index.js'
import { ensureSuffix, findSchema, lowerFirst, toIdentifier } from '../utils/index.js'

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null
const isRef = (v: unknown): v is { $ref: string } => isRecord(v) && typeof v.$ref === 'string'
const isSchema = (v: unknown): v is Schema => isRecord(v)

function withSuffix(name: string, suffix: string): string {
  return name.endsWith(suffix) ? name : `${name}${suffix}`
}

const responseConstName = (key: string): string => toIdentifier(withSuffix(key, 'Response'))

const headerConstName = (key: string): string => {
  const base = key.endsWith('HeaderSchema')
    ? key
    : key.endsWith('Header')
      ? `${key}Schema`
      : `${key}HeaderSchema`
  return toIdentifier(base)
}

const linkConstName = (key: string): string => toIdentifier(withSuffix(key, 'Link'))

const resolveComponentKey = ($ref: string, prefix: string): string | undefined => {
  if (!$ref.startsWith(prefix)) return undefined
  const key = $ref.slice(prefix.length)
  return key ? key : undefined
}

type OutputTarget = {
  readonly output: string | `${string}.ts`
  readonly split?: boolean
  readonly import?: string
}
type Imports = {
  readonly schemas?: OutputTarget
  readonly headers?: OutputTarget
  readonly examples?: OutputTarget
  readonly links?: OutputTarget
}

type ExampleFields = {
  readonly summary?: unknown
  readonly description?: unknown
  readonly value?: unknown
}

const inlineExampleExpr = (example: ExampleFields): string => {
  const fields = [
    example.summary !== undefined ? `summary:${JSON.stringify(example.summary)}` : undefined,
    example.description !== undefined
      ? `description:${JSON.stringify(example.description)}`
      : undefined,
    example.value !== undefined ? `value:${JSON.stringify(example.value)}` : undefined,
  ].filter((v) => v !== undefined)
  return `{${fields.join(',')}}`
}

const shouldOptionalHeader = (header: unknown): boolean => {
  if (!isRecord(header)) return true
  if (header.required === true) return false
  const rawSchema = header.schema
  const schemaDefault = isSchema(rawSchema) ? rawSchema.default : undefined
  return schemaDefault === undefined
}

const headerSchemaExpr = (header: unknown): string => {
  if (!isRecord(header)) return 'z.any()'
  const rawSchema = header.schema
  const schema = isSchema(rawSchema) ? rawSchema : {}
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
  headers: ResponseDefinition['headers'] | undefined,
  components: Components,
  usedHeaderKeys: Set<string>,
  imports: Imports | undefined,
): string | undefined => {
  if (!headers) return undefined
  const entries = Object.entries(headers).map(([name, header]) => {
    if (isRef(header) && header.$ref.startsWith('#/components/headers/')) {
      const key = resolveComponentKey(header.$ref, '#/components/headers/')
      const resolved = key ? components.headers?.[key] : undefined
      if (key && resolved && imports?.headers) {
        usedHeaderKeys.add(key)
        const base = headerConstName(key)
        const expr = shouldOptionalHeader(resolved) ? `${base}.optional()` : base
        return `${JSON.stringify(name)}:${expr}`
      }
      const base = headerSchemaExpr(resolved ?? header)
      const expr = shouldOptionalHeader(resolved ?? header) ? `${base}.optional()` : base
      return `${JSON.stringify(name)}:${expr}`
    }
    const base = headerSchemaExpr(header)
    const expr = shouldOptionalHeader(header) ? `${base}.optional()` : base
    return `${JSON.stringify(name)}:${expr}`
  })

  return entries.length > 0 ? `headers:z.object({${entries.join(',')}})` : undefined
}

const exampleExpr = (
  example: unknown,
  components: Components,
  usedExampleKeys: Set<string>,
  imports: Imports | undefined,
): string => {
  if (isRef(example) && example.$ref.startsWith('#/components/examples/')) {
    const key = resolveComponentKey(example.$ref, '#/components/examples/')
    const resolved = key ? components.examples?.[key] : undefined
    if (key && resolved) {
      if (imports?.examples) {
        usedExampleKeys.add(key)
        return toIdentifier(ensureSuffix(key, 'Example'))
      }
      return inlineExampleExpr(resolved)
    }
    return `{$ref:${JSON.stringify(example.$ref)}}`
  }
  if (isRecord(example)) return inlineExampleExpr(example)
  return JSON.stringify(example)
}

const examplesPropExpr = (
  examples: Content[string]['examples'] | undefined,
  components: Components,
  usedExampleKeys: Set<string>,
  imports: Imports | undefined,
): string | undefined => {
  if (!(examples && Object.keys(examples).length > 0)) return undefined
  const entries = Object.entries(examples).map(([exampleKey, example]) => {
    return `${JSON.stringify(exampleKey)}:${exampleExpr(example, components, usedExampleKeys, imports)}`
  })
  return entries.length > 0 ? `examples:{${entries.join(',')}}` : undefined
}

const mediaTypeExpr = (
  media: Content[string],
  components: Components,
  usedExampleKeys: Set<string>,
  imports: Imports | undefined,
): string => {
  const schema = zodToOpenAPI(media.schema)
  const examples = examplesPropExpr(media.examples, components, usedExampleKeys, imports)
  return `{${[`schema:${schema}`, examples].filter(Boolean).join(',')}}`
}

const linksPropExpr = (
  links: ResponseDefinition['links'] | undefined,
  components: Components,
  usedLinkKeys: Set<string>,
  imports: Imports | undefined,
): string | undefined => {
  if (!links) return undefined
  const entries = Object.entries(links).map(([name, link]) => {
    if (isRef(link) && link.$ref.startsWith('#/components/links/')) {
      const key = resolveComponentKey(link.$ref, '#/components/links/')
      const resolved = key ? components.links?.[key] : undefined
      if (key && resolved && imports?.links) {
        usedLinkKeys.add(key)
        return `${JSON.stringify(name)}:${linkConstName(key)}`
      }
      if (key && resolved) return `${JSON.stringify(name)}:${JSON.stringify(resolved)}`
      return `${JSON.stringify(name)}:{$ref:${JSON.stringify(link.$ref)}}`
    }
    return `${JSON.stringify(name)}:${JSON.stringify(link)}`
  })
  return entries.length > 0 ? `links:{${entries.join(',')}}` : undefined
}

const responseDefinitionExpr = (
  res: ResponseDefinition,
  components: Components,
  usedHeaderKeys: Set<string>,
  usedExampleKeys: Set<string>,
  usedLinkKeys: Set<string>,
  imports: Imports | undefined,
): string => {
  if (typeof res.$ref === 'string') return `{$ref:${JSON.stringify(res.$ref)}}`
  const description = `description:${JSON.stringify(res.description ?? '')}`
  const headers = headersPropExpr(res.headers, components, usedHeaderKeys, imports)
  const links = linksPropExpr(res.links, components, usedLinkKeys, imports)
  const content = (() => {
    if (!res.content) return undefined
    const contentEntries = Object.entries(res.content).map(([contentType, media]) => {
      return `${JSON.stringify(contentType)}:${mediaTypeExpr(media, components, usedExampleKeys, imports)}`
    })
    return contentEntries.length > 0 ? `content:{${contentEntries.join(',')}}` : undefined
  })()

  return `{${[description, headers, links, content].filter(Boolean).join(',')}}`
}

const buildImportSchemas = (
  fromFile: string,
  code: string,
  imports: Imports | undefined,
): string => {
  const target = imports?.schemas
  if (!target) return ''
  const tokens = findSchema(code).filter((t) => !t.endsWith('HeaderSchema'))
  if (tokens.length === 0) return ''
  const spec = target.import ?? moduleSpecFrom(fromFile, target)
  return `import { ${tokens.join(',')} } from '${spec}'`
}

const buildImportHeaders = (
  fromFile: string,
  usedHeaderKeys: ReadonlySet<string>,
  imports: Imports | undefined,
): string => {
  const target = imports?.headers
  if (!target) return ''
  const names = Array.from(usedHeaderKeys)
    .sort()
    .map((k) => headerConstName(k))
  if (names.length === 0) return ''
  const spec = target.import ?? moduleSpecFrom(fromFile, target)
  return `import { ${names.join(',')} } from '${spec}'`
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
  return `import { ${names.join(',')} } from '${spec}'`
}

const buildImportLinks = (
  fromFile: string,
  usedLinkKeys: ReadonlySet<string>,
  imports: Imports | undefined,
): string => {
  const target = imports?.links
  if (!target) return ''
  const names = Array.from(usedLinkKeys)
    .sort()
    .map((k) => linkConstName(k))
  if (names.length === 0) return ''
  const spec = target.import ?? moduleSpecFrom(fromFile, target)
  return `import { ${names.join(',')} } from '${spec}'`
}

/**
 * Generates `components.responses` constants (objects containing Zod schemas).
 */
export async function responses(
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

  const rs = openAPI.components?.responses
  if (!rs || Object.keys(rs).length === 0) return { ok: false, error: 'No responses found' }

  const components = openAPI.components ?? {}

  const makeOne = (
    key: string,
  ): {
    name: string
    usedHeaderKeys: Set<string>
    usedExampleKeys: Set<string>
    usedLinkKeys: Set<string>
    code: string
  } => {
    const usedHeaderKeys = new Set<string>()
    const usedExampleKeys = new Set<string>()
    const usedLinkKeys = new Set<string>()
    const res = rs[key]
    const expr = res
      ? responseDefinitionExpr(
          res,
          components,
          usedHeaderKeys,
          usedExampleKeys,
          usedLinkKeys,
          imports,
        )
      : '{}'
    const name = responseConstName(key)
    return {
      name,
      usedHeaderKeys,
      usedExampleKeys,
      usedLinkKeys,
      code: `export const ${name} = ${expr}`,
    }
  }

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    for (const key of Object.keys(rs).sort()) {
      const one = makeOne(key)
      const filePath = path.join(outDir, `${lowerFirst(one.name)}.ts`)
      const importZ = one.code.includes('z.') ? `import { z } from '@hono/zod-openapi'` : ''
      const importSchemas = buildImportSchemas(filePath, one.code, imports)
      const importHeaders = buildImportHeaders(filePath, one.usedHeaderKeys, imports)
      const importExamples = buildImportExamples(filePath, one.usedExampleKeys, imports)
      const importLinks = buildImportLinks(filePath, one.usedLinkKeys, imports)
      const fileCode = [
        importZ,
        importSchemas,
        importHeaders,
        importExamples,
        importLinks,
        '\n',
        one.code,
        '',
      ]
        .filter(Boolean)
        .join('\n')

      const coreResult = await core(fileCode, path.dirname(filePath), filePath)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
    }

    const indexBody = `${Object.keys(rs)
      .sort()
      .map((n) => `export * from './${lowerFirst(responseConstName(n))}'`)
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

  const usedHeaderKeys = new Set<string>()
  const usedExampleKeys = new Set<string>()
  const usedLinkKeys = new Set<string>()
  const defs = Object.keys(rs)
    .sort()
    .map((key) => {
      const res = rs[key]
      const expr = res
        ? responseDefinitionExpr(
            res,
            components,
            usedHeaderKeys,
            usedExampleKeys,
            usedLinkKeys,
            imports,
          )
        : '{}'
      return `export const ${responseConstName(key)} = ${expr}`
    })
    .join('\n\n')

  const outFile = String(output)
  const importZ = defs.includes('z.') ? `import { z } from '@hono/zod-openapi'` : ''
  const importSchemas = buildImportSchemas(outFile, defs, imports)
  const importHeaders = buildImportHeaders(outFile, usedHeaderKeys, imports)
  const importExamples = buildImportExamples(outFile, usedExampleKeys, imports)
  const importLinks = buildImportLinks(outFile, usedLinkKeys, imports)
  const fileCode = [
    importZ,
    importSchemas,
    importHeaders,
    importExamples,
    importLinks,
    '\n',
    defs,
    '',
  ]
    .filter(Boolean)
    .join('\n')

  const coreResult = await core(fileCode, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated responses code written to ${outFile}` }
}
