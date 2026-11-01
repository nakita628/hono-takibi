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

/**
 * Moves the schema a recursive inline pointer names into `components.schemas`, and names it
 * there in every `$ref`. A `definitions` entry of an externally referenced JSON Schema that
 * reaches itself (`Node.children.items` → `Node`, Tyk) cannot be inlined where it is used:
 * the copy would never end, so `inlinePointerRefs` leaves the reference inside the copy as
 * written, and `makeRef` named it `NodeSchema`, which nothing declared (#404). As a component
 * it is declared, with the `z.lazy()` and the type a recursive component gets.
 *
 * The component is named after the pointer's last segment, numbered when the name is taken.
 * A pointer is recursive when its target, read through the inline pointers under it, comes
 * back to the pointer itself.
 */
export function hoistRecursivePointers(document: OpenAPI): OpenAPI {
  if (!hasInlinePointer(document)) return document
  const pointers = [...new Set(inlinePointers(document))]
  const recursive = pointers.filter((pointer) => isRecursivePointer(document, pointer))
  if (recursive.length === 0) return document
  const existing = document.components?.schemas ?? {}
  const taken = new Set(Object.keys(existing))
  const names = new Map(
    recursive.map((pointer) => {
      const base = pointerSegments(pointer).at(-1) ?? 'Schema'
      const name = taken.has(base) ? numbered(base, (candidate) => !taken.has(candidate)) : base
      taken.add(name)
      return [pointer, name] as const
    }),
  )
  const rename = (node: unknown): unknown => {
    if (Array.isArray(node)) return node.map(rename)
    if (!isRecord(node)) return node
    return Object.fromEntries(
      Object.entries(node).map(([key, value]) => {
        const name = key === '$ref' && typeof value === 'string' ? names.get(value) : undefined
        return [key, name === undefined ? rename(value) : `#/components/schemas/${name}`]
      }),
    )
  }
  const hoisted = Object.fromEntries(
    [...names].flatMap(([pointer, name]) => {
      const target = resolvePointer(document, pointer)
      return isRecord(target) ? [[name, target]] : []
    }),
  )
  const renamed = rename({
    ...document,
    components: { ...document.components, schemas: { ...existing, ...hoisted } },
  })
  return isOpenAPI(renamed) ? renamed : document
}

// The walk keeps every key and every value's shape, so what comes back is a document; the
// type cannot see that.
function isOpenAPI(value: unknown): value is OpenAPI {
  return isRecord(value) && 'paths' in value
}

/** Every inline pointer a `$ref` under `node` names, in document order, duplicates included. */
function inlinePointers(node: unknown): readonly string[] {
  if (Array.isArray(node)) return node.flatMap(inlinePointers)
  if (!isRecord(node)) return []
  const { $ref } = node
  return [
    ...(typeof $ref === 'string' && isInlinePointer($ref) ? [$ref] : []),
    ...Object.values(node).flatMap(inlinePointers),
  ]
}

/** Whether the target of `pointer`, read through the inline pointers under it, names `pointer` again. */
function isRecursivePointer(document: OpenAPI, pointer: string) {
  const visited = new Set<string>()
  const reaches = (node: unknown): boolean => {
    if (Array.isArray(node)) return node.some(reaches)
    if (!isRecord(node)) return false
    const { $ref } = node
    if (typeof $ref === 'string' && isInlinePointer($ref)) {
      if ($ref === pointer) return true
      if (!visited.has($ref)) {
        visited.add($ref)
        if (reaches(resolvePointer(document, $ref))) return true
      }
    }
    return Object.values(node).some(reaches)
  }
  return reaches(resolvePointer(document, pointer))
}

/** `name2`, `name3`, ...: the first that `isFree`. */
function numbered(name: string, isFree: (candidate: string) => boolean) {
  const candidates = (n: number): string =>
    isFree(`${name}${n}`) ? `${name}${n}` : candidates(n + 1)
  return candidates(2)
}

/**
 * Resolves the `$ref`s of an embedded JSON Schema resource against the resource. A schema
 * with an `$id` (or Draft 4's `id`) is a resource of its own, and a `#/definitions/Tag` inside
 * it names its own `definitions`, not the document's (RFC 3986 §5, JSON Schema §8.2). A
 * bundler that copies such a schema into the document keeps those pointers as written, so
 * read against the document they name nothing (Tyk's OpenAPI 3.0 meta-schema, #404). Each is
 * written as the pointer to the same place in the document, where `inlinePointerRefs` and
 * `hoistRecursivePointers` read it. A pointer the document resolves as it is is left alone.
 */
export function resolveEmbeddedRefs(document: OpenAPI): OpenAPI {
  if (!hasInlinePointer(document)) return document
  let changed = false
  const walk = (node: unknown, path: string, resource: string | undefined): unknown => {
    if (Array.isArray(node)) return node.map((item, i) => walk(item, `${path}/${i}`, resource))
    if (!isRecord(node)) return node
    const own = typeof node.$id === 'string' || typeof node.id === 'string' ? path : resource
    return Object.fromEntries(
      Object.entries(node).map(([key, value]) => {
        const segment = key.replaceAll('~', '~0').replaceAll('/', '~1')
        if (
          key === '$ref' &&
          typeof value === 'string' &&
          own !== undefined &&
          own !== '#' &&
          value.startsWith('#/') &&
          resolvePointer(document, value) === undefined
        ) {
          const inResource = `${own}${value.slice(1)}`
          if (resolvePointer(document, inResource) !== undefined) {
            changed = true
            return [key, inResource]
          }
        }
        return [key, walk(value, `${path}/${segment}`, own)]
      }),
    )
  }
  const walked = walk(document, '#', undefined)
  return changed && isOpenAPI(walked) ? walked : document
}
