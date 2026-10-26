import { isRecord } from '../guard/index.js'
import type { OpenAPI } from '../openapi/index.js'
import { decodePercent } from '../utils/index.js'

/**
 * Inlines every `$ref` whose pointer names no component, so that what reaches the
 * generators is either a component (`#/components/<section>/<name>`, emitted as the
 * identifier it is declared under) or the schema itself.
 *
 * A bundler keeps internal references as they are, and a document may refer to an inline
 * schema wherever it sits: `#/paths/~1partners~1upsert/put/requestBody/content/
 * application~1json/schema` (freee), or `#/components/parameters/Page/schema`. Named after
 * its last segment, such a reference became `SchemaSchema`, which nothing declares. The
 * target is already in the document, so it is written in place of the reference, with the
 * keywords beside the `$ref` (a `description`) kept over the target's own. A pointer that
 * names nothing, or that comes back to itself, is left as written.
 */
export function inlinePointerRefs(document: OpenAPI): OpenAPI {
  // Most documents have no such pointer: they are read once, and come back as they are,
  // rather than rebuilt node by node.
  if (!hasInlinePointer(document)) return document
  const inline = (node: unknown, inlining: ReadonlySet<string>): unknown => {
    if (Array.isArray(node)) return node.map((item) => inline(item, inlining))
    if (!isRecord(node)) return node
    const walked = (record: { readonly [k: string]: unknown }) =>
      Object.fromEntries(
        Object.entries(record).map(([key, value]) => [key, inline(value, inlining)]),
      )
    const { $ref, ...beside } = node
    if (typeof $ref === 'string' && isInlinePointer($ref) && !inlining.has($ref)) {
      const target = resolvePointer(document, $ref)
      if (isRecord(target)) {
        const inlined = inline(target, new Set([...inlining, $ref]))
        if (isRecord(inlined)) return { ...inlined, ...walked(beside) }
      }
    }
    return walked(node)
  }
  // The walk keeps every key and every value's shape; a document comes back a document.
  return {
    ...document,
    ...Object.fromEntries(
      Object.entries(document).map(([key, value]) => [key, inline(value, new Set())]),
    ),
  }
}

/** Whether any `$ref` under `node` is an inline pointer. */
function hasInlinePointer(node: unknown): boolean {
  if (Array.isArray(node)) return node.some(hasInlinePointer)
  if (!isRecord(node)) return false
  const { $ref } = node
  if (typeof $ref === 'string' && isInlinePointer($ref)) return true
  return Object.values(node).some(hasInlinePointer)
}

/** A local pointer that does not name a component, nor a property of a component schema. */
function isInlinePointer(ref: string) {
  if (!ref.startsWith('#/')) return false
  const segments = pointerSegments(ref)
  if (segments[0] !== 'components') return true
  // `#/components/<section>/<name>` is the component itself, and
  // `#/components/schemas/<name>/properties/...` is emitted through its schema.
  if (segments.length === 3) return false
  return !(segments[1] === 'schemas' && segments[3] === 'properties' && segments.length > 4)
}

/** The segments of a JSON Pointer fragment, decoded: percent-encoding, then `~1` and `~0` (RFC 6901 §6). */
function pointerSegments(ref: string): readonly string[] {
  return ref
    .slice(2)
    .split('/')
    .map((segment) => decodePercent(segment).replaceAll('~1', '/').replaceAll('~0', '~'))
}

function resolvePointer(document: OpenAPI, ref: string): unknown {
  return pointerSegments(ref).reduce<unknown>((node, segment) => {
    if (Array.isArray(node)) return node[Number(segment)]
    if (isRecord(node)) return Object.hasOwn(node, segment) ? node[segment] : undefined
    return undefined
  }, document)
}
