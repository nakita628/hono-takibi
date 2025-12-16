import { resolveSchemasDependencies } from '../../../../helper/resolve-schemas-dependencies.js'
import { zodToOpenAPISchema } from '../../../../helper/zod-to-openapi-schema.js'
import type {
  Components,
  Content,
  RequestBody,
  ResponseDefinition,
  Schema,
} from '../../../../openapi/index.js'
import { sanitizeIdentifier } from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null
const isRef = (v: unknown): v is { $ref: string } => isRecord(v) && typeof v.$ref === 'string'
const isSchema = (v: unknown): v is Schema => isRecord(v)

const jsonExpr = (value: unknown): string => JSON.stringify(value) ?? 'undefined'

const toIdentifier = (raw: string): string => {
  const sanitized = sanitizeIdentifier(raw)
  return /^[A-Za-z_$]/.test(sanitized) ? sanitized : `_${sanitized}`
}

const withSuffix = (name: string, suffix: string): string =>
  name.endsWith(suffix) ? name : `${name}${suffix}`

const replaceSuffix = (name: string, fromSuffix: string, toSuffix: string): string =>
  name.endsWith(fromSuffix)
    ? `${name.slice(0, -fromSuffix.length)}${toSuffix}`
    : `${name}${toSuffix}`

const declareConst = (name: string, expr: string, exportSchema: boolean): string =>
  `${exportSchema ? 'export const' : 'const'} ${name} = ${expr}`

const exampleConstName = (key: string): string => toIdentifier(withSuffix(key, 'Example'))
const headerConstName = (key: string): string => {
  const base = key.endsWith('HeaderSchema')
    ? key
    : key.endsWith('Header')
      ? `${key}Schema`
      : `${key}HeaderSchema`
  return toIdentifier(base)
}
const linkConstName = (key: string): string => toIdentifier(withSuffix(key, 'Link'))
const callbackConstName = (key: string): string => toIdentifier(withSuffix(key, 'Callback'))
const responseConstName = (key: string): string => toIdentifier(withSuffix(key, 'Response'))
const requestBodyConstName = (key: string): string =>
  toIdentifier(replaceSuffix(key, 'Body', 'RequestBody'))
const securitySchemeConstName = (key: string): string =>
  toIdentifier(withSuffix(key, 'SecurityScheme'))

const resolveComponentKey = ($ref: string, prefix: string): string | undefined => {
  if (!$ref.startsWith(prefix)) return undefined
  const key = $ref.slice(prefix.length)
  return key ? key : undefined
}

const inlineExampleExpr = (example: Record<string, unknown>): string => {
  const fields = [
    example.summary !== undefined ? `summary:${JSON.stringify(example.summary)}` : undefined,
    example.description !== undefined
      ? `description:${JSON.stringify(example.description)}`
      : undefined,
    example.value !== undefined ? `value:${JSON.stringify(example.value)}` : undefined,
  ].filter((v) => v !== undefined)
  return `{${fields.join(',')}}`
}

const exampleExpr = (
  example: unknown,
  componentExamples: Components['examples'] | undefined,
): string => {
  if (isRef(example)) {
    const key = resolveComponentKey(example.$ref, '#/components/examples/')
    const resolved = key && componentExamples ? componentExamples[key] : undefined
    if (key && resolved) return exampleConstName(key)
    return `{$ref:${JSON.stringify(example.$ref)}}`
  }
  if (isRecord(example)) return inlineExampleExpr(example)
  return JSON.stringify(example)
}

const examplesPropExpr = (
  examples: Content[string]['examples'] | undefined,
  componentExamples: Components['examples'] | undefined,
): string | undefined => {
  if (!(examples && Object.keys(examples).length > 0)) return undefined
  const entries = Object.entries(examples).map(([exampleKey, example]) => {
    return `${JSON.stringify(exampleKey)}:${exampleExpr(example, componentExamples)}`
  })
  return entries.length > 0 ? `examples:{${entries.join(',')}}` : undefined
}

const coerceDateIfNeeded = (schemaExpr: string): string =>
  schemaExpr.includes('z.date()') ? `z.coerce.${schemaExpr.replace('z.', '')}` : schemaExpr

const mediaTypeExpr = (
  media: Content[string],
  componentExamples: Components['examples'] | undefined,
  options?: { coerceDate?: boolean },
): string => {
  const schema = options?.coerceDate
    ? coerceDateIfNeeded(zodToOpenAPI(media.schema))
    : zodToOpenAPI(media.schema)
  const examples = examplesPropExpr(media.examples, componentExamples)
  return `{${[`schema:${schema}`, examples].filter(Boolean).join(',')}}`
}

const requestBodyExpr = (body: RequestBody, components: Components): string => {
  const required = body.required ?? false
  const description =
    body.description !== undefined ? `description:${JSON.stringify(body.description)}` : undefined
  const content = body.content
  if (!content) {
    return `{${[description, `required:${required}`].filter(Boolean).join(',')}}`
  }

  const contentEntries = Object.entries(content).map(([contentType, media]) => {
    return `${JSON.stringify(contentType)}:${mediaTypeExpr(media, components.examples, { coerceDate: true })}`
  })
  const contentExpr = `content:{${contentEntries.join(',')}}`
  return `{${[description, `required:${required}`, contentExpr].filter(Boolean).join(',')}}`
}

const headersPropExpr = (
  headers: ResponseDefinition['headers'] | undefined,
  components: Components,
): string | undefined => {
  if (!headers) return undefined

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

  const shouldOptional = (header: unknown): boolean => {
    if (!isRecord(header)) return true
    if (header.required === true) return false
    const rawSchema = header.schema
    const schemaDefault = isSchema(rawSchema) ? rawSchema.default : undefined
    return schemaDefault === undefined
  }

  const entries = Object.entries(headers).map(([name, header]) => {
    const schema =
      isRef(header) && header.$ref.startsWith('#/components/headers/')
        ? (() => {
            const key = resolveComponentKey(header.$ref, '#/components/headers/')
            const resolved = key ? components.headers?.[key] : undefined
            if (key && resolved) {
              const base = headerConstName(key)
              return shouldOptional(resolved) ? `${base}.optional()` : base
            }
            return 'z.any().optional()'
          })()
        : (() => {
            const base = headerSchemaExpr(header)
            return shouldOptional(header) ? `${base}.optional()` : base
          })()

    return `${JSON.stringify(name)}:${schema}`
  })

  return entries.length > 0 ? `headers:z.object({${entries.join(',')}})` : undefined
}

const linksPropExpr = (
  links: ResponseDefinition['links'] | undefined,
  components: Components,
): string | undefined => {
  if (!links) return undefined
  const entries = Object.entries(links).map(([name, link]) => {
    if (isRef(link)) {
      const key = resolveComponentKey(link.$ref, '#/components/links/')
      const resolved = key ? components.links?.[key] : undefined
      if (key && resolved) return `${JSON.stringify(name)}:${linkConstName(key)}`
      return `${JSON.stringify(name)}:{$ref:${JSON.stringify(link.$ref)}}`
    }
    return `${JSON.stringify(name)}:${JSON.stringify(link)}`
  })
  return entries.length > 0 ? `links:{${entries.join(',')}}` : undefined
}

const responseContentPropExpr = (
  content: ResponseDefinition['content'] | undefined,
  components: Components,
): string | undefined => {
  if (!content) return undefined
  const contentEntries = Object.entries(content).map(([contentType, media]) => {
    return `${JSON.stringify(contentType)}:${mediaTypeExpr(media, components.examples)}`
  })
  return contentEntries.length > 0 ? `content:{${contentEntries.join(',')}}` : undefined
}

const responseDefinitionExpr = (res: ResponseDefinition, components: Components): string => {
  const resolved =
    typeof res.$ref === 'string'
      ? (() => {
          const key = resolveComponentKey(res.$ref, '#/components/responses/')
          return key ? components.responses?.[key] : undefined
        })()
      : undefined

  const value = resolved ?? res
  const description = `description:${JSON.stringify(value.description ?? '')}`
  const headers = headersPropExpr(value.headers, components)
  const links = linksPropExpr(value.links, components)
  const content = responseContentPropExpr(value.content, components)
  return `{${[description, headers, links, content].filter(Boolean).join(',')}}`
}

/**
 * Converts OpenAPI component schemas to Zod-based TypeScript definitions.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchema - Whether to export the Zod schema variables.
 * @param exportType - Whether to export the inferred Zod types.
 * @returns A string of TypeScript code with Zod schema and type definitions, or an empty string if no schemas exist.
 *
 * @remarks
 * - Resolves schema dependency order to avoid reference errors.
 * - Skips generation if no schemas are defined.
 * - Uses `zodToOpenAPI` and `zodToOpenAPISchema` for code generation.
 */
export function componentsCode(
  components: Components,
  exportSchema: boolean,
  exportType: boolean,
): string {
  const out: string[] = []

  // schemas
  const { schemas } = components
  const orderedSchemas = schemas ? resolveSchemasDependencies(schemas) : []
  const schemaDefinitions = orderedSchemas
    .map((schemaName) => {
      const schema = schemas?.[schemaName]
      const z = schema ? zodToOpenAPI(schema) : ''
      return zodToOpenAPISchema(schemaName, z, exportSchema, exportType)
    })
    .join('\n\n')
  if (schemaDefinitions) out.push(schemaDefinitions)

  // parameters
  const { parameters } = components
  const parametersDefinitions = parameters
    ? Object.keys(parameters)
        .sort()
        .map((key) => {
          const parameter = parameters[key]
          const z = zodToOpenAPI(parameter.schema, parameter.name, parameter.in)
          return zodToOpenAPISchema(key, z, exportSchema, exportType, true)
        })
        .join('\n\n')
    : ''
  if (parametersDefinitions) out.push(parametersDefinitions)

  // examples
  const examplesDefinitions = components.examples
    ? Object.keys(components.examples)
        .sort()
        .map((key) =>
          declareConst(exampleConstName(key), jsonExpr(components.examples?.[key]), exportSchema),
        )
        .join('\n\n')
    : ''
  if (examplesDefinitions) out.push(examplesDefinitions)

  // headers
  const headersDefinitions = components.headers
    ? Object.keys(components.headers)
        .sort()
        .map((key) => {
          const header = components.headers?.[key]
          if (!header) return declareConst(headerConstName(key), 'z.any()', exportSchema)

          const schema: Schema = {
            ...(header.schema ?? {}),
            ...(header.description !== undefined &&
            typeof header.description === 'string' &&
            header.schema?.description === undefined
              ? { description: header.description }
              : {}),
          }
          const expr = zodToOpenAPI(schema)
          return declareConst(headerConstName(key), expr, exportSchema)
        })
        .join('\n\n')
    : ''
  if (headersDefinitions) out.push(headersDefinitions)

  // links
  const linksDefinitions = components.links
    ? Object.keys(components.links)
        .sort()
        .map((key) =>
          declareConst(linkConstName(key), jsonExpr(components.links?.[key]), exportSchema),
        )
        .join('\n\n')
    : ''
  if (linksDefinitions) out.push(linksDefinitions)

  // requestBodies
  const requestBodiesDefinitions = components.requestBodies
    ? Object.keys(components.requestBodies)
        .sort()
        .map((key) => {
          const body = components.requestBodies?.[key]
          const expr = body ? requestBodyExpr(body, components) : '{}'
          return declareConst(requestBodyConstName(key), expr, exportSchema)
        })
        .join('\n\n')
    : ''
  if (requestBodiesDefinitions) out.push(requestBodiesDefinitions)

  // responses
  const responsesDefinitions = components.responses
    ? Object.keys(components.responses)
        .sort()
        .map((key) => {
          const res = components.responses?.[key]
          const expr = res ? responseDefinitionExpr(res, components) : '{}'
          return declareConst(responseConstName(key), expr, exportSchema)
        })
        .join('\n\n')
    : ''
  if (responsesDefinitions) out.push(responsesDefinitions)

  // callbacks
  const callbacksDefinitions = components.callbacks
    ? Object.keys(components.callbacks)
        .sort()
        .map((key) =>
          declareConst(callbackConstName(key), jsonExpr(components.callbacks?.[key]), exportSchema),
        )
        .join('\n\n')
    : ''
  if (callbacksDefinitions) out.push(callbacksDefinitions)

  // securitySchemes
  const securitySchemesDefinitions = components.securitySchemes
    ? Object.keys(components.securitySchemes)
        .sort()
        .map((key) => {
          const expr = jsonExpr(components.securitySchemes?.[key])
          return declareConst(securitySchemeConstName(key), expr, exportSchema)
        })
        .join('\n\n')
    : ''
  if (securitySchemesDefinitions) out.push(securitySchemesDefinitions)

  return out.filter(Boolean).join('\n\n')
}
