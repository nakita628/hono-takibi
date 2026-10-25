import { STATUS_CODES } from 'node:http'

import {
  FORM_URLENCODED_MEDIA_TYPE,
  HTTP_METHODS,
  JSON_MEDIA_TYPE,
  MULTIPART_MEDIA_TYPE,
} from '../../constants/index.js'
import { isRecord, isRefObject, isSchemaArray } from '../../guard/index.js'
import type { OpenAPI, Operation, Parameter, PathItem, Schema } from '../../openapi/index.js'
import { decodePercent, escapeHtml } from '../../utils/index.js'

type Endpoint = {
  readonly method: string
  readonly path: string
  readonly operation: Operation
  readonly pathItem: PathItem
}

/**
 * Which side of the exchange a schema is rendered for: `readOnly` properties
 * are never sent in a request and `writeOnly` ones never come back in a
 * response. `schema` renders the definition itself and keeps both.
 */
type Direction = 'request' | 'response' | 'schema'

type MediaLike = {
  readonly schema: Schema | undefined
  readonly example: unknown
  readonly examples: { readonly [k: string]: unknown } | undefined
}

type PickedMedia = {
  readonly mediaType: string
  readonly media: MediaLike
}

type FieldRow = {
  readonly name: string
  readonly type: string
  readonly required: boolean
  readonly restrictions: string
  readonly description: string
  readonly enums: readonly unknown[]
}

type SampleOptions = {
  readonly basePath: string
  readonly entry: string
  readonly curl: boolean
  readonly baseUrl: string | undefined
}

/**
 * Whether a table or an example is inside the expansion of a schema that reaches itself.
 *
 * Such a schema is expanded where it is used, like any other, but inside its expansion a
 * schema that reaches itself is named and linked rather than expanded: that is where the
 * walk would otherwise come back to where it started, by this schema or by one that
 * reaches it. So no expansion nests another recursive one, and the size of a table or an
 * example is that of the finite part of the schema. A schema that cannot reach itself is
 * expanded wherever it is used: two properties of that type carry two copies of it.
 */
type Inside = boolean

/**
 * What is asked of a document over and over while its docs are made: what a `$ref`
 * resolves to, which `$ref`s the value it names holds, whether that schema can reach
 * itself again, and the anchor of a schema. Every operation asks the same questions of
 * the same refs, and the document is only read in the meantime, so each answer is kept.
 * Keyed by the document, so that docs made from several documents in one process do
 * not see each other's answers.
 */
type DocumentCache = {
  readonly resolved: Map<string, unknown>
  readonly outgoing: Map<string, ReadonlySet<string>>
  readonly recursive: Map<string, boolean>
  readonly anchors: Map<string, string>
}

const documentCaches = new WeakMap<OpenAPI, DocumentCache>()

function cacheOf(doc: OpenAPI): DocumentCache {
  const found = documentCaches.get(doc)
  if (found) return found
  const made: DocumentCache = {
    resolved: new Map(),
    outgoing: new Map(),
    recursive: new Map(),
    anchors: new Map(),
  }
  documentCaches.set(doc, made)
  return made
}

/** A `${NAME}` placeholder a curl example leaves for the shell to expand. */
const SHELL_VARIABLE_PATTERN = /\$\{[A-Z_]+\}/u

const MULTIPART_BOUNDARY = 'boundary'

const SLUG_STRIP = /[^\p{L}\p{N}\p{M}　-鿿＀-￯ -]/gu

function toSlug(text: string) {
  const str = typeof text === 'string' ? text : String(text ?? '')
  return str.toLowerCase().replaceAll(SLUG_STRIP, '').replaceAll(/\s+/gu, '-')
}

function findFreeId(used: ReadonlySet<string>, base: string, n = 0): string {
  const id = n === 0 ? base : `${base}-${n}`
  return used.has(id) ? findFreeId(used, base, n + 1) : id
}

/**
 * Hands out ids that stay unique within one document: a repeated id gets a
 * numeric suffix, as two operations may share a summary.
 */
function makeIdAllocator() {
  const used = new Set<string>()
  return (base: string) => {
    const id = findFreeId(used, base)
    used.add(id)
    return id
  }
}

function firstNonEmpty(...values: readonly (string | undefined)[]) {
  return values.find((value) => typeof value === 'string' && value.trim() !== '')
}

function toText(value: unknown) {
  return typeof value === 'string' && value !== '' ? value : undefined
}

function toSingleLine(value: string) {
  return value.replaceAll(/\s+/gu, ' ').trim()
}

/**
 * Decodes one JSON Pointer segment of a URI fragment: percent-encoding first,
 * then `~1` and `~0` (RFC 6901 §6).
 */
function decodePointerSegment(segment: string) {
  return decodePercent(segment).replaceAll('~1', '/').replaceAll('~0', '~')
}

function pointerSegments(ref: string): readonly string[] | undefined {
  const hash = ref.indexOf('#')
  if (hash === -1) return undefined
  const fragment = ref.slice(hash + 1)
  if (!fragment.startsWith('/')) return undefined
  return fragment.slice(1).split('/').map(decodePointerSegment)
}

/**
 * Resolves a `$ref` against the document itself, so references into `paths`
 * (as a bundler emits them) resolve as well as those into `components`.
 */
function resolveRef(ref: string, doc: OpenAPI) {
  const { resolved } = cacheOf(doc)
  if (resolved.has(ref)) return resolved.get(ref)
  const segments = pointerSegments(ref)
  const value =
    segments === undefined
      ? undefined
      : segments.reduce<unknown>((node, segment) => {
          if (Array.isArray(node)) return node[Number(segment)]
          if (isRecord(node)) return Object.hasOwn(node, segment) ? node[segment] : undefined
          return undefined
        }, doc)
  resolved.set(ref, value)
  return value
}

/**
 * Follows a Reference Object until it reaches a value, or comes back to a reference it
 * has followed: a cycle of references names nothing. Schemas go through `derefSchema`
 * instead, which tracks cycles the same way.
 */
function resolveRefDeep(
  value: unknown,
  doc: OpenAPI,
  seen: ReadonlySet<string> = new Set<string>(),
): unknown {
  if (!isRefObject(value)) return value
  if (seen.has(value.$ref)) return undefined
  return resolveRefDeep(resolveRef(value.$ref, doc), doc, new Set([...seen, value.$ref]))
}

/**
 * Name of the schema a `$ref` points at, when it points at `components.schemas`.
 * Only those have an anchor in the Schemas section.
 */
function componentSchemaName(ref: string) {
  const segments = pointerSegments(ref)
  if (segments?.length !== 3) return undefined
  const [root, section, name] = segments
  return root === 'components' && section === 'schemas' && name ? name : undefined
}

/**
 * Lower-cased anchor suffix of a schema. Names that differ only in case would
 * share it, so every one after the first gets a numeric suffix.
 */
function schemaAnchor(name: string, doc: OpenAPI) {
  const { anchors } = cacheOf(doc)
  const known = anchors.get(name)
  if (known !== undefined) return known
  const lower = name.toLowerCase()
  const schemas: unknown = doc.components?.schemas
  const twins = isRecord(schemas)
    ? Object.keys(schemas).filter((key) => key.toLowerCase() === lower)
    : []
  const index = twins.indexOf(name)
  const anchor = index > 0 ? `${lower}-${index}` : lower
  anchors.set(name, anchor)
  return anchor
}

/** A `$ref` to a schema under `components.schemas`: linked in a table, listed under Schemas. */
function isComponentRef(schema: Schema) {
  return schema.$ref !== undefined && componentSchemaName(schema.$ref) !== undefined
}

function makeSchemaLink(name: string, doc: OpenAPI) {
  return `[${name}](#schema${schemaAnchor(name, doc)})`
}

function isJsonMediaType(mediaType: string) {
  return /^application\/(?:[\w.-]+\+)?json(?:\s*;.*)?$/iu.test(mediaType)
}

function baseMediaType(mediaType: string) {
  return (mediaType.split(';')[0] ?? '').trim().toLowerCase()
}

function isSchemaLike(value: unknown): value is Schema {
  return isRecord(value)
}

function listMedia(content: unknown, doc: OpenAPI): readonly PickedMedia[] {
  if (!isRecord(content)) return []
  return Object.entries(content).flatMap(([mediaType, value]) => {
    const media = resolveRefDeep(value, doc)
    if (!isRecord(media)) return []
    return [
      {
        mediaType,
        media: {
          schema: isSchemaLike(media.schema) ? media.schema : undefined,
          example: media.example,
          examples: isRecord(media.examples) ? media.examples : undefined,
        },
      },
    ]
  })
}

function hasPayload(media: MediaLike) {
  return media.schema !== undefined || media.example !== undefined || media.examples !== undefined
}

/**
 * Picks the JSON media of a content map: `application/json` first, then any
 * JSON-flavoured type such as `application/problem+json`.
 */
function pickJsonMedia(content: unknown, doc: OpenAPI) {
  const all = listMedia(content, doc).filter(({ media }) => hasPayload(media))
  return (
    all.find(({ mediaType }) => baseMediaType(mediaType) === JSON_MEDIA_TYPE) ??
    all.find(({ mediaType }) => isJsonMediaType(mediaType))
  )
}

/**
 * Picks the media that documents a body: JSON, then the two form encodings,
 * then whatever comes first.
 */
function pickMedia(content: unknown, doc: OpenAPI) {
  const all = listMedia(content, doc)
  return (
    pickJsonMedia(content, doc) ??
    all.find(({ mediaType }) => baseMediaType(mediaType) === FORM_URLENCODED_MEDIA_TYPE) ??
    all.find(({ mediaType }) => baseMediaType(mediaType) === MULTIPART_MEDIA_TYPE) ??
    all.find(({ media }) => hasPayload(media)) ??
    all[0]
  )
}

/**
 * Escapes a value for a Markdown table cell: `|` would close the cell and a
 * line break would end the row.
 */
function escapeCell(value: string) {
  return value.replaceAll('|', '\\|').replaceAll(/\r?\n/gu, '<br>')
}

/**
 * Wraps content in a code fence longer than any backtick run inside it, so the
 * content cannot close the fence early.
 */
function makeFence(content: string, language: string): readonly string[] {
  const longest = Math.max(0, ...(content.match(/`+/gu) ?? []).map((run) => run.length))
  const fence = '`'.repeat(Math.max(3, longest + 1))
  return [`${fence}${language}`, content, fence]
}

/**
 * `visited` holds the `$ref`s on the current path only, so a schema referenced
 * by two sibling properties is expanded for both while a cycle still stops.
 */
function withRef(visited: ReadonlySet<string>, ref: string) {
  return new Set([...visited, ref])
}

/**
 * Follows `$ref` to the schema it names. Returns `undefined` when the
 * reference is unknown or already on the current path.
 */
function derefSchema(schema: Schema, doc: OpenAPI, visited: ReadonlySet<string>) {
  if (!schema.$ref) return { schema, visited }
  if (visited.has(schema.$ref)) return undefined
  const resolved = resolveRef(schema.$ref, doc)
  if (!isSchemaLike(resolved)) return undefined
  return derefSchema(resolved, doc, withRef(visited, schema.$ref))
}

function collectRefs(node: unknown, found: Set<string> = new Set<string>()): ReadonlySet<string> {
  if (Array.isArray(node)) {
    for (const item of node) collectRefs(item, found)
  } else if (isRecord(node)) {
    if (typeof node.$ref === 'string') found.add(node.$ref)
    for (const value of Object.values(node)) collectRefs(value, found)
  }
  return found
}

/**
 * Whether the schema a `$ref` names can reach itself again through `$ref`s.
 */
/** The `$ref`s held by the value a `$ref` names, walked once per document. */
function outgoingRefs(ref: string, doc: OpenAPI) {
  const { outgoing } = cacheOf(doc)
  const known = outgoing.get(ref)
  if (known !== undefined) return known
  const refs = collectRefs(resolveRef(ref, doc))
  outgoing.set(ref, refs)
  return refs
}

/**
 * Whether the schema a `$ref` names can reach itself again through `$ref`s.
 *
 * Answered once per document: the walk covers everything the schema reaches, and
 * every table and example of every operation asks it of the same schemas.
 */
function isRecursiveRef(ref: string, doc: OpenAPI) {
  const { recursive } = cacheOf(doc)
  const known = recursive.get(ref)
  if (known !== undefined) return known
  const seen = new Set<string>()
  const reaches = (current: string): boolean => {
    if (seen.has(current)) return false
    seen.add(current)
    return [...outgoingRefs(current, doc)].some((next) => next === ref || reaches(next))
  }
  const result = reaches(ref)
  recursive.set(ref, result)
  return result
}

/**
 * `derefSchema` for a schema that is about to be expanded: a `$ref` to a schema that
 * reaches itself is followed unless the walk is already inside such a schema, and what
 * it opens is inside one.
 */
function expandSchema(schema: Schema, doc: OpenAPI, inside: Inside) {
  const recursive = schema.$ref !== undefined && isRecursiveRef(schema.$ref, doc)
  if (recursive && inside) return undefined
  const target = derefSchema(schema, doc, new Set<string>())
  return target && { schema: target.schema, inside: inside || recursive }
}

function primaryType(schema: Schema) {
  return Array.isArray(schema.type) ? schema.type.find((t) => t !== 'null') : schema.type
}

function isObjectSchema(
  schema: Schema,
): schema is Schema & { readonly properties: NonNullable<Schema['properties']> } {
  if (!isRecord(schema.properties)) return false
  if (schema.type === undefined) return true
  return Array.isArray(schema.type) ? schema.type.includes('object') : schema.type === 'object'
}

function isArraySchema(schema: Schema) {
  return primaryType(schema) === 'array' || (schema.type === undefined && 'items' in schema)
}

function arrayItemSchema(schema: Schema) {
  const item = isSchemaArray(schema.items) ? schema.items[0] : schema.items
  return isSchemaLike(item) ? item : undefined
}

function variantsOf(schema: Schema): readonly {
  readonly keyword: 'oneOf' | 'anyOf'
  readonly schema: Schema
}[] {
  return [
    ...(schema.oneOf ?? []).map((variant) => ({ keyword: 'oneOf' as const, schema: variant })),
    ...(schema.anyOf ?? []).map((variant) => ({ keyword: 'anyOf' as const, schema: variant })),
  ].filter((variant) => isSchemaLike(variant.schema))
}

function hasFields(schema: Schema) {
  return (
    isObjectSchema(schema) ||
    (schema.allOf?.length ?? 0) > 0 ||
    variantsOf(schema).length > 0 ||
    isSchemaLike(schema.additionalProperties)
  )
}

function inferType(value: unknown) {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  if (typeof value === 'number') return Number.isInteger(value) ? 'integer' : 'number'
  if (typeof value === 'string' || typeof value === 'boolean') return typeof value
  return 'object'
}

function baseTypeOf(schema: Schema, doc: OpenAPI, visited: ReadonlySet<string>) {
  if (Array.isArray(schema.type)) return schema.type.join(' | ')
  if (schema.type !== undefined) return schema.type
  if (isRecord(schema.properties)) return 'object'
  const variants = variantsOf(schema)
  if (variants.length > 0) {
    return [
      ...new Set(variants.map((variant) => formatSchemaType(variant.schema, doc, visited))),
    ].join(' | ')
  }
  if (schema.const !== undefined) return inferType(schema.const)
  if (schema.enum && schema.enum.length > 0) return inferType(schema.enum[0])
  return 'object'
}

/**
 * Formats a schema type string as widdershins does.
 * Examples: "string(email)", "integer(int64)", "[User](#schemauser)", "[[User](#schemauser)]"
 */
function formatSchemaType(
  schema: Schema | undefined,
  doc: OpenAPI,
  visited: ReadonlySet<string> = new Set<string>(),
): string {
  if (!isSchemaLike(schema)) return 'object'
  if (schema.$ref) {
    const name = componentSchemaName(schema.$ref)
    if (name) return makeSchemaLink(name, doc)
    // A reference outside `components.schemas` has no anchor: describe its target.
    const target = derefSchema(schema, doc, visited)
    return target ? formatSchemaType(target.schema, doc, target.visited) : 'object'
  }
  if (isArraySchema(schema)) {
    const item = arrayItemSchema(schema)
    if (item) return `[${formatSchemaType(item, doc, visited)}]`
    if (schema.prefixItems && schema.prefixItems.length > 0) {
      return `[${schema.prefixItems.map((entry) => formatSchemaType(entry, doc, visited)).join(', ')}]`
    }
    return 'array'
  }
  const baseType = baseTypeOf(schema, doc, visited)
  const formatted = schema.format ? `${baseType}(${schema.format})` : baseType
  // OpenAPI 3.0 spells a nullable type with a flag rather than a type array.
  return schema.nullable === true && !baseType.split(' | ').includes('null')
    ? `${formatted} | null`
    : formatted
}

/**
 * Returns a default example string for the given OpenAPI string format.
 * Values use RFC-reserved addresses and domains for documentation.
 * @see https://www.rfc-editor.org/rfc/rfc2606 - Reserved domains (example.com)
 * @see https://www.rfc-editor.org/rfc/rfc5737 - Documentation IPv4 (192.0.2.0/24)
 * @see https://www.rfc-editor.org/rfc/rfc3849 - Documentation IPv6 (2001:DB8::/32)
 */
function makeDefaultString(format: string | undefined) {
  // oxlint-disable-next-line typescript/switch-exhaustiveness-check -- the default branch covers every other format
  switch (format) {
    case 'email':
      return 'user@example.com'
    case 'date-time':
      return '1970-01-01T00:00:00Z'
    case 'date':
      return '1970-01-01'
    case 'time':
      return '00:00:00Z'
    case 'uri':
    case 'url':
      return 'http://example.com'
    case 'uuid':
    case 'uuidv4':
      return '497f6eca-6276-4993-bfeb-53cbbbba6f08'
    case 'ipv4':
      return '192.0.2.1'
    case 'ipv6':
      return '2001:0db8:85a3:0000:0000:8a2e:0370:7334'
    case 'password':
      return 'password'
    case 'byte':
      return 'string'
    case 'binary':
      return 'string'
    case 'hostname':
      return 'example.com'
    default:
      return undefined
  }
}

/**
 * A string example that honours `minLength` / `maxLength`. A value dictated by
 * `format` is left alone: cutting it would break the format.
 */
function makeStringExample(schema: Schema) {
  const formatted = makeDefaultString(schema.format)
  if (formatted !== undefined) return formatted
  const base = 'string'
  const min = schema.minLength ?? 0
  const padded = min > base.length ? base.repeat(Math.ceil(min / base.length)).slice(0, min) : base
  return schema.maxLength !== undefined && schema.maxLength < padded.length
    ? padded.slice(0, Math.max(0, schema.maxLength))
    : padded
}

/**
 * A number example inside the declared range. `exclusiveMinimum` is a number
 * in OpenAPI 3.1 and a flag next to `minimum` in 3.0; both are honoured.
 */
function makeNumberExample(schema: Schema, integer: boolean) {
  const step = integer ? 1 : 0.1
  const lower =
    typeof schema.exclusiveMinimum === 'number'
      ? schema.exclusiveMinimum + step
      : schema.minimum !== undefined && schema.exclusiveMinimum === true
        ? schema.minimum + step
        : schema.minimum
  const upper =
    typeof schema.exclusiveMaximum === 'number'
      ? schema.exclusiveMaximum - step
      : schema.maximum !== undefined && schema.exclusiveMaximum === true
        ? schema.maximum - step
        : schema.maximum
  const start = lower ?? (upper !== undefined && upper < 0 ? upper : 0)
  const bounded = upper !== undefined && start > upper ? upper : start
  const whole = integer ? Math.ceil(bounded) : bounded
  const multiple = schema.multipleOf
  if (multiple === undefined || multiple <= 0) return Number(whole.toPrecision(12))
  const raised = Math.ceil(whole / multiple) * multiple
  const fitted = upper !== undefined && raised > upper ? raised - multiple : raised
  return Number(fitted.toPrecision(12))
}

function makeDefaultValue(schema: Schema) {
  // oxlint-disable-next-line typescript/switch-exhaustiveness-check -- the default branch covers every other type
  switch (primaryType(schema)) {
    case 'string':
      return makeStringExample(schema)
    case 'number':
      return makeNumberExample(schema, false)
    case 'integer':
      return makeNumberExample(schema, true)
    case 'boolean':
      return true
    case 'object':
      return {}
    case 'array':
      return []
    default:
      return null
  }
}

function firstExampleValue(examples: unknown, doc: OpenAPI): unknown {
  if (Array.isArray(examples)) return examples[0]
  if (!isRecord(examples)) return undefined
  const first = resolveRefDeep(Object.values(examples)[0], doc)
  return isRecord(first) ? first.value : undefined
}

function isHidden(schema: Schema, direction: Direction) {
  if (direction === 'request') return schema.readOnly === true
  if (direction === 'response') return schema.writeOnly === true
  return false
}

function isHiddenProperty(
  schema: Schema,
  doc: OpenAPI,
  direction: Direction,
  visited: ReadonlySet<string> = new Set<string>(),
) {
  if (!isSchemaLike(schema)) return false
  if (isHidden(schema, direction)) return true
  const target = derefSchema(schema, doc, visited)
  return target !== undefined && isHidden(target.schema, direction)
}

function isNullSchema(schema: Schema) {
  return schema.type === 'null' || (Array.isArray(schema.type) && primaryType(schema) === undefined)
}

function makeExampleFromSchema(
  schema: Schema,
  doc: OpenAPI,
  direction: Direction = 'schema',
  inside: Inside = false,
): unknown {
  if (!isSchemaLike(schema)) return null

  if (schema.example !== undefined) return schema.example

  if (schema.$ref) {
    const target = expandSchema(schema, doc, inside)
    if (!target) return {}
    return makeExampleFromSchema(target.schema, doc, direction, target.inside)
  }

  const listed = firstExampleValue(schema.examples, doc)
  if (listed !== undefined) return listed

  if (schema.const !== undefined) return schema.const

  if (schema.default !== undefined) return schema.default

  if (schema.enum && schema.enum.length > 0) return schema.enum[0]

  const variant = variantsOf(schema).find((entry) => !isNullSchema(entry.schema))
  const extra = schema.additionalProperties

  if (
    isObjectSchema(schema) ||
    (schema.allOf?.length ?? 0) > 0 ||
    (isSchemaLike(extra) && !isArraySchema(schema))
  ) {
    const result: { [k: string]: unknown } = {}
    const parts = [...(schema.allOf ?? []), ...(variant ? [variant.schema] : [])]
    for (const part of parts) {
      const example = makeExampleFromSchema(part, doc, direction, inside)
      if (isRecord(example)) Object.assign(result, example)
    }
    for (const [key, propSchema] of Object.entries(schema.properties ?? {})) {
      if (isHiddenProperty(propSchema, doc, direction)) continue
      result[key] = makeExampleFromSchema(propSchema, doc, direction, inside)
    }
    if (isSchemaLike(extra)) {
      const value = makeExampleFromSchema(extra, doc, direction, inside)
      result.property1 = value
      result.property2 = value
    }
    return result
  }

  if (isArraySchema(schema)) {
    if (schema.maxItems === 0) return []
    const item = arrayItemSchema(schema)
    if (item) {
      const value = makeExampleFromSchema(item, doc, direction, inside)
      const count = Math.max(schema.minItems ?? 1, 1)
      return Array.from({ length: count }, () => value)
    }
    return (schema.prefixItems ?? []).map((entry) =>
      makeExampleFromSchema(entry, doc, direction, inside),
    )
  }

  if (variant) {
    return makeExampleFromSchema(variant.schema, doc, direction, inside)
  }

  return makeDefaultValue(schema)
}

function extractMediaExample(media: MediaLike, doc: OpenAPI) {
  if (media.example !== undefined) return media.example
  return firstExampleValue(media.examples, doc)
}

function makeMediaExample(media: MediaLike, doc: OpenAPI, direction: Direction) {
  const mediaExample = extractMediaExample(media, doc)
  if (mediaExample !== undefined) return mediaExample
  return media.schema ? makeExampleFromSchema(media.schema, doc, direction) : undefined
}

function securityRequirements(
  operation: Operation,
  doc: OpenAPI,
): readonly { readonly [k: string]: unknown }[] {
  const security: unknown = operation.security ?? doc.security
  return Array.isArray(security) ? security.filter((entry) => isRecord(entry)) : []
}

function securitySchemeOf(name: string, doc: OpenAPI) {
  const schemes: unknown = doc.components?.securitySchemes
  if (!isRecord(schemes) || !Object.hasOwn(schemes, name)) return undefined
  const scheme = resolveRefDeep(schemes[name], doc)
  return isRecord(scheme) ? scheme : undefined
}

function httpSchemeOf(scheme: { readonly [k: string]: unknown }) {
  // RFC 9110 §11.1: the authentication scheme is case-insensitive.
  return typeof scheme.scheme === 'string' ? scheme.scheme.toLowerCase() : undefined
}

function makeLinkLine(label: string, url: unknown): readonly string[] {
  return typeof url === 'string' && url !== '' ? [`    - ${label} = [${url}](${url})`] : []
}

function describeSecurityScheme(
  name: string,
  scheme: { readonly [k: string]: unknown },
): readonly string[] {
  const desc = toText(scheme.description) ?? ''
  switch (scheme.type) {
    case 'http': {
      const httpScheme = httpSchemeOf(scheme)
      if (!httpScheme) return []
      return [`- HTTP Authentication, scheme: ${httpScheme} ${desc}`.trimEnd(), '']
    }
    case 'apiKey': {
      const schemeIn = toText(scheme.in) ?? 'header'
      const parameterName = toText(scheme.name) ?? name
      return [
        `* API Key (${name})`,
        `    - Parameter Name: **${parameterName}**, in: ${schemeIn}. ${desc}`.trimEnd(),
        '',
      ]
    }
    case 'oauth2': {
      const flows = isRecord(scheme.flows) ? Object.entries(scheme.flows) : []
      return [
        `- oAuth2 authentication. ${desc}`.trimEnd(),
        '',
        // oxlint-disable-next-line oxc/no-map-spread -- flatMap fans out each entry into its lines
        ...flows.flatMap(([flowName, flowValue]) => {
          if (!isRecord(flowValue)) return []
          const scopes = isRecord(flowValue.scopes) ? Object.entries(flowValue.scopes) : []
          return [
            `    - Flow: ${flowName}`,
            ...makeLinkLine('Authorization URL', flowValue.authorizationUrl),
            ...makeLinkLine('Device Authorization URL', flowValue.deviceAuthorizationUrl),
            ...makeLinkLine('Token URL', flowValue.tokenUrl),
            ...makeLinkLine('Refresh URL', flowValue.refreshUrl),
            ...(scopes.length > 0
              ? [
                  '',
                  '|Scope|Scope Description|',
                  '|---|---|',
                  ...scopes.map(
                    ([scope, scopeDesc]) =>
                      `|${escapeCell(scope)}|${escapeCell(toParamString(scopeDesc))}|`,
                  ),
                ]
              : []),
            '',
          ]
        }),
      ]
    }
    case 'openIdConnect': {
      const urlLines = makeLinkLine('OpenID Connect URL', scheme.openIdConnectUrl)
      return [
        `- OpenID Connect authentication. ${desc}`.trimEnd(),
        '',
        ...(urlLines.length > 0 ? [...urlLines, ''] : []),
      ]
    }
    case 'mutualTLS':
      return [`- Mutual TLS authentication. ${desc}`.trimEnd(), '']
    default:
      return []
  }
}

function makeAuthenticationSection(doc: OpenAPI): readonly string[] {
  const schemes: unknown = doc.components?.securitySchemes
  if (!isRecord(schemes)) return []
  const lines = Object.keys(schemes).flatMap((name) => {
    // An entry that only points at another scheme is described under that scheme.
    if (isRefObject(schemes[name])) return []
    const scheme = securitySchemeOf(name, doc)
    return scheme ? describeSecurityScheme(name, scheme) : []
  })
  if (lines.length === 0) return []
  return ['# Authentication', '', ...lines]
}

function makeAsideAuth(operation: Operation, doc: OpenAPI): readonly string[] {
  const reqs = securityRequirements(operation, doc)
  // An empty requirement object means the operation may be called anonymously.
  const named = reqs.filter((req) => Object.keys(req).length > 0)
  if (named.length === 0) {
    return ['<aside class="success">', 'This operation does not require authentication', '</aside>']
  }
  const methods = named.map((req) =>
    Object.entries(req)
      .map(([name, scopes]) => {
        const scheme = securitySchemeOf(name, doc)
        const scopeArr = Array.isArray(scopes) ? scopes : []
        return scheme?.type === 'oauth2' && scopeArr.length > 0
          ? `${name} ( Scopes: ${scopeArr.join(' ')} )`
          : name
      })
      .join(' & '),
  )
  return [
    '<aside class="warning">',
    named.length === reqs.length
      ? 'To perform this operation, you must be authenticated by means of one of the following methods:'
      : 'Authentication is optional for this operation. To authenticate, use one of the following methods:',
    methods.join(', '),
    '</aside>',
  ]
}

function makeShellQuote(value: string) {
  // A single quote would close the shell string the value is wrapped in.
  return `'${value.replaceAll("'", "'\\''")}'`
}

/**
 * Double-quotes a value that carries `${VAR}` placeholders the shell must
 * expand, escaping everything else the shell would interpret.
 */
function makeShellQuoteWithVars(value: string) {
  const escaped = value
    .replaceAll(/[\\"`]/gu, (c) => `\\${c}`)
    .replaceAll(/\$(?!\{[A-Z_]+\})/gu, '\\$')
  return `"${escaped}"`
}

/**
 * ANSI-C quoting (`$'...'`), the one shell string that can carry the CRLF a
 * multipart body is framed with.
 */
function makeShellQuoteAnsi(value: string) {
  const escaped = value
    .replaceAll('\\', '\\\\')
    .replaceAll("'", "\\'")
    .replaceAll('\r', '\\r')
    .replaceAll('\n', '\\n')
  return `$'${escaped}'`
}

function shellArg(value: string, quoteBraces: boolean) {
  if (SHELL_VARIABLE_PATTERN.test(value)) return makeShellQuoteWithVars(value)
  const safe = /^[\w\-./:~%=@+,{}]+$/u.test(value) && !(quoteBraces && value.includes('{'))
  return safe ? value : makeShellQuote(value)
}

function toParamString(value: unknown) {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  return JSON.stringify(value)
}

function isParameter(value: unknown): value is Parameter {
  return isRecord(value) && typeof value.name === 'string' && typeof value.in === 'string'
}

function resolveParameters(parameters: unknown, doc: OpenAPI): readonly Parameter[] {
  if (!Array.isArray(parameters)) return []
  return parameters.flatMap((parameter) => {
    const resolved = resolveRefDeep(parameter, doc)
    return isParameter(resolved) ? [resolved] : []
  })
}

function mergeParameters(
  operationParams: readonly Parameter[],
  pathParams: readonly Parameter[],
): readonly Parameter[] {
  const seen = new Set(operationParams.map((p) => `${p.name}:${p.in}`))
  return [...operationParams, ...pathParams.filter((p) => !seen.has(`${p.name}:${p.in}`))]
}

function endpointParameters(endpoint: Endpoint, doc: OpenAPI) {
  return mergeParameters(
    resolveParameters(endpoint.operation.parameters, doc),
    resolveParameters(endpoint.pathItem.parameters, doc),
  )
}

/**
 * Schema of a parameter: `schema`, or the schema of its single `content` entry.
 */
function parameterSchema(parameter: Parameter, doc: OpenAPI) {
  if (isSchemaLike(parameter.schema)) return parameter.schema
  return listMedia(parameter.content, doc)[0]?.media.schema
}

function makeParameterExample(parameter: Parameter, doc: OpenAPI) {
  if (parameter.example !== undefined) return parameter.example
  const listed = firstExampleValue(parameter.examples, doc)
  if (listed !== undefined) return listed
  const schema = parameterSchema(parameter, doc)
  return schema ? makeExampleFromSchema(schema, doc, 'request') : 'string'
}

function makeEncodedPair(name: string, value: unknown) {
  return `${encodeURIComponent(name)}=${encodeURIComponent(toParamString(value))}`
}

/**
 * Serializes a query parameter the way its `style` / `explode` say
 * (OpenAPI §4.8.12.2.1: `form` with `explode: true` is the default).
 */
function serializeQueryParameter(parameter: Parameter, value: unknown): readonly string[] {
  const style = parameter.style ?? 'form'
  const explode = parameter.explode ?? style === 'form'
  if (parameter.content !== undefined && parameter.schema === undefined) {
    return [makeEncodedPair(parameter.name, value)]
  }
  if (Array.isArray(value)) {
    if (explode) return value.map((item) => makeEncodedPair(parameter.name, item))
    const separator = style === 'spaceDelimited' ? ' ' : style === 'pipeDelimited' ? '|' : ','
    return [
      makeEncodedPair(parameter.name, value.map((item) => toParamString(item)).join(separator)),
    ]
  }
  if (isRecord(value)) {
    const entries = Object.entries(value)
    if (style === 'deepObject') {
      return entries.map(([key, item]) => makeEncodedPair(`${parameter.name}[${key}]`, item))
    }
    if (explode) return entries.map(([key, item]) => makeEncodedPair(key, item))
    return [
      makeEncodedPair(
        parameter.name,
        entries.flatMap(([key, item]) => [key, toParamString(item)]).join(','),
      ),
    ]
  }
  return [makeEncodedPair(parameter.name, value)]
}

function serializeHeaderValue(value: unknown, explode = false) {
  if (Array.isArray(value)) return value.map((item) => toParamString(item)).join(',')
  if (isRecord(value)) {
    return Object.entries(value)
      .map(([key, item]) =>
        explode ? `${key}=${toParamString(item)}` : `${key},${toParamString(item)}`,
      )
      .join(',')
  }
  return toParamString(value)
}

/**
 * Serializes a cookie parameter. An object explodes by default, each property a cookie of
 * its own; every other value is one cookie.
 */
function serializeCookieParameter(parameter: Parameter, value: unknown): readonly string[] {
  if (isRecord(value) && (parameter.explode ?? true)) {
    return Object.entries(value).map(([key, item]) => `${key}=${toParamString(item)}`)
  }
  return [`${parameter.name}=${serializeHeaderValue(value)}`]
}

function encodePathValue(item: unknown) {
  return encodeURIComponent(toParamString(item))
}

/**
 * Serializes a path parameter the way its `style` / `explode` say
 * (OpenAPI §4.8.12.2.1: `simple` with `explode: false` is the default). A `label` value
 * follows a ".", a `matrix` value ";" and the name of the parameter.
 */
function makePathParameterText(parameter: Parameter, value: unknown) {
  const style = parameter.style ?? 'simple'
  const explode = parameter.explode ?? false
  const name = encodeURIComponent(parameter.name)
  if (parameter.content !== undefined && parameter.schema === undefined) {
    return encodePathValue(value)
  }
  const pairs = isRecord(value)
    ? Object.entries(value).map(([key, item]) =>
        explode
          ? `${encodeURIComponent(key)}=${encodePathValue(item)}`
          : `${encodeURIComponent(key)},${encodePathValue(item)}`,
      )
    : undefined
  const items = pairs ?? (Array.isArray(value) ? value.map(encodePathValue) : undefined)
  if (items === undefined) {
    const text = encodePathValue(value)
    if (text === '') return ''
    return style === 'label' ? `.${text}` : style === 'matrix' ? `;${name}=${text}` : text
  }
  if (items.length === 0) return ''
  if (style === 'label') return `.${items.join(explode ? '.' : ',')}`
  if (style === 'matrix') {
    if (!explode) return `;${name}=${items.join(',')}`
    return items.map((item) => (pairs === undefined ? `;${name}=${item}` : `;${item}`)).join('')
  }
  return items.join(',')
}

/**
 * Header parameters named like these are ignored by OpenAPI (§4.8.12.1): the
 * request body, the responses and the security scheme define them instead.
 */
function isReservedHeader(name: string) {
  return ['accept', 'content-type', 'authorization'].includes(name.toLowerCase())
}

type SampleCredentials = {
  readonly headers: readonly string[]
  readonly query: readonly string[]
  readonly cookies: readonly string[]
}

/**
 * Credentials of the first security requirement: the alternatives after it are
 * other ways to authenticate, not additional ones.
 */
function makeSampleCredentials(operation: Operation, doc: OpenAPI): SampleCredentials {
  const [first] = securityRequirements(operation, doc)
  const headers = new Set<string>()
  const query = new Set<string>()
  const cookies = new Set<string>()
  for (const name of Object.keys(first ?? {})) {
    const scheme = securitySchemeOf(name, doc)
    if (!scheme) continue
    const httpScheme = scheme.type === 'http' ? httpSchemeOf(scheme) : undefined
    if (httpScheme === 'basic') {
      headers.add(`Authorization: Basic \${CREDENTIALS}`)
    } else if (
      httpScheme === 'bearer' ||
      scheme.type === 'oauth2' ||
      scheme.type === 'openIdConnect'
    ) {
      headers.add(`Authorization: Bearer \${ACCESS_TOKEN}`)
    } else if (scheme.type === 'apiKey') {
      const parameterName = toText(scheme.name)
      if (!parameterName) continue
      const schemeIn = toText(scheme.in) ?? 'header'
      if (schemeIn === 'header') headers.add(`${parameterName}: \${API_KEY}`)
      if (schemeIn === 'query') query.add(`${encodeURIComponent(parameterName)}=\${API_KEY}`)
      if (schemeIn === 'cookie') cookies.add(`${parameterName}=\${API_KEY}`)
    }
  }
  return { headers: [...headers], query: [...query], cookies: [...cookies] }
}

function requestBodyOf(operation: Operation, doc: OpenAPI) {
  const body = resolveRefDeep(operation.requestBody, doc)
  return isRecord(body) ? body : undefined
}

function getBodyMedia(operation: Operation, doc: OpenAPI) {
  return pickMedia(requestBodyOf(operation, doc)?.content, doc)
}

function indentJsonBody(body: string) {
  const lines = body.split('\n')
  if (lines.length <= 1) return body
  return [lines[0], ...lines.slice(1).map((l) => `  ${l}`)].join('\n')
}

function isBinarySchema(schema: Schema | undefined, doc: OpenAPI) {
  if (!isSchemaLike(schema)) return false
  const target = derefSchema(schema, doc, new Set<string>())
  return target?.schema.format === 'binary' || target?.schema.format === 'byte'
}

/**
 * The arguments that send the request body. `hono request` only has `-d`, so a
 * body that needs a file or a multipart boundary is left out there.
 */
function makeSampleBodyArgs(
  picked: PickedMedia | undefined,
  doc: OpenAPI,
  curl: boolean,
): readonly string[] {
  if (!picked || !hasPayload(picked.media)) return []
  const { media } = picked
  const mediaType = baseMediaType(picked.mediaType)
  const example = makeMediaExample(media, doc, 'request')
  if (isJsonMediaType(mediaType)) {
    if (example === undefined) return []
    return [`-d ${makeShellQuote(indentJsonBody(JSON.stringify(example, null, 2)))}`]
  }
  if (mediaType === FORM_URLENCODED_MEDIA_TYPE) {
    if (!isRecord(example)) return []
    const pairs = Object.entries(example).map(([key, value]) => makeEncodedPair(key, value))
    return pairs.length > 0 ? [`-d ${makeShellQuote(pairs.join('&'))}`] : []
  }
  if (mediaType === MULTIPART_MEDIA_TYPE) {
    if (!isRecord(example)) return []
    const target = media.schema ? derefSchema(media.schema, doc, new Set<string>()) : undefined
    const properties = target?.schema.properties ?? {}
    const entries = Object.entries(example)
    if (curl) {
      return entries.map(([key, value]) =>
        isBinarySchema(properties[key], doc)
          ? `-F ${makeShellQuote(`${key}=@/path/to/file`)}`
          : `-F ${makeShellQuote(`${key}=${toParamString(value)}`)}`,
      )
    }
    if (entries.length === 0) return []
    // `hono request` sends `-d` as is, so the parts are framed by hand.
    const parts = entries.map(([key, value]) =>
      isBinarySchema(properties[key], doc)
        ? `--${MULTIPART_BOUNDARY}\r\nContent-Disposition: form-data; name="${key}"; filename="${key}"\r\nContent-Type: application/octet-stream\r\n\r\nfile contents\r\n`
        : `--${MULTIPART_BOUNDARY}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${toParamString(value)}\r\n`,
    )
    return [`-d ${makeShellQuoteAnsi(`${parts.join('')}--${MULTIPART_BOUNDARY}--\r\n`)}`]
  }
  if (isBinarySchema(media.schema, doc) && extractMediaExample(media, doc) === undefined) {
    return curl ? [`--data-binary ${makeShellQuote('@/path/to/file')}`] : []
  }
  if (example === undefined || example === null) return []
  return [`-d ${makeShellQuote(typeof example === 'string' ? example : JSON.stringify(example))}`]
}

function acceptedMediaType(operation: Operation, doc: OpenAPI) {
  const mediaTypes = Object.values(operation.responses ?? {}).flatMap((response) => {
    const resolved = resolveRefDeep(response, doc)
    return isRecord(resolved) && isRecord(resolved.content) ? Object.keys(resolved.content) : []
  })
  return (
    mediaTypes.find((mediaType) => baseMediaType(mediaType) === JSON_MEDIA_TYPE) ??
    mediaTypes.find((mediaType) => isJsonMediaType(mediaType))
  )
}

function makeFullPath(basePath: string, pathStr: string) {
  return `${(basePath ?? '/').replace(/\/+$/u, '')}${pathStr}`
}

function makeCodeSample(
  endpoint: Endpoint,
  doc: OpenAPI,
  options: SampleOptions,
): readonly string[] {
  const { operation } = endpoint
  const curl = options.curl && options.baseUrl !== undefined
  const params = endpointParameters(endpoint, doc).filter((p) => p.required === true)
  const credentials = makeSampleCredentials(operation, doc)
  const method = endpoint.method.toUpperCase()
  // `hono request` builds a `Request`, which refuses a body on GET and HEAD.
  const picked =
    !curl && (method === 'GET' || method === 'HEAD') ? undefined : getBodyMedia(operation, doc)
  const bodyArgs = makeSampleBodyArgs(picked, doc, curl)
  const isMultipart =
    picked !== undefined && baseMediaType(picked.mediaType) === MULTIPART_MEDIA_TYPE

  // curl writes the multipart boundary into the header itself; a hand-written
  // `Content-Type: multipart/form-data` would drop it. `hono request` sends the
  // header as given, so it names the boundary the body is framed with.
  const contentType = !picked
    ? undefined
    : !isMultipart
      ? picked.mediaType
      : curl || bodyArgs.length === 0
        ? undefined
        : `${MULTIPART_MEDIA_TYPE}; boundary=${MULTIPART_BOUNDARY}`
  const accept = acceptedMediaType(operation, doc)
  const cookies = [
    ...params
      .filter((p) => p.in === 'cookie')
      .flatMap((p) => serializeCookieParameter(p, makeParameterExample(p, doc))),
    ...credentials.cookies,
  ]
  const headers = [
    ...(contentType ? [`Content-Type: ${contentType}`] : []),
    ...(accept ? [`Accept: ${baseMediaType(accept)}`] : []),
    ...credentials.headers,
    ...params
      .filter((p) => p.in === 'header' && !isReservedHeader(p.name))
      .map((p) => `${p.name}: ${serializeHeaderValue(makeParameterExample(p, doc), p.explode)}`),
    ...(cookies.length > 0 ? [`Cookie: ${cookies.join('; ')}`] : []),
  ].map((header) =>
    SHELL_VARIABLE_PATTERN.test(header)
      ? `-H ${makeShellQuoteWithVars(header)}`
      : `-H ${makeShellQuote(header)}`,
  )

  const query = [
    ...params
      .filter((p) => p.in === 'query')
      .flatMap((p) => serializeQueryParameter(p, makeParameterExample(p, doc))),
    ...credentials.query,
  ]
  const allParams = endpointParameters(endpoint, doc)
  // A path parameter without a declaration or a value keeps its placeholder.
  const samplePath = endpoint.path.replaceAll(
    /\{([^{}]+)\}/gu,
    (placeholder: string, name: string) => {
      const parameter = allParams.find((p) => p.in === 'path' && p.name === name)
      if (!parameter) return placeholder
      const value = makePathParameterText(parameter, makeParameterExample(parameter, doc))
      return value === '' ? placeholder : value
    },
  )
  const fullPath = makeFullPath(options.basePath, samplePath)
  const target = query.length > 0 ? `${fullPath}?${query.join('&')}` : fullPath

  if (curl) {
    const baseUrl = (options.baseUrl ?? '').replace(/\/+$/u, '')
    const args = [...(method === 'GET' ? [] : [`-X ${method}`]), ...headers, ...bodyArgs]
    const command = [`curl ${shellArg(`${baseUrl}${target}`, true)}`, ...args.map((a) => `  ${a}`)]
    return ['> Code samples', '', '```bash', command.join(' \\\n'), '```']
  }
  const command = [
    'hono request',
    `  -X ${method}`,
    `  -P ${shellArg(target, false)}`,
    ...headers.map((header) => `  ${header}`),
    ...bodyArgs.map((arg) => `  ${arg}`),
    `  ${options.entry}`,
  ]
  return ['> Code samples', '', '```bash', command.join(' \\\n'), '```']
}

function toYamlScalar(item: unknown) {
  if (typeof item !== 'string') return JSON.stringify(item) ?? 'null'
  const plain = /^[A-Za-z_/][\w ./@-]*$/u.test(item) && !/^(?:true|false|null|yes|no)$/iu.test(item)
  return plain && item.trim() === item ? item : JSON.stringify(item)
}

/**
 * A minimal YAML rendering of an example, used for form bodies: they are not
 * sent as JSON, so a JSON block would misstate the wire format.
 */
function toYaml(value: unknown, indent = 0): string {
  const pad = '  '.repeat(indent)
  const nested = (item: unknown) => {
    if (Array.isArray(item) && item.length > 0) return `\n${toYaml(item, indent + 1)}`
    if (isRecord(item) && Object.keys(item).length > 0) return `\n${toYaml(item, indent + 1)}`
    if (Array.isArray(item)) return ' []'
    if (isRecord(item)) return ' {}'
    return ` ${toYamlScalar(item)}`
  }
  if (Array.isArray(value)) return value.map((item) => `${pad}-${nested(item)}`).join('\n')
  if (isRecord(value)) {
    return Object.entries(value)
      .map(([key, item]) => `${pad}${toYamlScalar(key)}:${nested(item)}`)
      .join('\n')
  }
  return `${pad}${toYamlScalar(value)}`
}

function makeBodyParameterBlock(operation: Operation, doc: OpenAPI): readonly string[] {
  const picked = getBodyMedia(operation, doc)
  if (!picked || !hasPayload(picked.media)) return []
  // A binary body is a file: there is no text to show for it.
  if (
    isBinarySchema(picked.media.schema, doc) &&
    extractMediaExample(picked.media, doc) === undefined
  ) {
    return []
  }
  const example = makeMediaExample(picked.media, doc, 'request')
  if (example === undefined) return []
  const mediaType = baseMediaType(picked.mediaType)
  const block = isJsonMediaType(mediaType)
    ? makeFence(JSON.stringify(example, null, 2), 'json')
    : mediaType === FORM_URLENCODED_MEDIA_TYPE || mediaType === MULTIPART_MEDIA_TYPE
      ? makeFence(toYaml(example), 'yaml')
      : typeof example === 'string'
        ? makeFence(example, 'text')
        : makeFence(JSON.stringify(example, null, 2), 'json')
  return ['> Body parameter', '', ...block, '']
}

/**
 * Enum values of a schema, following `$ref` and looking into array items.
 */
function enumValuesOf(
  schema: Schema,
  doc: OpenAPI,
  visited: ReadonlySet<string> = new Set<string>(),
): readonly unknown[] {
  if (!isSchemaLike(schema)) return []
  const target = derefSchema(schema, doc, visited)
  if (!target) return []
  if (Array.isArray(target.schema.enum)) return target.schema.enum
  const item = isArraySchema(target.schema) ? arrayItemSchema(target.schema) : undefined
  return item ? enumValuesOf(item, doc, target.visited) : []
}

function formatEnumValue(value: unknown) {
  if (typeof value === 'string') return value === '' ? '""' : value
  return JSON.stringify(value) ?? String(value)
}

function restrictionsOf(schema: Schema) {
  if (schema.readOnly === true) return 'read-only'
  if (schema.writeOnly === true) return 'write-only'
  return 'none'
}

function describe(description: unknown, deprecated: unknown) {
  const text = toText(description)
  if (deprecated !== true) return text ?? 'none'
  return text ? `**Deprecated.** ${text}` : '**Deprecated.**'
}

/**
 * `required` of a schema together with that of its `allOf` parts: a part often
 * carries only `required` for properties another part declares.
 */
function collectRequired(
  schema: Schema,
  doc: OpenAPI,
  visited: ReadonlySet<string> = new Set<string>(),
): readonly string[] {
  if (!isSchemaLike(schema)) return []
  const target = derefSchema(schema, doc, visited)
  if (!target) return []
  return [
    ...(target.schema.required ?? []),
    ...(target.schema.allOf ?? []).flatMap((part) => collectRequired(part, doc, target.visited)),
  ]
}

type FlattenOptions = {
  readonly direction: Direction
  /** Walk into nested objects and array items, not only the first level. */
  readonly deep: boolean
  /** Emit an `*anonymous*` row for a top-level array before its item's rows. */
  readonly anonymous: boolean
}

function flattenFields(
  schema: Schema,
  doc: OpenAPI,
  prefix: string,
  options: FlattenOptions,
  inheritedRequired: readonly string[] = [],
  inside: Inside = false,
): readonly FieldRow[] {
  if (!isSchemaLike(schema)) return []
  const target = expandSchema(schema, doc, inside)
  if (!target) return []
  const current = target.schema
  const within = target.inside
  const nestedPrefix = prefix ? `${prefix} »` : '»'
  const named = (name: string) => (prefix ? `${prefix} ${name}` : name)
  const required = [...inheritedRequired, ...collectRequired(current, doc)]
  const requiredSet = new Set(required)

  // A property that refers to a component is a link to it, and stops there: the
  // component's own rows are under Schemas, once. Repeated under every reference, a small
  // component referred to from many properties made a table grow with the references (the
  // Figma document: 50,000 rows for one operation) rather than with the operation.
  const nestedRows = (propSchema: Schema): readonly FieldRow[] => {
    if (!options.deep || isComponentRef(propSchema)) return []
    const prop = expandSchema(propSchema, doc, within)
    if (!prop) return []
    if (hasFields(prop.schema)) {
      return flattenFields(prop.schema, doc, nestedPrefix, options, [], prop.inside)
    }
    const item = isArraySchema(prop.schema) ? arrayItemSchema(prop.schema) : undefined
    if (item && isComponentRef(item)) return []
    const resolvedItem = item ? expandSchema(item, doc, prop.inside) : undefined
    if (resolvedItem && hasFields(resolvedItem.schema)) {
      return flattenFields(resolvedItem.schema, doc, nestedPrefix, options, [], resolvedItem.inside)
    }
    return []
  }

  const makeRow = (name: string, propSchema: Schema, isRequired: boolean): FieldRow => {
    const resolved = derefSchema(propSchema, doc, new Set<string>())?.schema
    return {
      name: named(name),
      type: formatSchemaType(propSchema, doc),
      required: isRequired,
      restrictions: restrictionsOf(resolved ?? propSchema),
      description: describe(
        propSchema.description ?? resolved?.description,
        propSchema.deprecated ?? resolved?.deprecated,
      ),
      enums: enumValuesOf(propSchema, doc),
    }
  }

  const inherited = (current.allOf ?? []).flatMap((part) =>
    flattenFields(part, doc, prefix, options, required, within),
  )
  const own = isObjectSchema(current)
    ? Object.entries(current.properties)
        .filter(
          ([, propSchema]) =>
            isSchemaLike(propSchema) && !isHiddenProperty(propSchema, doc, options.direction),
        )
        // oxlint-disable-next-line oxc/no-map-spread -- flatMap fans out each entry into its lines
        .flatMap(([key, propSchema]) => [
          makeRow(key, propSchema, requiredSet.has(key)),
          ...nestedRows(propSchema),
        ])
    : []
  const extra = isSchemaLike(current.additionalProperties)
    ? [
        makeRow('**additionalProperties**', current.additionalProperties, false),
        ...nestedRows(current.additionalProperties),
      ]
    : []
  // oxlint-disable-next-line oxc/no-map-spread -- flatMap fans out each entry into its lines
  const variants = variantsOf(current).flatMap((variant) => [
    makeRow(`*${variant.keyword}*`, variant.schema, false),
    ...(isComponentRef(variant.schema)
      ? []
      : flattenFields(variant.schema, doc, prefix, options, required, within)),
  ])
  const rows = [...inherited, ...own, ...extra, ...variants]
  if (rows.length > 0 || !options.deep || !isArraySchema(current)) return rows

  const item = arrayItemSchema(current)
  if (!item) return []
  const anonymous: readonly FieldRow[] = options.anonymous
    ? [
        {
          name: '*anonymous*',
          type: `[${formatSchemaType(item, doc)}]`,
          required: false,
          restrictions: 'none',
          description: 'none',
          enums: [],
        },
      ]
    : []
  if (isComponentRef(item)) return anonymous
  const resolvedItem = expandSchema(item, doc, within)
  if (!(resolvedItem && hasFields(resolvedItem.schema))) return anonymous
  return [
    ...anonymous,
    ...flattenFields(
      resolvedItem.schema,
      doc,
      '»',
      { ...options, anonymous: false },
      [],
      resolvedItem.inside,
    ),
  ]
}

function makeFieldTable(fields: readonly FieldRow[]): readonly string[] {
  return [
    '|Name|Type|Required|Restrictions|Description|',
    '|---|---|---|---|---|',
    ...fields.map(
      (f) =>
        `|${escapeCell(f.name)}|${escapeCell(f.type)}|${f.required}|${f.restrictions}|${escapeCell(f.description)}|`,
    ),
    '',
  ]
}

function makeEnumTable(
  label: string,
  rows: readonly { readonly name: string; readonly enums: readonly unknown[] }[],
): readonly string[] {
  const lines = rows.flatMap((row) =>
    row.enums.map((value) => `|${escapeCell(row.name)}|${escapeCell(formatEnumValue(value))}|`),
  )
  if (lines.length === 0) return []
  return ['#### Enumerated Values', '', `|${label}|Value|`, '|---|---|', ...lines, '']
}

function makeBodyFields(operation: Operation, doc: OpenAPI) {
  const schema = getBodyMedia(operation, doc)?.media.schema
  if (!schema) return []
  return flattenFields(schema, doc, '»', { direction: 'request', deep: true, anonymous: false })
}

function makeParametersTable(
  operation: Operation,
  slugBase: string,
  params: readonly Parameter[],
  doc: OpenAPI,
): readonly string[] {
  const body = requestBodyOf(operation, doc)
  const bodySchema = getBodyMedia(operation, doc)?.media.schema
  const rows = [
    ...params.map((p) => ({
      name: p.name,
      location: p.in,
      type: formatSchemaType(parameterSchema(p, doc), doc),
      required: p.required === true,
      description: describe(p.description, p.deprecated),
    })),
    ...(bodySchema
      ? [
          {
            name: 'body',
            location: 'body',
            type: formatSchemaType(bodySchema, doc),
            required: body?.required === true,
            description: describe(body?.description, false),
          },
          ...makeBodyFields(operation, doc).map((f) => ({
            name: f.name,
            location: 'body',
            type: f.type,
            required: f.required,
            description: f.description,
          })),
        ]
      : []),
  ]
  if (rows.length === 0) return []
  return [
    `<h3 id="${slugBase}-parameters">Parameters</h3>`,
    '',
    '|Name|In|Type|Required|Description|',
    '|---|---|---|---|---|',
    ...rows.map(
      (r) =>
        `|${escapeCell(r.name)}|${escapeCell(r.location)}|${escapeCell(r.type)}|${r.required}|${escapeCell(r.description)}|`,
    ),
    '',
  ]
}

function makeParameterEnums(
  operation: Operation,
  params: readonly Parameter[],
  doc: OpenAPI,
): readonly string[] {
  return makeEnumTable('Parameter', [
    ...params.map((p) => {
      const schema = parameterSchema(p, doc)
      return { name: p.name, enums: schema ? enumValuesOf(schema, doc) : [] }
    }),
    ...makeBodyFields(operation, doc),
  ])
}

function resolvedResponses(operation: Operation, doc: OpenAPI) {
  const responses: unknown = operation.responses
  if (!isRecord(responses)) return []
  return Object.entries(responses).flatMap(([statusCode, response]) => {
    const resolved = resolveRefDeep(response, doc)
    return isRecord(resolved) ? [{ statusCode, response: resolved }] : []
  })
}

function statusMeaning(statusCode: string) {
  if (statusCode.toLowerCase() === 'default') return 'Default'
  const range = /^([1-5])XX$/iu.exec(statusCode)?.[1]
  // oxlint-disable-next-line typescript/switch-exhaustiveness-check -- the default branch covers a concrete status code
  switch (range) {
    case '1':
      return 'Informational'
    case '2':
      return 'Successful'
    case '3':
      return 'Redirection'
    case '4':
      return 'Client Error'
    case '5':
      return 'Server Error'
    default:
      // `STATUS_CODES` (node:http) is typed `Record<number, string>`. Coerce
      // explicitly so the lookup matches the declared type — JS would coerce
      // numeric strings anyway, but the explicit form survives stricter index
      // typings without relying on that quirk.
      return STATUS_CODES[Number(statusCode)] ?? statusCode
  }
}

function makeResponsesTable(
  operation: Operation,
  slugBase: string,
  doc: OpenAPI,
): readonly string[] {
  const rows = resolvedResponses(operation, doc).map(({ statusCode, response }) => {
    const schema = pickMedia(response.content, doc)?.media.schema
    const name = schema?.$ref ? componentSchemaName(schema.$ref) : undefined
    const schemaStr = schema ? (name ? makeSchemaLink(name, doc) : 'Inline') : 'None'
    const description = toText(response.description) ?? ''
    return `|${escapeCell(statusCode)}|${statusMeaning(statusCode)}|${escapeCell(description)}|${schemaStr}|`
  })
  if (rows.length === 0) return []
  return [
    `<h3 id="${slugBase}-responses">Responses</h3>`,
    '',
    '|Status|Meaning|Description|Schema|',
    '|---|---|---|---|',
    ...rows,
    '',
  ]
}

function makeResponseSchemaSection(
  operation: Operation,
  slugBase: string,
  doc: OpenAPI,
): readonly string[] {
  // oxlint-disable-next-line oxc/no-map-spread -- flatMap fans out each entry into its lines
  const tables = resolvedResponses(operation, doc).flatMap(({ statusCode, response }) => {
    const schema = pickMedia(response.content, doc)?.media.schema
    if (!schema) return []
    // A named schema is linked from the Responses table and listed under Schemas.
    if (schema.$ref && componentSchemaName(schema.$ref)) return []
    const fields = flattenFields(schema, doc, '', {
      direction: 'response',
      deep: true,
      anonymous: true,
    })
    if (fields.length === 0) return []
    return [
      `Status Code **${statusCode}**`,
      '',
      ...makeFieldTable(fields),
      ...makeEnumTable('Property', fields),
    ]
  })
  if (tables.length === 0) return []
  // One heading per operation: repeating it per status would repeat its id.
  return [`<h3 id="${slugBase}-responseschema">Response Schema</h3>`, '', ...tables]
}

function makeResponseHeadersSection(operation: Operation, doc: OpenAPI): readonly string[] {
  const rows = resolvedResponses(operation, doc).flatMap(({ statusCode, response }) => {
    if (!isRecord(response.headers)) return []
    return Object.entries(response.headers).flatMap(([name, value]) => {
      const header = resolveRefDeep(value, doc)
      if (!isRecord(header)) return []
      const declared = isSchemaLike(header.schema)
        ? header.schema
        : listMedia(header.content, doc)[0]?.media.schema
      const schema = declared ? derefSchema(declared, doc, new Set<string>())?.schema : undefined
      const formatted = schema ? formatSchemaType(schema, doc) : 'string'
      const type = schema?.format ? formatted.replace(`(${schema.format})`, '') : formatted
      return [
        `|${escapeCell(statusCode)}|${escapeCell(name)}|${escapeCell(type)}|${escapeCell(schema?.format ?? '')}|${escapeCell(describe(header.description, header.deprecated))}|`,
      ]
    })
  })
  if (rows.length === 0) return []
  return [
    '### Response Headers',
    '',
    '|Status|Header|Type|Format|Description|',
    '|---|---|---|---|---|',
    ...rows,
    '',
  ]
}

function makeResponseExamples(operation: Operation, doc: OpenAPI): readonly string[] {
  // oxlint-disable-next-line oxc/no-map-spread -- flatMap fans out each entry into its lines
  return resolvedResponses(operation, doc).flatMap(({ statusCode, response }) => {
    const json = pickJsonMedia(response.content, doc)
    if (json) {
      const example = makeMediaExample(json.media, doc, 'response')
      if (example === undefined) return []
      return [
        `> ${statusCode} Response`,
        '',
        ...makeFence(JSON.stringify(example, null, 2), 'json'),
        '',
      ]
    }
    // Any other media type is shown only when the document spells out an example.
    const other = listMedia(response.content, doc).find(
      ({ media }) => extractMediaExample(media, doc) !== undefined,
    )
    if (!other) return []
    const example = extractMediaExample(other.media, doc)
    const block =
      typeof example === 'string'
        ? makeFence(example, 'text')
        : makeFence(JSON.stringify(example, null, 2), 'json')
    return [`> ${statusCode} Response`, '', ...block, '']
  })
}

function makeCallbacksSection(
  operation: Operation,
  slugBase: string,
  doc: OpenAPI,
): readonly string[] {
  const callbacks: unknown = operation.callbacks
  if (!isRecord(callbacks)) return []
  const rows = Object.entries(callbacks).flatMap(([name, value]) => {
    const callback = resolveRefDeep(value, doc)
    if (!isRecord(callback)) return []
    return Object.entries(callback).flatMap(([expression, item]) => {
      const pathItem = resolveRefDeep(item, doc)
      if (!isRecord(pathItem)) return []
      return operationsOf(pathItem).map(({ method, operation: callbackOperation }) => {
        const description = firstNonEmpty(callbackOperation.summary, callbackOperation.description)
        return `|${escapeCell(name)}|${escapeCell(expression)}|${method.toUpperCase()}|${escapeCell(description ?? 'none')}|`
      })
    })
  })
  if (rows.length === 0) return []
  return [
    `<h3 id="${slugBase}-callbacks">Callbacks</h3>`,
    '',
    '|Name|Expression|Method|Description|',
    '|---|---|---|---|',
    ...rows,
    '',
  ]
}

function makeExternalDocsLine(externalDocs: unknown): readonly string[] {
  if (!isRecord(externalDocs)) return []
  const url = toText(externalDocs.url)
  if (!url) return []
  const label = toText(externalDocs.description) ?? 'External documentation'
  return [`<a href="${escapeHtml(url)}">${escapeHtml(toSingleLine(label))}</a>`, '']
}

function makeSchemasSection(doc: OpenAPI): readonly string[] {
  const schemas: unknown = doc.components?.schemas
  if (!isRecord(schemas) || Object.keys(schemas).length === 0) return []
  return [
    '# Schemas',
    '',
    // oxlint-disable-next-line oxc/no-map-spread -- flatMap fans out each entry into its lines
    ...Object.entries(schemas).flatMap(([name, value]) => {
      const schema = isSchemaLike(value) ? value : {}
      const nameLower = schemaAnchor(name, doc)
      const safeName = escapeHtml(name)
      const description = toText(derefSchema(schema, doc, new Set<string>())?.schema.description)
      const fields = flattenFields(schema, doc, '', {
        direction: 'schema',
        deep: false,
        anonymous: false,
      })
      return [
        `<h2 id="tocS_${safeName}">${safeName}</h2>`,
        '<!-- backwards compatibility -->',
        `<a id="schema${escapeHtml(nameLower)}"></a>`,
        `<a id="schema_${safeName}"></a>`,
        `<a id="tocS${escapeHtml(nameLower)}"></a>`,
        `<a id="tocs${escapeHtml(nameLower)}"></a>`,
        '',
        ...makeFence(JSON.stringify(makeExampleFromSchema(schema, doc), null, 2), 'json'),
        '',
        ...(description ? [description.trimEnd(), ''] : []),
        ...(fields.length > 0 ? ['### Properties', '', ...makeFieldTable(fields)] : []),
        ...makeEnumTable('Property', fields),
      ]
    }),
  ]
}

// Unlike `isOperation` in guard, `responses` is not required: OpenAPI 3.1 lets an operation
// omit it, and the docs still list such an operation.
function isOperationObject(value: unknown): value is Operation {
  return isRecord(value)
}

function operationsOf(pathItem: { readonly [k: string]: unknown }): readonly {
  readonly method: string
  readonly operation: Operation
}[] {
  const additional = isRecord(pathItem.additionalOperations) ? pathItem.additionalOperations : {}
  return [
    ...HTTP_METHODS.map((method): { method: string; operation: unknown } => ({
      method,
      operation: pathItem[method],
    })),
    ...Object.entries(additional).map(([method, operation]) => ({ method, operation })),
  ].flatMap(({ method, operation }) =>
    isOperationObject(operation) ? [{ method, operation }] : [],
  )
}

function collectEndpoints(items: unknown, doc: OpenAPI, pathsOnly: boolean): readonly Endpoint[] {
  if (!isRecord(items)) return []
  return (
    Object.entries(items)
      // `paths` may carry `x-` extensions next to the paths themselves.
      .filter(([key]) => !pathsOnly || key.startsWith('/'))
      .flatMap(([pathStr, value]) => {
        const pathItem = resolveRefDeep(value, doc)
        if (!isRecord(pathItem)) return []
        return operationsOf(pathItem).map(({ method, operation }) => ({
          method,
          path: pathStr,
          operation,
          pathItem,
        }))
      })
  )
}

function tagOf(endpoint: Endpoint) {
  const [first] = endpoint.operation.tags ?? []
  return typeof first === 'string' && first !== '' ? first : 'Default'
}

/**
 * Groups operations under their first tag, as widdershins does: listing an
 * operation under every tag would repeat its section and its anchors.
 */
function groupByTag(
  endpoints: readonly Endpoint[],
  doc: OpenAPI,
): readonly {
  readonly name: string
  readonly tag: { readonly [k: string]: unknown } | undefined
  readonly endpoints: readonly Endpoint[]
}[] {
  const declared = (doc.tags ?? []).filter(
    (tag): tag is NonNullable<OpenAPI['tags']>[number] =>
      isRecord(tag) && typeof tag.name === 'string',
  )
  const names = [...new Set([...declared.map((tag) => tag.name), ...endpoints.map(tagOf)])]
  return names
    .map((name) => ({
      name,
      tag: declared.find((tag) => tag.name === name),
      endpoints: endpoints.filter((endpoint) => tagOf(endpoint) === name),
    }))
    .filter((group) => group.endpoints.length > 0)
}

function makeOperationSection(
  endpoint: Endpoint,
  doc: OpenAPI,
  allocate: (base: string) => string,
  sample: SampleOptions | undefined,
): readonly string[] {
  const { method, path: pathStr, operation } = endpoint
  const heading = toSingleLine(
    firstNonEmpty(operation.summary, operation.operationId) ?? `${method}${pathStr}`,
  )
  const slugBase = allocate(toSlug(heading) || toSlug(`${method}${pathStr}`) || 'operation')
  const params = endpointParameters(endpoint, doc)
  const description = toText(operation.description)
  const examples = makeResponseExamples(operation, doc)
  return [
    `## ${escapeHtml(heading)}`,
    '',
    ...(toText(operation.operationId)
      ? [`<a id="opId${escapeHtml(operation.operationId ?? '')}"></a>`, '']
      : []),
    ...(sample ? [...makeCodeSample(endpoint, doc, sample), ''] : []),
    makeInlineCode(`${method.toUpperCase()} ${pathStr}`),
    '',
    ...(operation.deprecated === true
      ? ['<aside class="warning">', 'This operation is deprecated', '</aside>', '']
      : []),
    ...(description ? [description, ''] : []),
    ...makeExternalDocsLine(operation.externalDocs),
    ...makeBodyParameterBlock(operation, doc),
    ...makeParametersTable(operation, slugBase, params, doc),
    ...makeParameterEnums(operation, params, doc),
    ...(examples.length > 0 ? ['> Example responses', '', ...examples] : []),
    ...makeResponsesTable(operation, slugBase, doc),
    ...makeResponseSchemaSection(operation, slugBase, doc),
    ...makeResponseHeadersSection(operation, doc),
    ...makeCallbacksSection(operation, slugBase, doc),
    ...makeAsideAuth(operation, doc),
    '',
  ]
}

/**
 * Inline code whose delimiter is longer than any backtick run in the content.
 */
function makeInlineCode(content: string) {
  const longest = Math.max(0, ...(content.match(/`+/gu) ?? []).map((run) => run.length))
  if (longest === 0) return `\`${content}\``
  const fence = '`'.repeat(longest + 1)
  return `${fence} ${content} ${fence}`
}

function makeServerLines(doc: OpenAPI): readonly string[] {
  const servers = (doc.servers ?? []).filter(
    (server) => isRecord(server) && typeof server.url === 'string',
  )
  if (servers.length === 0) return []
  return [
    'Base URLs:',
    '',
    ...servers.flatMap((server) => {
      const variables: unknown = server.variables
      // A templated url is shown with the default of each of its variables.
      const url = server.url.replaceAll(/\{([^{}]+)\}/gu, (placeholder: string, name: string) => {
        const variable = isRecord(variables) ? variables[name] : undefined
        return isRecord(variable) && variable.default !== undefined
          ? toParamString(variable.default)
          : placeholder
      })
      const description = toText(server.description)
      const suffix = description ? ` - ${escapeHtml(toSingleLine(description))}` : ''
      return [`* <a href="${escapeHtml(url)}">${escapeHtml(url)}</a>${suffix}`, '']
    }),
  ]
}

function makeInfoLines(doc: OpenAPI): readonly string[] {
  const info: unknown = doc.info
  if (!isRecord(info)) return []
  const contact = isRecord(info.contact) ? info.contact : {}
  const license = isRecord(info.license) ? info.license : {}
  const termsOfService = toText(info.termsOfService)
  const email = toText(contact.email)
  const contactUrl = toText(contact.url)
  const contactName = toText(contact.name)
  const licenseName = toText(license.name)
  const licenseUrl = toText(license.url)
  const lines = [
    ...(termsOfService ? [`<a href="${escapeHtml(termsOfService)}">Terms of service</a>`] : []),
    ...(email
      ? [`Email: <a href="mailto:${escapeHtml(email)}">${escapeHtml(contactName ?? email)}</a> `]
      : []),
    ...(contactUrl
      ? [`Web: <a href="${escapeHtml(contactUrl)}">${escapeHtml(contactName ?? contactUrl)}</a> `]
      : []),
    ...(licenseName
      ? [
          licenseUrl
            ? `License: <a href="${escapeHtml(licenseUrl)}">${escapeHtml(licenseName)}</a>`
            : `License: ${escapeHtml(licenseName)}`,
        ]
      : []),
  ]
  return lines.length > 0 ? [...lines, ''] : []
}

export function makeDocs(
  openAPI: OpenAPI,
  entry = 'src/index.ts',
  basePath = '/',
  curl = false,
  baseUrl?: string,
) {
  const title = toText(openAPI.info?.title) ?? 'API'
  const version = toText(openAPI.info?.version) ?? ''
  // A version that already reads `v1` must not become `vv1`.
  const versionLabel = /^v\d/iu.test(version) ? version : `v${version}`
  const fullTitle = version ? `${title} ${versionLabel}` : title
  const allocate = makeIdAllocator()
  const titleSlug = allocate(toSlug(title) || 'api')
  const summary = toText(openAPI.info?.summary)
  const description = toText(openAPI.info?.description)
  const sample: SampleOptions = { basePath, entry, curl, baseUrl }
  const webhooks = collectEndpoints(openAPI.webhooks, openAPI, false)
  return [
    `<h1 id="${titleSlug}">${escapeHtml(fullTitle)}</h1>`,
    '',
    '> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.',
    '',
    ...(summary ? [summary.trimEnd(), ''] : []),
    ...(description ? [description.trimEnd(), ''] : []),
    ...makeServerLines(openAPI),
    ...makeInfoLines(openAPI),
    ...makeExternalDocsLine(openAPI.externalDocs),
    ...makeAuthenticationSection(openAPI),
    // oxlint-disable-next-line oxc/no-map-spread -- flatMap fans out each entry into its lines
    ...groupByTag(collectEndpoints(openAPI.paths, openAPI, true), openAPI).flatMap((group) => {
      const tagId = allocate(`${titleSlug}-${toSlug(group.name) || 'tag'}`)
      const tagDescription = toText(group.tag?.description)
      return [
        `<h1 id="${tagId}">${escapeHtml(group.name)}</h1>`,
        '',
        ...(tagDescription ? [tagDescription, ''] : []),
        ...makeExternalDocsLine(group.tag?.externalDocs),
        ...group.endpoints.flatMap((endpoint) =>
          makeOperationSection(endpoint, openAPI, allocate, sample),
        ),
      ]
    }),
    ...(webhooks.length > 0
      ? [
          `<h1 id="${allocate(`${titleSlug}-webhooks`)}">Webhooks</h1>`,
          '',
          // A webhook is a request the API sends, so there is nothing to call.
          ...webhooks.flatMap((endpoint) =>
            makeOperationSection(endpoint, openAPI, allocate, undefined),
          ),
        ]
      : []),
    ...makeSchemasSection(openAPI),
  ].join('\n')
}
