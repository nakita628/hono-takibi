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

/**
 * A local pointer that does not name a component: anything but `#/components/<section>/<name>`.
 * A pointer that goes on inside a component schema (`#/components/schemas/Block/properties/fee`,
 * `.../properties/tags/items`, `.../allOf/0`) names the schema found there, not `Block` (#499):
 * a bundler writes one wherever an external fragment is used a second time.
 */
function isInlinePointer(ref: string) {
  if (!ref.startsWith('#/')) return false
  const segments = pointerSegments(ref)
  return !(segments[0] === 'components' && segments.length === 3)
}

/** The segments of a JSON Pointer fragment, decoded: percent-encoding, then `~1` and `~0` (RFC 6901 §6). */
function pointerSegments(ref: string): readonly string[] {
  return ref
    .slice(2)
    .split('/')
    .map((segment) => decodePercent(segment).replaceAll('~1', '/').replaceAll('~0', '~'))
}

/**
 * The value a pointer names in the document. A segment that the node does not have is read
 * through the node's own `$ref`: a bundler points at the first use of a fragment, by the path
 * it was read along, and that path may cross a node it has itself written as a reference
 * (`#/paths/.../schema/anyOf/1/properties/kzg_proofs/items`, where `anyOf/1` is
 * `{ $ref: '#/components/schemas/Fulu.SignedBlockContents' }`, Ethereum Beacon API, #499).
 * A chain of references that comes back to itself names nothing.
 */
function resolvePointer(document: OpenAPI, ref: string): unknown {
  return locatePointer(document, ref).node
}

/** Where a pointer leads: the value, and the path it sits at, a `$ref` crossed on the way followed. */
type Located = { readonly node: unknown; readonly path: readonly string[] }

function locatePointer(document: OpenAPI, ref: string): Located {
  return locateThrough(document, ref, new Set([ref]))
}

function locateThrough(document: OpenAPI, pointer: string, seen: ReadonlySet<string>): Located {
  return pointerSegments(pointer).reduce<Located>(
    (from, segment) => member(document, from, segment, seen),
    { node: document, path: [] },
  )
}

/** `node[segment]`, read through the `$ref` of a node that has no such member. */
function member(
  document: OpenAPI,
  from: Located,
  segment: string,
  seen: ReadonlySet<string>,
): Located {
  const { node } = from
  const path = [...from.path, segment]
  if (Array.isArray(node)) return { node: node[Number(segment)], path }
  if (!isRecord(node)) return { node: undefined, path }
  if (Object.hasOwn(node, segment)) return { node: node[segment], path }
  const { $ref } = node
  if (typeof $ref !== 'string' || !$ref.startsWith('#/') || seen.has($ref)) {
    return { node: undefined, path }
  }
  const through = new Set([...seen, $ref])
  return member(document, locateThrough(document, $ref, through), segment, through)
}

/**
 * Declares the schema a pointer names inside a component schema as a component of its own,
 * and names it there: where it is written, and in every `$ref` to it (#499).
 *
 * A bundler writes such a pointer when a fragment is used more than once: the first use is
 * kept where it stands and the others point at it. It was one schema with several uses in
 * the source, so it is declared once, like a component, rather than written out at each use
 * (Ethereum's Beacon API: 286 uses of 60 schemas).
 *
 * The component is named after the component the schema is in and the path to it, the
 * `properties` keyword left out: `#/components/schemas/Block/properties/tags/items` is
 * `BlockTagsItems`, `#/components/schemas/Derived/allOf/0` is `DerivedAllOf0`. Pointers that
 * lead to one place through different references are one component. A pointer to a node
 * that is a `$ref` itself is left for `inlinePointerRefs`, which writes that reference.
 */
export function declareSchemaPointers(document: OpenAPI): OpenAPI {
  if (!hasInlinePointer(document)) return document
  const existing = document.components?.schemas ?? {}
  const located = [...new Set(inlinePointers(document))].flatMap((pointer) => {
    const { node, path } = locatePointer(document, pointer)
    return isRecord(node) &&
      typeof node.$ref !== 'string' &&
      path[0] === 'components' &&
      path[1] === 'schemas' &&
      path.length > 3
      ? [{ pointer, key: pathKey(path), path }]
      : []
  })
  if (located.length === 0) return document
  const taken = new Set(Object.keys(existing))
  // One name for each place, whatever the pointers that lead to it.
  const names = new Map<string, string>()
  for (const { key, path } of located) {
    if (names.has(key)) continue
    const base = pointerName(path)
    const name = taken.has(base) ? numbered(base, (candidate) => !taken.has(candidate)) : base
    taken.add(name)
    names.set(key, name)
  }
  const refs = new Map(
    located.map(({ pointer, key }) => [pointer, `#/components/schemas/${names.get(key) ?? ''}`]),
  )
  // A place that is declared is a reference to its component; anything else is walked, and
  // `inside` walks the members of a node whatever the node's own place is.
  const walk = (node: unknown, path: readonly string[], inside: boolean): unknown => {
    const name = inside ? undefined : names.get(pathKey(path))
    if (name !== undefined) return { $ref: `#/components/schemas/${name}` }
    if (Array.isArray(node)) {
      return node.map((item: unknown, i) => walk(item, [...path, String(i)], false))
    }
    if (!isRecord(node)) return node
    return Object.fromEntries(
      Object.entries(node).map(([key, value]) => [
        key,
        key === '$ref' && typeof value === 'string'
          ? (refs.get(value) ?? value)
          : walk(value, [...path, key], false),
      ]),
    )
  }
  const children = (node: unknown, path: readonly string[]) => walk(node, path, true)
  const walked = children(document, [])
  if (!isOpenAPI(walked)) return document
  const hoisted = Object.fromEntries(
    [...new Map(located.map(({ key, path }) => [key, path]))].map(([key, path]) => [
      names.get(key) ?? '',
      children(path.reduce<unknown>(ownMember, document), path),
    ]),
  )
  const result = {
    ...walked,
    components: {
      ...walked.components,
      schemas: { ...walked.components?.schemas, ...hoisted },
    },
  }
  return isOpenAPI(result) ? result : document
}

function ownMember(node: unknown, segment: string): unknown {
  if (Array.isArray(node)) return node[Number(segment)]
  return isRecord(node) && Object.hasOwn(node, segment) ? node[segment] : undefined
}

function pathKey(path: readonly string[]) {
  return JSON.stringify(path)
}

/** The keywords whose members are named by the document: the keyword says nothing of the member. */
const NAMING_KEYWORDS: ReadonlySet<string> = new Set(['properties', 'definitions', '$defs'])

/**
 * The name of the schema at a path inside `components.schemas`: the component's own name,
 * then each segment in PascalCase. A naming keyword is left out and the name under it kept,
 * whatever it is (`properties/properties` is `Properties`).
 */
function pointerName(path: readonly string[]) {
  const component = path[2] ?? 'Schema'
  const inside = path.slice(3)
  const kept = inside.reduce<{ readonly parts: readonly string[]; readonly named: boolean }>(
    ({ parts, named }, segment) =>
      !named && NAMING_KEYWORDS.has(segment)
        ? { parts, named: true }
        : { parts: [...parts, segment], named: false },
    { parts: [], named: false },
  )
  return `${component}${kept.parts.map(pascalSegment).join('')}`
}

function pascalSegment(segment: string) {
  return segment
    .split(/[^A-Za-z0-9]+/u)
    .filter((word) => word.length > 0)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join('')
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
  // Held in an object: a `let` written inside `walk` is read as never written after it.
  const state = { changed: false }
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
            state.changed = true
            return [key, inResource]
          }
        }
        return [key, walk(value, `${path}/${segment}`, own)]
      }),
    )
  }
  const walked = walk(document, '#', undefined)
  return state.changed && isOpenAPI(walked) ? walked : document
}
