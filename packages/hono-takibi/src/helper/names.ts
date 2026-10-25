import { COMPONENT_NAMES, COMPONENT_SUFFIXES } from '../constants/index.js'
import { isRecord } from '../guard/index.js'
import type { OpenAPI } from '../openapi/index.js'
import { decodePercent, ensureSuffix, toIdentifierPascalCase } from '../utils/index.js'

/**
 * Renames the components whose identifiers would collide, and every `$ref` to them.
 *
 * An identifier is made of the letters and digits of a component name, so
 * `api-response-common-failure` and `api_response_common_failure` (Cloudflare) are both
 * `ApiResponseCommonFailureSchema`: one declaration was silently lost, and a type alias
 * came to name itself (`type X = X`). The first component in document order keeps its
 * name; every later one that would share an identifier is numbered
 * (`api_response_common_failure2`, so `ApiResponseCommonFailure2Schema`), and the
 * references to it follow. The document that is emitted names the schema the new way too.
 *
 * Security schemes are left alone: `security` requirements name them, and a `$ref` does not.
 */
export function uniqueComponentNames(document: OpenAPI): OpenAPI {
  const components = document.components
  if (!isRecord(components)) return document
  const renames = COMPONENT_NAMES.flatMap((section) => {
    if (section === 'securitySchemes') return []
    const entries = components[section]
    if (!isRecord(entries)) return []
    const identifier = (name: string) =>
      toIdentifierPascalCase(ensureSuffix(name, COMPONENT_SUFFIXES[section]))
    const taken = new Set<string>()
    return Object.keys(entries).flatMap((name) => {
      const own = identifier(name)
      if (!taken.has(own)) {
        taken.add(own)
        return []
      }
      const renamed = numbered(name, (candidate) => !taken.has(identifier(candidate)))
      taken.add(identifier(renamed))
      return [{ section, name, renamed }]
    })
  })
  if (renames.length === 0) return document
  const renamedSections = Object.fromEntries(
    COMPONENT_NAMES.flatMap((section) => {
      const entries = components[section]
      const own = renames.filter((rename) => rename.section === section)
      if (!isRecord(entries) || own.length === 0) return []
      return [
        [
          section,
          Object.fromEntries(
            Object.entries(entries).map(([name, value]) => [
              own.find((rename) => rename.name === name)?.renamed ?? name,
              value,
            ]),
          ),
        ],
      ]
    }),
  )
  const refs = new Map<string, (typeof renames)[number]>(
    renames.map((rename) => [`#/components/${rename.section}/${rename.name}`, rename]),
  )
  const rewriteRef = (ref: string) => {
    if (!ref.startsWith('#/components/')) return ref
    const segments = ref.split('/')
    const section = segments[2]
    const encoded = segments[3]
    const rest = segments.slice(4)
    if (section === undefined || encoded === undefined) return ref
    const rename = refs.get(`#/components/${section}/${decodePercent(encoded)}`)
    if (rename === undefined) return ref
    const renamed = encoded.includes('%') ? encodeURIComponent(rename.renamed) : rename.renamed
    return ['#', 'components', section, renamed, ...rest].join('/')
  }
  const rewrite = (node: unknown): unknown => {
    if (Array.isArray(node)) return node.map(rewrite)
    if (!isRecord(node)) return node
    return Object.fromEntries(
      Object.entries(node).map(([key, value]) => {
        if (key === '$ref' && typeof value === 'string') return [key, rewriteRef(value)]
        // `discriminator.mapping` values are references written as strings.
        if (key === 'mapping' && isRecord(value)) {
          return [
            key,
            Object.fromEntries(
              Object.entries(value).map(([k, v]) => [k, typeof v === 'string' ? rewriteRef(v) : v]),
            ),
          ]
        }
        return [key, rewrite(value)]
      }),
    )
  }
  const rewritten = rewrite({ ...document, components: { ...components, ...renamedSections } })
  return isRecord(rewritten) ? { ...document, ...rewritten } : document
}

/** `name2`, `name3`, ...: the first that `isFree`. */
function numbered(name: string, isFree: (candidate: string) => boolean) {
  const candidates = (n: number): string =>
    isFree(`${name}${n}`) ? `${name}${n}` : candidates(n + 1)
  return candidates(2)
}
